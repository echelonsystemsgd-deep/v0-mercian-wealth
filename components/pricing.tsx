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
  Filter,
  Globe
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
    id: "web",
    category: "Practice Hub & Speed Architecture",
    icon: Globe,
    badge: "Sub-Second Load",
    description: "Bespoke digital design, mobile speed optimization, practice search discoverability, and MTD trust signals.",
    items: [
      { name: "Mobile Page Speed", detail: "Optimized Next.js code and global edge CDN delivering sub-second first contentful paint", essential: "Sub-400ms Edge CDN", pro: "Optimized Edge Render", custom: "Dedicated Edge Cluster", highlight: true },
      { name: "Practice Brand Design", detail: "Custom designed layouts tailored to your firm, with zero generic leaflet templates", essential: "Core Practice Hub (3 Pages)", pro: "Interactive Intake Hub (Up to 7 Pages)", custom: "Multi-Partner & Multi-Office Web Architecture" },
      { name: "Accountancy Schema & Discovery", detail: "Technical SEO, rich snippets, and machine-readable Schema.org JSON-LD for Google and AI engines", essential: "Local SEO & Practice Schema", pro: "Advanced FAQ & Sector Tax Schema", custom: "Multi-Location Regional Entity Graph" },
      { name: "Compliance & Trust Badges", detail: "ICAEW, ACCA, CTA, AAT compliance badging and MTD-ready trust indicators", essential: "✓ Core Compliance Badges", pro: "✓ Dynamic Sector Trust Badging", custom: "✓ Multi-Entity Institutional Badging" },
    ]
  },
  {
    id: "triage",
    category: "Client Intake & Two-Way Diary Sync",
    icon: Navigation,
    badge: "60-Second Triage",
    description: "Structured intake flows qualifying turnover, sector, and accounting software without open-box form fatigue.",
    items: [
      { name: "Client Intake Triage", detail: "Mobile-first intake qualifying sector, business structure, and turnover in under 60 seconds", essential: "Direct Partner Call & Routing", pro: "✓ 60-Second Interactive Triage", custom: "✓ Bespoke Multi-Branch Intake Routing", highlight: true },
      { name: "Two-Way Calendar Booking", detail: "Automated partner scheduling with Calendly, Google, or Outlook calendar synchronization", essential: "Direct Contact Routing", pro: "✓ Direct Two-Way Calendar Sync", custom: "✓ Multi-Partner Diary Routing" },
      { name: "Back-End CRM & Routing", detail: "Centralized client inquiry pipeline tracking, software tagging, and practice CRM sync", essential: "Partner Lead Inbox", pro: "✓ Centralized Practice CRM", custom: "✓ Custom Practice Pipeline Sync" },
      { name: "Speed-to-Lead Partner Alerts", detail: "Instant notification with complete client turnover and service specs sent immediately", essential: "✓ Direct Partner Email & Call", pro: "✓ Instant WhatsApp & Mobile Alert", custom: "✓ Multi-Partner Branch Webhook Routing" },
    ]
  },
  {
    id: "growth",
    category: "Retainer Acquisition & Follow-Ups",
    icon: Zap,
    badge: "Zero Leaked Leads",
    description: "Automated discovery confirmations, email sequences, document checklists, and conversion optimization.",
    items: [
      { name: "Automated Intake Sequences", detail: "Automated booking confirmation, onboarding checklists, and meeting reminders", essential: "Standard Confirmation Email", pro: "✓ Multi-Step Practice Sequences", custom: "✓ Bespoke Lifecycle Client Journeys", highlight: true },
      { name: "Fee Scoper & Estimator", detail: "Interactive bookkeeping and tax quote scoper to set fee expectations upfront", essential: "—", pro: "✓ Interactive Fee Estimator", custom: "✓ Custom Multi-Service Calculator" },
      { name: "Quiet Lead Re-Engagement", detail: "Follow-up workflows re-engaging prospective clients who inquired but haven't booked", essential: "—", pro: "✓ Automated Follow-Up Sequences", custom: "✓ Custom Corporate Re-Engagement" },
    ]
  },
  {
    id: "hosting",
    category: "Managed Cloud Infrastructure & Care",
    icon: ShieldCheck,
    badge: "Verified Uptime",
    description: "High-performance edge cloud hosting, monthly speed checks, schema tuning, and priority partner support.",
    items: [
      { name: "Managed Cloud Infrastructure", detail: "UK edge cloud hosting with automated SSL renewals, daily backups, and uptime monitoring", essential: "£29/mo Managed Hosting", pro: "£49/mo Managed Care", custom: "£99/mo Priority Infrastructure" },
      { name: "Monthly SEO & Schema Audits", detail: "Ongoing ranking audits, Google Search Console checks, and structured schema maintenance", essential: "Monthly Health Check", pro: "✓ Active Search & Schema Tuning", custom: "✓ Multi-Location Regional Graph Audits" },
      { name: "Intake Flow & Triage Maintenance", detail: "Ongoing tuning for inquiry forms, triage options, and calendar slot rules", essential: "Standard Care", pro: "✓ Monthly Triage Flow Tuning", custom: "✓ Continuous Workflow & Portal Tuning", highlight: true },
      { name: "Partner Engineering Support Desk", detail: "Direct technical support for copy changes, fee updates, and service tier additions", essential: "Standard Support Desk", pro: "Priority Support Desk", custom: "Direct WhatsApp / Slack Partner Desk" },
    ]
  }
]

