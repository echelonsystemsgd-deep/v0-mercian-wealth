const https = require('https');

function fetchUrl(urlStr) {
  return new Promise((resolve) => {
    try {
      const req = https.get(urlStr, {
        headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)' },
        timeout: 10000,
        rejectUnauthorized: false
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const newUrl = new URL(res.headers.location, urlStr).toString();
          return resolve(fetchUrl(newUrl));
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ url: urlStr, status: res.statusCode, html: data }));
      });
      req.on('error', (err) => resolve({ url: urlStr, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url: urlStr, error: 'TIMEOUT' }); });
    } catch(e) {
      resolve({ url: urlStr, error: e.message });
    }
  });
}

async function inspectDetails() {
  // 1. Check Redwood Accountants contact page and tel link
  console.log('--- Inspecting Redwood Accountants ---');
  const rwRes = await fetchUrl('https://redwoodaccountants.com/');
  const rwContact = await fetchUrl('https://redwoodaccountants.com/contact-us/');
  const rwCombined = (rwRes.html || '') + (rwContact.html || '');
  const rwTels = rwCombined.match(/href=["']tel:([^"']+)["']/gi) || [];
  console.log('Redwood tel links:', rwTels);
  const rwEmails = rwCombined.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  console.log('Redwood emails:', [...new Set(rwEmails)].filter(e => !e.endsWith('.png') && !e.includes('schema.org')));
  
  // 2. Check Avery Clifton contact page & email
  console.log('\n--- Inspecting Avery Clifton ---');
  const acRes = await fetchUrl('https://averyclifton.com/');
  const acContact = await fetchUrl('https://averyclifton.com/contact-us/');
  const acCombined = (acRes.html || '') + (acContact.html || '');
  const acEmails = acCombined.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  console.log('Avery Clifton emails:', [...new Set(acEmails)].filter(e => !e.endsWith('.png') && !e.includes('schema.org')));
  const acForms = acRes.html ? (acRes.html.match(/<form[\s\S]*?<\/form>/gi) || []) : [];
  console.log('Avery Clifton homepage form snippet:', acForms.map(f => f.slice(0, 150)));

  // 3. Check Team SAS forms
  console.log('\n--- Inspecting Specialist Accounting Solutions (Team SAS) ---');
  const sasRes = await fetchUrl('https://teamsas.co.uk/');
  const sasForms = sasRes.html ? (sasRes.html.match(/<form[\s\S]*?<\/form>/gi) || []) : [];
  console.log('SAS forms count:', sasForms.length);
  sasForms.forEach((f, idx) => {
    console.log(`SAS Form ${idx}:`, f.slice(0, 200).replace(/\s+/g, ' '));
  });
  const sasAddress = sasRes.html ? sasRes.html.match(/Reading[^<]*RG\d[^<]*/gi) : [];
  console.log('SAS Reading address hints:', sasAddress);
}

inspectDetails();
