# Mercian Wealth: Comprehensive Website & Conversion Architecture Audit & Improvement Plan

**Author:** Antigravity AI Engineering & Practice Intelligence  
**Target:** mercianwealth.com (`v0-gs-legacy-wealth-app`)  
**Core Goal:** Flawless conversion ergonomics, 100% brand consistency, elimination of bait-and-switch CTAs, and institutional trust for high-ticket clients.

---

## 1. Executive Diagnosis: The 3 Core Friction Points

### 1.1 The "Prototype Request" Bait-and-Switch (Your Exact Observation)
* **The Current Experience:**  
  The homepage (`hero.tsx`, `offer-mechanism.tsx`, `cta.tsx`) repeatedly promises:  
  *"Before we deploy your actual system, we build a working prototype of it for your business — zero commitment."*  
  When an owner fills out the form:
  * They expect to receive a functioning custom build in their hands.
  * Instead, the automated email told them: *"Delivery target: within 24 to 48 hours"* and pushed them with a button: *"Fast-Track: Book a 15-Min Live Demo Call →"*.
  * **The Psychological Consequence:** A sophisticated managing partner or business owner immediately recognizes this as an agency lead-magnet trick. They feel baited into a sales call rather than given a prototype.
  * **The Operational Cost:** Promising free custom builds to unverified web visitors burns founder time or forces you to underdeliver on the promise.

### 1.2 Modal Scroll Locking & Viewport Bleed (Now Fixed)
* **The Glitch:** When opening `PrototypeRequestModal` or dialogs, the underlying landing page was moveable. Users swiping on mobile would see the background page sliding underneath the modal.
* **The Fix Implemented:** Added reactive `document.body.style.overflow = "hidden"` scroll-locking in `components/prototype-request-modal.tsx`. Background movement is completely arrested.

### 1.3 Email Integrity & Brand Consistency
* **Transactional Email Review:**
  * Previously, the prototype confirmation email had zero working demo links.
  * We upgraded `lib/email-templates.ts` to immediately deliver a prominent emerald CTA: **"✦ Test-Drive Live Interactive Architecture Now →"** linking directly to `https://mercianwealth.com/preview/demo`.
  * Now, whether on screen or in their inbox, every requester actually receives an interactive, live working accountancy OS sandbox with real Corporation Tax sliders, 3-tap scoping, and mobile booking.

---

## 2. Strategic Improvement Options: What to do with the "Free Prototype" CTA

### 🏆 Recommendation 1: The "Institutional Demonstration" Model (Highest Trust & Conversion)
Instead of promising to build a custom website for free before speaking to them, pivot the offer to **pre-built live proof**:

1. **Primary Button:** **"Book a 15-Min Practice Scoping Session"** (Links straight to `/book`).
2. **Secondary Button:** **"Test-Drive Live Accountancy Portal →"** (1-Click straight into `/preview/demo` with zero form barrier).
3. **The High-Status Positioning:**  
   *"We don't pitch theoretical slide decks. Test-drive our live practice architecture running real client triage on your phone right now. On our 15-minute scoping call, we review your practice numbers and show you how this deploys under your own brand."*

### Recommendation 2: The "Diagnostic Audit" Model (If You Want an Inbound Lead Magnet)
If you want to keep a form on the homepage to capture leads who aren't ready to book a call yet:
* Change the copy from *"Request a Free Prototype"* to **"Request Practice Intake Audit & Leak Report"**.
* What they submit: Firm Name, Website URL, Email.
* What they receive: A crisp 3-point diagnostic brief identifying their mobile intake bottlenecks + instant access to the live sandbox.

---

## 3. Brand Consistency Master Rubric for Mercian Wealth

To ensure your website sets an undeniable benchmark for corporate clients, every section must adhere to the **Mercian Wealth Design Language**:

| Element | Specification | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#050505` to `#09090B` (Void Black) | Eliminates amateur grayish web looks; frames gold elements with maximum contrast. |
| **Surface Cards** | `#111115` with `border border-white/10` | Elevated glassmorphic cards for case studies and diagnostic cards. |
| **Imperial Gold** | `#DAA640` / `#DCAE53` (Primary Accent) | Sovereign, high-status wealth and institutional advisory feel. |
| **Emerald Verification** | `#34D399` / `#10B981` | Used strictly for verified proof: live system status, speed metrics (<400ms), and booking confirmations. |
| **Typography** | `Geist Sans` (Hero/Headings) + `Geist Mono` (Telemetric labels) | Precision technical authority. |

---

## 4. Summary of Code Improvements Completed

1. **`components/prototype-request-modal.tsx`:**
   * Body scroll-lock enabled on open.
   * Instant **"✦ Test-Drive Live Demo Now →"** button displayed on the success screen so requesters test the prototype immediately.
2. **`lib/email-templates.ts`:**
   * `generatePrototypeConfirmationEmail` updated with an immediate live prototype access button linking to `https://mercianwealth.com/preview/demo`.
   * Clear, honest framing: requesters test the live sandbox on their smartphone immediately, while a custom scoping call is offered as an optional fast-track.
3. **`components/admin/lead-workspace/cold-call-hud.tsx` & `outreach-tab.tsx`:**
   * Live Cold Call Teleprompter HUD mounted with 1-click `tel:` calling, 3-second diagnostic cards, and interactive objection toggles.
   * Zero-prototype rule strictly enforced on initial outreach messages in `hooks/use-playbook-engine.ts`.
