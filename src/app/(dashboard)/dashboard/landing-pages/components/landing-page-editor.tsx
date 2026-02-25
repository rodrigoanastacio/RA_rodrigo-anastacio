'use client'
import { FormRow } from '@/shared/api-handlers/forms/forms.handler'

import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { useLandingPage } from '@/hooks/useLandingPage'
import { LandingPageBuilder } from './landing-page-builder'

interface Props {
  initialSections: LPSection[]
  id: string
  initialPublished: boolean
  initialTitle: string
  initialSlug: string
  initialMetaTitle?: string
  initialMetaDescription?: string
  availableForms: FormRow[]
}

export default function LandingPageEditor({
  initialSections,
  id,
  initialPublished,
  initialTitle,
  initialSlug,
  initialMetaTitle,
  initialMetaDescription,
  availableForms
}: Props) {
  const { update, togglePublish, isSaving } = useLandingPage()

  return (
    <LandingPageBuilder
      initialSections={initialSections}
      initialPublished={initialPublished}
      initialTitle={initialTitle}
      initialSlug={initialSlug}
      initialMetaTitle={initialMetaTitle}
      initialMetaDescription={initialMetaDescription}
      availableForms={availableForms}
      onSave={(sections, pageSettings) =>
        update(id, {
          content: sections,
          title: pageSettings.title,
          slug: pageSettings.slug,
          meta_title: pageSettings.metaTitle,
          meta_description: pageSettings.metaDescription,
          form_id: pageSettings.formId || null
        })
      }
      onTogglePublish={(published: boolean) => togglePublish(id, published)}
      isSaving={isSaving}
    />
  )
}
