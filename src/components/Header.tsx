'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { isCurrent, mainNav } from './navigation';
import { useFocusTrap } from '@/lib/useFocusTrap';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (open) closeRef.current?.focus();
  }, [open]);

  // Fecha ao trocar de rota.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="PSTEC — Produtos e Serviços Técnicos, página inicial">
          <img src="/media/pstec-logo.svg" alt="" width={128} height={38} />
          <span className="brand__sub">Produtos e Serviços Técnicos</span>
        </Link>

        <nav className="nav-desktop" aria-label="Principal">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link href="/contato#formulario" className="btn btn--primary header-cta">
            Fale com a PSTEC
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
            <span>Menu</span>
          </button>
        </div>
      </div>

      <div id="menu-movel" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__backdrop" onClick={close} />
        <div
          ref={panelRef}
          className="mobile-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          inert={!open}
        >
          <div className="mobile-menu__top">
            <img src="/media/pstec-logo.svg" alt="PSTEC" width={112} height={33} />
            <button ref={closeRef} type="button" className="modal__close" onClick={close}>
              <Icon name="close" />
              Fechar
            </button>
          </div>
          <nav aria-label="Principal (móvel)">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/qualidade" className="nav-link" aria-current={isCurrent(pathname, '/qualidade') ? 'page' : undefined} onClick={() => setOpen(false)}>
                  Qualidade
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mobile-menu__cta">
            <Link href="/contato#formulario" className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
              Fale com a PSTEC
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
