"use client"

import { motion } from "framer-motion"

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      tagline: "Commercial Analysis & Objectives",
      desc: "We analyze your business model, competitive landscape, high-value client personas, and current digital bottlenecks to define the strategic architecture.",
    },
    {
      num: "02",
      title: "Plan",
      tagline: "Structure & Customer Journey",
      desc: "We develop the editorial messaging hierarchy, visual identity, conversion funnels, and technical integration map before writing any code.",
    },
    {
      num: "03",
      title: "Build",
      tagline: "Bespoke Engineering & WebGL",
      desc: "We engineer your bespoke website using high-performance Next.js and Three.js graphics, ensuring sub-second response times and rigorous multi-device QA.",
    },
    {
      num: "04",
      title: "Launch",
      tagline: "Delivery & 100% Client Ownership",
      desc: "We deploy the verified experience to production, configure secure cloud domains, and transfer 100% infrastructure ownership to your firm with zero lock-in.",
    },
  ]

  return (
    <section id="process" className="relative min-h-[90vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-6xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + 07 — OUR METHOD
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#d4af37]">ONE MOVE</span> AT A TIME.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Every engagement follows a disciplined four-stage sequence from initial forensic audit to live commercial launch.
          </p>
        </div>

        {/* 4-Stage Connected Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 bg-[#060a16]/90 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest uppercase block mb-3">
                  STAGE {st.num}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2">
                  {st.title}
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-4">
                  {st.tagline}
                </span>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>PHASE {st.num} / 04</span>
                <span className="text-[#d4af37]">◆</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
