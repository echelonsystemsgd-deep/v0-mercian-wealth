import type { Metadata } from 'next'
import { Inter, Geist_Mono, Cinzel } from 'next/font/google'
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
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mercianwealth.com'),
  title: {
    default: 'Mercian Wealth · Bespoke Websites & High-Performance Architecture',
    template: '%s · Mercian Wealth',
  },
  description: 'We create bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.',
  applicationName: 'Mercian Wealth',
  keywords: [
    "bespoke website design UK",
    "high-performance web architecture",
    "Three.js particle websites",
    "conversion-focused web design",
    "mobile storefronts UK",
    "practice infrastructure UK",
    "speed to lead automation",
    "Mercian Wealth"
  ],
  authors: [{ name: 'Mercian Wealth' }],
  creator: 'Mercian Wealth',
  publisher: 'Mercian Wealth',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://mercianwealth.com',
  },
  openGraph: {
    title: 'Mercian Wealth · Bespoke Websites & High-Performance Architecture',
    description: 'We create bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.',
    url: 'https://mercianwealth.com',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth · Bespoke Websites & High-Performance Digital Architecture',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercian Wealth · Bespoke Websites & High-Performance Architecture',
    description: 'We create bespoke digital experiences designed around your business, strengthening your online presence and turning visitors into meaningful enquiries.',
    images: ['/og-image.jpg'],
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'preconnect-calendly': 'https://calendly.com',
    'preconnect-calendly-assets': 'https://assets.calendly.com',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: '#030206',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'Organization', 'LocalBusiness'],
      '@id': 'https://mercianwealth.com/#organization',
      name: 'Mercian Wealth',
      legalName: 'Mercian Wealth Ltd',
      url: 'https://mercianwealth.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://mercianwealth.com/#logo',
        url: 'https://mercianwealth.com/NewLogo.png',
        caption: 'Mercian Wealth',
      },
      image: 'https://mercianwealth.com/og-image.jpg',
      telephone: '+447851055929',
      email: 'info@mercianwealth.com',
      priceRange: '££££',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Reading',
        addressRegion: 'Berkshire',
        postalCode: 'RG1',
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
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '18:00',
        },
      ],
      description: 'Bespoke digital experiences, interactive WebGL particle systems, and high-converting website architecture engineered for commercial enterprises across the United Kingdom.',
      disambiguatingDescription: 'Mercian Wealth is a bespoke website design, engineering, and digital architecture studio based in Berkshire, UK.',
      sameAs: [
        'https://wa.me/447851055929',
        'https://www.instagram.com/mercianwealth/'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Architecture & Web Engineering Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bespoke Website Design & Development',
              description: 'Custom, high-performance websites engineered for authority, speed, and conversion.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interactive 3D & WebGL Experiences',
              description: 'Cinematic particle engines, scroll-driven narratives, and bespoke WebGL interactions.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Digital Conversion Infrastructure',
              description: 'Sub-second mobile performance, instant lead routing, and friction-free intake architecture.'
            }
          }
        ]
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mercianwealth.com/#website',
      url: 'https://mercianwealth.com',
      name: 'Mercian Wealth',
      alternateName: 'Mercian Wealth Architecture',
      publisher: {
        '@id': 'https://mercianwealth.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://mercianwealth.com/?s={search_term_string}',
        'query-input': 'required name=search_term_string'
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
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${cinzel.variable} bg-[#030206]`} suppressHydrationWarning>
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
      <body className="font-sans antialiased bg-[#030206] text-white">
        <ExtensionErrorHandler />
        {children}
        <StickyCTAButton />
        <ScrollToTop />
        <Toaster position="top-right" theme="dark" richColors closeButton />
        <Watermark position="center" opacity={0.15} />
        <TabRetention />
        <WhatsAppButton />
        {(process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_VERCEL_ENV) && <Analytics />}
        <CalendlyInit />
      </body>
    </html>
  )
}
