# Validação — Protótipo PSTEC

Executado em 23/10/2026, Windows 11, Node 24.21, Next.js 16.4.3. Legenda: **atendido** · **pendente por dado/ativo** · **não atendido**. Um estado pendente bem implementado atende ao fluxo de demonstração, mas não significa que o site esteja pronto para produção.

## Verificações realmente executadas

| Verificação | Como | Resultado |
|---|---|---|
| TypeScript | `npx tsc --noEmit` | 0 erros |
| Build | `npm run build` | 19 rotas pré-renderizadas, sem avisos de compilação |
| Status HTTP | requisição a `/`, ficha, `/contato`, `/nao-existe`, `/produtos/inexistente` | 200 / 200 / 200 / 404 / 404 |
| Não indexação | cabeçalho `X-Robots-Tag`, meta robots, `robots.txt` | `noindex, nofollow` em todas as páginas; `Disallow: /` |
| Sitemap | `/sitemap.xml` | 14 URLs, base `NEXT_PUBLIC_SITE_URL` (localhost por padrão) |
| Rolagem horizontal | script em iframes nas larguras 320, 360, 390, 768, 1024 e 1440 px × 11 rotas | sem overflow após correções (mapa, badges, grids `minmax(0,1fr)`, painel do menu) |
| Um H1 por página | mesmo script | 1 em todas as rotas |
| Títulos/descrições/canonical | mesmo script | específicos por página |
| Console | navegação por 7 rotas no build de produção | sem erros (exceto o 404 esperado da rota inexistente) |
| Imagens quebradas / links `#` | script na home | 0 / 0 |
| Menu móvel | teclado: Enter abre, foco vai para “Fechar”, Tab circula dentro do painel, Escape fecha e devolve o foco ao botão; rolagem do corpo bloqueada quando aberto | atendido |
| Catálogo | filtro via URL `?familia=aluminio`, busca sem resultado → estado vazio → “Limpar filtros” restaura 6 itens e limpa a URL | atendido |
| Ficha → contato | CTA leva a `/contato?produto=barra-aluminio-dobrada#formulario` com o produto pré-selecionado | atendido |
| Formulário | envio vazio → 3 erros associados (`aria-invalid`, `aria-describedby`), foco no 1º campo; e-mail inválido → foco no e-mail, valores preservados; envio válido → “Verificando…” → “Demonstração concluída. Nenhuma mensagem foi enviada.” em região `role=status` | atendido |
| Modal da estrutura | filtro “Automações” (2 registros); Enter abre, foco em “Fechar”, sem `<video>`/play falso, Escape fecha e devolve o foco ao acionador | atendido |
| Mapa sob demanda | nada externo antes do clique; “Carregar mapa” insere o iframe OpenStreetMap com título acessível | atendido, ver limitação 1 |
| Botão flutuante | some quando a faixa de contato, o formulário ou o rodapé estão visíveis | atendido (verificado na home e em `/contato`) |
| Capturas | Edge headless, `docs/capturas/` (home, produtos, ficha, estrutura e contato; desktop 1440 e celular 390) | geradas |

## Contraste das combinações usadas (cálculo WCAG)

| Texto / fundo | Razão |
|---|---|
| Branco sobre verde de ação `#3F7D1C` | 5,0:1 |
| `#1455A3` (títulos/links) sobre branco | 7,3:1 |
| Verde da logo `#7AB929` sobre navy `#1B2A4A` | 5,9:1 |
| `#526170` (texto secundário) sobre `#F3F6F8` | 5,9:1 |
| Branco sobre navy `#1B2A4A` | ≈ 14:1 |
| Borda de campo `#8A99A8` sobre branco | ≈ 3:1 |

Os valores foram calculados pela fórmula de luminância relativa, sem medição por ferramenta automática.

## Critérios de aceitação

