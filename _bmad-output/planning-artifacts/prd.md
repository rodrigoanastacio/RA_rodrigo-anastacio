---
stepsCompleted:
  [
    'step-01-init',
    'step-02-discovery',
    'step-02b-vision',
    'step-02c-executive-summary',
    'step-03-success',
    'step-04-journeys',
    'step-05-domain',
    'step-06-innovation',
    'step-07-project-type',
    'step-08-scoping',
    'step-09-functional',
    'step-10-nonfunctional',
    'step-11-polish'
  ]
inputDocuments:
  [
    'product-brief-saas-gestao-leads-2026-02-27.md',
    'market-SaaS-Gestao-Leads-WhatsApp-research-2026-02-27.md'
  ]
workflowType: 'prd'
classification:
  projectType: Plataforma SaaS (Web App)
  domain: MarTech / CRM
  complexity: Média
  projectContext: greenfield
documentCounts:
  briefCount: 1
  researchCount: 1
  brainstormingCount: 0
  projectDocsCount: 0
---

# Product Requirements Document - SaaS Gestão de Leads

**Author:** Rodrigo Anastácio
**Date:** 2026-02-28

## Executive Summary

O **SaaS Gestão de Leads** é uma plataforma "Lean Lead Capture" desenhada para eliminar o "buraco negro" de dados entre os cliques em anúncios pagos e as conversas no WhatsApp. O produto empodera gestores de tráfego a comprovarem o ROI de suas campanhas e garante que donos de negócios (como pequenos escritórios de advocacia) tenham controle centralizado sobre os contatos gerados. Focado na extrema simplicidade e na eliminação de atritos, a plataforma atua diretamente na dor da perda de leads (drop-off) capturando-os de forma invisível.

O grande diferencial do produto é a sua abordagem "Anti-Burocracia" e a "Inovação por Simplificação" com foco em um _Time-To-Value_ instantâneo. Em vez de depender de integrações complexas e custos da API Oficial (Cloud API) da Meta, a plataforma intercepta os dados _client-side_ no momento do clique, salvando o lead silenciosamente no banco antes do redirecionamento transparente para a URL orgânica do `wa.me`.

## Success Criteria

### User Success

- **Aha! Moment Imediato:** Lead no dashboard em tempo real no exato instante do clique no botão do WhatsApp da Landing Page.
- **Drop-off Rescue (Resgate de Abandono):** O lead preenche o formulário mas não envia a mensagem no WhatsApp, e o Atendimento consegue ativamente recuperá-lo usando o telefone capturado.
- **Adoção Zero-Atrito:** Equipe comercial acessa e manipula leads sem necessidade de treinamento.

### Business Success

- **Retenção Cliente-Agência:** Gestores justificam a renovação de contratos provando o ROI através dos logs de clique/captura rastreados na plataforma.
- **Engajamento Principal (DAU):** Logins diários da equipe de atendimento como ferramenta principal de triagem.

### Technical Success

- **Tracking Constante:** O motor de rastreio invisível registra os dados no banco independentemente de latências severas.
- **Micro-Latência:** Todo o fluxo de captura e o redirecionamento ocorre em menos de 800 milissegundos para não espantar o lead pago na ponta.

## Product Scope

### MVP Strategy & Philosophy

**Dual-Engine GTM:** O MVP de Go-to-Market combina um produto _Self-Service_ (ferramenta construtora baseada em blocos para a agência montar) com uma _Alavanca Premium_ de Upload de pacote físico `.ZIP` contendo a LP (serviço Done-for-You de alto ticket cobrado pelo desenvolvedor/agência).
**Arquitetura:** Stack enxuta (Next.js + Supabase) escalada e gerenciada por um único desenvolvedor via Vercel.

### MVP Feature Set (Phase 1)

- **Módulo Dual de LPs:** _Construtor Visual_ de blocos nativo; e módulo de _Upload Personalizado (.ZIP)_ injetados sob subdomínio da plataforma. Funcionalidade Premium (Feature Flagged).
- **Smart Forms / Drop-off Tracking Engine:** Motor de tracking front-end que amarra o preenchimento invisível com o redirecionamento `wa.me`.
- **Team Management com RBAC:** Organização dividida entre Dono/Administrador Master, Gestor de Tráfego/Operador Técnico e Atendimento/Operador de Conversão. Suporte à criação direta de usuários via painel sem obrigatoriedade de e-mails de convite.
- **SPA Real-time Dashboard:** Lista de leads e status operando de forma síncrona aos websockets do Supabase sem _refresh_.

### Growth & Expansion (Future Phases)

