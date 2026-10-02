# Web Security, Defense Headers & Privacy Compliance Manual

Web security protects customer transactions, credentials, and business reputation from injection attacks, clickjacking, and data compromise.

---

## 1. Essential HTTP Security Defense Headers

Every production web application should return these 6 defensive HTTP response headers:

| Header | Recommended Production Value | Security Protection |
| :--- | :--- | :--- |
| **Strict-Transport-Security** (HSTS) | `max-age=63072000; includeSubDomains; preload` | Forces browsers to communicate exclusively over HTTPS for 2 years. Prevents SSL-stripping and man-in-the-middle attacks. |
| **Content-Security-Policy** (CSP) | Tailored policy (see section 2 below) | Restricts authorized sources of scripts, styles, iframes, and network requests. Defends against Cross-Site Scripting (XSS). |
| **X-Content-Type-Options** | `nosniff` | Prevents browsers from MIME-sniffing a response away from the declared Content-Type, mitigating drive-by executable attacks. |
| **X-Frame-Options** | `DENY` or `SAMEORIGIN` | Disallows embedding the site inside external `<iframe>` tags, completely neutralizing Clickjacking attacks. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Sends full URL as referrer when navigating on the same origin, but only transmits the domain origin across external sites. |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=(), payment=(self)` | Disables unneeded browser APIs and hardware access, preventing malicious third-party scripts from activating sensors. |

---

## 2. Content Security Policy (CSP) for PayPal & Modern Next.js

Modern e-commerce and streaming web applications with PayPal integrations require a tuned CSP that permits legitimate payment iframes and telemetry while blocking malicious scripts:

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.sandbox.paypal.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://api-m.paypal.com https://api-m.sandbox.paypal.com https://www.paypal.com;
  frame-src 'self' https://www.paypal.com https://www.sandbox.paypal.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
```

---

## 3. Cookie Security & Session Hardening

Cookies storing authentication tokens, cart identifiers, or session IDs must declare three security flags:

```http
Set-Cookie: session_token=abc123xyz; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=2592000
```

1. **`Secure`**: Guarantees the cookie is never transmitted over unencrypted HTTP.
2. **`HttpOnly`**: Blocks client-side JavaScript (`document.cookie`) from reading the cookie, making session theft via XSS impossible.
3. **`SameSite=Lax` (or `Strict`)**: Restricts cookie transmission on cross-site requests, providing robust protection against Cross-Site Request Forgery (CSRF).

---

## 4. Privacy & Regulatory Compliance (GDPR, UK DPA, ePrivacy)

1. **Consent Before Execution**:
   - Marketing/tracking scripts (Meta Pixel, Google Tag Manager, TikTok Pixel) must **not** fire before the user grants explicit affirmative consent on the cookie banner.
2. **Pre-Checked Checkboxes Prohibition**:
   - Marketing opt-in checkboxes must never be pre-checked by default.
3. **No Mixed Content**:
   - Every script, image, stylesheet, and font must be delivered over `https://`. A single `http://` asset generates a browser security warning and destroys customer payment trust.
4. **Form Submission Security**:
   - Never pass sensitive information (passwords, MAC addresses, emails, credit card data) via HTTP `GET` query strings, which get permanently recorded in browser history and server access logs.
