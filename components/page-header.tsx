"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle: string
  highlight?: string
}

export function PageHeader({ title, subtitle, highlight }: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-[#08080A] border-b border-white/5">
      {/* Background ambient radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E2B857]/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#E2B857]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Telemetry HUD Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121216] border border-[#E2B857]/40 text-[#E2B857] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 chamfered-sm">
            <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
            <span>[ SYSTEM DIRECTIVE · BESPOKE ARCHITECTURE ]</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-white mb-6">
            {title}{" "}
            {highlight && <em className="italic font-normal text-[#E2B857]">{highlight}</em>}
          </h1>
          <p className="font-sans text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
