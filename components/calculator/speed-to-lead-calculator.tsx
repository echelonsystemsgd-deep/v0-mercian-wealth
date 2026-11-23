"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRight, Check, Minus, Plus, Zap, ShieldCheck } from "lucide-react"

const ParticleBarChart = dynamic(
  () => import("./particle-bar-chart").then((mod) => mod.ParticleBarChart),
  { ssr: false, fallback: <div className="h-[280px] flex items-center justify-center text-xs font-mono text-[#E2B857]/40">Initializing 3D Particle Engine...</div> }
)

export function SpeedToLeadCalculator() {
  const [enquiries, setEnquiries] = useState<number>(65)
  const [ticketValue, setTicketValue] = useState<number>(3200)
  const [responseTimeHours, setResponseTimeHours] = useState<number>(4)
  const [periodYears, setPeriodYears] = useState<number>(5)

  const [vectors, setVectors] = useState<{
    afterHours: boolean
    depositLag: boolean
    unansweredChannels: boolean
  }>({
    afterHours: true,
    depositLag: true,
    unansweredChannels: false,
  })

  // Calculation logic
  const { annualLeak, recapturedCapital, monthlyLeak } = useMemo(() => {
    // Base drop-off formula based on response delay (Harvard Business Review benchmark: response within 5m is 21x more likely to convert than 30m+)
    let baseDropOff = 0.18
    if (responseTimeHours <= 0.5) baseDropOff = 0.08
    else if (responseTimeHours <= 1) baseDropOff = 0.14
    else if (responseTimeHours <= 3) baseDropOff = 0.22
    else if (responseTimeHours <= 6) baseDropOff = 0.32
    else baseDropOff = 0.44

    // Additional drop-off factors
    if (vectors.afterHours) baseDropOff += 0.10
    if (vectors.depositLag) baseDropOff += 0.08
    if (vectors.unansweredChannels) baseDropOff += 0.09

    baseDropOff = Math.min(baseDropOff, 0.65)

    const monthlyEnquiriesLost = enquiries * baseDropOff
    const monthlyLost = monthlyEnquiriesLost * ticketValue
    const yearlyLost = monthlyLost * 12
    const totalPeriodLost = yearlyLost * periodYears

    // Mercian autonomous triage recaptures ~78-85% of dropped leads
    const recaptured = totalPeriodLost * 0.82

    return {
      annualLeak: yearlyLost,
      recapturedCapital: recaptured,
      monthlyLeak: monthlyLost,
    }
  }, [enquiries, ticketValue, responseTimeHours, periodYears, vectors])

  const openPrototypeModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prototype-modal"))
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section id="roi-calculator" className="relative py-20 sm:py-28 bg-[#08080a] overflow-hidden border-y border-white/5">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E2B857]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Reticle Corner Brackets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header HUD */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-[#E2B857]/40 bg-[#121216] font-mono text-[10px] sm:text-xs text-[#E2B857] uppercase tracking-[0.2em] mb-4 chamfered-sm">
            <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
            <span>[ SEC 03 / 06 · REVENUE RETRIEVAL SIMULATOR ]</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold uppercase text-white tracking-wide max-w-3xl leading-tight">
            Calculate Your <em className="italic font-normal text-[#E2B857]">Revenue Haemorrhage</em>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mt-3 leading-relaxed">
            Every minute of manual response delay and uncollected deposit bleeds high-ticket clients. 
            Adjust your metrics below to model institutional capital recovery with Mercian Autonomous Triage.
          </p>
        </div>

        {/* 2-Panel Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 obsidian-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative">
          
          {/* Hairline Crosshair Reticles on Card */}
          <span className="absolute -top-2 -left-2 font-mono text-xs text-[#E2B857]/60">+</span>
          <span className="absolute -top-2 -right-2 font-mono text-xs text-[#E2B857]/60">+</span>
          <span className="absolute -bottom-2 -left-2 font-mono text-xs text-[#E2B857]/60">+</span>
          <span className="absolute -bottom-2 -right-2 font-mono text-xs text-[#E2B857]/60">+</span>

          {/* Left Panel: Sliders & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 pr-0 lg:pr-4">
            
            {/* Control 1: Monthly Enquiries */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-zinc-400 uppercase">MONTHLY INBOUND ENQUIRIES</span>
                <span className="text-white font-bold text-sm sm:text-base bg-[#18181F] px-2.5 py-0.5 rounded border border-white/10">
                  {enquiries} leads/mo
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEnquiries((prev) => Math.max(15, prev - 5))}
                  className="w-8 h-8 rounded bg-[#18181F] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E2B857]/40 flex items-center justify-center transition-colors"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="range"
                  min="15"
                  max="400"
                  step="5"
                  value={enquiries}
                  onChange={(e) => setEnquiries(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E2B857]"
                />
                <button
                  type="button"
                  onClick={() => setEnquiries((prev) => Math.min(400, prev + 5))}
                  className="w-8 h-8 rounded bg-[#18181F] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E2B857]/40 flex items-center justify-center transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Control 2: Average Project Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-zinc-400 uppercase">AVERAGE PROJECT / CLIENT VALUE</span>
                <span className="text-white font-bold text-sm sm:text-base bg-[#18181F] px-2.5 py-0.5 rounded border border-white/10 text-[#E2B857]">
                  {formatCurrency(ticketValue)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTicketValue((prev) => Math.max(500, prev - 250))}
                  className="w-8 h-8 rounded bg-[#18181F] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E2B857]/40 flex items-center justify-center transition-colors"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={ticketValue}
                  onChange={(e) => setTicketValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E2B857]"
                />
                <button
                  type="button"
                  onClick={() => setTicketValue((prev) => Math.min(15000, prev + 250))}
                  className="w-8 h-8 rounded bg-[#18181F] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E2B857]/40 flex items-center justify-center transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Control 3: Manual Response Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-zinc-400 uppercase">CURRENT MANUAL RESPONSE TIME</span>
                <span className="text-white font-bold text-sm sm:text-base bg-[#18181F] px-2.5 py-0.5 rounded border border-white/10 text-amber-400">
                  {responseTimeHours} {responseTimeHours === 1 ? "Hour" : "Hours"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setResponseTimeHours((prev) => Math.max(0.5, prev - 0.5))}
                  className="w-8 h-8 rounded bg-[#18181F] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E2B857]/40 flex items-center justify-center transition-colors"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="range"
                  min="0.5"
                  max="18"
                  step="0.5"
                  value={responseTimeHours}
                  onChange={(e) => setResponseTimeHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E2B857]"
                />
                <button
                  type="button"
                  onClick={() => setResponseTimeHours((prev) => Math.min(18, prev + 0.5))}
                  className="w-8 h-8 rounded bg-[#18181F] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E2B857]/40 flex items-center justify-center transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Leakage Vectors Checklist */}
            <div className="pt-2 border-t border-white/5 space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                ACTIVE LEAKAGE CHANNELS:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setVectors((v) => ({ ...v, afterHours: !v.afterHours }))}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                    vectors.afterHours
                      ? "border-[#E2B857]/40 bg-[#E2B857]/10 text-white"
                      : "border-white/5 bg-[#121216] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${vectors.afterHours ? "border-[#E2B857] bg-[#E2B857] text-black" : "border-zinc-700"}`}>
                    {vectors.afterHours && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>After-Hours Drop (5pm-9am)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVectors((v) => ({ ...v, depositLag: !v.depositLag }))}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                    vectors.depositLag
                      ? "border-[#E2B857]/40 bg-[#E2B857]/10 text-white"
                      : "border-white/5 bg-[#121216] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${vectors.depositLag ? "border-[#E2B857] bg-[#E2B857] text-black" : "border-zinc-700"}`}>
                    {vectors.depositLag && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>Manual Stripe Deposit Lag</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVectors((v) => ({ ...v, unansweredChannels: !v.unansweredChannels }))}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all sm:col-span-2 ${
                    vectors.unansweredChannels
                      ? "border-[#E2B857]/40 bg-[#E2B857]/10 text-white"
                      : "border-white/5 bg-[#121216] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${vectors.unansweredChannels ? "border-[#E2B857] bg-[#E2B857] text-black" : "border-zinc-700"}`}>
                    {vectors.unansweredChannels && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>Unanswered Direct WhatsApp & Instagram Inbounds</span>
                </button>
              </div>
            </div>

            {/* Projection Period Selector */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mr-2">TIMEFRAME:</span>
              {[
                { label: "1 YEAR", val: 1 },
                { label: "3 YEARS", val: 3 },
                { label: "5 YEARS", val: 5 },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setPeriodYears(p.val)}
                  className={`px-3.5 py-2.5 min-h-[44px] text-xs font-mono rounded transition-colors flex items-center justify-center ${
                    periodYears === p.val
                      ? "bg-[#E2B857] text-black font-bold shadow-md"
                      : "bg-[#18181F] text-zinc-400 hover:text-white border border-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

          </div>

          {/* Right Panel: 3D Particle Chart & Readout */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0C0C0F] rounded-xl p-6 border border-white/5 relative overflow-hidden">
            
            {/* Top Readout Header */}
            <div className="space-y-1 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E2B857]">
                PROJECTED CAPITAL RETRIEVAL ({periodYears} {periodYears === 1 ? "YEAR" : "YEARS"})
              </span>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {formatCurrency(annualLeak * periodYears)}
              </div>
              <span className="text-xs font-mono text-zinc-500 block">
                Estimated lost capital over current timeframe
              </span>
            </div>

            {/* 3D Particle Chart */}
            <div className="my-1">
              <ParticleBarChart
                leakedRevenue={annualLeak}
                recapturedRevenue={recapturedCapital}
                periodYears={periodYears}
              />
            </div>

            {/* Recaptured Capital Highlight Box */}
            <div className="p-3.5 rounded-lg bg-[#E2B857]/10 border border-[#E2B857]/30 space-y-1 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-[#E2B857] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  RECAPTURED WITH MERCIAN TRIAGE:
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  +82% EFFICIENCY
                </span>
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                {formatCurrency(recapturedCapital)}
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              type="button"
              onClick={openPrototypeModal}
              className="w-full py-3.5 px-6 bg-[#E2B857] hover:bg-[#F0C96E] text-black font-semibold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all chamfered gold-glow cursor-pointer"
            >
              <span>REQUEST SYSTEM BLUEPRINT</span>
              <ArrowUpRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}
