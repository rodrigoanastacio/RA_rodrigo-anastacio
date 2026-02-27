# [Fullstack] Branding e WhatsApp Dinâmico em LPs

## Contexto de Execução

Para aumentar a produtividade e consistência, as Landing Pages (LPs) devem herdar automaticamente a identidade visual e o contato definidos em Settings. Isso evita que o usuário precise digitar o nome da empresa e o WhatsApp em cada nova página criada.

## Critérios de Aceite (AC)

- [x] **Funcional**: Buscar os dados de `business_name`, `business_slogan` e `whatsapp_number` na renderização da LP pública.
- [x] **Funcional**: No `HeroSection`, se um CTA for do tipo WhatsApp ou estiver vazio, usar o `whatsapp_number` do perfil.
- [x] **UI/UX**: O `FooterSection` deve exibir o `business_name` e `business_slogan` caso não existam dados específicos na seção.
- [x] **Resiliência**: Fallback para placeholders genéricos caso os campos em Settings estejam vazios.

## Detalhamento Técnico

- **Localização**:
  - `src/app/(public)/lp/[tenantSlug]/page.tsx`
  - `src/app/(dashboard)/dashboard/landing-pages/[id]/edition/page.tsx`
  - `src/components/lp-renderer/SectionRenderer.tsx`
  - `src/components/lp-renderer/sections/HeroSection.tsx`
  - `src/components/lp-renderer/sections/BioSection.tsx`
  - `src/components/lp-renderer/sections/FooterSection.tsx`
  - `src/app/(dashboard)/dashboard/landing-pages/components/builder/properties-panel.tsx`

## Integração de Dados

- **Lógica de Busca**:
  1. Na `page.tsx` da LP e no editor (builder), os dados de branding são buscados e injetados no `SectionRenderer`.
  2. Implementado helper `resolveMagicLink` para tratar o atalho `#whatsapp`.
  3. Adicionado `Tooltip/Helper Text` no painel de propriedades para instruir o usuário sobre o uso do `#whatsapp`.

## Status: COMPLETED 🚀
