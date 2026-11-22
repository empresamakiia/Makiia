// API de conversas da Makiia. O token é obtido do serviço de autenticação.
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

async function request(path, token, options = {}) {
  if (!token) throw new Error("É necessário entrar na Makiia para acessar suas conversas.");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) {
    let detail;
    try { detail = (await response.json()).detail; } catch { /* resposta não JSON */ }
    const message = typeof detail === "string" ? detail : `Erro ${response.status} ao acessar conversas.`;
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export const listConversations = (token) => request("/conversas", token);
export const getConversation = (id, token) => request(`/conversas/${encodeURIComponent(id)}`, token);
export const createConversation = (dados, token) => request("/conversas", token, { method: "POST", body: dados });
export const updateConversation = (id, dados, token) => request(`/conversas/${encodeURIComponent(id)}`, token, { method: "PUT", body: dados });
export const deleteConversation = (id, token) => request(`/conversas/${encodeURIComponent(id)}`, token, { method: "DELETE" });
export const addMessage = (id, dados, token) => request(`/conversas/${encodeURIComponent(id)}/mensagens`, token, { method: "POST", body: dados });
