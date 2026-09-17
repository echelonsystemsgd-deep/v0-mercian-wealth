# Mercian Wealth — AI Automation & Operations Infrastructure for UK Businesses
**Autonomous enquiry capture, 24/7 conversational triage, instant WhatsApp smartphone dispatch, and CRM workflow automation for premier local businesses and service operators across Berkshire, the West Midlands & the UK.**

---

## 🏛️ Brand System & Canonical Palette

Built with a high-performance tech automation aesthetic (Charcoal + Solid Gold):

* **Canvas Charcoal / Near-Black**: `#09090B` — *Primary background canvas*
* **Surface Charcoal**: `#111115` — *Card surfaces, modals, and container backgrounds*
* **Elevated Charcoal**: `#18181F` — *Input fields, dropdowns, and interactive states*
* **Tech Accent Gold**: `#DCAE53` — *Primary CTA buttons, badges, highlights & active states*
* **Border Line**: `border-slate-800` / `border-[#DCAE53]/30` — *Crisp hairline separation*
* **Brand Logos**: Geometric Bowtie/Hourglass MW mark (`/public/logo1.png` & `/public/logo2.png`)
* **Typography**: Geometric sans-serif (`Inter`, `Geist`) and monospace (`Geist Mono`). Zero serif fonts.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
* **Database & Auth**: [Supabase](https://supabase.com/) PostgreSQL with Row Level Security (RLS) & Server-Side Session Auth
* **Payments & Billing**: Stripe UK Checkout, Apple Pay, Google Pay & automated deposit collection
* **Notification Infrastructure**: WhatsApp Business Direct Links & Cloud API, Webhooks, Resend Transactional Email Engine
* **Account Provisioning Model**: Admin-provisioned client access (public `/signup` is disabled and routed to `/login`)
* **UK Compliance & Security**: UK & EU GDPR Compliant, strict data residency
* **Performance Standard**: Sub-second load speeds, 100/100 Core Web Vitals, fluid responsive typography

---

## 🚀 Core Systems & Deliverables

1. **4-Step Autonomous Revenue Visualizer**: Interactive telemetry model demonstrating instant lead capture, qualification, live calendar booking, and 2-second smartphone dispatch.
2. **24/7 Conversational AI Chatbots**: Smart web and WhatsApp triage that qualifies project scope, answers FAQs, and prevents leads going cold out-of-hours.
3. **Instant WhatsApp Smartphone Alerts**: Enquiry and booking notifications delivered straight to the operator's phone in under 2 seconds without manual data entry.
4. **Autonomous Calendar Booking & Deposit Capture**: Two-way Google & Outlook sync with frictionless upfront deposit collection via Stripe.
5. **Automated 5-Star Google Review Engine**: Post-service automated review extraction systematically compounding local Google ranking.
6. **Managed AI Operations Retainer**: Compute monitoring, webhook health checks, prompt refinements, and dedicated SLA support.

---

## 🗺️ Page & Route Architecture

```
app/
├── (admin)/                    # Admin CRM, lead analytics, client management & portal oversight
├── (auth)/
│   ├── login/                  # Dual-portal authentication (Client Portal & Staff/Admin)
│   ├── signup/                 # Protected route (redirects to /login; client accounts provisioned by admin)
│   └── forgot-password/        # Password recovery flow
├── (client)/                   # Client project war room & live telemetry dashboard
├── page.tsx                    # Landing Page (Offer Mechanism, 4-Step Revenue Visualizer, Proof, Pricing)
├── services/page.tsx           # AI solutions breakdown (Chatbots, Workflows, Intake Portals & Retainers)
├── process/page.tsx            # 7-Day Launch Protocol interactive accordion & zero-downtime cutover
├── portfolio/page.tsx          # Live verified client deployments & case study metrics
├── pricing/page.tsx            # Transparent 3-tier GBP (£495–£1,495) setup & monthly retainers
├── contact/page.tsx            # UK direct phone, WhatsApp alerts & enquiry form
├── book/page.tsx               # Discovery call & 48h working prototype request flow
├── testimonials/page.tsx       # Verified UK local business case studies & revenue metrics
├── terms/page.tsx              # Standard UK commercial terms
├── privacy/page.tsx            # UK/EU GDPR-compliant privacy policy
├── sitemap.ts                  # Dynamic search engine XML sitemap
├── robots.ts                   # Search crawler directives
├── manifest.ts                 # PWA Web App manifest
└── opengraph-image.tsx         # Dynamic 1200x630 social share card generator
```

---

## ⚡ Getting Started & Verification

```bash
# 1. Install dependencies
pnpm install # or npm install

# 2. Run local development server
npm run dev

# 3. Typecheck verification
npx tsc --noEmit

# 4. Build for production
npx next build
```

---

## 💎 Dynamic Previews & Sandbox Prototypes
* **Trades & Field Services:** `/preview/demo?name=[Business]&trade=[Trade]`
* **Independent Jewellery Ateliers:** `/preview/jewellery?name=[Business]&city=[City]`

---

## 📄 License & Ownership
Mercian Wealth © 2026. All Rights Reserved. Engineered in Berkshire, United Kingdom.
