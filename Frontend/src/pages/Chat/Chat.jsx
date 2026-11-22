import { useEffect, useRef, useState, useCallback } from "react";

import "./Chat.css";

import AiPicker from "./AiPicker";

import Logo from "../../components/Logo/Logo.jsx";
import { getToken } from "../../services/auth";
import { listConversations, getConversation, createConversation, updateConversation, deleteConversation, addMessage } from "../../services/conversations";





const initialMessages = [

  {

    role: "user",

    text: "Preciso de um logo para a churrascaria Braza. Quero algo quente e moderno.",

  },

  {

    role: "assistant",

    type: "logos",

    text: "Aqui estão três caminhos. Todos usam uma paleta quente derivada do nome, com formas simples que funcionam em tamanho pequeno.",

  },

  {

    role: "user",

    text: "Gostei do anel! Faz um cartaz de lançamento, estilo moderno e acolhedor.",

  },

  {

    role: "assistant",

    type: "poster",

    text: "Pronto. Usei o Braza Anel, a paleta quente e um tom de voz acolhedor. O conceito prioriza contraste e margens.",

  },

];



const logos = [

  { name: "Braza Anel", sub: "Variação A", icon: "ring" },

  { name: "Braza Hex", sub: "Variação B", icon: "hex" },

  { name: "Braza Chama", sub: "Variação C", icon: "flame" },

];

const colors = [

  { name: "Índigo", hex: "#603CFA" },

  { name: "Violeta", hex: "#8551F5" },

  { name: "Magenta", hex: "#C3396A" },

  { name: "Laranja", hex: "#FF884E" },

  { name: "Âmbar", hex: "#FFBD57" },

  { name: "Noite", hex: "#0B0813" },

];

const quickActions = [

  "Criar posts para Instagram",

  "Sugerir slogan",

  "Deixar mais minimalista",

];

const toolOptions = [

  {

    id: "arquivo",

    icon: "clip",

    name: "Anexar arquivo",

    sub: "Documentos, imagens e outros arquivos",

  },

  {

    id: "imagem",

    icon: "image",

    name: "Criar imagem",

    sub: "Conceitos, peças e ilustrações",

  },

  {

    id: "desenho",

    icon: "pen",

    name: "Desenhar",

    sub: "Quadro criativo e esboços",

  },

  {

    id: "pdf",

    icon: "file",

    name: "Criar PDF",

    sub: "Relatórios, propostas e materiais",

  },

  {

    id: "apresentacao",

    icon: "presentation",

    name: "Apresentação",

    sub: "Slides e apresentações de marca",

  },

  {

    id: "plugins",

    icon: "plug",

    name: "Plugins",

    sub: "Explorar integrações disponíveis",

  },

];

const demoPlugins = [

  "Figma",

  "Canva",

  "Google Drive",

  "Notion",

  "Unsplash",

  "Brand Assets",

];



const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");



function readSession() {

  try {

    const raw = sessionStorage.getItem("makiia.session") || localStorage.getItem("makiia.session");

    const session = raw ? JSON.parse(raw) : null;

    return session?.token ? session : null;

  } catch { return null; }

}

function getInitials(name = "") {

  return name.trim().split(/\s+/).slice(0, 2).map(x => x[0]?.toUpperCase()).join("") || "?";

}

const posterSizes = {

  Feed: [1080, 1350],

  Story: [1080, 1920],

  A3: [1191, 1684],

};



function LogoMark({ type = "ring", size = 44 }) {

  if (type === "ring")

    return <span className="mk-ring" style={{ width: size, height: size }} />;

  if (type === "hex")

    return (

      <svg

        width={size}

        height={size}

        viewBox="0 0 64 64"

        fill="none"

        aria-hidden="true"

      >

        <path

          d="M32 6 54 19v26L32 58 10 45V19L32 6Z"

          stroke="currentColor"

          strokeWidth="5"

        />

        <path

          d="m22 33 8 8 14-19"

          stroke="currentColor"

          strokeWidth="4"

          strokeLinecap="round"

        />

      </svg>

    );

  return (

    <svg

      width={size}

      height={size}

      viewBox="0 0 64 64"

      fill="none"

      aria-hidden="true"

    >

      <path

        d="M32 5c7 15 2 17 15 28 13 12 5 27-14 27-21 0-29-18-17-32 2 9 7 12 11 14-3-12 5-21 5-37Z"

        stroke="currentColor"

        strokeWidth="4"

      />

      <path

        d="M31 35c1 7-6 9-5 15 1 9 13 9 14 0 0-6-7-10-9-15Z"

        fill="currentColor"

      />

    </svg>

  );

}



