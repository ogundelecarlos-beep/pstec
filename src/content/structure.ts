import type { StructureCategory, StructureItem } from './types';

export const structureCategories: StructureCategory[] = ['Estrutura', 'Equipamentos', 'Processos', 'Automações'];

/**
 * “Automações” = evidência dos processos internos da PSTEC, não oferta de
 * serviço de automação. Todos os vídeos estão pendentes: videoSrc null mantém
 * o estado “em preparação” sem botão de play enganoso.
 */
export const structureItems: StructureItem[] = [
  {
    id: 'equipment-gallery',
    category: 'Equipamentos',
    title: 'Equipamentos de produção',
    summary: 'Registro dos equipamentos usados na fabricação dos componentes.',
    mediaType: 'foto',
    videoSrc: null,
    duration: null,
    poster: null,
    captionsSrc: null,
    transcript: null,
    status: 'pendente',
  },
  {
    id: 'process-overview',
    category: 'Processos',
    title: 'Etapas de fabricação',
    summary: 'Sequência de conformação, montagem e acabamento das peças.',
    mediaType: 'foto',
    videoSrc: null,
    duration: null,
    poster: null,
    captionsSrc: null,
    transcript: null,
    status: 'pendente',
  },
  {
    id: 'automation-video',
    category: 'Automações',
    title: 'Automação em operação',
    summary: 'Vídeo de uma automação dos processos internos da PSTEC.',
    mediaType: 'video',
    videoSrc: null,
    duration: null,
    poster: null,
    captionsSrc: null,
    transcript: null,
    status: 'pendente',
  },
  {
    id: 'institutional-video',
    category: 'Estrutura',
    title: 'Apresentação da estrutura',
    summary: 'Visão geral das instalações em Franco da Rocha — SP.',
    mediaType: 'video',
    videoSrc: null,
    duration: null,
    poster: null,
    captionsSrc: null,
    transcript: null,
    status: 'pendente',
  },
  {
    id: 'company-facility',
    category: 'Estrutura',
    title: 'Instalações',
    summary: 'Fotos das áreas de produção, estoque e expedição.',
    mediaType: 'foto',
    videoSrc: null,
    duration: null,
    poster: null,
    captionsSrc: null,
    transcript: null,
    status: 'pendente',
  },
  {
    id: 'automation-cell',
    category: 'Automações',
    title: 'Célula automatizada',
    summary: 'Detalhe de uma etapa automatizada de produção.',
    mediaType: 'video',
    videoSrc: null,
    duration: null,
    poster: null,
    captionsSrc: null,
    transcript: null,
    status: 'pendente',
  },
];

/** Capítulos da narrativa visual. Textos de proposta; mídias reais pendentes. */
export const storyChapters = [
  {
    id: 'cap-equipamentos',
    category: 'Equipamentos' as StructureCategory,
    title: 'Equipamentos',
    text: 'Os equipamentos usados na fabricação dos componentes serão apresentados com fotos e vídeos reais da PSTEC.',
    willShow: ['Fotos dos equipamentos em operação', 'Detalhes de ferramental e dispositivos', 'Legendas descritivas aprovadas'],
    art: 'equipamentos' as const,
  },
  {
    id: 'cap-processos',
    category: 'Processos' as StructureCategory,
    title: 'Processos',
    text: 'A sequência de fabricação, do material ao componente acabado, organizada em etapas — conforme descrição validada pela equipe técnica.',
    willShow: ['Etapas de produção em ordem', 'Registros de inspeção, se aplicável', 'Texto técnico revisado'],
    art: 'processos' as const,
  },
  {
    id: 'cap-automacoes',
    category: 'Automações' as StructureCategory,
    title: 'Automações',
    text: 'Registros de automações usadas nos processos internos, como evidência da estrutura produtiva da empresa.',
    willShow: ['Vídeo curto com poster e controles', 'Legendas ou transcrição quando houver fala', 'Descrição da etapa automatizada'],
    art: 'automacoes' as const,
  },
  {
    id: 'cap-estrutura',
    category: 'Estrutura' as StructureCategory,
    title: 'Estrutura',
    text: 'Visão geral das instalações em Franco da Rocha — SP: áreas de produção, estoque e expedição.',
    willShow: ['Vídeo institucional da estrutura', 'Fotos de fachada e áreas internas', 'Localização confirmada'],
    art: 'estrutura' as const,
  },
];
