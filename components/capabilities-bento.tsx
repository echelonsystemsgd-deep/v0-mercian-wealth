"use client"

import React from "react"
import { motion } from "framer-motion"
import { PhoneCall, Navigation, Box, Zap, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function CapabilitiesBento() {
  const pillars = [
    {
      id: "voice",
      title: "24/7 Inbound AI Voice Receptionist",
      subtitle: "Sub-380ms Neural Telephony",
      description: "Answer 100% of emergency, quote, and off-peak calls in under 500ms. Qualify caller intent, collect credit card deposits, and sync with your CRM automatically.",
      icon: PhoneCall,
      stats: "< 380ms Response",
      badge: "Zero Missed Calls",
      bullets: [
        "Human conversational tone with natural pauses",
        "Instant Stripe / Apple Pay deposit capture",
        "Real-time calendar & CRM booking injection"
      ],
      href: "/services#voice",
      featured: true
    },
    {
      id: "dispatch",
      title: "Spatial Fleet Dispatch & Driver PWA",
      subtitle: "Autonomous Field Logistics",
      description: "Match inbound jobs with the closest on-duty field technician or delivery driver via live GPS geofencing. Broadcast instant WhatsApp job alerts in sub-0.4s.",
      icon: Navigation,
      stats: "Sub-0.4s Routing",
      badge: "Real-Time GPS",
      bullets: [
        "Live driver GPS tracking link sent to customer",
        "Automated WhatsApp & PWA driver handoff",
        "Zero dispatcher lag or coordination overhead"
      ],
      href: "/services#dispatch"
    },
    {
      id: "3d",
      title: "3D Spatial E-Commerce & Meshy Studio",
      subtitle: "High-Converting WebGL Storefronts",
      description: "Deploy interactive 360° product inspection models powered by generative neural pipelines. Proven to increase online checkout conversions by over 42%.",
      icon: Box,
      stats: "+42% Conversion",
      badge: "Mobile WebGL Sub-1s",
      bullets: [
        "Real-time procedural PBR material shaders",
        "Touch-optimized for mobile product configurators",
        "Meshy.ai text-to-3D neural mesh generation"
      ],
      href: "/services#3d"
    },
    {
      id: "outbound",
      title: "Autonomous Outbound SDR & Reactivation",
      subtitle: "Speed-To-Lead & Pipeline Revival",
      description: "Dial incoming ad leads in under 45 seconds before they browse a competitor. Continuously nurture cold databases via WhatsApp, SMS, and AI phone outreach.",
      icon: Zap,
      stats: "< 45s Speed-To-Lead",
      badge: "Continuous Pipeline",
      bullets: [
        "Calls web form leads while still on your page",
        "Revives dormant past client databases",
        "5-step dynamic WhatsApp & SMS nurture flows"
      ],
      href: "/services#outbound"
    }
  ]

  return (
    <section id="capabilities" className="relative py-14 sm:py-20 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DCAE53]" />
            <span>The 4 Enterprise Operations Pillars</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 text-balance">
            Autonomous AI Infrastructure
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Everything your firm needs to automate customer intake, dispatch field teams, and scale revenue on a fully managed monthly retainer.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <div
                key={pillar.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${
                  pillar.featured
                    ? "bg-[#111115] border-[#DCAE53]/50 shadow-2xl shadow-[#DCAE53]/10"
                    : "bg-[#0c0c0e] border-slate-800 hover:border-slate-700 shadow-xl"
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                        {pillar.stats}
                      </span>
                      <span className="text-slate-400 bg-[#18181F] border border-slate-800 px-2 py-1 rounded-full hidden sm:inline-block">
                        {pillar.badge}
                      </span>
                    </div>
                  </div>

                  {/* Titles */}
                  <div>
                    <span className="text-[11px] font-mono text-[#DCAE53] uppercase tracking-wider font-bold">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Bullets */}
                  <div className="space-y-2 pt-2">
                    {pillar.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DCAE53] shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Link */}
                <div className="pt-6 mt-4 border-t border-slate-800/80">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#DCAE53] hover:text-[#E5B85C] transition-colors group"
                  >
                    <span>Inspect System Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
