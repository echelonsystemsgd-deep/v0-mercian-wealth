# Web Content Accessibility Guidelines (WCAG 2.2) Audit Manual

Accessibility (a11y) is both an ethical mandate and a legal requirement under the **Americans with Disabilities Act (ADA)**, **Section 508**, and the **European Accessibility Act (EAA 2025)**.

This manual outlines the inspection protocols for WCAG 2.2 Level A and Level AA compliance.

---

## 1. Key WCAG 2.2 New Success Criteria (Published October 2023)

| Criterion | Level | Requirement | Audit Check |
| :--- | :--- | :--- | :--- |
| **2.4.11 Focus Appearance** | AA | Keyboard focus indicators must have an area of at least 2px perimeter with a 3:1 contrast ratio against the unfocused state. | Never use `outline: none` without a high-visibility replacement. Focus ring must contrast strongly against the background. |
| **2.4.12 Focus Not Obscured** | AA | When an element receives keyboard focus, it must not be completely hidden by sticky headers, footers, or banners. | Ensure sticky headers have `scroll-margin-top` on anchor targets so focused elements remain visible. |
| **2.5.8 Target Size (Minimum)** | AA | Interactive touch targets must be at least **24x24 CSS pixels**, or have sufficient spacing to adjacent targets. | For mobile ergonomics, recommend **48x48px** minimum for primary touch targets. |
| **3.3.7 Redundant Entry** | A | Information previously entered by the user in the same session must be auto-populated or available for selection. | In multi-step checkout/forms, billing address should allow "Same as shipping address" toggle. |
| **3.3.8 Accessible Authentication** | AA | Cognitive function tests (e.g. solving puzzles, remembering passwords) must not be mandatory for login. | Password inputs must allow copy-paste from password managers; support WebAuthn / Passkeys. |

---

## 2. Core Four Principles: POUR Framework

### Principle 1: Perceivable
1. **Non-Text Content (SC 1.1.1 - Level A)**:
   - Meaningful images must have descriptive `alt` text explaining their context.
   - Purely decorative images/icons must have `alt=""` and `aria-hidden="true"`.
   - SVG icons used as buttons must include an `aria-label` or `<title>` element.
2. **Contrast (Minimum) (SC 1.4.3 - Level AA)**:
   - **Normal text** (< 18pt or < 14pt bold): Minimum **4.5:1** contrast ratio against background.
   - **Large text** (>= 18pt or >= 14pt bold): Minimum **3:1** contrast ratio.
3. **Non-Text Contrast (SC 1.4.11 - Level AA)**:
   - Form field borders, icons, toggle switches, and focus indicators must achieve at least **3:1** contrast ratio against adjacent colors.
4. **Resize Text (SC 1.4.4 - Level AA)**:
   - Text must be scalable up to 200% without loss of content or functionality. Never use fixed pixel heights on text containers (`overflow: hidden` on text wrappers breaks magnification).

---

### Principle 2: Operable
1. **Keyboard Accessible (SC 2.1.1 - Level A)**:
   - All functionality must be reachable and operable using only a keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, arrow keys).
   - Test: Disconnect the mouse. Can you navigate the entire header, open menus, trigger modals, fill forms, and checkout?
2. **No Keyboard Trap (SC 2.1.2 - Level A)**:
   - Keyboard focus must never get permanently stuck inside a widget or modal. Pressing `Escape` must close popups.
3. **Skip to Content Link (SC 2.4.1 - Level A)**:
   - Provide a hidden link as the very first focusable element that reveals on focus and jumps directly to `<main id="main-content">`, allowing screen reader and keyboard users to bypass repetitive header navigation.
4. **Focus Order & Visual Indicators (SC 2.4.3 / 2.4.7 - Level A/AA)**:
   - Logical tab order following reading direction (top-to-bottom, left-to-right).
   - Use `:focus-visible` for prominent, accessible focus rings without cluttering mouse clicks.

---

### Principle 3: Understandable
1. **Language of Page (SC 3.1.1 - Level A)**:
   - The root `<html>` element must declare the document language: `<html lang="en">` or `<html lang="en-GB">`.
2. **Form Labels and Instructions (SC 3.3.2 - Level A)**:
   - Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label for="id">` or `aria-label`.
   - Never rely solely on placeholder text as a label (placeholders disappear upon typing and fail contrast requirements).
3. **Error Identification & Suggestion (SC 3.3.1 / 3.3.3 - Level A/AA)**:
   - Form errors must be described in text (not just a red border).
   - Connect error text to the input using `aria-describedby="error-id"`.
   - Announce validation errors dynamically via `aria-live="polite"`.

---

### Principle 4: Robust
1. **Valid HTML & ARIA Rules (SC 4.1.2 - Level A)**:
   - Use semantic elements over generic divs (`<button>` instead of `<div onClick="...">`).
   - First Rule of ARIA: *"If you can use a native HTML element or attribute with the semantics and behaviour you require, do so instead of repurposing an element and adding an ARIA role."*
   - Avoid invalid ARIA roles, un-associated `aria-labelledby` targets, or duplicate IDs on interactive elements.

---

## 3. High-Value Accessibility Audit Checklist

```text
[ ] Root HTML has valid lang attribute (e.g. lang="en-GB")
[ ] Document has exactly one <h1> element defining the primary page topic
[ ] Heading hierarchy is sequential without skipping levels (h1 -> h2 -> h3)
[ ] All interactive buttons and links have visible text or aria-label
[ ] Images have descriptive alt text (or empty alt="" if purely decorative)
[ ] Color contrast passes 4.5:1 for body copy and 3:1 for large headings
[ ] Focus rings are clearly visible on all interactive elements via :focus-visible
[ ] Skip-to-content link exists and works with Tab navigation
[ ] Modals trap keyboard focus inside when open and restore focus upon closing
[ ] Form fields have explicit, persistent labels and aria-describedby for errors
[ ] Touch targets are at least 48x48px on mobile viewports
[ ] Page zoom up to 200% does not clip or overlap content
```
