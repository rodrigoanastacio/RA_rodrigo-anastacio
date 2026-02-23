import { createClient } from '@/lib/supabase/server'
import { userHandler } from '@/shared/api-handlers/user/user.handler'

export const userService = {
  getProfile: async () => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) return null

    return userHandler.getMe(supabase)
  },

  updateProfile: async (fullName: string) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    return userHandler.updateProfile(supabase, authUser.user.id, fullName)
  }
}
