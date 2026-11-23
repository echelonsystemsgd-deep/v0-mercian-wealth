"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MessageSquare, Zap, Clock, Activity, Sparkles, ArrowDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SITE_COPY } from "@/lib/site-copy"
import { BrandLogo } from "@/components/brand-logo"
import dynamic from "next/dynamic"

const WealthParticleCore = dynamic(
  () => import("@/components/three/wealth-particle-core").then((mod) => mod.WealthParticleCore),
  { ssr: false }
)

export function Hero() {
  const data = SITE_COPY.homepage.hero

  const openPrototypeModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prototype-modal"))
    }
  }

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 overflow-hidden bg-[#08080A]">
      {/* 3D Interactive WebGL Wealth Neural Core */}
      <WealthParticleCore />

      {/* Ambient Geometric Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] opacity-10 pointer-events-none z-0 rounded-full overflow-hidden blur-[1px]">
        <BrandLogo variant="watermark" fill className="object-cover" priority />
      </div>

      {/* Subtle Background Radial Gold Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2B857]/6 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        
        {/* Military / Telemetry HUD Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-5 text-center max-w-full px-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#121216]/90 border border-[#E2B857]/35 text-[#E2B857] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-lg backdrop-blur-md chamfered-sm">
            <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
            <span>[ SEC 01 / 06 · SYSTEM LATENCY: &lt;45MS · STATUS: ARMED ]</span>
          </div>
        </motion.div>

        {/* High-Contrast Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.12] sm:leading-[1.08] text-balance mb-4 sm:mb-6 max-w-4xl tracking-tight px-1 uppercase"
        >
          Your website is the <em className="italic font-normal text-[#E2B857]">only barrier</em> between paid and the back button.
        </motion.h1>

        {/* Subheadline with Technical Clarity */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-xs sm:text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal px-2"
        >
          {data.subheadline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full justify-center min-w-0 max-w-full"
        >
          {/* Primary CTA: Book a call */}
          <Link
            href={data.primaryCtaHref}
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider bg-[#E2B857] text-black hover:bg-[#F0C96E] transition-all duration-200 shadow-xl shadow-[#E2B857]/20 text-center cursor-pointer chamfered gold-glow"
          >
            <span>{data.primaryCtaText}</span>
            <ArrowRight size={15} />
          </Link>

          {/* Secondary Action: Jump to Calculator */}
          <a
            href="#roi-calculator"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider text-[#E2B857] bg-[#121216]/90 border border-[#E2B857]/40 hover:border-[#E2B857] hover:bg-[#1A1A22] transition-all text-center cursor-pointer backdrop-blur-md chamfered-sm"
          >
            <Zap size={14} className="text-[#E2B857] shrink-0" />
            <span>Calculate Revenue Leak</span>
          </a>

          {/* Direct WhatsApp CTA */}
          <a
            href={data.whatsappHref || "https://wa.me/447851055929"}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-zinc-300 bg-[#121216]/90 border border-white/10 hover:bg-[#1A1A22] hover:text-white transition-all text-center backdrop-blur-md chamfered-sm"
          >
            <MessageSquare size={15} className="text-[#E2B857] shrink-0" />
            <span>Direct WhatsApp</span>
          </a>
        </motion.div>

        {/* Above-the-Fold Trust Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-zinc-300 px-2"
        >
          <div className="flex items-center gap-1.5 text-zinc-300 text-[11px] sm:text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
            <span>BUILT FOR UK TRADES &amp; PRACTICES</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <div className="flex items-center gap-1.5 text-[#E2B857] text-[11px] sm:text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
            <span>&lt;400MS MOBILE PERFORMANCE</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <div className="flex items-center gap-1.5 text-zinc-300 text-[11px] sm:text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
            <span>UPFRONT STRIPE DEPOSIT RECOVERY</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
