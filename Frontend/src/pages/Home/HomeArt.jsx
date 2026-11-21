import { useId } from "react";

/*
 * Artes da landing (Home).
 * - Símbolos do chat (Grão, Selo, Xícara) e o selo do cartaz
 * - Logos de exemplo e prancha de identidade (Recursos)
 * - Artes das etapas (Como funciona)
 * - Refinamento ao vivo (Na prática)
 */

const ESP = "#2a160d";
const CREAM = "#f4e6cf";
const CARAMEL = "#c98c45";
const TERRA = "#d8693f";
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "Sora, system-ui, sans-serif";

const useUid = (p) => p + useId().replace(/[^a-zA-Z0-9]/g, "");

/* ============ símbolos da cafeteria ============ */

export function BeanMark({ size = 48, className }) {
    const uid = useUid("bean");
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
            <defs>
                <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#e6ab62" />
                    <stop offset="1" stopColor="#a85f27" />
                </linearGradient>
            </defs>
            <g transform="rotate(-28 24 24)">
                <ellipse cx="24" cy="24" rx="13" ry="17.5" fill={`url(#${uid})`} />
                <path d="M24 7.5 C 18.5 15, 29.5 31, 24 40.5" fill="none" stroke={ESP} strokeWidth="2.8" strokeLinecap="round" />
                <ellipse cx="18.5" cy="16.5" rx="2.6" ry="5" fill="#fff" opacity=".22" />
            </g>
        </svg>
    );
}

function scallop(cx, cy, r1, r2, n) {
    let d = "";
    for (let i = 0; i <= n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 ? r2 : r1;
        d += `${i ? "L" : "M"}${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
    }
    return d + "Z";
}

export function SealMark({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
            <path d={scallop(24, 24, 21.5, 19.2, 18)} fill={CARAMEL} />
            <circle cx="24" cy="24" r="16" fill={ESP} />
            <circle cx="24" cy="24" r="13" fill="none" stroke={CREAM} strokeOpacity=".55" strokeDasharray="1.2 2" />
            <text x="24" y="27.6" textAnchor="middle" fontFamily={SERIF} fontSize="11" fontWeight="700" fill={CREAM}>G&amp;P</text>
            <path d="M18 17.5h12" stroke={CARAMEL} strokeWidth="1" />
            <path d="M18 31h12" stroke={CARAMEL} strokeWidth="1" />
        </svg>
    );
}

export function CupMark({ size = 48 }) {
    const uid = useUid("cup");
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
            <defs>
                <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e08a52" />
                    <stop offset="1" stopColor="#b44f2b" />
                </linearGradient>
            </defs>
            {/* vapor que vira balão de conversa: a "prosa" */}
            <path d="M20 21 C 17.5 18, 22.5 16.5, 20.5 13.5" fill="none" stroke={CREAM} strokeWidth="1.8" strokeLinecap="round" />
            <rect x="21" y="4" width="20" height="11.5" rx="5.75" fill={CREAM} />
            <path d="M24.5 14.5 L22 18.5 L28.5 15.2Z" fill={CREAM} />
            <circle cx="26.5" cy="9.75" r="1.2" fill={ESP} />
            <circle cx="31" cy="9.75" r="1.2" fill={ESP} />
            <circle cx="35.5" cy="9.75" r="1.2" fill={ESP} />
            <ellipse cx="22" cy="41.5" rx="15" ry="2.4" fill={CARAMEL} opacity=".7" />
            <path d="M9 23 h26 v6 a10 10 0 0 1 -10 10 h-6 a10 10 0 0 1 -10 -10 Z" fill={`url(#${uid})`} />
            <rect x="9" y="22" width="26" height="2.6" rx="1.3" fill={CREAM} />
            <path d="M35 25.5 h2.5 a4.5 4.5 0 0 1 0 9 h-3.5" fill="none" stroke="#b44f2b" strokeWidth="2.6" />
        </svg>
    );
}

/* selo circular que gira no canto do cartaz */
export function PosterStamp() {
    const uid = useUid("stamp");
    return (
        <svg className="poster-stamp" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
                <path id={uid} d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
            </defs>
            <circle cx="50" cy="50" r="48" fill={CARAMEL} />
            <circle cx="50" cy="50" r="27" fill={ESP} />
            <g className="poster-stamp-ring">
                <text fontFamily={SANS} fontSize="10.5" fontWeight="600" letterSpacing="2.6" fill={ESP}>
                    <textPath href={`#${uid}`}>TORRA DA SEMANA · ORIGEM ÚNICA ·</textPath>
                </text>
            </g>
            <g transform="translate(34 34) scale(.67)"><BeanPaths /></g>
        </svg>
    );
}

function BeanPaths() {
    return (
        <g transform="rotate(-28 24 24)">
            <ellipse cx="24" cy="24" rx="13" ry="17.5" fill="#e6ab62" />
            <path d="M24 7.5 C 18.5 15, 29.5 31, 24 40.5" fill="none" stroke={ESP} strokeWidth="2.8" strokeLinecap="round" />
        </g>
    );
}

/* ============ Recursos: logos de exemplo ============ */

function LogoTile({ children, bg, label }) {
    return (
        <div className="logo-tile" style={{ background: bg }} title={label}>
            <svg viewBox="0 0 160 110" aria-hidden="true">{children}</svg>
        </div>
    );
}

function OndaLogo() {
    return (
        <>
            <circle cx="80" cy="37" r="19" fill="#1d0f2b" />
            <path d="M64 40 c5 -6 10.5 -6 16 0 s11 6 16 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="M66 47 c4.5 -4 9 -4 14 0 s9.5 4 14 0" fill="none" stroke="#ff9a52" strokeWidth="2.4" strokeLinecap="round" />
            <text x="80" y="78" textAnchor="middle" fontFamily={SANS} fontSize="20" fontWeight="600" letterSpacing="-.6" fill="#1d0f2b">onda</text>
            <text x="80" y="92" textAnchor="middle" fontFamily={SANS} fontSize="6.5" letterSpacing="2.4" fill="#1d0f2b" opacity=".7">SURF CLUB</text>
        </>
    );
}

function FloraLogo() {
    return (
        <>
            {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="80" cy="25" rx="6.5" ry="12" fill="#c73a68" opacity=".82" transform={`rotate(${a} 80 37)`} />
            ))}
            <circle cx="80" cy="37" r="4.5" fill="#ffbe55" />
            <text x="80" y="79" textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize="22" fontWeight="600" fill="#5b1a33">Flora</text>
            <text x="80" y="92" textAnchor="middle" fontFamily={SANS} fontSize="6.5" letterSpacing="2.4" fill="#c73a68">ATELIÊ BOTÂNICO</text>
        </>
    );
}

