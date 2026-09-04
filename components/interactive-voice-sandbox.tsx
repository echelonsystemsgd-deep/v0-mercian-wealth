"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  Volume2, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Layers, 
  Wrench, 
  Stethoscope, 
  Truck, 
  Building2,
  ArrowRight,
  Play,
  RotateCcw
} from "lucide-react"
import Link from "next/link"

interface VoiceScenario {
  id: string
  title: string
  industry: string
  icon: any
  callerName: string
  callerNumber: string
  averageDealValue: string
  latency: string
  dialogue: Array<{
    speaker: "agent" | "caller"
    text: string
    timestamp: string
  }>
  outcome: {
    intent: string
    action: string
    leadStatus: string
    estimatedValue: string
  }
}

const SCENARIOS: VoiceScenario[] = [
  {
    id: "trades",
    title: "Emergency HVAC / Trades Dispatch",
    industry: "High-Ticket Home Services",
    icon: Wrench,
    callerName: "David Thornton (Commercial Property)",
    callerNumber: "+44 7911 ••• 482",
    averageDealValue: "£3,400",
    latency: "380ms",
    dialogue: [
      {
        speaker: "agent",
        text: "Thanks for calling Apex Commercial Climate. This is our 24/7 AI dispatch desk. Are you calling regarding an emergency HVAC failure or a scheduled maintenance quote?",
        timestamp: "00:02"
      },
      {
        speaker: "caller",
        text: "Hi, our main warehouse server cooling unit just faulted and temperatures are spiking. We need an on-call technician immediately.",
        timestamp: "00:07"
      },
      {
        speaker: "agent",
        text: "Understood, David. I'm flagging this as Tier-1 Critical. I see your facility is located in Slough. Our closest on-duty technician is 14 minutes away. Shall I dispatch him immediately and lock in your emergency callout?",
        timestamp: "00:14"
      },
      {
        speaker: "caller",
        text: "Yes please, dispatch them right away.",
        timestamp: "00:18"
      },
      {
        speaker: "agent",
        text: "Confirmed. Technician Marcus has been dispatched. You've received a live GPS tracking link via SMS. Total dispatch time: 28 seconds.",
        timestamp: "00:24"
      }
    ],
    outcome: {
      intent: "Emergency Server Room Cooling Outage",
      action: "Spatial Matching Triggered → Marcus dispatched (14m ETA)",
      leadStatus: "Tier-1 Critical · Dispatched",
      estimatedValue: "£3,400 Callout + Repair"
    }
  },
  {
    id: "clinic",
    title: "Private Dental & MedSpa Setter",
    industry: "Elective Healthcare & Aesthetics",
    icon: Stethoscope,
    callerName: "Clara Jennings",
    callerNumber: "+44 7700 ••• 195",
    averageDealValue: "£4,800",
    latency: "410ms",
    dialogue: [
      {
        speaker: "agent",
        text: "Good afternoon, thank you for calling Mercian Aesthetics & Cosmetic Dentistry. I'm your digital concierge. How can I assist with your consultation today?",
        timestamp: "00:02"
      },
      {
        speaker: "caller",
        text: "Hi there, I saw your full-arch composite bonding case studies on Instagram and wanted to see what appointment slots you have open for Dr. Harrison this Friday.",
        timestamp: "00:09"
      },
      {
        speaker: "agent",
        text: "Dr. Harrison has two diagnostic 3D scan appointments available this Friday: 11:15 AM or 3:45 PM. Both include digital smile design previews. Which time suits your schedule best?",
        timestamp: "00:16"
      },
      {
        speaker: "caller",
        text: "3:45 PM works perfectly for me.",
        timestamp: "00:20"
      },
      {
        speaker: "agent",
        text: "Brilliant, Clara. I have provisionally reserved Friday at 3:45 PM. I've just sent your secure deposit link and medical intake form via WhatsApp to confirm the suite reservation.",
        timestamp: "00:27"
      }
    ],
    outcome: {
      intent: "Full-Arch Cosmetic Consultation",
      action: "Dr. Harrison Calendar Blocked · WhatsApp Deposit Sent",
      leadStatus: "High-Ticket Prospect · Reserved",
      estimatedValue: "£4,800 Treatment Plan"
    }
  },
  {
    id: "logistics",
    title: "Freight & Logistics Broker Inbound",
    industry: "Haulage & Fleet Dispatch",
    icon: Truck,
    callerName: "Brokerage Logistics Desk",
    callerNumber: "+44 7855 ••• 821",
    averageDealValue: "£2,100",
    latency: "395ms",
    dialogue: [
      {
        speaker: "agent",
        text: "Mercian Freight Operations. Our automated load dispatcher is online. State your route pickup postcode and trailer specification.",
        timestamp: "00:02"
      },
      {
        speaker: "caller",
        text: "We need a 44-tonne curtain-sider pickup in Birmingham B24 delivering to London Gateway by 06:00 tomorrow morning. Rate is £1,850.",
        timestamp: "00:09"
      },
      {
        speaker: "agent",
        text: "Checking telematics... We have Unit #18 currently discharging 8 miles away in Solihull with full driver tachograph clearance. I have accepted the tender and dispatched driver instructions.",
        timestamp: "00:17"
      },
      {
        speaker: "caller",
        text: "Excellent, sending broker confirmation sheet now.",
        timestamp: "00:21"
      },
      {
        speaker: "agent",
        text: "Confirmation ingested and driver notified via PWA. POD will be transmitted automatically upon signature.",
        timestamp: "00:26"
      }
    ],
    outcome: {
      intent: "Overnight Dedicated Freight Run",
      action: "Tachograph & Unit #18 Spatial Match → Auto-Tender Accepted",
      leadStatus: "Booked & Dispatched",
      estimatedValue: "£1,850 Haulage Margin"
    }
  },
  {
    id: "property",
    title: "Commercial & Luxury Property Desk",
    industry: "Real Estate & Asset Portfolios",
    icon: Building2,
    callerName: "Julian Vance (Corporate Tenant)",
    callerNumber: "+44 7922 ••• 301",
    averageDealValue: "£7,500/mo",
    latency: "420ms",
    dialogue: [
      {
        speaker: "agent",
        text: "Thank you for contacting Sovereign Property Group. Are you enquiring about our commercial office suites or prime residential portfolio?",
        timestamp: "00:02"
      },
      {
        speaker: "caller",
        text: "I'm calling regarding the 4,000 sq ft Mayfair office floor on St. James's. Is accompanied viewing available tomorrow afternoon?",
        timestamp: "00:09"
      },
      {
        speaker: "agent",
        text: "Yes, our Senior Asset Director has an exclusive private walkthrough window at 2:00 PM or 4:30 PM tomorrow. May I confirm the company name for security access badges?",
        timestamp: "00:18"
      },
      {
        speaker: "caller",
        text: "It's for Vance Capital Partners, 6 attendees.",
        timestamp: "00:22"
      },
      {
        speaker: "agent",
        text: "Registered, Julian. 2:00 PM viewing confirmed. Floor plans, NDA and parking access QR codes have been emailed to your corporate address.",
        timestamp: "00:29"
      }
    ],
    outcome: {
      intent: "Mayfair 4,000 Sq Ft Corporate Lease",
      action: "Asset Director Diary Confirmed · Security Badges Generated",
      leadStatus: "Institutional Qualified",
      estimatedValue: "£90,000 Annual Lease"
    }
  }
]

