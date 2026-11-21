import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

// Catálogo visual da lista enviada pela equipe. NÃO representa APIs conectadas.
const aiCatalog = [
  { id: "gemini", name: "Google Gemini", category: "Texto", description: "Textos, campanhas e análise de documentos" },
  { id: "deepseek", name: "DeepSeek", category: "Texto", description: "Copywriting, raciocínio e planejamento" },
  { id: "qwen", name: "Qwen", category: "Texto", description: "Textos, classificação e dados estruturados" },
  { id: "groq", name: "Groq", category: "Texto", description: "Plataforma para respostas rápidas com modelos abertos" },
  { id: "flux", name: "FLUX", category: "Imagem", description: "Imagens publicitárias e cenas de produtos" },
  { id: "ideogram", name: "Ideogram", category: "Imagem", description: "Cartazes e imagens que incluem texto" },
  { id: "stable-diffusion", name: "Stable Diffusion", category: "Imagem", description: "Criação e edição de imagens" },
  { id: "kling-ai", name: "Kling AI", category: "Vídeo", description: "Animações e vídeos a partir de imagens" },
  { id: "hailuo-ai", name: "Hailuo AI", category: "Vídeo", description: "Vídeos curtos e cenas cinematográficas" },
  { id: "seedance", name: "SeeDance", category: "Vídeo", description: "Vídeos publicitários com múltiplas cenas" },
  { id: "wan", name: "Wan", category: "Vídeo", description: "Modelos abertos para produção de vídeo" },
  { id: "elevenlabs", name: "ElevenLabs", category: "Áudio", description: "Narração e vozes sintéticas" },
  { id: "sarvam-ai", name: "Sarvam AI", category: "Áudio", description: "Voz, transcrição e idiomas" },
  { id: "capcut", name: "CapCut", category: "Edição", description: "Cortes, legendas e edição de vídeos" },
  { id: "canva-ia", name: "Canva IA", category: "Edição", description: "Designs, apresentações e templates" },
  { id: "remotion", name: "Remotion", category: "Edição", description: "Montagem de vídeos por código e templates" },
];

// Cor e ícone por categoria (paleta da marca)
const CATEGORY_META = {
  Texto: { tone: "text", icon: <path d="M5 6h14M5 11h14M5 16h9" /> },
  Imagem: { tone: "image", icon: <><rect x="4" y="5" width="16" height="14" rx="3" /><circle cx="9.5" cy="10" r="1.6" /><path d="m5 17 5-5 4 4 2-2 3 3" /></> },
  Vídeo: { tone: "video", icon: <><rect x="3.5" y="6" width="12" height="12" rx="3" /><path d="m15.5 10.5 5-3v9l-5-3z" /></> },
  Áudio: { tone: "audio", icon: <path d="M5 10v4M9 7v10M13 4v16M17 8v8M21 11v2" /> },
  Edição: { tone: "edit", icon: <><circle cx="7" cy="7" r="2.6" /><circle cx="7" cy="17" r="2.6" /><path d="M9 8.5 20 17M9 15.5 20 7" /></> },
};
const CATEGORIES = ["Texto", "Imagem", "Vídeo", "Áudio", "Edição"];

