import { useEffect, useMemo, useState } from "react";
import initLanding from "../Home/Main.js";
import SiteNav from "../../components/SiteNav/SiteNav.jsx";
import SiteFooter from "../../components/SiteFooter/SiteFooter.jsx";
import BlogCover from "./BlogCovers.jsx";
import "../Home/Home.css";
import "./Blog.css";

const posts = [
    { id: "makiia-2", category: "Produto", title: "MAKIIA 2: raciocínio criativo estendido chegou", summary: "Entenda o que muda na forma como a IA lê o seu briefing e mantém cada peça coerente com a campanha.", minutes: 4, art: "reasoning", featured: true, issue: "01" },
    { id: "briefing", category: "Branding", title: "Como criar um briefing que a IA entende de verdade", summary: "Um bom projeto começa com uma ideia bem contada.", minutes: 5, art: "briefing" },
    { id: "consistencia", category: "Dicas", title: "Consistência visual do primeiro post à campanha completa", summary: "Faça todas as peças falarem a mesma língua.", minutes: 6, art: "system" },
    { id: "paleta", category: "Branding", title: "Paleta de cores: como escolher a certa para a sua campanha", summary: "Cores que traduzem a personalidade do seu negócio.", minutes: 5, art: "palette" },
    { id: "brand-kit", category: "Dicas", title: "Do logo ao brand kit: o que entregar ao cliente", summary: "Organize os elementos essenciais da sua identidade.", minutes: 7, art: "kit" },
    { id: "formatos", category: "Dicas", title: "Os formatos certos para cada canal", summary: "Escolha dimensões apropriadas para cada publicação.", minutes: 4, art: "formats" },
    { id: "bastidores", category: "Bastidores", title: "Bastidores: como a MAKIIA pensa uma identidade", summary: "Conheça o processo por trás de uma campanha coerente.", minutes: 6, art: "construction" },
];
const categories = ["Todos", "Branding", "Produto", "Dicas", "Bastidores"];

function Artwork({ kind, large = false }) {
    return <div className={`blog-art blog-art--cover${large ? " blog-art--large" : ""}`} aria-hidden="true">
        <BlogCover kind={kind} large={large} />
    </div>;
}

function PostCard({ post, onSelect, index }) {
    return (
        <button type="button" className="blog-card cd" onClick={() => onSelect(post)} aria-label={`Ler ${post.title}`}>
            <div className="blog-card-media"><Artwork kind={post.art} /><span className="blog-art-index">MAKIIA JOURNAL / {String(index + 1).padStart(2, "0")}</span></div>
            <div className="blog-card-body">
                <div className="blog-card-meta"><span className="blog-category">{post.category}</span><span>{post.minutes} min de leitura</span></div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <span className="blog-card-link">Ler matéria <span aria-hidden="true">↗</span></span>
            </div>
        </button>
    );
}

