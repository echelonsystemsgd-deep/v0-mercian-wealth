"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { PhoneCall, Cpu, Navigation, MessageSquare, ShieldCheck, Activity, CheckCircle2, Zap } from "lucide-react"

interface NodeSpec {
  id: string
  title: string
  subtitle: string
  icon: any
  latency: string
  throughput: string
  mechanism: string
  specs: string[]
}

const nodes: NodeSpec[] = [
  {
    id: "telephony",
    title: "1. SIP Telephony & 24/7 Voice Ingestion",
    subtitle: "Sub-400ms Low-Latency Audio Streaming",
    icon: PhoneCall,
    latency: "< 400ms",
    throughput: "100% Inbound Capture",
    mechanism: "Carrier-grade SIP trunk and neural voice streaming engine that answers every inbound call in under half a second with human conversational fidelity.",
    specs: ["Sub-400ms Neural Audio", "24/7/365 Zero Downtime", "Natural Conversational Flow"]
  },
  {
    id: "subagents",
    title: "2. Autonomous Subagent Triage",
    subtitle: "Real-Time Intent Extraction & Qualification",
    icon: Cpu,
    latency: "Instant",
    throughput: "Zero Scripted Delays",
    mechanism: "Bespoke LLM subagents classify emergency severity, extract technical requirements, verify patient/client budgets, and structure clean CRM data.",
    specs: ["Dynamic Qualification", "Custom Business Logic", "Automated CRM Sync"]
  },
  {
    id: "spatial",
    title: "3. Spatial Matching & Deposit Gateway",
    subtitle: "Geofence Routing & Upfront Card Capture",
    icon: Navigation,
    latency: "< 1.2s",
    throughput: "Automated Routing",
    mechanism: "Matches jobs against real-time driver/technician GPS geofences or clinic diaries, capturing mandatory upfront deposits via instant SMS/Apple Pay links.",
    specs: ["Spatial Fleet Routing", "Stripe & Apple Pay Deposits", "Calendar Slot Locking"]
  },
  {
    id: "dispatch",
    title: "4. Instant WhatsApp & PWA Dispatch",
    subtitle: "Direct Smartphone Alert in < 0.4s",
    icon: MessageSquare,
    latency: "< 0.4s",
    throughput: "Zero Enquiry Drag",
    mechanism: "Full project specifications, client contact details, GPS navigation coordinates, and deposit receipts land on your smartphone before the caller hangs up.",
    specs: ["Instant WhatsApp Alert", "PWA Driver / Staff Intranet", "Live SMS ETA to Customer"]
  }
]

const CYCLE_DURATION = 3500 // ms per node

export function SystemBlueprint() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.2 })
  const [hasStartedView, setHasStartedView] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeNode = nodes[selectedIndex]

  useEffect(() => {
    if (isInView && !hasStartedView) {
      setHasStartedView(true)
      setSelectedIndex(0)
    }
  }, [isInView, hasStartedView])

  const clearAll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
  }, [])

  const startCycle = useCallback(() => {
    clearAll()
    setProgress(0)

    let elapsed = 0
    progressRef.current = setInterval(() => {
      elapsed += 50
      setProgress(Math.min((elapsed / CYCLE_DURATION) * 100, 100))
    }, 50)

    intervalRef.current = setTimeout(() => {
      setSelectedIndex((prev) => (prev + 1) % nodes.length)
    }, CYCLE_DURATION)
  }, [clearAll])

  useEffect(() => {
    if (isInView && !isPaused) {
      startCycle()
    } else {
      clearAll()
    }
    return () => clearAll()
  }, [selectedIndex, isInView, isPaused, startCycle, clearAll])

  const handleManualSelect = (index: number) => {
    clearAll()
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    setSelectedIndex(index)
    setProgress(100)
    setIsPaused(true)

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 8000)
  }

  return (
    <section ref={containerRef} className="relative py-24 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#DCAE53]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse text-[#DCAE53]" />
            <span>Autonomous AI Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            The 4-Node Autonomous Operations Pipeline
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Every layer is engineered for sub-second latency, continuous fault tolerance, and zero human drag.
          </p>
        </div>

        {/* 4 Node Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {nodes.map((node, index) => {
            const Icon = node.icon
            const isSelected = index === selectedIndex
            return (
              <button
                key={node.id}
                onClick={() => handleManualSelect(index)}
                className={`relative flex flex-col p-4 sm:p-5 rounded-2xl border text-left transition-all overflow-hidden ${
                  isSelected 
                    ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
                    : "bg-[#111115] border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                {/* Progress bar line for active node */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#18181F]">
                    <div 
                      className="h-full bg-[#DCAE53] transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-[#DCAE53] text-[#09090B]" : "bg-[#18181F] text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {node.latency}
                  </span>
                </div>

                <div className="font-bold text-white text-xs sm:text-sm mb-1 line-clamp-1">
                  {node.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono line-clamp-1">
                  {node.subtitle}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Node Deep Dive View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#111115] border border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#DCAE53]/10 text-[#DCAE53] border border-[#DCAE53]/20">
                    <activeNode.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {activeNode.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#DCAE53]">
                      {activeNode.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeNode.mechanism}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeNode.specs.map((spec, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18181F] border border-slate-800 text-xs font-mono text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#09090B] border border-slate-800/80 rounded-xl p-5 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">BENCHMARK LATENCY</span>
                  <span className="text-[#DCAE53] font-bold">{activeNode.latency}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">SYSTEM RELIABILITY</span>
                  <span className="text-emerald-400 font-bold">99.98% Uptime SLA</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">DATA PRIVACY</span>
                  <span className="text-white font-bold">UK / GDPR Zero-Train</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
