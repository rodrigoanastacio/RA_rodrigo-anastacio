'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { teamService } from '@/shared/services/team/team.service'
import { TeamMemberRow } from './types'

import { createClient } from '@/lib/supabase/server'

export async function refreshTeamList(): Promise<TeamMemberRow[]> {
  const supabaseAdmin = createAdminClient()
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()
  const tenantId = user?.user_metadata?.tenant_id

  if (!tenantId) {
    console.error('refreshTeamList: No tenant_id found for user')
    return []
  }

  const profiles = await teamHandler.list(supabaseAdmin, tenantId)

  const members = await teamService.getMembersWithStatus(supabase, profiles)

  return members.map((m) => m.toPlainObj())
}
