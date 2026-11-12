# Autonomous Instagram Lead Finder & Outreach System: Implementation Plan

**Author:** Antigravity Agentic Pair Programmer  
**Target Niche:** Car Detailing Studios & High-Ticket Mobile Valeting  
**Geography:** London, UK (Greater London, Surrey/Kent/Essex borders)  
**Database:** Supabase PostgreSQL (`instagram_leads`)  
**Automation Engine:** Puppeteer Core + Node.js Autonomous Runner  
**Status:** In Progress / Ready for Execution  

---

## 1. Executive Summary & ICP Definition

This document outlines the end-to-end architecture for an autonomous lead generation, forensic qualification, database tracking, and DM outreach system tailored to car detailing businesses in London, UK.

### Ideal Customer Profile (ICP)
* **Core Offer:** Custom website design and development, conversion-focused mobile experience, and automated booking/deposit systems.
* **Target Business Type:** 
  * Premium Car Detailing Studios (Ceramic Coating, Paint Correction, PPF - Paint Protection Film).
  * High-End Mobile Detailers (Self-contained vans, minimum service ticket £150+).
  * *Disqualified:* £15–£25 roadside hand car washes, high-volume franchise drive-throughs (Waves, IMO), and car dealerships.
* **Location:** London, UK (Boroughs across North, South, East, West, and Central London, plus outer M25 detailing hubs).
* **Team Size:** 1–10 employees (Founder/Operator led).
* **Target Contact:** Owner, Founder, Head Detailer.
* **Core Problems Solved:**
  1. **No Website (Instagram-only):** Entire customer journey relies on DM exchanges, manual quoting, and back-and-forth scheduling. High drop-off rate when owners are working under lights.
  2. **Outdated / Non-Responsive Website:** Built years ago, fails on mobile viewport, slow image loading for 4K portfolio shots.
  3. **No Online Booking / Deposit System:** No way for clients to pick a package (e.g. 5-Year Ceramic Coat) and pay a deposit to secure a workshop slot.

---

## 2. ICP Contradictions & Architectural Fixes

| Identified Gap / Contradiction | Impact | System Solution |
| :--- | :--- | :--- |
| **"No Website" vs. "Outdated Website"** | Cannot audit mobile performance on a non-existent site; templates would break if asking about an existing site. | **Segmented Lead Buckets:**<br>• `lead_category = 'no_website'`: Pitch revolves around stopping lost revenue from DM bottlenecks.<br>• `lead_category = 'outdated_website'`: Forensic audit pinpoints specific friction (e.g. mobile form failure, slow LCP). |
| **"Targeting Owners" vs. "Brand Handles"** | Most London detailers use brand handles (`@precision_detailing_london`). Bio rarely gives a formal first name. | **Smart Name Fallback:** If personal name isn't verified in bio or Companies House, template uses `"Hey there"` or `"Hey team"` instead of awkward `Hey [Name]`. |
| **Instagram DM Bot Defenses** | Meta actively detects fresh accounts firing headless DMs without warmup or session cookies. | **Browser Session Management:** Persistent user data directory, randomized human delays (15–45s), warm-up rate limits, and fallback checkpoint alerts. |

---

## 3. Forensic Qualification Rubric

Every candidate found during web/Instagram scouring must pass the 5-point forensic qualification filter before being inserted into the outreach queue:

1. **Active Operations:** Posted on Instagram within the last 45 days.
2. **High-Ticket Evidence:** Visual evidence of ceramic coatings, machine polishing, paint correction, or PPF (not basic exterior washes).
3. **London Geographic Match:** Bio, Google listing, or phone area code (+44 20 / London mobile) confirms Greater London operation.
4. **Website Friction Identified:**
   * No website URL in bio / Linktree only.
   * Website exists but has no interactive booking/quote request flow.
   * Website fails mobile ergonomics (tiny tap targets, uncompressed 20MB gallery images).
5. **Specific Car Hook Identified:** Must identify at least one distinct vehicle make/model from their recent feed (e.g., *"that Porsche 992 GT3 in Crayon"*, *"the matte black G63 AMG"*, *"the midnight purple R34"*).

---

## 4. Supabase Database Architecture

The system operates on a dedicated table in Supabase: `instagram_leads`.

