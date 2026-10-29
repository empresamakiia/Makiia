import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CursorGlow from "./components/CursorGlow/CursorGlow";

function App() {
  useEffect(() => {
    document.documentElement.classList.add(
      "app-smooth-scroll",
      "app-hide-cursor"
    );

    return () => {
      document.documentElement.classList.remove(
        "app-smooth-scroll",
        "app-hide-cursor"
      );
    };
  }, []);

  return (
    <BrowserRouter>
      <CursorGlow />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;