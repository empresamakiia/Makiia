// Adaptador para o backend de IA. Configure caminhos REAIS em Frontend/.env.
// Não pressupõe que a API do João já possui endpoints para modelos ou inferência.
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
const MODELS_PATH = import.meta.env.VITE_CHAT_MODELS_PATH || '';
const SEND_PATH = import.meta.env.VITE_CHAT_SEND_PATH || '';
export const chatApiConfigured = Boolean(MODELS_PATH && SEND_PATH);

async function request(path, options = {}, token) {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Configure um caminho de API válido iniciado por /.');
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch { throw new Error('Não foi possível conectar ao servidor da IA.'); }
  if (!response.ok) {
    if (response.status === 401) throw new Error('Sessão expirada ou não autorizada. Entre novamente.');
    if (response.status === 404) throw new Error('Endpoint de IA não encontrado. Confirme a rota com o João.');
    throw new Error(`Erro na API de IA (${response.status}).`);
  }
  return response.json();
}

export async function fetchChatModels(token) {
  if (!chatApiConfigured) throw new Error('Configure VITE_CHAT_MODELS_PATH e VITE_CHAT_SEND_PATH no .env.');
  const data = await request(MODELS_PATH, {}, token);
  // Formatos suportados: [{id,nome}], {modelos:[...]}, ou {models:[...]}.
  const items = Array.isArray(data) ? data : (data.modelos || data.models || []);
  return items.filter(x => x && (x.id || x.codigo)).map(x => ({
    id: String(x.id || x.codigo),
    name: x.nome || x.name || String(x.id || x.codigo),
    description: x.descricao || x.description || '',
  }));
}

export async function sendChatPrompt({ text, modelId, reasoning, token }) {
  if (!chatApiConfigured) throw new Error('A integração com a IA ainda não foi configurada.');
  // CONTRATO PROPOSTO: ajustar campos ao schema real do backend antes de ativar.
  const data = await request(SEND_PATH, {
    method: 'POST',
    body: JSON.stringify({ mensagem: text, modelo_id: modelId, nivel_raciocinio: reasoning }),
  }, token);
  const answer = data.resposta ?? data.response ?? data.message;
  if (typeof answer !== 'string' || !answer.trim()) throw new Error('Formato de resposta inesperado da API.');
  return answer;
}
