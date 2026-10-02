#!/usr/bin/env node
/**
 * SEO & Schema.org JSON-LD Structured Data Validator
 * Extracts, parses, and validates all JSON-LD blocks from a target webpage.
 *
 * Usage:
 *   node check_seo_schema.mjs <url>
 */

const args = process.argv.slice(2);
const isHelp = args.includes("--help") || args.includes("-h") || args.length === 0;

if (isHelp) {
  console.log(`
============================================================
       SEO & SCHEMA.ORG JSON-LD VALIDATOR (CLI)
============================================================
Usage:
  node check_seo_schema.mjs <url>

Examples:
  node check_seo_schema.mjs https://example.com
  node check_seo_schema.mjs localhost:3000
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

async function validateSeoAndSchema() {
  console.log(`\n[*] Fetching and inspecting Schema.org JSON-LD for: ${url} ...`);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
    });
    const html = await res.text();

    const matches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (matches.length === 0) {
      console.warn("[-] No Schema.org JSON-LD structured data blocks detected.");
      return;
    }

    console.log(`[+] Found ${matches.length} JSON-LD block(s):\n`);

    matches.forEach((m, idx) => {
      console.log(`--- [Block #${idx + 1}] ---`);
      try {
        const parsed = JSON.parse(m[1].trim());
        const type = parsed["@type"] || (Array.isArray(parsed["@graph"]) ? parsed["@graph"].map(g => g["@type"]).join(", ") : "Unknown");
        console.log(`Type    : ${type}`);
        console.log(`Context : ${parsed["@context"] || "None"}`);
        console.log("Payload Preview:");
        console.log(JSON.stringify(parsed, null, 2).substring(0, 500) + (JSON.stringify(parsed, null, 2).length > 500 ? "\n..." : ""));
        console.log("[Status]: VALID JSON-LD Syntax\n");
      } catch (err) {
        console.error(`[Status]: INVALID JSON SYNTAX: ${err.message}\nRaw Content:\n${m[1]}\n`);
      }
    });
  } catch (err) {
    console.error(`[-] Error: ${err.message}`);
  }
}

validateSeoAndSchema();
