"use client"

import { Check, X, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ComparisonSection() {
  const comparisonItems = [
    {
      feature: "Design & Brand Identity",
      basic: "Generic pre-bought templates with cloned stock imagery and mismatched brand colors.",
      bespoke: "Tailor-crafted typography, bespoke color system, and unique 3D visual presence.",
    },
    {
      feature: "Commercial Purpose",
      basic: "A passive online brochure with unclear messaging and zero conversion intent.",
      bespoke: "Engineered customer journeys specifically structured to turn visitors into enquiries.",
    },
    {
      feature: "Performance & Mobile UX",
      basic: "Bloated plugins, sluggish 4+ second load times, and poor thumb navigation on phones.",
      bespoke: "Sub-second Next.js architecture, zero bloat, and flawless ergonomics across all devices.",
    },
    {
      feature: "Customer Journey",
      basic: "Vague contact forms with no confirmation, slow replies, and lost leads.",
      bespoke: "Frictionless intake builders, instant phone notification, and seamless calendar booking.",
    },
    {
      feature: "Infrastructure Ownership",
      basic: "Locked into proprietary website builders with recurring platform fees and hostage code.",
      bespoke: "100% client infrastructure ownership. Clean code, dedicated cloud deployment, zero lock-in.",
    },
  ]

  return (
    <section id="comparison" className="relative min-h-[90vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-6xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + 06 — THE COMPARISON
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            A WEBSITE THAT EXISTS.<br />
            <span className="text-[#d4af37]">OR A WEBSITE</span> WITH PURPOSE.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Understand the decisive commercial difference between simply occupying space online versus deploying a strategic digital asset built to advance your business.
          </p>
        </div>

        {/* 2-Column Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          
          {/* Path A: Basic Online Presence */}
          <div className="p-6 sm:p-8 bg-[#080b12]/80 border border-white/10 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  PATH A · THE STANDARD TEMPLATE
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-300 uppercase mb-4">
                A Basic Online Presence
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Most websites look identical, load slowly, and fail to explain why a discerning client should trust the business.
              </p>

              <div className="space-y-4 border-t border-white/10 pt-5">
                {comparisonItems.map((item) => (
                  <div key={item.feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                      <X size={12} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">{item.feature}</span>
                      <p className="font-sans text-xs text-zinc-400 leading-snug">{item.basic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-zinc-500">
              RESULT: Low credibility, missed enquiries, constant agency friction.
            </div>
          </div>

          {/* Path B: Bespoke Business Website */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0a1428]/95 to-[#050814]/95 border-2 border-[#d4af37]/60 shadow-2xl backdrop-blur-xl relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-3.5 py-1 bg-[#d4af37] text-black font-mono font-bold text-[10px] tracking-widest uppercase">
              RECOMMENDED PATH
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <span className="font-mono text-xs font-bold text-[#d4af37] uppercase tracking-widest">
                  PATH B · MERCIAN WEALTH STANDARD
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase mb-4">
                A Bespoke Business Website
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed mb-6">
                Designed around your commercial goals, engineering instant confidence, and guiding prospective clients effortlessly toward an enquiry.
              </p>

              <div className="space-y-4 border-t border-[#d4af37]/30 pt-5">
                {comparisonItems.map((item) => (
                  <div key={item.feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                      <Check size={12} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#d4af37] uppercase block">{item.feature}</span>
                      <p className="font-sans text-xs text-zinc-200 leading-snug font-medium">{item.bespoke}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#d4af37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#d4af37]">
                RESULT: Clear authority, consistent enquiries, full ownership.
              </div>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#d4af37] hover:bg-[#e5c158] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Build with Purpose</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
