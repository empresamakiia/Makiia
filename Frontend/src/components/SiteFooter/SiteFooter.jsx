import Logo from "../Logo/Logo.jsx";

/* Footer único do site: todos os links levam a páginas reais. */
const COLUMNS = [
    ["Produto", [
        ["/#recursos", "Recursos"],
        ["/#como", "Como funciona"],
        ["/#planos", "Planos"],
        ["/#faq", "Dúvidas"],
    ]],
    ["Empresa", [
        ["/", "Início"],
        ["/sobre", "Sobre"],
        ["/blog", "Blog"],
        ["/contato", "Contato"],
        ["/ajuda", "Ajuda"],
    ]],
    ["Legal", [
        ["/termos", "Termos de uso"],
        ["/privacidade", "Privacidade"],
        ["/cookies", "Cookies"],
    ]],
];

export default function SiteFooter({ active }) {
    return (
        <footer>
            <div className="w">
                <div className="fg">
                    <div>
                        <a className="logo" href="/" aria-label="MAKIIA, página inicial">
                            <Logo size={28} />
                        </a>
                        <p>
                            IA criativa para quem constrói campanhas: logos, identidade visual
                            e peças em uma só conversa.
                        </p>
                    </div>
                    {COLUMNS.map(([title, links]) => (
                        <div key={title}>
                            <h4>{title}</h4>
                            {links.map(([href, label]) => (
                                <a key={href} href={href} aria-current={active === href ? "page" : undefined}>
                                    {label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="big" aria-hidden="true">MAKIIA</div>
                <div className="fb">
                    <span>© 2026 MAKIIA</span>
                    <a href="#top">Voltar ao topo</a>
                </div>
            </div>
        </footer>
    );
}
