'use server'

import type {
  CreateLandingPageInput,
  LandingPageContent
} from '@/services/landing-pages/types'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { Json } from '@/types/supabase'
import { revalidatePath } from 'next/cache'

interface UpdateLandingPageInput {
  title?: string
  slug?: string
  content?: LandingPageContent
  meta_title?: string
  meta_description?: string
  is_published?: boolean
  form_id?: string | null
  whatsapp_form_id?: string | null
}

export async function createLandingPageAction(input: CreateLandingPageInput) {
  try {
    const newPage = await landingPagesService.createLandingPage({
      title: input.title,
      slug: input.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      content: (input.content || []) as unknown as Json,
      meta_title: input.title,
      meta_description: input.description || 'Página criada com o Construtor.',
      is_custom: input.is_custom ?? false
    })

    revalidatePath('/dashboard/landing-pages')
    return { success: true, slug: newPage.slug, id: newPage.id }
  } catch (error: unknown) {
    const dbError = error as { code?: string; message?: string }
    if (dbError?.code === '23505') {
      return { success: false, message: 'Este slug já está em uso.' }
    }
    console.error('Erro geral ao criar landing page:', JSON.stringify(error))
    return { success: false, message: 'Ocorreu um erro inesperado ao criar.' }
  }
}

export async function updateLandingPageAction(
  id: string,
  updates: UpdateLandingPageInput
) {
  try {
    const { content, ...rest } = updates
    const updateData = {
      ...rest,
      ...(content ? { content: content as unknown as Json } : {})
    }
    if (updateData.slug) {
      updateData.slug = updateData.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
    }

    const updatedPage = await landingPagesService.updateLandingPage(
      id,
      updateData
    )

    if (updatedPage.slug) {
      revalidatePath(`/lp/${updatedPage.slug}`)
    }
    revalidatePath(`/dashboard/landing-pages/${id}/edition`)

    return { success: true, slug: updatedPage.slug, id: updatedPage.id }
  } catch (error: unknown) {
    const dbError = error as { code?: string }
    if (dbError?.code === '23505') {
      return { success: false, message: 'Este slug já está em uso.' }
    }
    console.error('Erro ao atualizar LP:', error)
    return { success: false, message: 'Erro ao atualizar.' }
  }
}

export async function togglePublishAction(id: string, isPublished: boolean) {
  try {
    const updatedPage = await landingPagesService.updateLandingPage(id, {
      is_published: isPublished
    })

    if (updatedPage.slug) {
      revalidatePath(`/lp/${updatedPage.slug}`)
      revalidatePath(`/lp/custom/${updatedPage.slug}`)
    }
    revalidatePath('/dashboard/landing-pages')

    return { success: true, is_published: isPublished }
  } catch (error) {
    console.error('Erro ao alternar publicação:', error)
    return { success: false, message: 'Erro ao alterar status de publicação.' }
  }
}

export async function deleteLandingPageAction(id: string) {
  try {
    const page = await landingPagesService.getLandingPageById(id)
    await landingPagesService.deleteLandingPage(id)

    if (page?.slug) {
      revalidatePath(`/lp/${page.slug}`)
      revalidatePath(`/lp/custom/${page.slug}`)
    }
    revalidatePath('/dashboard/landing-pages')

    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar LP:', error)
    return { success: false, message: 'Erro ao deletar página.' }
  }
}

export async function uploadCustomLpAction(formData: FormData, lpSlug: string) {
  try {
    await landingPagesService.uploadCustomLpZip(formData, lpSlug)
    revalidatePath('/dashboard/landing-pages')
    return { success: true }
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Erro ao processar o arquivo ZIP.'
    console.error('Erro ao fazer upload da Custom LP:', error)
    return { success: false, message: msg }
  }
}

export async function createAndPublishCustomLpAction(
  input: { title: string; slug: string },
  formData: FormData
) {
  let createdId: string | null = null
  try {
    const normalizedSlug = input.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')

    const newPage = await landingPagesService.createLandingPage({
      title: input.title,
      slug: normalizedSlug,
      content: [] as unknown as import('@/types/supabase').Json,
      meta_title: input.title,
      meta_description: 'Página personalizada.',
      is_custom: true
    })
    createdId = newPage.id

    await landingPagesService.uploadCustomLpZip(formData, normalizedSlug)

    await landingPagesService.updateLandingPage(createdId, {
      is_published: true
    })

    revalidatePath('/dashboard/landing-pages')
    return { success: true, id: createdId, slug: normalizedSlug }
  } catch (error: unknown) {
    if (createdId) {
      await landingPagesService.deleteLandingPage(createdId).catch(() => null)
    }
    const dbError = error as { code?: string; message?: string }
    if (dbError?.code === '23505') {
      return { success: false, message: 'Este slug já está em uso.' }
    }
    const msg =
      error instanceof Error
        ? error.message
        : 'Erro inesperado ao criar Custom LP.'
    console.error('Erro em createAndPublishCustomLpAction:', error)
    return { success: false, message: msg }
  }
}
