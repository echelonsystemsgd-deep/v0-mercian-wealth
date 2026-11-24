# MERCIAN WEALTH — CINEMATIC IMPLEMENTATION PLAN
**Document Version:** 1.0.0  
**Target:** Reference-Matched Cinematic Experience for `mercianwealth.com`  
**Anchor Asset:** `public/mercian-crest-gold.jpg` (1024x1024 Master Crest)  
**Reference Specification:** `public/WhatsApp Video 2026-11-23 at 14.29.43.mp4`

---

## 1. Architecture Overview

The experience consists of a persistent, full-viewport WebGL canvas managed by Three.js layered beneath editorial React DOM content. As the user scrolls through the 8 full-height stages, the scroll position is normalized ($s \in [0, 7]$) and drives camera position, particle dispersion, flocking vector fields, and lighting states.

The **Mercian Wealth Crest** is the sole visual anchor. Rather than morphing into disparate objects, the crest undergoes organic physical transitions:
1. **Formation:** Materialization from ambient space.
2. **Dispersal & Flow:** Dynamic particle flow across the horizon, reforming into the crest.
3. **Density & Focus:** Dimensional depth shift with concentrated core brilliance.
4. **Orbital Dynamics:** Kinetic energy rings revolving around the crest core.
5. **Architectural Facets:** Illuminating the internal chevron facets and center orb.
6. **Metallic Cohesion:** Stable metallic suspension over reflective water.
7. **Process Elevation:** Gentle elevation accompanying the 4-stage process.
8. **Centered Convergence:** Direct frontal alignment for the closing conversation CTA.

---

## 2. Geometry Extraction: High-Precision Crest Sampling

### 2.1 Asset Analysis
The master crest file `public/mercian-crest-gold.jpg` contains 103,825 illuminated gold pixels spanning:
- Horizontal range: $X \in [277, 746]$ (span: 469 px)
- Vertical range: $Y \in [204, 818]$ (span: 614 px)
- Aspect ratio: $0.763$ (width to height)

### 2.2 Particle Sampling Pipeline
We implement an automated extraction script `scripts/extract-crest-coordinates.ts` using `sharp`:
1. Read `public/mercian-crest-gold.jpg` as an uncompressed raw RGB buffer.
2. Filter pixels by luminance threshold $L = 0.299R + 0.587G + 0.114B > 45$.
3. Normalize coordinates to centered Three.js world units:
   $$x_{norm} = \left(\frac{x - 511.5}{307}\right) \times 1.8$$
   $$y_{norm} = -\left(\frac{y - 511.0}{307}\right) \times 1.8$$
4. Assign 3D depth $z$ based on:
   - Surface beveling: $z \sim \text{brightness} \times 0.35 \times (1 - \text{edge\_falloff})$
   - Normal extrusion: Two front/back facing relief layers and an internal volumetric fill.
5. Generate an array of exactly 10,000 target coordinates saved directly to `lib/crest-coordinates.json` (or compiled directly into the particle core).

---

## 3. WebGL Particle Engine Architecture (`wealth-particle-core.tsx`)

### 3.1 Buffer Allocation
- Total particle count: $N = 10,400$ ($9,200$ crest particles + $1,200$ ambient atmospheric particles).
- Position buffers:
  - `targetCrestPositions`: The authentic 3D MW crest coordinate sculpture.
  - `flowPositions`: Tangential vector field positions for dispersion phases.
  - `orbitalPositions`: Concentric orbital rings surrounding the MW crest.
  - `currentPositions`: Lerped positions rendered each frame.
  - `colors`: Vertex colors blending between Incandescent White-Gold (`#FFFBE8`), Liquid Gold (`#F6BA59`), Sunset Amber (`#E08A68`), and Deep Terracotta (`#C25E34`).

### 3.2 Stage-by-Stage Behavior Matrix

| Stage | Section Name | MW Crest Visual Behavior | Camera & Lighting |
| :---: | :--- | :--- | :--- |
| **01** | Hero | Particles scatter in space, condensing smoothly into complete MW crest on the right. | Cam at $(0, 0.15, 8.0)$. Warm copper horizon fog, quiet reflective lake. |
| **02** | The Vision | Crest smoothly disperses into swirling golden streams that travel across the landscape and reform into the crest. | Cam pans slightly left to give prominence to headline, lighting intensifies. |
| **03** | Conversion | Crest tightens into a dense, high-clarity focal point; particles pulse with internal luminosity. | Depth of field tightens, amber backlighting illuminates lake surface. |
| **04** | Automation | Kinetic particle rings spin horizontally and elliptically around the intact MW crest core. | Orbiting particles create golden trails, accentuating continuous movement. |
| **05** | Intelligence | Internal facets of the crest and the central orb illuminate with incandescent white-gold points. | Sub-second shimmer effect across the chevron lattice. |
| **06** | The Right Tools | Crest stabilizes into a solid metallic sculpture with subtle 3D rotational tilt. | High-contrast specular reflections on the water plane. |
| **07** | Our Approach | Crest ascends slightly into the atmospheric background, creating visual space for the 4 process stages. | Broad atmospheric illumination across the horizon line. |
| **08** | Let's Talk | Crest migrates toward center, perfectly framing the closing CTA heading. | Golden aura enveloping the crest, fading into the footer. |

