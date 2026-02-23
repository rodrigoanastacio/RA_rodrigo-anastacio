import { LandingPageCard } from '@/components/dashboard/landing-pages/LandingPageCard'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Button } from '@/components/ui/button'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function LandingPagesList() {
  const { pages: landingPages } =
    await landingPagesService.getLandingPagesSummary()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Landing Pages"
          description="Gerencie suas páginas de captura e vendas."
        />
        <Link href="/dashboard/landing-pages/registration">
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-11 px-6 font-bold shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            Nova Página
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landingPages.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400 bg-white border border-gray-100 rounded-[24px]">
            <p className="text-lg font-bold text-gray-900 mb-1">
              Nenhuma página criada ainda
            </p>
            <p className="text-sm mb-8">
              Comece criando sua primeira landing page de alta conversão.
            </p>
            <Link href="/dashboard/landing-pages/registration">
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200"
              >
                Criar a primeira página
              </Button>
            </Link>
          </div>
        ) : (
          landingPages.map((lp) => (
            <LandingPageCard key={lp.id} lp={lp as any} />
          ))
        )}
      </div>
    </div>
  )
}
