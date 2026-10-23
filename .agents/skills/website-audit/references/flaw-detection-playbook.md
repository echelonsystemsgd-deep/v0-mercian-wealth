# Flaw Detection & Commercial Barrier Playbook

This reference manual documents the exhaustive taxonomy of technical, structural, and commercial flaws that hinder websites from achieving organic reach, customer trust, and financial conversions. The agent must use this playbook to audit for both **active defects** (things broken) and **omission defects** (essential high-converting infrastructure that is missing).

---

## 1. Active Defects (Broken Functionality & Dead Ends)

| Defect Type | Flaw Description | Commercial Impact | Forensic Test / Detection Method |
| :--- | :--- | :--- | :--- |
| **Dead Placeholder Links** | Buttons or anchors with `href="#"`, `href=""`, or empty triggers. | User clicks expecting action; nothing happens; user abandons. | Search DOM for `a[href='#']` or `a[href='']` without click handlers. |
| **Broken Internal Links (404s)** | Navigation, footer, or CTA buttons linking to unrouted paths. | Destroys crawl equity; leads instantly bounce upon hitting a dead page. | Automated crawling of all internal hrefs; flag any HTTP >= 400. |
| **Image Asset Failures** | Broken `<img>` tags returning 404, missing files, or CORS failures. | Amateur visual appearance, layout shift, user mistrust. | Inspect network responses for all image `src` endpoints. |
| **Unresponsive Forms** | Form submissions that fail silently without success or error toasts. | High-intent leads lose their submission and leave frustrated. | Audit form submission handlers for error boundaries and feedback toasts. |
| **Broken Third-Party Embeds** | Blocked Calendly widgets, broken Stripe checkout modals, missing API keys. | Complete revenue blockage; orders and appointments cannot be finalized. | Inspect browser console for script loading blocks or CSP rejections. |

---

## 2. Omission Defects (Missing Commercial Engines)

High-performing websites do not merely avoid errors; they actively employ commercial conversion engines. The agent must flag whenever these essential components are missing:

| Missing Engine | Why It Is Essential | Symptoms of Absence | Drop-In Fix / Recommendation |
| :--- | :--- | :--- | :--- |
| **Rapid Messaging Channel** | Over 60% of UK mobile consumers prefer WhatsApp or tap-to-call over waiting for email responses. | No `wa.me/` or `tel:` links on mobile viewport. | Deploy floating WhatsApp action button with prefilled enquiry prompt. |
| **Risk-Reversal Guarantee** | Eliminates transaction anxiety for high-ticket services. | High cart/enquiry bounce rates on pricing or contact pages. | Add explicit 100% money-back or "Zero Disruption" guarantee badge. |
| **Social Proof Architecture** | Prospects rarely buy without peer validation. | Lack of client quotes, verified Trustpilot badges, or video reviews. | Embed real client outcomes, before/after statistics, or review carousels. |
| **Mobile Sticky CTA** | On long mobile landing pages, users lose the CTA when scrolling down. | High mobile drop-off after reading first 2 screens. | Implement sticky bottom bar (`fixed bottom-0 z-50`) with primary action button. |
| **Objection-Buster FAQ** | Unanswered questions (timeframe, guarantees, pricing) cause delay. | Users exit to research competitors. | Include interactive accordion FAQ answering top 5 buying hesitations. |
| **Clear Pricing Tiers** | Ambiguity causes prospects to assume prices are unaffordable. | High bounce on discovery call booking. | Expose transparent base pricing or instant cost estimate calculator. |

---

## 3. SEO & Organic Traffic Leakage

| Flaw | How It Hinders Success | Remediation |
| :--- | :--- | :--- |
| **Missing / Disallowing `robots.txt`** | Prevents Googlebot and Bingbot from understanding crawl boundaries and finding the sitemap. | Provide `/robots.txt` referencing `/sitemap.xml`. |
| **Missing or Outdated `sitemap.xml`** | Search engines miss newly deployed case studies, service pages, and blog posts. | Generate dynamic sitemap containing all indexable public URLs. |
| **Missing Open Graph Social Cards** | Links shared on WhatsApp, LinkedIn, X, or Slack display as plain text links without preview images. Slashing CTR by up to 80%. | Add `<meta property="og:image" content="...">` with 1200x630px high-contrast preview. |
| **Title / Meta Length Violations** | Search snippet text gets abruptly truncated with `...`, hiding the value proposition and CTA. | Enforce Title (50–60 chars) and Meta description (120–155 chars). |
| **Missing Schema.org JSON-LD** | Disqualifies website from Google rich snippets, knowledge graph cards, and local pack listings. | Deploy `Organization`, `LocalBusiness`, `Product`, or `FAQPage` JSON-LD schemas. |

