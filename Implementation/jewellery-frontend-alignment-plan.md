# Frontend Positioning Alignment & Jewellery Prototype Integration Plan

**Document:** `/Implementation/jewellery-frontend-alignment-plan.md`  
**Purpose:** Ensure the public Mercian Wealth website strictly preserves broad local business positioning (Option 2), broadens any narrow trade-specific copy, documents the portfolio update to the latest Vanguard deployment, and integrates the parameterised Jewellery Prototype concept under the unified design system.  
**Companion File:** `/Implementation/jewellery-outreach-plan.md` (Covers internal CRM, Supabase data layer, and WhatsApp outreach mechanics).

---

## 1. Executive Direction & Positioning Safeguards

### Core Philosophy
* **The Public Website Does Not Pivot:** The public website remains firmly positioned around **UK Local Businesses Generally** (the confirmed Option 2 positioning: capturing more leads, answering faster, eliminating manual admin drag).
* **Jewellery Is an Outreach Vertical, Not a Public Rebrand:** Independent and bespoke jewellers represent one high-ticket outreach vertical targeted via direct WhatsApp consultative outreach. Prospects who discover or are sent prototypes never see niche-specific rebranding on the agency's public homepage.
* **Universal Language Standard:** All public-facing headlines, objection callouts, feature lists, and bottleneck descriptions speak across all regional business categories (boutiques, private clinics, luxury studios, professional services, trade operators, and bespoke confectioneries).

---

## 2. Copy Consistency Audit & Refinements

A comprehensive audit was executed across `lib/site-copy.ts` and interactive components. The layout, visual hierarchy, spacing, tokens, and animations were **left 100% untouched**. Only narrow phrasing was elevated to broad local business terminology.

### Refined Copy Registry

| File & Section | Original Phrasing | Broadened Universal Phrasing | Rationale |
| :--- | :--- | :--- | :--- |
| **`lib/site-copy.ts`**<br>`bottleneck.cards[0]` | *"Unanswered Phone Calls on Job Sites"* | **"Unanswered Phone Calls During Busy Hours"** | Universal across jewellers with walk-in clients, clinics with patients, and trade operators. |
| **`lib/site-copy.ts`**<br>`bottleneck.cards[0]` | *"Calls missed while driving, on a job, or after 5 PM..."* | **"Calls missed while serving clients, in consultations, or after hours..."** | Eliminates tradesperson bias while preserving the commercial urgency of missed calls. |
| **`lib/site-copy.ts`**<br>`whyMercianWealth.standardAgency` | *"Misses calls while on-site or after hours, losing jobs to rivals."* | **"Misses calls during busy hours or after closing, losing enquiries to rivals."** | Replaces "on-site" with "during busy hours or after closing", applicable to any local business. |
| **`lib/site-copy.ts`**<br>`servicesPage.objectionCallout` | *"Traditional setups rely on staff who cannot answer calls at 8 PM or during busy jobs."* | **"Traditional setups rely on staff who cannot answer calls at 8 PM, during appointments, or while serving clients."** | Professional, customer-focused phrasing. |
| **`lib/site-copy.ts`**<br>`portfolioPage.noticeTitle` | *"Configured Specifically To Your Trade & Services"* | **"Configured Specifically To Your Business & Services"** | Broadens from trades to any commercial enterprise. |
| **`lib/site-copy.ts`**<br>`pricingPage.oneTimeTiers[2]` | *"End-to-end custom operational automation, multi-trade workflows, or multi-location booking infrastructure."* | **"End-to-end custom operational automation, multi-service workflows, or multi-location booking infrastructure."** | Speaks to dental clinics, jewellery studios, or multi-service local brands. |
| **`components/interactive-automation-flow.tsx`**<br>`FLOW_STEPS[0]` | *"An enquiry arrives via your website AI chat widget or WhatsApp while your team is on-site, driving, or closed for the evening."* | **"An enquiry arrives via your website AI chat widget or WhatsApp while your team is busy serving clients, in consultations, or closed for the evening."** | Perfectly covers jewellery showrooms, salons, consultancies, and field operators alike. |

> [!NOTE]
> Specific example case studies (e.g., `Artisanal Bakery & Confectionery (London)` and `Vanguard Construction (Surrey)`) were intentionally preserved as authentic, illustrative production proof without narrowing the global positioning.

---

## 3. Portfolio Enhancement: Vanguard Construction Deployment Update

The client requested updating the portfolio to point to the newly redesigned and redeployed production environment:
* **Target Production URL:** `https://premium-local-construction-business-plum.vercel.app/`

