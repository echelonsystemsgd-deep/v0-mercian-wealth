"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  PhoneCall, 
  Box, 
  Navigation, 
  Calculator, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  RotateCw,
  Layers,
  Maximize2,
  Volume2,
  VolumeX,
  PhoneOff,
  Mic,
  Sliders,
  X
} from "lucide-react"
import Link from "next/link"
import * as THREE from "three"

// Sub-components: Voice, 3D WebGL, Dispatch, and ROI Engine
export function UnifiedOperationsSandbox({ initialTab }: { initialTab?: "voice" | "3d" | "dispatch" | "roi" }) {
  const [activeTab, setActiveTab] = useState<"voice" | "3d" | "dispatch" | "roi">(initialTab || "voice")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const demo = params.get("demo")
      if (demo === "voice" || demo === "3d" || demo === "dispatch" || demo === "roi") {
        setActiveTab(demo)
      }
    }
  }, [])

  const tabs = [
    { id: "voice", label: "AI Voice Agent", icon: PhoneCall, badge: "<380ms Latency" },
    { id: "3d", label: "3D Spatial Storefront", icon: Box, badge: "Meshy WebGL" },
    { id: "dispatch", label: "Spatial Dispatch", icon: Navigation, badge: "Real-Time GPS" },
    { id: "roi", label: "Revenue ROI Engine", icon: Calculator, badge: "12.4x Multiple" },
  ] as const

  return (
    <section id="flagship-sandbox" className="relative py-14 sm:py-20 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse text-[#DCAE53]" />
            <span>Interactive Operations Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 text-balance">
            Test Our Autonomous Systems Live
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Switch between our neural voice reception desk, 3D spatial WebGL storefronts, dispatch telemetry, and missed-call revenue recovery engine in real time.
          </p>
        </div>

        {/* Floating Flagship Tab Switcher (Touch-friendly & Mobile-Optimized) */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-[#111115] border border-slate-800 shadow-2xl max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 relative ${
                    isActive 
                      ? "bg-[#DCAE53] text-[#09090B] shadow-lg shadow-[#DCAE53]/20 font-extrabold" 
                      : "text-slate-300 hover:text-white hover:bg-[#18181F]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#09090B]" : "text-[#DCAE53]"}`} />
                  <span>{tab.label}</span>
                  <span className={`hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded ${
                    isActive ? "bg-[#09090B]/15 text-[#09090B]" : "bg-[#18181F] text-emerald-400 border border-slate-800"
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Sandbox View Container */}
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "voice" && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <VoiceAgentLiveModule />
              </motion.div>
            )}

            {activeTab === "3d" && (
              <motion.div
                key="3d"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Spatial3DStorefrontModule />
              </motion.div>
            )}

            {activeTab === "dispatch" && (
              <motion.div
                key="dispatch"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <SpatialDispatchModule />
              </motion.div>
            )}

            {activeTab === "roi" && (
              <motion.div
                key="roi"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <RoiCalculatorModule />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

/* =========================================================================
   1. VOICE AGENT MODULE (WITH REAL BROWSER AUDIO SPEECH SYNTHESIS)
   ========================================================================= */
function VoiceAgentLiveModule() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [callDuration, setCallDuration] = useState<number>(0)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const pauseResumeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const nextLineTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isPlayingRef = useRef<boolean>(false)
  const isMutedRef = useRef<boolean>(false)

  isPlayingRef.current = isPlaying
  isMutedRef.current = isMuted

  const dialogue = [
    { speaker: "agent", text: "Thanks for calling Apex Commercial Climate. This is our 24/7 AI dispatch desk. Are you calling regarding an emergency HVAC failure or scheduled maintenance?", time: "00:02" },
    { speaker: "caller", text: "Hi, our main warehouse server cooling unit just faulted and temperatures are spiking. We need an on-call technician immediately.", time: "00:08" },
    { speaker: "agent", text: "Understood, David. I'm flagging this as Tier-1 Critical. Our closest on-duty technician Marcus is 14 minutes away in Slough. Shall I dispatch him and lock in your emergency callout?", time: "00:15" },
    { speaker: "caller", text: "Yes please, dispatch him right away.", time: "00:22" },
    { speaker: "agent", text: "Confirmed. Technician Marcus has been dispatched. You've received a live GPS tracking link via SMS. Total dispatch time: 24 seconds.", time: "00:26" }
  ]

  const cleanupSpeech = () => {
    if (pauseResumeIntervalRef.current) clearInterval(pauseResumeIntervalRef.current)
    if (nextLineTimeoutRef.current) clearTimeout(nextLineTimeoutRef.current)
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    activeUtteranceRef.current = null
    if (typeof window !== "undefined") {
      delete (window as any).__voiceUtterance
    }
    setIsSpeaking(false)
  }

  const playLine = (index: number) => {
    if (!isPlayingRef.current || index >= dialogue.length) {
      setIsPlaying(false)
      setIsSpeaking(false)
      cleanupSpeech()
      return
    }

    setCurrentLineIndex(index)
    const line = dialogue[index]

    if (isMutedRef.current || typeof window === "undefined" || !("speechSynthesis" in window)) {
      // Muted or speech unsupported: realistic reading delay so transcript steps naturally
      setIsSpeaking(true)
      const wordCount = line.text.split(" ").length
      const readingDurationMs = Math.max(3500, wordCount * 330)

      nextLineTimeoutRef.current = setTimeout(() => {
        setIsSpeaking(false)
        if (index < dialogue.length - 1 && isPlayingRef.current) {
          nextLineTimeoutRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              playLine(index + 1)
            }
          }, 500)
        } else {
          setIsPlaying(false)
        }
      }, readingDurationMs)
      return
    }

    // Unmuted browser speech synthesis
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(line.text)
    utterance.lang = "en-GB"
    utterance.rate = line.speaker === "agent" ? 1.02 : 0.96
    utterance.pitch = line.speaker === "agent" ? 1.0 : 0.88

    // Retain global reference so Chrome doesn't garbage-collect mid-sentence
    activeUtteranceRef.current = utterance
    if (typeof window !== "undefined") {
      (window as any).__voiceUtterance = utterance
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      activeUtteranceRef.current = null
      if (typeof window !== "undefined") {
        delete (window as any).__voiceUtterance
      }

      if (!isPlayingRef.current) return

      if (index < dialogue.length - 1) {
        // Natural 500ms conversational turn-taking pause (sub-500ms neural speed)
        nextLineTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            playLine(index + 1)
          }
        }, 500)
      } else {
        // Final line finished completely
        nextLineTimeoutRef.current = setTimeout(() => {
          setIsPlaying(false)
          setIsSpeaking(false)
        }, 2000)
      }
    }

    utterance.onerror = (e) => {
      // If utterance was intentionally cancelled on stop, do not trigger error loop
      if (!isPlayingRef.current) return
      console.warn("Speech synthesis ended or was interrupted:", e)
      setIsSpeaking(false)
      activeUtteranceRef.current = null
      if (index < dialogue.length - 1 && isPlayingRef.current) {
        nextLineTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            playLine(index + 1)
          }
        }, 1000)
      } else {
        setIsPlaying(false)
      }
    }

    // Chromium keep-alive heartbeat: prevents Chrome from pausing speech after ~15s
    if (pauseResumeIntervalRef.current) clearInterval(pauseResumeIntervalRef.current)
    pauseResumeIntervalRef.current = setInterval(() => {
      if (typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 4500)

    window.speechSynthesis.speak(utterance)
  }

  const startCall = () => {
    cleanupSpeech()
    setIsPlaying(true)
    isPlayingRef.current = true
    setCurrentLineIndex(0)
    setCallDuration(0)
    // Small initial tick to ensure audio context is unlocked
    setTimeout(() => {
      playLine(0)
    }, 100)
  }

  const stopCall = () => {
    setIsPlaying(false)
    isPlayingRef.current = false
    cleanupSpeech()
  }

  // Elapsed duration counter: only tracks call time, NEVER forces speech cancellation
  useEffect(() => {
    if (isPlaying) {
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current)
    }
    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current)
    }
  }, [isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupSpeech()
      if (durationTimerRef.current) clearInterval(durationTimerRef.current)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Column: Call Console */}
      <div className="lg:col-span-8 bg-[#0c0c0e] border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between space-y-4">
        
        {/* Top Telemetry Row */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {isPlaying ? `Live Call In Progress (${callDuration}s)` : "AI Telephony Desk Ready"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-[#18181F] text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#DCAE53]" />}
            </button>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              380ms Latency
            </span>
          </div>
        </div>

        {/* Real-time Waveform Stream Indicator */}
        <div className="p-4 rounded-xl bg-[#111115] border border-slate-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Mic className={`w-4 h-4 ${isSpeaking ? "text-[#DCAE53] animate-pulse" : "text-slate-500"}`} />
            <span className="text-xs font-mono text-slate-300">
              {isPlaying 
                ? (isSpeaking 
                    ? (dialogue[currentLineIndex]?.speaker === "agent" ? "AI Voice Speaking (Live Audio)..." : "Caller Speaking (Slough Depot)...") 
                    : "Neural Turn Handoff (<400ms)...") 
                : "Click 'Start Voice Call' to Hear Live Speech"}
            </span>
          </div>

          {/* Animated Waveform Bars (GPU-accelerated scaleY, 0 layout reflows) */}
          <div className="flex items-center gap-1 h-6">
            {[40, 70, 90, 60, 100, 75, 45, 85, 60, 95, 40].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: isSpeaking ? [Math.max(0.25, (h * 0.2) / 100), h / 100, Math.max(0.3, (h * 0.4) / 100)] : 0.2
                }}
                transition={{ repeat: Infinity, duration: 0.5 + (i % 3) * 0.2, ease: "easeInOut" }}
                style={{ originY: 0.5 }}
                className={`w-1 h-6 rounded-full ${isSpeaking ? "bg-[#DCAE53]" : "bg-slate-700"}`}
              />
            ))}
          </div>
        </div>

        {/* Synchronized Transcript */}
        <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
          {dialogue.slice(0, isPlaying ? currentLineIndex + 1 : 2).map((line, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                line.speaker === "agent"
                  ? "bg-[#18181F] text-slate-200 border border-slate-800 mr-auto"
                  : "bg-[#DCAE53]/10 text-white border border-[#DCAE53]/30 ml-auto"
              }`}
            >
              <div className="text-[10px] font-mono text-[#DCAE53] mb-1 font-bold flex items-center justify-between">
                <span>{line.speaker === "agent" ? "24/7 AI Voice Dispatch" : "Caller"}</span>
                <span className="text-slate-500">{line.time}</span>
              </div>
              <p>{line.text}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          {isPlaying ? (
            <button
              onClick={stopCall}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 transition-all cursor-pointer"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          ) : (
            <button
              onClick={startCall}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#DCAE53] text-[#09090B] text-xs font-bold hover:bg-[#E5B85C] transition-all cursor-pointer shadow-lg shadow-[#DCAE53]/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Start Voice Call (Hear Audio)</span>
            </button>
          )}

          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            Natural Human Cadence · Zero Operator Lag
          </span>
        </div>

      </div>

      {/* Right Column: Triage Result Card */}
      <div className="lg:col-span-4 bg-[#0c0c0e] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase">Autonomous Triage</span>
            <span className="text-[9px] font-mono text-emerald-400">Live Outcome</span>
          </div>

          <div className="p-3 rounded-xl bg-[#111115] border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400">Identified Intent</span>
            <div className="text-xs font-bold text-white">Emergency Commercial Server Cooling Unit Outage</div>
          </div>

          <div className="p-3 rounded-xl bg-[#111115] border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400">Autonomous Action</span>
            <div className="text-xs font-bold text-emerald-400">Spatial Geofence Match → Marcus Dispatched (14m ETA)</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-[#111115] border border-slate-800">
              <span className="text-slate-400 block text-[9px]">Priority</span>
              <span className="text-amber-400 font-bold">Tier-1 Critical</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#111115] border border-slate-800">
              <span className="text-slate-400 block text-[9px]">Contract Value</span>
              <span className="text-[#DCAE53] font-bold">£3,400 Callout</span>
            </div>
          </div>
        </div>

        <Link
          href="/book"
          className="w-full py-3 rounded-xl bg-[#18181F] hover:bg-[#DCAE53] text-[#DCAE53] hover:text-[#09090B] border border-[#DCAE53]/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-2"
        >
          <span>Deploy Voice Agent For Your Firm</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

/* =========================================================================
   2. SPATIAL 3D STOREFRONT MODULE (PROCEDURAL WATCH, DRONE, PENTHOUSE, VALVE)
   ========================================================================= */
function Spatial3DStorefrontModule() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [modelType, setModelType] = useState<"watch" | "drone" | "penthouse" | "valve">("watch")
  const [isWireframe, setIsWireframe] = useState<boolean>(false)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const modelGroupRef = useRef<THREE.Group | null>(null)
  const reqIdRef = useRef<number | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 4.8)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const spot = new THREE.DirectionalLight(0xffffff, 2.0)
    spot.position.set(5, 8, 5)
    scene.add(spot)
    const goldRim = new THREE.PointLight(0xdcae53, 3.5, 30)
    goldRim.position.set(-4, -2, 3)
    scene.add(goldRim)

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdcae53,
      roughness: 0.18,
      metalness: 0.9,
      wireframe: isWireframe
    })

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x18181f,
      roughness: 0.4,
      metalness: 0.6,
      wireframe: isWireframe
    })

    const group = new THREE.Group()

    if (modelType === "watch") {
      const bezel = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.15, 16, 48), goldMat)
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.06, 32), darkMat)
      dial.rotation.x = Math.PI / 2
      dial.position.z = -0.04
      const tourbillon = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 12, 24), goldMat)
      tourbillon.position.set(0, -0.4, 0.04)
      group.add(bezel, dial, tourbillon)
    } else if (modelType === "drone") {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.25, 8), goldMat)
      group.add(body)
      const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]
      angles.forEach(angle => {
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8), darkMat)
        arm.rotation.z = Math.PI / 2
        arm.rotation.y = -angle
        arm.position.set(Math.cos(angle) * 0.7, 0, Math.sin(angle) * 0.7)
        const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.2, 12), goldMat)
        motor.position.set(Math.cos(angle) * 1.3, 0.05, Math.sin(angle) * 1.3)
        group.add(arm, motor)
      })
    } else if (modelType === "penthouse") {
      const pod = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 2.0), darkMat)
      pod.position.y = -0.7
      const floor = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.8), goldMat)
      floor.position.y = -0.55
      const glass = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 1.4), new THREE.MeshPhysicalMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.5 }))
      glass.position.y = -0.2
      const roof = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 1.9), goldMat)
      roof.position.y = 0.2
      group.add(pod, floor, glass, roof)
    } else {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 2.2, 24), goldMat)
      pipe.rotation.z = Math.PI / 2
      const chamber = new THREE.Mesh(new THREE.SphereGeometry(0.65, 24, 16), goldMat)
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 12, 24), goldMat)
      wheel.rotation.x = Math.PI / 2
      wheel.position.y = 1.3
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8), darkMat)
      stem.position.y = 0.8
      group.add(pipe, chamber, wheel, stem)
    }

    scene.add(group)
    modelGroupRef.current = group
    group.rotation.x = 0.2
    group.rotation.y = -0.4

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate)
      if (modelGroupRef.current && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += 0.008
      }
      renderer.render(scene, camera)
    }
    reqIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
      renderer.dispose()
    }
  }, [modelType, isWireframe])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* 3D WebGL Canvas (Touch-Pan-Y to prevent scroll trapping on mobile) */}
      <div 
        className="lg:col-span-8 bg-[#0c0c0e] border border-slate-800 rounded-2xl h-[260px] sm:h-[350px] md:h-[400px] relative flex items-center justify-center cursor-grab select-none touch-pan-y"
        onMouseDown={(e) => { isDraggingRef.current = true; prevPointerRef.current = { x: e.clientX, y: e.clientY } }}
        onMouseMove={(e) => {
          if (!isDraggingRef.current || !modelGroupRef.current) return
          modelGroupRef.current.rotation.y += (e.clientX - prevPointerRef.current.x) * 0.01
          modelGroupRef.current.rotation.x += (e.clientY - prevPointerRef.current.y) * 0.01
          prevPointerRef.current = { x: e.clientX, y: e.clientY }
        }}
        onMouseUp={() => { isDraggingRef.current = false }}
        onTouchStart={(e) => { if (e.touches.length === 1) { isDraggingRef.current = true; prevPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } } }}
        onTouchMove={(e) => {
          if (!isDraggingRef.current || !modelGroupRef.current || e.touches.length !== 1) return
          const deltaX = e.touches[0].clientX - prevPointerRef.current.x
          const deltaY = e.touches[0].clientY - prevPointerRef.current.y
          modelGroupRef.current.rotation.y += deltaX * 0.012
          modelGroupRef.current.rotation.x += deltaY * 0.008
          prevPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }}
        onTouchEnd={() => { isDraggingRef.current = false }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute bottom-3 left-3 bg-[#111115]/90 border border-slate-800 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded-lg pointer-events-none flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-[#DCAE53]" />
          <span>Drag to Inspect 360°</span>
        </div>
      </div>

      {/* Model Switcher Controls */}
      <div className="lg:col-span-4 space-y-4">
        <div className="text-xs font-mono text-[#DCAE53] uppercase font-bold">Select Procedural Asset</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "watch", name: "Tourbillon Watch", val: "£14,500" },
            { id: "drone", name: "Lidar Drone", val: "£8,200" },
            { id: "penthouse", name: "Penthouse Suite", val: "£4.25M" },
            { id: "valve", name: "Cryogenic Valve", val: "£3,650" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setModelType(item.id as any)}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                modelType === item.id ? "bg-[#18181F] border-[#DCAE53] text-white" : "bg-[#0c0c0e] border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-bold">{item.name}</div>
              <div className="font-mono text-[10px] text-[#DCAE53]">{item.val}</div>
            </button>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
              isWireframe ? "bg-[#DCAE53] text-[#09090B] font-bold" : "bg-[#18181F] border-slate-800 text-slate-300"
            }`}
          >
            {isWireframe ? "Wireframe ON" : "Toggle Wireframe"}
          </button>
          <span className="text-[10px] font-mono text-emerald-400">+42% Checkout Lift</span>
        </div>

        <Link
          href="/book"
          className="block w-full py-3 rounded-xl bg-[#DCAE53] text-[#09090B] font-bold text-xs text-center hover:bg-[#E5B85C] transition-all shadow-md mt-4"
        >
          Deploy 3D Storefront For Your Brand
        </Link>
      </div>
    </div>
  )
}

