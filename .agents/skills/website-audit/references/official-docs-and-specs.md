# Official Documentation & Technical Specifications Reference

This reference manual documents the official specifications, RFCs, W3C standards, and browser engine documentation underpinning the **Full-Conscience Website Audit Protocol**. The agent must consult these authoritative sources whenever verifying standards compliance, scoring criteria, or citing remediation guidelines.

---

## 1. Google Core Web Vitals & Browser Performance Specs

| Standard / Guide | Authoritative Source | Primary URL | Key Audit Thresholds |
| :--- | :--- | :--- | :--- |
| **Core Web Vitals Overview** | Google Chrome DevRel | [web.dev/vitals](https://web.dev/vitals/) | LCP <= 2.5s, INP <= 200ms, CLS <= 0.10 |
| **Largest Contentful Paint (LCP)** | W3C / Google | [web.dev/articles/lcp](https://web.dev/articles/lcp) | 75th percentile of page loads; <= 2.5s Good, > 4.0s Poor |
| **Interaction to Next Paint (INP)** | W3C / Google | [web.dev/articles/inp](https://web.dev/articles/inp) | Replaced FID; measures worst 98th percentile event latency (<= 200ms) |
| **Cumulative Layout Shift (CLS)** | W3C / Google | [web.dev/articles/cls](https://web.dev/articles/cls) | Measures sum of layout shift fractions (<= 0.10 Good, > 0.25 Poor) |
| **Time to First Byte (TTFB)** | Google Web.dev | [web.dev/articles/ttfb](https://web.dev/articles/ttfb) | Target <= 800ms; measures server processing + network roundtrips |
| **Priority Hints API** | W3C Draft | [web.dev/articles/fetch-priority](https://web.dev/articles/fetch-priority) | `fetchpriority="high"`, `low`, or `auto` on `<img>`, `<link>`, `<script>` |
| **Speculation Rules API** | W3C / Chromium | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) | `<script type="speculationrules">` for next-gen instant prerendering |
| **Back/Forward Cache (bfcache)** | Chromium / WebKit | [web.dev/articles/bfcache](https://web.dev/articles/bfcache) | Eliminating unload handlers, `Cache-Control: no-store` prevents instant navigation |
| **HTTP/3 & QUIC Protocol** | IETF RFC 9114 | [datatracker.ietf.org/doc/html/rfc9114](https://datatracker.ietf.org/doc/html/rfc9114) | UDP-based multiplexed transport eliminating head-of-line blocking |

---

## 2. W3C Accessibility Standards (WCAG 2.2 AA)

The audit enforces compliance with the **Web Content Accessibility Guidelines (WCAG) 2.2**, published as a W3C Recommendation on 5 October 2023.

| WCAG 2.2 Criterion | Level | Specification Reference | Audit Verification Rule |
| :--- | :--- | :--- | :--- |
| **1.4.3 Contrast (Minimum)** | AA | [W3C WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Normal text >= 4.5:1 ratio; large text (>= 18pt or 14pt bold) >= 3:1 |
| **1.4.11 Non-text Contrast** | AA | [W3C WCAG 2.2 SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | UI components (inputs, borders, icons) >= 3:1 against background |
| **2.1.1 Keyboard Navigation** | A | [W3C WCAG 2.2 SC 2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | All functionality operable via Tab, Shift+Tab, Enter, Escape, Arrows |
| **2.1.2 No Keyboard Trap** | A | [W3C WCAG 2.2 SC 2.1.2](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | Focus must never be trapped in modals, drawers, or embedded iframes |
| **2.4.1 Bypass Blocks** | A | [W3C WCAG 2.2 SC 2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) | Skip-to-content link must be first focusable element in DOM |
| **2.4.11 Focus Appearance** | AA | [W3C WCAG 2.2 SC 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) | **New in 2.2**: Focus ring >= 2px thick with >= 3:1 contrast against unfocused state |
| **2.5.8 Target Size (Minimum)**| AA | [W3C WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | **New in 2.2**: Interactive targets >= 24x24 CSS px (48x48px mobile touch standard) |
| **3.2.6 Consistent Help** | A | [W3C WCAG 2.2 SC 3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) | **New in 2.2**: Support contact/chat placed in consistent order across views |
| **3.3.7 Redundant Entry** | A | [W3C WCAG 2.2 SC 3.3.7](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) | **New in 2.2**: Previously entered user info auto-populated in multi-step forms |
| **3.3.8 Accessible Authentication** | AA | [W3C WCAG 2.2 SC 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) | **New in 2.2**: No cognitive function tests (CAPTCHA/memorization) without fallback |
| **WAI-ARIA 1.2 APG** | Rec | [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) | Proper semantics for accordions, modals, tabs, dropdowns, combo boxes |

---

## 3. Google Search Central & Technical SEO Standards

| Standard / System | Authoritative Body | Specification Link | Core Verification Requirement |
| :--- | :--- | :--- | :--- |
| **Google Search Essentials** | Google Search Central | [developers.google.com/search](https://developers.google.com/search/docs/essentials) | Indexable HTML, mobile-first index, no deceptive cloaking or doorway pages |
| **Robots Exclusion Protocol** | IETF RFC 9309 | [datatracker.ietf.org/doc/html/rfc9309](https://datatracker.ietf.org/doc/html/rfc9309) | `robots.txt` syntax, `Disallow:`, `Allow:`, `Sitemap:` directives |
| **Canonical Link Relation** | IETF RFC 6596 | [datatracker.ietf.org/doc/html/rfc6596](https://datatracker.ietf.org/doc/html/rfc6596) | `<link rel="canonical" href="...">` self-referential declaration |
| **XML Sitemaps Protocol** | Sitemaps.org Alliance | [sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html) | Valid `<urlset>`, `<loc>`, `<lastmod>` (W3C Datetime), max 50,000 URLs / 50MB |
| **Open Graph Protocol** | Open Web Foundation | [ogp.me](https://ogp.me/) | `og:title`, `og:type`, `og:image` (1200x630px), `og:url`, `og:description` |
| **Twitter Cards Protocol** | X / Twitter Dev | [developer.twitter.com](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) | `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:image` |
| **Hreflang Multi-Regional** | Google Search Central | [developers.google.com/search/docs/specialty/international](https://developers.google.com/search/docs/specialty/international/localized-versions) | Bi-directional `<link rel="alternate" hreflang="..." href="...">` + `x-default` |

---

## 4. Schema.org Structured Data Specifications

Validates rich snippet eligibility in Google Search Results:

| Entity Type | Schema.org URL | Google Rich Result Documentation | Mandatory Attributes |
| :--- | :--- | :--- | :--- |
| **Organization** | [schema.org/Organization](https://schema.org/Organization) | [Google Org Documentation](https://developers.google.com/search/docs/appearance/structured-data/organization) | `name`, `url`, `logo`, `contactPoint`, `sameAs` (social profiles) |
| **WebSite & SearchAction** | [schema.org/WebSite](https://schema.org/WebSite) | [Google Sitelinks Searchbox](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox) | `name`, `url`, `potentialAction` (`SearchAction` with `query-input`) |
| **LocalBusiness** | [schema.org/LocalBusiness](https://schema.org/LocalBusiness) | [Google Local Business](https://developers.google.com/search/docs/appearance/structured-data/local-business) | `name`, `address` (PostalAddress), `telephone`, `geo`, `openingHours` |
| **Product & Offer** | [schema.org/Product](https://schema.org/Product) | [Google Product Snippets](https://developers.google.com/search/docs/appearance/structured-data/product) | `name`, `image`, `offers` (price, priceCurrency, availability) |
| **FAQPage** | [schema.org/FAQPage](https://schema.org/FAQPage) | [Google FAQ Rich Results](https://developers.google.com/search/docs/appearance/structured-data/faqpage) | `mainEntity` (`Question` array with `name` and `acceptedAnswer.text`) |
| **Article / BlogPosting** | [schema.org/BlogPosting](https://schema.org/BlogPosting) | [Google Article Documentation](https://developers.google.com/search/docs/appearance/structured-data/article) | `headline`, `image`, `datePublished`, `dateModified`, `author` |

---

## 5. Security Defense Headers & IETF RFC Standards

| Defensive Header | Specification / RFC | OWASP Guidance | Recommended Production Value |
| :--- | :--- | :--- | :--- |
| **Strict-Transport-Security** | [IETF RFC 6797](https://datatracker.ietf.org/doc/html/rfc6797) | [OWASP HSTS](https://owasp.org/www-project-secure-headers/#strict-transport-security) | `max-age=63072000; includeSubDomains; preload` |
| **Content-Security-Policy** | [W3C CSP Level 3](https://www.w3.org/TR/CSP3/) | [OWASP CSP](https://owasp.org/www-project-secure-headers/#content-security-policy) | `default-src 'self'; script-src 'self' 'nonce-...'; object-src 'none'; frame-ancestors 'none';` |
| **X-Content-Type-Options** | [Fetch Spec / MDN](https://fetch.spec.whatwg.org/#x-content-type-options-header) | [OWASP XCTO](https://owasp.org/www-project-secure-headers/#x-content-type-options) | `nosniff` (prevents MIME type confusion attacks) |
| **X-Frame-Options** | [IETF RFC 7034](https://datatracker.ietf.org/doc/html/rfc7034) | [OWASP Clickjacking](https://owasp.org/www-project-secure-headers/#x-frame-options) | `DENY` or `SAMEORIGIN` (prevents UI redress / clickjacking) |
| **Referrer-Policy** | [W3C Referrer Policy](https://www.w3.org/TR/referrer-policy/) | [OWASP Referrer-Policy](https://owasp.org/www-project-secure-headers/#referrer-policy) | `strict-origin-when-cross-origin` |
| **Permissions-Policy** | [W3C Permissions Policy](https://w3c.github.io/webappsec-permissions-policy/) | [OWASP Permissions-Policy](https://owasp.org/www-project-secure-headers/#permissions-policy) | `camera=(), microphone=(), geolocation=(), payment=()` |
| **Cookie Security Flags** | [RFC 6265bis](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis) | [OWASP Session Cookies](https://owasp.org/www-project-secure-headers/#set-cookie) | `Secure; HttpOnly; SameSite=Lax` (or `SameSite=Strict`) |

---

## 6. Mobile Viewport & Ergonomics Specifications

| Rule / Principle | Reference Standard | Technical Definition |
| :--- | :--- | :--- |
| **Dynamic Viewport Height (`dvh`)** | [W3C CSS Values Level 4](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths) | Use `100dvh` for full-screen hero / modals to avoid mobile address bar clipping. |
| **iOS Auto-Zoom Prevention** | [WebKit Form Guidelines](https://webkit.org/) | All `<input>`, `<select>`, `<textarea>` elements must have `font-size: >= 16px` on mobile screens to prevent iOS Safari auto-zooming. |
| **Touch Target Size** | [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) / Apple HIG | Minimum 48x48 CSS px bounding box (or 24x24 with sufficient clearance spacing). |
| **Safe Area Insets** | [CSS Round Display / WebKit](https://developer.apple.com/design/human-interface-guidelines/) | Fixed position navigation bars must include `padding-bottom: env(safe-area-inset-bottom);`. |
| **Horizontal Overflow Elimination** | CSS Overflow Level 3 | No element DOM bounding rect `right` coordinate may exceed `window.innerWidth`. |
