const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

const leads = JSON.parse(fs.readFileSync('scripts/reading_audited_leads.json', 'utf8'));

function fetchWithRedirect(initialUrl, maxRedirects = 5) {
  return new Promise((resolve) => {
    let currentUrl = initialUrl;
    let redirects = 0;

    function get(u) {
      try {
        const parsed = new URL(u);
        const client = parsed.protocol === 'https:' ? https : http;
        const req = client.get(u, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          rejectUnauthorized: false
        }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < maxRedirects) {
            redirects++;
            let loc = res.headers.location;
            if (!loc.startsWith('http')) {
              loc = new URL(loc, u).href;
            }
            return get(loc);
          }

          let data = '';
          res.on('data', chunk => { if (data.length < 500000) data += chunk; });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, finalUrl: u, html: data });
          });
        });
        req.on('error', err => resolve({ error: err.message }));
        req.setTimeout(8000, () => {
          req.destroy();
          resolve({ error: 'timeout' });
        });
      } catch (e) {
        resolve({ error: e.message });
      }
    }

    get(initialUrl);
  });
}

function extractEmails(html) {
  if (!html) return [];
  const mailtoMatches = Array.from(html.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi)).map(m => m[1].toLowerCase());
  const textMatches = Array.from(html.matchAll(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g)).map(m => m[0].toLowerCase());
  const combined = [...new Set([...mailtoMatches, ...textMatches])].filter(e => 
    !e.endsWith('.png') && !e.endsWith('.jpg') && !e.endsWith('.webp') && 
    !e.includes('sentry') && !e.includes('wixpress') && !e.includes('wordpress') &&
    !e.includes('example.com') && !e.includes('schema.org')
  );
  return combined;
}

async function deepInspect() {
  console.log('Following redirects and inspecting contact endpoints for all leads...');
  for (const lead of leads) {
    const res = await fetchWithRedirect(lead.website);
    if (!res.error && res.html) {
      let emails = extractEmails(res.html);
      lead.finalUrl = res.finalUrl;
      
      // If no emails found on homepage, try /contact
      if (emails.length === 0) {
        try {
          const contactUrl = new URL('/contact', res.finalUrl).href;
          const cRes = await fetchWithRedirect(contactUrl);
          if (!cRes.error && cRes.html) {
            const cEmails = extractEmails(cRes.html);
            if (cEmails.length > 0) emails = cEmails;
          }
        } catch (e) {}
      }

      lead.emails = emails;
      lead.primaryEmail = emails[0] || null;
      console.log(`✓ ${lead.name} -> Final: ${lead.finalUrl} | Email: ${lead.primaryEmail || 'None (Phone/WhatsApp)'}`);
    } else {
      console.log(`✗ ${lead.name} -> ${res.error}`);
    }
  }

  fs.writeFileSync('scripts/reading_audited_leads_deep.json', JSON.stringify(leads, null, 2));
  console.log('Finished deep inspection!');
}

deepInspect();
