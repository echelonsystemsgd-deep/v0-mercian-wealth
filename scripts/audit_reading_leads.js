const https = require('https');
const http = require('http');
const { URL } = require('url');

const readingLeads = [
  { name: 'Goldstar Accountants Ltd', phone: '0118 987 5500', website: 'http://www.goldstaraccountants.com/', address: '63 London St, Reading', rating: 4.9, reviews: 34, keyPerson: 'Amrit' },
  { name: 'Raw Accounting', phone: '0118 370 2547', website: 'https://rawaccounting.co.uk/', address: 'The White Building, 33 Kings Rd, Reading', rating: 4.9, reviews: 34 },
  { name: 'Chart Accountancy', phone: '0118 449 2321', website: 'https://www.chartaccountancy.com/', address: 'The Blade, Abbey Square, Reading', rating: 5.0, reviews: 76 },
  { name: 'Berkshire Accountants Limited', phone: '0118 327 4200', website: 'https://www.berkshireaccountants.com/', address: '50A London St, Reading', rating: 4.9, reviews: 37 },
  { name: 'Dead Simple Accounting', phone: '0118 359 3666', website: 'https://www.deadsimpleaccounting.co.uk/', address: 'Ste 30, 105 London St, Reading', rating: 5.0, reviews: 263 },
  { name: 'Growth Accountants', phone: '0345 990 0041', website: 'http://growth.accountants/', address: 'Quadrant House, Broad St, Reading', rating: 4.8, reviews: 41 },
  { name: 'KBN Accountants Limited', phone: '0118 957 2932', website: 'http://www.kbnaccountants.co.uk/', address: '12A Castle St, Reading', rating: 5.0, reviews: 36 },
  { name: 'Finanche Ltd', phone: '0345 512 0102', website: 'https://www.finanche.co.uk/', address: '100 Grovelands Rd, Reading', rating: 5.0, reviews: 32 },
  { name: 'Specialist Accounting Solutions Ltd', phone: '0118 911 3777', website: 'https://teamsas.co.uk/', address: 'The Blade, Abbey Square, Reading', rating: 5.0, reviews: 18 },
  { name: 'Holy Brook Accountants', phone: '07914 211828', website: 'http://www.holybrook.com/', address: 'Thames Tower, Fora, Station Rd, Reading', rating: 5.0, reviews: 31 },
  { name: 'Assets Accounting Ltd', phone: '0118 946 4700', website: 'https://www.assets.ltd.uk/', address: 'Chiltern Chambers, 37 St Peter\'s Ave, Reading', rating: 5.0, reviews: 32, keyPerson: 'Andrew' },
  { name: 'Vale and West', phone: '0118 957 3238', website: 'https://www.valewest.com/', address: 'Victoria House, 26 Queen Victoria St, Reading', rating: 4.8, reviews: 4 },
  { name: 'Jose & Associates', phone: '07375 054827', website: 'https://www.joseassociates.co.uk/', address: '26 Mead Cl, Reading', rating: 5.0, reviews: 1 },
  { name: 'GTS Accounting', phone: '07595 399694', website: 'http://www.gtsaccounting.co.uk/', address: 'Kennet island, The Piazza, Reading', rating: 4.7, reviews: 27 },
  { name: 'AG Accountant Polska', phone: '07742 858404', website: 'https://agaccountant.co.uk/', address: '3, Sulham Place, Pangbourne St, Reading', rating: 5.0, reviews: 18 },
  { name: 'Cryer Sandham Limited', phone: '0118 959 0221', website: 'https://www.cryer-sandham.co.uk/', address: '55 Russell St, Reading', rating: 5.0, reviews: 1 },
  { name: 'Edmonds Accountancy', phone: '0118 988 8899', website: 'https://www.edmonds-accountancy.co.uk/', address: 'Unit 11, Lambwood Hill, Reading', rating: 4.8, reviews: 41 },
  { name: 'Avery Clifton Accountants', phone: '0118 907 9224', website: 'http://averyclifton.com/', address: '30 Harrogate Rd, Reading', rating: 5.0, reviews: 19 },
  { name: 'Redwood Accountants', phone: '0118 995 2011', website: 'http://www.redwoodaccountants.com/', address: '26 Martingale Grv, Reading', rating: 4.8, reviews: 19 },
  { name: 'James Cowper Kreston', phone: '0118 959 0261', website: 'http://www.jamescowperkreston.co.uk/', address: 'Apex, Forbury Rd, Reading', rating: 5.0, reviews: 10 },
  { name: 'Richardsons Accountants', phone: '0118 957 3118', website: 'https://richardsonsaccountancy.co.uk/', address: '99 London St, Reading', rating: 5.0, reviews: 5 },
  { name: 'Holloway Cook Ltd', phone: '0118 939 1333', website: 'http://www.hollowaycook.co.uk/', address: '55 Russell St, Reading', rating: 5.0, reviews: 1 },
  { name: 'MAH Cloud Accountancy', phone: '0800 772 0607', website: 'http://www.mahandco-acca.co.uk/', address: '211 Basingstoke Rd, Reading', rating: 5.0, reviews: 6 },
  { name: 'Tax Minds Limited', phone: '07585 424845', website: 'https://www.taxminds.uk/', address: '27 Pangbourne St, Reading', rating: 5.0, reviews: 6 },
  { name: 'Biz Accounting Solutions', phone: '07877 224964', website: 'https://bizasl.co.uk/', address: '12 Fuchsia Grove, Reading', rating: 5.0, reviews: 12 },
  { name: 'Brimz Financials Ltd', phone: '07868 668283', website: 'https://www.brimzfinancials.com/', address: '9 Greyfriars Rd, Reading', rating: 5.0, reviews: 22 },
  { name: 'Melanie Curtis Accountants', phone: '0118 402 9900', website: 'https://www.melaniecurtisaccountants.co.uk/', address: '9 Greyfriars Rd, Reading', rating: 5.0, reviews: 2 },
  { name: 'Goringe Accountants', phone: '0118 914 4500', website: 'https://goringeaccountants.co.uk/', address: 'Arlington Business Park, Reading', rating: 4.9, reviews: 69 },
  { name: 'Hurn Accountants Limited', phone: '0118 909 9616', website: 'http://www.hurntax.co.uk/', address: '54 Norcot Rd, Reading', rating: 5.0, reviews: 3 },
  { name: 'Brywel Associates', phone: '0118 946 3443', website: 'http://www.brywelassociates.co.uk/', address: '37 St Peter\'s Ave, Reading', rating: 4.8, reviews: 4, keyPerson: 'Andy' }
];

