# Email Cadence, Scheduling Math & Daily Limits

To protect domain reputation and maintain high deliverability, this system operates under strict mathematical boundaries. One single outreach inbox is used, with a **hard limit of 30 emails per day** (combined total of new pitches and follow-ups).

---

## 1. The Multi-Touch Cadence

Every lead moves through a disciplined 4-touch outreach sequence unless they reply or opt out:

| Touchpoint | Step Name | Timing from Previous Step | Purpose |
|---|---|---|---|
| **Touch 1** | **Initial Pitch** | Day 0 (First Outreach) | Introduce the #1 visual/commercial issue, recognizable reason, and micro-yes. |
| **Touch 2** | **Follow-up 1** | **+3 Days** after Pitch | Friendly check-in referencing the specific page and friction mentioned. |
| **Touch 3** | **Follow-up 2** | **+2 Days** after FU1 | Add extra context or offer a fast screenshot / walkthrough. |
| **Touch 4** | **Follow-up 3** | **+2 Days** after FU2 | Final breakup / polite closure message. |
| **Handoff** | **Call List Export** | **+3 Days** after FU3 | If zero replies after 3 days post-FU3, export to Call List and archive. |

---

## 2. The 30 Emails/Day Priority Allocation Rule

Because the daily limit is capped at **30 total emails**, the queue manager applies a strict priority waterfall each morning:

1. **Priority 1: Follow-up 3s due today** (Complete conversations first)
2. **Priority 2: Follow-up 2s due today**
3. **Priority 3: Follow-up 1s due today**
4. **Priority 4: New Pitches** (Fills whatever remaining quota is available up to 30)

### Mathematical Guarantee:
- If 30 follow-ups are due on Thursday, **30 follow-ups go out and 0 new pitches are sent**.
- If 18 follow-ups are due on Friday, **18 follow-ups go out and 12 new pitches are sent** (Total = 30).
- If 0 follow-ups are due on a buffer day, you may send 30 new pitches or let the inbox rest.
- **Under no circumstance does the daily count ever exceed 30.**

---

## 3. Real-World Weekly Schedule Breakdown

Here is how a standard campaign unfolds following this cadence:

```text
WEEK 1:
- Monday:     30 New Pitches (Batch A)                  [Total: 30]
- Tuesday:    30 New Pitches (Batch B)                  [Total: 30]
- Wednesday:  Rest Day (0 emails)                       [Total: 0]
- Thursday:   30 Follow-up 1s (Batch A, +3 days)        [Total: 30]
- Friday:     30 Follow-up 1s (Batch B, +3 days)        [Total: 30]
- Sat / Sun:  Weekend Pause

WEEK 2:
- Monday:     30 Follow-up 2s (Batch A, +2 work days)   [Total: 30]
- Tuesday:    30 Follow-up 2s (Batch B, +2 work days)   [Total: 30]
- Wednesday:  30 Follow-up 3s (Batch A, +2 work days)   [Total: 30]
- Thursday:   30 Follow-up 3s (Batch B, +2 work days)   [Total: 30]
- Friday:     30 New Pitches (Batch C)                  [Total: 30]

WEEK 3:
- Monday:     30 New Pitches (Batch D)                  [Total: 30]
  ↳ Note: Batch A completes +3 days post-FU3 -> Automatically pushed to Call List!
- Tuesday:    30 Follow-up 1s (Batch C)                 [Total: 30]
  ↳ Note: Batch B completes +3 days post-FU3 -> Automatically pushed to Call List!
- Wednesday:  30 Follow-up 1s (Batch D)                 [Total: 30]
... and so on.
```

---

## 4. The "Never Load Full Lead List" Streaming Rule

Traditional tools dump 1,000 leads into memory or active sequences at once. This burns domains and makes tracking unmanageable.

In this architecture:
- Leads reside safely inside the SQLite database `outreach.db`.
- Codex only queries the **exact 30 leads needed for the current day**.
- Active sequences stay tight and agile. Leads that do not reply after FU3 + 3 days are cleanly removed from the active loop and exported to `leads/call_list.csv`.

---

## 5. Secondary Alert Notifications

Alert emails sent to the student's **Secondary Email** (such as hot replies, holiday notices, and call list digests) **DO NOT count towards the daily 30 outreach limit**. 

These are internal status notifications between the student's outreach Gmail and their personal inbox.
