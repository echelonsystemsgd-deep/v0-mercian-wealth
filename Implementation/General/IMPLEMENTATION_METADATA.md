# Implementation Plan: Metadata & SEO Architecture (Mercian Wealth)

This document outlines the complete metadata strategy, social preview assets, and SEO architecture for the rebuilt Mercian Wealth web platform.

## Goal
Establish clean, high-performance metadata, search engine indexing directives, and rich social preview cards (Open Graph & Twitter Cards) centered around **Mercian Wealth: Storefronts, Automation & Growth Systems for Local Businesses**.

---

## 1. Social Preview Cards & Asset Placement

Next.js 16 App Router handles Open Graph and Twitter share previews via high-resolution assets in the `app/` and `public/` directories:

* **Preview Assets:**
  * `app/opengraph-image.png` (1200x630px) — Social card for LinkedIn, Facebook, iMessage, WhatsApp, Discord.
  * `app/twitter-image.png` (1200x630px) — Social card optimized for X/Twitter previews.
  * `app/icon.jpeg` & `app/apple-icon.jpeg` — PWA and mobile bookmark icons.
  * `app/favicon.ico` — Standard browser favicon based on `logo1.png`.

---

## 2. Global Metadata in `app/layout.tsx`

The root layout configuration provides unified SEO properties with clean fallbacks:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://mercianwealth.com'),
  title: {
    default: 'Mercian Wealth · Storefronts, Automation & Growth for Local Businesses',
    template: '%s · Mercian Wealth',
  },
  description:
    'We build sub-second mobile storefronts, 3-tap order builders, instant WhatsApp alerts, and automated Google review systems for bakeries, catering businesses, food artisans, and local services across Berkshire & the UK.',
  applicationName: 'Mercian Wealth',
  keywords: [
    'Mobile Storefronts',
    'WhatsApp Order Automation',
    'Bakery Ordering Systems',
    'Catering Booking Engine',
    'Food Artisan Storefronts',
    'Berkshire Local Business Automation',
    'Google Review Automation',
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
    title: 'Mercian Wealth · Storefronts, Automation & Growth for Local Businesses',
    description:
      'We build sub-second mobile storefronts, 3-tap order builders, instant WhatsApp alerts, and automated Google review systems for bakeries, catering businesses, food artisans, and local services across Berkshire & the UK.',
    url: 'https://mercianwealth.com',
    siteName: 'Mercian Wealth',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Mercian Wealth — Storefronts, Automation & Growth for Local Businesses',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercian Wealth · Storefronts, Automation & Growth for Local Businesses',
    description:
      'We build sub-second mobile storefronts, 3-tap order builders, instant WhatsApp alerts, and automated Google review systems for local food artisans and service businesses.',
    images: ['/twitter-image.png'],
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
}
```

---

## 3. Page-Specific Metadata Hierarchy

Each subpage dynamically merges with global metadata via [lib/site-copy.ts](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/lib/site-copy.ts):
- `/services` — What We Build (Mobile Storefronts, 3-Tap Builders, WhatsApp Dispatch, 5-Star Reviews)
- `/process` — 7-Day Launch Protocol
- `/portfolio` — Interactive Sandbox Prototypes
- `/pricing` — Transparent GBP (£495 – £1,450) Tiered Pricing
- `/contact` — Berkshire Direct Contact & WhatsApp Gateway
- `/book` — 15-Minute Diagnostic Audit

---

## 4. Verification & Status

* ✅ **Canonical Palette:** Matte Charcoal (`#09090B`) and Solid Gold (`#DCAE53`).
* ✅ **Zero 404s & Broken Links:** All navigation, auth routes, and aliases configured in `next.config.mjs`.
* ✅ **Production Build:** Verified with `npx next build` (65/65 routes compiled with 0 errors).
