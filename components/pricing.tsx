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
      { name: "Mobile Page Speed", detail: "Optimized Next.js code and global edge CDN delivering sub-second first contentful paint", essential: "High-Performance Edge CDN", pro: "Optimized Edge Render", custom: "Dedicated Edge Cluster", highlight: true },
      { name: "Bespoke Brand Design", detail: "Custom designed layouts tailored to your business, with zero generic templates", essential: "Bespoke Storefront (3 Pages)", pro: "Interactive Order Flow (Up to 7 Pages)", custom: "Multi-Service & Multi-Location Web Architecture" },
      { name: "Search & Structured Schema Discovery", detail: "Technical SEO, rich snippets, and machine-readable Schema.org JSON-LD for Google and search crawlers", essential: "Local SEO & Core Schema.org", pro: "Advanced FAQ & Service Schema", custom: "Multi-Location Regional Entity Graph" },
      { name: "Payment & Deposit Processing", detail: "Direct Stripe / Apple Pay checkout for instant customer commitment and deposits", essential: "✓ Standard Checkout", pro: "✓ Dynamic Deposit & Quote Lock", custom: "✓ Bespoke Checkout Gateway Architecture" },
    ]
  },
  {
    id: "booking",
    category: "Booking Flow & Operational CRM",
    icon: Navigation,
    badge: "Frictionless Flow",
    description: "Frictionless customer booking interfaces, instant smartphone notifications, and back-end CRM sync.",
    items: [
      { name: "Customer Booking Intake", detail: "Mobile-first booking or order builder so customers confirm without bouncing", essential: "Direct Quote Intake", pro: "✓ Interactive Order Builder", custom: "✓ Bespoke Multi-Branch Dispatch", highlight: true },
      { name: "Back-End Calendar Booking", detail: "Automated client scheduling with two-way calendar synchronization and slot rules", essential: "Google / Outlook Sync", pro: "✓ Two-Way Calendar Management", custom: "✓ Multi-Calendar Staff Dispatch" },
      { name: "Back-End CRM System", detail: "Centralized customer pipeline tracking, contact records, and inquiry management", essential: "Lead Notification Inbox", pro: "✓ Centralized Back-End CRM", custom: "✓ Bespoke CRM & Pipeline Automation" },
      { name: "Direct Owner Alerts", detail: "Instant notification with complete customer and job details sent immediately", essential: "✓ Direct Email & Phone Alert", pro: "✓ Instant Mobile & WhatsApp Dispatch", custom: "✓ Dedicated Control Panel & Webhooks" },
    ]
  },
  {
    id: "growth",
    category: "Conversion & Email Automation",
    icon: Zap,
    badge: "Zero Leaked Leads",
    description: "Automated booking confirmations, email sequences, Google review collection, and conversion optimization.",
    items: [
      { name: "Automated Email Sequences", detail: "Automated booking confirmation, receipts, and client pre-appointment instructions", essential: "Standard Confirmation Email", pro: "✓ Multi-Step Email Sequences", custom: "✓ Bespoke Lifecycle Email Journeys", highlight: true },
      { name: "Google Review Generation Engine", detail: "Post-service automated review requests to systematically scale 5-star Google ratings", essential: "—", pro: "✓ Automated Google Review Flow", custom: "✓ Multi-Platform Review Engine" },
      { name: "Dormant Lead Recovery", detail: "Follow-up workflows re-engaging prospective customers who inquired but haven't finalized", essential: "—", pro: "✓ Automated Follow-Up Sequences", custom: "✓ Custom Lead Reactivation Campaigns" },
    ]
  },
  {
    id: "hosting",
    category: "Cloud Infrastructure & Managed Care",
    icon: ShieldCheck,
    badge: "Verified Uptime",
    description: "High-performance edge cloud hosting, search maintenance, ongoing intake optimization, and priority support.",
    items: [
      { name: "Edge Cloud Infrastructure", detail: "Global edge CDN with automated failover, SSL encryption, and high bandwidth", essential: "High-Performance Edge CDN", pro: "Dedicated Edge Cluster", custom: "Isolated Multi-Region CDN" },
      { name: "Monthly SEO & Indexing Audits", detail: "Ongoing ranking checks, Search Console health audits, and structured schema updates", essential: "Monthly Discoverability Report", pro: "✓ Active Keyword & Schema Tuning", custom: "✓ Multi-Location Search Architecture" },
      { name: "Booking & Intake Flow Maintenance", detail: "Ongoing health checks and rule refinement for order builders, intake forms, and calendars", essential: "Standard System Checks", pro: "✓ Monthly Booking Flow Optimization", custom: "✓ Continuous Workflow & Intake Tuning", highlight: true },
      { name: "Technical Support Desk", detail: "Hands-off support for service adjustments, pricing changes, and workflow maintenance", essential: "Standard Support Desk", pro: "Priority Engineering Support Desk", custom: "Dedicated WhatsApp / Slack Channel" },
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

        {/* Engineered Scope & Skin in the Game Framing Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 text-center space-y-1.5 shadow-xl">
          <span className="text-[10px] font-mono text-[#DAA640] uppercase tracking-widest font-bold block">
            ENGINEERED SCOPE · TRANSPARENT COMMERCIAL TERMS
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            We do not build generic template sites, and we do not sell one-size-fits-all price tags. Every Mercian Wealth build is custom-engineered to your booking logic and customer volume. We scope fixed milestones on our discovery call — or, if you qualify, our <strong className="text-emerald-400">Revenue Share partnership (5%–10%)</strong> ties compensation strictly to digital orders and deposits processed through your online checkout gateway.
          </p>
        </div>

        {/* Billing Switcher Header (3 Tabs: System Build -> Revenue Share -> Growth Retainer) */}
        <div className="flex justify-center mb-8 sm:mb-12 relative z-20 px-2">
          <div className="inline-flex items-center justify-center p-1 rounded-xl sm:rounded-full bg-[#0B0B0D] border border-white/10 relative shadow-lg max-w-full overflow-x-auto scrollbar-none">
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("oneTime")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer min-h-[40px] shrink-0 ${
                billingCycle === "oneTime" ? "text-black font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {billingCycle === "oneTime" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-lg sm:rounded-full bg-[#DAA640] z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="hidden sm:inline">System Build (One-Time)</span>
              <span className="sm:hidden">System Build</span>
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("revenueShare")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer min-h-[40px] shrink-0 ${
                billingCycle === "revenueShare" ? "text-black font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {billingCycle === "revenueShare" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-lg sm:rounded-full bg-[#DAA640] z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="hidden sm:inline">Revenue Share (5%–10%)</span>
              <span className="sm:hidden">Rev Share</span>
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer min-h-[40px] shrink-0 ${
                billingCycle === "monthly" ? "text-black font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="pricingBillingBg"
                  className="absolute inset-0 rounded-lg sm:rounded-full bg-[#DAA640] z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="hidden sm:inline">Growth Retainer (Monthly)</span>
              <span className="sm:hidden">Retainer</span>
            </button>
          </div>
        </div>

        {/* Revenue Share Digital Gateway Attribution Callout */}
        {billingCycle === "revenueShare" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1 shadow-lg"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Digital Gateway Attribution Guarantee</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Revenue share applies strictly to customer deposits, orders, and booking fees processed directly through your website checkout. In-store, telephone, and cash transactions are 100% yours and never tracked.
            </p>
          </motion.div>
        )}

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
                    ? "bg-[#0B0B0D] border-[#DAA640] shadow-2xl shadow-[#DAA640]/10 lg:-translate-y-2 z-10"
                    : "bg-[#0B0B0D] border-white/10 hover:border-white/20 shadow-xl"
                }`}
              >
                {tier.featured && (
                  <div className="bg-[#DAA640] text-black py-1.5 px-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most High-Growth UK Operations</span>
                  </div>
                )}

                <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between">
                  <CardContent className="p-0 space-y-4 sm:space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider">
                          {tier.highlight || `Tier 0${idx + 1}`}
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
                      <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed min-h-[36px]">
                        {tier.description}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="py-3 sm:py-4 border-y border-white/10">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`text-xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                          billingCycle === 'revenueShare' ? 'text-emerald-400' : 'text-white'
                        }`}>
                          {billingCycle === 'revenueShare' 
                            ? tier.price 
                            : tier.price.startsWith('£') 
                            ? tier.price 
                            : `£${tier.price}`}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {billingCycle === 'monthly' ? '/month' : tier.interval}
                        </span>
                      </div>
                      {(tier as any).milestoneBreakdown && (
                        <div className="mt-2 p-2 rounded-lg bg-[#141417] border border-white/10 text-[10px] sm:text-[11px] text-zinc-300 leading-relaxed flex items-center gap-2 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0" />
                          <span>{(tier as any).milestoneBreakdown}</span>
                        </div>
                      )}
                      {(tier as any).domainHostingNote && (
                        <div className="mt-2.5 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[10px] sm:text-[11px] text-zinc-300 leading-relaxed flex items-start gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{(tier as any).domainHostingNote}</span>
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
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Scope Option for Active Tab */}
        {(() => {
          const customScope = (SITE_COPY.pricingPage as any).customScopeTiers?.[billingCycle]
          if (!customScope) return null
          return (
            <motion.div
              key={`custom-scope-${billingCycle}`}
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
                      {customScope.tag || "Custom Scope"}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {customScope.interval}
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
                Deployment Scope &amp; Commercial Terms
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
                We work in agile, focused sprints scoped around your operational bottlenecks. Exact milestones and review check-ins are locked transparently during kickoff with zero guesswork.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141417] border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#DAA640]" />
                <span>Client-Owned Hosting &amp; Domain</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                You retain 100% ownership of your domain, codebase, and customer database. Hosting is configured directly under your own accounts with zero platform lock-in.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141417] border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#DAA640]" />
                <span>Clear Upfront Scope</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Booking flows, CRM pipelines, payment integration, and AI search schemas are 100% included in agreed tiers. Any specialized third-party ERP connectors outside agreed specs are quoted clearly in advance.
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
          /* MODERN FLOATING DROPDOWN ARCHITECTURE MATRIX (No Static Rigid Table) */
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
                Compare page speed, booking flows, deposit capture, and managed website care SLAs across all tiers.
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
                      Essential
                    </button>
                    <button
                      onClick={() => setActiveTierFocus("pro")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer min-h-[32px] ${
                        activeTierFocus === "pro" ? "bg-[#DAA640] text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Pro
                    </button>
                    <button
                      onClick={() => setActiveTierFocus("custom")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer min-h-[32px] ${
                        activeTierFocus === "custom" ? "bg-[#DAA640] text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Custom
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
                                
                                {/* 1. Essential Build */}
                                <div
                                  className={`p-3 rounded-xl border transition-all ${
                                    activeTierFocus === "essential" || activeTierFocus === "all"
                                      ? "bg-[#0B0B0D] border-white/10 text-zinc-200"
                                      : "bg-[#050505] border-white/5 opacity-40 text-zinc-600"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold mb-1">
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
                                      ? "bg-[#DAA640]/10 border-[#DAA640]/50 shadow-md text-white"
                                      : "bg-[#050505] border-white/5 opacity-40 text-zinc-600"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-mono text-[#DAA640] uppercase font-bold">
                                      Growth System
                                    </span>
                                    <span className="text-[8px] font-mono text-black bg-[#DAA640] px-1.5 rounded font-bold">
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
                                      ? "bg-[#0B0B0D] border-white/10 text-zinc-200"
                                      : "bg-[#050505] border-white/5 opacity-40 text-zinc-600"
                                  }`}
                                >
                                  <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold mb-1">
                                    Flagship Custom
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
