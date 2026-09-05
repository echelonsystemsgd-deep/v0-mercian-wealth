"use client"

import { motion } from "framer-motion"
import { RefreshCw, Landmark } from "lucide-react"
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
          className="mb-10 sm:mb-14 p-4 sm:p-7 rounded-xl sm:rounded-2xl border border-slate-800/90 border-l-4 border-l-[#DCAE53] bg-[#111115] backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 text-left max-w-5xl mx-auto hover:border-slate-700/80 transition-colors"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#18181F] border border-[#DCAE53]/30 p-2 shrink-0 shadow-lg relative overflow-hidden flex items-center justify-center">
            <BrandLogo 
              variant="watermark"
              alt="Mercian Wealth Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[9px] sm:text-[10px] font-mono text-[#DCAE53] uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53]" />
              <span>FOUNDER &amp; OPERATOR COMMITMENT</span>
            </div>
            <h3 className="font-sans text-base sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
              &quot;We don&apos;t talk about agents, models, or workflows — that&apos;s our job, not yours.&quot;
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              We talk about what changes for you: faster response times, fewer missed leads, more bookings closed, less time spent chasing admin. If a system doesn&apos;t save time, cut cost, grow revenue, or remove a risk, it doesn&apos;t go on your site.
            </p>
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