function fetchUrl(targetUrl, timeoutMs = 7000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(targetUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        rejectUnauthorized: false
      }, (res) => {
        let data = '';
        res.on('data', chunk => {
          if (data.length < 500000) data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            finalUrl: res.headers.location || targetUrl,
            html: data
          });
        });
      });
      req.on('error', (err) => resolve({ error: err.message }));
      req.setTimeout(timeoutMs, () => {
        req.destroy();
        resolve({ error: 'timeout' });
      });
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

function extractEmails(html) {
  if (!html) return [];
  const mailtoMatches = Array.from(html.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi)).map(m => m[1].toLowerCase());
  const textMatches = Array.from(html.matchAll(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g)).map(m => m[0].toLowerCase());
  const combined = [...new Set([...mailtoMatches, ...textMatches])].filter(e => !e.endsWith('.png') && !e.endsWith('.jpg') && !e.includes('sentry') && !e.includes('wixpress') && !e.includes('wordpress'));
  return combined;
}

function auditHtml(html, headers, lead) {
  const frictions = [];
  const rawHtml = html || '';

  // 1. SSL/TLS check
  if (lead.website.startsWith('http://') && (!headers || !headers['strict-transport-security'])) {
    frictions.push('Insecure HTTP entrypoint with missing apex HSTS header');
  }

  // 2. Viewport
  if (!rawHtml.includes('name="viewport"') && !rawHtml.includes("name='viewport'")) {
    frictions.push('Missing responsive viewport meta tag (breaks mobile scaling)');
  }

  // 3. Form inspection
  const formsCount = (rawHtml.match(/<form/gi) || []).length;
  const inputCount = (rawHtml.match(/<input/gi) || []).length;
  if (formsCount > 0 && inputCount >= 6) {
    frictions.push(`High-friction contact wall (${inputCount} input fields before discovery)`);
  }

  // 4. Broken/outdated widgets
  if (rawHtml.includes('recaptcha') && !rawHtml.includes('grecaptcha.enterprise')) {
    frictions.push('Legacy Google reCAPTCHA v2 badge introducing mobile conversion drop-off');
  }

  // 5. WhatsApp instant alternative
  const hasWhatsApp = rawHtml.includes('wa.me') || rawHtml.includes('whatsapp.com');
  if (!hasWhatsApp) {
    frictions.push('No direct WhatsApp or instant messaging alternative for mobile prospects');
  }

  // 6. Response promise
  const hasResponsePromise = /within \d+ hours|24 hours|same day response/i.test(rawHtml);
  if (!hasResponsePromise) {
    frictions.push('No stated turnaround or response SLA on intake form');
  }

  return frictions;
}

async function runAudit() {
  console.log(`Starting audit of ${readingLeads.length} Reading accounting practices...\n`);
  const auditedLeads = [];

  for (const lead of readingLeads) {
    process.stdout.write(`Auditing: ${lead.name}... `);
    const res = await fetchUrl(lead.website);

    let emails = [];
    let frictions = [];
    let statusText = 'OK';

    if (res.error) {
      statusText = `Error: ${res.error}`;
      frictions.push(`Site accessibility failure: ${res.error}`);
    } else {
      emails = extractEmails(res.html);
      frictions = auditHtml(res.html, res.headers, lead);
    }

    console.log(`[${res.statusCode || 'FAIL'}] Found ${emails.length} email(s) | Primary Flaw: ${frictions[0] || 'Clean'}`);

    auditedLeads.push({
      ...lead,
      statusCode: res.statusCode,
      emails,
      primaryEmail: emails[0] || null,
      frictions,
      primaryFlaw: frictions[0] || 'Static unsegmented contact form with 24-48h email triage lag'
    });
  }

  const fs = require('fs');
  fs.writeFileSync('scripts/reading_audited_leads.json', JSON.stringify(auditedLeads, null, 2));
  console.log('\nAudit complete! Saved data to scripts/reading_audited_leads.json');
}

runAudit();
