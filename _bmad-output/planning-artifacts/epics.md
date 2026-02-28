stepsCompleted:

- step-01-validate-prerequisites
- step-02-design-epics
- step-03-create-stories
- step-04-final-validation
  inputDocuments:
- architecture.md
- ux-design-specification.md

---

# saas-gestao-leads - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for saas-gestao-leads, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR01: O Administrador Master pode criar uma nova conta (Tenant / Organização) na plataforma.
FR02: O Administrador Master, Operador Técnico e Operador de Conversão podem realizar login no sistema via e-mail e senha.
FR03: O Administrador Master, Operador Técnico e Operador de Conversão podem recuperar sua senha.
FR04: O Administrador Master pode adicionar novos membros diretamente à sua organização pelo painel, criando as credenciais sem depender de envio de convite por e-mail.
FR05: O Administrador Master pode conceder a outros membros o próprio nível de "Administrador Master", bem como definir níveis restritos (Operador Técnico, Operador de Conversão).
FR06: O Administrador Master pode editar as permissões ou remover membros ativos da sua organização.
FR07: O Administrador Master pode visualizar a listagem de todos os membros de sua organização e seus níveis de acesso atuais.
FR08: O Operador Técnico pode criar uma nova Landing Page utilizando um Construtor Visual nativo baseado em blocos (Self-Service).
FR09: O Operador Técnico pode personalizar o conteúdo (textos, imagens) das LPs criadas pelo Construtor Visual.
FR10: O Operador Técnico e o Administrador Master podem fazer upload de um pacote físico .ZIP contendo código livre para criar uma LP personalizada (Apenas se estiverem em uma organização que contratou a funcionalidade Premium/Custom LP).
FR11: O Operador Técnico pode definir e alterar a rota/slug da URL sob o domínio principal hospedado pela plataforma.
FR12: O Operador Técnico pode publicar (colocar online) ou despublicar uma Landing Page da sua organização.
FR13: O Operador Técnico pode visualizar a listagem de todas as LPs criadas, com status (Publicada/Rascunho) e visualizações totais.
FR14: O Operador Técnico pode criar formulários customizados vinculados nativamente às Landing Pages do sistema.
FR15: O Operador Técnico pode definir os campos adicionais do formulário (sendo obrigatório manter os campos base de Nome e WhatsApp).
FR16: O Operador Técnico pode ativar ou desativar uma caixa de consentimento (Checkbox LGPD/Termos).
FR17: O Visitante (Lead publico) pode preencher e submeter formulários nas Landing Pages publicadas.
FR18: O Sistema deve interceptar o envio (submit) pelo Visitante, registrando os dados do lead no banco de dados do respectivo cliente de forma imediata e invisível no browser.
FR19: O Sistema deve redirecionar o Visitante para a URL do wa.me com as variáveis configuradas correspondentes pelo cliente logo no momento oportuno do tracking confirmado.
FR20: O Sistema deve propagar novos leads capturados de maneira imediata (Real-time SPA) para os usuários logados no Dashboard.
FR21: O Operador de Conversão, Operador Técnico e Admin Master podem acessar a listagem paginada de leads capturados de sua organização.
FR22: O Operador de Conversão pode visualizar as propriedades individuais de cada lead (Origem da LP, Horário da Captura, Nome, Telefone).
FR23: O Operador de Conversão pode atualizar o Status de atendimento do lead selecionado.
FR24: O Operador de Conversão pode acionar o número do lead a partir da interface para abrir o WhatsApp Web diretamente, recuperando abandonos precoces.
FR25: O Administrador Master pode consultar indicadores como volume total de membros na organização, LPs ativamente publicadas e contagem agregada de leads validados pelos formulários no painel Home.

### NonFunctional Requirements

