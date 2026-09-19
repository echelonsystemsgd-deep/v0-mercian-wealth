import { Navbar } from "@/components/navbar"
import { Services } from "@/components/services"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

import { SITE_COPY } from "@/lib/site-copy"

import type { Metadata } from "next"
import { EditorialInsight } from "@/components/editorial-insight"
import { PageFAQ } from "@/components/page-faq"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.services.title,
  description: SITE_COPY.metadata.services.description,
  alternates: {
    canonical: 'https://mercianwealth.com/services',
  },
  openGraph: {
    title: SITE_COPY.metadata.services.title,
    description: SITE_COPY.metadata.services.description,
    url: 'https://mercianwealth.com/services',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Booking Engines, Storefronts & Growth Systems',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.services.title,
    description: SITE_COPY.metadata.services.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default function ServicesPage() {
  const data = SITE_COPY.servicesPage

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://mercianwealth.com/services#service",
    "name": "Mobile Storefronts & 3-Tap Booking Systems",
    "provider": {
      "@id": "https://mercianwealth.com/#organization"
    },
    "serviceType": "Digital Storefront & Booking Infrastructure",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "description": "Sub-second mobile storefronts, 3-tap order builders, instant WhatsApp lead capture, and upfront deposit engines for UK local businesses.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Local Business Growth Systems",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Converting Mobile Storefronts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "3-Tap Booking & Order Builders"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Upfront Stripe Deposit Collection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instant WhatsApp Lead Alerts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automated Google Review Systems"
          }
        }
      ]
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <PageHeader 
        title={data.headerTitle}
        highlight={data.headerHighlight}
        subtitle={data.headerSubtitle}
      />
      <Services />
      {data.insight && <EditorialInsight data={data.insight} />}
      {data.faq && <PageFAQ data={data.faq} />}
      <CTA />
      <Footer />
    </main>
  )
}
