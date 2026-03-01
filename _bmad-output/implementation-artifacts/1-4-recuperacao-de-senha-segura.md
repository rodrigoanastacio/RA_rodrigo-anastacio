# Story 1.4: Recuperação de Senha Segura

Status: done

## Story

As a Usuário,
I want recuperar minha senha de forma segura através do meu e-mail,
So that eu possa reaver o acesso à minha conta caso eu a esqueça.

## Acceptance Criteria

1. **Dado** um usuário com e-mail cadastrado
2. **Quando** ele solicitar a recuperação de senha
3. **Então** um e-mail com um link seguro (PKCE) deve ser enviado
4. **E** ao clicar no link, o usuário deve ser autenticado e levado para a tela de redefinição
5. **E** após atualizar a senha com sucesso, o usuário deve ser logado automaticamente e levado ao Dashboard.

## Tasks / Subtasks

- [x] Interface de Recuperação
  - [x] Criar página `src/app/(auth)/forgot-password/page.tsx`.
  - [x] Implementar formulário com feedback de sucesso e erro.
- [x] Serviço de Autenticação
  - [x] Implementar `authService.resetPasswordForEmail` com redirecionamento dinâmico.
  - [x] Implementar `authService.updatePassword`.
- [x] Fluxo de Callback e Segurança
  - [x] Criar rota de API `src/app/api/auth/callback/route.ts` para troca de código PKCE.
  - [x] Adicionar "Fail-safe" no hook de atualização para garantir sessão ativa.
- [x] Tela de Atualização de Senha
  - [x] Implementar indicador de força da senha (`PasswordStrength`).
  - [x] Validar confirmação de senha com Zod.
- [x] Polimento e Lint
  - [x] Corrigir avisos de lint em hooks.
  - [x] Validar redirecionamento padrão de mercado (Dashboard pós-reset).

## Dev Notes

- **PKCE**: O fluxo utiliza a troca de código no servidor para maior segurança.
- **Fail-safe**: Caso o usuário pule o callback, a tela de `update-password` tenta realizar a troca do código se presente na URL.
- **Aesthetics**: Segue o padrão visual premium com gradientes e micro-animações.

## File List

- `src/app/(auth)/forgot-password/page.tsx`
- `src/app/(auth)/update-password/page.tsx`
- `src/app/(auth)/update-password/hooks/use-update-password.ts`
- `src/app/(auth)/update-password/components/password-strength.tsx`
- `src/app/(auth)/login/components/login-form.tsx`
- `src/app/actions/auth/auth.actions.ts`
- `src/services/auth/auth.service.ts`
- `src/lib/zod/auth.schema.ts`
- `src/app/api/auth/callback/route.ts`
- `src/app/(dashboard)/hooks/useDashboard.ts`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## References

- [Epics: Story 1.4](epics.md#Story 1.4: Recuperação de Senha Segura)
- [Architecture: Auth & RBAC](documentation/07-auth-rbac.md)
