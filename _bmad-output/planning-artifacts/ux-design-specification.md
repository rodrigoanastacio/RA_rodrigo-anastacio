---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - prd.md
  - product-brief-saas-gestao-leads-2026-02-27.md
  - architecture.md
  - research/market-SaaS-Gestao-Leads-WhatsApp-research-2026-02-27.md
---

# UX Design Specification saas-gestao-leads

**Author:** Rodrigo
**Date:** 2026-02-28

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

O SaaS Gestão de Leads é uma plataforma "Lean Lead Capture" criada para eliminar o buraco negro de conversão entre anúncios pagos e mensagens no WhatsApp. Com uma abordagem "Anti-Burocracia", foca em Time-To-Value imediato, capturando os contatos dos leads silenciosamente e em tempo real (< 800ms) sem exigir dependências da API Oficial da Meta ou atrapalhar a jornada do Visitante.

### Target Users

1. **Gestor de Tráfego (Operador Técnico):** Precisa configurar campanhas em poucos minutos (via construtor ou ZIP) para justificar de forma inequívoca o sucesso (ROI) dos seus serviços aos clientes pagantes.
2. **Dono do Negócio / Administrador:** O patrocinador financeiro, que exige um painel simples, preferencialmente acessado pelo celular, com a listagem exata de potenciais vendas geradas naquele dia.
3. **Resgate/Atendimento (Operação de Conversão):** O usuário crasso do dia-a-dia que não quer treinamento para softwares engessados, mas precisa visualizar leads que apenas clicaram e "abandonaram" a jornada, para poder contatá-los proativamente.
4. **O Visitante (Lead Invisível):** Exige navegação orgânica. Interage publicamente e quer chegar ao WhatsApp do prestador incólume e sem lentidão.

### Key Design Challenges

- **Invisibilidade e Micro-Latência:** A experiência de submit e redirecionamento público deve ser tão veloz e fluida que o visitante sequer perceba que passou por um filtro de rastreamento antes de chegar ao aplicativo do WhatsApp.
- **Adoção Zero-Atrito em Operações (Ana):** O painel do operador de conversão deve evadir qualquer semelhança a CRMs complexos, devendo ser operado intuitivamente como uma "Caixa de Entrada / Lista de Tarefas" focada em conversão e resgate.
- **Contexto Híbrido Mobile-First:** Dashboard administrativo com renderização perfeita para os usuários tomadores de decisão visualizarem relatórios "on-the-go" sem necessitarem de telas de desktop.
- **Setup Express do Tenant:** O fluxo de construção da LP e integração do formulário para o Operador Técnico tem limite temporal/esforço curto e precisa soar seguro e ágil.

### Design Opportunities

- **Destaque Visual ao "Drop-off Rescue":** Transformar o ato de "recuperar um acesso que não chamou no WhatsApp" na ação mais recompensadora do app, implementando um "1-click action" até a ativação da conversa.
- **Sensação de Clareza e Retorno Financeiro:** Empregar visualizações métricas minimalistas que comuniquem imediatamente sucesso e segurança na home do Painel de Controle, fidelizando o cliente recorrente através da confiança visual.

## Core User Experience

### Defining Experience

A experiência central do SaaS Gestão de Leads se divide em dois polos fundamentais. Para o **Visitante (Lead)**, a ação crítica é o preenchimento fluido e o envio do formulário, que atua como uma ponte instantânea e invisível para o aplicativo do WhatsApp. Para a **Operação (Atendimento)**, a ação principal é o monitoramento ativo do painel e o resgate rápido em _1-click_ de leads que preencheram os dados, mas abandonaram antes de enviar a mensagem no WhatsApp.

### Platform Strategy

- **Landing Pages (Público):** Filosofia _Mobile-First_ estrita, projetadas para carregamento micro-latente (baixo peso de interface), dado que a origem principal do tráfego será oriunda de Social Ads em smartphones.
- **Painel Administrativo (Dashboard):** Abordagem híbrida. Foco primário em Desktop para os operadores de conversão (que utilizam paralelamente o WhatsApp Web para o atendimento) e foco em "visualização limpa de relatórios on-the-go" no Mobile para os tomadores de decisão (Donos de negócio/Gestores).

