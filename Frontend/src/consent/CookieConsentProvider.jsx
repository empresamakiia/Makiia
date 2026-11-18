import { useCallback, useEffect, useMemo, useState } from "react";
import { CookieConsentContext } from "./context";
import {
  OPTIONAL_CATEGORIES,
  clearRevokedCookies,
  readConsent,
  writeConsent,
} from "./consent";
import { applyGoogleConsent } from "./analytics";

const allOptional = (value) =>
  Object.fromEntries(OPTIONAL_CATEGORIES.map((id) => [id, value]));

function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  /* Aplica a escolha: carrega o que foi permitido e apaga o que foi retirado */
  useEffect(() => {
    applyGoogleConsent(consent);
    clearRevokedCookies(consent);
  }, [consent]);

  const save = useCallback((choices) => {
    setConsent(writeConsent(choices));
    setPreferencesOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      decided: consent !== null,
      hasConsent: (category) =>
        category === "necessary" || !!consent?.[category],
      acceptAll: () => save(allOptional(true)),
      rejectAll: () => save(allOptional(false)),
      save,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, preferencesOpen, save],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export default CookieConsentProvider;
