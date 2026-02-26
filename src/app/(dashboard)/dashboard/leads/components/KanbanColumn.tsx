'use client'

import {
  getLeadStatusStyle,
  LEAD_STATUS_LABELS
} from '@/shared/constants/lead.constants'
import { Lead } from '@/shared/entities/leads/lead.types'
import { LeadStatus } from '@/shared/enums/LeadStatus'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { KanbanCard } from './KanbanCard'

interface KanbanColumnProps {
  status: LeadStatus
  leads: Lead[]
  onLeadClick?: (lead: Lead) => void
}

export function KanbanColumn({
  status,
  leads,
  onLeadClick
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      type: 'Column',
      status
    }
  })

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col w-72 shrink-0 h-full bg-gray-50/70 border border-gray-200 rounded-lg overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10 shrink-0">
        <h3 className="text-sm font-extrabold text-gray-900 tracking-tight uppercase">
          {LEAD_STATUS_LABELS[status] || status}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getLeadStatusStyle(status)}`}
        >
          {leads.length}
        </span>
      </div>

      <div className="p-3 flex-1 overflow-y-auto overflow-x-hidden min-h-[150px] scrollbar-thin scrollbar-thumb-gray-300">
        <div className="flex flex-col gap-3 pb-8 min-h-full">
          <SortableContext
            items={leads.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {leads.map((lead) => (
              <KanbanCard key={lead.id} lead={lead} onClick={onLeadClick} />
            ))}
          </SortableContext>
          {leads.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-xs text-gray-400 font-medium">Nenhum lead</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
