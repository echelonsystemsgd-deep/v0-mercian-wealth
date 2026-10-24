---
name: website-audit
description: Use when conducting an exhaustive, full-conscience website audit across Performance & Core Web Vitals (LCP, INP, CLS, TTFB), Accessibility (WCAG 2.2 AA), Technical SEO & Schema.org JSON-LD, Security Defense Headers & Privacy, Mobile Viewport Ergonomics, Conversion Rate Optimization (CRO), and finding all active defects or missing infrastructure hindering website success.
---

# Full-Conscience Website Audit & Practice Intelligence Protocol

A rigorous, two-layer diagnostic framework for auditing professional services (UK accountancy practices) and commercial websites.

> [!IMPORTANT]
> **The Two-Layer Doctrine for Professional Practices**:
> 1. **Layer 1: Observable Site Frictions**: Measured and evidenced on a 390px mobile viewport (overflow, sub-44px tap targets, multi-input forms, missing viewport). Used **only** as supporting proof that we personally inspected their business. Never lead with cosmetic fixes on builder sites, or the practice simply forwards it to their web builder and you lose the lead.
> 2. **Layer 2: Operational Process Gaps the Builder Cannot Fix**: What happens *after* the enquiry (out-of-hours response speed, document chasing before statutory MTD deadlines, onboarding drop-off, retainer pre-qualification). This is where you win the instruction.
> 3. **The Contact Form Baseline**: A contact form with no booking flow is the normal baseline for UK accountants. Never make "no booking flow" the headline friction. Flag only genuine form problems (>= 6 inputs, broken captcha quotas, no phone/WhatsApp alternative, no visible response promise).
> 4. **False-Positive Elimination Rule Engine**:
>    - **CSS-Hidden Honeypots**: Never flag fields with opacity: 0, display: none, or width: 1px; height: 1px as visual bugs. They are anti-bot honeypots invisible to human prospects.
>    - **Controlled SPA Forms**: Never flag inputs lacking HTML name attributes as broken if client-side React/Vue state submits to Supabase/API.
>    - **Subpage vs Homepage Discrepancy**: Never claim a firm has no contact form if their homepage features an active intake form. Always verify both routes.
> 5. **Unobservable Guardrail**: Things that cannot be observed from public pages (auto-replies, response time, staff follow-up) must be labelled `"unknown, validate on call"`, never `"verified"`. Never submit live forms.

---

## Operational Execution:

1. **Execute Headless Evidence Probe (390px Mobile Viewport)**:
   - Run the automated probe:
     ```bash
     node scripts/run_evidence_audit.mjs <url> [--screenshot] [--json]
     ```
   - Measures real layout metrics:
     - Horizontal overflow: `document.documentElement.scrollWidth > window.innerWidth`
     - Tap target sizes (< 44px)
     - Forms inspection (input counts, types, action, visible response promises)
     - Regulators & trust (ICAEW, ACCA, AAT, ICAS, AML supervisor, Companies House number)
     - Content & statutory dates (MTD for Income Tax mentions, Self Assessment crunch)
     - Build fingerprint (WordPress/Elementor, Wix, Squarespace, Webflow, Framer, Lovable, v0)

