import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { 
  ApproachSection, 
  StorefrontsSection, 
  AutomationSection, 
  TriageSection, 
  WorkTeaserSection, 
  ClosingCTASection 
} from "@/components/cerbo-style-homepage"
import { OfferMechanism } from "@/components/offer-mechanism"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"

const ViewportHUD = dynamic(() => import("@/components/hud/viewport-hud").then((mod) => mod.ViewportHUD))
const WealthParticleCore = dynamic(() => import("@/components/three/wealth-particle-core").then((mod) => mod.WealthParticleCore))

import { SITE_COPY } from "@/lib/site-copy"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: SITE_COPY.metadata.home.title,
  description: SITE_COPY.metadata.home.description,
  alternates: {
    canonical: "https://mercianwealth.com",
  },
  openGraph: {
    title: SITE_COPY.metadata.home.title,
    description: SITE_COPY.metadata.home.description,
    url: "https://mercianwealth.com",
    siteName: "Mercian Wealth Automation",
    images: [
      {
        url: "/Logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "Mercian Wealth Automation | Mobile Storefronts & Booking Engines for UK Local Businesses",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_COPY.metadata.home.title,
    description: SITE_COPY.metadata.home.description,
    images: ["/Logo2.jpeg"],
    creator: "@mercianwealth",
  },
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#070709] text-white overflow-x-clip font-sans selection:bg-[#E2B857] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://mercianwealth.com/#webpage",
            "url": "https://mercianwealth.com",
            "name": "Mercian Wealth Automation | Conversion Infrastructure & Mobile Storefronts",
            "description": "Sub-second mobile storefronts, 3-tap booking builders, instant WhatsApp lead capture, and upfront Stripe deposit collection for UK businesses.",
          }),
        }}
      />

      {/* Persistent Full-Viewport 3D WebGL Canvas */}
      <WealthParticleCore />

      {/* Global Viewport HUD & Telemetry */}
      <ViewportHUD />

      {/* Persistent Minimalist Single-Row Navigation */}
      <Navbar />

      {/* 8 Clean Stage-Aligned Sections */}
      <div className="relative z-10">
        {/* SEC 01 · Hero (Left Stacked H1, 3D Crest Center, Scroll Hint) */}
        <Hero />

        {/* SEC 02 · Approach (First the why, then the code) */}
        <ApproachSection />

        {/* SEC 03 · 01 Bespoke Storefronts (Turn visitors into enquiries) */}
        <StorefrontsSection />

        {/* SEC 04 · 02 Workflow Automation (Repetitive work, done by computer) */}
        <AutomationSection />

        {/* SEC 05 · 03 Speed-to-Lead (An assistant that knows your business) */}
        <TriageSection />

        {/* SEC 06 · Selected Deployments (Tools that really work) */}
        <WorkTeaserSection />

        {/* SEC 07 · The Method (2x2 Frosted Glass Cards with Client Sovereignty) */}
        <OfferMechanism />

        {/* SEC 08 · Closing CTA (Let's Talk over Centered 3D Crest) */}
        <ClosingCTASection />
      </div>

      {/* Minimalist 2-Row Footer */}
      <Footer />
    </main>
  )
}
