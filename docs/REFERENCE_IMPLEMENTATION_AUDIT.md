# MERCIAN WEALTH — REFERENCE IMPLEMENTATION AUDIT
**Document Version:** 1.0.0  
**Project:** Mercian Wealth (`mercianwealth.com`)  
**Reference Video:** `public/WhatsApp Video 2026-11-23 at 14.29.43.mp4`  
**Brand Emblem Assets:** `public/mercian-crest-gold.jpg`, `public/Logo1.jpeg`

---

## 1. Executive Summary & Objective

This audit investigates the existing codebase of the Mercian Wealth website and compares it against the reference video stored in `public/WhatsApp Video 2026-11-23 at 14.29.43.mp4`.

The objective is to establish why previous implementation attempts failed to capture the cinematic luxury standard of the reference experience, document the structural flaws, and specify the exact remediation path required.

**Key Rule:** The reference video uses glowing particle illustrations (chess knight, laptop, gears, sparks) as conceptual examples. The Mercian Wealth implementation **must NOT** copy those illustrations. Instead, the authentic **Mercian Wealth 3D crest emblem** (`public/mercian-crest-gold.jpg`) must serve as the singular, evolving visual hero across all 8 scroll stages.

---

## 2. Technical Stack & Environment Audit

- **Framework:** Next.js 16.2.11 (React 19 App Router)
- **Styling:** Tailwind CSS v4, `@tailwindcss/postcss`
- **3D / WebGL Engine:** Three.js `^0.185.1`, `@types/three ^0.185.4`
- **Animation:** `framer-motion ^12.38.0`
- **Image Processing / Asset Analysis:** `sharp ^0.35.3`
- **Deployment Platform:** Vercel Production Environment

---

## 3. Reference Video Forensic Analysis

| Feature | Reference Video Specification | Previous Codebase State | Status / Gap |
| :--- | :--- | :--- | :--- |
| **Visual Composition** | Left-aligned editorial typography + Right-aligned 3D glowing particle sculpture | Left-aligned text present; particle object centered/unstable | **Needs re-anchoring to right on desktop** |
| **Hero Visual Object** | Chess knight in reference video | Implemented 3D Chess Horse (`knightProfile`) | **CRITICAL ERROR: Must be authentic MW Logo/Crest** |
| **Stage 02 Visual** | Dispersal & reconstruction | Swapped to browser window wireframe (`stageBrowser`) | **CRITICAL ERROR: Must morph MW crest back to MW crest** |
| **Stage 03 Visual** | Dimensional shift & lighting change | Swapped to gear assembly (`stageGears`) | **CRITICAL ERROR: Must be MW crest with altered density/depth** |
| **Stage 04 Visual** | Automation movement | Swapped to spark/network lattice (`stageSpark`) | **CRITICAL ERROR: Must be dynamic orbital flow around MW crest** |
| **Stage 05 Visual** | Intelligence / Neural lattice | Generic ring/torus (`stageRing`) | **CRITICAL ERROR: Must be intricate lattice of MW crest & center orb** |
| **Stage 06 Visual** | Tool integration | Tiled cards + generic particles | **CRITICAL ERROR: Must be metallic hold of MW crest** |
| **Atmospheric Lighting** | Warm copper, incandescent amber, burnt orange, reflective water plane | Basic orange gradient with limited water depth | **Needs refined sunset horizon, mountain silhouette & reflection** |
| **Scroll Synchronization** | Seamless continuous scrolling driving particle dispersion & reform | ScrollTrigger/window scroll offsets with abrupt resets | **Needs continuous normalized progress lerping** |
| **Mobile Responsiveness** | Scaled visual, centered composition, responsive typography | Particles clipped off-screen due to fixed X gliders | **Fixed in commit 48d3b96, needs verification** |

---

## 4. Root Cause Analysis: Why the Previous Attempt Failed

