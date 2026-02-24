import { PageHeader } from '@/components/dashboard/PageHeader'
import { formsService } from '@/shared/services/forms/forms.service'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { notFound } from 'next/navigation'
import LandingPageEditor from '../../components/landing-page-editor'

import { LPSection } from '@/components/lp-renderer/SectionRenderer'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditionPage({ params }: PageProps) {
  const { id } = await params

  const [landingPage, { forms }] = await Promise.all([
    landingPagesService.getLandingPageById(id),
    formsService.getFormsSummary()
  ])

  if (!landingPage) {
    notFound()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <PageHeader
          title={`Editando: ${landingPage.title}`}
          description="Edite o conteúdo da sua Landing Page."
        />
      </div>

      <div className="flex-1 -mx-6 -mb-6 border-t border-gray-200 h-full">
        <LandingPageEditor
          initialSections={landingPage.content as unknown as LPSection[]}
          id={landingPage.id}
          initialPublished={landingPage.is_published ?? false}
          initialTitle={landingPage.title}
          initialSlug={landingPage.slug}
          initialMetaTitle={landingPage.meta_title ?? undefined}
          initialMetaDescription={landingPage.meta_description ?? undefined}
          availableForms={forms}
        />
      </div>
    </div>
  )
}