3. **Perform Deep Multi-Pillar Forensic Analysis**:
   - **Flaw Hunting Playbook**: [flaw-detection-playbook.md](./references/flaw-detection-playbook.md)
     - Audit active defects (broken links, failed form submissions, console exceptions, broken images).
     - Audit omission defects (missing WhatsApp instant channels, missing guarantees, missing social proof, missing FAQs).
   - **Official Specs & Standards**: [official-docs-and-specs.md](./references/official-docs-and-specs.md)
     - Canonical W3C, Google Search Central, web.dev, MDN, OWASP, and Schema.org references.
   - **Pillar 1: Performance & Core Web Vitals**: [performance-and-cwv.md](./references/performance-and-cwv.md)
     - Audit LCP (hero image preloading, `fetchpriority="high"`, AVIF/WebP, render-blocking CSS).
     - Audit INP (long tasks > 50ms, hydration latency, debouncing on inputs).
     - Audit CLS (missing width/height attributes, dynamic ad shifts, font layout shifts).
     - Audit caching headers (`Cache-Control: immutable` on static assets, Brotli compression).
   - **Pillar 2: Accessibility & Inclusivity**: [accessibility-wcag-22.md](./references/accessibility-wcag-22.md)
     - Verify WCAG 2.2 Level AA compliance.
     - Inspect color contrast ratios (4.5:1 body copy, 3:1 UI components).
     - Audit keyboard navigation (visible `:focus-visible` rings, no keyboard traps, skip-link).
     - Validate form input `<label>` associations, ARIA attributes, and image `alt` tags.
   - **Pillar 3: Technical SEO & Schema.org**: [technical-seo-and-schema.md](./references/technical-seo-and-schema.md)
     - Inspect self-referential canonical tags, robots.txt, and sitemap indexability.
     - Review Title tag (50–60 chars) and Meta description (120–155 chars with CTA).
     - Verify Open Graph (1200x630) and Twitter Card tags for social preview rendering.
     - Validate JSON-LD structured data (Product, Offer, FAQPage, Organization, LocalBusiness).
   - **Pillar 4: Security & Privacy Compliance**: [security-and-headers.md](./references/security-and-headers.md)
     - Inspect 6 core defensive headers: HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
     - Audit cookie security flags (`Secure`, `HttpOnly`, `SameSite=Lax`).
     - Check for mixed content warnings and secure form submissions.
   - **Pillar 5: Mobile & Touch Ergonomics**: [mobile-and-ux-ergonomics.md](./references/mobile-and-ux-ergonomics.md)
     - Verify responsive viewport tag without user scalability restrictions.
     - Audit form input font size: enforce `font-size: 16px` on mobile to prevent iOS Safari auto-zoom.
     - Enforce minimum 48x48px touch targets for thumb-zone usability.
     - Diagnose and eliminate horizontal overflow ("side-scrolling") bugs.
     - Check dynamic viewport height (`dvh`) and safe area insets on mobile sticky footers.
   - **Pillar 6: Conversion Rate Optimization (CRO)**: [conversion-and-cro.md](./references/conversion-and-cro.md)
     - Apply the 5-second value proposition test above the fold.
     - Inspect trust architecture: payment guarantees, risk reversals, Trustpilot/review badges.
     - Audit form field count and checkout friction steps.

4. **Classify by Severity & Business Impact**:
   - Categorize all findings using the [audit-methodology.md](./references/audit-methodology.md) matrix:
     - 🔴 **P0 (Critical)**: Immediate blockers, broken checkout/booking flows, security vulnerabilities, 404 routes.
     - 🟠 **P1 (Major)**: Missing primary CTA, Core Web Vitals failures, mobile layout bugs, missing key schema, missing rapid response channel.
     - 🟡 **P2 (Moderate)**: Uncompressed media, missing FAQ objection handlers, suboptimal contrast, missing OG tags.
     - 🟢 **P3 (Minor)**: Code polish, heading hierarchy nuances, minor cache tuning.

5. **Formulate Production-Ready Deliverables**:
   - Provide exact, drop-in code snippets for every single issue.
   - Generate client-ready audit report using [audit_report_template.md](./assets/audit_report_template.md).
   - Formulate a prioritized remediation roadmap.

---

## Directory & Resource Map

```text
website-audit/
├── SKILL.md                          # Master runbook & full-conscience protocol (this file)
├── openai.yaml                       # Codex UI metadata & parameters
├── agents/                           # Agent definitions & interaction protocols
│   ├── openai.yaml                   # Model instructions & trigger configurations
│   └── agent-interaction.md          # 4-phase operational workflow & flaw-hunting persona
├── references/                       # Comprehensive technical manuals & scoring rubrics
│   ├── flaw-detection-playbook.md    # Active defects & commercial barrier detection guide
│   ├── official-docs-and-specs.md    # Authoritative W3C, RFC, Google, and OWASP specs
│   ├── audit-methodology.md          # 8-pillar audit framework, severity matrix, ROI translation
│   ├── performance-and-cwv.md        # LCP, INP, CLS, TTFB, resource budgets, caching
│   ├── accessibility-wcag-22.md      # WCAG 2.2 AA standards, contrast, keyboard nav, screen readers
│   ├── technical-seo-and-schema.md   # Indexability, metadata, Open Graph, Schema.org JSON-LD
│   ├── security-and-headers.md       # HSTS, CSP, X-Frame-Options, cookie flags, GDPR/ePrivacy
│   ├── mobile-and-ux-ergonomics.md   # Viewport, touch targets, iOS zoom, dvh, thumb zone
│   └── conversion-and-cro.md         # 5-second test, trust anchors, checkout friction, CTAs
├── scripts/                          # Executable automated inspection tools
│   ├── find_site_flaws.mjs           # Active defect, dead-link & commercial barrier hunter
│   ├── audit_site.mjs                # Complete automated auditor (Node.js native)
│   ├── check_security_headers.mjs    # SSL/TLS & HTTP defense headers inspector
│   ├── check_seo_schema.mjs          # Schema.org JSON-LD structured data parser
│   └── check_accessibility.mjs       # WCAG 2.2 semantic HTML & contrast checker
├── assets/                           # Reusable deliverables & checklists
│   ├── audit_report_template.md      # Formal client audit report presentation template
│   ├── audit_checklist.json          # Exhaustive 100-point audit item data structure
│   └── executive_summary_deck.md     # Stakeholder briefing slide deck format
```

