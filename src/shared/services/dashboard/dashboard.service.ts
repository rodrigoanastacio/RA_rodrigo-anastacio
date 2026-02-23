import { createClient } from '@/lib/supabase/server'
import { dashboardHandler } from '@/shared/api-handlers/dashboard/dashboard.handler'

export const dashboardService = {
  getOverview: async () => {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    const [stats, chartData, recentLeads, timelineData] = await Promise.all([
      dashboardHandler.getStats(supabase),
      dashboardHandler.getChartData(supabase),
      dashboardHandler.getRecentLeads(supabase),
      dashboardHandler.getLeadsTimeline(supabase, 30)
    ])

    return { stats, chartData, recentLeads, timelineData }
  }
}
