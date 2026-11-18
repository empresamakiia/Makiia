import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookieConsent } from "../../consent/context";
import {
  CATEGORIES,
  COOKIE_LIST,
  OPTIONAL_CATEGORIES,
} from "../../consent/consent";
import "./Cookies.css";

const SECTIONS = [
  { id: "preferencias", label: "Suas preferências" },
  { id: "lista", label: "Lista de cookies" },
  { id: "tecnologias", label: "Tecnologias parecidas" },
  { id: "apagar", label: "Como apagar cookies" },
];

const CATEGORY_TITLE = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.title]),
);

/* ---------- Menu lateral que acompanha a rolagem ---------- */
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ---------- Interruptor ---------- */
function Toggle({ checked, disabled, onChange, label, describedBy }) {
  return (
    <label className={`ck-switch${disabled ? " is-locked" : ""}`}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        aria-label={label}
        aria-describedby={describedBy}
      />
      <span aria-hidden="true"></span>
    </label>
  );
}

/* ---------- Preferências na própria página ---------- */
function PreferencesForm({ savedAt, onSaved }) {
  const { consent, save, acceptAll, rejectAll } = useCookieConsent();
  const [draft, setDraft] = useState(() =>
    Object.fromEntries(OPTIONAL_CATEGORIES.map((id) => [id, !!consent?.[id]])),
  );
  function confirm(action) {
    action();
    onSaved(Date.now());
  }

  return (
    <>
      <ul className="ck-prefs">
        {CATEGORIES.map((category) => (
          <li key={category.id} className="ck-pref">
            <div>
              <h3>
                {category.title}
                {category.locked && <span className="ck-tag">Sempre ativos</span>}
              </h3>
              <p id={`ck-${category.id}-desc`}>{category.description}</p>
            </div>
            <Toggle
              checked={category.locked || draft[category.id]}
              disabled={category.locked}
              label={category.title}
              describedBy={`ck-${category.id}-desc`}
              onChange={(value) =>
                setDraft((d) => ({ ...d, [category.id]: value }))
              }
            />
          </li>
        ))}
      </ul>

      <div className="ck-pref-actions">
        <button
          className="ck-btn ck-btn--primary"
          type="button"
          onClick={() => confirm(() => save(draft))}
        >
          Salvar preferências
        </button>
        <button
          className="ck-btn"
          type="button"
          onClick={() => confirm(acceptAll)}
        >
          Aceitar todos
        </button>
        <button
          className="ck-btn"
          type="button"
          onClick={() => confirm(rejectAll)}
        >
          Recusar opcionais
        </button>

        {savedAt > 0 && (
          <span className="ck-saved" role="status" key={savedAt}>
            ✓ Preferências salvas
          </span>
        )}
      </div>
    </>
  );
}

