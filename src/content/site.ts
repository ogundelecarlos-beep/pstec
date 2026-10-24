import type { Field } from './types';

/**
 * Fonte única de verdade para dados da empresa, canais e flags do protótipo.
 * Troque valores aqui — nenhuma página repete telefone, e-mail ou endereço.
 */

const PUBLIC_REF = 'https://teste682.webnode.page/ (consultada em 23/10/2026)';

export const flags = {
  /** Formulário em modo demonstração: nada é enviado. */
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== 'false',
  /** Só libere na versão aprovada. Também controla robots.txt e X-Robots-Tag. */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
  /**
   * Exibe dados de referência pública (com selo “a confirmar”) enquanto não há
   * dado aprovado. Desligue para mostrar apenas o estado pendente.
   */
  showUnvalidatedReferences: true,
};

/** Domínio configurável; sem valor, canonical e sitemap usam o host local. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const company = {
  brand: { value: 'PSTEC', status: 'briefing' } as Field<string>,
  displayName: { value: 'Produtos e Serviços Técnicos', status: 'briefing' } as Field<string>,
  legalName: {
    value: null,
    status: 'pendente',
    note: 'Razão social completa e CNPJ dependem de validação da PSTEC.',
  } as Field<string>,
  context: { value: 'Industrial e elétrico', status: 'briefing' } as Field<string>,
  city: { value: 'Franco da Rocha — SP', status: 'briefing' } as Field<string>,
  street: { value: 'Avenida Pacaembu', status: 'referencia_publica_nao_validada', source: PUBLIC_REF } as Field<string>,
  number: {
    value: null,
    status: 'pendente',
    note: 'Conflito: página pública indica 383; cadastro externo indica 441. Não escolher sem confirmação.',
  } as Field<string>,
  district: { value: 'Sítio Borda da Mata', status: 'referencia_publica_nao_validada', source: PUBLIC_REF } as Field<string>,
  zip: { value: '07810-000', status: 'referencia_publica_nao_validada', source: PUBLIC_REF } as Field<string>,
  /**
   * Endereço completo aprovado. Enquanto null: sem pin exato, sem rota,
   * mapa apenas regional e rotulado como aproximado.
   */
  approvedAddress: { value: null, status: 'pendente', note: 'Preencher somente após confirmar o número do imóvel.' } as Field<string>,
  email: {
    value: 'vendas@brpstec.com.br',
    status: 'referencia_publica_nao_validada',
    source: `Conversa de briefing e ${PUBLIC_REF}`,
    note: 'Confirmar antes de produção.',
  } as Field<string>,
  phone: {
    value: '(11) 4780-9783',
    status: 'referencia_publica_nao_validada',
    source: PUBLIC_REF,
    note: 'Não presumir que seja WhatsApp.',
  } as Field<string>,
  /** Formato internacional, apenas dígitos (ex.: 5511900000000). */
  whatsapp: { value: null, status: 'pendente', note: 'Número não confirmado. Nenhum link é gerado.' } as Field<string>,
  hours: {
    value: null,
    status: 'pendente',
    note: '“8h às 17h” apareceu apenas como exemplo do assistente na conversa; não confirmado.',
  } as Field<string>,
  logo: {
    value: '/media/pstec-logo.svg',
    status: 'proposta',
    source: 'Vetorização provisória da imagem enviada pelo usuário em 23/10/2026',
    note: 'Substituir pelo arquivo vetorial oficial do manual de marca.',
  } as Field<string>,
  certifications: { value: null, status: 'pendente', note: 'Nenhum certificado recebido.' } as Field<string[]>,
};

/** Região aproximada para o mapa regional (sem marcador). */
export const regionMap = {
  label: 'Franco da Rocha — SP (localização aproximada)',
  searchQuery: 'Franco da Rocha, SP',
  osmBbox: [-46.79, -23.36, -46.67, -23.28] as const,
};

export const whatsappDefaultMessage =
  'Olá! Conheci a PSTEC pelo site e gostaria de conversar sobre um orçamento.';

/** Um dado só vira canal clicável quando aprovado. */
export function isApproved<T>(field: Field<T>): field is Field<T> & { value: T } {
  return field.status === 'aprovado' && field.value !== null;
}

/** Valor visível: aprovado, ou referência pública quando a flag de demonstração permite. */
export function displayable<T>(field: Field<T>): T | null {
  if (field.value === null) return null;
  if (field.status === 'aprovado') return field.value;
  if (field.status === 'referencia_publica_nao_validada' && flags.showUnvalidatedReferences) return field.value;
  if (field.status === 'briefing') return field.value;
  return null;
}

export const statusLabel: Record<Field<unknown>['status'], string> = {
  briefing: 'Briefing',
  referencia_publica_nao_validada: 'Referência pública — a confirmar',
  proposta: 'Proposta',
  pendente: 'Pendente',
  aprovado: 'Aprovado',
};
