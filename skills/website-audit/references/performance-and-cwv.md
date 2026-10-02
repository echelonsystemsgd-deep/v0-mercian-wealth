# Core Web Vitals & Web Performance Technical Manual

Performance directly influences Google organic rankings (Search Signals for Page Experience) and user retention. This manual details how to audit, measure, and optimize modern web performance.

---

## 1. Google Core Web Vitals (CWV) Targets (2026 Standards)

| Metric | Full Name | Good (Green) | Needs Improvement (Amber) | Poor (Red) | What It Measures |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LCP** | Largest Contentful Paint | **<= 2.5 s** | 2.5 s – 4.0 s | > 4.0 s | Perceived loading speed of the primary content block. |
| **INP** | Interaction to Next Paint | **<= 200 ms** | 200 ms – 500 ms | > 500 ms | Visual responsiveness to all user clicks, taps, and keypresses. |
| **CLS** | Cumulative Layout Shift | **<= 0.10** | 0.10 – 0.25 | > 0.25 | Visual stability; absence of jarring shifts during page lifecycle. |
| **TTFB** | Time to First Byte | **<= 800 ms** | 800 ms – 1800 ms | > 1800 ms | Server response speed, DNS lookup, TLS handshake, and CDN routing. |
| **FCP** | First Contentful Paint | **<= 1.8 s** | 1.8 s – 3.0 s | > 3.0 s | Time until the browser renders the very first piece of DOM content. |

---

## 2. Largest Contentful Paint (LCP) Deep Dive

The LCP element is typically a hero banner, `<img>`, `<video>` poster, or large typography block.

### The 4 LCP Sub-Parts
```
[User Navigates] ──> [TTFB] ──> [Load Delay] ──> [Load Duration] ──> [Render Delay] ──> [LCP Done]
 Target:               <= 800ms     <= 200ms          <= 1000ms           <= 500ms        <= 2.5s
```

### Auditing Checklist for LCP:
1. **Identify the LCP Element**:
   - Inspect via Chrome DevTools Performance panel or Lighthouse: Look for `Largest Contentful Paint element`.
2. **Missing `fetchpriority="high"`**:
   - The primary hero image must always have `fetchpriority="high"` and `loading="eager"` (NEVER `loading="lazy"` on above-the-fold images).
3. **Preload Critical Resource**:
   - Add `<link rel="preload" as="image" href="..." fetchpriority="high">` in the HTML `<head>`.
4. **Format & Sizing**:
   - Check if image is delivered in modern AVIF or WebP format with appropriate responsive `srcset` / `sizes`.
5. **Render-Blocking CSS & JS**:
   - Audit all `<link rel="stylesheet">` and `<script>` tags in `<head>`. Any non-critical stylesheet delays LCP rendering.

---

## 3. Interaction to Next Paint (INP) Deep Dive

Replaced First Input Delay (FID) as an official Core Web Vital in March 2024. INP measures the latency of **every** interaction throughout the user's session and reports the worst 98th percentile.

### The 3 Phases of an Interaction:
1. **Input Delay**: Time waiting for main thread tasks to complete before the event handler starts.
2. **Processing Duration**: Time spent executing JavaScript callbacks (`onClick`, `onKeyDown`).
3. **Presentation Delay**: Time needed by the browser to recalculate style, layout, and composite the next frame on screen.

### Auditing Checklist for INP:
1. **Long Tasks (> 50ms)**:
   - Identify main-thread blocking tasks during page hydration.
2. **Heavy Event Handlers**:
   - Break large synchronous computations into chunks using `scheduler.yield()` or `requestAnimationFrame()`:
   ```javascript
   async function handleUserClick() {
     showImmediateLoadingState();
     // Yield to let the browser paint the button feedback immediately
     await (window.scheduler?.yield?.() || new Promise(r => setTimeout(r, 0)));
     processHeavyCartUpdate();
   }
   ```
3. **Debouncing & Throttling**:
   - Ensure input search fields, sliders, and scroll/resize listeners are debounced.
4. **Avoid Giant DOM Mutations**:
   - Swapping out thousands of DOM nodes synchronously spikes presentation delay. Use virtualized lists or pagination.

---

## 4. Cumulative Layout Shift (CLS) Deep Dive

CLS measures the total score of unexpected layout movement during the entire lifespan of the page.

### Formula:
`Layout Shift Score = Impact Fraction * Distance Fraction`

### Auditing Checklist for CLS:
1. **Unsized Media**:
   - Every `<img>`, `<video>`, `<iframe>`, and `<canvas>` must have explicit `width` and `height` attributes OR modern CSS `aspect-ratio`:
   ```css
   img.hero {
     width: 100%;
     height: auto;
     aspect-ratio: 16 / 9;
   }
   ```
2. **Dynamically Injected Content**:
   - Cookie banners, promotion bars, and late-loading ads must have reserved space in the initial layout. Never push down existing content after load.
3. **Web Font Layout Shift (FOIT / FOUT)**:
   - Use `font-display: optional` or configure `size-adjust`, `ascent-override`, and `descent-override` in `@font-face` so fallback fonts occupy the exact same physical space as the custom web font.

---

## 5. Technical Resource Budgets (Target Guidelines)

To maintain 90+ Lighthouse scores consistently across 4G mobile devices:

| Resource Type | Maximum Recommended Budget (Transfer Size) |
| :--- | :--- |
| **Initial HTML Document** | <= 35 KB (uncompressed) |
| **Critical CSS** | <= 50 KB (gzipped / brotli) |
| **Total JavaScript on Initial Path** | <= 180 KB (gzipped / brotli) |
| **Above-the-Fold Hero Media** | <= 150 KB (AVIF / WebP) |
| **Web Fonts** | <= 100 KB total (subsetted WOFF2 only) |
| **Total Page Payload (Initial Viewport)**| <= 1.2 MB |

---

## 6. HTTP Caching & Compression Standards

1. **Static Hashed Assets (`/_next/static/*`, `/assets/*`)**:
   ```http
   Cache-Control: public, max-age=31536000, immutable
   ```
2. **HTML Pages & Dynamic APIs**:
   ```http
   Cache-Control: public, max-age=0, must-revalidate
   ```
3. **Compression Protocol**:
   - Require **Brotli (`br`)** compression (provides 15–20% higher compression efficiency over legacy gzip).
