"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start pt-24 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none">
      
      {/* Left-Aligned Editorial Headline Container */}
      <div className="relative z-10 max-w-lg lg:max-w-xl text-left pointer-events-auto">
        
        {/* Monospace Eyebrow Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-[#d4af37] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            + MERCIAN WEALTH · DIGITAL ARCHITECTURE
          </span>
        </motion.div>

        {/* Editorial Display H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.04] mb-6 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          <span className="text-[#d4af37]">BESPOKE WEBSITES.</span><br />
          BUILT TO MOVE YOUR<br />
          <span className="text-zinc-200">BUSINESS FORWARD.</span>
        </motion.h1>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-md leading-relaxed font-normal mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
        >
          We create bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.
        </motion.p>

        {/* Primary & Secondary Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <a
            href="#vision"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#d4af37] hover:bg-[#e5c158] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered shadow-lg shadow-[#d4af37]/20"
          >
            <span>Explore Our Approach</span>
            <ArrowRight size={14} />
          </a>

          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-[#0a1020]/80 hover:bg-[#121a32] text-zinc-300 hover:text-white border border-[#d4af37]/25 font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
          >
            <span>Let&apos;s Talk</span>
          </Link>
        </motion.div>

      </div>

      {/* Bottom-Right SCROLL Indicator */}
      <div className="absolute bottom-8 right-8 sm:right-12 z-10 pointer-events-none font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase select-none flex items-center gap-2">
        <span className="border border-white/10 px-2.5 py-1 rounded bg-[#080d1a]/70 backdrop-blur-sm text-[#d4af37]">SCROLL</span>
      </div>

    </section>
  )
}
