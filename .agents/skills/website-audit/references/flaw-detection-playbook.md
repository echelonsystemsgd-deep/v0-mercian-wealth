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
| `TECH-WHATSAPP-WEB-TRAP` | **Desktop WhatsApp Web URL on Mobile** | WhatsApp link points to `web.whatsapp.com` instead of universal `wa.me/` protocol, breaking app handover on smartphones. | Level 4 (Major) | Search DOM for `a[href*='web.whatsapp.com']`. | `<a href="https://web.whatsapp.com/send?phone=+0044...">` on mobile contact page. | Meta WhatsApp Universal Links Guidelines. |
| `INTAKE-FORM-OMISSION` | **Complete Omission of Digital Contact Form** | Dedicated `/contact/` URL provides only static text (email/phone/fax) with zero interactive intake form or booking tool. | Level 4 (Major) | Contact page contains 0 `<form>` elements and 0 embedded calendar widgets. | `/contact/` route has no inputs, only static text and a fax number. | Conversion Rate Optimization & Lead Capture Standards. |
| `SECURITY-CAPTCHA-DISTORTED-IMAGE` | **Archaic Distorted Alphanumeric CAPTCHA** | Form requires manual deciphering of distorted image characters, causing 40%+ mobile validation failure. | Level 4 (Major) | Form contains `input[name*='cap']` paired with dynamic image verification rather than modern invisible reCAPTCHA/Cloudflare Turnstile. | Form requires typing distorted letters from `Captcha (spam protection code)`. | W3C / Inaccessibility of CAPTCHA (Research Report). |
| `TECH-DNS-CLOUDFLARE-1000` | **Cloudflare DNS Error 1000 (Prohibited IP)** | Website DNS A records resolve to Cloudflare prohibited IPs or loopback, rendering entire site 100% inaccessible with HTTP 403. | Level 5 (Critical) | Request public domain; match Cloudflare error screen `DNS points to prohibited IP` and HTTP status 403. | `Error 1000 Ray ID: ... DNS points to prohibited IP` live on practice domain. | Cloudflare Support / RFC 1035 (DNS Specification). |
| `FORM-HONEYPOT-EXPOSED` | **Exposed Anti-Spam Honeypot Field** | Hidden honeypot field displays visible label or input to human visitors (e.g. "Do not fill this field"), confusing users. | Level 3 (Moderate) | Search form DOM for unhidden inputs or labels containing `do not fill`, `honeypot`, `leave empty`. | Contact form displays text *"Do not fill this field"* above name input. | Nielsen Norman Group (Form Usability & Error Prevention). |
| `BRAND-REGIONAL-DIALLER-MISMATCH` | **Regional Area Code / Dialler Mismatch** | Local practice located in one region (e.g. Slough) advertises exclusively out-of-area telephone codes (e.g. 0208/0207 London), raising suspicion of non-local operation. | Level 3 (Moderate) | Compare postal address town code against UK telephone area code prefixes on contact page. | Practice at Regal Court Slough displays only Chessington 0208 number. | Commercial Trust Heuristics (Local Presence Validation). |
| `TECH-WP-CRITICAL-ERROR` | **WordPress Fatal Critical Error (WSOD)** | Fatal PHP crash displaying *"There has been a critical error on this website. Learn more about troubleshooting WordPress"*, completely blocking all visitor traffic. | Level 5 (Critical) | Request public domain; match WordPress critical error text and HTTP status 500/200. | `WordPress › Error - There has been a critical error on this website` live on practice site. | WordPress Official Troubleshooting & Architecture Standards. |
| `UI-DUMMY-PLACEHOLDER-LEFTOVER` | **Unreplaced Theme Placeholders & Dummy Copy** | Developer demo placeholders left published live (e.g. `+44 1234 567890`, `your@email.com`, `City, Zip code`, `some-randome-random`). | Level 4 (Major) | Regex search on DOM text for `1234 567890`, `your@email.com`, `lorem ipsum`, `Business title, Street address`. | Header displays `+44 1234 567890` and form has field `some-randome-random`. | Commercial Conversion Heuristics (Trust & Completeness). |
| `UI-HERO-COUNTER-ZERO-STUCK` | **Broken Social Proof Metrics Stuck at Zero** | Animated statistical counters fail to initialize or hardcode zero metrics (e.g. `0+ Satisfied Clients`, `0% Client Retention`). | Level 4 (Major) | Detect counter elements with regex `0\+?\s*(?:clients\|reviews\|served)` or `0%\s*(?:retention\|satisfaction)`. | Homepage displays `0+ SATISFIED CLIENTS` and `0% CLIENT RETENTION`. | Social Proof & Conversion Rate Optimization Principles. |
| `SECURITY-CAPTCHA-QUOTA-EXCEEDED` | **reCAPTCHA Enterprise Free Quota Exceeded Blocker** | Google reCAPTCHA widget displays *"This site is exceeding reCAPTCHA Enterprise free quota"*, failing token validation and blocking lead submissions. | Level 5 (Critical) | Detect DOM text or iframe containing `exceeding reCAPTCHA Enterprise free quota` or `reCAPTCHA error: quota exceeded`. | Form displays *"This site is exceeding reCAPTCHA Enterprise free quota"* and rejects contact queries. | Google Cloud reCAPTCHA Enterprise SLA & Quota Policies. |
| `TECH-SSL-EXPIRED-SELF-SIGNED` | **Expired or Self-Signed SSL Security Interstitial** | Server delivers an untrusted, self-signed, or expired SSL certificate (e.g. expired years ago), triggering Chrome/Edge `NET::ERR_CERT_AUTHORITY_INVALID` red warning screen. | Level 5 (Critical) | TLS handshake inspection; verify peer certificate expiry date (`cert.valid_to < Date.now()`) or self-signed CA. | Chrome full-screen red warning: *"Your connection is not private"* caused by certificate expired Nov 2021. | CA/Browser Forum Baseline Requirements / RFC 5280. |
| `TECH-DNS-UNRESOLVED` | **Complete DNS NXDOMAIN / Unrouted Nameserver Outage** | Domain has no active NS or A/CNAME records resolving to a host (`ENOTFOUND` / `net::ERR_NAME_NOT_RESOLVED`), rendering site 100% offline. | Level 5 (Critical) | DNS resolve apex and www for A, CNAME, and NS records; flag if all return `ENOTFOUND`. | Browser displays *"This site can't be reached - Server IP address could not be found"* (`ERR_NAME_NOT_RESOLVED`). | RFC 1034 / RFC 1035 (Domain Names Implementation & Specification). |
| `UI-SCRAPED-TEXT-ARTIFACT` | **Scraper & CMS Leftover Hyperlink Artifacts** | Uncleaned text artifacts left in public body copy (e.g. *"See more at: http://domain.com/..."*), signaling zero quality assurance. | Level 3 (Moderate) | Text inspection for patterns like `See more at: http`, `Read more at:`, `Source: [url]`. | Directions copy states: *"173 is easy to spot as it has a hedge in front of it. - See more at: http://accountantsslough.com/start-ups.html"*. | Content Quality & Brand Integrity Guidelines. |
| `BRAND-KEYWORD-STUFFING-STRIP` | **Archaic SEO Keyword Stuffing Rows** | Visible raw keyword strips (e.g. *"Accountant in Slough ~ Accountants in Reading ~ Tax Advisors in Slough..."*) published in headers or footers. | Level 3 (Moderate) | Detect repeated tilde or pipe-separated geographic keyword chains (`\w+\s+in\s+[A-Z]\w+\s*~\s*\w+`). | Header sub-strip: *"Accountant in Slough ~ Accountants in Reading ~ Tax Advisors in Slough ~ Payroll Services in Slough"*. | Google Search Essentials (Spam Policies - Keyword Stuffing). |

