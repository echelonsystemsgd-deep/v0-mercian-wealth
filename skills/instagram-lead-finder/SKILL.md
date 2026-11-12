---
name: instagram-lead-finder
description: Autonomous lead finder, forensic qualifier, Supabase tracker, and Instagram DM outreach engine for web design and development targeting London car detailing studios.
---

# Autonomous Instagram Lead Finder & Outreach Skill

**Target Niche:** London Car Detailing Studios, Ceramic Coating & PPF Installers  
**Service Sold:** Custom Website Design & Online Booking/Deposit Systems  
**Database:** Supabase PostgreSQL (`instagram_leads`)  
**Outreach Method:** Instagram Direct Messages (Warmup Cadence: D1, D4, D7)  

---

## 1. Primary Mission

To scour the internet (Google, Instagram, UK directories) for high-ticket car detailing businesses in London, qualify them for web design opportunities (no website, outdated mobile UX, or missing booking engine), log them into Supabase, and autonomously drive warm, conversational outreach and follow-ups.

---

## 2. Ideal Customer Profile (ICP) & Qualification Rubric

Before any business is logged into Supabase, it must satisfy:
1. **London Operation:** Located within Greater London boroughs or surrounding M25 detailing hubs.
2. **High-Ticket Detailing:** Visual proof on Instagram of multi-stage paint correction, ceramic coatings (Gtechniq, Kamikaze, Gyeon), or PPF wraps (XPEL, SunTek). Hand-car washes charging under £50 are disqualified.
3. **Active Page:** Instagram posts or reels published within the last 45 days.
4. **Website Opportunity Identified:**
   * **Bucket A (`no_website`):** Zero website link in bio / Linktree only. Relies 100% on manual DM quoting.
   * **Bucket B (`outdated_website`):** Website exists but is slow, desktop-heavy, or broken on mobile viewport.
   * **Bucket C (`no_booking_engine`):** Modern website exists but lacks self-service package booking or deposit checkout.
5. **Specific Car Hook:** Must identify an exact vehicle make/model from recent posts (e.g. *"the Porsche 911 GT3 in Crayon"*, *"the matte black G63 AMG"*).

---

## 3. Outreach Cadence & Warmup Pacing Rules

To protect fresh Instagram accounts from action-blocks and shadowbans, the system strictly enforces daily send caps:

| Phase | Days Active | Daily Cap (Total Messages) | Strategy |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Days 1–4 | **3 / day** | 3 new D1s on Days 1–3. On Day 4, D4 follow-ups take priority. |
| **Phase 2** | Days 5–7 | **5 / day** | Balance new D1s with due D4 follow-ups. |
| **Phase 3** | Days 8–14 | **10 / day** | Handles D1s, D4s, and D7 breakups. |
| **Phase 4** | Days 15–21 | **20 / day** | Scaling phase. |
| **Phase 5** | Days 22+ | **30 / day** | Max cruising speed. |

### Rule of Priority:
* **D4 and D7 follow-ups are ALWAYS dispatched before new D1 cold leads.**
* If `due_followups >= daily_cap`, 0 new leads are contacted that day.

---

## 4. Message Templates

### Day 1 (The Specific Compliment)
```text
Hey {{name_or_there}}, came across your page and really liked the detailing work you're doing, especially the results on {{specific_car_hook}}.

Quick question, are most of your bookings coming through Instagram, or do you use another platform as well?
```

### Day 4 (The Friction Follow-up)
```text
Hey {{name_or_there}}, had another look at your page. You've got some solid work on there. Just curious, do you handle all your enquiries through DMs, or have you got a booking system in place?
```

### Day 7 (The Low-Pressure Exit)
```text
Hey {{name_or_there}}, last message from me 😅

I help detailing businesses showcase their work professionally and make it easier for customers to book.

Thought it might be worth a chat, but no worries if it's not something you're looking at right now.
```

---

## 5. CLI Commands & Tooling

All automation scripts are in `scripts/instagram-lead-finder/`:

### A. View Campaign Status
```bash
node scripts/instagram-lead-finder/queue_manager.js status
```
Displays total leads, status counts, current warmup tier, and follow-ups due today.

### B. View Today's Allocated Batch
```bash
node scripts/instagram-lead-finder/queue_manager.js get-batch
```
Returns the exact list of targets due today based on warmup limits, prioritized by follow-ups first.

### C. Check / Save Instagram Browser Session
```bash
# Check if browser is authenticated
node scripts/instagram-lead-finder/ig_browser_sender.js check-auth

# Open interactive login window to authenticate once
node scripts/instagram-lead-finder/ig_browser_sender.js login
```

### D. Run Daily Outreach Automatically
```bash
node scripts/instagram-lead-finder/ig_browser_sender.js send-batch
```
Opens browser session, iterates through today's allocated targets, types personalized messages with randomized human keystrokes, submits DMs, and updates Supabase.

### E. Manual Status Recording (If executing outside browser runner)
```bash
# Record a sent message
node scripts/instagram-lead-finder/queue_manager.js record-sent <handle> <d1|d4|d7>

# Record a hot reply
node scripts/instagram-lead-finder/queue_manager.js record-reply <handle>

# Advance warmup day
node scripts/instagram-lead-finder/queue_manager.js set-warmup <day_number>
```
