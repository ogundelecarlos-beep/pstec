import Link from 'next/link';
import { company, displayable, flags, isApproved } from '@/content/site';
import { mapTargets, telHref, whatsappUrl } from '@/lib/channels';
import { CopyButton } from './CopyButton';
import { Icon } from './Icon';
import { MapEmbed } from './MapEmbed';
import { PendingBadge, SectionTitle } from './ui';

/**
 * Faixa Contato & Localização — encerramento visual do site.
 * Ordem de leitura: canais → ações → mapa (no celular o mapa fica por último).
 */
export function ContactLocation() {
  const map = mapTargets();
  const wa = whatsappUrl();
  const phone = displayable(company.phone);
  const email = displayable(company.email);
  const hours = displayable(company.hours);
  const street = displayable(company.street);
  const district = displayable(company.district);
  const zip = displayable(company.zip);

  return (
    <section className="section contact-close on-dark" aria-labelledby="contato-localizacao" data-hide-fab>
      <div className="container">
        <SectionTitle
          id="contato-localizacao"
          eyebrow="Contato & Localização"
          title="Fale com a PSTEC"
          lead="Canais de atendimento e localização para clientes, parceiros e fornecedores."
        />
        <div className="contact-band">
          <div>
            <ul className="channel-grid">
              <li className="channel channel--wide">
                <span className="channel__head"><Icon name="pin" />Endereço</span>
                {map.approved ? (
                  <span className="channel__value">{map.label}</span>
                ) : (
                  <>
                    <span className="channel__value">{company.city.value}</span>
                    {street && (
                      <span className="channel__sub">
                        {street}
                        {district ? `, ${district}` : ''}
                        {zip ? ` — CEP ${zip}` : ''}
                      </span>
                    )}
                    <span className="channel__row">
                      <PendingBadge>Endereço completo em validação</PendingBadge>
                    </span>
                  </>
                )}
              </li>

              <li className="channel">
                <span className="channel__head"><Icon name="phone" />Telefone</span>
                {phone ? (
                  <>
                    <span className="channel__value">
                      {isApproved(company.phone) ? <a href={telHref(phone)}>{phone}</a> : phone}
                    </span>
                    <span className="channel__row">
                      <CopyButton value={phone} label="telefone" />
                      {!isApproved(company.phone) && <PendingBadge>A confirmar</PendingBadge>}
                    </span>
                  </>
                ) : (
                  <PendingBadge>Telefone em validação</PendingBadge>
                )}
              </li>

              <li className="channel">
                <span className="channel__head"><Icon name="mail" />E-mail</span>
                {email ? (
                  <>
                    <span className="channel__value">
                      {isApproved(company.email) ? <a href={`mailto:${email}`}>{email}</a> : email}
                    </span>
                    <span className="channel__row">
                      <CopyButton value={email} label="e-mail" />
                      {!isApproved(company.email) && <PendingBadge>A confirmar</PendingBadge>}
                    </span>
                  </>
                ) : (
                  <PendingBadge>E-mail em validação</PendingBadge>
                )}
              </li>

              <li className="channel channel--wide">
                <span className="channel__head"><Icon name="clock" />Horário de atendimento</span>
                {hours ? <span className="channel__value">{hours}</span> : <span className="channel__row"><PendingBadge>Horário em validação</PendingBadge></span>}
              </li>
            </ul>

            <div className="contact-actions">
              <Link className="btn btn--primary btn--shine" href="/contato#formulario">
                <Icon name="mail" />
                Enviar mensagem
              </Link>
              {wa ? (
                <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" />
                  Falar pelo WhatsApp
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>
              ) : (
                <Link className="btn btn--ghost" href="/contato?canal=whatsapp#formulario">
                  <Icon name="whatsapp" />
                  WhatsApp em configuração
                </Link>
              )}
              <a className="btn btn--ghost" href={map.openUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="external" />
                {map.approved ? 'Abrir no Google Maps' : 'Ver região no Maps'}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
              {map.routeUrl ? (
                <a className="btn btn--secondary" href={map.routeUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="route" />
                  Traçar rota
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>
              ) : (
                <button type="button" className="btn btn--secondary" disabled aria-describedby="rota-nota">
                  <Icon name="route" />
                  Traçar rota
                </button>
              )}
            </div>
            {!map.routeUrl && (
              <p className="action-note" id="rota-nota">
                Rota indisponível até a confirmação do número do imóvel.
              </p>
            )}
            {!wa && (
              <p className="action-note">
                O WhatsApp está em configuração: o botão leva ao formulário{phone ? '; o telefone também pode ser usado' : ''}.
              </p>
            )}
            {flags.showUnvalidatedReferences && (
              <p className="action-note">Dados marcados “a confirmar” vêm de referência pública e ainda não foram validados pela PSTEC.</p>
            )}
          </div>

          <div className="map-frame">
            <MapEmbed
              embedUrl={map.embedUrl}
              title={map.embedTitle}
              provider={map.approved ? 'Google Maps' : 'OpenStreetMap'}
              approximate={!map.approved}
              openUrl={map.openUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