---

## 7. False-Positive Traps (Do NOT Flag as Frictions)

To maintain absolute diagnostic integrity and avoid prospect embarrassment, the agent must NEVER flag the following technical artifacts as visual or commercial frictions:

| False-Positive Trap | Why It Is NOT a Friction | Ground-Truth Verification Rule |
| :--- | :--- | :--- |
| **CSS-Hidden Honeypot Fields** | Forms often include fields like `name="honeypot"` or labels like *"Do not fill this field"* that are hidden with CSS (`width: 1px; height: 1px; opacity: 0; position: absolute; left: -9999px;` or `display: none;`). | **Never cite as a human visual defect.** Inspect computed CSS styles in headless browser. If `display: none`, `visibility: hidden`, `opacity: 0`, or dimensions `<= 1px`, it is completely invisible to human visitors. |
| **Controlled React/Vue State Forms (Missing `name` attributes)** | Modern SPA forms built with React, Vue, or Next.js manage input state via controlled hooks (`useState`, `v-model`) and submit directly to Supabase, Firebase, or GraphQL endpoints without needing native HTML `name` or form `action` attributes. | **Never claim the form is broken.** Inspect the compiled JavaScript bundle or network requests on form interaction. If the input updates component state or triggers an API payload (`supabase.from('leads').insert(...)`), the form is 100% operational. |
| **Standard Baseline Contact Forms (No Live Calendar)** | The normal baseline for 90% of UK professional service firms is an asynchronous contact form (Name, Email, Phone, Message) answered by office staff. | **Never make "no booking calendar" the primary friction.** Only flag intake when forms are actively broken, exceed 6+ mandatory fields without progress indicators, or demand intrusive data (like personal home addresses for corporate consultations). |
| **Subpage 404 vs Homepage Contact Form** | An internal subpage URL (e.g. `/contact.html`) might return a 404 or redirect, while the practice has consolidated all intake onto a polished, high-converting homepage contact form. | **Always cross-verify both homepage and subpages.** If the homepage provides a working, visible contact form and clickable diallers, do not claim the practice has no contact channel. |
