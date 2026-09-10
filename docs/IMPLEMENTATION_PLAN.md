# MERCIAN WEALTH — PRICING SYSTEM, PROOF INTEGRITY & ADMIN QUOTE SUITE
## Comprehensive Implementation Plan & Strategic Architecture

**Target Domain**: mercianwealth.com  
**Brand Architecture**: Geometric Gold "MW" Mark · Deep Charcoal (`#09090B`) Canvas · Canonical Gold (`#DCAE53`) Accents  
**Tagline**: *Storefronts · Automation · Growth.*  
**Status**: Ready for Execution (Decisions & Baseline Confirmed)

---

## 1. Executive Summary & Core Directives

Mercian Wealth operates on a strict brand doctrine: **Outcome Over Tool, Always** and **Absolute Proof Integrity (Zero Fabricated Metrics)**.

This implementation plan resolves the complete commercial and financial infrastructure for Mercian Wealth across three critical fronts:
1. **Immediate P0 Truth & Proof Integrity Remediation**: Resolves the unvetted, placeholder case studies currently displaying fabricated production metrics on the live site (`components/proof-case-studies.tsx`, `components/portfolio.tsx`, `lib/site-copy.ts`).
2. **Public-Facing Pricing Architecture (`mercianwealth.com/pricing`)**: A high-trust, engineered scope presentation. System Build and Growth Retainer tiers display comprehensive deliverables and business outcomes with no public £ figures. Only the Revenue Share model (**Starter 5%**, **Pro Growth 8%**, **VIP Scale 10%**) displays numbers publicly. The universal primary call to action is strictly **`"Book a call"`**.
3. **Internal Admin Quote & Invoice Suite (`/admin/quotes`)**: An internal-only financial command center. The operator selects or creates clients, picks from an internal catalog of verified prices, adds custom bespoke line items (never auto-priced), computes live totals with dynamic revenue share estimates, generates branded downloadable PDF invoices (marked *"VAT not applicable / exempt under UK threshold"*), and provisions secure interactive client quote links (`/quote/[token]`) with direct Stripe deposit checkout.

---

## 2. Immediate P0: Proof Integrity & Fabricated Case Studies Resolution

> [!CAUTION]
> ### The Public Factual Accuracy Issue
> The live site currently features several case studies that display fictitious metrics alongside a `● VERIFIED PRODUCTION METRICS` badge. This violates Section 5 of [POSITIONING_PRINCIPLES.md](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/POSITIONING_PRINCIPLES.md) and represents a severe credibility risk.

### 2.1 Forensic Audit of Fictitious Case Studies in Codebase
A full audit of the codebase confirms the exact status of the disputed names:

