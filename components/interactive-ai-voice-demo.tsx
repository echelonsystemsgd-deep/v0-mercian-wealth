"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneCall, Play, Pause, RotateCcw, Volume2, CheckCircle2, Calendar, ShieldCheck, Sparkles, User, Bot, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Scenario = "inbound" | "outbound"

interface TranscriptMessage {
  speaker: "ai" | "customer"
  speakerName: string
  text: string
  timestamp: string
}

const SCENARIOS: Record<Scenario, {
  title: string
  subtitle: string
  badge: string
  callerInfo: string
  outcome: string
  duration: string
  audioFrequencyData: number[]
  transcripts: TranscriptMessage[]
}> = {
  inbound: {
    title: "Inbound AI Phone Receptionist",
    subtitle: "Customer calls on a Sunday afternoon with an urgent commercial boiler repair.",
    badge: "24/7 INBOUND VOICE TRIAGE",
    callerInfo: "Inbound Caller · James (Facilities Manager, Apex Logistics)",
    outcome: "Diagnostic Scoped · Calendar Slot Confirmed · WhatsApp Alert Sent",
    duration: "0:42",
    audioFrequencyData: [40, 75, 90, 60, 85, 100, 70, 95, 80, 60, 45, 70, 85, 95, 60, 80, 100, 75, 50, 65, 85, 90, 70, 40],
    transcripts: [
      {
        speaker: "ai",
        speakerName: "Mercian AI Receptionist",
        timestamp: "00:01",
        text: "Good afternoon, thank you for calling Apex Commercial Services. I'm the automated assistant. How can I help you today?"
      },
      {
        speaker: "customer",
        speakerName: "James (Caller)",
        timestamp: "00:07",
        text: "Hi there. Our main heating system just tripped in warehouse 4. Do you have an engineer available first thing Monday morning?"
      },
      {
        speaker: "ai",
        speakerName: "Mercian AI Receptionist",
        timestamp: "00:15",
        text: "I can certainly arrange an emergency diagnostic engineer for warehouse 4. We have Monday at 8:30 AM or 10:00 AM available. Which suits you better?"
      },
      {
        speaker: "customer",
        speakerName: "James (Caller)",
        timestamp: "00:26",
        text: "8:30 AM is perfect. It's James Mitchell at Apex Logistics in Reading."
      },
      {
        speaker: "ai",
        speakerName: "Mercian AI Receptionist",
        timestamp: "00:32",
        text: "Thank you James. I've reserved the 8:30 AM slot on Monday. I've just sent an SMS confirmation to your number, and our lead engineer has received your job specifications. Have a great rest of your Sunday."
      }
    ]
  },
  outbound: {
    title: "AI Outbound Speed-to-Lead & Reactivation",
    subtitle: "AI automatically phones a lead within 45 seconds of web form submission.",
    badge: "< 45s SPEED-TO-LEAD CALLBACK",
    callerInfo: "Outbound Call · Sarah (Private Clinic Enquirer)",
    outcome: "Lead Engaged · Treatment Requirements Collected · Booking Secured",
    duration: "0:38",
    audioFrequencyData: [50, 80, 65, 95, 70, 85, 90, 60, 75, 100, 80, 55, 70, 85, 60, 90, 95, 70, 60, 80, 90, 65, 45, 30],
    transcripts: [
      {
        speaker: "ai",
        speakerName: "Mercian AI Assistant",
        timestamp: "00:01",
        text: "Hello Sarah, this is the automated booking coordinator following up on the consultation request you just submitted on our website. Do you have two minutes to confirm your appointment?"
      },
      {
        speaker: "customer",
        speakerName: "Sarah (Lead)",
        timestamp: "00:11",
        text: "Oh wow, that was fast! Yes, I was just looking at your Thursday evening consultation times."
      },
      {
        speaker: "ai",
        speakerName: "Mercian AI Assistant",
        timestamp: "00:18",
        text: "We have Dr. Rostova available this Thursday at 5:30 PM or 6:45 PM for private consultations. Which would you prefer?"
      },
      {
        speaker: "customer",
        speakerName: "Sarah (Lead)",
        timestamp: "00:27",
        text: "5:30 PM works great for me."
      },
      {
        speaker: "ai",
        speakerName: "Mercian AI Assistant",
        timestamp: "00:31",
        text: "Brilliant, Sarah. That's locked in for Thursday at 5:30 PM. I've just dispatched your booking details and clinic location link via WhatsApp. We look forward to seeing you."
      }
    ]
  }
}

