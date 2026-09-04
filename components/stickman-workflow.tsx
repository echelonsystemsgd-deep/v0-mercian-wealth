"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, MessageSquare, Zap, Database, Clock, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stepImages = [
  "/stickman_baker_order.png",
  "/stickman_speed_automation.png",
  "/stickman_crm_autopilot.png",
  "/stickman_relax_saved_time.png",
]

function StepGraphic({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="w-full max-w-[420px] rounded-xl border border-slate-800 bg-[#111115] p-5 shadow-2xl space-y-4">
        {/* Character Illustration Banner */}
        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#18181F] flex items-center justify-center border border-slate-800/80">
          <Image
            src={stepImages[0]}
            alt="Customer Storefront Order"
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-1">localbusiness.storefront.app</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#DCAE53]/10 text-[#DCAE53] border border-[#DCAE53]/30 px-2 py-0.5 rounded">
            ⚡ SUB-1-SECOND
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-[#18181F] border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-[#DCAE53]">Selected Service</span>
            <p className="text-sm font-bold text-white">Custom Project Package</p>
            <p className="text-xs text-slate-400 font-sans">Full Scope Delivery • Scheduled: Sat 24 Oct</p>
          </div>

          <div className="p-3 rounded-lg bg-[#18181F]/80 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total Project Value:</span>
              <span className="text-white font-mono font-bold">£185.00</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#34A88E] pt-1 border-t border-slate-800">
              <span>Required Deposit:</span>
              <span className="font-mono">£50.00</span>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-lg bg-[#DCAE53] font-bold text-xs text-[#09090B] flex items-center justify-center gap-2 shadow-lg shadow-black/40 cursor-pointer">
            <CheckCircle2 className="w-4 h-4 text-[#09090B]" />
            <span>Pay £50.00 Deposit & Reserve Date</span>
          </button>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="w-full max-w-[420px] rounded-xl border border-[#2E8B77]/30 bg-[#111115] p-5 shadow-2xl space-y-4">
        {/* Character Illustration Banner */}
        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#18181F] flex items-center justify-center border border-slate-800/80">
          <Image
            src={stepImages[1]}
            alt="Instant WhatsApp Dispatch"
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#2E8B77]/20 border border-[#2E8B77]/40 flex items-center justify-center text-[#34A88E] text-xs font-bold font-mono">
              WA
            </div>
            <div>
              <p className="text-xs font-bold text-white">WhatsApp Team &amp; Operations Alert</p>
              <p className="text-[10px] text-[#34A88E] font-mono">Instant Dispatch Latency: 0.4s</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Just Now</span>
        </div>

        <div className="p-4 rounded-lg bg-[#2E8B77]/10 border border-[#2E8B77]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-[#34A88E] font-mono text-xs font-bold">
            <span>⚡ NEW BOOKING &amp; DEPOSIT PAID</span>
          </div>
          <div className="text-xs font-sans text-slate-200 space-y-1 pt-1">
            <p><strong className="text-slate-400">Customer:</strong> Sophie Taylor (Reading, RG1)</p>
            <p><strong className="text-slate-400">Phone:</strong> +44 7700 900123</p>
            <p><strong className="text-slate-400">Package:</strong> Custom Project Scope (£185)</p>
            <p><strong className="text-slate-400">Deposit Paid:</strong> <span className="text-[#34A88E] font-mono font-bold">£50.00 via Apple Pay</span></p>
            <p><strong className="text-slate-400">Scheduled Date:</strong> Sat 24 Oct · 11:30 AM</p>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="w-full max-w-[420px] rounded-xl border border-slate-800 bg-[#111115] p-5 shadow-2xl space-y-3">
        {/* Character Illustration Banner */}
        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#18181F] flex items-center justify-center border border-slate-800/80">
          <Image
            src={stepImages[2]}
            alt="Customer Database & Accounting Auto-Sync"
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider">
            Orders &amp; CRM Auto-Sync
          </span>
          <span className="text-[10px] font-mono bg-[#DCAE53]/10 text-[#DCAE53] px-2 py-0.5 rounded border border-[#DCAE53]/30">
            Live Feed
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-[#18181F] border border-slate-800 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-[11px]">Sophie Taylor (Reading)</p>
              <p className="text-[10px] text-slate-400">Project Scope • Sat 24 Oct</p>
            </div>
            <span className="text-[10px] bg-[#2E8B77]/20 text-[#34A88E] border border-[#2E8B77]/30 px-2 py-0.5 rounded font-bold">
              £50 Deposit Paid
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#18181F]/70 border border-slate-800/80 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-[11px]">James Thornton (Windsor)</p>
              <p className="text-[10px] text-slate-400">Bespoke Service • Sun 25 Oct</p>
            </div>
            <span className="text-[10px] bg-[#2E8B77]/20 text-[#34A88E] border border-[#2E8B77]/30 px-2 py-0.5 rounded font-bold">
              £120 Deposit Paid
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#18181F]/40 border border-slate-800/50 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-[11px]">Emma Watson (Maidenhead)</p>
              <p className="text-[10px] text-slate-400">Project Delivery • Completed</p>
            </div>
            <span className="text-[10px] bg-[#DCAE53]/20 text-[#DCAE53] border border-[#DCAE53]/30 px-2 py-0.5 rounded font-bold">
              5★ Review Collected
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[420px] rounded-xl border border-[#DCAE53]/30 bg-[#111115] p-5 shadow-2xl space-y-4">
      {/* Character Illustration Banner */}
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#18181F] flex items-center justify-center border border-slate-800/80">
        <Image
          src={stepImages[3]}
          alt="Saved Hours & Reclaimed Time"
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider">
          Weekly Operational Impact
        </span>
        <span className="text-[10px] font-mono text-[#34A88E] bg-[#2E8B77]/10 px-2 py-0.5 rounded border border-[#2E8B77]/30 font-semibold">
          Zero Lost DMs
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-[#18181F] border border-slate-800 text-center">
          <p className="text-2xl font-extrabold text-white font-mono">10.5h</p>
          <p className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Admin Saved / Wk</p>
        </div>
        <div className="p-3 rounded-lg bg-[#18181F] border border-slate-800 text-center">
          <p className="text-2xl font-extrabold text-[#34A88E] font-mono">£0</p>
          <p className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Unpaid Cancellations</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-center text-xs text-[#DCAE53] font-sans font-medium">
        ✨ While you focus on fulfilling work and serving clients, your automated storefront takes bookings, collects deposits, and alerts your phone 24/7.
      </div>
    </div>
  )
}

export function StickmanWorkflow() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 0,
      title: "1. Customers Configure & Book Online (24/7)",
      subtitle: "Your sub-second mobile storefront collects service packages, project specifications, dates, and upfront deposits while you are on-site or busy with clients.",
      badge: "24/7 Intake & Deposits",
      icon: Zap,
    },
    {
      id: 1,
      title: "2. Instant WhatsApp Alert Hits Your Phone",
      subtitle: "Triggered instantly via automated cloud webhooks. Complete project specifications, customer phone, scheduled date, and deposit receipt sent straight to your pocket.",
      badge: "Instant Smartphone WhatsApp Alert",
      icon: MessageSquare,
    },
    {
      id: 2,
      title: "3. Calendar & Customer Database Auto-Sync",
      subtitle: "Zero lost DM notes or forgotten voicemails. All customer details, appointment dates, and deposit invoices are automatically logged.",
      badge: "Database & Accounting Sync",
      icon: Database,
    },
    {
      id: 3,
      title: "4. You Reclaim 10+ Hours Every Single Week",
      subtitle: "No more spending exhausting evenings chasing bank transfers or answering repetitive questions in DMs. Focus on high-value delivery while automation handles customer intake.",
      badge: "Saved Admin Time & Revenue Lift",
      icon: Clock,
    },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
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
                className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border ${
                  isActive
                    ? "bg-[#18181F] border-[#DCAE53] shadow-[0_0_20px_rgba(220,174,83,0.2)] scale-[1.02]"
                    : "bg-[#111115]/80 border-slate-800 hover:bg-[#111115] hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${isActive ? "bg-[#DCAE53]/20 text-[#DCAE53]" : "bg-slate-800 text-slate-400"}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded-full ${isActive ? "bg-[#DCAE53]/20 text-[#DCAE53]" : "bg-slate-800 text-slate-500"}`}>
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
        <div className="p-6 sm:p-8 lg:p-12 rounded-2xl bg-[#111115] border border-slate-800/80 backdrop-blur-xl shadow-2xl">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-bold uppercase">
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
                    className="bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold rounded-lg shadow-md"
                  >
                    <Link href="/book" className="flex items-center gap-2">
                      <span>Book 15-Min Business Audit</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>

                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="text-xs text-[#DCAE53] hover:text-[#E5B85C] font-mono font-bold underline underline-offset-4"
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
