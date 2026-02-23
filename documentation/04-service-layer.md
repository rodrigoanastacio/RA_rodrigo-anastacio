# 04. Camada de Serviços (Application & Client Services)

## Visão Geral

Com a arquitetura focada no **Next.js App Router** e os princípios de **DDD (Domain-Driven Design)**, nossa camada de serviços possui duas frentes primárias:

1. **Application Services (Backend/Server):** `src/shared/services/{module}/*.service.ts`
2. **Client Services (Frontend HTTP):** `src/services/{module}/*.service.ts`

---

## 1. Application Services (Backend)

Esta é a camada vital do sistema. Ela atua como **Use Cases** que orquestram a lógica da aplicação no servidor (Server Components ou Server Actions).

### Responsabilidades

- **Encapsulação de Repositórios:** Chamar os _Handlers_ da camada de infraestrutura para buscar dados brutos (DTOs).
- **Regras de Domínio:** Instanciar as **Entidades de Domínio** com os dados do Handler e aplicar lógica de negócio (ex: checar status, permissões).
- **Isolamento da UI:** Retornar dados limpos (`.toPlainObj()`) prontos para a Camada de Apresentação (`page.tsx`) renderizar sem precisar saber detalhes do banco de dados (Supabase).

### Exemplo (Team Service)

```typescript
// src/shared/services/team/team.service.ts
export const teamService = {
  listTeamMembers: async (tenantId: string) => {
    // 1. Fetch raw data (DTO) from Handler (Infra)
    const profilesData = await teamHandler.list(supabaseAdmin, tenantId)

    // 2. Apply Domain Logic (Status validation, Email verification)
    const members = await teamService.getMembersWithStatus(
      supabaseAdmin,
      profilesData
    )

    // 3. Return plain objects for the UI
    return members.map((m) => m.toPlainObj())
  }
}
```

---

## 2. Client Services (Frontend HTTP Fetching)

Apenas utilizados em **Client Components** quando a interatividade exige chamadas dinâmicas para a nossa própria API (`/api/*`).

### Responsabilidades

- Executar requisições de API (`GET`, `POST`, `PUT`, `DELETE`).
- Garantir respostas tipadas e tratar erros HTTP globais antes de chegar aos Hooks da UI.

### Exemplo (Diagnóstico Client Service)

```typescript
// src/services/diagnostico/diagnostico.service.ts
import { api } from '../api'

export const diagnosticoService = {
  submit: (data: DiagnosticoFormData) => api.post('/api/diagnostico', data)
}
```
