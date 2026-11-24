"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const serviceOfferings = [
    {
      title: "Bespoke Website Creation",
      desc: "Tailor-made digital architecture built from zero to mirror your firm's unique authority, positioning, and commercial objectives.",
    },
    {
      title: "Website Redesigns",
      desc: "Transforming tired, low-converting legacy websites into modern, high-credibility flagship platforms that command client respect.",
    },
    {
      title: "High-Converting Landing Pages",
      desc: "Focused, single-purpose conversion environments engineered to turn targeted campaign traffic into qualified enquiries.",
    },
    {
      title: "Commercial Business Platforms",
      desc: "Comprehensive multi-page infrastructures with client intake, structured service tiers, and validated trust signals.",
    },
    {
      title: "Mobile-First Digital Experiences",
      desc: "Sub-second, thumb-ergonomic interfaces engineered so visitors can explore, verify credibility, and enquire effortlessly on their phones.",
    },
  ]

  return (
    <section id="services" className="relative min-h-[90vh] flex flex-col justify-center py-20 sm:py-28 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-2xl text-left pointer-events-auto mb-10">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + 01 — WHAT WE DO
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          <span className="text-[#d4af37]">BESPOKE WEBSITE</span><br />
          DESIGN &amp; DEVELOPMENT.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed font-normal">
          We engineer bespoke digital experiences that clearly explain what your business provides, establish instant credibility, and make taking the next step effortless.
        </p>
      </div>

      {/* Structured Category List in Dark Navy / Gold Framed Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl pointer-events-auto mb-10">
        {serviceOfferings.map((svc, i) => (
          <div
            key={svc.title}
            className="p-5 sm:p-6 bg-[#070b16]/90 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] font-bold text-[#d4af37] tracking-widest uppercase block mb-2">
                CAPABILITY 0{i + 1}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2.5">
                {svc.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Action card */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-[#0c1426] to-[#060a14] border border-[#d4af37]/30 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#d4af37] tracking-widest uppercase block mb-2">
              COMMERCIAL VALUE
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2.5">
              Engineered for Results
            </h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-4">
              Every pixel, headline, and conversion funnel is shaped around driving qualified customer enquiries.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#d4af37] hover:text-[#f3e5ab] uppercase tracking-wider transition-colors"
          >
            <span>Discuss Your Project</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}
