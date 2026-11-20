import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CursorGlow from "./components/CursorGlow/CursorGlow";
import Chat from "./pages/Chat/Chat";

// Páginas adicionadas pela equipe
import Cookies from "./pages/Cookies/Cookies";
import TermosDeUso from "./pages/TermodeUso/TermosdeUso";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import CookieConsentProvider from "./consent/CookieConsentProvider";

// Página Sobre
import Sobre from "./pages/Sobre/Sobre";

function App() {
  useEffect(() => {
    document.documentElement.classList.add(
      "app-smooth-scroll",
      "app-hide-cursor",
    );

    return () => {
      document.documentElement.classList.remove(
        "app-smooth-scroll",
        "app-hide-cursor",
      );
    };
  }, []);

  return (
    <BrowserRouter>
      <CookieConsentProvider>
        <CursorGlow />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/termos" element={<TermosDeUso />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>

        <CookieBanner />
      </CookieConsentProvider>
    </BrowserRouter>
  );
}

export default App;