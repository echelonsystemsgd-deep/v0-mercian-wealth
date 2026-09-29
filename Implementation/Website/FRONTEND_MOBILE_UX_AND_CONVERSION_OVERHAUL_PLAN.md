# Frontend, Mobile UX & Conversion Overhaul Implementation Plan
**Target Domain:** `mercianwealth.com`  
**Focus:** 100% Frontend Architecture, Mobile UX, Conversion Optimization & Codebase Consistency  
**Date:** September 2026

---

## 1. Executive Summary & Quality Standard

Mercian Wealth provides local trade and service businesses with fast mobile storefronts, friction-free booking, automated upfront Stripe deposit collection, and instant WhatsApp speed-to-lead alerts. The website itself must be the gold standard proof of what is sold:
- **Fastest in category:** Sub-second mobile response, 0 render-blocking junk, optimized assets.
- **Conversion engine:** Every section maps to one of four business outcomes (Time saved, Cost reduced, Revenue increased, Risk removed).
- **Mobile excellence:** Zero widget overlaps, zero horizontal overflow, 44px minimum touch targets, proper safe-area padding.
- **High trust:** Unmistakable trade positioning, no confusing bank/IFA vibes, WCAG AA compliance.

---

## 2. Inventory of Issues & Target Solutions

| Priority | Area | Issue in Code | Target Resolution |
| :--- | :--- | :--- | :--- |
| **P0** | Mobile UX | Floating Ask Assistant + WhatsApp + Sticky CTA cover cards & headings | Hide floating AI button on mobile (`hidden sm:flex`). Consolidate mobile bottom chrome into a single unified conversion bar with WhatsApp + Book Call actions. |
| **P0** | Conversion | 4 competing channels (WhatsApp hero, WhatsApp floating, AI floating, Book Call) | Make WhatsApp the instant action channel, Book Call the high-ticket consultation channel. |
| **P0** | Integrity | Public PDF exposure (`/public/Outreach Engine...pdf`) | Move sensitive internal outreach PDFs outside `public/` into `docs/`. |
| **P0** | Content | Broken encoding (`32,400`) & typo (`"without evening message tag"`) | Normalize UTF-8 encoding (restore `£`), rephrase to plain business English (`"without late-night message ping-pong"`). |
| **P1** | UI / A11y | Stray blue outline around header avatar (`DropdownMenuTrigger`) | Fix Radix focus outline with `outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DAA640]`. |
| **P1** | Header | 3 redundant brand marks (Logo icon, Wordmark, MW badge) | Remove duplicate right avatar badge; replace with clean Portal/User icon. |
| **P1** | Mobile UX | Telemetry marquee clips on mobile, shifts layout, adds ADHD noise | Remove the marquee ticker from top navbar; reclaim 35px of vertical screen space. |
| **P1** | Performance | `next.config.mjs` has `images: { unoptimized: true }` | Enable Next.js image optimization for fast mobile loading. |
| **P1** | Contrast | `text-zinc-500` / `text-zinc-600` fails WCAG AA on black | Elevate body text to `text-zinc-300` / `text-zinc-400` (min 7.9:1 contrast). Min 14px body font. |
| **P2** | Branding | "Mercian Wealth" sounds like wealth management / private bank | Lead with bold category anchor: "Fast Mobile Storefronts & Systems for UK Trade & Local Businesses". |
| **P2** | Design | Inconsistent tag colors (random emerald, gold, grey) | Consolidate into strict semantic tokens (Emerald = verified proof; Gold = core feature; Zinc = spec). |
| **P2** | Messaging | 4x repetition of "More leads, faster response, less manual work" | Eliminate repetition; lead with outcome-first messaging. |

---

## 3. Step-by-Step Implementation Steps

1. **Quarantine Internal Assets:**
   - Move `Outreach Engine - *.pdf` from `public/` to `docs/internal/`.
2. **Header & Navbar Cleanup:**
   - Remove `LiveTelemetryTicker` from `Navbar`.
   - Remove redundant `MW` text avatar in `Navbar`; streamline user/portal trigger with proper `focus-visible` styling.
3. **Mobile Screen Clearance & Conversion Bar:**
   - In `floating-ai-concierge.tsx`, add `hidden sm:flex` to floating launcher.
   - In `sticky-cta-button.tsx`, provide unified mobile bottom action bar: Call Direct / WhatsApp + Book a Call.
   - Ensure clean safe-area insets (`env(safe-area-inset-bottom)`).
4. **Copy & Typography Overhaul:**
   - Proofread and replace `"without evening message tag"` across all files.
   - Fix `` character corruption.
   - Remove useless decorative bracketed tags (`[ TELEMETRY ]`, `[ SYSTEM X ]` decorative pills).
   - Add social proof immediately below hero CTAs.
5. **Design System & Contrast Hardening:**
   - Update `app/globals.css` to enforce high-contrast body text tokens.
   - Replace low-contrast `text-zinc-500` and `text-zinc-600` across components.
   - Normalize card tags across `hero.tsx`, `bottleneck.tsx`, and `proof-case-studies.tsx`.
6. **Performance & Compliance:**
   - Move Calendly stylesheet `<link>` out of raw `<body>` in `app/layout.tsx`.
   - Update `next.config.mjs` image optimization settings.
   - Run type checks and build verification to guarantee 0 errors.
