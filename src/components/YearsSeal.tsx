import { company } from '@/content/site';

/**
 * Selo “30 anos no mercado”, desenhado no protótipo a partir do tempo de
 * mercado informado pela PSTEC. Não traz ano de fundação (não informado).
 */
export function YearsSeal({ size = 220, tone = 'dark' }: { size?: number; tone?: 'dark' | 'light' }) {
  const years = company.yearsInMarket.value;
  const ink = tone === 'dark' ? '#ffffff' : '#1b2a4a';
  const muted = tone === 'dark' ? 'rgba(196,207,220,.75)' : '#526170';
  const id = `seal-arc-${tone}`;
  return (
    <svg className="years-seal" viewBox="0 0 240 240" width={size} height={size} role="img" aria-label={`Selo: ${years} anos no mercado`}>
      <defs>
        <path id={id} d="M120 120 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0" />
      </defs>
      <circle cx="120" cy="120" r="116" fill="none" stroke="#7ab929" strokeWidth="3" />
      <circle cx="120" cy="120" r="106" fill="none" stroke={muted} strokeWidth="1" strokeDasharray="2 5" />
      <circle cx="120" cy="120" r="70" fill={tone === 'dark' ? 'rgba(122,185,41,.12)' : '#eef6e6'} stroke="#7ab929" strokeWidth="1.5" />
      <text fill={muted} fontSize="13" fontWeight="700" textLength="548" lengthAdjust="spacing">
        <textPath href={`#${id}`} startOffset="0">
          PSTEC · PRODUTOS E SERVIÇOS TÉCNICOS ·
        </textPath>
      </text>
      <text x="120" y="133" textAnchor="middle" fill={ink} fontSize="64" fontWeight="800" letterSpacing="-2">
        {years}
      </text>
      <text x="120" y="158" textAnchor="middle" fill="#7ab929" fontSize="15" fontWeight="800" letterSpacing="3">
        ANOS
      </text>
      <text x="120" y="176" textAnchor="middle" fill={muted} fontSize="10" fontWeight="600" letterSpacing="2">
        NO MERCADO
      </text>
    </svg>
  );
}
