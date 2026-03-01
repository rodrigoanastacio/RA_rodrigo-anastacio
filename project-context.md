# Project Context - saas-gestao-leads

Este documento define padrões e regras específicas para o desenvolvimento deste projeto.

## Git Workflow

Sempre seguir este workflow para a implementação de novas histórias ou tarefas:

1. **Início da Task**:
   - Criar uma nova branch a partir da branch `develop`.
   - Nome da branch deve seguir o padrão: `feature/[de-onde-partiu-a-branch]/RAGL-{id}-{resumo}`
     - Exemplo: `feature/develop/RAGL-1-1-setup-audit`.

2. **Desenvolvimento e Validação local**:
   - Implementar a funcionalidade.
   - **MANDATÓRIO**: Validar no navegador se a jornada/fluxo está funcionando conforme o esperado.
   - Verificar logs do terminal e console do navegador.

3. **Code Review**:
   - Após a validação local bem-sucedida, o próximo passo é realizar o **Code Review**.

4. **Finalização da Task**:
   - Após o Code Review e aprovação:
   - Realizar o commit das alterações.
   - Realizar o merge da branch da tarefa para a `develop`.
   - Manter a `develop` sempre atualizada com as tarefas finalizadas.

## Padrões de Código

- Seguir estritamente o `documentation/ARCHITECTURE.md`.
- Uso de Next.js 15 (App Router).
- Supabase para persistência e Auth (com RLS).
- Camada `shared` para lógica de negócio (Entities, Services, Handlers).
- Camada `app` apenas para roteamento e apresentação.
- Serialização via `.toPlainObj()` em Entidades.
- **Clean Code**: Não utilizar comentários no código. Utilizar nomenclaturas bem descritivas.
