import { useEffect } from "react";
import initLanding from "../Home/Main.js";
import SiteNav from "../../components/SiteNav/SiteNav.jsx";
import SiteFooter from "../../components/SiteFooter/SiteFooter.jsx";
import CampaignCta from "../../components/CampaignCta/CampaignCta.jsx";
import "../Home/Home.css";
import "./Sobre.css";

const TIPS = [
    {
        title: "Diga do que se trata a campanha",
        text: "Conte o objetivo e com quem ela fala.",
        example: "Lançamento do café gelado para universitários.",
        grad: "linear-gradient(135deg,#5B3CF5,#C73A68)",
        icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" /></>,
    },
    {
        title: "Descreva o clima",
        text: "Use palavras como quente, sério, divertido ou minimalista.",
        example: "Algo leve, com cores quentes e bem-humorado.",
        grad: "linear-gradient(135deg,#C73A68,#FF8A4C)",
        icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    },
    {
        title: "Peça uma coisa por vez",
        text: "Comece pelo logo e depois avance para cartazes e posts.",
        example: "Primeiro o logo. Depois, um post de lançamento.",
        grad: "linear-gradient(135deg,#7B4DFF,#5B3CF5)",
        icon: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h1M4 12h1M4 18h1" /></>,
    },
    {
        title: "Refine em frases curtas",
        text: "Pequenos ajustes funcionam melhor do que recomeçar.",
        example: "Aumente o título e troque o fundo para creme.",
        grad: "linear-gradient(135deg,#FF8A4C,#C73A68)",
        icon: <><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>,
    },
];

