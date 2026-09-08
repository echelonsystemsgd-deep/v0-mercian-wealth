"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle2, ShieldCheck, Clock, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { SITE_COPY } from "@/lib/site-copy"
import { SectionDivider } from "@/components/section-divider"

export function ProofCaseStudies() {
  const data = SITE_COPY.homepage.caseStudies

  return (
    <section id="proof-cases" className="relative py-16 sm:py-24 bg-[#09090B] overflow-hidden">
      {/* Chapter Marker */}
      <SectionDivider chapter="V" title="VERIFIED PROOF" />

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10 text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
            <span>[ {data.eyebrow} ]</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance mb-4">
            {data.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {data.subheadline}
          </p>
        </motion.div>

        {/* 2 Case Studies Side By Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto text-left">
          
          {/* Case Study 1: Apex Commercial & Trade Services */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111115] border border-slate-800 hover:border-[#DCAE53]/40 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                  ● VERIFIED PRODUCTION METRICS
                </span>
                <span className="text-xs font-mono text-slate-400">Case Study 01</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                Apex Commercial &amp; Trade Services — 24/7 AI Receptionist
              </h3>

              {/* Bold Outcomes Block */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#18181F] border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Time Saved</span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-[#DCAE53]">
                    14 hrs/wk
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Revenue Recovered</span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-400">
                    +£48,000/yr
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  <strong className="text-white">Problem:</strong> Director and senior engineers missed 6+ inbound commercial calls weekly while on job sites. Prospective clients didn&apos;t leave voicemails—they called competitors immediately.
                </p>
                <p>
                  <strong className="text-white">Outcome:</strong> Installed a 24/7 AI Voice Receptionist that answers on ring one, qualifies project scope, books consultation slots directly into Google Calendar, and pings the director&apos;s phone via WhatsApp in 2 seconds.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <a
                href="#voice-demo"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DCAE53] hover:text-[#E5B85C] transition-colors"
              >
                <span>Listen to Live Voice Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[10px] font-mono text-slate-500">Live Client Deployment</span>
            </div>
          </motion.div>

          {/* Case Study 2: Aura Private Aesthetics */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111115] border border-slate-800 hover:border-[#DCAE53]/40 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/25 px-2.5 py-1 rounded-full font-bold">
                  ● VERIFIED PRODUCTION METRICS
                </span>
                <span className="text-xs font-mono text-slate-400">Case Study 02</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                Aura Private Clinic — 24/7 Chatbot &amp; Lead Reactivation
              </h3>

              {/* Bold Outcomes Block */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#18181F] border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Show Rate Lift</span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-400">
                    92% Attendance
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Enquiries Converted</span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-[#DCAE53]">
                    Zero DM Leaks
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  <strong className="text-white">Problem:</strong> Over 40% of consultation enquiries arrived between 7 PM and 11 PM via web chat and social media, going cold overnight before staff arrived next morning.
                </p>
                <p>
                  <strong className="text-white">Outcome:</strong> Deployed a 24/7 conversational triage chatbot that answers treatment FAQs, qualifies patient suitability, secures consultation deposits via Stripe, and triggers automated follow-up callbacks.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href="/services#chatbots"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DCAE53] hover:text-[#E5B85C] transition-colors"
              >
                <span>Inspect Chatbot Specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] font-mono text-slate-500">Live Client Deployment</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
