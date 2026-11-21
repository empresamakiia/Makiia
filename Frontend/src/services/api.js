/*
 * Cliente HTTP da API da MAKIIA (backend FastAPI).
 *
 * O endereço vem de VITE_API_URL (ver Frontend/.env.example).
 * Sem a variável, usa o backend local padrão: http://localhost:8000.
 */
export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/+$/, "");

/** Erro de uma chamada à API, com mensagem pronta para mostrar na tela. */
export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Mensagens padrão por status, usadas quando o backend não manda uma própria.
const DEFAULT_MESSAGES = {
  0: "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
  401: "Sessão inválida. Entre novamente.",
  422: "Confira os dados informados.",
  500: "O servidor encontrou um erro. Tente novamente em instantes.",
};

// O FastAPI devolve { detail: "texto" } ou, em erros de validação (422),
// { detail: [{ msg, loc }] }. Aqui transformamos isso em uma frase.
function messageFromBody(body, status) {
  const detail = body?.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail) && detail.length) {
    const field = detail[0]?.loc?.[detail[0].loc.length - 1];
    if (field === "email") return "Informe um e-mail válido.";
    if (field === "senha" || field === "senha_nova") return "Confira a senha informada.";
  }
  return DEFAULT_MESSAGES[status] || DEFAULT_MESSAGES[status >= 500 ? 500 : 422];
}

/**
 * Faz uma requisição JSON para a API.
 * @param {string} path  caminho a partir da raiz da API (ex.: "/auth/login")
 * @param {{ method?: string, body?: object, token?: string, signal?: AbortSignal }} options
 */
export async function apiRequest(path, { method = "GET", body, token, signal } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new ApiError(DEFAULT_MESSAGES[0], 0);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(messageFromBody(data, response.status), response.status);
  return data;
}
