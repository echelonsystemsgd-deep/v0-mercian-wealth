"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react"

export interface InsightTakeaway {
  metric: string
  title: string
  description: string
}

export interface EditorialInsightData {
  eyebrow: string
  headline: string
  summary: string
  takeaways: InsightTakeaway[]
}

interface EditorialInsightProps {
  data: EditorialInsightData
  className?: string
}

export function EditorialInsight({ data, className = "" }: EditorialInsightProps) {
  if (!data) return null

  return (
    <section className={`relative py-12 sm:py-16 bg-[#0B0B0E] border-y border-white/5 overflow-hidden ${className}`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#DAA640]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAA640]/10 border border-[#DAA640]/30 text-[10px] sm:text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider">
            <Sparkles size={12} className="text-[#DAA640]" />
            <span>[ {data.eyebrow} ]</span>
          </div>
          <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
            {data.headline}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            {data.summary}
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {data.takeaways.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#111115] border border-white/10 hover:border-[#DAA640]/40 transition-all duration-300 flex flex-col justify-between shadow-lg group"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#18181F] border border-white/10 text-[#DAA640] font-mono text-xs font-bold tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{item.metric}</span>
                </div>
                <h4 className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-[#DAA640] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                <CheckCircle2 size={12} className="text-emerald-400 mr-1.5 shrink-0" />
                <span>Verified Metric</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
