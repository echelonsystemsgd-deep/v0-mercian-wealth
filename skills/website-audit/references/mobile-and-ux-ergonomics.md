# Mobile Ergonomics & Viewport UX Audit Manual

With 60% to 80% of consumer traffic arriving from mobile devices (iOS Safari, Android Chrome, and in-app webviews from WhatsApp, Instagram, and Facebook), mobile ergonomics determine commercial success.

---

## 1. The Mobile Viewport Rules

### 1. Viewport Meta Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
> **Accessibility Critical**: Never include `user-scalable=no` or `maximum-scale=1.0`. Disabling pinch-to-zoom directly violates WCAG 1.4.4 (Resize Text) and blocks visually impaired users.

### 2. Elimination of iOS Safari Auto-Zoom
iOS Safari automatically zooms into the webpage whenever a user taps an `<input>`, `<select>`, or `<textarea>` whose CSS `font-size` is smaller than **16px**:
- **Defect**: This auto-zoom disorients the user, clips modal borders, and causes input fields to shift off-screen.
- **Remediation**: All form controls must enforce at least `font-size: 16px` on mobile viewports (`text-base sm:text-sm` in Tailwind CSS).

### 3. Dynamic Viewport Units (`dvh` vs `vh`)
Mobile address bars expand and collapse as users scroll:
- Traditional `100vh` uses the *maximum* possible height, causing bottom action buttons and sticky footers to be hidden underneath the browser address bar.
- Modern CSS should declare:
  ```css
  .modal-container {
    max-height: 90dvh; /* Dynamic Viewport Height */
  }
  ```

---

## 2. Touch Target Ergonomics & The "Thumb Zone"

### 1. The 48x48px Minimum Touch Target Rule
Human fingertips average 10–14mm in width.
- Primary interactive elements (buttons, links, form inputs, modal close buttons, accordion headers) must have a tap area of at least **48x48 CSS pixels**.
- Adjacent touch targets must maintain at least 8px of separation to eliminate mis-clicks.

### 2. Mobile Thumb-Zone Mapping
```
┌─────────────────────────────────┐
│        HARD TO REACH            │  <-- Secondary info, non-critical links
├─────────────────────────────────┤
│                                 │
│        NATURAL REACH            │  <-- Content reading, image carousels
│                                 │
├─────────────────────────────────┤
│        EASIEST TO REACH         │  <-- Primary CTA, Sticky "Buy Now" button,
│          (THUMB ZONE)           │      Filter toggles, Tab bars
└─────────────────────────────────┘
```
- Place high-intent actions (Checkout, Add to Cart, WhatsApp Chat, Pricing Selectors) within the bottom 40% of the screen.
- Implement sticky bottom action bars (`StickyFooterBar.tsx`) on mobile product and pricing pages.

### 3. Safe Area Insets (iPhone Home Indicator)
Sticky bottom bars must account for modern iPhone gesture bars:
```css
.sticky-footer {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

---

## 3. Horizontal Overflow ("Side-Scroll") Auditing

A page that allows accidental horizontal scrolling creates severe friction.

### Diagnostic Command (Chrome DevTools Console):
Run this snippet to find every element causing horizontal overflow:
```javascript
document.querySelectorAll('*').forEach(el => {
  if (el.offsetWidth > document.documentElement.offsetWidth) {
    console.warn('Overflowing Element:', el, el.offsetWidth, document.documentElement.offsetWidth);
  }
});
```

### Common Root Causes:
1. Hardcoded widths (e.g. `width: 480px` rendered on a 375px iPhone screen). Always use `max-width: 100%` or responsive utility classes.
2. Unconstrained tables, preformatted code blocks, or wide flex containers without `flex-wrap: wrap`.
3. Negative margins in grid systems (e.g. `-mx-4`) not counterbalanced by parent container padding.
4. Images missing `max-width: 100%; height: auto`.
