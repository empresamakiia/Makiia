import { useEffect, useState } from "react";
import { useCookieConsent } from "../../consent/context";
import CookiePreferences from "./CookiePreferences";
import "./CookieBanner.css";

function CookieBanner() {
  const { decided, acceptAll, rejectAll, preferencesOpen, openPreferences } =
    useCookieConsent();
  const [visible, setVisible] = useState(false);

  /* Aparece logo depois da página carregar, só se ainda não houver escolha */
  useEffect(() => {
    if (decided) return undefined;
    const timer = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(timer);
  }, [decided]);

  /* Depois da escolha, o aviso sai com animação e então desmonta */
  const leaving = decided;

  return (
    <>
      {visible && (
        <CookieNotice
          leaving={leaving}
          onGone={() => setVisible(false)}
          onAccept={acceptAll}
          onReject={rejectAll}
          onManage={openPreferences}
        />
      )}
      {preferencesOpen && <CookiePreferences />}
    </>
  );
}

function CookieNotice({ leaving, onGone, onAccept, onReject, onManage }) {
  return (
    <section
      className={`cookie-banner${leaving ? " is-leaving" : ""}`}
      role="region"
      aria-label="Aviso de cookies"
      onAnimationEnd={(event) => {
        if (leaving && event.target === event.currentTarget) onGone();
      }}
    >
      <div className="cookie-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
          <defs>
            <linearGradient id="cookie-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff8149" />
              <stop offset="0.5" stopColor="#e0478f" />
              <stop offset="1" stopColor="#8a4dff" />
            </linearGradient>
          </defs>
          <path
            stroke="url(#cookie-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.5 12.6A8.5 8.5 0 1 1 11.4 3.5a3 3 0 0 0 3.6 3.6 3 3 0 0 0 3.6 3.6 2.6 2.6 0 0 0 1.9 1.9z"
          />
          <circle cx="8.5" cy="10" r="1.1" fill="url(#cookie-grad)" />
          <circle cx="12.5" cy="15" r="1.1" fill="url(#cookie-grad)" />
          <circle cx="8" cy="15.2" r="0.8" fill="url(#cookie-grad)" />
        </svg>
      </div>

      <div className="cookie-text">
        <h2>Usamos cookies</h2>
        <p>
          Para o site funcionar e, com a sua permissão, para melhorar sua
          experiência.{" "}
          <button className="cookie-link" type="button" onClick={onManage}>
            Gerenciar cookies
          </button>
        </p>
      </div>

      <div className="cookie-actions">
        <button
          className="cookie-button cookie-reject"
          type="button"
          onClick={onReject}
        >
          Recusar
        </button>
        <button
          className="cookie-button cookie-accept"
          type="button"
          onClick={onAccept}
        >
          Aceitar
        </button>
      </div>
    </section>
  );
}

export default CookieBanner;
