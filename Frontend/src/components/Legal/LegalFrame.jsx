import { useEffect } from "react";
import initLanding from "../../pages/Home/Main.js";
import SiteNav from "../SiteNav/SiteNav.jsx";
import SiteFooter from "../SiteFooter/SiteFooter.jsx";
import "../../pages/Home/Home.css";
import "./LegalFrame.css";

// Navbar das páginas legais: só os três documentos (o logo leva ao início).
const LEGAL_LINKS = [
  ["/privacidade", "Privacidade"],
  ["/termos", "Termos"],
  ["/cookies", "Cookies"],
];

/**
 * Moldura padrão do site para Privacidade, Termos e Cookies:
 * fundo animado, cursor, barra de progresso, navbar e footer iguais às demais páginas.
 * O conteúdo de cada documento entra como `children`, sem alterações.
 */
export default function LegalFrame({ active, children }) {
  // Mesmo motor da landing: fundo animado, cursor, progresso, navbar e menu mobile.
  useEffect(() => initLanding(), []);

  return (
    <>
      <canvas id="bg" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div id="cursor" aria-hidden="true" />
      <div className="progress" aria-hidden="true"><i /></div>

      <SiteNav active={active} links={LEGAL_LINKS} />

      <div id="top" className="legal-frame">
        {children}
      </div>

      <SiteFooter active={active} />
    </>
  );
}
