import { useEffect, useMemo, useRef, useState } from "react";
import initLanding from "../Home/Main.js";
import SiteNav from "../../components/SiteNav/SiteNav.jsx";
import SiteFooter from "../../components/SiteFooter/SiteFooter.jsx";
import AjudaArt from "./AjudaArt.jsx";
import "../Home/Home.css";
import "./Ajuda.css";

const QUESTIONS = [
    {
        "category": "inicio",
        "question": "O que é a MAKIIA?",
        "answer": "A MAKIIA é uma IA criativa para quem constrói campanhas: logos, identidade visual e peças saem de uma só conversa, sem semanas de produção."
    },
    {
        "category": "inicio",
        "question": "Como eu começo?",
        "answer": "Clique em “Começar grátis”, crie sua conta e descreva sua campanha ou ideia no chat. A MAKIIA pergunta o que precisar antes de desenhar."
    },
    {
        "category": "criar",
        "question": "Preciso ter um briefing pronto?",
        "answer": "Não. Conte o que você já tem, mesmo que seja só uma ideia. A MAKIIA faz perguntas para entender a campanha antes de criar."
    },
    {
        "category": "criar",
        "question": "Posso pedir ajustes no resultado?",
        "answer": "Sim. Continue a conversa pedindo mudanças de cor, estilo ou composição. Cada ajuste parte da versão anterior."
    },
    {
        "category": "pecas",
        "question": "Dá para criar outras peças além do logo?",
        "answer": "Dá. Com a identidade definida, você pede novas peças na mesma conversa e elas seguem o padrão da campanha."
    },
    {
        "category": "pecas",
        "question": "A identidade se mantém entre as peças?",
        "answer": "A MAKIIA usa a identidade criada na conversa como base, para que cores, tipografia e estilo continuem coerentes em cada peça."
    },
    {
        "category": "arquivos",
        "question": "Como baixo os arquivos?",
        "answer": "Os arquivos saem prontos para usar. Os formatos disponíveis aparecem na tela de download da sua conversa."
    },
    {
        "category": "arquivos",
        "question": "Posso usar o que criei comercialmente?",
        "answer": "Consulte os Termos de uso para ver os detalhes de licença e de direitos sobre o que você cria."
    },
    {
        "category": "conta",
        "question": "Como funcionam os planos?",
        "answer": "Você pode começar grátis. Na página de Planos, compare o que cada opção inclui e escolha a que combina com o seu momento."
    },
    {
        "category": "conta",
        "question": "Como altero meus dados de acesso?",
        "answer": "Entre na sua conta e abra as configurações de perfil para atualizar e-mail e senha."
    },
    {
        "category": "privacidade",
        "question": "Meus briefings e arquivos ficam privados?",
        "answer": "Tratamos seus dados conforme a Política de Privacidade. Leia o documento para saber como armazenamos e usamos o seu conteúdo."
    }
];
const TOPICS = [
    {
        "category": "inicio",
        "title": "Primeiros passos",
        "description": "Crie sua conta, conheça a interface e comece a primeira conversa."
    },
    {
        "category": "criar",
        "title": "Criação de campanha",
        "description": "Logos, paleta e identidade visual a partir de um briefing simples."
    },
    {
        "category": "pecas",
        "title": "Peças e formatos",
        "description": "Materiais para cada canal, sempre no padrão visual da campanha."
    },
    {
        "category": "arquivos",
        "title": "Arquivos e exportação",
        "description": "Baixe tudo pronto para usar e mantenha suas versões organizadas."
    },
    {
        "category": "conta",
        "title": "Conta e planos",
        "description": "Plano, acesso à conta e como começar de graça."
    },
    {
        "category": "privacidade",
        "title": "Privacidade e segurança",
        "description": "Como tratamos seus dados, briefings e arquivos."
    }
];
const FILTERS = [
    ["all", "Todos"], ["inicio", "Primeiros passos"],
    ["criar", "Criação de campanha"], ["pecas", "Peças e formatos"],
    ["arquivos", "Arquivos"], ["conta", "Conta e planos"],
    ["privacidade", "Privacidade"],
];
const norm = (value) => value.toLocaleLowerCase("pt-BR")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function Symbol({ type }) {
    const paths = {
        inicio: <><path d="M5 19c1-5 4-8 9-9M14 10l-1-5 6 1-1 6-4-2z" /><path d="M5 19l3-1-2-2z" /></>,
        criar: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
        pecas: <path d="M4 7h16M4 12h10M4 17h6" />,
        arquivos: <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />,
        conta: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1-4 4-6 8-6s7 2 8 6" /></>,
        privacidade: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
        mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 8 9 6 9-6" /></>,
    };
    return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

export default function Ajuda() {
    const [category, setCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [opened, setOpened] = useState(0);
    const inputRef = useRef(null);
    const faqRef = useRef(null);

    useEffect(() => {
        const cleanup = initLanding();
        return () => { if (typeof cleanup === "function") cleanup(); };
    }, []);

    useEffect(() => {
        const onKey = (event) => {
            const tag = document.activeElement?.tagName;
            if (event.key === "/" && !event.ctrlKey && !event.metaKey &&
                tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const matches = useMemo(() => QUESTIONS.map((item, i) => ({ ...item, index: i }))
        .filter(item => (category === "all" || item.category === category) &&
            (!search.trim() || norm(item.question + " " + item.answer).includes(norm(search.trim())))),
        [category, search]);

    // Resultados da busca no topo (procura em todas as categorias).
    const term = search.trim();
    const searchResults = useMemo(() => !term ? [] : QUESTIONS.map((item, i) => ({ ...item, index: i }))
        .filter(item => norm(item.question + " " + item.answer).includes(norm(term))), [term]);

    const scrollToFaq = () =>
        requestAnimationFrame(() => faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

    // Filtros e tópicos: filtram a lista, abrem a primeira pergunta e levam até ela.
    const chooseTopic = (nextCategory) => {
        setCategory(nextCategory);
        setSearch("");
        const nextIndex = nextCategory === "all" ? 0 : QUESTIONS.findIndex(q => q.category === nextCategory);
        setOpened(nextIndex >= 0 ? nextIndex : null);
        scrollToFaq();
    };

    const resetAll = () => {
        setCategory("all");
        setSearch("");
        setOpened(0);
    };

    const openResult = (index) => {
        setCategory("all");
        setOpened(index);
        scrollToFaq();
    };

    const filterLabel = FILTERS.find(([id]) => id === category)?.[1] ?? "Todos";

    return (
        <div className="ajuda-page">
            <canvas id="bg" aria-hidden="true" />
            <div className="grid-bg" aria-hidden="true" />
            <div id="cursor" aria-hidden="true" />
            <div className="progress" aria-hidden="true"><i /></div>

            <SiteNav active="/ajuda" />

            <main id="top" className="ajuda-main">
                <header className="w hero ajuda-hero">
                    <span className="pill rv"><b>AJUDA</b>Central de ajuda da MAKIIA</span>
                    <h1 data-split>Como podemos<br />te <span className="gt">ajudar</span>?</h1>
                    <p className="rv" style={{ "--d": ".15s" }}>Respostas rápidas sobre a MAKIIA, do primeiro acesso aos arquivos prontos para usar.</p>
                    <label className="ajuda-search rv">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" /></svg>
                        <input ref={inputRef} type="search" aria-label="Buscar dúvidas" placeholder="Buscar uma dúvida, ex.: exportar arquivos" autoComplete="off" value={search} onChange={e => { setSearch(e.target.value); setCategory("all"); }}
                            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (searchResults[0]) openResult(searchResults[0].index); else scrollToFaq(); } }} />
                        <kbd>/</kbd>
                    </label>
                    {term && <div className="ajuda-search-results" role="status" aria-live="polite">
                        {searchResults.length > 0 ? <>
                            <span className="ajuda-search-count">{searchResults.length} {searchResults.length === 1 ? "resultado" : "resultados"} para “{term}”</span>
                            {searchResults.slice(0, 5).map(item => <button type="button" key={item.index} onClick={() => openResult(item.index)}>
                                <span>{item.question}</span><span aria-hidden="true">→</span>
                            </button>)}
                        </> : <div className="ajuda-search-empty">
                            <strong>Nada encontrado para “{term}”</strong>
                            <p>Ainda não temos conteúdo sobre isso. Tente outra palavra ou <a href="/contato">fale com a equipe</a>.</p>
                            <button type="button" className="btn sm" onClick={resetAll}>Limpar busca</button>
                        </div>}
                    </div>}
                    <div className="ajuda-filters rv" aria-label="Filtrar perguntas por categoria">
                        {FILTERS.map(([id, label]) => <button type="button" key={id} className={`ajuda-chip ${category === id ? "selected" : ""}`} aria-pressed={category === id} onClick={() => chooseTopic(id)}>{label}</button>)}
                    </div>
                </header>

                <div className="w">
                    <section className="ajuda-topics" aria-label="Tópicos de ajuda">
                        {TOPICS.map((topic, i) => <button type="button" key={topic.category} className="ajuda-topic cd rv" style={{ "--d": `${(i % 3) * .08}s` }} onClick={() => chooseTopic(topic.category)}>
                            <span className={`ajuda-icon ${i % 2 ? "warm" : ""}`}><Symbol type={topic.category} /></span>
                            <h3>{topic.title}</h3><p>{topic.description}</p>
                            <span className="ajuda-topic-more">Ver perguntas <span aria-hidden="true">→</span></span>
                        </button>)}
                    </section>

                    <section className="ajuda-faq-section" id="faq" ref={faqRef}>
                        <div className="ajuda-faq-heading rv">
                            <div><span className="cap ac">Perguntas frequentes</span><h2>As dúvidas mais <span className="gt">comuns</span></h2></div>
                            <p>Não achou o que procurava? Use a busca ou fale direto com a equipe.</p>
                        </div>
                        <div className="ajuda-faq-layout">
                            <div className="ajuda-faq-panel rv">
                                <div className="ajuda-faq-status">
                                    <span>{matches.length} {matches.length === 1 ? "pergunta" : "perguntas"} · {term ? <>busca “{term}”</> : filterLabel}</span>
                                    {(category !== "all" || term) && <button type="button" onClick={resetAll}>Ver todas</button>}
                                </div>
                                {matches.map(item => <div className={`ajuda-qa ${opened === item.index ? "open" : ""}`} key={item.index}>
                                    <button type="button" aria-expanded={opened === item.index} aria-controls={`ajuda-answer-${item.index}`} onClick={() => setOpened(opened === item.index ? null : item.index)}>
                                        <span>{item.question}</span><span className="ajuda-toggle" aria-hidden="true" />
                                    </button>
                                    <div className="ajuda-answer" id={`ajuda-answer-${item.index}`}><div><p>{item.answer}</p></div></div>
                                </div>)}
                                {matches.length === 0 && <div className="ajuda-empty"><strong>Nada encontrado</strong><p>Ainda não temos conteúdo sobre isso. Tente outra palavra ou <a href="/contato">fale com a equipe</a>.</p><button type="button" className="btn sm pri" onClick={resetAll}>Ver todas as perguntas</button></div>}
                            </div>
                            <aside className="ajuda-aside">
                                <div className="ajuda-aside-card cd rv"><h3>Guia rápido</h3><div className="ajuda-steps">
                                    <div><span>1</span><div><h4>Descreva a ideia</h4><p>Conte sobre a campanha no chat, do seu jeito.</p></div></div>
                                    <div><span>2</span><div><h4>Refine a conversa</h4><p>Peça ajustes até chegar no resultado ideal.</p></div></div>
                                    <div><span>3</span><div><h4>Baixe e use</h4><p>Receba os arquivos prontos para usar.</p></div></div>
                                </div></div>
                                <a href="/contato" className="ajuda-aside-card ajuda-mail cd rv"><span className="ajuda-icon warm"><Symbol type="mail" /></span><span><strong>Falar com a equipe</strong><small>contato@makiia.com</small></span></a>
                                <div className="ajuda-art rv" aria-hidden="true"><AjudaArt /><small>Dúvida / Resposta / Ação</small><strong>Uma dúvida.<br />Uma resposta.</strong></div>
                            </aside>
                        </div>
                    </section>
                    <section className="ajuda-cta-section"><div className="grow" data-grow="0.92"><div className="cta cta-x">
                        <div className="cta-x-body">
                            <span className="pill"><b>EQUIPE</b>Fale com quem faz a MAKIIA</span>
                            <h2>Ainda com <span className="gt">dúvida</span>?</h2>
                            <p>Conte o que você precisa e a gente responde.</p>
                            <div className="row"><a className="btn pri mag" href="/contato">Falar com a gente</a><a className="btn mag" href="/blog">Ver o blog</a></div>
                        </div>
                    </div></div></section>
                </div>
            </main>

            <SiteFooter active="/ajuda" />
        </div>
    );
}
