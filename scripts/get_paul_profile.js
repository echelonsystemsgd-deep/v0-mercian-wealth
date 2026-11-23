const https = require('https');
const fs = require('fs');

https.get('https://www.armstrongwatson.co.uk/paul-dickson', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    fs.writeFileSync('armstrong_paul_profile.html', data);
    const emails = data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Emails on Paul page:', [...new Set(emails)]);
    const phones = data.match(/(?:0800|0808|01228|07[0-9]{3}|\+44)[0-9\s-]{6,15}/g) || [];
    console.log('Phones on Paul page:', [...new Set(phones)]);
    const links = data.match(/href="([^"]*)"/g) || [];
    const cleanLinks = [...new Set(links.map(l => l.replace(/href="|"/g, '')))];
    console.log('Social / profile links:');
    cleanLinks.filter(l => /linkedin|twitter|instagram|tel:|mailto:/i.test(l)).forEach(l => console.log(' ', l));
  });
}).on('error', console.error);
