import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100)
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { fullName } = profileSchema.parse(body)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Erro ao atualizar perfil' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, fullName })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Erro de validação' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
