import type { Metadata } from "next"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { ArrowLeft, Shield, Clock, Star } from "lucide-react"
import { BookingFlow } from "@/components/booking-flow"
import { PageFAQ } from "@/components/page-faq"
import { SITE_COPY } from "@/lib/site-copy"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.book.title,
  description: SITE_COPY.metadata.book.description,
  alternates: {
    canonical: 'https://mercianwealth.com/book',
  },
  openGraph: {
    title: SITE_COPY.metadata.book.title,
    description: SITE_COPY.metadata.book.description,
    url: 'https://mercianwealth.com/book',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Book a 15-Minute Operational Discovery Call',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.book.title,
    description: SITE_COPY.metadata.book.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default function BookPage() {
  const data = SITE_COPY.bookPage
  const icons = [Clock, Shield, Star]
  const trustItems = data.trustItems.map((text, idx) => ({
    icon: icons[idx] || Star,
    text
  }))

  const reserveSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "15-Minute Operational Discovery Call",
    "provider": {
      "@id": "https://mercianwealth.com/#organization"
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mercianwealth.com/book",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Operational Discovery Session"
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#09090B] relative overflow-hidden text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reserveSchema) }}
      />
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCAE53]/30 to-transparent" />
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#DCAE53]/5 blur-[140px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#DCAE53]/3 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#DCAE53]/20 to-transparent" />
      </div>

      {/* Top Nav Bar */}
      <header className="relative z-10 border-b border-slate-800 bg-[#09090B]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-16 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-slate-800 shadow-md">
              <BrandLogo variant="logo" alt="Mercian Wealth" fill className="object-cover transition-transform group-hover:scale-105 duration-300" priority />
            </div>
            <span className="font-sans text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5 hidden sm:flex">
              <span>Mercian</span>
              <span className="text-[#DCAE53]">Wealth</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-[#DCAE53] transition-colors font-medium"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 xl:gap-16 items-start">

          {/* ---- Left Column: Page Header & Trust signals ---- */}
          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#DCAE53] font-mono">
                [ {data.clinicalEvaluationLabel} ]
              </p>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {data.headerTitle}{" "}
                <span className="text-[#DCAE53]">{data.headerHighlight}</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {data.headerSubtitle}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              {trustItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111115] border border-slate-800 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#DCAE53]" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Snippet */}
            <div className="rounded-2xl p-5 border border-slate-800 bg-[#111115] space-y-3 shadow-lg">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#DCAE53] text-[#DCAE53]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                &ldquo;{data.socialProofQuote}&rdquo;
              </p>
              <p className="text-xs text-[#DCAE53] font-semibold font-mono">— {data.socialProofAuthor}</p>
            </div>

            {/* Decorative Mercian Monogram */}
            <div className="hidden lg:flex items-center gap-3 opacity-30 select-none pointer-events-none">
              <div className="h-px flex-1 bg-[#DCAE53]/50" />
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#DCAE53]">Mercian Wealth</span>
              <div className="h-px flex-1 bg-[#DCAE53]/50" />
            </div>
          </div>

          {/* ---- Right Column: Booking Flow ---- */}
          <div className="space-y-4">
            {/* GDPR / Data Notice */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-slate-800 bg-[#111115]">
              <Shield size={14} className="text-[#DCAE53] mt-0.5 shrink-0" />
              <p className="text-xs text-slate-300 leading-relaxed">
                Your details are encrypted and securely processed. We do not sell your data. See our{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-[#DCAE53] transition-colors text-white"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <BookingFlow />
          </div>

        </div>

        {/* What to Expect Breakdown (Expands page depth & SEO indexability) */}
        <section className="mt-20 border-t border-slate-800 pt-16">
          <div className="max-w-3xl mb-10 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#DCAE53] font-mono">
              [ DIRECT CONSULTATION AGENDA ]
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              What to expect in your 15-minute discovery session
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We respect your operating schedule. Every consultation is structured, data-driven, and focused entirely on commercial outcomes rather than abstract technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#111115] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#DCAE53] font-bold">Phase 01</span>
                <span className="text-[11px] font-mono text-slate-400">Minutes 0–4</span>
              </div>
              <h3 className="text-base font-bold text-white">Current Pipeline &amp; Friction Audit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We review how prospective clients discover and contact your business today. We identify the exact points where visitors bounce—such as slow contact forms, unformatted mobile menus, or phone calls missed while on-site.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111115] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#DCAE53] font-bold">Phase 02</span>
                <span className="text-[11px] font-mono text-slate-400">Minutes 4–9</span>
              </div>
              <h3 className="text-base font-bold text-white">Live Prototype Demonstration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We walk you through an interactive mobile prototype tailored to your exact industry. You will test how a 3-tap order builder lets high-intent buyers configure their requirement and submit instant deposits within seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111115] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#DCAE53] font-bold">Phase 03</span>
                <span className="text-[11px] font-mono text-slate-400">Minutes 9–12</span>
              </div>
              <h3 className="text-base font-bold text-white">Automations &amp; Revenue Stack</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We demonstrate how instant WhatsApp routing pings your phone the moment an order arrives, how automated Google review triggers collect 5-star feedback, and how upfront Stripe deposits completely eliminate customer no-shows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111115] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#DCAE53] font-bold">Phase 04</span>
                <span className="text-[11px] font-mono text-slate-400">Minutes 12–15</span>
              </div>
              <h3 className="text-base font-bold text-white">7-Day Deployment &amp; Commercial Fit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If the solution aligns with your commercial targets, we schedule your 7-day build cohort. If it is not a fit, you walk away with our full architectural audit and recommendations with zero obligation.
              </p>
            </div>
          </div>
        </section>

        {/* Objections Handling FAQ Section */}
        <div className="mt-20 border-t border-slate-800 pt-16">
          {data.faq ? <PageFAQ data={data.faq} /> : null}
        </div>
      </div>
    </main>
  )
}
