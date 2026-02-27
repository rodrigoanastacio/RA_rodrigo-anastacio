import { PageHeader } from '@/components/dashboard/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { currencyHelpers } from '@/lib/utils/currency-helpers'
import { dashboardService } from '@/shared/services/dashboard/dashboard.service'
import { Banknote, Star, Wallet } from 'lucide-react'
import { LeadsTimelineChart } from './components/LeadsTimelineChart'
import { RecentLeads } from './components/RecentLeads'
import { RevenueChart } from './components/RevenueChart'

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
          label="Valor Total do Funil"
          value={currencyHelpers.format(stats.totalValue)}
          icon={Banknote}
          iconColor="text-blue-500"
          iconBg="bg-blue-50"
          trend={{ value: 'Potencial total', direction: 'neutral' }}
        />
        <StatCard
          label="Valor em Negociação"
          value={currencyHelpers.format(stats.activeValue)}
          icon={Wallet}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-50"
          trend={{ value: `${stats.activeLeads} ativos`, direction: 'neutral' }}
        />
        <StatCard
          label="Vendas Realizadas"
          value={stats.opportunities}
          icon={Star}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50"
          trend={{ value: `${stats.conversionRate} conv.`, direction: 'up' }}
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
