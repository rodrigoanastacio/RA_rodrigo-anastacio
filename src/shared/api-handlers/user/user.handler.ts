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
  },

  uploadAvatar: async (
    supabase: SupabaseClient,
    tenantId: string,
    userId: string,
    file: File
  ) => {
    const fileExt = file.type.split('/')[1]
    const fileName = `${tenantId}/avatars/${userId}.${fileExt}`

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

    const cacheBuster = Date.now()
    const publicUrl = `${urlData.publicUrl}?v=${cacheBuster}`

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)
      .select()
      .single()

    if (updateError) throw updateError

    return publicUrl
  },

  removeAvatar: async (
    supabase: SupabaseClient,
    tenantId: string,
    userId: string
  ) => {
    const folderPath = `${tenantId}/avatars`
    const { data: files, error: listError } = await supabase.storage
      .from('tenant-assets')
      .list(folderPath)

    if (listError) throw listError

    if (files && files.length > 0) {
      const userFiles = files.filter((f) => f.name.startsWith(userId))
      if (userFiles.length > 0) {
        const pathsToDelete = userFiles.map((f) => `${folderPath}/${f.name}`)
        const { error: deleteError } = await supabase.storage
          .from('tenant-assets')
          .remove(pathsToDelete)

        if (deleteError) throw deleteError
      }
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', userId)

    if (updateError) throw updateError

    return { success: true }
  }
}
