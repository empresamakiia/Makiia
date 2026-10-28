
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    // A autenticação será implementada na integração com o backend.
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="login-logo app-link">
          <span className="login-logo-symbol">✳</span>
          <span className="login-logo-text">Makiia</span>
        </Link>

        <div className="login-heading">
          <h1 className="login-title">Bem-vindo de volta!</h1>
          <p className="login-description">
            Entre na sua conta para continuar.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="email">
              E-mail
            </label>
            <input
              className="login-input app-input"
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Senha
            </label>
            <input
              className="login-input app-input"
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="login-submit app-button" type="submit">
            Entrar
          </button>
        </form>

        <Link to="/" className="login-back-link app-link">
          ← Voltar para o início
        </Link>
      </section>
    </main>
  );
}

export default Login;
