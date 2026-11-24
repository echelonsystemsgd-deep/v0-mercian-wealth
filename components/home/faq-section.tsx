"use client"

import { useState } from "react"
import { ChevronDown, Plus, Minus } from "lucide-react"

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    {
      q: "What is included in a bespoke website?",
      a: "Every bespoke website includes custom digital architecture, tailor-crafted typography, responsive UI/UX engineering, conversion-focused copywriting direction, mobile optimization, WebGL graphics integration where appropriate, lead intake structures, and complete deployment to your own domain and cloud infrastructure.",
    },
    {
      q: "How long does a project take?",
      a: "Most bespoke business platforms are designed, engineered, tested, and launched within 2 to 4 weeks depending on scope complexity. Because our architecture is bespoke without bloated plugin dependencies, development proceeds rapidly without compromising craftsmanship.",
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes. Many of our clients have an existing website that no longer represents the scale or quality of their work. We preserve your domain authority and organic SEO indexing while completely replacing the visual experience and intake mechanisms.",
    },
    {
      q: "Will my website work seamlessly on mobile?",
      a: "Every platform we build is engineered mobile-first. More than 65% of executive and commercial traffic occurs on smartphones. We guarantee sub-second load times, thumb-friendly navigation, and clear conversion paths on all devices.",
    },
    {
      q: "Can I update the website myself?",
      a: "Yes. We can integrate lightweight, intuitive content management systems that allow you or your team to easily publish articles, update case studies, and modify text without touching code or risking layout breakage.",
    },
    {
      q: "Who owns the website and its assets?",
      a: "You do, 100%. Upon final delivery, all code, design files, domains, cloud accounts, and intellectual property belong exclusively to your business. We believe in complete client sovereignty with zero hostage agency retainers or proprietary platform lock-in.",
    },
    {
      q: "Do you provide hosting and ongoing support?",
      a: "We deploy your website to enterprise-tier global cloud infrastructure (such as Vercel and AWS) configured directly in your accounts. We offer optional ongoing optimization, quarterly speed audits, and proactive technical management if you prefer hands-off maintenance.",
    },
    {
      q: "What happens after launch?",
      a: "Following launch, we monitor real-world user interactions, Core Web Vitals performance benchmarks, and form submission flows to guarantee optimal conversion. We also deliver comprehensive handoff documentation and remain available for feature expansion as your business grows.",
    },
  ]

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="relative min-h-[90vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-4xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="text-left mb-12 sm:mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + 08 — QUESTIONS &amp; CERTAINTY
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            FREQUENTLY ASKED<br />
            <span className="text-[#d4af37]">QUESTIONS.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Direct, transparent answers regarding our bespoke website creation process, timelines, deliverables, and client ownership terms.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={faq.q}
                className="border border-white/10 bg-[#060a16]/90 backdrop-blur-md transition-colors hover:border-[#d4af37]/40 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded border border-white/10 bg-[#0a1122] flex items-center justify-center text-[#d4af37] shrink-0">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
