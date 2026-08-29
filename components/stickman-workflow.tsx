"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, MessageSquare, Zap, Database, Clock, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function StepGraphic({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="w-full max-w-[420px] rounded-2xl border border-sky-500/30 bg-slate-950 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-1">apexbuild.storefront.app</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded">
            ⚡ SUB-1-SECOND
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-400">Selected Project</span>
            <p className="text-sm font-bold text-white">Full Loft Conversion & Dormer</p>
            <p className="text-xs text-slate-400 font-sans">2 Bedrooms + En-Suite • Survey Date: Sat 18 Oct</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Estimated Project Value:</span>
              <span className="text-white font-mono font-bold">£18,500.00</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-emerald-400 pt-1 border-t border-slate-800">
              <span>Site Survey Deposit:</span>
              <span className="font-mono">£250.00</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-xs text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>Pay £250.00 Deposit & Reserve Survey</span>
          </button>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="w-full max-w-[420px] rounded-2xl border border-emerald-500/30 bg-slate-950 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold font-mono">
              WA
            </div>
            <div>
              <p className="text-xs font-bold text-white">WhatsApp Contractor Alert</p>
              <p className="text-[10px] text-emerald-400 font-mono">Instant Van / On-Site Alert</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Just Now</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold">
            <span>⚡ NEW HIGH-TICKET LEAD & SURVEY PAID</span>
          </div>
          <div className="text-xs font-sans text-slate-200 space-y-1.5 pt-1">
            <p><strong className="text-slate-400">Client:</strong> David Harrison (Solihull, B91)</p>
            <p><strong className="text-slate-400">Phone:</strong> +44 7700 900456</p>
            <p><strong className="text-slate-400">Project:</strong> Full Loft Conversion (£18.5k est.)</p>
            <p><strong className="text-slate-400">Survey Paid:</strong> <span className="text-emerald-400 font-mono font-bold">£250.00 via Stripe</span></p>
            <p><strong className="text-slate-400">Survey Slot:</strong> Sat 18 Oct · 10:00 AM</p>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="w-full max-w-[420px] rounded-2xl border border-sky-500/30 bg-slate-950 p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
            Trade CRM & Xero Auto-Sync
          </span>
          <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/30">
            Live Feed
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-[11px]">David Harrison (Solihull)</p>
              <p className="text-[10px] text-slate-400">Loft Conversion • Sat 18 Oct</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
              £250 Survey Paid
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-[11px]">Mark Evans (Harborne)</p>
              <p className="text-[10px] text-slate-400">Rear Extension • Fri 24 Oct</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
              £350 Survey Paid
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/50 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-[11px]">Rachel Bennett (Sutton)</p>
              <p className="text-[10px] text-slate-400">Roof Replacement • Completed</p>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
              5★ Review Dispatched
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-amber-500/30 bg-slate-950 p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          Contractor Weekly Impact
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          Zero Lost Leads
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <p className="text-2xl font-extrabold text-white font-mono">12.5h</p>
          <p className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Admin Saved / Wk</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">£0</p>
          <p className="text-[10px] text-slate-400 uppercase font-sans font-semibold">No-Show Survey Cost</p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center text-xs text-amber-300 font-sans font-medium">
        ✨ While you're on scaffolding or driving the van, your automated quote engine captures £10k–£50k jobs and locks survey deposits.
      </div>
    </div>
  )
}

export function StickmanWorkflow() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 0,
      title: "1. Homeowner Requests Quote & Survey Online (24/7)",
      subtitle: "Your sub-second mobile website collects project dimensions, specifications, and non-refundable survey deposits while you are on site or driving.",
      badge: "24/7 Quote Intake & Survey Lock",
      icon: Zap,
    },
    {
      id: 1,
      title: "2. Instant WhatsApp Alert Hits Your Phone On Site",
      subtitle: "Triggered instantly via automated cloud webhooks. Complete project summary, client phone number, and address delivered straight to your pocket.",
      badge: "Instant Van / Mobile Alert",
      icon: MessageSquare,
    },
    {
      id: 2,
      title: "3. Trade CRM & Xero Sync the Client Automatically",
      subtitle: "Zero lost scrap paper notes or forgotten voicemails. All customer details, blueprints, and deposit invoices are automatically recorded.",
      badge: "Trade CRM & Accounting Sync",
      icon: Database,
    },
    {
      id: 3,
      title: "4. You Reclaim 12+ Hours Every Single Week",
      subtitle: "No more spending evenings playing phone tag or chasing tire-kickers. Focus on building and managing job sites while automation runs the front desk.",
      badge: "Saved Admin Time & Profit Lift",
      icon: Clock,
    },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-[#020E28] overflow-hidden border-t border-[#DAA640]/15">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#DAA640]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAA640]/10 border border-[#DAA640]/25 text-[#DAA640] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Speed & Automation Win Every Time</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            How Your Business Runs On Autopilot
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg">
            Click through the steps below to watch how customer enquiries convert into paid deposits and WhatsApp alerts.
          </p>
        </div>

        {/* Interactive Step Navigator Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = activeStep === idx
            return (
              <button
                key={step.id}
                suppressHydrationWarning
                onClick={() => setActiveStep(idx)}
                className={`p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? "bg-[#07153B] border-[#DAA640] shadow-[0_0_20px_rgba(218,166,64,0.2)] scale-[1.02]"
                    : "bg-[#07153B]/50 border-slate-800 hover:bg-[#07153B] hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-xl ${isActive ? "bg-[#DAA640]/20 text-[#DAA640]" : "bg-slate-800 text-slate-400"}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded-full ${isActive ? "bg-[#DAA640]/20 text-[#DAA640]" : "bg-slate-800 text-slate-500"}`}>
                    Step 0{idx + 1}
                  </span>
                </div>
                <h4 className={`text-[10px] sm:text-xs font-bold leading-snug line-clamp-2 ${isActive ? "text-white" : "text-slate-400"}`}>
                  {step.badge}
                </h4>
              </button>
            )
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="p-6 sm:p-8 lg:p-12 rounded-3xl bg-[#07153B] border border-[#DAA640]/20 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Text Information Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold uppercase">
                  <span>Step 0{activeStep + 1} of 04</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {steps[activeStep].title}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed font-sans">
                  {steps[activeStep].subtitle}
                </p>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  >
                    <Link href="/book" className="flex items-center gap-2">
                      <span>Book 15-Min Quick Audit</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>

                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="text-xs text-sky-400 hover:text-sky-300 font-mono font-bold underline underline-offset-4"
                  >
                    Next Step →
                  </button>
                </div>
              </div>

              {/* UI Mockup Graphic Display */}
              <div className="lg:col-span-6 flex justify-center">
                <StepGraphic step={activeStep} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
