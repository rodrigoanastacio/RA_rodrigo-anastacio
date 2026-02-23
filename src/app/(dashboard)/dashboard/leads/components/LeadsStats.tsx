'use client'

import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { BarChart3, Star, Users } from 'lucide-react'

interface LeadsStatsProps {
  totalLeads: number
  highPotentialLeads: number
  conversionRate?: string
}

export function LeadsStats({
  totalLeads,
  highPotentialLeads,
  conversionRate = '0%'
}: LeadsStatsProps) {
  return (
    <Summary>
      <StatCard
        label="Total de Leads"
        value={totalLeads.toLocaleString('pt-BR')}
        icon={Users}
      />

      <StatCard
        label="Leads P0 (Alto Potencial)"
        value={highPotentialLeads.toString()}
        icon={Star}
        iconColor="text-gray-200 fill-gray-100"
      />

      <StatCard
        label="Taxa de Conversão"
        value={conversionRate}
        icon={BarChart3}
      />
    </Summary>
  )
}
