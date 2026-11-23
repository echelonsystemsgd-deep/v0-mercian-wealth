# MERCIAN WEALTH: ARCHITECTURAL REDESIGN & IMPLEMENTATION SPECIFICATION

> **CONFIDENTIALITY & ARCHITECTURAL DIRECTIVE:**
> This specification documents the production transition of **Mercian Wealth** (`mercianwealth.com`) into a high-end editorial 3D interactive standard. All architecture, visual systems, and interaction models are tailored strictly to Mercian Wealth's brand sovereignty, obsidian-and-liquid-gold visual identity, and high-ticket client acquisition logic.

---

## 1. Core Architecture & Navigation System

### 1.1 Navigation Bar Architecture
Eliminate all legacy mega-menus, multi-layer cards, and hover dropdowns that obscure page headlines. The global navigation is a clean, single-row, high-contrast bar:

- **Brand Anchor:** Geometric `[M]` Crest SVG / Image + `MERCIAN WEALTH` tracking to `/`.
- **Primary Routes (Direct Single-Click Transitions):**
  1. `About` (`/about`)
  2. `Solutions` (`/services`)
  3. `Work` (`/portfolio`)
  4. `Economics` (`/pricing`)
  5. `Contact` (`/contact`)
- **HUD Telemetry & Action:**
  - Real-time UK/GMT clock indicator (`[ UK // GMT HH:MM:SS · 60 FPS ]`).
  - Chamfered liquid-gold button: `REQUEST BLUEPRINT ◆` (`/contact`).

---

## 2. Persistent 3D WebGL Engine & Mercian `M` Crest

### 2.1 Centerpiece 3D Model: The Mercian `M` Crest
Replaces generic particle clouds with a bespoke 3D geometric particle sculpture sampled directly from the official brand emblem:
- **Geometry Composition:**
  - **Upper Chevron ('M'):** Twin rising towers with a steep 45° center downward valley.
  - **Lower Chevron ('W'):** Twin descending towers with a steep 45° center upward peak.
  - **Waist Chamfers:** 45° inward diamond notches along the outer perimeter at $y = 0$.
  - **Central Node:** Solid glowing spherical gold core anchored at $(0, 0, 0)$ with orbiting micro-particles.
- **Particle Volumetrics:** ~8,500 instanced additive particles extruded along the $Z$ axis ($z \in [-0.35, +0.35]$).
- **Color Gradients:** Liquid Gold (`#E2B857`), Radiant Amber (`#F59E0B`), and Platinum White edge vertices.

### 2.2 Atmospheric Horizon & Planar Water Reflection
- **Nocturnal Obsidian Horizon:** Gradient canvas from `#08080a` to `#14120e`.
- **Distant Silhouette:** Low-poly dark mountain ridges on the horizon.
- **Planar Water Surface:** Real-time reflection plane across the lower 30% of the viewport mirroring the 3D crest with animated sinusoidal wave ripples.
- **Mouse Dynamics:** Smooth cursor-following pitch and yaw rotation and camera orbit with damped inertia (`lerp = 0.04`).
- **Scroll Synchronization:**
  - `Hero`: Centered levitation over the water mirror.
  - `Approach`: Smoothly glides to the right.
  - `Solutions`: Morphs into technical wireframes.
  - `Closing CTA`: Returns to full center.

---

## 3. Business Logic & Method Grid (Stage 4 Correction)

### 3.1 Eliminating Agency Domain Liability
Stage 4 explicitly secures client asset ownership while protecting agency margins:

1. **01 DISCOVERY & RECONNAISSANCE:**
   - Forensic speed, Core Web Vitals, and conversion rate audit.
   - Bottleneck mapping of manual intake and booking drop-offs.
   - Architecture specification.
2. **02 BESPOKE SYSTEM ARCHITECTURE:**
   - Sub-second Next.js storefronts (<400ms TTFB).
   - 3-tap interactive qualification and booking funnels.
   - Custom CRM webhooks.
3. **03 PRODUCTION BUILD & INTEGRATION:**
   - Instant WhatsApp lead notifications (<5s).
   - Upfront Stripe / Apple Pay deposit locks (eliminating no-shows).
   - Zero-leak WebGL and asset optimization.
4. **04 LAUNCH, ASSET SOVEREIGNTY & AUTONOMOUS SCALE:**
   - **Client Asset Sovereignty:** Domains, DNS, and cloud accounts are configured directly in the client's registrar and cloud infrastructure (the client owns 100% of their digital assets, avoiding permanent agency renewal costs).
   - 24/7 automated uptime monitoring and speed SLA.
   - Ongoing performance optimization and lead-conversion retainers.

---

## 4. Subpage Blueprint & 3D Integration

| Route | Content Focus | 3D Interactive Canvas Role |
| :--- | :--- | :--- |
| **`/` (Home)** | Editorial hero, architectural philosophy, 3 capability pillars, 4-stage method grid, closing CTA. | **3D Mercian `M` Crest** hovering over reflective water; mouse orbit parallax. |
| **`/about`** | "One Principal, Zero Agency Overhead", direct engineer-to-client accountability, engineering principles bento. | **3D Concentric Crest / Helix** reacting to mouse rotation. |
| **`/services`** | 4 Capability pillars (Storefronts, Builders, WhatsApp dispatch, Deposit locks) with technical telemetry. | **3D Wireframe Browser & Node Network** responding to cursor movement. |
| **`/portfolio`** | Verified client case studies (Vance & Partners, Thornton Building, Aurelia Aesthetics, Artisanal Pâtisserie). | **3D Orbital Gallery Carousel** with drag/scroll interaction. |
| **`/pricing`** | "Stop Paying A Tax On Manual Operations", Speed-to-Lead ROI Simulator (`#calculator`), retainer tiers. | **3D Dynamic Particle Bar Chart & Ascending Coin Stacks**. |
| **`/contact`** | Single-screen split: facts table on left, frosted-glass brief form on right with HUD corner brackets. | **3D Mercian `M` Crest glowing through the frosted glass form**. |

---

## 5. Execution Steps
1. Re-engineer `components/three/wealth-particle-core.tsx` to generate the procedural 3D Mercian `M` Crest, mountain silhouettes, and real-time planar water reflection plane.
2. Update `components/navbar.tsx` to remove the mega-dropdown and establish the clean 6-item navigation bar.
3. Update `components/offer-mechanism.tsx` and `components/process.tsx` to incorporate the refined 4-stage method grid with Stage 4 client domain ownership.
4. Run full Next.js production build and conduct visual inspection via browser tools across desktop and mobile.