/* ---------- Página ---------- */
export default function Cookies() {
  const { consent, hasConsent } = useCookieConsent();
  const active = useActiveSection();
  const [filter, setFilter] = useState("all");
  const [savedAt, setSavedAt] = useState(0);

  const activeCount = CATEGORIES.filter((c) => hasConsent(c.id)).length;
  const rows =
    filter === "all"
      ? COOKIE_LIST
      : COOKIE_LIST.filter((cookie) => cookie.category === filter);

  return (
    <div className="ck-page">
      <div className="ck-glow ck-glow--top" aria-hidden="true"></div>
      <div className="ck-glow ck-glow--bottom" aria-hidden="true"></div>

      <div className="ck-container">
        {/* ===== Cabeçalho ===== */}
        <header className="ck-header">
          <Link to="/" className="ck-logo">
            MAKIIA
          </Link>

          <nav className="ck-tabs" aria-label="Políticas">
            <Link to="/privacidade" className="ck-tab">
              Privacidade
            </Link>
            <Link to="/termos" className="ck-tab">
              Termos
            </Link>
            <Link to="/cookies" className="ck-tab is-active" aria-current="page">
              Cookies
            </Link>
          </nav>

          <a href="mailto:privacidade@makiia.com" className="ck-btn ck-btn--primary ck-btn--sm">
            Fale com a gente
          </a>
        </header>

        {/* ===== Destaque ===== */}
        <section className="ck-hero">
          <div className="ck-hero__text">
            <div className="ck-badge">
              <span>COOKIES</span>
              Atualizada em 18 de novembro de 2026
            </div>
            <h1>
              Você escolhe <span className="ck-gradient">quais cookies</span>{" "}
              ficam.
            </h1>
            <p className="ck-lead">
              Cookies essenciais mantêm a MAKIIA funcionando. Todo o resto só é
              usado com a sua permissão, e você pode mudar de ideia a qualquer
              momento, aqui mesmo.
            </p>
          </div>

          <aside className="ck-summary" aria-label="Resumo das suas escolhas">
            <div className="ck-summary__count">
              <strong>
                {activeCount}
                <small>/{CATEGORIES.length}</small>
              </strong>
              <div>
                <span>categorias ativas</span>
                <p>
                  {consent
                    ? `Escolha salva em ${new Date(consent.date).toLocaleDateString("pt-BR")}`
                    : "Você ainda não fez uma escolha"}
                </p>
              </div>
            </div>

            <ul className="ck-summary__list">
              {CATEGORIES.map((category) => {
                const on = hasConsent(category.id);
                return (
                  <li key={category.id}>
                    <span className={`ck-dot${on ? " is-on" : ""}`}></span>
                    {category.title}
                    <em>{category.locked ? "Sempre ativo" : on ? "Ativo" : "Desligado"}</em>
                  </li>
                );
              })}
            </ul>

            <a href="#preferencias" className="ck-btn ck-btn--block">
              Gerenciar preferências
            </a>
          </aside>
        </section>

        <div className="ck-layout">
          {/* ===== Menu lateral ===== */}
          <aside className="ck-toc">
            <span className="ck-toc__title">Nesta página</span>
            <ul>
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`ck-toc__link${active === id ? " is-active" : ""}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ck-content">
            {/* ===== Preferências ===== */}
            <section id="preferencias" className="ck-card ck-card--warm">
              <h2>Suas preferências</h2>
              <p>
                Ative ou desative cada categoria. A escolha vale para este
                navegador por 6 meses, e você pode alterá-la quando quiser.
              </p>
              {/* key: recarrega o formulário se a escolha mudar pelo aviso */}
              <PreferencesForm
                key={consent?.date ?? "none"}
                savedAt={savedAt}
                onSaved={setSavedAt}
              />
            </section>

            {/* ===== Lista ===== */}
            <section id="lista" className="ck-card">
              <h2>Lista de cookies</h2>
              <p>
                Todos os cookies que a MAKIIA pode gravar no seu navegador, por
                categoria.
              </p>

              <div className="ck-chips" role="group" aria-label="Filtrar por categoria">
                {[{ id: "all", title: "Todos" }, ...CATEGORIES].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`ck-chip${filter === c.id ? " is-active" : ""}`}
                    aria-pressed={filter === c.id}
                    onClick={() => setFilter(c.id)}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              <div className="ck-table-wrap">
                <table className="ck-table">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Para que serve</th>
                      <th scope="col">Provedor</th>
                      <th scope="col">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((cookie) => (
                      <tr key={cookie.name}>
                        <td>
                          <code>{cookie.name}</code>
                        </td>
                        <td>
                          <span className={`ck-cat ck-cat--${cookie.category}`}>
                            {CATEGORY_TITLE[cookie.category]}
                          </span>
                        </td>
                        <td>{cookie.purpose}</td>
                        <td>{cookie.provider}</td>
                        <td className="ck-nowrap">{cookie.duration}</td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="ck-empty">
                          Nenhum cookie desta categoria é usado hoje.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== Tecnologias parecidas ===== */}
            <section id="tecnologias" className="ck-card">
              <h2>Tecnologias parecidas</h2>
              <p>
                Além de cookies, sites podem usar o armazenamento local do
                navegador (localStorage), pixels e identificadores de
                dispositivo. Na MAKIIA, qualquer tecnologia desse tipo segue as
                mesmas categorias acima e respeita a mesma escolha que você
                fizer aqui. Desligou uma categoria, desligou tudo dela.
              </p>
            </section>

            {/* ===== Como apagar ===== */}
            <section id="apagar" className="ck-card">
              <h2>Como apagar cookies</h2>
              <p>
                Ao desligar uma categoria nesta página, apagamos na hora os
                cookies dela. Você também pode bloquear ou apagar cookies pelas
                configurações do navegador: no Chrome, Edge e Firefox fica em
                Configurações → Privacidade e segurança; no Safari, em Ajustes →
                Privacidade.
              </p>
              <div className="ck-callout">
                <strong>Atenção:</strong> apagar os cookies essenciais pode
                desconectar você da sua conta, e o aviso de cookies vai aparecer
                de novo na próxima visita.
              </div>
            </section>

            {/* ===== Chamada ===== */}
            <section className="ck-cta">
              <div>
                <h2>Quer saber como tratamos seus dados?</h2>
                <p>A Política de Privacidade explica tudo, em linguagem direta.</p>
              </div>
              <Link to="/privacidade" className="ck-btn ck-btn--primary">
                Ver Política de Privacidade
              </Link>
            </section>
          </main>
        </div>
      </div>

      {/* ===== Rodapé ===== */}
      <footer className="ck-footer">
        <div className="ck-footer__inner">
          <div className="ck-footer__brand">
            <Link to="/" className="ck-logo">
              MAKIIA
            </Link>
            <p>Identidade visual e peças de marca com IA, do briefing ao ar.</p>
            <small>© 2026 MAKIIA. Todos os direitos reservados.</small>
          </div>

          <nav aria-label="Links legais">
            <span>Legal</span>
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/cookies" aria-current="page">
              Política de Cookies
            </Link>
          </nav>

          <div>
            <span>Contato</span>
            <a href="mailto:privacidade@makiia.com">privacidade@makiia.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
