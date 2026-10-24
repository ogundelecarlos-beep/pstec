'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** Indicador discreto de progresso de leitura (escala via transform). */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty('--p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return <div ref={ref} className="read-progress" aria-hidden="true" />;
}

/** Traçado técnico que conecta seções; desenha-se uma vez ao entrar na tela. */
export function TraceDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-drawn');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-drawn');
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="container" aria-hidden="true">
      <svg ref={ref} className="trace" viewBox="0 0 1200 40" preserveAspectRatio="none" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
        <path d="M0 20 H360 L390 6 H760 L790 20 H1200" fill="none" stroke="currentColor" strokeWidth="1.5" pathLength={1} vectorEffect="non-scaling-stroke" />
        <circle cx="390" cy="6" r="4" fill="currentColor" />
        <circle cx="790" cy="20" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
