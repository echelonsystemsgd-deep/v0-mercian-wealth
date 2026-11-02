# Mercian Wealth — Practice Infrastructure & Client Acquisition Engineering

**High-converting practice hubs, 60-second inbound client triage, two-way diary sync, and speed-to-lead partner routing for UK accountancy firms and commercial tax practices across Berkshire, the Thames Valley, London & the UK.**

---

## 🏛️ Brand System & Canonical Palette

Built with an institutional, high-trust technology aesthetic (Charcoal + Solid Tech Gold):

* **Canvas Charcoal / Near-Black**: `#09090B` — *Primary background canvas*
* **Surface Charcoal**: `#111115` — *Card surfaces, modals, and container backgrounds*
* **Elevated Charcoal**: `#18181F` — *Input fields, dropdowns, and interactive states*
* **Tech Accent Gold**: `#DCAE53` / `#DAA640` — *Primary CTA buttons, badges, highlights & active states*
* **Border Line**: `border-slate-800` / `border-[#DCAE53]/30` — *Crisp hairline separation*
* **Brand Logos**: Geometric Bowtie/Hourglass MW mark (`/public/logo1.png` & `/public/logo2.png`)
* **Typography**: Geometric sans-serif (`Inter`, `Geist`) and monospace (`Geist Mono`). Zero serif fonts.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
* **Database & Auth**: [Supabase](https://supabase.com/) PostgreSQL with Row Level Security (RLS) & Server-Side Session Auth
* **Payments & Billing**: Stripe UK Checkout, Apple Pay, Google Pay & automated direct debit retainer infrastructure
* **Notification Infrastructure**: WhatsApp Business Direct Routing, Cloud Webhooks, Resend Transactional Email Engine
* **Account Provisioning Model**: Admin-provisioned client portal access
* **Compliance & Data Privacy**: UK GDPR & Data Protection Act 2018 Compliant, strict UK data residency
* **Performance Standard**: Sub-400ms load speeds, 100/100 Core Web Vitals, mobile viewport optimization (390px+)

---

## 🚀 Core Systems & Deliverables

1. **Sub-Second Mobile Practice Hubs**: Built for business owners arriving on mobile with immediate tax or advisory requirements.
2. **60-Second Inbound Client Triage**: Eliminates lengthy open text boxes in favor of structured qualification (company type, turnover, accounting software).
3. **Two-Way Calendar Synchronization**: Live diary booking integration with Calendly, Google Calendar, and Outlook to eliminate consultation scheduling drag.
4. **Instant WhatsApp Partner Alerts**: High-fee corporate lead alerts dispatched straight to practice partners in under 5 seconds.
5. **MTD, ICAEW & ACCA Trust Positioning**: Prominent compliance alignment and partner directory indexing.
6. **Managed Cloud Infrastructure & Retainers**: Automated UK cloud hosting, daily database backups, automated SSL renewals, and schema tuning with zero agency lock-in.

---

## 💰 3-Tier Commercial Ladder & Pricing Architecture

`/pricing` displays exactly **3 transparent practice tiers** plus an enterprise bespoke option (with zero confusing tab switchers):

| Tier | Setup Price | Monthly Managed Care | Turnaround Delivery | Core Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Practice Core** *(Base entry)* | **£595** *(or £495 promo rate)* | **£29/mo** | **48 Hours** | Sub-second mobile-first practice hub, partner call/email routing, MTD/ICAEW trust badges, 100% IP & DNS ownership. |
| **Practice Growth OS** *(Sales Prof Tier)* | **£1,495** | **£49/mo** | **7–10 Days** | 60-second inbound enquiry triage, Calendly/Google/Outlook booking sync, instant WhatsApp partner dispatches, CRM lead routing. |
| **Institutional Practice Engine** | **£4,995 – £7,495** | **£99/mo** | **Staged Sprints** | Bespoke multi-office infrastructure (WealthWise tier), custom tax/dividend estimators, client portal & practice management routing. |
| **Bespoke Practice Architecture** | **Custom Scope** | Custom SLA | **Scoped Sprints** | Enterprise multi-office firms, franchise networks, or custom Karbon/Iris/AccountancyManager integrations. |

> **Self-Hosting Policy**: Clients retain 100% IP ownership. Practices opting out of monthly managed care (£29–£49/mo) receive full codebase and DNS transfer steps. However, self-hosting requires independent server provisioning, manual SSL renewals, and database backups, which introduces significant ongoing technical friction.

---

## 🗺️ Page & Route Architecture

```
app/
├── (admin)/                    # Admin CRM, lead analytics, client management & portal oversight
├── (auth)/
│   ├── login/                  # Dual-portal authentication (Client Portal & Staff/Admin)
│   ├── signup/                 # Protected route (redirects to /login; client accounts provisioned by admin)
│   └── forgot-password/        # Password recovery flow
├── (client)/                   # Client practice war room & live telemetry dashboard
├── page.tsx                    # Landing Page (Offer Mechanism, 4-Step Visualizer, Proof, 3-Tier Pricing)
├── practices/page.tsx          # Dedicated UK Accountancy Practice Solutions Gateway
├── services/page.tsx           # Practice solutions breakdown (Triage, Workflows, Portals & Managed Care)
├── process/page.tsx            # 4-Step Zero-Downtime Deployment Protocol
├── portfolio/page.tsx          # Live verified practice architectures (WealthWise, Raw Accounting, Goringe)
├── pricing/page.tsx            # Transparent 3-tier pricing ladder + Bespoke Architecture + Self-Hosting FAQ
├── contact/page.tsx            # UK direct phone, WhatsApp alerts & practice enquiry form
├── book/page.tsx               # 15-Minute Practice Diagnostic & Systems Alignment booking
├── testimonials/page.tsx       # Verified UK accountancy practice outcomes & partner reviews
├── terms/page.tsx              # Standard commercial terms & Section 5 managed hosting terms
├── privacy/page.tsx            # UK GDPR-compliant privacy policy
├── sitemap.ts                  # Dynamic search engine XML sitemap
├── robots.ts                   # Search crawler directives
├── manifest.ts                 # PWA Web App manifest
└── opengraph-image.tsx         # Dynamic 1200x630 social share card generator
```

---

## ⚡ Verification & Diagnostics

```bash
# 1. Typecheck verification
npx tsc --noEmit

# 2. Build for production (Next.js Turbopack)
npm run build
```

---

## 📄 License & Ownership
Mercian Wealth © 2026. All Rights Reserved. Engineered in Berkshire, United Kingdom.
