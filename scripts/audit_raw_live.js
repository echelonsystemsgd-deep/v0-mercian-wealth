const https = require('https');
const fs = require('fs');

const url = 'https://www.rawaccounting.co.uk/';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  timeout: 10000
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/rawaccounting.html', data);
    console.log('Status:', res.statusCode);
    console.log('HTML length:', data.length);

    // Title
    const titleMatch = data.match(/<title[^>]*>([^<]*)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'NONE');

    // Viewport
    const vpMatch = data.match(/<meta[^>]*viewport[^>]*>/i);
    console.log('Viewport:', vpMatch ? vpMatch[0] : 'NONE');

    // Forms
    const forms = data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms count on homepage:', forms.length);

    // Images
    const imgs = data.match(/<img[^>]*>/gi) || [];
    console.log('Images count on homepage:', imgs.length);

    // Emails
    const emails = data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Emails found:', [...new Set(emails)].filter(e => !e.endsWith('.png') && !e.includes('schema.org') && !e.includes('w3.org')));

    // Phones
    const phones = data.match(/(?:(?:\+44\s?\(0\)\s?|\+44\s?|0)[1-9]\d{1,4}\s?\d{3,4}\s?\d{3,4})/g) || [];
    console.log('Phones found:', [...new Set(phones.map(p => p.trim()))]);

    // Check footer copyright
    const copyright = data.match(/©[^\n<]{0,50}|&copy;[^\n<]{0,50}|copyright[^\n<]{0,50}/gi) || [];
    console.log('Copyright notice:', [...new Set(copyright)]);

    // Check CMS / theme / widgets
    const isWp = data.includes('wp-content');
    console.log('Is WordPress:', isWp);
    const hasChaty = data.includes('chaty') || data.includes('chat-widget');
    console.log('Has Chaty widget:', hasChaty);
  });
}).on('error', err => console.log('Error:', err.message));
