import { createClient } from '@/lib/supabase/server'
import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'

export const leadsService = {
  getLeadsSummary: async () => {
    const supabase = await createClient()

    const { leads, total } = await leadsHandler.list(supabase, {
      page: 1,
      perPage: 50,
      orderBy: 'created_at',
      orderDirection: 'desc'
    })

    const highPotentialCount = leads.filter(
      (lead) => 'is_high_potential' in lead && (lead as any).is_high_potential
    ).length

    return {
      leads,
      total,
      highPotentialCount
    }
  }
}
