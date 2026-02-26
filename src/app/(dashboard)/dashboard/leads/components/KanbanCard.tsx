'use client'

import { Badge } from '@/components/ui/badge'
import { getLeadStatusStyle } from '@/shared/constants/lead.constants'
import { Lead } from '@/shared/entities/leads/lead.types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, GripVertical } from 'lucide-react'

interface KanbanCardProps {
  lead: Lead
  onClick?: (lead: Lead) => void
}

export function KanbanCard({ lead, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: lead.id,
    data: {
      type: 'Lead',
      lead
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1
  }

  const timeAgo = lead.created_at
    ? formatDistanceToNow(new Date(lead.created_at), {
        addSuffix: true,
        locale: ptBR
      })
    : ''

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white border border-gray-100 shadow-sm rounded-lg p-3 group cursor-pointer hover:shadow-md transition-shadow ${
        isDragging ? 'ring-2 ring-emerald-500 z-50' : ''
      }`}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest('.drag-handle')) return
        if (onClick) onClick(lead)
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="truncate pr-4 flex-1">
          <p
            className="text-sm font-bold text-gray-900 truncate"
            title={lead.nome_completo}
          >
            {lead.nome_completo}
          </p>
          <p className="text-[10px] text-gray-500 truncate" title={lead.email}>
            {lead.email}
          </p>
        </div>

        <button
          className="drag-handle p-1 text-gray-300 hover:text-gray-500 transition-colors cursor-grab active:cursor-grabbing shrink-0"
          {...attributes}
          {...listeners}
          aria-label="Drag lead"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between mt-3">
        <Badge
          className={`text-[9px] px-1.5 py-0 rounded uppercase tracking-wider font-extrabold ${getLeadStatusStyle(lead.status)}`}
        >
          {lead.status.replace('_', ' ')}
        </Badge>

        {timeAgo && (
          <div className="flex items-center gap-1 text-[9px] text-gray-400 font-medium">
            <Clock className="w-3 h-3" />
            <span className="truncate max-w-[70px]" title={timeAgo}>
              {timeAgo}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
