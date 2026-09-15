"use client"

import { motion } from "framer-motion"
import { TrendingUp, ShieldAlert, Clock, Award, ArrowRight } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"
import { SectionDivider } from "@/components/section-divider"

export function WhatChanged() {
  const data = SITE_COPY.homepage.whatChanged

  const shiftIcons = [TrendingUp, ShieldAlert, Clock, Award]

  return (
    <section id="what-changed" className="relative py-16 sm:py-24 bg-[#050505] overflow-hidden">
      {/* Chapter Marker */}
      <SectionDivider chapter="I" title="WHAT CHANGED" />

      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DAA640]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
            <span>[ {data.eyebrow} ]</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance mb-4">
            {data.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {data.subheadline}
          </p>
        </motion.div>

        {/* 4 Outcome Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {data.shifts.map((shift, idx) => {
            const Icon = shiftIcons[idx % shiftIcons.length]

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#0B0B0D] border border-white/10 hover:border-[#DAA640]/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 text-left group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#141417] border border-white/10 text-[#DAA640]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-semibold text-zinc-300 bg-[#141417] border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
                      {shift.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#DAA640] transition-colors">
                    {shift.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {shift.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Outcome Impact:</span>
                  <span className="font-semibold text-white">{shift.outcome}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
