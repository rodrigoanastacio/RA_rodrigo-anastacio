# Story 1.1: Configuração do Projeto e Fundação do Banco de Dados

Status: ready-for-dev

<!-- Nota: Validação é opcional. Execute validate-create-story para verificação de qualidade antes do dev-story. -->

## História (Story)

Como um Desenvolvedor,
Eu quero configurar a base do Next.js, Tailwind e Supabase com as tabelas essenciais,
Para que possamos construir o sistema sobre uma arquitetura sólida com RLS.

## Critérios de Aceite

1. **Dado** um ambiente Next.js v15 inicializado
2. **Quando** o desenvolvedor rodar o projeto localmente
3. **Então** a arquitetura DDD deve estar presente nas pastas
4. **E** as tabelas `tenants` e `profiles` devem existir no banco Supabase com RLS ativado.

## Tarefas / Subtarefas

- [ ] Auditoria do Ambiente Existente (INÍCIO OBRIGATÓRIO)
  - [ ] Auditoria do schema Supabase via MCP (Detectado: `tenants`, `profiles`, `forms`, `landing_pages`, `leads`).
  - [ ] Verificar as políticas de RLS existentes em `tenants` e `profiles` para isolamento de inquilinos (tenants).
  - [ ] Mapear o diretório `src/` atual para verificar a conformidade com o padrão DDD (`shared/entities`, etc.).
- [ ] Alinhamento do Projeto e Refatoração DDD
  - [ ] Garantir que qualquer código existente em `/src` siga estritamente o `ARCHITECTURE.md` (mover handlers para `shared/api-handlers` se necessário).
  - [ ] Configurar/Refinar os estilos base do Tailwind CSS.
- [ ] Alinhamento do Banco de Dados
  - [ ] Validar se a tabela `tenants` existente cobre todos os requisitos de organização.
  - [ ] Garantir que a tabela `profiles` esteja corretamente vinculada ao Auth do Supabase.
  - [ ] Refinar as políticas de RLS se quaisquer lacunas forem encontradas durante a auditoria.
- [ ] Base da API e Serializações
  - [ ] Definir schemas Zod baseados na estrutura das tabelas existentes.
  - [ ] Implementar/Refinar as classes base de Entidade com suporte a `.toPlainObj()`.

## Notas de Desenvolvimento (Dev Notes)

- **Stack Técnica:** Next.js 15 (App Router), Supabase (Postgres & Auth), Zod, TypeScript, Tailwind.
- **Regras Arquiteturais:**
  - As queries devem permanecer dentro de `src/shared/api-handlers`.
  - A UI nunca recebe classes instanciadas. Os Serviços devem invocar `.toPlainObj()` antes de retornar dados das Server Actions.
  - A convenção de nomenclatura do Supabase é `snake_case` no BD, mas o uso no código deve ser mapeado para `camelCase` nas entidades/lógica de domínio.
  - A fronteira multi-tenant deve basear-se estritamente em RLS (NFR-S01).

### Notas sobre a Estrutura do Projeto

- `src/app`: Exclusivamente para roteamento, apresentação e Middlewares/Actions específicos do Next.js.
- `src/shared`: Regras de lógica de negócio e operações de banco de dados. Nenhum código React/Next deve estar aqui dentro.

### Referências

- Avaliação do Template Inicial e Layout Estrutural: `architecture.md#Starter Template Evaluation`
- Requisitos de RLS e Auth: `prd.md#Security & Privacy` e Epic 1.

## Registro do Agente Dev (Dev Agent Record)

### Modelo de Agente Utilizado

Gemini 2.0 Flash

### Referências de Log de Debug

### Lista de Notas de Conclusão

### Lista de Arquivos