---

## The 4 Principles of Full-Conscience Auditing

### 1. Evidence Over Assumption
Never report an issue without citing its exact metric, line number, DOM element, or HTTP header. Every claim must be reproducible.

### 2. Actionable Code Diffs
Every reported defect must include the exact before-and-after code diff required to fix it, tailored to the project's framework (e.g. Next.js, React, Tailwind CSS, Nginx, or Apache).

### 3. Commercial ROI Translation
Bridge the gap between engineering and business. Explain how an LCP reduction translates into lower ad bounce rates, or how rapid WhatsApp channels increase customer conversions.

### 4. Verification Protocol
Always specify the exact testing command or browser tool (e.g. `npm run build`, Chrome Lighthouse, axe DevTools, Rich Results Test) that confirms the issue is resolved.

---

## Quick Start CLI Inspection

To hunt flaws and audit any local or live website immediately:

```bash
# 1. Hunt all functional, commercial, and technical flaws
node skills/website-audit/scripts/find_site_flaws.mjs http://localhost:3000

# 2. Run multi-pillar forensic audit
node skills/website-audit/scripts/audit_site.mjs http://localhost:3000

# 3. Inspect security defense headers
node skills/website-audit/scripts/check_security_headers.mjs http://localhost:3000

# 4. Validate Schema.org structured data
node skills/website-audit/scripts/check_seo_schema.mjs http://localhost:3000

# 5. Check WCAG 2.2 accessibility semantics
node skills/website-audit/scripts/check_accessibility.mjs http://localhost:3000
```


---

## Skill Version & Changelog

### Version 2.0.0 (2026-10-24)
* **Integrated ADDENDUM v2 (Pillars 9-14 & Master Taxonomy Extension)**:
  - Extended taxonomy items 30 to 134 across Performance, Technical, Mobile, Visual UI, Intake, Content, Trust, UX Flow, A11y, SEO/AEO, Measurement, Compliance, Security Hygiene, and Maintenance.
  - Added Layer 2 Process Catalogue hypotheses for discovery calls (never verified, always validate on call).
  - Added Industry Modules (Accountants, Trades, Clinics, Shops, Estate Agents, Hospitality).
  - Added Severity Levels 1 (cosmetic/watchlist) and 2 (minor/hygiene) with strict rule: never lead outreach.
  - Replaced hardcoded date with variable `{CALL_DATE}` (defaults to "a 10-minute call this week").
  - Added WhatsApp sequence architecture (1. Initial + stop line, 2. Observation, 3. Friction, 4. Solution, 5. Call?) in 'we' voice.

### Version 1.7.0 (2026-10-24)
* **Added 5 Critical Infrastructure & Visual Blunder Frictions to Taxonomy**:
  * SECURITY-CAPTCHA-QUOTA-EXCEEDED: Google reCAPTCHA widget quota exceeded (`This site is exceeding reCAPTCHA Enterprise free quota`), failing token validation and locking out inquiries (Level 5 Critical severity).
  * TECH-SSL-EXPIRED-SELF-SIGNED: Untrusted/self-signed SSL certificate expired years ago, triggering browser full-screen red warning interstitial (Level 5 Critical severity).
  * TECH-DNS-UNRESOLVED: Complete domain DNS resolution failure (NXDOMAIN / unrouted NS), taking website 100% offline (Level 5 Critical severity).
  * UI-SCRAPED-TEXT-ARTIFACT: Uncleaned copy-paste scraper artifacts published in live client copy (Level 3 severity).
  * BRAND-KEYWORD-STUFFING-STRIP: Archaic 2000s-era SEO keyword stuffing rows degrading practice authority (Level 3 severity).
* **Source Audits**: ASTON Accountants, ST Accountants Limited, MPI Accounting & Management Services (Batch 12 Cohort).

