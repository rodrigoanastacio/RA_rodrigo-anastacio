# 02. Camada de Apresentação

## Princípio: Componentes são "Burros"

A **Camada de Apresentação** deve focar exclusivamente em _como as coisas parecem_ e _como o usuário interage_.

### 📁 Estrutura de Arquivos

- **Páginas**: `src/app/{module}/{feature}/page.tsx`
- **Componentes**: `src/app/{module}/{feature}/components/`
- **Hooks (UI)**: `src/app/**/hooks/`

### Responsabilidades

#### ✅ MUST DO:

- **UI Rendering**: Exibir elementos visuais (botões, tabelas).
- **Event Capture**: Capturar eventos (clicks, inputs, submits).
- **State Display**: Exibir loading states, success, error.
- **Logic Delegation**: Chamar hooks customizados para a lógica de dados real e passar callbacks via props.

#### ❌ MUST NOT DO:

- **Business Logic**: Cálculos complexos pertencem às Entidades de Domínio.
- **Direct Service Calls**: Nunca usar `fetch`/`axios` diretamente ou o cliente do Supabase na UI. Pertencem aos Services/Handlers.
- **Complex State Management**: Nunca manter regras massivas de sincronização no componente. Use Contexts ou Hooks.

### 📐 Layout & Tailwind System (Regras Restritas)

**CRÍTICO:** Use unidades relativas do tema do Tailwind e _design tokens_. **NUNCA** use pixels soltos.

- **Espaçamentos (Spacing):** Utilize `p-2` (8px), `p-4` (16px), `mb-6` ao invés de `padding: 16px`.
- **Tipografia:** Use a escala semântica: `text-sm`, `text-base`, `text-lg`. Nada de `text-[14px]`.
- **Cores:** Utilize os tokens do design system `bg-primary`, `text-slate-500`. NUNCA use hexadecimais _hardcoded_ tipo `bg-[#1976D2]`.
- **Responsividade:** Projete para os _breakpoints_ `sm`, `md`, `lg`. A mentalidade é _Mobile-First_, depois sobrepondo regras maiores (ex: `w-full md:w-1/2`).

### Exemplo

O componente `DiagnosticWizard.tsx` delega a lógica de submissão e navegação para o hook `useDiagnosticoForm`, ficando responsável apenas pelo layout:

```tsx
function DiagnosticWizard() {
  const { currentStep, isSubmitting, handleSubmit } = useDiagnosticoForm()

  return (
    <div>
      <ProgressBar step={currentStep} />
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Próximo'}
      </Button>
    </div>
  )
}
```

### Componentes Compartilhados

Componentes reutilizáveis devem ser flexíveis e configuráveis via props, evitando lógica de negócio acoplada.

**Exemplo: `InteractiveTable`**
Localizado em `src/components/dashboard/InteractiveTable.tsx`, este componente gerencia a exibição de dados tabulares, suportando:

- Paginação local
- Ordenação
- Seleção múltipla (opcional via `showCheckbox`)
- Coluna de iniciais/avatar (opcional via `showInitials` e `initialsKey`)

```tsx
<InteractiveTable
  columns={columns}
  rows={data}
  showCheckbox
  showInitials
  initialsKey="fullName"
/>
```
