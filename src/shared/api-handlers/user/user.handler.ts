import { SupabaseClient } from '@supabase/supabase-js'

export interface UserProfileResponse {
  name: string
  email: string
  avatar_url?: string
  role?: string
  tenant_id?: string
}

export const userHandler = {
  getMe: async (
    supabase: SupabaseClient
  ): Promise<UserProfileResponse | null> => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role, avatar_url, tenant_id')
      .eq('id', user.id)
      .single()

    return {
      name:
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.name,
      email: user.email || '',
      avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
      role: profile?.role,
      tenant_id: profile?.tenant_id || user.user_metadata?.tenant_id
    }
  },

  updateProfile: async (
    supabase: SupabaseClient,
    id: string,
    fullName: string
  ) => {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', id)

    if (error) throw error
    return true
  }
}
