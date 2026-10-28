import type { Metadata } from 'next';
import { Notice, PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacidade',
  description: 'Aviso demonstrativo de privacidade do protótipo do site da PSTEC.',
  alternates: { canonical: '/privacidade' },
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Privacidade' }]}
        eyebrow="Privacidade"
        title="Aviso de privacidade"
        lead="Texto demonstrativo. Deve ser revisado pela PSTEC e por assessoria jurídica antes da publicação."
      />
      <section className="section">
        <div className="container prose">
          <Notice>Documento provisório do protótipo — não constitui política oficial da PSTEC.</Notice>
          <h2>Dados do formulário</h2>
          <p>
            Nesta versão de demonstração, o formulário de contato apenas valida os campos no seu navegador. Nenhum dado é enviado,
            armazenado em servidor, registrado em logs ou compartilhado.
          </p>
          <p>
            Quando o envio real for habilitado, serão solicitados somente nome, e-mail, assunto e mensagem (empresa e telefone opcionais),
            com finalidade exclusiva de responder à solicitação.
          </p>
          <h2>Serviços externos</h2>
          <ul>
            <li>
              <strong>Mapa:</strong> carregado de serviço externo (OpenStreetMap ou Google Maps) somente quando você clica em “Carregar mapa”.
              A partir daí, o provedor pode receber dados técnicos de acesso, conforme a política dele.
            </li>
            <li>
              <strong>Links de Maps e WhatsApp:</strong> abrem serviços de terceiros em nova aba, apenas por ação sua.
            </li>
            <li>
              <strong>Fontes:</strong> hospedadas junto com o site, sem requisição a serviço externo durante a navegação.
            </li>
          </ul>
          <h2>Armazenamento local</h2>
          <p>
            O site guarda no armazenamento da sessão do navegador apenas quais seções já foram animadas, para não repetir efeitos. Nenhum
            cookie de rastreamento ou ferramenta de análise é utilizado nesta versão.
          </p>
          <h2>Pendências para a versão pública</h2>
          <ul>
            <li>Identificação do controlador (razão social e CNPJ) e canal do encarregado de dados.</li>
            <li>Base legal, prazo de retenção e direitos do titular conforme a LGPD.</li>
            <li>Inclusão de ferramentas de análise, se houver, com consentimento adequado.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
