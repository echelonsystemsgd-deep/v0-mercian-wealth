"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Calendar, 
  CreditCard, 
  ArrowRight,
  Navigation,
  ShieldCheck,
  Zap,
  Activity,
  UserCheck
} from "lucide-react"

export function InteractivePhoneDemo() {
  const [activeWorkflow, setActiveWorkflow] = useState<"emergency" | "consultation">("emergency")
  const [activeStep, setActiveStep] = useState<number>(3) // Default to final dispatch state for immediate visual impact
  const [isSimulating, setIsSimulating] = useState(false)

  const emergencyFlow = {
    title: "Commercial HVAC / Emergency Breakdown",
    caller: "Apex Logistics Hub (Slough)",
    issue: "Industrial Chiller #2 Offline · Server Warning",
    match: "Technician Marcus (On-Duty · 14 mins away)",
    deposit: "£350.00 Emergency Callout Locked",
    smsAlert: "Marcus dispatched to Apex Logistics (SL1 4NB). Live GPS ETA: 14 mins. Diagnostic fee paid via Stripe.",
    whatsappLog: "🚨 [CRITICAL DISPATCH #8492]\nLocation: Slough SL1 4NB\nClient: Apex Logistics\nETA: 14 Mins (Marcus En Route)\nPayment: £350 Deposit Captured"
  }

  const consultationFlow = {
    title: "Private Clinic / Full-Arch Implant Consultation",
    caller: "Clara Jennings (Aesthetic Referral)",
    issue: "Full-Arch Cosmetic Treatment ($4.8k Scope)",
    match: "Dr. Harrison (Harley St Suite · Friday 3:45 PM)",
    deposit: "£200.00 Consultation Deposit Captured",
    smsAlert: "Clara's slot locked for Friday 3:45 PM. 3D Scan Suite pre-reserved. Patient intake submitted via WhatsApp.",
    whatsappLog: "✨ [NEW HIGH-TICKET CONSULTATION]\nPatient: Clara Jennings\nTreatment: Full-Arch Cosmetic\nSlot: Friday 3:45 PM\nDeposit: £200.00 Secured"
  }

  const currentFlow = activeWorkflow === "emergency" ? emergencyFlow : consultationFlow

  const runSimulation = () => {
    setIsSimulating(true)
    setActiveStep(1)
    setTimeout(() => {
      setActiveStep(2)
      setTimeout(() => {
        setActiveStep(3)
        setIsSimulating(false)
      }, 1200)
    }, 1200)
  }

  return (
    <section suppressHydrationWarning className="relative py-24 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      {/* Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#DCAE53]" />
            <span>Real-Time Autonomous Dispatch Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            From Inbound Call to Smartphone Dispatch in 30 Seconds
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Watch how our voice AI agent picks up, extracts caller specifications, triggers spatial routing, and dispatches full project notes and upfront deposits directly to your smartphone.
          </p>
        </div>

        {/* Workflow Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => {
              setActiveWorkflow("emergency")
              setActiveStep(3)
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeWorkflow === "emergency"
                ? "bg-[#DCAE53] text-[#09090B] shadow-lg shadow-[#DCAE53]/20"
                : "bg-[#111115] text-slate-300 hover:bg-[#18181F] border border-slate-800"
            }`}
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span>Commercial Trades &amp; Emergency Dispatch</span>
          </button>

          <button
            onClick={() => {
              setActiveWorkflow("consultation")
              setActiveStep(3)
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeWorkflow === "consultation"
                ? "bg-[#DCAE53] text-[#09090B] shadow-lg shadow-[#DCAE53]/20"
                : "bg-[#111115] text-slate-300 hover:bg-[#18181F] border border-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>High-Ticket Clinic &amp; Consultation Setter</span>
          </button>
        </div>

        {/* Interactive Layout: Controls & Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3-Phase Stepper */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Step 1 */}
            <div 
              onClick={() => setActiveStep(1)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStep === 1 
                  ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
                  : "bg-[#111115] border-slate-800 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${activeStep === 1 ? "bg-[#DCAE53] text-[#09090B]" : "bg-[#18181F] text-slate-400"}`}>
                    01
                  </div>
                  <h3 className="font-bold text-white text-sm">Sub-500ms Voice Pickup &amp; Intent Analysis</h3>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  &lt; 0.4s Pickup
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-9">
                The caller is greeted naturally, conversation is transcribed, and job requirements or medical intents are extracted with zero robotic delays.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveStep(2)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStep === 2 
                  ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
                  : "bg-[#111115] border-slate-800 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${activeStep === 2 ? "bg-[#DCAE53] text-[#09090B]" : "bg-[#18181F] text-slate-400"}`}>
                    02
                  </div>
                  <h3 className="font-bold text-white text-sm">Spatial Matching &amp; Deposit Gateway</h3>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Geofence Match
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-9">
                The agent checks closest fleet availability or doctor schedules, secures upfront deposit via instant SMS link, and locks the calendar slot.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveStep(3)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStep === 3 
                  ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
                  : "bg-[#111115] border-slate-800 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${activeStep === 3 ? "bg-[#DCAE53] text-[#09090B]" : "bg-[#18181F] text-slate-400"}`}>
                    03
                  </div>
                  <h3 className="font-bold text-white text-sm">Instant WhatsApp &amp; PWA Smartphone Alert</h3>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Sub-0.4s Alert
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-9">
                Full job notes, GPS coordinates, customer budget, and confirmed payment notifications arrive on your smartphone in under 0.4 seconds.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-sm transition-all shadow-lg shadow-[#DCAE53]/20"
              >
                <Activity className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
                <span>{isSimulating ? "Simulating Live Dispatch..." : "Run Complete 30-Second Simulation"}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Smartphone UI Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] bg-[#111115] border-4 border-slate-800 rounded-[38px] p-4 shadow-2xl shadow-black/80">
              
              {/* Speaker / Dynamic Island Notch */}
              <div className="w-28 h-4 bg-[#09090B] rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#18181F] mr-2" />
                <div className="w-8 h-1.5 rounded-full bg-[#18181F]" />
              </div>

              {/* Screen Content */}
              <div className="bg-[#09090B] border border-slate-800/80 rounded-[28px] p-4 min-h-[460px] flex flex-col justify-between">
                
                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 border-b border-slate-800/80 mb-3">
                    <span className="text-white font-bold">MERCIAN OPERATOR</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800 text-left">
                          <div className="flex items-center gap-2 text-[#DCAE53] text-xs font-bold mb-1">
                            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                            <span>Inbound Voice Call Live</span>
                          </div>
                          <div className="text-[11px] font-mono text-white">{currentFlow.caller}</div>
                          <div className="text-[10px] text-slate-400 mt-1">Status: Extracting job scope...</div>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-left">
                          <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-1">Extracted Needs</div>
                          <div className="text-xs text-white font-medium">{currentFlow.issue}</div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800 text-left">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Spatial Fleet Match Found</span>
                          </div>
                          <div className="text-xs text-white font-semibold">{currentFlow.match}</div>
                        </div>

                        <div className="bg-[#DCAE53]/10 border border-[#DCAE53]/30 p-3 rounded-xl text-left">
                          <div className="text-[10px] font-mono uppercase text-[#DCAE53] font-bold mb-1">Deposit Capture</div>
                          <div className="text-xs text-white font-bold">{currentFlow.deposit}</div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        {/* WhatsApp Notification Bubble */}
                        <div className="bg-[#18181F] p-3.5 rounded-2xl border border-emerald-500/30 text-left shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp Dispatch Alert</span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-500">Just now</span>
                          </div>
                          <pre className="text-[11px] font-sans text-slate-200 whitespace-pre-wrap leading-relaxed">
                            {currentFlow.whatsappLog}
                          </pre>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-left flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-[11px] text-emerald-300 font-medium">Calendar Locked &amp; SMS Sent</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Bar on Mobile */}
                <div className="pt-3 border-t border-slate-800/80 text-center">
                  <div className="text-[10px] font-mono text-slate-400">
                    MERCIAN 24/7 AUTONOMOUS DISPATCH
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
