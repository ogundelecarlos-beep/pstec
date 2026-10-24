import type { Field, MediaAsset, Product, ProductFamily } from './types';

/**
 * Catálogo DEMONSTRATIVO (status `proposta`).
 * Famílias derivadas da página pública não validada; itens derivados das fotos
 * enviadas pelo usuário. Nenhuma especificação técnica foi inventada: campos
 * desconhecidos ficam null e aparecem como “Sob consulta — validar especificação”.
 */

export const families: ProductFamily[] = [
  {
    id: 'cobre',
    shortName: 'Cobre',
    name: 'Componentes em cobre',
    summary: 'Peças e conexões em cobre para aplicações elétricas, conforme desenho ou especificação do cliente.',
    status: 'referencia_publica_nao_validada',
  },
  {
    id: 'aluminio',
    shortName: 'Alumínio',
    name: 'Componentes em alumínio',
    summary: 'Barras e peças em alumínio para montagens e conexões, com geometria definida por projeto.',
    status: 'referencia_publica_nao_validada',
  },
  {
    id: 'aco-inox',
    shortName: 'Aço inoxidável',
    name: 'Componentes em aço inoxidável',
    summary: 'Peças de fixação e montagem em aço inoxidável. Aplicações a validar com a equipe técnica.',
    status: 'referencia_publica_nao_validada',
  },
  {
    id: 'contatos',
    shortName: 'Contatos elétricos',
    name: 'Contatos elétricos',
    summary: 'Contatos e conjuntos para equipamentos elétricos. Aplicação e compatibilidade sob consulta.',
    status: 'referencia_publica_nao_validada',
  },
  {
    id: 'seccionadoras-disjuntores',
    shortName: 'Seccionadoras e disjuntores',
    name: 'Componentes para seccionadoras e disjuntores',
    summary: 'Componentes destinados a seccionadoras e disjuntores. Requisitos técnicos em validação.',
    status: 'referencia_publica_nao_validada',
  },
];

const pending = <T,>(note = 'Sob consulta — validar especificação'): Field<T> => ({
  value: null,
  status: 'pendente',
  note,
});

const illustration = (id: string, file: string, alt: string): MediaAsset => ({
  id,
  src: `/media/ilustracoes/${file}.svg`,
  width: 800,
  height: 600,
  alt,
  kind: 'ilustracao',
  label: 'Ilustração técnica',
  caption: 'Ilustração criada para o protótipo a partir da foto recebida. Não representa medidas reais.',
});

const photo = (id: string, file: string, width: number, height: number, alt: string): MediaAsset => ({
  id,
  src: `/media/fotos/${file}.webp`,
  width,
  height,
  alt,
  kind: 'foto-real-provisoria',
  label: 'Foto recebida — tratada digitalmente',
  caption: 'Registro enviado para o briefing, com ajuste de nitidez, cor e enquadramento. Substituir por foto profissional.',
});

