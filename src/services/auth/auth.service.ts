import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { LoginInput } from '@/lib/zod/auth.schema'

export const authService = {
  signIn: async (data: LoginInput) => {
    const supabase =
      typeof window === 'undefined'
        ? await (await import('@/lib/supabase/server')).createClient()
        : createBrowserClient()

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      throw error
    }

    return authData
  },

  signOut: async () => {
    const supabase =
      typeof window === 'undefined'
        ? await (await import('@/lib/supabase/server')).createClient()
        : createBrowserClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getSession: async () => {
    const supabase =
      typeof window === 'undefined'
        ? await (await import('@/lib/supabase/server')).createClient()
        : createBrowserClient()
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  getUser: async () => {
    const supabase =
      typeof window === 'undefined'
        ? await (await import('@/lib/supabase/server')).createClient()
        : createBrowserClient()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  resetPasswordForEmail: async (email: string, origin?: string) => {
    const supabase =
      typeof window === 'undefined'
        ? await (await import('@/lib/supabase/server')).createClient()
        : createBrowserClient()

    const callbackUrl = `${origin || (typeof window !== 'undefined' ? window.location.origin : '')}/api/auth/callback`
    const redirectTo = `${callbackUrl}?next=/update-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    })

    if (error) throw error
  },

  updatePassword: async (password: string) => {
    const supabase =
      typeof window === 'undefined'
        ? await (await import('@/lib/supabase/server')).createClient()
        : createBrowserClient()

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) throw error
  }
}
