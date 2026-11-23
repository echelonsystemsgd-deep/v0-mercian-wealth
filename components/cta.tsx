"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, MessageSquare, Sparkles } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"

import { SectionDivider } from "@/components/section-divider"

export function CTA() {
  const data = SITE_COPY.homepage.cta

  const openPrototypeModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prototype-modal"))
    }
  }

  return (
    <section id="cta" className="relative py-16 sm:py-24 overflow-hidden bg-[#09090B]">
      {/* Chapter Marker */}
      <SectionDivider chapter="VIII" title="DECISIVE ADVANTAGE" />

      {/* Background Radial Gold Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 174, 83, 0.08) 0%, rgba(9, 9, 11, 0) 70%)"
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center space-y-6">
        
        {/* Telemetry HUD Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121216] border border-[#E2B857]/40 text-[#E2B857] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] chamfered-sm">
          <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
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
            {/* Primary Action: Request System Blueprint */}
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#E2B857] text-[#08080A] hover:bg-[#F0C96E] transition-all duration-200 shadow-xl shadow-[#E2B857]/20 cursor-pointer chamfered gold-glow"
            >
              <span>REQUEST SYSTEM BLUEPRINT ◆</span>
              <ArrowRight size={15} />
            </Link>

            {/* Secondary Action: Test-Drive Live Demo */}
            <Link
              href="/preview/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#E2B857] bg-[#121216] border border-[#E2B857]/40 hover:border-[#E2B857] hover:bg-[#1A1A22] transition-all duration-200 cursor-pointer chamfered-sm"
            >
              <Sparkles size={14} className="text-[#E2B857] shrink-0" />
              <span>Test-Drive Architecture</span>
            </Link>

            {/* WhatsApp Direct Line */}
            <a
              href={SITE_COPY.navbar.whatsappHref}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-mono font-medium uppercase tracking-wider text-zinc-300 bg-[#121216] border border-white/10 hover:bg-[#1A1A22] hover:text-white transition-all chamfered-sm"
            >
              <MessageSquare size={14} className="shrink-0 text-[#E2B857]" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111115] border border-slate-800 text-[10px] text-[#DCAE53] uppercase tracking-wider">
              <ShieldCheck size={12} className="text-[#DCAE53]" />
              Custom Build Specific to Your Business · Zero Obligation
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
