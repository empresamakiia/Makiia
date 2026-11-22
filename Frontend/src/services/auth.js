/*
 * Autenticação da MAKIIA, ligada às rotas /auth do backend:
 *   POST /auth/cadastro         -> cria a conta e devolve { access_token, token_type, usuario }
 *   POST /auth/login            -> devolve { access_token, token_type, usuario }
 *   GET  /auth/me               -> dados do usuário dono do token
 *   POST /auth/recuperar-senha  -> recuperação de senha
 *   POST /auth/redefinir-senha  -> redefine a senha
 *   GET  /auth/google/url       -> URL de autorização e state
 *   POST /auth/google/callback  -> JWT após autorização no Google
 */
import { apiRequest, ApiError } from "./api";

const SESSION_KEY = "makiia.session";
const GOOGLE_OAUTH_KEY = "makiia.google.oauth";
const GOOGLE_STATE_MAX_AGE_MS = 10 * 60 * 1000;

const normalizeEmail = (email) => email.trim().toLowerCase();

function readStorage(storage) {
  try {
    const raw = storage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Sessão salva neste navegador: { token, usuario } ou null. */
export function getSession() {
  return readStorage(localStorage) || readStorage(sessionStorage);
}

export function getToken() {
  return getSession()?.token || null;
}

function saveSession(session, remember) {
  clearSession();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* armazenamento indisponível */
  }
}

/** Cria a conta e já deixa o usuário conectado. */
export async function register(nome, email, senha, { remember = false } = {}) {
  const data = await apiRequest("/auth/cadastro", {
    method: "POST",
    body: { nome: nome.trim(), email: normalizeEmail(email), senha },
  });
  saveSession({ token: data.access_token, usuario: data.usuario }, remember);
  return data.usuario;
}

/** Entra com e-mail e senha. */
export async function login(email, senha, { remember = false } = {}) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { email: normalizeEmail(email), senha },
  });
  saveSession({ token: data.access_token, usuario: data.usuario }, remember);
  return data.usuario;
}

/** Encerra a sessão neste navegador. */
export function logout() {
  clearSession();
}

/** Confere no backend se a sessão salva ainda vale. */
export async function fetchCurrentUser({ signal } = {}) {
  const token = getToken();
  if (!token) return null;
  try {
    return await apiRequest("/auth/me", { token, signal });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearSession();
      return null;
    }
    throw error;
  }
}

/** Pede o token de recuperação de senha. */
export function requestPasswordReset(email) {
  return apiRequest("/auth/recuperar-senha", {
    method: "POST",
    body: { email: normalizeEmail(email) },
  });
}

/** Define uma nova senha usando o token de recuperação. */
export function resetPassword(token, senhaNova) {
  return apiRequest("/auth/redefinir-senha", {
    method: "POST",
    body: { token: token.trim(), senha_nova: senhaNova },
  });
}

/**
 * Inicia o OAuth com Google. O backend gera o state e o frontend guarda
 * a intenção de login no sessionStorage, na mesma origem do callback.
 */
export async function startGoogleLogin({ remember = false } = {}) {
  const data = await apiRequest("/auth/google/url");

  if (typeof data?.url !== "string" || typeof data?.state !== "string" || !data.state) {
    throw new Error("Não foi possível iniciar o login com Google.");
  }

  let url;
  try {
    url = new URL(data.url);
  } catch {
    throw new Error("O servidor retornou uma URL de login inválida.");
  }

  if (url.protocol !== "https:" || url.hostname !== "accounts.google.com") {
    throw new Error("O servidor retornou uma URL de login inválida.");
  }

  sessionStorage.setItem(
    GOOGLE_OAUTH_KEY,
    JSON.stringify({ state: data.state, remember, createdAt: Date.now() }),
  );

  window.location.assign(url.href);
}

/** Limpa uma tentativa de autenticação interrompida. */
export function cancelGoogleLogin() {
  sessionStorage.removeItem(GOOGLE_OAUTH_KEY);
}

/**
 * Conclui o OAuth: valida state local, envia code e state ao backend,
 * busca os dados da pessoa em /auth/me e salva uma sessão normal da MAKIIA.
 */
export async function finishGoogleLogin(code, state) {
  const raw = sessionStorage.getItem(GOOGLE_OAUTH_KEY);
  sessionStorage.removeItem(GOOGLE_OAUTH_KEY);

  let pending = null;
  try {
    pending = raw ? JSON.parse(raw) : null;
  } catch {
    throw new Error("Não foi possível validar a sessão do Google.");
  }

  const age = Date.now() - pending?.createdAt;
  if (
    !pending ||
    typeof state !== "string" ||
    !state ||
    pending.state !== state ||
    !Number.isFinite(age) ||
    age < 0 ||
    age > GOOGLE_STATE_MAX_AGE_MS
  ) {
    throw new Error("Autenticação expirada ou inválida. Tente novamente.");
  }

  const data = await apiRequest("/auth/google/callback", {
    method: "POST",
    body: { code, state },
  });

  if (!data?.access_token) {
    throw new Error("O servidor não retornou um token de autenticação.");
  }

  const usuario = await apiRequest("/auth/me", { token: data.access_token });
  saveSession({ token: data.access_token, usuario }, pending.remember);
  return usuario;
}
