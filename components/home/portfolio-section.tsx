"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

export function PortfolioSection() {
  const projects = [
    {
      title: "Vance & Partners",
      industry: "ACCOUNTANCY & TAX ADVISORY",
      objective: "Establish market authority and modern digital intake for high-net-worth commercial clients.",
      approach: "Editorial typography paired with instant triage architecture and sub-second loading speeds.",
      delivered: "Bespoke marketing storefront, client intake engine, and automated speed-to-lead pipelines.",
      image: "/mercian-storefront-executive.jpg",
    },
    {
      title: "Thornton Building",
      industry: "COMMERCIAL FIT-OUT & CONSTRUCTION",
      objective: "Replace an outdated portfolio site with an architectural showcase that closes commercial bids.",
      approach: "Minimalist dark aesthetic highlighting completed project photography and scope estimators.",
      delivered: "Flagship commercial website, interactive scope builder, and mobile lead dispatch.",
      image: "/vanguard-construction-preview-real.jpg",
    },
    {
      title: "Aurelia Clinic",
      industry: "PRIVATE AESTHETICS & WELLNESS",
      objective: "Streamline client consultation bookings and eliminate costly appointment no-shows.",
      approach: "Luxury sensory design combined with frictionless 3-tap WhatsApp appointment reservation.",
      delivered: "Bespoke digital storefront, automated SMS/WhatsApp reminders, and calendar synchronization.",
      image: "/aurelia-supplement-preview-real.jpg",
    },
  ]

  return (
    <section id="portfolio" className="relative min-h-[90vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div className="relative z-10 max-w-6xl mx-auto pointer-events-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl text-left">
            <div className="mb-4">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
                + 05 — SELECTED DEPLOYMENTS
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08] mb-4">
              <span className="text-[#d4af37]">PROVEN WORK.</span><br />
              MEASURABLE STANDARDS.
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
              Every website we deliver is engineered as a bespoke commercial asset. Explore verified client deployments built for UK enterprises.
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-mono text-xs uppercase tracking-wider transition-all bg-[#080d1a]/80 backdrop-blur-md"
            >
              <span>View Complete Portfolio</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 3 Large Showcase Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="group block bg-[#060a16]/90 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full bg-[#090f20] overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060a16] via-transparent to-transparent" />
                </div>

                <div className="p-6 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#d4af37] uppercase block mb-2">
                    {proj.industry}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase group-hover:text-[#d4af37] transition-colors mb-3">
                    {proj.title}
                  </h3>

                  <div className="space-y-3 text-xs text-zinc-300 leading-relaxed mb-4">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">Objective:</span>
                      <span>{proj.objective}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">Approach:</span>
                      <span>{proj.approach}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">Delivered:</span>
                      <span className="text-zinc-200">{proj.delivered}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 text-left border-t border-white/5">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#d4af37] group-hover:underline uppercase tracking-wider"
                >
                  <span>Case Study Details</span>
                  <ExternalLink size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
