import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhatChanged } from "@/components/what-changed"
import { Bottleneck } from "@/components/bottleneck"
import { OfferMechanism } from "@/components/offer-mechanism"
import { InteractiveAutomationFlow } from "@/components/interactive-automation-flow"
import { Portfolio } from "@/components/portfolio"
import { ProofCaseStudies } from "@/components/proof-case-studies"
import { WhyMercianWealth } from "@/components/why-mercian-wealth"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { ChapterTracker } from "@/components/chapter-tracker"
import { PrototypeRequestModal } from "@/components/prototype-request-modal"
import { ZeroDisruptionGuarantee } from "@/components/zero-disruption"
import { FAQHome } from "@/components/faq-home"
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
                "description": "24/7 AI Voice Receptionists, Enquiry Chatbots, and Workflow Automation for UK Businesses. See a working prototype before committing.",
                "publisher": {
                  "@id": "https://mercianwealth.com/#organization"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://mercianwealth.com/#webpage",
                "url": "https://mercianwealth.com",
                "name": "Mercian Wealth | AI Voice, Chatbots & Automation Infrastructure",
                "isPartOf": {
                  "@id": "https://mercianwealth.com/#website"
                },
                "about": {
                  "@id": "https://mercianwealth.com/#organization"
                },
                "description": "24/7 AI Voice Receptionists, Enquiry Chatbots, and Workflow Automation for UK Businesses. See a working prototype before committing."
              }
            ]
          })
        }}
      />
      
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Outcomes Hero Section */}
      <Hero />

      {/* 3. SYSTEM I · What Changed (4 Market Shifts) */}
      <WhatChanged />

      {/* 4. SYSTEM II · Revenue Haemorrhage (The 4 Leakage Categories) */}
      <Bottleneck />

      {/* Zero-Disruption Guarantee */}
      <ZeroDisruptionGuarantee />

      {/* 5. SYSTEM III · The Offer Protocol (Prototype-First 3-Step Sequence) */}
      <OfferMechanism />

      {/* SYSTEM IV-B · Autonomous 4-Step Revenue Chain Visualizer */}
      <InteractiveAutomationFlow />

      {/* 6. SYSTEM IV · AI Systems & Deployments Showcase */}
      <Portfolio />

      {/* 7. SYSTEM V · Verified Proof (Commercial Trade + Aesthetics Deployments) */}
      <ProofCaseStudies />

      {/* 8. SYSTEM VI · Operator & Founder Commitment */}
      <WhyMercianWealth />

      {/* 9. SYSTEM VII · Retainer Terms & Transparent Pricing */}
      <Suspense fallback={<div className="py-20 text-center text-[#DCAE53] font-mono text-sm">Loading Solutions & Retainer Pricing...</div>}>
        <Pricing isHomepage={true} setupTiers={setupTiers} retainerTiers={retainerTiers} />
      </Suspense>

      {/* Frequently Asked Questions with FAQPage Schema */}
      <FAQHome />

      {/* 10. SYSTEM VIII · Closing Prototype CTA & Footer */}
      <CTA />
      <Footer />

      {/* Floating Systems Tracking Pill */}
      <ChapterTracker />

      {/* 3-Field Prototype Request Modal */}
      <PrototypeRequestModal />

      {/* Bottom-Left Questions Assistant (Hidden on mobile <640px) */}
      <FloatingAiConcierge />
    </main>
  )
}
