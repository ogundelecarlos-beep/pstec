/**
 * Transição curta de entrada entre páginas (CSS, 240 ms). Não atrasa o clique:
 * a navegação acontece imediatamente; só o novo conteúdo aparece com fade.
 * O Next mantém voltar/avançar e a restauração de rolagem.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
