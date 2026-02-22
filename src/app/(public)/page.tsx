import Hero from '@/components/shared/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dayane Anastacio - Consultoria em Gestão Jurídica',
  description:
    'Consultoria especializada em gestão de escritórios de advocacia. Soluções de alta performance e tecnologia.'
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
