import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { UnifiedOperationsSandbox } from "@/components/unified-operations-sandbox"
import { CapabilitiesBento } from "@/components/capabilities-bento"
import { DivergenceComparison } from "@/components/divergence-comparison"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { FloatingAiConcierge } from "@/components/floating-ai-concierge"
import { getPricingTiers } from "@/lib/pricing"
import { Suspense } from "react"

export const revalidate = 60

export default async function Home() {
  const { setupTiers, retainerTiers } = await getPricingTiers()
  return (
    <main className="min-h-screen bg-[#09090B] text-slate-100 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://mercianwealth.com/#organization",
                "name": "Mercian Wealth",
                "url": "https://mercianwealth.com",
                "logo": {
                  "@type": "ImageObject",
                  "@id": "https://mercianwealth.com/#logo",
                  "url": "https://mercianwealth.com/Logo2.jpeg",
                  "caption": "Mercian Wealth"
                },
                "image": {
                  "@id": "https://mercianwealth.com/#logo"
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://mercianwealth.com/#website",
                "url": "https://mercianwealth.com",
                "name": "Mercian Wealth",
                "description": "24/7 Sub-500ms AI Voice Phone Agents, Spatial Fleet Dispatch, 3D Spatial E-Commerce & Multi-Agent Operations Infrastructure for High-Ticket UK Enterprises.",
                "publisher": {
                  "@id": "https://mercianwealth.com/#organization"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://mercianwealth.com/#webpage",
                "url": "https://mercianwealth.com",
                "name": "Mercian Wealth | Autonomous AI Voice, 3D Storefronts & Workflow Operations",
                "isPartOf": {
                  "@id": "https://mercianwealth.com/#website"
                },
                "about": {
                  "@id": "https://mercianwealth.com/#organization"
                },
                "description": "24/7 Sub-500ms AI Voice Phone Agents, Spatial Fleet Dispatch, 3D Spatial E-Commerce & Multi-Agent Operations Infrastructure for High-Ticket UK Enterprises."
              }
            ]
          })
        }}
      />
      
      {/* 1. Solid Floating Pill Header */}
      <Navbar />

      {/* 2. Spectacular Hero Section */}
      <Hero />

      {/* 3. Flagship Unified Operations Command Center (Voice Audio, 3D WebGL, Dispatch, ROI) */}
      <UnifiedOperationsSandbox />

      {/* 4. The 4 Enterprise Operations Pillars (Bento Grid) */}
      <CapabilitiesBento />

      {/* 5. Autonomous Operations vs Human Lag */}
      <DivergenceComparison />

      {/* 6. Managed Operations Retainers & Pricing */}
      <Suspense fallback={<div className="py-20 text-center text-[#DCAE53] font-mono text-sm">Loading Solutions & Retainer Pricing...</div>}>
        <Pricing isHomepage={true} setupTiers={setupTiers} retainerTiers={retainerTiers} />
      </Suspense>

      {/* 7. Diagnostic Voice Audit CTA & Footer */}
      <CTA />
      <Footer />

      {/* Live Floating AI Concierge Drawer */}
      <FloatingAiConcierge />
    </main>
  )
}
