# The Master Forensic Rubric: 36-Point Commercial Flaw & Friction Engine

This document represents the definitive, exhaustive inspection rubric for evaluating prospective client websites across all industries. When auditing any website, the AI must evaluate all five dimensions systematically:

---

## Pillar 1: Visual Architecture & Touch Ergonomics (The Eyeball & Thumb Test)

1. **The Hero Fold Wasteland**:
   - Giant photographic hero or oversized header banner (taking >45% of vertical viewport) that pushes core services, value propositions, and action buttons completely off-screen.
2. **Desktop Hamburger / Sandwich Menu Anti-Pattern**:
   - Hiding navigation behind a 3-bar hamburger icon on desktop (1920px screen width) where ample horizontal space exists. Creates unnecessary cognitive and physical click friction (e.g. *Upstudi*).
3. **Sub-48px Touch-Target Traps**:
   - Mobile buttons, phone links, or menu items smaller than 48x48px, or crowded within <8px of adjacent links, violating WCAG ergonomics and causing fat-finger misclicks.
4. **Horizontal Viewport Overflow ("Side-Scroll Bug")**:
   - Fixed-width containers (`width: 1200px`), tables, or images causing horizontal scrollbars on mobile (390px viewport width).
5. **Cumulative Layout Shift (CLS) Media Jumps**:
   - Rendered images lacking explicit `width` and `height` attributes or CSS `aspect-ratio`, causing text and buttons to jump violently during image hydration.
6. **Legibility & Contrast Failures**:
   - Low-contrast text (e.g. light grey copy `#999` on white background `#FFF`, or white text overlaid directly onto busy photographic backgrounds without a darkened scrim/overlay).
7. **Typography Chaos**:
   - Utilizing 4+ disjointed font families, inconsistent header scaling (e.g. `<h3>` rendering larger than `<h2>`), or erratic font weights.
8. **Awkward Whitespace & Grid Alignment Collapse**:
   - Columns breaking unexpectedly into uneven vertical gaps, orphan text lines, or unbalanced grid gutters.

---

## Pillar 2: Copywriting, Messaging & Value Proposition (The 5-Second Commercial Test)

9. **The Vague Slogan Disease (Zero Commercial Proposition)**:
   - Reliance on passive corporate cliches (*"Excellence in service"*, *"Your trusted partner"*, *"Innovating for tomorrow"*, *"Talking your language"*) without explaining who the firm serves, what it delivers, or why it matters.
10. **The Negative Framing Trap**:
    - Opening with negative or defensive statements (e.g. *"We do not want to be your accountant"*, *"We don't work with small clients"*), alienating qualified prospects within their first 3 seconds on site.
11. **Wall-of-Text Fatigue (Cognitive Overload)**:
    - Dense 10-line text paragraphs without bullet points, bold keyphrases, or scannable subheadings, inducing immediate reader fatigue (e.g. *G Builders*).
12. **Copy, Grammar, & Currency Mismatch**:
    - Spelling errors in primary navigation (e.g. *"COMPANY REGISTERATION"*), mixed currency symbols (£ vs $), or absurd price bracket claims (*"ranging from £150 million to £1500- dollars"*).
13. **Self-Obsessed vs. Outcome-Obsessed Phrasing**:
    - Over 80% of sentences leading with *"We are"*, *"We do"*, *"Our history since 1995"*, rather than addressing customer problems, time saved, risks removed, or financial clarity.
14. **Features Without Benefits ("The Who Cares? Test")**:
    - Listing technical software or tools (e.g. *"Xero Certified"*, *"Hydraulic Lift Available"*) without explaining the commercial outcome (*"Never manually chase receipts again"*, *"Same-day emergency dispatch"*).
15. **Target Audience Ambiguity**:
    - Failing to specify business scale, geography, or industry focus, forcing enterprise directors and sole traders into the same generic messaging.

---

## Pillar 3: Commercial Funnel, Intake & Friction Traps (The Money Leak)

16. **Static Multi-Field Forms vs. Instant Live Scheduling**:
    - Forcing high-intent buyers into 8+ field contact forms with 24–48 hour turnaround instead of offering an instant 1-click calendar slot (Calendly, Cal.com) or tap-to-call action.
