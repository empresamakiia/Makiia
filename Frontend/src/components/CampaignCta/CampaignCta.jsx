// Estilos em pages/Home/HomeArt.css (carregado pela Home depois do Home.css, mantendo a ordem das regras).
/* Card final "Pronto para criar sua próxima campanha?" (Home e Sobre). */
export default function CampaignCta() {
    return (
        <section id="cta" style={{ padding: "20px 0 0" }}>
            <div className="w">
                <div className="grow" data-grow="0.92">
                    <div className="cta cta-x">
                        <div className="cta-x-body">
                            <span className="pill">
                                <b>GRÁTIS</b>Comece sem cartão de crédito
                            </span>
                            <h2>
                                Pronto para criar sua próxima <span className="gt">campanha</span>?
                            </h2>
                            <p>Comece com um briefing e veja as primeiras ideias em minutos.</p>
                            <a className="cta-x-prompt" href="/login#cadastro">
                                <span className="cta-x-field">
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></svg>
                                    <span className="cta-x-ph">
                                        Campanha de inverno da cafeteria
                                        <i className="cta-x-caret" aria-hidden="true"></i>
                                    </span>
                                </span>
                                <span className="btn pri cta-x-go">
                                    Criar meu projeto <span aria-hidden="true">→</span>
                                </span>
                            </a>
                            <div className="cta-x-chips" aria-label="O que você pode criar">
                                <span>Logo</span>
                                <span>Cartaz</span>
                                <span>Post</span>
                                <span>Story</span>
                                <span>Brand kit</span>
                            </div>
                            <p className="cta-x-login">
                                Já tem conta? <a href="/login">Entrar</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
