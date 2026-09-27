# Public Folder Asset Audit & Relocation Report

**Audit Date:** 2026-09-27  
**Target Repository:** `v0-gs-legacy-wealth-app` (Mercian Wealth)  
**Safety Protocol:** Zero site modifications. All production routes, components, and site-referenced assets remain untouched.

---

## 1. Overview

An audit of the `public/` directory was performed. The directory previously contained **42 items** spanning three categories:
1. **Active Core Site Assets**: Brand marks, icons, search engine verifications, and UI illustration assets actively used in production.
2. **Client Portfolio Assets & Previews**: High-resolution screenshots and case-study prototypes referenced in the portfolio and verification modals.
3. **Misplaced Course & Tooling Assets**: Antigravity skills, RAR archives, and PDF curriculum modules from "The Real World (TRW) AI Automation Campus" that were inadvertently dropped into `public/`.

All misplaced materials have been **analyzed, extracted, cataloged, and saved into their proper permanent locations** across the course curriculum and global Antigravity configuration. The Next.js public directory has been cleaned of temporary drop files, ensuring no internal tool scripts or raw archives are exposed over HTTP.

---

## 2. Relocated Assets & New Permanent Homes

| File / Folder in `public/` | Origin & Nature | New Permanent Location |
| :--- | :--- | :--- |
| **`website-duplicator/`** | Antigravity Custom Skill for cloning, WebGL capturing, and verifying offline sites with Playwright. | • `CODING\website-duplicator\`<br>• `~/.gemini/config/skills/website-duplicator\` |
| **`01M32W4Y337BEV2QCAHXA6FVJZ (1)`** | Raw RAR archive containing the complete `website-outreach-skill` package and student templates. | • Extracted to `3. Selling The Future\website-outreach-skill\`<br>• Skill registered in `~/.gemini/config/skills/website-outreach\`<br>• Preserved archive as `3. Selling The Future\website-outreach-skill.rar` |
| **`Outreach Engine - Written Pathway - Module 1 - Email X Variable Y.pdf`** | Official written guide for Module 1 outreach messaging. | • `3. Selling The Future\Outreach Engine\` *(also preserved in `public/` for repo integrity)* |
| **`Outreach Engine - Written Pathway - Module 2 - Outreach #1 Variable Y.pdf`** | Official written guide for Module 2 Variable Y outreach sequence. | • `3. Selling The Future\Outreach Engine\` *(also preserved in `public/` for repo integrity)* |
| **`Outreach Engine - Written Pathway - Module 2 - Outreach#1 Email X.pdf`** | Official written guide for Module 2 Email X outreach sequence. | • `3. Selling The Future\Outreach Engine\` *(also preserved in `public/` for repo integrity)* |

---

## 3. Inventory & Usage Classification

### A. Core Site & Brand Identity Assets
- **`favicon.ico`** (49 KB): Site favicon used across `app/layout.tsx` and client container components.
- **`Logo1.jpeg` / `logo1.png`** (49 KB): Primary Mercian Wealth logomark used in navigation, manifest, and portal hub.
- **`Logo2.jpeg` / `logo2.png`** (41.9 KB): Secondary brand logomark used across booking, contact, services, and pricing pages.
- **`BingSiteAuth.xml`** (0.1 KB): Bing webmaster search engine verification XML.
- **`llms.txt` / `llms-full.txt`** (2.7 KB / 3.0 KB): Structured documentation endpoints for AI search engines and crawler agents.
- **`placeholder-logo.*` / `placeholder.*`**: Fallback SVGs and JPGs for missing media and avatar slots.

### B. Illustration & UI Value Assets
- **`stickman_baker_order.png`** (407 KB): Used in site copy and workflow explanation UI.
- **`stickman_crm_autopilot.png`** (595 KB): Audit and process diagram asset.
- **`stickman_relax_saved_time.png`** (670 KB): Value proposition visual asset.
- **`stickman_speed_automation.png`** (741 KB): Velocity comparison asset used in positioning plans and UI copy.

### C. Portfolio Client Showcase Assets
- **`aurelia-supplement-preview-real.jpg`**: Used in admin portfolio and portfolio carousel.
- **`vanguard-construction-preview-real.jpg` / `.png`**: Used in portfolio carousel and site copy.
- **`veyra-jewellery-preview-real.jpg`**: Used in jewellery preview routes and showcase modals.
- **`meridian-dental-preview-real.jpg`**: Healthcare portfolio prototype showcase.
- **`me-building-services-preview-real.jpg`**: Trade contractor portfolio prototype showcase.
- **`home-solutions-roofing-preview-real.jpg`**: Roofing case study showcase.
- **`princeps-preview-real.jpg` / `.png` / `princeps-techwear-preview.jpg`**: E-commerce techwear prototype showcase.
- **`stamp-app-preview.png`**: Vintage stamp appraisal tool case study.
- **`sterling-direct-purchases-preview.png`**: Financial advisory prototype preview.
- **`homepage_verified.png` / `jewellery_preview_verified.png` / `portfolio_verified.png`**: Visual verification benchmarks.

---

## 4. Verification & Clean State

1. **No Breaking Changes**: No files referenced by the Next.js frontend were altered or removed.
2. **Clean Production Build**: Next.js no longer attempts to bundle or serve external `node_modules` from `public/`.
3. **Global Custom Skills Ready**: Both `website-duplicator` and `website-outreach` are now registered in the global Antigravity runtime at `~/.gemini/config/skills/` and can be invoked directly by AI agents across any workspace.
