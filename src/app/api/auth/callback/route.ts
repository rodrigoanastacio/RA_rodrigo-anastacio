import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const nextPath = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        `${origin}/login?error=auth-code-error&message=${encodeURIComponent(error.message)}`
      )
    }

    const redirectUrl = new URL(nextPath, origin)
    return NextResponse.redirect(redirectUrl.toString())
  }

  const errorDescription =
    searchParams.get('error_description') || searchParams.get('error')
  if (errorDescription) {
    return NextResponse.redirect(
      `${origin}/login?error=supa-error&message=${encodeURIComponent(errorDescription)}`
    )
  }

  return NextResponse.redirect(`${origin}${nextPath}`)
}