export function LogoShowcase() {
    return (
        <div className="logo-show" aria-label="Exemplos de logos criados pela MAKIIA">
            <div className="logo-show-head">
                <span>LOGOS GERADOS · 4 DE 12</span>
                <span>BRIEFING → CONCEITO</span>
            </div>
            <div className="logo-show-grid">
                <LogoTile bg="#23120a" label="Grão & Prosa — cafeteria">
                    <g transform="translate(62 14) scale(.75)"><BeanPaths /></g>
                    <text x="80" y="76" textAnchor="middle" fontFamily={SERIF} fontSize="19" fontWeight="600" fill={CREAM}>Grão &amp; Prosa</text>
                    <text x="80" y="92" textAnchor="middle" fontFamily={SANS} fontSize="6.5" letterSpacing="2.4" fill={CARAMEL}>CAFETERIA</text>
                </LogoTile>
                <LogoTile bg="linear-gradient(150deg,#1c1645,#120e2c)" label="Vértice — arquitetura">
                    <path d="M58 52 L76 22 L94 52Z" fill="none" stroke="#a58bff" strokeWidth="3" strokeLinejoin="round" />
                    <path d="M72 52 L86 30 L102 52Z" fill="#7b4dff" opacity=".85" />
                    <text x="80" y="76" textAnchor="middle" fontFamily={SANS} fontSize="13" fontWeight="600" letterSpacing="4.5" fill="#fff">VÉRTICE</text>
                    <text x="80" y="92" textAnchor="middle" fontFamily={SANS} fontSize="6.5" letterSpacing="2.4" fill="#a58bff">ARQUITETURA</text>
                </LogoTile>
                <LogoTile bg="linear-gradient(150deg,#ff9a52,#ffc35e)" label="Onda — surf club">
                    <OndaLogo />
                </LogoTile>
                <LogoTile bg="#f7eaf0" label="Flora — ateliê botânico">
                    <FloraLogo />
                </LogoTile>
            </div>
        </div>
    );
}

