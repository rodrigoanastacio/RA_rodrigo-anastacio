---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - prd.md
  - product-brief-saas-gestao-leads-2026-02-27.md
  - research/market-SaaS-Gestao-Leads-WhatsApp-research-2026-02-27.md
  - documentation/ARCHITECTURE.md
  - documentation/01-overview.md
  - documentation/03-business-logic-layer.md
  - documentation/04-service-layer.md
  - documentation/05-api-layer.md
  - documentation/06-api-handlers-layer.md
workflowType: architecture
project_name: saas-gestao-leads
user_name: Rodrigo
date: '2026-02-28'
lastStep: 8
status: 'complete'
completedAt: '2026-02-28'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
A aplicação abrange 5 pilares funcionais: Gestão de Contas e Autenticação; Gerenciamento de Equipe em RBAC Multi-nivel (Admin Master, Técnico, Atendimento); O Módulo Híbrido de LPs (Builder vs. Upload .ZIP Customizado); O Motor de Rastreio (Tracking Form Engine) para interceptar os dados organicamente no frontend; e por fim, um painel SPA de Gerenciamento Real-time de Leads.
Do ponto de vista de arquitetura, isso demanda rotinas de Edge eficientes (motor de rastreio), persistência distribuída via Storage (arquivos de Landing Page) e forte gestão de sessão e websockets.

**Non-Functional Requirements:**
As decisões arquiteturais serão estritamente moldadas por:

- Latência de Redirecionamento (NFR-P01): < 800ms.
- Performance de Core Web Vitals (NFR-P02): LPs devem bater score > 90.
- Reatividade (NFR-P03): Propagação em SPA via socket do Supabase < 2s.
- Segurança Multitenant (NFR-S01): Supabase RLS severo isolando o acesso cruzado de organizações.
- Segurança de Uploads (NFR-S04): Sanitização profunda anti-XSS sobre arquivos importados por LPs premium.

**Scale & Complexity:**
O projeto transita entre o nível médio por ter um escopo ágil com GTM Dual-Engine (fase 1), mas eleva a barra ao envolver tracking de microssegundos em produção contínua.

- Primary domain: Web Application SaaS
- Complexity level: Medium-High
- Estimated architectural components: ~12 Core Components (Auth System, Tenant Resolver, API Proxy Routes, Handlers, Upload Storage Controller, Pages Rendering Engine, Action Middlewares, etc).

### Technical Constraints & Dependencies

- O sistema é altamente dependente do **Next.js (App Router)** para resolver de maneira moderna a dualidade de um sistema interno síncrono na mesma base das Landing Pages extremamente leves (Edge/SSG/ISR).
- A interatividade em tempo real requer acoplamento com **Supabase WebSockets (Channels)**.
- Hospedagem Serverless vinculada fortemente as premissas ecossistêmicas da **Vercel** para agilidade de infra limitando um pouco acessos à custom servers long-polling.

### Cross-Cutting Concerns Identified

1. **Multitenancy Absoluto:** Todo "Handler" precisa instanciar dados ou receber contexto validado para qual organização está operando (tenantId).
2. **Segurança (Authorization vs Authentication):** Garantir o RBAC entre níveis de gestão, controlando as APIs do projeto.
3. **Mapeamento/Sanitização e Validação:** Transformação on-the-fly de classes TypeScript para JSON (ex. `toPlainObj()`), validação mandatória com Zod em qualquer payload (Server Actions ou Route Handlers).

## Starter Template Evaluation

### Primary Technology Domain

Web Application (Full-Stack) com forte inclinação para Frontend Server-Side e API Proxying, baseado nas requisições do SaaS Gestão de Leads.

### Starter Options Considered

1. **T3 Stack (create-t3-app)**: Excelente para type-safety de ponta a ponta (com tRPC) e Prisma. **Rejeitado**, pois a arquitetura exige Supabase (não-Prisma na edge) e Next.js Route Handlers.
2. **Blitz.js**: Abstrai APIs totalmente, mas ofusca demais a camada de infraestrutura que precisamos controlar (para injetar headers do Supabase ou lidar com Webhooks de alta performance). **Rejeitado**.
3. **Next.js Official + Custom DDD Layer**: Usar a base crua com App Router e forçar os limites das camadas `src/shared` e `src/app/api`. **Aprovado**.

### Selected Starter: Next.js App Router Base Workflow

