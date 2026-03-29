import { teamMemberSchema } from '@/lib/zod/team.schema'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { NextResponse } from 'next/server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const validation = teamMemberSchema
      .pick({ full_name: true, role: true })
      .safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    const supabaseServer = await createClient()
    const {
      data: { user }
    } = await supabaseServer.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabaseAdmin = createAdminClient()

    const { data: requesterProfile } = await supabaseAdmin
      .from('profiles')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()

    if (!requesterProfile || requesterProfile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: targetProfile } = await supabaseAdmin
      .from('profiles')
      .select('role, tenant_id')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (
      !targetProfile ||
      targetProfile.tenant_id !== requesterProfile.tenant_id
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (validation.data.role !== 'admin' && targetProfile.role === 'admin') {
      const { count } = await supabaseAdmin
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', requesterProfile.tenant_id)
        .eq('role', 'admin')
        .is('deleted_at', null)

      if (count !== null && count <= 1) {
        return NextResponse.json(
          {
            error:
              'A operação não pode ser concluída pois a equipe deve ter no mínimo 1 administrador.'
          },
          { status: 400 }
        )
      }
    }

    await teamHandler.update(supabaseAdmin, id, validation.data)

    revalidatePath('/dashboard/team')
    revalidatePath('/dashboard/team/list')

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}
