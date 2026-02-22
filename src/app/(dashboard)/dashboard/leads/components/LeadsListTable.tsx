'use client'

import InteractiveTable, {
  type Column
} from '@/components/dashboard/InteractiveTable'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Lead } from '@/shared/entities/leads/lead.types'
import { useLeads } from '../hooks/useLeads'
import { LeadDetailsDrawer } from './LeadDetailsDrawer'

interface LeadsListTableProps {
  initialLeads?: Lead[]
}

export function LeadsListTable({ initialLeads = [] }: LeadsListTableProps) {
  const {
    leads,
    selectedLead,
    isDrawerOpen,
    handleLeadClick,
    handleCloseDrawer,
    handleUpdateStatus,
    formatLeadStatus,
    getLeadStatusStyle
  } = useLeads(initialLeads)

  const columns: Column<Lead>[] = [
    {
      key: 'nome_completo',
      label: 'Nome do Lead',
      sortable: true,
      render: (lead) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-gray-900 text-[15px]">
            {lead.nome_completo}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {lead.email}
          </span>
        </div>
      )
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      render: (lead) => (
        <span className="text-sm font-bold text-gray-700">
          {lead.whatsapp || '-'}
        </span>
      )
    },
    {
      key: 'origem',
      label: 'Origem',
      render: (lead: Lead) => {
        let source = 'Direto'

        if (lead.utm_source) {
          source = lead.utm_source
        } else if (lead.referrer) {
          try {
            source = new URL(lead.referrer).hostname.replace('www.', '')
          } catch {
            source = 'Referrer'
          }
        }

        return (
          <Badge
            variant="outline"
            className="text-[10px] font-bold text-gray-500 bg-gray-50 border-gray-200 truncate max-w-[120px]"
            title={source}
          >
            {source}
          </Badge>
        )
      }
    },
    {
      key: 'created_at',
      label: 'Data',
      sortable: false,
      render: (lead) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-gray-500">
            {new Date(lead.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short'
            })}
          </span>
          <span className="text-[11px] font-medium text-gray-400 uppercase">
            {new Date(lead.created_at).getFullYear()}
          </span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (lead) => (
        <Badge
          className={cn(
            'border-0 shadow-none font-extrabold text-[10px] tracking-widest px-4 py-1.5 rounded-lg',
            getLeadStatusStyle(lead.status)
          )}
        >
          {formatLeadStatus(lead.status)}
        </Badge>
      )
    }
  ]

  return (
    <>
      <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.01)] border border-gray-50 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white">
          <h2 className="text-[16px] font-extrabold text-gray-900 uppercase tracking-wider">
            Gestão de Leads
          </h2>
          <div className="flex items-center gap-6">
            <button className="text-[12px] font-bold text-gray-400 hover:text-gray-900 tracking-widest uppercase transition-colors">
              Exportar
            </button>
            <button className="text-[12px] font-extrabold text-blue-600 hover:text-blue-700 tracking-widest uppercase transition-colors">
              Filtros
            </button>
          </div>
        </div>

        <InteractiveTable<Lead>
          columns={columns}
          rows={leads}
          pagination
          rowsPerPageOptions={[10, 20, 50]}
          initialsKey="nome_completo"
          onRowClick={handleLeadClick}
        />
      </div>

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onUpdateStatus={handleUpdateStatus}
      />
    </>
  )
}
