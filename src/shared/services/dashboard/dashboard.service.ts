import { createClient } from '@/lib/supabase/server'
import { dashboardHandler } from '@/shared/api-handlers/dashboard/dashboard.handler'
import { userHandler } from '@/shared/api-handlers/user/user.handler'

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

    const userData = await userHandler.getMe(supabase)
    const averageTicket = userData?.average_ticket || 0

    const [stats, chartData, recentLeads, timelineData] = await Promise.all([
      dashboardHandler.getStats(supabase, averageTicket),
      dashboardHandler.getChartData(supabase),
      dashboardHandler.getRecentLeads(supabase),
      dashboardHandler.getLeadsTimeline(supabase, 30)
    ])

    return { stats, chartData, recentLeads, timelineData }
  }
}
