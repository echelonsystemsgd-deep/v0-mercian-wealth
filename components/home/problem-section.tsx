"use client"

import { motion } from "framer-motion"

export function ProblemSection() {
  return (
    <section id="problem" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + THE PERSPECTIVE
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          <span className="text-[#d4af37]">YOUR WEBSITE</span> IS MORE THAN<br />
          AN ONLINE PRESENCE.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-6">
          Before a potential customer makes an enquiry, they form an impression of your business. Your website should reflect the quality of your work, communicate what you offer and give visitors confidence to take the next step.
        </p>

        <div className="border-l-2 border-[#d4af37]/40 pl-4 py-1">
          <p className="font-mono text-xs text-[#d4af37] tracking-wider uppercase">
            ESTABLISH CREDIBILITY · COMMUNICATE VALUE · GUIDE ENQUIRIES
          </p>
        </div>
      </div>
    </section>
  )
}
