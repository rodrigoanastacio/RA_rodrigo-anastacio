import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { teamService } from '@/shared/services/team/team.service'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { env } from '@/config/env'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
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
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    const tenantId = requesterProfile?.tenant_id

    if (!tenantId) {
      return NextResponse.json(
        { error: 'No tenant associated with user' },
        { status: 400 }
      )
    }

    const profiles = await teamHandler.list(supabaseAdmin, tenantId)

    const members = await teamService.enrichMembersWithAuthStatus(
      supabaseAdmin,
      profiles
    )

    return NextResponse.json(members)
  } catch (error: unknown) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()

    const supabaseServer = await createClient()
    const {
      data: { user }
    } = await supabaseServer.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    interface RequesterProfile {
      role: string | null
      tenant_id: string | null
    }

    const { data: requesterProfile } = (await supabase
      .from('profiles')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()) as { data: RequesterProfile | null }

    if (!requesterProfile || requesterProfile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const rawBody = await request.json()

    const { teamMemberSchema } = await import('@/lib/zod/team/team-member.schema')
    const parsedBody = teamMemberSchema.safeParse(rawBody)

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.flatten() }, { status: 400 })
    }

    const body = parsedBody.data

    const { data: authData, error: authError } =
      await supabase.auth.admin.inviteUserByEmail(body.email, {
        data: {
          full_name: body.full_name
        },
        redirectTo: `${env.app.url}/auth/callback?next=/update-password`
      })

    if (authError) throw authError

    if (!authData.user) throw new Error('Failed to create user')

    const { error: profileError } = await supabase.from('profiles').upsert({
      id: authData.user.id,
      full_name: body.full_name,
      email: body.email,
      role: body.role || 'editor',
      tenant_id: requesterProfile.tenant_id
    })

    if (profileError) {
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    revalidatePath('/dashboard/team')
    revalidatePath('/dashboard/team/list')
    return NextResponse.json({ success: true, user: authData.user })
  } catch (error: unknown) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create team member'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient()

    const supabaseServer = await createClient()
    const {
      data: { user }
    } = await supabaseServer.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: requesterProfile } = await supabase
      .from('profiles')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()

    if (!requesterProfile || requesterProfile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: targetProfile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', id)
      .single()

    if (!targetProfile || targetProfile.tenant_id !== requesterProfile.tenant_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await teamHandler.delete(supabase, id)

    const { error: banError } = await supabase.auth.admin.updateUserById(id, {
      ban_duration: '876000h' // ~100 years
    })

    if (banError) throw banError

    revalidatePath('/dashboard/team')
    revalidatePath('/dashboard/team/list')

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
