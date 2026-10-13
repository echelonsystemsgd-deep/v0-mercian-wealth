# Student Quick Start

This package intentionally contains no leads, campaign database, Google OAuth client, or Gmail token. Each student must use their own controlled data and Google Cloud credentials.

## Set up once

1. Install dependencies with `python -m pip install -r requirements.txt`. Enable Gmail API in Google Cloud, create a Desktop-app OAuth client, and put its downloaded `client_secret_*.json` in this folder. Run `python .agents/skills/website-outreach/scripts/gmail_client.py auth` and complete browser consent. Keep both the secret file and local token private.
2. Open `config.json` and replace every placeholder with your name, agency, alert email, timezone, daily cap, and mode. For a test, also add only inboxes you control to `test_allowed_recipient_emails`.
3. Put one intended lead CSV in `leads/` and put your four approved messages in `templates/email_templates.json`.
4. Open this folder as the Codex project.

## Start

Send Codex one message:

`Read prompt.MD and run it.`

Codex will validate the folder, prepare unique website audits, show a compact preflight, and send only when your message authorizes sending. Production scheduling is an optional separate step. If you say only `Read prompt.MD`, Codex performs the safe preflight and asks you to reply `RUN` before sending.

## Modes

- Production: set `test_mode` to `false`. Follow-ups use the production 3/2/2-day cadence.
- Classroom test: set `test_mode` to `true`, set `test_lead_count`, list only inboxes you control in `test_allowed_recipient_emails`, and choose three positive minute delays such as `[5,3,3]`. Run the local test once; it makes three reply checks and sends one final notification after FU3.

## Keeping usage low

- The helper handles queueing, timing, copy rendering, locks, and reports locally without model reasoning.
- Codex inspects each unique website only once, even when several contacts share it.
- Emails are rendered once and reused from SQLite.
- The local runner checks Gmail threads without invoking Codex.
- One hourly Windows Task Scheduler job can handle production replies and due sends; there is no task per lead.
- Routine cycles need no model or Gmail plugin. Codex remains useful for audits and troubleshooting.

The scheduled process is local: the computer must be on. Gmail API quotas and the account's sending limits still apply. Codex limits matter only when you ask Codex to do work.

## Safety

- Never use classroom minute timing with real prospects.
- Keep the CSV permission-based and comply with applicable marketing, privacy, and opt-out rules.
- SQLite prevents duplicate lead/step claims, but uncertain Gmail sends must be reconciled rather than retried.
- `--clear` replaces campaign state. Codex must not use it unless you explicitly request a new replacement campaign.