NFR-P01 (Tempo de Captura e Redirect): A latência entre o Visitante clicar no botão "Enviar" no formulário e a abertura do link wa.me deve ser inferior a 800 milissegundos (0.8s) na média global.
NFR-P02 (Core Web Vitals das LPs): Todas as Landing Pages devem atingir uma pontuação mínima de 90+ no Google PageSpeed Insights (Mobile).
NFR-P03 (Real-time Dashboard Propagação): A disponibilização de um novo lead inserido no painel via Websocket deve ocorrer em até 2 segundos.
NFR-S01 (Isolamento de Base Multi-tenant): Separação de tenants com Row Level Security (RLS) no Postgres, atrelado a organization_id via JWT.
NFR-S02 (Proteção em Trânsito): Exigência absoluta de PII sob certificados TLS/HTTPS usando CDN.
NFR-S03 (Mitigadores Anti-Spam): Prevenção de dumping de dados via Rate Limiting (Edge) e injeção de Honeypots dinâmicos nos formulários.
NFR-S04 (Upload Security & Sandboxing): Rejeição de scripts executáveis (.php, .py, .js serverside) no upload .ZIP e sanitização profunda para prevenir XSS.
NFR-R01 (SLA Endpoints): A API de tracking/front-end submit deve visar uptime superior a 99.9%.
NFR-U01 (Time-to-Value Index): Publicar uma LP .ZIP e acoplar motor wa.me deve custar no máximo 5 minutos (limite 10 interações).
NFR-U02 (Mobile-First Responsividade Dash): Dashboard sem scroll horizontal e renderização impecável (100% livre truncamento) em viewports mobile para donos visualizarem em on-the-go.

### Additional Requirements

- **Starter Template:** Next.js App Router Base Workflow (`npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`). (Isso afetará Epic 1 Story 1).
- Integração Supabase p/ Auth, DB, Websockets, SSR Cookies e CDN Storage.
- Separação extrema entre API proxy e queries: uso estrito de DDD, apenas a pasta `src/shared/api-handlers` usa SQL direto usando schema `snake_case`.
- Zod Schemes devem ser usados para validação ponta a ponta.
- Entidades devem invocar chamadas `.toPlainObj()` enviando JSON limpo do servidor ao cliente.
- Estado Global preferencial via Cache Next.js (Server State) ou contexto minimalista / zustand (Client State).
- Estilização UI/UX: Seguir rigorosamente o padrão de interface (Componentes, Design System, Cores) que já temos implementado no projeto atual.

FR01: Epic 1 - Criação de conta (Tenant/Organização)
FR02: Epic 1 - Login no sistema
FR03: Epic 1 - Recuperação de senha
FR04: Epic 1 - Adicionar membros sem e-mail
FR05: Epic 1 - Definição de níveis de acesso (RBAC)
FR06: Epic 1 - Editar permissões e remover membros
FR07: Epic 1 - Listagem de membros e acessos
FR08: Epic 2 - Criação de LP via Construtor Visual
FR09: Epic 2 - Personalização de LP via Construtor Visual
FR10: Epic 2 - Upload de pacote .ZIP Premium
FR11: Epic 2 - Definição de rota/slug
FR12: Epic 2 - Publicar/Despublicar LPs
FR13: Epic 2 - Listagem de LPs
FR14: Epic 2 - Criação de formulários vinculados
FR15: Epic 2 - Definição de campos do formulário
FR16: Epic 2 - Checkbox de consentimento (LGPD)
FR17: Epic 3 - Preenchimento de formulário pelo visitante
FR18: Epic 3 - Interceptação de envio invisível no browser
FR19: Epic 3 - Redirecionamento para wa.me com variáveis
FR20: Epic 4 - Propagação real-time para o Dashboard
FR21: Epic 4 - Listagem paginada de leads
FR22: Epic 4 - Visualização das propriedades do lead
FR23: Epic 4 - Atualização de status de atendimento
FR24: Epic 4 - Acionamento 1-click para WhatsApp Web
FR25: Epic 4 - Indicadores de volume e métricas

## Epic List

### Epic 1: Tenant Security & Team Setup

Entregar a fundação da plataforma onde o Dono (Administrador) pode criar sua organização de forma isolada e gerenciar o acesso de todos os seus membros rapidamente, sem aguardar e-mails de convite. Fornece o setup inicial do Next.js e Supabase Auth+RLS.
**FRs covered:** FR01, FR02, FR03, FR04, FR05, FR06, FR07

### Epic 2: Landing Page & Form Engine

Empoderar o Gestor de Tráfego a subir LPs customizadas em versão ZIP Premium rápida ou construir blocos simples pelo Painel, gerando links próprios publicáveis na hora com formulário de captura pronto. Aborda CDN Storage e restrições severas anti-XSS.
**FRs covered:** FR08, FR09, FR10, FR11, FR12, FR13, FR14, FR15, FR16

### Epic 3: Invisible Edge Tracking

