import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type LandingPageRow =
  Database['public']['Tables']['landing_pages']['Row']
export type LandingPageInsert =
  Database['public']['Tables']['landing_pages']['Insert']
export type LandingPageUpdate =
  Database['public']['Tables']['landing_pages']['Update']

export const landingPagesHandler = {
  async list(supabase: SupabaseClient<Database>, tenantId: string) {
    const { data, error, count } = await supabase
      .from('landing_pages')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return {
      pages: data as LandingPageRow[],
      total: count || 0
    }
  },

  async getById(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string
  ) {
    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single()

    if (error) throw error
    return data as LandingPageRow
  },

  async create(supabase: SupabaseClient<Database>, page: LandingPageInsert) {
    const { data, error } = await supabase
      .from('landing_pages')
      .insert(page)
      .select()
      .single()

    if (error) throw error
    return data as LandingPageRow
  },

  async update(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string,
    page: LandingPageUpdate
  ) {
    const { data, error } = await supabase
      .from('landing_pages')
      .update(page)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single()

    if (error) throw error
    return data as LandingPageRow
  },

  async delete(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string
  ) {
    const { error } = await supabase
      .from('landing_pages')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId)

    if (error) throw error
    return true
  }
}
