# Pendências para transformar o protótipo em site público

Itens que dependem da **PSTEC** (dados, ativos, autorizações) — não são defeitos do protótipo. Os defeitos e limitações do protótipo estão em `VALIDACAO.md`.

Todos os dados abaixo são editados em um único lugar: `src/content/` (ver README).

## 1. Dados cadastrais e canais

| Item | Situação atual | O que é preciso | Onde alterar |
|---|---|---|---|
| Endereço — número do imóvel | **Conflito:** página pública indica 383; cadastro externo indica 441 | Número correto confirmado por escrito | `company.number`, `company.approvedAddress` (status `aprovado`) em `src/content/site.ts` |
| Bairro e CEP | Sítio Borda da Mata, 07810-000 — referência pública | Confirmação | `company.district`, `company.zip` |
| Mapa, “Abrir no Maps” e rota | Mapa regional sem pin; rota desativada | Endereço aprovado (ou Place ID do Google validado) | `company.approvedAddress` — mapa, link e rota passam a usar o mesmo destino automaticamente |
| Telefone | (11) 4780-9783 — referência pública, exibido com selo “a confirmar” e sem link `tel:` | Confirmação do número e se pode ser divulgado | `company.phone` → status `aprovado` ativa o link |
| E-mail | vendas@brpstec.com.br — referência pública, sem `mailto:` | Confirmação | `company.email` |
| WhatsApp | Não confirmado; botões levam ao formulário | Número comercial em formato internacional (só dígitos) e autorização | `company.whatsapp` (`value: '55119…'`, `status: 'aprovado'`) |
| Horário de atendimento | “8h às 17h” era apenas exemplo do assistente; exibido como pendente | Horário real | `company.hours` |
| Razão social e CNPJ | Não exibidos | Dados oficiais para rodapé e aviso de privacidade | `company.legalName` + `Footer.tsx` |

## 2. Marca

- Arquivo vetorial oficial da logo (SVG/AI/PDF) e manual de marca com cores oficiais. A logo atual é uma **vetorização aproximada** feita a partir da imagem enviada.
- Validar se o navy `#1B2A4A` e o verde `#7AB929` (lidos da imagem) correspondem às cores oficiais; o verde de botões `#3F7D1C` foi escurecido para contraste.
- Favicon e imagem de compartilhamento a partir do arquivo oficial.

## 3. Catálogo técnico

- Lista oficial de famílias e produtos (os 6 itens atuais são demonstrativos, derivados das fotos e da página pública).
- Para cada item: nome comercial, material/liga, aplicação, processo, dimensões ou faixa, acabamento, documento técnico — **validados por responsável técnico**.
- **Seccionadoras:** a página pública traz uma faixa numérica com unidade “KW”. Não foi reproduzida. Validar grandeza, unidade, faixa e aplicação antes de qualquer publicação.
- Catálogo em PDF, se existir (hoje o download é omitido e informado como indisponível).
- Confirmar se a PSTEC quer publicar fotos das peças de clientes (confidencialidade de desenho).

## 4. Serviços

- Escopo real de cada serviço. Hoje: 1 item como proposta e 3 marcados “Escopo de serviço em validação”.
- Confirmar explicitamente se a empresa oferece (ou não) usinagem, estamparia, dobra, tratamento superficial, manutenção, ensaios — nada disso está anunciado.

## 5. Fotos e vídeos

- Sessão fotográfica profissional das peças (fundo neutro, boa luz) — substitui ilustrações e fotos tratadas.
- Fotos reais de fachada, área produtiva, equipamentos e expedição.
- Vídeos de automações internas e apresentação da estrutura, com poster, legendas (WebVTT) e transcrição quando houver fala.
- Autorização de uso de imagem de pessoas que apareçam nos registros.
- Confirmar autoria das 4 fotos enviadas e se podem ser publicadas (estão em `public/media/fotos-originais/`).

## 6. Clientes e referências

Candidatos do briefing: GE, Siemens, Voith, WEG, Maurizio, GTMS, Hubbell e “GInterca/Ginterca” (grafia a confirmar).

Para cada um: confirmação da relação comercial atual, autorização **por escrito** de uso de nome e/ou logo, arquivo oficial do logo e redação aprovada do título da seção. Configurar em `src/content/clients.ts` (`relationshipConfirmed`, `logoAuthorized`, `approvedLabel`, `assetPath`).

## 7. Qualidade e certificações

- Certificados vigentes (escopo, número, validade, organismo). Nenhum selo é exibido hoje.
- Texto institucional sobre controle de qualidade, se houver procedimento formal.

## 8. Privacidade e jurídico

- Revisão do aviso de privacidade (`/privacidade`) com identificação do controlador, encarregado, base legal e retenção (LGPD).
- Definir destino do formulário (e-mail transacional, CRM etc.), retenção e quem acessa os dados.

## 9. Publicação

- Domínio de produção (`NEXT_PUBLIC_SITE_URL`). Nenhum domínio foi presumido.
- Liberar indexação apenas na versão aprovada (`NEXT_PUBLIC_ALLOW_INDEXING=true`).
- Proteção de acesso no ambiente de demonstração (ex.: senha/Deployment Protection na hospedagem) — `noindex` não impede acesso.
- Integração real do formulário (`NEXT_PUBLIC_DEMO_MODE=false` + endpoint no servidor; nenhum segredo no cliente).
- Referência DG Soccer: enviar URL ou capturas para comparar as interações; as atuais são interpretação provisória.

## 10. Ativos para a camada de experiência

- **Hero:** foto recortada em alta resolução (fundo neutro) ou modelo 3D leve (glTF, < 1 MB) de uma peça real aprovada, para substituir a representação conceitual. Sem isso, a ilustração SVG continua rotulada.
- **Comparador:** um par aprovado do **mesmo** item — desenho técnico (pode ser simplificado, sem cotas confidenciais) e foto real.
- **Narrativa:** para cada capítulo (Equipamentos, Processos, Automações, Estrutura), 1 foto ou vídeo real; vídeos com poster, duração (`duration` em `structure.ts`) e legendas.
- **Anotações do hero:** confirmar se os termos “Lâminas sobrepostas”, “Curva de flexão” e “Terminal com furação” são adequados tecnicamente.

## 11. Assinatura interativa — materiais reais

- **Do traçado ao volume:** um par aprovado da mesma peça — desenho técnico simplificado (sem cotas confidenciais) e foto recortada em alta resolução ou modelo 3D leve. Até lá, a representação continua conceitual e rotulada.
- **Estrutura explorável:** uma foto ampla e real de uma área da PSTEC (paisagem, ~2:1, ≥ 2400 px de largura), lista dos equipamentos/etapas visíveis e textos aprovados para cada ponto; fotos ou vídeos curtos por ponto (vídeos com poster e legendas). Ao trocar a imagem, atualizar `facilityImage` e as posições `x`/`y`.
- **WhatsApp contextual:** só será exibido com número aprovado (`company.whatsapp`).