---

## 4. Mobile UX & Viewport Traps

| Mobile Trap | Description | Fix |
| :--- | :--- | :--- |
| **iOS Input Auto-Zoom** | Form inputs with `font-size < 16px` trigger an annoying automatic zoom in Safari on iPhone, breaking viewport alignment. | Enforce `font-size: 16px` (or `text-base`) on all mobile input/select/textarea elements. |
| **Sub-48px Touch Targets** | Tappable links, buttons, or icons smaller than 48x48px cause mis-taps on smartphones. | Ensure all buttons and mobile nav links have at least 48x48px tappable area. |
| **Horizontal Content Overflow** | Fixed-width elements (e.g. `w-[600px]`) cause horizontal side-scrolling on narrow screens. | Enforce `max-w-full overflow-hidden` and relative containers. |
| **Viewport Scaling Locked** | `user-scalable=no` or `maximum-scale=1.0` traps users with visual impairments. | Maintain standard responsive viewport tag without user restrictions. |

---

## 5. Security & Legal Vulnerabilities

| Vulnerability | Legal / Operational Exposure | Corrective Action |
| :--- | :--- | :--- |
| **Missing Defensive HTTP Headers** | Exposes site to clickjacking, cross-site scripting (XSS), and MIME confusion attacks. | Implement HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. |
| **Missing Privacy Policy / Terms** | Violates UK GDPR / Data Protection Act 2018 and causes ad account bans on Google & Meta Ads. | Ensure active `/privacy` and `/terms` pages are linked from the site footer. |
| **Insecure Cookie Flags** | Exposes session cookies to interception or theft. | Enforce `Secure; HttpOnly; SameSite=Lax`. |

---

## 6. Professional Practice & Enrolment Journey Frictions (Intake & Conversion)

