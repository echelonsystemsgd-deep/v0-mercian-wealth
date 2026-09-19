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
          "name": "VEYRA — Solid Cast Permanent Jewellery",
          "description": "Luxury 3D e-commerce and interactive booking sandbox.",
        },
        {
          "@type": "CreativeWork",
          "position": 2,
          "name": "Vanguard Construction — Extensions & Conversions",
          "description": "Instant project quote and deposit calculation engine.",
        },
        {
          "@type": "CreativeWork",
          "position": 3,
          "name": "AURĒLIA Longevity Atelier",
          "description": "Private clinic consultation intake and reservation flow.",
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
