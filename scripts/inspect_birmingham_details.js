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

async function deepInspect() {
  console.log('--- 1. GONDAL ACCOUNTANCY ---');
  const g = await fetchUrl('https://www.gondalaccountancy.co.uk/');
  if (g.data) {
    fs.writeFileSync('gondal_home.html', g.data);
    const forms = g.data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms count:', forms.length);
    const links = g.data.match(/href="([^"]*)"/g) || [];
    const cleanLinks = [...new Set(links.map(l => l.replace(/href="|"/g, '')))];
    console.log('Socials / contact links:');
    cleanLinks.filter(l => /linkedin|facebook|instagram|twitter|contact|about|team/i.test(l)).forEach(l => console.log(' ', l));
  }

  console.log('\n--- 2. RK ACCOUNTANCY ---');
  const rk = await fetchUrl('https://rk-accountancy.co.uk/');
  if (rk.data) {
    fs.writeFileSync('rk_home.html', rk.data);
    const forms = rk.data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms count:', forms.length);
    const links = rk.data.match(/href="([^"]*)"/g) || [];
    const cleanLinks = [...new Set(links.map(l => l.replace(/href="|"/g, '')))];
    console.log('Socials / contact links:');
    cleanLinks.filter(l => /linkedin|facebook|instagram|twitter|contact|about|team/i.test(l)).forEach(l => console.log(' ', l));
  }

  console.log('\n--- 3. MSB ACCOUNTANTS ---');
  const msb = await fetchUrl('https://www.msbaccountants.co.uk/');
  if (msb.data) {
    fs.writeFileSync('msb_home.html', msb.data);
    const forms = msb.data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms count:', forms.length);
    const links = msb.data.match(/href="([^"]*)"/g) || [];
    const cleanLinks = [...new Set(links.map(l => l.replace(/href="|"/g, '')))];
    console.log('Socials / contact links:');
    cleanLinks.filter(l => /linkedin|facebook|instagram|twitter|contact|about|team/i.test(l)).forEach(l => console.log(' ', l));
  }
}

deepInspect();
