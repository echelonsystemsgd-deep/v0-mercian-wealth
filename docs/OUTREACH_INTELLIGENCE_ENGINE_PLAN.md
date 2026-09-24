# Mercian Wealth — Outreach Intelligence Engine & Mobile Critical Fixes
## Architecture, Strategy & Implementation Plan

**Date:** September 2026  
**Status:** Approved for Implementation  
**Methodology Source of Truth:**
1. *Outreach Engine — Written Pathway — Module 1 — Email X Variable Y*
2. *Outreach Engine — Written Pathway — Module 2 — Outreach #1 Variable Y*
3. *Outreach Engine — Written Pathway — Module 2 — Outreach #1 Email X*

---

## Part 1: Mobile & Design System Critical Fixes

### 1. Issue One — Mobile Hamburger Menu Drawer Failure
- **Root Cause:** The slide-over mobile drawer `<AnimatePresence>` was nested inside an outer header container with CSS `transform: translateY(...)`. In CSS, transforms create a new local containing block, constraining `position: fixed; inset: 0;` to the ~85px header height rather than the full viewport. Furthermore, `pointer-events-none` on the parent blocked touch propagation on mobile.
- **Fix:** 
  1. Render the mobile menu drawer outside any transformed container, cleanly portalled or anchored directly at the root viewport level with `fixed inset-0 z-[99999] pointer-events-auto`.
  2. Toggle `document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen)` reliably.
  3. Ensure backdrop taps and close icons instantly close the drawer without lag.

### 2. Issue Two — Sticky Header Disappearing on Scroll Down
- **Root Cause:** In `components/navbar.tsx`, `useScrollDirection` applied `-translate-y-full` whenever the user scrolled down.
- **Fix:** Remove the `-translate-y-full` conditional translation. The header remains fixed at `top-0` across the entire scroll journey (`translate-y-0` permanently). Maintain `isScrolled` to dynamically toggle the compact frosted-glass pill styling with shadow when scrolled past 30px.

### 3. Issue Three — Sticky Footer & Floating Elements Coordinated Behaviour
- **Target Elements:**
  1. Mobile Sticky CTA Bar (`components/sticky-cta-button.tsx`)
  2. WhatsApp Floating Bubble (`components/whatsapp-button.tsx`)
  3. Floating AI Concierge / Assistant (`components/floating-ai-concierge.tsx`)
- **Required Behaviour:**
  - Above the footer: All 3 elements are visible and accessible. Remove `scrollDirection === "up"` restriction so they remain visible on scroll-down.
  - At the footer (`<footer id="site-footer">`): An IntersectionObserver detects the footer and cleanly hides all 3 elements simultaneously (`opacity-0 translate-y-6 pointer-events-none`).
  - Scrolling back up above footer: All 3 elements smoothly re-appear.

### 4. Issue Four — Brand & Copy Polish
1. **Location:** Replace all instances of `"Based in the West Midlands"` with `"Berkshire, United Kingdom"` across components, schema, and site copy.
2. **Duplicate Section Labels:** Eliminate redundant `[ WHAT CHANGED ]` labels directly beneath `SYSTEM I · WHAT CHANGED` dividers. Update section eyebrows to reflect distinct outcomes (e.g., `[ 4 MARKET SHIFTS ]`).
3. **WhatsApp Bubble Positioning:** Anchor the floating launcher pill firmly at `fixed bottom-4 right-4 z-40`, avoiding dynamic height jumps or middle-of-screen displacements on mobile.
4. **Brand Palette Alignment:** Eliminate all green/teal backgrounds from action buttons (final CTA WhatsApp button, founder button in WhyMercianWealth, demo preview buttons, and footer hovers). Standardize on approved brand tokens:
   - Navy Action: `bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 hover:bg-[#1C1C22]`
   - Gold Action: `bg-[#DCAE53] text-[#09090B] font-bold hover:bg-[#E5B85C]`
5. **Statistics Verification:** Replace unverified percentages and multipliers (`3.8x`, `78%`, `68%`, `240%`) with factual mechanism-driven statements.