**Rationale for Selection:**
O template central do framework cru permite que consigamos aplicar nossa Clean Architecture/DDD adaptada. O Next.js com App Router e Server Actions satisfaz o requisito Dual-Engine: podemos ter SSR para LPs públicas baterem o Score 90 no PageSpeed e, ao mesmo tempo, SPA hidratado no Painel Administrativo usando Supabase Real-time websockets no Client, tudo numa única codebase escalável.

**Initialization Command:**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
# (Assumindo que o projeto base / npm init já foi rodado)
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript por padrão. Tipagem rigorosa do Backend de Rastreio (`api/diagnostico`) até as Props do React garantem baixa chance de bugs em tempo de execução no resgate de leads.

**Styling Solution:**
Tailwind CSS pré-configurado. Fornece total customização sem inflar o bundle final; perfeito para as Micro-Latências exigidas no render dinâmico.

**Build Tooling:**
Next.js Turbopack / Webpack nativo focado em server deployment imediato pela Vercel.

**Testing Framework:**
Vitest ou Jest deverão ser acoplados separadamente depois. O boilerplate Next.js não impõe uma tool de testes, abrindo espaço para testes E2E com Playwright necessários para garantir a captura invisível (< 800ms).

**Code Organization:**
Uma divisão firme:

- `src/app` pertence EXCLUSIVAMENTE ao Next.js (apresentação e roteadores de API Proxy).
- `src/shared` / `src/lib` pertence ao Domínio (DDD) agnóstico ao Framework.

**Development Experience:**
Hot Reloading nativo via Turbopack no Next 15 melhora absurdamente a criação dos form builders.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Fixação da infraestrutura de Dados e Auth Restrito (Supabase e RLS).
- Adoção estrita de Zod para I/O garantindo o sandbox de segurança para NFR-S04.

**Important Decisions (Shape Architecture):**

- Gestão de estado minimalista no cliente versus pesada.
- Componentização híbrida (Server e Client limitados inteligentemente).

### Data Architecture

- **Provider & Auth:** Supabase (Latest Stable). Atua como Banco, Auth via JWT em Cookies, Realtime Provider em SPA, e CDN de Storage para o módulo "Dual Landing Pages".
- **ORM / Query Builder:** Cliente SSR/Client nativo `@supabase/ssr` puro. Não há camada de Prisma ou Drizzle para evitar atrasos no edge runtime (crucial para o NFR-P01 < 800ms).

### Authentication & Security

- **Autenticação:** Sessão baseada em cookies Server-Side protegidos no App Router via Middleware do Next.js.
- **Autorização (RBAC):** Resolvidos majoritariamente via RLS (Row Level Security no Postgres) atrelando toda requisição ao `tenant_id` atrelado no JWT.
- **Validação E2E:** Zod Schemas compartilháveis para validação de forms e interceptação de I/O em Server Actions protegendo contra SQL Injection e XSS estrutural.

### Frontend Architecture

- **State Management:** Prioridade para Server-State (Next.js Cache). State de UI client-side restrito ao Context API ou Zustand (lightweight).
- **Formulários Interativos:** `react-hook-form` rodando integrado ao motor de tracking `onBlur`/`onSubmit`.
- **UI Components:** Shadcn/ui (Radix) + Tailwind como base não opinativa e enxuta para os builders visuais.

### Infrastructure & Deployment

- **Hosting Strategy:** Vercel (Edge Functions + Serverless Functions).
- **CI/CD:** Pipeline nativa da Vercel integrada ao GitHub repo.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
Identificamos 4 áreas onde diferentes Agentes de IA poderiam divergir causando quebras (Serialização de SSR, Padrões Nomenclatura no Db, Delegação de Responsabilidade e Formato de Retorno JSON).

### Naming Patterns

**Database Naming Conventions:**

- Tabelas e Colunas no Supabase: Sempre `snake_case` e em Português-BR (Ex: `diagnosticos`, `nome_completo`, `organization_id`).

**API Naming Conventions:**

- Endpoints Route Handlers: Nomenclatura baseada no recurso em inglês plural (`/api/diagnostics/submit`).

**Code Naming Conventions:**

- Camada de Domínio / Serviços: Sempre `camelCase` para propriedades dinâmicas e variáveis. Ex: `const nomeCompleto = req.body.nomeCompleto`.
- Entidades: PascalCase (ex: `class Diagnostico`).

### Structure Patterns

**Project Organization:**

