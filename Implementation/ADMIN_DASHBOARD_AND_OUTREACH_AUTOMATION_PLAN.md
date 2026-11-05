# Master Implementation Plan: Admin Dashboard Overhaul & Autonomous Sales Engine

**Date**: 5 November 2026  
**Subject**: Admin Leads Architecture Restructure & Autonomous Strike List Engine  
**Founder**: Gurtej Deep (Mercian Wealth)  
**Target**: 5 Sales in November + 5 Sales in December (10 total at £595+ setup and £29/mo+ retainers)  
**Status**: COMPLETED & VERIFIED (0 TypeScript Errors, 0 Build Errors, Live on `main`)  

---

## 1. Executive Summary & Root Cause Analysis

### The Problem: Channel Contamination & Cognitive Bloat
Previously, `app/(admin)/admin/leads/page.tsx` (2,674 lines) dumped all lead sources into a single flat database view. This created massive operational clutter:
1. **Inbound Bookings**: Prospects who submitted `/book` or the 60-second fee scoper with high commercial intent were mixed together with raw, cold-scraped phone numbers.
2. **Cold Outbound Scrapes**: Unverified leads from Google Maps / n8n scrapers were listed alongside manually audited accounting practices.
3. **Filter Sprawl**: Because all leads shared one view, the UI required 6 conflicting filter systems (`queueFilter`, `quickFilter`, `followUpSubFilter`, `tradeFilter`, `activeTab`, `viewMode`), creating cognitive friction during fast calling blocks.
4. **Unverified Outreach Modals**: The existing `OutreachModal` (1,120 lines) generated synthetic AI hypotheses (*"average response speed after 6 PM"*, *"unprotected cross-border intake"*, *"WhatsApp video walkthroughs"*) rather than displaying the **Sales Prof's exact 4-touch script** and the single **verified Section M human-observable friction**.
5. **Legacy Pitch Leakage**: `lead-friction-dossier.tsx` contained outdated property referral scripts referencing "Viky", and unparsed `• VERIFIED FLAW:` raw text leaked into header subtitles and prototype demo URLs.

### The Solution: The 4-Segment Operational Engine
Segment the entire leads workflow into 4 distinct, purpose-built streams:
- **Stream 1: 🔥 Inbound Bookings & Enquiries** (High commercial intent from `/book`, `/contact`, and triage widget).
- **Stream 2: 📞 Daily Call Strike List** (Curated, audited UK practices with verified Section M frictions and 1-tap dialling).
- **Stream 3: 🔄 Follow-Up Pipeline** (Automated Day 1 / 3 / 5 / 7 cadence tracking with 1-click script/email copy).
- **Stream 4: 📥 Raw Lead Pool / Scraper Staging** (Staging area for incoming n8n/Google Maps scrapes to be audited or deleted).

---

## 2. Completed Architecture & Component Implementations

### A. The 4-Stream Operational Engine Bar (`app/(admin)/admin/leads/page.tsx`)
Added the 4-segment operational selector directly above the leads ledger:
1. `🔥 Inbound Leads` (Priority 1: Enquiries & Bookings from web)
2. `📞 Call Strike List` (Active UK Chartered Accounting firms with verified Section M human frictions)
3. `🔄 Follow-Up Cadence` (Leads requiring Day 1 / 3 / 5 / 7 touches)
4. `📥 Scraper Inbox` (Raw staging pool)

### B. Focused Call Cockpit Modal (`components/admin/outreach-modal.tsx`)
- High-contrast 48px `[📞 Call Partner]` button using `tel:` protocol.
- Amber callout box rendering the **Verified Section M Human Friction**.
- **Word-for-Word Day 1 Call Script** proposing next week's slots (Tuesday/Wednesday 10:30am).
- **Written Follow-Up Email Card** displaying Subject line and Body with 1-click clipboard copy.
- Quick Replies / Objection Cheatsheet (*"Send me an email"*, *"Busy until January"*, *"Who are you?"*, *"Not interested"*).
- Instant 1-tap outcome triggers: `[Booked 15-Min Demo]`, `[Voicemail Left]`, `[Not Relevant]`.

### C. Master Sales Prof Lead Dossier (`components/admin/lead-friction-dossier.tsx`)
- Completely removed all legacy property referral scripts ("Viky") and AI synthetic hypotheses.
- Implemented the 6-stage Sales Prof Cadence Selector:
  1. `📞 Day 1: Call & VM` (Call opener, 2-minute permission agreement, 20-second voicemail)
  2. `✉️ Written Follow-Up` (Micro-yes email with direct friction observation + WhatsApp ping)
  3. `🔄 Day 3: Follow-Up 1` (The Value Check: *"Did that screenshot make sense?"*)
  4. `🛑 Day 5: Breakup` (Clean takeaway: *"Should I close your file?"*)
  5. `🎯 15-Min Discovery` (The 4-stage diagnostic protocol: Agenda, Diagnostic, Prototype Demo, Direction)
  6. `🚀 Prototype Link` (Delivered only once the call is booked)

### D. Playbook Engine & Demo Preview Sanitization (`hooks/use-playbook-engine.ts` & `app/preview/demo/page.tsx`)
- Sanitized `city` and `address` resolution: Prevents raw `• VERIFIED FLAW:` strings from corrupting URLs.
- Dynamic Niche Detection: Accounting firms automatically resolve `trade` to `"Chartered Accountants"` rather than `"local trade"`, and renders the professional Practice OS layout on `/preview/demo`.
- Diagnostic Error Boundary (`app/(admin)/error.tsx`): Displays exact error message and stack trace if an admin view encounters an issue.

