import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhatChanged } from "@/components/what-changed"
import { Bottleneck } from "@/components/bottleneck"
import { OfferMechanism } from "@/components/offer-mechanism"
import { InteractiveAutomationFlow } from "@/components/interactive-automation-flow"
import { Portfolio } from "@/components/portfolio"
import { ProofCaseStudies } from "@/components/proof-case-studies"
import { WhyMercianWealth } from "@/components/why-mercian-wealth"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { ChapterTracker } from "@/components/chapter-tracker"
import { PrototypeRequestModal } from "@/components/prototype-request-modal"
import { ZeroDisruptionGuarantee } from "@/components/zero-disruption"
import { FAQHome } from "@/components/faq-home"
import { FloatingAiConcierge } from "@/components/floating-ai-concierge"
import { getPricingTiers } from "@/lib/pricing"
import { Suspense } from "react"

import { SITE_COPY } from "@/lib/site-copy"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: SITE_COPY.metadata.home.title,
  description: SITE_COPY.metadata.home.description,
  alternates: {
    canonical: 'https://mercianwealth.com',
  },
  openGraph: {
    title: SITE_COPY.metadata.home.title,
    description: SITE_COPY.metadata.home.description,
    url: 'https://mercianwealth.com',
    siteName: 'Mercian Wealth Automation',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth Automation | Mobile Storefronts & Booking Engines for UK Local Businesses',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.home.title,
    description: SITE_COPY.metadata.home.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default async function Home() {
  const { setupTiers, retainerTiers } = await getPricingTiers()

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#DAA640] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://mercianwealth.com/#webpage",
            "url": "https://mercianwealth.com",
            "name": "Mercian Wealth Automation | Conversion Infrastructure & Mobile Storefronts",
            "isPartOf": {
              "@id": "https://mercianwealth.com/#website"
            },
            "about": {
              "@id": "https://mercianwealth.com/#organization"
            },
            "description": "When AI search compresses attention, your website is the only barrier between paid and the back button. Sub-second mobile storefronts, 3-tap booking builders, instant WhatsApp lead capture, and upfront Stripe deposit collection for UK businesses."
          })
        }}
      />
      
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Outcomes Hero Section */}
      <Hero />

      {/* 3. SYSTEM I · What Changed (4 Market Shifts) */}
      <WhatChanged />

      {/* 4. SYSTEM II · Revenue Haemorrhage (The 4 Leakage Categories) */}
      <Bottleneck />

      {/* Zero-Disruption Guarantee */}
      <ZeroDisruptionGuarantee />

      {/* 5. SYSTEM III · The Offer Protocol (Prototype-First 3-Step Sequence) */}
      <OfferMechanism />

      {/* SYSTEM IV-B · Autonomous 4-Step Revenue Chain Visualizer */}
      <InteractiveAutomationFlow />

      {/* 6. SYSTEM IV · AI Systems & Deployments Showcase */}
      <Portfolio />

      {/* 7. SYSTEM V · Verified Proof (Commercial Trade + Aesthetics Deployments) */}
      <ProofCaseStudies />

      {/* 8. SYSTEM VI · Operator & Founder Commitment */}
      <WhyMercianWealth />

      {/* 9. SYSTEM VII · Retainer Terms & Transparent Pricing */}
      <Suspense fallback={<div className="py-20 text-center text-[#DCAE53] font-mono text-sm">Loading Solutions & Retainer Pricing...</div>}>
        <Pricing isHomepage={true} setupTiers={setupTiers} retainerTiers={retainerTiers} />
      </Suspense>

      {/* Frequently Asked Questions with FAQPage Schema */}
      <FAQHome />

      {/* 10. SYSTEM VIII · Closing Prototype CTA & Footer */}
      <CTA />
      <Footer />

      {/* Floating Systems Tracking Pill */}
      <ChapterTracker />

      {/* 3-Field Prototype Request Modal */}
      <PrototypeRequestModal />

      {/* Bottom-Left Questions Assistant (Hidden on mobile <640px) */}
      <FloatingAiConcierge />
    </main>
  )
}
