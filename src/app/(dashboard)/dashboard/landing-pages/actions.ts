'use server'

import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { Json } from '@/types/supabase'
import { revalidatePath } from 'next/cache'

interface CreateLandingPageInput {
  title: string
  slug: string
  content?: LPSection[]
  description?: string
}

interface UpdateLandingPageInput {
  title?: string
  slug?: string
  content?: LPSection[]
  meta_title?: string
  meta_description?: string
  is_published?: boolean
  form_id?: string | null
}

export async function createLandingPageAction(input: CreateLandingPageInput) {
  try {
    const newPage = await landingPagesService.createLandingPage({
      title: input.title,
      slug: input.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      content: (input.content || []) as unknown as Json,
      meta_title: input.title,
      meta_description: input.description || 'Página criada com o Construtor.'
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
    }
    revalidatePath('/dashboard/landing-pages')

    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar LP:', error)
    return { success: false, message: 'Erro ao deletar página.' }
  }
}
