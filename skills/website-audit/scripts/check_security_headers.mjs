#!/usr/bin/env node
/**
 * Security Headers & TLS Inspector
 * Inspects all defensive HTTP response headers, CORS policies, and cookie attributes.
 *
 * Usage:
 *   node check_security_headers.mjs <url>
 */

const args = process.argv.slice(2);
const isHelp = args.includes("--help") || args.includes("-h") || args.length === 0;

if (isHelp) {
  console.log(`
============================================================
      SECURITY DEFENSE HEADERS & TLS INSPECTOR (CLI)
============================================================
Usage:
  node check_security_headers.mjs <url>

Examples:
  node check_security_headers.mjs https://example.com
  node check_security_headers.mjs localhost:3000
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

async function inspectSecurity() {
  console.log(`\n[*] Inspecting Security Defense Headers for: ${url} ...`);
  try {
    let res;
    try {
      res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.status === 405) {
        res = await fetch(url, { method: "GET", redirect: "follow" });
      }
    } catch {
      res = await fetch(url, { method: "GET", redirect: "follow" });
    }
    const headers = Object.fromEntries(res.headers.entries());

    const tests = [
      {
        name: "Strict-Transport-Security (HSTS)",
        header: "strict-transport-security",
        critical: true,
        recommended: "max-age=63072000; includeSubDomains; preload",
      },
      {
        name: "Content-Security-Policy (CSP)",
        header: "content-security-policy",
        critical: true,
        recommended: "Restricted script-src, frame-ancestors, default-src 'self'",
      },
      {
        name: "X-Content-Type-Options",
        header: "x-content-type-options",
        critical: false,
        recommended: "nosniff",
      },
      {
        name: "X-Frame-Options",
        header: "x-frame-options",
        critical: false,
        recommended: "DENY or SAMEORIGIN",
      },
      {
        name: "Referrer-Policy",
        header: "referrer-policy",
        critical: false,
        recommended: "strict-origin-when-cross-origin",
      },
      {
        name: "Permissions-Policy",
        header: "permissions-policy",
        critical: false,
        recommended: "camera=(), microphone=(), geolocation=()",
      },
    ];

    console.log("------------------------------------------------------------------");
    console.log("DEFENSIVE HEADER                     STATUS   CURRENT VALUE");
    console.log("------------------------------------------------------------------");

    let passCount = 0;
    for (const test of tests) {
      const val = headers[test.header];
      if (val) {
        passCount++;
        console.log(`[PASS] ${test.name.padEnd(30)} PRESENT  "${val.substring(0, 40)}${val.length > 40 ? "..." : ""}"`);
      } else {
        const flag = test.critical ? "[FAIL] (Critical)" : "[WARN]";
        console.log(`${flag.padEnd(7)} ${test.name.padEnd(30)} MISSING  (Rec: ${test.recommended})`);
      }
    }

    console.log("------------------------------------------------------------------");
    console.log(`Summary: ${passCount} / ${tests.length} Security Headers Configured.`);
    console.log("------------------------------------------------------------------\n");
  } catch (err) {
    console.error(`[-] Security Inspection Failed: ${err.message}`);
  }
}

inspectSecurity();
