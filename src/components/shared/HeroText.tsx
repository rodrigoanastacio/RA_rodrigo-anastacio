import React from 'react'

const HeroText: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 items-start">
      {/* Overline - Authority Anchor */}
      <div className="flex items-center gap-3 mb-2 animate-fade-in-up">
        <div className="h-px w-12 bg-brand-cyan"></div>
        <span className="text-brand-cyan font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold">
          Por Rodrigo Anastácio
        </span>
        <span className="text-gray-600 font-mono text-xs sm:text-sm">|</span>
        <span className="text-gray-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
          Dev & Estratégia
        </span>
      </div>

      {/* Main Headline */}
      {/* Tightened leading to 0.9 to create a cohesive block as suggested */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] leading-[0.9] font-black font-inter tracking-tight text-white uppercase">
        {/* Line 1 */}
        <div className="flex flex-wrap items-center gap-x-3">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
            SUA PRESENÇA
          </span>
        </div>

        {/* Line 2 - Keyword Highlight */}
        <div className="flex flex-wrap items-center gap-x-3">
          <span className="text-brand-cyan drop-shadow-[0_0_15px_rgba(64,224,208,0.3)]">
            DIGITAL
          </span>
        </div>

        {/* Line 3 */}
        <div className="flex flex-wrap items-center gap-x-3">
          <span className="text-white">COM GESTÃO</span>
        </div>

        {/* Line 4 - Money Word Highlight */}
        <div className="flex flex-wrap items-center gap-x-3">
          <span>DE</span>
          <span className="text-brand-cyan drop-shadow-[0_0_15px_rgba(64,224,208,0.3)]">
            LEADS
          </span>
        </div>

        {/* Line 5 - Visual Flourish */}
        <div className="flex flex-wrap items-center gap-x-3">
          <span>INTEGRADA</span>
        </div>
      </h1>

      {/* Subtext - Balanced width */}
      <p className="text-gray-400 text-lg sm:text-xl max-w-lg leading-relaxed font-light mt-4 pl-6">
        Tenha controle total da sua presença digital com nossas soluções de alta
        performance.
      </p>
    </div>
  )
}

export default HeroText
