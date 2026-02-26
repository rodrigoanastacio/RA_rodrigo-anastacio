'use client'

import { Lead } from '@/shared/entities/leads/lead.types'
import { Kanban, List } from 'lucide-react'
import { useState } from 'react'
import { useLeads } from '../hooks/useLeads'
import { KanbanBoard } from './KanbanBoard'
import { LeadDetailsDrawer } from './LeadDetailsDrawer'
import { LeadsListTable } from './LeadsListTable'

interface LeadsClientViewProps {
  initialLeads: Lead[]
}

export function LeadsClientView({ initialLeads }: LeadsClientViewProps) {
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')

  const {
    leads,
    selectedLead,
    isDrawerOpen,
    handleLeadClick,
    handleCloseDrawer,
    handleUpdateStatus
  } = useLeads(initialLeads)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end bg-white border border-gray-100 p-1 rounded-lg w-max ml-auto shadow-sm">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
            viewMode === 'list'
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <List className="w-4 h-4" />
          Tabela
        </button>
        <button
          onClick={() => setViewMode('board')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
            viewMode === 'board'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Kanban className="w-4 h-4" />
          Pipeline
        </button>
      </div>

      {viewMode === 'board' ? (
        <KanbanBoard
          initialLeads={leads}
          onUpdateStatus={handleUpdateStatus}
          onLeadClick={handleLeadClick}
        />
      ) : (
        <LeadsListTable leads={leads} onLeadClick={handleLeadClick} />
      )}

      {selectedLead && (
        <LeadDetailsDrawer
          lead={selectedLead}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}