### Identidade e conteúdo
- [x] PSTEC e “Produtos e Serviços Técnicos” aparecem corretamente: **atendido**
- [x] Azul e verde aplicados de forma consistente, com contraste verificado: **atendido** (as cores oficiais seguem **pendentes**)
- [x] Tokens e componentes coerentes: **atendido** (`src/styles/tokens.css`)
- [x] Texto sem lorem ipsum: **atendido**
- [x] Propostas e referências públicas não são apresentadas como fatos: **atendido** (selos “a confirmar”, “em validação”)
- [x] Nenhuma faixa técnica, unidade, tolerância ou certificação inventada: **atendido** (a faixa em “KW” não foi reproduzida)
- [x] Lacunas do histórico e da referência DG Soccer documentadas: **atendido** (README)

### Páginas e navegação
- [x] Todas as rotas com conteúdo e links funcionais: **atendido**
- [x] Navegação direta e atualização funcionam (HTML estático): **atendido**; voltar/avançar testado apenas pela navegação do Next, sem teste manual exaustivo
- [x] Menu móvel com foco correto: **atendido**
- [x] Busca, filtro, estado vazio e ficha navegável: **atendido**
- [x] CTA da ficha identifica o produto no contato: **atendido**
- [x] 404 com saída clara: **atendido**

### Estrutura, mídia e clientes
- [x] Seção destacada de equipamentos, processos, automações e vídeos: **atendido** (mídias **pendentes por ativo**)
- [x] Mídias ilustrativas rotuladas junto da imagem: **atendido**
- [x] Sem botão de play enganoso: **atendido**
- [~] Modal fecha com Escape e devolve o foco: **atendido**. A pausa do vídeo está implementada, mas **não foi testada** porque não há vídeo
- [x] Inventário com origem, direitos e substituição: **atendido** (`MEDIA-INVENTORY.md`)
- [x] Logos e nomes de clientes desativados por padrão: **atendido**
- [x] Sem depoimentos, cases ou endossos: **atendido**
- [x] Sem selos falsos: **atendido**

### Contato e localização
- [x] Faixa antes do rodapé e em `/contato`: **atendido**
- [x] O conflito 383/441 não gera rota nem marcador: **atendido**
- [~] Mapa, “abrir no Maps” e rota usam o mesmo destino quando há endereço aprovado: **implementado** (`mapTargets()`), **não exercitado**, porque não há endereço aprovado
- [x] Sem endereço aprovado: estado claro, rota desativada com explicação: **atendido**
- [x] Mapa sob demanda com alternativa em link: **atendido**
- [x] Mapa não prende a rolagem no celular (camada “Toque para interagir” em telas de toque): **implementado**, sem teste em aparelho real
- [~] WhatsApp aprovado usa número internacional e mensagem codificada: **implementado** (`whatsappUrl()`), **pendente por dado**
- [x] Sem WhatsApp: encaminhamento ao formulário com aviso: **atendido**
- [x] Formulário valida, preserva valores e anuncia o resultado: **atendido**
- [x] Modo de demonstração informa que nada foi enviado: **atendido**

### Qualidade da experiência
- [x] Sem rolagem horizontal nas larguras de teste: **atendido**
- [x] Botão flutuante não cobre formulário nem controles: **atendido**
- [x] Fluxo principal por teclado (menu, filtros, ficha, formulário, modal): **atendido**
- [x] Foco, labels, headings, alt e feedbacks revisados: **atendido** (revisão manual; ver itens não testados)
- [~] Movimento reduzido: implementado via CSS (`prefers-reduced-motion` zera durações e desativa o arme das animações) e usado nas capturas (`--force-prefers-reduced-motion`); **sem auditoria visual dedicada**
- [x] Links externos e estados indisponíveis compreensíveis: **atendido**
- [x] Sem imagens quebradas, links `#` ou erros de console: **atendido**

### SEO, desempenho e entrega
- [x] Título, descrição e semântica por página: **atendido**
- [x] Configurado para não indexação: **atendido**
- [x] Domínio, canonical e JSON-LD sem fatos inventados: **atendido** (o JSON-LD só tem nome e só é emitido com indexação liberada)
- [x] Imagens com dimensões, lazy loading e prioridade no hero; mapa e player fora do carregamento inicial: **atendido**
- [x] Build e verificações registradas: **atendido** (este arquivo)
- [x] Metas não medidas tratadas como metas: **atendido**; ver abaixo
- [x] README permite executar e trocar conteúdo: **atendido**
- [x] Pendências editoriais separadas dos defeitos: **atendido** (`PENDENCIAS-PRODUCAO.md`)

