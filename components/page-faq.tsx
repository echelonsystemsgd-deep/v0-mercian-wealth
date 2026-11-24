"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQData {
  eyebrow?: string
  headline: string
  description?: string
  faqs: FAQItem[]
}

interface PageFAQProps {
  data: FAQData
  id?: string
  className?: string
}

export function PageFAQ({ data, id = "faq", className = "" }: PageFAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  if (!data || !Array.isArray(data.faqs) || data.faqs.length === 0) {
    return null
  }

  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#030206] border-t border-white/10 ${className}`}>
      {/* Background Subtle Royal Purple Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 70% 80%, rgba(124, 58, 237, 0.08) 0%, rgba(3, 2, 6, 0) 65%)"
        }}
      />

      {/* Dynamic Page-Level FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          {data.eyebrow && (
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              [ {data.eyebrow} ]
            </span>
          )}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 sm:mt-3 uppercase tracking-wide leading-tight">
            {data.headline}
          </h2>
          {data.description && (
            <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-3 max-w-lg mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {data.faqs.map((faq, index) => {
            const isOpen = index === expandedIndex
            return (
              <div 
                key={index} 
                className={`border rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-[#d4af37]/60 bg-[#0a0614] shadow-xl shadow-[#d4af37]/10" : "border-white/10 bg-[#0a0614]/60 hover:border-white/20"
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-3">
                    <HelpCircle size={16} className={`shrink-0 ${isOpen ? "text-[#d4af37]" : "text-zinc-400"}`} />
                    <span className="font-serif font-bold text-xs sm:text-sm md:text-base text-white hover:text-[#d4af37] transition-colors duration-200 uppercase">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#d4af37] shrink-0 ml-2"
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-white/10">
                        <p className="font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed pt-3 sm:pt-4">
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
