/*
 * Autenticação da MAKIIA, ligada às rotas /auth do backend:
 *   POST /auth/login            -> { access_token, token_type, usuario }
 *   GET  /auth/me               -> dados do usuário dono do token
 *   POST /auth/recuperar-senha  -> envia o token de recuperação (em dev, aparece no console do backend)
 *   POST /auth/redefinir-senha  -> troca a senha usando esse token
 */
import { apiRequest, ApiError } from "./api";

const SESSION_KEY = "makiia.session";

function readStorage(storage) {
  try {
    const raw = storage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Sessão salva neste navegador: { token, usuario } ou null.
 * "Manter conectado" grava no localStorage; sem a opção, no sessionStorage
 * (a sessão acaba quando o navegador é fechado).
 */
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
    /* armazenamento indisponível (ex.: modo privado restrito) */
  }
}

/** Entra com e-mail e senha. Devolve o usuário autenticado. */
export async function login(email, senha, { remember = false } = {}) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { email: email.trim(), senha },
  });
  saveSession({ token: data.access_token, usuario: data.usuario }, remember);
  return data.usuario;
}

/** Encerra a sessão neste navegador. */
export function logout() {
  clearSession();
}

/**
 * Confere no backend se a sessão salva ainda vale.
 * Devolve o usuário, ou null (sem sessão / token expirado — nesse caso a sessão é limpa).
 * Se o backend estiver fora do ar, propaga o ApiError (status 0).
 */
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

/** Pede o token de recuperação de senha para o e-mail informado. */
export function requestPasswordReset(email) {
  return apiRequest("/auth/recuperar-senha", {
    method: "POST",
    body: { email: email.trim() },
  });
}

/** Define uma nova senha usando o token de recuperação. */
export function resetPassword(token, senhaNova) {
  return apiRequest("/auth/redefinir-senha", {
    method: "POST",
    body: { token: token.trim(), senha_nova: senhaNova },
  });
}