## Metas de desempenho: não medidas

Lighthouse, LCP ≤ 2,5 s, CLS ≤ 0,1 e INP ≤ 200 ms são **metas**. Nenhuma medição foi feita nesta sessão. Fatores favoráveis: páginas estáticas, hero em WebP de 19 KB, SVGs leves, uma única família de fonte auto-hospedada e nenhum script de terceiros.

## Limitações e pontos não testados

1. **Conteúdo do mapa externo:** o iframe do OpenStreetMap foi inserido corretamente, mas o painel de pré-visualização usado no teste não exibiu o conteúdo do mapa. É preciso confirmar num navegador comum.
2. Leitores de tela (NVDA, VoiceOver) não foram testados. A acessibilidade foi revisada de forma estrutural e por teclado.
3. Zoom de 200% e reflow a 400% não foram auditados formalmente. O reflow a 320 px foi verificado.
4. Não houve teste em aparelho físico (iOS/Android) nem em Safari.
5. Pausa de vídeo, legendas e transcrição não foram testadas por falta de vídeo.
6. As capturas em largura 390 usam o Edge headless sem emulação de toque. Por isso a camada “Toque para interagir” do mapa não aparece nelas.
7. As interações seguem uma **interpretação provisória** da referência DG Soccer, que não estava disponível.

## Defeitos do protótipo corrigidos durante a validação

- O painel do menu móvel, fora da tela, ampliava a largura do documento. Corrigido com `overflow: hidden` e ocultação no desktop.
- O mapa, com `aspect-ratio` dentro de uma grade esticada, crescia para 1.800 px. Corrigido com altura definida no desktop.
- Badges longos e grades sem `minmax(0, 1fr)` causavam overflow em 320–390 px. Corrigido.
- O texto do estado “vídeo em preparação” ficava cortado no celular. Corrigido com altura mínima.
- O título da ficha de seccionadoras repetia o nome da família. Corrigido.

---

# Upgrade “Precisão em movimento” — validação (23/10/2026)

## Verificações realmente executadas

| Verificação | Como | Resultado |
|---|---|---|
| TypeScript + build | `tsc --noEmit`, `npm run build` | 0 erros; 19 rotas estáticas |
| Overflow horizontal | iframes em 320, 360, 390, 768, 1024, 1440 px × 6 rotas (home, produtos, ficha, estrutura, contato, empresa) | nenhum elemento além da largura |
| Hero — interação | `pointermove` simulado (mouse) → `--px/--py` atualizados, `matrix3d` aplicado; `pointerleave` → retorno suave a 0 | atendido |
| Hero — movimento reduzido | o painel de testes tem `prefers-reduced-motion: reduce` ativo: hero **não** ficou interativo e exibiu a composição final; captura `home-movimento-reduzido.png` (Edge `--force-prefers-reduced-motion`) | atendido |
| Comparador | foco no controle, 20× seta → valor 70, `aria-valuetext` “70% desenho em linhas, 30% versão com volume”, `clip-path: inset(0 0 0 70%)` | atendido (mouse/toque: input range nativo, não testado em aparelho físico) |
| Visualização rápida | teclado real: Enter abre, foco em “Fechar”, Tab permanece no painel, Escape fecha, foco volta ao botão; alternância ilustração/foto; zoom para em 250% (botão + desativado) | atendido |
| Narrativa da estrutura | rolagem até cada capítulo → capítulo ativo e painel da mídia sticky trocam (01→04); mídia permanece fixa (top 108 px) durante o trecho | atendido |
| Recursos da home | `fetch` de todos os recursos carregados | 14/14 OK |
| Console | navegação no build de produção | sem erros da aplicação |
| Capturas | `docs/capturas/` — desktop 1440 (Edge headless) e 390 px (via iframe, pois o Edge headless não aceita janela < ~500 px) | geradas |

## Desempenho antes × depois (mesmo perfil)

Lighthouse 12.8.2, perfil móvel padrão (throttling simulado), Edge headless, servidor `next start` local, mesma máquina. Relatórios em `docs/perf/`.

