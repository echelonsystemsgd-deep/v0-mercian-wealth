# Conversion Infrastructure Positioning & Mobile Scroll Rendering Overhaul Plan

**File:** `Implementation/Website/AI_CONVERSION_INFRASTRUCTURE_AND_MOBILE_RENDERING_PLAN.md`  
**Date:** September 2026  
**Objective:** Fully align Mercian Wealth's positioning with the AI Search Attention Compression thesis, and resolve mobile vertical scroll freezing, section disappearing bugs, and horizontal overflow glitches.

---

## 1. Identified Mobile Rendering & Scroll Freezing Issues

### A. Touch Interception from Portfolio Auto-Scroll Loop (`components/portfolio.tsx`)
* **Bug:** The portfolio carousel runs a continuous `requestAnimationFrame` loop that mutates `el.scrollLeft` on every frame.
* **Mobile Symptom:** On touch devices (iOS Safari & Android Chrome), touching or swiping over the portfolio area locks the page vertically. The browser interprets vertical scrolls as horizontal drags on the active scrolling element, making the page feel frozen or broken when scrolling down.
* **Fix:** Disable programmatic auto-scroll on mobile viewports (`window.innerWidth < 768` or coarse pointer) and allow clean, native touch swiping (`overflow-x-auto snap-x`).

### B. Viewport Flashing / Elements Vanishing on Mobile (`components/bottleneck.tsx`, `components/why-mercian-wealth.tsx`, `components/section-divider.tsx`)
* **Bug:** Multiple sections utilize `viewport={{ once: false, amount: 0.2 }}`.
* **Mobile Symptom:** On mobile screens, when a section scrolls slightly out of the 20% visible threshold or during momentum scroll, Framer Motion unmounts/resets the animation back to `initial={{ opacity: 0 }}`. As a result, sections flicker, vanish, or fail to render as the user scrolls down.
* **Fix:** Change `once: false` to `once: true` with a safe entry margin (`margin: "-40px"`) across all section dividers, bottleneck diagnostics, and differentiator cards.

### C. Background Watermark Horizontal Body Overflow (`components/watermark.tsx`)
* **Bug:** Watermark was positioned `absolute` inside `<body>` with a fixed 600px width.
* **Mobile Symptom:** On 375px–390px mobile screens, the 600px watermark causes horizontal body overflow, disrupting viewport containment and touch inertia.
* **Fix:** Lock watermark to `fixed inset-0 overflow-hidden pointer-events-none z-[-10] flex items-center justify-center` with responsive sizing (`w-[320px] sm:w-[500px] md:w-[800px]`).

---

## 2. Positioning & Copy Infusion: The "AI Conversion Infrastructure" Thesis

### A. The Core Paradigm Shift
1. **AI Compressed the Discovery Funnel:** Modern buyers no longer browse 20 Google links. They ask AI or use mobile search, get 1–2 recommendations, and land on a site with their card half out.
2. **The Website is the Only Trust Filter:** If the site is slow, vague, generic, or confusing, they bounce back to AI in 4 seconds.
3. **The Demand Isn't "AI Websites":** It is high-velocity **Conversion Infrastructure** engineered for speed of decision, credibility, and immediate booking/deposit capture.

### B. Implementation Roadmap
1. **Hero Section (`lib/site-copy.ts` & `components/hero.tsx`):**
   - Update Eyebrow: `THE NEW BUYING ENVIRONMENT · BUILT FOR UK BUSINESSES`
   - Update Headline: `When AI & mobile search compress attention, your website is the only thing between paid and the back button.`
   - Update Subheadline: `Modern customers don't spend 15 minutes browsing. They land decision-ready with card in hand. We build high-speed conversion infrastructure—sub-second storefronts, 3-tap booking, and upfront deposits—engineered so you never get filtered out.`
2. **Section I "What Changed" (`lib/site-copy.ts` & `components/what-changed.tsx`):**
   - Re-anchor Section I directly around the 4 pillars of the manifesto:
     - Shift 1: `AI SEARCH COMPRESSED ATTENTION` (Zero-click decision ready visitors)
     - Shift 2: `TRUST REQUIREMENTS ARE RISING` (Filtered out in seconds if slow or generic)
     - Shift 3: `AI ANSWERS REPLACED BROWSING` (Structured for clarity, proof, and intent)
     - Shift 4: `COMPETITION IS NOW CREDIBILITY` (Built for speed of decision, trust, and action)
3. **New Editorial Manifesto Callout (`components/editorial-manifesto.tsx`):**
   - High-impact editorial callout between Hero and Section I highlighting:
     *"The current AI awareness cycle is... websites. Not because websites are new. Because the internet's buying environment has changed, and the website is now the trust-and-conversion hub."*
4. **Metadata & Site-Wide Taglines:**
   - Elevate brand messaging from "mobile storefronts" to "High-Speed Conversion Infrastructure".

---

## 3. Verification & Zero-Error Standard
- Verify mobile scrolling smoothness on narrow viewport widths.
- Ensure all Framer Motion components remain visible once entered (`once: true`).
- Run `npm run build` to confirm 0 TypeScript, lint, or build errors.