/* ============ Recursos: prancha de identidade ============ */

export function IdentityBoard() {
    const palette = [["#1D0F2B", "#fff"], ["#FF8A4C", "#1d0f2b"], ["#FFBE55", "#1d0f2b"], ["#F6EFE6", "#1d0f2b"]];
    return (
        <div className="idb" aria-hidden="true">
            <div className="idb-logo">
                <svg viewBox="0 0 48 48" width="34" height="34">
                    <circle cx="24" cy="24" r="22" fill="#1d0f2b" />
                    <path d="M8 26 c5 -6 10.5 -6 16 0 s11 6 16 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    <path d="M11 33 c4 -4 8.5 -4 13 0 s9 4 13 0" fill="none" stroke="#ff9a52" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <div><strong>onda</strong><small>SURF CLUB</small></div>
            </div>
            <div className="idb-type">
                <strong>Aa</strong>
                <small>Sora · 600 / 400</small>
            </div>
            <div className="idb-pal">
                {palette.map(([c, t]) => <span key={c} style={{ background: c, color: t }}>{c}</span>)}
            </div>
            <div className="idb-pattern">
                <svg viewBox="0 0 240 22" preserveAspectRatio="none">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <path key={i} d={`M${i * 30} 14 c7.5 -8 15 -8 22.5 0`} fill="none" stroke={i % 2 ? "#ffbe55" : "#ff8a4c"} strokeWidth="2.4" strokeLinecap="round" />
                    ))}
                </svg>
                <small>PADRÃO</small>
            </div>
        </div>
    );
}

/* ============ Como funciona: artes das etapas ============ */

export function StepBriefing() {
    return (
        <div className="step-art sa-briefing" aria-hidden="true">
            <div className="sa-bubble">“Cafeteria acolhedora no centro. Tom leve, sem clichê de café.”</div>
            <div className="sa-tags">
                <span><b>Público</b> 25–40</span>
                <span><b>Tom</b> acolhedor</span>
                <span><b>Canal</b> Instagram</span>
            </div>
        </div>
    );
}

export function StepConcept() {
    return (
        <div className="step-art sa-routes" aria-hidden="true">
            <div className="sa-route">
                <svg viewBox="0 0 80 50">
                    <rect width="80" height="50" fill="#f4e6cf" />
                    <g transform="translate(9 9) scale(.66)"><BeanPaths /></g>
                    <rect x="44" y="17" width="26" height="4" rx="2" fill={ESP} />
                    <rect x="44" y="26" width="18" height="3" rx="1.5" fill={ESP} opacity=".4" />
                </svg>
                <span>A · Artesanal</span>
            </div>
            <div className="sa-route is-picked">
                <svg viewBox="0 0 80 50">
                    <rect width="80" height="50" fill="#1b1435" />
                    <circle cx="26" cy="25" r="13" fill="#7b4dff" />
                    <rect x="32" y="12" width="26" height="26" rx="6" fill="#ff8a4c" opacity=".9" />
                </svg>
                <span>B · Moderna</span>
                <i>✓</i>
            </div>
            <div className="sa-route">
                <svg viewBox="0 0 80 50">
                    <rect width="80" height="50" fill="#0d0b10" />
                    <text x="10" y="35" fontFamily={SERIF} fontSize="28" fontWeight="600" fill="#f4e6cf">Aa</text>
                    <path d="M48 16 H72 M48 25 H68 M48 34 H72" stroke="#c73a68" strokeWidth="2" />
                </svg>
                <span>C · Editorial</span>
            </div>
        </div>
    );
}

export function StepIdentity() {
    return (
        <div className="step-art sa-identity" aria-hidden="true">
            <div className="sa-lockup">
                <BeanMark size={30} />
                <div><strong>Grão &amp; Prosa</strong><small>CAFETERIA</small></div>
            </div>
            <div className="sa-swatches">
                {[ESP, CARAMEL, TERRA, CREAM].map((c) => <i key={c} style={{ background: c }} />)}
            </div>
            <em>Aa</em>
        </div>
    );
}

