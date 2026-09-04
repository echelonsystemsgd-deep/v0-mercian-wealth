"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Clock, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function InteractiveRoiCalculator() {
  const [weeklyHours, setWeeklyHours] = useState(12)
  const [monthlyRevenue, setMonthlyRevenue] = useState(18000)

  // Calculations
  const hourlyValuation = 40 // £40/hr operational/business owner rate
  const annualHoursSaved = Math.round(weeklyHours * 0.8 * 52) // 80% order admin automated
  const annualTimeValue = annualHoursSaved * hourlyValuation
  const annualRevenueCaptured = Math.round(monthlyRevenue * 12 * 0.15) // 15% extra orders captured via 24/7 mobile storefront
  const totalAnnualValue = annualTimeValue + annualRevenueCaptured

  return (
    <section id="roi-calculator" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Calculate Your Saved Time &amp; Extra Revenue
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg">
            See how eliminating manual DM message tag, capturing upfront deposits, and receiving instant WhatsApp alerts impact your annual profit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#111115] border border-slate-800 backdrop-blur-xl flex flex-col justify-between min-w-0 max-w-full">
            <div className="space-y-6 sm:space-y-8">
              {/* Slider 1: Weekly Hours */}
              <div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3">
                  <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#DCAE53] shrink-0" />
                    <span>Weekly Manual Order Intake &amp; DM Message Admin</span>
                  </label>
                  <span className="self-start xs:self-auto text-sm sm:text-base font-bold font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-[#DCAE53]/25">
                    {weeklyHours} hrs/week
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full mobile-touch-slider h-2.5 bg-[#18181F] rounded-lg appearance-none cursor-pointer accent-[#DCAE53] my-1"
                  aria-label="Weekly Manual Order Intake Hours"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono mt-2">
                  <span>5 hrs (Light)</span>
                  <span>20 hrs (Moderate)</span>
                  <span>40 hrs (Heavy)</span>
                </div>
              </div>

              {/* Slider 2: Monthly Revenue */}
              <div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3">
                  <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#DCAE53] shrink-0" />
                    <span>Estimated Monthly Turnover (£)</span>
                  </label>
                  <span className="self-start xs:self-auto text-sm sm:text-base font-bold font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-[#DCAE53]/25">
                    £{monthlyRevenue.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="80000"
                  step="1000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full mobile-touch-slider h-2.5 bg-[#18181F] rounded-lg appearance-none cursor-pointer accent-[#DCAE53] my-1"
                  aria-label="Estimated Monthly Turnover"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono mt-2">
                  <span>£3,000</span>
                  <span>£40,000</span>
                  <span>£80,000+</span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 border-t border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#DCAE53] shrink-0" />
              <span>Guaranteed 24/7 order capture with zero contract lock-in</span>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#111115] border border-[#DCAE53]/30 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden min-w-0 max-w-full">
            <div className="absolute top-0 right-0 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#DCAE53] bg-[#DCAE53]/10 border-b border-l border-[#DCAE53]/20 rounded-bl-xl">
              Annual Impact
            </div>

            <div className="space-y-5 pt-3 sm:pt-4">
              <div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Annual Admin Time Saved
                </span>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-mono flex items-baseline gap-1.5 flex-wrap">
                  <span>{annualHoursSaved} Hours</span>
                  <span className="text-[11px] sm:text-xs text-[#DCAE53] font-normal font-sans">(~{Math.round(annualHoursSaved / 8)} full work days)</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Est. Extra Revenue Captured (+15%)
                </span>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DCAE53] font-mono">
                  +£{annualRevenueCaptured.toLocaleString()} / year
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#2E8B77]/10 border border-[#2E8B77]/30 shadow-[0_0_20px_rgba(46,139,119,0.12)]">
                <span className="text-[10px] sm:text-xs font-bold text-[#34A88E] uppercase tracking-widest block mb-1">
                  Total Annual Value Unlocked
                </span>
                <motion.div
                  key={totalAnnualValue}
                  initial={{ scale: 0.96, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#34A88E] font-mono tracking-tight break-words drop-shadow-[0_0_15px_rgba(46,139,119,0.25)]"
                >
                  £{totalAnnualValue.toLocaleString()}
                </motion.div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8">
              <Button
                asChild
                size="lg"
                className="w-full py-5 sm:py-6 text-sm sm:text-base font-bold bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] shadow-lg transition-all rounded-lg cursor-pointer"
              >
                <Link href={`/book?roi_revenue=${monthlyRevenue}&roi_hours=${weeklyHours}&roi_value=${totalAnnualValue}`} className="flex items-center justify-center gap-2">
                  <span>Book 15-Min Quick Audit</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
