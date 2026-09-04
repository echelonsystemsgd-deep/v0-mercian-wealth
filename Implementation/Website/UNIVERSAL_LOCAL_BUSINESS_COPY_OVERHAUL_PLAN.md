# Universal Local Business Copy Overhaul Plan & Execution Architecture

## Strategic Objective
Update all copy across mercianwealth.com to completely remove references to specific industries, trades, or niches (e.g. "builders," "construction," "trade businesses," "contractors," "site survey," "loft conversion," "extension," "renovation," "bakeries," "catering," "food artisans") and replace them with generic, high-converting language referring to **"local businesses"** and **"premier local service businesses."**

This applies to all page copy, meta titles, meta descriptions, Open Graph tags, Twitter card tags, alt text, testimonials, pricing page copy, UI text/labels, interactive simulators, and fallback schemas.

---

## Core Tenets & Copywriting Rules

1. **High-Conviction & Persuasive Weight:**
   - Every rewritten line must read as naturally and persuasively as the original. If removing an industry noun leaves a sentence flat, rewrite the entire sentence so it lands with maximum force.
2. **Preserve All Persuasive Mechanisms:**
   - **Urgency:** *"Every 10 minutes a bespoke enquiry sits unread in an inbox, your probability of closing plummets by 80%."*
   - **Scarcity:** *"Territorial Exclusivity — We partner with selected premier local businesses per postcode."*
   - **Loss-Framing:** *"A delayed response is profit gifted directly to your biggest local competitor."*
   - **Manual vs. Automated Contrast:** DM chaos, scrap paper notes, and uncollected deposits vs. 24/7 automated storefront, upfront deposits, and sub-second WhatsApp dispatch.
3. **Concrete Scenario Examples:**
   - Replace specific scenario examples with equally concrete, high-ticket generic equivalents (e.g. *"a £18,500 project enquiry in Solihull"*, *"£4,800 in upfront deposits captured in 30 days"*, *"£250 consultation deposit lock"*). Avoid vague placeholders like "a service" or "a job".
4. **Preserve All Numbers & Commercials:**
   - All statistics, time frames (7 business days, 0.4s latency), and pricing tiers (£495, £895, £1,450 / £99, £195, £395) remain exact.
5. **Logical Narrative Continuity:**
   - Problem → Agitation → Solution → Proof → Close.

---

## File-by-File Implementation Blueprint

### 1. Global Copy Registry (`lib/site-copy.ts`)
- **Metadata:**
  - Update layout, home, services, process, portfolio, pricing, testimonials, contact, and booking metadata descriptions to refer exclusively to high-converting mobile storefronts, 24/7 booking engines, WhatsApp dispatch, and automated Google review systems for UK local businesses.
- **Telemetry Ticker & Hero Section:**
  - Subheadline: *"Stop losing high-value enquiries in unread Instagram DMs and manual phone tag. We engineer sub-second mobile storefronts, 3-tap booking and order engines, instant WhatsApp dispatch alerts, and automated Google review engines for premier local businesses across Berkshire & the UK."*
  - Trust items & proof badges tailored to speed, deposits, and review extraction.
- **Divergence Comparison:**
  - Path Conventional: "The DM & Scrap Paper Vulnerability" — losing high-margin custom bookings and project enquiries whilst serving clients or fulfilling work on-site; 5–10 lucrative orders lost weekly; no-shows and unpaid cancellations due to uncollected deposits.
  - Path Mercian: "The Mercian Automation Engine" — customers configure project scopes, bespoke notes & dates online 24/7, paying deposits instantly via Apple Pay/Card; sub-0.4s WhatsApp dispatch.
- **Bottleneck (Deficit Diagnostic):**
  - Lost Revenue in Buried DMs & Missed Calls: Customers enquire whilst you are serving clients or busy with operations.
  - Chasing Manual Deposits & Bank Transfers: Wasting billable hours texting back and forth to confirm project specifications and bank details.
  - Stagnant Google Reviews: Losing local search share because competitors harvest verified Google reviews on autopilot.
- **Why Mercian Wealth:**
  - Headline: *"Engineered For Ambitious Local Businesses & Premier Service Operators."*
  - Differentiators & Standard Agency vs. Mercian Protocol comparisons.
- **Services Page Copy (`/services`):**
  - 4 core pillars: Sub-Second Mobile Storefronts, 3-Tap Booking & Deposit Engines, Instant Smartphone WhatsApp Dispatch, Automated 5-Star Review Extraction.
- **Process Page Copy (`/process`):**
  - The 7-Day Protocol: Diagnostic Audit → Storefront & Deposit Engine Configuration → WhatsApp Dispatch Linkup → Commercial Launch.
