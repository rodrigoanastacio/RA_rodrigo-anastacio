import Hero from '@/components/shared/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestão Inteligente de Leads',
  description: 'Plataforma SaaS de alta performance para gestão comercial.'
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>
    </main>
  )
}
