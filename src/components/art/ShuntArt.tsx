/**
 * Representação CONCEITUAL de uma conexão flexível laminada, desenhada em SVG.
 * Mesma geometria em duas versões: “volume” (renderização) e “lines” (desenho
 * técnico). Não há cotas, valores ou capacidades — os traços são de apresentação.
 */

export const LAM = 'M190 290 C250 290 270 150 340 150 C410 150 400 400 470 400 C540 400 530 290 600 290';
export const LAYERS = 13;
export const GAP = 4;
export const COPPER = ['#6E3415', '#C9773F', '#A85A2A', '#DE9461', '#B4663A', '#E6A273', '#B0612F', '#D98B55', '#A3542A', '#CF8048', '#9A4C22', '#C47039', '#7A3A18'];

export const SHUNT_VIEWBOX = '0 0 800 520';

export function ShuntVolume({ id = 'v', glow = false }: { id?: string; glow?: boolean }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-tin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".45" stopColor="#D6DCE2" />
          <stop offset="1" stopColor="#8E979F" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#AEB6BE" />
          <stop offset="1" stopColor="#7C858E" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#E08A4E" stopOpacity=".28" />
          <stop offset="1" stopColor="#E08A4E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity=".35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="470" rx="330" ry="26" fill={`url(#${id}-shadow)`} />
      {glow && <ellipse cx="400" cy="300" rx="300" ry="170" fill={`url(#${id}-glow)`} />}
      {COPPER.map((c, i) => (
        <path key={i} d={LAM} transform={`translate(0 ${i * GAP})`} fill="none" stroke={c} strokeWidth={5} />
      ))}
      <path d={LAM} transform="translate(0 12)" fill="none" stroke="#FFE2C4" strokeOpacity=".55" strokeWidth={2} />
      {/* terminais */}
      <rect x="70" y="276" width="126" height="58" rx="3" fill={`url(#${id}-tin)`} />
      <rect x="70" y="334" width="126" height="12" fill={`url(#${id}-side)`} />
      <rect x="180" y="276" width="16" height="70" fill="#C88550" opacity=".55" />
      <ellipse cx="118" cy="307" rx="16" ry="13" fill="#5B6670" />
      <ellipse cx="118" cy="304" rx="16" ry="10" fill="#26303A" />
      <rect x="594" y="276" width="136" height="58" rx="3" fill={`url(#${id}-tin)`} />
      <rect x="594" y="334" width="136" height="12" fill={`url(#${id}-side)`} />
      <rect x="594" y="276" width="16" height="70" fill="#C88550" opacity=".55" />
      <ellipse cx="682" cy="307" rx="16" ry="13" fill="#5B6670" />
      <ellipse cx="682" cy="304" rx="16" ry="10" fill="#26303A" />
    </g>
  );
}

/** Versão em linhas, sobre fundo escuro. `drawClass` recebe a animação de traçado. */
export function ShuntLines({ stroke = '#A9E06B', muted = 'rgba(255,255,255,.35)', drawClass = '' }: { stroke?: string; muted?: string; drawClass?: string }) {
  const bottom = (LAYERS - 1) * GAP;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* linhas de construção */}
      <g stroke={muted} strokeWidth="1" strokeDasharray="6 8">
        <path d="M40 305 H760" />
        <path d="M340 90 V470 M470 90 V470" />
        <circle cx="118" cy="305" r="34" />
        <circle cx="682" cy="305" r="34" />
      </g>
      {/* contorno do feixe laminado */}
      <path className={drawClass} pathLength={1} d={LAM} stroke={stroke} strokeWidth="2" />
      <path className={drawClass} pathLength={1} d={LAM} transform={`translate(0 ${bottom})`} stroke={stroke} strokeWidth="2" />
      {[3, 6, 9].map((i) => (
        <path key={i} className={drawClass} pathLength={1} d={LAM} transform={`translate(0 ${i * GAP})`} stroke={stroke} strokeOpacity=".45" strokeWidth="1" />
      ))}
      {/* terminais */}
      <g stroke={stroke} strokeWidth="2">
        <rect className={drawClass} pathLength={1} x="70" y="276" width="126" height="70" rx="3" />
        <rect className={drawClass} pathLength={1} x="594" y="276" width="136" height="70" rx="3" />
        <circle cx="118" cy="305" r="15" />
        <circle cx="682" cy="305" r="15" />
      </g>
      {/* marcas de referência (sem valores) */}
      <g stroke={muted} strokeWidth="1.2">
        <path d="M70 380 V420 M730 380 V420 M70 406 H730" />
        <path d="M70 406 l10 -5 v10 z M730 406 l-10 -5 v10 z" fill={muted} />
      </g>
    </g>
  );
}

/** Pontos de anotação no espaço do viewBox (apresentação, não medição). */
export const SHUNT_NOTES = [
  { id: 'laminas', x: 340, y: 150, label: 'Lâminas sobrepostas', left: false },
  { id: 'curva', x: 470, y: 440, label: 'Curva de flexão', left: false },
  { id: 'terminal', x: 682, y: 262, label: 'Terminal com furação', left: true },
] as const;
