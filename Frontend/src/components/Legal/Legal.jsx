import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Legal.css";

/* Peças compartilhadas das páginas legais (Cookies, Termos de Uso). */

const TABS = [
  { to: "/privacidade", label: "Privacidade" },
  { to: "/termos", label: "Termos" },
  { to: "/cookies", label: "Cookies" },
];

/* ---------- Cabeçalho ---------- */
export function LegalHeader({ current }) {
  return (
    <header className="lg-header">
      <Link to="/" className="lg-logo">
        MAKIIA
      </Link>

      <nav className="lg-tabs" aria-label="Políticas">
        {TABS.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`lg-tab${current === tab.to ? " is-active" : ""}`}
            aria-current={current === tab.to ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <a
        href="mailto:privacidade@makiia.com"
        className="lg-btn lg-btn--primary lg-btn--sm"
      >
        Fale com a gente
      </a>
    </header>
  );
}

/* ---------- Menu lateral que acompanha a rolagem ---------- */
export function LegalToc({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="lg-toc">
      <span className="lg-toc__title">Nesta página</span>
      <ul>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`lg-toc__link${active === id ? " is-active" : ""}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ---------- Rodapé ---------- */
export function LegalFooter({ current }) {
  const links = [
    { to: "/privacidade", label: "Política de Privacidade" },
    { to: "/termos", label: "Termos de Uso" },
    { to: "/cookies", label: "Política de Cookies" },
  ];

  return (
    <footer className="lg-footer">
      <div className="lg-footer__inner">
        <div className="lg-footer__brand">
          <Link to="/" className="lg-logo">
            MAKIIA
          </Link>
          <p>Identidade visual e peças de marca com IA, do briefing ao ar.</p>
          <small>© 2026 MAKIIA. Todos os direitos reservados.</small>
        </div>

        <nav aria-label="Links legais">
          <span>Legal</span>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={current === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <span>Contato</span>
          <a href="mailto:privacidade@makiia.com">privacidade@makiia.com</a>
        </div>
      </div>
    </footer>
  );
}
