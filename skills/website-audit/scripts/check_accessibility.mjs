#!/usr/bin/env node
/**
 * WCAG 2.2 HTML Accessibility Inspector
 * Audits HTML structure for language attributes, image alt tags,
 * form labels, heading hierarchy, and ARIA roles.
 *
 * Usage:
 *   node check_accessibility.mjs <url>
 */

const args = process.argv.slice(2);
const isHelp = args.includes("--help") || args.includes("-h") || args.length === 0;

if (isHelp) {
  console.log(`
============================================================
      WCAG 2.2 HTML ACCESSIBILITY INSPECTOR (CLI)
============================================================
Usage:
  node check_accessibility.mjs <url>

Examples:
  node check_accessibility.mjs https://example.com
  node check_accessibility.mjs localhost:3000
============================================================
`);
  process.exit(0);
}

let rawUrl = args.find(a => !a.startsWith("--"));
if (!rawUrl) {
  console.error("[-] Error: Target URL is required. Run with --help for usage.");
  process.exit(1);
}

if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
  rawUrl = (rawUrl.startsWith("localhost") || rawUrl.startsWith("127.0.0.1")) 
    ? `http://${rawUrl}` 
    : `https://${rawUrl}`;
}
const url = rawUrl;

async function inspectAccessibility() {
  console.log(`\n[*] Auditing WCAG 2.2 Accessibility Semantics for: ${url} ...`);
  try {
    const res = await fetch(url);
    const html = await res.text();

    console.log("------------------------------------------------------------------");
    console.log("ACCESSIBILITY CHECK                   STATUS    DETAILS");
    console.log("------------------------------------------------------------------");

    // 1. Language tag
    const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
    if (lang) {
      console.log(`[PASS] HTML Language Attribute         PASS      lang="${lang[1]}"`);
    } else {
      console.log("[FAIL] HTML Language Attribute         FAIL      Missing <html lang='...'>");
    }

    // 2. Heading hierarchy
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1s.length === 1) {
      console.log(`[PASS] Document Single <h1> Topic      PASS      1 <h1> found`);
    } else if (h1s.length === 0) {
      console.log("[FAIL] Document Single <h1> Topic      FAIL      Zero <h1> elements found");
    } else {
      console.log(`[WARN] Document Single <h1> Topic      WARN      ${h1s.length} <h1> elements found (should be 1)`);
    }

    // 3. Image alternative text
    const imgs = [...html.matchAll(/<img([^>]+)>/gi)];
    let missingAlt = 0;
    imgs.forEach((img) => {
      if (!/alt=["']/i.test(img[1])) missingAlt++;
    });
    if (missingAlt === 0 && imgs.length > 0) {
      console.log(`[PASS] Image Alt Descriptions          PASS      All ${imgs.length} images have alt tags`);
    } else if (missingAlt > 0) {
      console.log(`[FAIL] Image Alt Descriptions          FAIL      ${missingAlt} / ${imgs.length} images missing alt attribute`);
    } else {
      console.log("[INFO] Image Alt Descriptions          INFO      No <img> elements found");
    }

    // 4. Form inputs missing labels
    const inputs = [...html.matchAll(/<input([^>]+)>/gi)];
    let unlabelledInputs = 0;
    inputs.forEach((input) => {
      const attrs = input[1];
      const type = attrs.match(/type=["']([^"']+)["']/i)?.[1] || "text";
      if (!["hidden", "submit", "button"].includes(type)) {
        const hasAria = /aria-label=["']|aria-labelledby=["']/i.test(attrs);
        const hasId = attrs.match(/id=["']([^"']+)["']/i)?.[1];
        const hasLabel = hasId && new RegExp(`<label[^>]+for=["']${hasId}["']`, "i").test(html);
        if (!hasAria && !hasLabel) unlabelledInputs++;
      }
    });

    if (unlabelledInputs === 0) {
      console.log("[PASS] Form Input Label Association   PASS      All visible inputs have labels or ARIA");
    } else {
      console.log(`[FAIL] Form Input Label Association   FAIL      ${unlabelledInputs} input(s) lack labels/aria-label`);
    }

    // 5. Button Accessible Names
    const buttons = [...html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/gi)];
    let emptyButtons = 0;
    buttons.forEach((btn) => {
      const text = btn[2].replace(/<[^>]+>/g, "").trim();
      const hasAria = /aria-label=["']/i.test(btn[1]);
      if (!text && !hasAria) emptyButtons++;
    });

    if (emptyButtons === 0 && buttons.length > 0) {
      console.log(`[PASS] Button Accessible Names         PASS      All ${buttons.length} buttons have accessible text`);
    } else if (emptyButtons > 0) {
      console.log(`[FAIL] Button Accessible Names         FAIL      ${emptyButtons} icon button(s) lack text or aria-label`);
    }

    console.log("------------------------------------------------------------------\n");
  } catch (err) {
    console.error(`[-] Error: ${err.message}`);
  }
}

inspectAccessibility();
