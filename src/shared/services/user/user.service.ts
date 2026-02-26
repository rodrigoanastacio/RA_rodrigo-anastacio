import { createClient } from '@/lib/supabase/server'
import { userHandler } from '@/shared/api-handlers/user/user.handler'

export const userService = {
  getProfile: async () => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) return null

    return userHandler.getMe(supabase)
  },

  updateProfile: async (data: {
    fullName: string
    businessName?: string
    businessSlogan?: string
    whatsappNumber?: string
    averageTicket?: number | null
  }) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    return userHandler.updateProfile(supabase, authUser.user.id, data)
  },

  uploadAvatar: async (file: File) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/webp'
    ]
    if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type')
    if (file.size > 2 * 1024 * 1024)
      throw new Error('File too large. Maximum size is 2MB.')

    const profile = await userHandler.getMe(supabase)
    if (!profile || !profile.tenant_id) throw new Error('Tenant not found')

    return userHandler.uploadAvatar(
      supabase,
      profile.tenant_id,
      authUser.user.id,
      file
    )
  },

  removeAvatar: async () => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const profile = await userHandler.getMe(supabase)
    if (!profile || !profile.tenant_id) throw new Error('Tenant not found')

    return userHandler.removeAvatar(
      supabase,
      profile.tenant_id,
      authUser.user.id
    )
  }
}
