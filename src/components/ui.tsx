import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ContentStatus, MediaAsset } from '@/content/types';
import { statusLabel } from '@/content/site';
import { Icon } from './Icon';

export function SectionTitle({
  eyebrow,
  title,
  lead,
  id,
  as: Tag = 'h2',
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  id?: string;
  as?: 'h1' | 'h2';
  action?: ReactNode;
}) {
  const text = (
    <>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag id={id}>{title}</Tag>
      {lead && <p>{lead}</p>}
    </>
  );
  if (action) {
    return (
      <div className="section-title section-title--row">
        <div>{text}</div>
        {action}
      </div>
    );
  }
  return <div className="section-title">{text}</div>;
}

export function StatusBadge({ status, children }: { status: ContentStatus; children?: ReactNode }) {
  const tone = status === 'aprovado' ? 'ok' : status === 'proposta' || status === 'briefing' ? 'info' : 'pending';
  return (
    <span className={`badge badge--${tone}`}>
      <Icon name={tone === 'ok' ? 'check' : 'info'} />
      {children ?? statusLabel[status]}
    </span>
  );
}

export function PendingBadge({ children }: { children: ReactNode }) {
  return (
    <span className="badge badge--pending">
      <Icon name="clock" />
      {children}
    </span>
  );
}

/** Mídia com rótulo visível (ilustração/foto provisória) junto da imagem. */
export function MediaFigure({
  media,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  showCaption = false,
  contain = false,
}: {
  media: MediaAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  contain?: boolean;
}) {
  return (
    <figure className={`media${contain ? ' media--contain' : ''} ${className}`}>
      {media.kind !== 'foto-real-aprovada' && (
        <span className="media__label badge badge--dark">
          <Icon name={media.kind === 'ilustracao' ? 'image' : 'info'} />
          {media.label}
        </span>
      )}
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes={sizes}
          priority={priority}
          unoptimized={media.src.endsWith('.svg')}
        />
      ) : null}
      {showCaption && media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Trilha de navegação">
      <ol>
        {items.map((item, i) =>
          item.href && i < items.length - 1 ? (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ) : (
            <li key={item.label}>
              <span aria-current="page">{item.label}</span>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="page-hero on-dark" aria-labelledby="page-title">
      <div className="container">
        <Breadcrumb items={crumbs} />
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 id="page-title">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function Notice({ children, tone = 'pending', title }: { children: ReactNode; tone?: 'pending' | 'info'; title?: string }) {
  return (
    <div className={`notice${tone === 'info' ? ' notice--info' : ''}`}>
      <Icon name={tone === 'info' ? 'info' : 'alert'} />
      <div>
        {title && <p><strong>{title}</strong></p>}
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  );
}
