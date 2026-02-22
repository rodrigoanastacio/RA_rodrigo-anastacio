'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import Features from './Features'
import HeroText from './HeroText'

const Hero: React.FC = () => {
  return (
    <div className="relative w-full py-20 lg:py-32 flex flex-col gap-24 overflow-visible">
      {/* Background System */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/bg-hero.png"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Deep Overlays for Cinematic Look - Moved after/on top of image */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 via-transparent to-black z-10"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent z-10"></div>

        {/* Dynamic Glows */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] z-10"
        ></motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
        {/* Left Column: Typography */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <HeroText />
        </motion.div>

        {/* Right Column: Visual Element - Hidden on mobile since the portrait was removed */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:flex justify-center lg:justify-end items-center lg:-mt-20"
        >
          {/* Portrait Container - Only for Decorative Glow on Desktop */}
          <div className="relative lg:w-[550px] aspect-square flex items-center justify-center">
            {/* Decorative Background Blur */}
            <div className="absolute inset-0 bg-brand-cyan/10 rounded-full blur-[100px] animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Interface Elements */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-20"
      >
        <Features />
      </motion.div>
    </div>
  )
}

export default Hero
