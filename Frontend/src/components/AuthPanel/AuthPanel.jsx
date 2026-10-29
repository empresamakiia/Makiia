import { useEffect, useRef, useState } from "react";

/* Painel criativo compartilhado entre Login e Cadastro.
   Os estilos dele ficam em pages/Login/Login.css (o Register.css importa esse arquivo). */

/* ---------- Conteúdo do chat de exemplo ---------- */
const PROMPTS = [
  {
    text: "Crie um cartaz de lançamento da churrascaria Braza.",
    brand: "BRAZA",
    tag: "Grande inauguração",
    grad: "linear-gradient(150deg, #ff8149 0%, #d74688 55%, #7545ff 100%)",
    colors: ["#7545ff", "#d74688", "#ff8149", "#ffbd4a"],
  },
  {
    text: "Faça a identidade visual de uma cafeteria chamada Lume.",
    brand: "Lume",
    tag: "Café de bairro",
    grad: "linear-gradient(150deg, #ffbd4a 0%, #ff8149 45%, #3b1d6e 100%)",
    colors: ["#3b1d6e", "#ff8149", "#ffbd4a", "#f8f5ff"],
  },
  {
    text: "Monte um post de Black Friday para a loja Orbita.",
    brand: "ORBITA",
    tag: "Black Friday −40%",
    grad: "linear-gradient(150deg, #7545ff 0%, #4b2bd0 50%, #d74688 100%)",
    colors: ["#08060f", "#7545ff", "#d74688", "#f8f5ff"],
  },
];

/* ---------- Números que sobem ao aparecer ---------- */
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function Stat({ prefix = "", target, suffix = "", label }) {
  const value = useCountUp(target);
  return (
    <div className="stat-item">
      <strong>
        {prefix}
        {value}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

/* ---------- Chat que escreve, pensa e entrega a peça ---------- */
function CreativeChat() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | thinking | result | leaving
  const prompt = PROMPTS[index];

  useEffect(() => {
    let timer;

    if (phase === "typing") {
      if (typed.length < prompt.text.length) {
        timer = setTimeout(
          () => setTyped(prompt.text.slice(0, typed.length + 1)),
          26 + Math.random() * 44
        );
      } else {
        timer = setTimeout(() => setPhase("thinking"), 450);
      }
    } else if (phase === "thinking") {
      timer = setTimeout(() => setPhase("result"), 2400);
    } else if (phase === "result") {
      timer = setTimeout(() => setPhase("leaving"), 5000);
    } else {
      timer = setTimeout(() => {
        setTyped("");
        setIndex((i) => (i + 1) % PROMPTS.length);
        setPhase("typing");
      }, 650);
    }

    return () => clearTimeout(timer);
  }, [phase, typed, prompt]);

  const sent = phase !== "typing";
  const showResult = phase === "result" || phase === "leaving";

  return (
    <div className={`creative-preview ${phase === "leaving" ? "is-leaving" : ""}`}>
      <div className="preview-bar">
        <span></span>
        <span></span>
        <span></span>
        <p>MAKIIA Studio</p>
      </div>

      <div className="chat-area">
        {sent && (
          <div className="prompt-bubble" key={`b-${index}`}>
            {prompt.text}
          </div>
        )}

        {phase === "thinking" && (
          <div className="generating-status" key={`s-${index}`}>
            <span className="status-dot"></span>
            Esculpindo
            <span className="dots">
              <i>.</i>
              <i>.</i>
              <i>.</i>
            </span>
            <span className="status-progress"></span>
          </div>
        )}

        {showResult && (
          <div className="result-row" key={`r-${index}`}>
            <div className="poster" style={{ background: prompt.grad }}>
              <span className="poster-shape poster-shape-a"></span>
              <span className="poster-shape poster-shape-b"></span>
              <span className="poster-shine"></span>
              <small>{prompt.tag}</small>
              <strong>{prompt.brand}</strong>
            </div>

            <div className="preview-colors" aria-label="Paleta de cores">
              {prompt.colors.map((color, i) => (
                <span
                  key={color}
                  className="color-dot"
                  style={{ background: color, "--i": i }}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <span className={`chat-input-text ${typed ? "" : "empty"}`}>
          {phase === "typing" ? typed : "Descreva sua peça…"}
          {phase === "typing" && <i className="caret"></i>}
        </span>
        <span className={`chat-send ${phase === "typing" && typed.length > 0 ? "ready" : ""}`}>
          ↑
        </span>
      </div>
    </div>
  );
}

/* ---------- Painel completo ---------- */
function AuthPanel({ eyebrow, title }) {
  const panelRef = useRef(null);

  function handlePanelMove(event) {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <aside className="creative-panel" ref={panelRef} onMouseMove={handlePanelMove}>
      <div className="panel-glow panel-glow-purple"></div>
      <div className="panel-glow panel-glow-orange"></div>
      <div className="panel-spotlight"></div>

      <div className="panel-content">
        <div className="panel-intro">
          <p className="panel-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>

        <CreativeChat />

        <div className="panel-stats">
          <Stat target={10} suffix="x" label="mais rápido" />
          <Stat prefix="+" target={50} label="formatos de peças" />
          <Stat target={100} suffix="%" label="coerência de marca" />
        </div>
      </div>
    </aside>
  );
}

export default AuthPanel;