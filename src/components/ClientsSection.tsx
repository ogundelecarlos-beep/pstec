import { publicClients } from '@/content/clients';
import { Icon } from './Icon';
import { SectionTitle } from './ui';

/**
 * Grade de marcas com divisórias. Nomes e logos só com relação e uso
 * aprovados; sem contadores, selos ou depoimentos.
 */
export function ClientsSection() {
  const clients = publicClients();
  const anyApproved = clients.some((c) => c.approved);

  return (
    <section className="section" aria-labelledby="clientes">
      <div className="container reveal">
        <SectionTitle
          id="clientes"
          eyebrow="Referências comerciais"
          title={anyApproved ? 'Empresas que confiam na PSTEC' : 'Espaço para clientes e referências comerciais — em validação'}
          lead={
            anyApproved
              ? undefined
              : 'As marcas serão exibidas somente após confirmação da relação comercial e autorização de uso de nome e logo.'
          }
        />
        <ul className="brand-grid">
          {clients.map((c) => (
            <li key={c.id} className="brand-cell">
              {c.logo ? (
                <img src={c.logo} alt={c.label} loading="lazy" style={{ maxHeight: 48, width: 'auto' }} />
              ) : (
                <>
                  <span className="brand-cell__mono">{c.label.toUpperCase()}</span>
                  {!c.approved && <small>Aprovação pendente</small>}
                </>
              )}
            </li>
          ))}
        </ul>
        {!anyApproved && (
          <p className="action-note" style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="info" className="inline-icon" />
            Nenhum depoimento, case, contador ou endosso é exibido. Cada referência depende de confirmação do vínculo e da redação final pela PSTEC.
          </p>
        )}
      </div>
    </section>
  );
}
