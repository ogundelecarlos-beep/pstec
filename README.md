# PSTEC — Protótipo do site

Protótipo navegável de alta fidelidade do site da **PSTEC — Produtos e Serviços Técnicos** (Franco da Rocha — SP). Next.js 16 (App Router) + TypeScript + CSS por tokens/componentes. Sem banco de dados, sem serviço pago, sem credenciais.

> **Protótipo de apresentação.** Dados cadastrais, catálogo, imagens e referências comerciais estão em validação. Nada aqui é publicação aprovada pela PSTEC. Ver `PENDENCIAS-PRODUCAO.md`.

## Executar

Requisitos: Node.js 20.9+ (testado com Node 24.21 / npm 11.19).

```bash
npm install
```

```bash
npm run dev
```

Abra http://localhost:3000. Para a versão otimizada:

```bash
npm run build
```

```bash
npm run start
```

Outros scripts: `npm run typecheck` (TypeScript) e `npm run media` (refaz o tratamento das fotos em `public/media/fotos/`). A logo e o favicon são gerados por `node scripts/build-logo.mjs`.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, quem somos, produtos, serviços, estrutura, referências, qualidade, Contato & Localização |
| `/empresa` | Apresentação, posicionamento, dados institucionais (pendentes indicados) |
| `/produtos` | Catálogo demonstrativo com busca, filtro por família, estado vazio; filtros refletidos na URL (`?q=&familia=`) |
| `/produtos/[slug]` | Ficha (6 itens) com especificações “sob consulta”, foto tratada e CTA contextualizado |
| `/servicos` | Serviços em linguagem conservadora, escopo em validação |
| `/estrutura` | Galeria filtrável Equipamentos / Processos / Automações / Visão da estrutura, com modal |
| `/qualidade` | Área preparada para certificados, sem selos |
| `/contato` | Formulário de orçamento (modo demonstração) + Contato & Localização. Aceita `?produto=<slug>` e `?canal=whatsapp` |
| `/privacidade` | Aviso demonstrativo |
| qualquer outra | 404 com retorno ao início e ao catálogo |

Todas as páginas são pré-renderizadas (`next build` gera HTML estático), então navegação direta, voltar/avançar e atualização funcionam.

## Onde trocar o conteúdo

Nenhum telefone, e-mail ou endereço é repetido em páginas — tudo vem de `src/content/`:

| Arquivo | O que contém |
|---|---|
| `src/content/site.ts` | Dados da empresa (cada campo com `value`, `status`, `source`, `note`), flags e região do mapa |
| `src/content/products.ts` | Famílias e fichas de produto |
| `src/content/services.ts` | Serviços |
| `src/content/structure.ts` | Itens da galeria de estrutura e vídeos |
| `src/content/clients.ts` | Candidatos a referência comercial com flags de aprovação |
| `src/content/types.ts` | Tipos (`Field<T>`, `ContentStatus`, `Product`, `Service`, `StructureItem`, `ClientReference`, `MediaAsset`) |

### Regra de status

`ContentStatus = 'briefing' | 'referencia_publica_nao_validada' | 'proposta' | 'pendente' | 'aprovado'`.

- Só `aprovado` vira **canal clicável** (`tel:`, `mailto:`, WhatsApp, rota). Formato válido ≠ canal autorizado.
- `referencia_publica_nao_validada` aparece com selo “a confirmar” enquanto `flags.showUnvalidatedReferences` for `true`.
- `pendente` com `value: null` mostra estado explicativo, nunca dado inventado.

### Configurar canais

- **WhatsApp:** em `site.ts`, `company.whatsapp = { value: '5511XXXXXXXXX', status: 'aprovado' }` (só dígitos, com DDI). O botão comercial, o flutuante e a ficha passam a gerar `https://wa.me/NUMERO?text=...` com mensagem codificada (na ficha, inclui nome e link do item). Sem número aprovado, todos levam ao formulário com o aviso “Canal de WhatsApp em configuração”.
- **Endereço/mapa/rota:** preencha `company.approvedAddress = { value: 'Av. ..., nº, bairro, Franco da Rocha - SP, CEP', status: 'aprovado' }`. O embed (Google Maps), “Abrir no Google Maps” e “Traçar rota” (`api=1&destination=`) passam a usar esse mesmo texto. Enquanto vazio: mapa regional OpenStreetMap **sem marcador**, rotulado “localização aproximada”, e rota desativada com explicação.
- **Telefone/e-mail/horário:** mude `status` para `aprovado` (e `value` do horário).
- **Clientes:** em `clients.ts`, `relationshipConfirmed: true` + `approvedLabel` mostra o nome; `logoAuthorized: true` + `assetPath` mostra o logo. O título “Empresas que confiam na PSTEC” só aparece quando ao menos um item estiver aprovado.
- **Vídeos:** em `structure.ts`, preencha `videoSrc`, `poster`, `captionsSrc` e `transcript`. Sem `videoSrc`, o modal mostra “Vídeo da estrutura em preparação”, sem botão de play.

### Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Padrão | Efeito |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Base de canonical, sitemap e Open Graph |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | `true` libera meta robots, `X-Robots-Tag`, `robots.txt` e JSON-LD |
| `NEXT_PUBLIC_DEMO_MODE` | `true` | Formulário em modo demonstração (“Testar solicitação”) |

O formulário não tem backend. Para envio real, crie uma rota de servidor (ex.: `src/app/api/orcamento/route.ts`) que valide de novo os dados e envie por um provedor configurado via variáveis **sem** prefixo `NEXT_PUBLIC_`; nunca exponha segredo no cliente.

## Estrutura do código

```
src/
  app/            rotas, metadata, robots.ts, sitemap.ts, icon.svg, not-found.tsx
  components/     Header (menu móvel), Footer, ui (SectionTitle, MediaFigure, Breadcrumb, PageHero, badges, Notice),
                  ProductCard, ProductCatalog, StructureGallery (modal), ContactForm, ContactLocation, MapEmbed,
                  CopyButton, FloatingWhatsApp, ClientsSection, Reveal, Icon
  content/        dados tipados (fonte única)
  lib/            channels.ts (WhatsApp/Maps), useFocusTrap.ts
  styles/         tokens.css, base.css, components.css
public/media/     logo, ilustrações SVG, fotos tratadas, fotos originais
scripts/          build-logo.mjs, process-photos.mjs
```

## Design system (proposta)

Tokens em `src/styles/tokens.css`: navy `#1B2A4A` e verde `#7AB929` lidos da logo enviada; `brand-blue #1455A3` para títulos/links; verde de ação `#3F7D1C` (escurecido para 5,0:1 com branco). Espaçamento 4–96 px, container 1200 px, raios 8–12 px, botões ≥ 44 px, movimento 160–280 ms com easing único e respeito a `prefers-reduced-motion`.

Componentes e estados documentados: botão (primário, secundário, ghost, link; hover, foco, ativo, carregando, desativado), chip de filtro (`aria-pressed`), card (hover/foco com zoom de imagem e borda), campos (padrão, foco, erro com mensagem textual), badges (pendente, info, ok), aviso, modal, mapa (placeholder → carregado → interação liberada no toque).

## Camada de experiência — “Precisão em movimento”

Direção: o site se comporta como uma prancheta técnica que ganha volume — navy profundo, linhas de desenho em verde, superfícies brancas levemente metalizadas e o cobre das peças como única cor quente. Um efeito principal por seção; seções de leitura (Quem somos, Serviços, Qualidade) permanecem calmas.

| Momento / recurso | Arquivo | Comportamento | Alternativa estática |
|---|---|---|---|
| **Hero** (momento 1) | `components/HeroStage.tsx`, `components/art/ShuntArt.tsx` | Representação conceitual SVG da conexão laminada em camadas de profundidade; inclinação (≤ 7°) e luz seguem o mouse só dentro do hero, com suavização por `requestAnimationFrame` que para ao convergir e quando a aba fica oculta; título entra por linhas com máscara (700 ms); linhas técnicas se desenham; 3 anotações persistentes; botão “Explorar visual” (toque/teclado) percorre as anotações com anúncio em região de status; CTA com conteúdo magnético (a área clicável não se move) | Movimento reduzido, toque ou aparelho modesto (`hardwareConcurrency ≤ 2` ou `saveData`): composição final sem inclinação nem entradas |
| **Comparador** (momento 2) | `components/CompareSlider.tsx` | Mesma ilustração em linhas × volume; `<input type="range">` nativo cobre a área (mouse, toque, setas, Home/End); `aria-valuetext` descreve a proporção; rotulado “Comparação conceitual” | Funciona igual; não há animação |
| **Narrativa da estrutura** (momento 3) | `components/StructureStory.tsx` | ≥ 1024 px: mídia `sticky` acompanha 4 capítulos (trecho curto, rolagem nativa) e troca o esquema ativo por `IntersectionObserver`; < 1024 px: cada capítulo é um bloco vertical com a própria mídia | Troca sem transição |
| Vitrines + visualização rápida | `ProductCard.tsx`, `ProductCatalog.tsx`, `QuickView.tsx` | Hover/foco elevam o card, destacam a família e revelam “Visualização rápida” (sempre visível no toque); filtros reorganizam via View Transitions API quando suportada; painel `<dialog>` com imagem maior, alternância ilustração/foto, zoom limitado a 250% e CTA contextualizado | Reorganização instantânea; sem elevação |
| Galeria | `StructureGallery.tsx` | Filtros Estrutura/Equipamentos/Processos/Automações; miniatura indica estado (“Vídeo pendente”); duração só aparece se `duration` estiver preenchido; modal com poster e controles reais quando houver `videoSrc` | — |
| Sistema de movimento | `styles/experience.css`, `components/Motion.tsx`, `app/template.tsx` | Progresso de leitura; traçado técnico entre seções (desenha uma vez); sublinhado animado no menu; menu móvel com itens em sequência; brilho único na borda/face do CTA ao passar o mouse; transição de página de 240 ms (não atrasa o link); confirmações com microanimação (copiar, “Filtros limpos”, check desenhado no formulário) | `prefers-reduced-motion` zera durações, remove brilho, magnetismo e entradas |
| Contato (encerramento) | `ContactLocation.tsx` | Superfície escura, canais em blocos hierarquizados com copiar, ações imediatas, mapa emoldurado com cantos técnicos; mapa continua sob demanda | — |
| Marcas | `ClientsSection.tsx` | Grade com divisórias e destaque suave; nomes/logos desativados; sem contadores | — |

