const https = require('https');
const fs = require('fs');

const url = 'https://www.taxminds.uk/';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  timeout: 10000
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/taxminds.html', data);
    console.log('Status:', res.statusCode);
    console.log('HTML length:', data.length);

    // Title
    const titleMatch = data.match(/<title[^>]*>([^<]*)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

    // Viewport
    const vpMatch = data.match(/<meta[^>]*viewport[^>]*>/i);
    console.log('Viewport:', vpMatch ? vpMatch[0] : 'NONE');

    // Meta description
    const descMatch = data.match(/<meta[^>]*description[^>]*>/i);
    console.log('Description:', descMatch ? descMatch[0] : 'NONE');

    // Forms
    const forms = data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms count:', forms.length);

    // Booking links / buttons
    const bookLinks = data.match(/<a[^>]*href=["'][^"']*["'][^>]*>[\s\S]*?<\/a>/gi) || [];
    const bookingAnchors = bookLinks.filter(l => /book|meeting|consultation|schedule|calendly/i.test(l));
    console.log('Booking anchors:', bookingAnchors.map(a => a.replace(/\s+/g, ' ')));

    // Emails
    const emails = data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Emails:', [...new Set(emails)]);

    // Phones
    const phones = data.match(/(?:0|\+44)[0-9\s-]{9,14}/g) || [];
    console.log('Phones:', [...new Set(phones.map(p => p.trim()))]);

    // CMS
    const isWix = data.includes('wix.com') || data.includes('X-Wix') || data.includes('wix-warmup-data');
    console.log('Is Wix:', isWix);
  });
}).on('error', err => console.log('Error:', err.message));
