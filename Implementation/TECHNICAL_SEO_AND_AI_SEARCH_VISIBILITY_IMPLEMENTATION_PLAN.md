# Technical SEO & AI-Search Visibility Implementation Plan

**Target Application:** `mercianwealth.com`  
**Brand:** Mercian Wealth  
**Headquarters:** Berkshire, United Kingdom (Serving all UK regions)  
**Industry Classification:** Digital Infrastructure, Mobile Storefronts, Booking Engines & Automation for Local Businesses  
**Implementation Date:** September 2026  
**Status:** In Progress / Active  

---

## 1. Executive Summary & Objective

An exhaustive audit of `mercianwealth.com` identified critical visibility barriers spanning traditional search indexing, Schema.org entity disambiguation, on-page search clarity, off-site signals, and AI engine retrieval (Perplexity, ChatGPT Search, Claude, Google Gemini).

### Core Visibility Blockers Identified
1. **Google Indexation Absence:** Public search queries (`site:mercianwealth.com`) return 0 results. The site is currently absent from Google's production index.
2. **Entity Name Collision:** The brand "Mercian Wealth" is actively confused with "Mercian Wealth Management" (`mercianwm.co.uk`, an established St. James's Place financial advisory in Lichfield). Search engines and AI models misclassify the business as financial services.
3. **Schema Fragmentation & Geographic Contradictions:** Schema markup was split across disjointed `<script>` tags with conflicting `@id` entities (`ProfessionalService` vs `Organization`). Furthermore, geographic data was contradictory (Berkshire vs. West Midlands).
4. **Incomplete NAP (Name, Address, Phone):** Lack of full postal address parameters and lack of a claimed Google Business Profile (GBP) or Apple Maps profile.
5. **Technical Bottlenecks:** A `307 Temporary Redirect` on `https://www.mercianwealth.com` failing to pass permanent link equity, combined with root-level Calendly asset loading.

---

## 2. Crawlability & Indexing Plan

### Current State vs Target State
* **`robots.txt`**: Currently allows all public marketing routes and explicitly grants crawl access to `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, and `Applebot-Extended`. Disallow list protects `/admin/`, `/client/`, `/dashboard/`, `/api/`, `/invoice/`, `/quote/`, and auth flows.
* **`sitemap.xml`**: Dynamically maps 10 production routes (`/`, `/services`, `/pricing`, `/book`, `/process`, `/portfolio`, `/cohort-status`, `/contact`, `/local`, `/terms`, `/privacy`). All routes return `HTTP 200`.

### Action Items
1. **Google Search Console Ownership & Submission**:
   - Verify domain property in Google Search Console via DNS TXT record.
   - Manually submit `https://mercianwealth.com/sitemap.xml`.
   - Execute URL Inspection and request manual indexing for the root URL and primary service pages.
2. **Global Fallback Canonical Tag**:
   - Ensure the root layout metadata specifies a default canonical fallback (`https://mercianwealth.com`) so query parameters (UTM tags, tracking IDs) do not trigger duplicate indexation.
3. **Sitemap Stability**:
   - Tie `<lastmod>` timestamps in `app/sitemap.ts` to stable deployment/commit timestamps rather than `new Date()` per request.
4. **Edge `noindex` Headers**:
   - Configure HTTP response headers with `X-Robots-Tag: noindex, nofollow` on all private paths (`/admin/*`, `/client/*`, `/dashboard/*`) to ensure total exclusion even if discovered via external links.

---

## 3. Structured Data & Schema.org Architecture

### Canonical Entity Graph
Unify all schemas into a cohesive, non-conflicting Schema.org entity graph:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://mercianwealth.com/#organization",
      "name": "Mercian Wealth",
      "legalName": "Mercian Wealth",
      "url": "https://mercianwealth.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://mercianwealth.com/#logo",
        "url": "https://mercianwealth.com/Logo2.jpeg",
        "caption": "Mercian Wealth"
      },
      "image": "https://mercianwealth.com/Logo2.jpeg",
      "telephone": "+447851055929",
      "email": "mercianwealthgs@gmail.com",
      "priceRange": "£495 - £1,995",
      "description": "Sub-second mobile storefronts, 3-tap order and booking builders, instant WhatsApp lead capture, upfront Stripe deposit collection, and automated Google review systems for UK local businesses.",
      "disambiguatingDescription": "Mercian Wealth is a digital infrastructure and mobile storefront design agency for UK trade contractors, clinics, and local businesses. Mercian Wealth is not a financial advisory firm and is not affiliated with Mercian Wealth Management.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Reading",
        "addressRegion": "Berkshire",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4543,
        "longitude": -0.9781
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "United Kingdom"
        }
      ],
      "sameAs": [
        "https://wa.me/447851055929",
        "https://www.instagram.com/mercianwealth/",
        "https://www.linkedin.com/in/gs-legacy-wealth/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://mercianwealth.com/#website",
      "url": "https://mercianwealth.com",
      "name": "Mercian Wealth",
      "publisher": {
        "@id": "https://mercianwealth.com/#organization"
      }
    }
  ]
}
```

### Contextual Page Schema Upgrades
* **`/services`**: Maintain `@type: "Service"` linked to `#organization` as the provider.
* **`/process`**: Retain `@type: "HowTo"` mapping the 7-day deployment milestones.
* **`/pricing`**: Embed `@type: "OfferCatalog"` with explicit price tiers.
* **`/contact`**: Embed `@type: "ContactPage"` with matching Berkshire NAP.
* **Contextual FAQs**: Keep per-page `@type: "FAQPage"` schemas matching page-specific questions.

