# Comprehensive SEO, AEO & GEO Implementation Plan

**Target Application:** `mercianwealth.com`  
**Confirmed Strategic Positioning:** Option 2 — Automated Mobile Storefronts, 3-Tap Booking & Order Builders, WhatsApp Lead Capture, Stripe Upfront Deposit Collection, and Local Google Search Visibility for UK Local Businesses (Bakeries, Bespoke Jewellers, Trade Contractors, Private Clinics, and Local Service Operators).  
**Regional Roots:** West Midlands, United Kingdom (serving businesses across the UK).  
**Implementation Date:** September 2026

---

## 1. Executive Summary & Objective

This document formalises the technical and editorial upgrade of `mercianwealth.com` across three complementary search pillars:
1. **Traditional SEO (Search Engine Optimization):** Ensuring fast crawlability, clean title tags, click-through-focused meta descriptions, canonical URLs, mobile responsiveness, valid XML sitemaps without redirects, and hardened `robots.txt` boundaries.
2. **AEO (Answer Engine Optimization):** Optimising for Google AI Overviews, Featured Snippets, and voice assistants via structured `FAQPage`, `Service`, `HowTo`, and `PriceSpecification` schemas with direct, concise question-answer pairs tailored specifically to each individual page.
3. **GEO (Generative Engine Optimization):** Structuring content for synthesis and citation by LLM-powered search platforms (Perplexity AI, ChatGPT Search, Claude, Gemini) through embedded editorial insight blocks with verifiable unit economics, explicit entity graphs, and clear permissions in `robots.txt`.

---

## 2. Positioning & Language Discipline (Strict Option 2 Standards)

### Prohibited Copy & Terminology (Purged)
- No "AI voice receptionist" or "24/7 AI phone answering".
- No "customer support chatbots" or "triage bot".
- No "autonomous outbound calling" or "speed-to-lead outbound dialer".
- No fabricated technical claims (e.g. "<600ms telephony latency").

### Approved Core Copy (Enforced)
- "Sub-second mobile storefronts"
- "3-tap order and booking builders"
- "Instant WhatsApp smartphone dispatch and lead capture"
- "Upfront Stripe/Apple Pay deposit collection"
- "Automated 5-star Google review generation"
- "Local Google search discoverability & Schema.org entity graphs"
- "100% asset and code ownership with zero agency lock-in"

---

## 3. In-Code JSON-LD Structured Data Architecture

### Root Schema (`app/layout.tsx`)
A unified `ProfessionalService` entity graph establishing the canonical digital identity:
* `@type`: `ProfessionalService`
* `@id`: `https://mercianwealth.com/#organization`
* `name`: `Mercian Wealth`
* `telephone`: `+447851055929`
* `email`: `operations@mercianwealth.com`
* `priceRange`: `£495 - £1,995`
* `address`: West Midlands, UK
* `geo`: `latitude: 52.4862, longitude: -1.8904`
* `areaServed`: `United Kingdom`
* `description`: "Sub-second mobile storefronts, 3-tap order and booking builders, instant WhatsApp lead capture, upfront Stripe deposit collection, and automated Google review systems for UK local businesses."

### Contextual Page Schemas
* **`/services`**: `Service` / `ItemList` catalog detailing the core systems:
  1. High-Converting Mobile Storefronts
  2. 3-Tap Booking & Order Builders
  3. Upfront Deposit Collection Gateway (Stripe / Apple Pay)
  4. Instant WhatsApp Lead Capture & Dispatch
  5. Automated Google Review Generation Engine
  6. Back-End CRM & Calendar Two-Way Sync
* **`/process`**: `HowTo` schema mapping out the 4-step 7-day deployment protocol (Diagnostic → 48h Working Prototype → Integration & Calendar Sync → Launch & Handoff).
* **`/pricing`**: `PriceSpecification` / `OfferCatalog` schema matching live `lib/pricing.ts` arrays:
  - Setup Tiers: Essential Storefront (£495), Pro Order Builder (£995), Full Custom Build (£1,995)
  - Monthly Retainers: Launch Support (£195/mo), Leverage Growth (£495/mo), Enterprise Alliance (£995/mo)
  - Revenue Share: Starter Partner (5%), Pro Growth Partner (8%), VIP Scale Partner (10%)
