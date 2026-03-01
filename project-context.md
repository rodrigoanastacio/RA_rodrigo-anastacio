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

## Regras Críticas (Aprendizados)

Para evitar erros recorrentes e manter o profissionalismo:

1.  **Zero Logs de Debug**: É TERMINANTEMENTE PROIBIDO realizar commits com `console.log`, `console.error` ou comentários de depuração. O código deve ser limpo e profissional conforme os princípios de Clean Code definidos.
2.  **Validação de Build e Teste**: Antes de QUALQUER merge para `develop` ou `main`, é MANDATÓRIO executar:
    - `npm run lint`
    - `npm run test`
    - `npm run build` (especialmente importante para detectar erros de pré-renderização).
3.  **Suspense Boundary**: Qualquer Client Component que utilize hooks de navegação do Next.js (como `useSearchParams`) DEVE ser envolvido em um `<Suspense>` para evitar falhas no build de produção.
4.  **Ambiente de Teste**: O projeto utiliza `whatwg-fetch` no `jest.setup.ts` para polyfill de fetch. Nunca remova ou altere esta configuração sem validar a suíte de testes de serviços.
5.  **Merge para Main**: Somente realizar merge para a `main` após a suíte de testes estar 100% verde (PASS) e o build validado.