### Synchronized Touchpoints
1. **Supabase Database:**  
   Updated record in `public.portfolio_items` (`id: 50541f94-3d9f-489b-b2a1-9435d16e153f`):
   * `website_link = 'https://premium-local-construction-business-plum.vercel.app/'`
2. **`components/portfolio.tsx` (Fallback Registry):**  
   * `href = 'https://premium-local-construction-business-plum.vercel.app/'`
   * `domain = 'premium-local-construction-business-plum.vercel.app'`
3. **`app/(admin)/admin/portfolio/page.tsx`:**  
   * `website_link = 'https://premium-local-construction-business-plum.vercel.app/'`
4. **`lib/site-copy.ts` (`caseStudies[1]`):**  
   * `liveUrl = 'https://premium-local-construction-business-plum.vercel.app/'`

---

## 4. Frontend Prototype: Dedicated Parameterised Jewellery Preview

To support the outreach flow's mechanic ("sending a free prototype website... auto-inserting the business name into a template"), a dedicated preview route was built:
* **Route:** `/preview/jewellery`
* **Dynamic Query Parameters:** `?name=[Business+Name]&city=[City]&phone=[Phone]&rating=[Rating]&reviews=[Reviews]`
* **Example Live Test:** `http://localhost:3000/preview/jewellery?name=Mayfair+Jewellers&city=London`

### Rigorous Design System Adherence
The jewellery concept preview strictly inherits the exact design tokens, components, and animations established sitewide:

1. **Top Sticky Conversion Prototype Banner:**
   * Exact matching gradient: `bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black px-4 py-2.5`
   * Pulsing ping indicator: `<span className="flex h-2 w-2 rounded-full bg-black animate-ping" />`
   * Dynamic brand insertion: *"⚡ LIVE CONVERSION PROTOTYPE: Engineered specifically for Mayfair Jewellers"*
   * Zero-obligation claim button: Direct link to WhatsApp chat with pre-filled prospect context.
2. **Design Tokens & Palette:**
   * Background: Deep luxury `#050505` with `#DAA640`/10 radial ambient blur.
   * Container Cards: `#0B0B0D` with `border-white/10` and `#DAA640`/30 subtle active borders.
   * Accents & Highlights: Pure gold `#DAA640` and `#DCAE53`.
   * Typography: Cormorant Garamond / Serif headers for high-ticket editorial prestige, paired with Inter sans for clean body readability and mono uppercase badges.
3. **Interactive 3D Sandbox Integration:**
   * Embedded luxury preview of the real **VEYRA Solid Cast Permanent Jewellery** sandbox.
   * One-click direct launch to `https://veyra-premium-3-d-jewellery-e-comme.vercel.app/`.
4. **Bespoke Commission Intake Drawer:**
   * 3-tap consultation and bespoke brief form (stone remounting, signet rings, permanent welded chains, engagement commissions).
   * Instant WhatsApp handoff simulation upon test submission.

---

## 5. Visual Verification & Proof

Full visual verification was completed using browser automation at 1440×900 desktop viewport:

1. **Homepage Consistency (`/`):**
   * Verified headline: *"We help local businesses stop losing jobs to whoever replies first."*
   * Verified 3 outcome cards: 24/7 AI Voice & Chat, Automated Booking & Scoping, Instant WhatsApp Alerts.
   * Verified layout integrity: Zero shifting, zero component restructuring, fluid Framer Motion animations.
2. **Jewellery Concept Preview (`/preview/jewellery?name=Mayfair+Jewellers&city=London`):**
   * Verified sticky banner with dynamic brand name injection.
   * Verified exact sitewide color harmony and component token reuse.
3. **Portfolio Carousel (`/#portfolio`):**
   * Verified carousel active rotation with VEYRA, AURĒLIA, and Vanguard Construction.

---

## 6. Verification Checklist

- [x] Public site copy thoroughly audited and broadened to universal local business terminology.
- [x] Case studies preserved as authentic, illustrative examples without narrowing global copy.
- [x] No layout, component tree, or design system tokens altered on the public site.
- [x] Vanguard Construction URL updated to `https://premium-local-construction-business-plum.vercel.app/` across database, portfolio component, admin portfolio, and site-copy.
- [x] Parameterised Jewellery concept preview created at `/preview/jewellery` using exact sitewide design tokens.
- [x] Both `/` and `/preview/jewellery` compile and return HTTP 200 OK.
- [x] Real screenshots captured and verified.