---

## 3. Lead 1 Forensic Site Audit Dossier: Dead Simple Accounting

### Practice Identity
* **Business Name:** Dead Simple Accounting
* **Website:** [deadsimpleaccounting.co.uk](https://www.deadsimpleaccounting.co.uk/)
* **Contact Page:** [deadsimpleaccounting.co.uk/contact/](https://www.deadsimpleaccounting.co.uk/contact/)
* **Direct Office Line:** `0118 359 3666` (Reading Landline)
* **Registered Address:** Suite 30, 105 London Street, Reading, Berkshire, RG1 4QD
* **Target Decision Maker:** Practice Director / Senior Partner

### Forensic Technical & Conversion Audit (Section N Framework)
1. **Speed of Comprehension:** Strong branding (*"Expert accountants for small business"*), but the value proposition is buried beneath generic icon grids.
2. **Interactive Booking Ease (Primary Flaw):**
   - **ZERO interactive contact form on `/contact/`.**
   - In place of a contact form, the page displays their contact details next to a photograph of **Lionel Richie holding a telephone from the 1983 "Hello" music video**.
   - Input index: `-1` (no input fields, textareas, or dropdowns exist on the page).
3. **Speed-to-Lead & Out-of-Hours Friction:**
   - Out-of-hours mobile visitors who want a quote or callback must exit the website, open an email application, and manually draft a message.
   - No automated qualification (sole trader vs Ltd Co, annual turnover, bookkeeping vs year-end).
4. **Commercial Bleed:**
   - Busy company directors bounce to competing Reading firms (e.g. Chart Accountancy, Vale & West) with active booking forms.
   - Partners waste billable advisory hours fielding unqualified email enquiries with missing accounting records.

### Tailored Sales Prof Calling & Email Assets (Friday 6 Nov Sprint)

#### 1. Day 1 Word-for-Word Call Script
> *“Hey Practice Director, I was on the Dead Simple Accounting site earlier and noticed on your contact page there’s no interactive enquiry form—just a mailto link next to the Lionel Richie photo. That’s exactly why I’m calling. Would it be totally crazy for a two minute chat to see if that’s even relevant on your end?”*

**When they say yes to 2 minutes:**
> *“Let’s book 15 minutes next week. I’ve already mocked up a clean 60-second mobile intake scoper specifically for Dead Simple Accounting that qualifies whether they're a Ltd Co or sole trader before booking directly into your diary. Does next Tuesday or Wednesday morning at 10:30am work better for you?”*

#### 2. 20-Second Voicemail Script
> *“Hi Practice Director, it's Gurtej calling regarding the Dead Simple Accounting website. I noticed an issue on your contact page where mobile visitors have no interactive form to submit an enquiry. I'm sending a quick 10-second screenshot to your email so you can see it directly. My number is 07851 055929. Speak soon.”*

#### 3. Written Follow-Up Email (Dispatched Immediately)
* **Subject:** `Quick observation on deadsimpleaccounting.co.uk contact flow`
* **To:** `info@deadsimpleaccounting.co.uk`

```text
Hi Practice Director,

I called your office a moment ago.

I was reviewing the Dead Simple Accounting website on mobile and noticed on your /contact/ page there’s no interactive enquiry form—just the direct email link next to the Lionel Richie photo.

For high-value prospective clients browsing after hours who want a quick quote, they have to leave the site to draft an email manually, which causes unnecessary drop-off.

I put together a quick 60-second interactive scoper showing how other UK chartered firms qualify sole trader vs Ltd Co turnover upfront before booking directly into the partner calendar.

Would it make sense to connect for 10–15 minutes next Tuesday or Wednesday at 10:30am to take a quick look? If not relevant on your end, no problem at all—just let me know and I'll close your file.

Best regards,
Gurtej Deep
Mercian Wealth | 07851 055929 | mercianwealth.com
```

---

## 4. Current UK Accounting Strike List (Ready for Calling Sprint)

| # | Practice Name | Location | Phone | Verified Human Friction | Status |
|---|---|---|---|---|---|
| **1** | **Dead Simple Accounting** | Reading, Berkshire | `0118 359 3666` | Zero interactive contact form on `/contact/` (mailto link beside Lionel Richie meme photo) | **Audited & Ready** |
| **2** | **Chart Accountancy** | Reading, Berkshire | `0118 449 2321` | Phone number rendered as plain unclickable text without `tel:` link in mobile header | **Audited & Ready** |
| **3** | **Vale and West** | Reading, Berkshire | `0118 957 3238` | Static corporate text wall on intake with zero out-of-hours calendar triage | **Audited & Ready** |
| **4** | **Berkshire Accountants Ltd** | Reading, Berkshire | `0118 327 4200` | Unclickable header phone number and mobile captcha drop-off friction | **Audited & Ready** |
| **5** | **A&C Chartered Accountants** | Manchester | `0161 832 4841` | Confusing form field typo reading *"Contact Name Number"* and zero turnover triage | **Audited & Ready** |

---

## 5. Verification & Health Gate
* **TypeScript Check:** `npx tsc --noEmit` $\rightarrow$ **0 errors**
* **Next.js Production Build:** `npm run build` $\rightarrow$ **0 errors across all 77 routes**
* **Git Repository:** Synced to `origin/main` commit `5795c31`
