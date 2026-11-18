/* Google Analytics 4 com Consent Mode.
   - Só é carregado depois do consentimento de "Desempenho".
   - Sinais de anúncio só são liberados com o consentimento de "Marketing".
   Para ativar, defina VITE_GA_MEASUREMENT_ID no .env (ver .env.example).
   Sem o ID, nada é carregado. */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let loaded = false;

function gtag() {
  window.dataLayer = window.dataLayer || [];
  // O gtag.js espera o objeto "arguments", não um array
  window.dataLayer.push(arguments);
}

export function applyGoogleConsent(consent) {
  const analytics = !!consent?.analytics;
  const marketing = !!consent?.marketing;

  if (!GA_ID) {
    if (import.meta.env.DEV && analytics) {
      console.info(
        "[cookies] Desempenho permitido, mas VITE_GA_MEASUREMENT_ID não está definido.",
      );
    }
    return;
  }

  const state = {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  };

  // Bloqueia novos envios mesmo que o script já tenha sido carregado
  window[`ga-disable-${GA_ID}`] = !analytics;

  if (loaded) {
    gtag("consent", "update", state);
    return;
  }

  if (!analytics) return;

  loaded = true;
  window.gtag = gtag;
  gtag("consent", "default", state);
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}
