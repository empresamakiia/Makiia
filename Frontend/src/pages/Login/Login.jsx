import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLeaving, setIsLeaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function transitionToRegister() {
    if (isLeaving) return;
    setIsLeaving(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 600;
    window.setTimeout(
      () => navigate("/cadastro", { state: { isArriving: true } }),
      delay,
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      window.alert("Preencha seu e-mail e sua senha.");
      return;
    }

    // TODO: conectar ao backend (login)
    window.alert(
      "A tela está pronta! Agora você pode conectar o login ao backend.",
    );
  }

  function handleSocialLogin(provider) {
    window.alert(
      `O login com ${provider} precisa ser integrado à autenticação do projeto.`,
    );
  }

  return (
    <main
      className={`login-page${isLeaving ? " is-leaving" : ""}${location.state?.isArriving ? " is-arriving" : ""}`}
    >
      <section className="login-section">
        <header className="login-header">
          <a className="login-logo" href="/" aria-label="Makiia início">
            MAKIIA
          </a>

          <a className="back-to-site" href="/">
            Voltar ao site
          </a>
        </header>

        <div className="login-content">
          <div
            className="auth-tabs"
            role="tablist"
            aria-label="Acesso"
            data-mode="login"
          >
            <span className="tab-pill" aria-hidden="true"></span>

            <button
              className="auth-tab active"
              type="button"
              role="tab"
              aria-selected="true"
            >
              Entrar
            </button>

            <button
              className="auth-tab"
              type="button"
              role="tab"
              aria-selected="false"
              onClick={transitionToRegister}
            >
              Criar conta
            </button>
          </div>

          <div className="auth-stage">
            <div className="login-heading stagger" style={{ "--i": 0 }}>
              <h1>Bem-vindo de volta</h1>
              <p>Entre para continuar criando as suas marcas.</p>
            </div>

            <div className="social-login stagger" style={{ "--i": 1 }}>
              <button
                className="social-button"
                type="button"
                onClick={() => handleSocialLogin("Google")}
              >
                <svg
                  className="social-icon google-icon"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11c-.5 2.7-2 4.9-4.3 6.4v5.3h7c4.1-3.8 6.5-9.3 6.5-15.7z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 44c5.9 0 10.8-2 14.4-5.4l-7-5.3c-2 1.3-4.4 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-8.9H4.6v5.5C8.2 39.1 15.5 44 24 44z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M11.8 26.5a12 12 0 0 1 0-7V14H4.6a20 20 0 0 0 0 18z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 10.6c3.2 0 6 1.1 8.2 3.2l6.2-6.2C34.7 4.1 29.9 2 24 2 15.5 2 8.2 6.9 4.6 14l7.2 5.5c1.7-5.1 6.5-8.9 12.2-8.9z"
                  />
                </svg>
                Google
              </button>

              <button
                className="social-button"
                type="button"
                onClick={() => handleSocialLogin("Apple")}
              >
                <svg
                  className="social-icon apple-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M17.6 19.3c-.9 1.3-1.8 2.5-3.1 2.5-1.3 0-1.7-.8-3.2-.8-1.5 0-2 .8-3.2.8-1.2 0-2.2-1.3-3.1-2.5-1.8-2.6-3.2-7.3-1.3-10.4.9-1.5 2.4-2.4 4-2.4 1.3 0 2.1.8 3.2.8 1.1 0 1.8-.8 3.2-.8 1.4 0 2.9.8 3.8 2.2-3.3 1.8-2.7 6.5.7 7.8-.3.9-.6 1.8-1.2 2.8zM13.4 3c.1 1.1-.3 2.2-1 3-.8.9-2 1.5-3.1 1.4-.1-1.1.3-2.2 1.1-3.1.9-.9 2.1-1.4 3-1.3z"
                  />
                </svg>
                Apple
              </button>
            </div>

            <div className="login-divider stagger" style={{ "--i": 2 }}>
              <span></span>
              <p>ou entre com e-mail</p>
              <span></span>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-field stagger" style={{ "--i": 3 }}>
                <label htmlFor="email">E-MAIL</label>
                <div className="input-wrapper">
                  <span className="input-symbol">@</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="seuemail@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-field stagger" style={{ "--i": 4 }}>
                <div className="label-row">
                  <label htmlFor="password">SENHA</label>

                  <button
                    className="forgot-password"
                    type="button"
                    onClick={() =>
                      window.alert(
                        "Conecte esta opção ao fluxo de recuperação de senha.",
                      )
                    }
                  >
                    Esqueci a senha
                  </button>
                </div>

                <div className="input-wrapper">
                  <span className="input-symbol password-symbol">●</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />

                  <button
                    className="show-password"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <label className="remember-option stagger" style={{ "--i": 5 }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Manter conectado neste dispositivo</span>
              </label>

              <button
                className="submit-button stagger"
                style={{ "--i": 6 }}
                type="submit"
              >
                Entrar na MAKIIA
              </button>
            </form>

            <p className="switch-mode stagger" style={{ "--i": 7 }}>
              Ainda não tem conta?{" "}
              <button type="button" onClick={transitionToRegister}>
                Criar conta grátis
              </button>
              {" · "}
              <button type="button" onClick={() => navigate("/chat")}>
                Continuar sem login
              </button>
            </p>
          </div>
        </div>

        <footer className="login-footer">
          <span>© 2026 MAKIIA</span>
          <nav aria-label="Links institucionais">
            <a href="#termos">Termos</a>
            <span>·</span>
            <a href="#privacidade">Privacidade</a>
            <span>·</span>
            <a href="#ajuda">Ajuda</a>
          </nav>
        </footer>
      </section>

      <AuthPanel
        eyebrow="MAKIIA 2 · MODO CRIATIVO"
        title={
          <>
            Dê briefing à marca, <span>em minutos.</span>
          </>
        }
      />
    </main>
  );
}

export default Login;
