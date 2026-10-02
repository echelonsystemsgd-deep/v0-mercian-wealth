#!/usr/bin/env node
/**
 * Automated Full-Conscience Website Auditor (Node.js)
 * Zero external dependencies (uses native fetch, crypto, URL, and regex parsers).
 * Evaluates Performance Indicators, Technical SEO, Security Headers,
 * Accessibility Semantics, and Mobile Optimization.
 *
 * Usage:
 *   node audit_site.mjs <url> [--json] [--output=report.json]
 * Example:
 *   node audit_site.mjs https://example.com
 */

import { performance } from "perf_hooks";
import fs from "fs";

const args = process.argv.slice(2);
const isHelp = args.includes("--help") || args.includes("-h") || args.length === 0;

if (isHelp) {
  console.log(`
============================================================
           FULL-CONSCIENCE WEBSITE AUDITOR (CLI)
============================================================
Usage:
  node audit_site.mjs <url> [--json] [--output=report.json]

Options:
  --json               Output audit results in structured JSON format
  --output=<path>      Save JSON report directly to a file
  --help, -h           Show this help message

Examples:
  node audit_site.mjs https://example.com
  node audit_site.mjs localhost:3000
  node audit_site.mjs https://example.com --json
  node audit_site.mjs https://example.com --output=report.json
============================================================
`);
  process.exit(0);
}

let rawUrl = args.find(a => !a.startsWith("--"));
if (!rawUrl) {
  console.error("[-] Error: Target URL is required. Run with --help for usage.");
  process.exit(1);
}

// Auto-prefix protocol if missing
if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
  rawUrl = (rawUrl.startsWith("localhost") || rawUrl.startsWith("127.0.0.1")) 
    ? `http://${rawUrl}` 
    : `https://${rawUrl}`;
}
const targetUrl = rawUrl;
const isJsonOutput = args.includes("--json");
const outputArg = args.find((a) => a.startsWith("--output="));
const outputFile = outputArg ? outputArg.split("=")[1] : null;

