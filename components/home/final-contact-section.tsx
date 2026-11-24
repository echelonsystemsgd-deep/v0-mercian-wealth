"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

export function FinalContactSection() {
  return (
    <section id="contact" className="relative min-h-[90vh] flex items-center justify-center py-24 sm:py-32 px-6 sm:px-12 lg:px-20 text-center overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Monospace Eyebrow */}
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + CONTACT &amp; COMMENCEMENT
          </span>
        </div>

        {/* Closing H2 Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-tight mb-6">
          <span className="text-[#d4af37]">LET&apos;S BUILD</span><br />
          SOMETHING THAT LASTS.
        </h2>

        {/* Supporting Copy */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-md leading-relaxed font-normal mb-8">
          Have a project in mind? Let&apos;s discuss how a stronger digital presence could move your business forward.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 bg-[#d4af37] hover:bg-[#e5c158] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered shadow-xl shadow-[#d4af37]/25"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href="tel:+447851055929"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 bg-[#0a1020]/90 hover:bg-[#121c38] text-zinc-200 hover:text-white border border-[#d4af37]/30 font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
          >
            <Phone size={13} className="text-[#d4af37]" />
            <span>+44 7851 055929</span>
          </a>
        </div>

        {/* Location & Jurisdiction Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-[#070b16]/90 border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase tracking-widest backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Berkshire &amp; across the United Kingdom</span>
        </div>

      </div>
    </section>
  )
}
