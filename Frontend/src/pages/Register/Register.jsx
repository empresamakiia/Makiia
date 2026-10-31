import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import "./Register.css";

const STRENGTH_LABELS = ["Muito fraca", "Fraca", "Média", "Boa", "Forte"];

function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLeaving, setIsLeaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(password);

  function transitionToLogin() {
    if (isLeaving) return;
    setIsLeaving(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 600;
    window.setTimeout(
      () => navigate("/login", { state: { isArriving: true } }),
      delay,
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Preencha nome, e-mail e senha para continuar.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("As senhas não são iguais.");
      return;
    }

    if (!acceptTerms) {
      setError("Aceite os termos de uso para criar sua conta.");
      return;
    }

    // TODO: conectar ao backend (cadastro)
    window.alert(
      "O formulário está pronto! Agora você pode conectar o cadastro ao backend.",
    );
  }

  function handleSocialSignup(provider) {
    window.alert(
      `O cadastro com ${provider} precisa ser integrado à autenticação do projeto.`,
    );
  }

  return (
    <main
      className={`login-page register-page${isLeaving ? " is-leaving" : ""}${location.state?.isArriving ? " is-arriving" : ""}`}
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
            data-mode="register"
          >
            <span className="tab-pill" aria-hidden="true"></span>

            <button
              className="auth-tab"
              type="button"
              role="tab"
              aria-selected="false"
              onClick={transitionToLogin}
            >
              Entrar
            </button>

            <button
              className="auth-tab active"
              type="button"
              role="tab"
              aria-selected="true"
            >
              Criar conta
            </button>
          </div>

          <div className="auth-stage">
            <div className="login-heading stagger" style={{ "--i": 0 }}>
              <h1>Crie sua conta</h1>
              <p>Comece a transformar suas ideias com a MAKIIA.</p>
            </div>

            <div className="social-login stagger" style={{ "--i": 1 }}>
              <button
                className="social-button"
                type="button"
                onClick={() => handleSocialSignup("Google")}
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
                onClick={() => handleSocialSignup("Apple")}
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
              <p>ou cadastre com e-mail</p>
              <span></span>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field stagger" style={{ "--i": 3 }}>
                <label htmlFor="name">NOME</label>
                <div className="input-wrapper">
                  <span className="input-symbol">♙</span>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="form-field stagger" style={{ "--i": 4 }}>
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

              <div className="form-field stagger" style={{ "--i": 5 }}>
                <label htmlFor="password">SENHA</label>
                <div className="input-wrapper">
                  <span className="input-symbol password-symbol">●</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
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

                {password && (
                  <div className="strength" data-level={strength}>
                    <div className="strength-bars" aria-hidden="true">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={n <= strength ? "on" : ""}
                        ></span>
                      ))}
                    </div>
                    <small>Senha: {STRENGTH_LABELS[strength]}</small>
                  </div>
                )}
              </div>

              <div className="form-field stagger" style={{ "--i": 6 }}>
                <label htmlFor="confirm">CONFIRMAR SENHA</label>
                <div className="input-wrapper">
                  <span className="input-symbol password-symbol">●</span>
                  <input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repita a senha"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <label
                className="remember-option terms-option stagger"
                style={{ "--i": 7 }}
              >
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                />
                <span>
                  Li e aceito os <a href="#termos">Termos</a> e a{" "}
                  <a href="#privacidade">Política de Privacidade</a>
                </span>
              </label>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="submit-button stagger"
                style={{ "--i": 8 }}
                type="submit"
              >
                Criar minha conta
              </button>
            </form>

            <p className="switch-mode stagger" style={{ "--i": 9 }}>
              Já tem uma conta?{" "}
              <button type="button" onClick={transitionToLogin}>
                Entrar
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
        eyebrow="COMECE DE GRAÇA"
        title={
          <>
            Sua marca inteira, <span>do zero ao ar.</span>
          </>
        }
      />
    </main>
  );
}

export default Register;
