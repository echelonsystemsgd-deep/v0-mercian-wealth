"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, MessageSquare, Sparkles } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"

export function CTA() {
  const data = SITE_COPY.homepage.cta

  return (
    <section id="cta" className="relative py-16 sm:py-24 overflow-hidden bg-[#030206] border-t border-white/[0.08]">
      {/* Background Radial Purple Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.14) 0%, rgba(212, 175, 55, 0.06) 40%, rgba(3, 2, 6, 0) 75%)"
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center space-y-6">
        
        {/* Telemetry HUD Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090514] border border-[#d4af37]/40 text-[#d4af37] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] chamfered-sm shadow-lg shadow-[#7c3aed]/15">
          <span className="w-1.5 h-1.5 bg-[#b794f6] animate-pulse" />
          <span>[ INITIATE SYSTEM ONBOARDING ]</span>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold uppercase text-white leading-tight text-balance max-w-4xl tracking-wide"
        >
          {data.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
        >
          {data.subheadline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex flex-col items-center gap-4 pt-2"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            {/* Primary Action: Start a Conversation */}
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:bg-[#e5c158] transition-all duration-200 shadow-xl shadow-[#d4af37]/20 cursor-pointer chamfered"
            >
              <span>START A CONVERSATION ◆</span>
              <ArrowRight size={15} />
            </Link>

            {/* Secondary Action: Explore Portfolio */}
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-zinc-300 bg-[#090514] border border-white/15 hover:border-[#b794f6]/50 hover:text-white transition-all duration-200 cursor-pointer chamfered-sm"
            >
              <Sparkles size={14} className="text-[#b794f6] shrink-0" />
              <span>Explore Selected Work</span>
            </Link>

            {/* Direct Telephone */}
            <a
              href="tel:+447851055929"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-mono font-medium uppercase tracking-wider text-zinc-300 bg-[#090514] border border-white/10 hover:bg-[#120a24] hover:text-white transition-all chamfered-sm"
            >
              <span>+44 7851 055929</span>
            </a>
          </div>

          {/* SLA Trust Telemetry */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#b794f6]" />
              <span>100% Client Infrastructure Ownership</span>
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>UK Operating Jurisdiction</span>
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