interface PricingProps {
  isHomepage?: boolean
  setupTiers?: PricingTier[]
  retainerTiers?: PricingTier[]
  revenueShareTiers?: PricingTier[]
}

export function Pricing({ isHomepage = false, setupTiers: propSetupTiers }: PricingProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [activeTierFocus, setActiveTierFocus] = useState<"all" | "essential" | "pro" | "custom">("all")

  const oneTimeTiers = (SITE_COPY.pricingPage as any).oneTimeTiers || []
  const activeTiers = propSetupTiers && propSetupTiers.length > 0 ? propSetupTiers : oneTimeTiers

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
    <section id="pricing" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#050505]">
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-[#DAA640]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-[#DAA640]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header (if isHomepage) */}
        {isHomepage && (
          <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#DAA640] font-mono">
              {SITE_COPY.homepage.modelHint.eyebrow}
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-3 leading-tight">
              {SITE_COPY.homepage.modelHint.headline}
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              {SITE_COPY.homepage.modelHint.description}
            </p>
          </div>
        )}

        {/* Engineered Practice Scope & Transparent Terms Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 text-center space-y-1.5 shadow-xl">
          <span className="text-[10px] font-mono text-[#DAA640] uppercase tracking-widest font-bold block">
            PRACTICE INFRASTRUCTURE · 3 TRANSPARENT COMMERCIAL TIERS
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            Every build is engineered specifically for UK accountancy firms, commercial tax advisors, and premier businesses. One-time setup fee + automated monthly cloud infrastructure (<strong className="text-white font-semibold">£29–£99/mo</strong>) via direct debit with zero lock-in contracts and 100% asset ownership. Turnaround timelines commence upon receipt of client onboarding details, copy assets, and credentials.
          </p>
        </div>

        {/* 3 Main Practice Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mb-14">
          <AnimatePresence mode="wait">
            {activeTiers.slice(0, 3).map((tier: PricingTier, idx: number) => {
              const isFirst = idx === 0
              const isSecond = idx === 1
              const isThird = idx === 2

              const hostingFee = isFirst ? "£29/mo" : isSecond ? "£49/mo" : "£99/mo"
              const deliveryTime = isFirst ? "2 Weeks" : isSecond ? "3–4 Weeks" : "6–8 Weeks"

              return (
                <motion.div
                  key={`practice-tier-${tier.id || idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`flex flex-col relative rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    tier.featured
                      ? "bg-[#0B0B0D] border-[#DAA640] shadow-2xl shadow-[#DAA640]/10 lg:-translate-y-2 z-10"
                      : "bg-[#0B0B0D] border-white/10 hover:border-white/20 shadow-xl"
                  }`}
                >
                  {tier.featured && (
                    <div className="bg-[#DAA640] text-black py-1.5 px-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Sales Prof Tier · Most Popular</span>
                    </div>
                  )}

                  <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between">
                    <CardContent className="p-0 space-y-4 sm:space-y-5">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                          <span className="text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider">
                            {tier.highlight || `Tier 0${idx + 1}`}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {deliveryTime}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                          {tier.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed min-h-[36px]">
                          {tier.description}
                        </p>
                      </div>

                      {/* Price Block */}
                      <div className="py-3 sm:py-4 border-y border-white/10">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xl sm:text-3xl font-extrabold font-mono tracking-tight text-white">
                            {tier.price.startsWith('£') ? tier.price : `£${tier.price}`}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            {tier.interval}
                          </span>
                        </div>

                        {/* Optional Promo or Price Clarification */}
                        {isFirst && (
                          <div className="mt-1 text-[11px] font-mono text-amber-400">
                            (or £495 promotional entry rate)
                          </div>
                        )}

                        {/* Delivery & Hosting Specs Bar */}
                        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] font-mono">
                          <div className="p-2 rounded-lg bg-[#141417] border border-white/10 text-zinc-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#DAA640] shrink-0" />
                            <span>{deliveryTime}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{hostingFee} hosting</span>
                          </div>
                        </div>

                        {(tier as any).milestoneBreakdown && (
                          <div className="mt-2 p-2 rounded-lg bg-[#141417] border border-white/10 text-[10px] sm:text-[11px] text-zinc-300 leading-relaxed flex items-center gap-2 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0" />
                            <span>{(tier as any).milestoneBreakdown}</span>
                          </div>
                        )}
                      </div>

                      {/* Features List */}
                      <div className="space-y-2 sm:space-y-2.5">
                        {tier.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0 mt-1.5" />
                            <span className="text-xs text-zinc-300 leading-normal font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Tier Action CTA */}
                    <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10">
                      <Button
                        asChild
                        size="lg"
                        className={`w-full min-h-[44px] py-4 text-xs font-semibold rounded-xl transition-all ${
                          tier.featured
                            ? "bg-[#DAA640] hover:bg-[#E5B85C] text-black shadow-lg shadow-[#DAA640]/20"
                            : "border border-white/10 bg-[#141417] text-white hover:bg-white/10"
                        }`}
                      >
                        <Link href="/book">
                          <span>Book a call</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* 4th Card: Bespoke Practice Architecture for Custom Scopes */}
        {(() => {
          const customScope = (SITE_COPY.pricingPage as any).customScopeTiers?.oneTime
          if (!customScope) return null
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-14 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0B0B0D] border border-[#DAA640]/30 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#DAA640]/10 rounded-full blur-[90px] pointer-events-none" />
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DAA640]/15 border border-[#DAA640]/30 text-[#DAA640] text-[10px] font-mono font-bold uppercase tracking-wider">
                      {customScope.tag || "Enterprise Bespoke"}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {customScope.interval}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      Scoped Sprints Delivery
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {customScope.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {customScope.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5">
                    {customScope.features.map((feat: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between w-full lg:w-auto shrink-0 gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  <div className="text-left lg:text-right space-y-0.5">
                    <div className="text-[11px] font-mono text-zinc-400">Scope &amp; Investment</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#DAA640] font-mono">
                      {customScope.price}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 max-w-xs">
                      {customScope.milestoneBreakdown}
                    </div>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto min-h-[44px] px-8 py-3 text-xs font-bold rounded-xl bg-[#DAA640] hover:bg-[#E5B85C] text-black shadow-lg shadow-[#DAA640]/20 transition-all cursor-pointer"
                  >
                    <Link href="/book">
                      <span>Book a call</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })()}

        {/* Scope, Timelines & Additional Charges Transparency Callout */}
        <div className="mb-12 p-5 sm:p-7 rounded-2xl bg-[#0B0B0D] border border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#141417] text-[#DAA640] border border-white/10">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Practice Deployment Scope &amp; Commercial Terms
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#DAA640] bg-[#DAA640]/10 px-2.5 py-0.5 rounded-full border border-[#DAA640]/30 w-fit">
              100% Upfront Commercial Clarity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#141417] border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DAA640]" />
                <span>Sprint-Based Milestone Delivery</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                We work in agile, focused sprints scoped around your firm's intake bottlenecks. Exact milestones and review check-ins are locked transparently during kickoff with zero guesswork.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141417] border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#DAA640]" />
                <span>Practice-Owned Code &amp; DNS</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                You retain 100% ownership of your domain, codebase, and client records. Hosting is configured under direct automated billing with zero agency lock-in.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141417] border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#DAA640]" />
                <span>Clear Upfront Scope</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Intake flows, calendar synchronization, and practice search schemas are 100% included in agreed tiers. Any specialized practice management connectors outside agreed specs are quoted clearly in advance.
              </p>
            </div>
          </div>
        </div>

        {/* Homepage subtle link or Standalone Detailed Matrix */}
        {isHomepage ? (
          <div className="pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="font-mono text-[11px] text-[#DAA640]">
              Robust Edge Cloud Infrastructure · Sub-Second Page Speeds
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors font-medium underline underline-offset-4 min-h-[40px]"
            >
              <span>View Full Architecture Comparison Matrix</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DAA640]" />
            </Link>
          </div>
        ) : (
          /* MODERN FLOATING DROPDOWN ARCHITECTURE MATRIX */
          <div className="border-t border-white/10 pt-16 mt-4">
            
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
                <Sliders className="w-3.5 h-3.5 text-[#DAA640]" />
                <span>Interactive Technical Architecture Matrix</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 font-sans tracking-tight">
                Technical Deliverables &amp; SLA Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
                Compare mobile speed, client intake triage, two-way diary sync, and managed practice cloud care SLAs across all tiers.
              </p>
            </div>

            {/* FLOATING DROPDOWN & FILTER CONTROL BAR */}
            <div className="sticky top-20 z-30 mb-8 max-w-4xl mx-auto px-2">
              <div className="p-3 rounded-2xl bg-[#0B0B0D] card-depth border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                
                {/* Floating Category Dropdown Menu */}
                <div className="relative w-full sm:w-auto">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full sm:w-auto min-h-[44px] flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-[#141417] border border-white/10 hover:border-[#DAA640]/50 text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-[#DAA640]" />
                      <span className="text-zinc-400 font-normal">Domain:</span>
                      <span className="text-[#DAA640]">
                        {activeCategoryFilter === "all" 
                          ? "All Operational Domains (4)" 
                          : comparisonCategories.find(c => c.id === activeCategoryFilter)?.category}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#DAA640]" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-full sm:w-72 bg-[#0B0B0D] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 space-y-1"
                      >
                        <button
                          onClick={() => handleSelectDomainFilter("all")}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer min-h-[38px] ${
                            activeCategoryFilter === "all" ? "bg-[#DAA640] text-black" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>All Operational Domains</span>
                          <span className="font-mono text-[10px]">4</span>
                        </button>
                        {comparisonCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleSelectDomainFilter(cat.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer min-h-[38px] ${
                              activeCategoryFilter === cat.id ? "bg-[#DAA640] text-black" : "text-zinc-300 hover:bg-white/5 hover:text-white"
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

                {/* Tier Focus Pills & Expand Control */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <div className="flex items-center p-1 rounded-xl bg-[#141417] border border-white/10">
                    <button
                      onClick={() => setActiveTierFocus("all")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer min-h-[32px] ${
                        activeTierFocus === "all" ? "bg-[#DAA640] text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      All Tiers
                    </button>
                    <button
                      onClick={() => setActiveTierFocus("essential")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer min-h-[32px] ${
                        activeTierFocus === "essential" ? "bg-[#DAA640] text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Practice Core
                    </button>
                    <button
                      onClick={() => setActiveTierFocus("pro")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer min-h-[32px] ${
                        activeTierFocus === "pro" ? "bg-[#DAA640] text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Growth OS
                    </button>
                    <button
                      onClick={() => setActiveTierFocus("custom")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer min-h-[32px] ${
                        activeTierFocus === "custom" ? "bg-[#DAA640] text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Institutional
                    </button>
                  </div>

                  {/* Expand / Collapse All */}
                  <button
                    onClick={toggleAllCategories}
                    className="p-2 rounded-xl bg-[#141417] text-zinc-400 hover:text-[#DAA640] border border-white/10 transition-colors hidden lg:inline-flex min-h-[38px] min-w-[38px] items-center justify-center"
                    title="Toggle Expand All"
                  >
                    <Layers className="w-4 h-4" />
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
                    className="rounded-2xl border border-white/10 bg-[#0B0B0D] shadow-xl overflow-hidden transition-all hover:border-[#DAA640]/35"
                  >
                    {/* Floating Accordion Header Bar */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full p-4 sm:p-6 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-[#141417] border border-white/10 text-[#DAA640] shrink-0 shadow-md">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                              {cat.category}
                            </h4>
                            <span className="hidden sm:inline-block font-mono text-[9px] text-[#DAA640] bg-[#DAA640]/10 px-2 py-0.5 rounded border border-[#DAA640]/25 uppercase font-bold">
                              {cat.badge}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-zinc-400 max-w-xl">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                          {isOpen ? "Collapse" : "Expand Specs"}
                        </span>
                        <div className={`p-1.5 sm:p-2 rounded-full border border-white/10 bg-[#141417] text-zinc-300 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#DAA640]" : ""}`}>
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
                          className="border-t border-white/10 px-4 sm:px-6 py-4 space-y-4"
                        >
                          {cat.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#141417] border border-white/10 hover:border-white/20 transition-all space-y-3"
                            >
                              {/* Capability Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
                                  <h5 className="font-bold text-xs sm:text-sm text-white">
                                    {item.name}
                                  </h5>
                                </div>
                                {item.detail && (
                                  <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                                    {item.detail}
                                  </span>
                                )}
                              </div>

                              {/* 3 Interactive Spec Cards */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                
                                {/* 1. Practice Core */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "essential" || activeTierFocus === "all"
                                      ? "bg-[#0B0B0D] border-white/10 text-zinc-200"
                                      : "bg-[#050505] border-white/5 opacity-40 text-zinc-600"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold mb-1">
                                    Practice Core (£595)
                                  </div>
                                  <div className="text-xs font-semibold">
                                    {item.essential}
                                  </div>
                                </div>

                                {/* 2. Practice Growth OS (Featured) */}
                                <div
                                  className={`p-3 rounded-xl border relative transition-all ${
                                    activeTierFocus === "pro" || activeTierFocus === "all"
                                      ? "bg-[#DAA640]/10 border-[#DAA640]/50 shadow-md text-white"
                                      : "bg-[#050505] border-white/5 opacity-40 text-zinc-600"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-mono text-[#DAA640] uppercase font-bold">
                                      Practice Growth OS (£1,495)
                                    </span>
                                    <span className="text-[8px] font-mono text-black bg-[#DAA640] px-1.5 rounded font-bold">
                                      RECOMMENDED
                                    </span>
                                  </div>
                                  <div className="text-xs font-bold text-white">
                                    {item.pro}
                                  </div>
                                </div>

                                {/* 3. Institutional Practice Engine */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "custom" || activeTierFocus === "all"
                                      ? "bg-[#0B0B0D] border-white/10 text-zinc-200"
                                      : "bg-[#050505] border-white/5 opacity-40 text-zinc-600"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold mb-1">
                                    Institutional Engine (£4,995–£7,495)
                                  </div>
                                  <div className="text-xs font-semibold text-zinc-300">
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
                  <span>Book a call</span>
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
