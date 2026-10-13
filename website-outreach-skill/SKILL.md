---
name: website-outreach
description: Run a website redesign outreach campaign from a lead CSV with site audits, Gmail, SQLite tracking, same-thread follow-ups, reply alerts, and a call-lead queue.
---

# Website Outreach

The installed project skill is [.agents/skills/website-outreach/SKILL.md](.agents/skills/website-outreach/SKILL.md). Read it completely, then follow its linked references only when that phase requires them.

Operational state lives in `data/outreach.db`. The deterministic helper at `.agents/skills/website-outreach/scripts/queue_manager.py` owns queue selection, due times, daily limits, rendered copy, atomic claims, send receipts, replies, and completion flags.

Critical invariants:

- SQLite is authoritative.
- Claim before Gmail; record Gmail's message and thread IDs immediately afterward.
- Follow-ups use the saved previous Gmail message ID and remain in the original thread.
- Never retry an uncertain send or unresolved claim blindly.
- Process sequentially with randomized pacing.
- Batch reply checks and mark replies by lead ID.
- A local hourly OS task running `local_campaign.py cycle` uses no Codex model calls. Keep it disabled for the classroom test.
- Run `verify-run` after execution; duplicates, pending claims, and thread mismatches must all be zero.

Start new-chat operation from [prompt.MD](prompt.MD).
