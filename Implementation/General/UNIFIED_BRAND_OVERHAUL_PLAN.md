# 🏛️ Mercian Wealth — Unified Brand & AI Automation Master Plan

## Executive Overview & Goal Description

Transform `mercianwealth.com` into an ultra-sleek, high-leverage storefront and automation platform engineered for **bakeries, catering operations, food artisans, and premier local services across Berkshire & the UK**.

All components—including the interactive 3-tap order builder, instant WhatsApp alert telemetry, upfront deposit gate, and transparent 3-tier GBP pricing—operate in a unified **Charcoal (`#09090B`) + Solid Gold (`#DCAE53`)** aesthetic with ruthless, high-conversion Machiavellian UK English copy.

---

## 📐 Key Changes & Component Architecture

### 1. Site-Wide Copy Rewrite (`lib/site-copy.ts`)
Strict **UK English**, high-leverage persuasion focusing on operational control, speed advantage, and eliminating unforced revenue loss:

* **Hero Headline**: 
  > *"The fastest response captures the order. Eliminate friction and dominate your local market."*
* **Hero Subheadline**: 
  > *"We engineer sub-second mobile storefronts, 3-tap order builders, instant WhatsApp dispatch alerts, and automated Google review systems for bakeries, caterers, food artisans, and premier local businesses across Berkshire & the UK."*
* **Hero Trust Pills**: 
  * `✓ Sub-1-Second Mobile Storefronts`
  * `✓ 3-Tap Custom Order Builders`
  * `✓ Instant WhatsApp Dispatch Alerts`
  * `✓ Automated 5-Star Review Extraction`

### 2. Single Master Architecture & Navigation
* **Navbar**:
  - `What We Build`, `Protocol`, `Prototypes`, `Pricing`, `Contact` + direct **Login** button & WhatsApp quick-action.
* **Homepage Integration**:
  - Direct live product visual: 3-tier cake order builder, sub-second WhatsApp kitchen dispatch, and Apple Pay deposit capture.

### 3. Unified 3-Tier Pricing Model (`lib/site-copy.ts` & `components/pricing.tsx`)

Simple, transparent commercial terms with zero hidden fees:

```
+----------------------------------+----------------------------------+----------------------------------+
|       ESSENTIAL STOREFRONT       |      PRO AUTOMATION ENGINE       |     FULL CUSTOM MULTI-BUILD      |
|            £495 Setup            |    £895 Setup (MOST POPULAR)     |           £1,450 Setup           |
+----------------------------------+----------------------------------+----------------------------------+
| • 3–5 Page Fast Storefront       | • Everything in Essential        | • Multi-Location Architecture    |
| • Sub-1s PageSpeed Guarantee     | • 3-Tap Custom Order Builder     | • Custom Menu & Price Builders   |
| • Local Google Maps Optimisation | • Stripe Upfront Deposit Capture | • Accounting Sync (Xero/QB)      |
| • 24/7 Enquiry Intake            | • Instant WhatsApp Phone Alerts  | • 90 Days Technical Support      |
| • 30 Days Included Support       | • Automated 5★ Review Engine     | • Dedicated Priority Desk        |
+----------------------------------+----------------------------------+----------------------------------+
```

### 4. Files to Modify / Create

#### [MODIFY] [site-copy.ts](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/lib/site-copy.ts)
Rewrite hero, diagnostic, service, and pricing copy to match the unified Vesthorn-style tone.

#### [MODIFY] [page.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/app/page.tsx)
Integrate `FieldSalesDemo` and update section order for single master homepage.

#### [MODIFY] [pricing.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/pricing.tsx)
Update default view to render the unified 3-tier model cleanly.

#### [MODIFY] [navbar.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/navbar.tsx)
Clean up links array and mobile drawer.

#### [MODIFY] [announcement-bar.tsx](file:///c:/Users/Deepg/OneDrive/Desktop/The%20Real%20World/Campuses/AI%20Automation/New%20Lessons/CODING/v0-gs-legacy-wealth-app/components/announcement-bar.tsx)
Streamline top bar: `"We build custom AI automations & digital storefronts for growing businesses — Explore Solutions →"`

---

## 🚦 Verification Plan

### Automated Tests
* `npx tsc --noEmit` to verify 0 TypeScript errors.

### Manual Verification
1. Verify `mercianwealth.com/` loads as a single, ultra-clear homepage with Vesthorn-style messaging.
2. Test the interactive `FieldSalesDemo` on mobile viewports right on the homepage.
3. Test lead submission form and verify records are saved in Supabase with proper `lead_type` tags.
