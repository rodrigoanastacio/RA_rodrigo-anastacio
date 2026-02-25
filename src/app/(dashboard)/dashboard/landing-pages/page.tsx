import { LandingPageCard } from '@/components/dashboard/landing-pages/LandingPageCard'
import { LandingPage } from '@/services/landing-pages/types'
import { landingPagesService } from '@/shared/services/landing-pages/landing-pages.service'
import { Globe, Plus, Rocket, Zap } from 'lucide-react'
import Link from 'next/link'

export default async function LandingPagesList() {
  const { pages: rawPages } = await landingPagesService.getLandingPagesSummary()
  const landingPages = rawPages as unknown as LandingPage[]

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Landing Pages
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">
            Gerencie suas páginas de captura e vendas.
          </p>
        </div>
        <Link href="/dashboard/landing-pages/registration">
          <button className="group flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white h-11 px-6 font-bold text-sm tracking-wide shadow-sm transition-all duration-200 active:scale-95 hover:shadow-[0_4px_16px_rgba(79,70,229,0.4)] cursor-pointer">
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            Nova Página
          </button>
        </Link>
      </div>

      {/* Stats bar */}
      {landingPages.length > 0 && (
        <div className="grid grid-cols-3 gap-0 border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="p-6 border-r border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Total de Páginas
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {landingPages.length}
            </p>
          </div>
          <div className="p-6 border-r border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Publicadas
            </p>
            <p className="text-3xl font-extrabold text-[#4F46E5]">
              {landingPages.filter((lp) => lp.is_published).length}
            </p>
          </div>
          <div className="p-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Visualizações Totais
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {landingPages.reduce((acc, lp) => acc + (lp.views || 0), 0)}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {landingPages.length === 0 ? (
          <div className="col-span-full">
            <EmptyState />
          </div>
        ) : (
          landingPages.map((lp, index) => (
            <LandingPageCard
              key={lp.id}
              lp={lp as unknown as LandingPage}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] p-16 flex flex-col items-center text-center">
      {/* Icon block */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-[#4F46E5]/8 flex items-center justify-center">
          <Globe className="w-10 h-10 text-[#4F46E5]" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#4F46E5] flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" fill="white" />
        </div>
      </div>

      {/* Text */}
      <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-3">
        Nenhuma página criada ainda
      </p>
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-3">
        Sua primeira landing page
        <br />
        está a um clique
      </h2>
      <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
        Crie páginas de captura de alta conversão e comece a transformar
        visitantes em leads qualificados.
      </p>

      {/* Features pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {[
          'Editor visual',
          'Formulários integrados',
          'Analytics em tempo real'
        ].map((feat) => (
          <span
            key={feat}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-gray-200 text-gray-500 bg-gray-50"
          >
            {feat}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link href="/dashboard/landing-pages/registration">
        <button className="group flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3.5 font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_8px_24px_rgba(79,70,229,0.35)] active:scale-95 cursor-pointer">
          <Rocket className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          Criar a primeira página
        </button>
      </Link>
    </div>
  )
}