17. **Missing Rapid Mobile Channels (Tap-to-Call & WhatsApp)**:
    - Telephone numbers displayed as plain static text or images rather than active `href="tel:..."` links, or total lack of a floating WhatsApp link for mobile buyers.
18. **The Navigation "Service Dump" Overload**:
    - Stuffing 20–30 separate micro-services in ALL CAPS across the main navbar, inducing decision paralysis rather than guiding prospects into 3 clean client tiers.
19. **The PDF Menu / Brochure Download Trap**:
    - Forcing mobile users to download a multi-megabyte PDF brochure or menu that cannot be read comfortably on a phone without pinch-zooming.
20. **Zero Risk Reversals & Guarantees**:
    - Total absence of guarantees (e.g. *"Zero-Disruption Guarantee"*, *"Fixed-Fee Quote Guarantee"*), leaving the buyer bearing 100% of the perceived hiring risk.
21. **Unsubstantiated or Anonymous Social Proof**:
    - Anonymous review quotes (*"Great work! - J. Smith"*) without verified client photos, company names, or clickable Google/Trustpilot review links.
22. **CTA Conflict & Visual Demotion**:
    - Competing button colors, multiple contradictory primary actions (*"Get Started"*, *"Learn More"*, *"Download Whitepaper"*, *"Call Us"*), or primary buttons styled as faint transparent outlines.

---

## Pillar 4: Technical Integrity & Scaffolding Leftovers (Trust Killers)

23. **ThemeForest / Demo Template Leftovers**:
    - Live navigation menus exposing unfinished demo scaffolding (*"Home Classic"*, *"Home Conference"*, *"Header Style Two"*, *"Meetup"*), destroying institutional trust (e.g. *RK Partners*).
24. **Broken Code & Raw Template Placeholders in UI**:
    - Action buttons or text blocks rendering raw unparsed script variables (`"+cancelButtonText+"`, `"+okButtonText+"`, `[object Object]`).
25. **Dead Placeholder Links (`href="#"`)**:
    - Header search icons, social badges, or consultation buttons linking to `href="#"` or `javascript:void(0)` that produce no-op dead clicks.
26. **Empty Heading Tags & SEO Structure Failures**:
    - Rendering empty `<h1>&nbsp;</h1>` tags, duplicate H1 tags, or missing H1 tags entirely, depressing organic search ranking and screen reader clarity.
27. **Unrendered Client-Side SPA Shells**:
    - Single-page JavaScript apps delivering a blank initial HTML body without pre-rendered content and with empty `<title></title>` tags, causing slow hydration and blank crawler indexing.
28. **Third-Party Directory Trap**:
    - Business operating solely from an unverified directory profile (Yell, Bark, Splinternet) with surrounding competitor ads rather than owning an authoritative domain.
29. **Missing Compliance Anchors (UK GDPR / Privacy)**:
    - Missing Privacy Policy or Terms of Service links in the footer, disqualifying the site from Google Ads / Meta Ads verification and violating UK GDPR.
30. **Broken Image / Mixed Content Endpoints**:
    - Broken image thumbnails, missing SVG assets, or insecure HTTP asset requests on HTTPS domains.

---

## Pillar 5: Industry-Specific Deep Rubrics

### 31. Accounting, CPAs & Tax Advisory
- Check for tax season intake friction, HMRC penalty deadline relief, ACCA/ICAEW/AAT accreditations, and cloud software stack (Xero, Dext, QuickBooks).

### 32. Trades, Construction & Contractors
- Check for emergency quote speed, verified before/after project briefs (not loose photo dumps), insurance/licensing badges, and trade accreditations (Gas Safe, NICEIC, FMB).

### 33. Private Medical & Aesthetic Clinics
- Check for discrete 2-click booking, upfront consultation deposit capture, CQC/GDC regulatory credentials, and treatment recovery time transparency.

### 34. Legal & Commercial Solicitors
- Check for practice area specialization, partner credentials, confidential intake security, and statutory SRA/Law Society entity numbers.

### 35. Hospitality & Destination Venues
- Check for instant mobile reservation widgets (OpenTable/SevenRooms), dynamic HTML menus (no PDFs), atmospheric photography, and clear parking/hours details.

### 36. Local Service Businesses
- Check for localized geographic root validation (service areas), upfront pricing guidance, and Google Reviews badge integration.
