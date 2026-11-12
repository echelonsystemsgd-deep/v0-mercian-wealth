# Outreach Dashboard UX Overhaul & Modern UI Architecture Plan
**Mercian Wealth · High-Converting Operating System for UK Accountancy Practices**
*Generated: November 2026 | Author: Antigravity AI Architecture Team*

---

## 1. Executive Summary & Problem Diagnosis

### Current Pain Points in the Admin Dashboard Outreach UX
1. **Modal Fragmentation & Cognitive Clutter**:
   - Currently, outreach functionality is split across multiple competing surfaces: `outreach-modal.tsx`, `lead-workspace/outreach-tab.tsx`, `cold-call-hud.tsx`, `lead-friction-dossier.tsx`, and `outreach-sprint-runner.tsx`.
   - Opening a heavy modal locks the background, interrupts list navigation, and forces the user into repetitive "Open modal → read script → dial → close modal → click next lead → open modal" loops.
2. **Dense, Unfocused Visual Hierarchy**:
   - Too many competing buttons, dropdowns, WhatsApp sequence copy, email previews, and notes fields appear at once.
   - When a managing partner answers a cold call, the caller has **less than 3 seconds** to spot the partner's name, the visual defect, and the opening line. Searching through walls of text creates hesitance.
3. **Lack of "Flow State" / Continuous Calling Ergonomics**:
   - Cold calling requires high-speed momentum. The system currently lacks instant auto-advancement (e.g., logging "No Answer" should instantly cue the next lead with keyboard shortcuts `1-4` and `J/K`).
4. **Dated Micro-interactions**:
   - The UI lacks fluid animations, card flips, and tactile micro-interactions that make calling enjoyable and frictionless.

---

## 2. UI Libraries Analysis & Architectural Mapping
*Benchmarked against the user's curated Notion Resource Hub (`soapy-knee-577.notion.site`)*

| Notion UI Library | Core Capability | Architectural Implementation in Mercian Wealth Outreach HUD |
| :--- | :--- | :--- |
| **Shadcn UI + Radix Primitives** | Unstyled, accessible component primitives | Sheet (slide-over panel), Command palette, Tooltips, Tabs, and Toggle groups. Zero heavy NPM lock-in; 100% Tailwind CSS customizable. |
| **Kokonut UI (`card-flip`)** | 3D interactive card-flip micro-interactions | **Live Objection Flip-Cards**: Clean cards ("Send me an email", "We have a web guy", "Word of mouth") that 3D flip on tap/hover to reveal the exact psychological counter-script. |
| **Magic UI (`border-beam`, `shimmer-button`, `number-ticker`)** | Subtle luxury glowing borders & animated metrics | Gold border beam (`#DCAE53`) around the active teleprompter card; animated dial counter (`number-ticker`) tracking daily calls made. |
| **Aceternity UI (`card-spotlight`, `lamp-effect`)** | Subtle mouse-tracking radial spotlight & dark-mode luxury depth | Focused spotlight effect highlighting the active call phase and primary defect card without visual distraction. |
| **Framer Motion (`motion.div`, `AnimatePresence`)** | Declarative gesture and layout transitions | Fluid slide-in animations between leads when advancing; spring-based teleprompter card transitions; zero screen reload flicker. |
| **Tweakcn / Tailwind Theme System** | Cohesive color palette and variable synchronization | Enforcing Mercian Wealth luxury gold theme: Obsidian (`#09090B`), Slate card (`#141417`), Hairline border (`border-white/10`), Luxury Gold (`#DCAE53`), Emerald (`#10B981`). |
| **Bklit / Tremor Patterns** | Metric widgets & sprint progression | Daily call pacing gauge, conversion funnel micro-bar, and live session stats (Calls Dialed, Connects, Discovery Calls Booked). |

---

## 3. The New Experience: "Zen-Mode Calling Cockpit"

