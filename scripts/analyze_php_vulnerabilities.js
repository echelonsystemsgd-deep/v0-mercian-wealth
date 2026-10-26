const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1]?.trim() || env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
const supabase = createClient(url, key);

function fetchUrl(targetUrl, maxRedirects = 4) {
  return new Promise((resolve) => {
    if (!targetUrl || targetUrl === 'None' || targetUrl === 'NO WEBSITE') {
      return resolve({ ok: false, reason: 'No website listed' });
    }

    let normalized = targetUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }

    let parsed;
    try {
      parsed = new URL(normalized);
    } catch {
      return resolve({ ok: false, reason: 'Invalid URL' });
    }

    const client = parsed.protocol === 'http:' ? http : https;
    const req = client.get(
      parsed.href,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        timeout: 9000,
        rejectUnauthorized: false,
      },
      (res) => {
        // Handle redirect
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
          const nextUrl = new URL(res.headers.location, parsed.href).href;
          return resolve(fetchUrl(nextUrl, maxRedirects - 1));
        }

        let body = '';
        res.on('data', (chunk) => {
          if (body.length < 500000) body += chunk.toString();
        });

        res.on('end', () => {
          resolve({
            ok: true,
            statusCode: res.statusCode,
            headers: res.headers,
            finalUrl: parsed.href,
            body,
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, reason: 'Timeout (9s)' });
    });

    req.on('error', (err) => {
      // If https fails, try http as fallback once
      if (parsed.protocol === 'https:' && maxRedirects > 0) {
        return resolve(fetchUrl('http://' + parsed.host + parsed.pathname, 0));
      }
      resolve({ ok: false, reason: err.message });
    });
  });
}

