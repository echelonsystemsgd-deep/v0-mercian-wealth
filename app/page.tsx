import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/home/problem-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhyBespokeSection } from "@/components/home/why-bespoke-section"
import { ExperienceDemoSection } from "@/components/home/experience-demo-section"
import { AutomationSection } from "@/components/home/automation-section"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { ComparisonSection } from "@/components/home/comparison-section"
import { ProcessSection } from "@/components/home/process-section"
import { FAQSection } from "@/components/home/faq-section"
import { FinalContactSection } from "@/components/home/final-contact-section"
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
        url: "/NewLogo.png",
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
    images: ["/NewLogo.png"],
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

      {/* Persistent Full-Viewport 3D WebGL Canvas (Navy, Black & Gold) */}
      <WealthParticleCore />

      {/* Global Viewport HUD & Telemetry (11 Stages) */}
      <ViewportHUD />

      {/* Persistent Minimalist Single-Row Navigation */}
      <Navbar />

      {/* 11 Unified Conversion-Driven Sections */}
      <div className="relative z-10">
        {/* SEC 01 · Hero */}
        <Hero />

        {/* SEC 02 · The Perspective / Problem */}
        <ProblemSection />

        {/* SEC 03 · What We Do */}
        <ServicesSection />

        {/* SEC 04 · Why a Bespoke Website? */}
        <WhyBespokeSection />

        {/* SEC 05 · Visual Demonstration */}
        <ExperienceDemoSection />

        {/* SEC 06 · Digital Automation */}
        <AutomationSection />

        {/* SEC 07 · Selected Deployments / Portfolio */}
        <PortfolioSection />

        {/* SEC 08 · The Comparison (Two Paths) */}
        <ComparisonSection />

        {/* SEC 09 · Our Method / Process */}
        <ProcessSection />

        {/* SEC 10 · Frequently Asked Questions */}
        <FAQSection />

        {/* SEC 11 · Final Contact */}
        <FinalContactSection />
      </div>

      {/* Sophisticated Luxury Footer */}
      <Footer />
    </main>
  )
}