// O catálogo é renderizado no <body> (portal): assim não herda regras do cabeçalho do chat
// e o "position: fixed" não fica preso a ancestrais com filtros/transformações.
// No celular ele vira uma gaveta que sobe do rodapé.
const SHEET_QUERY = "(max-width: 660px)";
const subscribeSheet = (callback) => {
  const media = window.matchMedia(SHEET_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const useIsSheet = () => useSyncExternalStore(subscribeSheet, () => window.matchMedia(SHEET_QUERY).matches, () => false);

const normalize = (value) => value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[̀-ͯ]/g, "");

function CategoryIcon({ category, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {CATEGORY_META[category]?.icon}
    </svg>
  );
}

/**
 * Seletor de IA do chat: botão no cabeçalho + catálogo.
 * Desktop: painel suspenso com grupos em duas colunas. Celular: gaveta que sobe do rodapé.
 */
export default function AiPicker({ selectedId, onSelect, open, onOpenChange }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const [anchor, setAnchor] = useState(null);
  const searchRef = useRef(null);
  const isSheet = useIsSheet();
  const selected = aiCatalog.find((model) => model.id === selectedId);

  // Esc fecha; clique fora fecha; o foco vai para a busca ao abrir.
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => { if (event.key === "Escape") onOpenChange(false); };
    const onPointer = (event) => {
      const inside = rootRef.current?.contains(event.target) || panelRef.current?.contains(event.target);
      if (!inside) onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    const focus = window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.clearTimeout(focus);
    };
  }, [open, onOpenChange]);

  // Posição do painel no desktop: logo abaixo do botão, alinhado à direita dele.
  const measureAnchor = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setAnchor({ top: rect.bottom + 10, right: Math.max(16, window.innerWidth - rect.right) });
  };

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", measureAnchor);
    return () => window.removeEventListener("resize", measureAnchor);
  }, [open]);

  function toggle() {
    if (!open) measureAnchor();
    onOpenChange(!open);
  }

  const term = normalize(query.trim());
  const matches = useMemo(
    () => aiCatalog.filter((model) => !term || normalize(`${model.name} ${model.description} ${model.category}`).includes(term)),
    [term],
  );
  const counts = useMemo(() => {
    const result = { Todas: matches.length };
    CATEGORIES.forEach((c) => { result[c] = matches.filter((m) => m.category === c).length; });
    return result;
  }, [matches]);
  const visibleGroups = CATEGORIES
    .filter((c) => category === "Todas" || c === category)
    .map((c) => [c, matches.filter((m) => m.category === c)])
    .filter(([, items]) => items.length);

  const panelStyle = !isSheet && anchor
    ? { top: anchor.top, right: anchor.right, maxHeight: `min(640px, calc(100dvh - ${Math.round(anchor.top) + 16}px))` }
    : undefined;

  function choose(model) {
    onSelect(model);
    onOpenChange(false);
  }

  return (
    <div className={`mk-model-control ai-picker ${open ? "is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className="mk-model mk-model-trigger ai-trigger"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`IA selecionada: ${selected?.name || "nenhuma"}. Abrir catálogo de IAs`}
      >
        <span className={`ai-trigger-icon tone-${CATEGORY_META[selected?.category]?.tone || "text"}`}>
          <CategoryIcon category={selected?.category || "Texto"} size={14} />
        </span>
        <span className="ai-trigger-name">{selected?.name || "Selecionar IA"}</span>
        <svg className="ai-trigger-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && createPortal(
        <div className="ai-layer">
          <button type="button" className="ai-sheet-backdrop" aria-label="Fechar catálogo" onClick={() => onOpenChange(false)} />
          <div className="ai-panel" ref={panelRef} style={panelStyle} role="dialog" aria-modal={isSheet || undefined} aria-label="Catálogo de inteligências artificiais">
            <span className="ai-sheet-grip" aria-hidden="true" />
            <div className="ai-panel-head">
              <div>
                <strong>Escolher IA</strong>
                <small>{aiCatalog.length} IAs em avaliação · prévia de interface</small>
              </div>
              <button type="button" className="ai-close" onClick={() => onOpenChange(false)} aria-label="Fechar catálogo">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>

            <label className="ai-search">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
              <span className="mk-sr-only">Buscar IA</span>
              <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome ou uso (ex.: vídeo, voz, cartaz)" />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca">×</button>
              )}
            </label>

            <div className="ai-filters" role="group" aria-label="Filtrar por categoria">
              {["Todas", ...CATEGORIES].map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`${category === c ? "active" : ""} ${c !== "Todas" ? `tone-${CATEGORY_META[c].tone}` : ""}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  disabled={c !== "Todas" && counts[c] === 0}
                >
                  {c !== "Todas" && <CategoryIcon category={c} size={13} />}
                  {c}
                  <span className="ai-count">{counts[c]}</span>
                </button>
              ))}
            </div>

            <div className="ai-results">
              {visibleGroups.map(([groupName, items]) => (
                <div key={groupName} className="ai-group" role="group" aria-label={groupName}>
                  <h4 className={`tone-${CATEGORY_META[groupName].tone}`}>
                    <CategoryIcon category={groupName} size={13} /> {groupName}
                  </h4>
                  <div className="ai-grid">
                    {items.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        className={`ai-option tone-${CATEGORY_META[model.category].tone} ${selectedId === model.id ? "chosen" : ""}`}
                        onClick={() => choose(model)}
                        aria-pressed={selectedId === model.id}
                      >
                        <span className="ai-monogram" aria-hidden="true">{model.name.slice(0, 1).toUpperCase()}</span>
                        <span className="ai-option-info">
                          <strong>{model.name}</strong>
                          <small>{model.description}</small>
                        </span>
                        {selectedId === model.id && (
                          <svg className="ai-check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {!visibleGroups.length && (
                <p className="ai-empty">
                  Nenhuma IA encontrada para “{query}”.{" "}
                  <button type="button" onClick={() => { setQuery(""); setCategory("Todas"); }}>Ver todas</button>
                </p>
              )}
            </div>

            <p className="ai-footnote">Lista preliminar do documento da equipe. Selecionar uma IA não ativa nenhuma API.</p>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
