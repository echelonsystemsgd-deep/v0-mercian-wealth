"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Zap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  UserCheck, 
  BellRing, 
  Smartphone, 
  Building2, 
  Scale, 
  TrendingUp, 
  Check, 
  AlertCircle,
  Play, 
  RotateCcw,
  Send,
  Lock,
  ChevronRight,
  PhoneCall
} from "lucide-react"

// Types
type TabType = "intake" | "chasing" | "onboarding" | "calculator"

interface LeadScenario {
  id: string
  title: string
  entityType: string
  annualTurnover: string
  serviceNeeded: string
  urgency: string
  feePotential: string
}

const LEAD_SCENARIOS: LeadScenario[] = [
  {
    id: "ltd-company",
    title: "Limited Company Director",
    entityType: "UK Ltd Co (Active)",
    annualTurnover: "£750,000",
    serviceNeeded: "Year-End Accounts, Corporation Tax & Director Payroll",
    urgency: "Switching within 30 days",
    feePotential: "£3,200/year",
  },
  {
    id: "sole-trader-mtd",
    title: "Sole Trader & Landlord",
    entityType: "Sole Trader + 2 Buy-to-Lets",
    annualTurnover: "£68,000 (Subject to MTD 2026)",
    serviceNeeded: "Making Tax Digital (ITSA) Setup & Quarterly Filing",
    urgency: "Needs compliance before April 2026",
    feePotential: "£1,850/year",
  },
  {
    id: "partnership-switch",
    title: "Multi-Partner Architecture Firm",
    entityType: "LLP (3 Equity Partners)",
    annualTurnover: "£1,400,000",
    serviceNeeded: "Full Outsourced Finance, VAT & Quarterly Reviews",
    urgency: "Unhappy with current unresponsive firm",
    feePotential: "£6,400/year",
  },
]

const DEADLINE_SCENARIOS = [
  {
    id: "mtd-itsa",
    title: "MTD for ITSA Quarterly Submission",
    targetGroup: "Sole traders & landlords with income >£50,000",
    deadlineLabel: "Quarter 1 Update (5th July)",
    regulatoryContext: "Mandatory HMRC digital update under 2026 rules",
  },
  {
    id: "self-assessment",
    title: "31 January Self Assessment Tax Return",
    targetGroup: "All individual & director tax return clients",
    deadlineLabel: "31 January Midnight Deadline",
    regulatoryContext: "Prevents initial £100 HMRC late submission penalty",
  },
  {
    id: "vat-quarterly",
    title: "Quarterly Making Tax Digital (VAT)",
    targetGroup: "VAT-registered commercial businesses",
    deadlineLabel: "Quarterly Return & Payment Due",
    regulatoryContext: "Automated chasing for purchase invoices & bank feeds",
  },
]

