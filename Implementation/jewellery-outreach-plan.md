# Jewellery Vertical Outreach & Prototype Pipeline — Master Implementation Plan

**Target Vertical:** Independent & Bespoke Jewellery Businesses (UK Regional / National)  
**Core Mechanism:** Consultative WhatsApp Outreach → Friction Audit → Free Reusable Interactive Prototype (VEYRA) → Paid Full-Build Conversion  
**Document Status:** Architecture & Strategy Blueprint (Brainstorming Phase — Zero Code Changes)  
**Target Location:** `/Implementation/jewellery-outreach-plan.md`  

---

## 1. Executive Summary & Core Philosophy

The jewellery niche is fundamentally distinct from trade/home-services verticals (roofing, plumbing, construction):
1. **Perceived Value & Aesthetics are Paramount:** A roofer needs a clean layout that establishes local trust and generates phone calls. A jeweller’s website is an extension of their atelier or showroom; poor typography, clunky mobile galleries, or dated e-commerce instantly devalues high-ticket products (rings, bespoke commissions, luxury watches).
2. **Consultative, Non-Salesy Approach:** As laid out in the master flow, we never pitch "3D features" or "website design." We identify commercial friction points (e.g., drops in visitor interest, lack of online prestige, missing customer journeys), introduce the commercial consequence, and deliver a zero-obligation interactive prototype (`VEYRA`) to let the visual experience sell itself.
3. **Dual Branching:** Outreach branches based on whether the business has an existing website (Branch A: critique & elevate) or relies solely on Instagram/WhatsApp/in-store (Branch B: solve the missing conversion hub).

---

## 2. CRM & Pipeline Stage Reconciling

### The Problem
The existing admin pipeline operates on generic agency macro-stages:
`New` → `Contacted` → `Call Booked` → `Proposal Sent` → `Won` → `Lost`

The Jewellery Outreach Master Flow has an 8-step micro-sequence:
1. `Initial Message Sent` (Ask)
2. `Website Status Verified` (Branch A: Site Reviewed vs Branch B: No Site Confirmed)
3. `Painpoint & Consequence Sent` (Painpoint)
4. `Outcome & Tease Sent` (Outcome & Tease)
5. `Prototype Sent` (Veyra Prototype delivered)
6. `Reaction Received` (Prospect feedback received)
7. `Closing / Full Build Agreed` (Transition to commercial quote/build)
8. `Lost / Not Interested` or `Stalled / Follow-Up Due`

### Proposed Recommendation: Two-Tier Pipeline Architecture (Decoupled Macro & Micro)

> [!IMPORTANT]
> **Recommendation:** **Do NOT overwrite or relabel the core `lead_status` enum.**  
> Instead, implement a **Two-Tier Architecture**:
> - **Tier 1 (Global Macro Status — `status`):** Keeps standard agency reporting, financial forecasting, and global lead counts intact (`New`, `Contacted`, `Call Booked`, `Proposal Sent`, `Won`, `Lost`).
> - **Tier 2 (Vertical-Specific Micro Stage — `outreach_stage`):** A granular column that captures the exact progression through the Jewellery conversation sequence.

#### Why Relabeling Fails:
- A lead who receives the prototype is technically "Contacted" or in "Nurture", but not yet at "Proposal Sent" or "Call Booked". 
- Collapsing 8 stages into 5 causes high drop-offs because an operator cannot tell whether a "Contacted" lead is waiting for their site audit, waiting for a prototype link, or due a 48-hour follow-up.
- Other verticals (e.g. trades, roofing, B2B enterprise) operate on faster 2-step pitches, so forcing jewellery-specific labels globally would break existing workflows.

#### Mapping Table: Micro Stage to Macro Status

| Jewellery Micro-Stage (`outreach_stage`) | Global Macro Status (`status`) | Branch Condition | Operator Action Required |
| :--- | :--- | :--- | :--- |
| `jewellery_uncontacted` | `New` | Both | Send Message 1 (Intro / Website Question) |
| `jewellery_stage1_sent` | `Contacted` | Both | Waiting for response / 48h Follow-up |
| `jewellery_branch_a_audit_due` | `Contacted` | Branch A (Has Site) | Operator does 60-second visual audit; picks painpoint |
| `jewellery_branch_b_identified` | `Contacted` | Branch B (No Site) | Ready for "No dedicated home" painpoint script |
| `jewellery_painpoint_sent` | `Contacted` | Both | Send Outcome & Tease |
| `jewellery_prototype_teased` | `Contacted` | Both | Waiting for "Yes, send it over" |
| `jewellery_prototype_sent` | `Contacted` | Both | Prototype dispatched; timer starts for Reaction check |
| `jewellery_reaction_received` | `Contacted` / `Call Booked` | Both | Review feedback: Interested vs Not Interested |
| `jewellery_quote_transition` | `Proposal Sent` | Won | 1-click trigger to generate quote / Discovery session |
| `jewellery_won` | `Won` | Won | Deposit taken / Full build kickoff |
| `jewellery_lost_declined` | `Lost` | Lost | Polite sign-off recorded (clean exit, no nagging) |
| `jewellery_stalled` | `Contacted` | Both | Follow-up sequence triggered (Follow-up 1 or 2) |

