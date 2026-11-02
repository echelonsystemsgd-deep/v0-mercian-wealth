import { Navbar } from "@/components/navbar"
import { Portfolio } from "@/components/portfolio"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

import { SITE_COPY } from "@/lib/site-copy"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.portfolio.title,
  description: SITE_COPY.metadata.portfolio.description,
  alternates: {
    canonical: 'https://mercianwealth.com/portfolio',
  },
  openGraph: {
    title: SITE_COPY.metadata.portfolio.title,
    description: SITE_COPY.metadata.portfolio.description,
    url: 'https://mercianwealth.com/portfolio',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Live Prototypes & Client Deployments',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.portfolio.title,
    description: SITE_COPY.metadata.portfolio.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default function PortfolioPage() {
  const data = SITE_COPY.portfolioPage

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Mercian Wealth Client Case Studies & Interactive Prototypes",
    "description": "Live interactive order sandboxes and digital storefronts engineered for UK local businesses.",
    "url": "https://mercianwealth.com/portfolio",
    "provider": {
      "@id": "https://mercianwealth.com/#organization"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "position": 1,
          "name": "WealthWise Advisory & Private Wealth · Multi-Partner Platform",
          "description": "Sub-second load time, corporate tax triage, and partner routing.",
        },
        {
          "@type": "CreativeWork",
          "position": 2,
          "name": "Raw Accounting & Advisory · Client Intake Engine",
          "description": "60-second inbound lead triage and two-way Calendly diary sync.",
        },
        {
          "@type": "CreativeWork",
          "position": 3,
          "name": "Goringe Practice Engine · Corporate Retainer Hub",
          "description": "48-hour practice hub deployment and MTD compliance alignment.",
        },
      ]
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <Navbar />
      <PageHeader 
        title={data.headerTitle}
        highlight={data.headerHighlight}
        subtitle={data.headerSubtitle}
      />
      <Portfolio />
      <CTA />
      <Footer />
    </main>
  )
}