export const products: Product[] = [
  {
    slug: 'conexao-flexivel-laminada-cobre',
    name: 'Conexão flexível laminada',
    family: 'cobre',
    summary: 'Conexão formada por lâminas sobrepostas, com extremidades compactadas e furação para fixação.',
    description:
      'Peça flexível composta por lâminas finas sobrepostas, conformadas em curva para absorver movimento entre pontos de conexão. As extremidades aparecem compactadas e com acabamento superficial distinto. Material, número de lâminas, seção e acabamento devem ser confirmados pela equipe técnica da PSTEC.',
    image: illustration('product-copper', 'cobre-laminado', 'Ilustração de conexão flexível de lâminas de cobre em formato de onda, com duas extremidades planas furadas'),
    photo: photo('photo-copper', 'conexao-laminada', 480, 1275, 'Foto de conexão flexível laminada em cobre com curva em S sobre bancada azul'),
    materials: { value: ['Cobre (aparente na foto — validar)'], status: 'pendente' },
    application: pending('Aplicação sob consulta — validar com responsável técnico'),
    process: pending(),
    dimensions: pending(),
    finish: pending(),
    technicalDocument: pending('Documento técnico não disponível'),
    status: 'proposta',
    keywords: ['shunt', 'lâminas', 'flexível', 'cobre', 'conexão'],
  },
  {
    slug: 'conexao-cordoalha-terminais',
    name: 'Conexão em cordoalha com terminais',
    family: 'cobre',
    summary: 'Cordoalha trançada com terminais planos furados nas duas extremidades.',
    description:
      'Conexão flexível em cordoalha trançada, com terminais planos e furação para fixação por parafuso. O material da cordoalha e o acabamento dos terminais aparecem estanhados na foto, mas dependem de confirmação técnica.',
    image: illustration('product-braid', 'cordoalha-terminais', 'Ilustração de cordoalha trançada metálica com dois terminais planos furados'),
    photo: photo('photo-braid', 'cordoalha-terminais', 438, 1275, 'Foto de cordoalha trançada com terminais metálicos furados'),
    materials: { value: ['Cordoalha trançada (material a confirmar)'], status: 'pendente' },
    application: pending('Aplicação sob consulta — validar com responsável técnico'),
    process: pending(),
    dimensions: pending(),
    finish: pending(),
    technicalDocument: pending('Documento técnico não disponível'),
    status: 'proposta',
    keywords: ['cordoalha', 'trança', 'terminal', 'flexível', 'aterramento'],
  },
  {
    slug: 'barra-aluminio-dobrada',
    name: 'Barra dobrada com furação',
    family: 'aluminio',
    summary: 'Barra conformada em dois planos, com furações nas abas e no corpo central.',
    description:
      'Peça em barra conformada com dobras e furações distribuídas nas abas e no corpo. A geometria e o padrão de furos variam conforme o projeto. Liga, espessura, raio de dobra e tolerâncias não foram informados.',
    image: illustration('product-aluminum', 'barra-aluminio', 'Ilustração de barra de alumínio dobrada em Z com furos nas abas e no centro'),
    photo: photo('photo-aluminum', 'barra-aluminio', 660, 900, 'Foto de barra metálica dobrada com seis furos centrais e furos nas abas'),
    materials: { value: ['Alumínio (aparente na foto — validar)'], status: 'pendente' },
    application: pending('Aplicação sob consulta — validar com responsável técnico'),
    process: pending(),
    dimensions: pending(),
    finish: pending(),
    technicalDocument: pending('Documento técnico não disponível'),
    status: 'proposta',
    keywords: ['barramento', 'barra', 'dobra', 'furação', 'alumínio'],
  },
  {
    slug: 'conjunto-cordoalha-grampo',
    name: 'Conjunto com cordoalha e grampo de fixação',
    family: 'aco-inox',
    summary: 'Conjunto com barra, cordoalha protegida por luva e grampo metálico de fixação.',
    description:
      'Conjunto montado com barra, cordoalha flexível com proteção externa e grampo de fixação com parafuso. Os componentes metálicos de fixação aparentam ser em aço inoxidável; materiais e função do conjunto dependem de validação técnica.',
    image: illustration('product-steel', 'conjunto-cordoalha', 'Ilustração de conjunto vertical com barra escura, cordoalha com luva azul e grampo metálico'),
    photo: photo('photo-steel', 'conjunto-cordoalha', 510, 1287, 'Foto de conjunto vertical com cordoalha protegida por luva azul e grampo metálico'),
    materials: { value: ['Componentes de fixação em aço inoxidável (aparente — validar)'], status: 'pendente' },
    application: pending('Aplicação sob consulta — validar com responsável técnico'),
    process: pending(),
    dimensions: pending(),
    finish: pending(),
    technicalDocument: pending('Documento técnico não disponível'),
    status: 'proposta',
    keywords: ['grampo', 'inox', 'aço inoxidável', 'cordoalha', 'conjunto'],
  },
  {
    slug: 'conjunto-contato-cordoalha',
    name: 'Conjunto de contato com cordoalha',
    family: 'contatos',
    summary: 'Barras paralelas unidas por cordoalha flexível, com parafusos de fixação nas extremidades.',
    description:
      'Conjunto de contato composto por barras paralelas, cordoalha flexível e fixação por parafusos e porcas. Aplicação, compatibilidade com equipamentos e capacidade elétrica não foram informadas e não devem ser presumidas.',
    image: illustration('product-contact', 'contato-cordoalha', 'Ilustração de conjunto de contato com barras de bronze paralelas, parafusos e cordoalha'),
    photo: photo('photo-contact', 'contato-cordoalha', 360, 642, 'Foto de conjunto de contato com barras paralelas, parafusos e cordoalha lateral'),
    materials: pending('Materiais sob consulta — validar especificação'),
    application: pending('Aplicação não certificada — validar com responsável técnico'),
    process: pending(),
    dimensions: pending(),
    finish: pending(),
    technicalDocument: pending('Documento técnico não disponível'),
    status: 'proposta',
    keywords: ['contato', 'contato elétrico', 'parafuso', 'cordoalha', 'conjunto'],
  },
  {
    slug: 'componentes-seccionadoras-disjuntores',
    name: 'Componentes para seccionadoras e disjuntores',
    family: 'seccionadoras-disjuntores',
    summary: 'Família reservada para componentes destinados a seccionadoras e disjuntores.',
    description:
      'A página pública identificada como PSTEC menciona componentes e contatos para disjuntores e seccionadoras. Faixas, grandezas e unidades citadas naquela página não foram reproduzidas porque exigem validação por responsável técnico. Descreva sua aplicação para que a equipe avalie a viabilidade.',
    image: illustration('product-switchgear', 'lamina-seccionadora', 'Ilustração esquemática de lâmina de contato de seccionadora com articulação'),
    materials: pending('Materiais sob consulta — validar especificação'),
    application: pending('Aplicações e requisitos técnicos pendentes'),
    process: pending(),
    dimensions: pending(),
    finish: pending(),
    technicalDocument: pending('Documento técnico não disponível'),
    status: 'proposta',
    keywords: ['seccionadora', 'disjuntor', 'contato', 'lâmina', 'média tensão'],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function familyName(id: string) {
  return families.find((f) => f.id === id)?.name ?? id;
}
