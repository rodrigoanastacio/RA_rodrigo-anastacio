# Story 1.2: Criação de Conta do Administrador (Tenant)

Status: in-progress

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Administrador Master,
I want criar minha conta inicial na plataforma,
so that eu tenha uma organização/tenant exclusiva para minha empresa.

## Acceptance Criteria

1. **Dado** um novo usuário acessando a tela de cadastro
2. **Quando** ele preencher e-mail, senha e nome da empresa
3. **Então** o sistema deve criar o perfil autenticado (Supabase Auth)
4. **E** criar e vincular uma nova `tenant` atribuindo o papel de "Administrador Master" no perfil.

## Tasks / Subtasks

- [x] Implementação da Camada de Domínio e Infra (Shared) (AC: 4)
  - [x] Criar `tenant.service.ts` in `src/shared/services/tenant/`.
  - [x] Implementar `tenantHandler.create` in `src/shared/api-handlers/tenant/`.
  - [x] Implementar `profileHandler.create` ou atualizar existente in `src/shared/api-handlers/user/`.
- [x] Implementação da Server Action de Registro (AC: 3, 4)
  - [x] Criar `auth.actions.ts` in `src/app/actions/auth/`.
  - [x] Implementar função `signUp(data)` que:
    1. Valida dados com Zod.
    2. Executa `supabase.auth.signUp()`.
    3. Cria o `tenant` (gerando slug a partir do nome da empresa).
    4. Vincula o usuário ao tenant no `profile` com `role: 'admin'`.
- [x] Interface de Cadastro (Apresentação) (AC: 1, 2)
  - [x] Criar página `src/app/(auth)/register/page.tsx`.
  - [x] Implementar formulário utilizando `react-hook-form` e os componentes da UI.
  - [x] Adicionar feedback de sucesso/erro com `sonner`.
- [x] Testes e Validação (AC: 3, 4)
  - [x] **MANDATÓRIO**: Validar no navegador se a jornada/fluxo está funcionando conforme o esperado.
  - [x] Correção de Leak de Segurança em notificações (Filtro por Tenant ID).
  - [x] Implementado mapeamento de erros (PT-BR) para feedback amigável.
- [ ] Review Follow-ups (AI)
  - [ ] [AI-Review][Medium] Implementar testes de integração automatizados para o fluxo de registro (Tenant + Profile + Auth).

## Dev Notes

- **Slug Generation**: O slug do tenant deve ser gerado a partir do nome da empresa (ex: "Minha Empresa" -> "minha-empresa").
- **RLS**: As tabelas `tenants` e `profiles` precisam de políticas que permitam a inserção durante o registro (ou a Action deve usar o cliente admin se o fluxo for service-side).
- **Modularidade**: Manter a lógica de criação de tenant separada da lógica de auth para facilitar adições futuras (como convites).

### Project Structure Notes

- Seguir estritamente `ARCHITECTURE.md`.
- Handlers em `src/shared/api-handlers`.
- Services em `src/shared/services`.
- Actions em `src/app/actions`.

### References

- [Epics: Story 1.2](epics.md#Story 1.2: Criação de Conta do Administrador (Tenant))
- [Architecture: Data Fetching Patterns](ARCHITECTURE.md#4. Estratégia de Data Fetching)
- [PRD: Security & Privacy](prd.md#Security & Privacy)

## Dev Agent Record

### Agent Model Used

Gemini 2.0 Flash

### Debug Log References

- [Lint: OK]
- [Build: N/A - Only logic/UI added]

### Completion Notes List

- Implementado fluxo completo de registro de Tenant e Administrador Master.
- Adicionado `tenantHandler.create` e `userHandler.createProfile`.
- Criada Server Action `signUpAction` com validação Zod.
- Interface `/register` criada seguindo o design system.

### File List

- `project-context.md`
- `_bmad-output/implementation-artifacts/1-2-criacao-de-conta-do-administrador-tenant.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/lib/zod/auth.schema.ts`
- `src/shared/api-handlers/tenant/tenant.handler.ts`
- `src/shared/api-handlers/user/user.handler.ts`
- `src/shared/services/tenant/tenant.service.ts`
- `src/app/actions/auth/auth.actions.ts`
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/register/components/register-form.tsx`
- `src/app/(auth)/register/hooks/use-register.ts`
- `src/app/(auth)/login/login-actions.tsx` (atualizado com mapErrorMessage)
- `src/app/(dashboard)/dashboard/actions/notifications.ts` (fix de segurança RLS leak)
- `src/lib/utils/error-mapper.ts` (novo utilitário de localização)
- `src/components/lp-renderer/ui/WhatsAppCaptureModal.tsx` (lint fix)
