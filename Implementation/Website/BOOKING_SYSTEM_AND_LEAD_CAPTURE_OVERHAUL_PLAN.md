# Booking System, Lead Capture & Mobile UX Overhaul Plan

**File:** `Implementation/Website/BOOKING_SYSTEM_AND_LEAD_CAPTURE_OVERHAUL_PLAN.md`  
**Date:** September 2026  
**Objective:** Eliminate all technical blockers in lead capture, fix the broken homepage prototype modal, reduce booking friction on mobile, and ensure 100% reliable lead persistence and notifications with 0 errors.

---

## 1. Identified Root Causes

### A. Broken Homepage Prototype Request Modal (`components/prototype-request-modal.tsx`)
1. **Missing Email Field:** Modal only requested Name, Business Name, and Website/Instagram.
2. **Backend Rejection:** Submits `source: "prototype_request"` without an `email`. The backend endpoint `/api/forms/submit` strictly rejects any submission missing `email` with HTTP 400.
3. **Unsupported Source:** The route had no handler for `source === 'prototype_request'`, throwing `Unsupported form source: prototype_request`.
4. **Impact:** Every single user who clicked the primary CTA in Section III of the homepage was met with an error, and the lead was completely lost.

### B. Booking Flow Friction on Mobile (`components/booking-flow.tsx`)
1. **Mandatory Free-Text Requirement:** Stage 2 required users to manually type out a paragraph for `desiredOutcome` before they could see the Calendly booking calendar. On mobile devices, this is a massive drop-off point.
2. **Multi-Stage Drop-off:** If a visitor drops off at Stage 2 or at the Calendly iframe, Stage 1 data must be reliably captured as an early-stage lead without prematurely emailing a "Call Confirmed" receipt before a time has been picked.

### C. Resend Error Visibility & Resilience (`app/api/forms/submit/route.ts`)
1. **Resend SDK Return Value:** Resend returns `{ data, error }` instead of throwing exceptions. The previous `try/catch` block did not inspect `resendError`, silently masking delivery issues.
2. **n8n Endpoint Status:** The configured webhook points to a `/webhook-test/` endpoint on a host returning Cloudflare 530. Must ensure this remains fully non-blocking and safely handles errors.

---

## 2. Implementation Scope

### Step 1: Fix Homepage Prototype Modal (`components/prototype-request-modal.tsx`)
- Add **Work Email** (required) and **Phone Number** (optional for WhatsApp preview alerts).
- Ensure mobile inputs use `text-base sm:text-sm` to prevent iOS Safari auto-zoom.
- Include `inputMode="email"` and `inputMode="tel"`.
- Submit payload including `email`, `phone`, `name`, `business_name`, `website`, and `source: "prototype_request"`.

### Step 2: Update Backend Route (`app/api/forms/submit/route.ts`)
- Add first-class support for `source === 'prototype_request'`:
  - Upsert or insert into Supabase `leads` table.
  - Send branded notification email to `ADMIN_NOTIFY_EMAIL` (`mercianwealthgs@gmail.com`).
  - Send confirmation email to the prospect detailing the next steps for their prototype build.
  - Forward lead data to n8n webhook (non-blocking).
- Refactor Resend email sending to inspect `{ data, error }` directly and log errors accurately.
- Distinguish Step 1 "booking_lead" receipts so prospects aren't told their call is already confirmed before choosing a slot in Calendly.

### Step 3: Streamline Booking Flow on Mobile (`components/booking-flow.tsx`)
- Make the `desiredOutcome` textarea optional in Stage 2 (with quick-select prompt chips like "More qualified bookings", "Faster lead response", "Automated Google reviews").
- Ensure all mobile inputs have `autoComplete`, proper `inputMode`, and no iOS zoom triggers.
- Improve error recovery and retry states so visitors are never stuck.

### Step 4: Verification & Build
- Verify end-to-end payload formats.
- Run `npm run build` to confirm 0 TypeScript, lint, and build errors.
