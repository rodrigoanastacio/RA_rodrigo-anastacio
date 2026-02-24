'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useLeadActions() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const archiveLead = async (leadId: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/dashboard/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'archive' })
      })

      if (!res.ok) throw new Error('Failed to archive lead')

      router.refresh()
      return { success: true }
    } catch (error) {
      console.error('Archive lead error:', error)
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteLead = async (leadId: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/dashboard/leads/${leadId}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete lead')

      router.refresh()
      return { success: true }
    } catch (error) {
      console.error('Delete lead error:', error)
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    archiveLead,
    deleteLead,
    isLoading
  }
}
