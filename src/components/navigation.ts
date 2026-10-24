export const mainNav = [
  { href: '/', label: 'Início' },
  { href: '/empresa', label: 'Empresa' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/estrutura', label: 'Estrutura' },
  { href: '/contato', label: 'Contato' },
] as const;

export function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}
