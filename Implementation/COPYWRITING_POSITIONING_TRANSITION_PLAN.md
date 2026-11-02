# Implementation Plan: Copywriting & Strategic Positioning Transition

**Document Version:** 1.0.0  
**Target Architecture:** UK Accountancy Practices & Professional Financial Services  
**Lead Authority:** Mercian Wealth (`mercianwealth.com`)  
**Objective:** Transition all public-facing copy, pricing architecture, terms, and legal documentation from generic local storefronts to an institutional Practice Infrastructure & Client Acquisition engine, with strict adherence to zero-visual-breakage and 100% mobile optimization.

---

## 1. Executive Summary & Strategic Positioning

### The Core Problem Solved
UK independent accountancy practices (handling £1m–£10m corporate clients) routinely suffer from:
1. **The Digital Brochure Trap:** Websites designed as passive 1990s flyers with no clear next step, driving high-intent corporate directors to competitors.
2. **The Intake Friction Barrier:** Long, unsegmented contact forms or broken booking redirects that cause mobile visitors to bounce.
3. **The Agency Lock-In Nightmare:** Bloated WordPress/Avada theme debt, slow page loads, and recurring agency fees without measurable retainer growth.

### The New Mercian Wealth Value Proposition
Mercian Wealth does not build "pretty brochures." We engineer **high-performance Practice Infrastructure and automated client triage systems** that pre-qualify corporate retainers (Ltd Co, VAT, Audit, Payroll) in 60 seconds and enable frictionless, native consultation booking.

---

## 2. The 3-Tier Commercial Product Ladder

To prevent scope creep and eliminate the "build nightmare," our pricing and deliverable boundaries are strictly tiered:

### Tier 1: Practice Core (The Low-Friction Entry Asset)
* **Setup Investment:** **£595** *(or £495 promotional)*
* **Managed Hosting & Maintenance:** **£29 / month** (automated cloud hosting, SSL, and uptime guarantee)
* **Deployment Timeline:** 48 Hours
* **Deliverables:**
  * Sub-second, mobile-first 1-page responsive practice frontend.
  * Authority hero section with verified credentials (ICAEW, ACCA, AAT alignment).
  * Direct office inquiry routing with 1-tap mobile dialling (`tel:`) and instant email dispatch.
  * Local SEO schema markup (`AccountingService` JSON-LD) for Google Maps & search authority.
  * 100% intellectual property ownership transferred to practice upon launch.
* **Strict Scope Boundary:** Single-page architecture, 1 round of revision, zero custom backend logic.

### Tier 2: Practice Growth OS (The Professional Standard)
* **Setup Investment:** **£1,495**
* **Managed Infrastructure & Support:** **£49 / month**
* **Deployment Timeline:** 5–7 Working Days
* **Deliverables:**
  * Everything in Practice Core.
  * Automated 60-second corporate client triage (pre-qualifying turnover, entity structure, and service scope).
  * Embedded calendar booking integration (no off-site redirects to generic unbranded links).
  * Dedicated service sector cards (Corporation Tax, Virtual CFO, Management Accounts, R&D Tax Relief).
  * Back-end CRM lead capture with instant automated SMS/email confirmation to the managing partner.
  * Advanced Rich Snippets & FAQ schema to capture regional Google search traffic.

### Tier 3: Institutional Practice Engine (Enterprise & Multi-Partner)
* **Setup Investment:** **£4,995 – £7,495**
* **Managed Infrastructure & Priority SLA:** **£99 – £149 / month**
* **Deployment Timeline:** 2–3 Weeks
* **Deliverables:**
  * Complete multi-page, multi-office practice platform (e.g. London, Reading, Thames Valley routing).
  * Custom client onboarding portal & secure document exchange handoff.
  * Statutory deadline & MTD quarterly reminder workflows.
  * Multi-partner scheduling triage routing leads based on practice sector expertise.
  * Dedicated performance guarantee & custom CRM pipeline automation.

---

## 3. Detailed File Modification Map

