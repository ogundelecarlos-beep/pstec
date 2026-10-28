import { company } from '@/content/site';
import { Icon } from './Icon';
import { SectionTitle } from './ui';
import { YearsSeal } from './YearsSeal';

/**
 * Selos da empresa. Só o de tempo de mercado existe hoje (informado pela
 * PSTEC); os demais espaços aguardam os arquivos oficiais dos selos e
 * certificados — nenhum selo de terceiros é desenhado ou presumido.
 */
const PENDING_SLOTS = 3;

export function SealsSection() {
  return (
    <section className="section section--muted" aria-labelledby="selos">
      <div className="container reveal">
        <SectionTitle
          id="selos"
          eyebrow="Selos"
          title="Selos da PSTEC"
          lead="Reconhecimentos e certificações da empresa."
        />
        <ul className="seals">
          <li className="seal-card">
            <YearsSeal size={150} tone="light" />
            <h3>{company.yearsInMarket.value} anos no mercado</h3>
            <p>Tempo de atuação da PSTEC no fornecimento de componentes técnicos.</p>
          </li>
          {Array.from({ length: PENDING_SLOTS }, (_, i) => (
            <li key={i} className="seal-card seal-card--empty">
              <span className="seal-card__ph">
                <Icon name="shield" />
              </span>
              <h3>Selo a receber</h3>
              <p>Espaço para selo ou certificado oficial da PSTEC, com número e validade.</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
