import type { Metadata } from 'next';
import { StructureGallery } from '@/components/StructureGallery';
import { StructureStory } from '@/components/StructureStory';
import { FacilityExplorer } from '@/components/FacilityExplorer';
import { Notice, PageHero, SectionTitle } from '@/components/ui';
import { structureCategories, structureItems } from '@/content/structure';

export const metadata: Metadata = {
  title: 'Estrutura',
  description: 'Equipamentos, processos, automações e vídeos da estrutura da PSTEC em Franco da Rocha — SP. Mídias em preparação.',
  alternates: { canonical: '/estrutura' },
};

export default function EstruturaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Estrutura' }]}
        eyebrow="Estrutura"
        title="Equipamentos, processos e automações"
        lead="Evidências visuais da estrutura produtiva da PSTEC, organizadas em capítulos e galeria."
      />
      <section className="section section--dark on-dark" aria-labelledby="explorar">
        <div className="container">
          <SectionTitle
            id="explorar"
            title="Explore a representação"
            lead="Pontos interativos sobre uma ilustração conceitual de célula de produção. Cada ponto indica o que será mostrado com registros reais."
          />
          <FacilityExplorer />
        </div>
      </section>
      <section className="section section--dark on-dark" aria-labelledby="narrativa" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            id="narrativa"
            title="Do equipamento à estrutura"
            lead="Quatro capítulos preparados para receber fotos e vídeos reais. Cada um indica o que será mostrado."
          />
          <StructureStory />
        </div>
      </section>
      <section className="section section--dark on-dark" aria-labelledby="galeria" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            id="galeria"
            title="Galeria da estrutura"
            lead="Filtre por categoria e abra cada registro. Vídeos só exibem reprodução e duração quando o material real estiver disponível."
          />
          <StructureGallery items={structureItems} categories={structureCategories} />
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>Sobre as mídias desta página</h2>
          <Notice tone="info">
            <p>
              “Automações” refere-se a registros dos processos internos da PSTEC, não à oferta de serviços de automação industrial.
            </p>
            <p>
              Os esquemas em linhas são ilustrativos do conteúdo futuro e não retratam as instalações. Nenhuma foto de banco de imagens é usada
              para representar a fábrica. Vídeos com fala serão publicados com legendas e transcrição.
            </p>
          </Notice>
        </div>
      </section>
    </>
  );
}