- **Fase 2 (Growth):** Expansão massiva da biblioteca de componentes visuais do construtor, Custom Domains via CNAME, exportação de relatórios PDF automatizados, e Billing nativo.
- **Fase 3 (Vision):** Inbox Nativa In-App integrada a provedores alternativos como EvoAPICloud, extinguindo totalmente a dependência de uso em WhatsApp Web pessoal fora do SaaS.

## User Journeys

### 1. A Agência (Operador Técnico - Setup Ágil)

Marcus sobe um pacote `.ZIP` premium de Landing Page cobrada R$1.200 do cliente e vincula o formulário de tracking "invisível". Ele também acessa outras contas para usar o _Construtor Visual_ em clientes menores recorrentes. Ele clica num anúncio e testa no celular; o nome dele aparece no dashboard do cliente em tempo real, gerando a prova do serviço.

### 2. O Atendimento (Operador de Conversão - Resgate)

Ana abre o dashboard da sua empresa na segunda-feira. Ela filtra quem iniciou a conversa pelo final de semana e quem abandonou no clique do link. Ela resgata os "drop-offs" pró-ativamente via dashboard, provando a conversão e gerando novos negócios que a planilha da antiga recepção perderia.

### 3. O Dono (Administrador Master - Visão Macro)

Roberto, advogado que patrocina a agência, faz login sem fricções para verificar se as campanhas deram resultado na semana. Ele analisa o total "cego" de 35 novos leads gerados na área central da tela e confia no trabalho do Operador Técnico para a renovação.

### 4. O Visitante Público (O Lead Invisível)

Carlos clica em um anúncio no Instagram, entra numa Landing Page extremamente rápida, preenche Nome e Celular, clica em "Falar pelo WhatsApp" e, em < 800ms, sem notar carregamentos secundários da plataforma (backend tracking), seu próprio WhatsApp abre para enviar a mensagem formatada sugerida pela agência.

## Domain & Regulatory Requirements

### Compliance (Legal & LegalTech)

- **Provimento 205/2021 da OAB:** O uso da plataforma incentiva o _Inbound_ orgânico, mantendo o lead no polo ativo da primeira mensagem do prospect. O SaaS permanece apenas como ferramenta neutra de contato.
- **Respeito à LGPD:** Suporte opt-in / checkbox dinâmico nos formulários das LPs para adequar a captação de dados (Telefone, Nome) explicitamente nos termos da legislação brasileira vigente.

## Technical & Project-Type Considerations

- **Plataforma SaaS B2B:** Multi-tenant absoluto através das configurações de Row Level Security (RLS) do Supabase PostgreSQL. Nenhuma Agência (A) vazará contatos sensíveis para a Agência (B).
- **Abordagem SSR/SSG (LPs Públicas):** Alta dependência do Node/Next.js (App Router) para entregar as rotas criadas publicamente (`/lp/clienteX`) de forma estática com revalidação temporal (ISR) ou super rápida globalmente para não impactar o CWV (Core Web Vitals).

## Functional Requirements (FRs)

### Authentication & Account

- FR01: O Administrador Master pode criar uma nova conta (Tenant / Organização) na plataforma.
- FR02: O Administrador Master, Operador Técnico e Operador de Conversão podem realizar login no sistema via e-mail e senha.
- FR03: O Administrador Master, Operador Técnico e Operador de Conversão podem recuperar sua senha.

### Team Management

- FR04: O Administrador Master pode adicionar novos membros diretamente à sua organização pelo painel, criando as credenciais sem depender de envio de convite por e-mail.
- FR05: O Administrador Master pode conceder a outros membros o próprio nível de "Administrador Master", bem como definir níveis restritos (Operador Técnico, Operador de Conversão).
- FR06: O Administrador Master pode editar as permissões ou remover membros ativos da sua organização.
- FR07: O Administrador Master pode visualizar a listagem de todos os membros de sua organização e seus níveis de acesso atuais.

### Landing Page Management

- FR08: O Operador Técnico pode criar uma nova Landing Page utilizando um Construtor Visual nativo baseado em blocos (Self-Service).
- FR09: O Operador Técnico pode personalizar o conteúdo (textos, imagens) das LPs criadas pelo Construtor Visual.
- FR10: O Operador Técnico e o Administrador Master podem fazer _upload_ de um pacote físico `.ZIP` contendo código livre para criar uma LP personalizada **(Apenas se estiverem em uma organização que contratou a funcionalidade Premium/Custom LP)**.
- FR11: O Operador Técnico pode definir e alterar a rota/slug da URL sob o domínio principal hospedado pela plataforma.
- FR12: O Operador Técnico pode publicar (colocar online) ou despublicar uma Landing Page da sua organização.
- FR13: O Operador Técnico pode visualizar a listagem de todas as LPs criadas, com status (Publicada/Rascunho) e visualizações totais.