---

## 3. Supabase Data Model Changes

The system already has basic outbound fields in `public.leads` (`lead_type`, `local_business_niche`, `outreach_category`, `outreach_stage`, `scraped_metadata`, `whatsapp_direct_url`). 

To fully support the Jewellery Master Flow, we propose non-destructive additions to `public.leads` and a lightweight audit tracking structure.

### Proposed Additions to `public.leads`

```sql
-- Migration: Add jewellery vertical and audit fields to public.leads
ALTER TABLE public.leads
  -- 1. Branch Identification
  ADD COLUMN IF NOT EXISTS has_website BOOLEAN DEFAULT NULL, -- NULL = unverified, TRUE = Branch A, FALSE = Branch B
  
  -- 2. Painpoint Selection & Customization
  ADD COLUMN IF NOT EXISTS identified_painpoint TEXT, 
  -- e.g. 'luxury_perception_gap', 'mobile_friction', 'dated_catalog', 'clunky_browsing', 'no_bespoke_cta', 'missing_digital_presence'
  ADD COLUMN IF NOT EXISTS painpoint_custom_note TEXT, -- Specific 1-line observation entered by operator

  -- 3. Prototype Tracking
  ADD COLUMN IF NOT EXISTS prototype_url TEXT DEFAULT 'https://veyra-premium-3-d-jewellery-e-comme.vercel.app/',
  ADD COLUMN IF NOT EXISTS prototype_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS prototype_feedback_at TIMESTAMPTZ,
  
  -- 4. Reaction & Outcome Notes
  ADD COLUMN IF NOT EXISTS reaction_sentiment TEXT, -- 'positive_interested', 'positive_passive', 'not_interested', 'objected'
  ADD COLUMN IF NOT EXISTS reaction_notes TEXT,
  
  -- 5. Follow-Up Engine State
  ADD COLUMN IF NOT EXISTS last_outreach_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS next_followup_due TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_iteration INT DEFAULT 0; -- 0 = None, 1 = First bump, 2 = Final bump
```

### Proposed Painpoint Tagging Enum / Standard Library
To make the operator's job take under 10 seconds per lead, we define standard painpoints that plug directly into Message 2 & 3:

1. `luxury_perception_gap` → *"Jewellery doesn’t feel as premium online as it does in person"*
2. `mobile_browsing_friction` → *"Mobile experience creates friction when browsing high-detail pieces"*
3. `unclear_collections` → *"Collection structure and piece details make it difficult to explore"*
4. `weak_trust_authority` → *"Trust and craftsmanship story isn’t established quickly enough"*
5. `hidden_enquiry_route` → *"The route from seeing a piece to making an enquiry or bespoke request isn't obvious"*
6. `dated_vs_craftsmanship` → *"The website design feels dated compared to the modern standard of your jewellery"*
7. `no_dedicated_storefront` (Branch B) → *"No dedicated, credible place for people to browse collections and build confidence outside of Instagram"*

---

## 4. Prototype Architecture: Generic vs Semi-Customized

The master flow references the **Veyra Jewellery Prototype** (`https://veyra-premium-3-d-jewellery-e-comme.vercel.app/`), which features interactive 3D rendering, solid cast jewellery aesthetics, bespoke inquiry triggers, and luxury typography.

### Analysis of Approaches

| Criteria | Option 1: Static Reusable Template (Pure Veyra Link) | Option 2: Semi-Customized Dynamic Prototype (Dynamic Query Params) | Option 3: Fully Bespoke Static Clone per Lead |
| :--- | :--- | :--- | :--- |
| **Effort per Lead** | **0 seconds** (instant paste) | **0 seconds** (URL auto-assembled from DB) | **45–60 minutes** (manual Figma/Next.js clone) |
| **Perceived Wow Factor** | High (Veyra is already stunning) | **Maximum** (Looks like an exclusive concept built for them) | High |
| **Scalability (100 leads/wk)** | High | **Extremely High** | Completely unscalable |
| **Risk of Failure** | Low | Low | High (burnout, high sunk time on non-responders) |

