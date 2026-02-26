'use client'

import { updateLeadStatus } from '@/app/(dashboard)/dashboard/leads/actions/updateLeadStatus'
import {
  formatAtuacao,
  formatLeadStatus,
  formatRevenue,
  getLeadStatusStyle
} from '@/shared/constants/lead.constants'
import { Lead } from '@/shared/entities/leads/lead.types'
import { useState } from 'react'

export function useLeads(initialLeads: Lead[] = []) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedLead(null)
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status })
    }

    const restoreLeads = [...leads]

    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))

    const result = await updateLeadStatus(id, status)

    if (!result.success) {
      setLeads(restoreLeads)
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(selectedLead)
      }
      console.error('Failed to update status')
    }
  }

  return {
    leads,
    selectedLead,
    isDrawerOpen,
    handleLeadClick,
    handleCloseDrawer,
    handleUpdateStatus,
    formatAtuacao,
    formatRevenue,
    formatLeadStatus,
    getLeadStatusStyle
  }
}
