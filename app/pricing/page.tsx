import { Navbar } from "@/components/navbar"
import { Pricing } from "@/components/pricing"
import { FAQHome } from "@/components/faq-home"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { getPricingTiers } from "@/lib/pricing"
import { SITE_COPY } from "@/lib/site-copy"
import { Suspense } from "react"

import type { Metadata } from "next"
import { EditorialInsight } from "@/components/editorial-insight"
import { PageFAQ } from "@/components/page-faq"

export const revalidate = 60

export const metadata: Metadata = {
  title: SITE_COPY.metadata.pricing.title,
  description: SITE_COPY.metadata.pricing.description,
  alternates: {
    canonical: 'https://mercianwealth.com/pricing',
  },
  openGraph: {
    title: SITE_COPY.metadata.pricing.title,
    description: SITE_COPY.metadata.pricing.description,
    url: 'https://mercianwealth.com/pricing',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Storefront Packages & Growth Retainers',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.pricing.title,
    description: SITE_COPY.metadata.pricing.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default async function PricingPage() {
  const { setupTiers, retainerTiers, revenueShareTiers } = await getPricingTiers()
  const data = SITE_COPY.pricingPage

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Mercian Wealth Storefront & Intake Pricing Packages",
    "description": "Transparent one-time setup packages and optional managed growth retainers for UK local businesses.",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Practice Core (Base entry)",
        "price": "595",
        "priceCurrency": "GBP",
        "description": "Sub-second mobile-first practice hub, partner call/email routing, MTD/ICAEW trust badges, 100% IP & DNS ownership. £29/mo managed hosting, 48-hour delivery.",
        "url": "https://mercianwealth.com/pricing",
      },
      {
        "@type": "Offer",
        "name": "Practice Growth OS (Sales Prof Tier)",
        "price": "1495",
        "priceCurrency": "GBP",
        "description": "60-second inbound enquiry triage, Calendly/Google/Outlook booking sync, instant WhatsApp partner dispatches, CRM lead routing. £49/mo managed infrastructure, 7-10 days delivery.",
        "url": "https://mercianwealth.com/pricing",
      },
      {
        "@type": "Offer",
        "name": "Institutional Practice Engine",
        "price": "4995",
        "priceCurrency": "GBP",
        "description": "Bespoke multi-office infrastructure (WealthWise tier), custom tax/dividend estimators, client portal & practice management routing. £99/mo managed hosting, staged sprints delivery.",
        "url": "https://mercianwealth.com/pricing",
      },
      {
        "@type": "Offer",
        "name": "Bespoke Practice Architecture",
        "price": "Custom Scope",
        "priceCurrency": "GBP",
        "description": "Custom enterprise practice infrastructure for multi-partner groups and multi-office firms with custom Karbon/Iris/AccountancyManager integrations.",
        "url": "https://mercianwealth.com/pricing",
      },
    ]
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <Navbar />
      <PageHeader 
        title={data.headerTitle}
        highlight={data.headerHighlight}
        subtitle={data.headerSubtitle}
      />
      <Suspense fallback={<div className="py-20 text-center text-accent-gold font-mono text-sm">Loading Pricing Systems...</div>}>
        <Pricing setupTiers={setupTiers} retainerTiers={retainerTiers} revenueShareTiers={revenueShareTiers} />
      </Suspense>
      
      {/* SLA & Performance Guarantees Section */}
      <section className="relative py-16 bg-bg-secondary border-y border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">
            {data.performanceSLATitle}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {data.performanceSLASubtitle}
          </h3>
          <p className="font-sans text-sm text-text-primary opacity-80 max-w-2xl mx-auto leading-relaxed">
            {data.performanceSLAParagraph}
          </p>
        </div>
      </section>

      {data.insight && <EditorialInsight data={data.insight} />}
      {data.faq && <PageFAQ data={data.faq} />}
      <CTA />
      <Footer />
    </main>
  )
}
