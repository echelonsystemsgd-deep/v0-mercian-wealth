const https = require('https');
const fs = require('fs');

https.get('https://www.gov.uk/government/publications/list-of-cities/list-of-cities-html', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    fs.writeFileSync('gov_uk_cities.html', data);
    console.log('Saved gov_uk_cities.html, size:', data.length);
  });
}).on('error', console.error);
