// Vetorização provisória da logo PSTEC a partir da imagem enviada.
// Gera public/media/pstec-logo.svg e src/app/icon.svg. Substituir pelo
// arquivo oficial quando o manual de marca estiver disponível.
import { writeFileSync } from 'node:fs';

const NAVY = '#1B2A4A';
const GREEN = '#7AB929';

// Letras geométricas (altura 44, traço 8) desenhadas em linha central.
const glyph = {
  P: 'M4 44V4H26Q30 4 30 8V20Q30 24 26 24H4',
  S: 'M30 4H8Q4 4 4 8V18Q4 22 8 22H26Q30 22 30 26V36Q30 40 26 40H2',
  T: 'M1 4H33M17 4V44',
  E: 'M31 4H4V40H31M4 22H25',
  C: 'M31 4H8Q4 4 4 8V36Q4 40 8 40H31',
};

const word = (letters, x0, y0) =>
  [...letters]
    .map((l, i) => `<path transform="translate(${x0 + i * 44} ${y0})" d="${glyph[l]}"/>`)
    .join('');

// Retícula de pontos em degradê, à direita, fora das caixas.
const dots = [];
for (let y = 3; y <= 97; y += 8) {
  for (let x = 190; x <= 330; x += 8) {
    const inBox = y > 18 && y < 82 && x < 276;
    if (inBox) continue;
    const dx = (x - 300) / 60;
    const dy = (y - 50) / 55;
    const d = Math.sqrt(dx * dx + dy * dy);
    const jitter = ((x * 7 + y * 13) % 10) / 20;
    const r = 3.1 - d * 2.2 + jitter * 0.6;
    if (r > 0.6) dots.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}"/>`);
  }
}

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 100" role="img" aria-labelledby="t">
<title id="t">PSTEC</title>
<g fill="${GREEN}">${dots.join('')}</g>
<rect x="0" y="22" width="104" height="56" fill="${NAVY}"/>
<rect x="104" y="22" width="172" height="56" fill="${GREEN}"/>
<g fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round">${word('PS', 14, 28)}${word('TEC', 122, 28)}</g>
</svg>
`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<clipPath id="r"><rect width="64" height="64" rx="12"/></clipPath>
<g clip-path="url(#r)"><rect width="64" height="64" fill="${NAVY}"/><rect x="33" width="31" height="64" fill="${GREEN}"/></g>
<g fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" transform="translate(8 14) scale(.82)">
<path d="${glyph.P}"/>
</g>
<g fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" transform="translate(37 14) scale(.82)">
<path d="${glyph.T}"/>
</g>
</svg>
`;

writeFileSync('public/media/pstec-logo.svg', logo);
writeFileSync('src/app/icon.svg', icon);
console.log('logo:', dots.length, 'pontos');