export function InteractiveAiVoiceDemo() {
  const [scenario, setScenario] = useState<Scenario>("inbound")
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentData = SCENARIOS[scenario]

  // Handle Scenario Change
  const handleSelectScenario = (newScenario: Scenario) => {
    setIsPlaying(false)
    setProgress(0)
    setActiveTranscriptIndex(0)
    if (timerRef.current) clearInterval(timerRef.current)
    setScenario(newScenario)
  }

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      setIsPlaying(true)
    }
  }

  // Handle Reset
  const handleReset = () => {
    setIsPlaying(false)
    setProgress(0)
    setActiveTranscriptIndex(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Progress simulation loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            if (timerRef.current) clearInterval(timerRef.current)
            return 100
          }
          const next = prev + 2.5
          // Update active transcript based on percentage
          const stepSize = 100 / currentData.transcripts.length
          const currentIdx = Math.min(
            Math.floor(next / stepSize),
            currentData.transcripts.length - 1
          )
          setActiveTranscriptIndex(currentIdx)
          return next
        })
      }, 500)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, currentData.transcripts.length])

  return (
    <section id="voice-demo" className="relative py-16 sm:py-24 bg-[#09090B] border-y border-slate-800 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
            <Volume2 size={13} className="animate-pulse text-[#DCAE53]" />
            <span>Interactive AI Voice Player — Listen Live</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Hear How Our AI Answers Your Phone In Seconds.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Listen to realistic simulated calls powered by our voice models. Natural British inflection, sub-second latency, and zero hold times.
          </p>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 sm:mt-8">
            <button
              onClick={() => handleSelectScenario("inbound")}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                scenario === "inbound"
                  ? "bg-[#DCAE53] text-[#09090B] shadow-lg shadow-[#DCAE53]/20"
                  : "bg-[#111115] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              1. Inbound 24/7 Receptionist
            </button>
            <button
              onClick={() => handleSelectScenario("outbound")}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                scenario === "outbound"
                  ? "bg-[#DCAE53] text-[#09090B] shadow-lg shadow-[#DCAE53]/20"
                  : "bg-[#111115] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              2. Outbound Speed-to-Lead Callback
            </button>
          </div>
        </div>

        {/* The Audio Player Console */}
        <div className="bg-[#111115] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Bar: Call Status & Telemetry */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-[#DCAE53]"}`} />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#DCAE53] font-bold">
                  {currentData.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentData.title}
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                {currentData.subtitle}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                Latency: &lt; 550ms
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#18181F] border border-slate-800 text-slate-300 font-bold">
                Accuracy: 99.4%
              </span>
            </div>
          </div>

          {/* Interactive Waveform & Controls */}
          <div className="bg-[#09090B] border border-slate-800/80 rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              
              {/* Play / Pause / Reset Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause call audio" : "Play call audio"}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#DCAE53]/20 cursor-pointer shrink-0"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <button
                  onClick={handleReset}
                  aria-label="Restart call simulation"
                  className="w-9 h-9 rounded-full bg-[#18181F] hover:bg-[#20202A] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 cursor-pointer shrink-0"
                >
                  <RotateCcw size={14} />
                </button>

                <div className="text-left">
                  <div className="text-xs font-mono text-white font-bold">
                    {isPlaying ? "Simulating Live Call..." : progress === 100 ? "Call Completed" : "Click to Play Call"}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Duration: {currentData.duration}
                  </div>
                </div>
              </div>

              {/* Verified Outcome Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <CheckCircle2 size={13} className="shrink-0" />
                <span className="truncate">{currentData.outcome}</span>
              </div>
            </div>

            {/* Audio Waveform Bars */}
            <div className="h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-1.5 px-2 bg-[#111115] rounded-lg border border-slate-800/60 overflow-hidden">
              {currentData.audioFrequencyData.map((height, idx) => {
                const isActive = (idx / currentData.audioFrequencyData.length) * 100 <= progress
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      height: isPlaying ? [`${Math.max(15, height * 0.4)}%`, `${height}%`, `${Math.max(15, height * 0.6)}%`] : `${Math.max(15, height * 0.3)}%`,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: isPlaying ? Infinity : 0,
                      delay: idx * 0.03,
                    }}
                    className={`w-full rounded-full transition-colors duration-150 ${
                      isActive
                        ? "bg-[#DCAE53]"
                        : "bg-slate-800"
                    }`}
                  />
                )
              })}
            </div>

            {/* Progress Track */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#DCAE53] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Synchronized Call Transcript Read-Along */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="uppercase tracking-wider">Live Call Transcript (Read-Along)</span>
              <span className="text-[#DCAE53]">Two-Way Conversational AI</span>
            </div>

            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {currentData.transcripts.map((item, idx) => {
                const isCurrent = idx === activeTranscriptIndex
                const isAi = item.speaker === "ai"

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isCurrent && isPlaying
                        ? "bg-[#18181F] border-[#DCAE53]/50 shadow-md"
                        : "bg-white/[0.02] border-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {isAi ? (
                          <div className="w-4 h-4 rounded-full bg-[#DCAE53]/20 border border-[#DCAE53]/40 flex items-center justify-center text-[#DCAE53]">
                            <Bot size={10} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                            <User size={10} />
                          </div>
                        )}
                        <span className={`text-[11px] font-mono font-bold ${isAi ? "text-[#DCAE53]" : "text-slate-300"}`}>
                          {item.speakerName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed pl-5">
                      {item.text}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Bottom Call to Action strip */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400 text-center sm:text-left font-sans">
              Want to hear how this sounds customized with your company name, services, and live diary?
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] transition-all shrink-0 cursor-pointer shadow-md"
            >
              <span>Test A Prototype For Your Business</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
