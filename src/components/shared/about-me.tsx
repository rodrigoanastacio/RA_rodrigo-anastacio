'use client'

import Image from 'next/image'

export default function AboutMe() {
  return (
    <section className="relative w-full py-20 lg:py-32 border-t border-gray-900/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Image Container (5 columns) */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative group">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-cyan/30 rounded-tl-sm pointer-events-none transition-all duration-500 group-hover:-top-6 group-hover:-left-6"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-cyan/30 rounded-br-sm pointer-events-none transition-all duration-500 group-hover:-bottom-6 group-hover:-right-6"></div>

          {/* Main Image Container */}
          <div className="relative w-full aspect-4/5 bg-gray-900 rounded-sm overflow-hidden border border-gray-800 group-hover:border-brand-cyan/50 transition-colors duration-500">
            {/* The Image */}
            <Image
              src="/assets/rodrigo-anastacio.png"
              alt="Rodrigo Anastácio - Estrategista de Negócios e Desenvolvedor Full Stack"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/60 z-10"></div>

            {/* Tech Grid Overlay (Subtle) */}
            <div
              className="absolute inset-0 opacity-10 z-15 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(#40E0D0 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            ></div>
          </div>
        </div>

        {/* Right Column: Content (7 columns) */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-brand-cyan font-mono text-xs tracking-widest uppercase font-bold">
                /// O Estrategista
              </span>
              <div className="h-px grow bg-linear-to-r from-brand-cyan/50 to-transparent"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-[0.95]">
              Não é apenas sobre <br />
              <span className="text-gray-500">código</span>. É sobre <br />
              <span className="text-brand-cyan">Escalar negócios</span>.
            </h2>
          </div>

          {/* Body Text */}
          <div className="text-gray-400 text-lg leading-relaxed flex flex-col gap-6 font-light max-w-2xl">
            <p>
              Durante anos, o mercado vendeu sites como "cartões de visita
              digitais". Eu acredito que sua presença online deve ser sua melhor
              ferramenta de vendas.
            </p>
            <p>
              Combinando{' '}
              <strong className="text-white font-medium">
                arquitetura de software robusta
              </strong>{' '}
              com{' '}
              <strong className="text-white font-medium">
                estratégias de conversão agressivas
              </strong>
              , eu ajudo empresas a transformarem visitantes curiosos em leads
              qualificados. Meu foco não é entregar uma tela bonita, mas
              construir um sistema que performa.
            </p>
          </div>

          {/* Stats / Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-800 mt-2">
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">8+</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
                Anos de XP
              </p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">100%</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
                Foco em ROI
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-3xl font-bold text-white mb-1">Full</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
                Stack & Strategy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
