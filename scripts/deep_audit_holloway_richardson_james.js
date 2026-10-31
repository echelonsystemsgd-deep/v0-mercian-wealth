const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

const sites = [
  'https://www.hollowaycook.co.uk/',
  'http://www.hollowaycook.co.uk/',
  'https://richardsonsaccountancy.co.uk/',
  'https://www.jamescowperkreston.co.uk/'
];

function fetchDetailed(urlStr) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(urlStr, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        },
        rejectUnauthorized: false
      }, (res) => {
        let body = '';
        res.on('data', chunk => { if (body.length < 1000000) body += chunk; });
        res.on('end', () => {
          resolve({
            url: urlStr,
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        });
      });
      req.on('error', err => resolve({ url: urlStr, error: err.message }));
      req.setTimeout(10000, () => {
        req.destroy();
        resolve({ url: urlStr, error: 'timeout' });
      });
    } catch (e) {
      resolve({ url: urlStr, error: e.message });
    }
  });
}

async function runCheck() {
  for (const s of sites) {
    console.log(`\n======================================================`);
    console.log(`AUDITING: ${s}`);
    const res = await fetchDetailed(s);
    if (res.error) {
      console.log('Error:', res.error);
      continue;
    }

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`SERVER: ${res.headers['server'] || 'UNKNOWN'}`);
    const html = res.body || '';
    console.log(`LENGTH: ${html.length} bytes`);

    // Title & Meta
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`TITLE: ${title ? title[1].trim() : 'NONE'}`);

    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log(`META DESC: ${metaDesc ? metaDesc[1].trim() : 'NONE'}`);

    const viewport = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
    console.log(`VIEWPORT: ${viewport ? viewport[1].trim() : 'NONE'}`);

    // Forms
    const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log(`FORMS COUNT: ${forms.length}`);

    // Emails and Tel
    const emails = Array.from(html.matchAll(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g)).map(m => m[0]);
    const telLinks = Array.from(html.matchAll(/href=["']tel:([^"']+)["']/gi)).map(m => m[1]);
    const mailtoLinks = Array.from(html.matchAll(/href=["']mailto:([^"']+)["']/gi)).map(m => m[1]);
    console.log(`EMAILS: ${[...new Set(emails)].slice(0, 5).join(', ')}`);
    console.log(`TEL LINKS: ${[...new Set(telLinks)].join(', ')}`);
    console.log(`MAILTO LINKS: ${[...new Set(mailtoLinks)].join(', ')}`);

    // Check copyright
    const copyrightMatches = html.match(/(?:©|&copy;|copyright)[^<\n]{0,50}/gi);
    console.log(`COPYRIGHT: ${copyrightMatches ? copyrightMatches.slice(0, 3).join(' | ') : 'NONE'}`);

    // Check CMS
    const isWp = html.includes('/wp-content/') || html.includes('wordpress');
    const isWix = html.includes('wix.com') || html.includes('wixsite');
    const isSquarespace = html.includes('squarespace');
    console.log(`CMS: WordPress=${isWp}, Wix=${isWix}, Squarespace=${isSquarespace}`);

    // Sample text / headings
    const headings = Array.from(html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim());
    console.log('Sample headings:', headings.slice(0, 5));

    fs.writeFileSync(`scripts/audit_${s.replace(/[^a-zA-Z0-9]/g, '_')}.html`, html);
  }
}

runCheck();
