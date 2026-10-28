import type { ContentStatus, SectorId } from './types';

/**
 * Setores da produção, pedido da PSTEC em 28/10/2026: “dividir por setores no
 * estilo dos desenhos ilustrativos, falar o que cada setor faz”.
 * Os NOMES e as DESCRIÇÕES são PROPOSTA a partir da ilustração conceitual —
 * a PSTEC não informou ainda quais setores tem nem o que cada um faz.
 * Não citar máquinas, capacidades, normas ou números sem confirmação.
 */
export type Sector = {
  id: SectorId;
  name: string;
  summary: string;
  does: string[];
  status: ContentStatus;
};

export const sectors: Sector[] = [
  {
    id: 'estoque',
    name: 'Matéria-prima',
    summary: 'Recebe e organiza barras, chapas e cordoalhas antes de entrarem na produção.',
    does: ['Recebimento e conferência do material', 'Separação por tipo de material', 'Abastecimento dos demais setores'],
    status: 'proposta',
  },
  {
    id: 'conformacao',
    name: 'Conformação',
    summary: 'Transforma o material em peça: corte, dobra e furação conforme o desenho do cliente.',
    does: ['Corte e dobra de barras e lâminas', 'Furação para fixação', 'Peças sob desenho ou amostra'],
    status: 'proposta',
  },
  {
    id: 'montagem',
    name: 'Montagem',
    summary: 'Une os componentes em conjuntos prontos para instalação.',
    does: ['Montagem de conjuntos com cordoalha e terminais', 'Fixação de grampos e parafusos', 'Preparação dos itens para inspeção'],
    status: 'proposta',
  },
  {
    id: 'inspecao',
    name: 'Inspeção',
    summary: 'Confere cada peça antes da entrega, comparando com o desenho e a especificação.',
    does: ['Verificação visual e de medidas', 'Conferência com a especificação do pedido', 'Liberação para expedição'],
    status: 'proposta',
  },
  {
    id: 'expedicao',
    name: 'Expedição',
    summary: 'Embala e despacha os pedidos para o cliente.',
    does: ['Embalagem e identificação dos volumes', 'Conferência final do pedido', 'Envio ao cliente'],
    status: 'proposta',
  },
];
