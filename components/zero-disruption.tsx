"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Globe, Layers, Smartphone } from "lucide-react"

export function ZeroDisruptionGuarantee() {
  const points = [
    {
      icon: Globe,
      title: "Zero downtime during launch",
      desc: "We design, build, and test your new website on a private staging link. DNS cutover happens in minutes with 0 service interruption.",
    },
    {
      icon: Layers,
      title: "Keep your existing domain, email & SEO",
      desc: "You retain 100% domain ownership. Your business email remains completely untouched, and redirect mapping preserves your Google rankings.",
    },
    {
      icon: Smartphone,
      title: "Zero maintenance for your team",
      desc: "No technical headaches or plugin updates. Cloud hosting, SSL security, speed optimization, and lead alerts to your phone are fully managed.",
    },
  ]

  return (
    <section className="relative py-8 sm:py-12 bg-[#09090B]">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#111115] border border-emerald-500/25 shadow-xl relative overflow-hidden"
        >
          {/* Top Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ZERO-DISRUPTION GUARANTEE</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Timing is confirmed after scoping · No service interruption
            </span>
          </div>

          {/* 3 Bullets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {points.map((point, idx) => {
              const Icon = point.icon
              return (
                <div key={idx} className="space-y-2 text-left">
                  <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {point.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {point.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
