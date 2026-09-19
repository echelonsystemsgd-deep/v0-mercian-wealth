import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FieldSalesDemo } from "@/components/local/field-sales-demo"
import { BrandLogo } from "@/components/brand-logo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Local Business Order Engine Demo | Mercian Wealth",
  description: "Interactive 3-tap order builder, instant WhatsApp alerts, and Google review automation live demo for local businesses.",
  alternates: {
    canonical: 'https://mercianwealth.com/local',
  },
  openGraph: {
    title: "Local Business Order Engine Demo | Mercian Wealth",
    description: "Interactive 3-tap order builder, instant WhatsApp alerts, and Google review automation live demo for local businesses.",
    url: 'https://mercianwealth.com/local',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Local Business Order Engine Demo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Local Business Order Engine Demo | Mercian Wealth",
    description: "Interactive 3-tap order builder, instant WhatsApp alerts, and Google review automation live demo for local businesses.",
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
}

export default function LocalPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Background Watermark */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10 pointer-events-none mix-blend-screen z-0">
        <BrandLogo variant="watermark" fill className="object-contain" priority />
      </div>

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] text-xs font-mono font-medium uppercase tracking-wider mb-4">
          Local Field Sales Demo
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Test The <span className="text-[#DAA640]">Sub-60s Local Order Engine</span> Live.
        </h1>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-10">
          See exactly how a customer places a custom deposit or service request in 3 taps while you receive an instant phone notification.
        </p>

        <FieldSalesDemo />
      </section>

      <Footer />
    </main>
  )
}
