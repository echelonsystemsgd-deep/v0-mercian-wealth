'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Crown,
  Sparkles,
  TrendingUp,
  X,
  Target,
  Calendar,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Repeat,
  Compass,
} from 'lucide-react'
import { calculateWealthMilestone } from '@/lib/wealth-milestones'

interface WealthVisionModalProps {
  isOpen: boolean
  onClose: () => void
  realizedPipeline?: number
  realizedRevenue?: number
}

export function WealthVisionModal({
  isOpen,
  onClose,
  realizedPipeline = 495,
  realizedRevenue = 0,
}: WealthVisionModalProps) {
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

  if (!isOpen) return null

  const progressTowardsCurrent = Math.min(
    100,
    Math.round(((realizedRevenue + realizedPipeline) / milestone.currentMonthlyTarget) * 100)
  )

  const progressTowards100k = Math.min(
    100,
    Math.round(((realizedRevenue + realizedPipeline) / milestone.ultimateTarget) * 100)
  )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0B0B0E] border border-[#DAA640]/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-[#DAA640]/10 overflow-hidden"
        >
          {/* Top Gold Gradient Glow Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#DAA640] to-yellow-300" />

          {/* Modal Header */}
          <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-b from-[#15151B] to-[#0B0B0E]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DAA640]/15 border border-[#DAA640]/30 text-[#DAA640] flex items-center justify-center shrink-0 shadow-inner">
                <Crown size={20} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                    Wealth Affirmation & Target Horizon
                  </h2>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#DAA640]/10 text-[#DAA640] border border-[#DAA640]/20">
                    28th Day Dynamic Rule
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Visualizing £10,000/mo baseline stepping up every 28th to £100,000/mo December Horizon.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* ── 1. Target Horizon Headline Cards ───────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Active Current Target */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#121217] to-[#181822] border border-[#DAA640]/30 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="uppercase tracking-wider">Current Month Target</span>
                  <span className="text-[#DAA640] font-bold">Active Sprint</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    £{milestone.currentMonthlyTarget.toLocaleString('en-GB')}{' '}
                    <span className="text-xs text-zinc-400 font-sans font-normal">/ mo</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Required Run Rate: £{Math.round(milestone.currentMonthlyTarget / 30).toLocaleString('en-GB')} / day
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Attained Pipeline:</span>
                  <span className="text-emerald-400 font-bold">£{realizedPipeline} (Stamp Site)</span>
                </div>
              </div>

              {/* Next Step Up (28th Day Rule) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#121217] to-[#181822] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="uppercase tracking-wider">Next 28th Step Up</span>
                  <span className="text-amber-400 font-bold">+{milestone.isDecemberOrBeyond ? '0' : '£10k'}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 tracking-tight">
                    £{milestone.nextStepTarget.toLocaleString('en-GB')}{' '}
                    <span className="text-xs text-zinc-400 font-sans font-normal">/ mo</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                    <Calendar size={12} className="text-amber-400" />
                    <span>Unlocks {milestone.nextStepDateStr} ({milestone.daysUntilNextStep} days)</span>
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Progression:</span>
                  <span className="text-zinc-300 font-semibold">+£10,000 every 28th</span>
                </div>
              </div>

              {/* Ultimate Horizon Goal */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#18140B] to-[#251D0B] border border-[#DAA640]/50 space-y-3 sm:col-span-2 lg:col-span-1 shadow-lg shadow-[#DAA640]/5">
                <div className="flex items-center justify-between text-xs text-[#DAA640] font-mono">
                  <span className="uppercase tracking-wider font-bold">December Horizon</span>
                  <Crown size={14} className="text-yellow-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-300 tracking-tight">
                    £100,000{' '}
                    <span className="text-xs text-amber-200/60 font-sans font-normal">/ mo</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 font-mono">
                    Run Rate: £3,333 / day (£1.2M Run Rate)
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DAA640]/20 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-200/70">Vehicle:</span>
                  <span className="text-yellow-300 font-semibold">100 Retainers @ £1,000/mo</span>
                </div>
              </div>
            </div>

            {/* ── 2. Interactive Milestone Timeline ───────────────────────────── */}
            <div className="space-y-3 p-5 rounded-2xl bg-[#121217] border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                  <Target size={14} className="text-[#DAA640]" />
                  <span>The 28th Progression Roadmap (Sep → Dec 2026)</span>
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">
                  Current Date: {new Date().toLocaleDateString('en-GB')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                {milestone.timeline.map((step) => {
                  const isCurrent = step.target === milestone.currentMonthlyTarget
                  return (
                    <div
                      key={step.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                        isCurrent
                          ? 'bg-[#1C1810] border-[#DAA640] shadow-md shadow-[#DAA640]/10 ring-1 ring-[#DAA640]/30'
                          : step.isGrandVision
                          ? 'bg-[#1A160F] border-[#DAA640]/40'
                          : 'bg-[#0E0E12] border-white/5 opacity-85'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          {step.dateStr}
                        </span>
                        {isCurrent ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#DAA640] text-black">
                            ACTIVE
                          </span>
                        ) : step.isGrandVision ? (
                          <Crown size={12} className="text-yellow-400" />
                        ) : (
                          <span className="text-[9px] font-mono text-zinc-500">SCHEDULED</span>
                        )}
                      </div>

                      <div>
                        <div
                          className={`text-lg font-serif font-bold tracking-tight ${
                            step.isGrandVision ? 'text-yellow-300' : isCurrent ? 'text-white' : 'text-zinc-300'
                          }`}
                        >
                          £{step.target.toLocaleString('en-GB')}
                          <span className="text-[10px] font-normal text-zinc-400 font-sans"> / mo</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-mono mt-0.5 line-clamp-2">
                          {step.focus}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-400 flex items-center justify-between">
                        <span>{step.dailyRunRate}</span>
                        <span className="text-amber-400">{isCurrent ? '⚡ In Flight' : 'Target'}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Date Simulator Bar to visualize future 28ths */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <Repeat size={12} className="text-[#DAA640]" />
                  <span>Timeline Simulation Preview:</span>
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setSimulatedDate(undefined)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      !simulatedDate
                        ? 'bg-[#DAA640] text-black font-bold'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    Today (Real-time)
                  </button>
                  <button
                    onClick={() => setSimulatedDate(new Date(2026, 9, 29))} // Oct 29
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      simulatedDate?.getMonth() === 9
                        ? 'bg-[#DAA640] text-black font-bold'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    Oct 28 (+£10k → £20k)
                  </button>
                  <button
                    onClick={() => setSimulatedDate(new Date(2026, 10, 29))} // Nov 29
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      simulatedDate?.getMonth() === 10
                        ? 'bg-[#DAA640] text-black font-bold'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    Nov 28 (+£10k → £30k)
                  </button>
                  <button
                    onClick={() => setSimulatedDate(new Date(2026, 11, 15))} // Dec
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      simulatedDate?.getMonth() === 11
                        ? 'bg-[#DAA640] text-black font-bold'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    December (£100k Crown)
                  </button>
                </div>
              </div>
            </div>

            {/* ── 3. Daily Mindset Affirmation Cockpit ────────────────────────── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#171410] via-[#1F190D] to-[#171410] border border-[#DAA640]/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#DAA640] font-bold">
                    Daily Wealth Affirmation & Manifestation
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <span>Streak:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    🔥 {affirmStreak} Day{affirmStreak !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Affirmation Carousel */}
              <div className="py-2 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300/80 uppercase">
                  <span>Focus: {milestone.affirmations[activeAffirmationIndex].focusArea}</span>
                  <span>•</span>
                  <span>Mantra #{activeAffirmationIndex + 1} of {milestone.affirmations.length}</span>
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic text-white leading-relaxed">
                  "{milestone.affirmations[activeAffirmationIndex].quote}"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {milestone.affirmations.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveAffirmationIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeAffirmationIndex === i ? 'w-6 bg-[#DAA640]' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                  <button
                    onClick={() =>
                      setActiveAffirmationIndex((prev) => (prev + 1) % milestone.affirmations.length)
                    }
                    className="ml-2 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    Next Mantra →
                  </button>
                </div>

                <button
                  onClick={handleAffirm}
                  className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    affirmedToday
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-[#DAA640] hover:bg-[#c49535] text-black shadow-lg shadow-[#DAA640]/20'
                  }`}
                >
                  <CheckCircle2 size={15} />
                  <span>{affirmedToday ? 'Affirmed For Today (Locked In)' : 'I Affirm & Lock In This Vision'}</span>
                </button>
              </div>
            </div>

            {/* ── 4. Unit Economics Matrix: How To Reach £10k & £100k ─────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* £10k/mo Unit Economics */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#101015] border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <h4 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-1.5">
                    <Compass size={14} className="text-[#DAA640]" />
                    <span>Blueprint to £10,000 / mo</span>
                  </h4>
                  <span className="text-[10px] font-mono text-[#DAA640]">£333 / day</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] mt-1.5 shrink-0" />
                    <span><strong>20 Website Builds @ £500</strong> (e.g. Sell Your Stamps UK pipeline model)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong>10 Recurring Retainers @ £1,000/mo</strong> (Hosting, AI Agents, SEO management)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>4 AI Automation Systems @ £2,500</strong> (Custom CRM, n8n WhatsApp scrapers)</span>
                  </li>
                </ul>
              </div>

              {/* £100k/mo Unit Economics */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#14120D] border border-[#DAA640]/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#DAA640]/20">
                  <h4 className="text-xs font-mono uppercase font-bold text-yellow-300 flex items-center gap-1.5">
                    <Crown size={14} className="text-yellow-400" />
                    <span>Blueprint to £100,000 / mo</span>
                  </h4>
                  <span className="text-[10px] font-mono text-yellow-400">£3,333 / day</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                    <span><strong>100 Retainer Partners @ £1,000/mo</strong> (High-volume SMB recurring engine)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>20 Enterprise Growth Engines @ £5,000/mo</strong> (Full-stack AI transformation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] mt-1.5 shrink-0" />
                    <span><strong>10 Strategic Rev-Share Mandates @ £10,000/mo</strong> (Equity/turnaround models)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#0E0E12] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-zinc-400 font-mono text-center sm:text-left">
              Realized Pipeline: <strong className="text-white">£{realizedPipeline}</strong> (Sell Your Stamps UK) • Target:{' '}
              <strong className="text-[#DAA640]">£{milestone.currentMonthlyTarget.toLocaleString('en-GB')}/mo</strong>
            </span>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Back to Command Center
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
