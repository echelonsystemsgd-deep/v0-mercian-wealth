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

## 2. Immediate P0: Proof Integrity & Business Anonymisation Addendum

> [!CAUTION]
> ### The Public Factual Accuracy & Anonymisation Mandate
> The site must not name any specific business — real, placeholder, or otherwise — anywhere in its copy. Furthermore, any metric or outcome stat displayed must be confirmed genuinely real. Unverified stats (`+£48,000/yr`, `92% attendance lift`) are strictly purged, while confirmed real metrics (`499 hrs saved`, `+£32,400/yr`) remain attached exclusively to an anonymised description.

### 2.1 The Core Directives
1. **Remove All Named Businesses**: The site must not name any specific business (e.g., Vanguard Architectural Construction, Aura Private Aesthetics, Oakwood Bespoke Contracts, Apex Commercial & Trade Services, The Caker Street Bakery) anywhere in its copy, headings, testimonials, case studies, or portfolio.
2. **Anonymise Real Client Deployments**: Where real, confirmed telemetry exists (The Caker Street Bakery: 499 hrs saved, +£32,400/yr captured), describe the *type* of business and the operational context instead: e.g., *"An artisanal bakery & confectionery in London"*. Keep the confirmed stats attached to the anonymised entity.
3. **No Invented Specificity or Swapping Fictional Names**: Do not replace fictional names with new fictional names (e.g. do not replace "Apex Commercial" with another invented company name). Describe the operational archetype instead: e.g., *"A local trade business missing 6+ calls a week while on job sites"*.
4. **Relabel Sandboxes as Illustrative Example Builds**: Any portfolio or demo links that showcase functional concepts rather than live client work are relabelled clearly as illustrative builds (e.g., *"Example build: Architectural construction quote engine"*) with zero implied real-world client claims or fabricated financial metrics.
5. **Purge All Unconfirmed Metrics**: Stripping a name off an invented stat does not make it honest. Any stat not confirmed genuinely real (such as the +£48k trade recovery or 92% clinic lift) is completely removed.
6. **Sanitise Placeholders & Mockups**: All input placeholders (e.g. `david@apexservices.co.uk`, `Harrison Private Clinic`, `Sterling Premier Services`) and UI mockup banners (`VANGUARD OPERATIONS`, `AURĒLIA`) are replaced with generic business descriptors (`director@yourbusiness.co.uk`, `Your Business Name`, `ARCHITECTURAL OPERATIONS`).

### 2.2 Complete Anonymisation & Proof Registry
The following registry documents every entity, where it appears in the codebase, what was removed or anonymised, and the rationale:

