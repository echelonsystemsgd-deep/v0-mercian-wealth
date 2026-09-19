import { Navbar } from "@/components/navbar"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import type { Metadata } from "next"

import { SITE_COPY } from "@/lib/site-copy"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.testimonials.title,
  description: SITE_COPY.metadata.testimonials.description,
  alternates: {
    canonical: 'https://mercianwealth.com/cohort-status',
  },
  openGraph: {
    title: SITE_COPY.metadata.testimonials.title,
    description: SITE_COPY.metadata.testimonials.description,
    url: 'https://mercianwealth.com/cohort-status',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Operational Outcomes & Verified Client Data',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.testimonials.title,
    description: SITE_COPY.metadata.testimonials.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default function CohortStatusPage() {
  const data = SITE_COPY.testimonialsPage
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        title={data.headerTitle}
        highlight={data.headerHighlight}
        subtitle={data.headerSubtitle}
      />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
