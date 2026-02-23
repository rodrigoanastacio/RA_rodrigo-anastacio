import { createClient } from '@/lib/supabase/server'
import { userHandler } from '@/shared/api-handlers/user/user.handler'
import { teamService } from '@/shared/services/team/team.service'
import { redirect } from 'next/navigation'
import { TeamManager } from '../components/TeamManager'

export default async function TeamPage() {
  const supabaseAuth = await createClient()
  const currentUser = await userHandler.getMe(supabaseAuth)

  if (currentUser?.role !== 'admin' || !currentUser?.tenant_id) {
    redirect('/dashboard')
  }

  const rows = await teamService.listTeamMembers(currentUser.tenant_id)

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <TeamManager rows={rows} tenantId={currentUser.tenant_id} />
    </section>
  )
}
