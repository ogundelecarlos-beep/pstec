import type { Service } from './types';

/**
 * Serviços em linguagem conservadora (status `proposta`).
 * Não anunciar automação industrial, manutenção em campo, usinagem CNC,
 * ensaios ou engenharia de projetos sem confirmação da PSTEC.
 */
export const services: Service[] = [
  {
    id: 'atendimento-tecnico',
    title: 'Atendimento técnico na especificação',
    summary: 'Conversa com a equipe para entender a aplicação, o desenho ou a amostra e indicar o caminho de fornecimento.',
    scopeStatus: 'proposta',
  },
  {
    id: 'fabricacao-sob-desenho',
    title: 'Fabricação conforme desenho ou amostra',
    summary: 'Produção de componentes a partir de desenho técnico ou peça de referência fornecida pelo cliente.',
    scopeStatus: 'pendente',
    note: 'Escopo de serviço em validação',
  },
  {
    id: 'reposicao',
    title: 'Componentes de reposição',
    summary: 'Avaliação de peças para reposição em equipamentos elétricos, mediante análise técnica da aplicação.',
    scopeStatus: 'pendente',
    note: 'Escopo de serviço em validação',
  },
  {
    id: 'acabamento',
    title: 'Acabamento e tratamento superficial',
    summary: 'Definição de acabamento compatível com a aplicação, conforme especificação do cliente.',
    scopeStatus: 'pendente',
    note: 'Escopo de serviço em validação',
  },
];
