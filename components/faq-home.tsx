"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { SITE_COPY } from "@/lib/site-copy"

export function FAQHome() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const data = SITE_COPY.homepage.faq

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden bg-[#09090B] border-t border-slate-800/80">
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 70% 80%, rgba(220, 174, 83, 0.05) 0%, rgba(9, 9, 11, 0) 60%)"
        }}
      />

      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Array.isArray(data.faqs)
              ? data.faqs.map((faq: any) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer,
                  },
                }))
              : [],
          }),
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#DCAE53]">
            {data.eyebrow}
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            {data.headline}
          </h2>
          <p className="font-sans text-sm text-slate-300 mt-4 max-w-lg mx-auto">
            {data.description}
          </p>
        </div>

        {/* Custom Framer Motion Accordion Stack */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {Array.isArray(data.faqs) && data.faqs.map((faq: any, index: number) => {
            const isOpen = index === expandedIndex
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-[#DCAE53] bg-[#111115] shadow-xl" : "border-slate-800 bg-[#111115]/60 hover:border-slate-700"
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle size={16} className={isOpen ? "text-[#DCAE53]" : "text-slate-400"} />
                    <span className="font-sans font-bold text-sm sm:text-base text-white hover:text-[#DCAE53] transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#DCAE53] shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Expanding Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-800">
                        <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