| Página | Antes (1 execução) | Depois (faixa de execuções) |
|---|---|---|
| Home | perf 0,86 · LCP 2,9 s · TBT 380 ms · CLS 0 · a11y 1,0 · BP 1,0 | perf 0,74–0,87 · LCP 2,7–3,1 s · TBT 340–880 ms · CLS 0 · a11y 1,0 · BP 1,0 |
| Produtos | perf 0,77 · LCP 2,9 s · TBT 620 ms · CLS 0 | perf 0,79–0,84 · LCP 2,6–2,8 s · TBT 500–730 ms · CLS ≤ 0,001 |

Leitura honesta: a variação entre execuções nesta máquina é grande (a página de produtos, sem mudança de código entre duas rodadas, oscilou 0,83 → 0,79). Não há regressão clara além do ruído; a home ficou na mesma faixa da base após as correções abaixo. JS transferido: 166 KB → 172 KB.

Regressões encontradas e corrigidas durante a medição:
1. O parágrafo do hero (elemento de LCP) e os CTAs tinham entrada atrasada → animação removida (CTAs visíveis desde o início, como pede o briefing).
2. `filter: blur()` no brilho do SVG e `drop-shadow` na peça elevavam Style & Layout → trocados por gradientes radiais em SVG.
3. Perspectiva 3D aplicada sempre → agora só quando o hero está interativo.
4. `content-visibility: auto` nas seções claras abaixo da dobra (Style & Layout da home ≈ 700 → ≈ 560 ms). Nas seções escuras foi mantido desligado porque o Lighthouse passava a calcular contraste contra fundo branco.

Metas LCP ≤ 2,5 s e INP ≤ 200 ms **não foram atingidas/medidas** no perfil simulado; INP não é medível em execução de laboratório.

## Critérios do upgrade

- [x] Identidade industrial própria (navy, linhas técnicas verdes, metal, cobre): **atendido**
- [x] Três momentos distintos — hero interativo, comparador, narrativa sticky: **atendido**
- [x] Interatividade no catálogo, visualização rápida, galeria e contato: **atendido**
- [x] Efeitos ajudam a explorar (anotações, comparação, capítulos): **atendido**
- [x] Composição intencional no celular (hero empilhado, capítulos em blocos completos, canais antes do mapa): **atendido** — ver `*-celular.png`
- [x] Fluxo comercial preservado (CTAs, ficha → contato com produto, formulário demo, WhatsApp → formulário): **atendido**
- [x] Conteúdo conceitual identificado (“Representação conceitual”, “Comparação conceitual”, “Mídia real pendente”): **atendido**
- [x] Nenhum logo, certificado, contador ou dado não aprovado: **atendido**
- [x] Movimento reduzido estável: **atendido** (verificado no painel e em captura)
- [x] Teclado e modais verificados: **atendido**
- [x] Sem overflow; CLS 0–0,001: **atendido**
- [x] Build executado: **atendido**
- [~] Desempenho comparado: **atendido com ressalva** de ruído de medição (acima)

## Limitações do upgrade

- Inclinação do hero testada com eventos sintéticos de ponteiro; não com mouse físico em monitor real.
- View Transitions na reorganização do catálogo só ocorre em navegadores com suporte (Chromium); nos demais a troca é instantânea.
- Toque real (arrastar o comparador, camada do mapa) não testado em aparelho físico.
- Zoom de 200% e leitores de tela continuam sem auditoria formal.
- Defeito corrigido: o botão “Carregar mapa” e o selo do mapa herdavam cores da superfície escura e ficavam quase invisíveis.

---

# Assinatura interativa — validação (24/10/2026)

## Ferramentas efetivamente usadas

