"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-start pt-28 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none">
      
      {/* Left-Aligned Headline Container */}
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        
        {/* Monospace Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-[#E08A68] uppercase">
            + WEBSITES · AUTOMATION · ARTIFICIAL INTELLIGENCE
          </span>
        </motion.div>

        {/* Stacked Editorial Display H1 — Clean 5-Line Lockup */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-serif text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight text-white leading-[1.04] select-none"
        >
          <span className="text-[#E08A68]">SITES</span> PEOPLE<br />
          REMEMBER,<br />
          <span className="text-[#E08A68]">SYSTEMS</span> THAT<br />
          WORK<br />
          FOR YOU
        </motion.h1>

      </div>

      {/* Bottom-Right SCROLL Indicator */}
      <div className="absolute bottom-8 right-8 sm:right-12 z-10 pointer-events-none font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase select-none flex items-center gap-2">
        <span className="border border-white/10 px-2.5 py-1 rounded bg-[#120d0b]/70 backdrop-blur-sm">SCROLL</span>
      </div>

    </section>
  )
}
