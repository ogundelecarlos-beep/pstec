import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/content/types';
import { Icon } from './Icon';

/**
 * Vitrine de produto. Nome, descrição e link para a ficha ficam sempre
 * visíveis; o hover/foco só reforça família e revela a ação rápida.
 */
export function ProductCard({
  product,
  familyLabel,
  headingLevel = 'h3',
  onQuickView,
}: {
  product: Product;
  familyLabel: string;
  headingLevel?: 'h2' | 'h3';
  onQuickView?: (trigger: HTMLButtonElement) => void;
}) {
  const H = headingLevel;
  return (
    <article className="showcase">
      <div className="showcase__stage">
        <span className="media__label badge badge--dark">
          <Icon name="image" />
          {product.image.label}
        </span>
        {product.image.src && (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized
          />
        )}
        <span className="showcase__family">{familyLabel}</span>
      </div>
      <div className="showcase__body">
        <H>{product.name}</H>
        <p>{product.summary}</p>
        <div className="showcase__actions">
          <Link href={`/produtos/${product.slug}`} className="showcase__link">
            Ver ficha completa<span className="visually-hidden"> de {product.name}</span>
            <Icon name="arrow" />
          </Link>
          {onQuickView && (
            <button type="button" className="quick-btn" aria-haspopup="dialog" onClick={(e) => onQuickView(e.currentTarget)}>
              <Icon name="search" />
              Visualização rápida<span className="visually-hidden">: {product.name}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
