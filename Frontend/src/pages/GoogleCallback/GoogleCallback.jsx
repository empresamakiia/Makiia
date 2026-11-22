import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelGoogleLogin, finishGoogleLogin } from "../../services/auth";

export default function GoogleCallback() {
    const navigate = useNavigate();
    const started = useRef(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (started.current) return;
        started.current = true;

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");
        const googleError = params.get("error");

        // Remove o código de autorização da URL visível e do histórico.
        window.history.replaceState(window.history.state, "", "/auth/google/callback");

        if (googleError) {
            cancelGoogleLogin();
            setError("A autenticação com Google foi cancelada ou recusada.");
            return;
        }

        if (!code || !state) {
            cancelGoogleLogin();
            setError("O Google não retornou os dados necessários.");
            return;
        }

        finishGoogleLogin(code, state)
            .then(() => navigate("/chat", { replace: true }))
            .catch((err) => {
                setError(err.message || "Falha ao autenticar com Google.");
            });
    }, [navigate]);

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                background: "#09070e",
                color: "#f6f2fc",
                padding: "24px",
                textAlign: "center",
            }}
        >
            <div>
                <h1>{error ? "Não foi possível entrar" : "Conectando ao Google..."}</h1>
                <p role={error ? "alert" : "status"}>
                    {error || "Estamos verificando sua autenticação."}
                </p>
                {error && (
                    <a href="/login" style={{ color: "#ff9b70" }}>
                        Voltar ao login
                    </a>
                )}
            </div>
        </main>
    );
}