async function runAudit() {
  const startTime = performance.now();
  let response;
  try {
    response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) FullConscienceAuditor/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });
  } catch (err) {
    console.error(`[-] Failed to connect to ${targetUrl}: ${err.message}`);
    process.exit(1);
  }

  const ttfb = Math.round(performance.now() - startTime);
  const html = await response.text();
  const htmlSizeBytes = Buffer.byteLength(html, "utf8");
  const headers = Object.fromEntries(response.headers.entries());

  const audit = {
    target: targetUrl,
    finalUrl: response.url,
    timestamp: new Date().toISOString(),
    status: response.status,
    metrics: {
      ttfbMs: ttfb,
      htmlSizeBytes,
      htmlSizeKb: (htmlSizeBytes / 1024).toFixed(2),
    },
    scores: {
      performance: 0,
      seo: 0,
      accessibility: 0,
      security: 0,
      mobile: 0,
      overall: 0,
    },
    findings: {
      security: [],
      seo: [],
      accessibility: [],
      performance: [],
      mobile: [],
    },
    details: {},
  };

  // 1. SECURITY HEADERS AUDIT
  const secFindings = [];
  let secPoints = 100;

  const hsts = headers["strict-transport-security"];
  if (targetUrl.startsWith("https://")) {
    if (!hsts) {
      secFindings.push({ severity: "MAJOR", issue: "Missing Strict-Transport-Security (HSTS) header." });
      secPoints -= 25;
    } else {
      secFindings.push({ severity: "PASS", issue: `HSTS configured: ${hsts}` });
    }
  }

  const csp = headers["content-security-policy"];
  if (!csp) {
    secFindings.push({ severity: "MAJOR", issue: "Missing Content-Security-Policy (CSP) header." });
    secPoints -= 25;
  } else {
    secFindings.push({ severity: "PASS", issue: "Content-Security-Policy header present." });
  }

  const xcto = headers["x-content-type-options"];
  if (xcto !== "nosniff") {
    secFindings.push({ severity: "MODERATE", issue: "Missing or invalid X-Content-Type-Options (should be 'nosniff')." });
    secPoints -= 15;
  } else {
    secFindings.push({ severity: "PASS", issue: "X-Content-Type-Options: nosniff present." });
  }

  const xfo = headers["x-frame-options"];
  if (!xfo && (!csp || !csp.includes("frame-ancestors"))) {
    secFindings.push({ severity: "MODERATE", issue: "Missing X-Frame-Options or CSP frame-ancestors (clickjacking risk)." });
    secPoints -= 15;
  } else {
    secFindings.push({ severity: "PASS", issue: `Clickjacking protection active (${xfo || "CSP frame-ancestors"}).` });
  }

  const refPol = headers["referrer-policy"];
  if (!refPol) {
    secFindings.push({ severity: "MINOR", issue: "Missing Referrer-Policy header." });
    secPoints -= 10;
  }

  audit.scores.security = Math.max(0, secPoints);
  audit.findings.security = secFindings;

  // 2. TECHNICAL SEO AUDIT
  const seoFindings = [];
  let seoPoints = 100;

  // Title tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  if (!title) {
    seoFindings.push({ severity: "CRITICAL", issue: "Missing <title> tag." });
    seoPoints -= 35;
  } else if (title.length < 30 || title.length > 65) {
    seoFindings.push({
      severity: "MODERATE",
      issue: `Title length (${title.length} chars) is outside optimal range (50-60 chars): "${title}"`,
    });
    seoPoints -= 10;
  } else {
    seoFindings.push({ severity: "PASS", issue: `Title tag optimal (${title.length} chars): "${title}"` });
  }

  // Meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : "";
  if (!description) {
    seoFindings.push({ severity: "MAJOR", issue: "Missing meta description tag." });
    seoPoints -= 25;
  } else if (description.length < 100 || description.length > 165) {
    seoFindings.push({
      severity: "MODERATE",
      issue: `Meta description length (${description.length} chars) is outside optimal range (120-155 chars).`,
    });
    seoPoints -= 10;
  } else {
    seoFindings.push({ severity: "PASS", issue: `Meta description optimal (${description.length} chars).` });
  }

  // Canonical tag
  const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonMatch) {
    seoFindings.push({ severity: "MAJOR", issue: "Missing canonical <link rel='canonical'> tag." });
    seoPoints -= 20;
  } else {
    seoFindings.push({ severity: "PASS", issue: `Canonical tag present: ${canonMatch[1]}` });
  }

  // Open Graph
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["']/i);
  const ogImg = html.match(/<meta[^>]+property=["']og:image["']/i);
  if (!ogTitle || !ogImg) {
    seoFindings.push({ severity: "MODERATE", issue: "Missing Open Graph tags (og:title or og:image) for rich social sharing." });
    seoPoints -= 15;
  } else {
    seoFindings.push({ severity: "PASS", issue: "Open Graph social tags present." });
  }

  // Schema.org JSON-LD structured data
  const jsonLdMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (jsonLdMatches.length === 0) {
    seoFindings.push({ severity: "MODERATE", issue: "No Schema.org JSON-LD structured data found." });
    seoPoints -= 10;
  } else {
    let validSchemas = 0;
    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        validSchemas++;
      } catch {
        seoFindings.push({ severity: "MAJOR", issue: "Found malformed/invalid JSON inside application/ld+json script tag." });
        seoPoints -= 15;
      }
    }
    if (validSchemas > 0) {
      seoFindings.push({ severity: "PASS", issue: `Detected ${validSchemas} valid Schema.org JSON-LD structured data block(s).` });
    }
  }

  audit.scores.seo = Math.max(0, seoPoints);
  audit.findings.seo = seoFindings;

  // 3. ACCESSIBILITY (a11y) AUDIT
  const a11yFindings = [];
  let a11yPoints = 100;

  // lang attribute
  const langMatch = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  if (!langMatch) {
    a11yFindings.push({ severity: "MAJOR", issue: "Root <html> element is missing a 'lang' attribute." });
    a11yPoints -= 20;
  } else {
    a11yFindings.push({ severity: "PASS", issue: `Root <html> declares lang="${langMatch[1]}".` });
  }

  // H1 heading hierarchy
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    a11yFindings.push({ severity: "MAJOR", issue: "Page is missing an <h1> primary topic heading." });
    a11yPoints -= 20;
  } else if (h1Matches.length > 1) {
    a11yFindings.push({ severity: "MODERATE", issue: `Multiple <h1> tags detected (${h1Matches.length}). Recommended to maintain exactly one <h1> per page.` });
    a11yPoints -= 10;
  } else {
    a11yFindings.push({ severity: "PASS", issue: "Single authoritative <h1> heading present." });
  }

  // Image alt attributes
  const imgTags = [...html.matchAll(/<img([^>]+)>/gi)];
  let imgsWithoutAlt = 0;
  for (const img of imgTags) {
    if (!/alt=["']/i.test(img[1])) {
      imgsWithoutAlt++;
    }
  }
  if (imgsWithoutAlt > 0) {
    a11yFindings.push({ severity: "MAJOR", issue: `Found ${imgsWithoutAlt} <img> tag(s) completely missing the 'alt' attribute.` });
    a11yPoints -= Math.min(30, imgsWithoutAlt * 10);
  } else if (imgTags.length > 0) {
    a11yFindings.push({ severity: "PASS", issue: `All ${imgTags.length} image(s) specify an alt attribute.` });
  }

  audit.scores.accessibility = Math.max(0, a11yPoints);
  audit.findings.accessibility = a11yFindings;

  // 4. MOBILE & ERGONOMICS AUDIT
  const mobFindings = [];
  let mobPoints = 100;

  const vpMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i);
  if (!vpMatch) {
    mobFindings.push({ severity: "CRITICAL", issue: "Missing responsive <meta name='viewport'> tag." });
    mobPoints -= 50;
  } else {
    const vpContent = vpMatch[1];
    if (vpContent.includes("user-scalable=no") || vpContent.includes("maximum-scale=1")) {
      mobFindings.push({ severity: "MAJOR", issue: "Viewport disables user pinch-to-zoom (violates WCAG 1.4.4)." });
      mobPoints -= 25;
    } else {
      mobFindings.push({ severity: "PASS", issue: "Viewport meta tag configured with full scalability." });
    }
  }

  audit.scores.mobile = Math.max(0, mobPoints);
  audit.findings.mobile = mobFindings;

  // 5. PERFORMANCE INDICATORS
  const perfFindings = [];
  let perfPoints = 100;

  // TTFB
  if (ttfb > 1200) {
    perfFindings.push({ severity: "MAJOR", issue: `High Server Response Time (TTFB: ${ttfb}ms, target <= 800ms).` });
    perfPoints -= 30;
  } else if (ttfb > 800) {
    perfFindings.push({ severity: "MODERATE", issue: `Moderate TTFB (${ttfb}ms, target <= 800ms).` });
    perfPoints -= 15;
  } else {
    perfFindings.push({ severity: "PASS", issue: `Fast Server Response Time (TTFB: ${ttfb}ms).` });
  }

  // HTML payload size
  if (htmlSizeBytes > 100 * 1024) {
    perfFindings.push({ severity: "MODERATE", issue: `Large initial HTML document (${(htmlSizeBytes / 1024).toFixed(1)} KB, target <= 50 KB).` });
    perfPoints -= 20;
  } else {
    perfFindings.push({ severity: "PASS", issue: `Lean HTML document size (${(htmlSizeBytes / 1024).toFixed(1)} KB).` });
  }

  // Unsized images (CLS risk)
  let unsizedImgs = 0;
  for (const img of imgTags) {
    const attrs = img[1];
    const hasWidth = /width=["']/i.test(attrs) || /width:\s*(?:100%|\d+px)/i.test(attrs) || /aspect-ratio/i.test(attrs);
    const hasHeight = /height=["']/i.test(attrs) || /height:\s*(?:100%|\d+px)/i.test(attrs) || /aspect-ratio/i.test(attrs);
    if (!hasWidth || !hasHeight) {
      unsizedImgs++;
    }
  }
  if (unsizedImgs > 0) {
    perfFindings.push({ severity: "MODERATE", issue: `${unsizedImgs} image(s) lack explicit width and height attributes or CSS aspect-ratio.` });
    perfPoints -= Math.min(25, unsizedImgs * 5);
  } else if (imgTags.length > 0) {
    perfFindings.push({ severity: "PASS", issue: `All ${imgTags.length} image(s) have explicit dimensions or CSS aspect-ratio.` });
  }

  audit.scores.performance = Math.max(0, perfPoints);
  audit.findings.performance = perfFindings;

  // Calculate Overall Composite Score
  audit.scores.overall = Math.round(
    audit.scores.performance * 0.25 +
    audit.scores.accessibility * 0.25 +
    audit.scores.seo * 0.20 +
    audit.scores.security * 0.15 +
    audit.scores.mobile * 0.15
  );

  if (isJsonOutput) {
    console.log(JSON.stringify(audit, null, 2));
  } else {
    printFormattedReport(audit);
  }

  if (outputFile) {
    fs.writeFileSync(outputFile, JSON.stringify(audit, null, 2), "utf8");
    console.log(`\n[+] Full audit JSON saved to: ${outputFile}`);
  }
}

function printFormattedReport(audit) {
  console.log("\n============================================================");
  console.log("       FULL-CONSCIENCE WEBSITE AUDIT REPORT");
  console.log("============================================================");
  console.log(`Target URL : ${audit.target}`);
  console.log(`Audit Date : ${audit.timestamp}`);
  console.log(`HTTP Status: ${audit.status} | TTFB: ${audit.metrics.ttfbMs}ms | HTML: ${audit.metrics.htmlSizeKb} KB`);
  console.log("------------------------------------------------------------");
  console.log(`⭐ OVERALL CONSCIENCE SCORE : ${audit.scores.overall} / 100`);
  console.log("------------------------------------------------------------");
  console.log(`  ⚡ Performance & CWV   : ${audit.scores.performance} / 100`);
  console.log(`  ♿ Accessibility (a11y): ${audit.scores.accessibility} / 100`);
  console.log(`  🔍 Technical SEO & Data: ${audit.scores.seo} / 100`);
  console.log(`  🛡️ Security & Privacy  : ${audit.scores.security} / 100`);
  console.log(`  📱 Mobile & Ergonomics : ${audit.scores.mobile} / 100`);
  console.log("============================================================");

  for (const [category, findings] of Object.entries(audit.findings)) {
    console.log(`\n>>> [${category.toUpperCase()}] FINDINGS:`);
    for (const f of findings) {
      const icon = f.severity === "PASS" ? "  ✓ [PASS]" : f.severity === "CRITICAL" ? "  ❌ [CRITICAL]" : f.severity === "MAJOR" ? "  ⚠️ [MAJOR]" : "  ℹ️ [MODERATE]";
      console.log(`${icon} ${f.issue}`);
    }
  }
  console.log("\n============================================================\n");
}

runAudit();
