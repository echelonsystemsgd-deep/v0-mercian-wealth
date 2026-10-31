const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

const sites = [
  'https://www.kbnaccountants.co.uk/',
  'https://www.brywelassociates.co.uk/',
  'http://www.brywelassociates.co.uk/',
  'https://www.hurntax.co.uk/'
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

async function auditThree() {
  for (const s of sites) {
    console.log(`\n======================================================`);
    console.log(`FETCHING: ${s}`);
    const res = await fetchDetailed(s);
    if (res.error) {
      console.log(`ERROR: ${res.error}`);
      continue;
    }

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`LOCATION: ${res.headers.location || 'none'}`);
    console.log(`HSTS: ${res.headers['strict-transport-security'] || 'MISSING'}`);
    console.log(`X-FRAME-OPTIONS: ${res.headers['x-frame-options'] || 'MISSING'}`);
    console.log(`CSP: ${res.headers['content-security-policy'] ? 'PRESENT' : 'MISSING'}`);
    console.log(`SERVER: ${res.headers['server'] || 'UNKNOWN'}`);

    const html = res.body || '';
    console.log(`BODY LENGTH: ${html.length} bytes`);

    // Title & Meta
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`TITLE: ${titleMatch ? titleMatch[1].trim() : 'NONE'}`);

    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log(`META DESC: ${metaDesc ? metaDesc[1].trim() : 'NONE'}`);

    const viewport = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
    console.log(`VIEWPORT: ${viewport ? viewport[1].trim() : 'NONE'}`);

    // Forms
    const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log(`FORMS COUNT: ${forms.length}`);
    forms.forEach((f, idx) => {
      console.log(`--- Form #${idx+1} ---`);
      const action = f.match(/action=["']([^"']*)["']/i);
      const method = f.match(/method=["']([^"']*)["']/i);
      console.log(`   Action: ${action ? action[1] : 'NONE'} | Method: ${method ? method[1] : 'GET'}`);
      const inputs = f.match(/<input[^>]*>/gi) || [];
      const textareas = f.match(/<textarea[^>]*>/gi) || [];
      const selects = f.match(/<select[^>]*>/gi) || [];
      console.log(`   Inputs: ${inputs.length}, Textareas: ${textareas.length}, Selects: ${selects.length}`);
      inputs.forEach(inp => {
        const type = inp.match(/type=["']([^"']*)["']/i);
        const name = inp.match(/name=["']([^"']*)["']/i);
        const placeholder = inp.match(/placeholder=["']([^"']*)["']/i);
        console.log(`     - Input: type=${type ? type[1] : 'text'}, name=${name ? name[1] : 'none'}, placeholder=${placeholder ? placeholder[1] : 'none'}`);
      });
    });

    // Check CAPTCHAs, Honeypots, Scripts, Third-parties
    const hasReCaptcha = html.includes('recaptcha') || html.includes('g-recaptcha');
    const hasHCaptcha = html.includes('hcaptcha');
    const hasTurnstile = html.includes('turnstile');
    console.log(`CAPTCHA: reCaptcha=${hasReCaptcha}, hCaptcha=${hasHCaptcha}, turnstile=${hasTurnstile}`);

    // Check emails and phones in DOM
    const emails = Array.from(html.matchAll(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g)).map(m => m[0]);
    const telLinks = Array.from(html.matchAll(/href=["']tel:([^"']+)["']/gi)).map(m => m[1]);
    const mailtoLinks = Array.from(html.matchAll(/href=["']mailto:([^"']+)["']/gi)).map(m => m[1]);
    console.log(`EMAILS: ${[...new Set(emails)].slice(0, 5).join(', ')}`);
    console.log(`TEL LINKS: ${[...new Set(telLinks)].join(', ')}`);
    console.log(`MAILTO LINKS: ${[...new Set(mailtoLinks)].join(', ')}`);

    // Check CMS / framework
    const isWp = html.includes('/wp-content/') || html.includes('wordpress');
    const isWix = html.includes('wix.com') || html.includes('wixsite');
    const isSquarespace = html.includes('squarespace');
    const isJoomla = html.includes('joomla');
    const isDrupal = html.includes('drupal');
    console.log(`CMS: WordPress=${isWp}, Wix=${isWix}, Squarespace=${isSquarespace}, Joomla=${isJoomla}`);

    // Check broken elements or interesting code
    if (html.includes('404') || html.includes('Not Found') || html.includes('error')) {
      console.log(`Contains error/404 keyword in text!`);
    }

    // Save sample of HTML
    fs.writeFileSync(`scripts/audit_${s.replace(/[^a-zA-Z0-9]/g, '_')}.html`, html);
  }
}

auditThree();
