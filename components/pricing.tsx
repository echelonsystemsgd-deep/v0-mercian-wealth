"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { 
  ChevronDown, 
  ChevronUp,
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Zap, 
  Clock, 
  Navigation, 
  Sliders, 
  Check, 
  Layers, 
  Cpu,
  Activity,
  Filter
} from "lucide-react"
import Link from "next/link"
import type { PricingTier } from "@/lib/pricing"
import { SITE_COPY } from "@/lib/site-copy"

interface ComparisonItem {
  name: string
  detail?: string
  essential: string
  pro: string
  custom: string
  highlight?: boolean
}

interface ComparisonCategory {
  id: string
  category: string
  icon: any
  badge: string
  description: string
  items: ComparisonItem[]
}

const comparisonCategories: ComparisonCategory[] = [
  {
    id: "voice",
    category: "24/7 AI Voice & Inbound Telephony",
    icon: PhoneCall,
    badge: "Sub-380ms Latency",
    description: "Inbound call answering, intent qualification, live conversational transcripts, and deposit captures.",
    items: [
      { name: "Voice Answering Latency", detail: "Neural speech latency before assistant starts replying", essential: "< 450ms Neural Voice", pro: "< 380ms Neural Voice", custom: "< 350ms Dedicated SIP Trunk", highlight: true },
      { name: "24/7 Inbound Answering", detail: "Continuous uptime with 0 missed emergency or off-peak calls", essential: "✓ Included (24/7/365)", pro: "✓ Included (24/7/365)", custom: "✓ Dedicated Multi-Line SIP Trunk" },
      { name: "Emergency Triage & Qualification", detail: "Decision trees to evaluate customer budget and emergency tier", essential: "Standard Qualification Logic", pro: "Advanced Multi-Branch Triage", custom: "Bespoke Enterprise Subagent Logic" },
      { name: "Upfront Stripe / Apple Pay Deposit", detail: "Locking customer commitment during the live telephone call", essential: "✓ Instant SMS / Link Deposit", pro: "✓ Dynamic Deposit & Geofence Surcharge", custom: "✓ Multi-Currency & Corporate Terms" },
    ]
  },
  {
    id: "dispatch",
    category: "Spatial Fleet Dispatch & Workflows",
    icon: Navigation,
    badge: "Real-Time GPS",
    description: "Automated geofence technician matching, WhatsApp alerts, and customer GPS tracking links.",
    items: [
      { name: "Spatial Geofence Matching", detail: "Calculating proximity to nearest field engineer or driver", essential: "— (Direct Team Alert)", pro: "✓ Real-Time Driver Geofence Match", custom: "✓ Multi-Depot Fleet Optimization", highlight: true },
      { name: "Instant Smartphone WhatsApp Dispatch", detail: "Sub-second job handoff with customer details and map pin", essential: "✓ Sub-0.4s Alert to Phone", pro: "✓ Sub-0.4s Alert + Driver PWA", custom: "✓ Custom Operator Control Center" },
      { name: "Customer Live GPS ETA Link", detail: "Live Uber-style technician arrival link sent directly to customer", essential: "Standard Confirmation SMS", pro: "✓ Live Technician GPS Tracking Link", custom: "✓ White-Label Customer Portal" },
      { name: "CRM & Calendar Auto-Sync", detail: "Immediate booking injection with zero manual coordinator input", essential: "Google / Outlook Sync", pro: "✓ ServiceTitan / Jobber / HubSpot Sync", custom: "✓ Custom ERP / Database Auto-Sync" },
    ]
  },
  {
    id: "outbound",
    category: "Outbound SDR & Database Reactivation",
    icon: Zap,
    badge: "< 45s Speed-To-Lead",
    description: "Sub-45s outbound dialing on new ad leads, automated database reactivation, and WhatsApp nurture.",
    items: [
      { name: "Speed-To-Lead Outbound Dialing", detail: "Calling ad leads before they click a competitor search result", essential: "—", pro: "✓ <45s Outbound Call to Ad Leads", custom: "✓ High-Volume Parallel Calling Desk", highlight: true },
      { name: "Dormant Customer Reactivation", detail: "Automated campaign reviving past quotes and unbooked leads", essential: "—", pro: "✓ Monthly Database Campaign", custom: "✓ Continuous Multi-Channel SDR" },
      { name: "Multi-Channel WhatsApp/SMS Nurture", detail: "Smart follow-up sequences until booking or explicit opt-out", essential: "Standard Post-Call SMS", pro: "✓ 5-Step Dynamic Nurture Workflow", custom: "✓ Bespoke Multi-Agent SDR Network" },
    ]
  },
  {
    id: "operations",
    category: "Managed Retainer SLA & Operations",
    icon: ShieldCheck,
    badge: "99.98% Telephony SLA",
    description: "Dedicated telephony servers, weekly prompt tuning, conversation QA audits, and engineer support.",
    items: [
      { name: "Dedicated Telephony Infrastructure", detail: "Voice hosting and isolated call trunk routing nodes", essential: "Shared High-Performance Node", pro: "Dedicated Telephony Server", custom: "Isolated Multi-Region Node" },
      { name: "Weekly Conversation & Edge-Case Audits", detail: "Engineers inspecting edge cases, hallucinations, and prompt tuning", essential: "Bi-Weekly Prompt Audits", pro: "✓ Weekly Prompt & Edge-Case Audits", custom: "✓ Continuous Real-Time QA & Tuning" },
      { name: "Telephony Uptime SLA", detail: "Contractual guarantee on continuous phone line availability", essential: "99.9% Uptime", pro: "99.98% Uptime SLA", custom: "99.99% Enterprise Uptime SLA", highlight: true },
      { name: "Technical Support SLA", detail: "Direct escalation path for prompt updates or workflow adjustments", essential: "< 4 Hours Response", pro: "< 2 Hours Priority Support", custom: "Direct Founder Phone Hotline" },
    ]
  }
]

