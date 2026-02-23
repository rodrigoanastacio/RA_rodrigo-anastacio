import { createClient } from '@/lib/supabase/server'
import { tenantHandler } from '@/shared/api-handlers/tenant/tenant.handler'
import { TenantSettings } from '@/shared/entities/tenant/tenant.types'
import { SupabaseClient } from '@supabase/supabase-js'

async function getTenantId(
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', userId)
    .single()

  return profile?.tenant_id || null
}

export const tenantService = {
  getSettings: async () => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) return null

    const tenantId = await getTenantId(supabase, authUser.user.id)
    if (!tenantId) return null

    return tenantHandler.getById(supabase, tenantId)
  },

  updateSettings: async (settings: TenantSettings) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const tenantId = await getTenantId(supabase, authUser.user.id)
    if (!tenantId) throw new Error('Tenant not found')

    return tenantHandler.updateSettings(supabase, tenantId, settings)
  },

  uploadLogo: async (file: File) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const tenantId = await getTenantId(supabase, authUser.user.id)
    if (!tenantId) throw new Error('Tenant not found')

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/webp'
    ]
    if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type')
    if (file.size > 5 * 1024 * 1024)
      throw new Error('File too large. Maximum size is 5MB.')

    const publicUrl = await tenantHandler.uploadLogo(supabase, tenantId, file)

    const tenant = await tenantHandler.getById(supabase, tenantId)
    const currentSettings = tenant?.settings || {}
    const updatedSettings = {
      ...currentSettings,
      branding: {
        ...(currentSettings as any).branding,
        logoUrl: publicUrl
      }
    }

    await tenantHandler.updateSettings(supabase, tenantId, updatedSettings)

    return publicUrl
  }
}
