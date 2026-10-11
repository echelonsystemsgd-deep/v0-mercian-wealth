import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageFAQ } from "@/components/page-faq"
import { PracticePipelineVisualizer } from "@/components/practice-pipeline-visualizer"
import { PracticeSpeedTest } from "@/components/practice-speed-test"
import { WebsiteReviewForm } from "@/components/website-review-form"
import { SITE_COPY } from "@/lib/site-copy"
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  FileText, 
  Calendar, 
  Lock, 
  Check, 
  Sparkles,
  PhoneCall,
  Search,
  Clock,
  Layers
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
    siteName: "Mercian Wealth | Intake & Deadline Chasing Systems for Accountants",
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
            "serviceType": "Practice Intake & Deadline Chasing Systems",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DAA640]/30 bg-[#DAA640]/5 text-[#DAA640] text-xs font-semibold tracking-wider uppercase mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            {data.hero.headline}
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {data.hero.subheadline}
          </p>

          {/* 3 Core Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href={data.hero.primaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#DAA640] hover:bg-[#c99535] text-black font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#DAA640]/20 min-h-[48px]"
            >
              <span>{data.hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={data.hero.secondaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 hover:border-[#DAA640]/60 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-all min-h-[48px]"
            >
              <Search className="w-4 h-4 text-[#DAA640]" />
              <span>{data.hero.secondaryCtaText}</span>
            </a>

            <a
              href={data.hero.tertiaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 hover:border-[#DAA640]/50 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-all min-h-[48px]"
            >
              <Zap className="w-4 h-4 text-[#DAA640]" />
              <span>{data.hero.tertiaryCtaText}</span>
            </a>
          </div>

          {/* Trust Chips (4 Exact Chips) */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left sm:text-center">
            {data.hero.trustPills.map((pill, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#DAA640] shrink-0" />
                <span className="font-medium">{pill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CORE OUTCOMES SECTION ("Three outcomes for your practice") */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA640] font-mono">[ PRACTICE VALUE ]</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              {data.outcomesHeadline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {data.outcomes.map((card) => (
              <div
                key={card.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0A0A0C] hover:border-[#DAA640]/40 transition-all p-6 sm:p-7 relative"
              >
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider text-[#DAA640] mb-2">
                    {card.pillar}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] text-slate-400 italic leading-relaxed">
                    *{card.footnote}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Micro How It Works Line */}
          <div className="mt-8 text-center max-w-3xl mx-auto p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="text-[#DAA640] font-semibold">How it works: </span>
            {data.howItWorks}
          </div>
        </section>

        {/* 3. MTD FOR INCOME TAX STATUTORY FACT SECTION */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-amber-950/10 to-transparent p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-3 font-mono">
              <Calendar className="w-4 h-4" />
              <span>{data.mtdSection.badge}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-bold text-white max-w-3xl leading-snug">
              {data.mtdSection.title}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Statutory deadlines require regular client communication. Pre-approved reminders collect records systematically ahead of each submission window.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-amber-500/20 pt-6">
              {data.mtdSection.facts.map((fact, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#DAA640] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-200 leading-snug font-medium">
                    {fact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW IT STARTS (3-Step Onboarding Flow) */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA640] font-mono">[ ONBOARDING ]</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              {data.howItStartsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.howItStarts.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-3 relative">
                <div className="w-8 h-8 rounded-lg bg-[#DAA640]/10 border border-[#DAA640]/30 text-[#DAA640] font-mono font-bold text-sm flex items-center justify-center">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INTERACTIVE 3-MINUTE SPEED TEST & DIAGNOSTIC */}
        <PracticeSpeedTest />

        {/* 6. INTERACTIVE PRACTICE PIPELINE VISUALIZER */}
        <PracticePipelineVisualizer />

        {/* 7. GOVERNED TRUST BLOCK ("Built for risk-averse practices") */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-2xl border border-white/10 bg-[#09090B] p-6 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA640] font-mono">
                [ {data.governance.badge} ]
              </span>
              <h2 className="text-xl sm:text-3xl font-bold text-white mt-1">
                {data.governance.title}
              </h2>
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

        {/* 8. EXACT FAQ MATCHING */}
        <PageFAQ data={data.faq} id="practice-faq" className="bg-transparent border-t border-white/5" />

        {/* 9. FREE 5-MINUTE WEBSITE REVIEW FORM (#website-review) */}
        <WebsiteReviewForm />

        {/* 10. CLOSING CTA BANNER */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-[#DAA640]/40 bg-gradient-to-r from-neutral-900 via-[#121008] to-neutral-900 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl shadow-[#DAA640]/10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#DAA640] mb-2 font-mono">
              [ {data.ctaSection.badge} ]
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#DAA640] hover:bg-[#c99535] text-black font-bold text-base transition-all shadow-lg shadow-[#DAA640]/25 min-h-[48px]"
              >
                <span>{data.ctaSection.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/447851055929"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-base transition-all min-h-[48px]"
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