### Recommendation: Option 2 (Dynamic Parameterised Experience)

> [!TIP]
> **Recommended Strategy:** Deploy a lightweight dynamic parameter layer on the prototype or hosted preview URL.  
> Format: `https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Mayfair+Jewellers&location=Birmingham` or internally hosted via `/preview/jewellery?brand=[Business+Name]`.

#### Why this wins:
1. **Zero Manual Labor:** The WhatsApp copy generator in the admin dashboard automatically appends `?brand=ProspectName` to the URL.
2. **Instant Psychological Buy-in:** When the prospect opens the link, a sleek, understated top ribbon or headline displays:  
   *"Private Concept Prototype — Prepared for Mayfair Jewellers"*  
   This makes the prospect feel like you spent hours crafting a vision exclusively for them before asking for a single penny.
3. **Preserves the Master Script:** The script explicitly states:  
   *"It’s not the finished website or anything — I built it to demonstrate how the jewellery could be presented and how the customer journey could work... If you wanted to take it forward, I’d build the proper version around [Business Name] specifically."*  
   Having their name dynamically rendered matches this narrative with 100% authenticity.

---

## 5. Automation vs Manual Triage (n8n Integration)

A core rule of high-ticket B2B outreach is: **Automate data preparation and follow-up tracking; keep the observation and relationship human.**

```
┌────────────────────────────────────────────────────────┐
│                   n8n AUTOMATION                       │
│  - Google Maps & Instagram Scrape                      │
│  - Automated Website / HTTP Status Detection           │
│  - Phone Format Sanitization (UK Mobile vs Landline)   │
│  - Ingest into Supabase with lead_type = 'jewellery'   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               HUMAN OPERATOR (ADMIN CRM)               │
│  - 30-second inspection of existing site or IG         │
│  - Click 1 button to pick Identified Painpoint         │
│  - 1-click WhatsApp Launch with pre-filled script      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   n8n AUTOMATION                       │
│  - Monitor follow-up timeouts (48h inactivity cron)    │
│  - Push overdue reminder to Admin Task Queue / Slack   │
│  - Log prototype link click-throughs (if tracking URL) │
└────────────────────────────────────────────────────────┘
```

### What to Automate (n8n Tasks)
1. **Website Existence & Health Check:**
   - On scrape, run a HEAD request to the prospect's listed URL.
   - If HTTP 200 and domain is valid → Pre-set `has_website = TRUE` (Branch A candidate).
   - If no URL, social media only (instagram.com / facebook.com), or domain dead → Pre-set `has_website = FALSE` (Branch B candidate).
2. **Channel Validation (Mobile vs Landline):**
   - Automatically inspect phone numbers: flag `07...` / `+447...` as valid WhatsApp targets, flag `01...` / `02...` as landlines.
3. **Follow-Up Expiry & Nudge Engine:**
   - A daily cron job in n8n queries leads where:
     - `outreach_stage IN ('jewellery_stage1_sent', 'jewellery_prototype_sent')`
     - `updated_at < NOW() - INTERVAL '48 hours'`
   - Updates `next_followup_due` and pushes a batch alert to the admin dashboard or Telegram/Slack.

### What to Keep Strictly Manual / Human
1. **The Website Critique (The Painpoint Selection):**
   - AI tools can hallucinate generic critique. An operator taking 30 seconds to click on their website and select "Mobile browsing friction" or "Photos don't match luxury price" ensures the message feels genuine and sharp.
2. **The Reaction Conversation:**
   - When a prospect replies ("I like it, but how do you handle custom ring commissions?"), an operator must handle the dialogue personally. Automated bots in WhatsApp destroy high-ticket trust instantly.

---

## 6. Admin Dashboard UX & Workflow Enhancements

To make handling 50–100 jewellery prospects per week effortless, the Admin Dashboard should feature:

### 1. Vertical Filter Tabs in `/admin/leads`
- Add a dedicated segment tab: **All Leads | Trade Specialists | Jewellery Ateliers**.
- Selecting **Jewellery** filters the list to `local_business_niche = 'jewellery'`.

### 2. Branch & Sequence Visual Badges
- **Branch A Badge:** Green tag `[🌐 Has Website]`
- **Branch B Badge:** Blue tag `[📱 No Website / Social Only]`
- **Micro-Stage Indicator:** Clear stepper showing current state:  
  `Step 1: Ask` → `Step 2: Painpoint` → `Step 3: Outcome` → `Step 4: Prototype` → `Step 5: Feedback`

