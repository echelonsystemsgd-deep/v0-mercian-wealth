"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Smartphone, Monitor, ShieldCheck } from "lucide-react"

export function ExperienceDemoSection() {
  const [activeTab, setActiveTab] = useState<number>(0)

  const demonstrations = [
    {
      title: "Executive Advisory Storefront",
      category: "ACCOUNTANCY & FINANCIAL CONSULTING",
      client: "Vance & Partners",
      desc: "Sub-second digital storefront with tiered service discovery, verified authority indicators, and instant intake scheduling.",
      desktopImage: "/mercian-storefront-executive.jpg",
      metrics: ["<350ms TTFB Benchmark", "Zero Friction Client Triage", "Responsive Desktop & Mobile"],
    },
    {
      title: "Commercial Property Platform",
      category: "CONSTRUCTION & COMMERCIAL FIT-OUT",
      client: "Thornton Building",
      desc: "Architectural showcase platform with 3-tap interactive quote configuration and verified client portfolio galleries.",
      desktopImage: "/vanguard-construction-preview-real.jpg",
      metrics: ["High-Res Visual Portfolio", "Interactive Scope Estimator", "Mobile Thumb Ergonomics"],
    },
    {
      title: "Clinical Aesthetics Experience",
      category: "HEALTHCARE & PRIVATE PRACTICE",
      client: "Aurelia Clinic",
      desc: "Bespoke booking and service environment with automated WhatsApp intake routing and zero client no-shows.",
      desktopImage: "/aurelia-supplement-preview-real.jpg",
      metrics: ["Instant Calendar Confirmation", "Automated Intake Dispatch", "High-Converting Mobile UX"],
    },
  ]

  const current = demonstrations[activeTab]

  return (
    <section id="demonstration" className="relative min-h-[95vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-6xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-10 sm:mb-14">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              + 03 — VISUAL DEMONSTRATION
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
            <span className="text-[#d4af37]">DIGITAL EXPERIENCES</span><br />
            BUILT TO COMMAND RESPECT.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
            Inspect the tactile finish, editorial typography, and high-performance structure delivered across commercial client engagements.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {demonstrations.map((d, idx) => (
            <button
              key={d.title}
              onClick={() => setActiveTab(idx)}
              className={`px-4 sm:px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all border ${
                activeTab === idx
                  ? "bg-[#d4af37] text-black font-bold border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
                  : "bg-[#060a14]/80 text-zinc-400 hover:text-white border-white/10 hover:border-[#d4af37]/40"
              }`}
            >
              0{idx + 1} · {d.client}
            </button>
          ))}
        </div>

        {/* Browser Mockup Frame in Deep Navy & Glass */}
        <div className="bg-[#050812]/95 border border-white/15 rounded-lg overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Top Browser Bar */}
          <div className="px-4 py-3 bg-[#0a1020] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-[10px] text-zinc-400 hidden sm:inline">
                https://mercianwealth.com/preview/{current.client.toLowerCase().replace(/[\s&]+/g, "-")}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400">
              <span className="hidden md:inline text-[#d4af37]">SECURE SSL · 100% OWNED INFRASTRUCTURE</span>
            </div>
          </div>

          {/* Browser Content Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Preview Box */}
            <div className="lg:col-span-8 relative h-64 sm:h-96 lg:h-[480px] bg-[#080d18] overflow-hidden">
              <Image
                src={current.desktopImage}
                alt={current.title}
                fill
                className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050812] via-transparent to-transparent opacity-80" />
            </div>

            {/* Sidebar Specifications */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#070b16] border-t lg:border-t-0 lg:border-l border-white/10">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#d4af37] tracking-widest uppercase block mb-2">
                  {current.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase mb-3">
                  {current.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {current.desc}
                </p>

                <div className="space-y-2.5 border-t border-white/10 pt-4 mb-6">
                  {current.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-xs text-zinc-300">
                      <ShieldCheck size={14} className="text-[#d4af37] shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="/portfolio"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
                >
                  <span>Explore Portfolio Archive</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
