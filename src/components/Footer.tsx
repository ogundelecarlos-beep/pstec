import Link from 'next/link';
import { company, displayable, isApproved } from '@/content/site';
import { mainNav } from './navigation';

export function Footer() {
  const email = displayable(company.email);
  const phone = displayable(company.phone);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer on-dark" data-hide-fab>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-logo" aria-label="PSTEC — página inicial">
              <img src="/media/pstec-logo.svg" alt="" width={132} height={39} />
            </Link>
            <p style={{ marginTop: 16, maxWidth: '36ch' }}>
              PSTEC — Produtos e Serviços Técnicos. Componentes e soluções técnicas para aplicações do setor industrial e elétrico.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <p className="footer-title">Navegação</p>
            <ul className="footer-list">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="footer-title">Institucional</p>
            <ul className="footer-list">
              <li><Link href="/qualidade">Qualidade</Link></li>
              <li><Link href="/privacidade">Privacidade</Link></li>
              <li><Link href="/contato#formulario">Solicitar orçamento</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-title">Contato</p>
            <p>{company.city.value}</p>
            {email && <p style={{ marginTop: 8 }}>{email} {!isApproved(company.email) && <small>(a confirmar)</small>}</p>}
            {phone && <p style={{ marginTop: 4 }}>{phone} {!isApproved(company.phone) && <small>(a confirmar)</small>}</p>}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} PSTEC — Produtos e Serviços Técnicos.</p>
          <p>Protótipo de apresentação. Conteúdo, dados cadastrais e imagens em validação.</p>
        </div>
      </div>
    </footer>
  );
}
