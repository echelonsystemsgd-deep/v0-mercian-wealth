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
import { ViewportHUD } from "@/components/hud/viewport-hud"
import { WealthParticleCore } from "@/components/three/wealth-particle-core"

import { SITE_COPY } from "@/lib/site-copy"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Bespoke Websites. Built to Move Your Business Forward — Mercian Wealth",
  description: "Bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.",
  alternates: {
    canonical: "https://mercianwealth.com",
  },
  openGraph: {
    title: "Bespoke Websites. Built to Move Your Business Forward — Mercian Wealth",
    description: "Bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.",
    url: "https://mercianwealth.com",
    siteName: "Mercian Wealth",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mercian Wealth | Bespoke Digital Experiences & High-Performance Websites",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Websites. Built to Move Your Business Forward — Mercian Wealth",
    description: "Bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.",
    images: ["/og-image.jpg"],
    creator: "@mercianwealth",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030206] text-white overflow-x-clip font-sans selection:bg-[#b794f6] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://mercianwealth.com/#webpage",
            "url": "https://mercianwealth.com",
            "name": "Mercian Wealth | Bespoke Website Design & Development",
            "description": "Bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.",
          }),
        }}
      />

      {/* Persistent Full-Viewport 3D WebGL Canvas (Navy, Black & Gold with Real-Time Morphing) */}
      <WealthParticleCore />

      {/* Global Viewport HUD & Telemetry (8 Cerbo-Structured Sections) */}
      <ViewportHUD />

      {/* Persistent Minimalist Single-Row Navigation */}
      <Navbar />

      {/* 8 Unified Conversion-Driven Sections Matching Cerbo Structure */}
      <div className="relative z-10">
        {/* SEC 01 · Hero */}
        <Hero />

        {/* SEC 02 · The Vision / Approach */}
        <ApproachSection />

        {/* SEC 03 · 01 — Websites and Experiences (3D Wireframe Browser Window) */}
        <StorefrontsSection />

        {/* SEC 04 · 02 — Automation (Interlocking Kinetic Gears) */}
        <AutomationSection />

        {/* SEC 05 · 03 — Intelligence & AI (Trio of 4-Pointed AI Stars) */}
        <TriageSection />

        {/* SEC 06 · 04 — Selected Deployments (3-Column Showcase + Central Vortex) */}
        <WorkTeaserSection />

        {/* SEC 07 · 05 — Method (4-Phase Horizon Grid + 3D Architectural Lattice) */}
        <OfferMechanism />

        {/* SEC 08 · 06 — Let's Talk (Closing Hero-Echo CTA + Centered MW Crest) */}
        <ClosingCTASection />
      </div>

      {/* Sophisticated Luxury Footer */}
      <Footer />
    </main>
  )
}
