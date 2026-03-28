import { env } from '@/config/env'
import { TeamMemberFormData, TeamMemberResponse } from '@/lib/zod/team.schema'
import { SupabaseClient } from '@supabase/supabase-js'

export const teamHandler = {
  list: async (
    supabase: SupabaseClient,
    tenantId?: string
  ): Promise<TeamMemberResponse[]> => {
    let query = supabase
      .from('profiles')
      .select('id, full_name, email, role, avatar_url, created_at, updated_at, tenant_id')
      .is('deleted_at', null)
      .order('full_name', { ascending: true })

    if (tenantId) {
      query = query.eq('tenant_id', tenantId)
    }

    const { data, error } = await query

    if (error) throw error

    return data as TeamMemberResponse[]
  },

  update: async (
    supabase: SupabaseClient,
    id: string,
    data: { full_name: string; role: 'admin' | 'editor' | 'viewer' }
  ): Promise<{ success: boolean }> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.full_name,
        role: data.role,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error

    return { success: true }
  },

  delete: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<{ success: boolean }> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error

    return { success: true }
  },

  invite: async (
    supabase: SupabaseClient,
    data: TeamMemberFormData
  ): Promise<{ success: boolean }> => {
    const { error } = await supabase.auth.admin.inviteUserByEmail(data.email, {
      data: {
        full_name: data.full_name,
        role: data.role
      },
      redirectTo: `${env.app.url}/auth/callback?next=/update-password`
    })

    if (error) throw error

    return { success: true }
  }
}