1. **Vanguard Architectural Construction / Apex Commercial & Trade Services**:
   - *Origin*: Created in August 2026 during a trades positioning experiment ([Implementation/Website/CONSTRUCTION_AND_HIGH_TICKET_TRADES_PIVOT_PLAN.md](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/Implementation/Website/CONSTRUCTION_AND_HIGH_TICKET_TRADES_PIVOT_PLAN.md)). A live sandbox demo was deployed to Vercel (`premium-local-construction-business.vercel.app`).
   - *Factual Status*: **Not a real client.** In [components/proof-case-studies.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/proof-case-studies.tsx#L55-L78), it was erroneously stamped with `● VERIFIED PRODUCTION METRICS` claiming `14 hrs/wk saved` and `+£48,000/yr revenue recovered`. These are unverified, fabricated numbers.
2. **Aura Private Aesthetics / Clinic**:
   - *Origin*: Created as an outreach concept prototype to pitch high-ticket cosmetic clinics on 24/7 web chat triage.
   - *Factual Status*: **Not a real client.** In [components/proof-case-studies.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/proof-case-studies.tsx#L113-L137), it was stamped with `● VERIFIED PRODUCTION METRICS` claiming `92% Attendance Lift` and `Zero DM Leaks`.
3. **Oakwood Bespoke Contracts**:
   - *Origin*: A placeholder portfolio card in [components/portfolio.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/portfolio.tsx#L51-L58) marked `underConstruction: true` with a dummy label `"Automated B2B Outbound Pipeline"`.
   - *Factual Status*: **Not a real client.** Pure leftover template scaffold.
4. **The Caker Street Bakery London**:
   - *Origin*: Documented in [POSITIONING_PRINCIPLES.md](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/POSITIONING_PRINCIPLES.md#L43) and [Implementation/Website/PORTFOLIO_PROTOTYPES_AND_DISCLAIMER_PLAN.md](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/Implementation/Website/PORTFOLIO_PROTOTYPES_AND_DISCLAIMER_PLAN.md).
   - *Factual Status*: **The single authentic, verified client build** with real historical operational telemetry: `499 hours saved` and `+£32,400/yr` captured through a 3-tap storefront order intake and automated phone dispatch.

### 2.2 Immediate Remediation Plan (P0 — Prior to Any Other Work)
- **Action 1**: Remove the misleading `components/proof-case-studies.tsx` section from the homepage, or completely rewrite it to feature **The Caker Street Bakery** as the sole verified commercial case study.
- **Action 2**: Purge fictitious names and fabricated claims (`+£48,000/yr`, `92% show rate`) from `lib/site-copy.ts`, `components/testimonials.tsx`, and `components/portfolio.tsx`.
- **Action 3**: Any interactive sandboxes (such as the construction quote demo or cake concierge) will be displayed strictly under an unassailable banner:  
  `CONCEPT SANDBOX · INTERACTIVE DEMONSTRATION · ZERO FABRICATED METRICS`
- **Action 4**: Remove dummy `underConstruction` cards (Oakwood) from the portfolio grid so every showcased asset is a functional, honest demonstration.

---

## 3. Catalog Pricing Baseline & Source Reconciliation

### 3.1 The Origin of the Masked Figures (£2,250–£5,500 & £1,250–£3,500/mo)
- **Source Traced**: These specific figures originated inside `docs/REPOSITIONING_PLAN.md` (lines 40, 171–172), authored on September 5, 2026 (git commit `1f26654`). It was a draft strategy proposal to reposition Mercian Wealth into higher enterprise pricing brackets.
- **Discrepancy with Live Site**:
  - The live site in [lib/site-copy.ts](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/lib/site-copy.ts#L631-L746) currently runs on:
    - *Setup Tiers*: **£495** (Starter AI Engine) · **£995** (Complete AI Operations) · **£1,695** (Flagship Growth Engine).
    - *Retainer Tiers*: **£195/mo** (Care & Chatbot) · **£395/mo** (Full AI Voice) · **£695/mo** (Enterprise Growth).
  - The earlier database migration in [supabase/migrations/20260629200000_pricing_cms_seed.sql](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/supabase/migrations/20260629200000_pricing_cms_seed.sql) seeded:
    - *Setup Tiers*: **£1,850** (Launch Catalyst) · **£3,850** (System Leverage) · **£7,500** (Enterprise Partner).
    - *Retainer Tiers*: **£395/mo** (Launch Support) · **£750/mo** (Leverage Growth) · **£1,450/mo** (Enterprise Alliance).

### 3.2 Catalog Architecture & Default Pricing Resolution
Because the public site will **never display fixed £ prices** (masking them completely behind custom-scoped deliverables), the internal catalog acts as the flexible internal rate card.
- **Confirmed Initial Catalog Baseline**: The internal catalog will be seeded using the validated **Launch Catalyst (£1,850) / System Leverage (£3,850) / Enterprise Partner (£7,500)** build tiers and **£395 / £750 / £1,450/mo** retainers, representing real mid-market production systems.
- **Operator Editability**: The operator can override any default price directly when drafting a quote, or update the master catalog in the admin dashboard at any time without code deployments.

---

## 4. Confirmed Strategic Decisions & Tier Naming

### 4.1 Decision Confirmations
1. **UK VAT Treatment**:
   - Mercian Wealth is **not VAT-registered**.
   - All quotes, checkout flows, and generated invoices will display:  
     `VAT not applicable / exempt under UK threshold`
   - Zero VAT percentage calculation, zero VAT line items, zero VAT registration numbers.
2. **Quote Delivery Architecture**:
   - **Interactive Secret Web Link**: Every quote automatically generates a secure, unique URL (`mercianwealth.com/quote/[secure-token]`).
   - The prospective client views an editorial, luxury breakdown of their project scope, line items, and deposit terms.
   - Includes a direct **"Accept & Pay Deposit via Stripe"** checkout integration.
   - Accompanied by instant **Server-Side PDF Download** so the operator can attach an invoice to email or WhatsApp.
3. **Tier Naming Resolution (Architectural Nomenclature)**:
   - *System Build (One-Time)*:
     1. **Launch Catalyst** (Foundational high-performance Next.js storefront & intake)
     2. **System Leverage** (Complete automation pipeline, Supabase DB, instant routing)
     3. **Enterprise Partner** (Custom multi-location architecture, bespoke voice & ERP)
   - *Growth Retainer (Monthly)*:
     1. **Launch Support** (Compute, hosting, continuous uptime & webhook audits)
     2. **Leverage Growth** (Included voice minutes, continuous prompt re-tuning, SEO)
     3. **Enterprise Alliance** (Fractional CTO advisory, active outbound engineering)
   - *Revenue Share (Publicly Visible %)*:
     1. **Starter Partner** (5% of captured digital revenue)
     2. **Pro Growth Partner** (8% of captured digital revenue)
     3. **VIP Scale Partner** (10% of captured digital revenue)
   - *Reasoning*: These names reflect institutional, outcome-driven systems engineering. They preserve existing database seeds and distance Mercian Wealth from commodity web design agencies.

---

## 5. Public Pricing Page Architecture & CTA Strategy

### 5.1 Public Pricing Rules
- **Fixed System Build prices remain hidden**: Outlined by business fit, deliverables, and operational guarantees. Pricing displayed as: `Custom Scoped · Fixed Milestone Investment`.
- **Growth Retainer fees remain hidden**: Displayed as: `Managed Operational Agreement · Scoped to Volume`.
- **Revenue Share displays exact percentages**: **5%**, **8%**, and **10%** prominently displayed. Serves as the ultimate trust anchor showing alignment of incentives.
- **Universal Primary CTA**: Strict adherence to **`"Book a call"`** on every card.

### 5.2 The 3-Stage Progressive CTA Flow
- **Step 1: Rapid 30-Second Diagnostic**: Name, Business Name, Phone/WhatsApp, Website/Instagram, Monthly Revenue bracket, and Primary Bottleneck.
- **Step 2: Instant Lead Ingestion**: Posts to Supabase `leads` table and triggers immediate operator notification.
- **Step 3: Embedded Calendly Scheduler**: Opens a pre-filled 30-minute Strategy Session picker.
- **Secondary Fast-Tracks**: Direct WhatsApp priority hotline for mobile visitors and the 3-field Prototype Request Modal.

---

## 6. SEO & Discoverability Architecture

1. **Schema.org Remediation**:
   - Remove the leaked `priceRange: '£495 - £1,495'` from [app/layout.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/app/layout.tsx#L121).
   - Implement `ProfessionalService`, `Service`, and `FAQPage` JSON-LD schemas.
2. **Realistic UK Commercial Search Terms**:
   - `custom website for local business uk`
   - `storefront and booking system for trades`
   - `automated booking system for clinics uk`
   - `speed to lead automation uk`
   - `business automation uk for service companies`
3. **Content Strategy**:
   - High-intent industry solution pages (`/trades`, `/clinics`, `/hospitality`) rather than generic SEO blog posts.
   - Real proof breakdowns based exclusively on verifiable telemetry.

---

## 7. Admin Dashboard — Internal Quote & Invoice Suite

### 7.1 Operator Workflow (`/admin/quotes`)
1. **Client Management**: Select an existing client from `profiles` or use the inline quick-add modal (Name, Business, Email, Phone, Billing Address).
2. **Item Assembly**:
   - Pick from the internal catalog (Launch Catalyst, System Leverage, Retainers, Rev-Share).
   - Add Custom Bespoke Line Items with manually entered prices (never auto-priced).
3. **Dynamic Calculations**:
   - One-time implementation total.
   - Monthly retainer total.
   - Revenue Share live estimator: `Client Monthly Sales £ × Selected % = Estimated Performance Fee £/mo`.
   - Deposit schedule: 50% upfront or 4-stage 25% progress milestones.
4. **Quote Finalization & Secret Link Generation**:
   - Generates persistent record in Supabase: `MW-Q-2026-XXXX`.
   - Provisions secret client link: `mercianwealth.com/quote/[secure-token]`.
5. **Invoice Generation & Server-Side PDF**:
   - Generates branded PDF invoice (`MW-INV-2026-XXXX`) with gold MW mark, deep charcoal palette, bank coordinates, and *"VAT not applicable / exempt under UK threshold"*.
   - Server-side PDF export stored in Supabase Storage with instant download.
   - Integrated Stripe deposit checkout trigger.

### 7.2 Relational Data Model (Supabase / PostgreSQL)
- **`catalog_items`**: Internal rates, deliverables, and billing intervals.
- **`quotes`**: Client linkage, status (`draft`, `sent`, `accepted`, `invoiced`), sales projections, deposit requirements, secure access token.
- **`quote_items`**: Snapshots of catalog or custom items attached to the quote.
- **`invoices`**: Invoice number, issue/due dates, balance due, payment terms, and PDF storage URL.
- **Security**: Strict PostgreSQL Row Level Security (RLS) restricting all access to `role = 'admin'`, with public access to `/quote/[token]` restricted strictly to reading the single token-authorized quote record.

---

## 8. Brand Standards & UI Discipline

- **The Geometric "MW" Mark**: SVG bowtie/hourglass icon with central accent node applied across public pages, admin headers, and invoice letterheads.
- **Color Palette**: Deep Charcoal (`#09090B`), Card Surface (`#111115`), Elevated Surface (`#18181F`), Canonical Gold (`#DCAE53`), Slate Silver (`#94A3B8`), and Metric Green (`#34D399`).
- **Admin Layout Purge**: Replace all legacy purple classes (`bg-carbon-purple`, `border-purple-500/15`, `bg-purple-600/10`) in [app/(admin)/layout.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/app/%28admin%29/layout.tsx) with canonical charcoal and gold tokens.
- **Tagline**: *"Storefronts · Automation · Growth."* applied consistently.

---

## 9. Disciplined Implementation Roadmap

```
[ PHASE 0: P0 PROOF INTEGRITY REMEDIATION ]
  ├── Purge fabricated case studies (Apex & Aura fake metrics) from components/proof-case-studies.tsx
  ├── Center social proof exclusively on The Caker Street Bakery (verified 499 hrs, +£32.4k/yr)
  └── Label any demo prototypes strictly as CONCEPT SANDBOXES with zero fabricated metrics
        │
        ▼
[ PHASE 1: DATABASE & CATALOG INFRASTRUCTURE ]
  ├── Supabase migrations for catalog_items, quotes, quote_items, invoices
  ├── Seed internal catalog with Launch Catalyst, System Leverage, Retainers, Rev-Share
  └── Establish strict admin Row Level Security (RLS) policies
        │
        ▼
[ PHASE 2: ADMIN QUOTE & INVOICE SUITE (/admin/quotes) ]
  ├── Purge purple tokens from app/(admin)/layout.tsx (enforce charcoal/gold brand)
  ├── Add Quotes link to components/admin/sidebar.tsx
  ├── Build Client Selector / Quick-Add Drawer
  ├── Build Catalog Picker + Custom Bespoke Line-Item Builder
  ├── Build Dynamic Total & Revenue Share Estimator
  └── Build Server-Side PDF Invoice Generator & Stripe Checkout trigger
        │
        ▼
[ PHASE 3: SECRET CLIENT QUOTE PORTAL (/quote/[token]) ]
  ├── Build luxury client quote presentation page with gold MW mark
  ├── Implement scope itemization and milestone schedule display
  └── Connect "Accept & Pay Deposit" button to Stripe Checkout session
        │
        ▼
[ PHASE 4: PUBLIC PRICING REALIGNMENT (mercianwealth.com/pricing) ]
  ├── Mask fixed System Build & Retainer prices behind engineered scope deliverables
  ├── Feature Revenue Share tiers (5%, 8%, 10%) prominently as trust anchor
  └── Standardize all CTA buttons to "Book a call"
        │
        ▼
[ PHASE 5: SEO REMEDIATION & FINAL VERIFICATION ]
  ├── Remove priceRange leak from app/layout.tsx
  ├── Implement Service and FAQPage JSON-LD schemas
  └── Run TypeScript type check (npx tsc --noEmit) and production build (npm run build)
```
