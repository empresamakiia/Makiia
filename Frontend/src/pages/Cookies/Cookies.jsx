import { useState } from "react";
import { Link } from "react-router-dom";
import { LegalToc } from "../../components/Legal/Legal";
import LegalFrame from "../../components/Legal/LegalFrame";
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

/* ---------- Interruptor ---------- */
function Toggle({ checked, disabled, onChange, label, describedBy }) {
  return (
    <label className={`lg-switch${disabled ? " is-locked" : ""}`}>
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
      <ul className="lg-prefs">
        {CATEGORIES.map((category) => (
          <li key={category.id} className="lg-pref">
            <div>
              <h3>
                {category.title}
                {category.locked && <span className="lg-tag">Sempre ativos</span>}
              </h3>
              <p id={`lg-${category.id}-desc`}>{category.description}</p>
            </div>
            <Toggle
              checked={category.locked || draft[category.id]}
              disabled={category.locked}
              label={category.title}
              describedBy={`lg-${category.id}-desc`}
              onChange={(value) =>
                setDraft((d) => ({ ...d, [category.id]: value }))
              }
            />
          </li>
        ))}
      </ul>

      <div className="lg-pref-actions">
        <button
          className="lg-btn lg-btn--primary"
          type="button"
          onClick={() => confirm(() => save(draft))}
        >
          Salvar preferências
        </button>
        <button
          className="lg-btn"
          type="button"
          onClick={() => confirm(acceptAll)}
        >
          Aceitar todos
        </button>
        <button
          className="lg-btn"
          type="button"
          onClick={() => confirm(rejectAll)}
        >
          Recusar opcionais
        </button>

        {savedAt > 0 && (
          <span className="lg-saved" role="status" key={savedAt}>
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
  const [filter, setFilter] = useState("all");
  const [savedAt, setSavedAt] = useState(0);

  const activeCount = CATEGORIES.filter((c) => hasConsent(c.id)).length;
  const rows =
    filter === "all"
      ? COOKIE_LIST
      : COOKIE_LIST.filter((cookie) => cookie.category === filter);

  return (
    <LegalFrame active="/cookies">
    <div className="lg-page">
      <div className="lg-glow lg-glow--top" aria-hidden="true"></div>
      <div className="lg-glow lg-glow--bottom" aria-hidden="true"></div>

      <div className="lg-container">
        {/* ===== Destaque ===== */}
        <section className="lg-hero">
          <div className="lg-hero__text">
            <div className="lg-badge">
              <span>COOKIES</span>
              Atualizada em 18 de novembro de 2026
            </div>
            <h1>
              Você escolhe <span className="lg-gradient">quais cookies</span>{" "}
              ficam.
            </h1>
            <p className="lg-lead">
              Cookies essenciais mantêm a MAKIIA funcionando. Todo o resto só é
              usado com a sua permissão, e você pode mudar de ideia a qualquer
              momento, aqui mesmo.
            </p>
          </div>

          <aside className="lg-summary" aria-label="Resumo das suas escolhas">
            <div className="lg-summary__count">
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

            <ul className="lg-summary__list">
              {CATEGORIES.map((category) => {
                const on = hasConsent(category.id);
                return (
                  <li key={category.id}>
                    <span className={`lg-dot${on ? " is-on" : ""}`}></span>
                    {category.title}
                    <em>{category.locked ? "Sempre ativo" : on ? "Ativo" : "Desligado"}</em>
                  </li>
                );
              })}
            </ul>

            <a href="#preferencias" className="lg-btn lg-btn--block">
              Gerenciar preferências
            </a>
          </aside>
        </section>

        <div className="lg-layout">
          <LegalToc sections={SECTIONS} />

          <main className="lg-content">
            {/* ===== Preferências ===== */}
            <section id="preferencias" className="lg-card lg-card--warm">
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
            <section id="lista" className="lg-card">
              <h2>Lista de cookies</h2>
              <p>
                Todos os cookies que a MAKIIA pode gravar no seu navegador, por
                categoria.
              </p>

              <div className="lg-chips" role="group" aria-label="Filtrar por categoria">
                {[{ id: "all", title: "Todos" }, ...CATEGORIES].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`lg-chip${filter === c.id ? " is-active" : ""}`}
                    aria-pressed={filter === c.id}
                    onClick={() => setFilter(c.id)}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              <div className="lg-table-wrap">
                <table className="lg-table">
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
                          <span className={`lg-cat lg-cat--${cookie.category}`}>
                            {CATEGORY_TITLE[cookie.category]}
                          </span>
                        </td>
                        <td>{cookie.purpose}</td>
                        <td>{cookie.provider}</td>
                        <td className="lg-nowrap">{cookie.duration}</td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="lg-empty">
                          Nenhum cookie desta categoria é usado hoje.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== Tecnologias parecidas ===== */}
            <section id="tecnologias" className="lg-card">
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
            <section id="apagar" className="lg-card">
              <h2>Como apagar cookies</h2>
              <p>
                Ao desligar uma categoria nesta página, apagamos na hora os
                cookies dela. Você também pode bloquear ou apagar cookies pelas
                configurações do navegador: no Chrome, Edge e Firefox fica em
                Configurações → Privacidade e segurança; no Safari, em Ajustes →
                Privacidade.
              </p>
              <div className="lg-callout">
                <strong>Atenção:</strong> apagar os cookies essenciais pode
                desconectar você da sua conta, e o aviso de cookies vai aparecer
                de novo na próxima visita.
              </div>
            </section>

            {/* ===== Chamada ===== */}
            <section className="lg-cta">
              <div>
                <h2>Quer saber como tratamos seus dados?</h2>
                <p>A Política de Privacidade explica tudo, em linguagem direta.</p>
              </div>
              <Link to="/privacidade" className="lg-btn lg-btn--primary">
                Ver Política de Privacidade
              </Link>
            </section>
          </main>
        </div>
      </div>
    </div>
    </LegalFrame>
  );
}
