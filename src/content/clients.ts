import type { ClientReference } from './types';

/**
 * Candidatos do briefing — NÃO são prova de vínculo, endosso ou contrato.
 * Nome ou logo só aparecem quando relationshipConfirmed E logoAuthorized
 * (logo) ou relationshipConfirmed E approvedLabel (nome).
 */
export const clientReferences: ClientReference[] = [
  { id: 'c01', internalCandidateName: 'GE', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  { id: 'c02', internalCandidateName: 'Siemens', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  { id: 'c03', internalCandidateName: 'Voith', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  { id: 'c04', internalCandidateName: 'WEG', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  { id: 'c05', internalCandidateName: 'Maurizio', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  { id: 'c06', internalCandidateName: 'GTMS', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  { id: 'c07', internalCandidateName: 'Hubbell', relationshipConfirmed: false, logoAuthorized: false, approvedLabel: null, assetPath: null },
  {
    id: 'c08',
    internalCandidateName: 'GInterca / Ginterca (grafia a confirmar)',
    relationshipConfirmed: false,
    logoAuthorized: false,
    approvedLabel: null,
    assetPath: null,
    note: 'Aparece cortada na montagem do briefing; confirmar grafia e identidade.',
  },
];

/** Seção recebe o título final só quando ao menos uma referência está aprovada. */
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