```sql
CREATE TABLE IF NOT EXISTS instagram_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    instagram_handle TEXT UNIQUE NOT NULL,
    instagram_url TEXT NOT NULL,
    website_url TEXT,
    has_website BOOLEAN DEFAULT FALSE,
    phone TEXT,
    email TEXT,
    location TEXT DEFAULT 'London, UK',
    lead_category TEXT CHECK (lead_category IN ('no_website', 'outdated_website', 'no_booking_engine')),
    qualification_reason TEXT NOT NULL,
    specific_car_hook TEXT NOT NULL,
    owner_name TEXT,
    
    -- Outreach state machine
    status TEXT DEFAULT 'qualified' CHECK (status IN ('scraped', 'qualified', 'queued_d1', 'sent_d1', 'queued_d4', 'sent_d4', 'queued_d7', 'sent_d7', 'replied', 'closed', 'rejected')),
    warmup_day INT DEFAULT 1,
    
    -- Rendered copy
    message_d1 TEXT,
    message_d4 TEXT,
    message_d7 TEXT,
    
    -- Timestamps & Scheduling
    d1_sent_at TIMESTAMPTZ,
    d4_sent_at TIMESTAMPTZ,
    d7_sent_at TIMESTAMPTZ,
    next_action_due TIMESTAMPTZ DEFAULT NOW(),
    last_reply_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ig_leads_status ON instagram_leads (status);
CREATE INDEX IF NOT EXISTS idx_ig_leads_next_action ON instagram_leads (next_action_due);
CREATE INDEX IF NOT EXISTS idx_ig_leads_handle ON instagram_leads (instagram_handle);
```

---

## 5. Warm-up Pacing & Mathematical Scheduling

Outbound limits must strictly respect the Instagram warming schedule. The daily quota is a **hard ceiling** shared across Day 1 (new cold leads), Day 4 (first follow-up), and Day 7 (final exit).

| Phase | Days Active | Daily Max Total Sends | Strategy |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Days 1–4 | **3 sends / day** | 3 D1s on Days 1–3. On Day 4, D4 follow-ups start taking priority over new D1s. |
| **Phase 2** | Days 5–7 | **5 sends / day** | Balance new D1s with due D4 follow-ups. |
| **Phase 3** | Days 8–14 | **10 sends / day** | Account is trusted; handle D1s, D4s, and D7 breakups seamlessly. |
| **Phase 4** | Days 15–21 | **20 sends / day** | Scaling phase. |
| **Phase 5** | Days 22+ | **30 sends / day** | Full cruising speed (e.g. 15 new leads + 10 D4s + 5 D7s). |

### Pacing Priority Rules:
1. **D4 and D7 follow-ups are ALWAYS dispatched first** before initiating new cold D1s.
2. If `due_followups >= daily_limit`, no new D1s are sent that day.
3. Every browser action includes a randomized 20–45 second pause between profile views and message submissions.

---

## 6. Message Interpolation & Template Engine

### D1: The Specific Compliment & Discovery Question
```text
Hey {{name_or_there}}, came across your page and really liked the detailing work you're doing, especially the results on {{specific_car_hook}}.

Quick question, are most of your bookings coming through Instagram, or do you use another platform as well?
```

### D4: The Workflow & Friction Follow-up
```text
Hey {{name_or_there}}, had another look at your page. You've got some solid work on there. Just curious, do you handle all your enquiries through DMs, or have you got a booking system in place?
```

### D7: The Low-Pressure Value Offer (Breakup)
```text
Hey {{name_or_there}}, last message from me 😅

I help detailing businesses showcase their work professionally and make it easier for customers to book.

Thought it might be worth a chat, but no worries if it's not something you're looking at right now.
```

---

## 7. Autonomous Execution Engine

The automation suite is housed in `scripts/instagram-lead-finder/`:
* `setup_db.js`: Provisions the Supabase schema and indexes.
* `discover_leads.js`: Autonomous search engine finding real London detailing companies.
* `audit_and_qualify.js`: Audits web footprint, detects friction, verifies active projects, and renders copy.
* `queue_manager.js`: Implements warmup calculation, eligibility checks, and schedule progression.
* `ig_browser_sender.js`: Puppeteer script executing DM transmission via authenticated session.
* `.agents/skills/instagram-lead-finder/SKILL.md`: Standardized agent interface.

---

## 8. Verification & Safety Safeguards
* **Opt-Out & Unsubscribe:** Any response containing negative sentiment or "stop" marks the lead as `closed` and halts sequence immediately.
* **Reply Detection:** Any positive response updates status to `replied` and triggers notification for manual closing.
* **Checkpoint Detection:** If Instagram prompts for 2FA or device approval, the sender pauses and notifies the user instead of triggering multiple rapid retries.
