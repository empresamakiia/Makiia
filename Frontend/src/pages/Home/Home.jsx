
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="home-navbar">
        <Link to="/" className="home-logo app-link">
          <span className="home-logo-symbol">✳</span>
          <span className="home-logo-text">Makiia</span>
        </Link>

        <nav className="home-nav-links">
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
          </Link>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero" id="inicio">
          <div className="home-hero-content">
            <span className="home-hero-tag">
              Inteligência artificial para marketing
            </span>

            <h1 className="home-hero-title">
              Transforme suas ideias em conteúdos incríveis{" "}
              <span className="home-highlight">com IA</span>
            </h1>

            <p className="home-hero-description">
              Mais criatividade, menos esforço. A Makiia é sua aliada
              na criação de conteúdos para marketing.
            </p>

            <div className="home-hero-actions">
              <Link
                to="/login"
                className="home-button home-button-primary app-link"
              >
                Começar agora →
              </Link>

              <a
                href="#recursos"
                className="home-button home-button-outline app-link"
              >
                Saiba mais
              </a>
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-visual-card">
              <div className="home-visual-header">
                <span className="home-visual-brand">✳ Makiia</span>
                <span className="home-online-dot" />
              </div>

              <h2 className="home-visual-title">
                O que você quer criar hoje?
              </h2>

              <div className="home-visual-options">
                <div className="home-visual-option">
                  <span className="home-option-icon">▤</span>
                  <span className="home-option-label">Texto</span>
                </div>

                <div className="home-visual-option">
                  <span className="home-option-icon">▧</span>
                  <span className="home-option-label">Imagem</span>
                </div>

                <div className="home-visual-option">
                  <span className="home-option-icon">▷</span>
                  <span className="home-option-label">Vídeo</span>
                </div>

                <div className="home-visual-option">
                  <span className="home-option-icon">✎</span>
                  <span className="home-option-label">Editar</span>
                </div>
              </div>

              <div className="home-visual-footer">
                ✨ Sua criatividade, potencializada por IA.
              </div>
            </div>
          </div>
        </section>

        <section className="home-features" id="recursos">
          <div className="home-section-heading">
            <h2 className="home-section-title">
              Tudo o que você precisa em um só lugar
            </h2>

            <p className="home-section-description">
              Crie textos, imagens, vídeos e muito mais com ferramentas
              de inteligência artificial.
            </p>
          </div>

          <div className="home-feature-list">
            <article className="home-feature-card">
              <span className="home-feature-icon">▤</span>
              <h3 className="home-feature-title">Criação de textos</h3>
              <p className="home-feature-description">
                Gere ideias, roteiros e legendas com poucos cliques.
              </p>
            </article>

            <article className="home-feature-card">
              <span className="home-feature-icon">▧</span>
              <h3 className="home-feature-title">Imagens incríveis</h3>
              <p className="home-feature-description">
                Transforme suas ideias em imagens para suas campanhas.
              </p>
            </article>

            <article className="home-feature-card">
              <span className="home-feature-icon">▷</span>
              <h3 className="home-feature-title">Vídeos e edições</h3>
              <p className="home-feature-description">
                Organize e desenvolva conteúdos audiovisuais.
              </p>
            </article>

            <article className="home-feature-card">
              <span className="home-feature-icon">▱</span>
              <h3 className="home-feature-title">Organização</h3>
              <p className="home-feature-description">
                Gerencie seus projetos e conteúdos em um só lugar.
              </p>
            </article>
          </div>
        </section>

        <section className="home-how" id="como-funciona">
          <div className="home-section-heading">
            <h2 className="home-section-title">Como funciona</h2>
            <p className="home-section-description">
              Em poucos passos, você já pode começar a criar.
            </p>
          </div>

          <div className="home-steps">
            <article className="home-step">
              <span className="home-step-number">1</span>
              <div className="home-step-content">
                <h3 className="home-step-title">Crie sua conta</h3>
                <p className="home-step-description">
                  Entre na plataforma para começar.
                </p>
              </div>
            </article>

            <article className="home-step">
              <span className="home-step-number">2</span>
              <div className="home-step-content">
                <h3 className="home-step-title">Escolha a ferramenta</h3>
                <p className="home-step-description">
                  Selecione o tipo de conteúdo desejado.
                </p>
              </div>
            </article>

            <article className="home-step">
              <span className="home-step-number">3</span>
              <div className="home-step-content">
                <h3 className="home-step-title">Desenvolva sua ideia</h3>
                <p className="home-step-description">
                  Gere, revise e organize seu conteúdo.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="home-cta" id="sobre">
          <div className="home-cta-content">
            <h2 className="home-cta-title">
              Pronto para criar sem limites?
            </h2>
            <p className="home-cta-description">
              Transforme suas ideias em resultados com a Makiia.
            </p>
          </div>

          <Link
            to="/login"
            className="home-button home-button-primary app-link"
          >
            Começar agora →
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <Link to="/" className="home-logo app-link">
          <span className="home-logo-symbol">✳</span>
          <span className="home-logo-text">Makiia</span>
        </Link>

        <p className="home-footer-text">
          © 2026 Makiia. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default Home;
