'use client'

import { createClient } from '@/lib/supabase/client'
import { currencyHelpers } from '@/lib/utils/currency-helpers'
import { maskHelpers } from '@/lib/utils/mask-helpers'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  removeAvatarAction,
  updateProfileAction,
  uploadAvatarAction
} from '../actions'

export function useProfileSettings() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const [businessName, setBusinessName] = useState('')
  const [businessSlogan, setBusinessSlogan] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [averageTicket, setAverageTicket] = useState('')

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
          .select(
            'full_name, avatar_url, business_name, business_slogan, whatsapp_number, average_ticket'
          )
          .eq('id', user.id)
          .single()

        if (profile) {
          setFullName(profile.full_name || '')
          setAvatarUrl(profile.avatar_url || null)
          setBusinessName(profile.business_name || '')
          setBusinessSlogan(profile.business_slogan || '')
          setWhatsappNumber(
            profile.whatsapp_number
              ? maskHelpers.phone(profile.whatsapp_number)
              : ''
          )
          setAverageTicket(
            profile.average_ticket
              ? currencyHelpers.formatInput(
                  String(profile.average_ticket * 100)
                )
              : ''
          )
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
      let ticketNum: number | null = null
      if (averageTicket) {
        ticketNum = currencyHelpers.parse(averageTicket)
      }

      const result = await updateProfileAction({
        fullName,
        businessName,
        businessSlogan,
        whatsappNumber: maskHelpers.unmask(whatsappNumber),
        averageTicket: ticketNum
      })

      if (!result.success) {
        throw new Error(result.message || 'Erro ao atualizar perfil')
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

  const handleWhatsappChange = (value: string) => {
    setWhatsappNumber(maskHelpers.phone(value))
  }

  const handleTicketChange = (value: string) => {
    setAverageTicket(currencyHelpers.formatInput(value))
  }

  return {
    fullName,
    setFullName,
    businessName,
    setBusinessName,
    businessSlogan,
    setBusinessSlogan,
    whatsappNumber,
    setWhatsappNumber: handleWhatsappChange,
    averageTicket,
    setAverageTicket: handleTicketChange,
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
