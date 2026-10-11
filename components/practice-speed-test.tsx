"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Gauge, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  TrendingDown,
  Layers,
  ChevronRight,
  Zap,
  PhoneCall
} from "lucide-react"

interface Question {
  id: string
  number: string
  title: string
  subtitle: string
  options: {
    label: string
    sublabel: string
    points: number
    tag: "critical" | "moderate" | "optimal"
  }[]
}

const QUESTIONS: Question[] = [
  {
    id: "out-of-hours",
    number: "01",
    title: "How does your practice handle enquiries received at 8:30 PM on a weekday?",
    subtitle: "High-intent company directors often research and message alternative accountants outside standard working hours.",
    options: [
      {
        label: "Sits in info@ inbox until staff open email the next day (or Monday)",
        sublabel: "Risk of delayed contact while the prospective client enquires with other local firms.",
        points: 0,
        tag: "critical"
      },
      {
        label: "Generic automated email autoreply ('Thank you, we will reply within 48h')",
        sublabel: "Low commitment: prospective client still shops around competitors.",
        points: 10,
        tag: "moderate"
      },
      {
        label: "Smart 3-minute intake triage with immediate calendar booking hold",
        sublabel: "Locks director's commitment on the spot while you are offline.",
        points: 20,
        tag: "optimal"
      }
    ]
  },
  {
    id: "qualification",
    number: "02",
    title: "How are prospective clients qualified before booking partner discovery calls?",
    subtitle: "Protecting senior fee-earners from spending 30 minutes on unqualified leads.",
    options: [
      {
        label: "Open contact box / phone call with zero upfront screening",
        sublabel: "Wastes partner time on unvetted micro-turnover or price shoppers.",
        points: 0,
        tag: "critical"
      },
      {
        label: "Manual back-and-forth email/call to ask for company number and turnover",
        sublabel: "Adds 2–4 days of friction before the first consultation happens.",
        points: 10,
        tag: "moderate"
      },
      {
        label: "Automated upfront triage (Entity type, turnover tier, current pain points)",
        sublabel: "Partners enter calls with complete commercial scope already in hand.",
        points: 20,
        tag: "optimal"
      }
    ]
  },
  {
    id: "mtd-readiness",
    number: "03",
    title: "How prepared is your practice for MTD for Income Tax quarterly updates?",
    subtitle: "Statutory quarterly updates due 7 Aug, 7 Nov, 7 Feb, and 7 May for mandated taxpayers.",
    options: [
      {
        label: "No quarterly reminder system; staff manually chase records for each deadline",
        sublabel: "Significant capacity drag: increases recurring administrative chasing overhead.",
        points: 0,
        tag: "critical"
      },
      {
        label: "Standard monthly newsletter blast reminding clients of upcoming dates",
        sublabel: "Often overlooked by busy clients; still requires manual phone calls ahead of deadlines.",
        points: 10,
        tag: "moderate"
      },
      {
        label: "Pre-approved automated chasing cadences with client-specific tracking",
        sublabel: "Zero senior staff hours burnt; your team retains complete approval and override control.",
        points: 20,
        tag: "optimal"
      }
    ]
  },
  {
    id: "records-chasing",
    number: "04",
    title: "How much time does your team currently spend chasing missing client records?",
    subtitle: "Chasing bank statements, missing receipts, VAT paperwork, and year-end documents.",
    options: [
      {
        label: "Significant hours per week across the team on manual chasing & phone tag",
        sublabel: "Consumes fee-earner capacity on repetitive administrative communication.",
        points: 0,
        tag: "critical"
      },
      {
        label: "Moderate time per week relying on standard software notifications",
        sublabel: "Still creates bottlenecks during peak VAT and self-assessment filing periods.",
        points: 10,
        tag: "moderate"
      },
      {
        label: "Minimal manual chasing with automated multi-channel cadences",
        sublabel: "Team focuses primarily on advisory, computations, and statutory compliance work.",
        points: 20,
        tag: "optimal"
      }
    ]
  },
  {
    id: "onboarding-lag",
    number: "05",
    title: "How long does it take from an agreed proposal to a fully compliant active client file?",
    subtitle: "Engagement letters, AML verification, 64-8 HMRC authorisation, and Direct Debit.",
    options: [
      {
        label: "Extended back-and-forth emails chasing ID photos, signatures, and codes",
        sublabel: "Delays first billing and creates friction for prospective clients.",
        points: 0,
        tag: "critical"
      },
      {
        label: "Standard process with digital signatures but manual follow-up for AML & 64-8",
        sublabel: "Client managers still spend admin time supervising each onboarding file.",
        points: 10,
        tag: "moderate"
      },
      {
        label: "Streamlined single-flow digital intake checklist",
        sublabel: "ID verification, HMRC code trigger, and Direct Debit setup completed promptly.",
        points: 20,
        tag: "optimal"
      }
    ]
  }
]

