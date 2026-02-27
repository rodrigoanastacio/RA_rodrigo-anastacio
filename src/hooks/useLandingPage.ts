import {
  createLandingPageAction,
  togglePublishAction,
  updateLandingPageAction
} from '@/app/(dashboard)/dashboard/landing-pages/actions'
import {
  CreateLandingPageInput,
  LandingPageContent,
  SaveLandingPageResult
} from '@/services/landing-pages/types'
import { useState } from 'react'

export interface UseLandingPageReturn {
  create: (input: CreateLandingPageInput) => Promise<SaveLandingPageResult>
  update: (
    id: string,
    updates: {
      content?: LandingPageContent
      title?: string
      slug?: string
      meta_title?: string
      meta_description?: string
      form_id?: string | null
      whatsapp_form_id?: string | null
    }
  ) => Promise<SaveLandingPageResult>
  togglePublish: (
    id: string,
    isPublished: boolean
  ) => Promise<{ success: boolean }>
  isSaving: boolean
}

export function useLandingPage(): UseLandingPageReturn {
  const [isSaving, setIsSaving] = useState(false)

  const create = async (
    input: CreateLandingPageInput
  ): Promise<SaveLandingPageResult> => {
    setIsSaving(true)
    try {
      const result = await createLandingPageAction(input)
      if (!result.success) {
        // Optionally trigger toast here or let component handle it
      }
      return result
    } catch (err) {
      console.error(err)
      return { success: false, message: 'Erro inesperado ao criar.' }
    } finally {
      setIsSaving(false)
    }
  }

  const update = async (
    id: string,
    updates: {
      content?: LandingPageContent
      title?: string
      slug?: string
      meta_title?: string
      meta_description?: string
      form_id?: string | null
      whatsapp_form_id?: string | null
    }
  ): Promise<SaveLandingPageResult> => {
    setIsSaving(true)
    try {
      const result = await updateLandingPageAction(id, updates)
      return result
    } catch (error) {
      console.error(error)
      return { success: false, message: 'Erro inesperado ao atualizar.' }
    } finally {
      setIsSaving(false)
    }
  }

  const togglePublish = async (id: string, isPublished: boolean) => {
    setIsSaving(true)
    try {
      return await togglePublishAction(id, isPublished)
    } catch (error) {
      console.error(error)
      return { success: false, message: 'Erro ao alterar status.' }
    } finally {
      setIsSaving(false)
    }
  }

  return {
    create,
    update,
    togglePublish,
    isSaving
  }
}
