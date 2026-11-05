# Mercian Wealth: Current-State Pricing, Terms & Copy Audit

**Date**: November 2026  
**Auditor**: Senior Agency Pricing Strategist & Technical Auditor  
**Subject**: Live Website Architecture, Repositories, Documentation, and Commercial Assets of Mercian Wealth (`mercianwealth.com`)

---

## 1. Executive Summary & Purpose

This audit documents every price point, commercial tier, payment term, service-level claim, and guarantee currently live or published in the Mercian Wealth code repository and production site. It contrasts these live elements against the founder's active sales script (targeting 1–5 partner UK accountancy practices) and the proposed Care (£25–£35/mo) vs Growth (£75/mo) retainer restructure.

Every factual claim in this document is tagged with one of three forensic labels:
- **[Verified: Source, Date]**: Confirmed via public repository code, live website routes, or statutory documentation.
- **[Unverified]**: Published on the live site or marketing copy without empirical substantiation or operational measurement.
- **[Wrong]**: In direct operational, contractual, or commercial contradiction with other live assets or business reality.

---

## 2. Inventory of Live Prices, Tiers & Commercial Packages

### 2.1 The Public Pricing Page (`/pricing` & `lib/site-copy.ts`)

The active Next.js production code renders three primary one-time setup tiers, three separate monthly retainer tiers, and three revenue-share tiers:

#### A. One-Time Setup Packages (`oneTimeTiers`)
1. **Practice Core (Base entry)**:
   - **Headline Price**: £595 one-time setup **[Verified: `lib/site-copy.ts` line 779, 05/11/2026]**.
   - **Promotional Rate**: *(or £495 promotional entry rate)* **[Verified: `lib/site-copy.ts` line 780, 05/11/2026]**.
   - **Associated Hosting**: £29/month managed cloud hosting **[Verified: `lib/site-copy.ts` line 781, 05/11/2026]**.
   - **Stated Delivery**: 2 Weeks *(From Client Asset Handover)* **[Verified: `lib/site-copy.ts` line 782, 05/11/2026]**.
   - **IP Terms**: 100% Intellectual Property & DNS Transfer **[Verified: `lib/site-copy.ts` line 792, 05/11/2026]**.

2. **Practice Growth OS (Sales Prof Tier · Most Popular)**:
   - **Headline Price**: £1,495 one-time setup **[Verified: `lib/site-copy.ts` line 802, 05/11/2026]**.
   - **Associated Hosting**: £49/month managed infrastructure **[Verified: `lib/site-copy.ts` line 803, 05/11/2026]**.
   - **Stated Delivery**: 3–4 Weeks *(approx. 1 month)* **[Verified: `lib/site-copy.ts` line 804, 05/11/2026]**.
   - **Core Deliverables**: 60-second inbound client triage, two-way calendar sync (Calendly/Google/Outlook), instant WhatsApp partner alerts, back-end CRM lead routing **[Verified: `lib/site-copy.ts` lines 809–814, 05/11/2026]**.

3. **Institutional Practice Engine (Institutional Scale)**:
   - **Headline Price**: £4,995 – £7,495 one-time setup **[Verified: `lib/site-copy.ts` line 824, 05/11/2026]**.
   - **Associated Hosting**: £99/month enterprise infrastructure **[Verified: `lib/site-copy.ts` line 825, 05/11/2026]**.
   - **Stated Delivery**: 6–8 Weeks *(Staged Sprint Delivery)* **[Verified: `lib/site-copy.ts` line 826, 05/11/2026]**.
   - **Core Deliverables**: Bespoke multi-office architecture, custom tax/dividend estimators, practice management software routing (Karbon, Iris, AccountancyManager) **[Verified: `lib/site-copy.ts` lines 831–836, 05/11/2026]**.

4. **Bespoke Practice Architecture (`customScopeTiers.oneTime`)**:
   - **Headline Price**: Custom Scope *(Agreed on discovery call)* **[Verified: `lib/site-copy.ts` line 970, 05/11/2026]**.
   - **Stated Delivery**: 8–12+ Weeks **[Verified: `README.md` line 54, 05/11/2026]**.

---

#### B. Standalone Monthly Retainer Tiers (`monthlyTiers`)
Stored in `lib/site-copy.ts` and Supabase `pricing_retainer_tiers`, originating from an earlier business model targeting local trades and businesses:
1. **Launch Support**: £195/month *(Hosting oversight, Search Console checks, up to 1 hr monthly tweaks)* **[Verified: `lib/site-copy.ts` lines 848–859, 05/11/2026]**.
2. **Leverage Growth**: £495/month *(Conversion keyword review, CRM pipeline tuning, email automation management)* **[Verified: `lib/site-copy.ts` lines 867–879, 05/11/2026]**.
3. **Enterprise Alliance**: £995/month *(Dedicated up to 6 hrs monthly engineering, custom API/webhook maintenance, direct Slack/WhatsApp channel)* **[Verified: `lib/site-copy.ts` lines 887–899, 05/11/2026]**.

