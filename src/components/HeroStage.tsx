import Link from 'next/link';
import { company } from '@/content/site';
import { familyName, products } from '@/content/products';
import { Icon } from './Icon';
import { ProductSlider, type SlideItem } from './ProductSlider';
import { YearsSeal } from './YearsSeal';

const TITLE = ['Componentes e', 'soluções técnicas', 'para transmissão de energia'];

/**
 * Hero com o slogan da PSTEC, o selo de 30 anos e a faixa de fotos reais
 * (cada foto leva à ficha da peça). Só entram itens com foto real.
 */
export function HeroStage() {
  const slides: SlideItem[] = products
    .filter((p) => p.image.kind !== 'ilustracao' && p.image.src)
    .map((p) => ({ slug: p.slug, name: p.name, family: familyName(p.family), src: p.image.src!, alt: p.image.alt }));

  return (
    <section className="hero2 on-dark" aria-labelledby="hero-title">
      <div className="hero2__grid" aria-hidden="true" />
      <div className="container hero2__inner hero2__inner--slider">
        <div className="hero2__copy">
          <span className="eyebrow hero2__eyebrow">Há {company.yearsInMarket.value} anos no mercado</span>
          <h1 id="hero-title" className="hero2__title">
            {TITLE.map((line, i) => (
              <span key={line} className="mask-line">
                <span style={{ animationDelay: `${120 + i * 90}ms` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero2__lead">
            Conheça as soluções da PSTEC e converse com nossa equipe sobre as necessidades do seu projeto.
          </p>
          <div className="btn-row hero2__ctas">
            <Link href="/contato#formulario" className="btn btn--primary btn--shine">
              Fale com a PSTEC
              <Icon name="arrow" />
            </Link>
            <Link href="/produtos" className="btn btn--secondary">
              Explorar produtos
            </Link>
            <Link href="/servicos" className="btn btn--secondary">
              Explorar serviços
            </Link>
          </div>
        </div>
        <div className="hero2__seal">
          <YearsSeal />
        </div>
      </div>
      <div className="hero2__slider">
        <ProductSlider items={slides} />
      </div>
    </section>
  );
}
