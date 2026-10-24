# Inventário de mídias — Protótipo PSTEC

Atualizado em 23/10/2026. Toda mídia não aprovada exibe rótulo **visível junto da imagem** (não apenas no `alt` ou no nome do arquivo).

Legenda de status: `briefing` · `referencia_publica_nao_validada` · `proposta` · `pendente` · `aprovado`.

| Identificador | Seção | Arquivo | Tipo | Origem | Titular / licença conhecida | Status | Texto alternativo | Rótulo na tela | Real PSTEC? | Aprovação | Substituição necessária |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `pstec-logo` | Cabeçalho, rodapé, OG | `public/media/pstec-logo.svg` | SVG vetorial | Vetorização feita no protótipo a partir da imagem da logo enviada pelo usuário em 23/10/2026 (`fotos-originais/1.png`) | Marca da PSTEC; arquivo oficial não fornecido | proposta | “PSTEC” (link com nome acessível completo) | — (assinatura da marca) | Marca real, desenho aproximado | PSTEC (marketing) | Sim — trocar pelo vetor oficial do manual de marca; conferir cores e tipografia |
| `favicon` | Aba do navegador | `src/app/icon.svg` | SVG | Criado no protótipo (iniciais P/T com cores da logo) | Criação do protótipo | proposta | — | — | Não | PSTEC | Sim — gerar a partir do vetor oficial |
| `hero-industrial` | Home — hero | `public/media/ilustracoes/hero-industrial.svg` → `public/media/hero-industrial.webp` | Ilustração vetorial rasterizada | Criada no protótipo | Criação do protótipo, sem terceiros | proposta | vazio (decorativa; o H1 descreve a seção) | “Imagem ilustrativa” | Não | PSTEC | Recomendado — foto ou vídeo real de peça/processo |
| `og-image` | Compartilhamento social | `public/og-image.png` | PNG 1200×630 | Composição do hero + logo vetorizada | Criação do protótipo | proposta | “Ilustração de conexão flexível laminada com a marca PSTEC” | n/a (fora da página) | Não | PSTEC | Sim, junto com a logo oficial |
| `product-copper` | Produtos — Conexão flexível laminada | `public/media/ilustracoes/cobre-laminado.svg` | Ilustração técnica | Desenhada no protótipo a partir de `fotos-originais/2.png` | Criação do protótipo | proposta | ver `src/content/products.ts` | “Ilustração técnica” | Representa peça real; desenho sem medidas | Responsável técnico PSTEC | Sim — foto profissional |
| `product-braid` | Produtos — Conexão em cordoalha | `public/media/ilustracoes/cordoalha-terminais.svg` | Ilustração técnica | A partir de `fotos-originais/2.png` | Criação do protótipo | proposta | idem | “Ilustração técnica” | idem | idem | Sim |
| `product-aluminum` | Produtos — Barra dobrada | `public/media/ilustracoes/barra-aluminio.svg` | Ilustração técnica | A partir de `fotos-originais/4.png` | Criação do protótipo | proposta | idem | “Ilustração técnica” | idem | idem | Sim |
| `product-steel` | Produtos — Conjunto com cordoalha e grampo | `public/media/ilustracoes/conjunto-cordoalha.svg` | Ilustração técnica | A partir de `fotos-originais/3.png` | Criação do protótipo | proposta | idem | “Ilustração técnica” | idem; material inox **aparente**, não confirmado | idem | Sim |
| `product-contact` | Produtos — Conjunto de contato | `public/media/ilustracoes/contato-cordoalha.svg` | Ilustração técnica | A partir de `fotos-originais/5.png` | Criação do protótipo | proposta | idem | “Ilustração técnica” | idem; aplicação **não certificada** | idem | Sim |
| `product-switchgear` | Produtos — Seccionadoras e disjuntores | `public/media/ilustracoes/lamina-seccionadora.svg` | Ilustração esquemática | Criada no protótipo (sem foto de referência) | Criação do protótipo | proposta | idem | “Ilustração técnica” | Não | idem | Sim — foto real de item da família |
| `photo-copper` | Ficha — registro fotográfico | `public/media/fotos/conexao-laminada.webp` | Foto tratada | Recorte de `fotos-originais/2.png`, enviada pelo usuário | Presumivelmente PSTEC — **confirmar autoria e autorização** | pendente | ver `products.ts` | “Foto recebida — tratada digitalmente” | Sim (provisória) | PSTEC | Sim — baixa resolução de origem (≈160×425 px) |
| `photo-braid` | Ficha | `public/media/fotos/cordoalha-terminais.webp` | Foto tratada | Recorte de `fotos-originais/2.png` | idem | pendente | idem | idem | Sim (provisória) | PSTEC | Sim |
| `photo-aluminum` | Ficha | `public/media/fotos/barra-aluminio.webp` | Foto tratada | Recorte de `fotos-originais/4.png` | idem | pendente | idem | idem | Sim (provisória) | PSTEC | Sim |
| `photo-steel` | Ficha | `public/media/fotos/conjunto-cordoalha.webp` | Foto tratada | Recorte de `fotos-originais/3.png` | idem | pendente | idem | idem | Sim (provisória) | PSTEC | Sim |
| `photo-contact` | Ficha | `public/media/fotos/contato-cordoalha.webp` | Foto tratada | Recorte de `fotos-originais/5.png` (≈212×214 px na origem) | idem | pendente | idem | idem | Sim (provisória) | PSTEC | Sim — qualidade muito limitada |
| `company-facility` | Home “Quem somos”, Estrutura | — | Placeholder | — | — | pendente | — | “Foto das instalações pendente” / “Fotos reais em preparação” | — | PSTEC | Fornecer fotos reais |
| `equipment-gallery` | Estrutura | — | Placeholder | — | — | pendente | — | “Fotos reais em preparação” | — | PSTEC | Fornecer fotos reais |
| `process-overview` | Estrutura | — | Placeholder | — | — | pendente | — | idem | — | PSTEC | Fornecer fotos reais |
| `automation-video` | Estrutura | — | Vídeo (vazio) | — | — | pendente | — | “Vídeo da estrutura em preparação” (sem botão de play) | — | PSTEC | Vídeo + poster + legendas/transcrição |
| `automation-cell` | Estrutura | — | Vídeo (vazio) | — | — | pendente | — | idem | — | PSTEC | idem |
| `institutional-video` | Estrutura | — | Vídeo (vazio) | — | — | pendente | — | idem | — | PSTEC | idem |
| `client-logos` | Home — referências | — | Desativados | Montagens do briefing (não incorporadas) | Titulares das marcas | pendente | — | “Cliente 01…08 — Aprovação pendente” | — | PSTEC + cada cliente | Relação confirmada + autorização escrita de uso |
| `quality-certificates` | Qualidade | — | Não disponíveis | — | — | pendente | — | “Não disponível” | — | PSTEC | Certificados vigentes |