function PosterArt({

  selectedLogo,

  format,

  subtitle = "LANÇAMENTO",

  compact = false,

}) {

  return (

    <div

      className={`mk-poster-art ${compact ? "is-compact" : ""}`}

      style={{

        aspectRatio: `${posterSizes[format][0]} / ${posterSizes[format][1]}`,

      }}

    >

      <div className="mk-poster-center">

        <LogoMark type={logos[selectedLogo].icon} size={compact ? 8 : 26} />

        <strong>Braza</strong>

        <span>{subtitle}</span>

      </div>

    </div>

  );

}



function downloadFile(filename, blob) {

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = filename;

  document.body.appendChild(a);

  a.click();

  a.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);

}



function AppIcon({ name, size = 17 }) {

  const common = {

    width: size,

    height: size,

    viewBox: "0 0 24 24",

    fill: "none",

    stroke: "currentColor",

    strokeWidth: 1.7,

    strokeLinecap: "round",

    strokeLinejoin: "round",

    "aria-hidden": true,

  };

  const paths = {

    plus: <path d="M12 5v14M5 12h14" />,

    download: (

      <>

        <path d="M12 3v12m-4-4 4 4 4-4" />

        <path d="M4 17v3h16v-3" />

      </>

    ),

    send: (

      <>

        <path d="m12 19 0-14m-6 6 6-6 6 6" />

      </>

    ),

    spark: (

      <>

        <path d="m12 2 2 7 7 3-7 2-2 8-3-8-7-2 7-3 3-7Z" />

      </>

    ),

    refresh: (

      <>

        <path d="M20 11a8 8 0 1 1-2-5" />

        <path d="M20 3v6h-6" />

      </>

    ),

    grid: (

      <>

        <rect x="3" y="3" width="7" height="7" rx="1" />

        <rect x="14" y="3" width="7" height="7" rx="1" />

        <rect x="3" y="14" width="7" height="7" rx="1" />

        <rect x="14" y="14" width="7" height="7" rx="1" />

      </>

    ),

    palette: (

      <>

        <circle cx="12" cy="12" r="9" />

        <circle cx="8" cy="9" r="1" />

        <circle cx="14" cy="7" r="1" />

        <circle cx="18" cy="12" r="1" />

        <path d="M12 21a3 3 0 0 1-2-5c1-1 3-1 4 0" />

      </>

    ),

    menu: <path d="M4 7h16M4 12h16M4 17h16" />,

    close: <path d="M5 5 19 19M19 5 5 19" />,

    chevron: <path d="m6 9 6 6 6-6" />,

    clip: (

      <path d="m21 11.5-8.6 8.6a6 6 0 0 1-8.5-8.5L13 2.5a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 0 1-2.8-2.8l8.3-8.3" />

    ),

    image: (

      <>

        <rect x="3" y="3" width="18" height="18" rx="3" />

        <circle cx="8.5" cy="8.5" r="1.5" />

        <path d="m21 16-5.5-5.5L5 21" />

      </>

    ),

    mic: (

      <>

        <rect x="9" y="2" width="6" height="13" rx="3" />

        <path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8" />

      </>

    ),

    file: (

      <>

        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />

        <path d="M13 2v7h7M8 14h8m-8 4h5" />

      </>

    ),

    presentation: (

      <>

        <rect x="3" y="3" width="18" height="13" rx="2" />

        <path d="M12 16v5m-5 0h10M7 8h10m-10 4h7" />

      </>

    ),

    pen: (

      <>

        <path d="m4 20 5-1 11-11a3 3 0 0 0-4-4L5 15l-1 5Z" />

        <path d="m14 6 4 4" />

      </>

    ),

    plug: (

      <>

        <path d="M8 2v6m8-6v6M7 8h10v4a5 5 0 0 1-10 0V8Zm5 9v5" />

      </>

    ),

    sliders: (

      <>

        <path d="M4 7h16M4 17h16" />

        <circle cx="9" cy="7" r="2" fill="#161020" />

        <circle cx="15" cy="17" r="2" fill="#161020" />

      </>

    ),

    check: <path d="m5 12 4 4L19 6" />,

    volume: (

      <>

        <path d="m3 9 4 0 5-4v14l-5-4H3zM16 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12" />

      </>

    ),

    sparkles: (

      <>

        <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" />

        <path d="m19 2 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />

      </>

    ),

  };

  return <svg {...common}>{paths[name]}</svg>;

}



