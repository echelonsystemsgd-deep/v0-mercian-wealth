"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Smartphone, MessageSquare, CreditCard, Star, Zap, X, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SITE_COPY } from "@/lib/site-copy"

const icons = [Globe, Smartphone, MessageSquare, CreditCard, Star, Zap]

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
  const cardIds = ["storefronts", "builders", "whatsapp", "deposits", "reviews", "retainers"]

  // Listen to ?solution= query param to automatically open or highlight target service
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const solution = params.get("solution")
      if (solution === "storefronts" || solution === "mobile" || solution === "web") setActiveService(0)
      else if (solution === "builders" || solution === "booking" || solution === "orders") setActiveService(1)
      else if (solution === "whatsapp" || solution === "alerts") setActiveService(2)
      else if (solution === "deposits" || solution === "stripe" || solution === "checkout") setActiveService(3)
      else if (solution === "reviews" || solution === "google") setActiveService(4)
      else if (solution === "retainers" || solution === "optimization") setActiveService(5)
    }
  }, [])

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
      document.documentElement.style.overflow = "hidden"
      document.body.style.touchAction = "none"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.touchAction = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [activeService])

  return (
    <section id="services" className="relative py-12 sm:py-20 lg:py-24 overflow-hidden bg-[#09090B] border-t border-slate-800/80">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#DCAE53] mb-2 sm:mb-3 font-mono">
            [ Core Conversion &amp; Booking Infrastructure ]
          </p>
          <h2 className="font-sans text-xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">
            High-Conversion Systems Built For Direct Cash Flow
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Sub-second mobile storefronts, 3-tap order builders, WhatsApp lead dispatch, and upfront deposit checkout systems engineered for UK local businesses.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {displayServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                id={cardIds[index]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-full scroll-mt-28"
              >
                <Card className="h-full bg-[#111115] border border-slate-800 hover:border-[#DCAE53]/60 hover:shadow-[0_0_25px_rgba(220,174,83,0.15)] transition-all duration-300 rounded-xl sm:rounded-2xl group flex flex-col justify-between">
                  <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4 text-left">
                      {/* Gold icon */}
                      <div className="inline-flex items-center justify-center p-2.5 sm:p-3 border border-slate-800 bg-[#18181F] text-[#DCAE53] rounded-xl group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[44px]">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-slate-800/80 text-left">
                      {/* Outcome Badge */}
                      <div className="bg-[#18181F] p-2.5 sm:p-3 rounded-xl border border-slate-800">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 block mb-0.5 sm:mb-1">Target Commercial SLA</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">{service.outcome}</span>
                      </div>

                      {/* Interactive Inspect Button */}
                      <button
                        onClick={() => setActiveService(index)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-xl bg-[#18181F] hover:bg-[#22222c] border border-slate-700 hover:border-[#DCAE53]/50 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md touch-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#111115] border border-[#DCAE53]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl overflow-y-auto overscroll-contain touch-pan-y max-h-[90vh] text-left"
            >
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#18181F] text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
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
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-sm transition-all shadow-lg cursor-pointer"
                  >
                    <span>Book a Discovery Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActiveService(null)}
                    className="py-3 px-6 rounded-xl bg-[#18181F] text-slate-300 hover:text-white border border-slate-800 text-sm font-semibold transition-colors cursor-pointer"
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
