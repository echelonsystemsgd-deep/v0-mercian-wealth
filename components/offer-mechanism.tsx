"use client"

import { motion } from "framer-motion"

export function OfferMechanism() {
  const stages = [
    {
      number: "01",
      title: "Listen",
      tagline: "First discovery consultation. Reviewing operational workflows, commercial friction, and key growth objectives.",
      deliverables: [
        "Commercial friction analysis",
        "Target client intake profile",
        "Experience specification",
      ],
    },
    {
      number: "02",
      title: "Plan",
      tagline: "Architecting the conversion flow, user journey, custom typography, and complete integration map.",
      deliverables: [
        "Visual & interactive prototyping",
        "Conversion architecture roadmap",
        "System integration schema",
      ],
    },
    {
      number: "03",
      title: "Build",
      tagline: "Engineering bespoke Three.js WebGL experiences, sub-400ms storefronts, and automated dispatch pipelines.",
      deliverables: [
        "Sub-second production build",
        "Instant dispatch automation",
        "Multi-device rigorous testing",
      ],
    },
    {
      number: "04",
      title: "After Launch",
      tagline: "Going live on your own infrastructure with complete code ownership, executive training, and ongoing support.",
      deliverables: [
        "100% direct code ownership",
        "Production domain & cloud release",
        "Ongoing optimization & support",
      ],
    },
  ]

  return (
    <section id="method" className="relative min-h-[75vh] sm:min-h-screen flex items-center justify-center py-16 sm:py-24 sm:pb-36 px-5 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-7xl mx-auto pointer-events-auto w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-left mb-10 sm:mb-16"
        >
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + METHOD
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#d4af37]">ONE MOVE</span> AT A TIME.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Four clear phases and a single dedicated director, from initial consultation until full deployment and live operational support.
          </p>
        </motion.div>

        {/* Restrained 4-Stage Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-5 sm:p-6 bg-[#0a0614]/85 border border-white/10 hover:border-[#d4af37]/45 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#d4af37] tracking-widest uppercase block mb-2">
                  PHASE {stage.number}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
                  {stage.tagline}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4">
                {stage.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-snug">
                    <span className="text-[#d4af37] mt-0.5">◆</span>
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