### Version 1.6.0 (2026-10-24)
* **Added 3 Critical Crash & Placeholder Frictions to Taxonomy**:
  * TECH-WP-CRITICAL-ERROR: Fatal WordPress crash taking down public website (Level 5 Critical severity).
  * UI-DUMMY-PLACEHOLDER-LEFTOVER: Developer demo data published live (`+44 1234 567890`, `your@email.com`, `some-randome-random`) (Level 4 severity).
  * UI-HERO-COUNTER-ZERO-STUCK: Statistics counters displaying `0+ Satisfied Clients` and `0% Client Retention` (Level 4 severity).
* **Source Audits**: Al-Baraka Chartered Certified Accountants, Abacus Accountants, A G Accountancy.

### Version 1.5.0 (2026-10-24)
* **Added 3 DNS Outage & Form Visibility Frictions to Taxonomy**:
  * TECH-DNS-CLOUDFLARE-1000: Cloudflare Error 1000 "DNS points to prohibited IP" taking site down (Level 5 Critical severity).
  * FORM-HONEYPOT-EXPOSED: Visible honeypot field labels ("Do not fill this field") confusing human visitors (Level 3 severity).
  * BRAND-REGIONAL-DIALLER-MISMATCH: Local Berkshire practice displaying only London/Surrey 0208 diallers, causing local friction (Level 3 severity).
* **Source Audits**: NAFS Accountants Slough, H A & Co Accountants, IAC Accountants.

### Version 1.4.0 (2026-10-24)
* **Added 3 Messaging Handover & Legacy Intake Frictions to Taxonomy**:
  * TECH-WHATSAPP-WEB-TRAP: Using `web.whatsapp.com` desktop protocol breaking smartphone app launch (Level 4 severity).
  * INTAKE-FORM-OMISSION: Complete absence of any interactive enquiry form on contact page (Level 4 severity).
  * SECURITY-CAPTCHA-DISTORTED-IMAGE: Outdated alphanumeric image CAPTCHA forcing high mobile drop-off (Level 4 severity).
* **Source Audits**: Adam Accountancy Limited, E-Tax Associates, Uppal Accountants.

### Version 1.3.0 (2026-10-23)
* **Added 3 Accessibility & Pseudo-Booking Frictions to Taxonomy**:
  * MOBILE-ZOOM-DISABLED: Viewport meta tag locks pinch-to-zoom (`user-scalable=0`, `maximum-scale=1`), blocking clients with vision impairment (WCAG 1.4.4 violation, Level 4 severity).
  * INTAKE-BOOKING-ANCHOR-BAIT: "Book a Meeting" CTA button anchor-jumps down the page to a static delayed contact form with no live scheduler (Level 4 severity).
  * TECH-TEL-ENCODED-SPACES: Telephone links containing URL-encoded spaces (`%20`), breaking diallers on Android and VoIP softphones (Level 3 severity).
* **Source Audits**: DNS Accountants Slough, Direct Assist Accountants, Smooth Feathers Accountants.

### Version 1.2.0 (2026-10-23)
* **Added 4 Direct Response & Technical Dialler Frictions to Taxonomy**:
  * TECH-TEL-MALFORMED: Trunk-0 error in UK international telephone links (e.g. `tel:+4401...`) breaking smartphone diallers and VoIP calls (Level 4 severity).
  * TECH-TEL-MISSING-HREF: Plain-text phone numbers without clickable `tel:` links on mobile viewports, preventing 1-tap dialling (Level 4 severity).
  * INTAKE-BOOKING-FAKEOUT: Dropdown promises "Book a Meeting / Video Call" but routes to an asynchronous email inbox without calendar scheduling (Level 4 severity).
  * BRAND-POSITIONING-DISCONNECT: Critical disconnect between Google Business Profile / search snippet and live website niche positioning (Level 3 severity).
* **Source Audits**: Sterling Gate Accountants, MA Accountancy Services Ltd, Asmat & Co (Slough Practice Cohort).

