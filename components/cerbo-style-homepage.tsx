"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"

// SECTION 02: THE VISION / APPROACH
export function ApproachSection() {
  return (
    <section id="vision" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start pt-24 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + THE VISION
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6"
        >
          <span className="text-[#d4af37]">FIRST</span> THE VISION.<br />
          THEN THE EXECUTION.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal"
        >
          Every successful digital experience starts with understanding the enterprise, its commercial direction, and the people it needs to convert. We design and engineer architecture to serve that, never the other way around.
        </motion.p>
      </div>
    </section>
  )
}

// SECTION 03: 01 — WEBSITES & CONVERSION
export function StorefrontsSection() {
  const tags = ["BESPOKE PLATFORMS", "CONVERSION ARCHITECTURE", "CREDIBILITY SIGNALS", "SEAMLESS INTAKE"]
  return (
    <section id="conversion" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start pt-24 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + 01 — WEBSITES AND EXPERIENCES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6"
        >
          TURN VISITORS<br />
          <span className="text-[#d4af37]">INTO ENQUIRIES.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8"
        >
          Your website should do more than look impressive. It should communicate institutional value, establish unshakeable credibility, and make it seamless for qualified prospects to take the next commercial step.
        </motion.p>

        {/* Sharp Rectangular Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-2.5"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#0a0614]/90 border border-white/15 hover:border-[#d4af37]/50 text-zinc-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-sm transition-colors"
            >
              [ {tag} ]
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// SECTION 04: 02 — AUTOMATION
export function AutomationSection() {
  const tags = ["INTAKE BUILDERS", "WHATSAPP DISPATCH", "CALENDAR SYNC", "CRM WEBHOOKS"]
  return (
    <section id="automation" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start pt-24 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + 02 — AUTOMATION
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6"
        >
          REPETITIVE WORK.<br />
          <span className="text-[#d4af37]">DONE BY</span> THE SYSTEM.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8"
        >
          Connect critical operational workflows, eliminate manual administrative friction, and grant your executive team more space to focus on high-margin client advisory.
        </motion.p>

        {/* Sharp Rectangular Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-2.5"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#0a0614]/90 border border-white/15 hover:border-[#d4af37]/50 text-zinc-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-sm transition-colors"
            >
              [ {tag} ]
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// SECTION 05: 03 — INTELLIGENCE / AI
export function TriageSection() {
  const tags = ["SUB-45S RESPONSE", "ENQUIRY TRIAGE", "PROCESS ROUTING", "24/7 AVAILABILITY"]
  return (
    <section id="systems" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start pt-24 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + 03 — INTELLIGENCE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6"
        >
          TECHNOLOGY THAT<br />
          <span className="text-[#d4af37]">UNDERSTANDS</span> YOUR BUSINESS.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal mb-8"
        >
          Autonomous assistants trained on your private practice data and client intake rules: they answer enquiries instantly, triage documents, and draft paperwork 24/7. Final sign-off stays with you.
        </motion.p>

        {/* Sharp Rectangular Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-2.5"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#0a0614]/90 border border-white/15 hover:border-[#d4af37]/50 text-zinc-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-sm transition-colors"
            >
              [ {tag} ]
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// SECTION 06: 04 — SELECTED DEPLOYMENTS (3-COLUMN WORK)
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
    <section id="work-teaser" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-xl lg:max-w-2xl text-left pointer-events-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + 04 — SELECTED WORK
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-6"
        >
          THE RIGHT TOOLS.<br />
          <span className="text-[#d4af37]">ONE CONNECTED</span> EXPERIENCE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal"
        >
          Digital architecture and custom platforms actively deployed in UK enterprises. Client confidentiality strictly preserved: verified production outcomes.
        </motion.p>
      </div>

      {/* Restrained 3-Column Showcase Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl pointer-events-auto mb-10">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
          >
            <Link
              href="/portfolio"
              className="group block bg-[#0a0614]/85 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md"
            >
              <div className="relative h-44 w-full bg-[#030206] overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#d4af37] uppercase block mb-2">
                  {proj.cat}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase group-hover:text-[#d4af37] transition-colors mb-2">
                  {proj.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-snug">
                  {proj.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bordered Action Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-left pointer-events-auto"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-mono text-xs uppercase tracking-wider transition-all bg-[#0a0614]/80 backdrop-blur-sm"
        >
          <span>Explore Selected Deployments</span>
          <ArrowRight size={13} />
        </Link>
      </motion.div>
    </section>
  )
}

// SECTION 08: 06 — LET'S TALK (CLOSING HERO-ECHO CTA)
export function ClosingCTASection() {
  return (
    <section id="cta" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 text-center overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
            + CONTACT
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-tight mb-6"
        >
          <span className="text-[#d4af37]">LET&apos;S TALK.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-md leading-relaxed font-normal mb-8"
        >
          Have an enterprise initiative in mind? Let&apos;s explore what the right bespoke digital architecture could make possible for your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#d4af37] hover:bg-[#e5c158] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered shadow-xl shadow-[#d4af37]/20"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href="tel:+447851055929"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#0a0614]/90 hover:bg-[#120a24] text-zinc-300 hover:text-white border border-white/15 font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
          >
            <Phone size={13} className="text-[#d4af37]" />
            <span>+44 7851 055929</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#0a0614]/90 border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase tracking-widest backdrop-blur-md shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Berkshire &amp; across the United Kingdom</span>
        </motion.div>

      </div>
    </section>
  )
}
