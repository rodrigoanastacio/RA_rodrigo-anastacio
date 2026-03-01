import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[Auth Callback] Exchange error:', error.message)
      return NextResponse.redirect(
        `${origin}/login?error=auth-code-error&message=${encodeURIComponent(error.message)}`
      )
    }

    const redirectUrl = new URL(next, origin)
    return NextResponse.redirect(redirectUrl.toString())
  }
  return NextResponse.redirect(`${origin}/login?error=no-code`)
}
