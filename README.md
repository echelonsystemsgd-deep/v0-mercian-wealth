# Mercian Wealth — High-Converting Websites & Booking Systems for Local Businesses
**Custom high-performance websites, 3-tap booking flows, instant WhatsApp smartphone alerts, and automated Google review engines for premier local businesses and service operators across Berkshire, the West Midlands & the UK.**

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
* **Notification Infrastructure**: WhatsApp Business Direct Links & Cloud API, Webhooks, Resend Transactional Email Engine
* **UK Compliance & Security**: UK & EU GDPR Compliant, strict data residency
* **Performance Standard**: Sub-second load speeds, 100/100 Core Web Vitals, fluid responsive typography

---

## 🚀 Core Service Pillars

1. **High-Converting Websites**: Sub-second Next.js websites built specifically to convert traffic into confirmed enquiries.
2. **3-Tap Booking & Upfront Deposits**: Frictionless customer booking interfaces that capture non-refundable card deposits via Stripe and Apple Pay.
3. **Instant WhatsApp Smartphone Alerts**: Enquiry and booking notifications delivered straight to the operator's phone in under 2 seconds.
4. **Automated 5-Star Google Review Engine**: Post-service automated review requests systematically compounding local Google dominance.
5. **Managed Speed & Growth Retainer**: 99.98% uptime SLA, continuous Core Web Vitals optimization, and hands-off menu/content updates.

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
├── page.tsx                    # Main Homepage (High-Converting Websites, 3-Tap Booking, Outcomes Positioning)
├── services/page.tsx           # Web infrastructure deliverables & interactive architecture modals
├── process/page.tsx            # 7-Day Launch Protocol interactive accordion & zero-downtime cutover
├── portfolio/page.tsx          # Live case studies & Interactive Order Engine demo
├── pricing/page.tsx            # Transparent 3-tier GBP (£495–£1,495) pricing & retainer matrix
├── contact/page.tsx            # UK direct phone, WhatsApp alerts & enquiry form
├── book/page.tsx               # Discovery call & prototype request booking flow
├── testimonials/page.tsx       # Verified UK local business case studies
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
