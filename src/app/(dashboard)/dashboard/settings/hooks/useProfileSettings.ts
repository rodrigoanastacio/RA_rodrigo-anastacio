'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { removeAvatarAction, uploadAvatarAction } from '../actions'

export function useProfileSettings() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

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
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single()

        if (profile) {
          setFullName(profile.full_name || '')
          setAvatarUrl(profile.avatar_url || null)
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 2MB.')
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)

    setUploadingAvatar(true)

    const localPreviewUrl = URL.createObjectURL(file)
    setAvatarUrl(localPreviewUrl)

    try {
      const result = await uploadAvatarAction(formData)
      if (result.success && result.avatarUrl) {
        setAvatarUrl(result.avatarUrl)
        toast.success('Foto atualizada com sucesso!')
        router.refresh()
      } else {
        throw new Error(result.message || 'Erro no upload')
      }
    } catch (err) {
      console.error(err)
      toast.error('Falha ao atualizar a foto')
      setAvatarUrl(null)
    } finally {
      setUploadingAvatar(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeAvatar = async () => {
    setUploadingAvatar(true)
    const previousAvatarUrl = avatarUrl
    setAvatarUrl(null)

    try {
      const result = await removeAvatarAction()
      if (result.success) {
        toast.success('Foto removida com sucesso!')
        router.refresh()
      } else {
        throw new Error(result.message || 'Erro ao remover foto')
      }
    } catch (err) {
      console.error(err)
      toast.error('Falha ao remover a foto')
      setAvatarUrl(previousAvatarUrl)
    } finally {
      setUploadingAvatar(false)
    }
  }

  return {
    fullName,
    setFullName,
    email,
    avatarUrl,
    loading,
    saving,
    uploadingAvatar,
    fileInputRef,
    updateProfile,
    handleAvatarChange,
    removeAvatar
  }
}
