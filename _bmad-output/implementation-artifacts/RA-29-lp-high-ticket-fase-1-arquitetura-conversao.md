# Story RA-29: LP High-Ticket - Fase 1: Arquitetura de Conversão (Psicologia de Venda)

Status: backlog

## História (Story)

Como um Visitante Qualificado (potencial cliente de alto ticket),
Eu quero me identificar imediatamente com a dor descrita, entender a causa raiz do meu problema e enxergar um método estruturado de solução,
Para que eu sinta que Rodrigo Anastácio compreende profundamente o meu cenário e possui autoridade para resolvê-lo.

## Critérios de Aceite

1. **Dado** que o visitante acabou de rolar além do Hero da LP
2. **Quando** ele chegar na seção de Dor
3. **Então** verá uma distinção clara entre Sintoma vs. Causa Raiz, escrita com linguagem consultiva e direta
4. **E** a seção de Custo da Inação deve apresentar consequências objetivas (Tempo, Margem, Previsibilidade, Liberdade) com layout de impacto visual
5. **E** a seção do Método deve apresentar o "Método Anastácio™" com fases numeradas e nomeadas, em timeline visual
6. **E** toda a copy deve ser lida de um arquivo `content.data.ts` centralizado, nunca hardcoded nos componentes

## Tarefas / Subtarefas

- [ ] Criar `content.data.ts` centralizado
  - [ ] Definir estrutura de dados para cada seção (PainSection, InactionCostSection, MethodSection, StepsSection)
  - [ ] Preencher copy inicial alinhada ao `premium_lp_framework.md`
- [ ] Implementar `PainSection.tsx`
  - [ ] Layout em duas colunas: Sintoma (errado) vs. Causa Raiz (certo)
  - [ ] Usar `<section>` semântico com `aria-label`
  - [ ] Animação de entrada (framer-motion) ao entrar na viewport
- [ ] Implementar `InactionCostSection.tsx`
  - [ ] Lista de custos invisíveis com ícones e copy de alta urgência
  - [ ] Background diferenciado para criar contraste psicológico
- [ ] Implementar `MethodSection.tsx`
  - [ ] Card central com o nome do método e descrição do diferencial proprietário
  - [ ] Tipografia de impacto (Manrope Black)
- [ ] Implementar `StepsSection.tsx`
  - [ ] Timeline horizontal (desktop) / vertical (mobile) com fases numeradas
  - [ ] Cada fase com título, descrição e ícone SVG semântico
- [ ] Integrar todos os componentes em `page.tsx` na ordem correta do funil
- [ ] Validar HTML semântico (`section`, `article`, `h2-h3`, `ul/li`)
- [ ] Rodar `npm run lint` e `npm run build`

## Notas de Desenvolvimento (Dev Notes)

- **Padrão de Branch:** `feature/develop/RA-29`
- **Padrão de Commit:** Conventional Commits. Lint fixes: `chore: fixing lint`
- **Stack:** Next.js 16 (App Router), Tailwind CSS v4, TypeScript, Framer Motion
- **Referência de Design:** `premium_lp_framework.md` (seções 2 e 3) + Design System atual (Manrope Black, Cyan brand, Glassmorphism)
- **Arquitetura de Dados:** Toda copy DEVE ser lida de `src/components/shared/lp/content.data.ts`. Nenhum texto hardcoded nos `.tsx`.
- **Regra Semântica:** Cada seção é um `<section>` com `aria-label`. Nenhuma div onde uma tag semântica couber.
- **Animação:** Usar `whileInView` do Framer Motion com `viewport={{ once: true }}` para performance.
- **Referência de Componentes Existentes:** Seguir padrão de `HeroText.tsx` e `Features.tsx` para tipografia e estrutura de glassmorphism.

### Referências

- Design System: `src/app/globals.css`, `src/components/ui/button.tsx`
- Framework de LP: `premium_lp_framework.md`
- Padrão existente de seções: `src/components/shared/Hero.tsx`, `src/components/shared/HeroText.tsx`

## Registro do Agente Dev (Dev Agent Record)

### Modelo de Agente Utilizado

_A preencher durante execução_

### Referências de Log de Debug

_A preencher durante execução_

### Lista de Notas de Conclusão

_A preencher durante execução_

### Lista de Arquivos

- `src/components/shared/lp/content.data.ts` (Novo)
- `src/components/shared/lp/PainSection.tsx` (Novo)
- `src/components/shared/lp/InactionCostSection.tsx` (Novo)
- `src/components/shared/lp/MethodSection.tsx` (Novo)
- `src/components/shared/lp/StepsSection.tsx` (Novo)
- `src/app/(public)/page.tsx` (Modificado)
