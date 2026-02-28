# Project Context - saas-gestao-leads

Este documento define padrões e regras específicas para o desenvolvimento deste projeto.

## Git Workflow

Sempre seguir este workflow para a implementação de novas histórias ou tarefas:

1. **Início da Task**:
   - Criar uma nova branch a partir da branch `develop`.
   - Nome da branch deve seguir o padrão: `story/{id}-{resumo}` ou `feat/{id}-{resumo}`.

2. **Finalização da Task**:
   - Após a implementação e validação do usuário:
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
