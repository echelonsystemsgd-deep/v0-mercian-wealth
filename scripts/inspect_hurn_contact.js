const https = require('https');

https.get('https://www.hurntax.co.uk/contact-us', { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Check phone numbers and links
    const phones = data.match(/.{0,50}0118\s*909\s*9616.{0,50}/gi);
    console.log('Hurn Phone markup:', phones);

    // Check viewport
    const vp = data.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
    console.log('Hurn Viewport on contact page:', vp ? vp[1] : 'none');

    // Check forms
    const forms = data.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Hurn forms on contact page:', forms.length);
    if (forms[0]) {
      console.log('Form snippet:', forms[0].substring(0, 500));
    }
  });
});
