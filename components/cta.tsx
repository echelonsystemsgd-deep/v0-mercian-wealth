"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, MessageSquare } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"

export function CTA() {
  const data = SITE_COPY.homepage.cta

  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden bg-[#09090B]">
      {/* Background Radial Gold Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 174, 83, 0.08) 0%, rgba(9, 9, 11, 0) 70%)"
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center space-y-8">
        
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight text-balance max-w-4xl"
        >
          {data.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
        >
          {data.subheadline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex flex-col items-center gap-4 pt-2"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            {/* Primary WhatsApp */}
            <a
              href={SITE_COPY.navbar.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] rounded-lg transition-all duration-200 shadow-lg shadow-black/40"
            >
              <MessageSquare size={18} className="shrink-0" />
              <span>Message on WhatsApp</span>
            </a>

            {/* Secondary Book Call */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold border-slate-800 bg-[#111115] text-slate-200 hover:bg-[#18181F] hover:text-white rounded-lg"
            >
              <Link href="/book" className="flex items-center gap-2">
                <span>{data.buttonText}</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111115] border border-slate-800 text-[10px] text-[#DCAE53] uppercase tracking-wider">
              <ShieldCheck size={12} className="text-[#DCAE53]" />
              15-Minute Telephone Call · Zero High-Pressure Pitch
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
