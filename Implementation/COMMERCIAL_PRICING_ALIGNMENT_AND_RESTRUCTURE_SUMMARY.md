# Commercial Pricing Alignment and Restructure Summary
**Date**: November 2026  
**Subject**: Mercian Wealth (`mercianwealth.com`) Commercial Offer & Retainer Architecture Alignment  
**Founder**: Gurtej Deep (Solo Founder & Systems Architect)  
**Status**: Implemented & Verified (0 TypeScript errors, 0 build errors)

---

## 1. Executive Summary & Objective

Gurtej Deep is operating full-time selling digital practice intake hubs and speed-to-lead enquiry conversion systems to UK independent accountancy practices (1–5 partner firms). With 67 warm leads in the pipeline contacted via a structured 4-touch protocol (Days 1, 3, 5, 7) and a target of 20 client onboardings for November, the commercial offer structure required alignment:

1. **The £75/mo Objection**: When £75/month was previously framed simply as "hosting and maintenance", UK practice partners immediately anchored against commercial site builders (Wix at £14/mo, Squarespace at £17/mo, or generic shared hosting at £5–£10/mo) and pushed back.
2. **The Strategic Fix**: Separate foundational technical care from client revenue retention:
   - **Practice Care (£29/month)**: Positioned as the default baseline covering UK edge cloud hosting, SSL, daily off-site backups, domain uptime monitoring, and 1 monthly practice content/pricing update.
   - **Practice Growth (£75/month)**: Positioned as an enquiry follow-up and speed-to-lead retention engine (24h / 3-day / 7-day multi-touch follow-up, instant WhatsApp partner alerts, booking maintenance, and monthly enquiry reports). This tier is justified against the practice's own average corporate client value (£1,500–£3,600/yr), where recovering just one single lost lead repays 2–4 years of retainer fees.
3. **Commitment Terms**: Removed misleading "zero lock-in contracts; cancel anytime" phrasing. Standardised across `/terms`, `/pricing`, FAQs, and copy to an **initial 3-month onboarding term**, followed by standard rolling 30 days' written notice, collected via automated Direct Debit (GoCardless standard).
4. **Public Cleanup**: Eradicated legacy digital checkout revenue-share tiers (5%, 8%, 10%) which did not apply to professional B2B fee-earners, removed legacy £195/£495/£995 monthly agency tiers, and eliminated unsubstantiated "over 95% of practices keep" claims.
5. **No Paid Overhead Policy**: Reaffirmed that all verification, compliance audits, and site health checks are conducted using free, native, and sovereign tooling (Google Search Console, Lighthouse, PageSpeed Insights, free Companies House/ICO lookups) with zero third-party software subscriptions.

---

## 2. Canonical Pricing Ladder & Retainer Architecture

### Setup & Implementation Packages (One-Time)

| Package | Setup Fee | Promotional / Early-Bird | Turnaround | Core Scope & Deliverables | Ongoing Retainer Default |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Practice Core** *(Base entry)* | **£595** | **£495** | **2 Weeks** | Sub-second mobile-first practice hub, partner call/email routing, MTD/ICAEW trust badges, 100% IP & DNS ownership. | **£29/mo** *(Practice Care)* |
| **Practice Growth OS** *(Sales Prof Tier)* | **£1,495** | — | **3–4 Weeks (~1 Mo)** | 60-second inbound enquiry triage, Calendly/Google/Outlook booking sync, instant WhatsApp partner dispatches, CRM lead routing. | **£75/mo** *(Practice Growth)* |
| **Institutional Practice Engine** | **£4,995 – £7,495** | — | **6–8 Weeks** | Bespoke multi-office architecture (WealthWise tier), custom tax/dividend estimators, client portal & practice management routing. | **£99/mo** *(Priority Support)* |
| **Bespoke Practice Architecture** | **Custom Scope** | — | **8–12+ Weeks** | Multi-partner groups, franchise networks, or custom Karbon/Iris/AccountancyManager integrations. | **Custom SLA** |

### Retainer & Ongoing Care Structure (Monthly via Direct Debit)

| Retainer Tier | Monthly Fee | Primary Purpose | Deliverables Included | Time to Deliver (Founder Hours) |
| :--- | :--- | :--- | :--- | :--- |
| **Practice Care** *(Default)* | **£29/mo** | Technical uptime, security, peace of mind | UK edge cloud hosting, automated SSL, daily code/asset backups, uptime monitoring, 1 minor copy/pricing edit/mo, email support. | ~10–15 mins/client/mo |
| **Practice Growth** *(Upsell)* | **£75/mo** | Enquiry recovery, speed-to-lead, partner lead dispatch | Everything in Practice Care + 24h / 3-day / 7-day multi-touch follow-up protocol, instant WhatsApp alerts, monthly enquiry report, calendar sync tuning. | ~45–60 mins/client/mo |

*Higher tiers (£125/mo, £200/mo) are omitted from public display to avoid choice paralysis and keep operational delivery within solo founder capacity.*

---

## 3. Financial Modelling for 20 Sales (November Target)

Based on 20 completed builds at the £595 setup price point (or blend with £495 promo), here is the recurring revenue and workload breakdown across three realistic scenarios:

