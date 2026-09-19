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
        "name": "Essential Storefront",
        "price": "495",
        "priceCurrency": "GBP",
        "description": "High-converting 3-page digital storefront engineered for speed, Google Maps visibility, and instant quote capture.",
        "url": "https://mercianwealth.com/pricing",
      },
      {
        "@type": "Offer",
        "name": "Pro Order Builder",
        "price": "995",
        "priceCurrency": "GBP",
        "description": "Complete order intake and booking engine with deposit checkout, CRM lead management, and automated customer notifications.",
        "url": "https://mercianwealth.com/pricing",
      },
      {
        "@type": "Offer",
        "name": "Full Custom Build",
        "price": "1995",
        "priceCurrency": "GBP",
        "description": "End-to-end bespoke operational system for multi-service or multi-location businesses needing connected digital infrastructure.",
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
