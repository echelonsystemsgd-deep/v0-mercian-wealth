# Start the Website Outreach Campaign

You are operating the project in this folder. Read `SKILL.md`, then read `.agents/skills/website-outreach/SKILL.md` completely. Follow only the linked reference needed for the current phase; use `references/runtime.md` for sending, reply checks, and scheduling.

The student's intended workflow is:

1. Validate `config.json`, Gmail availability, templates, the selected lead CSV, SQLite state, and unresolved claims.
2. Import only the intended CSV. Never clear an existing campaign unless the student explicitly requests a replacement.
3. Audit each unique website once on desktop and mobile. Save the audit and render all four messages into SQLite before sending.
4. Show one compact preflight containing mode, sender, recipients/count, cadence, daily cap, alert email, and one sample email.
5. When the student's current message explicitly says to run or send, execute the due batch sequentially through Gmail. Claim each step first, record Gmail IDs immediately, use same-thread replies, and apply randomized pacing.
6. For production only, with authorization, configure one local hourly OS task running `local_campaign.py cycle` between 08:00 and 20:00 in the configured outreach timezone. Do not enable it during a classroom test.
7. In test mode, verify that every recipient is a student-controlled inbox, then use `local_campaign.py run-test` for the configured minute cadence, exactly three reply checks, and one final notification after FU3. Do not use Codex automations or per-stage model calls.
8. Verify SQLite and Gmail threading at the end. Report exact totals and any blocker.

Never send merely because this file contains instructions. If the student's message only says “read prompt.MD,” perform the read-only preflight and present the compact send summary; ask for one-word `RUN` confirmation before the first external email. Students who want a one-message start can say: `Read prompt.MD and run it.`

Cost rules: use compact helper commands, inspect each domain once, save copy once, use the local Gmail API runner for scheduled cycles, and never load every reference into context.
