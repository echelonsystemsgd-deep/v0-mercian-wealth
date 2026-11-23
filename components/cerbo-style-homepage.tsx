"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, ExternalLink } from "lucide-react"

// Section 02: Approach
export function ApproachSection() {
  return (
    <section id="approach" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + APPROACH
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          <span className="text-[#E08A68]">FIRST</span> THE WHY,<br />
          THEN THE CODE
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal">
          Before writing a single line of code, we analyze how your firm operates: what you sell, who to, and where valuable billable hours leak. Then we engineer the architecture and automation to solve that—never the other way around.
        </p>
      </div>
    </section>
  )
}

// Section 03: 01 Bespoke Storefronts & Platforms
export function StorefrontsSection() {
  const tags = ["BUSINESS WEBSITES", "LANDING PAGES", "STOREFRONTS", "3D EXPERIENCES"]
  return (
    <section id="storefronts" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 01 — WEBSITES AND EXPERIENCES
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          TURN VISITORS<br />
          <span className="text-[#E08A68]">INTO ENQUIRIES</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8">
          From high-converting landing pages to bespoke 3D storefronts, we engineer architecture, copy, design, and deployment. Fast on phones, clear at a glance, easy to find, and engineered so qualified visitors get in touch.
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

// Section 04: 02 Workflow Automation
export function AutomationSection() {
  const tags = ["INTAKE BUILDERS", "WHATSAPP DISPATCH", "CALENDAR SYNC", "CRM WEBHOOKS"]
  return (
    <section id="automation" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 02 — WORKFLOW AUTOMATION
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          REPETITIVE WORK,<br />
          <span className="text-[#E08A68]">DONE</span> BY THE COMPUTER
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8">
          Leads that log themselves into your CRM, instant WhatsApp intake specs pushed to your smartphone in under 5 seconds, and automated follow-ups. Every week, hours handed back to you and your team.
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

// Section 05: 03 Speed-to-Lead & Autonomous Triage
export function TriageSection() {
  const tags = ["<45S RESPONSE", "CLIENT TRIAGE", "STRIPE DEPOSIT", "ZERO NO-SHOWS"]
  return (
    <section id="systems" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + 03 — SPEED-TO-LEAD PIPELINES
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          AN ASSISTANT<br />
          <span className="text-[#E08A68]">THAT KNOWS</span> YOUR BUSINESS
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8">
          Autonomous triage systems that qualify scope, reserve calendar slots, and collect deposits 24/7/365. Enquiries received outside office hours are confirmed in under 45 seconds while buyer intent is peak.
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

// Section 06: Selected Work Showcase
export function WorkTeaserSection() {
  const projects = [
    { 
      title: "VANCE & PARTNERS", 
      cat: "ACCOUNTANCY & TAX", 
      desc: "Sub-second intake triage and automated MTD onboarding.",
      image: "/mercian-storefront-executive.jpg"
    },
    { 
      title: "THORNTON BUILDING", 
      cat: "COMMERCIAL FIT-OUT", 
      desc: "3-tap bespoke quote estimator with upfront deposit locks.",
      image: "/vanguard-construction-preview-real.jpg"
    },
    { 
      title: "AURELIA CLINIC", 
      cat: "AESTHETICS & HEALTH", 
      desc: "WhatsApp integrated appointment booking with 0% no-shows.",
      image: "/aurelia-supplement-preview-real.jpg"
    },
  ]

  return (
    <section id="work-teaser" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center py-20 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto mb-10">
        <div className="mb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E08A68] uppercase">
            + SELECTED DEPLOYMENTS
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6">
          TOOLS THAT<br />
          <span className="text-[#E08A68]">REALLY</span> WORK
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal">
          Bespoke digital platforms in daily commercial use across the UK. Fast, secure, and engineered to convert visitors into retainers.
        </p>
      </div>

      {/* Sharp-Edged Showcase Cards */}
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

      {/* Bordered Button: SEE ALL THE WORK */}
      <div className="relative z-10 text-left pointer-events-auto">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-[#E08A68] text-white hover:text-[#E08A68] font-mono text-xs uppercase tracking-wider transition-all bg-[#120d0b]/80 backdrop-blur-sm"
        >
          <span>SEE ALL THE WORK</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  )
}

// Section 08: Minimalist Closing CTA
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
          <span className="text-[#E08A68]">LET&apos;S TALK</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-md leading-relaxed font-normal mb-8">
          Tell us about your business and current intake process. We analyze your requirements and reply within one business day.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E08A68] hover:bg-[#F09A78] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered shadow-xl shadow-[#E08A68]/20"
          >
            <span>REQUEST SYSTEM BLUEPRINT ◆</span>
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

        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Berkshire &amp; across the United Kingdom</span>
        </div>

      </div>
    </section>
  )
}