function detectPhp(resp) {
  if (!resp.ok) return { usesPhp: false, confidence: 'none', details: resp.reason };

  const headers = resp.headers || {};
  const body = resp.body || '';

  const evidence = [];

  // 1. Header checks
  const xPoweredBy = headers['x-powered-by'] || '';
  if (/php/i.test(xPoweredBy)) {
    evidence.push(`Header X-Powered-By: ${xPoweredBy}`);
  }

  const serverHeader = headers['server'] || '';
  if (/php/i.test(serverHeader)) {
    evidence.push(`Server header: ${serverHeader}`);
  }

  const setCookie = headers['set-cookie'] || [];
  const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie);
  if (/PHPSESSID/i.test(cookieStr)) {
    evidence.push('Cookie: PHPSESSID session');
  }

  // 2. CMS checks running on PHP
  // WordPress (100% PHP)
  if (/wp-content/i.test(body) || /wp-includes/i.test(body) || /wp-json/i.test(body) || /generator["'][^>]*content=["']WordPress/i.test(body)) {
    const verMatch = body.match(/generator["'][^>]*content=["']WordPress\s*([0-9.]+)?/i);
    evidence.push(`WordPress detected${verMatch && verMatch[1] ? ' v' + verMatch[1] : ''} (PHP-based CMS)`);
  }

  // Drupal (100% PHP)
  if (/Drupal/i.test(body) || /sites\/default\/files/i.test(body)) {
    evidence.push('Drupal detected (PHP-based CMS)');
  }

  // Joomla (100% PHP)
  if (/Joomla/i.test(body)) {
    evidence.push('Joomla detected (PHP-based CMS)');
  }

  // Craft CMS / Kirby / ExpressionEngine
  if (/Craft\s*CMS/i.test(body)) {
    evidence.push('Craft CMS detected (PHP-based CMS)');
  }

  // Laravel
  if (/laravel_session/i.test(cookieStr) || /laravel/i.test(body)) {
    evidence.push('Laravel framework (PHP)');
  }

  // .php scripts in form actions or scripts
  const phpLinks = body.match(/href=["'][^"']+\.php(?:\?[^"']*)?["']/gi) || [];
  const phpActions = body.match(/action=["'][^"']+\.php(?:\?[^"']*)?["']/gi) || [];
  if (phpLinks.length > 0 || phpActions.length > 0) {
    evidence.push(`Direct .php endpoints: ${phpActions.length} form action(s), ${phpLinks.length} script link(s)`);
  }

  // Non-PHP platforms for exclusion
  const isWix = /wix\.com|parastorage/i.test(body) || headers['x-wix-request-id'];
  const isSquarespace = /squarespace\.com/i.test(body);
  const isShopify = /myshopify\.com/i.test(body);
  const isWebflow = /webflow/i.test(body);

  if (evidence.length > 0) {
    return {
      usesPhp: true,
      confidence: 'HIGH',
      evidence,
      server: serverHeader,
      platform: evidence.some(e => e.includes('WordPress')) ? 'WordPress' : 'PHP Stack',
    };
  }

  let nonPhpPlatform = 'Custom / Unknown';
  if (isWix) nonPhpPlatform = 'Wix (Node.js/Cloud)';
  else if (isSquarespace) nonPhpPlatform = 'Squarespace (Java/Node)';
  else if (isShopify) nonPhpPlatform = 'Shopify (Ruby/Go)';
  else if (isWebflow) nonPhpPlatform = 'Webflow (Node/Edge)';

  return {
    usesPhp: false,
    confidence: 'LOW_OR_NEGATIVE',
    nonPhpPlatform,
    server: serverHeader,
  };
}

async function main() {
  console.log('Fetching contacted leads from Supabase...');
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, business_name, website, phone, email, notes, scraped_metadata')
    .eq('status', 'Contacted');

  if (error) {
    console.error('Supabase error:', error);
    process.exit(1);
  }

  console.log(`Found ${leads.length} Contacted leads. Beginning live PHP detection probe...\n`);

  const results = [];
  const concurrency = 5;

  for (let i = 0; i < leads.length; i += concurrency) {
    const chunk = leads.slice(i, i + concurrency);
    const chunkResults = await Promise.all(
      chunk.map(async (lead) => {
        const rawWeb = lead.website || lead.scraped_metadata?.website || '';
        const resp = await fetchUrl(rawWeb);
        const analysis = detectPhp(resp);
        return {
          id: lead.id,
          name: lead.business_name || lead.name,
          website: rawWeb,
          phone: lead.phone,
          email: lead.email,
          ...analysis,
        };
      })
    );

    chunkResults.forEach((r) => {
      const tag = r.usesPhp ? '🚨 [USES PHP]' : '🛡️ [NO PHP]';
      console.log(`${tag} ${r.name.padEnd(35)} | ${r.platform || r.nonPhpPlatform || r.details} | ${r.website || 'No site'}`);
      results.push(r);
    });
  }

  const phpBusinesses = results.filter(r => r.usesPhp);
  const nonPhpBusinesses = results.filter(r => !r.usesPhp && r.website && r.website !== 'None');
  const noSiteBusinesses = results.filter(r => !r.website || r.website === 'None');

  console.log('\n============================================================');
  console.log('                 PHP VULNERABILITY AUDIT REPORT             ');
  console.log('============================================================');
  console.log(`Total Contacted Businesses Audited : ${results.length}`);
  console.log(`CONFIRMED PHP Powered (Vulnerable) : ${phpBusinesses.length} (${Math.round((phpBusinesses.length / results.length) * 100)}%)`);
  console.log(`Non-PHP / Modern Cloud / Unreachable: ${nonPhpBusinesses.length}`);
  console.log(`No Website Registered              : ${noSiteBusinesses.length}`);
  console.log('============================================================\n');

  fs.writeFileSync('php_audit_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    totalContacted: results.length,
    phpCount: phpBusinesses.length,
    nonPhpCount: nonPhpBusinesses.length,
    noSiteCount: noSiteBusinesses.length,
    phpBusinesses,
    nonPhpBusinesses,
  }, null, 2));

  console.log('Saved detailed results to php_audit_report.json');
}

main();
