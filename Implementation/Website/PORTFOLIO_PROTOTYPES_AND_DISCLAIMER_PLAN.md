# Portfolio Lead Prototypes, Prototype Disclaimer & Copyright Strategy

## Executive Summary
This document establishes the architecture, legal safeguards, and deployment guidelines for showcasing custom lead prototypes within the Mercian Wealth / Sovereign agency portfolio. It covers the retirement of generic mockups in favor of live client sandboxes (**Caker St.** and **Grand Wedding Cakes**), implementation of disclaimer banners, trademark/copyright considerations, backend admin synchronization, and responsive UX verification.

---

## 1. Prototype Showcase & Lead Architecture

### Portfolio Lineup (Direct Live Sandbox Clickthrough)
1. **VEYRA — Solid Cast Permanent Jewellery Atelier**
   * **Domain / Category:** `veyra-premium-3-d-jewellery-e-comme.vercel.app` · Luxury 3D E-Commerce & Permanent Jewellery
   * **Benchmark:** Real-Time 3D Atelier & Interactive Model
   * **Preview Asset:** `/veyra-jewellery-preview-real.jpg` (authentic live landing page capture)
   * **Link Status:** Direct new-tab launch (`https://veyra-premium-3-d-jewellery-e-comme.vercel.app/`).

2. **Meridian Dental — Private Cosmetic & Restorative Dentistry**
   * **Domain / Category:** `dental-clinic-prototype-zeta.vercel.app` · Private Healthcare & Aesthetic Dentistry
   * **Benchmark:** 60-Second Smile Assessment & Treatment Guide
   * **Preview Asset:** `/meridian-dental-preview-real.jpg` (authentic live landing page capture)
   * **Link Status:** Direct new-tab launch (`https://dental-clinic-prototype-zeta.vercel.app/`).

3. **Vanguard Construction — House Extensions & Loft Conversions**
   * **Domain / Category:** `premium-local-construction-business.vercel.app` · Architectural Extensions & Turnkey Renovations
   * **Benchmark:** Instant Sub-Second Project Scope & Quote Engine
   * **Preview Asset:** `/vanguard-construction-preview-real.jpg` (authentic live landing page capture)
   * **Link Status:** Direct new-tab launch (`https://premium-local-construction-business.vercel.app/`).

4. **Home Solutions Roofing — Roofing Systems & Leak Diagnostics**
   * **Domain / Category:** `home-solutions-roofing.vercel.app` · Commercial & Residential Roofing Systems
   * **Benchmark:** Emergency Repair Dispatch & Diagnostics Intake
   * **Preview Asset:** `/home-solutions-roofing-preview-real.jpg` (authentic live landing page capture)
   * **Link Status:** Direct new-tab launch (`https://home-solutions-roofing.vercel.app/`).

5. **M.E Building Services — Specialist Residential Building Contractor**
   * **Domain / Category:** `me-building-services.vercel.app` · Surrey & South London Structural Extensions
   * **Benchmark:** Turnkey Scope Estimator & Milestone Billing
   * **Preview Asset:** `/me-building-services-preview-real.jpg` (authentic live landing page capture)
   * **Link Status:** Direct new-tab launch (`https://me-building-services.vercel.app/`).

6. **AURĒLIA — Cellular Longevity & Precision Nootropics**
   * **Domain / Category:** `premium-supplement-commerce.vercel.app` · Luxury Healthspan & Nootropic Commerce
   * **Benchmark:** Duodenal Delivery & Automated Subscriptions
   * **Preview Asset:** `/aurelia-supplement-preview-real.jpg` (authentic live landing page capture)
   * **Link Status:** Direct new-tab launch (`https://premium-supplement-commerce.vercel.app/`).

---

## 2. Industry Best Practices: Disclaimer Banners & Copyright Protection

### A. Prototype Disclaimer Banners
* **Why Required:** 
  1. Prevents consumer confusion and accidental orders (both prototype sites include realistic contact numbers and pricing).
  2. Sets explicit expectations that transactions and bookings operate in demo sandbox mode.
  3. Acts as an inbound agency lead magnet linking back to the primary engineering studio.
* **Banner Specification:**
  * **Visual Format:** Subtle floating top bar or bottom pill badge:
    > *"💡 Interactive Concept Prototype — Created for demonstration purposes by Mercian Wealth Studio. [View Portfolio]"*
  * **Behavior:** Dismissible with `✕` button to ensure clean client presentations.
  * **SEO / Crawler Safeguard:** Prototype `<head>` configured with `<meta name="robots" content="noindex, nofollow" />` to prevent search engines from indexing the prototype over the client's production domain.

### B. Copyright & Trademark Strategy
* **Private 1-on-1 Pitches:** Retain the client's actual branding, logos, and geographical positioning (e.g. Southall / London & Essex) for maximum emotional resonance and sales conversion.
* **Public Agency Portfolio:**
  * **Option 1 (Concept Redesign Attribution):** Clearly label case studies with:
    > *"Concept Redesign & Architectural Prototype — Developed independently to demonstrate enhanced UX and conversion pathways. Not officially affiliated with or endorsed by the featured brand."*
  * **Option 2 (Fictionalized Rebrand for White-Label Showcases):** If requested, anonymize to luxury placeholder brands (e.g., *"Sugar Street Bakery"* or *"The Grand Atelier"*) with 100% identical UI and interactive workflows.

---

## 3. Frontend & Admin Implementation Details

### A. Frontend (`components/portfolio.tsx`)
* Updated `DEFAULT_PORTFOLIO` with the 3 live sandbox items.
* Custom CSS mockups within `PremiumMockup` for **Caker St.** (burgundy/gold aesthetic with Trustpilot badge & concierge snippet) and **Grand Wedding Cakes** (ivory/navy luxury palette with tier pricing breakdown).
* Embedded `PrototypePreviewModal` providing sandbox iframe testing with preloader and demo status banner.
* Mobile-responsive bottom action bars with responsive touch targets and truncate protection.

### B. Backend Admin Dashboard (`app/(admin)/admin/portfolio/page.tsx`)
* Synchronized `DEFAULT_FRONTEND_PROJECTS` array to maintain consistent fallbacks when the database table is initializing.
* Full CRUD support with live preview launch links, badge tagging (`Interactive Sandbox`), and archive/feature toggles.

---

## 4. Verification & Device Readiness Matrix

| Device Breakpoint | Target Resolution | Verification Status | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **Mobile (Small)** | 320px – 375px | ✅ Passed | Stacked 1-col cards, fixed bottom action bar with tap-to-test button |
| **Mobile (Standard)** | 390px – 430px | ✅ Passed | Full-width cards with high-contrast text and clean touch targets |
| **Tablet** | 768px – 1024px | ✅ Passed | 2-column grid layout with smooth aspect ratios |
| **Desktop / Ultrawide** | 1280px+ | ✅ Passed | Hover reveal slide-up overlay with direct sandbox launcher |

---

## 5. Maintenance Checklist
- [x] Remove deprecated mockups (Elite Fitness, Sterling Direct Purchases, Strategic Growth).
- [x] Add Caker St. and Grand Wedding Cakes sandbox configurations.
- [x] Verify Next.js production build (`npm run build` exits with code 0).
- [x] Synchronize admin dashboard defaults with frontend showcase.
- [x] Document copyright, disclaimer, and lead pitch guidelines.