| Recurso | Uso concreto |
|---|---|
| Arquivos e shell do projeto | Componentes, dados, CSS, scripts e build (`tsc`, `next build`) |
| Navegador embutido do app | Avaliação inicial e testes de movimento reduzido/estado sticky. O painel deixou de renderizar capturas durante a sessão (janela oculta); as verificações visuais seguiram pelo item abaixo |
| Edge headless + DevTools Protocol (WebSocket nativo do Node 24) | `scripts/verify-assinatura.mjs` (teclado e toque reais, emulação de celular/toque/movimento reduzido) e `scripts/capture.mjs` (capturas) — sem instalar dependências |
| Lighthouse 12.8.2 (via npx) | Desempenho antes/depois, mesmo perfil |
| sharp (já no projeto) | Recortes das capturas para revisão |
| Conectores Figma e Vercel | Listados na sessão, **não usados**: sem arquivo de design autorizado e publicação não autorizada |
| Geração de imagem por IA | **Não usada**; todos os ativos novos são SVG desenhados no código e rotulados |

## Verificações executadas — `node scripts/verify-assinatura.mjs` → 39/39

- Sem overflow horizontal e sem imagens quebradas: 320, 360, 390, 768, 1024, 1440 px × home, /estrutura, /contato?produto=…, /produtos (24 combinações).
- Revelação acompanha a rolagem (p = 0 → 1 → 0), CTAs visíveis em todos os pontos, rolagem não bloqueada (scrollY = alvo).
- Toque: sem reflexo nem inclinação. Movimento reduzido: estado final, sem trecho extra, sem pulsação. Alternar a preferência com a página aberta volta ao estado final.
- Pontos do explorador mantêm posição em 1440/1024/768/390 px (tolerância 4 unidades em 1400).
- Explorador por teclado: Enter abre, um ponto por vez, Escape fecha e devolve o foco ao marcador; a lista controla o mesmo ponto.
- Comparador: 10× seta → 60; arraste por toque reduz o valor.
- Produto → contato: “Tenho interesse nesta solução” leva `?produto=`; persiste após atualizar; voltar retorna à ficha; avançar restaura o item; “Remover” limpa a URL e preserva o nome digitado; identificador inválido/HTML na URL é ignorado.
- WhatsApp flutuante oculto sobre o formulário (celular). Formulário informa “Nenhuma mensagem foi enviada”. Visualização rápida usa o novo CTA e fecha com Escape. Sem erros de console.

Defeitos encontrados pela revisão visual e corrigidos (não detectados no primeiro teste automatizado):
1. Painéis do explorador apareciam todos abertos: `display: grid` vencia o atributo `hidden` → regra `.fx__panel[hidden]` + teste passou a checar o estilo computado.
2. O ícone do selo da ilustração era esticado sobre o texto (seletor amplo `.fx__frame svg`) e, no celular, o selo cobria o ponto 1 → seletor restrito e selo movido para fora da imagem.
3. Indicador de fases aparecia acima da peça → posicionado sob ela.
4. A medição da rolagem dependia de `requestAnimationFrame`; com a página em segundo plano a peça ficava presa no traçado → medição direta no evento de rolagem (já limitado a um por quadro).
5. Campos de formulário desalinhados quando só uma coluna tinha dica → `align-content: start`.

## Desempenho (Lighthouse, perfil móvel simulado, 3 execuções cada, home)

| | Desempenho | LCP | TBT | CLS | A11y | BP |
|---|---|---|---|---|---|---|
| Antes desta rodada | 0,80–0,83 | 2,8–3,0 s | 480–520 ms | 0 | 1,0 | 1,0 |
| Depois | 0,81–0,83 | 2,8–3,0 s | 390–550 ms | 0 | 1,0 | 1,0 |

Sem regressão perceptível. Metas LCP ≤ 2,5 s e INP ≤ 200 ms continuam não atingidas/não medidas neste perfil.

## Capturas

`docs/capturas/assinatura-*.png` (hero em 3 fases + movimento reduzido, explorador, comparador, contato com produto; celular: home completa, explorador, contato). Referência anterior: `docs/capturas/antes-assinatura/`.

## Limitações

- Testes de toque usam emulação do DevTools, não aparelho físico; reflexo do ponteiro testado por eventos sintéticos (não com mouse físico).
- Leitores de tela e zoom de 200% sem auditoria formal.
- Todos os ativos novos são conceituais; dependem dos materiais listados em `PENDENCIAS-PRODUCAO.md` §11 para produção.
