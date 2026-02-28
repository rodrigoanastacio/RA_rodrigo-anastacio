import { z } from 'zod'

export const tenantSettingsSchema = z
  .object({
    branding: z
      .object({
        primaryColor: z.string().optional(),
        secondaryColor: z.string().optional(),
        logo: z.string().optional(),
        logoUrl: z.string().optional(),
        companyName: z.string().optional(),
        tagline: z.string().optional()
      })
      .optional(),
    domain: z
      .object({
        custom: z.string().optional(),
        subdomain: z.string().optional()
      })
      .optional(),
    features: z.record(z.string(), z.boolean()).optional(),
    niche: z.string().optional()
  })
  .catchall(z.unknown())

export const tenantSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string(),
  status: z.enum(['active', 'trialing', 'past_due', 'canceled']),
  settings: tenantSettingsSchema,
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable().optional()
})

export type TenantRow = z.infer<typeof tenantSchema>
