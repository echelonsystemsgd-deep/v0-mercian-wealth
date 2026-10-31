const https = require('https');
const fs = require('fs');

https.get('https://goringeaccountants.co.uk/contact/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)'
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/goringe_contact.html', d);
    console.log('Contact page length:', d.length);

    // Look for forms on contact page
    const forms = d.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms on contact page:', forms.length);
    forms.forEach((f, idx) => console.log(`Contact Form ${idx}:`, f.slice(0, 200).replace(/\s+/g, ' ')));

    // Look for Calendly on contact page
    const cal = d.match(/calendly[^\s"'>]*/gi) || [];
    console.log('Calendly on contact page:', [...new Set(cal)]);

    // Check contact numbers
    const tels = d.match(/href=["']tel:[^"']*["']/gi) || [];
    console.log('Tels on contact page:', [...new Set(tels)]);
  });
}).on('error', e => console.log('Error:', e.message));
