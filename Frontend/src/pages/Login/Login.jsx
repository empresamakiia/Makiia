import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import {
  fetchCurrentUser,
  login,
  requestPasswordReset,
  resetPassword,
} from "../../services/auth";
import "./Login.css";

const MIN_PASSWORD = 8;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLeaving, setIsLeaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: "error" | "success", text }

  // Recuperação de senha: null (fechada) → "email" → "token"
  const [resetStep, setResetStep] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(null);

  // Quem já tem uma sessão válida vai direto para o chat.
  useEffect(() => {
    const controller = new AbortController();
    fetchCurrentUser({ signal: controller.signal })
      .then((user) => {
        if (user) navigate("/chat", { replace: true });
      })
      .catch(() => {
        /* backend fora do ar: segue na tela de login normalmente */
      });
    return () => controller.abort();
  }, [navigate]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !password) {
      setFeedback({ type: "error", text: "Preencha seu e-mail e sua senha." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await login(email, password, { remember: rememberMe });
      navigate("/chat");
    } catch (error) {
      setFeedback({ type: "error", text: error.message });
      setIsSubmitting(false);
    }
  }

  function openReset() {
    setResetEmail(email);
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setResetFeedback(null);
    setFeedback(null);
    setResetStep("email");
  }

  function closeReset(message) {
    setResetStep(null);
    setResetFeedback(null);
    if (message) setFeedback({ type: "success", text: message });
  }

  async function handleResetRequest(event) {
    event.preventDefault();
    if (resetLoading) return;
    setResetLoading(true);
    setResetFeedback(null);
    try {
      const data = await requestPasswordReset(resetEmail);
      setResetStep("token");
      setResetFeedback({ type: "success", text: data?.mensagem || "Pedido enviado." });
    } catch (error) {
      setResetFeedback({ type: "error", text: error.message });
    } finally {
      setResetLoading(false);
    }
  }

  async function handleResetConfirm(event) {
    event.preventDefault();
    if (resetLoading) return;
    if (newPassword.length < MIN_PASSWORD) {
      setResetFeedback({ type: "error", text: `A nova senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.` });
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetFeedback({ type: "error", text: "As senhas não coincidem." });
      return;
    }
    setResetLoading(true);
    setResetFeedback(null);
    try {
      await resetPassword(resetToken, newPassword);
      setEmail(resetEmail);
      setPassword("");
      closeReset("Senha redefinida. Entre com a nova senha.");
    } catch (error) {
      setResetFeedback({ type: "error", text: error.message });
    } finally {
      setResetLoading(false);
    }
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
              <h1>{resetStep ? "Recuperar senha" : "Bem-vindo de volta"}</h1>
              <p>
                {resetStep === "email" &&
                  "Informe o e-mail da sua conta para receber o código de recuperação."}
                {resetStep === "token" &&
                  "Digite o código recebido e escolha uma nova senha."}
                {!resetStep && "Entre para continuar criando as suas marcas."}
              </p>
            </div>

            {resetStep ? (
              <div className="reset-panel">
                {resetStep === "email" ? (
                  <form className="login-form" onSubmit={handleResetRequest} noValidate>
                    <div className="form-field">
                      <label htmlFor="reset-email">E-MAIL</label>
                      <div className="input-wrapper">
                        <span className="input-symbol">@</span>
                        <input
                          id="reset-email"
                          type="email"
                          placeholder="seuemail@gmail.com"
                          value={resetEmail}
                          onChange={(event) => setResetEmail(event.target.value)}
                          autoComplete="email"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                    {resetFeedback && (
                      <p className={`login-feedback is-${resetFeedback.type}`} role="alert">
                        {resetFeedback.text}
                      </p>
                    )}
                    <button className="submit-button" type="submit" disabled={resetLoading || !resetEmail.trim()}>
                      {resetLoading ? "Enviando…" : "Enviar código"}
                    </button>
                  </form>
                ) : (
                  <form className="login-form" onSubmit={handleResetConfirm} noValidate>
                    {resetFeedback && (
                      <p className={`login-feedback is-${resetFeedback.type}`} role="status">
                        {resetFeedback.text}
                      </p>
                    )}
                    <div className="form-field">
                      <label htmlFor="reset-token">CÓDIGO DE RECUPERAÇÃO</label>
                      <div className="input-wrapper">
                        <span className="input-symbol">#</span>
                        <input
                          id="reset-token"
                          type="text"
                          placeholder="Cole o código recebido"
                          value={resetToken}
                          onChange={(event) => setResetToken(event.target.value)}
                          autoComplete="one-time-code"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor="reset-password">NOVA SENHA</label>
                      <div className="input-wrapper">
                        <span className="input-symbol password-symbol">●</span>
                        <input
                          id="reset-password"
                          type="password"
                          placeholder={`Mínimo de ${MIN_PASSWORD} caracteres`}
                          value={newPassword}
                          onChange={(event) => setNewPassword(event.target.value)}
                          autoComplete="new-password"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor="reset-confirm">CONFIRMAR NOVA SENHA</label>
                      <div className="input-wrapper">
                        <span className="input-symbol password-symbol">●</span>
                        <input
                          id="reset-confirm"
                          type="password"
                          placeholder="Repita a nova senha"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          autoComplete="new-password"
                          required
                        />
                      </div>
                    </div>
                    <button
                      className="submit-button"
                      type="submit"
                      disabled={resetLoading || !resetToken.trim() || !newPassword || !confirmPassword}
                    >
                      {resetLoading ? "Salvando…" : "Redefinir senha"}
                    </button>
                    <button className="reset-link" type="button" onClick={() => setResetStep("email")}>
                      Não recebeu? Enviar o código de novo
                    </button>
                  </form>
                )}
                <button className="reset-back" type="button" onClick={() => closeReset()}>
                  ← Voltar para o login
                </button>
              </div>
            ) : (
            <>
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
                    onClick={openReset}
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

              {feedback && (
                <p
                  className={`login-feedback is-${feedback.type}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                >
                  {feedback.text}
                </p>
              )}

              <button
                className="submit-button stagger"
                style={{ "--i": 6 }}
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Entrando…" : "Entrar na MAKIIA"}
              </button>
            </form>
            </>
            )}

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
