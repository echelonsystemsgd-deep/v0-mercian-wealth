# The Conversation Starter Framework: Turning Flaws Into Opportunities

The sole objective of auditing a website in this skill is **NOT** to deliver an academic bug report, write a 50-page technical audit, or criticize the business owner.

The sole objective is:
> **To identify one compelling, visually verifiable commercial opportunity that serves as a natural, low-friction conversation starter with the business owner.**

---

## 1. The 3 Golden Filters for a Conversation-Worthy Opportunity

Before selecting any issue to bring to a business owner, it must pass all 3 filters:

1. **The Instant Recognition Filter**:
   - Can the owner verify this in 5 seconds on their own phone without opening developer tools?
   - *Pass*: *"The phone number in the header is plain text, so tapping it doesn't open the dialer."*
   - *Fail*: *"Your TTFB is 840ms and you have render-blocking CSS."*
2. **The Commercial Consequence Filter**:
   - Is it immediately obvious how this friction costs them money, lost jobs, or frustrated clients?
   - *Pass*: *"Business owners looking for urgent tax advice can't tap to call, so they bounce to whoever they can reach immediately."*
   - *Fail*: *"Your favicon is low resolution."*
3. **The Low-Friction Helpfulness Filter**:
   - Does this feel like an observant peer pointing out a helpful fix, or an aggressive salesperson shaming their business?
   - *Pass*: *"Spotted a quick friction point on your mobile header—put together a 2-minute look at how to get those callers dialing straight through. Want me to send the link?"*
   - *Fail*: *"Your website is outdated and losing you thousands. Let's hop on a 30-minute call to discuss a full redesign."*

---

## 2. The Opportunity Bridge: Flaw $\rightarrow$ Commercial Impact $\rightarrow$ Micro-Yes

Every conversation starter is structured using this 3-part bridge:

```
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│ 1. VISIBLE FRICTION    │ ───► │ 2. COMMERCIAL CHAIN    │ ───► │ 3. MICRO-YES ASK       │
│ What you saw on mobile │      │ What typical buyers do │      │ Low-pressure question  │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

### Real Industry Translations:

#### Example A: Chartered Accountant (e.g. Pro Tax Accountant / RK Partners)
- **Visible Friction**: Navigation bar displays 25+ all-caps tax services and has broken template demo links.
- **Commercial Chain**: High-intent corporate directors searching on phones hit decision paralysis before finding how to get advice.
- **Conversation Opener**:
  > *"Hi [Name], was looking at your practice site on my phone earlier and noticed the top menu has over 20 separate tax links in the header. For busy directors needing corporate tax support, that wall of links usually causes them to bounce before reaching an inquiry form. I put together a quick look at how to streamline those services into 3 clean tiers to capture direct bookings. Want me to show you?"*

#### Example B: General Contractor / Builder (e.g. G Builders / Riverside)
- **Visible Friction**: A collection of uncurated build photos with no project scopes and unclickable tap targets.
- **Commercial Chain**: Homeowners with £50k+ budgets can't tell if the firm handles their project scale, so they jump back to Google.
- **Conversation Opener**:
  > *"Hi [Name], came across your recent build projects earlier—craftsmanship looks excellent. Noticed on mobile that the project gallery doesn't list the build scope or rough pricing tiers, and the quote button is quite small to tap on a phone. Homeowners planning major renovations usually move to whoever gives them instant project clarity upfront. Mind if I share a 2-minute overview showing a cleaner way to showcase those builds to win higher-tier quotes?"*

---

## 3. Strict Rules of Tone & Respect

1. **Praise Real Strengths First**: If their branding, photography, or reputation is strong, acknowledge it. Credibility starts with honesty.
2. **Never Shame the Owner**: Banned words: *"terrible"*, *"ugly"*, *"outdated"*, *"poorly designed"*, *"amateur"*. Describe the visible mechanical friction, never personal taste.
3. **Outcome Over Mechanism Always**: Never lead with *"We build AI chatbots / Next.js websites / automation workflows"*. Lead with *"We help you stop losing inquiries to whoever replies first."*
4. **Binary Micro-Yes**: The call to action must always invite a simple 1-line answer (*"Want me to show you?"*, *"Mind if I send the link?"*), never demanding a calendar commitment on cold outreach.
