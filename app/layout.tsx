import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CalendlyInit } from '@/components/calendly-init'
import './globals.css'
import { StickyCTAButton } from '@/components/sticky-cta-button'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Watermark } from '@/components/watermark'
import { TabRetention } from '@/components/tab-retention'
import { Toaster } from '@/components/ui/sonner'
import { SITE_COPY } from '@/lib/site-copy'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ExtensionErrorHandler } from '@/components/extension-error-handler'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mercianwealth.com'),
  title: {
    default: SITE_COPY.metadata.layout.defaultTitle,
    template: SITE_COPY.metadata.layout.titleTemplate,
  },
  description: SITE_COPY.metadata.layout.description,
  applicationName: 'Mercian Wealth',
  keywords: [
    "high converting websites UK",
    "website creation UK",
    "3-tap booking systems",
    "WhatsApp booking alerts",
    "automated Google review system",
    "local business websites UK",
    "custom web design agency UK",
    "automated booking systems UK",
    "upfront deposit capture websites",
    "lead conversion systems UK"
  ],
  authors: [{ name: 'Mercian Wealth' }],
  creator: 'Mercian Wealth',
  publisher: 'Mercian Wealth',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SITE_COPY.metadata.layout.defaultTitle,
    description: SITE_COPY.metadata.layout.description,
    url: 'https://mercianwealth.com',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth | High-Converting Websites & Booking Systems',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_COPY.metadata.layout.defaultTitle,
    description: SITE_COPY.metadata.layout.description,
    images: ['/Logo2.jpeg'],
    creator: '@mercianwealth',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/Logo1.jpeg', type: 'image/jpeg' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/Logo1.jpeg',
    apple: '/Logo1.jpeg',
  },
  // DNS prefetch for Calendly embed (reduces first-load delay by ~150–200 ms)
  other: {
    'preconnect-calendly': 'https://calendly.com',
    'preconnect-calendly-assets': 'https://assets.calendly.com',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  // Do NOT set maximumScale or userScalable — browser default allows pinch-zoom
  viewportFit: 'cover',
  themeColor: '#09090B',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mercian Wealth',
  image: 'https://mercianwealth.com/Logo2.jpeg',
  '@id': 'https://mercianwealth.com/#organization',
  url: 'https://mercianwealth.com',
  telephone: '+447851055929',
  priceRange: '£495 - £1,495',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4862,
    longitude: -1.8904,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '00:00',
    closes: '23:59'
  },
  description: 'Mobile storefronts, 3-tap booking builders, instant WhatsApp alerts, and automated Google review systems for premier local businesses and service operators across Berkshire & the UK.',
  sameAs: [
    'https://wa.me/447851055929'
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-[#09090B]`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event && event.reason;
                  var str = (typeof reason === 'string' ? reason : (reason && (reason.message || reason.stack))) || '';
                  if (str.indexOf('MetaMask') !== -1 || str.indexOf('chrome-extension://') !== -1 || str.indexOf('inpage.js') !== -1) {
                    event.preventDefault();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                  }
                }, true);
                window.addEventListener('error', function(event) {
                  var fn = (event && event.filename) || '';
                  var msg = (event && event.message) || '';
                  if (fn.indexOf('chrome-extension://') !== -1 || fn.indexOf('inpage.js') !== -1 || msg.indexOf('MetaMask') !== -1) {
                    event.preventDefault();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                  }
                }, true);
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#09090B] text-white">
          <ExtensionErrorHandler />
          {children}
          <StickyCTAButton />
          <ScrollToTop />
        <Toaster position="top-right" theme="dark" richColors closeButton />
        <Watermark position="center" opacity={0.15} />
        <TabRetention />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {/*
          Calendly widget.js — loaded at root so it is available for both:
          1. The inline embed on /book (step 2)
          2. CalendlyPopupButton on any marketing page
        */}
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
        <CalendlyInit />
      </body>
    </html>
  )
}
