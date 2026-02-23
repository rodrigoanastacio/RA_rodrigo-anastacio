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

  const handleUpdateStatus = async (status: string) => {
    if (!selectedLead) return

    const updatedLead = { ...selectedLead, status }
    setSelectedLead(updatedLead)

    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    )

    const result = await updateLeadStatus(selectedLead.id, status)

    if (!result.success) {
      setSelectedLead(selectedLead)
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? selectedLead : l))
      )
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