| Metric | Scenario A: 100% Care (£29) | Scenario B: 70% Care / 30% Growth | Scenario C: 40% Care / 60% Growth |
| :--- | :--- | :--- | :--- |
| **Setup Cash Collected** | £11,900 (20 × £595) | £11,900 | £11,900 |
| **Monthly Retainer Revenue** | **£580 / month** | **£856 / month** | **£1,132 / month** |
| **Annualized Recurring (ARR)** | £6,960 / year | £10,272 / year | £13,584 / year |
| **Monthly Founder Delivery Time** | ~4 hours / month | ~7.5 hours / month | ~11 hours / month |
| **Effective Retainer Hourly Rate** | £145 / hour | £114 / hour | £103 / hour |

**Key Takeaway**: Even under Scenario C (12 Growth clients and 8 Care clients), ongoing delivery consumes only ~11 hours per month—well within solo founder operating capacity while establishing a rock-solid recurring cash flow foundation.

---

## 4. Statutory & Regulatory Verification Summary

Every claim and operational policy has been checked against UK law and industry codes:

1. **B2B Cooling-Off Exemption**: Under the *Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013*, the statutory 14-day cooling-off period applies strictly to B2C consumer contracts. In B2B dealings with accounting partnerships or limited companies, a 3-month minimum commitment is completely lawful and enforceable under the *Unfair Contract Terms Act 1977 (UCTA)*.
2. **Data Protection & Processor Role**: When capturing practice client intake enquiries and dispatching WhatsApp/email alerts, Mercian Wealth acts as a **Data Processor** under UK GDPR. Accountancy practices act as **Data Controllers**. A lightweight Data Processing Agreement (DPA) schedule in standard terms covers this relationship cleanly. Registration with the ICO (£35/yr tier 1 fee for micro-businesses) is maintained.
3. **Cold Calling & PECR / CTPS Compliance**: Under Regulation 21 of the *Privacy and Electronic Communications Regulations (PECR)*, cold calling B2B prospects is permitted, but numbers registered on the Corporate Telephone Preference Service (CTPS) or TPS must be respected. Free CTPS checking or direct business directory lookups are utilised prior to calling.
4. **HMRC VAT & Trading Status**: As a sole trader operating under the UK VAT registration threshold (£90,000 rolling 12 months as of 1 April 2024), invoices are issued without VAT and display sole trader legal notices.
5. **Accountancy Practice Marketing Sensitivities**: ICAEW Code of Ethics (Section 300) and ACCA Rulebook prohibit exaggerated claims, unverified testimonials, or misleading fee representations. Removing "over 95% of practices keep" and unverified claims ensures practice partners trust Mercian Wealth's compliance integrity.

---

## 5. Code Modifications Completed

The following files across the repository were modified and validated:

1. [`lib/site-copy.ts`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/lib/site-copy.ts):
   - Updated `pricingPage.oneTimeTiers`:
     - Practice Core: monthly hosting "29", breakdown "£29/mo Practice Care · 100% asset ownership", domainHostingNote "£29/mo Practice Care with 3-month initial onboarding term."
     - Practice Growth OS: monthly hosting "75", breakdown "£75/mo Practice Growth engine · Milestone-staged delivery", domainHostingNote "£75/mo Practice Growth retention engine, 100% practice-owned."
   - Updated `pricingPage.monthlyTiers`: replaced legacy 3 tiers with canonical **Practice Care (£29/mo)** and **Practice Growth (£75/mo)**.
   - Cleared `pricingPage.revenueShareTiers` to `[]`.
   - Updated FAQ entries to state 3-month onboarding term via automated Direct Debit and removed the unsubstantiated "over 95%" claim.
   - Updated testimonials `cohortCard.paragraph3` to reference £29/mo Care and £75/mo Growth with 3-month onboarding term.
2. [`components/pricing.tsx`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/pricing.tsx):
   - Updated comparison category item to `"£29/mo Practice Care"` and `"£75/mo Practice Growth"`.
   - Updated banner text to explicitly reference £29/mo Practice Care or £75/mo Practice Growth via Direct Debit with 3-month initial term.
   - Fixed hosting fee indicator to display `£75/mo` for Practice Growth OS.
3. [`app/terms/page.tsx`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/app/terms/page.tsx):
   - Aligned Section 5 to specify £29/mo Practice Care and £75/mo Practice Growth billed via automated Direct Debit on an initial 3-month onboarding period, followed by standard rolling 30 days' written notice.
4. [`app/pricing/page.tsx`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/app/pricing/page.tsx):
   - Updated schema.org structured Offer data for Practice Core (£29/mo Practice Care) and Practice Growth OS (£75/mo managed growth engine).
5. [`README.md`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/README.md):
   - Updated 3-Tier Commercial Ladder table to reflect £29/mo Practice Care and £75/mo Practice Growth with 3-month onboarding term documentation.
6. [`implementation/`](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/implementation):
   - All strategic planning documents (`current-state-audit.md`, `pricing-brainstorm.md`, `fact-check.md`, `mentor-review.md`, and this summary) are persisted.

---

## 6. Verification & Quality Gates

- **TypeScript Compilation**: `npx tsc --noEmit` passed with **0 errors**.
- **Next.js Production Build**: `npm run build` completed successfully, compiling all 77 static and dynamic routes with **0 errors**.
- **Mobile Viewport Ergonomics**: Responsive containers, pricing card layouts, touch-target buttons (min 44px), and sticky action bars verified intact across 390px, 768px, and 1280px viewports.
- **Git Commit & Push**: Staged, committed, and pushed to `main` branch on remote GitHub repository.
