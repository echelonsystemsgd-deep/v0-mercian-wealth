"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, Loader2, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { SITE_COPY } from "@/lib/site-copy"

type PortfolioItem = {
  title: string
  category: string
  gradient: string
  href?: string | null
  image?: string | null
  underConstruction: boolean
  metric?: string | null
}

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    title: "Example Build: Architectural Construction & House Extensions",
    category: "High-Ticket Client Intake & Quote Engine · Live Sandbox",
    gradient: "from-amber-500/20 to-yellow-600/20",
    href: "https://premium-local-construction-business.vercel.app/",
    image: "/vanguard-construction-preview.png",
    underConstruction: false,
    metric: "Instant Sub-Second Project Quote Engine",
  },
  {
    title: "Example Build: Cellular Longevity & Precision Nutrition Storefront",
    category: "Luxury E-Commerce & Subscriptions · Live Sandbox",
    gradient: "from-emerald-500/20 to-teal-500/20",
    href: "https://premium-supplement-commerce.vercel.app/",
    image: "/aurelia-supplement-preview.png",
    underConstruction: false,
    metric: "Duodenal Delivery & Automated Subscriptions",
  },
  {
    title: "Example Build: Commercial & Residential Roofing Systems",
    category: "Rapid Dispatch & Quote Engine · Live Sandbox",
    gradient: "from-blue-500/20 to-indigo-500/20",
    href: "https://home-solutions-roofing.vercel.app/",
    image: null,
    underConstruction: false,
    metric: "Emergency Repair Dispatch & Quote Locks",
  },
  {
    title: "Example Build: Bespoke Extensions & Structural Renovations",
    category: "Contractor Intake & Estimator · Live Sandbox",
    gradient: "from-amber-500/20 to-orange-500/20",
    href: "https://me-building-services.vercel.app/",
    image: null,
    underConstruction: false,
    metric: "Turnkey Scope Estimator & Milestone Billing",
  },
  {
    title: "Example Build: Owner-Led Prime Residential Contracting",
    category: "High-Value Project Intake · Live Sandbox",
    gradient: "from-slate-500/20 to-zinc-500/20",
    href: "https://berkshireheathrow.vercel.app/",
    image: null,
    underConstruction: false,
    metric: "Principal Oversight & Zero Subcontractor Markup",
  },
  {
    title: "Example Build: High-Performance Lifestyle & Dual-System Flagship",
    category: "Digital Partner Pathways & Commerce · Live Sandbox",
    gradient: "from-cyan-500/20 to-blue-500/20",
    href: "https://vyra-dual-system-flagship.vercel.app/",
    image: null,
    underConstruction: false,
    metric: "Dual-Engine Commerce & Partner Onboarding",
  },
  {
    title: "Example Build: Private Healthcare & Dental Consultation Booking",
    category: "Patient Triage & Appointment Scheduling · Live Sandbox",
    gradient: "from-teal-500/20 to-emerald-500/20",
    href: "https://dental-clinic-prototype.vercel.app/",
    image: null,
    underConstruction: false,
    metric: "24/7 Conversational Triage & Slot Booking",
  },
  {
    title: "Stamp & Collectibles AI Valuation Engine",
    category: "AI Computer Vision & Appraisal · Under Development",
    gradient: "from-purple-500/20 to-violet-500/20",
    href: null,
    image: "/stamp-app-preview.png",
    underConstruction: true,
    metric: "Target Latency: < 1s · AI Neural Appraisal",
  },
]

