const https = require('https');

function get(u) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const emails = Array.from(d.matchAll(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g)).map(m => m[0]);
        const phones = d.match(/(?:0118|07|\+44)[0-9\s-]{7,15}/g) || [];
        resolve({ url: u, status: res.statusCode, emails: [...new Set(emails)], phones: [...new Set(phones)] });
      });
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function inspectContacts() {
  const holloway = await get('https://www.hollowaycook.co.uk/contact-us/');
  console.log('Holloway contact-us:', holloway);

  const richardsons = await get('https://richardsonsaccountancy.co.uk/contact-us/');
  console.log('Richardsons contact-us:', richardsons);

  const james = await get('https://www.jamescowperkreston.co.uk/contact-us/');
  console.log('James Cowper contact-us:', james);
}

inspectContacts();
