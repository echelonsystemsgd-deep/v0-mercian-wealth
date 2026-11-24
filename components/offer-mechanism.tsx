"use client"

import { motion } from "framer-motion"

export function OfferMechanism() {
  const stages = [
    {
      number: "01",
      title: "Discover",
      tagline: "Understanding your business, target market and strategic objectives.",
      deliverables: [
        "Commercial friction analysis",
        "Target client intake profile",
        "Experience specification",
      ],
    },
    {
      number: "02",
      title: "Plan",
      tagline: "Architecting the conversion flow, user journey and system integration map.",
      deliverables: [
        "Visual & interactive prototyping",
        "Conversion architecture roadmap",
        "System integration schema",
      ],
    },
    {
      number: "03",
      title: "Build",
      tagline: "Engineering the bespoke WebGL experience, intake builders and automation pipes.",
      deliverables: [
        "Sub-second production build",
        "Instant dispatch automation",
        "Responsive multi-device QA",
      ],
    },
    {
      number: "04",
      title: "Launch",
      tagline: "Deploying the validated digital platform with complete client infrastructure ownership.",
      deliverables: [
        "100% client infrastructure ownership",
        "Production domain & cloud release",
        "Zero vendor lock-in",
      ],
    },
  ]

  return (
    <section id="approach" className="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
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
              + OUR APPROACH
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#E08A68]">ONE MOVE</span> AT A TIME.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Every project follows a considered process, from understanding the objective to designing, building and launching the finished experience.
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
              className="p-5 sm:p-6 bg-[#120d0b]/85 border border-white/10 hover:border-[#E08A68]/45 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#E08A68] tracking-widest uppercase block mb-3">
                  {stage.number} — {stage.title}
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
