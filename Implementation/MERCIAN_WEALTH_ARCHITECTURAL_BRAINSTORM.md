# MERCIAN WEALTH: ARCHITECTURAL REDESIGN & 3D CREST BLUEPRINT

## 1. Executive Summary & Philosophy
This document establishes the exact architectural, 3D WebGL, and editorial layout strategy for **Mercian Wealth** (`mercianwealth.com`). 

Following forensic visual analysis of the high-end benchmark standard, the site will transition to a **minimalist, high-contrast, editorial experience** driven by a single persistent Three.js WebGL canvas, precision monospace HUD telemetry, zero UI bloat, and factual, outcome-driven business information.

---

## 2. 3D WebGL Engine: The Mercian `M` Crest

### Visual Analysis of the Brand Emblem
The uploaded brand mark (`public/mercian-crest-gold.jpg`) consists of:
1. **Top Chevron ('M'):** Two outer vertical towers rising to sharp peaks with a steep 45° central downward valley meeting at the midpoint.
2. **Bottom Chevron ('W'):** Mirrored inverted structure with outer towers dropping to sharp bottom points and a steep 45° upward peak meeting at the midpoint.
3. **Waist Chamfers:** Distinct 45° inward diamond notches on the left and right outer perimeter at the horizontal midline ($y = 0$).
4. **Central Golden Orb:** A solid circular focal node anchored at the geometric center $(0, 0, 0)$ where the chevrons converge.

### WebGL & Particle Implementation
```
                           /\                /\
                          /  \              /  \
                         /    \            /    \
                        /      \          /      \
                       /        \        /        \
                      /          \  /\  /          \
                     |            \/  \/            |
                     \            ( ● )             /  <- Center Gold Orb
                      \          /\    /\          /
                       \        /  \  /  \        /
                        \      /    \/    \      /
                         \    /            \    /
                          \  /              \  /
                           \/                \/
              [ Real-Time Planar Water Reflection Surface ]
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

1. **Procedural Geometry Sampling:**
   - Vector path calculation defining the outer boundary, inner chevron cuts, waist chamfers, and center node.
   - Point cloud extrusion across 3D depth ($z \in [-0.35, +0.35]$) with beveled edge density.
   - Total particle density: ~8,500 instanced glowing points.
   - Color palette: Additive Liquid Gold (`#E2B857`, `#F59E0B`) with platinum highlights (`#FFFFFF`) on acute vertices.

2. **Lighting & Atmosphere:**
   - Dark nocturnal obsidian canvas (`#08080a` to `#12100d`).
   - Low-poly dark mountain ridges along the distant horizon.
   - Real-time planar water reflection plane in the bottom 30% of the viewport reflecting the 3D particle crest with animated wave ripples.
   - Ambient golden dust motes slowly drifting through the volumetric space.

3. **Mouse & Scroll Interaction Mechanics:**
   - **Pointer Orbit:** Moving the mouse across the viewport smoothly tilts the 3D crest in 3D pitch/yaw and pans the camera with damped inertia (lerp factor `0.04`).
   - **Reflection Synchronization:** The planar water mirror updates its reflection angle synchronously with the crest's mouse-driven rotation.
   - **Scroll Morphing (`data-stage` & `data-pos`):**
     - `Hero`: Centered levitation over the water mirror.
     - `Section 02 (Approach)`: Glides smoothly to the right edge.
     - `Section 03–05 (Pillars)`: Morphs or rotates into technical wireframe metaphors (`browser`, `gears`, `spark`).
     - `Section 07 (Method Cards)`: Camera elevates (`cam="alto"`), hovering over the floor plane.
     - `Closing CTA`: Returns to full center.

---

## 3. Minimalist Navigation & Removal of Bloated Menus

### The Problem in the Previous Build
The previous navigation featured a heavy, legacy SaaS-style dropdown menu on the `SOLUTIONS` link that unfurled a large multi-item card box, obscuring the primary headline and creating visual clutter.

