const https = require('https');

https.get('https://www.uttamrasoi.com', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const phones = d.match(/(?:\+91|0)?[6-9]\d{9}/g) || [];
    console.log('Phones on uttamrasoi.com:', [...new Set(phones)]);
    const emails = d.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Emails on uttamrasoi.com:', [...new Set(emails)]);
  });
});
