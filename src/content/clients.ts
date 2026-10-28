import type { ClientReference } from './types';

const CONFIRMED = 'Cliente informado pela PSTEC no pedido de melhorias de 28/10/2026 (nome em texto; logo depende do arquivo oficial e da autorização da marca).';

/**
 * Candidatos do briefing — NÃO são prova de vínculo, endosso ou contrato.
 * Nome ou logo só aparecem quando relationshipConfirmed E logoAuthorized
 * (logo) ou relationshipConfirmed E approvedLabel (nome).
 */
export const clientReferences: ClientReference[] = [
  { id: 'c01', internalCandidateName: 'GE', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'GE', assetPath: null, note: CONFIRMED },
  { id: 'c02', internalCandidateName: 'Siemens', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'Siemens', assetPath: null, note: CONFIRMED },
  { id: 'c03', internalCandidateName: 'Voith', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'Voith', assetPath: null, note: CONFIRMED },
  { id: 'c04', internalCandidateName: 'WEG', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'WEG', assetPath: null, note: CONFIRMED },
  { id: 'c05', internalCandidateName: 'Maurizio', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'Maurizio', assetPath: null, note: CONFIRMED },
  { id: 'c06', internalCandidateName: 'GTMS', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'GTMS', assetPath: null, note: CONFIRMED },
  { id: 'c07', internalCandidateName: 'Hubbell', relationshipConfirmed: true, logoAuthorized: false, approvedLabel: 'Hubbell', assetPath: null, note: CONFIRMED },
  {
    id: 'c08',
    internalCandidateName: 'GInterca / Ginterca (grafia a confirmar)',
    relationshipConfirmed: false,
    logoAuthorized: false,
    approvedLabel: null,
    assetPath: null,
    note: 'Aparece cortada na montagem do briefing; confirmar grafia e identidade antes de exibir.',
  },
];

/** Seção recebe o título final só quando ao menos uma referência está aprovada; aí só as aprovadas aparecem. */
export function publicClients() {
  return clientReferences.map((c, i) => {
    const showLogo = c.relationshipConfirmed && c.logoAuthorized && !!c.assetPath;
    const showName = c.relationshipConfirmed && !!c.approvedLabel;
    return {
      id: c.id,
      label: showName ? c.approvedLabel! : `Cliente ${String(i + 1).padStart(2, '0')}`,
      logo: showLogo ? c.assetPath : null,
      approved: showLogo || showName,
    };
  });
}
