"use client"

import { motion } from "framer-motion"
import { RefreshCw, Landmark, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"
import { BrandLogo } from "@/components/brand-logo"

import { SectionDivider } from "@/components/section-divider"

export function WhyMercianWealth() {
  const data = SITE_COPY.homepage.whyMercianWealth
  const trendData = SITE_COPY.homepage.trendAdaptation
  const modelData = SITE_COPY.homepage.modelHint

  return (
    <section id="architecture" className="relative py-16 sm:py-24 overflow-hidden bg-[#09090B]">
      {/* Chapter Marker */}
      <SectionDivider chapter="VI" title="OPERATOR COMMITMENT" />

      {/* Background Crest Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden max-w-full">
        <div className="relative w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] max-w-full opacity-10">
          <BrandLogo 
            variant="watermark"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Founder Spotlight Banner with Verbatim Outcomes Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 p-5 sm:p-8 rounded-2xl border border-slate-800/90 border-l-4 border-l-[#DCAE53] bg-[#111115] backdrop-blur-md shadow-2xl space-y-6 text-left max-w-5xl mx-auto hover:border-slate-700/80 transition-colors"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#18181F] border border-[#DCAE53]/30 p-2 shrink-0 shadow-lg relative overflow-hidden flex items-center justify-center">
                <BrandLogo 
                  variant="watermark"
                  alt="Mercian Wealth Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base sm:text-lg">Gurtej Gill</span>
                  <span className="text-[10px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-2 py-0.5 rounded border border-[#DCAE53]/30">FOUNDER &amp; ARCHITECT</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">Bespoke Storefronts &amp; Direct Local Systems</p>
              </div>
            </div>

            {/* Live Direct Line Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT LINE ACTIVE · UK TIME</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans text-lg sm:text-2xl font-extrabold text-white leading-tight">
              &quot;We don&apos;t talk about code, agents, or frameworks — that&apos;s our job, not yours.&quot;
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
              Every system is architected, tested, and deployed directly by the founder. No offshore hand-offs, no multi-week agency runarounds, and zero technical jargon. We talk strictly about measurable business outcomes: faster mobile speed-to-lead, upfront Stripe card deposits, and zero missed enquiries when your doors are shut.
            </p>
          </div>

          {/* Satisfaction Protocol & Guarantee Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#DCAE53] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white font-sans">Satisfaction Protocol</p>
                <p className="text-[11px] text-zinc-400 leading-snug">Unlimited revisions until live &amp; 100% satisfied.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-[#DCAE53] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white font-sans">1-Job Payoff Anchor</p>
                <p className="text-[11px] text-zinc-400 leading-snug">Securing just 1 or 2 jobs pays for the entire build.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
              <MessageSquare size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white font-sans">Direct WhatsApp Line</p>
                <p className="text-[11px] text-zinc-400 leading-snug">Direct founder access with &lt;15 min priority response.</p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://wa.me/447851055929?text=Hi%20Gurtej%2C%20I%20saw%20the%20Mercian%20Wealth%20platform%20and%20would%20like%20to%20discuss%20a%20free%20working%20prototype%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <MessageSquare size={15} />
              <span>Message Gurtej on WhatsApp</span>
              <ArrowRight size={14} />
            </a>
            <span className="text-[11px] font-mono text-zinc-500">
              No commitment · Staged in 24–48 hours · 100% bespoke to your brand
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side: Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6 text-left"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#DCAE53]">
              [ WHO IT&apos;S FOR ]
            </span>
            <h2 className="font-sans text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {data.headline}
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              {data.description}
            </p>
          </motion.div>

          {/* Right Side: Differentiators */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 sm:space-y-4"
          >
            {data.differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#111115] hover:border-[#DCAE53]/40 transition-all duration-300 text-left shadow-lg"
              >
                {/* Geometric gold icon */}
                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-[#DCAE53] shrink-0 mt-0.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" />
                  </svg>
                </div>
                <span className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {diff}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trend Adaptation & Model Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 pt-14 border-t border-slate-800/80 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left"
        >
          {/* Trend Adaptation Callout */}
          <div className="p-6 sm:p-8 rounded-xl border border-slate-800 bg-[#111115] space-y-3 hover:border-[#DCAE53]/30 transition-all duration-300">
            <div className="flex items-center gap-2.5">
              <RefreshCw size={17} className="text-[#DCAE53]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#DCAE53]">
                [ {trendData.eyebrow} ]
              </span>
            </div>
            <h4 className="font-sans text-lg sm:text-xl font-bold text-white">{trendData.headline}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {trendData.description}
            </p>
          </div>

          {/* Model Hint Callout */}
          <div className="p-6 sm:p-8 rounded-xl border border-slate-800 bg-[#111115] space-y-3 hover:border-[#DCAE53]/30 transition-all duration-300">
            <div className="flex items-center gap-2.5">
              <Landmark size={17} className="text-[#DCAE53]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#DCAE53]">
                [ {modelData.eyebrow} ]
              </span>
            </div>
            <h4 className="font-sans text-lg sm:text-xl font-bold text-white">{modelData.headline}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {modelData.description}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