---

## Part 2: Master Outreach Intelligence Engine

### Architecture Overview

```
                          [ LEAD INGESTION / SELECTION ]
                                        │
                         [ PIPELINE CLASSIFICATION ]
                                        │
          ┌─────────────────────────────┼─────────────────────────────┐
          ▼                             ▼                             ▼
   [ 1. HAS WEBSITE ]           [ 2. NO WEBSITE ]           [ 3. NEEDS REVIEW ]
          │                             │                             │
   [ Site Crawler &              [ Google Maps /             [ Inconclusive data
    Deterministic Audit ]        Public Presence ]            or weak friction ]
          │                             │                             │
   [ Evidence Extraction ]       [ Friction: Missing           [ Flagged in UI:
   - URL, Page, Next Step        After-Hours Presence ]       Do NOT force outreach ]
   - 1 Visible Friction          - Next Step: Decision
   - Decision-tied Lane          - Observable Evidence
          │                             │
          └──────────────┬──────────────┘
                         ▼
             [ VARIABLE Y ENGINE ]
             1. Customer Next Step
             2. Lane
             3. Exact Page
             4. One Friction (Visible, Fast, Logical, Decision-Tied)
             5. Evidence (What was actually observed)
             6. Recognisable Reason (Buyer behavior pattern)
             7. Consequence Mechanics (Cause-and-effect without numbers)
             8. Company & First Name (Only if confident)
             9. Micro-Yes Subject / Hook
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   [ WHATSAPP X ENGINE ]         [ EMAIL X ENGINE ]
   - 5-part conversational        - 5-part structured
   - Permission only (micro-yes)  - Decision label subject
   - Fast to judge, safe to exit - No agency hype / no pitch
          │                             │
          └──────────────┬──────────────┘
                         ▼
              [ HUMAN OPERATOR APPROVAL ]
              - Review Evidence & Variables
              - Brainstorm alternative friction candidates
              - Edit / Regenerate
              - 1-Click Copy or Send via WhatsApp / Email
                         │
                         ▼
        [ MICRO-YES → PROTOTYPE CREATION TASK ]
        - Prospect says YES
        - Prototype Task created containing the EXACT friction
        - Working mobile demo built to solve that specific flaw
        - Discovery Call Bridge: Show possibilities & net value
```

### Lead Status Lifecycle
1. `New`
2. `Analysing`
3. `Website Found`
4. `No Website`
5. `Needs Review`
6. `Ready for Approval`
7. `Approved`
8. `Sent`
9. `Replied`
10. `Micro Yes / Value Requested`
11. `Prototype Created`
12. `Prototype Sent`
13. `Follow-up 1`
14. `Follow-up 2`
15. `Call Booked`
16. `Won`
17. `Declined`
18. `Do Not Contact`

---

## Part 3: Implementation Steps
1. **Fix Header & Mobile Navigation:** `components/navbar.tsx`
2. **Fix Sticky Footer Bar:** `components/sticky-cta-button.tsx`
3. **Fix WhatsApp Widget:** `components/whatsapp-button.tsx`
4. **Fix AI Concierge:** `components/floating-ai-concierge.tsx`
5. **Fix Footer Component & Global Copy:** `components/footer.tsx`, `app/layout.tsx`, `lib/site-copy.ts`, etc.
6. **Fix Duplicate Section Labels & Off-Brand Buttons:** `components/what-changed.tsx`, `components/cta.tsx`, `components/why-mercian-wealth.tsx`, `components/portfolio.tsx`
7. **Implement Outreach Intelligence Engine:**
   - Update `lib/auditor/types.ts` with evidence-first fields and candidates.
   - Refactor `lib/auditor/reasoning.ts` and `lib/auditor/deterministic.ts`.
   - Overhaul `components/admin/outreach-modal.tsx` with the 3 pathways, Evidence display, Brainstorm candidate picker, and Email X / WhatsApp X tabs.
   - Connect lead status transitions in the admin workflow.
8. **Verify & Test All Functionality.**