### Effortless Interactions

- **Submissão Imperceptível:** O ato do visitante de ser "rastreado" ocorre fluidamente durante o redirecionamento orgânico; para ele, tratou-se unicamente de acessar o link do WhatsApp.
- **Acionamento Direto (Resgate):** A equipe de conversão identifica claramente leads não engajados e comanda a abertura da conversa do WhatsApp a partir do painel sem a necessidade de ditar números no teclado numérico físico ou alterar abas e fazer cópias manuais.
- **Setup "Self-Service/Upload":** A configuração por parte do Gestor de Tráfego deve exigir apenas a escolha de um arquivo (ZIP) ou o preenchimento reduzido de formulários na interface nativa, anulando burocracias arquiteturais ou de integrações com webhooks.

### Critical Success Moments

- **O "Aha!" do Tempo de Resposta:** Redirecionamento bem sucedido sob < 800ms garante que a ansiedade térmica do prospect proveniente de tráfego pago não zere seu interesse.
- **O Resgate Comprovador de ROI:** O momento em que o operador salva uma venda através de um número de listagem retido preventivamente pela ferramenta consolida, a nível financeiro, a percepção contundente da eficácia de usar a plataforma invés de uma "extensão grátis" solta.

### Experience Principles

1. **Invisibilidade Transacional:** O tracking deve ser silencioso; a ação percebida pelo lead público é somente o contato.
2. **Operação 1-Click (Ação Omitida):** Minimizar cliques e sub-fluxos para qualquer ação de contato partindo do painel administrativo.
3. **Conversão > Gestão de Dados:** Privilegiar o aspecto tático ("Quem devo contatar agora?") sobre visões organizacionais típicas de um CRM padrão (Ações Kanban completas perdem relevância perto do fluxo list-to-contact direto).
4. **Velocidade como Design Fundamental:** Respeitar rigidamente os limites de renderização para garantir CWV altíssimo em LPs expostas publicamente.

## Desired Emotional Response

### Primary Emotional Goals

A fundação emocional da plataforma baseia-se na entrega de **Alívio** e **Empoderamento**. Para os patrocinadores financeiros (Donos de negócio) e prestadores de serviço (Gestores de Tráfego), a plataforma deve substituir a "ansiedade do investimento em tráfego" pela "Paz de Espírito da comprovação irrefutável". Para os operadores de atendimento na linha de frente, a ferramenta deve gerar estímulos de **Recompensa ágil**, não de "mais um sistema corporativo chato para preencher".

### Emotional Journey Mapping

- **Primeiro Contato (Setup do Gestor):** Surpresa positiva gerada pela quebra de expectativa diante da extrema ausência de burocracia (ex: ausência de configurações de webhooks complicadas substituída pelo upload ágil de ZIP).
- **Ação Core (Atendimento atuando):** Ritmo de trabalho satisfatório ("Flow"). Identificar e clicar num lead "abandonado" gera um pico de satisfação de "venda salva".
- **Revisão Periódica (Dono checando resultados):** Segurança e Confiança; abrir o Dashboard no formato Mobile e instantaneamente sorrir ao checar dezenas de nomes registrados perfeitamente.

### Micro-Emotions

- **Confiança superando o Ceticismo:** Afastar a desconfiança que os clientes geralmente têm das métricas infladas de painéis do Facebook/Google Ads. O lead tem nome, telefone verídico e hora exata. É real.
- **Clareza extinguindo o Caos:** Eliminar o estresse visual de pesquisar históricos passados de um aparelho de celular corporativo. A listagem é um porto seguro mental.

### Design Implications