function PremiumMockup({ item }: { item: PortfolioItem }) {
  if (item.title.includes("Roofing") || item.title.includes("Roof")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#071426] rounded-xl border border-blue-500/40 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#0c1f38] border-b border-blue-500/25 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#050f1d] border border-blue-500/30 rounded-full px-3 text-[7px] text-blue-300 flex items-center justify-center font-mono">
            home-solutions-roofing.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#091e38] to-[#040c17]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-tight text-white font-serif uppercase">ROOFING &amp; DISPATCH</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-blue-300 bg-blue-500/15 border border-blue-500/30 px-1.5 py-0.5 rounded-full">SURREY &amp; WEYBRIDGE</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ Guild Certified</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white leading-tight">Professional Roofing &amp; Emergency Repair Triage</h4>
            <p className="text-[7px] text-slate-300 leading-relaxed max-w-[90%]">Rapid-response quote dispatch, drone roof surveys, insurance claim exports, and instant deposit locks.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#0e274a] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Dispatch</span>
              <span className="text-[8px] font-serif font-bold text-blue-300">&lt;45 Mins</span>
            </div>
            <div className="bg-[#0e274a] border border-blue-500/40 rounded p-1 text-center bg-blue-500/10">
              <span className="text-[6px] text-blue-300 block font-mono font-bold">Warranty</span>
              <span className="text-[8px] font-serif font-bold text-white">25-Yr Guild</span>
            </div>
            <div className="bg-[#0e274a] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Insurance</span>
              <span className="text-[8px] font-serif font-bold text-blue-300">£10M All-Risk</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.title.includes("Bespoke Extensions") || item.title.includes("Structural Renovations")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#14100c] rounded-xl border border-amber-500/40 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#211a14] border-b border-amber-500/25 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#0d0a08] border border-amber-500/30 rounded-full px-3 text-[7px] text-amber-300 flex items-center justify-center font-mono">
            me-building-services.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#211a14] to-[#0c0907]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-tight text-white font-serif uppercase">STRUCTURAL EXTENSIONS</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-full">SURREY &amp; LONDON</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ Master Builder</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white leading-tight">Turnkey House Extensions &amp; Loft Conversions</h4>
            <p className="text-[7px] text-slate-300 leading-relaxed max-w-[90%]">Sub-second project scope breakdown, milestone-based escrow deposit billing, and real-time site updates.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#291f17] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Scope Intake</span>
              <span className="text-[8px] font-serif font-bold text-amber-300">Instant BOQ</span>
            </div>
            <div className="bg-[#291f17] border border-amber-500/40 rounded p-1 text-center bg-amber-500/10">
              <span className="text-[6px] text-amber-300 block font-mono font-bold">Milestones</span>
              <span className="text-[8px] font-serif font-bold text-white">Escrow Lock</span>
            </div>
            <div className="bg-[#291f17] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Contract</span>
              <span className="text-[8px] font-serif font-bold text-amber-300">Fixed Lump-Sum</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.title.includes("Owner-Led") || item.title.includes("Prime Residential")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#0a101d] rounded-xl border border-slate-500/40 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#121c30] border-b border-slate-500/25 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#070b14] border border-slate-500/30 rounded-full px-3 text-[7px] text-slate-300 flex items-center justify-center font-mono">
            berkshireheathrow.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#121c30] to-[#070b14]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-tight text-white font-serif uppercase">OWNER-LED PRIME BUILDS</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-slate-300 bg-slate-500/15 border border-slate-500/30 px-1.5 py-0.5 rounded-full">BERKSHIRE &amp; BUCKS</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ Principal Oversight</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white leading-tight">High-Specification Architectural Residences</h4>
            <p className="text-[7px] text-slate-300 leading-relaxed max-w-[90%]">Direct founder-led construction intake with zero subcontractor layers, transparent bill-of-quantities, and weekly client video walk-throughs.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#172540] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Supervision</span>
              <span className="text-[8px] font-serif font-bold text-slate-200">Founder-Led</span>
            </div>
            <div className="bg-[#172540] border border-slate-500/40 rounded p-1 text-center bg-slate-500/10">
              <span className="text-[6px] text-slate-300 block font-mono font-bold">Tenders</span>
              <span className="text-[8px] font-serif font-bold text-white">Transparent BOQ</span>
            </div>
            <div className="bg-[#172540] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Capacity</span>
              <span className="text-[8px] font-serif font-bold text-slate-200">3 Builds / Yr</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.title.includes("Lifestyle") || item.title.includes("Dual-System") || item.title.includes("Flagship")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#080811] rounded-xl border border-cyan-500/40 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#101026] border-b border-cyan-500/25 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#05050d] border border-cyan-500/30 rounded-full px-3 text-[7px] text-cyan-300 flex items-center justify-center font-mono">
            vyra-dual-system-flagship.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#101026] to-[#05050d]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-tight text-white font-serif uppercase">BIOMECHANICAL PERFORMANCE</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-1.5 py-0.5 rounded-full">DUAL-SYSTEM FLAGSHIP</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ Clinical Grade</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white leading-tight">Elite Nutrition Systems &amp; Partner Pathways</h4>
            <p className="text-[7px] text-slate-300 leading-relaxed max-w-[90%]">Dual-engine digital commerce uniting clinical bio-optimization supplements with automated partner affiliate funnels and commission tracking.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#171738] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Purity</span>
              <span className="text-[8px] font-serif font-bold text-cyan-300">Clinical Grade</span>
            </div>
            <div className="bg-[#171738] border border-cyan-500/40 rounded p-1 text-center bg-cyan-500/10">
              <span className="text-[6px] text-cyan-300 block font-mono font-bold">Commerce</span>
              <span className="text-[8px] font-serif font-bold text-white">1-Tap Stripe</span>
            </div>
            <div className="bg-[#171738] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Partners</span>
              <span className="text-[8px] font-serif font-bold text-cyan-300">Auto Funnel</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.title.includes("Dental") || item.title.includes("Healthcare") || item.title.includes("Medical")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#06131c] rounded-xl border border-teal-500/40 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#0d2536] border-b border-teal-500/25 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#040d14] border border-teal-500/30 rounded-full px-3 text-[7px] text-teal-300 flex items-center justify-center font-mono">
            dental-clinic-prototype.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#0d2536] to-[#040d14]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-tight text-white font-serif uppercase">PRIVATE MEDICAL &amp; DENTAL</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/15 border border-teal-500/30 px-1.5 py-0.5 rounded-full">SURREY &amp; LONDON</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ CQC Protocols</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white leading-tight">Conversational Patient Intake &amp; Booking</h4>
            <p className="text-[7px] text-slate-300 leading-relaxed max-w-[90%]">24/7 intelligent patient triage chatbot qualifying treatment suitability, estimating clinical timelines, and reserving deposit slots.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#13354d] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Triage</span>
              <span className="text-[8px] font-serif font-bold text-teal-300">24/7 Conversational</span>
            </div>
            <div className="bg-[#13354d] border border-teal-500/40 rounded p-1 text-center bg-teal-500/10">
              <span className="text-[6px] text-teal-300 block font-mono font-bold">Booking</span>
              <span className="text-[8px] font-serif font-bold text-white">Calendar Lock</span>
            </div>
            <div className="bg-[#13354d] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Waitlist</span>
              <span className="text-[8px] font-serif font-bold text-teal-300">Zero Friction</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.title.includes("Architectural") || item.title.includes("Construction") || item.title.includes("Operations")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#050C1A] rounded-xl border border-[#DAA640]/40 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#0A162E] border-b border-[#DAA640]/25 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#020E28] border border-[#DAA640]/30 rounded-full px-3 text-[7px] text-[#DAA640] flex items-center justify-center font-mono">
            premium-local-construction-business.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#07153B] to-[#020E28]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-tight text-white font-serif uppercase">ARCHITECTURAL EXTENSIONS</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-[#DAA640] bg-[#DAA640]/10 border border-[#DAA640]/30 px-1.5 py-0.5 rounded-full">SURREY &amp; LONDON</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ Fixed-Price Guarantee</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white leading-tight">Architectural House Extensions &amp; Loft Conversions</h4>
            <p className="text-[7px] text-slate-300 leading-relaxed max-w-[90%]">Sub-second project quote builder with turnkey delivery, upfront deposit locks &amp; instant WhatsApp notifications.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#0C1D4D] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Project Tiers</span>
              <span className="text-[8px] font-serif font-bold text-[#DAA640]">Fixed-Price</span>
            </div>
            <div className="bg-[#0C1D4D] border border-[#DAA640]/40 rounded p-1 text-center bg-[#DAA640]/10">
              <span className="text-[6px] text-[#DAA640] block font-mono font-bold">Insurance</span>
              <span className="text-[8px] font-serif font-bold text-white">£5M All-Risk</span>
            </div>
            <div className="bg-[#0C1D4D] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Deposit Lock</span>
              <span className="text-[8px] font-serif font-bold text-[#DAA640]">Instant Stripe</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.title.includes("Cellular") || item.title.includes("Aurēlia") || item.title.includes("Aurelia") || item.title.includes("Supplement") || item.title.includes("Longevity")) {
    return (
      <div className="absolute inset-2 sm:inset-4 bg-[#0A0A0C] rounded-xl border border-[#DCAE53]/35 overflow-hidden shadow-2xl flex flex-col font-sans">
        <div className="flex items-center justify-between px-3 py-2 bg-[#121216] border-b border-[#DCAE53]/20 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="h-3.5 bg-[#08080A] border border-[#DCAE53]/30 rounded-full px-3 text-[7px] text-[#DCAE53] flex items-center justify-center font-mono">
            premium-supplement-commerce.vercel.app
          </div>
          <div className="w-4" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#0e0e12] to-[#070709]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium tracking-[0.2em] text-white font-serif uppercase">CELLULAR NUTRITION</span>
              <span className="text-[6px] font-bold uppercase tracking-widest text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/30 px-1.5 py-0.5 rounded-full">PRECISION STOREFRONT</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-emerald-400 font-bold">★ ISO-17025 Verified</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-serif font-normal text-white leading-tight">Precision Cellular Longevity &amp; Nootropics</h4>
            <p className="text-[7px] text-slate-400 leading-relaxed max-w-[92%]">High-converting luxury e-commerce platform with delayed duodenal delivery protocols, liposomal subscription tiers &amp; instant Apple Pay checkout.</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-[#15151b] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Enzymatic Purity</span>
              <span className="text-[8px] font-serif font-bold text-[#DCAE53]">≥99.8% NMN</span>
            </div>
            <div className="bg-[#15151b] border border-[#DCAE53]/30 rounded p-1 text-center bg-[#DCAE53]/5">
              <span className="text-[6px] text-[#DCAE53] block font-mono font-bold">Checkout</span>
              <span className="text-[8px] font-serif font-bold text-white">1-Tap Stripe</span>
            </div>
            <div className="bg-[#15151b] border border-white/5 rounded p-1 text-center">
              <span className="text-[6px] text-slate-400 block font-mono">Subscriptions</span>
              <span className="text-[8px] font-serif font-bold text-[#DCAE53]">Recurring -15%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-4 lg:inset-6 bg-card rounded-xl border border-border overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 border-b border-border">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-accent-gold/20 rounded w-2/3" />
        <div className="h-3 bg-secondary rounded w-full" />
        <div className="h-3 bg-secondary rounded w-4/5" />
      </div>
    </div>
  )
}

function RequestSystemSchemaModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setIsSubmitting(true)
    setErrorMsg(null)

    // Capture UTM tracking parameters from current page URL
    let utmParams: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmKeys.forEach((key) => {
        const val = searchParams.get(key)
        if (val) utmParams[key] = val
      })
    }

    try {
      const res = await fetch('/api/portfolio/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          project_name: item.title,
          referrer: typeof document !== 'undefined' ? document.referrer : 'none',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'none',
          ...utmParams,
        }),
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request. Please try again.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="schema-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        <motion.div
          key="schema-window"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md bg-bg-tertiary border border-primary/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-full p-1.5 cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="relative mx-auto w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-accent-gold mb-6">
            <Lock size={28} />
          </div>

          <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">
            Book A Live Demonstration
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Every system is built to suit the exact workflow of a local business. Rather than browsing generic templates, book a 15-minute call to see a live demonstration tailored to your exact industry.
          </p>

          {errorMsg && (
            <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-lg text-left">
              {errorMsg}
            </div>
          )}

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 px-4 bg-primary/10 border border-primary/20 rounded-xl text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center mx-auto text-accent-gold">
                <svg className="w-6 h-6 animate-bounce text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-bold text-accent-gold">Request Received</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your request for the sanitized blueprints and case study of <strong>{item.title}</strong> has been secured. We will transmit the walkthrough details directly to <strong>{email}</strong> shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3 text-left">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                    {SITE_COPY.portfolioPage.nameLabel} *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-primary/45 focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                    {SITE_COPY.portfolioPage.emailLabel} *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-primary/45 focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-gold text-bg-primary font-bold hover:bg-accent-gold/90 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin text-bg-primary" />
                ) : (
                  <>
                     <span>{SITE_COPY.portfolioPage.submitBtnText}</span>
                     <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-white/5">
            <button
              onClick={onClose}
              className="text-xs text-muted-foreground hover:text-accent-gold transition-colors underline underline-offset-4 cursor-pointer"
            >
              Go Back to Portfolio
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function PrototypePreviewModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [loading, setLoading] = useState(true)

  return (
    <AnimatePresence>
      <motion.div
        key="preview-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        <motion.div
          key="preview-window"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 w-full h-full md:h-[85vh] md:max-w-6xl bg-bg-tertiary md:border md:border-white/10 rounded-none md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-accent-gold font-semibold leading-none mt-0.5">
                  {item.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent-gold hover:underline flex items-center gap-1 mr-2 font-mono"
                >
                  <span>Open External</span>
                  <ArrowRight size={12} />
                </a>
              )}
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-full p-1.5 cursor-pointer"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Prototype Banner & Form Notice */}
          {item.href ? (
            <div className="bg-emerald-950/80 border-b border-emerald-500/30 text-emerald-300 py-2.5 px-4 text-center text-[10px] sm:text-xs font-semibold font-sans flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 tracking-wide">
              <div className="flex items-center gap-1.5 uppercase font-mono font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Interactive Sandbox Prototype</span>
              </div>
              <span className="hidden sm:inline text-emerald-500/60">•</span>
              <span className="text-emerald-200/80 text-[10px] sm:text-xs">
                Feel free to test all interactive tools and forms. Submissions are safely simulated for demo purposes (no live data is dispatched).
              </span>
            </div>
          ) : (
            <div className="bg-[#18181F] border-b border-slate-800 text-slate-300 py-2.5 px-4 text-center text-[10px] sm:text-xs font-semibold font-sans flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 tracking-wide">
              <div className="flex items-center gap-1.5 uppercase font-mono font-bold text-[#DCAE53]">
                <span>Verified Client Architecture · Production Case Study</span>
              </div>
            </div>
          )}

          {/* Interactive Frame or Showcase Box */}
          <div className="flex-1 relative bg-black/40 overflow-hidden">
            {item.href ? (
              <>
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-tertiary z-20 transition-opacity duration-300">
                    <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
                    <p className="text-xs text-muted-foreground font-mono">
                      Loading prototype viewport...
                    </p>
                  </div>
                )}
                <iframe
                  src={item.href}
                  className="w-full h-full border-none bg-white"
                  onLoad={() => setLoading(false)}
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-6">
                {item.image && (
                  <div className="relative w-full max-w-lg aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="max-w-md space-y-2">
                  <h3 className="text-xl font-serif font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{item.category}</p>
                  {item.metric && (
                    <p className="text-xs font-bold text-accent-gold font-mono uppercase">
                      Telemetry: {item.metric}
                    </p>
                  )}
                </div>
                <Button
                  asChild
                  className="bg-[#DCAE53] text-[#09090B] font-bold hover:bg-[#E5B85C]"
                >
                  <Link href="/book">
                    Book a call →
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Portfolio({ limit }: { limit?: number }) {
  const supabase = createClient()
  const [requestSchemaModal, setRequestSchemaModal] = useState<PortfolioItem | null>(null)
  const [previewPrototype, setPreviewPrototype] = useState<PortfolioItem | null>(null)
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO)

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('is_archived', false)
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            title: d.project_name,
            category: d.badge_type || d.industry || (d.under_construction ? 'Architecture Case Study' : 'Interactive Sandbox'),
            gradient: d.gradient || 'from-blue-500/20 to-indigo-500/20',
            href: d.website_link || d.live_demo_url || null,
            image: d.cover_image,
            underConstruction: Boolean(d.under_construction),
            metric: d.metric || d.case_study_metrics || null,
          }))
          setItems(mapped)
        }
      } catch (err: any) {
        console.warn('Live portfolio items unavailable, using built-in showcase assets:', err?.message || err)
      }
    }
    loadPortfolio()
  }, [supabase])

  const displayItems = limit ? items.slice(0, limit) : items

  return (
    <>
      <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden bg-[#09090B] border-t border-slate-800/80">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCAE53] mb-3 font-mono">
              [ SYSTEM IV · WEBSITE CREATIONS ]
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Websites Engineered to Convert Visitors
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Every website we build is crafted for rapid mobile performance, effortless customer bookings, and automated deposit collection.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {displayItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 hover:border-[#DCAE53]/60 transition-all duration-300 bg-[#111115] aspect-[16/10] sm:aspect-[16/10]"
              >
                {/* Visual Image / Mockup background */}
                <div className="w-full h-full relative z-10">
                  {item.image ? (
                    <div className="absolute inset-2 sm:inset-4 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col bg-[#18181F]">
                      <div className="flex items-center justify-between px-3 py-2 bg-[#111115] border-b border-slate-800 shrink-0">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/70" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                          <div className="w-2 h-2 rounded-full bg-green-500/70" />
                        </div>
                        {item.underConstruction && (
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#DCAE53] bg-[#DCAE53]/15 border border-[#DCAE53]/35 px-2 py-0.5 rounded-full">
                            Under Development
                          </span>
                        )}
                      </div>
                      <div className="relative flex-1">
                        <Image
                           src={item.image}
                           alt={item.title}
                           fill
                           className="object-cover object-top"
                           sizes="(max-width: 768px) 100vw, 50vw"
                           priority={index === 0}
                        />
                      </div>
                    </div>
                  ) : (
                    <PremiumMockup item={item} />
                  )}
                </div>

                {/* Hover Reveal Slide-Up Overlay — Desktop only */}
                <div className="absolute inset-0 bg-[#09090B]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden md:flex flex-col justify-center items-center p-8 text-center space-y-4">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <p className="text-xs uppercase tracking-widest text-[#DCAE53] font-semibold">
                        {item.category}
                      </p>
                      {!item.underConstruction && item.href ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#34A88E] bg-[#2E8B77]/10 border border-[#2E8B77]/30 px-2.5 py-0.5 rounded-full font-mono">
                          Live Interactive Sandbox
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/30 px-2.5 py-0.5 rounded-full font-mono">
                          Under Development
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans text-2xl font-extrabold text-white">
                      {item.title}
                    </h3>
                    {item.metric && (
                      <p className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider">
                        Benchmark: {item.metric}
                      </p>
                    )}
                    <div className="pt-2">
                      {!item.underConstruction && item.href ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPreviewPrototype(item)}
                          className="border-[#2E8B77]/40 text-[#34A88E] hover:bg-[#2E8B77] hover:text-[#09090B] transition-all cursor-pointer"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Launch Live Sandbox →
                          </span>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRequestSchemaModal(item)}
                          className="border-[#DCAE53]/40 text-white hover:bg-[#DCAE53] hover:text-[#09090B] transition-all cursor-pointer"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Preview Blueprint →
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom Bar — always visible, hidden on desktop */}
                <div className="absolute bottom-0 left-0 right-0 z-20 flex md:hidden items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#09090B]/90 border-t border-slate-800 backdrop-blur-sm min-w-0 max-w-full">
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-1.5 mb-0.5 min-w-0 flex-wrap">
                      <p className="text-[10px] uppercase tracking-widest text-[#DCAE53] font-semibold leading-none truncate max-w-full">
                        {item.category} {item.metric ? `· ${item.metric}` : ''}
                      </p>
                      {!item.underConstruction && item.href ? (
                        <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-mono">
                          Live Sandbox
                        </span>
                      ) : (
                        <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/30 px-1.5 py-0.5 rounded-full font-mono">
                          Under Development
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans text-xs sm:text-sm font-bold text-white truncate">
                      {item.title}
                    </h3>
                  </div>
                  {!item.underConstruction && item.href ? (
                    <button
                      className="shrink-0 ml-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#09090B] bg-emerald-400 px-3 py-1.5 rounded-lg active:opacity-80 transition-opacity cursor-pointer"
                      onClick={() => setPreviewPrototype(item)}
                    >
                      Test Sandbox →
                    </button>
                  ) : (
                    <button
                      className="shrink-0 ml-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#09090B] bg-[#DCAE53] px-3 py-1.5 rounded-lg active:opacity-80 transition-opacity cursor-pointer"
                      onClick={() => setRequestSchemaModal(item)}
                    >
                      Preview Blueprint →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Button */}
          {limit && (
            <div className="text-center">
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-sm font-bold tracking-wider uppercase bg-[#111115] border-slate-800 text-white hover:border-[#DCAE53]"
              >
                <Link href="/portfolio" className="flex items-center gap-2">
                  View Full Portfolio
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Request System Schema Modal */}
      {requestSchemaModal && (
        <RequestSystemSchemaModal item={requestSchemaModal} onClose={() => setRequestSchemaModal(null)} />
      )}

      {/* Prototype Preview Modal */}
      {previewPrototype && (
        <PrototypePreviewModal item={previewPrototype} onClose={() => setPreviewPrototype(null)} />
      )}
    </>
  )
}
