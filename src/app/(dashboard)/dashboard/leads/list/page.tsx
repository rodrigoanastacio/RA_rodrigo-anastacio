import { leadsService } from '@/shared/services/leads/leads.service'
import { LeadsClientView } from '../components/LeadsClientView'
import { LeadsHeader } from '../components/LeadsHeader'
import { LeadsStats } from '../components/LeadsStats'

export default async function LeadsListPage() {
  const { leads, total, highPotentialCount } =
    await leadsService.getLeadsSummary()

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <LeadsHeader totalLeads={total} highPotentialCount={highPotentialCount} />

      <LeadsStats totalLeads={total} highPotentialLeads={highPotentialCount} />

      <LeadsClientView initialLeads={leads} />
    </section>
  )
}
