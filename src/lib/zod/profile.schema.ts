import { z } from 'zod'

export const userRoleSchema = z.enum(['admin', 'editor', 'viewer'])

export const profileSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid().nullable().optional(),
  full_name: z.string().nullable().optional(),
  email: z.string().email(),
  avatar_url: z.string().url().nullable().optional().or(z.literal('')),
  role: userRoleSchema.default('viewer'),
  business_name: z.string().nullable().optional(),
  business_slogan: z.string().nullable().optional(),
  whatsapp_number: z.string().nullable().optional(),
  average_ticket: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional()
})

export type ProfileRow = z.infer<typeof profileSchema>
export type UserRole = z.infer<typeof userRoleSchema>
