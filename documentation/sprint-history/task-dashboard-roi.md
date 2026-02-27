# [Fullstack] Projeção de ROI no Dashboard

## Contexto de Execução

O usuário agora pode configurar seu **Ticket Médio** em Settings. Esta estória visa integrar esse valor no Dashboard principal para exibir o valor financeiro (R$) do pipeline de leads, transformando dados quantitativos em insights financeiros.

## Critérios de Aceite (AC)

- [x] **Funcional**: O Dashboard deve exibir o "Valor em Negociação" (Leads ativos \* Ticket Médio).
- [x] **Funcional**: O Dashboard deve exibir o "Valor Total do Funil" (Total de leads \* Ticket Médio).
- [x] **UI/UX**: Os valores devem ser formatados como moeda brasileira (R$) utilizando o helper `currencyHelpers.format`.
- [x] **UI/UX**: Utilizar os componentes `StatCard` existentes para manter a consistência visual.
- [x] **Resiliência**: Caso o Ticket Médio não esteja configurado, exibir "R$ 0,00" e manter o sistema estável.

## Detalhamento Técnico

- **Localização**:
  - `src/app/(dashboard)/dashboard/page.tsx` (UI)
  - `src/shared/services/dashboard/dashboard.service.ts` (Serviço)
  - `src/shared/api-handlers/dashboard/dashboard.handler.ts` (Lógica de Dados)
- **Shared**:
  - `src/lib/utils/currency-helpers.ts` (Formatação)

## Integração de Dados

- **Tabela/RPC**: Tabela `profiles` (para buscar `average_ticket`) e `leads`.
- **Lógica**:
  1. No `dashboardService`, buscar o perfil do usuário logado via `userHandler.getMe`.
  2. Passar o `average_ticket` para o `dashboardHandler.getStats`.
  3. No `dashboardHandler`, multiplicar as contagens de leads pelo ticket médio.
  4. Retornar os novos campos `activeValue` e `totalValue`.

## Status: COMPLETED 🚀
