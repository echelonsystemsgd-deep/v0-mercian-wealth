import { Navbar } from "@/components/navbar"
import { Process } from "@/components/process"
import { FAQHome } from "@/components/faq-home"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

import { SITE_COPY } from "@/lib/site-copy"

import type { Metadata } from "next"
import { EditorialInsight } from "@/components/editorial-insight"
import { PageFAQ } from "@/components/page-faq"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.process.title,
  description: SITE_COPY.metadata.process.description,
  alternates: {
    canonical: 'https://mercianwealth.com/process',
  },
  openGraph: {
    title: SITE_COPY.metadata.process.title,
    description: SITE_COPY.metadata.process.description,
    url: 'https://mercianwealth.com/process',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | 7-Day Storefront Deployment Protocol',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.process.title,
    description: SITE_COPY.metadata.process.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default function ProcessPage() {
  const data = SITE_COPY.processPage

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "7-Day Local Storefront Deployment Protocol",
    "description": "How Mercian Wealth deploys a custom 3-tap mobile storefront and deposit builder in 7 business days with zero downtime.",
    "totalTime": "P7D",
    "step": data.steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.title,
      "text": step.details || step.sub,
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Navbar />
      <PageHeader 
        title={data.headerTitle}
        highlight={data.headerHighlight}
        subtitle={data.headerSubtitle}
      />
      <Process />
      {data.insight && <EditorialInsight data={data.insight} />}
      {data.faq && <PageFAQ data={data.faq} />}
      <CTA />
      <Footer />
    </main>
  )
}