### Version 1.1.0 (2026-10-22)
* **Added 6 Real-World Enrolment & Intake Frictions to Taxonomy**:
  * INTAKE-POSTCODE-REQ: Mandatory physical address/postcode fields on general consultation forms (Level 4 severity).
  * TECH-CONTACT-404: Contact slug 404 failure where /contact/ route is renamed without 301 redirection (Level 5 severity).
  * INTAKE-DUAL-FORMS: Fragmented dual-form structure competing on a single page without unified guided triage (Level 4 severity).
  * INTAKE-CORP-REQ: Mandatory corporate field enforcement on private individual services (Level 4 severity).
  * INTAKE-SURPRISE-MODAL: Deceptive multi-step modal popping up unexpectedly after a simple 2-field teaser (Level 4 severity).
  * INTAKE-SLA-EXCESSIVE: Explicit published callback delays (> 24-48 hours) causing high-intent panic leads to bounce (Level 4 severity).
* **Source Audits**: Monahans, Milsted Langdon, Jerroms, Hazlewoods, Hunter Gee Holroyd, Jackson Stephen.


---

# ADDENDUM v2: ADDITIONS ONLY
Append to the existing skill. Do not delete or rewrite anything above. If an addition conflicts with existing text, keep the original, note it in the changelog and ask me.

## A. Housekeeping
- Section 4 is titled "27-Point" but lists 29 items. Do not renumber. Treat the heading as "Master Taxonomy (extended)". New items continue from 30.
- Replace the hardcoded date "Monday 26th October" with a variable {CALL_DATE} that I set per batch. If unset, say "a 10-minute call this week".
- Add severity Level 2 (minor/hygiene) and Level 1 (cosmetic/watchlist) to the existing Levels 5, 4 and 3. Level 1-2 items never lead an outreach message.

## B. Batch workflow and self-update loop
- Input: up to 3 URLs per batch, plus optional notes (business type, location). Audit each site in a fresh context so findings never leak between sites.
- After EACH site: (1) list anything observed that isn't in the taxonomy or was detected badly; (2) add or refine entries: id, category, definition, how to detect, severity, anonymised evidence example, source and date; (3) add false-positive notes; (4) merge duplicates; (5) bump the skill version and add a changelog entry (date, what changed, which audit); (6) re-run a quick regression on the new site and previous sites to confirm results don't get worse or become identical. Never add a friction without real evidence. Never store client names or personal data in the skill.

## C. Test matrix and tooling (passive, public pages only)
- Respect robots.txt, rate-limit, no logins, no form submissions, no probing or exploitation.
- Crawl the homepage plus up to 25 same-domain pages: contact, services, about, pricing, FAQ, blog, portal/login, legal pages, one deep page.
- Viewports: 320, 390, 768, 1024, 1440 px. Full-page and above-the-fold screenshots for each.
- Tools: Lighthouse (mobile, run 3 times, report the median), axe, link checker, console log capture, HTTP header inspection.
- Build fingerprint: platform (Wix, Squarespace, WordPress/Elementor, Webflow, Framer, Shopify, Lovable, v0, Bolt, custom) with confidence and the evidence used.

## D. Evidence schema (every finding)
id, category, severity 1-5, confidence (verified | likely | unknown), evidence (URL, viewport, selector or element, measured value, screenshot path, tool, timestamp), outcome at stake (revenue | time | risk).
- No finding without evidence. Anything not observable is "unknown, validate on the call".
- Resolve contradictions before display. One primary angle per site and at most two supporting points.
- Grade each site A, B, C or Hold ("Hold: nothing verified"), with a one-line reason.

## E. Additional pillars (9-14)
- Pillar 9, Visual design and UI components: hierarchy, clutter, contrast, type consistency, imagery quality, brand consistency, motion and autoplay, navigation, buttons, forms, footer, cookie banner, chat widgets, icons.
- Pillar 10, UX flow and next steps: primary CTA above the fold, competing CTAs, dead ends, contact paths (tap-to-call, WhatsApp, booking), response promise, confirmation, portal/login discoverability, 404 recovery, length of booking or checkout flow.
- Pillar 11, Content and messaging: value proposition in 5 seconds, outcomes vs features, jargon, scannability, outdated info, typos and duplicates, service pages, pricing signal, FAQ, case studies, CTA copy, "what happens next", specialism visibility.
- Pillar 12, Findability (search and AI answers): titles and H1, local signals (name, address, phone), Google Business Profile link, service and location pages, thin or duplicate content, FAQs as questions and answers, structured data, internal linking, facts that can be extracted.
- Pillar 13, Measurement, compliance flags, security hygiene, maintenance: observable signals only. Use "not detected" or "validate". Never say "non-compliant".
- Pillar 14, Process layer (Layer 2): see section G.