export function StepPieces() {
    return (
        <div className="step-art sa-pieces" aria-hidden="true">
            <svg viewBox="0 0 300 92">
                {/* post */}
                <g className="sa-piece">
                    <rect x="14" y="8" width="76" height="76" rx="8" fill={ESP} />
                    <g transform="translate(22 16) scale(.42)"><BeanPaths /></g>
                    <text x="22" y="62" fontFamily={SERIF} fontSize="13" fontWeight="600" fill={CREAM}>Bom café,</text>
                    <text x="22" y="74" fontFamily={SERIF} fontSize="13" fontWeight="600" fill={CARAMEL}>sem pressa.</text>
                </g>
                {/* story */}
                <g className="sa-piece" style={{ animationDelay: ".3s" }}>
                    <rect x="104" y="4" width="46" height="84" rx="8" fill={CARAMEL} />
                    <circle cx="127" cy="34" r="13" fill={ESP} />
                    <g transform="translate(119.5 26.5) scale(.31)"><BeanPaths /></g>
                    <rect x="112" y="58" width="30" height="4" rx="2" fill={ESP} />
                    <rect x="116" y="67" width="22" height="3" rx="1.5" fill={ESP} opacity=".5" />
                    <rect x="114" y="76" width="26" height="7" rx="3.5" fill={CREAM} />
                </g>
                {/* banner */}
                <g className="sa-piece" style={{ animationDelay: ".6s" }}>
                    <rect x="164" y="22" width="122" height="48" rx="8" fill={CREAM} />
                    <rect x="164" y="22" width="40" height="48" rx="8" fill={TERRA} />
                    <rect x="196" y="22" width="8" height="48" fill={TERRA} />
                    <g transform="translate(172 34) scale(.5)"><BeanPaths /></g>
                    <text x="212" y="42" fontFamily={SERIF} fontSize="12" fontWeight="600" fill={ESP}>Grão &amp; Prosa</text>
                    <text x="212" y="56" fontFamily={SANS} fontSize="6" letterSpacing="1.5" fill={ESP} opacity=".7">ABERTO 7H–19H</text>
                </g>
            </svg>
            <div className="sa-pieces-legend"><span>POST</span><span>STORY</span><span>BANNER</span></div>
        </div>
    );
}

/* ============ Na prática: refinamento ao vivo ============ */

function PosterOriginal() {
    return (
        <svg viewBox="0 0 160 200" aria-hidden="true">
            <defs>
                <radialGradient id="pa-o-glow" cx=".5" cy=".62" r=".55">
                    <stop offset="0" stopColor="#7a4426" />
                    <stop offset="1" stopColor="#1c0e07" />
                </radialGradient>
            </defs>
            <rect width="160" height="200" fill="url(#pa-o-glow)" />
            <g transform="translate(12 12) scale(.32)"><BeanPaths /></g>
            <text x="30" y="22" fontFamily={SERIF} fontSize="11" fontWeight="600" fill={CREAM}>Grão &amp; Prosa</text>
            <line x1="12" y1="30" x2="148" y2="30" stroke={CREAM} strokeOpacity=".3" />
            <text x="14" y="56" fontFamily={SERIF} fontSize="22" fontWeight="600" fill={CREAM}>O tempo pede</text>
            <text x="14" y="77" fontFamily={SERIF} fontSize="22" fontWeight="600" fill={CREAM}>um bom café.</text>
            {/* xícara */}
            <ellipse cx="80" cy="168" rx="46" ry="7" fill="#000" opacity=".35" />
            <ellipse cx="80" cy="162" rx="44" ry="7" fill={CARAMEL} opacity=".55" />
            <path d="M46 120 h68 v14 a26 26 0 0 1 -26 26 h-16 a26 26 0 0 1 -26 -26 Z" fill={CREAM} />
            <ellipse cx="80" cy="120" rx="34" ry="6" fill="#3a1d0f" />
            <path d="M114 126 h6 a10 10 0 0 1 0 20 h-8" fill="none" stroke={CREAM} strokeWidth="5" />
            <path d="M70 110 c-5 -6 5 -9 0 -16 M84 110 c-5 -6 5 -9 0 -16" fill="none" stroke={CREAM} strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
            <text x="14" y="190" fontFamily={SANS} fontSize="5.5" letterSpacing="1.6" fill={CREAM} opacity=".8">ESPRESSO · COADOS · DOCES</text>
        </svg>
    );
}

