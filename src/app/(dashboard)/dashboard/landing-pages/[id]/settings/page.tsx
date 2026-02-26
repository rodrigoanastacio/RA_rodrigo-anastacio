import { CustomLpSettings } from '@/components/dashboard/landing-pages/CustomLpSettings'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { notFound } from 'next/navigation'

interface SettingsPageProps {
  params: Promise<{ id: string }>
}

export default async function CustomLpSettingsPage({
  params
}: SettingsPageProps) {
  const { id } = await params

  const page = await landingPagesService.getLandingPageById(id)

  if (!page || !page.is_custom) {
    notFound()
  }

  return (
    <div className="flex flex-col -mx-6 -my-6 h-[calc(100vh-4rem)]">
      <CustomLpSettings lp={page} />
    </div>
  )
}