- **Portfolio Page Copy (`/portfolio`):**
  - Universal interactive sandboxes and custom booking prototypes for local business operators.
- **Pricing Page Copy (`/pricing`):**
  - Clear commercial tiers with feature descriptions tailored to local business cash flow.
- **Contact & Booking Page Copy (`/contact`, `/book`):**
  - Direct 15-minute diagnostic audit for local business owners.

---

### 2. Global Metadata, SEO & Schema (`app/`)
- **`app/layout.tsx`:**
  - Keywords: clean up to `["AI automation agency UK", "mobile storefronts UK", "3-tap order builder", "WhatsApp order alerts", "automated Google review system", "local business automation UK", "custom web design agency UK", "automated booking systems UK", "deposit capture systems"]`.
  - JSON-LD schema description and OpenGraph tags.
- **`app/page.tsx`:**
  - JSON-LD WebSite and WebPage schemas.
  - SectionDivider titles: Chapter VI → *"Built for Premier Local Businesses"*.
- **`app/local/page.tsx`:**
  - Ensure aligned metadata and structure.

---

### 3. Interactive Homepage Components (`components/`)
- **`components/hero.tsx`:**
  - Hero visual mockup: Update from celebration cake to *"Bespoke Client Project Package"* (£185.00 total / £50 deposit paid via Apple Pay) and instant WhatsApp dispatch alert.
- **`components/stickman-workflow.tsx`:**
  - Step 1: Customer Storefront Order (`localbusiness.storefront.app`, Custom Project Package £185 / £50 deposit).
  - Step 2: Instant WhatsApp Dispatch to Smartphone (0.4s latency).
  - Step 3: Orders & CRM Auto-Sync with live feed items.
  - Step 4: Reclaim 10.5+ Admin Hours / Week.
- **`components/interactive-phone-demo.tsx`:**
  - Replace niche selector tabs with two high-value local business service tiers:
    1. **Bespoke Project & Package Demo** (£450 Premier Client Package, £1,200 Custom Milestone Delivery, £280 Express Consultation & Retainer).
    2. **High-Ticket Client Booking Demo** (£2,400 Full-Scope Commercial Project, £850 Executive On-Site Service, £350 Priority Consultation & Audit).
  - Live simulated WhatsApp notification and Apple Pay deposit receipts.
- **`components/testimonials.tsx`:**
  - Static fallback testimonials updated to premier local service operators with concrete quantified outcomes (+£4,800 deposits captured in 30 days, 12+ hrs saved/wk).
- **`components/why-mercian-wealth.tsx`:**
  - Founder statement and description updated to empower local business owners.
- **`components/portfolio.tsx`:**
  - Transform portfolio showcase items and interactive mockup components into premier local business prototypes:
    - Vanguard Premier Operations (High-Ticket Project Intake & Deposit Architecture)
    - Sovereign Client Services (Bespoke Booking & Deposit Portal)
    - Sterling Local Commerce (High-Converting Storefront & Ordering)
    - Apex Bespoke Consultations (Premier Local Service Atelier)
- **`components/pricing.tsx`:**
  - Comparison matrix categories, table column headers, and feature labels.
- **`components/latency-calculator.tsx`:**
  - Labels and copy reflecting high-ticket inbound project leads and deal values.

---

### 4. Local Funnel Components (`components/local/`)
- **`components/local/local-hero.tsx`:** Plain-English local business headline, subheadline, and proof items.
- **`components/local/local-deliverables.tsx`:** 4 system pillars with concrete outcomes.
- **`components/local/local-pain-points.tsx`:** Operational friction during busy client service hours.
- **`components/local/local-pricing.tsx`:** Badges and feature lists for local businesses.
- **`components/local/local-lead-form.tsx`:** Business type options, package choices, and placeholder text.
- **`components/local/field-sales-demo.tsx`:** Concrete service packages (£240, £650, £850, £1,450) and simulated lead routing.

---

### 5. Admin & Dashboard Fallbacks (`app/(admin)/admin/`)
- Update mock entries in `portfolio`, `testimonials`, and `leads` to align with the universal local business positioning.

---

## Verification & Validation Protocol
1. **Next.js Production Build (`pnpm build`):** Ensure clean compilation with zero type or lint errors.
2. **Exhaustive Regex Audit:** Ripgrep across all `.tsx`, `.ts`, and `.json` files to verify zero remaining references to trades, construction, niche nouns, or food-specific terminology in client-facing copy.
3. **End-to-End Narrative Review:** Verify conversion flow from Problem → Agitation → Solution → Proof → Close across mobile and desktop viewports.