Instead of opening clunky dialog modals over a table, we replace the fragmented outreach experience with a **Unified 3-Pane Calling Cockpit** (or Full-Height Slide-Over Drawer):

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ⚡ MERCIAN WEALTH OUTREACH COCKPIT                                       [Sprints: 14 Fresh Leads]  [Calls Today: 18]  │
├──────────────────────────┬─────────────────────────────────────────────────────────────┬───────────────────────────────┤
│ PANE 1: TARGET FIRM      │ PANE 2: TELEPROMPTER & SCRIPT HUD (FOCUS)                   │ PANE 3: INSTANT OUTCOME & LOG │
│                          │                                                             │                               │
│ [D+] A&C Chartered       │ ✦ 3-SECOND VISUAL DIAGNOSTIC (Kokonut Flip Card)            │ 1-CLICK CALL OUTCOME          │
│     Accountants          │ ┌─────────────────────────────────────────────────────────┐ │ ┌───────────────────────────┐ │
│ 📍 Manchester            │ │ 🚨 OBSERVABLE FLAW: Mobile nav links stack over header  │ │ │ [1] ✦ BOOKED DISCOVERY    │ │
│ 👤 Practice Partner      │ │ 💼 COMMERCIAL LEVER: 24h manual callback delay loses    │ │ │     (Emerald Glow)        │ │
│ 📞 0161 832 4841         │ │    high-margin Ltd Co directors out-of-hours            │ │ ├───────────────────────────┤ │
│                          │ └─────────────────────────────────────────────────────────┘ │ │ [2] 🛡️ Gatekeeper Blocked  │ │
│ [ 📞 TAP TO DIAL ]       │                                                             │ ├───────────────────────────┤ │
│ [ 🌐 OPEN LIVE SITE ]    │ ✦ 3-PHASE BENEVOLENT AUTHORITY SCRIPT                       │ │ [3] 📵 No Answer / Voicemail│ │
│                          │ ┌─────────────────────────────────────────────────────────┐ │ ├───────────────────────────┤ │
│ TECH STACK:              │ │ Phase 1 (Gatekeeper Interrupt):                         │ │ │ [4] ❌ Not Interested     │ │
│ • WordPress (WP Engine)  │ │ "Good morning — connect me with senior partner..."      │ │ └───────────────────────────┘ │
│ • PHP Backend Exposed    │ │                                                         │                               │
│ • Missing CSP / HSTS     │ │ Phase 2 (Diagnostic Opener):                            │ QUICK CALL NOTES:             │
│ • jQuery Error:          │ │ "Hi [Name], Gurtej here from Mercian Wealth..."         │ [ Type note or select tag... ]│
│   matchHeight not found  │ │                                                         │                               │
│                          │ │ Phase 3 (High-Status Close):                            │ KEYBOARD SHORTCUTS:           │
│ PREVIEW SANDBOX:         │ │ "Ahead of tax deadlines, are your partners losing..."   │ • [Space] = Tap to Call       │
│ [ Live 390px Iframe ]    │ └─────────────────────────────────────────────────────────┘ │ • [1-4]   = Log Outcome       │
│                          │                                                             │ • [J / K] = Prev / Next Lead  │
│                          │ ✦ INTERACTIVE OBJECTION FLIP-CARDS (Kokonut Card-Flip)      │ • [F]     = Flip Objection    │
│                          │ [ "Send an Email" ] [ "Have Web Guy" ] [ "Word of Mouth" ]  │ • [Esc]   = Exit Cockpit      │
└──────────────────────────┴─────────────────────────────────────────────────────────────┴───────────────────────────────┘
```

---

## 4. Key UX Innovations

### Innovation 1: Zero-Click Lead Flow ("Continuous Auto-Advance")
- In the current system, logging a call leaves the user stranded on the same lead or forces them to close a modal and re-click the table.
- **The Upgrade**: Pressing `1` (Booked), `2` (Gatekeeper), or `3` (No Answer) logs the call, updates Supabase instantly, shows a micro toast, and **smoothly slides in the next lead with Framer Motion**.
- Result: You can cycle through 20 calls in 30 minutes without ever touching your mouse.

### Innovation 2: Kokonut UI 3D Objection Flip-Cards
- Objections happen fast on phone calls. Instead of reading an essay:
  - 3 sleek cards sit below the teleprompter:
    1. **"Send me an email"**
    2. **"We already have a web guy"**
    3. **"We get all our clients by referral"**
  - Tapping or hovering flips the card with a 3D tilt animation to display the exact benevolent counter-frame:
    - *Counter for "Send an email"*: *"I certainly can, but my emails tend to be vague without understanding your practice intake first. Do you have 3 minutes now to see if this even applies to your firm, or are you in client meetings?"*

### Innovation 3: Integrated 390px Mobile Viewport Sandbox
- Left pane features a live toggleable 390px mobile view of the prospect's actual website.
- While dialing, you can visually verify the exact defect (e.g. broken header on A&C Accounts, missing phone button on Holloway Cook) right in front of your eyes.

### Innovation 4: Unified Multi-Channel Drawer (Phone, WhatsApp, Email)
- Below the phone dialer, toggle tabs allow switching between:
  - **Phone Mode** (Default: Teleprompter + Objections + 1-Click Logging).
  - **WhatsApp Mode** (1-Click direct WhatsApp Web opening with personalized pre-filled text, zero prototype mentions).
  - **Email Mode** (1-Click Resend delivery or Gmail draft with verified partner email).

---

## 5. Implementation Roadmap & Technical Deliverables

### Phase 1: Modern Component Architecture (`components/admin/outreach/`)
1. `cockpit-shell.tsx`: Full-screen responsive slide-over drawer with keyboard listeners (`J`, `K`, `1-4`, `Space`, `Esc`).
2. `lead-card-pane.tsx`: Target firm profile, verified phone, address, tech stack tags, and live mobile preview.
3. `teleprompter-pane.tsx`: Large typography, diagnostic cards with Magic UI border beams, and 3-phase scripts.
4. `objection-flip-card.tsx`: Kokonut UI 3D flip card component for rapid objection rebuttals.
5. `outcome-dock.tsx`: 1-click outcome logging directly writing to Supabase `leads` and `call_logs`.

### Phase 2: Design System & Styling Token Alignment
- **Backgrounds**: Obsidian `#09090B` and Card Background `#141417`
- **Borders**: Subdued hairline `border-white/10` with golden hover `border-[#DCAE53]/40`
- **Typography**: Clean tabular numbers for phone numbers, bold 18px-20px serif/sans headings for script openers.
- **Accents**: Mercian Gold `#DCAE53`, Success Emerald `#10B981`, Error Ruby `#EF4444`.

### Phase 3: Deprecation & Consolidation
- Replace redundant legacy modals (`outreach-modal.tsx`, `outreach-sprint-runner.tsx`) with the single, high-performance `OutreachCockpit`.
- Mount a persistent **"⚡ Launch Calling Cockpit"** button in the `/admin` header and across lead lists.

---
*Status: Architecture Plan Saved to `Implementation/OUTREACH_DASHBOARD_UX_OVERHAUL_AND_UI_LIBRARIES_PLAN.md`.*
