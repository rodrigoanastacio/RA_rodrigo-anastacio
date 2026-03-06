import { Button } from '@/components/ui/button'
import React from 'react'

const HeroText: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 items-center text-center max-w-6xl mx-auto">
      <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in-up">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
          <span className="text-white/80 font-mono text-[10px] tracking-[0.2em] uppercase">
            Rodrigo Anastácio <span className="text-white/30 mx-1">|</span>{' '}
            Expert Front-End
          </span>
        </div>
      </div>

      <h1 className="flex flex-col text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.85] sm:leading-none font-black font-manrope tracking-[-0.05em] text-white uppercase italic">
        <span className="block">Landing</span>
        <span className="block text-outline">Pages</span>
        <span className="block text-brand-cyan relative">
          Estratégicas
          <span className="absolute -inset-1 blur-3xl bg-brand-cyan/20 -z-10"></span>
        </span>
      </h1>

      <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light font-manrope">
        Transforme visitantes em{' '}
        <span className="text-white font-medium">oportunidades reais</span> de
        negócio através de interfaces de alto desempenho.
      </p>

      <div className="mt-4 flex flex-col items-center gap-4">
        <Button
          variant="brand-premium"
          className="h-auto px-12 py-5 text-xs sm:text-sm"
          asChild
        >
          <a href="#">Iniciar Conversão Estratégica</a>
        </Button>
        <span className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
          Vagas Limitadas para Março
        </span>
      </div>
    </div>
  )
}

export default HeroText