### The New Clean 6-Page Navigation Bar
Replace all dropdowns with a clean, single-row, high-contrast navbar:
```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [M] MERCIAN WEALTH        ABOUT    SOLUTIONS    WORK    ECONOMICS    CONTACT    [ UK // GMT ]  [ REQUEST BLUEPRINT ◆ ] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
- **Direct Navigation:** Every link is a clean, single-click page transition (no hover delays, no mega-menus).
- **Active State:** Hairline liquid-gold bottom underline indicating the active route.
- **Right HUD Telemetry:** Monospace live UK time (`[ UK // GMT 14:15:00 ]`) and a single chamfered outline CTA button (`REQUEST BLUEPRINT ◆`).

---

## 4. Business Tailoring & Factual Content Strategy

### Critical Correction to Stage 4 (Domain & Infrastructure Ownership)
In the benchmark site, Stage 4 includes *"Domain and hosting included"*. As observed, this creates an unsustainable liability where the agency pays client domain renewals indefinitely.

**Mercian Wealth's 4-Stage Method Grid:**
- **01 DISCOVERY & RECONNAISSANCE:**
  - Forensic speed, Core Web Vitals, and conversion rate audit.
  - Identification of manual intake friction and communication bottlenecks.
  - Tailored technical architecture specification.
- **02 BESPOKE SYSTEM ARCHITECTURE:**
  - High-performance Next.js / WebGL storefronts (<400ms TTFB).
  - 3-tap customer qualification and booking funnels.
  - Custom webhook integration with existing CRMs.
- **03 PRODUCTION BUILD & INTEGRATION:**
  - Zero-leak asset optimization and cross-device testing.
  - Instant WhatsApp lead notification dispatch (<5s).
  - Stripe / Apple Pay / Google Pay upfront deposit locks.
- **04 LAUNCH, ASSET SOVEREIGNTY & AUTONOMOUS SCALE:**
  - **Full Client Ownership:** Domain and production hosting configured directly on the client's registrar and cloud infrastructure (the client owns 100% of their digital assets, domains, and data).
  - Continuous automated uptime monitoring and speed SLA.
  - Ongoing performance optimization and conversion iteration retainers.

---

## 5. Page-by-Page Editorial Architecture

### 1. Home (`/`)
- **Hero:** Cinzel Display: *"SITES CLIENTS REMEMBER, SYSTEMS THAT SCALE YOUR PRACTICE"* + 3D Mercian `M` Crest hovering over reflective water.
- **Section 02:** *"First the architecture, then the code"* (Crest shifts right).
- **Section 03 (`#websites`):** *"+ 01 — BESPOKE STOREFRONTS & PLATFORMS / Turn visitors into high-value enquiries"*.
- **Section 04 (`#automation`):** *"+ 02 — WORKFLOW & INTAKE AUTOMATION / Repetitive administrative chasing, handled autonomously"* + 4 monospace tags.
- **Section 05 (`#systems`):** *"+ 03 — SPEED-TO-LEAD & CONVERSION / Response times under 45 seconds"*.
- **Section 06:** Teaser for Selected Work.
- **Section 07:** 2×2 Frosted-Glass Method Grid (`01 Discovery`, `02 Architecture`, `03 Build`, `04 Launch & Sovereignty`).
- **Section 08:** Closing CTA (*"Let's Build"*) over the centered 3D crest.

### 2. About (`/about`)
- *"ONE PRINCIPAL, ZERO AGENCY OVERHEAD"*
- Philosophy of direct accountability (no outsourced project managers or account executives).
- Bento grid of core engineering principles.
- Clean technical FAQ.

### 3. Solutions (`/solutions`)
- 4 Focused capability pillars:
  1. Sub-second mobile storefronts (<400ms TTFB).
  2. 3-tap intake & booking builders.
  3. Instant WhatsApp lead dispatch (<5s).
  4. Upfront deposit checkout (zero no-shows).
- Technical specification tables with zero fluff.

### 4. Work (`/work`)
- Editorial portfolio showcase featuring verified client platforms (Vance & Partners, Thornton Building, Aurelia Aesthetics, Artisanal Pâtisserie).
- 3D interactive orbital carousel with drag/scroll navigation and live preview links.

### 5. Economics (`/economics`)
- *"STOP PAYING A TAX ON MANUAL OPERATIONS"*
- Interactive Three.js 3D Speed-to-Lead & Capacity ROI Simulator (`#calculator`) with real-time particle bar charts and dynamic revenue projection.
- SaaS license replacement comparison vs. bespoke architecture.
- Transparent engagement retainers.

### 6. Contact (`/contact`)
- Single-screen split layout:
  - **Left:** Direct contact data table (`DIRECT LINE`, `RESPONSE WINDOW: <2 HOURS`, `LOCATION: UNITED KINGDOM`).
  - **Right:** Frosted-glass qualification form with HUD corner brackets.
  - **3D Interaction:** The 3D particle `M` Crest is positioned directly behind the frosted glass, casting an interactive blurred gold silhouette glow that tilts with mouse movement.

---

## 6. Website Duplicator Skill Integration
The `website-duplicator` skill has been mirrored into the repository at `.agents/skills/website-duplicator/`, equipping the agent team with:
- Playwright-based zero-leak network crawlers (`capture.js`).
- Telemetry neutralizers and host rewriters (`rewrite.js`).
- Range-streaming HTTP server (`serve.js`).
- Automated verification suites (`verify.js`).
