# Technical SEO, Metadata & Schema.org Structured Data Manual

Technical SEO ensures search engines can effortlessly crawl, understand, and index a website, while structured data (JSON-LD) enables rich snippet enhancements in Google Search results.

---

## 1. Indexability & Crawl Architecture

### 1. The Robots.txt File (`/robots.txt`)
- Must reside at root: `https://example.com/robots.txt`.
- Clean directives allowing search bots:
  ```txt
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /admin/
  Disallow: /checkout/

  Sitemap: https://example.com/sitemap.xml
  ```
- **Audit Alert**: Ensure CSS, JavaScript, and font assets are NOT disallowed, as Googlebot needs them to render the visual page for mobile-friendliness and layout evaluation.

### 2. XML Sitemap (`/sitemap.xml`)
- Must list all canonical, indexable URLs with `<lastmod>` timestamps.
- Exclude `noindex` pages, redirected URLs (301), and error URLs (404).

### 3. Canonical Tags (`<link rel="canonical" href="...">`)
- Every page must declare a self-referential canonical tag pointing to its authoritative URL.
- Resolves duplicate content issues:
  - `http://` vs `https://`
  - `www.example.com` vs `example.com`
  - Trailing slashes (`/plans` vs `/plans/`)
  - Campaign tracking UTM parameters (`?utm_source=...`)

---

## 2. On-Page Metadata Standards

### 1. Title Tag (`<title>`)
- **Length**: 50–60 characters (max 580px width on desktop SERP).
- **Structure**: `[Primary High-Intent Keyword] - [Secondary Context] | [Brand]`
  - *Example*: `UK Indian TV Streaming Pass - 350+ Channels | ChitramTV UK`
- **Audit Check**: Avoid keyword stuffing or duplicate titles across different pages.

### 2. Meta Description (`<meta name="description" content="...">`)
- **Length**: 120–155 characters.
- **Goal**: Serve as a high-converting advertisement in search engine results. Must include a clear value proposition and call-to-action (CTA).
  - *Example*: `Stream 350+ live Indian TV channels in 4K with 7-day catch-up. Instant activation on Firestick, Smart TV, and mobile from £6.43/mo. Start watching now.`

### 3. Open Graph (Social Sharing Meta)
Ensures links shared on WhatsApp, Facebook, LinkedIn, Twitter/X, and Slack render high-converting card previews:
```html
<meta property="og:title" content="UK Indian TV Streaming Pass - 350+ Channels" />
<meta property="og:description" content="Stream 350+ live Indian TV channels in 4K with 7-day catch-up. Instant activation under 2 minutes." />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/plans" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://example.com/og-image.jpg" />
```

---

## 3. Schema.org JSON-LD Structured Data

Google strongly recommends **JSON-LD** formatted structured data embedded within a `<script type="application/ld+json">` tag in the `<head>` or body.

### 1. Organization / Local Business Schema
Identifies the business entity, logo, and verified support channels:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ChitramTV UK",
  "url": "https://chitramtv.co.uk",
  "logo": "https://chitramtv.co.uk/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-7123-456789",
    "contactType": "Customer Support",
    "availableLanguage": ["English", "Hindi", "Punjabi", "Tamil"]
  }
}
```

### 2. Product & Pricing Offer Schema (Rich Snippets)
Enables price, availability, and currency to display directly in Google search listings:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "12+2 Months Annual Streaming Pass",
  "image": "https://chitramtv.co.uk/images/plans/annual.jpg",
  "description": "14-month full access to 350+ channels in 4K with catch-up.",
  "sku": "CTV-SUB-14M",
  "offers": {
    "@type": "Offer",
    "price": "89.99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock",
    "url": "https://chitramtv.co.uk/plans"
  }
}
```

### 3. FAQPage Schema (Expandable Rich Snippets)
Allows frequently asked questions to appear as rich accordions directly on Google's search result page:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How quickly are streaming credentials delivered?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credentials are automatically dispatched via WhatsApp and Email within 60 to 120 seconds of payment confirmation."
      }
    }
  ]
}
```

---

## 4. Technical SEO Audit Checklist

```text
[ ] Canonical URL tag present on all public pages
[ ] Robots.txt present and not blocking critical assets
[ ] XML Sitemap submitted and containing 200 OK URLs only
[ ] Page title between 50-60 characters with primary target keyword
[ ] Meta description between 120-155 characters with clear CTA
[ ] Open Graph tags (og:title, og:description, og:image 1200x630) configured
[ ] Twitter card set to summary_large_image
[ ] Valid JSON-LD Schema.org structured data embedded (Product, FAQPage, Organization)
[ ] Zero 404 broken internal links or 301 redirect chains
[ ] Proper hreflang tags for multi-language or multi-region targeting
```
