import { TeamMemberResponse } from '@/lib/zod/team.schema'
import { TeamMember } from '@/shared/entities/team/team-member.entity'
import { SupabaseClient } from '@supabase/supabase-js'

export const teamService = {
  enrichMembersWithAuthStatus: async (
    supabase: SupabaseClient,
    members: TeamMemberResponse[]
  ): Promise<TeamMemberResponse[]> => {
    const enrichPromises = members.map(async (member) => {
      try {
        const { data: authUser, error } = await supabase.auth.admin.getUserById(
          member.id
        )
        if (error) {
          return { ...member, email_confirmed_at: null }
        }

        return {
          ...member,
          email_confirmed_at: authUser.user.email_confirmed_at || null
        }
      } catch {
        return { ...member, email_confirmed_at: null }
      }
    })

    return Promise.all(enrichPromises)
  },

  getMembersWithStatus: async (
    supabase: SupabaseClient,
    profiles: TeamMemberResponse[]
  ): Promise<TeamMember[]> => {
    const enrichedProfiles = await teamService.enrichMembersWithAuthStatus(
      supabase,
      profiles
    )

    return enrichedProfiles.map((profile) => new TeamMember(profile))
  },

  listTeamMembers: async (tenantId: string) => {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const { teamHandler } =
      await import('@/shared/api-handlers/team/team.handler')

    const supabaseAdmin = createAdminClient()

    const profilesData = await teamHandler.list(supabaseAdmin, tenantId)

    const members = await teamService.getMembersWithStatus(
      supabaseAdmin,
      profilesData
    )

    return members.map((m) => m.toPlainObj())
  }
}
