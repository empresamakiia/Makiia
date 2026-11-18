import { Link } from "react-router-dom";
import logoMakiia from "../../assets/makiia-logo.png";

function Header() {
  return (
    <header className="home-navbar">
      <Link to="/" className="home-logo app-link">
        <img
          className="home-logo-image"
          src={logoMakiia}
          alt="Logo da Makiia"
        />
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
        <Link to="/login" className="home-button home-button-outline app-link">
          Entrar
        </Link>

        <Link to="/login" className="home-button home-button-primary app-link">
          Começar agora
          <span className="home-button-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