### 3. Dedicated "Jewellery Outreach Modal"
Adapting the current `OutreachModal` into a vertical-aware component:
- **Painpoint Quick-Selector Dropdown:** Selecting a painpoint automatically updates the preview text of Message 2 & Message 3 with zero typing needed.
- **Branch Toggle:** Instant switch between Branch A (website review scripts) and Branch B (no website scripts).
- **Interactive Copy & WhatsApp Launch:** Pre-formatted message boxes with copy buttons and direct `wa.me` links.
- **Follow-up Sub-tab:** Pre-populated with the exact follow-up scripts from the master flow ("Just dropping this back over in case my last message got buried").
- **1-Click "Won" Action:** Promotes the lead to a formal project quote via the existing `convert_lead_to_quote` SQL function.

### 4. Overdue Follow-Up Counter
A dedicated badge on the admin header:  
`⚡ 4 Jewellery Follow-Ups Due (48h+ inactive)`  
Clicking it filters down to leads waiting for Message 2 follow-up or Prototype feedback.

---

## 7. Master Message Flow Architecture (Script Matrix)

The Outreach Modal will directly encode this script matrix:

```
                  ┌───────────────────────────────┐
                  │      1. INITIAL MESSAGE       │
                  │   "Do you have a website?"    │
                  └───────────────┬───────────────┘
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
      [BRANCH A: HAS WEBSITE]             [BRANCH B: NO WEBSITE]
      "I'll have a look through"           "That's what caught my eye"
                 │                                 │
                 ▼                                 ▼
      [Message 2: Painpoint]              [Message 2: Painpoint]
      Specific commercial friction        No dedicated online hub
                 │                                 │
                 ▼                                 ▼
      [Message 3: Outcome]                [Message 3: Outcome]
      Prevent interest drop-off           Turn interest into orders
                 │                                 │
                 └────────────────┬────────────────┘
                                  ▼
                     ┌─────────────────────────┐
                     │   Message 4: Tease      │
                     │  "Put together a quick  │
                     │  prototype, send over?" │
                     └────────────┬────────────┘
                                  ▼
                     ┌─────────────────────────┐
                     │   PROTOTYPE DISPATCH    │
                     │   (Veyra Dynamic URL)   │
                     └────────────┬────────────┘
                                  ▼
                     ┌─────────────────────────┐
                     │   AFTER VIEWING CHECK   │
                     │  "What do you think? 👀 │
                     └────────────┬────────────┘
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
         [IF THEY LIKE IT]               [IF NOT INTERESTED]
    "I'd build the proper version         "No worries at all mate 👍
     around [Business Name]..."           All the best." (Clean exit)
```

---

## 8. Phased Rollout Plan (Impact vs Effort Ranking)

| Phase | Focus Area | Deliverables | Impact | Effort |
| :--- | :--- | :--- | :---: | :---: |
| **Phase 1** | **Data Layer & Core Scripting** | • Supabase columns (`has_website`, `identified_painpoint`, `prototype_url`, `reaction_notes`)<br>• Jewellery outreach scripts integrated into Admin `OutreachModal`<br>• Painpoint quick-picker selector | **P0 (Critical)** | **Low** |
| **Phase 2** | **Admin Dashboard Filtering** | • Vertical filter tabs (Trade vs Jewellery)<br>• Branch A vs Branch B visual pills<br>• Follow-up urgency counters (48h timeout indicator) | **P1 (High)** | **Low-Med** |
| **Phase 3** | **Prototype Dynamic Param Support** | • Enhance Veyra prototype / preview route to read `?brand=Name`<br>• Top banner: "Private Concept Prototype for [Business Name]" | **P1 (High)** | **Low** |
| **Phase 4** | **n8n Ingestion & Follow-Up Automation** | • Automated HTTP status test on scraped URLs<br>• Lead classification into Branch A vs B<br>• Automated 48-hour follow-up alert queue | **P2 (Medium)** | **Medium** |

---

## 9. Next Steps for Execution

When you approve moving from brainstorming to implementation:
1. **Run Migration:** Execute the non-destructive column additions to `public.leads`.
2. **Update Admin Outreach Modal:** Add the Jewellery tab, branch switching logic, and painpoint dropdown.
3. **Test with 10 Real Jewellery Prospects:** Run the manual workflow end-to-end to validate reply rates before setting up heavy n8n automation.
