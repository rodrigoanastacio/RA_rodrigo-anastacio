import { formsService } from '@/shared/services/forms/forms.service'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { userService } from '@/shared/services/user/user.service'
import { ArrowLeft, Globe } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import LandingPageEditor from '../../components/landing-page-editor'

import { LPSection } from '@/components/lp-renderer/SectionRenderer'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditionPage({ params }: PageProps) {
  const { id } = await params

  const [landingPage, { forms }, user] = await Promise.all([
    landingPagesService.getLandingPageById(id),
    formsService.getFormsSummary(),
    userService.getProfile()
  ])

  if (!landingPage) {
    notFound()
  }

  const branding = {
    businessName: user?.business_name,
    businessSlogan: user?.business_slogan,
    whatsappNumber: user?.whatsapp_number
  }

  return (
    <div className="flex flex-col -mx-6 -my-6 h-[calc(100vh-4rem)]">
      {/* Premium topbar */}
      <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/landing-pages"
            className="group flex items-center gap-1.5 text-gray-400 hover:text-[#4F46E5] transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Voltar
            </span>
          </Link>

          <div className="w-px h-5 bg-gray-100" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#4F46E5] flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-gray-900 leading-tight">
                {landingPage.title}
              </p>
              <p className="text-[10px] text-gray-400 font-mono leading-tight">
                /lp/{landingPage.slug}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 border ${
              landingPage.is_published
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-amber-50 text-amber-500 border-amber-100'
            }`}
          >
            {landingPage.is_published ? '● Publicada' : '○ Rascunho'}
          </span>

          {landingPage.is_published && (
            <a
              href={`/lp/${landingPage.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5] hover:underline transition-all"
            >
              Ver página ↗
            </a>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <LandingPageEditor
          initialSections={landingPage.content as unknown as LPSection[]}
          id={landingPage.id}
          initialPublished={landingPage.is_published ?? false}
          initialTitle={landingPage.title}
          initialSlug={landingPage.slug}
          initialMetaTitle={landingPage.meta_title ?? undefined}
          initialMetaDescription={landingPage.meta_description ?? undefined}
          availableForms={forms}
          branding={branding}
        />
      </div>
    </div>
  )
}
