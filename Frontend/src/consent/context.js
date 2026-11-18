import { createContext, useContext } from "react";

export const CookieConsentContext = createContext(null);

/* Use em qualquer componente:
   const { hasConsent, openPreferences } = useCookieConsent();
   if (hasConsent("preferences")) { ...guardar preferência... } */
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent precisa estar dentro de <CookieConsentProvider>.");
  }
  return context;
}
