import { LeadsTimelineChart } from '@/components/dashboard/LeadsTimelineChart'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { RecentLeads } from '@/components/dashboard/RecentLeads'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { dashboardService } from '@/shared/services/dashboard/dashboard.service'
import { Star, Target, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const { stats, chartData, recentLeads, timelineData } =
    await dashboardService.getOverview()

  const dateString = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        title="Visão Geral"
        description={`Acompanhe os principais indicadores de hoje, ${dateString}.`}
      />

      <Summary>
        <StatCard
          label="Total de Leads"
          value={stats.totalLeads}
          icon={Users}
          trend={{ value: 'Base total', direction: 'neutral' }}
        />
        <StatCard
          label="Em Negociação"
          value={stats.activeLeads}
          icon={Target}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-50"
          trend={{ value: 'Ativos no funil', direction: 'neutral' }}
        />
        <StatCard
          label="Vendas Realizadas"
          value={stats.opportunities}
          icon={Star}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50"
          trend={{ value: `${stats.conversionRate} conv.`, direction: 'up' }}
        />
        <StatCard
          label="Leads Este Mês"
          value={stats.leadsThisMonth}
          icon={Users}
          iconColor="text-purple-500"
          iconBg="bg-purple-50"
          trend={{ value: `${stats.leadsToday} hoje`, direction: 'neutral' }}
        />
      </Summary>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>

        <div className="h-full min-h-[300px]">
          <RecentLeads leads={recentLeads} />
        </div>
      </div>

      <div className="w-full">
        <LeadsTimelineChart data={timelineData} />
      </div>
    </div>
  )
}
