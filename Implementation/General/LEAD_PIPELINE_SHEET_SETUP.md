# Mercian Wealth Jewellers Pipeline & Database Setup Guide

This guide details the single source of truth for the **Jewellers Lead-Management & Follow-Up Pipeline** for Mercian Wealth.

Targeting independent ateliers, bespoke ring specialists, and luxury goldsmiths across the UK (Hatton Garden London, Birmingham Jewellery Quarter, Mayfair, Bath, Manchester).

---

## 1. Sheet Schema (Exact 12 Columns)

Create a Google Sheet (or tab) named **`Mercian Jewellers`** with the following header row:

| Column | Header | Data Type | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `Lead ID` | Text | Unique identifier | `JEWEL-1001` |
| **B** | `Business Name` | Text | Trading name of atelier / jeweller | `Mayfair Fine Jewellery Atelier` |
| **C** | `Niche` | Text | Sub-niche category | `Bespoke Jeweller` |
| **D** | `Phone Number` | Text | Standardized UK mobile / phone | `+447700900123` |
| **E** | `Source` | Text | Discovery origin | `Google Maps (Hatton Garden)` |
| **F** | `Date First Contacted` | Date (YYYY-MM-DD) | When initial message was sent | `2026-09-22` |
| **G** | `Current Stage` | Select | Current pipeline status | `Sourced` / `Contacted` / `Follow-up 1 Due` / `Prototype Sent` / `Nurture` / `Won` / `Lost` |
| **H** | `Last Message Sent` | Text | Copy of previous message sent | `Hi 👋 Came across your jewellery on Instagram...` |
| **I** | `Last Reply Received` | Text | Summary or text of jeweller's response | `We take custom requests via WhatsApp currently` |
| **J** | `Next Action Due` | Date (YYYY-MM-DD) | When next review/action is required | `2026-09-22` |
| **K** | `Prototype URL` | URL | Dynamic Veyra 3D Interactive Prototype | `https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Mayfair+Fine+Jewellery` |
| **L** | `Notes` | Text | Branch status, rating, observations | `Branch B (Instagram only, no site). 38 reviews (4.9★). High bespoke volume.` |

---

## 2. Jewellers Test Dataset (CSV Format)

Copy and paste the CSV text below directly into row 1 of your Google Sheet (**File $\to$ Import $\to$ Paste Data**, or copy-paste into cell A1):

```csv
Lead ID,Business Name,Niche,Phone Number,Source,Date First Contacted,Current Stage,Last Message Sent,Last Reply Received,Next Action Due,Prototype URL,Notes
JEWEL-1001,Mayfair Fine Jewellery Atelier,Bespoke Jeweller,+447700900123,Google Maps (Hatton Garden),2026-09-22,Sourced,,,2026-09-22,https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Mayfair+Fine+Jewellery,Branch B (Instagram only, no website). 38 reviews (4.9★). Direct atelier mobile.
JEWEL-1002,Quarter Diamond & Bespoke Rings,Diamond Specialist,+447700900456,Google Maps (Birmingham JQ),2026-09-20,Contacted,Hi 👋 Came across your jewellery on Instagram...,,2026-09-22,https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Quarter+Diamond,Opener sent 2 days ago. Day 2 gentle bump due.
JEWEL-1003,Cotswold Heritage Goldsmiths,Heritage Goldsmith,+447700900789,Google Maps (Bath),2026-09-18,Follow-up 1 Due,Hey — following up on Cotswold Heritage...,,2026-09-22,https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Cotswold+Heritage,Day 4 cumulative. Interactive 3D prototype tease due today.
JEWEL-1004,Kensington Vault Luxury Watches & Jewels,Luxury Atelier,+447700900321,Referral,2026-09-20,Prototype Sent,Put together that 3D prototype for you...,,2026-09-22,https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Kensington+Vault,Veyra 3D Prototype delivered 48h ago. Strict 48h feedback check due.
JEWEL-1005,Bond Street Gemstones,Gemstone Specialist,+447700900654,Instagram,2026-09-15,Nurture,No rush at all — whenever you are ready.,We are preparing for our Christmas collection check back later,2026-09-22,https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=Bond+Street,Requested pause. 7-day soft check-in due.
JEWEL-1006,De Beers Heritage Partner,Diamond Partner,+447700900987,Google Maps,2026-09-10,Won,Deposit received,Let us build the full 3D showroom,2026-10-01,https://veyra-premium-3-d-jewellery-e-comme.vercel.app/,Closed client. Ignored by daily digest.
JEWEL-1007,High Street Pawn & Jewellery,Retail Jeweller,+447700900111,Google Maps,2026-09-12,Lost,Polite sign-off,We only do retail pawn,2026-10-01,,Disqualified lead. Ignored by daily digest.
```

---

## 3. The Consultative Jeweller Outreach Flow

The Jeweller pipeline uses a consultative, luxury atelier approach rather than a hard pitch:

### Dual Branching:
* **Branch A (Has Existing Website):**
  Identifies commercial presentation friction (e.g. mobile gallery friction, lack of online prestige matching the physical store).
  *Opener:* `"Hi 👋 Came across [Atelier] — love the craftsmanship in your pieces. Had a quick look through your site, had a small question about how you showcase your bespoke commissions online if you have 30 seconds?"`
* **Branch B (No Website / Instagram Only):**
  Solves the missing conversion hub for high-ticket custom enquiries.
  *Opener:* `"Hi 👋 Came across [Atelier] on Instagram — stunning work. Had a quick search for your website to view the full collection, couldn't find one. Do you take all your bespoke commissions through WhatsApp / Instagram directly?"`

### Veyra 3D Interactive Prototype:
Each lead automatically receives their own dynamically branded Veyra interactive 3D concept URL:
`https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=[Business+Name]`
