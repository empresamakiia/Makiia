import { useId, useState } from "react";

/*
 * Arte do card "Uma ideia. Mil formas."
 * Uma forma central (a ideia) se transforma continuamente em várias formas,
 * com ecos em contorno e uma órbita de pequenas variações ao redor.
 */

const N = 72;
const TAU = Math.PI * 2;

// Raio (0–1) de cada forma em função do ângulo. Todas usam o mesmo número de pontos para permitir o morph.
const shapes = {
    circle: () => 1,
    squircle: (t) => 0.92 * Math.pow(Math.pow(Math.abs(Math.cos(t)), 4) + Math.pow(Math.abs(Math.sin(t)), 4), -0.25) * 0.86,
    star: (t) => 0.74 + 0.26 * Math.cos(5 * (t + Math.PI / 2)),
    flower: (t) => 0.82 + 0.18 * Math.cos(6 * t),
    triangle: (t) => {
        const a = TAU / 3;
        const k = ((t + Math.PI / 2) % a + a) % a - a / 2;
        return 0.62 * (0.5 / Math.cos(k)) * 1.55 + 0.08;
    },
    blob: (t) => 0.86 + 0.09 * Math.sin(3 * t + 0.6) + 0.06 * Math.cos(5 * t),
};

function pathFor(fn, r) {
    let d = "";
    for (let i = 0; i < N; i++) {
        const t = (i / N) * TAU;
        const rr = fn(t) * r;
        d += `${i ? "L" : "M"}${(Math.cos(t) * rr).toFixed(2)} ${(Math.sin(t) * rr).toFixed(2)}`;
    }
    return d + "Z";
}

const order = ["circle", "squircle", "star", "flower", "triangle", "blob", "circle"];
const morphValues = (r) => order.map((k) => pathFor(shapes[k], r)).join(";");
const keyTimes = order.map((_, i) => (i / (order.length - 1)).toFixed(3)).join(";");
const keySplines = Array(order.length - 1).fill(".7 0 .2 1").join(";");

const CX = 262;
const CY = 96;

// Pequenas formas na órbita: cada uma é uma "variação" da ideia.
const orbit = [
    (x, y) => <circle cx={x} cy={y} r="6" />,
    (x, y) => <rect x={x - 5.5} y={y - 5.5} width="11" height="11" rx="2.5" />,
    (x, y) => <path d={`M${x} ${y - 7} L${x + 6.5} ${y + 5} L${x - 6.5} ${y + 5}Z`} />,
    (x, y) => <circle cx={x} cy={y} r="5.5" fill="none" strokeWidth="2.4" />,
    (x, y) => <path d={`M${x - 6} ${y}H${x + 6}M${x} ${y - 6}V${y + 6}`} fill="none" strokeWidth="2.6" strokeLinecap="round" />,
    (x, y) => <path d={`M${x} ${y - 7} L${x + 7} ${y} L${x} ${y + 7} L${x - 7} ${y}Z`} />,
    (x, y) => <path d={`M${x - 6.5} ${y + 3} A6.5 6.5 0 0 1 ${x + 6.5} ${y + 3}Z`} />,
    (x, y) => <path d={`M${x} ${y - 7} Q${x} ${y} ${x + 7} ${y} Q${x} ${y} ${x} ${y + 7} Q${x} ${y} ${x - 7} ${y} Q${x} ${y} ${x} ${y - 7}Z`} />,
];

export default function IdeaArt() {
    const uid = "idea" + useId().replace(/[^a-zA-Z0-9]/g, "");
    const [still] = useState(() =>
        typeof window !== "undefined" &&
        (window.matchMedia("(prefers-reduced-motion: reduce)").matches || location.hash === "#estatico"));

    const morph = (r, begin = "0s") => still ? null : (
        <animate attributeName="d" dur="14s" begin={begin} repeatCount="indefinite"
            values={morphValues(r)} keyTimes={keyTimes} calcMode="spline" keySplines={keySplines} />
    );

    const R = 40;

    return (
        <svg className="idea-art" viewBox="0 0 360 220" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id={`${uid}-glow`}>
                    <stop offset="0" stopColor="#fff" stopOpacity=".55" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#ffe3cf" />
                </linearGradient>
                <pattern id={`${uid}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r=".8" fill="#fff" />
                </pattern>
                <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset=".55" stopColor="#fff" stopOpacity="1" />
                </linearGradient>
                <mask id={`${uid}-mask`}>
                    <rect width="360" height="220" fill={`url(#${uid}-fade)`} />
                </mask>
            </defs>

            <rect width="360" height="220" fill={`url(#${uid}-dots)`} opacity=".14" mask={`url(#${uid}-mask)`} />
            <circle cx={CX} cy={CY} r="120" fill={`url(#${uid}-glow)`} opacity=".6" />

            {/* trilhas da órbita */}
            <circle cx={CX} cy={CY} r="66" fill="none" stroke="#fff" strokeOpacity=".28" strokeDasharray="2 6" />
            <circle cx={CX} cy={CY} r="86" fill="none" stroke="#fff" strokeOpacity=".14" />

            {/* formas em órbita */}
            <g className="idea-orbit" style={{ transformOrigin: `${CX}px ${CY}px` }} fill="#fff" stroke="#fff">
                {orbit.map((draw, i) => {
                    const a = (i / orbit.length) * TAU - Math.PI / 2;
                    const r = i % 2 ? 86 : 66;
                    return (
                        <g key={i} opacity={i % 2 ? .55 : .9} strokeWidth="0">
                            {draw(CX + Math.cos(a) * r, CY + Math.sin(a) * r)}
                        </g>
                    );
                })}
            </g>

            {/* ecos da forma central */}
            <path d={pathFor(shapes.circle, R * 1.55)} transform={`translate(${CX} ${CY})`} fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.2">
                {morph(R * 1.55, "-1.2s")}
            </path>
            <path d={pathFor(shapes.circle, R * 1.27)} transform={`translate(${CX} ${CY})`} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1.4">
                {morph(R * 1.27, "-.6s")}
            </path>

            {/* a ideia */}
            <g className="idea-core" style={{ transformOrigin: `${CX}px ${CY}px` }}>
                <path d={pathFor(shapes.circle, R)} transform={`translate(${CX} ${CY})`} fill={`url(#${uid}-fill)`}>
                    {morph(R)}
                </path>
            </g>
            <circle cx={CX} cy={CY} r="9" fill="#C73A68" />
            <circle cx={CX} cy={CY} r="3.5" fill="#fff" />

            {/* brilhos */}
            <path className="idea-twinkle" d="M196 34 Q196 40 202 40 Q196 40 196 46 Q196 40 190 40 Q196 40 196 34Z" fill="#fff" />
            <path className="idea-twinkle idea-twinkle--late" d="M336 176 Q336 180 340 180 Q336 180 336 184 Q336 180 332 180 Q336 180 336 176Z" fill="#fff" />
        </svg>
    );
}
