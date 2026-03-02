import { env } from '@/config/env'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { refreshTeamList } from '../actions'
import { TeamMemberRow } from '../types'

export function useTeamManager(
  initialTeamMembers: TeamMemberRow[],
  tenantId: string
) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMemberRow | null>(
    null
  )

  const supabase = useMemo(
    () => createBrowserClient(env.supabase.url, env.supabase.anonKey),
    []
  )

  useEffect(() => {
    setTeamMembers(initialTeamMembers)
  }, [initialTeamMembers])

  useEffect(() => {
    if (!tenantId) return

    const channel = supabase
      .channel(`team_changes_${tenantId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `tenant_id=eq.${tenantId}`
        },
        async () => {
          const updatedMembers = await refreshTeamList()
          if (updatedMembers) {
            setTeamMembers(updatedMembers)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, tenantId])

  const actions = {
    openNewMember: () => {
      setSelectedMember(null)
      setIsDrawerOpen(true)
    },

    openEditMember: (member: TeamMemberRow) => {
      setSelectedMember(member)
      setIsDrawerOpen(true)
    },

    closeDrawer: () => {
      setIsDrawerOpen(false)
      setSelectedMember(null)
    },

    deleteMember: async (id: string) => {
      try {
        await fetch(`/api/team?id=${id}`, { method: 'DELETE' })
        const updatedMembers = await refreshTeamList()
        setTeamMembers(updatedMembers)
        toast.success('Membro excluído com sucesso')
      } catch (error) {
        toast.error('Erro ao excluir membro')
        console.error(error)
      }
    }
  }

  return {
    teamMembers,
    isDrawerOpen,
    selectedMember,
    actions
  }
}
