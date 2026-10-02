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
