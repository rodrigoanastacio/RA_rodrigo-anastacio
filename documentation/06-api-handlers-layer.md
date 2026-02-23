# 06. Camada de API Handlers

## Visão Geral

A camada de **API Handlers** é responsável pela integração direta com fontes de dados externas no lado do servidor. No nosso caso, ela encapsula toda a comunicação com o **Supabase**.

- **Localização**: `src/shared/api-handlers/{module}/{feature}.handler.ts`

## Responsabilidades

1. **Integração com Supabase**: Usar o cliente Supabase para realizar operações de CRUD.
2. **Mapeamento de Dados**: Converter objetos vindos da API (Camel Case) para o formato esperado pelo banco de dados (Snake Case + PT-BR).
3. **Tratamento de Erros de Banco**: Capturar violações de constraints e retornar mensagens tratadas.
4. **Sanitização Final**: Aplicar `trim()`, `toLowerCase()`, etc., antes da persistência definitiva.
5. **Retorno de DTOs (Data Transfer Objects)**: O Handler atua como Infrastructure/Repository e **NUNCA** deve instanciar Entidades do Domínio. Seu papel é buscar os dados crus e devolver um formato JSON limpo (ex: `TeamMemberResponse[]`) para a Camada de Serviço (Application Layer) consumir e instanciar as entidades com suas devidas regras de negócio.

## Exemplo Prático

```typescript
// src/shared/api-handlers/diagnostico/diagnostico.handler.ts
export const diagnosticoHandler = {
  create: async (data: Diagnostico) => {
    const { error } = await supabase.from('diagnosticos').insert([
      {
        nome_completo: data.nome
        // ... mapeamento para PT-BR
      }
    ])
    if (error) throw new DatabaseError(error)
    return { success: true }
  }
}
```

---

Esta camada garante que, se um dia mudarmos de banco de dados ou precisarmos adicionar um gRPC (como no modelo original), a lógica de API REST e a UI não precisarão ser alteradas drasticamente.
