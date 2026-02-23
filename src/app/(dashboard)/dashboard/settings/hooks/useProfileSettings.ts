'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useProfileSettings() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()

      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')

        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()

        if (profile) {
          setFullName(profile.full_name || '')
        }
      }
      setLoading(false)
    }

    loadData()
  }, [])

  const updateProfile = async () => {
    if (!fullName.trim()) {
      toast.error('Nome não pode estar vazio')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/settings/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao atualizar perfil')
      }

      toast.success('Perfil atualizado com sucesso!')
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error('Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  return {
    fullName,
    setFullName,
    email,
    loading,
    saving,
    updateProfile
  }
}
