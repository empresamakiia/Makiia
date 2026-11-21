import { useId } from "react";

/*
 * Arte do banner "Uma dúvida. Uma resposta."
 * Um rabisco embaraçado (a dúvida) sai de um balão com "?" e se desembaraça
 * numa linha reta que termina no "✓" (a resposta). A animação roda em loop.
 */
export default function AjudaArt() {
    const uid = "aj" + useId().replace(/[^a-zA-Z0-9]/g, "");

    return (
        <svg className="ajuda-art-svg" viewBox="0 0 300 180" preserveAspectRatio="xMaxYMin slice" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id={`${uid}-glow`}>
                    <stop offset="0" stopColor="#fff" stopOpacity=".5" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={`${uid}-check`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7b4dff" />
                    <stop offset=".55" stopColor="#c73a68" />
                    <stop offset="1" stopColor="#ff8a4c" />
                </linearGradient>
                <pattern id={`${uid}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r=".8" fill="#fff" />
                </pattern>
            </defs>

            <rect width="300" height="180" fill={`url(#${uid}-dots)`} opacity=".12" />
            <circle cx="234" cy="50" r="90" fill={`url(#${uid}-glow)`} opacity=".55" />

            <g transform="translate(22 -6) scale(.9)">
            {/* a dúvida: balão com "?" */}
            <g className="ajuda-art-ask">
                <rect x="84" y="16" width="44" height="34" rx="12" fill="#fff" fillOpacity=".2" stroke="#fff" strokeOpacity=".55" />
                <path d="M96 50 L92 59 L104 50Z" fill="#fff" fillOpacity=".2" />
                <text x="106" y="41" textAnchor="middle" fontFamily="Sora, system-ui, sans-serif" fontSize="22" fontWeight="600" fill="#fff">?</text>
            </g>

            {/* trilha completa, bem suave, para dar contexto */}
            <path d="M126 54 C 142 40, 166 44, 158 58 S 130 70, 142 54 S 182 50, 176 70 S 164 84, 186 80 C 200 76, 194 66, 206 64"
                fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round" />
            {/* o rabisco se desenhando até a resposta */}
            <path className="ajuda-art-line" pathLength="100"
                d="M126 54 C 142 40, 166 44, 158 58 S 130 70, 142 54 S 182 50, 176 70 S 164 84, 186 80 C 200 76, 194 66, 206 64"
                fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />

            {/* a resposta */}
            <circle className="ajuda-art-pulse" cx="236" cy="62" r="30" fill="none" stroke="#fff" strokeOpacity=".6" />
            <circle cx="236" cy="62" r="30" fill="#fff" />
            <path className="ajuda-art-check" pathLength="100" d="M222 63 L232 73 L251 52"
                fill="none" stroke={`url(#${uid}-check)`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

            </g>

            {/* brilhos */}
            <path className="ajuda-art-spark" d="M276 22 Q276 28 282 28 Q276 28 276 34 Q276 28 270 28 Q276 28 276 22Z" fill="#fff" />
            <path className="ajuda-art-spark ajuda-art-spark--late" d="M290 112 Q290 116 294 116 Q290 116 290 120 Q290 116 286 116 Q290 116 290 112Z" fill="#fff" />
            <circle cx="270" cy="84" r="2.5" fill="#fff" opacity=".7" />
            <circle cx="62" cy="34" r="2" fill="#fff" opacity=".5" />
        </svg>
    );
}
