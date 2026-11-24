"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"

// SECTION 02: THE VISION
export function ApproachSection() {
  return (
    <section id="vision" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + THE VISION
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          <span className="text-[#E08A68]">FIRST</span> THE VISION.<br />
          THEN THE EXECUTION.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal">
          Every successful digital experience starts with understanding the business, its direction and the people it needs to reach.
        </p>
      </div>
    </section>
  )
}

// SECTION 03: CONVERSION
export function StorefrontsSection() {
  const tags = ["BESPOKE PLATFORMS", "CONVERSION ARCHITECTURE", "CREDIBILITY SIGNALS", "SEAMLESS INTAKE"]
  return (
    <section id="conversion" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 01 — CONVERSION
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          TURN VISITORS<br />
          <span className="text-[#E08A68]">INTO ENQUIRIES.</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8">
          Your website should do more than look impressive. It should communicate value, establish credibility and make it easy for customers to take the next step.
        </p>

        {/* Sharp Rectangular Capability Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#120d0b]/90 border border-white/15 text-zinc-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-sm"
            >
              [ {tag} ]
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 04: AUTOMATION
export function AutomationSection() {
  const tags = ["INTAKE BUILDERS", "WHATSAPP DISPATCH", "CALENDAR SYNC", "CRM WEBHOOKS"]
  return (
    <section id="automation" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 02 — AUTOMATION
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          REPETITIVE WORK.<br />
          <span className="text-[#E08A68]">DONE BY</span> THE SYSTEM.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8">
          Connect the right processes, reduce unnecessary administration and give your business more room to operate efficiently.
        </p>

        {/* Sharp Rectangular Capability Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#120d0b]/90 border border-white/15 text-zinc-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-sm"
            >
              [ {tag} ]
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 05: INTELLIGENCE
export function TriageSection() {
  const tags = ["SUB-45S RESPONSE", "ENQUIRY TRIAGE", "PROCESS ROUTING", "24/7 AVAILABILITY"]
  return (
    <section id="systems" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 03 — INTELLIGENCE
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          TECHNOLOGY THAT<br />
          <span className="text-[#E08A68]">UNDERSTANDS</span> YOUR BUSINESS.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8">
          Thoughtful integrations and intelligent systems support better customer experiences, faster responses and more connected operations.
        </p>

        {/* Sharp Rectangular Capability Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#120d0b]/90 border border-white/15 text-zinc-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-sm"
            >
              [ {tag} ]
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 06: TOOLS THAT WORK
export function WorkTeaserSection() {
  const projects = [
    { 
      title: "VANCE & PARTNERS", 
      cat: "ACCOUNTANCY & TAX", 
      desc: "Sub-second intake triage and automated client onboarding.",
      image: "/mercian-storefront-executive.jpg"
    },
    { 
      title: "THORNTON BUILDING", 
      cat: "COMMERCIAL FIT-OUT", 
      desc: "3-tap bespoke quote estimator with upfront commitment locks.",
      image: "/vanguard-construction-preview-real.jpg"
    },
    { 
      title: "AURELIA CLINIC", 
      cat: "AESTHETICS & HEALTH", 
      desc: "Integrated appointment booking with automated enquiry routing.",
      image: "/aurelia-supplement-preview-real.jpg"
    },
  ]

  return (
    <section id="work-teaser" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto mb-10">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 04 — CONNECTIVITY
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          THE RIGHT TOOLS.<br />
          <span className="text-[#E08A68]">ONE CONNECTED</span> EXPERIENCE.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal">
          Websites, customer journeys and supporting systems should work together rather than operate in isolation.
        </p>
      </div>

      {/* Restrained Showcase Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl pointer-events-auto mb-10">
        {projects.map((proj) => (
          <Link
            key={proj.title}
            href="/portfolio"
            className="group block bg-[#120d0b]/85 border border-white/10 hover:border-[#E08A68]/50 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md"
          >
            <div className="relative h-44 w-full bg-[#18110f] overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d0b] via-transparent to-transparent" />
            </div>
            <div className="p-5 sm:p-6 text-left">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#E08A68] uppercase block mb-2">
                {proj.cat}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase group-hover:text-[#E08A68] transition-colors mb-2">
                {proj.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-snug">
                {proj.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bordered Action Link */}
      <div className="relative z-10 text-left pointer-events-auto">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-[#E08A68] text-white hover:text-[#E08A68] font-mono text-xs uppercase tracking-wider transition-all bg-[#120d0b]/80 backdrop-blur-sm"
        >
          <span>Explore Selected Deployments</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  )
}

// SECTION 08: LET'S TALK
export function ClosingCTASection() {
  return (
    <section id="cta" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center py-20 sm:py-28 px-6 sm:px-12 lg:px-20 text-center overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + CONTACT
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-tight mb-6">
          <span className="text-[#E08A68]">LET&apos;S TALK.</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-md leading-relaxed font-normal mb-8">
          Have a project in mind? Let&apos;s explore what the right digital experience could make possible for your business.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E08A68] hover:bg-[#F09A78] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered shadow-xl shadow-[#E08A68]/20"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href="tel:+447851055929"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#14100e]/90 hover:bg-[#1f1714] text-zinc-300 hover:text-white border border-white/15 font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
          >
            <Phone size={13} className="text-[#E08A68]" />
            <span>+44 7851 055929</span>
          </a>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#120d0b]/90 border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase tracking-widest backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Berkshire &amp; across the United Kingdom</span>
        </div>

      </div>
    </section>
  )
}
