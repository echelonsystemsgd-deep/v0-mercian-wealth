"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function OfferMechanism() {
  const stages = [
    {
      number: "01",
      title: "DISCOVERY & AUDIT",
      tagline: "Forensic analysis of current operations",
      deliverables: [
        "Core Web Vitals benchmark (<400ms target)",
        "Intake drop-off & manual friction audit",
        "Bespoke system architecture specification",
      ],
    },
    {
      number: "02",
      title: "ARCHITECTURE & PROTOTYPE",
      tagline: "Phone-tested before commercial commitment",
      deliverables: [
        "Interactive 3-tap booking & intake prototype",
        "Test directly on your personal phone in 48h",
        "Zero obligation proof before production",
      ],
    },
    {
      number: "03",
      title: "PRODUCTION BUILD",
      tagline: "Engineering sub-second speed & automation",
      deliverables: [
        "Instant WhatsApp alert dispatch (<5 seconds)",
        "Stripe upfront deposit lock (0 no-shows)",
        "Zero-leak WebGL interactive graphics layer",
      ],
    },
    {
      number: "04",
      title: "CLIENT SOVEREIGNTY",
      tagline: "100% client-owned infrastructure",
      deliverables: [
        "Domain & cloud accounts configured in your registrar",
        "Permanent 100% ownership of code & assets",
        "Zero platform lock-in, zero hostage agency fees",
      ],
    },
  ]

  return (
    <section id="method" className="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-7xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-left mb-12 sm:mb-16"
        >
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
              + METHOD
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#E08A68]">ONE MOVE</span> AT A TIME
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            From initial friction analysis to client-owned production deployment. Zero speculative slide decks, zero endless agency retainers.
          </p>
        </motion.div>

        {/* Single 4-Column Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-5 sm:p-6 bg-[#120d0b]/85 border border-white/10 hover:border-[#E08A68]/45 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#E08A68] tracking-widest uppercase block mb-3">
                  STAGE {stage.number}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
                  {stage.tagline}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4">
                {stage.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-snug">
                    <span className="text-[#E08A68] mt-0.5">◆</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
