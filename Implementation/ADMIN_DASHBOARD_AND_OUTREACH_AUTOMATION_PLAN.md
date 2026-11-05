# Master Implementation Plan: Admin Dashboard Overhaul & Autonomous Sales Engine

**Date**: 5 November 2026  
**Subject**: Admin Leads Architecture Restructure & Autonomous Strike List Engine  
**Founder**: Gurtej Deep (Mercian Wealth)  
**Target**: 5 Sales in November + 5 Sales in December (10 total at £595+ setup and £29/mo+ retainers)  
**Status**: Ready for Code Implementation & Verification  

---

## 1. Executive Summary & Root Cause Analysis

### The Problem: Channel Contamination & Cognitive Bloat
Currently, `app/(admin)/admin/leads/page.tsx` (2,674 lines) dumps all lead sources into a single flat database view. This creates massive operational clutter:
1. **Inbound Bookings**: Prospects who submitted `/book` or the 60-second fee scoper with high commercial intent are mixed together with raw, cold-scraped phone numbers.
2. **Cold Outbound Scrapes**: Unverified leads from Google Maps / n8n scrapers are listed alongside manually audited accounting practices.
3. **Filter Sprawl**: Because all leads share one view, the UI required 6 conflicting filter systems (`queueFilter`, `quickFilter`, `followUpSubFilter`, `tradeFilter`, `activeTab`, `viewMode`), creating cognitive friction during fast calling blocks.
4. **Unverified Outreach Modals**: The existing `OutreachModal` (1,120 lines) generates synthetic AI hypotheses (*"average response speed after 6 PM"*, *"unprotected cross-border intake"*, *"WhatsApp video walkthroughs"*) rather than displaying the **Sales Prof's exact 4-touch script** and the single **verified Section M human-observable friction**.

### The Solution: The 4-Segment Operational Engine
Segment the entire leads workflow into 4 distinct, purpose-built streams:
- **Stream 1: 🔥 Inbound Bookings & Enquiries** (High commercial intent from `/book`, `/contact`, and triage widget).
- **Stream 2: 📞 Daily Call Strike List** (Curated, audited UK practices with verified Section M frictions and 1-tap dialling).
- **Stream 3: 🔄 Follow-Up Pipeline** (Automated Day 1 / 3 / 5 / 7 cadence tracking with 1-click script/email copy).
- **Stream 4: 📥 Raw Lead Pool / Scraper Staging** (Staging area for incoming n8n/Google Maps scrapes to be audited or deleted).

---

## 2. Segment Architecture Specifications

### Segment 1: 🔥 Inbound Bookings & Enquiries (Priority 1)
* **Ingestion Source**: Website `/book` submission, interactive practice triage widget, and contact forms.
* **Fields Displayed**:
  * Practice Name & Contact Name
  * Email & Mobile Phone (with 1-click `tel:` link)
  * Turnover Bracket & Business Entity Type
  * Current Practice Software (Xero, Iris, Karbon, QuickBooks, FreeAgent)
  * Preferred Consultation Date & Time
* **Action Controls**:
  * `[Confirm Discovery Call]` (Direct calendar sync)
  * `[Message on WhatsApp]` (Direct `wa.me` opener)
  * Status Flow: `New Inbound` $\rightarrow$ `Discovery Booked` $\rightarrow$ `Proposal Sent` $\rightarrow$ `Won (£595+)`

### Segment 2: 📞 Daily Call Strike List (Audited & Ready)
* **Ingestion Source**: Only UK accountancy practices that have been audited and assigned a **verified Section M human friction**.
* **Card Display**:
  * Practice Name & Address / Postcode (e.g., *Reading, Berkshire*)
  * Confirmed Director / Partner Name
  * Direct Phone (with `tel:` protocol for mobile dialling)
  * Website link (opens in new tab)
  * **Verified Human Friction Badge** (e.g. *Unclickable phone number in header*, *Zero interactive contact form*, *Image captcha friction on mobile*)
  * **The Sales Prof Day 1 Script Card** (Pre-populated with partner name and friction)
* **Single-Tap Actions**:
  * `[📞 Call Now]` (Triggers native phone dialler)
  * `[✅ Booked 15-Min Demo]` $\rightarrow$ Moves directly to Inbound / Discovery Pipeline
  * `[🎙️ Voicemail Left]` $\rightarrow$ Copies Day 1 follow-up email and WhatsApp text to clipboard; schedules Day 3 Follow-Up badge for +48 hours; moves card to Follow-Up Pipeline
  * `[🚪 Gatekeeper Block]` $\rightarrow$ Prompts for receptionist name & callback time
  * `[❌ Lost / Not Relevant]` $\rightarrow$ Moves to Archive

