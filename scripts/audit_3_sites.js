const https = require('https');
const http = require('http');

const urls = [
  'https://teamsas.co.uk/',
  'https://redwoodaccountants.com/',
  'https://averyclifton.com/'
];

function fetchUrl(urlStr) {
  return new Promise((resolve) => {
    try {
      const url = new URL(urlStr);
      const mod = url.protocol === 'https:' ? https : http;
      const req = mod.get(urlStr, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
        },
        timeout: 12000,
        rejectUnauthorized: false
      }, (res) => {
        // follow redirect if 301/302
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const newUrl = new URL(res.headers.location, urlStr).toString();
          console.log(`Redirecting from ${urlStr} to ${newUrl}`);
          return resolve(fetchUrl(newUrl));
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({ url: urlStr, status: res.statusCode, headers: res.headers, html: data });
        });
      });
      req.on('error', (err) => resolve({ url: urlStr, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url: urlStr, error: 'TIMEOUT' }); });
    } catch(e) {
      resolve({ url: urlStr, error: e.message });
    }
  });
}

async function run() {
  for (const u of urls) {
    const res = await fetchUrl(u);
    console.log('\n======================================================');
    console.log('=== URL:', u, 'Status:', res.status || res.error);
    if (res.headers) {
      console.log('Server:', res.headers['server'] || 'Unknown');
      console.log('Strict-Transport-Security:', res.headers['strict-transport-security'] || 'MISSING');
    }
    if (res.html) {
      const html = res.html;
      console.log('HTML Length:', html.length);
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      console.log('Title:', titleMatch ? titleMatch[1].trim() : 'NONE');
      
      const vpMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
      console.log('Viewport:', vpMatch ? vpMatch[0] : 'NONE');
      
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
      console.log('Description:', descMatch ? descMatch[1].slice(0, 150) : 'NONE');
      
      const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
      console.log('Forms count:', forms.length);
      
      const tels = html.match(/href=["']tel:([^"']+)["']/gi) || [];
      console.log('Tel links:', tels);
      
      const mailtos = html.match(/href=["']mailto:([^"']+)["']/gi) || [];
      console.log('Mailto links:', mailtos);
      
      const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const uniqEmails = [...new Set(emails)].filter(e => !e.endsWith('.png') && !e.endsWith('.jpg') && !e.endsWith('.webp') && !e.includes('schema.org') && !e.includes('w3.org') && !e.includes('sentry.io') && !e.includes('polyfill.io'));
      console.log('Emails found:', uniqEmails.slice(0, 10));
      
      const phones = html.match(/(?:(?:\+44\s?\(0\)\s?|\+44\s?|0)[1-9]\d{1,4}\s?\d{3,4}\s?\d{3,4})/g) || [];
      const uniqPhones = [...new Set(phones.map(p => p.trim()))];
      console.log('Phones found:', uniqPhones.slice(0, 10));

      // check CMS or frameworks
      const isWordpress = html.includes('wp-content');
      const isWix = html.includes('wix.com') || html.includes('X-Wix');
      const isSquarespace = html.includes('squarespace');
      console.log('CMS:', isWordpress ? 'WordPress' : isWix ? 'Wix' : isSquarespace ? 'Squarespace' : 'Custom / Other');

      // look for headings / key text snippets
      const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
      console.log('H1 elements:', h1s.map(h => h.replace(/<[^>]+>/g, '').trim()));
    }
  }
}
run();