### Assinatura interativa (rodada 3)

| Recurso | Onde | Arquivo | Como funciona | Estático / fallback |
|---|---|---|---|---|
| **Do traçado ao volume** | Hero da home | `components/TechnicalReveal.tsx` (+ `HeroStage.tsx`) | Uma só geometria SVG em camadas: traçado → 13 lâminas que preenchem em sequência → terminais metálicos → reflexo que percorre a curva. A rolagem nativa define `--p` (0–1) no `<section>`; opacidades e deslocamentos são `calc(clamp(...))` em CSS — sem re-render do React. ≥ 1024 px: hero com 170vh e palco `sticky` (texto e CTAs sempre visíveis); celular: sem trecho extra, a peça se forma ao atravessar a tela. Barra “Traçado · Volume · Acabamento” indica a fase. | `--p` padrão = 1 (sem JS, movimento reduzido ou erro → peça completa); alternar a preferência em tempo real volta ao estado final |
| **Reflexo pelo ponteiro** | Peça do hero | `TechnicalReveal.tsx` (`usePointerLight`), `public/media/mascaras/shunt-silhueta.svg` | Luz radial em `mix-blend-mode: screen`, recortada pela silhueta da peça (`mask`), intensidade ≤ 0,8 e proporcional ao volume (`--p`); inclinação ≤ 4°/3°; suavização em `requestAnimationFrame` que para ao convergir; volta ao neutro ao sair | Só com `(hover: hover) and (pointer: fine)` e sem movimento reduzido |
| **Estrutura explorável** | Home (Estrutura) e `/estrutura` | `components/FacilityExplorer.tsx`, `components/art/FacilityArt.tsx`, `content/facility.ts` | Ilustração conceitual 1400 × 700 com 5 pontos (botões numerados). Marcadores e lista/acordeão controlam o mesmo estado (um ponto por vez); ativo muda de forma (círculo → quadrado), cor e anel; pulsação 3× e para; Escape fecha e devolve o foco; mídia real abre em modal quando `media` existir | Imagem nunca recortada (mesma proporção), então os pontos não se deslocam; movimento reduzido remove pulsação |
| **Do desenho à peça** | Home | `components/CompareSlider.tsx` | Mesma geometria em linhas × volume, `input range` nativo com rótulo, `aria-valuetext` e instrução; `touch-action: pan-y` mantém a rolagem vertical | — |
| **Orçamento contextualizado** | Ficha, visualização rápida, `/contato` | `ContactForm.tsx`, `app/contato/page.tsx` | CTA “Tenho interesse nesta solução” → `/contato?produto=<slug>`; slug validado contra o catálogo; cartão “Item selecionado” com Trocar / Remover / Ver ficha; seleção sincroniza a URL (`replaceState`); WhatsApp contextual quando aprovado, senão explica que segue pelo formulário | Funciona após atualizar e com voltar/avançar |

Verificação automatizada (sem dependências): `node scripts/verify-assinatura.mjs` controla o Edge/Chrome headless pelo DevTools Protocol (teclado e toque reais) e `node scripts/capture.mjs jobs.json` gera capturas com emulação de celular e de movimento reduzido. Requer o site rodando (`npm run start`).

**Por que não há WebGL/Three.js:** a peça é bem representada em SVG vetorial com camadas e CSS 3D; WebGL acrescentaria uma dependência pesada sem ganho visual proporcional para um objeto conceitual. Nenhuma biblioteca de animação foi adicionada.

## Referência DG Soccer

A URL e as capturas da referência DG Soccer **não estavam disponíveis**; nenhum site com nome parecido foi consultado. As interações implementadas (cabeçalho que ganha superfície ao rolar, menu em painel, entrada discreta de seções uma vez por sessão, cards com zoom sutil, galeria com filtros e modal) são uma **interpretação provisória da intenção de interação**, conforme seção 4 do briefing. Envie o link ou capturas para comparação.

## Documentação

- `MEDIA-INVENTORY.md` — origem, direitos e substituição de cada mídia.
- `PENDENCIAS-PRODUCAO.md` — o que depende da PSTEC.
- `VALIDACAO.md` — critérios de aceitação, verificações executadas e limitações.
- `docs/capturas/` — capturas de tela desktop e celular.
