import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Mail, Phone, Clock, ArrowRight } from "lucide-react"
import { CopyEmailButton } from "@/components/copy-email-button"

import { SITE_COPY } from "@/lib/site-copy"

import type { Metadata } from "next"
import { PageFAQ } from "@/components/page-faq"

export const metadata: Metadata = {
  title: SITE_COPY.metadata.contact.title,
  description: SITE_COPY.metadata.contact.description,
  alternates: {
    canonical: 'https://mercianwealth.com/contact',
  },
  openGraph: {
    title: SITE_COPY.metadata.contact.title,
    description: SITE_COPY.metadata.contact.description,
    url: 'https://mercianwealth.com/contact',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | Direct WhatsApp & Engineering Gateway',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.contact.title,
    description: SITE_COPY.metadata.contact.description,
    images: ['/og-image.jpg'],
    creator: '@mercianwealth',
  },
}

export default function ContactPage() {
  const data = SITE_COPY.contactPage

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mercian Wealth",
    "description": "Connect directly with our UK engineering team via WhatsApp, phone, or direct email.",
    "url": "https://mercianwealth.com/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "@id": "https://mercianwealth.com/#organization",
      "name": "Mercian Wealth",
      "url": "https://mercianwealth.com",
      "telephone": "+447851055929",
      "email": process.env.CONTACT_EMAIL || "",
      "image": "https://mercianwealth.com/NewLogo.png",
      "disambiguatingDescription": "Mercian Wealth provides practice infrastructure, client acquisition engineering, and speed-to-lead automation for UK accountancy firms and professional service practices.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Reading",
        "addressRegion": "Berkshire",
        "addressCountry": "GB"
      }
    },
  }

  return (
    <main className="min-h-screen bg-[#030206] text-zinc-100 overflow-x-clip font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />
      
      <PageHeader 
        title={data.headerTitle}
        highlight={data.headerHighlight}
        subtitle={data.headerSubtitle}
      />

      <section className="relative pb-24 lg:pb-32 overflow-hidden bg-[#030206]">
        {/* Background Royal Purple Atmosphere */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/10 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Contacts */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] font-mono">
                  [ {data.supportEyebrow} ]
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white uppercase leading-tight tracking-wide">
                  {data.supportTitle}
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
                  {data.supportDescription}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                {process.env.CONTACT_EMAIL && (
                  <CopyEmailButton email={process.env.CONTACT_EMAIL} variant="card" />
                )}

                {/* Phone */}
                <div className="p-5 bg-[#0a0614] border border-white/10 hover:border-[#d4af37]/40 rounded-2xl transition-all duration-300 flex items-start gap-4 shadow-lg">
                  <div className="p-3 rounded-xl bg-[#130a24] border border-white/10 text-[#d4af37] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">{data.phoneLabel}</p>
                    <a href="tel:+447851055929" className="text-sm font-semibold text-white hover:text-[#d4af37] transition-colors font-mono">
                      +44 7851 055929
                    </a>
                    <a href="https://wa.me/447851055929?text=Hi%20Mercian%20Wealth,%20I'd%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer nofollow" className="block text-xs text-[#d4af37] hover:underline mt-1 font-mono">
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="p-5 bg-[#0a0614] border border-white/10 hover:border-[#b794f6]/40 rounded-2xl transition-all duration-300 flex items-start gap-4 shadow-lg">
                  <div className="p-3 rounded-xl bg-[#130a24] border border-white/10 text-[#b794f6] shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">{data.slaLabel}</p>
                    <p className="text-sm font-semibold text-white">
                      {data.slaValue}
                    </p>
                  </div>
                </div>
              </div>

              {/* What to expect list */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">{data.whatsNextTitle}</h4>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <span className="text-[#d4af37]">✦</span> {data.whatsNextItems[0]}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#d4af37]">✦</span> {data.whatsNextItems[1]}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#d4af37]">✦</span> {data.whatsNextItems[2]}
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 w-full">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {data.faq && <PageFAQ data={data.faq} />}

      <Footer />
    </main>
  )
}

