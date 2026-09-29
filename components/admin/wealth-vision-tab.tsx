'use client'

import React, { useState, useEffect } from 'react'
import {
  Crown,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  Target,
  Repeat,
  Compass,
  ArrowRight,
  TrendingUp,
  Zap,
  Activity,
  Layers,
} from 'lucide-react'
import { calculateWealthMilestone } from '@/lib/wealth-milestones'

interface WealthVisionTabProps {
  realizedPipeline?: number
  realizedRevenue?: number
}

export function WealthVisionTab({
  realizedPipeline = 495,
  realizedRevenue = 0,
}: WealthVisionTabProps) {
  const [simulatedDate, setSimulatedDate] = useState<Date | undefined>(undefined)
  const [activeAffirmationIndex, setActiveAffirmationIndex] = useState(0)
  const [affirmedToday, setAffirmedToday] = useState(false)
  const [affirmStreak, setAffirmStreak] = useState(1)

  const milestone = calculateWealthMilestone(simulatedDate, realizedRevenue, realizedPipeline)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('mw_last_affirm_date')
      const savedStreak = localStorage.getItem('mw_affirm_streak')
      const today = new Date().toDateString()

      if (savedDate === today) {
        setAffirmedToday(true)
      }
      if (savedStreak) {
        setAffirmStreak(parseInt(savedStreak, 10) || 1)
      }
    }
  }, [])

  const handleAffirm = () => {
    if (typeof window !== 'undefined') {
      const today = new Date().toDateString()
      localStorage.setItem('mw_last_affirm_date', today)
      const newStreak = affirmedToday ? affirmStreak : affirmStreak + 1
      setAffirmStreak(newStreak)
      localStorage.setItem('mw_affirm_streak', newStreak.toString())
      setAffirmedToday(true)
    }
  }

  const currentAttainedTotal = realizedRevenue + realizedPipeline
  const progressTowardsCurrent = Math.min(
    100,
    Math.round((currentAttainedTotal / milestone.currentMonthlyTarget) * 100)
  )

  return (
    <div className="space-y-6">
      {/* ── Top Affirmation Banner ────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171410] via-[#211B0E] to-[#121217] border border-[#DAA640]/40 relative overflow-hidden shadow-xl shadow-[#DAA640]/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DAA640]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAA640]/15 border border-[#DAA640]/30 text-[#DAA640] text-xs font-mono font-bold">
              <Crown size={14} className="animate-pulse" />
              <span>THE 28TH DAY STEP-UP MECHANISM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              £10,000 → £100,000 / Month
            </h2>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Every month on the 28th day, the monthly benchmark elevates by{' '}
              <strong className="text-[#DAA640]">+£10,000</strong> until December 2026, where the enterprise standard shifts into the{' '}
              <strong className="text-yellow-300">£100,000 / month</strong> wealth machine.
            </p>
          </div>

          {/* Quick Realized Stats Card */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-3 min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>REALIZED PIPELINE</span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-white tracking-tight">
                £{realizedPipeline.toLocaleString('en-GB')}
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Sell Your Stamps UK (Stamp Valuation Website)
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Current Gap:</span>
              <span className="text-[#DAA640] font-bold">
                £{(milestone.currentMonthlyTarget - currentAttainedTotal).toLocaleString('en-GB')} to £{milestone.currentMonthlyTarget.toLocaleString('en-GB')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 Big Milestone Pillars ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Current Operating Sprint */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0B0E] border border-[#DAA640]/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Current Target</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DAA640]/10 text-[#DAA640] border border-[#DAA640]/20">
              ACTIVE SPRINT
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              £{milestone.currentMonthlyTarget.toLocaleString('en-GB')}
              <span className="text-sm font-sans font-normal text-zinc-400"> / mo</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Run Rate: £{Math.round(milestone.currentMonthlyTarget / 30).toLocaleString('en-GB')} / day
            </p>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>Progress Attained</span>
              <span className="text-emerald-400 font-bold">{progressTowardsCurrent}% (£{realizedPipeline})</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#DAA640] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressTowardsCurrent, 5)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pillar 2: Next 28th Step Up */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Next Step Up (The 28th)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              +{milestone.isDecemberOrBeyond ? '0' : '£10,000'}
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 tracking-tight">
              £{milestone.nextStepTarget.toLocaleString('en-GB')}
              <span className="text-sm font-sans font-normal text-zinc-400"> / mo</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-1.5">
              <Calendar size={13} className="text-amber-400" />
              <span>Unlocks {milestone.nextStepDateStr} ({milestone.daysUntilNextStep} days)</span>
            </p>
          </div>
          <div className="pt-2 border-t border-white/5 text-xs text-zinc-400 font-mono">
            <span>Mandate: </span>
            <strong className="text-zinc-200">Scale client acquisition velocity before date rolls</strong>
          </div>
        </div>

        {/* Pillar 3: December £100k Crown */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#16130B] to-[#251D0B] border border-[#DAA640]/50 space-y-4 shadow-lg shadow-[#DAA640]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#DAA640] font-bold">December Crown</span>
            <Crown size={16} className="text-yellow-400 animate-bounce" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-yellow-300 tracking-tight">
              £100,000
              <span className="text-sm font-sans font-normal text-amber-200/60"> / mo</span>
            </div>
            <p className="text-xs text-amber-200/80 font-mono mt-1">
              Annualized Run Rate: £1,200,000 / year
            </p>
          </div>
          <div className="pt-2 border-t border-[#DAA640]/20 text-xs font-mono text-amber-200/80 flex items-center justify-between">
            <span>Vehicle:</span>
            <span className="text-yellow-300 font-bold">100 Retainers @ £1k/mo</span>
          </div>
        </div>
      </div>

      {/* ── Progression Roadmap & Simulation Strip ─────────────────────────── */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0B0E] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Target size={18} className="text-[#DAA640]" />
              <span>The 28th Day Elevation Roadmap</span>
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Automated progression formula advancing on the 28th of every month into December's shift.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-400 mr-1 flex items-center gap-1">
              <Repeat size={12} className="text-[#DAA640]" /> Preview:
            </span>
            <button
              onClick={() => setSimulatedDate(undefined)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                !simulatedDate ? 'bg-[#DAA640] text-black font-bold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setSimulatedDate(new Date(2026, 9, 29))}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                simulatedDate?.getMonth() === 9 ? 'bg-[#DAA640] text-black font-bold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              Oct 28 (+£10k)
            </button>
            <button
              onClick={() => setSimulatedDate(new Date(2026, 10, 29))}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                simulatedDate?.getMonth() === 10 ? 'bg-[#DAA640] text-black font-bold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              Nov 28 (+£10k)
            </button>
            <button
              onClick={() => setSimulatedDate(new Date(2026, 11, 15))}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                simulatedDate?.getMonth() === 11 ? 'bg-[#DAA640] text-black font-bold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              December (£100k)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {milestone.timeline.map((step) => {
            const isCurrent = step.target === milestone.currentMonthlyTarget
            return (
              <div
                key={step.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  isCurrent
                    ? 'bg-[#1C1810] border-[#DAA640] shadow-lg shadow-[#DAA640]/10 ring-1 ring-[#DAA640]/30'
                    : step.isGrandVision
                    ? 'bg-[#1A160F] border-[#DAA640]/40'
                    : 'bg-[#121217] border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 font-semibold">{step.dateStr}</span>
                  {isCurrent ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DAA640] text-black">
                      ACTIVE SPRINT
                    </span>
                  ) : step.isGrandVision ? (
                    <Crown size={14} className="text-yellow-400" />
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-500">SCHEDULED</span>
                  )}
                </div>

                <div className="space-y-1">
                  <div
                    className={`text-2xl font-serif font-bold ${
                      step.isGrandVision ? 'text-yellow-300' : isCurrent ? 'text-white' : 'text-zinc-200'
                    }`}
                  >
                    £{step.target.toLocaleString('en-GB')}
                    <span className="text-xs font-sans font-normal text-zinc-400"> / mo</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{step.focus}</p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1 text-[11px] font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span>Run Rate:</span>
                    <span className="text-white font-semibold">{step.dailyRunRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span className="text-[#DAA640] truncate max-w-[150px]">{step.clientsFormula}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Daily Mindset Affirmation Box ──────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171410] via-[#211B0E] to-[#171410] border border-[#DAA640]/40 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <Flame size={20} className="text-amber-400 animate-pulse" />
            <h3 className="text-base font-serif font-bold text-white tracking-wide">
              Daily Wealth Affirmation & Visual Manifestation
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Commitment Streak:</span>
            <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
              🔥 {affirmStreak} Day{affirmStreak !== 1 ? 's' : ''} Locked
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-black/40 border border-[#DAA640]/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 uppercase">
            <span>Focus Area: {milestone.affirmations[activeAffirmationIndex].focusArea}</span>
            <span>•</span>
            <span>Mantra #{activeAffirmationIndex + 1} of {milestone.affirmations.length}</span>
          </div>

          <blockquote className="text-lg sm:text-xl font-serif italic text-white leading-relaxed">
            "{milestone.affirmations[activeAffirmationIndex].quote}"
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {milestone.affirmations.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveAffirmationIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  activeAffirmationIndex === i ? 'w-8 bg-[#DAA640]' : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
            <button
              onClick={() => setActiveAffirmationIndex((prev) => (prev + 1) % milestone.affirmations.length)}
              className="ml-3 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              Next Mantra →
            </button>
          </div>

          <button
            onClick={handleAffirm}
            className={`px-6 py-3 min-h-[48px] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              affirmedToday
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-[#DAA640] hover:bg-[#c49535] text-black shadow-lg shadow-[#DAA640]/25'
            }`}
          >
            <CheckCircle2 size={16} />
            <span>{affirmedToday ? 'Affirmed Today (Vision Locked In)' : 'I Affirm & Strive For This Standard'}</span>
          </button>
        </div>
      </div>

      {/* ── Unit Economics & Tactical Blueprints ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#0B0B0E] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h4 className="text-sm font-mono uppercase font-bold text-white flex items-center gap-2">
              <Compass size={16} className="text-[#DAA640]" />
              <span>Unit Economics: Path to £10,000 / mo</span>
            </h4>
            <span className="text-xs font-mono text-[#DAA640] font-bold">£333 / day</span>
          </div>

          <p className="text-xs text-zinc-400">
            Achievable through simple high-conversion trade outreach packages:
          </p>

          <ul className="space-y-3 text-xs text-zinc-300">
            <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#DAA640] mt-1.5 shrink-0" />
              <div>
                <strong className="text-white block">20 Website Builds @ £500</strong>
                <span className="text-zinc-400 text-[11px]">Identical to the Sell Your Stamps UK (£495) blueprint. 1 build every 1.5 days.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white block">10 Recurring Retainers @ £1,000 / mo</strong>
                <span className="text-zinc-400 text-[11px]">AI appointment setter bots + SEO maintenance + hosting for local businesses.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white block">4 Full Growth Systems @ £2,500</strong>
                <span className="text-zinc-400 text-[11px]">Brand redesign + WhatsApp automated outreach engine for established retailers.</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-[#0E0C08] border border-[#DAA640]/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DAA640]/20">
            <h4 className="text-sm font-mono uppercase font-bold text-yellow-300 flex items-center gap-2">
              <Crown size={16} className="text-yellow-400" />
              <span>Unit Economics: Path to £100,000 / mo</span>
            </h4>
            <span className="text-xs font-mono text-yellow-400 font-bold">£3,333 / day</span>
          </div>

          <p className="text-xs text-zinc-400">
            The enterprise scale architecture activated in December:
          </p>

          <ul className="space-y-3 text-xs text-zinc-300">
            <li className="p-3 rounded-xl bg-black/40 border border-[#DAA640]/20 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-yellow-200 block">100 Retainers @ £1,000 / month</strong>
                <span className="text-zinc-400 text-[11px]">High-retention software & digital marketing retainer ecosystem across UK trades.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-[#DAA640]/20 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-yellow-200 block">20 Enterprise Growth Engines @ £5,000 / month</strong>
                <span className="text-zinc-400 text-[11px]">Full enterprise automation agency contracts managing inbound leads & conversions.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-[#DAA640]/20 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#DAA640] mt-1.5 shrink-0" />
              <div>
                <strong className="text-yellow-200 block">10 Strategic Revenue-Share Partners @ £10,000 / mo</strong>
                <span className="text-zinc-400 text-[11px]">Equity & performance fees from scaling high-volume e-commerce and retail brands.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
