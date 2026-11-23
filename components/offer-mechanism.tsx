"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Server, Globe } from "lucide-react"
import Link from "next/link"

export function OfferMechanism() {
  const stages = [
    {
      number: "01",
      title: "DISCOVERY & AUDIT",
      tagline: "Forensic analysis of current operations",
      deliverables: [
        "Core Web Vitals & mobile latency benchmark (<400ms target)",
        "Intake drop-off & manual record chasing friction audit",
        "Bespoke system architecture specification",
      ],
    },
    {
      number: "02",
      title: "ARCHITECTURE & PROTOTYPE",
      tagline: "Phone-tested before commercial commitment",
      deliverables: [
        "Interactive 3-tap booking & customer intake builder",
        "Test directly on your personal smartphone within 48h",
        "Zero obligation proof before any production agreement",
      ],
    },
    {
      number: "03",
      title: "PRODUCTION BUILD",
      tagline: "Engineering sub-second speed & automation",
      deliverables: [
        "Instant WhatsApp alert dispatch (<5 seconds to partner)",
        "Stripe & Apple Pay upfront deposit lock (0 no-shows)",
        "Zero-leak WebGL & Three.js interactive graphics layer",
      ],
    },
    {
      number: "04",
      title: "LAUNCH & ASSET SOVEREIGNTY",
      tagline: "100% client-owned infrastructure with zero lock-in",
      deliverables: [
        "Domain & cloud accounts configured directly in your registrar",
        "You retain 100% permanent ownership of code, assets & data",
        "Continuous 24/7 automated uptime monitoring & SLA retainers",
      ],
    },
  ]

  return (
    <section id="method" className="relative py-20 sm:py-32 bg-[#08080A] overflow-hidden">
      {/* Ambient Radial Dark Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E2B857]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121216] border border-[#E2B857]/40 text-[#E2B857] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 chamfered-sm">
            <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
            <span>[ SEC 07 / 08 · SYSTEM DEPLOYMENT METHOD ]</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold uppercase text-white tracking-wide leading-tight mb-4">
            ONE METHODICAL MOVE AT A TIME
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl">
            From initial friction analysis to client-owned production deployment. Zero speculative slide decks, zero endless agency retainers.
          </p>
        </motion.div>

        {/* 2x2 Frosted-Glass Method Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-16">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 sm:p-8 rounded-2xl bg-[#0F0F13]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#E2B857]/40 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-5 group relative overflow-hidden"
            >
              {/* Subtle Step Number Watermark */}
              <div className="absolute top-4 right-6 font-mono text-5xl sm:text-6xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-[#E2B857]/10 transition-colors">
                {stage.number}
              </div>

              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#E2B857] font-bold tracking-widest uppercase">
                  <span>STAGE {stage.number}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                  {stage.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-zinc-400">
                  {stage.tagline}
                </p>
              </div>

              {/* Hairline-Separated Deliverables */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2.5 relative z-10 font-mono text-xs text-zinc-300">
                {stage.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#E2B857] shrink-0 mt-0.5">◆</span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#121216]/80 border border-[#E2B857]/30 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-[#E2B857] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Asset Sovereignty Guarantee</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl">
              You own 100% of your domain, codebase, customer database, and payment gateway from day one. We never charge ongoing hostage fees for what you own.
            </p>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#E2B857] hover:bg-[#F0C96E] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered-sm shadow-lg shadow-[#E2B857]/20 whitespace-nowrap shrink-0"
          >
            <span>REQUEST SYSTEM BLUEPRINT ◆</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
