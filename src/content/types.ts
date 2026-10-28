/**
 * Tipos de conteúdo do protótipo PSTEC.
 * Todo dado de negócio carrega status e origem: um valor sintaticamente válido
 * não é, por si só, um dado aprovado para publicação.
 */

export type ContentStatus =
  | 'briefing'
  | 'referencia_publica_nao_validada'
  | 'proposta'
  | 'pendente'
  | 'aprovado';

export type Field<T> = {
  value: T | null;
  status: ContentStatus;
  source?: string;
  note?: string;
};

export type ProductFamilyId =
  | 'cobre'
  | 'aluminio'
  | 'aco-inox'
  | 'contatos'
  | 'seccionadoras-disjuntores';

export type ProductFamily = {
  id: ProductFamilyId;
  name: string;
  /** Rótulo curto para filtros. */
  shortName: string;
  summary: string;
  status: ContentStatus;
};

/** Mídia com rótulo visível obrigatório quando não é registro real aprovado. */
export type MediaKind = 'ilustracao' | 'foto-real-provisoria' | 'foto-real-aprovada' | 'placeholder';

export type MediaAsset = {
  id: string;
  src: string | null;
  width: number;
  height: number;
  alt: string;
  kind: MediaKind;
  /** Texto curto exibido junto da mídia. */
  label: string;
  caption?: string;
};

export type Product = {
  slug: string;
  name: string;
  family: ProductFamilyId;
  summary: string;
  description: string;
  /** Ilustração técnica usada nos cards e no topo da ficha. */
  image: MediaAsset;
  /** Registro fotográfico recebido (tratado digitalmente), quando houver. */
  photo?: MediaAsset;
  materials: Field<string[]>;
  application: Field<string>;
  process: Field<string>;
  dimensions: Field<string>;
  finish: Field<string>;
  technicalDocument: Field<string>;
  status: ContentStatus;
  keywords: string[];
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  scopeStatus: ContentStatus;
  note?: string;
};

/** Setores desenhados na ilustração conceitual da produção. */
export type SectorId = 'conformacao' | 'montagem' | 'inspecao' | 'estoque' | 'expedicao';

export type StructureCategory = 'Estrutura' | 'Equipamentos' | 'Processos' | 'Automações';

export type StructureItem = {
  id: string;
  category: StructureCategory;
  title: string;
  summary: string;
  mediaType: 'video' | 'foto';
  /** URL do vídeo aprovado; null mantém o estado “em preparação”. */
  videoSrc: string | null;
  /** Duração exibida apenas quando conhecida (ex.: '1:42'). */
  duration: string | null;
  poster: MediaAsset | null;
  captionsSrc: string | null;
  transcript: string | null;
  status: ContentStatus;
};

export type ClientReference = {
  id: string;
  internalCandidateName: string;
  relationshipConfirmed: boolean;
  logoAuthorized: boolean;
  approvedLabel: string | null;
  assetPath: string | null;
  note?: string;
};
