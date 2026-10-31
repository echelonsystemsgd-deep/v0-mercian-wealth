const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');

// Check HubSpot form references
const hs = html.match(/hubspot|hs-form/gi) || [];
console.log('HubSpot mentions on homepage:', hs.length);

// Let's check contact page html
const https = require('https');
https.get('https://www.rawaccounting.co.uk/contact/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const typo = d.match(/if your an individual/i);
    console.log('Typo "your an individual" found:', !!typo);
    const freeForms = d.match(/Create your own free forms/i);
    console.log('HubSpot free form badge found:', !!freeForms);
  });
});
