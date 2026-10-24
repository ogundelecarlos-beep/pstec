// Tratamento digital das fotos recebidas no briefing (baixa resolução).
// Recorta cada peça, reduz ruído, amplia 3x, corrige tons e aplica nitidez.
// Uso: npm run media
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'public/media/fotos-originais';
const OUT = 'public/media/fotos';
mkdirSync(OUT, { recursive: true });

const jobs = [
  { src: '2.png', out: 'conexao-laminada', crop: { left: 20, top: 0, width: 160, height: 425 } },
  { src: '2.png', out: 'cordoalha-terminais', crop: { left: 165, top: 0, width: 146, height: 425 } },
  { src: '3.png', out: 'conjunto-cordoalha', crop: { left: 95, top: 0, width: 170, height: 429 } },
  { src: '4.png', out: 'barra-aluminio', crop: { left: 40, top: 80, width: 220, height: 300 } },
  { src: '5.png', out: 'contato-cordoalha', crop: { left: 45, top: 0, width: 120, height: 214 } },
];

const SCALE = 3;

for (const j of jobs) {
  const w = j.crop.width * SCALE;
  const h = j.crop.height * SCALE;
  const info = await sharp(`${SRC}/${j.src}`)
    .extract(j.crop)
    .median(3)
    .resize(w, h, { kernel: 'lanczos3' })
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.04, saturation: 1.12 })
    .sharpen({ sigma: 1.4, m1: 0.6, m2: 2.2 })
    .webp({ quality: 82 })
    .toFile(`${OUT}/${j.out}.webp`);
  console.log(j.out, info.width, info.height, `${Math.round(info.size / 1024)} KB`);
}