### 3.3 Physics & Interactivity
- **Cursor Parallax:** Smooth inverted damping:
  $$\Delta x = -(\text{mouse}_x \times 0.6 - \text{cam}_x) \times 0.05$$
  $$\Delta y = (\text{mouse}_y \times 0.3 - \text{cam}_y) \times 0.05$$
  Ensures mouse left pans camera left, causing 3D particles to naturally tilt with the viewer's gaze.
- **Water Plane:** Custom animated vertex displacement generating gentle sinusoidal swell reflecting the glowing MW crest.
- **Mobile Optimization:** On screens $< 768\text{px}$, particle count scales to $4,200$, horizontal glider offsets are constrained to center ($X=0$), and touch drag subtly tilts the 3D crest.

---

## 4. Section Copy & Editorial Layout Integration

### Section 01 — Hero
- **Headline:**
  ```text
  WEBSITES PEOPLE REMEMBER.
  SYSTEMS THAT WORK FOR YOU.
  ```
- **Supporting Copy:**
  `"Bespoke digital experiences designed to establish trust, strengthen your position and turn customer attention into meaningful action."`
- **CTA:** `"Explore What We Build"` (smooth scroll to `#vision` or `#storefronts`).

### Section 02 — The Vision
- **Eyebrow:** `+ THE VISION`
- **Headline:**
  ```text
  FIRST THE VISION.
  THEN THE EXECUTION.
  ```
- **Supporting Copy:**
  `"Every successful digital experience starts with understanding the business, its direction and the people it needs to reach."`

### Section 03 — Conversion
- **Eyebrow:** `+ 01 — CONVERSION`
- **Headline:**
  ```text
  TURN VISITORS
  INTO ENQUIRIES.
  ```
- **Supporting Copy:**
  `"Your website should do more than look impressive. It should communicate value, establish credibility and make it easy for customers to take the next step."`

### Section 04 — Automation
- **Eyebrow:** `+ 02 — AUTOMATION`
- **Headline:**
  ```text
  REPETITIVE WORK.
  DONE BY THE SYSTEM.
  ```
- **Supporting Copy:**
  `"Connect the right processes, reduce unnecessary administration and give your business more room to operate efficiently."`

### Section 05 — Intelligence
- **Eyebrow:** `+ 03 — INTELLIGENCE`
- **Headline:**
  ```text
  TECHNOLOGY THAT
  UNDERSTANDS YOUR BUSINESS.
  ```
- **Supporting Copy:**
  `"Thoughtful integrations and intelligent systems support better customer experiences, faster responses and more connected operations."`

### Section 06 — Tools That Work
- **Eyebrow:** `+ 04 — CONNECTIVITY`
- **Headline:**
  ```text
  THE RIGHT TOOLS.
  ONE CONNECTED EXPERIENCE.
  ```
- **Supporting Copy:**
  `"Websites, customer journeys and supporting systems should work together rather than operate in isolation."`

### Section 07 — Our Approach
- **Eyebrow:** `+ OUR APPROACH`
- **Headline:**
  ```text
  ONE MOVE AT A TIME.
  ```
- **Supporting Copy:**
  `"Every project follows a considered process, from understanding the objective to designing, building and launching the finished experience."`
- **4 Stages:**
  - `01 — Discover`
  - `02 — Plan`
  - `03 — Build`
  - `04 — Launch`

### Section 08 — Let's Talk
- **Eyebrow:** `+ CONTACT`
- **Headline:**
  ```text
  LET'S TALK.
  ```
- **Supporting Copy:**
  `"Have a project in mind? Let's explore what the right digital experience could make possible for your business."`
- **CTA Button:** `"Start a Conversation"` (links to `/book` or telephone `+44 7851 055929`).

---

## 5. Implementation Roadmap & Milestones

1. **Phase 1: Geometry Extraction Script & Data Generation**
   - Sample 9,200 particle vertices from `public/mercian-crest-gold.jpg`.
   - Export coordinates and normals into typed buffer structure.
2. **Phase 2: Three.js Particle Engine Refactoring**
   - Strip all deprecated chess knight, browser, gear, and spark geometry from `wealth-particle-core.tsx`.
   - Wire the MW crest coordinate buffer into the 6 continuous states.
   - Refine the mountain horizon, copper sunset fog, and water reflection.
3. **Phase 3: Editorial Typography & Section Layout Updates**
   - Update `components/hero.tsx` and `components/cerbo-style-homepage.tsx` with user-mandated copy.
   - Ensure left-aligned editorial layout on desktop with right-aligned 3D crest space.
4. **Phase 4: Build Verification & Browser QA**
   - Verify `next build` passes with zero errors.
   - Conduct visual inspection across desktop (1440px) and mobile (390px).
