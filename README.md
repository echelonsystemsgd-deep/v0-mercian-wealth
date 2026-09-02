# Mercian Wealth — Storefronts, Automation & Growth Systems for Local Businesses
**Mobile storefronts, 3-tap order builders, instant WhatsApp alerts, and automated Google review systems for bakeries, catering businesses, food artisans, and local services across Berkshire & the UK.**

---

## 🏛️ Brand System & Canonical Palette

Built with a modern tech automation aesthetic (Charcoal + Solid Gold):

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
* **Automation Infrastructure**: WhatsApp Business Direct Links & Cloud API, Webhooks, Resend Transactional Email Engine
* **UK Compliance & Security**: UK & EU GDPR Compliant, strict data residency, zero AI training on client business data
* **Performance Standard**: Sub-second load speeds, 100/100 Core Web Vitals, fluid responsive typography

---

## 🚀 Core Service Pillars

1. **Sub-Second Mobile Storefronts**: 3-tap checkout designed specifically for mobile shoppers on Instagram and Google.
2. **Instant WhatsApp Order & Kitchen Alerts**: Orders dispatch directly to your kitchen or phone with customer notes and pickup times.
3. **Automated Upfront Deposit Collection**: Integrated Apple Pay, Google Pay, and card deposits to eliminate unpaid no-shows.
4. **Automated 5-Star Google Review Engine**: Post-order automated review requests steadily building local Google search dominance.
5. **Direct Client & Admin Portals**: Dedicated `/client` and `/admin` portals for project tracking, bookings, leads, and metrics.

---

## 🗺️ Page & Route Architecture

```
app/
├── (admin)/                    # Admin CRM, lead analytics, and content management
├── (auth)/
│   ├── login/                  # Client & Admin secure authentication portal
│   ├── signup/                 # Client account registration
│   └── forgot-password/        # Password recovery flow
├── (client)/                   # Client project war room & live telemetry dashboard
├── page.tsx                    # Main Homepage (Interactive Phone Sandbox, ROI Calculator, System Blueprint)
├── services/page.tsx           # What We Build & interactive service detail modals
├── process/page.tsx            # 7-Day Launch Protocol interactive accordion
├── portfolio/page.tsx          # Live Interactive Sandbox prototypes & case studies
├── pricing/page.tsx            # Transparent 3-tier GBP (£495–£1,450) pricing matrix
├── contact/page.tsx            # UK direct phone, WhatsApp dispatch & enquiry form
├── book/page.tsx               # 15-Minute diagnostic audit booking flow
├── testimonials/page.tsx       # Verified Berkshire business case studies
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

# 4. Build for production (Clean 65/65 routes)
npx next build
```

---

## 📄 License & Ownership
Mercian Wealth © 2026. All Rights Reserved. Engineered in Berkshire, United Kingdom.
