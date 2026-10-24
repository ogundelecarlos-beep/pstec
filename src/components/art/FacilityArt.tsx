/**
 * Ilustração CONCEITUAL de uma célula de produção, em vista frontal técnica.
 * Formas genéricas (sem marcas, números ou capacidades). Quadro 1400 × 700.
 */
export function FacilityArt() {
  const line = { fill: 'none', stroke: '#C4CFDC', strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  const thin = { fill: 'none', stroke: 'rgba(196,207,220,.45)', strokeWidth: 1.2 };
  const accent = { fill: 'none', stroke: '#A9E06B', strokeWidth: 2, strokeLinecap: 'round' as const };
  return (
    <svg viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="fa-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14254A" />
          <stop offset="1" stopColor="#0E1A30" />
        </linearGradient>
        <pattern id="fa-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.05)" />
        </pattern>
        <linearGradient id="fa-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A5384" />
          <stop offset="1" stopColor="#22355C" />
        </linearGradient>
        <linearGradient id="fa-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6EBF0" />
          <stop offset="1" stopColor="#8D98A4" />
        </linearGradient>
        <linearGradient id="fa-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22355C" />
          <stop offset="1" stopColor="#14254A" />
        </linearGradient>
      </defs>

      <rect width="1400" height="700" fill="url(#fa-bg)" />
      <rect width="1400" height="700" fill="url(#fa-grid)" />
      {/* piso */}
      <rect y="600" width="1400" height="100" fill="url(#fa-floor)" />
      <path d="M0 600 H1400" stroke="#C4CFDC" strokeWidth="2" />
      <path {...thin} strokeDasharray="10 12" d="M0 640 H1400" />
      {/* faixa de circulação */}
      <path d="M40 668 H1360" stroke="#A9E06B" strokeOpacity=".5" strokeWidth="4" strokeDasharray="28 18" />

      {/* A — Conformação (prensa genérica) */}
      <g>
        <rect x="90" y="140" width="40" height="460" fill="url(#fa-metal)" />
        <rect x="250" y="140" width="40" height="460" fill="url(#fa-metal)" />
        <rect x="70" y="110" width="240" height="70" rx="6" fill="url(#fa-metal)" {...{ stroke: '#C4CFDC', strokeWidth: 2 }} />
        <rect x="150" y="180" width="80" height="120" fill="url(#fa-steel)" />
        <rect x="140" y="300" width="100" height="22" fill="#8D98A4" />
        <rect x="120" y="440" width="140" height="40" fill="url(#fa-steel)" />
        <rect x="80" y="480" width="220" height="120" fill="url(#fa-metal)" {...{ stroke: '#C4CFDC', strokeWidth: 2 }} />
        <path {...thin} d="M190 330 V430" strokeDasharray="6 6" />
        <path {...accent} d="M175 420 l15 18 15-18" />
        <rect x="310" y="380" width="44" height="80" rx="6" {...line} />
        <circle cx="332" cy="402" r="8" fill="#A9E06B" />
        <circle cx="332" cy="432" r="8" fill="#B42318" opacity=".85" />
      </g>

      {/* B — Bancada de montagem */}
      <g>
        <rect x="390" y="450" width="300" height="22" rx="3" fill="url(#fa-steel)" />
        <path {...line} d="M410 472 V600 M670 472 V600 M410 560 H670" />
        <rect x="430" y="360" width="220" height="90" rx="4" {...thin} />
        <path {...thin} d="M430 395 H650" />
        {/* peças sobre a bancada */}
        <path d="M440 440 C460 440 465 420 480 420 C495 420 495 445 510 445 C525 445 522 440 535 440" fill="none" stroke="#C9773F" strokeWidth="7" />
        <rect x="560" y="430" width="70" height="14" rx="3" fill="#8D98A4" />
        <rect x="595" y="420" width="36" height="12" rx="2" fill="#B98A3E" />
        <path {...line} d="M460 380 h24 M500 380 h24 M540 380 h24" />
      </g>

      {/* C — Inspeção */}
      <g>
        <rect x="740" y="470" width="170" height="18" rx="3" fill="url(#fa-steel)" />
        <path {...line} d="M760 488 V600 M890 488 V600" />
        <path {...line} d="M880 470 V330 L820 300" />
        <path d="M800 292 l40 20 -10 18 -40 -20 z" fill="#C4CFDC" />
        <path d="M790 330 L770 470 M850 340 L870 470" stroke="#FFE7CF" strokeOpacity=".25" strokeWidth="2" />
        <circle cx="790" cy="455" r="12" {...accent} />
        <path {...accent} d="M799 464 l14 12" />
        <rect x="830" y="448" width="50" height="14" rx="3" fill="#C9773F" />
      </g>

      {/* D — Prateleira de matéria-prima */}
      <g>
        <path {...line} d="M960 130 V600 M1160 130 V600" />
        {[180, 290, 400, 510].map((y) => (
          <path key={y} d={`M960 ${y} H1160`} stroke="#C4CFDC" strokeWidth="6" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={975} y={158 + i * 4} width="170" height="3" fill={i % 2 ? '#C9773F' : '#DE9461'} />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={980 + i * 55} y="250" width="45" height="38" rx="3" fill="url(#fa-steel)" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={975} y={370 + i * 7} width="170" height="5" fill="#8D98A4" />
        ))}
        <circle cx="1010" cy="480" r="26" fill="none" stroke="#C9773F" strokeWidth="9" />
        <circle cx="1090" cy="480" r="26" fill="none" stroke="#8D98A4" strokeWidth="9" />
      </g>

      {/* E — Expedição */}
      <g>
        <rect x="1200" y="575" width="160" height="25" fill="#5B4A3A" />
        <path d="M1210 600 v-25 M1280 600 v-25 M1350 600 v-25" stroke="#3B2F25" strokeWidth="6" />
        <rect x="1210" y="485" width="70" height="90" fill="#B98A5E" />
        <rect x="1285" y="505" width="65" height="70" fill="#A57A50" />
        <rect x="1225" y="420" width="90" height="65" fill="#C49A6C" />
        <path d="M1245 420 v65 M1305 505 v70 M1230 485 v90" stroke="#8C6640" strokeWidth="3" />
        <path {...accent} d="M1180 640 h60 l-12 -10 M1240 640 l-12 10" />
      </g>

      {/* luminárias */}
      {[240, 560, 830, 1060, 1280].map((x) => (
        <g key={x}>
          <path d={`M${x} 0 V40`} {...thin} />
          <path d={`M${x - 40} 40 h80 l-12 14 h-56 z`} fill="#C4CFDC" opacity=".8" />
        </g>
      ))}
    </svg>
  );
}
