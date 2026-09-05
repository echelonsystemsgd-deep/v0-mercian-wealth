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
    category: "Custom Web Architecture & UI/UX",
    icon: Globe,
    badge: "Sub-Second Load",
    description: "Bespoke digital design, mobile storefront flow, search discoverability, and upfront payment capture.",
    items: [
      { name: "Mobile Page Speed", detail: "Optimized Next.js code and global edge CDN delivering sub-second first contentful paint", essential: "< 900ms Load Speed", pro: "< 500ms Edge Render", custom: "< 350ms Dedicated Cluster", highlight: true },
      { name: "Bespoke Brand Design", detail: "Custom designed layouts tailored to your business, with zero generic templates", essential: "Bespoke Storefront", pro: "Full Atelier Custom Design", custom: "Multi-Brand Web Architecture" },
      { name: "Search & AEO Discoverability", detail: "Semantic schema markup and answer engine optimization so local search engines recommend you", essential: "Standard Local Schema", pro: "Advanced FAQ & AEO Schema", custom: "Multi-Location Regional Graph" },
      { name: "Instant Deposit / Card Capture", detail: "Direct Stripe / Apple Pay checkout for instant customer commitment and deposits", essential: "✓ Standard Checkout", pro: "✓ Dynamic 3-Tap Deposit Lock", custom: "✓ Bespoke Multi-Currency Portal" },
    ]
  },
  {
    id: "booking",
    category: "Booking Flow & Instant Alerts",
    icon: Navigation,
    badge: "< 60s Handoff",
    description: "Frictionless customer booking interfaces, instant WhatsApp team notifications, and calendar sync.",
    items: [
      { name: "3-Tap Customer Flow", detail: "Frictionless booking or order builder so customers confirm without bouncing", essential: "Single-Page Intake", pro: "✓ 3-Tap Mobile Order Builder", custom: "✓ Bespoke Consultation Setter", highlight: true },
      { name: "Instant Smartphone WhatsApp Alerts", detail: "Instant job and booking notification with customer details sent to owner's phone", essential: "✓ Sub-second Phone Alert", pro: "✓ Sub-second Alert + WhatsApp Link", custom: "✓ Dedicated Control Panel" },
      { name: "Customer Confirmation & Receipt", detail: "Automated booking confirmation and payment receipt delivered in under 60 seconds", essential: "Standard Email Receipt", pro: "✓ SMS + WhatsApp Confirmation", custom: "✓ Branded Client Portal" },
      { name: "CRM & Calendar Two-Way Sync", detail: "Immediate diary booking with zero manual coordination required", essential: "Google / Outlook Sync", pro: "✓ CRM / Booking System Sync", custom: "✓ Custom Database Auto-Sync" },
    ]
  },
  {
    id: "growth",
    category: "Conversion & Review Engine",
    icon: Zap,
    badge: "Zero Leaked Leads",
    description: "Automated Google review collection, abandoned enquiry recovery, and conversion optimization.",
    items: [
      { name: "Automated Review Extraction", detail: "Post-service automated review request via WhatsApp/SMS to scale 5-star Google ratings", essential: "—", pro: "✓ Automated Google Review Flow", custom: "✓ Multi-Platform Review Engine", highlight: true },
      { name: "Abandoned Enquiry Recovery", detail: "Automated follow-up sequence re-engaging visitors who started booking but didn't finish", essential: "—", pro: "✓ 3-Step Lead Recovery Flow", custom: "✓ Custom Reactivation Campaign" },
      { name: "Speed-To-Lead Customer Handoff", detail: "Instant response system ensuring prospective customers get answers before leaving", essential: "Standard Contact Gateway", pro: "✓ Sub-60s Interactive Intake", custom: "✓ Bespoke Interactive Concierge" },
    ]
  },
  {
    id: "hosting",
    category: "Cloud Infrastructure & Managed Retainer",
    icon: ShieldCheck,
    badge: "99.98% Web SLA",
    description: "High-performance edge cloud hosting, continuous security, speed audits, and monthly content updates.",
    items: [
      { name: "Edge Cloud Infrastructure", detail: "Global edge CDN with automated failover and unlimited bandwidth", essential: "High-Performance Edge CDN", pro: "Dedicated Edge Cluster", custom: "Isolated Multi-Region CDN" },
      { name: "Monthly Conversion Audits", detail: "Regular speed tuning, image compression audits, and conversion rate optimizations", essential: "Bi-Weekly Speed Checks", pro: "✓ Weekly Speed & Conversion Audits", custom: "✓ Real-Time Performance Audits" },
      { name: "Website Uptime SLA", detail: "Contractual guarantee on continuous website availability and checkout performance", essential: "99.9% Uptime", pro: "99.98% Uptime SLA", custom: "99.99% Enterprise Uptime SLA", highlight: true },
      { name: "Content & Menu Updates", detail: "Hands-off support for menu changes, price updates, new photos, and service additions", essential: "Standard Support (<24h)", pro: "Priority Support (<4h)", custom: "Same-Day Direct Hotline" },
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
  const [billingCycle, setBillingCycle] = useState<"oneTime" | "monthly" | "revenueShare">("oneTime")
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

        {/* Billing Switcher Header (3 Tabs: Setup -> Retainer -> Custom/Enterprise) */}
        <div className="flex justify-center mb-8 sm:mb-12 relative z-20">
          <div className="inline-flex items-center justify-center p-1 rounded-xl sm:rounded-full bg-[#111115] border border-[#DCAE53]/25 relative shadow-lg max-w-full">
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("oneTime")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                billingCycle === "oneTime" ? "text-[#09090B] font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {billingCycle === "oneTime" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-lg sm:rounded-full bg-[#DCAE53] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="hidden sm:inline">Implementation Setup</span>
              <span className="sm:hidden">Setup Build</span>
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                billingCycle === "monthly" ? "text-[#09090B] font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-lg sm:rounded-full bg-[#DCAE53] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="hidden sm:inline">Website Care &amp; Growth Retainer</span>
              <span className="sm:hidden">Care Retainer</span>
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("revenueShare")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                billingCycle === "revenueShare" ? "text-[#09090B] font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {billingCycle === "revenueShare" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-lg sm:rounded-full bg-[#DCAE53] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="hidden sm:inline">Custom / Enterprise</span>
              <span className="sm:hidden">Custom</span>
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

                <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between">
                  <CardContent className="p-0 space-y-4 sm:space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider">
                          [ {tier.highlight || `Tier 0${idx + 1}`} ]
                        </span>
                        {tier.featured && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Guaranteed SLA
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed min-h-[36px]">
                        {tier.description}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="py-3 sm:py-4 border-y border-slate-800/80">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                          {tier.price}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {tier.interval}
                        </span>
                      </div>
                      {(tier as any).milestoneBreakdown && (
                        <div className="mt-2 p-2 rounded-lg bg-[#18181F] border border-slate-800 text-[10px] sm:text-[11px] text-slate-300 leading-relaxed flex items-center gap-2 font-mono">
                          <span className="text-[#DCAE53] font-bold shrink-0">⚡</span>
                          <span>{(tier as any).milestoneBreakdown}</span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 sm:space-y-2.5">
                      {tier.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[#DCAE53] text-xs sm:text-sm shrink-0 mt-0.5 font-bold">✦</span>
                          <span className="text-xs text-slate-200 leading-normal font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Tier Action CTA */}
                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-800/80">
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
                        <span>Book a call</span>
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
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Deployment Scope &amp; Commercial Terms
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
                We work in rapid agile sprints. Standard setups aim for <strong className="text-white">5–7 business days</strong> once branding and service details are supplied. Complex multi-location portals take 10–14 days depending on technical scope.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-800/80 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <span>⚡</span>
                <span>Cloud Hosting &amp; Bandwidth</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Monthly retainers include unlimited global bandwidth, edge CDN delivery, and continuous speed optimization. Your site never slows down under high traffic spikes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-800/80 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <span>🛠️</span>
                <span>Additional Scope &amp; Bespoke Features</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Standard booking flows and WhatsApp alert webhooks are 100% included. Additional locations, custom ERP integrations, or specialized database programming outside agreed specifications are quoted clearly in advance.
              </p>
            </div>
          </div>
        </div>

        {/* Homepage subtle link or Standalone Detailed Matrix */}
        {isHomepage ? (
          <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-[#DCAE53]">
              ✦ 99.98% Website Uptime SLA · Sub-Second Page Speeds Guaranteed
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
                Technical Deliverables &amp; SLA Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
                Compare page speed, booking flows, deposit capture, and managed website care SLAs across all tiers.
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
                                
                                {/* 1. Essential Build */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "essential" || activeTierFocus === "all"
                                      ? "bg-[#111115] border-slate-800 text-slate-200"
                                      : "bg-[#09090b] border-slate-900 opacity-40 text-slate-500"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">
                                    Essential Build
                                  </div>
                                  <div className="text-xs font-semibold">
                                    {item.essential}
                                  </div>
                                </div>

                                {/* 2. Growth System (Featured) */}
                                <div
                                  className={`p-3 rounded-xl border relative transition-all ${
                                    activeTierFocus === "pro" || activeTierFocus === "all"
                                      ? "bg-[#DCAE53]/10 border-[#DCAE53]/50 shadow-md text-white"
                                      : "bg-[#09090b] border-slate-900 opacity-40 text-slate-500"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-mono text-[#DCAE53] uppercase font-bold">
                                      Growth System
                                    </span>
                                    <span className="text-[8px] font-mono text-[#09090B] bg-[#DCAE53] px-1.5 rounded font-bold">
                                      RECOMMENDED
                                    </span>
                                  </div>
                                  <div className="text-xs font-bold text-white">
                                    {item.pro}
                                  </div>
                                </div>

                                {/* 3. Flagship Custom */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "custom" || activeTierFocus === "all"
                                      ? "bg-[#111115] border-slate-800 text-slate-200"
                                      : "bg-[#09090b] border-slate-900 opacity-40 text-slate-500"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">
                                    Flagship Custom
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