export default function Chat() {

  const [messages, setMessages] = useState(() => readSession()?.token ? [] : initialMessages);

  const [selectedLogo, setSelectedLogo] = useState(0);

  const [format, setFormat] = useState("Feed");

  const [subtitle, setSubtitle] = useState("LANÇAMENTO");

  const [draft, setDraft] = useState("");

  const [activeProject, setActiveProject] = useState("Identidade Braza");

  const [brandOpen, setBrandOpen] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [search, setSearch] = useState("");

  const [notice, setNotice] = useState("");

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const activeRequest = useRef(0);

  const [toolsOpen, setToolsOpen] = useState(false);

  const [modelOpen, setModelOpen] = useState(false);

  const [dialog, setDialog] = useState(null);

  const [selectedModel, setSelectedModel] = useState("gemini");

  const [session, setSession] = useState(readSession);

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);



  const [selectedPlugins, setSelectedPlugins] = useState([]);

  const [demoMode, setDemoMode] = useState("Logo");

  const chatEnd = useRef(null);

  const messageCount = useRef(0);



  // Usa a sessão criada pelo fluxo de login/cadastro, sem inventar usuário ou plano.

  useEffect(() => {

    const current = readSession();

    if (!current?.token) return;

    const controller = new AbortController();

    fetch(`${API_URL}/auth/me`, {

      headers: { Authorization: `Bearer ${current.token}` },

      signal: controller.signal,

    }).then(async response => {

      if (response.status === 401) {

        sessionStorage.removeItem("makiia.session");

        localStorage.removeItem("makiia.session");

        setSession(null);

        return;

      }

      if (response.ok) {

        const usuario = await response.json();

        setSession(old => old ? { ...old, usuario } : null);

      }

    }).catch(() => { });

    return () => controller.abort();

  }, []);





  const handleModelOpen = useCallback((value) => {

    setModelOpen(value);

    if (value) setToolsOpen(false);

  }, []);



  const logout = () => {

    sessionStorage.removeItem("makiia.session");

    localStorage.removeItem("makiia.session");

    window.location.assign("/login");

  };



  useEffect(() => {

    if (messages.length > messageCount.current)

      chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    messageCount.current = messages.length;

  }, [messages]);

  useEffect(() => {

    if (!notice) return;

    const timeout = setTimeout(() => setNotice(""), 3600);

    return () => clearTimeout(timeout);

  }, [notice]);



  // O backend salva conversas e mensagens; nenhuma IA está conectada ainda.
  useEffect(() => {
    if (!session?.token) {
      setConversations([]);
      setActiveConversationId(null);
      return;
    }
    let cancelled = false;
    setHistoryLoading(true);
    listConversations(session.token)
      .then(items => { if (!cancelled) setConversations(items); })
      .catch(error => { if (!cancelled) setNotice(`Histórico: ${error.message}`); })
      .finally(() => { if (!cancelled) setHistoryLoading(false); });
    return () => { cancelled = true; };
  }, [session?.token]);

  async function openConversation(id) {
    if (!session?.token) return;
    const request = ++activeRequest.current;
    setHistoryLoading(true);
    try {
      const data = await getConversation(id, session.token);
      if (request !== activeRequest.current) return;
      setActiveConversationId(data.id_conversa);
      setActiveProject(data.titulo);
      setMessages(data.mensagens.map(m => ({
        role: m.papel === "usuario" ? "user" : "assistant",
        text: m.conteudo,
        id: m.id_mensagem,
      })));
      setMobileMenu(false);
    } catch (error) {
      if (request === activeRequest.current) setNotice(error.message);
    } finally {
      if (request === activeRequest.current) setHistoryLoading(false);
    }
  }

  async function newConversation() {
    if (!getToken()) {
      setNotice("Entre na sua conta para salvar conversas.");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const data = await createConversation({ titulo: "Nova conversa" }, getToken());
      ++activeRequest.current;
      setConversations(old => [data, ...old]);
      setActiveConversationId(data.id_conversa);
      setActiveProject(data.titulo);
      setMessages([]);
      setDraft("");
      setMobileMenu(false);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function renameConversation(conversa) {
    const titulo = window.prompt("Novo título da conversa:", conversa.titulo)?.trim();
    if (!titulo || titulo === conversa.titulo) return;
    try {
      const updated = await updateConversation(conversa.id_conversa, { titulo: titulo.slice(0, 255) }, getToken());
      setConversations(old => old.map(c => c.id_conversa === updated.id_conversa ? updated : c));
      if (activeConversationId === updated.id_conversa) setActiveProject(updated.titulo);
    } catch (error) { setNotice(error.message); }
  }

  async function removeConversation(conversa) {
    if (!window.confirm(`Excluir a conversa "${conversa.titulo}" e todas as suas mensagens?`)) return;
    try {
      await deleteConversation(conversa.id_conversa, getToken());
      setConversations(old => old.filter(c => c.id_conversa !== conversa.id_conversa));
      if (activeConversationId === conversa.id_conversa) {
        ++activeRequest.current;
        setActiveConversationId(null);
        setActiveProject("Nova conversa");
        setMessages([]);
      }
    } catch (error) { setNotice(error.message); }
  }

  const sendMessage = async (content = draft) => {
    const text = content.trim();
    if (!text || loading || historyLoading) return;
    if (!getToken()) {
      setNotice("Entre na sua conta para salvar suas mensagens.");
      return;
    }
    setLoading(true);
    try {
      let id = activeConversationId;
      if (!id) {
        const created = await createConversation({ titulo: text.slice(0, 80) }, getToken());
        id = created.id_conversa;
        setActiveConversationId(id);
        setActiveProject(created.titulo);
        setConversations(old => [created, ...old]);
      } else {
        const current = conversations.find(c => c.id_conversa === id);
        if (current?.titulo === "Nova conversa" && messages.length === 0) {
          const updated = await updateConversation(id, { titulo: text.slice(0, 80) }, getToken());
          setActiveProject(updated.titulo);
          setConversations(old => old.map(c => c.id_conversa === id ? updated : c));
        }
      }
      const saved = await addMessage(id, { papel: "usuario", conteudo: text }, getToken());
      setMessages(old => [...old, { role: "user", text: saved.conteudo, id: saved.id_mensagem }]);
      setDraft("");
      setConversations(old => old.map(c => c.id_conversa === id ? { ...c, data_atualizacao: new Date().toISOString() } : c)
        .sort((a, b) => new Date(b.data_atualizacao) - new Date(a.data_atualizacao)));
      setNotice("Mensagem salva. As respostas das IAs ainda não estão conectadas.");
    } catch (error) {
      setNotice(`Não foi possível salvar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };



  const exportSVG = () => {

    const logo = logos[selectedLogo];

    let shape = '<circle cx="100" cy="90" r="22" fill="white" />';

    if (logo.icon === "hex")

      shape =

        '<polygon points="100,62 124,76 124,104 100,118 76,104 76,76" fill="none" stroke="white" stroke-width="6" />';

    if (logo.icon === "flame")

      shape =

        '<path d="M100 56 C118 84 132 90 124 111 C114 137 76 130 76 105 C76 88 94 81 100 56Z" fill="white" />';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 200 200"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#ff8a4a"/><stop offset="0.52" stop-color="#ce3e76"/><stop offset="1" stop-color="#633afa"/></linearGradient></defs><rect width="200" height="200" rx="24" fill="url(#g)"/>${shape}<text x="100" y="162" fill="white" font-family="Arial,sans-serif" font-size="32" font-weight="bold" text-anchor="middle">Braza</text></svg>`;

    downloadFile(

      "braza-logo.svg",

      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),

    );

    setNotice("Logo SVG exportado.");

  };



  const exportPNG = () => {

    const [w, h] = posterSizes[format];

    const canvas = document.createElement("canvas");

    canvas.width = w;

    canvas.height = h;

    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, w, h);

    grad.addColorStop(0, "#e75167");

    grad.addColorStop(0.35, "#ff914e");

    grad.addColorStop(0.7, "#be397e");

    grad.addColorStop(1, "#6439f8");

    ctx.fillStyle = grad;

    ctx.fillRect(0, 0, w, h);

    ctx.textAlign = "center";

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(w / 2, h * 0.34, 12, 0, 2 * Math.PI);

    ctx.fill();

    ctx.font = `700 ${Math.round(w * 0.16)}px Arial, sans-serif`;

    ctx.fillText("Braza", w / 2, h * 0.55);

    ctx.font = `${Math.round(w * 0.035)}px Arial, sans-serif`;

    ctx.fillText(subtitle, w / 2, h * 0.61);

    canvas.toBlob((blob) => {

      if (blob) {

        downloadFile(`braza-${format.toLowerCase()}.png`, blob);

        setNotice("PNG exportado.");

      }

    }, "image/png");

  };



  const changeText = () => {

    const next = window.prompt("Texto do cartaz:", subtitle);

    if (next !== null && next.trim()) setSubtitle(next.trim().toUpperCase());

  };



  const openDemo = (key) => {

    setToolsOpen(false);

    setDialog(key);

  };

  const togglePlugin = (name) =>

    setSelectedPlugins((old) =>

      old.includes(name) ? old.filter((item) => item !== name) : [...old, name],

    );

  const projectNames = [

    "Identidade Braza",

    "Caramella · Lançamento",

    "Studio Aurora",

  ];

  return (

    <div className="mk-shell">

      {mobileMenu && (

        <button

          className="mk-mobile-backdrop"

          aria-label="Fechar menu"

          onClick={() => setMobileMenu(false)}

        />

      )}

      <aside className={`mk-sidebar ${mobileMenu ? "is-open" : ""}`}>

        <div className="mk-sidebar-top">

          <a className="mk-brand-logo mk-brand-home" href="/" aria-label="MAKIIA, página inicial">

            <Logo size={30} />

            <small>Studio criativo</small>

          </a>

          <button

            className="mk-new-btn"

            onClick={newConversation}
            disabled={loading}

          >

            <AppIcon name="plus" /> Nova conversa

          </button>

          <label className="mk-search">

            <input

              placeholder="Buscar projetos"

              value={search}

              onChange={(e) => setSearch(e.target.value)}

              aria-label="Buscar projetos"

            />

          </label>

        </div>

        {/* Projetos e recentes rolam; topo (logo, nova conversa, busca) e rodapé (conta) ficam fixos */}

        <div className="mk-side-scroll">

          <div className="mk-side-group">

            <p>Projetos de marca</p>

            {projectNames

              .filter((name) => name.toLowerCase().includes(search.toLowerCase()))

              .map((name, i) => (

                <button

                  className={`mk-project ${activeProject === name ? "active" : ""}`}

                  key={name}

                  onClick={() => {

                    setActiveProject(name);

                    setMobileMenu(false);

                    if (name !== "Identidade Braza")

                      setNotice(

                        "Projeto selecionado. Os conteúdos desta demonstração são da marca Braza.",

                      );

                  }}

                >

                  <span className={`mk-project-dot dot-${i}`} />

                  <span>{name}</span>

                </button>

              ))}

          </div>

          <div className="mk-side-group mk-recents">

            <p>Recentes</p>

            {historyLoading && <small>Carregando histórico...</small>}
            {conversations
              .filter(c => c.titulo.toLowerCase().includes(search.toLowerCase()))
              .map(conversa => (
                <div key={conversa.id_conversa} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button
                    type="button"
                    style={{ flex: 1, minWidth: 0, textAlign: "left" }}
                    aria-current={activeConversationId === conversa.id_conversa ? "true" : undefined}
                    onClick={() => openConversation(conversa.id_conversa)}
                  >
                    {conversa.titulo}
                  </button>
                  <button type="button" title="Renomear conversa" aria-label={`Renomear ${conversa.titulo}`} onClick={() => renameConversation(conversa)} style={{ width: "auto", flexShrink: 0 }}>✎</button>
                  <button type="button" title="Excluir conversa" aria-label={`Excluir ${conversa.titulo}`} onClick={() => removeConversation(conversa)} style={{ width: "auto", flexShrink: 0 }}>×</button>
                </div>
              ))}
            {!historyLoading && session?.token && conversations.length === 0 && <small>Nenhuma conversa salva ainda.</small>}
            {!session?.token && <small>Entre na sua conta para ver o histórico.</small>}

          </div>

        </div>

        <div className="mk-sidebar-bottom">

          <div className="mk-side-tools">

            <button

              onClick={() =>

                setNotice("Galeria: funcionalidade a conectar ao backend.")

              }

            >

              <AppIcon name="grid" /> Galeria

            </button>

            <button onClick={() => setBrandOpen(true)}>

              <AppIcon name="palette" /> Brand kit

            </button>

          </div>

          <div className="mk-account-control">

            <button type="button" className="mk-account mk-account-button"

              onClick={() => setAccountMenuOpen(v => !v)}

              aria-expanded={accountMenuOpen} aria-label="Opções da conta">

              <span className="mk-avatar">{getInitials(session?.usuario?.nome)}</span>

              <span className="mk-account-details">

                <strong>{session?.usuario?.nome || "Visitante"}</strong>

                <small>{session?.usuario?.email || "Faça login para continuar"}</small>

              </span>

              <AppIcon name="chevron" size={16} />

            </button>

            {accountMenuOpen && (

              <div className="mk-account-menu">

                {session ? <button type="button" onClick={logout}>Sair da conta</button>

                  : <a href="/login">Entrar na Makiia</a>}

              </div>

            )}

          </div>

        </div>

      </aside>



      <main className="mk-main">

        <header className="mk-header">

          <div className="mk-head-title">

            <button

              className="mk-mobile-menu"

              aria-label="Abrir menu"

              onClick={() => setMobileMenu(true)}

            >

              <AppIcon name="menu" />

            </button>

            <div>

              <strong>{activeProject}</strong>

              <small>Cafeteria · logo, paleta e peças</small>

            </div>

          </div>

          <div className="mk-header-actions">

            <button

              onClick={() => {

                navigator.clipboard

                  ?.writeText(window.location.href)

                  .then(() => setNotice("Link copiado."))

                  .catch(() => setNotice("Não foi possível copiar o link."));

              }}

            >

              <span>↗</span> Compartilhar

            </button>

            <button onClick={exportPNG}>

              <AppIcon name="download" size={13} /> Exportar

            </button>

            <AiPicker

              selectedId={selectedModel}

              open={modelOpen}

              onOpenChange={handleModelOpen}

              onSelect={(model) => {

                setSelectedModel(model.id);

                setNotice(`${model.name} selecionada para visualização. Integração prevista para a próxima sprint.`);

              }}

            />

          </div>

        </header>

        <div className="mk-chat-scroll">

          <div className="mk-chat-content">

            {messages.map((msg, index) => (

              <div key={index} className={`mk-message mk-message-${msg.role}`}>

                {msg.role === "user" ? (

                  <div className="mk-user-bubble">{msg.text}</div>

                ) : (

                  <div className="mk-assistant-block">

                    <div className="mk-thought">

                      <span className="mk-orange-dot" /> Esculpiu por{" "}

                      {msg.type === "logos" ? 9 : 14} segundos <span>⌄</span>

                    </div>

                    <p className="mk-answer">{msg.text}</p>

                    {msg.type === "logos" && (

                      <>

                        <div className="mk-logo-grid">

                          {logos.map((logo, i) => (

                            <button

                              key={logo.name}

                              className={`mk-logo-card ${selectedLogo === i ? "selected" : ""}`}

                              onClick={() => setSelectedLogo(i)}

                            >

                              <div className="mk-logo-canvas">

                                <LogoMark type={logo.icon} />

                              </div>

                              <div className="mk-logo-footer">

                                <strong>{logo.name}</strong>

                                <small>

                                  {selectedLogo === i ? "Escolhido" : logo.sub}

                                </small>

                              </div>

                            </button>

                          ))}

                        </div>

                        <div className="mk-palette-inline">

                          {colors

                            .slice(0, 5)

                            .filter((c) => c.name !== "Violeta")

                            .map((c) => (

                              <span

                                key={c.name}

                                title={c.name}

                                style={{ background: c.hex }}

                              />

                            ))}

                          <small>Paleta Braza</small>

                        </div>

                        <div className="mk-actions">

                          <button

                            className="mk-gradient-button"

                            onClick={() => {

                              setNotice(

                                `${logos[selectedLogo].name} aplicado.`,

                              );

                            }}

                          >

                            Aplicar em cartaz

                          </button>

                          <button

                            onClick={() => setSelectedLogo((i) => (i + 1) % 3)}

                          >

                            <AppIcon name="refresh" size={14} /> Gerar variações

                          </button>

                          <button onClick={exportSVG}>Exportar SVG</button>

                        </div>

                      </>

                    )}

                    {msg.type === "poster" && (

                      <div className="mk-output-card">

                        <PosterArt

                          selectedLogo={selectedLogo}

                          format={format}

                          subtitle={subtitle}

                          compact

                        />

                        <div className="mk-output-data">

                          <strong>

                            Cartaz · {posterSizes[format].join(" × ")}

                          </strong>

                          <p>

                            Formato de {format.toLowerCase()}. Texto legível,

                            logo com respiro e 100% da paleta.

                          </p>

                          <div className="mk-format-options">

                            {Object.keys(posterSizes).map((name) => (

                              <button

                                key={name}

                                className={format === name ? "active" : ""}

                                onClick={() => setFormat(name)}

                              >

                                {name}

                              </button>

                            ))}

                          </div>

                          <div className="mk-actions">

                            <button onClick={changeText}>Trocar texto</button>

                            <button onClick={() => window.print()}>

                              Exportar PDF

                            </button>

                            <button onClick={exportPNG}>Exportar PNG</button>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                )}

              </div>

            ))}

            {loading && (

              <p className="mk-loading">

                Preparando resposta de demonstração...

              </p>

            )}

            <div ref={chatEnd} />

          </div>

        </div>

        <div className="mk-composer-wrap">

          <div className="mk-quick-actions">

            {quickActions.map((action) => (

              <button key={action} onClick={() => sendMessage(action)}>

                {action}

              </button>

            ))}

          </div>

          <form

            className="mk-composer"

            onSubmit={(e) => {

              e.preventDefault();

              sendMessage();

            }}

          >

            <textarea

              rows="2"

              value={draft}

              onChange={(e) => setDraft(e.target.value)}

              onKeyDown={(e) => {

                if (e.key === "Enter" && !e.shiftKey) {

                  e.preventDefault();

                  sendMessage();

                }

              }}

              placeholder="Descreva o que criar ou refine: deixe mais minimalista"

              aria-label="Sua mensagem"

            />

            <div className="mk-compose-bottom">

              <div className="mk-compose-pills">

                <div className="mk-tools-anchor">

                  <button

                    type="button"

                    className={`mk-plus ${toolsOpen ? "is-active" : ""}`}

                    onClick={() => {

                      setToolsOpen((o) => !o);

                      setModelOpen(false);

                    }}

                    aria-label="Abrir ferramentas e anexos"

                    aria-expanded={toolsOpen}

                  >

                    <AppIcon name="plus" size={19} />

                  </button>

                  {toolsOpen && (

                    <div className="mk-tools-menu">

                      <div className="mk-popover-heading">

                        CRIAR E ADICIONAR

                      </div>

                      {toolOptions.map((option) => (

                        <button

                          type="button"

                          key={option.id}

                          className="mk-tool-option"

                          onClick={() => openDemo(option.id)}

                        >

                          <span className="mk-tool-icon">

                            <AppIcon name={option.icon} size={18} />

                          </span>

                          <span>

                            <strong>{option.name}</strong>

                            <small>{option.sub}</small>

                          </span>

                          <span className="mk-demo-tag">Demo</span>

                        </button>

                      ))}

                    </div>

                  )}

                </div>

                <span className="mk-compose-separator" />

                <button

                  className="mk-pill mk-plugin-shortcut"

                  type="button"

                  onClick={() => openDemo("plugins")}

                >

                  <AppIcon name="plug" size={14} /> Plugins

                  {selectedPlugins.length > 0

                    ? ` · ${selectedPlugins.length}`

                    : ""}

                </button>

                {["Logo", "Cartaz", "Post", "Identidade"].map((item) => (

                  <button

                    className={`mk-pill ${demoMode === item ? "active" : ""}`}

                    type="button"

                    key={item}

                    onClick={() => setDemoMode(item)}

                  >

                    {item}

                  </button>

                ))}

              </div>

              <div className="mk-composer-right">

                <button

                  className="mk-icon-action"

                  type="button"

                  onClick={() => openDemo("audio")}

                  aria-label="Abrir opções de áudio"

                  title="Áudio"

                >

                  <AppIcon name="mic" size={19} />

                </button>

                <button

                  type="submit"

                  className="mk-send"

                  disabled={!draft.trim() || loading || historyLoading}

                  aria-label="Enviar mensagem"

                >

                  <AppIcon name="send" size={20} />

                </button>

              </div>

            </div>

          </form>

          <p className="mk-disclaimer">

            "Prévia de interface: as IAs do catálogo ainda não estão conectadas."

          </p>

        </div>

      </main>



      <aside className={`mk-brandkit ${brandOpen ? "is-open" : ""}`}>

        <div className="mk-brand-head">

          <strong>Brand kit</strong>

          <button

            className="mk-brand-close"

            aria-label="Fechar brand kit"

            onClick={() => setBrandOpen(false)}

          >

            <AppIcon name="close" />

          </button>

        </div>

        <section className="mk-brand-card">

          <h3>PALETA</h3>

          <div className="mk-brand-colors">

            {colors.map((c) => (

              <button

                key={c.name}

                style={{

                  background: c.hex,

                  color:

                    c.name === "Noite"

                      ? "#eee"

                      : ["Índigo", "Violeta", "Magenta"].includes(c.name)

                        ? "#fff"

                        : "#201020",

                }}

                onClick={() => {

                  navigator.clipboard?.writeText(c.hex);

                  setNotice(`${c.name}: ${c.hex} copiado.`);

                }}

                title={`Copiar ${c.hex}`}

              >

                {c.name}

              </button>

            ))}

          </div>

        </section>

        <section className="mk-brand-card">

          <h3>TIPOGRAFIA</h3>

          <div className="mk-font-row">

            <strong>Sora Semibold</strong>

            <small>Títulos</small>

          </div>

          <div className="mk-font-row">

            <span>Sora Regular</span>

            <small>Texto</small>

          </div>

          <div className="mk-font-row">

            <span className="mk-light-label">LIGHT</span>

            <small>Legendas</small>

          </div>

        </section>

        <section className="mk-brand-card">

          <h3>TOM DE VOZ</h3>

          <div className="mk-tone">

            <span>Acolhedor</span>

            <span>Moderno</span>

            <span>Direto</span>

          </div>

        </section>

        <section className="mk-brand-card">

          <h3>VERSÕES</h3>

          <div className="mk-versions">

            <div />

            <div />

            <div />

          </div>

        </section>

      </aside>

      {dialog && (

        <div

          className="mk-dialog-overlay"

          onMouseDown={(e) => {

            if (e.target === e.currentTarget) setDialog(null);

          }}

        >

          <section

            className="mk-dialog"

            role="dialog"

            aria-modal="true"

            aria-label="Ferramenta demonstrativa"

          >

            <div className="mk-dialog-header">

              <div className="mk-dialog-title">

                <span className="mk-dialog-emblem">

                  <AppIcon

                    name={

                      dialog === "audio"

                        ? "mic"

                        : toolOptions.find((item) => item.id === dialog)

                          ?.icon || "sparkles"

                    }

                    size={20}

                  />

                </span>

                <div>

                  <strong>

                    {dialog === "audio"

                      ? "Áudio e voz"

                      : toolOptions.find((item) => item.id === dialog)?.name ||

                      "Ferramenta"}

                  </strong>

                  <small>Prévia da funcionalidade · Sem backend</small>

                </div>

              </div>

              <button

                type="button"

                className="mk-icon-action"

                onClick={() => setDialog(null)}

                aria-label="Fechar"

              >

                <AppIcon name="close" size={18} />

              </button>

            </div>

            {dialog === "plugins" ? (

              <>

                <p className="mk-dialog-description">

                  Explore as integrações disponíveis para sua área de criação.

                  Marque quais gostaria de utilizar futuramente.

                </p>

                <div className="mk-plugins-grid">

                  {demoPlugins.map((name) => (

                    <button

                      type="button"

                      key={name}

                      className={`mk-plugin-card ${selectedPlugins.includes(name) ? "selected" : ""}`}

                      onClick={() => togglePlugin(name)}

                    >

                      <span className="mk-plugin-symbol">

                        <AppIcon name="plug" size={19} />

                      </span>

                      <strong>{name}</strong>

                      <small>

                        {selectedPlugins.includes(name)

                          ? "Selecionado"

                          : "Não conectado"}

                      </small>

                      {selectedPlugins.includes(name) && (

                        <span className="mk-selected-check">

                          <AppIcon name="check" size={13} />

                        </span>

                      )}

                    </button>

                  ))}

                </div>

              </>

            ) : dialog === "audio" ? (

              <>

                <p className="mk-dialog-description">

                  Escolha como gostaria de trabalhar com voz. Os recursos abaixo

                  são apenas uma simulação visual.

                </p>

                <div className="mk-demo-tiles">

                  <button

                    type="button"

                    onClick={() =>

                      setNotice(

                        "Gravação de áudio indisponível na demonstração.",

                      )

                    }

                  >

                    <AppIcon name="mic" size={23} />

                    <strong>Gravar mensagem</strong>

                    <small>Capturar e transcrever sua voz</small>

                  </button>

                  <button

                    type="button"

                    onClick={() =>

                      setNotice(

                        "Conversação por voz indisponível na demonstração.",

                      )

                    }

                  >

                    <AppIcon name="volume" size={23} />

                    <strong>Conversa por voz</strong>

                    <small>Falar com a Makiia em tempo real</small>

                  </button>

                </div>

                <div className="mk-demo-sound">

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                  <span />

                </div>

              </>

            ) : dialog === "arquivo" ? (

              <>

                <p className="mk-dialog-description">

                  Visualize como será o envio de arquivos quando o backend

                  estiver conectado.

                </p>

                <div className="mk-drop-zone">

                  <AppIcon name="clip" size={30} />

                  <strong>Arraste um arquivo para cá</strong>

                  <small>PDF, PNG, JPG, DOCX, PPTX e outros formatos</small>

                  <span>Seleção ilustrativa · Upload desativado</span>

                </div>

              </>

            ) : (

              <>

                <p className="mk-dialog-description">

                  Configure uma nova criação para o seu projeto. Esta tela

                  apresenta as opções que estarão disponíveis após a integração.

                </p>

                <div className="mk-demo-preview">

                  <AppIcon

                    name={

                      toolOptions.find((item) => item.id === dialog)?.icon ||

                      "sparkles"

                    }

                    size={35}

                  />

                  <span>Espaço de criação</span>

                  <small>

                    {dialog === "imagem"

                      ? "Geração visual e referências"

                      : dialog === "desenho"

                        ? "Canvas e ferramentas de desenho"

                        : dialog === "pdf"

                          ? "Documentos e exportação"

                          : "Layouts de apresentações e slides"}

                  </small>

                </div>

                <label className="mk-demo-field">

                  Descrição ou instruções

                  <textarea

                    placeholder="Descreva o que deseja criar..."

                    rows="3"

                  />

                </label>

              </>

            )}

            <div className="mk-dialog-footer">

              <span>

                <AppIcon name="spark" size={13} /> Disponível em breve

              </span>

              <button type="button" onClick={() => setDialog(null)}>

                Concluir

              </button>

            </div>

          </section>

        </div>

      )}

      {notice && (

        <div className="mk-toast" role="status">

          {notice}

        </div>

      )}

    </div>

  );

}