| Flaw ID | Friction Type | Description & Real-World Symptom | Severity | Forensic Detection Method | Anonymized Evidence Example | Source / Benchmark |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `INTAKE-POSTCODE-REQ` | **Mandatory Postal Address on Initial Enquiry** | Demanding full physical street address or postal code before an initial consultation. High mobile drop-off. | Level 4 (Major) | Inspect input labels: `input[name*='postcode'][required]`, `input[name*='address'][required]` on initial contact forms. | Form marked `Postcode (Required)` on 3-field contact page. | ISO 9241-110 (Dialogue Principles - Minimal User Input). |
| `TECH-CONTACT-404` | **Contact Slug 404 / Missing 301 Redirect** | Standard `/contact/` URL returns HTTP 404 because firm renamed the route (e.g. `/talk-to-us`) without 301 redirect. | Level 5 (Critical) | Request `domain.com/contact/` and `domain.com/contact-us/`. Flag if HTTP 404 while contact exists on custom slug. | `GET /contact/ -> 404 Not Found` while form lives on `/talk-to-us`. | RFC 9110 (HTTP Semantics - Redirection). |
| `INTAKE-DUAL-FORMS` | **Fragmented Dual-Form Confusion** | Multiple competing forms rendered side-by-side (e.g., Business vs Personal services) without guided triage wizard. | Level 4 (Major) | Detect multiple non-search `<form>` tags on `/contact` with overlapping target audiences. | Two separate forms on contact page: "Form 1: Business" vs "Form 2: Personal". | Hick-Hyman Law (Decision Time under Conflicting Choices). |
| `INTAKE-CORP-REQ` | **Mandatory Corporate Data on Private Client Services** | Forcing private individuals (e.g. seeking Wills, Trusts, or Personal Tax) to enter a mandatory "Company Name". | Level 4 (Major) | Contact forms offering private individual services that mark `company_name` as mandatory. | `Company Name: This is a required field` on a Wills & Trusts enquiry form. | Fitts's & Usability Heuristics (Error Prevention). |
| `INTAKE-SURPRISE-MODAL` | **Surprise Multi-Step Bait-and-Switch Modal** | Initial 2–3 field form triggers a full-screen overlay demanding 7+ additional fields, attribution dropdowns, and reCAPTCHA. | Level 4 (Major) | Intercept form submit event that reveals a hidden modal/overlay with > 4 new mandatory inputs. | Step 1 asks for Name/Email; clicking submit reveals a full-screen modal demanding 7 more fields + reCAPTCHA. | Nielsen Norman Group (Progressive Disclosure vs Deceptive Patterns). |
| `INTAKE-SLA-EXCESSIVE` | **Excessive Published Response Window (48h+)** | Publicly stating a 24-hour or 48-hour callback window, signalling slow operations during tax crunch. | Level 4 (Major) | Regex match on contact page copy: `within (?:24\|48) hours`, `within \d+ days`. | *"Fill in the form... we will get in touch within a 48 hour window."* | InsideSales / Harvard Business Review (Speed-to-Lead Response Decay). |
| `TECH-TEL-MALFORMED` | **Invalid Trunk-0 International Phone Link** | Contact link formats telephone number with international code and leading trunk zero (e.g. `tel:+4401...`), causing mobile dialler errors. | Level 4 (Major) | Regex search on `a[href^='tel:']` matching `tel:\+440\d+`. | `tel:+4401216670470` on practice contact cards. | ITU-T E.164 (International Public Telecommunication Numbering Plan). |
| `TECH-TEL-MISSING-HREF` | **Plain-Text Telephone Numbers (Missing `tel:` link)** | Phone numbers presented as static text or spans without a clickable `tel:` anchor, preventing 1-tap dialling on smartphones. | Level 4 (Major) | Detect UK phone regex patterns (`01\d{3}\s?\d{5,6}`, `07\d{3}\s?\d{6}`) in text nodes not enclosed in `a[href^='tel:']`. | Header displays `01753 539165` as plain text inside `<div>`. | WCAG 2.2 / Mobile Ergonomics (Tap Targets & Direct Action). |
| `INTAKE-BOOKING-FAKEOUT` | **Pseudo-Booking Selection (No Live Calendar)** | Dropdown promises "Book a Meeting / Video Call", but submits as an asynchronous email message with no calendar slot selection. | Level 4 (Major) | Form dropdown contains meeting/consultation booking options (`select option[value*='meeting'], option[value*='video']`) but form action posts to email endpoint without calendar embed. | Select option *"Book a Meeting / Video call"* submits to generic email inbox. | Nielsen Norman Group (Expectation Confirmation & UX Principle of Least Astonishment). |
| `BRAND-POSITIONING-DISCONNECT` | **Google Profile vs Live Site Positioning Disconnect** | Local search snippet / GBP claims broad SME/contractor compliance from £199, but site is completely repositioned to a niche vertical (e.g. Charities/SORP). | Level 3 (Moderate) | Compare meta title / Google listing snippet keywords against primary H1 and navigation service taxonomy. | Google Maps lists *"Affordable company tax filing from £199"*, while website homepage is *"Exclusive Charity & Non-profit Accounting"*. | Commercial Conversion Heuristics (Message-Match Consistency). |
| `MOBILE-ZOOM-DISABLED` | **Pinch-to-Zoom Disabled in Viewport** | Viewport meta specifies `user-scalable=0` or `maximum-scale=1.0`, blocking zoom on small text/numbers. | Level 4 (Major) | Inspect `meta[name='viewport']` for `user-scalable=0`, `user-scalable=no`, or `maximum-scale=1`. | `<meta name="viewport" content="...user-scalable=0">` on branch page. | WCAG 2.2 Success Criterion 1.4.4 (Resize text). |
| `INTAKE-BOOKING-ANCHOR-BAIT` | **Anchor-Jump Pseudo Booking CTA** | Prominent "Book a Meeting" button jumps to a static contact form rather than launching a live scheduler. | Level 4 (Major) | Inspect `a[href*='#wpcf7'], a[href*='#form']` whose anchor text promises booking/calendar appointment. | Header CTA *"Book a Meeting"* has `href="#wpcf7-f4421-p371-o1"`. | Nielsen Norman Group (Expectation Confirmation & Bait Patterns). |
| `TECH-TEL-ENCODED-SPACES` | **URL-Encoded Spaces in Phone Link** | `tel:` URI contains `%20` or literal whitespace, causing dialler syntax parse errors on mobile OS and VoIP softphones. | Level 3 (Moderate) | Regex search on `a[href^='tel:']` for `%20` or `\s`. | `<a href="tel:0203%20633%202018">` on mobile contact card. | RFC 3966 (The tel URI for Telephone Numbers - Global Phone Numbers). |
