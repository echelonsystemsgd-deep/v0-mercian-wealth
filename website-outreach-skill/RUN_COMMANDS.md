# Operator Commands

Students normally start with one message:

`Read prompt.MD and run it.`

The local helper is:

`python .agents/skills/website-outreach/scripts/queue_manager.py`

The Gmail API transport and campaign runner are:

`python .agents/skills/website-outreach/scripts/gmail_client.py auth`

`python .agents/skills/website-outreach/scripts/local_campaign.py preflight`

`python .agents/skills/website-outreach/scripts/local_campaign.py run-test`

Production, when separately authorized: one hourly local OS task runs `local_campaign.py cycle` during the outreach-region 08:00–20:00 window. No Gmail plugin or Codex heartbeat is required.

Useful diagnostics:

- `validate-setup` — check configuration, templates, CSVs, database, and pending claims.
- `audit-candidates` — list unique websites requiring inspection.
- `prepare-domain <domain> <audit-json>` — save one domain audit and render all messages for its leads.
- `get-daily-batch` — compact due queue; add `--full` only for debugging.
- `pending-claims` — find sends that may require Gmail reconciliation.
- `verify-run` — check send totals, duplicates, claims, threading, and completion flags.
- `stats` — compact campaign totals.

Sending invariant:

`claim-send` -> Gmail send -> `record-sent` -> `send-delay`

Never send when a claim fails. Follow-ups must pass the returned `reply_message_id` to Gmail. Never retry an uncertain Gmail result; reconcile the pending claim first.