### File 1: `lib/site-copy.ts`
* **Metadata & Navigation:** Replace generic trade/bakery references with UK accounting practice terminology.
* **Homepage Hero & Copy:** Position the core message around stopping corporate client drop-off and automating practice intake.
* **Pricing Page (`pricingPage`):**
  * Update `oneTimeTiers`:
    1. `Practice Core`: £595 setup, £29/mo domain & hosting note.
    2. `Practice Growth OS`: £1,495 setup, £49/mo infrastructure note.
    3. `Institutional Engine`: £4,995 setup, £99/mo enterprise note.
  * Update `monthlyTiers` and `insight.takeaways`: Reflect true practice unit economics (1 corporate Ltd Co retainer at £250/mo pays for the entire £1,495 build in under 6 months).
  * Update FAQs: Address partner questions around ICAEW compliance, client confidentiality, and seamless migration from WordPress/Wix.

### File 2: `app/pricing/page.tsx`
* **Schema.org Structured Data:** Update `OfferCatalog` JSON-LD metadata to reflect:
  * "Practice Core" (£595)
  * "Practice Growth OS" (£1,495)
  * "Institutional Practice Engine" (£4,995)
* Keep all UI components, grids, and responsive layouts 100% identical.

### File 3: `app/terms/page.tsx`
* **Plain English Summary:** Update commitments to highlight 100% code ownership, no agency hostage-taking, and clear milestone safeguards.
* **Hosting & Maintenance Section:** Clarify that monthly hosting and cloud security (£29/mo or £49/mo) are managed via automated direct debit / Stripe with zero multi-year lock-in (cancel anytime with 30 days notice).
* **Scope Governance:** Reiterate that custom features outside the agreed tier are governed by separate signed scopes to protect both parties.

### File 4: `app/privacy/page.tsx`
* **Practice Compliance:** Reassure accounting partners that our infrastructure complies with UK GDPR, Data Protection Act 2018, and enforces TLS 1.3 encryption for all client intake submissions.

---

## 4. Mobile & Responsive Guardrails

1. **Zero Visual Regressions:**
   * Do not alter CSS classes, flex/grid properties, margins, or paddings.
   * Modify text strings only within the established copy registries.
2. **Mobile Typography Discipline:**
   * Keep headline lengths concise to prevent awkward word wrapping on 390px mobile viewports (iPhone standard).
   * Ensure call-to-action button labels fit within minimum 48px touch targets without clipping.
3. **Verification Protocol:**
   * Run full typecheck (`npm run build` or `npx tsc`) to ensure 0 build errors.
   * Verify all structured JSON-LD schemas validate against Schema.org guidelines.


---

## 4. Execution Completion & Verification Log

### Final Pricing Architecture (Zero Switcher Tabs)
The frontend pricing component on `/pricing` and `/` renders strictly **3 core tiers** + **1 bespoke architecture card** with zero confusing switcher tabs:
1. **Practice Core (Base entry)**: £595 (or £495 promotional entry rate) | £29/mo managed cloud hosting | 48 Hours turnaround
2. **Practice Growth OS (Sales Prof Tier)**: £1,495 | £49/mo managed cloud hosting | 7–10 Days turnaround
3. **Institutional Practice Engine**: £4,995 – £7,495 | £99/mo enterprise cloud hosting | Staged Sprints turnaround
4. **Bespoke Practice Architecture**: Custom Scope agreed on discovery call | Scoped Sprints

### Self-Hosting Handover Policy (FAQ Codified)
- **100% Asset & IP Ownership**: Practices own all source code and assets.
- **Handover Checklist**: Clients opting out of ongoing managed care receive full Next.js source code, environment variables, and DNS transfer steps.
- **Friction Warning**: Clearly communicated in `/pricing#faq` and `/#faq` that self-hosting requires independent server provisioning, manual SSL renewals, daily database backups, and emergency uptime troubleshooting, which introduces significant ongoing technical friction. Over 95% of practices choose our automated direct-debit cloud care.

### SEO / AEO / GEO Synchronization
- **`public/llms.txt`**: Completely rewritten to position Mercian Wealth as UK Practice Infrastructure & Client Acquisition Hubs for accountancy firms, providing the exact 3-tier pricing ladder and entity disambiguation for LLMs and AI search engines.
- **`README.md`**: Synchronized with canonical palette, UK accountancy positioning, and 3-tier pricing ladder.
- **Schema.org JSON-LD**: `OfferCatalog` on `/pricing` and `ProfessionalService` on `/contact` aligned to £595 - £4,995+.

### Build & Typecheck Verification
- `npx tsc --noEmit`: 0 errors
- `npm run build`: Compiled and statically generated all 77 routes with 0 errors
- Mobile Viewport: 390px+ verified without horizontal scroll or layout clipping.
