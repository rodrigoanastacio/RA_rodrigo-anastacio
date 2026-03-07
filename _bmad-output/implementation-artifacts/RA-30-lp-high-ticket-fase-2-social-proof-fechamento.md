# Story RA-30: LP High-Ticket - Fase 2: Social Proof, Case Study & Fechamento

Status: backlog

## História (Story)

Como um Visitante Qualificado que já entendeu o método,
Eu quero ver prova concreta de que Rodrigo Anastácio gera resultados reais, me qualificar como o perfil certo e ser convidado a tomar uma ação de baixo risco,
Para que eu conclua a leitura com confiança máxima e converta na CTA final sem objeções abertas.

## Critérios de Aceite

1. **Dado** que o visitante passou pelas seções de dor e método
2. **Quando** ele chegar na seção de Transformação
3. **Então** verá o "Estado B" descrito com benefícios concretos e mensuráveis (não genéricos)
4. **E** a seção de Qualificação deve ter dois blocos claros: "Para quem é" e "Para quem NÃO é"
5. **E** a seção de Case Study deve usar o próprio SaaS como prova de senioridade técnica, com métricas reais
6. **E** os depoimentos devem estar em carrossel com `autoplay`, focados em ROI e transformação
7. **E** o FAQ deve responder objeções de alto ticket com copy direta e sem rodeios
8. **E** a CTA final deve apresentar reversão de risco ("Sem compromisso") e urgência de escassez
9. **E** toda copy deve ser lida de `content.data.ts` centralizado

## Tarefas / Subtarefas

- [ ] Implementar `TransformationSection.tsx`
  - [ ] Grade de benefícios do "Estado B" com ícones e textos curtos e impactantes
  - [ ] Background com pattern sutil para separar visualmente do bloco anterior
- [ ] Implementar `QualificationSection.tsx`
  - [ ] Dois painéis: "Para quem é" (checkmark verde) e "Para quem NÃO é" (X vermelho/cinza)
  - [ ] Texto diretivo para filtrar leads não-qualificados
- [ ] Implementar `CaseStudySection.tsx`
  - [ ] Apresentar o SaaS de Gestão de Leads como prova de capacidade técnica
  - [ ] Métricas destacadas (ex: tempo de desenvolvimento, performance, features)
  - [ ] Screenshot ou mockup do produto como prova visual
- [ ] Implementar `TestimonialsSection.tsx`
  - [ ] Carrossel com autoplay usando biblioteca compatível (ex: Embla Carousel ou custom)
  - [ ] Cada card: foto/avatar, nome, cargo/empresa, depoimento focado em resultado
  - [ ] Usar `<article>` para cada card de depoimento
- [ ] Implementar `FaqSection.tsx`
  - [ ] Componente Accordion semântico (`<details>/<summary>` ou custom acessível)
  - [ ] Mínimo 5 perguntas cobrindo objeções de preço, prazo e comprometimento
- [ ] Implementar `FinalCtaSection.tsx`
  - [ ] Headline secundária de reforço
  - [ ] Botão `brand-premium` global
  - [ ] Copy de reversão de risco abaixo do botão ("Conversa exploratória gratuita")
  - [ ] Indicador de escassez/urgência (ex: "vagas abertas para Março")
- [ ] Atualizar `content.data.ts` com toda a copy das novas seções
- [ ] Integrar todos em `page.tsx` após os componentes da Fase 1
- [ ] Validar HTML semântico (`section`, `article`, `details/summary`)
- [ ] Rodar `npm run lint` e `npm run build`

## Notas de Desenvolvimento (Dev Notes)

- **Padrão de Branch:** `feature/develop/RA-30`
- **Padrão de Commit:** Conventional Commits. Lint fixes: `chore: fixing lint`
- **Dependência:** Requer `content.data.ts` criado na Story RA-29. Executar após RA-29 estar `done`.
- **Stack:** Next.js 16 (App Router), Tailwind CSS v4, TypeScript, Framer Motion
- **Referência de Design:** `premium_lp_framework.md` (seção 1 - itens 5 a 10) + Design System atual
- **Carrossel:** Preferir Embla Carousel (já pode estar no projeto) ou implementar custom com CSS scroll snapping. Verificar `package.json` antes de instalar nova dependência.
- **Regra Semântica:** Depoimentos = `<article>`. FAQ = `<details>/<summary>` (ou ARIA role=button para Accordion custom). Seções = `<section aria-label="...">`.
- **CRO (Conversão):** O Footer da LP deve ser minimalista, sem links externos. Nenhum ponto de fuga após a CTA final. Seguir regras do `premium_lp_framework.md#4. Regras de Conversão`.

### Referências

- Design System: `src/app/globals.css`, `src/components/ui/button.tsx`
- Framework de LP: `premium_lp_framework.md`
- Componentes Fase 1: `src/components/shared/lp/` (criados na RA-29)
- Padrão carrossel: verificar `package.json` por dependências existentes

## Registro do Agente Dev (Dev Agent Record)

### Modelo de Agente Utilizado

_A preencher durante execução_

### Referências de Log de Debug

_A preencher durante execução_

### Lista de Notas de Conclusão

_A preencher durante execução_

### Lista de Arquivos

- `src/components/shared/lp/content.data.ts` (Modificado - novas seções de copy)
- `src/components/shared/lp/TransformationSection.tsx` (Novo)
- `src/components/shared/lp/QualificationSection.tsx` (Novo)
- `src/components/shared/lp/CaseStudySection.tsx` (Novo)
- `src/components/shared/lp/TestimonialsSection.tsx` (Novo)
- `src/components/shared/lp/FaqSection.tsx` (Novo)
- `src/components/shared/lp/FinalCtaSection.tsx` (Novo)
- `src/app/(public)/page.tsx` (Modificado)