- **Design para Confiança (Dashboard):** Paletas neutras com alto contraste tipográfico para as métricas financeiras/lead capturadas. Tipografia sem serifa geométrica e limpa transmitindo solidez (ex: Inter, Poppins).
- **Design para Recompensa (Painel Ana):** _Micro-interações_ prazerosas ao clicar no botão "Acionar no WhatsApp" (botão proeminente, cores ativadas como verde brilhante, com suaves animações confete-like invisíveis ou checkmarks dinâmicos).
- **Design Ininterrupto (LPs Público):** Skeleton loadings nulos ou quase nulos; a interface deve passar segurança sem segurar o usuário na tela, aproveitando os milionésimos de segundo de uma animação própria do botão de enviar.

### Emotional Design Principles

1. **A Confiança reside na Clareza:** Se um dado essencial requer mais que 3 segundos para ser encontrado por um usuário corporativo, a tela falhou.
2. **Transforme Obrigação em Recompensa:** O resgate de leads via "WhatsApp Click" não deve parecer um dever funcional, e sim uma ação lúdica de altíssimo retorno perceptível.
3. **Não provoque a Ansiedade do Usuário Final:** A interface pública de captação deve emanar rapidez, transmitindo que "falar no WhatsApp com o advogado" será instantâneo e orgânico, evitando a percepção de funis de triagem lentos.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **Vercel (Para o Dashboard Administrativo):** Referência primordial para a arquitetura de layout limpo, tipografia técnica geométrica e hierarquia de informação. O uso de "Cards" com destaques focais isolados será a inspiração de como exibir as métricas de sucesso financeiro (Total Captações) para o Administrador.
- **Stripe Elements (Para o Front-end de Captação):** Referência estrita para a interação do visitante com o formulário na Landing Page. Validações client-side instantâneas em inputs minimalistas sem fricção; a interface não deve parecer que o usuário "está usando o SaaS Gestão de Leads" em nenhum momento, e sim que a tela pertence nativamente à Landing Page premium gerada.
- **Linear (Para a Interface de Conversão/Atendimento):** Referência vital para desburocratizar as tabelas de dados. O módulo de listagem de leads utilizará espaçamento, foco em hover e listagem em linha simplificada ao invés de grandes tabelas complexas, viabilizando operações rápidas (1-click resgate).

### Transferable UX Patterns

- **Optimistic UI Updates (Atualização Otimista):** Para o painel de atendimento (Listagem de Leads). Ao clicar para "Resgatar um Lead Abandonado", a interface do dashboard assinala o sucesso tático instantaneamente na UI, sem fazer o operador aguardar a resolução assíncrona do banco (Supabase).
- **Inline Micro-Feedback de Ação:** O fluxo do Submit do prospect será validado mediante alteração de estado interno do próprio botão (CSS Transforms/Transitions no CTA), garantindo ocupação de tela zero (sem pop-ups modais alertando "Enviando").
- **Card-based Layouts responsivos:** Dados analíticos apresentados unicamente encapsulados, para que o dashboard administrativo sofra "reflow" (quebra de linha natural) perfeitamente em telas mobile (iPhone visualizações).

### Anti-Patterns to Avoid

- **Síndrome de Planilha (Data Tables Complexas):** Evitaremos componentes tabulares densos com scroll horizontal persistente, focando em "List Views" dinâmicas.
- **Telas de Loading Globais (Global Spinners):** O banimento absoluto de bloqueadores de tela inteira nas ações rotineiras; os loadings devem existir unicamente focados (scoped) dentro do elemento em transição.
- **Empty States Abandonados:** Telas iniciais sem "chamada para a glória". Na ausência de dados capturados de momento, não renderizaremos tabelas vazias; haverá infográficos leves de "Aguardando Campanhas", mitigando a ansiedade de ROI nulo.

### Design Inspiration Strategy

**A Estratégia "L.I.O" (Limpo, Instantâneo e Otimista):**
A UI do MVP deverá adotar 3 mandamentos: Estilo _Vercel_ de cores e espaçamentos (**Limpo**); O Formulário deverá responder o feedback de rede no patamar do _Stripe_ (**Instantâneo**); e a troca de status e exclusões na listagem de leads reagirão no Client-side de forma cirúrgica como no _Linear App_ (**Otimista**).
