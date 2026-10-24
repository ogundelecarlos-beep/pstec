'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const KEY = 'pstec:revealed';

/**
 * Entrada discreta de seções (.reveal), uma vez por sessão de visualização.
 * Só elementos abaixo da dobra são “armados” pelo JS; sem JS, com movimento
 * reduzido ou em qualquer falha, o conteúdo permanece visível.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    let seen: Set<string>;
    try {
      seen = new Set(JSON.parse(sessionStorage.getItem(KEY) || '[]'));
    } catch {
      seen = new Set();
    }
    const persist = () => {
      try {
        sessionStorage.setItem(KEY, JSON.stringify([...seen]));
      } catch {
        /* armazenamento indisponível: apenas não memoriza */
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          seen.add(entry.target.getAttribute('data-reveal-key') || '');
          persist();
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    document.querySelectorAll('.reveal').forEach((el, i) => {
      const k = `${pathname}#${el.id || i}`;
      el.setAttribute('data-reveal-key', k);
      if (seen.has(k) || el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.classList.add('reveal-armed');
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
