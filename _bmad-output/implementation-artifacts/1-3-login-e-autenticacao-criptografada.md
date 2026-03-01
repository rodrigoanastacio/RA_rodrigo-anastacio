# Story 1.3: Login e Autenticação Criptografada

Status: done

## Story

As a Administrador Master,
I want realizar login seguro com email e senha,
So that eu possa acessar meu painel administrativo protegido.

## Acceptance Criteria

1. **Dado** um usuário cadastrado na plataforma
2. **Quando** ele submeter e-mail e senha corretos
3. **Então** um cookie de sessão JWT/Supabase SSR deve ser gerado
4. **E** o usuário será redirecionado para o Dashboard e protegido por middleware.

## Tasks / Subtasks

- [x] Camada de Infra (Shared)
  - [x] Implementar `authService.signIn(email, password)` em `src/services/auth/auth.service.ts`.
  - [x] Garantir que o `authService` utilize o `createClient` para gerenciar cookies SSR.
- [x] Server Action de Login
  - [x] Criar `loginAction(data)` em `src/app/actions/auth/auth.actions.ts` (ou atualizar se já existir).
  - [x] Validar inputs com Zod (`loginSchema`).
  - [x] Chamar `authService.signIn`.
  - [x] Tratar erros de autenticação (usuário não encontrado, senha incorreta) usando o `mapErrorMessage`.
- [x] Interface de Login (Apresentação)
  - [x] Criar/Atualizar página `src/app/(auth)/login/page.tsx`.
  - [x] Implementar `LoginForm` com feedback de erro amigável.
- [x] Proteção de Rotas (Middleware)
  - [x] Revisar/Implementar `middleware.ts` para garantir que rotas `/dashboard/*` exijam autenticação.
  - [x] Redirecionar usuários não autenticados para `/login`.
- [x] Testes e Validação
  - [x] Criar testes unitários para `auth.service.ts`.
  - [x] Validar fluxo de login manualmente no navegador.

## Dev Notes

- **Supabase SSR**: Utilizar `@supabase/ssr` para persistência de sessão via cookies.
- **Middleware**: O middleware deve verificar a sessão de forma eficiente sem overhead desnecessário (usar `getUser()` para segurança total ou `getSession()` se o middleware apenas fizer o redirect básico).
- **Clean Code**: Sem comentários, nomes descritivos.

## Project Structure Notes

- Seguir `ARCHITECTURE.md`.
- Handlers em `src/shared/api-handlers`.
- Services em `src/services` (novo padrão unificado).
- Actions em `src/app/actions`.

## References

- [Epics: Story 1.3](epics.md#Story 1.3: Login e Autenticação Criptografada)
- [Architecture: Auth & RBAC](documentation/07-auth-rbac.md)

## File List

- `src/services/auth/auth.service.ts`
- `src/app/actions/auth/auth.actions.ts`
- `src/app/(auth)/login/page.tsx`
- `src/proxy.ts` (Replaced middleware.ts)
- `src/app/(dashboard)/hooks/useDashboard.ts`
- `src/services/tenant/tenant.service.ts`
- `src/services/auth/__tests__/auth.service.test.ts`
