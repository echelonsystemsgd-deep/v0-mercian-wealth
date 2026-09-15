# Admin Dashboard Design System & n8n Lead Pipeline Overhaul

Comprehensive architectural plan to resolve data loss and inaccuracy in the lead generation machine, fix the Supabase schema relationship bug, standardize the admin dashboard and sitewide design system on shadcn/ui + Oxford Navy (#020E28) & Gold (#DAA640), enforce an 8px rem grid, and resolve all screen-by-screen issues.

## User Review Required

> [!IMPORTANT]
> 1. **n8n Workflow Replacement**: An updated, sanitized, quality-gated workflow JSON file will be generated for direct import into your n8n workspace to replace the current workflow.
> 2. **Database Migration**: A foreign key constraint will be added to link `public.user_notifications(user_id)` to `public.profiles(id)` ON DELETE CASCADE, resolving the schema cache error shown in Image 4.
> 3. **Lead Deduplication**: A unique index on `leads(phone)` will prevent duplicate leads from being ingested during future workflow runs.

---

## Phase 1: Database & Backend Fixes

### 1. Supabase Foreign Key & Constraint Migration
- Apply migration via SQL:
  - Add foreign key `fk_user_notifications_profiles` referencing `profiles(id)` on `user_notifications.user_id`.
  - Add unique constraint/index on `public.leads(phone)`.
  - Deduplicate existing duplicate rows in `leads`.
  - Correct `outreach_category` for the 122 leads with real websites.

---

## Phase 2: n8n Workflow Overhaul (`Implementation/General/n8n-lead-finder-machine.json`)

### 1. Crawl Ceiling & Multi-Bounding Box
- Increase `max_leads` to 300.
- Allow postal-code subdivision for comprehensive local area coverage.

### 2. Code Node Sanitization & Quality Filter
- Filter out 0-review ghost listings (`reviewsCount >= 2` minimum).
- Accurate categorization:
  - `has_website`: independent commercial domain.
  - `social_only`: Facebook, Instagram, Yell, Checkatrade.
  - `no_website`: confirmed zero website presence.
- Construct the final JSON payload safely via `JSON.stringify` to prevent malformed string interpolations.
- Ensure phone numbers are normalized with valid UK format (`+447...` for mobile, `+441...`/`+442...` for landlines).

---

## Phase 3: Sitewide Design System & Spacing (`app/globals.css`)

### 1. Palette Alignment
- Canvas Background: `#020E28` (Oxford Navy)
- Card Surfaces: `#071536`
- Popovers / Modals: `#0C1F4D`
- Borders: `rgba(218, 166, 64, 0.16)` and `rgba(255, 255, 255, 0.08)`
- Primary Brand Accent: `#DAA640` (Mercian Gold)
- Typography: Primary `#FFFFFF`, Secondary Slate `#94A3B8`, Gold Highlight `#E5B85C`

### 2. Strict Semantic Palette
- Success: Emerald `#10B981`
- Warning: Amber `#F59E0B`
- Destructive: Rose `#EF4444`
- Neutral / Info: Slate `#94A3B8`

### 3. Spacing Grid (8px in `rem`)
- Base tokens: `0.25rem` (4px), `0.5rem` (8px), `0.75rem` (12px), `1rem` (16px), `1.5rem` (24px), `2rem` (32px), `3rem` (48px), `4rem` (64px).
- Audit and replace ad-hoc arbitrary pixel values (`p-[18px]`, `mt-[13px]`, `gap-[7px]`).

---

## Phase 4: Screen-by-Screen Rework

### 1. Lead Outreach Ledger (`app/(admin)/admin/leads/page.tsx`)
- Replace Option 1 copy ("£10k/month deal targets", "High-Ticket Deal Flow Terminal", "🎉 High-Ticket Deal Won") with Option 2 local business copy.
- Replace decorative "Cockpit ⚡" gold pills with functional "Outbound Pitch" / "Outreach" buttons.
- Harmonize pipeline header badges to use clean semantic badges instead of decorative rainbow colors.
- Standardize on 8px grid spacing.

### 2. Settings (`app/(admin)/admin/settings/page.tsx`)
- Mobile tabs: implement responsive scroll and clean tab indicators.
- Avatar upload: remove raw filename string overflow; add clean avatar preview and "Upload New" button.
- User ID: convert raw UUID input box into a compact metadata row with 1-click copy action.
- Normalize button sizing and form padding.

### 3. Pricing Control Centre (`app/(admin)/admin/pricing/page.tsx`)
- Update tier names from Option 1 ("Launch Catalyst", "System Leverage", "Enterprise Partner") to Option 2:
  1. Essential Storefront
  2. Pro Order Builder
  3. Full Custom Build
- Remove decorative "☆ Not Featured" buttons.
- Fix mobile layout so the sticky footer button doesn't block inputs (`pb-24`).

### 4. Notifications Logs (`app/(admin)/admin/notifications/page.tsx`)
- Verify relationship query resolves cleanly with the new foreign key constraint.
- Add code fallback to prevent unhandled UI crashes.
- Clean up filters, badges, and spacing.

### 5. Invoices List (`app/(admin)/admin/quotes/page.tsx`)
- Fix 12-column grid collision on mobile:
  - Desktop (`>= 768px`): clean data table with fixed column widths.
  - Mobile (`< 768px`): responsive vertical invoice cards.
- Organize action buttons into a tidy dropdown or responsive button row.

### 6. Command Center (`app/(admin)/admin/page.tsx` & components)
- Clean up KPI cards: remove redundant icon clutter.
- Harmonize cards to `#071536` with `#DAA640` accents.
- Enforce consistent 8px grid spacing across sections.

---

## Phase 5: Verification & Delivery
- Execute Next.js build / typecheck to verify zero errors.
- Export the updated `n8n-lead-finder-machine.json`.
- Deliver walkthrough report with instructions for importing into n8n.