export default function Sobre() {
    // Mesmo motor da landing: fundo animado, cursor, progresso, navbar, reveals, cards e botões magnéticos.
    useEffect(() => initLanding(), []);

    // Linha do tempo dos passos.
    useEffect(() => {
        const calm = document.documentElement.classList.contains("calm");
        const timeline = document.querySelector(".sobre-doc .steps");
        const steps = [...document.querySelectorAll(".sobre-doc .steps li")];
        let raf = 0;

        function update() {
            raf = 0;
            const h = window.innerHeight;
            if (timeline) {
                const r = timeline.getBoundingClientRect();
                const p = calm ? 1 : Math.max(0, Math.min(1, (h * .7 - r.top) / Math.max(1, r.height)));
                timeline.style.setProperty("--p", String(p));
                steps.forEach((step, i) => step.classList.toggle("on", calm || p > i / steps.length * .95 + .01));
            }
        }

        const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        update();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
        };
    }, []);

    return (
        <>
            <canvas id="bg" aria-hidden="true"></canvas>
            <div className="grid-bg" aria-hidden="true"></div>
            <div id="cursor" aria-hidden="true"></div>
            <div className="progress" aria-hidden="true"><i></i></div>

            <SiteNav active="/sobre" />

            <main id="top">

                <header className="w hero sobre-hero">
                    <span className="pill rv"><b>GUIA</b>Entenda a MAKIIA em poucos minutos</span>
                    <h1 data-split>
                        Tudo para entender e começar a usar a <span className="gt">MAKIIA</span>
                    </h1>
                    <p className="rv" style={{ "--d": ".35s" }}>
                        O que ela é, para que serve e como usar, do primeiro briefing ao arquivo final.
                    </p>
                </header>

                <div className="w sobre-doc">
                    <article>
                        <section id="oque" className="rv">
                            <span className="cap ac">O que é</span>
                            <h2>Uma IA criativa para quem constrói campanhas</h2>
                            <p>A <b>MAKIIA</b> é uma ferramenta de criação por conversa. Em vez de abrir um editor e começar do zero, você descreve o que precisa e ela entrega logos, cartazes, posts e identidade visual.</p>
                            <p>Cada peça nasce do seu briefing e segue a mesma linguagem da campanha: paleta, tipografia e regras de uso combinam entre si, do primeiro post à campanha completa.</p>
                            <p>Ela não substitui o olhar de quem cria. A MAKIIA cuida do trabalho repetitivo, como variações, formatos e ajustes, para você ter mais tempo de decidir, refinar e contar boas histórias de campanha.</p>
                        </section>

                        <section id="proposito">
                            <div className="rv">
                                <span className="cap ac">Propósito</span>
                                <h2>Campanha consistente ao alcance de todo mundo</h2>
                                <p>Muita gente tem uma boa ideia de campanha e esbarra no mesmo problema: criar uma identidade visual leva tempo e, conforme as peças se multiplicam, a coerência se perde.</p>
                                <div className="quote">“Dar a qualquer campanha acesso a uma identidade visual consistente e bonita, sem depender de semanas de produção.”</div>
                            </div>
                            <div className="trio">
                                <div className="cell rv"><div className="cd tilt">
                                    <div className="ic" style={{ background: "linear-gradient(135deg,#5B3CF5,#C73A68)" }}>
                                        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
                                    </div>
                                    <h3>Menos retrabalho</h3>
                                    <p>Variações e formatos saem da mesma conversa.</p>
                                </div></div>
                                <div className="cell rv" style={{ "--d": ".1s" }}><div className="cd tilt">
                                    <div className="ic" style={{ background: "linear-gradient(135deg,#C73A68,#FF8A4C)" }}>
                                        <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="m9 12 2 2 4-4"></path></svg>
                                    </div>
                                    <h3>Campanha coerente</h3>
                                    <p>Cada peça mantém a identidade do projeto.</p>
                                </div></div>
                                <div className="cell rv" style={{ "--d": ".2s" }}><div className="cd tilt">
                                    <div className="ic" style={{ background: "linear-gradient(135deg,#7B4DFF,#5B3CF5)" }}>
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path></svg>
                                    </div>
                                    <h3>Mais tempo para criar</h3>
                                    <p>Você decide e refina, a IA cuida do repetitivo.</p>
                                </div></div>
                            </div>
                        </section>

                        <section id="quem" className="rv">
                            <span className="cap ac">Para quem é</span>
                            <h2>Para quem cria e para quem precisa criar</h2>
                            <p>A MAKIIA foi pensada para <b>designers</b> e <b>times de marketing</b> que lidam com muitas peças e pouco tempo, e também para <b>pequenos negócios</b> e quem está abrindo uma campanha e ainda não tem identidade visual.</p>
                            <p>Se você já desenha, ganha velocidade para explorar caminhos e entregar formatos. Se não desenha, consegue chegar a um resultado profissional apenas conversando.</p>
                        </section>

                        <section id="como">
                            <div className="rv">
                                <span className="cap ac">Como usar</span>
                                <h2>Do briefing ao arquivo final em cinco passos</h2>
                            </div>
                            <ol className="steps">
                                <li className="rv"><h3>Crie sua conta e abra um projeto</h3><p>Cada campanha vira um projeto, com histórico e peças reunidos no mesmo lugar.</p></li>
                                <li className="rv"><h3>Conte o briefing</h3><p>Escreva com suas palavras o que precisa: o negócio, o público e o clima que você quer. Por exemplo, um logo e um cartaz para uma cafeteria, algo quente e moderno.</p></li>
                                <li className="rv"><h3>Escolha um caminho</h3><p>A MAKIIA mostra alguns conceitos com a mesma base de campanha. Escolha o que mais combina com a sua ideia.</p></li>
                                <li className="rv"><h3>Refine conversando</h3><p>Peça ajustes como falaria com uma pessoa: deixe mais minimalista, troque a cor, mude o formato.</p></li>
                                <li className="rv"><h3>Exporte onde precisar</h3><p>Baixe em PNG, SVG ou PDF, nos tamanhos certos para gráfica ou redes sociais.</p></li>
                            </ol>
                        </section>

                        <section id="criar" className="rv">
                            <span className="cap ac">O que criar</span>
                            <h2>Peças para cada canal</h2>
                            <p>Logos, identidade visual completa, cartazes, posts e banners. Você também pode criar versões da mesma peça e descobrir qual funciona melhor.</p>
                            <p>Formatos de exportação e tamanhos mais usados:</p>
                            <div className="pills"><span>PNG</span><span>SVG</span><span>PDF</span><span>1080×1350</span><span>STORY</span><span>A3</span></div>
                        </section>

                        <section id="briefing">
                            <div className="rv">
                                <span className="cap ac">Boas práticas</span>
                                <h2>Como escrever um briefing que a IA entende</h2>
                            </div>
                            <div className="tips">
                                {TIPS.map((tip, i) => (
                                    <div className="cell rv" style={{ "--d": `${(i % 2) * .1}s` }} key={tip.title}>
                                        <div className="cd tilt tip">
                                            <div className="tip-head">
                                                <span className="tip-ic" style={{ background: tip.grad }}>
                                                    <svg viewBox="0 0 24 24" aria-hidden="true">{tip.icon}</svg>
                                                </span>
                                                <span className="tip-n">{String(i + 1).padStart(2, "0")}</span>
                                            </div>
                                            <h3>{tip.title}</h3>
                                            <p>{tip.text}</p>
                                            <div className="tip-ex">
                                                <span className="tip-ex-label">Exemplo</span>
                                                <span className="tip-ex-msg">“{tip.example}”</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </article>
                </div>

                <CampaignCta />
            </main>

            <SiteFooter active="/sobre" />
        </>
    );
}
