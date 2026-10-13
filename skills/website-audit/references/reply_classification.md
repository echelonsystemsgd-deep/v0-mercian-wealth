# Reply Handling & The "Yes Flow" Protocol

When a prospect replies to an outreach thread, speed, restraint, and containment are paramount. A positive reply is a fleeting window—operators are busy, and momentum decays rapidly.

## SQLite reply tracking

Attach every Gmail reply to one exact lead using the Gmail reply message ID. Set `replied = 1`, save `reply_message_id` and `replied_at`, clear `next_action_due`, and set status to `REPLIED` before sending an internal alert. Send at most one alert, then store its Gmail message ID in `reply_notification_message_id` and set `reply_notification_sent = 1`.

The production monitor runs hourly but acts only between 08:00 and 20:00 in the `sending_timezone` configured in `config.json`. Never identify a lead by email address alone when test leads share an inbox; use the Gmail conversation and stored send message IDs.

---

## 1. Classification & Immediate State Actions

| Category | Typical Indicators | State Action | Next Action |
|---|---|---|---|
| **Positive Reply ("Yes Flow")** | "Sure", "Send it over", "Yes please", "Would love to see it", "What do you mean?" | `REPLIED` | **Trigger Yes Flow**: Stop follow-ups immediately, alert student, prepare clean asset delivery. |
| **Out of Office (OOO) / Holiday** | "Away from the office until...", "On annual leave", "Automatic reply" | `OOO` | **Pause Schedule**: Record return date, alert student on secondary email. |
| **Bounced / Invalid Email** | "Delivery Status Notification (Failure)", "550 5.1.1", "Mailbox unavailable" | `BOUNCED` | **Permanent Halt**: Purge lead to protect domain reputation. |
| **Opt-Out / Not Interested** | "Unsubscribe", "Please remove", "Not interested", "Stop emailing" | `OPTOUT` | **Permanent Blacklist**: Never email this address again. |
| **Unresponsive (Post-FU4)** | No reply 3 days after Follow Up #4 (The Binary Ask). | `CALL_LIST` | **Handoff to Calls**: Export to `leads/call_list.csv` with phone number and website problem. |

---

## 2. The "Yes Flow" Operating Sequence

The moment a prospect responds with permission or interest (*"Sure, send it over"*, *"Yes please"*):

> [!CAUTION]
> **What Destroys the Yes Flow:**
> 1. Pivoting immediately to a meeting/call request (spikes commitment fear).
> 2. Sending attachments or login-walled links (spikes click/security fear).
> 3. Over-explaining or writing a long sales pitch.
> 4. Asking multiple discovery questions (feels like an interrogation).

### The 6-Step Yes Flow Protocol:

#### Step 1: Confirm & Deliver Cleanly
Respond while the thread is warm. Deliver the evaluation artifact (Figma preview, Loom, or screenshot link) cleanly.
- View-only link on a clean, trusted domain.
- **NO attachments** (triggers spam filters and security fear).
- **NO login walls or forms**.

#### Step 2: Lower Click Fear in One Sentence
Frame the asset as lightweight and self-contained:
> *"It's a quick view-only preview, takes under two minutes, and focuses strictly on that mobile menu navigation."*

#### Step 3: Direct Their Attention (One Instruction Only)
Give them a single clear observation point so they don't open and close blindly:
> *"Take a look at how section 2 groups the dishes without requiring heavy vertical scrolling on mobile."*

#### Step 4: Ask ONLY ONE Qualifying Question
Ask one easy, natural question that confirms operational reality without feeling like a sales script:
> *"Is that mobile friction something your team has noticed diners running into, or is the current flow working well enough?"*

#### Step 5: Bridge to a Call ONLY When Earned
Do NOT ask for a call until:
1. They viewed the asset, OR
2. They confirmed the friction is a live issue they want to solve.
When bridging to a call, frame it as a **contained scope and feasibility check** (10–15 min), not a sales pitch.

#### Step 6: Set Boundaries That Protect Trust
Assure them that if they review the preview and decide it's not a priority, that's completely fine. Reversible decisions feel safe; safe decisions get replies.

---

## 3. Template: The "Yes Flow" Delivery Response

**Subject:** `Re: [Thread Subject]`

```text
Hi {{first_name}},

Here is the quick layout preview:
{{asset_link}}

It's completely view-only, takes under two minutes to look through, and focuses strictly on streamlining that {{page}} flow on mobile.

When you open it, notice how the dishes can be skimmed without having to scroll back and forth between sections.

Curious—is mobile navigation something your team has actively looked at updating recently, or is the current layout doing the job fine?

Best,
{{sender_name}}
```

---

## 4. Secondary Alert Notification (To Student's Personal Email)

When Codex detects a positive reply during its hourly check, it immediately dispatches this notice:

```text
Subject: 🔥 HOT LEAD REPLIED: {{first_name}} from {{company}}

Hey {{student_name}},

{{first_name}} {{last_name}} from {{company}} just replied "YES" to your campaign!

Email: {{email}}
Company: {{company}}
Website: {{website_domain}}
Identified Problem: {{website_problem}}

Prospect's Reply:
"{{reply_snippet}}"

ACTION REQUIRED: 
Run the Yes Flow! Deliver the view-only preview link, lower click fear, give one viewing instruction, and ask the single qualifying question while they are warm.
```
