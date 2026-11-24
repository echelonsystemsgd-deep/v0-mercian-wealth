import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { CTA } from "@/components/cta"
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, Lock, Sparkles, Layers } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

export const metadata: Metadata = {
  title: "Engineering Philosophy & Architecture · Mercian Wealth",
  description: "Why bespoke autonomous infrastructure outperforms fragmented SaaS subscriptions. Institutional speed-to-lead and client intake engineering.",
  alternates: {
    canonical: "https://mercianwealth.com/about",
  },
}

export default function AboutPage() {
  const principles = [
    {
      number: "01",
      title: "Direct Code Ownership, Zero Subscription Rent",
      description: "Generic agencies build on proprietary platforms that hold your business hostage. We engineer autonomous storefronts and intake engines that deploy to your own cloud infrastructure. You own 100% of your codebase, client data, and DNS records.",
    },
    {
      number: "02",
      title: "Sub-Second Response Over Cosmetic Design",
      description: "A visually stunning website that loads in 4 seconds and requires a 12-field form is a revenue liability. We engineer sub-400ms mobile storefronts with 3-tap booking and upfront deposit collection that capture intent while attention is peak.",
    },
    {
      number: "03",
      title: "Autonomous Triage Over Manual Dispatch",
      description: "Relying on staff to check inboxes at 8pm or answer calls during peak job hours bleeds qualified customers. Our neural triage systems qualify scope, reserve calendar slots, and collect deposits automatically 24/7/365.",
    },
    {
      number: "04",
      title: "Institutional Security & UK Data Residency",
      description: "Engineered specifically for UK commercial firms and accountancy practices under strict GDPR frameworks. Zero client data is ever sold or exposed to third-party public AI model training.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#030206] text-white selection:bg-[#d4af37] selection:text-black">
      <Navbar />

      <PageHeader
        title="Bespoke Architecture."
        highlight="Zero SaaS Rent."
        subtitle="We build high-performance autonomous infrastructure that changes how UK firms capture, triage, and retain clients."
      />

      {/* Philosophy Statement */}
      <section className="relative py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0a0614] border border-white/10 space-y-6 relative overflow-hidden shadow-2xl">
          {/* Subtle Royal Purple Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#7c3aed]/10 blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#130a24] border border-[#d4af37]/40 text-[#d4af37] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] chamfered-sm shadow-md">
            <span className="w-1.5 h-1.5 bg-[#b794f6] animate-pulse" />
            <span>[ THE INSTITUTIONAL STANDARD ]</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase text-white tracking-wide leading-tight">
            Stop Paying A Tax On Your Own <em className="italic font-normal text-[#d4af37]">Growth</em>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
            Most businesses operate on a tangled web of 8 to 12 disconnected software subscriptions: Calendly for bookings, Typeform for intake, Zapier to stitch them together, and HubSpot to log the records. Every integration adds latency, monthly licensing costs, and another point of failure.
          </p>

          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mercian Wealth replaces fragmented subscription stacks with unified, custom-engineered conversion infrastructure. Engineered in Berkshire for UK commercial contractors, accounting practices, and high-ticket service firms.
          </p>
        </div>
      </section>

      {/* 4 Core Engineering Principles */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] font-mono">
            [ ARCHITECTURAL FOUNDATIONS ]
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold uppercase text-white mt-2 tracking-wide">
            Four Engineering Principles
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((p) => (
            <div key={p.number} className="p-6 sm:p-8 rounded-2xl bg-[#0a0614] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#d4af37]">
                  {p.number}
                </span>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
}
