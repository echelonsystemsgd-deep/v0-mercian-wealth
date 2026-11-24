"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Crosshair, TrendingUp, Layers } from "lucide-react"

export function WhyBespokeSection() {
  const benefits = [
    {
      num: "01",
      title: "First Impressions Matter",
      tag: "AUTHORITY & CREDIBILITY",
      desc: "Before reading your bio or comparing pricing, potential clients judge your business by the standard of your website. A bespoke design guarantees your firm looks established, premium, and capable from second one.",
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: "Built Around Your Business",
      tag: "ZERO TEMPLATE REUSE",
      desc: "Cookie-cutter templates force your business into generic layouts. Our bespoke architecture is tailored around your actual services, fee structures, and the exact decisions your high-value clients need to make.",
      icon: Layers,
    },
    {
      num: "03",
      title: "Designed to Generate Enquiries",
      tag: "CONVERSION BY DESIGN",
      desc: "A beautiful website that produces zero enquiries is a failed investment. Every headline, trust badge, and call to action is strategically positioned to turn passive attention into direct commercial contact.",
      icon: Crosshair,
    },
    {
      num: "04",
      title: "Ready to Grow",
      tag: "LONG-TERM SOVEREIGNTY",
      desc: "Built on clean Next.js and high-performance cloud infrastructure that you own 100%. No proprietary CMS lock-in, no hostage agency retainers, and infinite scalability as your firm expands.",
      icon: TrendingUp,
    },
  ]

  return (
    <section id="why-bespoke" className="relative min-h-[90vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-6xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-14 sm:mb-18">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + 02 — THE ADVANTAGE
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#d4af37]">WHY A BESPOKE</span> WEBSITE?
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Each principle addresses a critical commercial necessity, ensuring your digital presence works as an active asset rather than an unread brochure.
          </p>
        </div>

        {/* 2x2 Distinct Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.num}
                className="p-6 sm:p-8 bg-[#060a16]/90 border border-white/10 hover:border-[#d4af37]/45 transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                    PILLAR {b.num} · {b.tag}
                  </span>
                  <div className="w-8 h-8 rounded border border-white/10 bg-[#0c1426] flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37]/50 transition-colors">
                    <Icon size={16} />
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                  {b.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