| Entity / Reference | Codebase Location(s) | Prior State / Claims | Verified Status | Remediation & New Label | Strategic Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **The Caker Street Bakery London** | `lib/site-copy.ts` (L248, 355)<br>`components/portfolio.tsx` (L24)<br>`components/testimonials.tsx` (L23) | Named client with metrics: `499 hrs saved`, `+£32,400/yr` captured | **Authentic Client Data** | Anonymise to **"Artisanal Bakery & Confectionery (London)"**; keep real verified metrics intact | Complies with zero named business policy while retaining 100% verified commercial proof. |
| **Vanguard Architectural Construction** | `lib/site-copy.ts` (L262)<br>`components/portfolio.tsx` (L33, 70)<br>`app/(admin)/admin/portfolio/page.tsx` (L27) | Named demo build claiming `+£48,000/yr` and `14 hrs/wk saved` | **Not a Real Client** (Interactive Vercel Demo) | Relabel to **"Example Build: Architectural Construction & Extension Quote Engine"**; badge: `Illustrative Example Build · Interactive Sandbox`; remove all fake outcome stats | Clarifies this is a functional demonstration sandbox, not a client deployment. Zero fabricated claims. |
| **Aura Private Aesthetics / Clinic** | `lib/site-copy.ts`<br>`components/proof-case-studies.tsx`<br>`app/(admin)/admin/portfolio/page.tsx` (L51) | Named clinic claiming `92% Attendance Lift` and `Zero DM Leaks` | **Not a Real Client** (Outreach Concept) | Purge from public case studies; in admin mocks, relabel to **"Example Build: Private Medical Consultation Triage"** with unverified stats removed | Eliminates fabricated attendance lift claims and invented clinic identity. |
| **Oakwood Bespoke Contracts** | `components/portfolio.tsx`<br>`docs/IMPLEMENTATION_PLAN.md` (L37) | Under-construction card with dummy label "Automated B2B Outbound Pipeline" | **Template Scaffold Placeholder** | **Completely Removed** from portfolio grid | Eliminates empty non-functional cards and placeholder branding. |
| **Apex Commercial & Trade Services** | `components/interactive-automation-flow.tsx` (L55)<br>`components/contact-form.tsx` (L165) | `operations@apexlogistics.co.uk`<br>`placeholder="e.g. david@apexservices.co.uk"` | **Invented Placeholder** | Replace with **`enquiries@commercialservices.co.uk`** and **`placeholder="e.g. director@yourbusiness.co.uk"`** | Removes invented company name from customer telemetry demo and form fields. |
| **Harrison Private Clinic** | `components/prototype-request-modal.tsx` (L173, 187) | `placeholder="e.g. Harrison Private Clinic"`<br>`placeholder="e.g. harrisonclinic.co.uk"` | **Invented Placeholder** | Replace with **`placeholder="e.g. Your Business Name"`** and **`placeholder="e.g. yourbusiness.co.uk or @social"`** | Prevents invented business names from appearing in input examples. |
| **Sterling Premier Services** | `components/local/local-lead-form.tsx` (L136, 153) | `placeholder="e.g. Sterling Premier Services"`<br>`placeholder="sarah@sterlingservices.co.uk"` | **Invented Placeholder** | Replace with **`placeholder="e.g. Your Business Name"`** and **`placeholder="e.g. director@yourbusiness.co.uk"`** | Eliminates fictional agency client placeholders. |
| **Aurēlia Cellular Longevity** | `components/portfolio.tsx` (L42, 117)<br>`app/(admin)/admin/portfolio/page.tsx` (L39) | Named e-commerce sandbox with luxury brand header `AURĒLIA` | **Interactive Demo Storefront** | Relabel to **"Example Build: Cellular Longevity & Precision Nutrition Storefront"**; header: `CELLULAR NUTRITION` | Transparently communicates illustrative concept without implying real client affiliation. |
| **Vanguard / Sovereign Testimonials** | `app/(admin)/admin/testimonials/page.tsx` (L24, 32) | Named mock testimonials: "Vanguard Client Operations", "Sovereign Commercial Group" with `+38% Revenue Lift` | **Unverified Admin Mock Data** | Relabel to anonymised archetypes or replace with authenticated client testimonial record | Prevents unverified stats or fictional names from persisting even in admin seeds. |

### 2.3 Verification Checklist for Zero Named Businesses & Proof Integrity
- [ ] **No Specific Business Names**: No specific business name (real, placeholder, or newly invented) appears anywhere on the site copy, headers, badges, or mockups.
- [ ] **Anonymised Real Proof**: Every verified case study (artisanal bakery) is anonymised to its business type and regional location, retaining only confirmed-real data (499 hrs, +£32,400/yr).
- [ ] **Clearly Labelled Illustrative Builds**: Every sandbox or prototype link is explicitly labelled as an illustrative/example build with no implied real-world client claims.
- [ ] **Zero Fabricated Stats**: No unconfirmed stat or metric remains attached to any section or component.
- [ ] **Documented Rationale**: Full documentation in `/docs/IMPLEMENTATION_PLAN.md` detailing every removal, anonymisation, and verification criteria.

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
[ PHASE 0: P0 PROOF INTEGRITY & BUSINESS ANONYMISATION ]
  ├── Anonymise verified client deployment (Artisanal Bakery & Confectionery: 499 hrs, +£32.4k/yr)
  ├── Relabel interactive sandboxes as ILLUSTRATIVE EXAMPLE BUILDS with zero unverified stats
  ├── Purge all placeholder business names (Apex, Harrison Clinic, Sterling Services) from forms & flows
  └── Remove unverified case studies and dummy cards (Aura, Oakwood)
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
