# Admin Dashboard Cold Calling & Multi-Channel Outreach Infrastructure: Implementation Plan

**Author:** Antigravity Agentic Pair Programmer  
**System:** Mercian Wealth (`v0-gs-legacy-wealth-app`)  
**Target:** UK Accountancy Practices & Chartered Tax Advisory Firms  
**Philosophy:** Benevolent Authority (Kevin Trudeau), Strategic Realism (Machiavelli), High-Status Conversion (Jordan Belfort & Sales Prof)  
**Strict Policy:** ZERO mention of prototypes, demos, or concepts in any initial email or initial outreach message.

---

## 1. Executive Mission & Problem Statement

The admin dashboard at `app/(admin)/admin/leads/[id]` already possesses rich forensic intelligence and revenue-bleed calculations. However, when an operator is actively cold calling a practice partner:
1. Long paragraphs of text are impossible to read at a glance.
2. The initial email copy previously contained premature mentions of prototypes and demo links, violating the curiosity-driven Benevolent Authority principle.
3. The dashboard lacked an instant **Cold Call HUD (Heads-Up Display)** featuring live click-to-dial, 3-second diagnostic bullets, talk tracks, and interactive objection toggles.

---

## 2. Core Architectural Upgrades

### A. Strict "No-Prototype in Initial Outreach" Rule
* **Old Pattern:** Sentences like *"I put together a quick working mobile prototype... Open to taking a quick look?"*
* **New Benevolent Pattern:**
  * **Observation:** Direct, non-accusatory identification of a specific mobile friction point (e.g. *"open comments box with zero turnover triage"* or *"confusing contact field label"*).
  * **Consequence:** How this causes £1m+ turnover directors to bounce out-of-hours, or forces fee-earners to waste billable hours.
  * **Low-Pressure Inquiry:** Asking how they currently triage incoming directors without offering or pitching anything upfront.

### B. Cold Call Teleprompter & Battlecard HUD
A dedicated, real-time calling panel embedded inside `components/admin/lead-workspace/outreach-tab.tsx`:
* **Header Bar:** Prominent `tel:` dialer button, partner name, telephone number, city, and firm regulators (ICAEW/ACCA).
* **The 3-Second Diagnostic Flashcard:**
  * Observable Flaw (Simple English).
  * Commercial Bleed (Lost retainers / wasted billable hours).
  * Natural Solution (Automated intake triage).
* **3-Phase Cold Call Script:**
  1. *Gatekeeper Bypass & Pattern Interrupt*
  2. *The Benevolent Opener (Praise pedigree + state the leak)*
  3. *The Low-Pressure Discovery Close*
* **Interactive One-Click Objection Flip-Cards:**
  * *"We have a web agency"*
  * *"Just send an email"*
  * *"We're too busy / not taking clients"*
* **Instant Outcome Logger:**
  * One-click recording that updates lead status directly in Supabase (`Call Booked`, `Contacted`, `Lost`).

---

## 3. Implementation Steps & Verification

1. **Create `components/admin/lead-workspace/cold-call-hud.tsx`**:
   Self-contained, production-grade HUD component with copy-to-clipboard, objection toggles, and live dialer.
2. **Update `hooks/use-playbook-engine.ts`**:
   Cleanse all initial email copy to completely strip prototype references. Ensure initial emails are 100% conversational inquiry focused on friction.
3. **Enhance `components/admin/lead-workspace/outreach-tab.tsx`**:
   Integrate the Cold Call HUD at the top of the outreach workspace.
4. **Clean Code & Build Verification**:
   Execute TypeScript and Next.js lint/build checks to ensure 0 errors or warnings.
5. **Browser Subagent Visual Demonstration**:
   Launch browser subagent on `https://www.ac-accounts.co.uk` to visually inspect the live mobile viewport in Antigravity.