A jornada vitalícia pública: A experiência de um visitante preencher um campo e clicar "WhatsApp", fazendo com que a plataforma intercepte os dados no Edge em tempo micro-latente (<800ms) sem travar o carregamento final do `wa.me`. Foco extremo em Zod validation backend e CWV.
**FRs covered:** FR17, FR18, FR19

### Epic 4: Real-time Recovery Dashboard

Entregar um Painel de SPA interativa onde a operadora de Atendimento vê o novo Lead aparecer (via websocket) na lista antes do lead enviar a primeira mensagem real, conferindo o poder mágico do botão "1-click resgate". Visões métricas para Mobile incluídas.
**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25

## Epic 1: Tenant Security & Team Setup

Entregar a fundação da plataforma onde o Dono (Administrador) pode criar sua organização de forma isolada e gerenciar o acesso de todos os seus membros rapidamente, sem aguardar e-mails de convite. Fornece o setup inicial do Next.js e Supabase Auth+RLS.

### Story 1.1: Project Setup e Fundação de Banco de Dados

As a Desenvolvedor,
I want configurar a base do Next.js, Tailwind e Supabase com tabelas essenciais,
So that possamos construir o sistema sobre uma arquitetura sólida com RLS.

**Acceptance Criteria:**

**Given** um ambiente Next.js v15 inicializado
**When** o desenvolvedor rodar o projeto localmente
**Then** a arquitetura DDD deve estar presente nas pastas
**And** as tabelas `organizations` e `profiles` devem existir no banco Supabase com RLS ativado.

### Story 1.2: Criação de Conta do Administrador (Tenant)

As a Administrador Master,
I want criar minha conta inicial na plataforma,
So that eu tenha uma organização/tenant exclusiva para minha empresa.

**Acceptance Criteria:**

**Given** um novo usuário acessando a tela de cadastro
**When** ele preencher e-mail, senha e nome da empresa
**Then** o sistema deve criar o perfil autenticado
**And** criar e vincular uma nova `organization` atribuindo o papel de "Administrador Master".

### Story 1.3: Login e Autenticação Criptografada

As a Administrador Master,
I want realizar login seguro com email e senha,
So that eu possa acessar meu painel administrativo protegido.

**Acceptance Criteria:**

**Given** um usuário cadastrado na plataforma
**When** ele submeter e-mail e senha corretos
**Then** um cookie de sessão JWT/Supabase SSR deve ser gerado
**And** o usuário será redirecionado para o Dashboard e protegido por middleware.

### Story 1.4: Recuperação de Senha Segura

As a Usuário Cadastrado,
I want poder recuperar minha senha,
So that eu não perca acesso à minha conta caso esqueça a senha original.

**Acceptance Criteria:**

**Given** um usuário na tela inicial
**When** ele clicar em esqueci a senha e enviar seu e-mail
**Then** ele receberá um link seguro de recuperação
**And** poderá definir uma nova senha através da tela apropriada.

### Story 1.5: Adição Ágil de Membros Sem E-mail

As a Administrador Master,
I want adicionar membros de equipe (Operadores) diretamente pelo painel gerando suas senhas,
So that a equipe possa começar a trabalhar sem fricção ou burocracia de convites via e-mail.

**Acceptance Criteria:**

**Given** um Administrador logado no painel da sua organização
**When** ele preencher nome, e-mail, senha provisória e nível de acesso para um membro
**Then** o sistema fará um bypass dos fluxos normais de Auth (via API Admin do Supabase)
**And** a nova conta do membro será listada na equipe.

### Story 1.6: Gestão de Acessos e Matriz RBAC

As a Administrador Master,
I want listar, editar e remover membros da equipe,
So that eu possa garantir a segurança do Tenant permitindo acessos estritos.

**Acceptance Criteria:**

**Given** um Administrador logado analisando a equipe
**When** ele listar os usuários
**Then** verá todos atrelados à mesma `organization_id`
**And** poderá editar níveis de acesso (Admin, Técnico, Conversão) ou revogar acesso.

## Epic 2: Landing Page & Form Engine

Empoderar o Gestor de Tráfego a subir LPs customizadas em versão ZIP Premium rápida ou construir blocos simples pelo Painel, gerando links próprios publicáveis na hora com formulário de captura pronto. Aborda CDN Storage e restrições severas anti-XSS.

