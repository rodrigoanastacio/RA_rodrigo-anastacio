'use client'

import { Lead } from '@/shared/entities/leads/lead.types'
import { LeadStatus } from '@/shared/enums/LeadStatus'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'

interface KanbanBoardProps {
  initialLeads: Lead[]
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>
  onLeadClick: (lead: Lead) => void
}

const BOARD_COLUMNS = [
  LeadStatus.NOVO_LEAD,
  LeadStatus.EM_CONTATO,
  LeadStatus.QUALIFICADO,
  LeadStatus.PROPOSTA,
  LeadStatus.WON,
  LeadStatus.LOST
]

export function KanbanBoard({
  initialLeads,
  onUpdateStatus,
  onLeadClick
}: KanbanBoardProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [activeLead, setActiveLead] = useState<Lead | null>(null)

  useEffect(() => {
    setLeads(initialLeads)
  }, [initialLeads])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const lead = leads.find((l) => l.id === active.id)
    if (lead) setActiveLead(lead)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const activeLead = leads.find((l) => l.id === activeId)
    const overLead = leads.find((l) => l.id === overId)

    if (!activeLead) return

    const activeContainer = activeLead.status
    const overContainer = overLead ? overLead.status : (over.id as string)

    if (activeContainer === overContainer) return

    setLeads((prev) => {
      const newLeads = [...prev]
      const leadIndex = newLeads.findIndex((l) => l.id === activeId)

      newLeads[leadIndex] = { ...newLeads[leadIndex], status: overContainer }
      return newLeads
    })
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveLead(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeLead = leads.find((l) => l.id === activeId)
    if (!activeLead) return

    const activeContainer = activeLead.status
    let overContainer = ''

    const overLead = leads.find((l) => l.id === overId)
    if (overLead) {
      overContainer = overLead.status
    } else {
      overContainer = overId
    }

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) {
      const activeIndex = leads.findIndex((l) => l.id === activeId)
      const overIndex = leads.findIndex((l) => l.id === overId)

      if (activeIndex !== overIndex) {
        setLeads((prev) => arrayMove(prev, activeIndex, overIndex))
      }
    }

    const originalLead = initialLeads.find((l) => l.id === activeId)
    if (originalLead && originalLead.status !== activeContainer) {
      try {
        await onUpdateStatus(activeId, activeContainer)
      } catch (error) {
        console.error('Failed to persist drag drop', error)
        setLeads(initialLeads)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 h-full min-h-[500px]">
        {BOARD_COLUMNS.map((columnStatus) => (
          <KanbanColumn
            key={columnStatus}
            status={columnStatus}
            leads={leads.filter((l) => l.status === columnStatus)}
            onLeadClick={onLeadClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? (
          <div className="w-72 -rotate-2 scale-105 opacity-90 transition-transform">
            <KanbanCard lead={activeLead} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