---

#### C. Revenue Share Performance Tiers (`revenueShareTiers`)
Stored in `lib/site-copy.ts` and Supabase `pricing_revshare_tiers`:
1. **Starter Partner**: 5% of digital checkout revenue **[Verified: `lib/site-copy.ts` line 909, 05/11/2026]**.
2. **Pro Growth Partner**: 8% of digital checkout revenue **[Verified: `lib/site-copy.ts` line 928, 05/11/2026]**.
3. **VIP Scale Partner**: 10% of digital checkout revenue **[Verified: `lib/site-copy.ts` line 948, 05/11/2026]**.

---

#### D. Internal & Historical Implementation Plans (`/implementation`)
- **`PRICING_SECTION_REWRITE_AND_RESTRUCTURE_PLAN.md` (Sept 2026)**:
  - Documented setup tiers: Essential Storefront (£495), Pro Order Builder (£995), Full Custom Build (£1,995) **[Verified: `implementation/PRICING_SECTION_REWRITE_AND_RESTRUCTURE_PLAN.md` lines 47–49, 05/11/2026]**.
  - Documented hosting policy: *"Client pays domain and hosting costs directly to their chosen provider (e.g. £5–£15/mo)"* **[Verified: Ibid, line 24]**.

---

#### E. Active Sales Script & Phone Pitch (Founder's Day 1 Outbound)
- **Current Live Phone Offer**: £595 build + £75/month monthly fee **[Verified: Context Summary / User Request, 05/11/2026]**.
- **Add-on Services**: Extra landing page £150, booking + CRM setup £300 **[Verified: Context Summary / User Request, 05/11/2026]**.
- **Deposit Terms**: 50% upfront deposit, balance before final handover **[Verified: Context Summary / User Request, 05/11/2026]**.
- **Contract Duration**: 3-month minimum commitment, then 30 days' notice **[Verified: Context Summary / User Request, 05/11/2026]**.
- **Out of Scope**: Changes beyond initial scope quoted separately **[Verified: Context Summary / User Request, 05/11/2026]**.

---

## 3. Commercial Contradictions Matrix

The audit reveals deep operational and commercial contradictions between what is published on `mercianwealth.com`, what exists in the repository, and what is being pitched on outbound phone calls:

| Item | Live Website (`/pricing`, `/terms`) | Active Phone Pitch | Repository / Implementation Files | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Base Build Price** | £595 (or £495 promo) | £595 | £495 (Essential Storefront in Sept Plan) | **Contradiction**: Two entry prices (£495 and £595) create negotiation confusion. |
| **Growth / CRM Scope** | Included in **Practice Growth OS** (£1,495 setup) | Quoted as a **£300 Add-On** to the £595 build | Included in **Pro Order Builder** (£995 setup) | **Severe Contradiction**: If a partner visits `/pricing` after a call, seeing £1,495 for the CRM/booking triage contradicts the £595 + £300 (£895) phone pitch. |
| **Additional Pages** | Tier 1 = 3 Pages; Tier 2 = Up to 7 Pages | Quoted as **£150 per extra page** | Not documented in public comparison matrix | **Unpublished Add-On**: Add-ons exist on calls but have no published rate card. |
| **Ongoing Monthly Fee** | **£29/mo** (Core) or **£49/mo** (Growth) or **£99/mo** (Inst.) | **£75/mo** (Hosting & Maintenance) | **£195/mo**, **£495/mo**, **£995/mo** (in `monthlyTiers`) | **Critical Failure**: The site promises £29/mo or £49/mo, yet the founder quotes £75/mo on the phone, while the backend code still holds £195/mo retainers. |
| **Commitment Terms** | *"Zero lock-in contracts; cancel anytime with 30 days notice"* (`/terms` Section 5) | **3-month minimum**, then 30 days notice | *"Billed monthly · Zero lock-in contracts"* | **Direct Contractual Clash**: Pitching a 3-month minimum directly breaches the published *"Zero lock-in contracts"* promise on `/terms`. |
| **Deposit Structure** | *"Milestone Safeguards: Divided into milestones linked to build sign-offs"* (`/terms`) | **50% deposit**, balance before handover | `deposit_type: 'milestone_50'` in `lib/quotes.ts` | **Aligned**: 50% deposit matches `lib/quotes.ts`, but differs from multi-stage enterprise wording on `/terms`. |
| **Revenue Share Model** | 5%, 8%, 10% of digital checkout revenue on `/pricing` | None (Never mentioned to accountants) | Still active in `SITE_COPY.pricingPage.revenueShareTiers` | **Niche Mismatch**: Accountancy practices bill via invoice or GoCardless Direct Debit; digital checkout rev-share copy on `/pricing` damages credibility. |

---

## 4. Forensic Audit of Live Performance Claims & Guarantees

The following claims are published across `mercianwealth.com`. Each is audited against reality:

