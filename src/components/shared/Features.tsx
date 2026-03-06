import { motion } from 'framer-motion'
import React from 'react'

const Features: React.FC = () => {
  const features = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      text: 'Alta Performance'
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      text: 'Analytics Integrado'
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      text: 'Design Responsivo'
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      text: 'SEO Técnico'
    }
  ]

  return (
    <section
      className="w-full border-t border-white/5 pt-12"
      aria-label="Diferenciais técnicos"
    >
      <ul className="flex flex-wrap items-center justify-center md:justify-between gap-y-8 gap-x-12 list-none p-0">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            className="flex items-center gap-4 group cursor-default"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-brand-cyan/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/5 transition-all duration-300 text-brand-cyan [&_svg]:w-5 [&_svg]:h-5">
                {feature.icon}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black font-manrope uppercase tracking-[0.25em] text-white/40 group-hover:text-brand-cyan transition-colors duration-300">
                {feature.text}
              </span>
              <div className="h-px w-0 group-hover:w-full bg-brand-cyan/30 transition-all duration-500"></div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Features