### 4.1 Fatal Metaphor Duplication
The previous engineer mistakenly replicated the reference video's *metaphorical symbols* (chess knight, browser window, mechanical gears) instead of realizing that those symbols belonged to the reference's concept. For Mercian Wealth, the user commanded:
> *"The actual Mercian Wealth emblem must become the central visual identity of the entire WebGL experience... Do not use chess pieces. Do not use laptops. Do not use gears."*

### 4.2 Lack of Authentic Vector/Raster Sampling for MW Crest
The previous attempt constructed a crude 16-segment line outline for the crest. In reality, `public/mercian-crest-gold.jpg` is a 1024x1024 master artwork with 103,825 high-density gold pixels spanning $x \in [277, 746]$ and $y \in [204, 818]$, featuring distinct outer towers, central valley, waist chamfers, and center golden orb. Failing to sample these coordinates resulted in a generic wireframe rather than a high-end luxury particle sculpture.

### 4.3 Editorial Content Mismatch
The headlines and supporting copy diverged from the prompt's mandated specifications:
- **SEC 01 (Hero):** Headline split onto 5 disjoint lines; CTA button omitted.
- **SEC 02 (Vision):** Displayed "First the why, then the code" instead of `"FIRST THE VISION. THEN THE EXECUTION."`
- **SEC 04 (Automation):** Displayed "Repetitive work, done by the computer" instead of `"REPETITIVE WORK. DONE BY THE SYSTEM."`
- **SEC 05 (Intelligence):** Displayed "Speed-to-lead pipelines" instead of `"TECHNOLOGY THAT UNDERSTANDS YOUR BUSINESS."`
- **SEC 06 (Tools That Work):** Showcased card grid instead of clean editorial lockup `"THE RIGHT TOOLS. ONE CONNECTED EXPERIENCE."`
- **SEC 07 (Approach):** Displayed agency deliverables instead of the restrained 4-stage sequence (`01 — Discover`, `02 — Plan`, `03 — Build`, `04 — Launch`).
- **SEC 08 (Let's Talk):** Displayed "Request System Blueprint" instead of `"Start a Conversation"`.

### 4.4 Camera & Parallax Coordinate Inversion
Previous camera parallax code (`camera.position.x = mouse.current.x * 1.5`) inverted the natural physical response, causing particles to move right when the user moved their mouse left.

---

## 5. Reusable vs. Deprecated Code Components

### Reusable Components (Keep & Refine):
- `components/navbar.tsx`: Clean, single-row minimal navigation with Mercian Wealth wordmark and contact action.
- `components/footer.tsx`: Restrained 2-row footer adhering to dark luxury aesthetic.
- `components/hud/viewport-hud.tsx`: Minimal HUD telemetry displaying scroll depth and section indicators.
- WebGL Renderer & Post-processing Loop: Shader initialization, RAF loop, and canvas resizing logic in `wealth-particle-core.tsx`.

### Deprecated Components (Remove / Refactor):
- `stageKnight`, `stageBrowser`, `stageGears`, `stageSpark`, `knightProfile`: Completely remove all chess knight and gear geometry.
- Hardcoded card grids in Section 06: Replace with clean editorial composition matching the reference video.
- Divergent copy in `components/hero.tsx` and `components/cerbo-style-homepage.tsx`: Update to exact user-mandated copy.

---

## 6. Verification & Quality Gates

1. **Geometry Extraction:** Node.js Sharp sampling script generating 10,000+ true 3D coordinates from `public/mercian-crest-gold.jpg`.
2. **WebGL Particle Core:** 6 continuous morphing/dispersal states rooted solely in the MW crest.
3. **Typography & Content:** Strict 1:1 match to prompt copy across Sections 01 to 08.
4. **Responsive Testing:** Zero horizontal overflow, touch-reactive camera tilt on mobile (390px), editorial luxury layout on desktop (1440px).
5. **Build Cleanliness:** 0 TypeScript errors, 0 ESLint warnings, 0 console errors.