### Segment 3: 🔄 Follow-Up Pipeline (Day 1 / 3 / 5 / 7 Cadence)
* **Ingestion Source**: Any lead where a voicemail was left, or a partner requested an email/WhatsApp follow-up.
* **Cadence Stages**:
  * **Day 1**: Initial call + voicemail left + immediate email/WhatsApp sent.
  * **Day 3 (48h)**: Follow-Up Call / Message (*"Following up on my note regarding [friction]... quick 2-minute chat or close the loop?"*)
  * **Day 5 (96h)**: Clarity Check (*"Giving you the opportunity to give a clear yes or no... no hard feelings either way."*)
  * **Day 7 (144h)**: Breakup / File Closure (*"Closing this out on my side... if [friction] becomes a priority, you know where to find me."*)
* **Action Controls**:
  * Automated Time Badges: `Due Day 3 in Xh`, `Due Day 5`, `Due Final Breakup`.
  * `[Copy Day X Script]` (1-click clipboard copy).
  * `[Mark Touch Sent]` (Advances cadence automatically).

### Segment 4: 📥 Raw Lead Pool / Scraper Staging (Automated Inbox)
* **Ingestion Source**: Batch imports via n8n webhook or Google Maps scraper.
* **Purpose**: Quarantine and triage. Prevents raw leads from contaminating the calling screen.
* **Autonomous Audit Trigger**:
  * Run automated Section M crawler against website URL.
  * Detect: Unclickable `tel:`, form captcha, missing mobile viewport, no calendar/WhatsApp.
  * `[Promote to Strike List]` (Assigns friction, generates scripts, moves to Tab 2).
  * `[Delete / Non-Accountant]` (Purges record).

---

## 3. UI, Modals & Mobile Ergonomics Overhaul

### Dark Theme & Visual Hierarchy (Preserving Original Brand)
* **Backgrounds**: `#050505` (Base), `#0B0B0D` (Cards), `#141417` (Sub-cards and badges).
* **Accents**: `#DAA640` (Gold highlight), `#10B981` (Emerald call / win action), `#38BDF8` (Sky blue voicemail / follow-up), `#F43F5E` (Rose alert / archive).
* **Typography**: Clean monospace badges for numbers and metrics, font-sans for cards and scripts.

### Focused Call Cockpit Modal (`components/admin/outreach-modal.tsx`)
* **Mobile (<640px)**: Renders as a smooth 92vh bottom sheet with sticky bottom action buttons (minimum 48px touch targets for thumb navigation).
* **Desktop ($\ge$640px)**: Renders as a centered split-view modal with practice overview on the left and Sales Prof script card + one-click action buttons on the right.
* **Content Structure**:
  1. Header: Practice Name, Location, Director Name, Clickable Phone & Website.
  2. The Verified Friction: Highlighted in amber callout box with plain English description.
  3. The Sales Prof Script Card: Word-for-word Day 1 script with dynamic values pre-inserted.
  4. Quick Responses Cheatsheet: Expandable accordion covering:
     - *"Send me an email"* $\rightarrow$ *"Happy to. What address? And if it isn't relevant, say so and I'll close it."*
     - *"Busy until January"* $\rightarrow$ *"Understood. Which week in February should I call?"*
     - *"Who are you?"* $\rightarrow$ *"Gurtej, I build enquiry and follow-up systems for accounting practices. I noticed [friction], so I called. Worth two minutes?"*
     - *"Not interested"* $\rightarrow$ *"No problem, thanks for the clarity."*
  5. Action Buttons:
     - `[✅ Booked 15-Min Demo]` (Emerald)
     - `[🎙️ Voicemail Left (Copy Email & WhatsApp)]` (Sky blue)
     - `[🚪 Gatekeeper Callback]` (Amber)
     - `[❌ Lost / Archive]` (Zinc)

---

## 4. Implementation Steps & Verification Protocol

1. **Refactor `app/(admin)/admin/leads/page.tsx`**:
   - Replace the 6 conflicting filters with the **4 Master Stream Tabs**:
     1. `inbound` (🔥 Inbound Bookings)
     2. `strike_list` (📞 Daily Call Strike List)
     3. `follow_up` (🔄 Follow-Up Pipeline)
     4. `scraper_inbox` (📥 Raw Lead Pool)
   - Retain search bar, simple sorting, and quick lead creation.
2. **Refactor `components/admin/outreach-modal.tsx`**:
   - Strip legacy AI hypotheses and replace with the dedicated **Sales Cockpit Modal** featuring the Sales Prof 4-touch protocol and Section M friction engine.
3. **Preserve Database Compatibility**:
   - Ensure all Supabase queries (`leads` table updates, `scraped_metadata`, `notes`, `status`) remain 100% backward-compatible.
4. **Verification Gates**:
   - Run `npx tsc --noEmit` and confirm **0 errors**.
   - Run `npm run build` and confirm all 77 routes compile with **0 errors**.
   - Verify mobile responsiveness (<640px) and dark theme visual continuity.