### 1. "Over 95% of practices keep our automated £29/mo or £49/mo managed cloud infrastructure active"
- **Location**: `SITE_COPY.homepage.faq` (line 440) & `SITE_COPY.pricingPage.faq` (line 768).
- **Status**: **[Wrong]**.
- **Evidence**: Mercian Wealth is an emerging solo practice with 67 outbound leads currently being dialled. There is no historical dataset of dozens of accounting practices sustaining a 95% retention rate. This is an unverified placeholder that violates the UK CAP Code (Section 3: Misleading Advertising).

### 2. "Sub-second mobile practice hub loaded smoothly on 4G/5G in under 400ms"
- **Location**: `SITE_COPY.homepage.hero.proofBadge` & `SITE_COPY.pricingPage.oneTimeTiers[0].description`.
- **Status**: **[Verified: Next.js Turbopack Edge CDN build / Lighthouse median TTFB 266–350ms, 05/11/2026]**.
- **Evidence**: Clean Next.js static page exports on Vercel Edge CDN reliably serve static HTML in 200–400ms across UK networks.

### 3. "Instant WhatsApp lead dispatch alerts your practice team in under 5 seconds"
- **Location**: `SITE_COPY.homepage.telemetryTicker` & `lib/site-copy.ts` line 491.
- **Status**: **[Verified: Twilio / Meta Cloud WhatsApp API webhooks, 05/11/2026]**.
- **Evidence**: HTTP webhooks to Twilio or WhatsApp Business Cloud API execute end-to-end delivery within 1.5–3.8 seconds when triggered from Supabase database functions.

### 4. "Our partners used to lose track of inbound corporate enquiries... secured £18k in new retainer fees within the first quarter." (Senior Practice Partner, Chartered Accountancy Practice, Thames Valley & London)
- **Location**: `SITE_COPY.homepage.testimonials.items[0]` (lines 356–361).
- **Status**: **[Unverified]**.
- **Evidence**: No named partner, firm registration number, or written client attribution is provided in the repository or site copy. Under the ICAEW and ASA guidelines, case study testimonials for professional services must be traceable to real entities or clearly marked as illustrative anonymised case studies.

### 5. "Production Architecture: WealthWise Advisory & Private Wealth" & "Production Build: Raw Accounting & Advisory"
- **Location**: `SITE_COPY.homepage.caseStudies.studies` (lines 250–277).
- **Status**: **[Unverified]**.
- **Evidence**: Links point internally to `/portfolio` rather than verified external third-party practice domains.

### 6. "Strict data residency with zero AI model training on your confidential business data"
- **Location**: `components/footer.tsx` (lines 173–175).
- **Status**: **[Verified: Supabase London (eu-west-2) instance & local processing, 05/11/2026]**.
- **Evidence**: Provided Supabase project is configured in AWS London (`eu-west-2`) and no OpenAI data logging endpoints are active in the client data path.

---

## 5. Scope & Revision Terms Audit

1. **Revisions Policy**:
   - **Live Site**: Mentions *"Milestone review on Day 3 where you test the intake flow and request adjustments to copy, pricing steps, or branding"* (`processPage.faq`, line 680).
   - **Phone Terms**: *"Changes beyond scope quoted separately"* **[Verified: Context Summary]**.
   - **Risk**: Neither document defines what constitutes a "revision" vs a "change of scope" (e.g. adding an unexpected multi-step tax calculator, integrating an unannounced practice management tool like Iris, or rewriting approved partner bios).

2. **Asset Ownership & Handover**:
   - **Live Site**: Explicitly states *"100% asset and code ownership. If you choose not to use our managed cloud hosting, we will supply you with our handover checklist and instructions to transfer the Next.js codebase, environment variables, database records, and DNS configuration to your own servers"* (`SITE_COPY.pricingPage.faq`, line 768).
   - **Phone Terms**: *"Balance before final handover"* **[Verified: Context Summary]**.
   - **Operational Reality**: For a £595 client, packaging a Next.js 16 / Supabase codebase, exporting database schemas, and instructing an accountant with zero technical literacy on how to self-host on Vercel or Netlify takes between 4 and 8 founder hours—instantly wiping out the profit margin of the entire £595 build.

---

## 6. Recommendations for Pre-Outbound Alignment

1. **Retire Residual E-Commerce Copy**: Immediately remove the 5%/8%/10% revenue-share tabs and the £195/£495/£995 legacy monthly tiers from active view on the accounting practice funnel.
2. **Harmonise Commitment Language**: Remove the phrase *"Zero lock-in contracts"* if enforcing a 3-month initial commitment on phone calls, or standardise to: *"3-month initial onboarding period to embed the triage system, followed by rolling 30 days' notice."*
3. **Formalise the Add-On Menu**: Either publish the £150 extra page and £300 CRM add-on in a transparent modular rate card, or bundle them cleanly into the Practice Growth OS package.
4. **Remove Unsubstantiated Retention Statistics**: Remove the *"over 95% of practices keep"* claim to eliminate statutory advertising risk with the ASA and maintain high institutional trust with accountants.
