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
  applicationName: 'Mercian Wealth Automation',
  keywords: [
    "mobile storefronts UK",
    "3-tap booking builder",
    "WhatsApp lead capture UK",
    "upfront deposit collection",
    "local business websites UK",
    "accounting practice client intake",
    "accountant deadline chasing automation",
    "automated Google review systems",
    "trade contractor quote engines",
    "bakery order builder UK",
    "local SEO structured schema",
    "speed to lead automation"
  ],
  authors: [{ name: 'Mercian Wealth Automation' }],
  creator: 'Mercian Wealth Automation',
  publisher: 'Mercian Wealth Automation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://mercianwealth.com',
  },
  openGraph: {
    title: SITE_COPY.metadata.layout.defaultTitle,
    description: SITE_COPY.metadata.layout.description,
    url: 'https://mercianwealth.com',
    siteName: 'Mercian Wealth Automation',
    images: [
      {
        url: '/Logo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth Automation | Mobile Storefronts & Practice Infrastructure for UK Businesses & Accountants',
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
  '@graph': [
    {
      '@type': ['ProfessionalService', 'Organization'],
      '@id': 'https://mercianwealth.com/#organization',
      name: 'Mercian Wealth Automation',
      legalName: 'Mercian Wealth Automation',
      url: 'https://mercianwealth.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://mercianwealth.com/#logo',
        url: 'https://mercianwealth.com/Logo2.jpeg',
        caption: 'Mercian Wealth Automation',
      },
      image: 'https://mercianwealth.com/Logo2.jpeg',
      telephone: '+447851055929',
      ...(process.env.CONTACT_EMAIL ? { email: process.env.CONTACT_EMAIL } : {}),
      priceRange: '£495 - £1,995',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Reading',
        addressRegion: 'Berkshire',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 51.4543,
        longitude: -0.9781,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
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
      description: 'Sub-second mobile storefronts, 3-tap order and booking builders, instant client intake systems, pre-approved deadline chasing engines, and upfront deposit checkout systems for UK local businesses and accounting practices.',
      disambiguatingDescription: 'Mercian Wealth Automation is a digital engineering provider delivering mobile storefronts, 3-tap booking builders, instant client intake, and automated deadline chasing infrastructure for UK commercial businesses and accounting practices. Mercian Wealth is not a wealth management or financial advisory firm.',
      sameAs: [
        'https://wa.me/447851055929',
        'https://www.instagram.com/mercianwealth/',
        ...(process.env.LINKEDIN_URL ? [process.env.LINKEDIN_URL] : [])
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mercianwealth.com/#website',
      url: 'https://mercianwealth.com',
      name: 'Mercian Wealth',
      publisher: {
        '@id': 'https://mercianwealth.com/#organization'
      }
    }
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
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
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
        <CalendlyInit />
      </body>
    </html>
  )
}