/* =========================================================================
   3. SPATIAL DISPATCH SIMULATION MODULE
   ========================================================================= */
function SpatialDispatchModule() {
  const [step, setStep] = useState<number>(1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
      {[
        { stepNum: 1, title: "1. Inbound Voice Intake", desc: "AI qualifies fault, extracts address, locks deposit.", badge: "< 380ms Latency" },
        { stepNum: 2, title: "2. Geofence Driver Match", desc: "Calculates live GPS coordinates across active fleet.", badge: "Sub-0.4s Routing" },
        { stepNum: 3, title: "3. WhatsApp & PWA Alert", desc: "Driver accepts job on smartphone; customer receives live ETA link.", badge: "Auto-Dispatched" }
      ].map((item) => (
        <div
          key={item.stepNum}
          onClick={() => setStep(item.stepNum)}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            step === item.stepNum 
              ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
              : "bg-[#0c0c0e] border-slate-800 text-slate-400 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-[#DCAE53] uppercase">{item.title}</span>
            <span className="font-mono text-[10px] text-emerald-400">{item.badge}</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* =========================================================================
   4. ROI CALCULATOR MODULE
   ========================================================================= */
function RoiCalculatorModule() {
  const [calls, setCalls] = useState<number>(250)
  const [dealValue, setDealValue] = useState<number>(1800)
  const [missedRate, setMissedRate] = useState<number>(28)

  const lostCalls = Math.round(calls * (missedRate / 100))
  const lostMonthlyRev = lostCalls * dealValue
  const recoveredMonthly = Math.round(lostMonthlyRev * 0.7)
  const retainer = 2250
  const multiple = (recoveredMonthly / retainer).toFixed(1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-7 space-y-4">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-300">Monthly Inbound Phone Calls</span>
            <span className="text-[#DCAE53] font-bold">{calls} Calls</span>
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            value={calls}
            onChange={(e) => setCalls(Number(e.target.value))}
            className="w-full accent-[#DCAE53] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-300">Average Job / Order Value</span>
            <span className="text-[#DCAE53] font-bold">£{dealValue.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="300"
            max="8000"
            step="100"
            value={dealValue}
            onChange={(e) => setDealValue(Number(e.target.value))}
            className="w-full accent-[#DCAE53] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-300">Estimated Missed Call Rate</span>
            <span className="text-red-400 font-bold">{missedRate}% Missed</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            value={missedRate}
            onChange={(e) => setMissedRate(Number(e.target.value))}
            className="w-full accent-[#DCAE53] cursor-pointer"
          />
        </div>
      </div>

      <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0c0c0e] border border-slate-800 space-y-3">
        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Recoverable Revenue</div>
        <div className="text-3xl font-extrabold text-emerald-400 font-mono">
          +£{recoveredMonthly.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span>
        </div>
        <div className="text-xs text-slate-300">
          Against a £2,250/mo retainer, this yields a <strong className="text-[#DCAE53]">{multiple}x Net ROI multiple</strong>.
        </div>
        <Link
          href="/book"
          className="block w-full py-3 rounded-xl bg-[#DCAE53] text-[#09090B] font-bold text-xs text-center hover:bg-[#E5B85C] transition-all shadow-md mt-2"
        >
          Lock Your Postcode Retainer SLA
        </Link>
      </div>
    </div>
  )
}
