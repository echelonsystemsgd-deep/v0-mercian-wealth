---
name: instagram-lead-finder
description: Autonomous lead finder, forensic qualifier, Supabase tracker, and Instagram DM outreach engine for web design and development targeting London accountancy practices and tax advisory firms.
---

# Autonomous Instagram Lead Finder & Outreach Skill: Accounting Edition

**Target Niche:** London Accountancy Practices, Chartered Accountants (ICAEW/ACCA) & Tax Advisers  
**Service Sold:** Modern Web Design, Frictionless Client Intake & Discovery Scheduling Portals  
**Database:** Supabase PostgreSQL (`instagram_leads`)  
**Outreach Method:** Instagram Direct Messages (Warmup Cadence: D1, D4, D7)  

---

## 1. Primary Mission

To scour Instagram and Google for London-based accounting and tax practices, qualify them for web design and client intake improvements (unprotected forms, outdated mobile menus, slow LCP, or no automated booking), log them into Supabase, and manage structured DM outreach according to account warm-up rules.

---

## 2. Qualification Criteria for Accountants

1. **London Location:** Greater London (City, Mayfair, Farringdon, Finchley, Harrow, Woodford, etc.).
2. **Firm Structure:** Small-to-midsize practice (1–15 staff), partner-led.
3. **Instagram Presence:** Active business profile sharing tax tips, director advice, or company updates within the last 45 days.
4. **Website Opportunity Identified:**
   * Static informational brochure without interactive client intake.
   * Mobile navigation friction (heavy dropdowns, slow hero loading).
   * No automated discovery call scheduling (relies on manual email/phone callback).
5. **Specific Content Hook:** Pinpoints a recent post topic (e.g. R&D tax credits, MTD, corporate restructuring, contractor IR35).

---

## 3. Message Sequence

### Day 1 (The Specific Compliment & Discovery Question)
```text
Hey {{name_or_there}}, came across your page and really liked the advice you're sharing, especially {{specific_hook}}.

Quick question, are most of your new client enquiries coming through Instagram/word-of-mouth, or do you have an automated onboarding/booking system in place?
```

### Day 4 (The Friction Follow-up)
```text
Hey {{name_or_there}}, had another look at your page. You've got some solid client advice on there. Just curious, do you handle all your client onboarding and discovery calls manually, or have you got an automated intake system in place?
```

### Day 7 (The Low-Pressure Exit)
```text
Hey {{name_or_there}}, last message from me 😅

I help accountancy practices modernise their websites with streamlined client intake, automated discovery scheduling, and secure document portals.

Thought it might be worth a chat, but no worries if you're not looking at that right now.
```

---

## 4. Operational CLI Commands

```bash
# Check status and warmup breakdown
node scripts/instagram-lead-finder/queue_manager.js status

# Get today's allocated targets (D4/D7 follow-ups prioritized first, then D1)
node scripts/instagram-lead-finder/queue_manager.js get-batch

# Launch Puppeteer autonomous sender
node scripts/instagram-lead-finder/ig_browser_sender.js send-batch

# Record sent status manually
node scripts/instagram-lead-finder/queue_manager.js record-sent <handle> <d1|d4|d7>

# Record positive client reply
node scripts/instagram-lead-finder/queue_manager.js record-reply <handle>
```
