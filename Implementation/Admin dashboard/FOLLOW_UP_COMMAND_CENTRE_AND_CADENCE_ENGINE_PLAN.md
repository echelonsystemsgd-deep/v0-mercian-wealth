# Follow-Up Command Centre & Chronological Cadence Engine Implementation Plan

**Location:** `Implementation/Admin dashboard/FOLLOW_UP_COMMAND_CENTRE_AND_CADENCE_ENGINE_PLAN.md`  
**Target:** `app/(admin)/admin/leads/page.tsx`, `lib/auditor/accountant-leads-registry.ts`, Supabase Data Layer  
**Status:** Approved & In Implementation  

---

## 1. Executive Summary & Problem Diagnosis

### The Diagnostic Gap (Screenshot Analysis `media_1792846103016_1149139c.png`)
In the previous admin ledger implementation:
1. **Unsegmented Follow-Up Queue:** The sub-queue strip displayed a single monolithic pill: `"Due Follow-Up (66)"` (now 64 after removing leads 9 and 12). Clicking this simply executed `l.status === 'Contacted'`, indiscriminately mixing leads contacted 1 hour ago with leads contacted 72+ hours ago.
2. **Premature Outreach Risk:** Without temporal countdown tracking, an operator risked spamming a practice that had only received their initial outreach hours earlier, violating professional boundaries and burning the lead.
3. **Missing Cadence Progression:** There was no lightweight mechanism to record when Follow-Up 1 was sent versus Follow-Up 2, requiring manual SQL or external notes.
4. **Positioning Dilution:** Standard follow-up templates risked sounding desperate ("Just checking in if you saw my email..."), completely forfeiting leverage.

---

## 2. Core Strategic Positioning: Machiavellian Leverage & Kevin Trudeau Takeaway

### The Golden Rule of Power
> *"The person with the ability to say NO, or who has the clear posture to walk away and allocate the opportunity to someone else, is the most powerful actor in any negotiation."*

### Exclusivity & Postcode Sovereignty
Every accounting practice operate within a local competitive territory. We enforce strict **Single-Firm Postcode Exclusivity**:
- **Initial Touch:** Unveil single verified friction point without asking for business or sending prototype links.
- **Follow-Up 1 (48h Value Check-in):** Check if partners evaluated the friction; confirm that territory reservation for their postcode is open for a limited window.
- **Follow-Up 2 (Day 5 Takeaway Close):** Respectfully close out outreach. Inform them that because we exclusively work with one accounting practice per catchment area, we are releasing the territory lock and advancing talks with other local enquiries.
- **Zero Prototype Links:** Working prototypes are mentioned as fully built, but links are **strictly withheld** until a 10-minute briefing call is scheduled.

---

## 3. Technical Architecture & Cadence Engine

### 3.1 Mathematical Cadence State Machine (`getLeadFollowUpCadence`)
Based on `scraped_metadata.contacted_at || lead.updated_at || lead.created_at`:

| Cadence Stage | Elapsed Time Criteria | UI Badge | Operator Action |
| :--- | :--- | :--- | :--- |
| **`cooling_down`** | `hoursSinceContact < 48` | `❄️ Cooling Down (Xh to FU1)` | **Do Not Contact.** Allow decision makers time to digest initial briefing. |
| **`due_fu1`** | `hoursSinceContact >= 48` AND `!fu1_sent_at` | `⚡ Due Follow-Up 1 (Xh ago)` (Pulsing Amber) | Launch Follow-Up 1 via WhatsApp/Email. Click **"Mark FU 1 Sent"**. |
| **`waiting_fu2`** | `fu1_sent_at` recorded AND `hoursSinceFu1 < 72` | `FU 1 Sent • Final in Xh` (Sky Blue) | Intermediary wait state. Awaiting reply or booking. |
| **`due_fu2`** | `hoursSinceFu1 >= 72` OR `hoursSinceContact >= 120` | `⏳ Due Final Takeaway (Day 5+)` (Rose Red) | Launch Kevin Trudeau Takeaway Close. Click **"Mark Takeaway Sent"**. |
| **`completed`** | `fu2_sent_at` recorded | `Cadence Closed` (Neutral Zinc) | Territory released. Lead archived or maintained in ledger. |

### 3.2 Data Layer Schema (`scraped_metadata`)
No destructive table migrations required. Uses Supabase JSONB `scraped_metadata`:
```typescript
{
  contacted_at: "2026-10-21T18:47:55.663Z",
  follow_up_1_sent_at: "2026-10-24T14:00:00.000Z",
  follow_up_final_sent_at: null, // or ISO string
  friction_title: "Broken quote engine / intake drop-off",
  grade: "A"
}
```

---

## 4. UI/UX Enhancements in `app/(admin)/admin/leads/page.tsx`

1. **Dedicated Follow-Up Cadence Sub-Filter Bar:**
   - Automatically surfaces when `quickFilter === 'contacted'` or `queueFilter === 'due_followup'`.
   - Offers 4 instant segmented tabs:
     * `All Contacted (64)`
     * `⚡ Due Follow-Up 1 (48h+) (24)`
     * `⏳ Due Final Close (Day 5+) (0)`
     * `❄️ Cooling Down (<48h) (40)`
2. **Card Urgency Badges:**
   - Every Contacted card displays its exact temporal status badge alongside the `Contacted` status pill.
3. **1-Click Cadence Advancement:**
   - Direct button `Mark FU 1 Sent` / `Mark Takeaway Sent` with 0ms optimistic UI rendering and background Supabase persistence.
4. **Interactive Dispatch Actions:**
   - Direct 1-click WhatsApp (`https://wa.me/...`) and Email (`mailto:...`) deep links with tailored Machiavellian copy pre-populated.

---

## 5. Verification Checklist
- [x] Mitchell Charlesworth LLP & AccountAbility Yorkshire Limited permanently deleted from Supabase.
- [x] Contacted count reconciled: 64 active contacted leads.
- [x] Zero prototype links across all messages and metadata.
- [x] `getLeadFollowUpCadence` integrated in `page.tsx`.
- [x] Cadence Sub-Filters rendered and functional.
- [x] `npm run build` produces 0 errors.
- [x] Git committed and pushed cleanly.