interface PricingProps {
  isHomepage?: boolean
  setupTiers?: PricingTier[]
  retainerTiers?: PricingTier[]
  revenueShareTiers?: PricingTier[]
}

export function Pricing({ isHomepage = false, setupTiers: propSetupTiers, retainerTiers: propRetainerTiers, revenueShareTiers: propRevenueShareTiers }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "oneTime" | "revenueShare">("monthly")
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // All accordion cards closed by default to keep page compact and clean
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [activeTierFocus, setActiveTierFocus] = useState<"all" | "essential" | "pro" | "custom">("all")

  const oneTimeTiers = (SITE_COPY.pricingPage as any).oneTimeTiers || []
  const monthlyTiers = (SITE_COPY.pricingPage as any).monthlyTiers || []
  const revenueShareTiers = (SITE_COPY.pricingPage as any).revenueShareTiers || []

  const activeTiers = 
    billingCycle === "oneTime"
      ? (propSetupTiers && propSetupTiers.length > 0 ? propSetupTiers : oneTimeTiers)
      : billingCycle === "monthly"
      ? (propRetainerTiers && propRetainerTiers.length > 0 ? propRetainerTiers : monthlyTiers)
      : (propRevenueShareTiers && propRevenueShareTiers.length > 0 ? propRevenueShareTiers : revenueShareTiers)

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleSelectDomainFilter = (domainId: string) => {
    setActiveCategoryFilter(domainId)
    setIsDropdownOpen(false)
    if (domainId !== "all") {
      // Automatically expand the filtered domain for focused inspection
      setExpandedCategories({ [domainId]: true })
    }
  }

  const toggleAllCategories = () => {
    const anyOpen = Object.values(expandedCategories).some(Boolean)
    const newState: Record<string, boolean> = {}
    comparisonCategories.forEach(cat => {
      newState[cat.id] = !anyOpen
    })
    setExpandedCategories(newState)
  }

  const filteredCategories = activeCategoryFilter === "all" 
    ? comparisonCategories 
    : comparisonCategories.filter(c => c.id === activeCategoryFilter)

  return (
    <section id="pricing" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#09090B]">
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-[#DCAE53]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-[#DCAE53]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header (if isHomepage) */}
        {isHomepage && (
          <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCAE53] font-mono">
              [ {SITE_COPY.homepage.modelHint.eyebrow} ]
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-3 leading-tight">
              {SITE_COPY.homepage.modelHint.headline}
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              {SITE_COPY.homepage.modelHint.description}
            </p>
          </div>
        )}

        {/* Billing Switcher Header (3 Tabs) */}
        <div className="flex justify-center mb-10 lg:mb-14 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 bg-[#111115] p-1 sm:p-1.5 rounded-full border border-[#DCAE53]/25 relative shadow-lg max-w-full min-w-0">
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                billingCycle === "monthly" ? "text-[#09090B] font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-full bg-[#DCAE53] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              Monthly Managed Retainer
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("oneTime")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                billingCycle === "oneTime" ? "text-[#09090B] font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {billingCycle === "oneTime" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-full bg-[#DCAE53] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              Implementation Setup
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("revenueShare")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                billingCycle === "revenueShare" ? "text-[#09090B] font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {billingCycle === "revenueShare" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-full bg-[#DCAE53] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              Performance Share
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mb-14">
          <AnimatePresence mode="wait">
            {activeTiers.map((tier: PricingTier, idx: number) => (
              <motion.div
                key={`${billingCycle}-${tier.id || idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`flex flex-col relative rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  tier.featured
                    ? "bg-[#111115] border-[#DCAE53] shadow-2xl shadow-[#DCAE53]/15 lg:-translate-y-2 z-10"
                    : "bg-[#0c0c0e] border-slate-800/90 hover:border-slate-700 shadow-xl"
                }`}
              >
                {tier.featured && (
                  <div className="bg-[#DCAE53] text-[#09090B] py-1.5 px-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most High-Growth UK Operations</span>
                  </div>
                )}

                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <CardContent className="p-0 space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider">
                          [ {tier.highlight || `Tier 0${idx + 1}`} ]
                        </span>
                        {tier.featured && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Guaranteed SLA
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed min-h-[40px]">
                        {tier.description}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="py-4 border-y border-slate-800/80">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                          {tier.price}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {tier.interval}
                        </span>
                      </div>
                      {(tier as any).milestoneBreakdown && (
                        <div className="mt-2.5 p-2 rounded-lg bg-[#18181F] border border-slate-800 text-[11px] text-slate-300 leading-relaxed flex items-center gap-2 font-mono">
                          <span className="text-[#DCAE53] font-bold shrink-0">⚡</span>
                          <span>{(tier as any).milestoneBreakdown}</span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5">
                      {tier.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[#DCAE53] text-sm shrink-0 mt-0.5 font-bold">✦</span>
                          <span className="text-xs text-slate-200 leading-normal font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Tier Action CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <Button
                      asChild
                      size="lg"
                      className={`w-full py-5 text-xs font-bold rounded-xl transition-all ${
                        tier.featured
                          ? "bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] shadow-lg shadow-[#DCAE53]/20"
                          : "border border-[#DCAE53]/40 bg-[#18181F] text-white hover:bg-[#DCAE53] hover:text-[#09090B]"
                      }`}
                    >
                      <Link href="/book">
                        <span>Book 15-Minute Voice Audit</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scope, Timelines & Additional Charges Transparency Callout */}
        <div className="mb-12 p-5 sm:p-7 rounded-3xl bg-[#111115] border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#DCAE53]/10 text-[#DCAE53]">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Scope, Timelines &amp; Billing Transparency
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-2.5 py-0.5 rounded-full border border-[#DCAE53]/30 w-fit">
              100% Upfront Commercial Clarity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-800/80 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <span>⏱️</span>
                <span>Realistic Build Timelines</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                We work in rapid agile sprints. Standard setups aim for <strong className="text-white">7–14 business days</strong> once scripts, pricing sheets, and CRM access are supplied. Complex multi-branch integrations take longer depending on technical scope and owner feedback cadence.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-800/80 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <span>📞</span>
                <span>Telephony Minutes &amp; Carrier Costs</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Monthly retainers include generous voice minute allowances (<strong className="text-white">1,500 to 3,500+ mins/mo</strong>). High-volume excess minutes or dedicated international SIP numbers are passed through at transparent wholesale carrier cost (~£0.09/min).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-800/80 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <span>🛠️</span>
                <span>Additional Scope &amp; Bespoke APIs</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Standard webhooks and calendar links are 100% included. Additional geographic depots, specialized legacy ERP database programming, or extra custom sub-agent workflows outside agreed specifications are quoted clearly in advance.
              </p>
            </div>
          </div>
        </div>

        {/* Homepage subtle link or Standalone Detailed Matrix */}
        {isHomepage ? (
          <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-[#DCAE53]">
              ✦ 99.98% Telephony SLA · Sub-500ms Voice Latency Guaranteed
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium underline underline-offset-4"
            >
              <span>View Full Architecture Comparison Matrix</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DCAE53]" />
            </Link>
          </div>
        ) : (
          /* MODERN FLOATING DROPDOWN ARCHITECTURE MATRIX (No Static Rigid Table) */
          <div className="border-t border-slate-800 pt-16 mt-4">
            
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
                <Sliders className="w-3.5 h-3.5 text-[#DCAE53]" />
                <span>Interactive Technical Architecture Matrix</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 font-sans tracking-tight">
                Enterprise Infrastructure Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
                Filter and compare voice latency, dispatch logic, multi-agent workflows, and managed retainer SLAs across all operational tiers.
              </p>
            </div>

            {/* FLOATING DROPDOWN & FILTER CONTROL BAR */}
            <div className="sticky top-20 z-30 mb-8 max-w-4xl mx-auto px-2">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-[#111115] border border-[#DCAE53]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                
                {/* Floating Category Dropdown Menu */}
                <div className="relative w-full sm:w-auto">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 hover:border-[#DCAE53]/50 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-[#DCAE53]" />
                      <span className="text-slate-400 font-normal">Domain:</span>
                      <span className="text-[#DCAE53]">
                        {activeCategoryFilter === "all" 
                          ? "All Operational Domains (4)" 
                          : comparisonCategories.find(c => c.id === activeCategoryFilter)?.category}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#DCAE53]" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-full sm:w-72 bg-[#111115] border border-[#DCAE53]/40 rounded-2xl p-2 shadow-2xl z-50 space-y-1"
                      >
                        <button
                          onClick={() => handleSelectDomainFilter("all")}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            activeCategoryFilter === "all" ? "bg-[#DCAE53] text-[#09090B]" : "text-slate-300 hover:bg-[#18181F] hover:text-white"
                          }`}
                        >
                          <span>All Operational Domains</span>
                          <span className="font-mono text-[10px]">4</span>
                        </button>
                        {comparisonCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleSelectDomainFilter(cat.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              activeCategoryFilter === cat.id ? "bg-[#DCAE53] text-[#09090B]" : "text-slate-300 hover:bg-[#18181F] hover:text-white"
                            }`}
                          >
                            <span className="truncate pr-2">{cat.category}</span>
                            <cat.icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tier Focus Pills */}
                <div className="flex items-center gap-1 sm:gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-[10px] font-mono text-slate-400 mr-1 hidden md:inline">Highlight:</span>
                  {(["all", "essential", "pro", "custom"] as const).map((tierKey) => (
                    <button
                      key={tierKey}
                      onClick={() => setActiveTierFocus(tierKey)}
                      className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                        activeTierFocus === tierKey
                          ? "bg-[#DCAE53] text-[#09090B] shadow-sm"
                          : "bg-[#18181F] text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {tierKey === "all" ? "All 3 Tiers" : tierKey === "essential" ? "Core" : tierKey === "pro" ? "Growth ★" : "Enterprise"}
                    </button>
                  ))}

                  {/* Expand / Collapse All */}
                  <button
                    onClick={toggleAllCategories}
                    className="p-1.5 rounded-lg bg-[#18181F] text-slate-400 hover:text-[#DCAE53] border border-slate-800 transition-colors hidden lg:inline-flex"
                    title="Toggle Expand All"
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* INTERACTIVE FLOATING ACCORDION CATEGORY CARDS */}
            <div className="space-y-6 max-w-5xl mx-auto">
              {filteredCategories.map((cat) => {
                const isOpen = Boolean(expandedCategories[cat.id])
                const IconComponent = cat.icon

                return (
                  <motion.div
                    key={cat.id}
                    layout
                    className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#111115] shadow-xl overflow-hidden transition-all hover:border-[#DCAE53]/35"
                  >
                    {/* Floating Accordion Header Bar */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full p-4 sm:p-6 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#18181F]/40"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] shrink-0 shadow-md">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                              {cat.category}
                            </h4>
                            <span className="hidden sm:inline-block font-mono text-[9px] text-[#DCAE53] bg-[#DCAE53]/10 px-2 py-0.5 rounded border border-[#DCAE53]/25 uppercase font-bold">
                              {cat.badge}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-400 max-w-xl">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
                          {isOpen ? "Collapse" : "Expand Specs"}
                        </span>
                        <div className={`p-1.5 sm:p-2 rounded-full border border-slate-800 bg-[#18181F] text-slate-300 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#DCAE53]" : ""}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Capability Breakdown Cards */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-slate-800/80 px-4 sm:px-6 py-4 space-y-4"
                        >
                          {cat.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0c0c0e] border border-slate-800/80 hover:border-slate-700 transition-all space-y-3"
                            >
                              {/* Capability Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53]" />
                                  <h5 className="font-bold text-xs sm:text-sm text-white">
                                    {item.name}
                                  </h5>
                                </div>
                                {item.detail && (
                                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                                    {item.detail}
                                  </span>
                                )}
                              </div>

                              {/* 3 Interactive Spec Cards */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                
                                {/* 1. Core Voice Desk */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "essential" || activeTierFocus === "all"
                                      ? "bg-[#111115] border-slate-800 text-slate-200"
                                      : "bg-[#09090b] border-slate-900 opacity-40 text-slate-500"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">
                                    Core Voice Desk
                                  </div>
                                  <div className="text-xs font-semibold">
                                    {item.essential}
                                  </div>
                                </div>

                                {/* 2. Autonomous Growth (Featured) */}
                                <div
                                  className={`p-3 rounded-xl border relative transition-all ${
                                    activeTierFocus === "pro" || activeTierFocus === "all"
                                      ? "bg-[#DCAE53]/10 border-[#DCAE53]/50 shadow-md text-white"
                                      : "bg-[#09090b] border-slate-900 opacity-40 text-slate-500"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-mono text-[#DCAE53] uppercase font-bold">
                                      Autonomous Growth
                                    </span>
                                    <span className="text-[8px] font-mono text-[#09090B] bg-[#DCAE53] px-1.5 rounded font-bold">
                                      RECOMMENDED
                                    </span>
                                  </div>
                                  <div className="text-xs font-bold text-white">
                                    {item.pro}
                                  </div>
                                </div>

                                {/* 3. Enterprise Infrastructure */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "custom" || activeTierFocus === "all"
                                      ? "bg-[#111115] border-slate-800 text-slate-200"
                                      : "bg-[#09090b] border-slate-900 opacity-40 text-slate-500"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">
                                    Enterprise Infrastructure
                                  </div>
                                  <div className="text-xs font-semibold text-slate-300">
                                    {item.custom}
                                  </div>
                                </div>

                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Audit CTA */}
            <div className="text-center mt-12 sm:mt-16">
              <Button asChild size="lg" className="bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold px-8 py-6 rounded-2xl shadow-xl shadow-[#DCAE53]/20">
                <Link href="/book" className="flex items-center gap-2">
                  <span>Schedule 15-Min Voice Diagnostic Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
