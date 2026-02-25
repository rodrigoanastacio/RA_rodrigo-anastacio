'use client'

import { createFormAction } from '@/app/(dashboard)/dashboard/forms/actions'
import { FormInsert } from '@/shared/api-handlers/forms/forms.handler'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function useCreateForm() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const create = async (data: Omit<FormInsert, 'tenant_id'>) => {
    setIsSaving(true)
    try {
      const result = await createFormAction(data)
      if (!result.success) throw new Error(result.error)
      toast.success('Formulário criado com sucesso!')
      router.push(`/dashboard/forms/${result.form?.id}/builder`)
    } catch {
      toast.error('Falha ao criar o formulário.')
    } finally {
      setIsSaving(false)
    }
  }

  return { create, isSaving }
}
