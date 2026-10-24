import type { ContentStatus } from './types';

/**
 * Pontos do explorador de estrutura. A imagem atual é uma ILUSTRAÇÃO
 * CONCEITUAL (não retrata as instalações da PSTEC). Os textos explicam a
 * própria representação e o que será mostrado quando houver registro real.
 * Posições em % do quadro 1400 × 700 (a imagem nunca é recortada).
 */
export type FacilityPoint = {
  id: string;
  x: number;
  y: number;
  title: string;
  summary: string;
  willShow: string;
  media: { type: 'foto' | 'video'; src: string; alt: string; poster?: string } | null;
  status: ContentStatus;
};

export const facilityImage = {
  width: 1400,
  height: 700,
  label: 'Ilustração conceitual — não retrata as instalações da PSTEC',
  status: 'proposta' as ContentStatus,
};

export const facilityPoints: FacilityPoint[] = [
  {
    id: 'conformacao',
    x: 190,
    y: 250,
    title: 'Conformação',
    summary: 'Representa uma etapa de conformação de peças metálicas, comum na fabricação de componentes. O equipamento real utilizado pela PSTEC ainda será confirmado.',
    willShow: 'Foto ou vídeo do equipamento real, com legenda aprovada.',
    media: null,
    status: 'pendente',
  },
  {
    id: 'montagem',
    x: 520,
    y: 400,
    title: 'Montagem',
    summary: 'Bancada ilustrativa onde conjuntos são organizados e montados. Serve para apresentar o fluxo de trabalho, não um posto específico.',
    willShow: 'Registro real da área de montagem.',
    media: null,
    status: 'pendente',
  },
  {
    id: 'inspecao',
    x: 820,
    y: 360,
    title: 'Inspeção',
    summary: 'Indica um ponto de verificação visual das peças. Procedimentos e instrumentos reais dependem de validação da equipe de qualidade.',
    willShow: 'Descrição aprovada do controle de qualidade e foto do posto.',
    media: null,
    status: 'pendente',
  },
  {
    id: 'estoque',
    x: 1060,
    y: 230,
    title: 'Matéria-prima',
    summary: 'Prateleira ilustrativa com barras e chapas, representando o armazenamento de material antes da produção.',
    willShow: 'Foto real do estoque de materiais.',
    media: null,
    status: 'pendente',
  },
  {
    id: 'expedicao',
    x: 1280,
    y: 470,
    title: 'Expedição',
    summary: 'Volumes embalados representam a saída de pedidos. Prazos e formas de envio não são informados nesta demonstração.',
    willShow: 'Vídeo curto da área de expedição, com poster e legendas.',
    media: null,
    status: 'pendente',
  },
];