export function InteractiveVoiceSandbox() {
  const [selectedId, setSelectedId] = useState<string>("trades")
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0)
  const [callDuration, setCallDuration] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const scenario = SCENARIOS.find(s => s.id === selectedId) || SCENARIOS[0]

  // Reset dialogue playback when switching scenarios
  const handleSelectScenario = (id: string) => {
    setSelectedId(id)
    setIsPlaying(false)
    setCurrentLineIndex(0)
    setCallDuration(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Handle Playback Simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => {
          const nextTime = prev + 1
          // Advance dialogue lines based on timeline
          if (nextTime === 3 && currentLineIndex === 0) setCurrentLineIndex(1)
          if (nextTime === 8 && currentLineIndex === 1) setCurrentLineIndex(2)
          if (nextTime === 15 && currentLineIndex === 2) setCurrentLineIndex(3)
          if (nextTime === 21 && currentLineIndex === 3) setCurrentLineIndex(4)
          if (nextTime >= 28) {
            setIsPlaying(false)
            if (timerRef.current) clearInterval(timerRef.current)
          }
          return nextTime
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, currentLineIndex])

  const startCall = () => {
    setCurrentLineIndex(0)
    setCallDuration(0)
    setIsPlaying(true)
  }

  const stopCall = () => {
    setIsPlaying(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `0${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <section id="voice-sandbox" className="relative py-24 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#DCAE53]" />
            <span>Interactive AI Telephony Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Hear Sub-500ms AI Voice In Action
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Select an industry below and trigger a simulated inbound call. Experience human-fidelity conversation, instant qualification, and automated spatial dispatch in real time.
          </p>
        </div>

        {/* Industry Scenario Switcher */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {SCENARIOS.map((item) => {
            const Icon = item.icon
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                onClick={() => handleSelectScenario(item.id)}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected 
                    ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
                    : "bg-[#111115] border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-[#DCAE53] text-[#09090B]" : "bg-[#18181F] text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.latency}
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm mb-0.5 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                  Avg: {item.averageDealValue}
                </p>
              </button>
            )
          })}
        </div>

        {/* Main Live Telephony Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Interactive Call Console */}
          <div className="lg:col-span-7 bg-[#111115] border border-slate-800 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl relative">
            
            {/* Top Bar: Call Status & Telemetry */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-3.5 h-3.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping absolute inset-0 opacity-75" : "bg-slate-600"}`} />
                  <div className={`w-3.5 h-3.5 rounded-full ${isPlaying ? "bg-emerald-400" : "bg-slate-600"} relative`} />
                </div>
                <div>
                  <div className="text-xs font-mono text-white font-bold flex items-center gap-2">
                    <span>{isPlaying ? "LIVE CALL IN PROGRESS" : "STANDBY · READY TO DIAL"}</span>
                    {isPlaying && (
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.2 rounded border border-emerald-500/20">
                        {formatSeconds(callDuration)}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Caller: {scenario.callerName} ({scenario.callerNumber})
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-400 bg-[#18181F] px-2.5 py-1 rounded-lg border border-slate-800">
                  <Zap className="w-3 h-3 text-[#DCAE53]" />
                  <span>Latency: {scenario.latency}</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Audio Waveform */}
            <div className="bg-[#09090B] border border-slate-800/80 rounded-xl p-4 sm:p-5 mb-6">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Volume2 className={`w-4 h-4 ${isPlaying ? "text-[#DCAE53] animate-pulse" : "text-slate-600"}`} />
                  <span>Sub-Second Neural Audio Stream</span>
                </div>
                <span className="text-[#DCAE53]">
                  {isPlaying ? (scenario.dialogue[currentLineIndex]?.speaker === "agent" ? "AI Speaking..." : "Caller Speaking...") : "Audio Paused"}
                </span>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-14 px-2">
                {[40, 65, 85, 30, 95, 55, 75, 45, 90, 60, 35, 80, 50, 70, 95, 40, 60, 85, 30, 90, 55, 75, 45, 95, 65, 40, 80, 55].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying ? [`${Math.max(15, (height * (i % 3 + 1)) % 100)}%`, `${height}%`, `${Math.max(20, (height * 0.7))}%`] : "15%",
                    }}
                    transition={{
                      repeat: isPlaying ? Infinity : 0,
                      duration: 0.6 + (i % 5) * 0.1,
                      ease: "easeInOut"
                    }}
                    className={`w-1 sm:w-1.5 rounded-full transition-colors ${
                      isPlaying 
                        ? (scenario.dialogue[currentLineIndex]?.speaker === "agent" ? "bg-[#DCAE53]" : "bg-emerald-400")
                        : "bg-slate-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Conversation Transcript Window */}
            <div className="flex-1 space-y-3 min-h-[220px] max-h-[280px] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-slate-800">
              <AnimatePresence mode="popLayout">
                {scenario.dialogue.slice(0, currentLineIndex + 1).map((msg, index) => {
                  const isAgent = msg.speaker === "agent"
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="font-mono text-[10px] text-slate-400">
                          {isAgent ? "24/7 AI Voice Dispatch" : scenario.callerName}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500">
                          {msg.timestamp}
                        </span>
                      </div>
                      <div
                        className={`p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[90%] ${
                          isAgent 
                            ? "bg-[#18181F] border border-slate-800 text-slate-200 rounded-tl-sm"
                            : "bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-white rounded-tr-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Call Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    onClick={startCall}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#DCAE53]/20"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Simulate Inbound Call</span>
                  </button>
                ) : (
                  <button
                    onClick={stopCall}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Simulation</span>
                  </button>
                )}

                <button
                  onClick={startCall}
                  title="Restart Call"
                  className="p-2.5 rounded-lg bg-[#18181F] hover:bg-[#20202a] text-slate-300 border border-slate-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                <span>Natural Human Tone · Zero Robotic Delay</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Operational Outcome & Retainer Value */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Live Triage & Routing Card */}
            <div className="bg-[#111115] border border-slate-800 rounded-2xl p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#DCAE53]" />
                    <h3 className="font-bold text-white text-sm">Autonomous Triage Summary</h3>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live Telemetry
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Extracted Intent</span>
                    <p className="text-xs sm:text-sm font-semibold text-white">{scenario.outcome.intent}</p>
                  </div>

                  <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Autonomous Action</span>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-400">{scenario.outcome.action}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Status</span>
                      <span className="text-xs font-bold text-[#DCAE53]">{scenario.outcome.leadStatus}</span>
                    </div>
                    <div className="bg-[#18181F] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Deal Value</span>
                      <span className="text-xs font-bold text-white">{scenario.outcome.estimatedValue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retainer Value Callout */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-start gap-2.5 mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#DCAE53] shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white">Why clients pay monthly retainers:</strong> We maintain sub-500ms voice servers, monitor SIP trunk health, audit edge cases, and ensure 0 missed calls 24/7/365.
                  </p>
                </div>

                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs sm:text-sm transition-all shadow-lg"
                >
                  <span>Deploy 24/7 AI Voice For Your Firm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
