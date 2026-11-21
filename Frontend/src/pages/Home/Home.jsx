import { useEffect } from "react";
import initLanding from "./Main.js";
import Logo from "../../components/Logo/Logo.jsx";
import SiteNav from "../../components/SiteNav/SiteNav.jsx";
import SiteFooter from "../../components/SiteFooter/SiteFooter.jsx";
import CampaignCta from "../../components/CampaignCta/CampaignCta.jsx";
import "./Home.css";
import "./Home-poster.css";
import "./HomeArt.css";
import {
  BeanMark, SealMark, CupMark, PosterStamp, LogoShowcase, IdentityBoard,
  StepBriefing, StepConcept, StepIdentity, StepPieces, PraticaArt,
} from "./HomeArt.jsx";
import brasaPosterBg from "../../assets/brasa-poster-bg.png";


export default function Home() {
  useEffect(() => initLanding(), []);

  return (
    <>
      <canvas id="bg" aria-hidden="true"></canvas>
      <div className="grid-bg" aria-hidden="true"></div>
      <div id="cursor" aria-hidden="true"></div>
      <div className="progress" aria-hidden="true">
        <i></i>
      </div>

      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B3CF5" />
            <stop offset=".5" stopColor="#C73A68" />
            <stop offset="1" stopColor="#FF8A4C" />
          </linearGradient>
        </defs>
      </svg>

      <SiteNav active="/" />

      <main id="top">
        <header className="w hero">
          <span className="pill rv">
            <b>NOVO</b>MAKIIA 2 com raciocínio criativo estendido
          </span>
          <h1 data-split>
            Sua campanha, criada na velocidade da{" "}
            <span className="gt">ideia</span>
          </h1>
          <p className="rv" style={{ "--d": ".35s" }}>
            Gere logos, cartazes e identidade visual conversando. A MAKIIA
            entende o seu briefing e mantém cada peça coerente com a campanha.
          </p>
          <div className="row rv" style={{ "--d": ".45s" }}>
            <a className="btn pri mag" href="/login#cadastro">
              Começar a criar
            </a>
            <a className="btn mag" href="#pratica">
              ▶ Ver em ação
            </a>
          </div>

          <div className="stage" id="stage">
            <div className="grow" data-grow="0.86">
              <div className="win" id="win">
                <div className="dots">
                  <div
                    className="traffic"
                    aria-label="Controles ilustrativos de janela macOS"
                  >
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                  <span>MAKIIA · STUDIO / GRÃO & PROSA</span>
                </div>
                <div className="wb">
                  <div className="sd">
                    <div className="on">Grão & Prosa</div>
                    <div>Caramella</div>
                    <div>Studio Aurora</div>
                    <div>Posts Black Friday</div>
                  </div>
                  <div className="ct">
                    <div className="me">
                      <span
                        id="typed"
                        data-text="Preciso de um logo e um cartaz para a cafeteria Grão & Prosa. Quero um cartaz acolhedor para divulgar os cafés especiais e os métodos da casa."
                      ></span>
                      <i className="caret"></i>
                    </div>
                    <div className="ai seq" data-step="1">
                      <span className="coffee-assistant-mark" aria-hidden="true">
                        <Logo size={16} showName={false} />
                      </span>
                      <div>
                        <span className="rs" id="rs">
                          Esculpindo…
                        </span>
                        <div className="t">
                          Três ideias de símbolo para a identidade: um grão, um selo e uma xícara.
                        </div>
                        <div className="chips" aria-label="Três conceitos de símbolo para a cafeteria">
                          <button className="chip-option is-selected" type="button" aria-label="Conceito Grão">
                            <span className="chip-mark"><BeanMark size={46} /></span>
                            <span className="chip-name">Grão</span>
                          </button>
                          <button className="chip-option" type="button" aria-label="Conceito Selo">
                            <span className="chip-mark"><SealMark size={46} /></span>
                            <span className="chip-name">Selo</span>
                          </button>
                          <button className="chip-option" type="button" aria-label="Conceito Xícara">
                            <span className="chip-mark"><CupMark size={46} /></span>
                            <span className="chip-name">Xícara</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="artwork-wrap seq" data-step="2" hidden>
                      <div className="artwork-heading">
                        <span>01 / PEÇA CRIADA</span>
                        <span>CONCEITO · EDITORIAL</span>
                      </div>
                      <div
                        className="poster motion-poster"
                        aria-label="Cartaz promocional da cafeteria Grão & Prosa com fotografia realista de café"
                      >
                        <img
                          className="poster-photo"
                          src={brasaPosterBg}
                          alt=""
                          aria-hidden="true"
                        />
                        <div className="poster-shade" aria-hidden="true"></div>

                        <div className="poster-top">
                          <span className="poster-brand"><BeanMark size={18} /><strong>Grão &amp; Prosa</strong></span>
                          <span>CAFETERIA</span>
                        </div>
                        <PosterStamp />

                        <div className="poster-copy">
                          <span className="poster-kicker">
                            CAFÉS DE ORIGEM · TORRA ARTESANAL
                          </span>
                          <strong>
                            O tempo pede
                            <br />
                            um bom café.
                          </strong>
                          <p>Escolhas de origem, extraídas com calma.</p>
                        </div>

                        <div className="poster-bottom">
                          <span>ESPRESSO · COADOS</span>
                          <span>ABERTO 7H–19H</span>
                        </div>
                      </div>
                      <div className="artwork-footer">
                        <span>
                          <i className="ready-dot"></i> Identidade aplicada à
                          peça
                        </span>
                        <span>1080 × 1350 · CONCEITO VISUAL</span>
                      </div>
                    </div>
                    <div className="inp">
                      <span>Refine: deixe mais minimalista</span>
                      <i>↑</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mq" aria-hidden="true">
          <div className="mq-track">
            <span>Logos</span>
            <span>Identidade visual</span>
            <span>Cartazes</span>
            <span>Posts</span>
            <span>Banners</span>
            <span>Brand kit</span>
            <span>Variações</span>
            <span>Exportação</span>
          </div>
        </div>

        <div className="w">
          <div className="met">
            <div className="rv" style={{ "--d": ".08s" }}>
              <b className="gt" data-count="50" data-prefix="+">
                +50
              </b>
              <span>FORMATOS DE PEÇAS</span>
            </div>
            <div className="rv" style={{ "--d": ".16s" }}>
              <b className="gt" data-count="100" data-suffix="%">
                100%
              </b>
              <span>COERÊNCIA DE CAMPANHA</span>
            </div>
            <div className="rv" style={{ "--d": ".24s" }}>
              <b className="gt" data-count="3">
                3
              </b>
              <span>EXPORTS: PNG, SVG, PDF</span>
            </div>
          </div>
        </div>

        <section id="recursos">
          <div className="w">
            <div className="head rv">
              <span className="cap ac">Recursos</span>
              <h2>
                Tudo para dar <span className="gt">forma</span> às suas
                campanhas
              </h2>
              <p>Do primeiro conceito ao arquivo final, em uma só conversa.</p>
            </div>
            <div className="bento">
              <div className="cell s4 rv">
                <div className="cd tilt">
                  <div
                    className="ic"
                    style={{
                      background: "linear-gradient(135deg,#5B3CF5,#C73A68)",
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3>Logos em segundos</h3>
                  <p>
                    Explore vários conceitos de logotipo a partir de uma simples
                    descrição.
                  </p>
                  <LogoShowcase />
                </div>
              </div>
              <div className="cell s2 rv" style={{ "--d": ".1s" }}>
                <div className="cd tilt">
                  <div
                    className="ic"
                    style={{
                      background: "linear-gradient(135deg,#C73A68,#FF8A4C)",
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3a9 9 0 100 18c1.5 0 2-1 1.4-2.2-.6-1.2.2-2.3 1.6-2.3H17a4 4 0 004-4c0-5-4-9.5-9-9.5z" />
                    </svg>
                  </div>
                  <h3>Identidade visual completa</h3>
                  <p>
                    Paleta, tipografia e regras de uso nascem juntas e combinam
                    entre si.
                  </p>
                  <IdentityBoard />
                </div>
              </div>
              <div className="cell s3 rv">
                <div className="cd tilt">
                  <div
                    className="ic"
                    style={{
                      background: "linear-gradient(135deg,#FF8A4C,#C73A68)",
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <path d="M9 8h6M9 12h6M9 16h3" />
                    </svg>
                  </div>
                  <h3>Cartazes e peças</h3>
                  <p>
                    Pôsteres, posts e banners nos formatos certos para cada
                    canal.
                  </p>
                </div>
              </div>
              <div className="cell s3 rv" style={{ "--d": ".1s" }}>
                <div className="cd tilt">
                  <div
                    className="ic"
                    style={{
                      background: "linear-gradient(135deg,#7B4DFF,#5B3CF5)",
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="4" width="7" height="7" rx="1.5" />
                      <rect x="13" y="13" width="7" height="7" rx="1.5" />
                    </svg>
                  </div>
                  <h3>Variações para testar</h3>
                  <p>
                    Crie versões da mesma peça e descubra qual funciona melhor.
                  </p>
                </div>
              </div>
              <div className="cell s2 rv">
                <div className="cd tilt">
                  <div
                    className="ic"
                    style={{
                      background: "linear-gradient(135deg,#5B3CF5,#C73A68)",
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h3>Consistência visual</h3>
                  <p>
                    Crie peças com uma linguagem reconhecível, do primeiro post
                    à campanha completa.
                  </p>
                </div>
              </div>
              <div className="cell s4 rv" style={{ "--d": ".1s" }}>
                <div className="cd tilt">
                  <div
                    className="ic"
                    style={{
                      background: "linear-gradient(135deg,#C73A68,#FFBE55)",
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 4v11M8 11l4 4 4-4M5 20h14" />
                    </svg>
                  </div>
                  <h3>Exporte onde precisar</h3>
                  <p>
                    Entregue em PNG, SVG e PDF, prontos para gráfica ou redes
                    sociais.
                  </p>
                  <div className="fm">
                    <span>PNG</span>
                    <span>SVG</span>
                    <span>PDF</span>
                    <span>1080×1350</span>
                    <span>STORY</span>
                    <span>A3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como">
          <div className="w how">
            <div className="how-l">
              <span className="cap ac">Como funciona</span>
              <h2 style={{ marginTop: "14px" }}>
                Do briefing à campanha, tudo se <span className="gt">encaixa</span>
              </h2>
              <p className="mut" style={{ marginTop: "16px" }}>
                Role para acompanhar cada etapa do processo.
              </p>
            </div>
            <div className="how-r">
              <div className="how-line">
                <i className="how-fill"></i>
              </div>
              <article className="step">
                <div className="num">01</div>
                <h3>Briefing</h3>
                <p>Conte sobre o negócio, o público e o tom desejado.</p>
                <StepBriefing />
              </article>
              <article className="step">
                <div className="num">02</div>
                <h3>Conceito</h3>
                <p>A IA propõe rotas criativas e referências visuais.</p>
                <StepConcept />
              </article>
              <article className="step">
                <div className="num">03</div>
                <h3>Identidade</h3>
                <p>Logo, cores e tipografia nascem juntos e coerentes.</p>
                <StepIdentity />
              </article>
              <article className="step">
                <div className="num">04</div>
                <h3>Peças</h3>
                <p>Cartazes e posts prontos, com a campanha já aplicada.</p>
                <StepPieces />
              </article>
            </div>
          </div>
        </section>

        <section id="pratica" style={{ paddingTop: "20px" }}>
          <div className="w">
            <div className="grow" data-grow="0.9">
              <div className="show">
                <div>
                  <span className="cap ac">Na prática</span>
                  <h2 style={{ marginTop: "14px" }}>
                    Uma conversa que vira <span className="gt">design</span>
                  </h2>
                  <p className="mut" style={{ marginTop: "16px" }}>
                    Refine em linguagem natural. A MAKIIA ajusta a peça e
                    preserva a identidade.
                  </p>
                  <ul>
                    <li>
                      Peça mudanças como “mais minimalista” ou “tom mais ousado”
                    </li>
                    <li>Compare variações lado a lado</li>
                    <li>Visualize diferentes aplicações da mesma identidade</li>
                  </ul>
                  <div
                    className="row"
                    style={{ justifyContent: "flex-start", marginTop: "30px" }}
                  >
                    <a className="btn pri mag" href="/login#cadastro">
                      Experimentar
                    </a>
                  </div>
                </div>
                <PraticaArt />
              </div>
            </div>
            <div style={{ marginTop: "80px" }}>
              <span className="cap rv">Para quem é</span>
              <div className="pills rv" style={{ marginTop: "20px" }}>
                <span>Designers</span>
                <span>Agências de branding</span>
                <span>Social media</span>
                <span>Pequenos negócios</span>
                <span>Times de marketing</span>
              </div>
            </div>
          </div>
        </section>

        <section id="planos" style={{ paddingTop: "20px" }}>
          <div className="w">
            <div className="head c rv">
              <span className="cap ac">Planos</span>
              <h2>Comece grátis, cresça com a sua campanha</h2>
              <div
                className="bill"
                role="group"
                aria-label="Período de cobrança"
              >
                <button className="on" data-y="0">
                  Mensal
                </button>
                <button data-y="1">
                  Anual <small>−20%</small>
                </button>
              </div>
            </div>
            <div className="pr">
              <div className="cd rv">
                <span className="cap">Grátis</span>
                <b>R$ 0</b>
                <p>Para testar ideias</p>
                <ul>
                  <li>5 projetos por mês</li>
                  <li>Exporte em PNG</li>
                  <li>Modo criativo básico</li>
                </ul>
                <a className="btn" href="/login#cadastro">
                  Começar
                </a>
              </div>
              <div className="cd hot rv" style={{ "--d": ".12s" }}>
                <span className="cap ac">Pro</span>
                <b className="gt">
                  R${" "}
                  <span data-m="49" data-y="39">
                    49
                  </span>
                </b>
                <p>Para quem vive de campanha · por mês</p>
                <ul>
                  <li>Projetos ilimitados</li>
                  <li>PNG, SVG e PDF</li>
                  <li>Biblioteca de identidade visual</li>
                  <li>Raciocínio estendido</li>
                </ul>
                <a className="btn pri mag" href="/login#cadastro">
                  Assinar Pro
                </a>
              </div>
              <div className="cd rv" style={{ "--d": ".24s" }}>
                <span className="cap">Equipe</span>
                <b>Sob consulta</b>
                <p>Para agências e times</p>
                <ul>
                  <li>Brand kits compartilhados</li>
                  <li>Comentários e aprovação</li>
                  <li>Suporte prioritário</li>
                </ul>
                <a className="btn" href="/login">
                  Falar com a gente
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" style={{ paddingTop: "20px" }}>
          <div className="w faq-w">
            <div className="head c rv">
              <span className="cap ac">Dúvidas</span>
              <h2>Perguntas frequentes</h2>
            </div>
            <div className="faq rv">
              <div className="it">
                <button className="q" aria-expanded="false">
                  A MAKIIA substitui um designer?<i></i>
                </button>
                <div className="a">
                  <div>
                    <p>
                      Não. Ela acelera a criação e a exploração de ideias, e o
                      designer decide, refina e aprova. Você leva o arquivo para
                      o Figma e edita como quiser.
                    </p>
                  </div>
                </div>
              </div>
              <div className="it">
                <button className="q" aria-expanded="false">
                  Posso usar minhas próprias cores e fontes?<i></i>
                </button>
                <div className="a">
                  <div>
                    <p>
                      Sim. Cadastre o seu brand kit e suas escolhas são
                      reutilizadas nas próximas criações.
                    </p>
                  </div>
                </div>
              </div>
              <div className="it">
                <button className="q" aria-expanded="false">
                  Em quais formatos posso exportar?<i></i>
                </button>
                <div className="a">
                  <div>
                    <p>
                      PNG, SVG e PDF, nos tamanhos para feed, story, A3 e outros
                      formatos comuns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="it">
                <button className="q" aria-expanded="false">
                  Preciso informar uma forma de pagamento para começar?<i></i>
                </button>
                <div className="a">
                  <div>
                    <p>
                      Não. O plano grátis pode ser usado sem cadastrar uma forma
                      de pagamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CampaignCta />
      </main>

      <SiteFooter active="/" />
    </>
  );
}
