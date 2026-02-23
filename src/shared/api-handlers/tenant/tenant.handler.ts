import { Tenant } from '@/shared/entities/tenant/tenant.entity'
import { TenantRow } from '@/shared/entities/tenant/tenant.types'
import { SupabaseClient } from '@supabase/supabase-js'

export const tenantHandler = {
  getBySlug: async (
    supabase: SupabaseClient,
    slug: string
  ): Promise<Tenant | null> => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      console.error('[tenantHandler.getBySlug] Error:', error)
      throw error
    }

    if (!data) {
      return null
    }

    const row = data as TenantRow
    return new Tenant(
      row.id,
      row.slug,
      row.name,
      row.status as 'active' | 'trialing' | 'past_due' | 'canceled',
      row.settings,
      row.created_at,
      row.updated_at
    )
  },

  getById: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<Tenant | null> => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      console.error('[tenantHandler.getById] Error:', error)
      throw error
    }

    if (!data) {
      return null
    }

    const row = data as TenantRow
    return new Tenant(
      row.id,
      row.slug,
      row.name,
      row.status as 'active' | 'trialing' | 'past_due' | 'canceled',
      row.settings,
      row.created_at,
      row.updated_at
    )
  },

  list: async (supabase: SupabaseClient): Promise<Tenant[]> => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[tenantHandler.list] Error:', error)
      throw error
    }

    if (!data || data.length === 0) {
      return []
    }

    return data.map(
      (row: TenantRow) =>
        new Tenant(
          row.id,
          row.slug,
          row.name,
          row.status as 'active' | 'trialing' | 'past_due' | 'canceled',
          row.settings,
          row.created_at,
          row.updated_at
        )
    )
  },

  updateSettings: async (
    supabase: SupabaseClient,
    id: string,
    settings: any
  ) => {
    const { data, error } = await supabase
      .from('tenants')
      .update({ settings })
      .eq('id', id)
      .select('settings')
      .single()

    if (error) {
      console.error('[tenantHandler.updateSettings] Error:', error)
      throw error
    }

    return data
  },

  uploadLogo: async (
    supabase: SupabaseClient,
    tenantId: string,
    file: File
  ) => {
    const fileExt = file.type.split('/')[1]
    const fileName = `${tenantId}/logo.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('tenant-assets')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('tenant-assets')
      .getPublicUrl(fileName)

    return urlData.publicUrl
  }
}
