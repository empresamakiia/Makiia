import { useId } from "react";

/*
 * Capas ilustradas dos cards do blog.
 * Todas usam viewBox 360×200 com o motivo principal na faixa central (x 80–280),
 * para funcionar tanto nos cards largos quanto nas miniaturas quadradas e na capa grande.
 */

const FONT = "Sora, system-ui, sans-serif";

const sparkle = (cx, cy, s) =>
    `M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s}Z`;

function Frame({ uid, from, via, to, glow, gx, gy, shift, children }) {
    return (
        <>
            <defs>
                <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={from} />
                    <stop offset=".55" stopColor={via} />
                    <stop offset="1" stopColor={to} />
                </linearGradient>
                <radialGradient id={`${uid}-glow`}>
                    <stop offset="0" stopColor={glow} stopOpacity=".55" />
                    <stop offset="1" stopColor={glow} stopOpacity="0" />
                </radialGradient>
                <linearGradient id={`${uid}-brand`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#5b3cf5" />
                    <stop offset=".5" stopColor="#c73a68" />
                    <stop offset="1" stopColor="#ff8a4c" />
                </linearGradient>
                <linearGradient id={`${uid}-warm`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffbe55" />
                    <stop offset=".55" stopColor="#ff8a4c" />
                    <stop offset="1" stopColor="#c73a68" />
                </linearGradient>
                <pattern id={`${uid}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r=".8" fill="#fff" />
                </pattern>
            </defs>
            <rect width="360" height="200" fill={`url(#${uid}-bg)`} />
            <circle cx={gx} cy={gy} r="160" fill={`url(#${uid}-glow)`} />
            <rect width="360" height="200" fill={`url(#${uid}-dots)`} opacity=".09" />
            <g transform={shift}>{children}</g>
        </>
    );
}

/* 01 · MAKIIA 2 — raciocínio: núcleo com órbitas e rede de ideias */
function Reasoning({ uid, shift }) {
    const c = [180, 92];
    const nodes = [[96, 50], [112, 134], [148, 30], [228, 32], [272, 66], [262, 140], [206, 164], [98, 94], [300, 104]];
    return (
        <Frame uid={uid} shift={shift} from="#0d0824" via="#3a1f9e" to="#c73a68" glow="#7b4dff" gx={180} gy={92}>
            <defs>
                <radialGradient id={`${uid}-core`}>
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".35" stopColor="#ffbe55" />
                    <stop offset=".7" stopColor="#ff8a4c" stopOpacity=".5" />
                    <stop offset="1" stopColor="#ff8a4c" stopOpacity="0" />
                </radialGradient>
            </defs>
            <g stroke="#fff" strokeOpacity=".16" strokeWidth=".8">
                {nodes.map(([x, y], i) => <line key={`c${i}`} x1={c[0]} y1={c[1]} x2={x} y2={y} />)}
                {nodes.map(([x, y], i) => {
                    const [nx, ny] = nodes[(i + 1) % nodes.length];
                    return <line key={`n${i}`} x1={x} y1={y} x2={nx} y2={ny} strokeOpacity=".08" />;
                })}
            </g>
            <g className="cv-spin" style={{ "--dur": "48s", transformOrigin: "180px 92px" }}>
                <ellipse cx="180" cy="92" rx="118" ry="40" fill="none" stroke="#fff" strokeOpacity=".28" transform="rotate(-16 180 92)" />
                <circle cx="293" cy="60" r="4" fill="#ffbe55" />
            </g>
            <g className="cv-spin cv-rev" style={{ "--dur": "34s", transformOrigin: "180px 92px" }}>
                <ellipse cx="180" cy="92" rx="84" ry="28" fill="none" stroke="#fff" strokeOpacity=".22" strokeDasharray="2 5" transform="rotate(32 180 92)" />
                <circle cx="110" cy="48" r="3" fill="#fff" />
            </g>
            {nodes.map(([x, y], i) => (
                <circle key={i} className="cv-blink" style={{ "--delay": `${i * .35}s` }} cx={x} cy={y} r={i % 3 === 0 ? 3.2 : 2.2} fill={i % 3 === 0 ? "#ffbe55" : "#fff"} />
            ))}
            <circle cx="180" cy="92" r="46" fill={`url(#${uid}-core)`} opacity=".9" />
            <circle cx="180" cy="92" r="22" fill="none" stroke="#fff" strokeOpacity=".55" />
            <circle cx="180" cy="92" r="11" fill="#fff" />
            <path d={sparkle(236, 54, 7)} fill="#fff" opacity=".85" />
            <path d={sparkle(128, 150, 5)} fill="#ffbe55" opacity=".8" />
        </Frame>
    );
}

/* 02 · Briefing — conversa que vira campanha */
function Briefing({ uid, shift }) {
    return (
        <Frame uid={uid} shift={shift} from="#170d2b" via="#5b2a86" to="#c73a68" glow="#ff8a4c" gx={250} gy={140}>
            <g className="cv-float" style={{ "--delay": "0s" }}>
                <rect x="80" y="40" width="122" height="40" rx="14" fill="#fff" opacity=".95" />
                <path d="M94 80 L90 90 L104 80Z" fill="#fff" opacity=".95" />
                <rect x="94" y="52" width="84" height="5" rx="2.5" fill="#2a1940" opacity=".75" />
                <rect x="94" y="63" width="56" height="5" rx="2.5" fill="#2a1940" opacity=".4" />
            </g>
            <g className="cv-float" style={{ "--delay": ".6s" }}>
                <rect x="104" y="94" width="96" height="30" rx="13" fill={`url(#${uid}-brand)`} />
                <rect x="117" y="102" width="62" height="4.5" rx="2.2" fill="#fff" opacity=".9" />
                <rect x="117" y="111" width="38" height="4.5" rx="2.2" fill="#fff" opacity=".55" />
            </g>
            <g>
                <rect x="120" y="134" width="42" height="18" rx="9" fill="#fff" opacity=".12" />
                {[131, 141, 151].map((x, i) => <circle key={x} className="cv-blink" style={{ "--delay": `${i * .2}s` }} cx={x} cy="143" r="2.2" fill="#fff" />)}
            </g>
            <path d="M206 58 C 238 50, 254 70, 250 92" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.4" strokeDasharray="3 4" />
            <path d="M245 87 L250 95 L255 87" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.4" strokeLinecap="round" />
            <g className="cv-float" style={{ "--delay": "1.1s" }}>
                <circle cx="250" cy="128" r="30" fill={`url(#${uid}-warm)`} />
                <circle cx="250" cy="128" r="36" fill="none" stroke="#fff" strokeOpacity=".3" />
                <path d="M239 143 C 247 137, 254 127, 261 113" fill="none" stroke="#21120d" strokeWidth="3.2" strokeLinecap="round" />
            </g>
            <path d={sparkle(286, 96, 7)} fill="#fff" />
            <path d={sparkle(218, 160, 4.5)} fill="#ffbe55" />
        </Frame>
    );
}

/* 03 · Consistência — story, post e cartaz com a mesma linguagem */
function System({ uid, shift }) {
    const pieces = [
        { x: 92, y: 48, w: 50, h: 90, r: -8 },
        { x: 150, y: 38, w: 70, h: 90, r: 0 },
        { x: 230, y: 50, w: 54, h: 80, r: 8 },
    ];
    return (
        <Frame uid={uid} shift={shift} from="#0c0918" via="#22164a" to="#4a1e5e" glow="#7b4dff" gx={180} gy={96}>
            <defs>
                {pieces.map((p, i) => (
                    <clipPath key={i} id={`${uid}-clip${i}`}><rect x={p.x} y={p.y} width={p.w} height={p.h} rx="7" /></clipPath>
                ))}
            </defs>
            {pieces.map((p, i) => {
                const cx = p.x + p.w / 2, band = p.h * .48;
                return (
                    <g key={i} className="cv-float" style={{ "--delay": `${i * .5}s` }}>
                        <g transform={`rotate(${p.r} ${cx} ${p.y + p.h / 2})`}>
                            <rect x={p.x + 3} y={p.y + 6} width={p.w} height={p.h} rx="7" fill="#000" opacity=".3" />
                            <g clipPath={`url(#${uid}-clip${i})`}>
                                <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="#f6efe6" />
                                <rect x={p.x} y={p.y} width={p.w} height={band} fill={`url(#${uid}-brand)`} />
                            </g>
                            <circle cx={cx} cy={p.y + band} r={p.w * .16} fill="#171019" stroke="#f6efe6" strokeWidth="2" />
                            <rect x={p.x + 8} y={p.y + p.h * .7} width={p.w - 16} height="4" rx="2" fill="#171019" opacity=".75" />
                            <rect x={p.x + 8} y={p.y + p.h * .7 + 8} width={(p.w - 16) * .6} height="4" rx="2" fill="#171019" opacity=".35" />
                        </g>
                    </g>
                );
            })}
            <path d="M 68 92 L 300 92" stroke="#ffbe55" strokeOpacity=".75" strokeDasharray="2 5" />
            <text x="180" y="168" textAnchor="middle" fontFamily={FONT} fontSize="7" letterSpacing="2.4" fill="#fff" opacity=".6">STORY · POST · CARTAZ</text>
        </Frame>
    );
}

/* 04 · Paleta — leque de amostras de cor */
function Palette({ uid, shift }) {
    const chips = [
        { a: -36, c: "#5b3cf5", n: "INDIGO", h: "#5B3CF5" },
        { a: -18, c: "#7b4dff", n: "VIOLETA", h: "#7B4DFF" },
        { a: 0, c: "#c73a68", n: "MAGENTA", h: "#C73A68" },
        { a: 18, c: "#ff8a4c", n: "LARANJA", h: "#FF8A4C" },
        { a: 36, c: "#ffbe55", n: "ÂMBAR", h: "#FFBE55" },
    ];
    return (
        <Frame uid={uid} shift={shift} from="#0b0816" via="#1d1240" to="#3b1450" glow="#c73a68" gx={180} gy={190}>
            {chips.map((chip) => (
                <g key={chip.n} className="cv-chip" style={{ "--a": `${chip.a}deg` }}>
                    <rect x="157" y="36" width="46" height="136" rx="7" fill="#000" opacity=".25" transform="translate(2 3)" />
                    <rect x="157" y="36" width="46" height="136" rx="7" fill={chip.c} />
                    <rect x="160" y="128" width="40" height="40" rx="4" fill="#f7f2ea" />
                    <text x="164" y="142" fontFamily={FONT} fontSize="5.6" fontWeight="600" fill="#241a33">{chip.n}</text>
                    <text x="164" y="151" fontFamily={FONT} fontSize="5" fill="#241a33" opacity=".6">{chip.h}</text>
                </g>
            ))}
            <circle cx="180" cy="178" r="6" fill="#f7f2ea" stroke="#171019" strokeWidth="2" />
            <path d={sparkle(92, 46, 6)} fill="#fff" opacity=".8" />
            <path d={sparkle(276, 34, 4.5)} fill="#ffbe55" />
        </Frame>
    );
}

/* 05 · Brand kit — prancha com logo, tipografia, cores e padrão */
function BrandKit({ uid, shift }) {
    const tile = "#171019";
    return (
        <Frame uid={uid} shift={shift} from="#ff6f45" via="#ff9a52" to="#ffc35e" glow="#fff3d6" gx={90} gy={20}>
            <defs>
                <filter id={`${uid}-sh`} x="-20%" y="-20%" width="140%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#5a1f10" floodOpacity=".35" />
                </filter>
            </defs>
            <g filter={`url(#${uid}-sh)`}>
                <g className="cv-float" style={{ "--delay": "0s" }}>
                    <rect x="84" y="32" width="88" height="136" rx="12" fill={tile} />
                    <circle cx="128" cy="84" r="24" fill={`url(#${uid}-brand)`} />
                    <path d="M117 98 C 125 92, 132 83, 139 69" fill="none" stroke={tile} strokeWidth="3" strokeLinecap="round" />
                    <rect x="104" y="124" width="48" height="6" rx="3" fill="#fff" opacity=".9" />
                    <rect x="114" y="136" width="28" height="4" rx="2" fill="#fff" opacity=".4" />
                </g>
                <g className="cv-float" style={{ "--delay": ".4s" }}>
                    <rect x="180" y="32" width="46" height="62" rx="12" fill={tile} />
                    <text x="203" y="71" textAnchor="middle" fontFamily={FONT} fontSize="22" fontWeight="600" fill="#fff">Aa</text>
                </g>
                <g className="cv-float" style={{ "--delay": ".8s" }}>
                    <rect x="234" y="32" width="46" height="62" rx="12" fill={tile} />
                    <circle cx="249" cy="52" r="7" fill="#5b3cf5" />
                    <circle cx="266" cy="52" r="7" fill="#c73a68" />
                    <circle cx="249" cy="73" r="7" fill="#ff8a4c" />
                    <circle cx="266" cy="73" r="7" fill="#ffbe55" />
                </g>
                <g className="cv-float" style={{ "--delay": "1.2s" }}>
                    <rect x="180" y="102" width="100" height="66" rx="12" fill={tile} />
                    {[0, 1, 2].flatMap((r) => [0, 1, 2, 3, 4].map((col) => (
                        <circle key={`${r}-${col}`} cx={194 + col * 18} cy={118 + r * 17} r="4.5"
                            fill={(r + col) % 2 ? "none" : "#ff8a4c"} stroke="#ff8a4c" strokeOpacity=".8" strokeWidth="1.4" />
                    )))}
                </g>
            </g>
        </Frame>
    );
}

/* 06 · Formatos — proporções sobrepostas como uma régua */
function Formats({ uid, shift }) {
    const top = 46, h = 100;
    const frames = [
        { w: 178, label: "16:9", o: .4, dash: "4 4" },
        { w: 100, label: "1:1", o: .55 },
        { w: 80, label: "4:5", o: .8 },
    ];
    return (
        <Frame uid={uid} shift={shift} from="#4b2fd6" via="#ce477b" to="#ff8a4c" glow="#ffbe55" gx={300} gy={20}>
            {frames.map((f) => (
                <rect key={f.label} x={180 - f.w / 2} y={top} width={f.w} height={h} rx="5" fill="none" stroke="#fff" strokeOpacity={f.o} strokeWidth="1.4" strokeDasharray={f.dash} />
            ))}
            <g className="cv-float" style={{ "--delay": ".3s" }}>
                <rect x="152" y={top} width="56" height={h} rx="7" fill="#fff" opacity=".95" />
                <rect x="152" y={top} width="56" height="46" rx="7" fill={`url(#${uid}-brand)`} />
                <rect x="152" y={top + 36} width="56" height="10" fill={`url(#${uid}-brand)`} />
                <circle cx="180" cy={top + 46} r="9" fill="#171019" stroke="#fff" strokeWidth="2" />
                <rect x="160" y={top + 66} width="40" height="4" rx="2" fill="#171019" opacity=".75" />
                <rect x="160" y={top + 74} width="24" height="4" rx="2" fill="#171019" opacity=".35" />
            </g>
            {[[91, top], [269, top], [91, top + h], [269, top + h]].map(([x, y], i) => (
                <path key={i} d={`M${x + (x < 180 ? -8 : 8)} ${y} H${x} V${y + (y < 100 ? -8 : 8)}`} fill="none" stroke="#fff" strokeOpacity=".7" />
            ))}
            <text x="180" y="168" textAnchor="middle" fontFamily={FONT} fontSize="7" letterSpacing="2.4" fill="#fff" opacity=".8">9:16 · 4:5 · 1:1 · 16:9</text>
        </Frame>
    );
}

/* 07 · Bastidores — grade de construção de um símbolo */
function Construction({ uid, shift }) {
    return (
        <Frame uid={uid} shift={shift} from="#120a22" via="#4a1a5a" to="#be3c7f" glow="#6a44f8" gx={80} gy={40}>
            <defs>
                <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0 H0 V20" fill="none" stroke="#fff" strokeOpacity=".07" />
                </pattern>
            </defs>
            <rect width="360" height="200" fill={`url(#${uid}-grid)`} />
            <g stroke="#fff" strokeOpacity=".22" strokeDasharray="3 4">
                <line x1="40" y1="100" x2="320" y2="100" />
                <line x1="180" y1="16" x2="180" y2="184" />
                <line x1="100" y1="20" x2="260" y2="180" strokeOpacity=".12" />
                <line x1="260" y1="20" x2="100" y2="180" strokeOpacity=".12" />
            </g>
            <g className="cv-spin" style={{ "--dur": "70s", transformOrigin: "180px 100px" }}>
                <circle cx="180" cy="100" r="72" fill="none" stroke="#fff" strokeOpacity=".3" strokeDasharray="2 6" />
                <circle cx="252" cy="100" r="2.5" fill="#ffbe55" />
            </g>
            <circle cx="158" cy="100" r="42" fill="none" stroke="#fff" strokeOpacity=".7" />
            <circle cx="202" cy="100" r="42" fill="none" stroke="#fff" strokeOpacity=".7" />
            <path d="M180 64.2 A42 42 0 0 1 180 135.8 A42 42 0 0 1 180 64.2Z" fill={`url(#${uid}-warm)`} />
            {[[158, 100], [202, 100], [180, 64.2], [180, 135.8]].map(([x, y], i) => (
                <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5" fill="#120a22" stroke="#fff" />
            ))}
            <g stroke="#fff" strokeOpacity=".6">
                <line x1="158" y1="156" x2="200" y2="156" />
                <line x1="158" y1="152" x2="158" y2="160" />
                <line x1="200" y1="152" x2="200" y2="160" />
            </g>
            <text x="179" y="170" textAnchor="middle" fontFamily={FONT} fontSize="7" fill="#fff" opacity=".7">r 42</text>
            <text x="246" y="38" fontFamily={FONT} fontSize="7" fill="#fff" opacity=".55">Ø 144</text>
        </Frame>
    );
}

const covers = {
    reasoning: Reasoning,
    briefing: Briefing,
    system: System,
    palette: Palette,
    kit: BrandKit,
    formats: Formats,
    construction: Construction,
};

export default function BlogCover({ kind, large = false }) {
    const uid = "cv" + useId().replace(/[^a-zA-Z0-9]/g, "");
    const Cover = covers[kind] ?? Reasoning;
    return (
        <svg className="blog-cover-svg" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            <Cover uid={uid} shift={large ? "translate(108 -4) scale(.8)" : undefined} />
        </svg>
    );
}
