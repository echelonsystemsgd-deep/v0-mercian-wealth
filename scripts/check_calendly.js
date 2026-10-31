const https = require('https');

https.get('https://calendly.com/goringe-info/30min', (res) => {
  console.log('Calendly URL HTTP status:', res.statusCode);
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Calendly page length:', data.length);
    const title = data.match(/<title[^>]*>([^<]*)<\/title>/i);
    console.log('Calendly title:', title ? title[1] : 'NONE');
    const isAvailable = !data.includes('This Calendly URL is not valid') && !data.includes('link is no longer active');
    console.log('Is valid active event:', isAvailable);
  });
}).on('error', e => console.log('Error:', e.message));
