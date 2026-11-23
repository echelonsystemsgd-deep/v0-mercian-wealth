const https = require('https');
const http = require('http');
const fs = require('fs');

async function fetchUrl(targetUrl) {
  return new Promise((resolve) => {
    try {
      const client = targetUrl.startsWith('https') ? https : http;
      client.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 10000
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
      }).on('error', (err) => resolve({ error: err.message }));
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

async function inspectTop3() {
  console.log('--- 1. GONDAL ACCOUNTANCY ---');
  const g = await fetchUrl('https://www.gondalaccountancy.co.uk/');
  console.log('Gondal status:', g.status || g.error);
  if (g.data) {
    fs.writeFileSync('birmingham_gondal.html', g.data);
    const emails = g.data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Gondal emails:', [...new Set(emails)]);
    const phones = g.data.match(/(?:0121|07[0-9]{3}|\+44)[0-9\s-]{6,15}/g) || [];
    console.log('Gondal phones:', [...new Set(phones)].slice(0, 5));
    const title = g.data.match(/<title>([^<]+)<\/title>/i);
    console.log('Gondal title:', title ? title[1] : 'none');
  }

  console.log('\n--- 2. WEST MIDLANDS CHARTERED ACCOUNTANTS ---');
  const wm = await fetchUrl('http://www.wmaccountants.com/');
  console.log('WM status:', wm.status || wm.error);
  if (wm.data) {
    fs.writeFileSync('birmingham_wm.html', wm.data);
    const emails = wm.data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('WM emails:', [...new Set(emails)]);
    const phones = wm.data.match(/(?:0121|07[0-9]{3}|\+44)[0-9\s-]{6,15}/g) || [];
    console.log('WM phones:', [...new Set(phones)].slice(0, 5));
    const title = wm.data.match(/<title>([^<]+)<\/title>/i);
    console.log('WM title:', title ? title[1] : 'none');
  }

  console.log('\n--- 3. BAY ACCOUNTANTS LTD ---');
  const bay = await fetchUrl('http://www.bay-accounting.co.uk/');
  console.log('BAY status:', bay.status || bay.error);
  if (bay.data) {
    fs.writeFileSync('birmingham_bay.html', bay.data);
    const emails = bay.data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('BAY emails:', [...new Set(emails)]);
    const phones = bay.data.match(/(?:0121|07[0-9]{3}|\+44)[0-9\s-]{6,15}/g) || [];
    console.log('BAY phones:', [...new Set(phones)].slice(0, 5));
    const title = bay.data.match(/<title>([^<]+)<\/title>/i);
    console.log('BAY title:', title ? title[1] : 'none');
  }
}

inspectTop3();
