'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Icon } from './Icon';
import { SHUNT_NOTES } from './art/ShuntArt';
import { TechnicalReveal, useScrollProgress } from './TechnicalReveal';

const TITLE = ['Componentes e', 'soluções técnicas', 'para aplicações industriais'];

/**
 * Hero “Do traçado ao volume”. A peça conceitual começa em linhas técnicas e
 * ganha volume metálico com a rolagem nativa; título e CTAs ficam sempre
 * disponíveis. “Explorar visual” percorre as anotações (toque e teclado).
 */
export function HeroStage() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  useScrollProgress(heroRef, stageRef);

  const explore = () => setActive((a) => (a + 1) % SHUNT_NOTES.length);
  const note = active >= 0 ? SHUNT_NOTES[active] : null;

  return (
    <section ref={heroRef} className="hero2 reveal-hero on-dark" aria-labelledby="hero-title">
      <div className="reveal-hero__sticky">
        <div className="hero2__grid" aria-hidden="true" />
        <div className="container hero2__inner">
          <div className="hero2__copy">
            <span className="eyebrow hero2__eyebrow">Produtos e serviços técnicos</span>
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
                Solicitar orçamento
                <Icon name="arrow" />
              </Link>
              <Link href="/produtos" className="btn btn--secondary">
                Explorar produtos
              </Link>
            </div>
            <a href="#quem-somos" className="scroll-cue">
              <span className="scroll-cue__line" aria-hidden="true" />
              Role para ver o traçado ganhar volume
            </a>
          </div>

          <figure className="hero2__figure" data-exploring={active >= 0 ? '' : undefined}>
            <TechnicalReveal stageRef={stageRef} activeNote={active} />
            <figcaption className="hero2__caption">
              <span className="badge badge--dark">
                <Icon name="image" />
                Representação conceitual
              </span>
              <span className="hero2__caption-text">Linhas de apresentação, sem dimensões ou especificações.</span>
              <button type="button" className="explore-btn" onClick={explore} aria-describedby="explore-status">
                <Icon name="search" />
                Explorar visual
              </button>
              <span id="explore-status" className="visually-hidden" role="status">
                {note ? `Destaque: ${note.label}` : ''}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
