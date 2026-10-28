import { sectors } from '@/content/sectors';
import { FacilityArt } from './art/FacilityArt';
import { PendingBadge, SectionTitle } from './ui';

/**
 * Setores da produção em cartões, cada um com o recorte do seu desenho
 * ilustrativo e o que o setor faz. Ordem segue o fluxo da peça.
 */
export function SectorsSection({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel === 'h2' ? 'h3' : 'h4';
  return (
    <section className="section section--dark on-dark" aria-labelledby="setores">
      <div className="container">
        <SectionTitle
          id="setores"
          eyebrow="Nossos setores"
          title="Da matéria-prima à expedição"
          lead="Cada setor cuida de uma etapa do caminho da peça até o cliente."
        />
        <ol className="sectors">
          {sectors.map((s, i) => (
            <li key={s.id}>
              <article className="sector">
                <div className="sector__art">
                  <span className="sector__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <FacilityArt sector={s.id} idPrefix={`sec-${s.id}-`} />
                </div>
                <div className="sector__body">
                  <H>{s.name}</H>
                  <p>{s.summary}</p>
                  <ul className="sector__does" aria-label={`O que o setor de ${s.name.toLowerCase()} faz`}>
                    {s.does.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
        <p className="sectors-note">
          <PendingBadge>Setores e descrições a confirmar pela PSTEC</PendingBadge>
          Desenhos ilustrativos — não retratam as instalações reais.
        </p>
      </div>
    </section>
  );
}
