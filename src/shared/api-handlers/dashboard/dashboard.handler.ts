import { dateHelpers } from '@/lib/utils/date-helpers'
import { LeadStatus } from '@/shared/enums/LeadStatus'
import { SupabaseClient } from '@supabase/supabase-js'

export interface DashboardStats {
  totalLeads: number
  leadsToday: number
  leadsThisWeek: number
  leadsThisMonth: number
  activeLeads: number
  opportunities: number
  conversionRate: string
  activeValue: string
  totalValue: string
}

export interface ChartDataPoint {
  date: string
  leads: number
  sales: number
}

export const dashboardHandler = {
  getStats: async (
    supabase: SupabaseClient,
    averageTicket?: number | null
  ): Promise<DashboardStats> => {
    const ticketValue = averageTicket || 0
    const todayStart = dateHelpers.getTodayStart().toISOString()
    const weekStart = dateHelpers.getWeekStart().toISOString()
    const monthStart = dateHelpers.getMonthStart().toISOString()

    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
    const { count: leadsToday } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart)

    const { count: leadsThisWeek } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekStart)

    const { count: leadsThisMonth } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthStart)

    const { count: activeLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .not('status', 'in', '("lost","won","descartado","convertido")')

    const { count: wonLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .in('status', ['won', 'convertido'])

    const total = totalLeads || 0
    const won = wonLeads || 0
    const active = activeLeads || 0
    const rate = total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '0.0%'

    return {
      totalLeads: total,
      leadsToday: leadsToday || 0,
      leadsThisWeek: leadsThisWeek || 0,
      leadsThisMonth: leadsThisMonth || 0,
      activeLeads: active,
      opportunities: won,
      conversionRate: rate,
      activeValue: (active * ticketValue).toString(),
      totalValue: (total * ticketValue).toString()
    }
  },

  getChartData: async (supabase: SupabaseClient): Promise<ChartDataPoint[]> => {
    const { data } = await supabase
      .from('leads')
      .select('created_at, status')
      .order('created_at', { ascending: true })

    if (!data) return []

    const grouped = data.reduce(
      (acc, curr) => {
        const date = new Date(curr.created_at)
        const key = date.toLocaleDateString('pt-BR', { month: 'short' })

        if (!acc[key]) {
          acc[key] = { date: key, leads: 0, sales: 0 }
        }

        acc[key].leads += 1
        if (['won', 'convertido'].includes(curr.status)) {
          acc[key].sales += 1
        }

        return acc
      },
      {} as Record<string, ChartDataPoint>
    )

    return Object.values(grouped)
  },

  getRecentLeads: async (supabase: SupabaseClient, limit = 5) => {
    const { data } = await supabase
      .from('leads')
      .select('id, nome_completo, created_at, status')
      .order('created_at', { ascending: false })
      .limit(limit)

    return (data || []).map((lead) => ({
      id: lead.id,
      name: lead.nome_completo,
      date: lead.created_at,
      status: lead.status
    }))
  },

  getLeadsTimeline: async (
    supabase: SupabaseClient,
    days = 30
  ): Promise<{ date: string; count: number }[]> => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data } = await supabase
      .from('leads')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at')

    if (!data) return []

    const grouped = data.reduce(
      (acc, curr) => {
        const date = new Date(curr.created_at).toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return Object.entries(grouped)
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short'
        }),
        count
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'))
        const dateB = new Date(b.date.split('/').reverse().join('-'))
        return dateA.getTime() - dateB.getTime()
      })
  },

  archiveLead: async (supabase: SupabaseClient, leadId: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: LeadStatus.ARCHIVED })
      .eq('id', leadId)

    if (error) throw error
    return { success: true }
  },

  deleteLead: async (supabase: SupabaseClient, leadId: string) => {
    const { error } = await supabase.from('leads').delete().eq('id', leadId)

    if (error) throw error
    return { success: true }
  }
}
