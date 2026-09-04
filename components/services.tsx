"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneCall, Navigation, Sparkles, Cpu, X, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SITE_COPY } from "@/lib/site-copy"

const icons = [PhoneCall, Navigation, Sparkles, Cpu]

export function Services({ limit }: { limit?: number }) {
  const [activeService, setActiveService] = useState<number | null>(null)
  
  const servicesList = SITE_COPY.servicesPage.list.map((item, idx) => ({
    title: item.title,
    description: item.description,
    outcome: item.outcome,
    tagline: item.tagline,
    overview: item.overview,
    features: item.features,
    icon: icons[idx % icons.length],
  }))

  const displayServices = limit ? servicesList.slice(0, limit) : servicesList

  // Handle escape key to close modal
  useEffect(() => {
    if (activeService === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveService(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeService])

  // Prevent scroll background when open
  useEffect(() => {
    if (activeService !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeService])

  return (
    <section id="services" className="relative py-20 lg:py-28 overflow-hidden bg-[#09090B] border-t border-slate-800/80">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCAE53] mb-3 font-mono">
            [ Core AI Infrastructure ]
          </p>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Autonomous AI &amp; Managed Retainer Solutions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto">
            Engineered for high-ticket commercial operators who demand sub-500ms telephony, zero lost contracts, and 24/7 autonomous dispatch.
          </p>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {displayServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="h-full bg-[#111115] border border-slate-800 hover:border-[#DCAE53]/60 hover:shadow-[0_0_25px_rgba(220,174,83,0.15)] transition-all duration-300 rounded-2xl group flex flex-col justify-between">
                  <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      {/* Gold icon */}
                      <div className="inline-flex items-center justify-center p-3 border border-slate-800 bg-[#18181F] text-[#DCAE53] rounded-xl group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[44px]">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-800/80">
                      {/* Outcome Badge */}
                      <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Guaranteed Latency / SLA</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">{service.outcome}</span>
                      </div>

                      {/* Interactive Inspect Button */}
                      <button
                        onClick={() => setActiveService(index)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#18181F] hover:bg-[#22222c] border border-slate-700 hover:border-[#DCAE53]/50 text-xs font-bold text-slate-200 hover:text-white transition-all"
                      >
                        <span>Inspect Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#DCAE53]" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {activeService !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#111115] border border-[#DCAE53]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#18181F] text-slate-400 hover:text-white border border-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#DCAE53] uppercase tracking-wider block mb-1">
                    [ Architecture Specification ]
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {servicesList[activeService].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1">
                    {servicesList[activeService].tagline}
                  </p>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {servicesList[activeService].overview}
                </p>

                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
                    Core Technical Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList[activeService].features.map((f, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#18181F] border border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#DCAE53] shrink-0" />
                          <span>{f.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal pl-5">
                          {f.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/book"
                    onClick={() => setActiveService(null)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-sm transition-all shadow-lg"
                  >
                    <span>Book 15-Minute Voice Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActiveService(null)}
                    className="py-3 px-6 rounded-xl bg-[#18181F] text-slate-300 hover:text-white border border-slate-800 text-sm font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
