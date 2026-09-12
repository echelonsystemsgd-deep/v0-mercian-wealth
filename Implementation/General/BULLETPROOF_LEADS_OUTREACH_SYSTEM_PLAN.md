# Bulletproof Lead Scraper, Admin Dashboard & Outreach Engine Implementation Plan

## Overview
This plan addresses and permanently resolves all discrepancies in lead classification, false 'Contacted' statuses, UK landline WhatsApp errors, broken site vs no-site pitch mismatches, and data field corruption across the entire acquisition system.

## Key Root Causes & Architectural Solutions

### 1. Dynamic Pitch Routing (No Website vs Has Website)
- **Problem**: `OutreachModal` was defaulting `pitchType` to `'noWebsite'`. Even when a lead like *Leeways Roofing & Cleaning* had an active website (`https://leewaysroofingandcleaning.co.uk/`), the pitch said *"Came across [Business] — had a look for a website, couldn't find one"*.
- **Fix**: Dynamically detect `hasWebsite` from `lead.website`. If the lead has an existing website, auto-select the **Outdated/Broken Site Upgrade** or **Speed-to-Lead Automation** pitch. If the lead has no website, auto-select the **No Website** pitch. Pre-fill any custom pitch generated during scrape if available.

### 2. Telemetry Integrity (Eliminating False 'Contacted' Flags)
- **Problem**: Opening WhatsApp or clicking quick actions automatically updated `lead.status` to `Contacted`, marking leads as contacted before any actual conversation took place.
- **Fix**: Remove blind status-flipping. Keep leads in `New` until the operator explicitly marks them as `Contacted` using the 1-click status pill or outcome bar.

### 3. UK Landline vs Mobile Channel Detection
- **Problem**: UK regional landlines (`01...` e.g. Evesham `01386`, `02...`) showed WhatsApp buttons that trigger WhatsApp's error: *"The number isn't on WhatsApp"*.
- **Fix**:
  - Classify phones into `Mobile (WhatsApp Ready)` (`+447...` / `07...`) and `Landline (Call Direct)` (`+441...` / `+442...` / `01...` / `02...`).
  - On deal cards and inside the modal, provide a prominent `[📞 Call Direct]` action for landlines and a cold-call script.
  - Display a clear advisory if the operator attempts WhatsApp on a fixed UK landline.

### 4. Data Extraction & Location Sanitization
- **Problem**: Some Google Maps scrape results returned empty address strings, causing review telemetry (e.g. ` · 57 (★4.9)`) to spill into the `address` field on the card and modal.
- **Fix**:
  - Sanitize address resolution in `app/(admin)/admin/leads/page.tsx` and `components/admin/outreach-modal.tsx`. If `address` contains `★` or is empty, fall back to region or search location.
  - Parse rating and review numbers correctly from composite strings like `57 (★4.9)`.
  - Fix n8n scraper extraction nodes in `n8n-lead-finder-machine.json` and `n8n-uk-lead-finder.json` to guarantee separate, strictly typed properties: `rating` (float), `reviews_count` (int), `address` (string), and `has_website` (boolean).

### 5. Admin Dashboard Quick Pipeline Segments
- **Problem**: Operators had no fast way to isolate prime "No Website" leads from leads that already have websites or leads that require phone calls.
- **Fix**: Add top segment filter chips to `/admin/leads`:
  - `🔥 Prime: No Website Only`
  - `📱 Mobile (WhatsApp Ready)`
  - `☎️ Landlines (Call Queue)`
  - `🌐 Has Website (Redesign Targets)`

### 6. Antigravity Dual Prompt Adaptation
- **Problem**: Antigravity prompts assumed a brand-new website build every time.
- **Fix**: In `components/admin/antigravity-prompt-modal.tsx`, provide:
  - **No Website Mode**: Standard Greenfield Luxury Local Storefront.
  - **Site Redesign Mode**: Extracts existing website URL, audits weaknesses, and builds a modern mobile-optimized conversion engine.

---

## Execution Steps
1. Update `components/admin/outreach-modal.tsx` with dynamic pitch routing, landline handling, and clean address/rating parsing.
2. Update `app/(admin)/admin/leads/page.tsx` with segment filters, card data sanitization, and removal of false auto-contact triggers.
3. Update `components/admin/antigravity-prompt-modal.tsx` with dual-mode build prompts.
4. Update `Implementation/General/n8n-lead-finder-machine.json` and `n8n-uk-lead-finder.json` with strict qualification parameters.
5. Clean up corrupted data records in Supabase (reset Leeways Roofing & Cleaning to `New` with sanitized metadata).
6. Verify code compiles with `npx tsc --noEmit` (0 errors) and test dev server.