### Story 2.1: Criação de LP via Construtor Visual

As a Operador Técnico,
I want construir uma landing page rapidamente usando blocos visuais,
So that eu possa testar ofertas instantaneamente sem precisar codificar.

**Acceptance Criteria:**

**Given** um Operador Técnico logado
**When** ele escolher templates/blocos e alterar textos/imagens
**Then** o sistema salvará o conteúdo associado a uma nova Entidade LP
**And** renderizará uma prévia fidedigna da página.

### Story 2.2: Upload de pacote .ZIP Premium

As a Operador Técnico,
I want enviar um arquivo .ZIP com os assets de uma LPs premium,
So that eu hospede landing pages avançadas diretamente na plataforma de tracking do SaaS.

**Acceptance Criteria:**

**Given** um Operador Técnico de Organização Premium
**When** ele fizer o upload de um .ZIP
**Then** o sistema deve verificar, rejeitar arquivos .php/.js server-side, e extrair os assets pro CDN Supabase Storage
**And** associará estes assets a uma nova LP na conta.

### Story 2.3: Definição de rota/slug

As a Operador Técnico,
I want definir o slug (URL) amigável da Landing page (ex: /lp/oferta-x),
So that o link seja apresentável em campanhas de marketing.

**Acceptance Criteria:**

**Given** uma LP criada
**When** o Operador preencher um slug único na plataforma para esse Tenant
**Then** o link público ficará sendo /lp/[slug]
**And** o sistema tratará redirecionamentos e renderizações dinâmicas através dessa rota.

### Story 2.4: Publicar e Despublicar LPs

As a Operador Técnico,
I want ligar ou desligar minhas LPs,
So that eu possa guardar rascunhos ou encerrar campanhas antigas.

**Acceptance Criteria:**

**Given** uma LP salva na base
**When** o Operador clicar no botão Publicar/Pausar
**Then** o status da LP mudará instantaneamente
**And** visitantes na URL despublicada verão tela de 404/Oculto com tempo resposta rápido.

### Story 2.5: Listagem de LPs

As a Operador Técnico,
I want listar todas as Landing Pages da minha organização,
So that eu consiga gerenciar meu ecossistema de campanhas em uma única tela.

**Acceptance Criteria:**

**Given** um Operador ou Administrador
**When** ele acessar o menu de Páginas
**Then** a UI listará LPs de forma limpa, mostrando Status e métricas básicas de visualização com paginação/scroll rápido.

### Story 2.6: Criação de Formulários Customizados

As a Operador Técnico,
I want definir formulários para atrelar nas Landing Pages, adicionando campos novos além do Telefone/Nome,
So that eu capture dados ricos se meu cliente exigir.

**Acceptance Criteria:**

**Given** o painel de edição de uma LP
**When** o operador configurar um formulário
**Then** ele poderá adicionar campos dinâmicos customizados
**And** definir o campo de checkbox de aceite (LGPD).

## Epic 3: Invisible Edge Tracking

A jornada vitalícia pública: A experiência de um visitante preencher um campo e clicar "WhatsApp", fazendo com que a plataforma intercepte os dados no Edge em tempo micro-latente (<800ms) sem travar o carregamento final do `wa.me`. Foco extremo em Zod validation backend e CWV.

### Story 3.1: Front-end Forms e Client Validation

As a Visitante,
I want preencher formulários nas LPs sentindo fluidez,
So that a página pareça orgânica e não dê erros incompreensíveis.

**Acceptance Criteria:**

**Given** um Visitante acessando a LP hospedada
**When** ele tentar submeter campos em branco ou telefone incorreto
**Then** ele receberá feedback sutil de validação instantânea sem page reloads
**And** a interface indicará um placeholder claro e sem mensagens confusas.

### Story 3.2: Tracking Code e Interceptação no Edge (API Submit)

As a Gerente de Produto,
I want que o sistema intercepte em <800ms esse formulário de maneira invisível no momento em que clicar "WhatsApp",
So that a conversão aconteça sem estresse mas o log no banco seja salvo na organization correta.

**Acceptance Criteria:**

**Given** um submission validado pelo Visitante
**When** os dados baterem no Route Handler (API Proxy Route) Edge Server
**Then** o schema Zod valida os dados falhando ruidosamente contra XSS
**And** insere o Lead silenciosamente através da Serverless action para a tabela da Organization correspondente à LP de forma segura.

