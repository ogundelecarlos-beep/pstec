'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

/**
 * Botão flutuante. Some quando um bloco marcado com [data-hide-fab]
 * (formulário, faixa de contato, rodapé) está visível, para não cobrir
 * campos, controles ou navegação.
 */
export function FloatingWhatsApp({ href }: { href: string | null }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-hide-fab]'));
    if (targets.length === 0 || !('IntersectionObserver' in window)) {
      setHidden(false);
      return;
    }
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  const cls = `fab${hidden ? ' is-hidden' : ''}`;

  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" aria-label="Falar com a PSTEC pelo WhatsApp" aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}>
        <Icon name="whatsapp" />
        <span className="fab__text" aria-hidden="true">WhatsApp</span>
      </a>
    );
  }
  return (
    <Link
      className={cls}
      href="/contato?canal=whatsapp#formulario"
      aria-label="Falar com a PSTEC pelo WhatsApp — canal em configuração, abre o formulário de contato"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
    >
      <Icon name="whatsapp" />
      <span className="fab__text" aria-hidden="true">WhatsApp</span>
    </Link>
  );
}
