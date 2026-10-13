---
name: website-outreach
description: Run a consent-aware website redesign outreach campaign from a lead CSV using local Gmail OAuth, SQLite send receipts, same-thread follow-ups, hourly reply monitoring, and a call-lead queue. Use when importing leads, preparing outreach, sending a batch, monitoring replies, or operating the campaign schedule.
---

# Website Outreach & Opportunity Hunter

**Primary Mission**: Find verified commercial opportunities in websites to start a natural, high-converting conversation with the business owner. The goal is never an academic bug report or an insulting critique; it is uncovering one visible, consequential friction point that invites a low-pressure discussion. Read [conversation opportunity framework](references/conversation_opportunity_framework.md) before evaluating any target.

Use `scripts/queue_manager.py` for queue state and `scripts/local_campaign.py` for deterministic Gmail sends and checks. SQLite is authoritative. Gmail OAuth is local and does not require a Codex plugin. The OAuth token stays under `%LOCALAPPDATA%/website-outreach/` and client secrets must never enter chat or Git.

## Start

1. Run `python .agents/skills/website-outreach/scripts/queue_manager.py validate-setup` and `pending-claims` from the project root. Run `python .agents/skills/website-outreach/scripts/gmail_client.py auth` once for browser consent.
2. Resolve every setup issue and pending claim before sending. Never resend a claimed step; reconcile it against Gmail first.
3. For a new campaign, inspect/import the selected CSV. `--clear` destroys current campaign state, so use it only when the user explicitly starts a replacement campaign.
4. Run `audit-candidates`. Inspect each unique domain once on desktop and mobile, then call `prepare-domain <domain> <audit-json>`; this saves the audit and renders all four messages for every lead on that domain.
5. Present recipient count, mode, daily cap, sender, timing, and sample copy before the first real send. External sending requires the user's current request to authorize it.

Read [conversation opportunity framework](references/conversation_opportunity_framework.md), [master forensic rubric](references/master_forensic_rubric.md), [inspection rules](references/inspection_rules.md), [variable schema](references/variables_schema.md), the [Universal Multi-Niche Matrix](references/multi_niche_matrix.md), the [Accounting Niche Playbook](references/accounting_niche_playbook.md), and ground-truth reviews in `EXAMPLES/` (`upstudi`, `riverside-builders`, `g-builders`, `barrie-ingram-accounts`, `ks-rathod`, `852-limited`, `rk-partners`, `brad-scott-cpa`) while auditing. Read [email architecture](references/email_architecture.md) only while reviewing or changing templates. Read [runtime](references/runtime.md) whenever sending or monitoring. Read [reply classification](references/reply_classification.md) only when an incoming message needs classification.

## Non-negotiable runtime rules

- Process sends sequentially. Never dispatch Gmail sends concurrently.
- `claim-send <lead_id> <step>` must return `claimed: true` immediately before Gmail. It also returns the exact saved recipient, subject, body, and `reply_message_id`.
- For follow-ups, pass that exact `reply_message_id` to Gmail and keep the exact saved `Re: <original_subject>` subject.
- Immediately call `record-sent` with Gmail's returned message ID, thread ID, and claim token. Do not start another send first.
- If Gmail's result is uncertain, stop. Inspect `pending-claims` and reconcile Gmail; never retry blindly.
- Wait the randomized local `send-delay` between leads.
- Respect SQLite eligibility, due times, replies, the configured daily cap, and opt-outs. A failed claim means no send.
- Check candidate Gmail threads by thread ID, not recipient address. Mark the exact lead by ID before sending one reply alert. Identical duplicate rows are one lead under the SQLite unique key.
- After FU3 with no reply, SQLite sets `sequence_completed = 1` and `call_lead = 1`. A reply clears `call_lead`.
- Finish with `verify-run`. Zero duplicate steps, unresolved claims, and thread mismatches are required.

## Low-usage operation

- Prefer compact helper output. Use `get-daily-batch` without `--full`.
- Audit each unique domain once and use `prepare-domain`; do not re-open the same website for contacts at that domain.
- Render all copy once before scheduling. Scheduled runs send saved copy and do no creative work.
- Routine production cycles can run locally with `local_campaign.py cycle` from one hourly OS task. This consumes no Codex model calls. Configure the OS task only when production scheduling is authorized; keep it disabled during a minute test.
- In test mode, add only student-controlled inboxes to `test_allowed_recipient_emails`, import exactly `test_lead_count` leads, and run `local_campaign.py run-test` once. It uses the three configured minute delays and sends one final notification. Do not create per-stage Codex automations.

Follow [runtime](references/runtime.md) exactly for Gmail and scheduling behavior.
