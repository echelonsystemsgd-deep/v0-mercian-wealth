const https = require('https');

https.get('https://www.rawaccounting.co.uk/contact/', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Contact status:', res.statusCode);
    const emails = d.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Emails on contact page:', [...new Set(emails)]);
    const tels = d.match(/href=["']tel:[^"']*["']/gi) || [];
    console.log('Tels on contact page:', [...new Set(tels)]);
    const wa = d.match(/wa\.me[^\s"'>]*|whatsapp[^\s"'>]*/gi) || [];
    console.log('WhatsApp links:', [...new Set(wa)]);
  });
}).on('error', e => console.log('Error:', e.message));
