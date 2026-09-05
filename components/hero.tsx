"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MessageSquare, Zap, PhoneCall, Activity, Volume2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SITE_COPY } from "@/lib/site-copy"
import { BrandLogo } from "@/components/brand-logo"

export function Hero() {
  const data = SITE_COPY.homepage.hero

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden bg-[#09090B]">
      {/* Ambient Geometric Bowtie Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] opacity-10 pointer-events-none z-0 rounded-full overflow-hidden blur-[1px]">
        <BrandLogo variant="watermark" fill className="object-cover" priority />
      </div>

      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        
        {/* Eyebrow & Bold Proof Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-2 mb-5 sm:mb-6 text-center max-w-full px-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            {/* Geometric bowtie glyph */}
            <svg className="w-3.5 h-3.5 text-[#DCAE53]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" />
            </svg>
            <span>{data.eyebrow}</span>
          </div>

          {/* Proof Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full max-w-full text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>{data.proofBadge}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.12] text-balance mb-4 sm:mb-6 max-w-4xl tracking-tight px-1"
        >
          {data.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-sm sm:text-lg md:text-xl text-slate-300 max-w-[780px] leading-relaxed mb-6 sm:mb-8 font-normal px-2"
        >
          {data.subheadline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full justify-center min-w-0 max-w-full"
        >
          {/* Primary CTA: Book a call */}
          <Link
            href={data.primaryCtaHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] rounded-lg transition-all duration-200 shadow-lg shadow-[#DCAE53]/20 text-center cursor-pointer"
          >
            <span>{data.primaryCtaText}</span>
            <ArrowRight size={16} />
          </Link>

          {/* Secondary CTA: Prototype Request Modal */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-prototype-modal"))
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold border border-slate-800 bg-[#111115] text-slate-200 hover:bg-[#18181F] hover:text-white rounded-lg transition-all text-center cursor-pointer"
          >
            <span>{data.secondaryCtaText}</span>
          </button>

          {/* Direct WhatsApp CTA */}
          <a
            href={data.whatsappHref || "https://wa.me/447851055929"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 text-sm sm:text-base font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-lg transition-all text-center"
          >
            <MessageSquare size={16} className="shrink-0" />
            <span>{data.whatsappCtaText || "Message on WhatsApp"}</span>
          </a>
        </motion.div>

        {/* 3 Outcomes Explainer Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 text-left"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-slate-800 space-y-2 hover:border-[#DCAE53]/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-[#18181F] text-[#DCAE53] border border-[#DCAE53]/30">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                &lt; 60 Seconds
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white">1. Sub-60s Inbound Response</h2>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans">
              Never let an enquiry sit cold. Customers are answered and qualified instantly before they bounce to a competitor.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-slate-800 space-y-2 hover:border-[#DCAE53]/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-[#18181F] text-[#DCAE53] border border-[#DCAE53]/30">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#DCAE53] font-bold bg-[#DCAE53]/10 px-2 py-0.5 rounded-full border border-[#DCAE53]/30">
                Stripe / Apple Pay
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white">2. Upfront Deposits &amp; Booking</h2>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans">
              Qualify project scope, confirm live calendar slots, and lock card deposits upfront without evening message tag.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-slate-800 space-y-2 hover:border-[#DCAE53]/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-[#18181F] text-[#DCAE53] border border-[#DCAE53]/30">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                0.4s Alert
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white">3. Direct Smartphone Dispatch</h2>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans">
              Full customer intake specs and booking confirmation sent straight to your phone via WhatsApp in under 2 seconds.
            </p>
          </div>
        </motion.div>

        {/* Live Intake & Telemetry Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-full max-w-3xl mb-12 rounded-xl border border-slate-800/80 bg-[#111115]/90 p-4 sm:p-6 backdrop-blur-md shadow-2xl text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#DCAE53]/15 border border-[#DCAE53]/30 flex items-center justify-center text-[#DCAE53] font-bold text-sm">
                <Zap size={16} />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-white leading-tight">Mercian Rapid Lead Capture &amp; Booking Terminal</h2>
                <p className="text-[10px] text-emerald-400 font-mono">Instant Response · 24/7/365 Zero Leaks</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">● ACTIVE SYSTEM</span>
          </div>

          <div className="space-y-3 font-sans text-xs sm:text-sm">
            {/* Live Intake Telemetry Block */}
            <div className="p-3.5 rounded-lg bg-[#18181F] border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-400 uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#DCAE53]" />
                  <span>Inbound Customer Intake</span>
                </span>
                <span className="font-mono text-[10px] text-[#DCAE53] font-bold">QUALIFIED IN 45 SECONDS</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="font-bold text-white text-sm">High-Ticket Client Service Package</p>
                  <p className="text-xs text-slate-400">Customer: David T. · Requirement: Priority Delivery Window</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-white text-sm">£1,850 Scope</span>
                  <p className="font-mono text-[11px] text-emerald-400 font-semibold">£250 Deposit Secured</p>
                </div>
              </div>
            </div>

            {/* Instant Automated Dispatch Alert */}
            <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 text-slate-200">
              <div className="flex items-center justify-between text-emerald-400 font-mono text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={13} />
                  <span>INSTANT SMARTPHONE WHATSAPP ALERT</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">0.4s Delivery</span>
              </div>
              <p className="text-xs font-sans text-slate-300">
                &quot;⚡ [CONFIRMED BOOKING] New project package confirmed for Saturday. Full intake details logged, deposit paid via Stripe.&quot;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Capability Trust Commitments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-8 w-full max-w-3xl font-medium"
        >
          {data.trustItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DCAE53] shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
