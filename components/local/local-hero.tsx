"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Smartphone, Sparkles, CheckCircle2, ShoppingBag } from "lucide-react"

export function LocalHero() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("mercian_audience", "local")
      }
    } catch {}
  }, [])

  return (
    <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#09090B]">
      {/* Background Radial Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center 30%, rgba(220, 174, 83, 0.12) 0%, rgba(9, 9, 11, 0) 75%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        {/* Local Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-slate-800 text-xs sm:text-sm font-mono font-bold text-[#DCAE53] uppercase tracking-wider mb-6 shadow-md"
        >
          <Sparkles size={14} className="text-[#DCAE53] animate-pulse" />
          <span>Local Business Growth & Ordering Engine — Berkshire & Across UK</span>
        </motion.div>

        {/* Plain Conversational Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-6 max-w-4xl"
        >
          Stop Losing Orders & Bookings in DM Messages. We Build <span className="text-[#DCAE53]">Automated Local Engines.</span>
        </motion.h1>

        {/* Subheadline - Plain English */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8"
        >
          For premier local businesses, consultancies, and bespoke service operators across Berkshire and the UK. Customers book in 3 taps, pay upfront deposits, and send WhatsApp alerts straight to your pocket.
        </motion.p>

        {/* Trust Points */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-xs sm:text-sm text-text-secondary"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-accent-gold" />
            <span>Sub-1-Second Mobile Storefront</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-accent-gold" />
            <span>Instant WhatsApp & SMS Order Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-accent-gold" />
            <span>Automated 5-Star Google Reviews</span>
          </div>
        </motion.div>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#field-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm bg-accent-gold text-black hover:bg-amber-300 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-200 cursor-pointer"
          >
            <Smartphone size={18} />
            <span>Test Interactive Mobile Demo</span>
          </Link>
          <Link
            href="#contact-local"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm bg-white/5 border border-accent-gold/30 hover:border-accent-gold/60 text-white hover:bg-accent-gold/10 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag size={18} className="text-accent-gold" />
            <span>Get Your Local Growth Package</span>
            <ArrowRight size={16} className="text-accent-gold" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
