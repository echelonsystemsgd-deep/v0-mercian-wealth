const https = require('https');
const http = require('http');
const { URL } = require('url');

async function fetchFollowRedirect(targetUrl, maxRedirects = 5) {
  return new Promise((resolve) => {
    let currentUrl = targetUrl;
    let redirects = 0;

    function step(urlStr) {
      try {
        const u = new URL(urlStr);
        const client = u.protocol === 'https:' ? https : http;
        client.get(urlStr, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          timeout: 8000
        }, (res) => {
          if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirects < maxRedirects) {
            redirects++;
            const nextUrl = new URL(res.headers.location, urlStr).href;
            step(nextUrl);
          } else {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ finalUrl: urlStr, status: res.statusCode, headers: res.headers, data }));
          }
        }).on('error', (err) => resolve({ finalUrl: urlStr, error: err.message }));
      } catch (e) {
        resolve({ finalUrl: urlStr, error: e.message });
      }
    }

    step(currentUrl);
  });
}

async function checkAll() {
  const sites = [
    { name: 'Gondal Accountancy', url: 'https://www.gondalaccountancy.co.uk/' },
    { name: 'West Midlands Chartered Accountants', url: 'http://www.wmaccountants.com/' },
    { name: 'BAY Accountants Ltd', url: 'http://www.bay-accounting.co.uk/' },
    { name: 'MSB Accountants', url: 'http://www.msbaccountants.co.uk/' },
    { name: 'RK Accountancy Services', url: 'http://www.rk-accountancy.co.uk/' },
    { name: 'SM Accountants Ltd', url: 'http://www.smaccountantsltd.co.uk/' },
    { name: 'Cheylesmore Accountants', url: 'https://www.cheylesmore.com/' },
    { name: 'RR Accountants', url: 'https://rraccountants.uk/' }
  ];

  for (const s of sites) {
    const res = await fetchFollowRedirect(s.url);
    console.log(`\n=== ${s.name} ===`);
    console.log('Final URL:', res.finalUrl, 'Status:', res.status || res.error);
    if (res.data) {
      const title = res.data.match(/<title>([^<]+)<\/title>/i);
      console.log('Title:', title ? title[1].trim() : 'none');
      const emails = res.data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      console.log('Emails:', [...new Set(emails)].slice(0, 3));
      const phones = res.data.match(/(?:0121|07[0-9]{3}|\+44)[0-9\s-]{6,15}/g) || [];
      console.log('Phones:', [...new Set(phones)].slice(0, 3));
    }
  }
}

checkAll();
