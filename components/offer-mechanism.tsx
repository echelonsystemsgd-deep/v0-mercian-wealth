"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, Smartphone, ShieldCheck, Zap, Layers } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"
import { SectionDivider } from "@/components/section-divider"

export function OfferMechanism() {
  const data = SITE_COPY.homepage.offerMechanism

  const triggerModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prototype-modal"))
    }
  }

  return (
    <section id="offer-mechanism" className="relative py-16 sm:py-24 bg-[#09090B] overflow-hidden">
      {/* Chapter Marker */}
      <SectionDivider chapter="III" title="THE OFFER PROTOCOL" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#DCAE53]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DCAE53]" />
            <span>[ {data.eyebrow} ]</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance mb-4">
            {data.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {data.subheadline}
          </p>
        </motion.div>

        {/* 3-Step Protocol Cards with Visual Weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 text-left">
          {data.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#111115] border border-slate-800 hover:border-[#DCAE53]/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              {/* Subtle Step Number Watermark */}
              <div className="absolute top-3 right-4 font-mono text-4xl sm:text-5xl font-black text-slate-800/40 select-none pointer-events-none group-hover:text-[#DCAE53]/10 transition-colors">
                {step.stepNumber}
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#DCAE53] font-bold bg-[#18181F] px-2.5 py-1 rounded-md border border-[#DCAE53]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53]" />
                  <span>{step.metric}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Stage Verified</span>
                </span>
                <span className="text-slate-500">Step {step.stepNumber}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prototype Showcase & Action Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111115] via-[#16161c] to-[#111115] border border-[#DCAE53]/30 shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left"
        >
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-[#DCAE53] text-xs font-mono font-bold uppercase">
              <Smartphone className="w-4 h-4" />
              <span>Free Custom Working Prototype</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              See what an instant response system changes for your business.
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No slide decks. We configure your business name, services, and live booking logic into a functioning demo you can test directly on your phone.
            </p>
          </div>

          <button
            onClick={triggerModal}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#DCAE53] text-[#09090B] font-bold text-xs sm:text-sm hover:bg-[#E5B85C] transition-all shadow-lg shadow-[#DCAE53]/20 cursor-pointer"
          >
            <span>{data.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
