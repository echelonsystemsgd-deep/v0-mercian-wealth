"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle: string
  highlight?: string
}

export function PageHeader({ title, subtitle, highlight }: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden bg-[#030206] border-b border-white/[0.08]">
      {/* Background ambient royal purple & champagne gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#7c3aed]/10 via-[#d4af37]/8 to-[#a855f7]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Telemetry HUD Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090514] border border-[#d4af37]/40 text-[#d4af37] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 chamfered-sm shadow-lg shadow-[#7c3aed]/10">
            <span className="w-1.5 h-1.5 bg-[#b794f6] animate-pulse" />
            <span>[ SYSTEM DIRECTIVE · BESPOKE ARCHITECTURE ]</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-white mb-6">
            {title}{" "}
            {highlight && <span className="font-serif font-bold text-[#d4af37]">{highlight}</span>}
          </h1>
          <p className="font-sans text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
