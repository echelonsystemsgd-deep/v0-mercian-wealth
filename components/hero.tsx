"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center justify-start pt-24 sm:pt-28 pb-10 sm:pb-12 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none">
      
      {/* Left-Aligned Headline Container */}
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        
        {/* Monospace Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-[#E2B857] uppercase">
            + WEBSITES · AUTOMATION · CLIENT ACQUISITION
          </span>
        </motion.div>

        {/* Stacked Editorial Display H1 — Clean 5-Line Lockup */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-serif text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight text-white leading-[1.04] mb-5 select-none"
        >
          <span className="text-[#E2B857]">SITES</span> CLIENTS<br />
          REMEMBER,<br />
          <span className="text-[#E2B857]">SYSTEMS THAT</span><br />
          SCALE<br />
          YOUR FIRM
        </motion.h1>

        {/* Factual Editorial Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-xs sm:text-sm text-zinc-300 max-w-md sm:max-w-lg leading-relaxed font-normal"
        >
          We engineer bespoke sub-second digital storefronts, intake builders, and autonomous speed-to-lead pipelines for high-performing UK practices. Zero agency layers, zero recurring host fees.
        </motion.p>

      </div>

      {/* Bottom-Right SCROLL Indicator */}
      <div className="absolute bottom-6 right-8 sm:right-12 z-10 pointer-events-none font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase select-none flex items-center gap-2">
        <span>SCROLL</span>
        <span className="inline-block animate-bounce">↓</span>
      </div>

    </section>
  )
}
