"use client"

import { motion } from "framer-motion"
import { Bot, MessageSquare, Calendar, Zap, BellRing } from "lucide-react"

export function AutomationSection() {
  const capabilities = [
    {
      title: "Instant Enquiry Routing",
      desc: "Incoming enquiries from high-value prospects trigger instant alerts to your smartphone, ensuring responses occur while buyer intent is peak.",
      icon: BellRing,
    },
    {
      title: "Autonomous Lead Capture",
      desc: "Structured qualification builders collect essential project parameters upfront, eliminating back-and-forth administration before the first call.",
      icon: MessageSquare,
    },
    {
      title: "Calendar Synchronization",
      desc: "Direct two-way calendar availability lets vetted clients select meeting slots without manual email ping-pong.",
      icon: Calendar,
    },
    {
      title: "CRM & System Webhooks",
      desc: "Client details and project specifications dispatch directly into your internal databases or spreadsheets with zero double-handling.",
      icon: Zap,
    },
  ]

  return (
    <section id="automation" className="relative min-h-[85vh] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-6xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + 04 — SUPPORTING SYSTEMS
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#d4af37]">DIGITAL AUTOMATION</span><br />
            THAT WORKS FOR YOU.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            While bespoke website design remains our primary craft, intelligent backend automation ensures no enquiry slips through the cracks. Connect processes, eliminate manual paperwork, and run operations efficiently.
          </p>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.title}
                className="p-5 sm:p-6 bg-[#060a16]/90 border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded border border-[#d4af37]/30 bg-[#0a1124] flex items-center justify-center text-[#d4af37] mb-4">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2.5">
                    {c.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
