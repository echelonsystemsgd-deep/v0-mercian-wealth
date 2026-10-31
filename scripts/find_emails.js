const https = require('https');

async function checkSubpages() {
  const urls = [
    'https://averyclifton.com/contact/',
    'https://averyclifton.com/contact-us/',
    'https://redwoodaccountants.com/contact/',
    'https://redwoodaccountants.com/about-us/'
  ];

  for (const u of urls) {
    await new Promise((resolve) => {
      https.get(u, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 8000
      }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log(`URL: ${u} [${res.statusCode}]`);
          const emails = d.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
          console.log('Emails:', [...new Set(emails)].filter(e => !e.endsWith('.png') && !e.includes('schema.org') && !e.includes('w3.org') && !e.includes('sentry.io')));
          const phones = d.match(/(?:(?:\+44\s?\(0\)\s?|\+44\s?|0)[1-9]\d{1,4}\s?\d{3,4}\s?\d{3,4})/g) || [];
          console.log('Phones:', [...new Set(phones)]);
          resolve();
        });
      }).on('error', e => { console.log(u, e.message); resolve(); });
    });
  }
}
checkSubpages();
