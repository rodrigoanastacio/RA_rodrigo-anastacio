---
name: ddd-patterns
description: Guidelines for Domain-Driven Design (DDD) to ensure high modularity, clean boundaries, and independent domains. Emphasizes separating business logic from infrastructure and frameworks.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Domain-Driven Design (DDD) Patterns

> **Keep it modular. Keep it independent. Protect the Domain.**

## Core DDD Principles for this Project

1. **Entities & Domain Models First:**
   - The heart of the software is the Domain.
   - Entities must encapsulate their own business rules and state (Rich Domain Model).
   - _Anti-Pattern:_ Anemic Domain Models (Entities that are just data bags with getters/setters and no logic).

2. **Clean Boundaries (Layered Architecture):**
   - **Domain Layer:** Entities, Value Objects, Domain Exceptions. Absolutely zero dependencies on frameworks (like React, Next.js, or Supabase).
   - **Application Layer (Services/Use Cases):** Orchestrates business use cases. Depends on Domain. Does NOT depend on HTTP, UI, or DB implementation.
   - **Infrastructure Layer (Repositories/Handlers):** Implementation details. Supabase clients, specific ORM logic, external APIs.
   - **Presentation Layer (Controllers/Pages/UI):** React components, Next.js routes. They ONLY speak to Application Services, NEVER directly to Infrastructure/Repositories.

3. **Dependency Rule:**
   - Outer layers (Infrastructure, UI) depend on inner layers (Application, Domain).
   - Inner layers NEVER depend on outer layers.
   - _Code Smell:_ Leaking ORM details (e.g., Supabase `SupabaseClient`) into the Domain Entity.

## Modular Separation (Bounded Contexts)

- Each module (e.g., `Leads`, `Team`, `Auth`) must be self-contained.
- Modules should rarely share database tables directly; they should communicate via well-defined Application Services if necessary.

## Refactoring Guidelines (Applying DDD)

When refactoring a module, ensure:

- **Presentation (UI):** Should be lean. It receives user inputs and delegates work. It should not contain direct DB queries or complex business logic.
- **Service (Application):** Contains the "Use Case". It injects repositories and domain entities to accomplish a goal.
- **Handler/Repository (Infrastructure):** This is where you put your Supabase queries (`supabase.from(...)`). Hide these details behind generic functions/interfaces that the Service can call.

> **MANDATORY CHECK:** If a Next.js `page.tsx` imports a Supabase client and passes it directly to a Handler/Repository, the UI is orchestrating infrastructure. Refactor it to route through a dedicated Service or Use Case layer!