## F. Extended taxonomy (IDs continue from 30; severity in brackets)
Performance
30 PERF-LCP-SLOW: mobile LCP above 2.5s [L3]
31 PERF-CLS-HIGH: CLS above 0.1 [L3]
32 PERF-INP-BLOCKING: long main-thread tasks or INP above 200ms [L3]
33 PERF-HEAVY-PAGE: very large transfer, oversized or unoptimised images [L3]
34 PERF-RENDER-BLOCKING: render-blocking CSS or JS in the head [L2]
35 PERF-THIRDPARTY-BLOAT: heavy chat, tag or video scripts delaying load [L2]
36 PERF-NO-COMPRESSION-CACHE: no gzip/brotli or caching headers [L2]
37 PERF-FONTS-HEAVY: many font families or weights, flash of invisible text [L2]
Technical
38 TECH-MIXED-CONTENT: http assets on https pages [L3]
39 TECH-REDIRECT-CHAIN: more than 2 redirect hops or www/non-www conflicts [L2]
40 TECH-BROKEN-LINKS-IMAGES: internal 404s or broken images [L3]
41 TECH-NOINDEX-LIVE: noindex or robots disallow on money pages [L4]
42 TECH-STAGING-URL-LEAK: staging, localhost or preview URLs in links or metadata [L3]
43 TECH-CANONICAL-MISMATCH: canonical or og:url pointing at another domain [L3]
44 TECH-CONSOLE-ERRORS: runtime JS exceptions on load [L2]
45 TECH-NO-CUSTOM-404-OR-FAVICON: bare 404 page or missing favicon [L1]
46 TECH-SITEMAP-ROBOTS-MISSING [L2]
Mobile
47 MOBILE-STICKY-OVERLAP: sticky header or bar covers content or a CTA [L3]
48 MOBILE-POPUP-BLOCKS: popup or banner blocks the screen [L3]
49 MOBILE-MENU-BROKEN: hamburger menu fails or hides links [L4]
50 MOBILE-HOVER-ONLY: hover-only interactions [L3]
51 MOBILE-INPUT-TYPES: no type=tel/email or inputmode on fields [L2]
52 MOBILE-BREAKPOINT-BREAK: layout breaks at 320, 768 or 1024 [L3]
53 MOBILE-CAROUSEL-OVERFLOW: sliders or tables unusable on touch [L3]
54 MOBILE-TEXT-TOO-SMALL: body text under 16px [L2]
Visual and UI
55 UI-HIERARCHY-WEAK: no clear focal point or reading order [L3]
56 UI-CONTRAST-LOW: text or buttons below contrast ratios [L3]
57 UI-IMAGERY-GENERIC: low-res images, stock team photos [L2]
58 UI-TYPE-INCONSISTENT: mixed fonts, sizes or spacing [L2]
59 UI-AUTOPLAY-MEDIA: autoplay video or sound, heavy animation [L2]
60 UI-STALE-COPYRIGHT: footer year out of date [L1]
61 UI-TEMPLATE-LEFTOVER: lorem ipsum, theme-shop links, demo content (extends 23) [L3]
62 UI-NAV-OVERLOAD-OR-UNCLEAR: too many items or vague labels [L3]
63 UI-BUTTON-INCONSISTENT: mixed styles or no states [L2]
64 UI-LINKS-NOT-OBVIOUS: links that don't look clickable [L2]
65 UI-CHAT-WIDGET-COVERS-CTA [L3]
66 UI-ICONS-UNLABELLED [L2]
67 UI-FOOTER-WEAK: no contact details, links or legal [L2]
Forms and intake
68 INTAKE-NO-LABELS-OR-VALIDATION: placeholders as labels, vague errors [L3]
69 INTAKE-NO-RESPONSE-PROMISE: page doesn't say when to expect a reply [L3]
70 INTAKE-NO-AUTOCOMPLETE: missing autocomplete attributes [L2]
71 INTAKE-CONTACT-DETAILS-BURIED: phone or email only in the footer [L3]
72 UX-FORM-ONLY-NO-ALTERNATIVE: form is the only path, with no phone, WhatsApp or booking [L2, never the headline per Contact Form Baseline]
Content
73 CONTENT-VALUE-PROP-UNCLEAR: who, what and where not clear in 5 seconds [L4]
74 CONTENT-FEATURES-NOT-OUTCOMES [L2]
75 CONTENT-JARGON-WALL [L2]
76 CONTENT-OUTDATED-INFO: old hours, prices, news [L3]
77 CONTENT-TYPOS-DUPLICATES: typos, duplicated lines [L2]
78 CONTENT-NO-SERVICE-PAGES: all services on one page [L3]
79 CONTENT-NO-PRICING-SIGNAL [L2]
80 CONTENT-NO-FAQ [L2]
81 CONTENT-NO-CASE-STUDIES [L2]
82 CONTENT-WEAK-CTA: generic "submit" or "click here" [L2]
83 CONTENT-NO-NEXT-STEP-EXPLAINED: nothing says what happens after contact [L3]
84 CONTENT-SPECIALISM-BURIED: a key specialism appears only as a label with no page [L3]
Trust
85 TRUST-NO-REVIEWS-VISIBLE [L3]
86 TRUST-REVIEWS-UNLINKED: ratings shown with no source link [L3]
87 TRUST-NO-REGULATOR-OR-AML: where relevant [L3]
88 TRUST-NO-COMPANY-DETAILS: no address or company number [L3]
89 TRUST-NO-NAMED-PEOPLE [L2]
90 TRUST-NO-POLICIES: no privacy, terms or cookie pages [L3]
91 TRUST-UNEVIDENCED-CLAIMS: superlatives or statistics with no source [L3]
92 TRUST-FAKE-REVIEW-SIGNALS: identical wording, no source, stock-photo reviewers [L3]
UX flow
93 UX-NO-PRIMARY-CTA: nothing clear above the fold [L4]
94 UX-CTA-OVERLOAD: competing CTAs [L2]
95 UX-DEAD-END-PAGES: pages with no next step [L3]
96 UX-PORTAL-LOGIN-HIDDEN: client login hard to find [L2]
97 UX-404-NO-RECOVERY [L2]
98 UX-CHECKOUT-FRICTION: forced account, hidden fees, few payment options [L4]
99 UX-BOOKING-FLOW-LONG: too many steps or fields [L3]
Accessibility
100 A11Y-ALT-MISSING [L3]
101 A11Y-HEADING-ORDER [L2]
102 A11Y-NO-LANDMARKS-OR-SKIP-LINK [L2]
103 A11Y-FOCUS-NOT-VISIBLE [L3]
104 A11Y-UNLABELLED-INPUTS [L3]
105 A11Y-TEXT-SCALING-BREAKS: layout fails at 200% [L3]
106 A11Y-NO-CAPTIONS [L2]
107 A11Y-IGNORES-REDUCED-MOTION [L1]
Findability (search and AI answers)
108 SEO-TITLE-H1-WEAK: generic title, missing or multiple H1 [L3]
109 SEO-NO-LOCAL-SIGNALS: no town or area on the page [L3]
110 SEO-NAP-INCONSISTENT: name, address or phone differs between pages [L3]
111 SEO-NO-GBP-LINK [L2]
112 SEO-NO-SERVICE-LOCATION-PAGES [L3]
113 SEO-THIN-OR-DUPLICATE-CONTENT [L2]
114 SEO-NO-FAQ-QA-FORMAT [L2]
115 SEO-NO-STRUCTURED-DATA: no JSON-LD (extends Pillar 3) [L2]
116 SEO-INTERNAL-LINKING-WEAK [L1]
117 AEO-FACTS-NOT-EXTRACTABLE: key facts in images or hidden panels [L2]
Measurement (observable only: "not detected", never "misconfigured")
118 MEASURE-NO-ANALYTICS-DETECTED [L1]
119 MEASURE-NO-CONVERSION-TAGS-DETECTED [L1]
120 MEASURE-NO-CALL-TRACKING-DETECTED [L1]
Compliance flags (flag only, "not visible on public pages, validate")
121 COMPLY-COOKIE-CONSENT-NOT-VISIBLE [L2]
122 COMPLY-PRIVACY-INFO-MISSING [L3]
123 COMPLY-ACCESSIBILITY-STATEMENT-MISSING [L1]
124 COMPLY-CONSUMER-TERMS-MISSING: shops, refunds, delivery [L3]
125 COMPLY-CLAIMS-NEED-EVIDENCE [L3]
Security hygiene (passive only; never a lead angle, never mentioned in outreach)
126 SECURITY-HEADERS-MISSING (extends Pillar 5) [L2]
127 SECURITY-OUTDATED-CMS-VISIBLE: old version in markup [L2]
128 SECURITY-ADMIN-URL-EXPOSED [L2]
129 SECURITY-EMAIL-PLAINTEXT: scrapable addresses [L1]
130 SECURITY-NO-FORM-SPAM-PROTECTION [L2]
Maintenance
131 MAINT-PLUGIN-OR-BUILDER-BLOAT [L2]
132 MAINT-STALE-CONTENT: blog or news not updated [L2]
133 MAINT-DOMAIN-MISMATCH-IN-METADATA [L3]
134 MAINT-ABANDONED-PAGES: placeholder or empty pages live [L2]

