# Runtime

Run from the project root. The local Python runner calls `queue_manager.py` for eligibility, atomic claims, exact rendered copy, receipts, and reply state. Do not send from a second path in parallel.

## Setup and preparation

1. Install `google-auth`, `google-auth-oauthlib`, and `requests` if missing. Create a Google OAuth **Desktop app** client, enable Gmail API, and place its downloaded `client_secret_*.json` in the project root. Never expose its contents or the resulting token. If the OAuth app is in Testing, add the Gmail account as a test user.
2. Run `python .agents/skills/website-outreach/scripts/gmail_client.py auth`. A browser consent step creates a token under `%LOCALAPPDATA%/website-outreach/`. Run `.../gmail_client.py profile` to confirm the sender.
3. Set real names and alert address in `config.json`. Select/import one CSV explicitly. `queue_manager.py import-csv <file>` deduplicates identical `(email, website_domain, first_name, last_name)` rows. Do not use `--clear` unless explicitly replacing the campaign.
4. Run `queue_manager.py audit-candidates`, inspect each unique site once, and use `prepare-domain` to save the audit and render all four messages. Check sample copy and recipient scope before the first external send.
5. Run `local_campaign.py preflight`. Stop on unresolved claims. Reconcile uncertain Gmail results manually against the exact thread before doing anything else.

## Commands

`python .agents/skills/website-outreach/scripts/local_campaign.py reply-check` checks replies and alerts only when the local 08:00–20:00 window allows it.

`python .agents/skills/website-outreach/scripts/local_campaign.py send-due` sends the currently due batch, sequentially. It claims before each Gmail call, uses the previous RFC Message-ID and Gmail thread ID for follow-ups, records the receipt immediately, and waits randomized seconds between leads. Stop on uncertain results; never retry a claimed step blindly.

`python .agents/skills/website-outreach/scripts/local_campaign.py cycle` combines one reply check then due sends. For production, configure a single Windows Task Scheduler task to invoke it hourly; the script gates both checks and sends to 08:00–20:00 in `sending_timezone` (weekends skipped if configured), even if the computer's timezone differs. The computer must be on. Do not enable this production task for a test without authorization. A local scheduled process has no Codex model usage, but Gmail API quotas still apply.

`python .agents/skills/website-outreach/scripts/local_campaign.py run-test` requires `test_mode=true`, exactly `test_lead_count` imported leads, every recipient listed in `test_allowed_recipient_emails`, and three positive values in `follow_up_delays_minutes`. It sends a pitch, performs one reply check after each of the first three sends, follows the configured minute delays, sends FU3, and then sends one end-of-sequence notification to `secondary_alert_email`. It emits a verification report. Do not run it twice on a completed campaign. The final notification has its own SQLite receipt to prevent duplicates.

Finish with `queue_manager.py verify-run`: `duplicate_steps`, `unresolved_claims`, and `thread_mismatches` must be zero. Real replies stop further follow-ups and trigger an alert as normal.
