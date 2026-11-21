import Logo from "../Logo/Logo.jsx";

/* Navbar única do site: as mesmas páginas em todas as telas. */
export const SITE_LINKS = [
    ["/", "Início"],
    ["/sobre", "Sobre"],
    ["/blog", "Blog"],
    ["/contato", "Contato"],
    ["/ajuda", "Ajuda"],
];

export default function SiteNav({ active = "/" }) {
    return (
        <nav id="nav" aria-label="Navegação principal">
            <div className="w">
                <div className="nv">
                    <a className="logo" href="/" aria-label="MAKIIA, página inicial">
                        <Logo size={28} />
                    </a>
                    <div className="lk" id="lk">
                        {SITE_LINKS.map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                className={active === href ? "act" : undefined}
                                aria-current={active === href ? "page" : undefined}
                            >
                                {label}
                            </a>
                        ))}
                        <div className="lk-m">
                            <a className="btn" href="/login">Entrar</a>
                            <a className="btn pri" href="/login#cadastro">Começar grátis</a>
                        </div>
                    </div>
                    <div className="ac">
                        <a className="btn sm" href="/login">Entrar</a>
                        <a className="btn sm pri mag" href="/login#cadastro">Começar grátis</a>
                        <button className="burger" id="burger" type="button" aria-label="Abrir menu" aria-expanded="false">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
