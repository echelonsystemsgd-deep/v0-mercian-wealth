"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SITE_COPY } from "@/lib/site-copy"

import { SectionDivider } from "@/components/section-divider"

export function Bottleneck() {
  const [isOrdered, setIsOrdered] = useState(false)
  const data = SITE_COPY.homepage.bottleneck

  // SVG Coordinates for Chaos vs Order state
  const nodes = [
    { id: 1, chaos: { x: 80, y: 120 }, order: { x: 50, y: 200 } },
    { id: 2, chaos: { x: 220, y: 80 }, order: { x: 170, y: 200 } },
    { id: 3, chaos: { x: 340, y: 150 }, order: { x: 290, y: 200 } },
    { id: 4, chaos: { x: 120, y: 280 }, order: { x: 200, y: 110 } },
    { id: 5, chaos: { x: 280, y: 320 }, order: { x: 200, y: 290 } },
  ]

  const orderedSolutions = [
    "Zero time wasted on back-and-forth. Customer requirements, service scope, and calendar availability are qualified automatically 24/7.",
    "Costly missed calls and double-bookings eliminated. 24/7 AI answers every call, qualifies project specs, and confirms appointments live.",
    "Sub-60s response captures customers while intent is peak. Never let an enquiry go cold or bounce to a competitor.",
    "Automatic 5-star review collection and structured follow-up protects your local market reputation on autopilot.",
  ]

  return (
    <section id="bottleneck" className="relative py-16 sm:py-24 overflow-hidden bg-[#050505]">
      {/* Chapter Marker */}
      <SectionDivider chapter="II" title="REVENUE HAEMORRHAGE" />

      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(218, 166, 64, 0.08) 0%, rgba(5, 5, 5, 0) 60%)"
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">

        {/* ── Centered headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#DAA640]">
            [ {data.eyebrow} ]
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold text-white mt-4 leading-[1.15] text-balance">
            {data.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mt-4 max-w-2xl mx-auto">
            {data.subheadline}
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#DAA640] font-medium mt-3 max-w-2xl mx-auto">
            {data.goldSlogan}
          </p>
        </motion.div>

        {/* ── Visual + Cards side-by-side ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Interactive SVG Visualiser */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center min-w-0 max-w-full"
          >
            <div className="relative w-full max-w-lg h-auto bg-[#0B0B0D] border border-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col justify-start items-center overflow-hidden min-w-0 max-w-full">
              <div className="w-full flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOrdered ? "bg-[#DAA640] animate-pulse" : "bg-rose-500 animate-pulse"}`} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                    {isOrdered ? data.modeAutomated : data.modeManual}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#DAA640]">
                  {isOrdered ? "Pipeline Streamlined" : "High Friction"}
                </span>
              </div>

              {/* Interactive Node Graph */}
              <div className="w-full flex items-center justify-center py-2">
                <svg viewBox="0 0 400 400" className="w-full h-auto max-h-[220px] sm:max-h-[260px]">
                  {/* Connection Lines */}
                  {isOrdered ? (
                    <>
                      <motion.line x1="50" y1="200" x2="170" y2="200" stroke="rgba(218, 166, 64, 0.4)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                      <motion.line x1="170" y1="200" x2="290" y2="200" stroke="rgba(218, 166, 64, 0.4)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                      <motion.line x1="200" y1="110" x2="170" y2="200" stroke="rgba(218, 166, 64, 0.4)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                      <motion.line x1="200" y1="290" x2="170" y2="200" stroke="rgba(218, 166, 64, 0.4)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                      {/* Flow pulse dots */}
                      <motion.circle r="4" fill="#DAA640" animate={{ cx: [50, 170], cy: [200, 200] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                      <motion.circle r="4" fill="#DAA640" animate={{ cx: [200, 170], cy: [110, 200] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                      <motion.circle r="4" fill="#DAA640" animate={{ cx: [200, 170], cy: [290, 200] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                    </>
                  ) : (
                    <>
                      <line x1="80" y1="120" x2="220" y2="80" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="1" />
                      <line x1="220" y1="80" x2="120" y2="280" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="1" />
                      <line x1="120" y1="280" x2="340" y2="150" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="1" />
                      <line x1="340" y1="150" x2="280" y2="320" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="1" />
                      <line x1="80" y1="120" x2="280" y2="320" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="1" />
                    </>
                  )}

                  {/* Nodes */}
                  {nodes.map((node) => (
                    <motion.g key={node.id}>
                      <motion.circle
                         cx={isOrdered ? node.order.x : node.chaos.x}
                         cy={isOrdered ? node.order.y : node.chaos.y}
                         r={isOrdered ? "12" : "8"}
                         fill={isOrdered ? "#141417" : "#050505"}
                         stroke={isOrdered ? "#DAA640" : "#ef4444"}
                         strokeWidth="2"
                        animate={{
                          cx: isOrdered ? node.order.x : node.chaos.x,
                          cy: isOrdered ? node.order.y : node.chaos.y,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      />
                    </motion.g>
                  ))}

                  {/* Central Hub in Order state */}
                  {isOrdered && (
                    <motion.circle
                       cx="170"
                       cy="200"
                       r="16"
                       fill="#DAA640"
                       stroke="#050505"
                       strokeWidth="2.5"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </svg>
              </div>

              {/* Toggle Switch */}
              <div className="w-full border-t border-white/10 pt-4 mt-4 flex flex-col sm:flex-row gap-3 items-center sm:justify-between bg-transparent relative z-20 shrink-0">
                <span className="text-xs font-semibold text-zinc-300">
                  {isOrdered ? "Automated Response Active" : "Manual Scramble Active"}
                </span>
                <Button
                  onClick={() => setIsOrdered(!isOrdered)}
                  size="sm"
                  variant={isOrdered ? "default" : "outline"}
                  className={`w-full sm:w-auto text-xs px-4 py-2 border transition-all shrink-0 cursor-pointer min-h-[38px] ${
                    isOrdered 
                      ? "bg-[#DAA640] text-black hover:bg-[#E5B85C]" 
                      : "bg-transparent border-rose-500/50 text-rose-400 hover:bg-rose-500/10"
                  }`}
                >
                  {isOrdered ? data.triggerBtnActive : data.triggerBtnInactive}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Outcomes Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-3.5"
          >
            {data.cards.map((card, idx) => (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                  isOrdered 
                    ? "bg-[#0B0B0D] border-[#DAA640]/40 shadow-md" 
                    : "bg-[#0B0B0D] border-white/10"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isOrdered ? "text-[#DAA640] bg-[#DAA640]/10" : "text-rose-400 bg-rose-500/10"}`}>
                    {isOrdered ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-bold text-sm sm:text-base text-white">{card.title}</h3>
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        isOrdered ? "bg-[#DAA640]/10 text-[#DAA640]" : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {card.outcome}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {isOrdered ? orderedSolutions[idx] : card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Post-Bottleneck CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto min-h-[44px] py-3.5 sm:py-4 px-8 text-sm font-semibold bg-[#DAA640] text-black hover:bg-[#E5B85C] shadow-lg shadow-[#DAA640]/20 rounded-xl cursor-pointer"
          >
            <Link href="/book" className="flex items-center justify-center gap-2">
              <span>Book a call</span>
              <span className="text-base shrink-0">→</span>
            </Link>
          </Button>
        </motion.div>

      </div>

    </section>
  )
}
