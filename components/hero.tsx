"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MessageSquare, Zap } from "lucide-react"
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
          {/* Primary WhatsApp CTA */}
          <a
            href={data.primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] rounded-lg transition-all duration-200 shadow-lg shadow-black/40 text-center"
          >
            <MessageSquare size={18} className="shrink-0" />
            <span>{data.primaryCtaText}</span>
          </a>

          {/* Secondary Book Call CTA */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold border-slate-800 bg-[#111115] text-slate-200 hover:bg-[#18181F] hover:text-white rounded-lg text-center"
          >
            <Link href={data.secondaryCtaHref} className="flex items-center justify-center gap-2">
              <span>{data.secondaryCtaText}</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>

        {/* Live Product Visual: Interactive Order & WhatsApp Alert Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-full max-w-3xl mb-12 rounded-xl border border-slate-800/80 bg-[#111115]/90 p-4 sm:p-6 backdrop-blur-md shadow-2xl text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2E8B77]/15 border border-[#2E8B77]/30 flex items-center justify-center text-[#34A88E] font-bold text-sm">
                <Zap size={16} />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-white leading-tight">Mercian Order & WhatsApp Dispatch Engine</h2>
                <p className="text-[10px] text-[#34A88E] font-mono">Instant Mobile Sync · Sub-1s Webhooks</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#34A88E] bg-[#2E8B77]/10 border border-[#2E8B77]/30 px-2 py-0.5 rounded font-semibold">● 24/7 ACTIVE</span>
          </div>

          <div className="space-y-3 font-sans text-xs sm:text-sm">
            {/* Customer Storefront Order */}
            <div className="p-3.5 rounded-lg bg-[#18181F] border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-400 uppercase text-[10px] font-bold">New Customer Order (Storefront)</span>
                <span className="font-mono text-[10px] text-[#DCAE53] font-bold">3-TAP CHECKOUT</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="font-bold text-white text-sm">Bespoke 3-Tier Celebration Cake</p>
                  <p className="text-xs text-slate-400">Pistachio & Raspberry · Event Date: Sat 24 Oct · Notes: Gluten-Free Tier</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-white text-sm">£185.00</span>
                  <p className="font-mono text-[11px] text-[#34A88E] font-semibold">£50 Deposit Paid (Apple Pay)</p>
                </div>
              </div>
            </div>

            {/* Instant Automated WhatsApp Notification */}
            <div className="p-3.5 rounded-lg bg-[#2E8B77]/10 border border-[#2E8B77]/30 space-y-1.5 text-slate-200">
              <div className="flex items-center justify-between text-[#34A88E] font-mono text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={13} />
                  <span>WHATSAPP DISPATCH TO KITCHEN / TEAM</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">0.4s Latency</span>
              </div>
              <p className="text-xs font-sans text-slate-300">
                &quot;✨ New Order Confirmed! Sophie Taylor reserved 24 Oct for 3-Tier Cake. £50 deposit captured. Contact: +44 7700 900123.&quot;
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
