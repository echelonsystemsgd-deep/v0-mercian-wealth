import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageFAQ } from "@/components/page-faq"
import { PracticePipelineVisualizer } from "@/components/practice-pipeline-visualizer"
import { SITE_COPY } from "@/lib/site-copy"
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  FileText, 
  Calendar, 
  Lock, 
  Check, 
  AlertTriangle,
  Layers,
  Sparkles,
  PhoneCall
} from "lucide-react"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.practices.title,
  description: SITE_COPY.metadata.practices.description,
  alternates: {
    canonical: "https://mercianwealth.com/practices",
  },
  openGraph: {
    title: SITE_COPY.metadata.practices.title,
    description: SITE_COPY.metadata.practices.description,
    url: "https://mercianwealth.com/practices",
    siteName: "Mercian Wealth | Systems for Accountants",
    images: [
      {
        url: "/Logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "Mercian Wealth | Intake & Deadline Chasing Systems for UK Accountants",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_COPY.metadata.practices.title,
    description: SITE_COPY.metadata.practices.description,
    images: ["/Logo2.jpeg"],
    creator: "@mercianwealth",
  },
}

export default function PracticesPage() {
  const data = SITE_COPY.practicesPage

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#DAA640] selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Accounting Practice Client Intake & Deadline Systems",
            "provider": {
              "@id": "https://mercianwealth.com/#organization",
              "name": "Mercian Wealth",
            },
            "serviceType": "Practice Automation & Client Intake",
            "areaServed": "GB",
            "description": data.hero.subheadline,
            "url": "https://mercianwealth.com/practices",
          }),
        }}
      />

      <Navbar />

      <main className="relative pt-24 sm:pt-28 lg:pt-32 pb-20 overflow-hidden">
        {/* Ambient background glow */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-20 blur-[120px] rounded-full"
          style={{ background: "radial-gradient(circle, #DAA640 0%, transparent 70%)" }}
        />

        {/* 1. HERO SECTION */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DAA640]/30 bg-[#DAA640]/5 text-[#DAA640] text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            {data.hero.headline}
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {data.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href={data.hero.primaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-sm sm:text-base transition-all shadow-lg shadow-[#DAA640]/20 hover:scale-[1.02] min-h-[48px]"
            >
              <span>{data.hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#practice-visualizer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 hover:border-[#DAA640]/50 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-all min-h-[48px]"
            >
              <Zap className="w-4 h-4 text-[#DAA640]" />
              <span>{data.hero.secondaryCtaText}</span>
            </a>

            <a
              href="https://wa.me/447851055929"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 hover:border-[#DAA640]/50 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-all min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 text-[#DAA640]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Trust Pills */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left sm:text-center">
            {data.hero.trustPills.map((pill, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-white/[0.02] border border-white/5 rounded-md px-3 py-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#DAA640] shrink-0" />
                <span className="font-medium">{pill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. THE MTD 2026 REGULATORY BOTTLENECK CARD */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-amber-950/10 to-transparent p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>{data.mtdHook.badge}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-bold text-white max-w-3xl leading-snug">
              {data.mtdHook.title}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {data.mtdHook.description}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-amber-500/20 pt-6">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="text-2xl sm:text-3xl font-black text-[#DAA640]">{data.mtdHook.stat1.number}</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{data.mtdHook.stat1.label}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="text-2xl sm:text-3xl font-black text-[#DAA640]">{data.mtdHook.stat2.number}</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{data.mtdHook.stat2.label}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="text-2xl sm:text-3xl font-black text-[#DAA640]">{data.mtdHook.stat3.number}</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{data.mtdHook.stat3.label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE 3 SYSTEMS SHOWCASE */}
        <section id="practice-systems" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA640]">PRACTICE ARCHITECTURE</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Three governed systems. Built around how your practice operates.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Zero unsupervised AI touching client files. Designed strictly for time saved, faster client acquisition, and reliable deadline protection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.systems.map((system, idx) => (
              <div 
                key={system.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0A0A0C] hover:border-[#DAA640]/40 transition-all p-6 sm:p-7 group relative"
              >
                <div>
                  <div className="text-xs font-semibold tracking-wider text-[#DAA640] mb-2">{system.tag}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#DAA640] transition-colors">
                    {system.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-400">
                    {system.subtitle}
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {system.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {system.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-[#DAA640] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Projected Impact</div>
                  <div className="text-xs sm:text-sm font-medium text-amber-200/90 mt-1">{system.roi}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. INTERACTIVE PRACTICE PIPELINE VISUALIZER (PHASE 3 SANDBOX) */}
        <PracticePipelineVisualizer />

        {/* 5. GOVERNANCE & RISK REMOVAL SECTION */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-white/10 bg-[#09090B] p-6 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA640]">PRACTICE INTEGRITY</span>
              <h2 className="text-xl sm:text-3xl font-bold text-white mt-1">{data.governance.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.governance.principles.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#DAA640]/10 border border-[#DAA640]/20 flex items-center justify-center shrink-0">
                    {idx === 0 && <ShieldCheck className="w-5 h-5 text-[#DAA640]" />}
                    {idx === 1 && <Lock className="w-5 h-5 text-[#DAA640]" />}
                    {idx === 2 && <FileText className="w-5 h-5 text-[#DAA640]" />}
                    {idx === 3 && <Layers className="w-5 h-5 text-[#DAA640]" />}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">{item.title}</h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION */}
        <PageFAQ data={data.faq} id="practice-faq" className="bg-transparent border-t border-white/5" />

        {/* 6. CLOSING CTA BANNER */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-[#DAA640]/40 bg-gradient-to-r from-neutral-900 via-[#121008] to-neutral-900 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl shadow-[#DAA640]/10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#DAA640] mb-2">
              {data.ctaSection.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
              {data.ctaSection.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {data.ctaSection.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={data.ctaSection.primaryCtaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#DAA640] hover:bg-[#c99535] text-black font-semibold text-base transition-all shadow-lg shadow-[#DAA640]/25 hover:scale-[1.02]"
              >
                <span>{data.ctaSection.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/447851055929"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-base transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#DAA640]" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
