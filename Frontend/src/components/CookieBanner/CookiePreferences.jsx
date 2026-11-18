import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCookieConsent } from "../../consent/context";
import { CATEGORIES, OPTIONAL_CATEGORIES } from "../../consent/consent";

/* Janela para escolher categoria por categoria.
   Só é montada quando aberta, então o rascunho começa da escolha salva. */
function CookiePreferences() {
  const { consent, save, acceptAll, rejectAll, closePreferences } =
    useCookieConsent();
  const [draft, setDraft] = useState(() =>
    Object.fromEntries(OPTIONAL_CATEGORIES.map((id) => [id, !!consent?.[id]])),
  );
  const dialogRef = useRef(null);

  /* Foco dentro da janela, Esc fecha, e a página atrás não rola */
  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    dialog?.querySelector("button, input")?.focus();

    function handleKey(event) {
      if (event.key === "Escape") closePreferences();
      if (event.key !== "Tab" || !dialog) return;
      const items = dialog.querySelectorAll("button, input, a[href]");
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
      previous?.focus?.();
    };
  }, [closePreferences]);

  return (
    <div
      className="cookie-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePreferences();
      }}
    >
      <div
        className="cookie-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-dialog-title"
        ref={dialogRef}
      >
        <header className="cookie-dialog-header">
          <div>
            <h2 id="cookie-dialog-title">Preferências de cookies</h2>
            <p>
              Escolha o que a MAKIIA pode usar. Você pode mudar isso quando
              quiser na <Link to="/cookies" onClick={closePreferences}>Política de Cookies</Link>.
            </p>
          </div>
          <button
            className="cookie-close"
            type="button"
            onClick={closePreferences}
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <ul className="cookie-categories">
          {CATEGORIES.map((category) => {
            const checked = category.locked ? true : draft[category.id];
            return (
              <li key={category.id} className="cookie-category">
                <div>
                  <h3>
                    {category.title}
                    {category.locked && <span>Sempre ativos</span>}
                  </h3>
                  <p id={`cookie-${category.id}-desc`}>
                    {category.description}
                  </p>
                </div>

                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={category.locked}
                    onChange={(event) =>
                      setDraft((d) => ({
                        ...d,
                        [category.id]: event.target.checked,
                      }))
                    }
                    aria-label={category.title}
                    aria-describedby={`cookie-${category.id}-desc`}
                  />
                  <span aria-hidden="true"></span>
                </label>
              </li>
            );
          })}
        </ul>

        <footer className="cookie-dialog-actions">
          <button
            className="cookie-button cookie-reject"
            type="button"
            onClick={rejectAll}
          >
            Recusar opcionais
          </button>
          <button
            className="cookie-button cookie-reject"
            type="button"
            onClick={() => save(draft)}
          >
            Salvar escolhas
          </button>
          <button
            className="cookie-button cookie-accept"
            type="button"
            onClick={acceptAll}
          >
            Aceitar todos
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CookiePreferences;
