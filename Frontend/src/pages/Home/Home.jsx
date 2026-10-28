
import { Link } from "react-router-dom";
import logoMakiia from "../../assets/makiia-logo.png";
import makiiaOndas from "../../assets/makiia-ondas.gif";
import cerebroNeon from "../../assets/cerebro-neon.gif";
import "./Home.css";

function Home() {
  function handleComingSoon(feature) {
    window.alert(`${feature}: funcionalidade em desenvolvimento.`);
  }

  function handleNewsletter(event) {
    event.preventDefault();
    window.alert("O cadastro por e-mail estará disponível em breve.");
  }

  return (
    <div className="home">
      <header className="home-navbar">
        <Link to="/" className="home-logo app-link">
          <img
            className="home-logo-image"
            src={logoMakiia}
            alt="Logo da Makiia"
          />
          <span className="home-logo-text">makiia</span>
        </Link>

        <nav className="home-nav-links" aria-label="Navegação principal">
          <a className="home-nav-link app-link" href="#inicio">
            Início
          </a>
          <a className="home-nav-link app-link" href="#recursos">
            Recursos
          </a>
          <a className="home-nav-link app-link" href="#como-funciona">
            Como funciona
          </a>
          <a className="home-nav-link app-link" href="#sobre">
            Sobre
          </a>
        </nav>

        <div className="home-nav-actions">
          <Link
            to="/login"
            className="home-button home-button-outline app-link"
          >
            Entrar
          </Link>

          <Link
            to="/login"
            className="home-button home-button-primary app-link"
          >
            Começar agora
            <span className="home-button-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero" id="inicio">
          <div className="home-hero-content">
            <div className="home-hero-tag">
              <span className="home-tag-dot" />
              <span>INTELIGÊNCIA ARTIFICIAL CRIATIVA</span>
            </div>

            <h1 className="home-hero-title">
              Suas ideias.
              <br />
              Novas possibilidades.
              <br />
              <span className="home-highlight">Criadas com IA.</span>
            </h1>

            <p className="home-hero-description">
              Transforme ideias em conteúdos extraordinários. Crie textos,
              imagens e conceitos para suas campanhas em um só lugar.
            </p>

            <div className="home-hero-actions">
              <Link
                to="/login"
                className="home-button home-button-primary home-button-large app-link"
              >
                Explore a Makiia
                <span className="home-button-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>

              <a
                href="#recursos"
                className="home-button home-button-outline home-button-large app-link"
              >
                Conheça os recursos
              </a>
            </div>

            <div className="home-hero-note">
              <span className="home-note-symbol" aria-hidden="true">
                ✦
              </span>
              <p className="home-note-text">
                Sua criatividade continua sendo a protagonista.
              </p>
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-visual-glow" />

            <div className="home-visual-card">
              <div className="home-visual-header">
                <div className="home-visual-brand">
                  <img
                    className="home-visual-logo"
                    src={logoMakiia}
                    alt=""
                  />
                  <span className="home-visual-brand-name">
                    Makiia Studio
                  </span>
                </div>

                <span className="home-visual-status">
                  <span className="home-online-dot" />
                  Criatividade ativa
                </span>
              </div>

              <div className="home-visual-intro">
                <span className="home-visual-eyebrow">
                  SEU PRÓXIMO PROJETO
                </span>

                <h2 className="home-visual-title">
                  Tudo começa com uma ideia.
                </h2>

                <p className="home-visual-description">
                  Escolha um formato e dê vida à sua criatividade.
                </p>
              </div>

              <div className="home-visual-options">
                <button
                  className="home-visual-option"
                  type="button"
                  onClick={() => handleComingSoon("Criação de textos")}
                >
                  <span className="home-option-icon home-option-text">
                    Aa
                  </span>

                  <span className="home-option-content">
                    <span className="home-option-label">Textos</span>
                    <span className="home-option-description">
                      Ideias e narrativas
                    </span>
                  </span>

                  <span className="home-option-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>

                <button
                  className="home-visual-option"
                  type="button"
                  onClick={() => handleComingSoon("Criação de imagens")}
                >
                  <span className="home-option-icon home-option-image">
                    ✧
                  </span>

                  <span className="home-option-content">
                    <span className="home-option-label">Imagens</span>
                    <span className="home-option-description">
                      Conceitos visuais
                    </span>
                  </span>

                  <span className="home-option-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>

                <button
                  className="home-visual-option"
                  type="button"
                  onClick={() => handleComingSoon("Conteúdo audiovisual")}
                >
                  <span className="home-option-icon home-option-video">
                    ▷
                  </span>

                  <span className="home-option-content">
                    <span className="home-option-label">Audiovisual</span>
                    <span className="home-option-description">
                      Conteúdo em movimento
                    </span>
                  </span>

                  <span className="home-option-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>

              <div className="home-visual-footer">
                <span className="home-visual-sparkle" aria-hidden="true">
                  ✦
                </span>
                Criatividade amplificada por inteligência artificial.
              </div>
            </div>
          </div>
        </section>

        <section className="home-brain-section">
          <div className="home-brain-visual">
            <div className="home-brain-glow" />
            <img
              className="home-brain-gif"
              src={cerebroNeon}
              alt="Cérebro neon representando inteligência artificial"
            />
          </div>

          <div className="home-brain-content">
            <span className="home-section-eyebrow">
              CRIATIVIDADE E TECNOLOGIA
            </span>

            <h2 className="home-brain-title">
              Sua criatividade.
              <br />
              <span className="home-highlight">Potencializada pela IA.</span>
            </h2>

            <p className="home-brain-description">
              Uma ideia pode se transformar em muitas possibilidades. A
              Makiia combina inteligência artificial e criatividade para
              ajudar você a explorar conceitos, desenvolver conteúdos e dar
              vida a novos projetos.
            </p>

            <a
              href="#recursos"
              className="home-button home-button-primary home-button-large app-link"
            >
              Descubra o que é possível
              <span className="home-button-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>

        <section className="home-features" id="recursos">
          <div className="home-section-heading">
            <span className="home-section-eyebrow">
              UM UNIVERSO DE POSSIBILIDADES
            </span>

            <h2 className="home-section-title">
              Criatividade sem complicação.
            </h2>

            <p className="home-section-description">
              Ferramentas para transformar suas ideias em conteúdos com
              personalidade, propósito e impacto.
            </p>
          </div>

          <div className="home-feature-list">
            <article className="home-feature-card">
              <div className="home-feature-card-top">
                <span className="home-feature-icon home-feature-purple">
                  Aa
                </span>
                <span className="home-feature-number">01</span>
              </div>

              <h3 className="home-feature-title">Criação de textos</h3>

              <p className="home-feature-description">
                Desenvolva legendas, roteiros, ideias e textos para comunicar
                sua mensagem com clareza.
              </p>

              <button
                className="home-feature-action"
                type="button"
                onClick={() => handleComingSoon("Criação de textos")}
              >
                Explorar recurso <span aria-hidden="true">↗</span>
              </button>

              <span className="home-feature-detail">IDEIAS EM PALAVRAS</span>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-card-top">
                <span className="home-feature-icon home-feature-pink">
                  ✧
                </span>
                <span className="home-feature-number">02</span>
              </div>

              <h3 className="home-feature-title">Criação visual</h3>

              <p className="home-feature-description">
                Explore conceitos visuais e desenvolva materiais que expressem
                a identidade da sua marca.
              </p>

              <button
                className="home-feature-action"
                type="button"
                onClick={() => handleComingSoon("Criação visual")}
              >
                Explorar recurso <span aria-hidden="true">↗</span>
              </button>

              <span className="home-feature-detail">IDEIAS EM IMAGENS</span>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-card-top">
                <span className="home-feature-icon home-feature-orange">
                  ▷
                </span>
                <span className="home-feature-number">03</span>
              </div>

              <h3 className="home-feature-title">Conteúdo audiovisual</h3>

              <p className="home-feature-description">
                Planeje conceitos para vídeos e conteúdos dinâmicos para
                diferentes canais.
              </p>

              <button
                className="home-feature-action"
                type="button"
                onClick={() => handleComingSoon("Conteúdo audiovisual")}
              >
                Explorar recurso <span aria-hidden="true">↗</span>
              </button>

              <span className="home-feature-detail">
                IDEIAS EM MOVIMENTO
              </span>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-card-top">
                <span className="home-feature-icon home-feature-yellow">
                  ⌘
                </span>
                <span className="home-feature-number">04</span>
              </div>

              <h3 className="home-feature-title">Organização criativa</h3>

              <p className="home-feature-description">
                Reúna projetos, referências e conteúdos para manter seu
                processo criativo mais organizado.
              </p>

              <button
                className="home-feature-action"
                type="button"
                onClick={() => handleComingSoon("Organização criativa")}
              >
                Explorar recurso <span aria-hidden="true">↗</span>
              </button>

              <span className="home-feature-detail">
                IDEIAS EM UM SÓ LUGAR
              </span>
            </article>
          </div>
        </section>

        <section className="home-how" id="como-funciona">
          <div className="home-section-heading">
            <span className="home-section-eyebrow">
              SIMPLES DESDE O COMEÇO
            </span>

            <h2 className="home-section-title">Da ideia à criação.</h2>

            <p className="home-section-description">
              Um processo intuitivo para você concentrar sua energia no que
              realmente importa: criar.
            </p>
          </div>

          <div className="home-steps">
            <article className="home-step">
              <span className="home-step-number">01</span>

              <div className="home-step-content">
                <h3 className="home-step-title">Comece com uma ideia</h3>
                <p className="home-step-description">
                  Defina o objetivo, a mensagem e o tipo de conteúdo que deseja
                  desenvolver.
                </p>
              </div>
            </article>

            <article className="home-step">
              <span className="home-step-number">02</span>

              <div className="home-step-content">
                <h3 className="home-step-title">Explore possibilidades</h3>
                <p className="home-step-description">
                  Escolha as ferramentas e explore caminhos criativos com o
                  apoio da inteligência artificial.
                </p>
              </div>
            </article>

            <article className="home-step">
              <span className="home-step-number">03</span>

              <div className="home-step-content">
                <h3 className="home-step-title">Dê vida ao projeto</h3>
                <p className="home-step-description">
                  Revise, personalize e prepare seu conteúdo para o próximo
                  passo.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="home-cta" id="sobre">
          <div className="home-cta-glow" />

          <div className="home-cta-content">
            <img className="home-cta-logo" src={logoMakiia} alt="" />

            <span className="home-section-eyebrow">
              O PRÓXIMO PASSO É SEU
            </span>

            <h2 className="home-cta-title">
              Sua próxima grande ideia começa aqui.
            </h2>

            <p className="home-cta-description">
              Descubra novas formas de criar com a Makiia.
            </p>

            <Link
              to="/login"
              className="home-button home-button-primary home-button-large app-link"
            >
              Quero explorar
              <span className="home-button-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer-main">
          <div className="home-footer-brand">
            <Link to="/" className="home-logo app-link">
              <img
                className="home-logo-image"
                src={logoMakiia}
                alt="Logo da Makiia"
              />
              <span className="home-logo-text">makiia</span>
            </Link>

            <p className="home-footer-description">
              Ideias ganham novas formas. Criatividade encontra tecnologia.
            </p>

            <div className="home-footer-socials">
              <button
                className="home-social-button"
                type="button"
                aria-label="Instagram"
                onClick={() => handleComingSoon("Instagram")}
              >
                ig
              </button>

              <button
                className="home-social-button"
                type="button"
                aria-label="LinkedIn"
                onClick={() => handleComingSoon("LinkedIn")}
              >
                in
              </button>

              <button
                className="home-social-button"
                type="button"
                aria-label="TikTok"
                onClick={() => handleComingSoon("TikTok")}
              >
                ♪
              </button>
            </div>
          </div>

          <div className="home-footer-column">
            <h2 className="home-footer-heading">Explorar</h2>

            <a className="home-footer-link app-link" href="#inicio">
              Início
            </a>

            <a className="home-footer-link app-link" href="#recursos">
              Recursos
            </a>

            <a className="home-footer-link app-link" href="#como-funciona">
              Como funciona
            </a>
          </div>

          <div className="home-footer-column">
            <h2 className="home-footer-heading">A Makiia</h2>

            <a className="home-footer-link app-link" href="#sobre">
              Sobre a plataforma
            </a>

            <button
              className="home-footer-link home-footer-button"
              type="button"
              onClick={() => handleComingSoon("Novidades")}
            >
              Novidades
            </button>

            <button
              className="home-footer-link home-footer-button"
              type="button"
              onClick={() => handleComingSoon("Contato")}
            >
              Fale com a gente
            </button>
          </div>

          <div className="home-footer-newsletter">
            <h2 className="home-footer-heading">Fique por dentro</h2>

            <p className="home-footer-description">
              Novas ideias e possibilidades para sua criatividade.
            </p>

            <form
              className="home-newsletter-form"
              onSubmit={handleNewsletter}
            >
              <label
                className="home-newsletter-label"
                htmlFor="newsletter-email"
              >
                Seu e-mail
              </label>

              <div className="home-newsletter-field">
                <input
                  className="home-newsletter-input"
                  id="newsletter-email"
                  name="newsletter-email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                  required
                />

                <button
                  className="home-newsletter-submit"
                  type="submit"
                  aria-label="Cadastrar e-mail"
                >
                  ↗
                </button>
              </div>

              <p className="home-newsletter-note">
                O cadastro estará disponível em breve.
              </p>
            </form>
          </div>
        </div>

        <div className="home-footer-bottom">
          <p className="home-footer-copyright">
            © 2026 Makiia. Todos os direitos reservados.
          </p>

          <div className="home-footer-legal">
            <button
              className="home-footer-legal-button"
              type="button"
              onClick={() => handleComingSoon("Política de privacidade")}
            >
              Privacidade
            </button>

            <button
              className="home-footer-legal-button"
              type="button"
              onClick={() => handleComingSoon("Termos de uso")}
            >
              Termos de uso
            </button>
          </div>

          <p className="home-footer-signature">
            Feito para quem transforma ideias.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
