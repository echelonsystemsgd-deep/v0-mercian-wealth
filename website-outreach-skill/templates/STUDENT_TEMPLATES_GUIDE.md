# How to Write Your Own Email Templates for Codex

Welcome! As part of your coursework, you will write your own 4-touch outreach sequence following the curriculum lessons.

Once you have written your copy, you can either:
1. **Paste your copy directly into Codex chat** and ask: *"Review my email templates and run outreach with them."*
2. **Save your copy in `templates/email_templates.json`** using the placeholders below.

---

## Allowed Variable Placeholders

Whenever you write your email blocks, insert these placeholders where you want Codex to dynamically plug in each prospect's verified data:

- `{{first_name}}` $\rightarrow$ Prospect's first name (fallback: "there")
- `{{last_name}}` $\rightarrow$ Prospect's last name
- `{{company}}` $\rightarrow$ Company name
- `{{position}}` $\rightarrow$ Prospect's job title/role
- `{{website_domain}}` $\rightarrow$ Clean website domain
- `{{page}}` $\rightarrow$ Page audited (e.g. Menu, Services, Pricing)
- `{{website_problem}}` $\rightarrow$ #1 verified visual flaw (8–18 words)
- `{{recognizable_reason}}` $\rightarrow$ Why the visitor hesitates (10–25 words)
- `{{consequence_mechanics}}` $\rightarrow$ Direct cause-and-effect on lost revenue/bookings
- `{{micro_yes}}` $\rightarrow$ Your low-pressure, binary call-to-action (≤ 10 words)
- `{{subject_label}}` $\rightarrow$ Positioning phrase (e.g. "a destination restaurant")
- `{{sender_name}}` $\rightarrow$ Your name from `config.json`

---

## Quality Checklist Before Giving Templates to Codex

Codex will automatically validate your templates against the curriculum:
1. **Outreach #1**:
   - Relevance comes before identity (no starting with "I am an agency owner...").
   - One lane and one friction only.
   - Consequence is described as mechanics, NOT metrics (no fake analytics).
   - Micro-yes is low-cost and repeatable.
2. **Follow Up #2**:
   - Shorter than Outreach #1.
   - Zero guilt language (NO "checking in", NO "just bumping", NO "circling back").
   - Restates reason as operator pattern. Repeats identical micro-yes.
3. **Follow Up #3**:
   - Scope is compressed to the smallest unit.
   - Includes a calm boundary (stops after this).
4. **Follow Up #4**:
   - The Binary Ask. Extremely short.
   - One binary yes/no question only.
