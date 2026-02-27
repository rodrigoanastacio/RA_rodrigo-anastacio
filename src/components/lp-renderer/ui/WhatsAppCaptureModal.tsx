'use client'

import { DynamicForm } from '@/components/forms/dynamic-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { maskHelpers } from '@/lib/utils/mask-helpers'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface WhatsAppCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  formId: string | null
  landingPageId?: string | null
  tenantId?: string
  whatsappNumber: string
  whatsappFormId?: string
  whatsappForm?: import('@/components/forms/types').FormSchema
}

export function WhatsAppCaptureModal({
  isOpen,
  onClose,
  formId,
  landingPageId,
  tenantId,
  whatsappNumber,
  whatsappFormId,
  whatsappForm
}: WhatsAppCaptureModalProps) {
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleOpenWhatsApp = () => {
    try {
      if (!whatsappNumber) {
        throw new Error('Número de WhatsApp não configurado.')
      }

      const cleanTargetNumber = whatsappNumber.replace(/\D/g, '')
      let waLink = `https://wa.me/${cleanTargetNumber}`
      // Opcional: Adicionar mensagem pré-definida
      // waLink += `?text=${encodeURIComponent('Olá, gostaria de mais informações.')}`

      // Abre em nova aba
      window.open(waLink, '_blank', 'noopener,noreferrer')
      onClose()
      setNome('')
      setWhatsapp('')
    } catch (err) {
      console.error('Erro ao abrir WhatsApp:', err)
      setError('Ocorreu um erro ao redirecionar para o WhatsApp.')
    }
  }

  const handleDynamicSubmit = async (data: Record<string, unknown>) => {
    setError('')
    setIsSubmitting(true)

    if (!whatsappNumber) {
      setError('Número de WhatsApp não configurado.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_id: whatsappFormId || formId,
          landing_page_id: landingPageId,
          tenant_id: tenantId,
          answers: data,
          utm_source: 'whatsapp_modal',
          referrer: typeof window !== 'undefined' ? window.location.href : ''
        })
      })

      if (!response.ok) {
        throw new Error('Falha ao registrar lead.')
      }

      handleOpenWhatsApp()
    } catch (err) {
      console.error('Erro ao enviar lead do modal WA:', err)
      handleOpenWhatsApp()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!whatsappForm && (!nome.trim() || !whatsapp.trim())) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    if (!whatsappFormId && !formId && !tenantId) {
      // Se não tem formId (publicado) e nem tenantId, não consegue submeter como lead no backend.
      // Neste caso extremo, apenas redireciona
      handleOpenWhatsApp()
      return
    }

    setIsSubmitting(true)
    try {
      const answers = whatsappForm
        ? {} // handled by DynamicForm separately, wait we need to change how this handles dynamic forms
        : { nome: nome.trim(), whatsapp: whatsapp.trim() }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_id: whatsappFormId || formId,
          landing_page_id: landingPageId,
          tenant_id: tenantId,
          answers,
          utm_source: 'whatsapp_modal',
          referrer: typeof window !== 'undefined' ? window.location.href : ''
        })
      })

      if (!response.ok) {
        let msg = 'Falha ao registrar lead.'
        try {
          const errData = await response.json()
          if (errData.error) msg = errData.error
        } catch (e) {}
        throw new Error(msg)
      }

      // Sucesso! Registrou o lead, agora redireciona pro WA.
      handleOpenWhatsApp()
    } catch (err) {
      console.error('Erro ao enviar lead do modal WA:', err)
      // Mesmo com erro no CRM, vamos tentar mandar pro WA para não perder o contato do cliente final
      handleOpenWhatsApp()
    } finally {
      setIsSubmitting(false)
    }
  }

  const isMultiStep = whatsappForm?.display_type === 'wizard'
  const stepOneTitle = whatsappForm?.steps?.[0]?.title
  const stepOneDesc = whatsappForm?.steps?.[0]?.description

  let displayTitle = 'Falar pelo WhatsApp'
  let displayDesc =
    'Antes de iniciarmos nossa conversa, como podemos te chamar?'

  if (whatsappForm) {
    if (isMultiStep) {
      displayTitle = whatsappForm.name || displayTitle
      displayDesc = whatsappForm.description || displayDesc
    } else {
      displayTitle = stepOneTitle || whatsappForm.name || displayTitle
      displayDesc = stepOneDesc || whatsappForm.description || displayDesc
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {displayTitle}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {displayDesc}
          </DialogDescription>
        </DialogHeader>

        {whatsappForm ? (
          <div className="py-4">
            <DynamicForm
              schema={whatsappForm}
              onSubmit={handleDynamicSubmit}
              hideTitle={!isMultiStep}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="wa-nome">Nome completo</Label>
              <Input
                id="wa-nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wa-telefone">WhatsApp</Label>
              <Input
                id="wa-telefone"
                placeholder="(00) 00000-0000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(maskHelpers.phone(e.target.value))}
                disabled={isSubmitting}
                required
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando conversa...
                </>
              ) : (
                'Ir para o WhatsApp'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