### Tracking & Form Engine

- FR14: O Operador Técnico pode criar formulários customizados vinculados nativamente às Landing Pages do sistema.
- FR15: O Operador Técnico pode definir os campos adicionais do formulário (sendo obrigatório manter os campos base de Nome e WhatsApp).
- FR16: O Operador Técnico pode ativar ou desativar uma caixa de consentimento (Checkbox LGPD/Termos).
- FR17: O Visitante (Lead publico) pode preencher e submeter formulários nas Landing Pages publicadas.
- FR18: O Sistema deve interceptar o envio (_submit_) pelo Visitante, registrando os dados do lead no banco de dados do respectivo cliente de forma imediata e invisível no browser.
- FR19: O Sistema deve redirecionar o Visitante para a URL do `wa.me` com as variáveis configuradas correspondentes pelo cliente logo no momento oportuno do tracking confirmado.

### Lead Management

- FR20: O Sistema deve propagar novos leads capturados de maneira imediata (Real-time SPA) para os usuários logados no Dashboard.
- FR21: O Operador de Conversão, Operador Técnico e Admin Master podem acessar a listagem paginada de leads capturados de sua organização.
- FR22: O Operador de Conversão pode visualizar as propriedades individuais de cada lead (Origem da LP, Horário da Captura, Nome, Telefone).
- FR23: O Operador de Conversão pode atualizar o _Status_ de atendimento do lead selecionado.
- FR24: O Operador de Conversão pode acionar o número do lead a partir da interface para abrir o WhatsApp Web diretamente, recuperando abandonos precoces.

### Reporting & Visibility

- FR25: O Administrador Master pode consultar indicadores como volume total de membros na organização, LPs ativamente publicadas e contagem agregada de leads validados pelos formulários no painel Home.

## Non-Functional Requirements (NFRs)

### Performance & Latency

- **NFR-P01 (Tempo de Captura e Redirect):** A latência entre o Visitante clicar no botão "Enviar" no formulário e a abertura do link `wa.me` deve ser inferior a **800 milissegundos (0.8s)** na média global.
- **NFR-P02 (Core Web Vitals das LPs):** Todas as Landing Pages (Nativas ou Renderizadas via ZIP) devem atingir uma pontuação orgânica de mínima de **90+ no Google PageSpeed Insights (Mobile)**.
- **NFR-P03 (Real-time Dashboard Propagação):** A disponibilização de um novo lead inserido no painel de gestão para um usuário ativamente conectado via Websocket deve ocorrer em até **2 segundos**.

### Security & Privacy

- **NFR-S01 (Isolamento de Base Multi-tenant):** A aplicação deve assegurar a total separação de sub-tenants através de diretrizes de _Row Level Security (RLS)_ no Postgres. Qualquer API request proveniente de sessão deverá ter os Leads atrelados somente e unicamente à sua referida `organization_id` validada por JWT autenticado.
- **NFR-S02 (Proteção em Trânsito):** Exigência absoluta de PII sob certificados e requisições TLS/HTTPS garantidas via infra CDN.
- **NFR-S03 (Mitigadores Anti-Spam):** Prevenção imperativa ao _Dumping_ de dados falsos via limites do Edge (Rate Limiting) e injeção de _Honeypots_ dinâmicos no form.
- **NFR-S04 (Upload Security & Sandboxing):** Validação restrita na Extração e Upload Premium do `.ZIP`. Rejeição sumária de arquivos backend/executáveis (`.php`, `.py`, `.js` serverside) e sanitização imperativa para prevenir sequestro de sessão (_XSS_) originado nas rotas ou escopos expostos pelos templates livres.

### Reliability & Availability

- **NFR-R01 (SLA Endpoints):** A rota paralela (API de Tracking / Front-End Submit Handler) deve almejar uptime superior a **99.9%** devido à gravidade que a perda do submit reflete nos orçamentos dos clientes adquirentes do SaaS.

### Usability

- **NFR-U01 (Time-to-Value Index):** O processo estrito de publicação premium `.ZIP` seguido pela criação ou acoplamento e submissão de verificação no motor `wa.me` não deve consumir do Operador Técnico nada além de **5 minutos** limpos no terminal web, suportando até **10 interações de UI base**.
- **NFR-U02 (Mobile-First Responsividade Dash):** Renderização impecável 100% livre de truncamentos horizontais em viewports mobile para os acessos ao painel Administrativo Dashboard, visando a retenção da visualização on-the-go pelo Dono do Negócio (Ex. Roberto de terno em fim de semana).