function PosterMinimal() {
    return (
        <svg viewBox="0 0 160 200" aria-hidden="true">
            <rect width="160" height="200" fill="#f6eddd" />
            <g transform="translate(62 66) scale(.75)"><BeanPaths /></g>
            <text x="80" y="128" textAnchor="middle" fontFamily={SERIF} fontSize="15" fontWeight="600" fill={ESP}>Grão &amp; Prosa</text>
            <text x="80" y="141" textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize="10" fill={ESP} opacity=".7">café, com calma.</text>
            <line x1="68" y1="176" x2="92" y2="176" stroke={ESP} strokeOpacity=".4" />
            <text x="80" y="188" textAnchor="middle" fontFamily={SANS} fontSize="5" letterSpacing="1.6" fill={ESP} opacity=".6">7H — 19H</text>
        </svg>
    );
}

function PosterBold() {
    return (
        <svg viewBox="0 0 160 200" aria-hidden="true">
            <defs>
                <linearGradient id="pa-b-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ef7a45" />
                    <stop offset="1" stopColor="#c9461f" />
                </linearGradient>
            </defs>
            <rect width="160" height="200" fill="url(#pa-b-bg)" />
            <text x="10" y="74" fontFamily={SANS} fontSize="40" fontWeight="600" letterSpacing="-2" fill={ESP}>CAFÉ</text>
            <text x="10" y="112" fontFamily={SANS} fontSize="40" fontWeight="600" letterSpacing="-2" fill={CREAM}>FORTE.</text>
            <text x="10" y="134" fontFamily={SANS} fontSize="7" letterSpacing="1.4" fill={ESP}>TORRA ESCURA · SÓ ESTA SEMANA</text>
            <circle cx="124" cy="166" r="22" fill={ESP} />
            <text x="124" y="164" textAnchor="middle" fontFamily={SANS} fontSize="8" fontWeight="600" fill={CREAM}>NOVO</text>
            <text x="124" y="174" textAnchor="middle" fontFamily={SANS} fontSize="5" letterSpacing="1" fill={CARAMEL}>BLEND</text>
            <g transform="translate(12 160) scale(.42)"><BeanPaths /></g>
            <text x="34" y="176" fontFamily={SERIF} fontSize="10" fontWeight="600" fill={ESP}>Grão &amp; Prosa</text>
        </svg>
    );
}

export function PraticaArt() {
    const prompts = [
        "Crie o cartaz da Grão & Prosa",
        "Deixe mais minimalista",
        "Agora um tom mais ousado",
    ];
    const labels = ["v1 · Original", "v2 · Minimalista", "v3 · Ousado"];
    const posters = [<PosterOriginal key="o" />, <PosterMinimal key="m" />, <PosterBold key="b" />];
    return (
        <div className="brand-lab pa" aria-label="Demonstração: três pedidos na conversa geram três versões da mesma peça">
            <div className="brand-lab-top">
                <span><i className="brand-live"></i> REFINAMENTO AO VIVO</span>
                <span>3 VERSÕES · 1 IDENTIDADE</span>
            </div>
            <div className="pa-stage">
                <div className="pa-chat">
                    {prompts.map((p, i) => (
                        <div key={p} className={`pa-prompt pa-k${i}`}>
                            <span className="pa-prompt-text">{p}</span>
                            <span className="pa-prompt-ok">{labels[i]}</span>
                        </div>
                    ))}
                    <div className="pa-input"><span>Peça um ajuste…</span><i>↑</i></div>
                </div>
                <div className="pa-deck">
                    {posters.map((p, i) => (
                        <div key={i} className={`pa-poster pa-k${i}`}>
                            {p}
                            <span className="pa-tag">{labels[i]}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="brand-lab-caption">
                <span>Uma conversa. Três versões.</span>
                <span>MESMA IDENTIDADE</span>
            </div>
        </div>
    );
}

