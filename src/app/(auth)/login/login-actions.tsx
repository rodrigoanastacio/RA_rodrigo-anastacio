'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { mapErrorMessage } from '@/lib/utils/error-mapper'

export async function loginAction(data: { email: string; password: string }) {
  const supabase = await createClient()
  const { email, password } = data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return { error: mapErrorMessage(error) }
  }

  redirect('/dashboard')
}
