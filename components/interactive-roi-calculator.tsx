"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, PhoneCall, TrendingUp, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function InteractiveRoiCalculator() {
  const [monthlyCalls, setMonthlyCalls] = useState(120)
  const [avgDealValue, setAvgDealValue] = useState(1800)
  const [missedRate, setMissedRate] = useState(25) // 25% missed/unanswered

  // Calculations
  const missedCallsPerMonth = Math.round(monthlyCalls * (missedRate / 100))
  const closeRateOnInbound = 0.35 // 35% of high-intent calls convert if answered immediately
  const lostDealsPerMonth = Math.round(missedCallsPerMonth * closeRateOnInbound)
  const lostMonthlyRevenue = lostDealsPerMonth * avgDealValue
  const recoveredMonthlyRevenue = Math.round(lostMonthlyRevenue * 0.85) // 85% recovered via 24/7 sub-500ms voice agent
  const estimatedAnnualValue = recoveredMonthlyRevenue * 12
  
  // Retainer Comparison (£1,500/mo baseline managed ops)
  const monthlyRetainerCost = 1500
  const roiMultiple = (recoveredMonthlyRevenue / monthlyRetainerCost).toFixed(1)

  return (
    <section id="roi-calculator" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#DCAE53]" />
            <span>Voice &amp; Telephony ROI Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Calculate Your Lost Revenue From Missed Telephony
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg">
            See exactly how much revenue your business leaks from unanswered calls, delayed DM replies, and after-hours emergency enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-[#111115] border border-slate-800 flex flex-col justify-between">
            <div className="space-y-6 sm:space-y-8">
              
              {/* Slider 1: Monthly Inbound Inquiries */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#DCAE53] shrink-0" />
                    <span>Monthly Inbound Calls &amp; High-Intent Enquiries</span>
                  </label>
                  <span className="text-xs sm:text-sm font-bold font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-2.5 py-1 rounded-lg border border-[#DCAE53]/25">
                    {monthlyCalls} calls/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={monthlyCalls}
                  onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#18181F] rounded-lg appearance-none cursor-pointer accent-[#DCAE53]"
                  aria-label="Monthly Inbound Calls"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>30 calls (Boutique)</span>
                  <span>250 calls (Mid-Size)</span>
                  <span>500+ calls (Enterprise)</span>
                </div>
              </div>

              {/* Slider 2: Average Job / Treatment / Order Value */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#DCAE53] shrink-0" />
                    <span>Average Job / Treatment / Consultation Value (£)</span>
                  </label>
                  <span className="text-xs sm:text-sm font-bold font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-2.5 py-1 rounded-lg border border-[#DCAE53]/25">
                    £{avgDealValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="10000"
                  step="100"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#18181F] rounded-lg appearance-none cursor-pointer accent-[#DCAE53]"
                  aria-label="Average Deal Value"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>£300</span>
                  <span>£4,500</span>
                  <span>£10,000+</span>
                </div>
              </div>

              {/* Slider 3: Estimated Missed / Unanswered Rate */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#DCAE53] shrink-0" />
                    <span>Estimated Missed Rate (After-Hours &amp; On-Site)</span>
                  </label>
                  <span className="text-xs sm:text-sm font-bold font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                    {missedRate}% Missed
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={missedRate}
                  onChange={(e) => setMissedRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#18181F] rounded-lg appearance-none cursor-pointer accent-red-400"
                  aria-label="Missed Call Rate"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>10% (Low)</span>
                  <span>30% (Industry Average)</span>
                  <span>60% (High Drag)</span>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#DCAE53] shrink-0" />
              <span>Calculated from real UK commercial emergency and high-ticket service lead conversion rates.</span>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#18181F] to-[#111115] border border-[#DCAE53]/40 flex flex-col justify-between shadow-2xl relative">
            
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-slate-400">Monthly Leakage vs Recovery</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  {roiMultiple}x Retainer ROI
                </span>
              </div>

              {/* Stat 1: Leaking Monthly */}
              <div className="bg-[#09090B] p-4 rounded-xl border border-red-500/20 mb-4">
                <span className="text-[11px] font-mono uppercase text-red-400 block mb-1">
                  Estimated Monthly Revenue Leaking to Competitors
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-red-400 font-mono">
                  -£{lostMonthlyRevenue.toLocaleString()} / mo
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  ~{lostDealsPerMonth} lost high-ticket deals/month due to delayed pickup.
                </div>
              </div>

              {/* Stat 2: Recovered with 24/7 Voice AI */}
              <div className="bg-[#09090B] p-4 rounded-xl border border-[#DCAE53]/30 mb-4">
                <span className="text-[11px] font-mono uppercase text-[#DCAE53] block mb-1">
                  Projected Recovered Revenue with 24/7 AI Voice
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#DCAE53] font-mono">
                  +£{recoveredMonthlyRevenue.toLocaleString()} / mo
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  +£{estimatedAnnualValue.toLocaleString()} projected annual revenue unlocked.
                </div>
              </div>
            </div>

            {/* CTA & Retainer Justification */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Deploying a 24/7 AI Voice Receptionist &amp; Dispatch Engine pays for its monthly retainer within the first <strong>1–2 saved client calls</strong>.
              </p>

              <Link
                href="/book"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs sm:text-sm transition-all shadow-lg"
              >
                <span>Book 15-Min Voice Diagnostic Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