### Story 3.3: Redirecionamento Dinâmico para WhatsApp Web (wa.me)

As a Visitante,
I want ser redirecionado para o meu aplicativo do WhatsApp com o número da empresa,
So that eu envie a mensagem combinada instantaneamente e finalize meu contato que prometi no anúncio.

**Acceptance Criteria:**

**Given** um tracking salvo silenciosamente no banco
**When** o Edge endpoint processa os dados com latência baixíssima (<800ms)
**Then** retorna a constelação nativa URL com a variável telefônica de WhatsApp do dono da LP compilada e o texto pré-escrito
**And** o navegador do cliente será redirecionado acionando o esquema `wa.me` orgânico.

## Epic 4: Real-time Recovery Dashboard

Entregar um Painel de SPA interativa onde a operadora de Atendimento vê o novo Lead aparecer (via websocket) na lista antes do lead enviar a primeira mensagem real, conferindo o poder mágico do botão "1-click resgate". Visões métricas para Mobile incluídas.

### Story 4.1: Websocket Channels Configuration (Supabase Listeners)

As a Operadora de Conversão,
I want ser notificada na tela sem atualizar/F5 de que caiu um novo Lead,
So that eu possa atender o possível lead quase instantaneamente sem delay temporal de banco.

**Acceptance Criteria:**

**Given** o Painel React SPA (React Client Side) logado na Home/Dashboard
**When** um visitante esbarrar no fluxo de Tracking Edge com sucesso de preenchimento
**Then** a UI vai atualizar via subscrições de Tempo Real do Supabase para injetar o lead na lista otimisticamente.

### Story 4.2: Listagem de Leads Paginada e Otimizada

As a Operadora de Conversão,
I want poder listar todos Leads, buscar e ordenar, por LPs, origens e status atuais,
So that a tela atue quase como uma To-do list limpa que elimina a síndrome de planilha complexa do CRM antigo.

**Acceptance Criteria:**

**Given** um Operador validado na Tenant id
**When** acessar o módulo unificado de Leads
**Then** verá blocos limpos indicando nomes, hora, telefone em layout moderno com rolagem suave na página sem travamentos.

### Story 4.3: Detalhamento do Lead e Troca de Status Rápida

As a Operadora de Conversão,
I want clicar num lead e ver seu resumo (campos customizados capturados, horário exato, dispositivo) e mudar seu Status de Atendido para Concluído/Arquivado,
So that o registro reflita a realidade na timeline operacional.

**Acceptance Criteria:**

**Given** um card/linha listando um Lead focado
**When** a operadora acionar o dropwdown select ou action click status
**Then** os Route Handlers da camada protegida vão alterar o registro e voltar atualizado para o Dashboard sem page load hard (Optimistic UI style).

### Story 4.4: 1-Click WhatsApp Resgate (Drop-off Rescue Action)

As a Operadora de Conversão,
I want clicar num botão e já acionar a conversa via web no lead que "abandou" o redirecionamento ou não concluiu a chama de WhatsApp dele,
So that eu justifique meu salário e recupere conversões valiosas que seriam perdidas sem a ferramenta.

**Acceptance Criteria:**

**Given** um Lead indexado visualizado na listagem web
**When** o botão CTA verde limpo de Recuperação Ativa Fast-Contact é pressionado
**Then** o Sistema monta a String final `wa.me/55NUMEROLEAD` acionando a janela pop (Window Open / blank target)
**And** o atendente é direcionado e pode reatar contato salvacionista omitindo a necessidade braçal de gravar de discar em smartphones alheios.

### Story 4.5: Dashboard Mobile e Indicadores Superiores

As a Administrador Master,
I want ver um resumo consolidado de tráfego e capturas totais direto da home do meu celular sem frustrações em layouts quebrados,
So that eu conforte minhas incertezas atestando que todas Campanhas Ad spendings estão me performando retorno no software.

**Acceptance Criteria:**

**Given** o login via Smartphone (viewport Mobile como iPhone 13/14)
**When** checar as Overview Metric Cards Superiores
**Then** os Indicadores irão relatar métricas (ex: % Total Captações Leads e Status Organização) estruturadas linearmente
**And** as informações comportarão-se livres de scrolls horizontais respeitando os atributos das Regras da Especificação de UX (Card Layouts encapsulados).