- Toda integração com o banco e lógica não-reativa sai da pasta `src/app` e deve respeitar as 3 subcamadas de `src/shared/`:
  1. `/entities`: Onde a inteligência e métodos habitam.
  2. `/services`: Onde a orquestração acontece (recebem Request, chamam Handlers, devolvem Entidade.toPlainObj()).
  3. `/api-handlers`: Onde as queries cruas do Supabase/SQL devem ficar reclusas.

### Format Patterns

**API Response Formats:**

- A UI nunca deve receber a Entidade Instanciada. O Service deve invocar `return instance.toPlainObj()`.
- Respostas de API Handlers para Serviços: DTOs brutos tipados em JSON (`snake_case` 1:1 com a tabela vinda do banco).

**Data Exchange Formats:**

- Formulários enviados do Client para o Server Action ou Route Handler: Sempre validados e parseados usando `Zod Schema` unificado compartilhando ambos os ambientes.

### Process Patterns

**Error Handling Patterns:**

- Errors em API Handlers não "morrem" lá, eles são refeitos em instâncias amigáveis (`throw new DatabaseError(error.message)`).
- Na camada `src/app` (Actions/UI), tratamos essas instâncias para exibir no Toast/Feedback ao usuário não como "Error 500 SQL", mas "Não foi possível resgatar o lead".

### Enforcement Guidelines

**All AI Agents MUST:**

- Passar todo DTO recuperado do banco pelo processo de instanciamento da Entidade antes de liberar na Action/UI.
- Executar `toPlainObj()` sempre que for trafegar do Servidor para um Client Component no Next.js.
- Nunca escrever queries `supabase.from()` diretamente em `page.tsx` ou em funções `/actions`. Isso pertence somente aos `api-handlers`.

### Pattern Examples

**Good Examples:**

```typescript
// ✅ CORRETO - Uso da arquitetura de camadas pelo Server Action
export async function submitLeadAction(data) {
  const validData = leadSchema.parse(data) // Zod
  const newLead = await leadService.registerLead(validData) // Service
  return newLead.toPlainObj() // Serialização Segura
}
```

**Anti-Patterns:**

```typescript
// ❌ ERRADO - Quebraria o NFR-S01 de Isolamento de Camadas
export async function submitLeadAction(data) {
  // Chamada direta do DB na Action = Sujeira
  await supabase.from('leads').insert(data)
  return data // Pode conter lixo injetado ou falta serialização
}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
project-root/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts            # Proteção de Rotas & Supabase Session check
├── .env.local
├── supabase/
│   └── migrations/          # Versionamento de DB SQL (Se aplicável futuramente)
├── src/
│   ├── app/                 # Camada de Apresentação (Next.js App Router)
│   │   ├── (auth)/          # Rotas de Login/Recuperação
│   │   ├── (dashboard)/     # SPA Privada (Admin, Técnico, Atendimento)
│   │   ├── lp/              # LPs renderizadas dinamicamente via SSR/ISR
│   │   ├── api/             # Route Handlers (Proxy de API e Webhooks publicos)
│   │   └── actions/         # Server Actions exclusivas de manipulação de form
│   ├── components/          # Camada UI Compartilhada
│   │   ├── ui/              # Base Shadcn/Radix primitives
│   │   ├── forms/           # Formulários acopláveis
│   │   └── layouts/         # Headers, Sidebars e Shells
│   ├── hooks/               # React Hooks Customizados (ex: useRealtimeLeads)
│   ├── lib/                 # Utilitários não ligados ao domínio
│   │   ├── supabase/        # Instâncias de clients ssr/browser
│   │   ├── zod/             # Schemas de validação compartilhados
│   │   └── utils.ts         # tailwind-merge, clsx, parsers genéricos
│   ├── services/            # Client-side API fetchers (axios/fetch abstractions)
│   ├── shared/              # Camada DOMÍNIO E APLICAÇÃO (Coração do SaaS)
│   │   ├── entities/        # TypeScript Classes Puras (ex: Lead.ts, Tenant.ts)
│   │   ├── services/        # Casos de Uso (ex: lead.service.ts) orquestradores
│   │   └── api-handlers/    # Queries diretas ao Supabase Db (ex: lead.handler.ts)
```

### Architectural Boundaries

**API Boundaries:**

- As rotas públicas e LPs batem apenas em `src/app/actions` ou, em casos de tracking invisível client-side, via chamadas silenciosas para `src/app/api/...` para não re-redenderizarem a página (respeitando os < 800ms).

**Component Boundaries:**

