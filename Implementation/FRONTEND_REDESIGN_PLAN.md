# MERCIAN WEALTH AUTOMATION — FRONTEND ARCHITECTURAL REDESIGN PLAN
## High-End Editorial 3D Interactive Design System & Implementation Blueprint

---

### 1. EXECUTIVE VISION & BRAND IDENTITY
Mercian Wealth Automation is transforming its frontend presentation to establish an institutional, high-end editorial standard. The interface seamlessly unifies military-grade technical precision with high-end luxury aesthetics, tailored specifically for UK local businesses, practices, and high-ticket service firms.

#### Brand Matrix & Aesthetic Guardrails
* **Identity:** Mercian Wealth Automation (Crest, Brand Mark, Executive Gold).
* **Color Architecture:**
  * **Obsidian Canvas:** `#080808` to `#0F0F12` deep dark-mode backdrop with subtle ambient gold floor glow.
  * **Glassmorphic Obsidian Surfaces:** `rgba(17, 17, 21, 0.65)` with `backdrop-filter: blur(16px)` and subtle 1px border `rgba(255, 255, 255, 0.08)`.
  * **Crisp Editorial White:** `#FFFFFF` with ultra-tight kerning for commanding display headers.
  * **Muted Platinum / Slate:** `#A1A1AA` to `#D4D4D8` for scannable body and metric descriptions.
  * **Signature Liquid Gold / Amber Accents:** `#E2B857`, `#D4AF37`, and metallic amber `#F59E0B` for glowing particle shaders, active slider tracks, HUD accents, and primary action buttons.
* **Strict Constraints:**
  * **Frontend Presentation Only:** Zero changes to backend APIs, database schemas, Supabase models, auth logic, or deployment configs.
  * **Zero Route Breaking:** Preserve `/`, `/book`, `/preview/demo`, `/services`, `/practices`, and all form actions.
  * **Zero UI Overlaps:** Eliminate the right-hand `SYSTEMS` vertical rail card overlap at desktop viewports and consolidate duplicate floating pills.

---

### 2. TYPOGRAPHY & HUD TELEMETRY SYSTEM

```
┌────────────────────────────────────────────────────────────────────────┐
│ [ SEC 01 / 06 · SYSTEM LATENCY: <45MS · STATUS: ARMED ]                │
│                                                                        │
│                      THE AUTONOMOUS WEALTH CORE                        │
│             Where Speed-to-Lead Meets Institutional Rigor             │
│                                                                        │
│ +                                                                    + │
│                                                                        │
│ [ UK // GMT · 60 FPS ]                        [ SCROLL FOR BLUEPRINT ] │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Display Headings:** High-contrast editorial display serif uppercase (Cinzel / Playfair style) with expansive letter-spacing for primary section titles and italicized gold emphasis phrases (`<em>`).
2. **Technical HUD Eyebrows & Metadata:** Monospace font (*Geist Mono*) in small uppercase (`10px`–`12px`) with brackets and telemetry indicators:
   * `[ SEC 01 / 06 · SYSTEM LATENCY: <45MS · STATUS: ARMED ]`
   * Nav telemetry indicator: `[ UK // GMT · 60 FPS ]`.
3. **Body Text:** Crisp geometric sans-serif (*Inter* / *Geist Sans*) with comfortable line-height for effortless readability.

---

### 3. INTERACTIVE 3D WEBGL & PARTICLE ENGINE

#### 3.1 Hero Scene: "The Wealth Neural Core"
* **Engine:** Three.js full-viewport background WebGL canvas.
* **Particle Structure:** An instanced 3D metallic/gold neural node cluster (~8,000–10,000 particles) with continuous subtle Perlin noise displacement.
* **Reflective Floor:** Dark reflective bottom plane with vertical ripple blur.
* **Interactive Damping:** Mouse coordinate tracking with smooth camera `lerp` inertia (smoothing factor ~`0.05`).

#### 3.2 The "Speed-to-Lead & Capacity" 3D ROI Calculator
* **User Controls:**
  * Monthly Inbound Enquiries slider (`20` to `500`).
  * Average Ticket / Project Value slider (`£500` to `£25,000`).
  * Current Manual Response Delay slider (`0.5h` to `24h`).
  * Leakage Vector Toggle Pills (After-Hours Drop-off, Manual Booking Friction, Unanswered WhatsApps).
* **Dynamic 3D Particle Bar Chart:**
  * Instanced vertical particle columns that scale in real time as the sliders change.
  * Intense gold top caps (`#F59E0B`) with gold-to-transparent particle trails.
* **Live Financial Readout:**
  * *Estimated Annual Revenue Leaked* (High-contrast gold serif headline).
  * *Recaptured Capital with Mercian Autonomous Triage*.
  * Action Button: Chamfered gold pill `[ REQUEST SYSTEM BLUEPRINT ↗ ]`.

---

### 4. CINEMATIC SECTION ARCHITECTURE & SCROLL PACING

* **Global HUD Layer:** Fixed corner brackets (`tl`, `tr`, `bl`, `br`), hairline crosshairs (`+`), live section indicator `SEC 01 / 06 · XX%`, live UK clock and FPS counter.
* **Section 01 (Hero):** 3D Interactive Gold Core + Majestic Editorial Headline + Monospace Telemetry HUD + Dual CTAs (`View Systems` / `Calculate Revenue Leak`).
* **Section 02 (The Contrast):** "Manual Operations vs. Autonomous Infrastructure" (clean comparative glassmorphic cards).
* **Section 03 (The Interactive 3D Calculator):** The dynamic gold particle calculator displaying financial ROI and recaptured capital.
* **Section 04 (The Systems Showcase):** 3D tiltable glass cards featuring Mercian Wealth’s core software modules (Instant Speed-to-Lead Triage, Automated Client Onboarding, Retainer & Job Timer).
* **Section 05 (Frictionless Intake / Booking):** A streamlined, single-screen project brief selector + live calendar booking interface without multi-step gating.

---

### 5. BUG REMEDIATION & DESKTOP ERGONOMICS
* **Fixing Desktop Overlaps:** Replace the bulky floating right-rail `ChapterTracker` with an integrated HUD scroll track (`scaleY` progress fill) positioned strictly in the outer margin so it never collides with cards or content at 1440px resolution.
* **Consolidating Floating Pills:** Merge duplicate floating WhatsApp and concierge pills into a singular, clean, non-intrusive bottom HUD element.
* **Mobile & Low-Power Optimization:** Auto-throttle particle count on mobile screens (`<768px`) and cap `devicePixelRatio` at `2` for sustained 60 FPS performance.