## Arquivos de origem

`public/media/fotos-originais/1.png … 5.png` — cópias exatas dos anexos enviados na conversa (logo e quatro fotos de produtos). Mantidos como referência; **não** são usados diretamente nas páginas. Remover da pasta `public/` antes de publicar se a PSTEC não autorizar sua distribuição.

## Como o tratamento das fotos foi feito

`npm run media` (script `scripts/process-photos.mjs`, biblioteca `sharp`): recorte da peça → filtro de mediana (ruído) → ampliação 3× Lanczos → normalização de níveis → leve aumento de saturação → nitidez → WebP q82. A ampliação **não recupera detalhe inexistente**; o resultado serve para apresentação, não para publicação definitiva.

## Mídias não utilizadas por decisão

- Nenhuma foto de banco de imagens: evita sugerir que fábricas ou equipamentos de terceiros pertencem à PSTEC.
- Nenhuma imagem gerada por IA fotorrealista: as ilustrações são vetoriais e claramente rotuladas.
- Nenhum logo de cliente baixado ou recriado.

## Mídias do upgrade “Precisão em movimento”

| Identificador | Seção | Arquivo | Tipo | Origem | Status | Rótulo na tela | Real PSTEC? | Substituição |
|---|---|---|---|---|---|---|---|---|
| `hero-concept` | Home — hero | `src/components/art/ShuntArt.tsx` (SVG inline) | Representação conceitual vetorial, em camadas | Criada no protótipo, inspirada na foto 2 | proposta | “Representação conceitual” + “Sem dimensões ou especificações” | Não | Opcional: modelo 3D real (glTF) ou foto recortada profissional da peça |
| `hero-notes` | Home — hero | idem | Anotações de apresentação | Criadas no protótipo | proposta | visíveis junto da peça | Não são medições | Validar redação com a equipe técnica |
| `compare-lines` / `compare-volume` | Home — “Do detalhe à aplicação” | idem | Mesma ilustração em linhas e com volume | Criadas no protótipo | proposta | “Comparação conceitual — mesma ilustração em duas versões” | Não | Ideal: desenho técnico real × foto real **do mesmo item**, ambos aprovados |
| `story-equipamentos` … `story-estrutura` | Narrativa da estrutura | `src/components/StructureStory.tsx` | Esquemas em linhas do conteúdo futuro | Criados no protótipo | pendente | “Mídia real pendente” + “esquema ilustrativo do conteúdo futuro” | Não — não retratam a fábrica | Fotos/vídeos reais por capítulo |

## Mídias da assinatura interativa

| Identificador | Seção | Arquivo | Tipo | Status | Rótulo na tela | Real PSTEC? | Substituir por |
|---|---|---|---|---|---|---|---|
| `technical-reveal` | Hero | `src/components/TechnicalReveal.tsx` | SVG em camadas (traçado → volume) | proposta | “Representação conceitual” + “Linhas de apresentação, sem dimensões ou especificações” | Não | Desenho técnico simplificado + foto/modelo da **mesma** peça real, aprovados |
| `shunt-silhueta` | Hero (máscara do reflexo) | `public/media/mascaras/shunt-silhueta.svg` | Máscara técnica | — | não visível | — | Regerar se a geometria mudar |
| `facility-concept` | Home e /estrutura | `src/components/art/FacilityArt.tsx` | Ilustração conceitual de célula de produção | proposta | “Ilustração conceitual — não retrata as instalações da PSTEC” | Não — não demonstra posse de equipamentos | Foto real ampla de uma área da PSTEC; reposicionar `x`/`y` em `src/content/facility.ts` |
| `facility-points` (5) | idem | `src/content/facility.ts` | Textos + `media: null` | pendente | “Foto ou vídeo real em preparação” | Textos explicam a representação | Foto/vídeo por ponto, com legenda aprovada |
