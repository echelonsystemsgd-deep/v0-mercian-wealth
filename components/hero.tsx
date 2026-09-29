"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MessageSquare, Zap, Clock, Activity } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SITE_COPY } from "@/lib/site-copy"
import { BrandLogo } from "@/components/brand-logo"

export function Hero() {
  const data = SITE_COPY.homepage.hero

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center pt-36 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-[#050505]">
      {/* Ambient Geometric Bowtie Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] opacity-10 pointer-events-none z-0 rounded-full overflow-hidden blur-[1px]">
        <BrandLogo variant="watermark" fill className="object-cover" priority />
      </div>

      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DAA640]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        
        {/* Eyebrow Outcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-4 sm:mb-5 text-center max-w-full px-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            {/* Geometric bowtie glyph */}
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DAA640]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" />
            </svg>
            <span>{data.eyebrow}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] sm:leading-[1.12] text-balance mb-3 sm:mb-5 max-w-4xl tracking-tight px-1"
        >
          {data.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-xs sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal px-2"
        >
          {data.subheadline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full justify-center min-w-0 max-w-full"
        >
          {/* Primary CTA: Book a call */}
          <Link
            href={data.primaryCtaHref}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold bg-[#DAA640] text-black hover:bg-[#E5B85C] rounded-xl transition-all duration-200 shadow-lg shadow-[#DAA640]/20 text-center cursor-pointer"
          >
            <span>{data.primaryCtaText}</span>
            <ArrowRight size={15} />
          </Link>

          {/* Direct WhatsApp CTA */}
          <a
            href={data.whatsappHref || "https://wa.me/447851055929"}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-medium text-zinc-200 bg-[#141417] border border-white/10 hover:bg-[#1C1C22] hover:text-white rounded-xl transition-all text-center"
          >
            <MessageSquare size={15} className="text-[#DAA640] shrink-0" />
            <span>{data.whatsappCtaText || "Message on WhatsApp"}</span>
          </a>
        </motion.div>

        {/* Above-the-Fold Social Proof Ribbon (Issue 9) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 mb-8 text-xs text-zinc-300 px-2"
        >
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="text-amber-400 tracking-wider">★★★★★</span>
            <span className="text-white font-semibold text-[11px] sm:text-xs">5.0 Client Rating</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <div className="flex items-center gap-1.5 text-zinc-300 text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DAA640] shrink-0" />
            <span>Built For UK Trades &amp; Local Services</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] sm:text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>&gt;£32,400 Direct Deposits Secured</span>
          </div>
        </motion.div>

        {/* 3 Outcomes Explainer Cards (Standardized Semantic Palette & Legible Typography) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8 sm:mb-10 text-left"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2.5 hover:border-[#DAA640]/40 transition-colors shadow-lg card-depth">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-[#141417] text-[#DAA640] border border-white/10">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#DAA640] font-semibold bg-[#DAA640]/10 px-2.5 py-0.5 rounded-full border border-[#DAA640]/30">
                Sub-Second Speed
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight">1. Instant Mobile Storefront</h2>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans">
              Never lose a mobile visitor to slow loading. High-performance storefronts load instantly on 4G/5G and convert phone visitors on arrival.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2.5 hover:border-[#DAA640]/40 transition-colors shadow-lg card-depth">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-[#141417] text-[#DAA640] border border-white/10">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#DAA640] font-semibold bg-[#DAA640]/10 px-2.5 py-0.5 rounded-full border border-[#DAA640]/30">
                Calendar &amp; Stripe
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight">2. Automated Booking &amp; Scoping</h2>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans">
              Qualify project scope, sync live calendar slots, and lock card deposits upfront without late-night back-and-forth messages.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2.5 hover:border-[#DAA640]/40 transition-colors shadow-lg card-depth">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-[#141417] text-[#DAA640] border border-white/10">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#DAA640] font-semibold bg-[#DAA640]/10 px-2.5 py-0.5 rounded-full border border-[#DAA640]/30">
                &lt;5s Alert
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight">3. Instant WhatsApp Alerts &amp; CRM</h2>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans">
              Full customer intake specs, quote request details, and booking confirmations sent straight to your phone via WhatsApp in seconds.
            </p>
          </div>
        </motion.div>

        {/* Live Intake & Telemetry Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-full max-w-3xl mb-10 sm:mb-12 rounded-2xl border border-white/10 bg-[#0B0B0D] p-4 sm:p-6 shadow-2xl text-left"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#DAA640]/15 border border-[#DAA640]/30 flex items-center justify-center text-[#DAA640] font-bold text-xs sm:text-sm">
                <Zap size={15} />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-white leading-tight">Mercian Lead Capture &amp; Booking Terminal</h2>
                <p className="text-[10px] text-emerald-400 font-mono">Instant Response · 24/7/365 Zero Leaks</p>
              </div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">● ACTIVE</span>
          </div>

          <div className="space-y-3 font-sans text-xs sm:text-sm">
            {/* Live Intake Telemetry Block */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#141417] border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-[10px] sm:text-xs">
                <span className="font-mono text-zinc-400 uppercase text-[9px] sm:text-[10px] font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#DAA640]" />
                  <span>Inbound Customer Intake</span>
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#DAA640] font-bold">QUALIFIED IN 45 SECONDS</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <div>
                  <p className="font-bold text-white text-xs sm:text-sm">High-Ticket Client Service Package</p>
                  <p className="text-[11px] sm:text-xs text-zinc-400">Customer: David T. · Requirement: Priority Delivery Window</p>
                </div>
                <div className="text-left sm:text-right mt-1 sm:mt-0">
                  <span className="font-mono font-bold text-white text-xs sm:text-sm">£1,850 Scope</span>
                  <p className="font-mono text-[10px] sm:text-[11px] text-emerald-400 font-semibold">£250 Deposit Secured</p>
                </div>
              </div>
            </div>

            {/* Instant Automated WhatsApp Alert */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1 text-zinc-200">
              <div className="flex items-center justify-between text-emerald-400 font-mono text-[10px] sm:text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={13} />
                  <span>INSTANT SMARTPHONE WHATSAPP ALERT</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-400 font-normal">0.4s Delivery</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-zinc-300">
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
          className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-zinc-300 border-t border-white/10 pt-8 w-full max-w-3xl font-medium"
        >
          {data.trustItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DAA640] shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