export function PracticePipelineVisualizer() {
  const [activeTab, setActiveTab] = useState<TabType>("intake")

  // Tab 1: Intake speed simulator state
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0)
  const [simulationStep, setSimulationStep] = useState(3) // 0 to 3
  const [isSimulating, setIsSimulating] = useState(false)

  // Tab 2: Document Chaser state
  const [selectedDeadlineIndex, setSelectedDeadlineIndex] = useState(0)
  const [approvedBatch, setApprovedBatch] = useState(false)
  const [activeCadenceStage, setActiveCadenceStage] = useState<number>(0)

  // Tab 3: Onboarding Checklist state
  const [onboardingItems, setOnboardingItems] = useState([
    { id: "engagement", title: "Engagement Letter & Fee Schedule", desc: "Automated digital proposal with terms & scope", done: true, time: "Day 1 (10:15 AM)" },
    { id: "aml", title: "AML / Photo ID & Proof of Address", desc: "Smartphone verification link sent via SMS", done: true, time: "Day 1 (11:40 AM)" },
    { id: "agent-64-8", title: "HMRC 64-8 Agent Authorisation", desc: "HMRC online authorisation code requested", done: true, time: "Day 1 (02:10 PM)" },
    { id: "clearance", title: "Professional Clearance Letter", desc: "Automated request dispatched to outgoing firm", done: false, time: "Day 2 (Chasing)" },
    { id: "mandate", title: "Direct Debit / Fee Mandate", desc: "GoCardless / Stripe recurring billing agreement", done: false, time: "Day 2 (Pending)" },
  ])

  // Tab 4: Calculator state
  const [practiceScale, setPracticeScale] = useState<"sole" | "small" | "growth">("small")
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null)

  // Simulation timer ref for clean mobile unmounts
  const timersRef = useState<NodeJS.Timeout[]>(() => [])[0]

  // Intake simulation runner
  const runIntakeSimulation = () => {
    timersRef.forEach(clearTimeout)
    timersRef.length = 0
    setIsSimulating(true)
    setSimulationStep(0)
    
    timersRef.push(setTimeout(() => setSimulationStep(1), 700))
    timersRef.push(setTimeout(() => setSimulationStep(2), 1500))
    timersRef.push(setTimeout(() => {
      setSimulationStep(3)
      setIsSimulating(false)
    }, 2400))
  }

  // Toggle checklist item
  const toggleChecklistItem = (id: string) => {
    setOnboardingItems(prev => prev.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ))
  }

  // Complete all onboarding
  const completeAllOnboarding = () => {
    setOnboardingItems(prev => prev.map(item => ({ ...item, done: true })))
  }

  const currentScenario = LEAD_SCENARIOS[selectedScenarioIndex]
  const currentDeadline = DEADLINE_SCENARIOS[selectedDeadlineIndex]

  // Calculator figures
  const scaleStats = {
    sole: {
      clients: "45–80",
      intakeHours: 2.5,
      chasingHours: 4.5,
      onboardingHours: 2.0,
      totalHours: 9.0,
      annualSaved: 450,
      valueReclaimed: "£22,500",
      newCapacity: "6–8 new clients",
    },
    small: {
      clients: "80–220",
      intakeHours: 3.5,
      chasingHours: 5.5,
      onboardingHours: 2.5,
      totalHours: 11.5,
      annualSaved: 575,
      valueReclaimed: "£28,750",
      newCapacity: "10–14 new clients",
    },
    growth: {
      clients: "220–450+",
      intakeHours: 5.0,
      chasingHours: 8.5,
      onboardingHours: 4.0,
      totalHours: 17.5,
      annualSaved: 875,
      valueReclaimed: "£43,750",
      newCapacity: "18–25 new clients",
    },
  }[practiceScale]

  return (
    <section id="practice-visualizer" className="relative py-16 sm:py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none opacity-15 blur-[140px] rounded-full"
        style={{ background: "radial-gradient(circle, #DAA640 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-[#DAA640]" />
            <span>Interactive Practice Sandbox</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Experience the Enquiry-to-Client Pipeline in Real Time.
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Test the governed workflows below: simulate a sub-3-minute enquiry intake, preview MTD document chasing, and verify how your practice recovers 10+ hours every week without touching client ledgers.
          </p>

          {/* Governance Guarantee Micro-Bar */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs text-amber-200/90 font-mono bg-white/[0.03] border border-white/10 rounded-full px-4 py-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DAA640]" />
              <span>Practitioner-in-the-Loop</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#DAA640]" />
              <span>Zero Financial Ledger Access</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#DAA640]" />
              <span>UK GDPR &amp; ICO Compliant</span>
            </span>
          </div>
        </div>

        {/* 4 Interactive Segmented Tabs (Mobile-Optimised 2x2 on small screens, 4-col on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {[
            { id: "intake", number: "01", label: "Enquiry Speed Test", short: "Speed Intake", icon: Clock },
            { id: "chasing", number: "02", label: "MTD Deadline Chaser", short: "Deadline Chaser", icon: Calendar },
            { id: "onboarding", number: "03", label: "Onboarding Checklist", short: "48h Onboarding", icon: FileText },
            { id: "calculator", number: "04", label: "Capacity & Hours Saved", short: "10+ Hrs Saved", icon: TrendingUp },
          ].map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer min-h-[58px] flex flex-col justify-between ${
                  isActive
                    ? "bg-[#141417] border-[#DAA640] shadow-lg shadow-[#DAA640]/10 text-white"
                    : "bg-[#0B0B0D] border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeVisualizerTab"
                    className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#DAA640] pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold tracking-wider ${isActive ? "text-[#DAA640]" : "text-slate-500"}`}>
                    STAGE {tab.number}
                  </span>
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-[#DAA640]" : "text-slate-500"}`} />
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate text-white">
                  {tab.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamic Interactive Card Container */}
        <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">

            {/* TAB 1: ENQUIRY INTAKE SPEED SIMULATION */}
            {activeTab === "intake" && (
              <motion.div
                key="tab-intake"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                {/* Header & Scenario Selection */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DAA640]">
                      SIMULATION 01 · INBOUND RESPONSE SPEED
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mt-1">
                      New Client Enquiry Scoping &amp; Diary Hold in &lt;3 Minutes
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                      78% of prospective clients instruct the first firm that responds. Test how the governed engine qualifies turnover and locks the partner diary out-of-hours.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={runIntakeSimulation}
                      disabled={isSimulating}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 min-h-[44px]"
                    >
                      {isSimulating ? (
                        <>
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulating...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>Run Speed Test</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSimulationStep(3)}
                      className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 text-slate-300 hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Reset simulation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scenario Toggle Pills (Mobile-Friendly) */}
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-2">Select Inbound Client Persona:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {LEAD_SCENARIOS.map((scenario, idx) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenarioIndex(idx)
                          setSimulationStep(3)
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                          idx === selectedScenarioIndex
                            ? "bg-[#141417] border-[#DAA640]/70 text-white ring-1 ring-[#DAA640]/30"
                            : "bg-[#050505] border-white/10 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-white">
                          <span>{scenario.title}</span>
                          <span className="text-[10px] font-mono text-[#DAA640]">{scenario.feePotential}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 truncate">
                          {scenario.annualTurnover} · {scenario.entityType}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulation Stages Timeline & Live Telemetry Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Chronological Flow (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    {[
                      {
                        time: "00:00",
                        title: "Inbound Enquiry Received (8:34 PM)",
                        desc: `Prospective client (${currentScenario.title}) enters via website smart form or direct WhatsApp link.`,
                        tag: "Instant Trigger",
                        activeStep: 0,
                      },
                      {
                        time: "+00:18",
                        title: "Governed Scope & Turnover Screening",
                        desc: `Qualified business status: ${currentScenario.entityType}, turnover of ${currentScenario.annualTurnover}. Zero staff manual input.`,
                        tag: "Automated Triage",
                        activeStep: 1,
                      },
                      {
                        time: "+01:10",
                        title: "Real-Time Partner Calendar Match",
                        desc: "Live diary integration presents available 20-minute discovery consultation slots (e.g. Thursday 10:00 AM).",
                        tag: "Diary Hold",
                        activeStep: 2,
                      },
                      {
                        time: "+02:30",
                        title: "Slot Confirmed & Director Mobile Briefing",
                        desc: `Call booked into partner calendar. Instant WhatsApp briefing dispatched to partner phone with ${currentScenario.feePotential} estimated client value.`,
                        tag: "Completed in 2m 30s",
                        activeStep: 3,
                      },
                    ].map((step, sIdx) => {
                      const isReached = simulationStep >= step.activeStep
                      const isCurrent = simulationStep === step.activeStep

                      return (
                        <div
                          key={sIdx}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                            isReached
                              ? isCurrent
                                ? "bg-[#141417] border-[#DAA640] shadow-md"
                                : "bg-[#09090B] border-white/10"
                              : "bg-[#050505]/50 border-white/5 opacity-40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#DAA640]">{step.time}</span>
                              <span className="text-white/20">·</span>
                              <h4 className="text-xs sm:text-sm font-semibold text-white">{step.title}</h4>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-amber-300/80 border border-white/10">
                              {step.tag}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed pl-1 sm:pl-0">
                            {step.desc}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Right Column: Live Data Payload Mockup & Comparison (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Simulated Director Alert Card */}
                    <div className="bg-[#050505] border border-white/10 rounded-xl p-4 font-mono text-left">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                        <span className="text-[10px] uppercase text-[#DAA640] font-bold flex items-center gap-1.5">
                          <Smartphone className="w-3 h-3" />
                          <span>Partner Mobile WhatsApp Ping</span>
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div className="text-emerald-400 font-semibold">
                          [NEW QUALIFIED CONSULTATION BOOKED]
                        </div>
                        <div className="text-slate-300">
                          <span className="text-slate-500">Client:</span> {currentScenario.title}
                        </div>
                        <div className="text-slate-300">
                          <span className="text-slate-500">Structure:</span> {currentScenario.entityType}
                        </div>
                        <div className="text-slate-300">
                          <span className="text-slate-500">Annual Turnover:</span> {currentScenario.annualTurnover}
                        </div>
                        <div className="text-slate-300">
                          <span className="text-slate-500">Requirement:</span> {currentScenario.serviceNeeded}
                        </div>
                        <div className="text-slate-300">
                          <span className="text-slate-500">Booked Slot:</span> Thursday, 10:00 AM (Outlook Sync ✓)
                        </div>
                        <div className="pt-2 border-t border-white/10 text-amber-300 font-semibold flex justify-between">
                          <span>Projected Annual Fee:</span>
                          <span>{currentScenario.feePotential}</span>
                        </div>
                      </div>
                    </div>

                    {/* Speed Comparison Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/10">
                      <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Speed Benchmark</span>
                        <span className="text-[#DAA640] font-mono text-[11px]">+78% Win Rate</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center text-slate-400 pb-1.5 border-b border-white/5">
                          <span>Standard Practice Response:</span>
                          <span className="text-red-400 font-mono font-medium">24–72 Hours</span>
                        </div>
                        <div className="flex justify-between items-center text-white pt-0.5">
                          <span className="font-medium text-emerald-300">Mercian Governed Intake:</span>
                          <span className="text-emerald-400 font-mono font-bold">&lt; 2m 30s</span>
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] text-slate-400 leading-normal">
                        Clients do not wait for email callbacks. Booking the discovery consultation within minutes secures the mandate before competitors even read the enquiry.
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 2: MTD / YEAR-END DOCUMENT CHASING SEQUENCE */}
            {activeTab === "chasing" && (
              <motion.div
                key="tab-chasing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                {/* Header & Deadline Switcher */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DAA640]">
                      SIMULATION 02 · CAPACITY &amp; COMPLIANCE
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mt-1">
                      Governed Document &amp; Deadline Chasing Cadence
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                      Automate reminder cadences before MTD and Self Assessment deadlines. Every outbound message is pre-approved by your team—zero unsupervised AI.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => setApprovedBatch(!approvedBatch)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all cursor-pointer min-h-[44px] ${
                        approvedBatch 
                          ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                          : "bg-[#DAA640] hover:bg-[#c99535] text-black shadow-md"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{approvedBatch ? "Batch Approved by Partner ✓" : "Pre-Approve Outbound Batch"}</span>
                    </button>
                  </div>
                </div>

                {/* Regulatory Deadline Selectors */}
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-2">Select Regulatory Window:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {DEADLINE_SCENARIOS.map((scenario, idx) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          setSelectedDeadlineIndex(idx)
                          setActiveCadenceStage(0)
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                          idx === selectedDeadlineIndex
                            ? "bg-[#141417] border-[#DAA640]/70 text-white ring-1 ring-[#DAA640]/30"
                            : "bg-[#050505] border-white/10 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-semibold text-white">{scenario.title}</div>
                        <div className="text-[11px] text-amber-300/80 font-mono mt-1">{scenario.deadlineLabel}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4-Stage Cadence Step-Through & Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Cadence Timeline (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    {[
                      {
                        stage: 0,
                        timing: "T-30 Days Before Deadline",
                        channel: "WhatsApp & Email",
                        title: "Courteous Early Prompt + 1-Click Upload Link",
                        detail: "Gentle reminder outlining what documents are needed. Client clicks direct secure upload link into your existing portal (Dext, Xero, Iris).",
                        badge: "Early Warning",
                      },
                      {
                        stage: 1,
                        timing: "T-14 Days Before Deadline",
                        channel: "Personalised Check",
                        title: "Specific Missing Items Audit",
                        detail: "Identifies remaining outstanding items (e.g. 'Bank statements uploaded ✓ | Awaiting P60 & mortgage interest certificate ⚠').",
                        badge: "Targeted Follow-up",
                      },
                      {
                        stage: 2,
                        timing: "T-7 Days Before Deadline",
                        channel: "Priority Notice",
                        title: "HMRC Penalty Protection Alert",
                        detail: "Warns of late filing penalty windows and firm submission cut-offs. Protects partner relationship from January crunch blame.",
                        badge: "Penalty Prevention",
                      },
                      {
                        stage: 3,
                        timing: "T-48 Hours Escalation",
                        channel: "Director Flag",
                        title: "Partner Dashboard Exception Review",
                        detail: "Unresponsive clients highlighted on partner screen for final decision or formal waiver before HMRC deadline lock.",
                        badge: "Risk Mitigation",
                      },
                    ].map((step) => {
                      const isSelected = activeCadenceStage === step.stage

                      return (
                        <div
                          key={step.stage}
                          onClick={() => setActiveCadenceStage(step.stage)}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#141417] border-[#DAA640] shadow-md ring-1 ring-[#DAA640]/40"
                              : "bg-[#09090B] border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-[#DAA640]">{step.timing}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                              {step.badge}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-white mt-1">{step.title}</h4>
                          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Right Column: Outbound Message Preview & Control Panel (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Simulated Outbound Message Card */}
                    <div className="bg-[#050505] border border-white/10 rounded-xl p-4 font-mono text-left">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                        <span className="text-[10px] uppercase text-[#DAA640] font-bold flex items-center gap-1.5">
                          <MessageSquare className="w-3 h-3" />
                          <span>Pre-Approved Client Message Preview</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-sans">
                          {approvedBatch ? "Approved ✓" : "Pending Sign-off"}
                        </span>
                      </div>

                      <div className="bg-[#121215] border border-white/5 rounded-lg p-3 text-xs font-sans text-slate-200 leading-relaxed space-y-2">
                        <div className="text-[10px] text-slate-400 font-mono">
                          Recipient: David Harrison (Sole Trader &amp; Landlord)
                        </div>
                        <p className="pt-1">
                          &ldquo;Hi David, it&apos;s Mercian Practice Support. Ahead of your upcoming {currentDeadline.deadlineLabel}, our team is preparing your figures.
                        </p>
                        <p>
                          We currently have your sales records, but still need your <span className="text-[#DAA640] font-semibold">Q1 Bank Statements &amp; Mortgage Certificate</span>.
                        </p>
                        <div className="pt-2">
                          <div className="inline-block px-3 py-1.5 rounded bg-[#DAA640]/15 border border-[#DAA640]/40 text-[#DAA640] font-mono text-[11px] font-semibold">
                            ↗ Click Here to Upload Records (Direct Secure Link)
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 pt-1">
                          No login required · Uploads straight into your practice file
                        </p>
                      </div>

                      {/* Control Panel Buttons & Feedback */}
                      {feedbackMsg && (
                        <div className="mt-3 p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center justify-between">
                          <span>{feedbackMsg}</span>
                          <button onClick={() => setFeedbackMsg(null)} className="text-emerald-400 hover:text-white ml-2 text-xs">✕</button>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2 text-xs">
                        <button 
                          onClick={() => setFeedbackMsg("Action logged: Reminder snoozed for 7 days.")}
                          className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] font-mono cursor-pointer min-h-[36px]"
                        >
                          Snooze 7 Days
                        </button>
                        <button 
                          onClick={() => setFeedbackMsg("Action logged: Custom message note saved for client file.")}
                          className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] font-mono cursor-pointer min-h-[36px]"
                        >
                          Customise Note
                        </button>
                      </div>
                    </div>

                    {/* Operational Reassurance Card */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white">
                        <ShieldCheck className="w-4 h-4 text-[#DAA640]" />
                        <span>Zero Risk to Client Privacy</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        We never touch, process, or view confidential client tax returns or bank ledgers. Reminders only prompt clients to upload directly into your existing software (Dext, Xero, Iris).
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 3: AUTOMATED ONBOARDING & AML CHECKLIST */}
            {activeTab === "onboarding" && (
              <motion.div
                key="tab-onboarding"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DAA640]">
                      SIMULATION 03 · CLIENT CONVERSION PIPELINE
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mt-1">
                      From Verbal &ldquo;Yes&rdquo; to Active Billing File in 48 Hours
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                      Traditional accounting firms take 2–3 weeks of email ping-pong to onboard new clients. Test how governed digital checklists eliminate paperwork friction.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={completeAllOnboarding}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer min-h-[44px]"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Simulate All Complete</span>
                    </button>
                    <button
                      onClick={() => setOnboardingItems([
                        { id: "engagement", title: "Engagement Letter & Fee Schedule", desc: "Automated digital proposal with terms & scope", done: false, time: "Pending" },
                        { id: "aml", title: "AML / Photo ID & Proof of Address", desc: "Smartphone verification link sent via SMS", done: false, time: "Pending" },
                        { id: "agent-64-8", title: "HMRC 64-8 Agent Authorisation", desc: "HMRC online authorisation code requested", done: false, time: "Pending" },
                        { id: "clearance", title: "Professional Clearance Letter", desc: "Automated request dispatched to outgoing firm", done: false, time: "Pending" },
                        { id: "mandate", title: "Direct Debit / Fee Mandate", desc: "GoCardless / Stripe recurring billing agreement", done: false, time: "Pending" },
                      ])}
                      className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 text-slate-300 hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Reset checklist"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar & Benchmark */}
                <div className="bg-[#141417] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-white">
                      Onboarding Pipeline Status: {onboardingItems.filter(i => i.done).length} of {onboardingItems.length} Milestones Cleared
                    </span>
                    <span className="font-mono text-[#DAA640]">
                      {Math.round((onboardingItems.filter(i => i.done).length / onboardingItems.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-black/60 rounded-full h-2.5 overflow-hidden border border-white/5">
                    <motion.div 
                      className="bg-gradient-to-r from-amber-500 to-[#DAA640] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(onboardingItems.filter(i => i.done).length / onboardingItems.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Checklist Step-Through */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Milestones list (7 cols) */}
                  <div className="lg:col-span-7 space-y-2.5">
                    {onboardingItems.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          item.done 
                            ? "bg-[#141417] border-emerald-500/30 text-white"
                            : "bg-[#09090B] border-white/10 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          item.done 
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                            : "border-white/20 bg-black/40 text-transparent"
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-xs sm:text-sm font-semibold truncate ${item.done ? "text-white" : "text-slate-300"}`}>
                              {idx + 1}. {item.title}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                              {item.done ? "Completed ✓" : "Tap to complete"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Impact Summary Card (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 space-y-3">
                      <div className="text-xs font-mono font-bold text-[#DAA640] uppercase">
                        ONBOARDING VELOCITY COMPARISON
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                          <span className="text-slate-400">Manual Email Back-and-Forth:</span>
                          <span className="font-mono text-red-400 font-semibold">18–24 Days Lag</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-slate-200 font-semibold">Governed Digital Checklist:</span>
                          <span className="font-mono text-emerald-400 font-bold">48 Hours Total</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                        Clients love the friction-free experience. When professional clearance and direct debits are automated, clients begin paying retainers immediately rather than next month.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                      <UserCheck className="w-5 h-5 text-[#DAA640] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">Full AML Compliance Protected</div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                          Collects photo ID, passport scans, and proof of address before any advisory work begins, maintaining your ICAEW/ACCA supervisory standards.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 4: PRACTICE CAPACITY & TIME SAVED CALCULATOR */}
            {activeTab === "calculator" && (
              <motion.div
                key="tab-calculator"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DAA640]">
                      DIRECT VISUAL PROOF · 10+ HOURS RECOVERED EVERY WEEK
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mt-1">
                      Practice Capacity &amp; Billable Hours Reclaimed
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                      See the exact breakdown of senior fee-earner hours recovered when enquiry triage, MTD document chasing, and onboarding are governed automatically.
                    </p>
                  </div>

                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-xs sm:text-sm transition-all shadow-md self-start md:self-auto min-h-[44px]"
                  >
                    <span>Book 15-Min Walkthrough</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Practice Size Selector */}
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-2">Select Your Practice Size:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "sole", label: "Sole Practitioner", range: "45–80 Active Clients" },
                      { id: "small", label: "2–3 Partner Practice", range: "80–220 Active Clients" },
                      { id: "growth", label: "Growing Multi-Partner Firm", range: "220–450+ Active Clients" },
                    ].map((scale) => (
                      <button
                        key={scale.id}
                        onClick={() => setPracticeScale(scale.id as "sole" | "small" | "growth")}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                          practiceScale === scale.id
                            ? "bg-[#141417] border-[#DAA640] text-white ring-1 ring-[#DAA640]/40"
                            : "bg-[#050505] border-white/10 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-semibold text-white">{scale.label}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{scale.range}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 text-center sm:text-left">
                    <div className="text-[11px] font-mono uppercase text-[#DAA640] font-semibold">Weekly Time Saved</div>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                      {scaleStats.totalHours} <span className="text-lg font-normal text-slate-400">hrs/wk</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Per partner across your practice</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 text-center sm:text-left">
                    <div className="text-[11px] font-mono uppercase text-[#DAA640] font-semibold">Annual Admin Recovered</div>
                    <div className="text-3xl sm:text-4xl font-black text-[#DAA640] mt-1">
                      {scaleStats.annualSaved} <span className="text-lg font-normal text-amber-200/70">hours</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Admin drag converted into client capacity</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 text-center sm:text-left">
                    <div className="text-[11px] font-mono uppercase text-[#DAA640] font-semibold">New Client Capacity</div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                      {scaleStats.newCapacity}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Without expanding administrative headcount</div>
                  </div>
                </div>

                {/* Breakdown by Core Friction */}
                <div className="bg-[#09090B] border border-white/10 rounded-xl p-4 sm:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Weekly Breakdown by Friction Point:
                  </h4>

                  <div className="space-y-3">
                    {[
                      {
                        title: "1. Inbound Enquiry Qualification & Phone Tag",
                        hours: `${scaleStats.intakeHours} hrs/week`,
                        desc: "Eliminates tyre-kickers, answers out-of-hours leads in <3 minutes, and locks partner diary automatically.",
                      },
                      {
                        title: "2. Missing Records & Document Chasing (MTD + Year-End)",
                        hours: `${scaleStats.chasingHours} hrs/week`,
                        desc: "Pre-approved courteous WhatsApp & email reminder cadences. Chases bank statements & receipts without staff friction.",
                      },
                      {
                        title: "3. Client Onboarding, AML Follow-up & Mandates",
                        hours: `${scaleStats.onboardingHours} hrs/week`,
                        desc: "Automated e-signatures, photo ID capture, and GoCardless direct debit establishment in 48 hours.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 p-3 rounded-lg bg-black/40 border border-white/5">
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-white">{item.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-[#DAA640] shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                          {item.hours}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#DAA640]" />
                      <span>Works seamlessly with Xero, Dext, Iris, BrightManager &amp; TaxCalc</span>
                    </div>
                    <div className="text-amber-300 font-mono font-medium">
                      Estimated Partner Billing Value: {scaleStats.valueReclaimed}/year
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

          {/* Quick Sandbox Bottom Call-to-Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              <span className="font-semibold text-white">Want this deployed for your practice?</span> We set up the intake and chasing cadences in 7 business days.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-xs sm:text-sm transition-all shadow-md min-h-[44px]"
              >
                <span>Book a Practice Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://wa.me/447851055929"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Message on WhatsApp"
              >
                <PhoneCall className="w-4 h-4 text-[#DAA640]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
