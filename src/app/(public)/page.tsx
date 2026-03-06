import AboutMe from '@/components/shared/about-me'
import Hero from '@/components/shared/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rodrigo Anastácio | Landing Pages de Alto Desempenho e Estratégia',
  description:
    'Desenvolvimento de Landing Pages premium com foco em conversão, performance técnica e design brutalista para negócios de alto ticket.',
  keywords: [
    'Landing Pages',
    'Design Brutalista',
    'Alta Performance',
    'Rodrigo Anastácio',
    'Lead Gen',
    'Estratégia Digital'
  ],
  openGraph: {
    title: 'Rodrigo Anastácio | Landing Pages Estratégicas',
    description:
      'Transforme visitantes em oportunidades reais com interfaces de alto desempenho.',
    type: 'website',
    locale: 'pt_BR'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutMe />
      </div>
    </main>
  )
}