export function PracticeSpeedTest() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  })
  const [showResult, setShowResult] = useState(false)

  const handleSelectOption = (questionIndex: number, points: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: points }))
    if (questionIndex < QUESTIONS.length - 1) {
      setCurrentStep(questionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setAnswers({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 })
    setCurrentStep(0)
    setShowResult(false)
  }

  // Calculate total score
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)

  // Status computation
  const getStatus = (score: number) => {
    if (score <= 40) {
      return {
        badge: "CRITICAL CAPACITY & FEE LEAKAGE",
        color: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/30",
        headline: "High Friction & MTD Compliance Exposure",
        hoursLost: "Indicative estimate based on your answers",
        annualLeak: "Subject to your practice fee structure",
        summary: "Your practice may be losing high-fee Ltd Co clients to faster-responding local competitors, while staff spend valuable hours manually chasing records that can be automated with zero risk.",
        prescription: "Deploy the evening intake flow and pre-approved MTD deadline chasers before the next compliance quarter."
      }
    } else if (score <= 70) {
      return {
        badge: "MODERATE ADMINISTRATIVE DRAG",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
        headline: "Significant Unbilled Hours & Bottleneck Risk",
        hoursLost: "Indicative estimate based on your answers",
        annualLeak: "Subject to your practice fee structure",
        summary: "You have foundational systems, but client onboarding latency and manual document chasing can consume fee-earner capacity ahead of MTD deadlines.",
        prescription: "Layer pre-approved deadline chasing and a streamlined digital onboarding flow on top of your existing Xero / IRIS stack."
      }
    } else {
      return {
        badge: "OPTIMIZED PRACTICE INFRASTRUCTURE",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/30",
        headline: "High-Speed Intake & Controlled Compliance",
        hoursLost: "Minimal administrative drag",
        annualLeak: "Low intake friction",
        summary: "Your practice operates with strong front-door speed and clean compliance habits. You are well-positioned to scale capacity without hiring extra administrative heads.",
        prescription: "Explore automated multi-channel client satisfaction and Google review capture to compound your lead flow."
      }
    }
  }

  const currentStatus = getStatus(totalScore)
  const activeQ = QUESTIONS[currentStep]

  return (
    <section id="practice-speed-test" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DAA640]/30 bg-[#DAA640]/5 text-[#DAA640] text-xs font-semibold tracking-wider uppercase mb-4">
          <Gauge className="w-3.5 h-3.5" />
          <span>3-Minute Diagnostic Protocol</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Test Your Practice Response Speed & MTD Readiness
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Answer 5 diagnostic questions to measure uncaptured client revenue, admin overhead, and capacity risk before the 2026 quarterly filing changes.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0B0B0E] p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        {/* Progress Bar & Steps */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {QUESTIONS.map((q, idx) => {
              const isDone = answers[idx] !== undefined && (showResult || currentStep > idx)
              const isCurrent = currentStep === idx && !showResult
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentStep(idx)
                    setShowResult(false)
                  }}
                  className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                    isCurrent
                      ? "bg-[#DAA640] text-black shadow-lg shadow-[#DAA640]/20"
                      : isDone
                      ? "bg-white/10 text-white hover:bg-white/15"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <span>Q{q.number}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              )
            })}
            <button
              onClick={() => setShowResult(true)}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                showResult
                  ? "bg-[#DAA640] text-black shadow-lg shadow-[#DAA640]/20"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <span>Score Breakdown</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Live Score: <span className="text-white font-bold">{totalScore}</span> / 100
            </span>
            <button
              onClick={handleReset}
              className="min-h-[44px] px-3 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1 rounded-lg border border-white/5 hover:border-white/20 transition-all"
              title="Reset diagnostic"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={activeQ.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA640]">
                  DIAGNOSTIC PILLAR {activeQ.number} OF 05
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-1.5 leading-snug">
                  {activeQ.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  {activeQ.subtitle}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-3.5">
                {activeQ.options.map((opt, optIdx) => {
                  const isSelected = answers[currentStep] === opt.points
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentStep, opt.points)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-h-[58px] ${
                        isSelected
                          ? "border-[#DAA640] bg-[#DAA640]/10 shadow-md shadow-[#DAA640]/10"
                          : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? "border-[#DAA640] bg-[#DAA640]" : "border-white/30"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <div>
                          <div className="text-sm sm:text-base font-semibold text-white leading-snug">
                            {opt.label}
                          </div>
                          <div className="text-xs sm:text-sm text-slate-400 mt-1">
                            {opt.sublabel}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 self-end sm:self-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          opt.tag === "optimal"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : opt.tag === "moderate"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        }`}>
                          +{opt.points} pts
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Next / Previous Controls */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  className="min-h-[44px] px-4 py-2.5 text-xs sm:text-sm text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg border border-white/10 hover:border-white/20 transition-all"
                >
                  Previous Question
                </button>

                {currentStep < QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-white rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResult(true)}
                    className="min-h-[44px] px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#DAA640] hover:bg-[#c99535] text-black rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-[#DAA640]/20"
                  >
                    <span>View Diagnostic Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            /* Diagnostic Result View */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`p-6 sm:p-8 rounded-2xl border ${currentStatus.bg} relative overflow-hidden mb-8`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${currentStatus.color}`}>
                      {currentStatus.badge}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                      {currentStatus.headline}
                    </h3>
                  </div>
                  <div className="bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-center shrink-0">
                    <div className="text-3xl sm:text-4xl font-black text-[#DAA640]">{totalScore}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">Indicative Score / 100</div>
                    <div className="text-[9px] font-mono text-slate-500 mt-0.5">Based on your answers</div>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                  {currentStatus.summary}
                </p>

                {/* Impact Metrics */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-xs text-slate-400 font-medium">Estimated Recoverable Partner Admin Time</div>
                    <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-1">{currentStatus.hoursLost}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-xs text-slate-400 font-medium">Estimated Annual Revenue at Risk / Leakage</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#DAA640] mt-1">{currentStatus.annualLeak}</div>
                  </div>
                </div>
              </div>

              {/* Action Plan Guidance */}
              <div className="rounded-xl border border-white/10 bg-black/40 p-5 sm:p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#DAA640] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Recommended Implementation Roadmap</h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentStatus.prescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                  href="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-sm sm:text-base transition-all shadow-lg shadow-[#DAA640]/20 min-h-[48px]"
                >
                  <span>Book a 15-Minute Practice Walkthrough</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#practice-visualizer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 hover:border-[#DAA640]/50 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-all min-h-[48px]"
                >
                  <Zap className="w-4 h-4 text-[#DAA640]" />
                  <span>Test Pipelines in Visualizer Sandbox</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm text-slate-400 hover:text-white rounded-lg border border-white/5 hover:border-white/15 transition-all min-h-[48px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
