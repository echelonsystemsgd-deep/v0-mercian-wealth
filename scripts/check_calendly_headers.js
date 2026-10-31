const https = require('https');

https.get('https://calendly.com/goringe-info/30min', (res) => {
  console.log('Calendly Headers:');
  console.log('x-frame-options:', res.headers['x-frame-options']);
  console.log('content-security-policy:', res.headers['content-security-policy']);
});