* **`/book`**: `ReserveAction` schema connecting the user to the 15-minute diagnostic call.
* **Per-Page FAQs**: `FAQPage` schema on every page containing FAQs, dynamically reflecting that page's specific Q&A pairs.

---

## 4. Metadata, Open Graph & Canonical Tag Directory

Every public route exports explicit metadata with title, description, Open Graph, Twitter Card, and canonical URLs:

| Route | Canonical | Target Keyword Theme |
| :--- | :--- | :--- |
| `/` | `https://mercianwealth.com/` | Mobile Storefronts & Booking Engines for UK Local Businesses |
| `/services` | `https://mercianwealth.com/services` | Order Builders, WhatsApp Dispatch & Deposit Engines |
| `/process` | `https://mercianwealth.com/process` | 7-Day Storefront Deployment Protocol |
| `/portfolio` | `https://mercianwealth.com/portfolio` | Client Case Studies & Live Interactive Sandboxes |
| `/pricing` | `https://mercianwealth.com/pricing` | Transparent Storefront Packages & Growth Retainers |
| `/cohort-status` | `https://mercianwealth.com/cohort-status` | Operational Outcomes & Verified Client Data |
| `/contact` | `https://mercianwealth.com/contact` | Direct WhatsApp & UK Engineering Gateway |
| `/book` | `https://mercianwealth.com/book` | 15-Minute Operational Discovery Call |
| `/local` | `https://mercianwealth.com/local` | Live Field Sales Interactive Demo |

---

## 5. On-Page Contextual FAQs (Per-Page Registry)

Generic repeated FAQs on sub-pages are replaced with dedicated, contextual accordions:

1. **Home (`/`)**: High-level value proposition, 48-hour prototype explanation, zero-downtime cutover, 7-day launch timeline.
2. **Services (`/services`)**: Bespoke price calculation, Stripe/Apple Pay integration, WhatsApp dispatch mechanism, Google/Outlook calendar synchronization.
3. **Process (`/process`)**: Client onboarding requirements, zero website downtime, milestone review process on Day 3.
4. **Pricing (`/pricing`)**: 100% code ownership, ongoing cloud hosting costs (£5–£15/mo), revenue share mechanics.
5. **Book (`/book`)**: What occurs during the 15-minute diagnostic session, zero sales pressure guarantee.
6. **Contact (`/contact`)**: Sub-1-hour response time standard, UK-wide geographic coverage.

---

## 6. On-Page Editorial Insights (Option B for GEO)

To satisfy generative engine retrieval requirements without building a separate blog, high-value editorial insight callouts are embedded directly in key templates:

* **`/services` — Speed-to-Lead & Frictionless Intake:** Analysis of why multi-field web forms lose 68% of smartphone traffic, and how 3-tap order builders with upfront deposit collection lock in high-ticket jobs.
* **`/process` — The Zero-Downtime Deployment Architecture:** Architectural explanation of parallel staging environments, DNS cutover protocols, and phone prototype verification.
* **`/pricing` — Commercial Payback & Asset Ownership:** Unit economic breakdown demonstrating how recovering 1–2 leaked customer jobs fully pays for a £995 Pro Order Builder.

---

## 7. Sitemap & Robots.txt Architecture

### Sitemap (`app/sitemap.ts`)
- **Fix:** Purged `'/testimonials'` (which issued a 307 redirect).
- **Added:** `'/cohort-status'` (the canonical public page for client outcomes) and `'/local'` (the live field demo).
- Prioritised crawl weighting:
  - `1.0` (daily): `/`
  - `0.9` (weekly): `/services`, `/pricing`, `/book`
  - `0.8` (weekly): `/process`, `/portfolio`, `/cohort-status`, `/contact`, `/local`
  - `0.3` (monthly): `/terms`, `/privacy`

### Robots (`app/robots.ts`)
- Strict disallow list:
  - `/admin/`, `/client/`, `/dashboard/`, `/api/`
  - `/invoice/`, `/quote/` (protecting private client data and tokens)
  - `/login`, `/signup`, `/forgot-password`, `/reset-password` (preserving crawl budget)
- Explicit user-agent rules for AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`) allowing unrestricted crawling of public routes.
- Fully qualified sitemap link: `https://mercianwealth.com/sitemap.xml`.
