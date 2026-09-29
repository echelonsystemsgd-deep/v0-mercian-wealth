# Implementation Plan: Lead Outreach Retention, Dynamic Filtering, Sorting & Phone Intelligence

## Date: 2026-09-29
## Target: Admin Dashboard (`/admin`), Lead Outreach Ledger (`/admin/leads`), & Outreach Components
## Author: Google DeepMind Antigravity Pair Programmer

---

## 1. Problem Statement & User Friction

1. **Immediate Lead Displacement (Vanishing Lead Syndrome):**
   - When an operator clicks WhatsApp on a fresh lead, the lead's status is optimistically updated to `Contacted`.
   - Because the active filter strictly checks `status === 'New'`, the lead vanishes from the screen immediately.
   - When returning to the admin tab from WhatsApp, the operator cannot view the lead's website, re-assess (recess) the storefront, or inspect dossier notes.
   - **Requirement:** Keep the lead visible in the current session view with a distinct `"Contacted (Active Session)"` badge. The lead must only move to the Contacted ledger when the operator refreshes the page or navigates away.

2. **Absence of 1-Click New vs Contacted Filter:**
   - Switching between New and Contacted prospects currently requires deciphering complex queue states.
   - **Requirement:** High-visibility, 1-click filter button group (`All Leads`, `⚡ New Leads`, `💬 Contacted Leads`, `🎯 Active Pipeline`) with live counts.

3. **Missing "Latest to Last" Chronological Sorting:**
   - Leads were locked in descending date order without user controls.
   - **Requirement:** Interactive sort controls to toggle between Newest First (Latest to Oldest) and First In First Out (Oldest to Latest), as well as by Rating, Reviews, and Trade.

4. **Sub-Category / Trade Organization:**
   - Leads from various trades (Jeweller, Roofer, Dentist, Plumber, etc.) and storefront pathways (Has Website, No Website) were unfilterable by sub-category.
   - **Requirement:** Dynamic sub-category dropdown filter populated from active database records, enabling targeted batch outreach by niche.

5. **WhatsApp Failures on UK Landlines (`+4411…`, `+441…`, `+442…`):**
   - Numbers starting with `+4411…` (0113 Leeds, 0114 Sheffield, 0115 Nottingham, etc.) and other `01/02` prefixes are UK geographic landlines.
   - Standard WhatsApp does not exist on these numbers. Showing a WhatsApp button causes failed links (`wa.me/+4411...`).
   - Only `+447…` (07xxx) are genuine UK mobile numbers capable of receiving WhatsApp.
   - **Requirement:** Deterministic phone classification engine. Verified mobiles get primary WhatsApp CTAs. Landlines get dedicated `"Call Office"` (`tel:...`) buttons with clear visual distinction.

6. **Mobile Responsiveness & Ergonomics:**
   - Operators accessing the admin dashboard on mobile devices (smartphones/tablets) require thumb-friendly touch targets (min 44px), horizontally scrollable filter pill tracks, and responsive stacked card layouts.

---

## 2. Technical Architecture & File Inventory

```
lib/
└── phone-classifier.ts                       <-- [NEW] Core UK & Int'l phone classification engine
components/admin/
├── today-outreach-strip.tsx                 <-- [UPDATED] Mobile/Landline distinction + website preview links
├── outreach-modal.tsx                       <-- [UPDATED] Visual channel badges (WhatsApp vs Landline)
├── outreach-sprint-runner.tsx               <-- [UPDATED] Sprint hygiene for mobile vs landline
app/(admin)/
├── admin/
│   ├── page.tsx                             <-- [UPDATED] Verified mobile priority for sprint
│   └── leads/
│       └── page.tsx                         <-- [UPDATED] Retention engine, quick filters, sorting & subcategories
```

---

## 3. Implementation Steps

### Step 1: Create `lib/phone-classifier.ts`
- Extract raw digits and normalize UK numbers (`07...` -> `+447...`, `01...` -> `+441...`, `02...` -> `+442...`).
- Classify into:
  - `uk_mobile`: Starts with `447` or `07`, 10-11 digits. WhatsApp Viable = `true`.
  - `uk_landline`: Starts with `441`, `442`, `01`, `02`. WhatsApp Viable = `false`.
  - `international_mobile`: Valid non-UK mobile.
  - `invalid / unknown`: Missing or < 7 digits.
- Map major UK area codes for geographic clarity (`0113` -> Leeds, `0114` -> Sheffield, `0121` -> Birmingham, `020` -> London, etc.).
- Export helpers: `classifyPhoneNumber()`, `formatUKDisplay()`, `getWhatsAppUrl()`, `getTelUrl()`.

### Step 2: Implement In-Session Retention in `app/(admin)/admin/leads/page.tsx`
- Maintain `contactedInSessionIds: Set<string>`.
- When WhatsApp is clicked on a `New` lead:
  - Update Supabase status in the background.
  - Add lead ID to `contactedInSessionIds`.
  - Keep the lead visible in the filtered view with an amber status badge: `✓ Contacted (Active Session)`.
  - Display an in-session banner: *"X leads contacted in this session. Refresh dashboard or switch filters to finalize ledger placement."* with a 1-click `[Refresh Dashboard]` trigger.
  - Retain full access to the lead's website link, dossier link, and notes.

### Step 3: Implement Quick Filter Bar & Sort Controls in `app/(admin)/admin/leads/page.tsx`
- Add quick filter buttons:
  - **All Pipeline Leads**
  - **⚡ New Leads**
  - **💬 Contacted Leads**
  - **🎯 Active Deals (Booked / Proposals)**
- Add Sort Dropdown + Direction Toggle:
  - **Latest to Oldest (Newest First)** (`created_at DESC`)
  - **Oldest to Latest (First In First Out)** (`created_at ASC`)
  - **Highest Rating**
  - **Most Reviews**
  - **Sub-Category / Trade Name**
- Add Sub-Category / Niche Filter:
  - Dynamic dropdown listing all niches present in the active dataset with lead counts.

### Step 4: Overhaul Presentation of Phone Numbers & CTAs
- In `app/(admin)/admin/leads/page.tsx` (Cards, Table, and Kanban views):
  - If Mobile: Green/Gold **[ WhatsApp ]** button (`wa.me/...`).
  - If Landline: Blue/Zinc **[ 📞 Call Office ]** button (`tel:...`) with label `"UK Landline (No WhatsApp)"`.
- In `components/admin/today-outreach-strip.tsx`:
  - Show proper buttons based on phone classification.
  - Add direct website preview link so operator can assess client storefront before or during outreach.
  - Ensure 100% mobile responsive card grid.

### Step 5: Verify Build & Mobile Responsiveness
- Run TypeScript checks (`tsc --noEmit` or `next build`) to ensure 0 build errors.
- Verify touch targets, margins, padding, and horizontal scrollbars on mobile viewport widths (375px - 768px).
