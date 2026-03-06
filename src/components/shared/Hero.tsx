'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import Features from './Features'
import HeroText from './HeroText'

const Hero: React.FC = () => {
  return (
    <header className="relative w-full py-20 lg:py-32 flex flex-col gap-24 overflow-visible">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/bg-hero.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 via-transparent to-black z-10"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent z-10"></div>

        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] z-10"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-24 relative z-20">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full"
          >
            <HeroText />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Features />
        </motion.div>
      </div>
    </header>
  )
}

export default Hero