export default function Blog() {
    const [category, setCategory] = useState("Todos");
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");

    useEffect(() => initLanding(), []);
    useEffect(() => {
        if (!selectedPost) return;
        const onEscape = (event) => { if (event.key === "Escape") setSelectedPost(null); };
        window.addEventListener("keydown", onEscape);
        return () => window.removeEventListener("keydown", onEscape);
    }, [selectedPost]);

    const visiblePosts = useMemo(() => posts.filter((post) => {
        const categoryMatches = category === "Todos" || post.category === category;
        const text = `${post.title} ${post.summary} ${post.category}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const term = search.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return categoryMatches && text.includes(term);
    }), [category, search]);

    function selectCategory(cat) {
        setCategory(cat);
        if (cat === "Todos") setSearch("");
        setShowAll(false);
    }

    function resetFilters() {
        setCategory("Todos");
        setSearch("");
        setShowAll(false);
    }

    function handleNewsletter(event) {
        event.preventDefault();
        if (!email.trim()) return;
        setEmailMessage("O formulário está pronto para integração. A assinatura ainda não foi enviada.");
    }

    return <div className="blog-page">
        <canvas id="bg" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <div id="cursor" aria-hidden="true" />
        <div className="progress" aria-hidden="true"><i /></div>

        <SiteNav active="/blog" />

        <main id="top">
            <header className="w hero blog-hero">
                <span className="pill rv"><b>BLOG</b>O universo criativo da MAKIIA</span>
                <h1 data-split>Ideias que inspiram. <span className="gt">Campanhas que ficam.</span></h1>
                <p className="rv" style={{ "--d": ".25s" }}>Um espaço para explorar branding, design e criatividade — com histórias, referências e novas perspectivas.</p>
                <div className="blog-hero-bottom rv" style={{ "--d": ".35s" }}><span>MAKIIA / JOURNAL</span><span>DESIGN · BRANDING · IDEIAS</span><span>EXPLORE ↓</span></div>
            </header>

            <section className="blog-cover-section w" aria-label="Matérias em destaque">
                <div className="blog-section-heading rv"><div><span className="cap ac">EM DESTAQUE / 01</span><h2>Em pauta<span className="blog-heading-dot">.</span></h2></div><span className="blog-section-note">Uma seleção para começar a leitura</span></div>
                <div className="blog-cover-layout">
                    <button className="blog-featured rv" type="button" onClick={() => setSelectedPost(posts[0])}>
                        <Artwork kind={posts[0].art} large />
                        <div className="blog-cover-overlay"><span className="blog-featured-overline">CAPA DA EDIÇÃO <span>01 / 2026</span></span>
                            <div><span className="blog-category">{posts[0].category} · DESTAQUE</span><h2>{posts[0].title}</h2><p>{posts[0].summary}</p><span className="blog-cover-cta">Explorar matéria <span aria-hidden="true">↗</span></span></div>
                        </div>
                    </button>
                    <div className="blog-editor-picks rv" style={{ "--d": ".12s" }}>
                        <div className="blog-picks-heading"><span className="cap ac">LEITURA RECOMENDADA</span><span>02 — 03</span></div>
                        {posts.slice(1, 3).map((post) => <button className="blog-pick" type="button" key={post.id} onClick={() => setSelectedPost(post)}><div className="blog-pick-art"><Artwork kind={post.art} /></div><div><span className="blog-pick-meta">{post.category} / {post.minutes} MIN</span><h3>{post.title}</h3><span className="blog-pick-link">Ler agora ↗</span></div></button>)}
                        <div className="blog-picks-foot"><span>MAKIIA EDITORIAL</span><span>CRIAÇÃO EM MOVIMENTO</span></div>
                    </div>
                </div>
            </section>

            <section className="blog-listing w" aria-label="Publicações do blog">
                <div className="blog-section-heading blog-listing-heading rv"><div><span className="cap ac">ARQUIVO EDITORIAL / 02</span><h2>Últimas <span className="gt">leituras</span></h2></div><span className="blog-section-note">Conteúdo para pensar, descobrir e colocar em prática.</span></div>
                <div className="blog-controls rv">
                    <div className="blog-filters" role="group" aria-label="Filtrar artigos por categoria">{categories.map((cat) => <button type="button" key={cat} className={`blog-filter${category === cat ? " is-active" : ""}`} aria-pressed={category === cat} onClick={() => selectCategory(cat)}>{cat}</button>)}</div>
                    <label className="blog-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 5 5" /></svg><input type="search" value={search} onChange={(e) => { setSearch(e.target.value); setShowAll(false); }} placeholder="Buscar artigos..." aria-label="Buscar no blog" /></label>
                </div>
                <div className="blog-result-line"><span>{visiblePosts.length} {visiblePosts.length === 1 ? "publicação" : "publicações"} no arquivo</span><span>{category === "Todos" ? "TODOS OS TEMAS" : category.toUpperCase()}</span></div>
                <div className="blog-editorial-layout">
                    <div>
                        {visiblePosts.length > 0
                            ? <div className="blog-grid">{(showAll ? visiblePosts : visiblePosts.slice(0, 6)).map((post, i) => <div className="blog-card-wrap blog-card-enter" style={{ "--d": `${(i % 3) * .07}s` }} key={`${category}-${search}-${post.id}`}><PostCard post={post} index={i} onSelect={setSelectedPost} /></div>)}</div>
                            : <div className="blog-empty" role="status">
                                <p>Não há matérias {search.trim() ? <>para “{search.trim()}”</> : <>em {category}</>} por enquanto.</p>
                                <button className="btn pri" type="button" onClick={resetFilters}>Ver todas as matérias</button>
                            </div>}
                        {visiblePosts.length > 0 && <div className="blog-more">
                            <button className="btn mag" type="button" onClick={() => setShowAll(true)} disabled={showAll && visiblePosts.length <= 6}>Carregar mais matérias <span aria-hidden="true">↓</span></button>
                            {showAll && <p className="blog-more-message" role="status">Não há mais matérias por enquanto. Novos conteúdos em breve.</p>}
                        </div>}
                    </div>
                    <aside className="blog-sidebar" aria-label="Explore o blog">
                        <div className="blog-sidebar-panel"><span className="cap ac">EXPLORE POR TEMA</span><h3>Encontre sua próxima ideia.</h3><div className="blog-topic-list">{categories.filter((c) => c !== "Todos").map((cat, i) => <button type="button" key={cat} onClick={() => { setCategory(cat); setSearch(""); setShowAll(false); }}><span>{String(i + 1).padStart(2, "0")} / {cat}</span><span aria-hidden="true">↗</span></button>)}</div></div>
                        <div className="blog-side-quote"><span className="cap ac">NOTAS DE CRIAÇÃO</span><p>Boas campanhas não nascem prontas. Elas ganham forma a cada ideia.</p><span>— MAKIIA JOURNAL</span></div>
                    </aside>
                </div>
            </section>

            <section className="blog-newsletter-section"><div className="w"><div className="grow" data-grow="0.92"><div className="blog-newsletter cta cta-soft">
                <div className="blog-newsletter-kicker"><span className="cap ac">UMA BOA LEITURA NA SUA CAIXA DE ENTRADA</span><span>MAKIIA / LETTER</span></div>
                <div className="blog-newsletter-content"><div><h2>Continue a conversa <span className="gt">fora daqui.</span></h2><p>Ideias, referências e novidades sobre campanhas e criatividade. Sem ruído, só o que vale a leitura.</p></div><div className="blog-newsletter-signup"><form onSubmit={handleNewsletter} className="blog-subscribe"><label className="blog-visually-hidden" htmlFor="blog-email">Seu e-mail</label><input id="blog-email" type="email" required placeholder="Seu melhor e-mail" value={email} onChange={(e) => { setEmail(e.target.value); setEmailMessage(""); }} /><button type="submit" className="btn pri">Quero receber ↗</button></form><span>Uma newsletter editorial. Sem spam.</span>{emailMessage && <p className="blog-form-message" role="status">{emailMessage}</p>}</div></div>
            </div></div></div></section>
        </main>

        <SiteFooter active="/blog" />

        {selectedPost && <div className="blog-dialog-backdrop" onClick={() => setSelectedPost(null)}>
            <div className="blog-dialog" role="dialog" aria-modal="true" aria-labelledby="blog-dialog-title" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="blog-dialog-close" onClick={() => setSelectedPost(null)} aria-label="Fechar">×</button>
                <span className="blog-category">{selectedPost.category}</span><h2 id="blog-dialog-title">{selectedPost.title}</h2><p>{selectedPost.summary}</p>
                <span className="blog-readtime">Leitura estimada: {selectedPost.minutes} min</span>
                <p className="blog-dialog-note">A página completa deste artigo ainda precisa ser cadastrada no blog.</p>
            </div>
        </div>}
    </div>;
}