## G. Layer 2 catalogue: process hypotheses (never "verified"; always "unknown, validate on the call", with the signal that triggered it)
- Form-only enquiry with no response promise: reply speed and out-of-hours handling unknown.
- No WhatsApp or booking option: speed-to-lead may be slow.
- No portal or upload link: documents likely arrive by email or post, so chasing may be manual.
- No deadline or MTD content (accountants): record chasing before quarterly deadlines may be manual.
- No onboarding explanation: engagement letter, ID/AML checks and authorisations may be slow.
- Few or unlinked reviews: no review-request process.
- No newsletter, reminders or sign-up: no client nurture or reactivation.
- No analytics detected: enquiry sources and conversion rate probably unknown.
- Multiple conflicting forms or contacts: enquiries may be routed inconsistently.
For each hypothesis suggest 1-2 questions to ask on the call.

## H. Industry modules (add when evidenced)
- Accountants: specialism and sector pages visible, MTD for Income Tax content, regulator and AML supervisor, client portal or uploads, pricing signal, named partners with credentials, onboarding explainer.
- Trades: area coverage, quote flow, photos of real work, accreditations and insurance, emergency contact, reviews.
- Clinics and health: booking, registration or regulator details, treatment pages, pricing, privacy of health data.
- Shops: product pages, checkout friction, delivery and returns, payment options, stock info.
- Estate and letting agents: valuation request flow, listings freshness, reviews on site, area pages, membership and redress information (validate).
- Hospitality: menu as text (not just PDF), booking, hours, allergen information (validate).

