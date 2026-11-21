import { useEffect, useState } from "react";
import initLanding from "../Home/Main.js";
import SiteNav from "../../components/SiteNav/SiteNav.jsx";
import SiteFooter from "../../components/SiteFooter/SiteFooter.jsx";
import IdeaArt from "./IdeaArt.jsx";
import "../Home/Home.css";
import "./Contato.css";

const assuntos = ["Dúvida", "Parceria", "Imprensa", "Outro"];

function Icon({ type }) {
    if (type === "email") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>;
    if (type === "press") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.8 2.8 0 0 1 5.3 1.2c0 1.7-2.8 2.2-2.8 4" /><path d="M12 18h.01" /></svg>;
}

export default function Contato() {
    const [assunto, setAssunto] = useState("Dúvida");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [emailAberto, setEmailAberto] = useState(false);

    // Usa o mesmo fundo animado, barra de progresso, navbar e animações da landing/Sobre.
    useEffect(() => initLanding(), []);

    function enviar(event) {
        event.preventDefault();
        const destino = assunto === "Parceria" || assunto === "Imprensa"
            ? "parcerias@makiia.com" : "contato@makiia.com";
        const titulo = `[MAKIIA] ${assunto} — ${nome.trim()}`;
        const corpo = `Nome: ${nome.trim()}\nE-mail: ${email.trim()}\nAssunto: ${assunto}\n\n${mensagem.trim()}`;
        const link = `mailto:${destino}?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(corpo)}`;
        window.location.href = link;
        setEmailAberto(true); // Não afirma que a mensagem foi enviada.
    }

    return (
        <>
            <canvas id="bg" aria-hidden="true" />
            <div className="grid-bg" aria-hidden="true" />
            <div id="cursor" aria-hidden="true" />
            <div className="progress" aria-hidden="true"><i /></div>

            <SiteNav active="/contato" />

            <main id="top" className="contato-main">
                <header className="w hero contato-hero">
                    <span className="pill rv"><b>CONTATO</b>Fale com a equipe da MAKIIA</span>
                    <h1 data-split>Vamos conversar sobre a sua <span className="gt">campanha</span></h1>
                    <p className="rv" style={{ "--d": ".24s" }}>
                        Dúvidas, parcerias ou ideias? Escreva para a gente e respondemos por e-mail.
                    </p>
                </header>

                <div className="w contato-grid">
                    <section className="contato-form-panel rv" aria-label="Enviar mensagem">
                        <form onSubmit={enviar}>
                            <div className="contato-fields-row">
                                <label className="contato-field">
                                    <span>NOME</span>
                                    <input type="text" name="nome" placeholder="Como podemos te chamar?" autoComplete="name" value={nome} onChange={e => setNome(e.target.value)} maxLength={100} required />
                                </label>
                                <label className="contato-field">
                                    <span>E-MAIL</span>
                                    <input type="email" name="email" placeholder="voce@empresa.com" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={200} required />
                                </label>
                            </div>

                            <fieldset className="contato-assuntos">
                                <legend>ASSUNTO</legend>
                                <div className="contato-chip-row">
                                    {assuntos.map(item => (
                                        <button key={item} type="button" className={`contato-chip ${item === assunto ? "is-active" : ""}`} aria-pressed={item === assunto} onClick={() => { setAssunto(item); setEmailAberto(false); }}>{item}</button>
                                    ))}
                                </div>
                            </fieldset>

                            <label className="contato-field contato-message-field">
                                <span>MENSAGEM</span>
                                <textarea name="mensagem" placeholder="Conte um pouco sobre o seu projeto ou a sua dúvida" rows={6} maxLength={5000} required value={mensagem} onChange={e => setMensagem(e.target.value)} />
                            </label>
                            <button className="btn pri mag contato-submit" type="submit">Enviar mensagem <span aria-hidden="true">↗</span></button>
                            <p className="contato-legal">Ao enviar, você concorda com a <a href="/privacidade">Política de Privacidade</a>.</p>
                            {emailAberto && <p className="contato-feedback" role="status">Preparamos sua mensagem no aplicativo de e-mail. Confira e confirme o envio por lá.</p>}
                        </form>
                    </section>

                    <aside className="contato-side" aria-label="Canais de contato">
                        <a href="mailto:contato@makiia.com" className="contato-channel rv" style={{ "--d": ".06s" }}>
                            <span className="contato-channel-icon violet"><Icon type="email" /></span>
                            <span><strong>E-mail</strong><small>contato@makiia.com</small></span>
                        </a>
                        <a href="mailto:parcerias@makiia.com" className="contato-channel rv" style={{ "--d": ".12s" }}>
                            <span className="contato-channel-icon orange"><Icon type="press" /></span>
                            <span><strong>Imprensa e parcerias</strong><small>parcerias@makiia.com</small></span>
                        </a>
                        <a href="/ajuda" className="contato-channel rv" style={{ "--d": ".18s" }}>
                            <span className="contato-channel-icon violet"><Icon type="help" /></span>
                            <span><strong>Central de ajuda</strong><small>Respostas rápidas sobre o uso da MAKIIA.</small></span>
                        </a>
                        <div className="contato-brand-card rv" style={{ "--d": ".24s" }} aria-label="Uma ideia. Mil formas.">
                            <IdeaArt />
                            <div className="contato-brand-copy">
                                <span>IDEIA / CAMPANHA / PEÇA</span>
                                <strong>Uma ideia.<br />Mil formas.</strong>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <SiteFooter active="/contato" />
        </>
    );
}
