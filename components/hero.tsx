"use client"

import { ArrowRight, Zap, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const WealthParticleCore = dynamic(
  () => import("@/components/three/wealth-particle-core").then((mod) => mod.WealthParticleCore),
  { ssr: false }
)

export function Hero() {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 overflow-hidden bg-[#08080A]">
      {/* 3D Interactive WebGL Mercian M-Crest with Real-Time Reflection */}
      <WealthParticleCore />

      {/* Subtle Background Radial Gold Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2B857]/6 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        
        {/* Monospace Telemetry HUD Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-5 text-center max-w-full px-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#121216]/90 border border-[#E2B857]/35 text-[#E2B857] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-lg backdrop-blur-md chamfered-sm">
            <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
            <span>[ + WEBSITES · AUTOMATION · CLIENT ACQUISITION ]</span>
          </div>
        </motion.div>

        {/* High-Contrast Editorial Display H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.12] sm:leading-[1.08] text-balance mb-4 sm:mb-6 max-w-4xl tracking-tight px-1 uppercase"
        >
          <em className="italic font-normal text-[#E2B857]">Sites</em> clients remember, <em className="italic font-normal text-[#E2B857]">systems</em> that scale your firm.
        </motion.h1>

        {/* Concise Factual Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-xs sm:text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal px-2"
        >
          We engineer bespoke sub-second digital storefronts, intake builders, and autonomous speed-to-lead pipelines for high-performing UK practices. Zero agency layers, zero operational friction.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full justify-center min-w-0 max-w-full"
        >
          {/* Primary CTA */}
          <Link
            href="/book"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider bg-[#E2B857] text-black hover:bg-[#F0C96E] transition-all duration-200 shadow-xl shadow-[#E2B857]/20 text-center cursor-pointer chamfered gold-glow"
          >
            <span>REQUEST SYSTEM BLUEPRINT ◆</span>
            <ArrowRight size={15} />
          </Link>

          {/* Secondary Action: Jump to Calculator */}
          <a
            href="#calculator"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider text-[#E2B857] bg-[#121216]/90 border border-[#E2B857]/40 hover:border-[#E2B857] hover:bg-[#1A1A22] transition-all text-center cursor-pointer backdrop-blur-md chamfered-sm"
          >
            <Zap size={14} className="text-[#E2B857] shrink-0" />
            <span>RUN SPEED-TO-LEAD CALCULATOR</span>
          </a>
        </motion.div>

        {/* Verified Performance Metrics Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 border-t border-white/[0.08] text-[11px] font-mono text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>&lt;400ms TTFB STOREFRONTS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2B857]" />
            <span>&lt;5s WHATSAPP DISPATCH</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>100% CLIENT ASSET OWNERSHIP</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
