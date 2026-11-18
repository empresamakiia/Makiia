/* Consentimento de cookies da MAKIIA.
   A escolha fica salva num cookie primário (makiia_consent), que o backend
   também consegue ler. Mude CONSENT_VERSION quando a política mudar: todo mundo
   verá o aviso de novo. */

export const CONSENT_COOKIE = "makiia_consent";
export const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // 6 meses

export const CATEGORIES = [
  {
    id: "necessary",
    title: "Essenciais",
    description:
      "Mantêm o site funcionando, a sua sessão segura e guardam esta escolha. Não podem ser desativados.",
    locked: true,
  },
  {
    id: "analytics",
    title: "Desempenho",
    description:
      "Medem visitas e uso das páginas de forma agregada, para melhorarmos a MAKIIA.",
  },
  {
    id: "preferences",
    title: "Funcionalidade",
    description:
      "Lembram ajustes que você faz, como manter-se conectado e preferências de uso.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Medem campanhas e mostram anúncios mais relevantes da MAKIIA em outros sites.",
  },
];

export const OPTIONAL_CATEGORIES = CATEGORIES.filter((c) => !c.locked).map(
  (c) => c.id,
);

/* Lista pública dos cookies usados (aparece na Política de Cookies).
   Mantenha sempre igual ao que o site realmente grava. */
export const COOKIE_LIST = [
  {
    name: "makiia_consent",
    category: "necessary",
    purpose: "Guarda as suas escolhas sobre cookies.",
    provider: "MAKIIA",
    duration: "6 meses",
  },
  {
    name: "makiia_pref",
    category: "preferences",
    purpose: "Lembra ajustes de uso, como manter-se conectado.",
    provider: "MAKIIA",
    duration: "1 ano",
  },
  {
    name: "_ga",
    category: "analytics",
    purpose: "Distingue visitantes de forma anônima para medir o uso.",
    provider: "Google Analytics",
    duration: "2 anos",
  },
  {
    name: "_ga_<ID>",
    category: "analytics",
    purpose: "Mantém o estado da sessão de medição.",
    provider: "Google Analytics",
    duration: "2 anos",
  },
];

/* Cookies que cada categoria pode criar: apagados quando a permissão é retirada */
const CATEGORY_COOKIES = {
  preferences: ["makiia_pref"],
  analytics: ["_ga", "_gid", "_gat"],
  marketing: ["_gcl_", "_fbp", "_fbc"],
};

/* ---------- Leitura e escrita de cookies ---------- */
export function getCookie(name) {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function setCookie(name, value, maxAge) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

/* Apaga em todos os domínios possíveis (o Google Analytics usa o domínio pai) */
function deleteCookie(name) {
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i += 1) {
    domains.push(`; Domain=.${parts.slice(i).join(".")}`);
  }
  domains.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
  });
}

function deleteCookiesByPrefix(prefixes) {
  document.cookie
    .split("; ")
    .map((row) => row.split("=")[0])
    .filter((name) => prefixes.some((prefix) => name.startsWith(prefix)))
    .forEach(deleteCookie);
}

/* ---------- Consentimento ---------- */
export function readConsent() {
  try {
    const raw = getCookie(CONSENT_COOKIE);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== CONSENT_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeConsent(choices) {
  const consent = {
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    necessary: true,
    preferences: !!choices.preferences,
    analytics: !!choices.analytics,
    marketing: !!choices.marketing,
  };
  setCookie(CONSENT_COOKIE, JSON.stringify(consent), CONSENT_MAX_AGE);
  return consent;
}

/* Remove os cookies das categorias que não estão (mais) permitidas */
export function clearRevokedCookies(consent) {
  Object.entries(CATEGORY_COOKIES).forEach(([category, prefixes]) => {
    if (!consent?.[category]) deleteCookiesByPrefix(prefixes);
  });
}
