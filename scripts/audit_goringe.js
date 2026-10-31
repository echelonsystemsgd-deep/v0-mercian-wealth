const https = require('https');
const fs = require('fs');

const url = 'https://goringeaccountants.co.uk/';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  timeout: 10000
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/goringe.html', data);
    console.log('Status:', res.statusCode);
    console.log('HTML length:', data.length);

    // Look for Calendly
    const calendlyMatches = data.match(/calendly[^\s"'>]*/gi) || [];
    console.log('Calendly references:', [...new Set(calendlyMatches)]);

    // Look for booking buttons / links
    const bookLinks = data.match(/<a[^>]*href=["'][^"']*["'][^>]*>[\s\S]*?<\/a>/gi) || [];
    const bookingAnchors = bookLinks.filter(l => /book|meeting|consultation|schedule|calendly/i.test(l));
    console.log('\nBooking links found:');
    bookingAnchors.forEach(a => console.log(a.replace(/\s+/g, ' ')));

    // Look for buttons
    const buttons = data.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
    const bookingButtons = buttons.filter(b => /book|meeting|consultation|schedule|calendly/i.test(b));
    console.log('\nBooking buttons found:');
    bookingButtons.forEach(b => console.log(b.replace(/\s+/g, ' ')));

    // Look for forms
    const forms = data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('\nTotal forms on homepage:', forms.length);
    forms.forEach((f, idx) => console.log(`Form ${idx}:`, f.slice(0, 200).replace(/\s+/g, ' ')));

    // Viewport
    const vp = data.match(/<meta[^>]*viewport[^>]*>/i);
    console.log('\nViewport:', vp ? vp[0] : 'NONE');

    // Title & Meta
    const title = data.match(/<title[^>]*>([^<]*)<\/title>/i);
    console.log('Title:', title ? title[1] : 'NONE');

    // Check images & visual structure
    const imgs = data.match(/<img[^>]*>/gi) || [];
    console.log('Total images:', imgs.length);

    // Check H1, H2
    const h1s = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log('H1s:', h1s.map(h => h.replace(/<[^>]+>/g, '').trim()));
  });
}).on('error', err => console.log('Error:', err.message));