- Componentes UI puros (`src/components/ui`) NUNCA chamam o banco de forma alguma.
- Componentes do tipo Page (`src/app/**/page.tsx`) podem chamar `src/shared/services/` (Data Fetching inicial veloz).

**Service Boundaries:**

- A pasta `src/shared/services` atua como barreira: nela entram DTOs (Data Transfer Objects vindos do Handler), saem instâncias de Entidades (via `entity.toPlainObj()`) limpas e sem dados confidenciais extras para o frontend.

**Data Boundaries:**

- Isolamento absoluto na pasta `api-handlers`. Apenas aqui rodam as chamadas explícitas `supabase.from('tableName')`.

### Requirements to Structure Mapping

**Epic/Feature Mapping:**

- **Sistema Híbrido LPs:** Ficará concentrado entre rotas dinâmicas em `src/app/lp/[slug]/page.tsx` buscando renderização html vinda do Storage ou do Builder nativo.
- **Motor de Rastreio (Invisível):** Baseado fundamentalmente em Javascript puro injetado validando num Server Action ou Route handler `src/app/api/tracking/submit-lead/route.ts`.
- **Painel Realtime:** Controlado via Hooks de assinatura (`src/hooks/useLeadsSubscription.ts`) consumindo Canais WebSockets.

_(Nota: Código legado de iterações passadas, como mapeamentos estritos e mockups 'Diagnóstico' antigos, residem fora desta nova fundação orgânica e devem ser expurgados da branch e das rotas de submissão do SaaS Gestão de Leads durante a implementação)._

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
A escolha de estender a base do Next.js sem abstrações alienígenas (como Blitz), e criar fronteiras estritas DDD no `src/shared`, garante que Server Actions, Route Handlers e Client Components não briguem. O turbopack irá compilar rápido e a Vercel implantará sem mistérios.

**Pattern Consistency:**
Impor restrição na passagem de objetos (a obrigatoriedade do `.toPlainObj()` nas entidades antes de irem pro client formata uniformidade de I/O em todo o codebase).

**Structure Alignment:**
A pasta de `/app` como container de Injeção de Dependências exclusiva de Frontend encaixa organicamente nas sub-camadas de domínio definidas.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**

- **Módulo LPs:** Suportado pela arquitetura de arquivos mistas no Cloud Storage CDN e SSG do Next.
- **Tracking Engine:** Suportado por Next.js Middleware + API Route veloz (`< 800ms`).

**Non-Functional Requirements Coverage:**

- NFR-S04 (Anti-XSS em Uploads de Zips de LP): Protegido estritamente pelas validações forçadas do Zod + API Handler isolation.

### Implementation Readiness Validation ✅

**Decision Completeness:**
A matriz de decisão abordou de ponta a ponta desde Framework, passando por Deploy, State Management e finalizando no ORM Client-side. A fundação de Arquitetura está completa.

**Structure Completeness:**
Todo o skeleton inicial foi concebido contemplando a exclusão dos mockups antigos em favor da implementação definitiva do PRD.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Contexto de projeto perfeitamente alinhado c/ PRD.
- [x] Complexidade técnica mapeada (Edge Rendering vs Websockets).
- [x] Multitenancy (RLS) definido como preocupação transversal primária.

**✅ Architectural Decisions**

- [x] Next.js 15 App Router definido.
- [x] Padrões de Zod validation end-to-end decididos.
- [x] Vercel Hosting + Supabase Backend as a Service formalizados.

**✅ Implementation Patterns**

- [x] `snake_case` definido para DB, `camelCase/PascalCase` para o Cliente.
- [x] Padrão de instanciamento DTO > Entidade > Plain Object validado.
- [x] Tratamento de erros customizados estabelecido sem expor Infra.

**✅ Project Structure**

- [x] Árvore de `/src/app` x `/src/shared` solidificada.
- [x] Fronteiras entre Serviços UI não interligados ao Banco decretadas.

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** HIGH (A estrutura DDD mitigou riscos clássicos de App Router).

**Key Strengths:**

- Divisão claríssima de responsabilidades impede que IAs vazem secrets.
- Agilidade e performance da camada Edge do framework otimizada.

### Implementation Handoff

**AI Agent Guidelines:**

- SIGA rigorosamente o documento `ARCHITECTURE.md` para qualquer nova feature.
- NUNCA introduza estado global complexo sem esgotar o cache do Next.js.
- Destrua artefatos legados (antigos projetos /diagnóstico) enquanto injeta a arquitetura real de LPs e Formulários do Gestão de Leads.
