# Arquitetura do Projeto

Este projeto utiliza uma adaptação da **Clean Architecture** otimizada para o **Next.js App Router**. O objetivo é manter a separação de responsabilidades sem adicionar complexidade desnecessária.

## Diagrama Visual

```mermaid
graph TD
    UI[🖥️ Interface (Client Components)] --> Action[⚡ Server Action]
    Action --> Handler[🧠 Business Logic (Shared)]
    Handler --> DB[(🗄️ Supabase / Database)]

    subgraph "Camada de Apresentação (App)"
        UI
        Action
    end

    subgraph "Camada de Domínio & Aplicação (Shared)"
        Service[⚙️ Application Service]
        Handler[🛠️ Infrastructure (Handlers)]
        Entities[💎 Domain Entities]
    end
```

## Camadas da Aplicação

### 1. Presentation Layer (`src/app`)

Responsável apenas por renderizar a interface e capturar interações do usuário.

- **Pages/Layouts**: Estrutura das rotas.
- **Client Components**: Componentes interativos (`useState`, `useEffect`).
- **Server Components**: Componentes que buscam dados iniciais.
- **Actions (`/actions`)**: A "ponte" segura entre o cliente e o servidor.

### 2. Server Actions (`/actions`)

Funções assíncronas que rodam exclusivamente no servidor.

- **Responsabilidade**: Receber input do Client, validar sessão, chamar a camada de negócio e revalidar cache (`revalidatePath`).
- **Não contém**: Regras de negócio complexas ou SQL direto.

### 3. Application & Domain Layer (`src/shared`)

Onde vive a inteligência da aplicação. Separada em camadas seguindo os princípios de **Domain-Driven Design (DDD)**. Independente do framework.

- **Domain Entities (`/entities`)**: O coração do negócio. Classes TypeScript puras que encapsulam regras, sem importar bancos de dados ou UI.
- **Application Services (`/services`)**: Casos de uso da aplicação (ex: `teamService.listTeamMembers()`). Orquestra a busca de dados na infraestrutura (Handlers) e instancia/devolve Entidades de Domínio para a Presentation Layer.
- **Infrastructure Handlers (`/api-handlers`)**: A camada mais suja de backend. Onde mora a integração real com o **Supabase**. Busca dados crus (DTOs) e devolve para os Services. Nunca contém lógica de negócio complexa.

### 4. Estratégia de Data Fetching

**Padrão Adotado**: Server Components First.

| Tipo               | Onde                               | Como                        | Por que?                               |
| :----------------- | :--------------------------------- | :-------------------------- | :------------------------------------- |
| **Initial Data**   | **Server Components** (`page.tsx`) | Chama `Handler` diretamente | SEO, Performance, Sem Loading State    |
| **Interatividade** | **Client Components** (Hooks)      | Chama `Server Action`       | Feedback imediato, Updates sem refresh |
| **Realtime**       | **Client Components**              | `supabase.channel()`        | Atualizações via Socket                |

> 🚫 **Anti-Pattern**: Usar `useEffect` para buscar dados iniciais de uma página. Isso transfere a carga para o cliente e piora o Core Web Vitals.

### 5. Padrões de Código e Boas Práticas

**Serialização de Entidades (Server ➡ Client)**
O Next.js não permite passar instâncias de Classes (Entities) diretamente para Client Components.

- **Problema**: "Warning: Only plain objects can be passed to Client Components..."
- **Solução**: Implementar método `.toPlainObj()` na Entidade.
- **Uso**: `data={member.toPlainObj()}` ao invés de `data={member}`.

## Fluxo de Dados (Exemplo: Atualizar Status)

1. **User Interaction**: Usuário clica no Dropdown (`LeadDetailsDrawer`).
2. **Client Action**: Componente chama `updateLeadStatus(id, status)`.
3. **Server Action**: O Next.js recebe o request, instancia o cliente Supabase server-side.
4. **Business Logic**: Action chama `diagnosticoHandler.updateStatus()`.
5. **Persistence**: Handler executa o UPDATE no banco.
6. **Feedback**: Banco retorna sucesso > Handler retorna > Action revalida cache > UI atualiza.