---

## 4. Entity Disambiguation & Content Harmonization

### The Entity Conflict
* **Issue:** "Mercian Wealth Management" (`mercianwm.co.uk`) operates as a prominent wealth management / mortgage firm in the West Midlands (Lichfield). Search engine algorithms frequently associate the keyword "Mercian Wealth" with finance.
* **Resolution Strategy:**
  1. **On-Page Explicit Declarations:** Add explicit disambiguation copy on the site and within footer/about sections: *"Mercian Wealth builds mobile storefronts and booking software for UK local businesses; we do not offer financial or wealth management advice."*
  2. **Harmonize Location Data:** Standardize all references to **Berkshire, United Kingdom** across `layout.tsx`, `site-copy.ts`, footer, `contact`, and `llms.txt`.
  3. **Align Contact Email:** Consistently display and reference `mercianwealthgs@gmail.com` across all visible elements and metadata until an official domain email is provisioned.

---

## 5. Local Listings & Directory Distribution Plan

### Immediate Action Plan (Off-Code Steps)
1. **Google Business Profile (GBP):**
   - Register a verified Google Business Profile for **Mercian Wealth**.
   - Category: *Website Designer* / *Internet Marketing Service*.
   - Service Area: Nationwide UK (Headquarters in Berkshire).
2. **Apple Business Connect:**
   - Claim listing on Apple Maps for Siri and iOS Spotlight local discovery.
3. **Bing Places for Business:**
   - Synchronize GBP profile into Bing Places to enable Microsoft Copilot local citations.
4. **UK Business Directories:**
   - Submit standardized NAP to Yell.com, Scoot, 192.com, FreeIndex, and Thomson Local.
5. **B2B Tech Portals:**
   - Establish agency profiles on Clutch, The Manifest, and GoodFirms under "Mobile Web Development" and "Workflow Automation".

---

## 6. Technical Health & Mobile Performance Optimization

### Technical Enhancements
1. **WWW Redirect Status (307 → 308/301):**
   - Update Vercel domain settings to enforce a permanent redirect (`308 Permanent Redirect`) from `https://www.mercianwealth.com` to `https://mercianwealth.com`.
2. **Optimize Script Evaluation on Mobile:**
   - Ensure external Calendly stylesheets (`widget.css`) do not block initial DOM rendering.
   - Maintain client-side error suppression and polyfills without inflating TBT.
3. **Mobile UX & Tap Target Compliance:**
   - Verify viewport configuration: `width=device-width, initialScale=1, viewportFit=cover`.
   - Maintain 48px+ touch targets for all primary conversion actions (`Book a Call`, `WhatsApp`, `Request Prototype`).
   - Ensure sticky buttons and mobile drawers do not obstruct interactive content on viewports from 320px to 430px.

---

## 7. AI Engine Retrieval (GEO & LLMs.txt Architecture)

### `public/llms.txt` Harmonization
* Update headquarters to Berkshire, UK.
* Add prominent entity disambiguation header so LLM scrapers classify the business under software/web development rather than finance.
* Maintain complete breakdown of tiers (£495, £995, £1,995) and the 7-day protocol.

### `public/llms-full.txt` Knowledge Base
* Provide un-truncated, markdown-formatted specifications including unit economics, client outcomes, architecture breakdown (Next.js, Stripe, WhatsApp webhooks), and detailed FAQs.

---

## 8. Verification & QA Checklist

- [x] Unified JSON-LD `@graph` implemented with `#organization` disambiguation.
- [x] Geographic coordinates and regional address aligned to Berkshire, UK.
- [x] `public/llms.txt` and `public/llms-full.txt` updated with entity clarity and matching NAP.
- [x] Canonical URL tag consistency confirmed across all 10 pages.
- [x] Mobile responsiveness verified across compact, standard, and tablet breakpoints.
- [x] Next.js production build (`npm run build`) compiles with zero errors.