## I. Additional false-positive rules
- Bot-protection or CAPTCHA interstitials in a headless browser are not outages. Retry with a normal user agent and note "blocked to automation".
- Content in accordions, tabs and lazy-loaded sections is present. Check after interaction and scroll before claiming it is missing.
- Consent-gated or server-side analytics may not be visible. "Not detected" means unknown.
- Minimal design is not a defect. Flag only evidenced usability problems.
- Third-party widgets (chat, maps) blocked in headless mode are not broken.
- Mobile-menu items hidden until opened are not missing. Verify the open state.
- Missing security headers are hygiene (L2), never a lead angle and never mentioned to the prospect.
- Automated accessibility tools catch only part of the issues. Label results "automated check".
- Lab performance scores vary. Report the median of 3 runs.
- Geo-redirects may change content. Record the test location.

## J. Outreach additions (additive to Section 5)
- WhatsApp is the primary channel. Email and call script are optional extras.
- Voice is "we", not "I". Outcome-first.
- Structure each WhatsApp sequence as 1. Initial, 2. Observation, 3. Friction, 4. Solution, 5. Call?. Label the steps in the report only, not in the message copy. Send a step only if there is no reply.
- The first message includes "If you'd rather not hear from us, just say stop."
- Use one verified friction. Every claim maps to a finding id with evidence. No invented statistics and no claims about their business that we can't evidence.
- Never mention security headers or other Level 1-2 hygiene in outreach.
- Only promise a prototype or mock-up we will actually produce. Use {CALL_DATE}.
- Only business numbers they publish. Check the suppression list. No pricing in outreach.

## K. Output spec
Per site: one-page report readable on a phone (verdict and grade, build fingerprint, primary angle with evidence, up to two supporting points, full findings grouped by category with severity, unknown items to validate on the call), a JSON file and the screenshots, and the outreach copy (labelled WhatsApp sequence, plus optional email and call script). After the batch: summary table (site, platform, grade, primary angle, strongest friction), skill diff, new version and changelog.

## L. Tests and guardrails
- Tests fail if: two different sites produce the same finding set; any finding has no evidence; an unobservable item is marked verified; a message contains a claim with no matching finding id; a false-positive rule is violated (for example a honeypot field flagged); a Level 1-2 finding leads a message; or the first message lacks the stop line.
- Guardrails: public pages only, respect robots.txt and rate limits, no form submissions or logins, no scanning or exploitation, minimal data with source and date, no claims of legal compliance or non-compliance. If unsure, ask me.
