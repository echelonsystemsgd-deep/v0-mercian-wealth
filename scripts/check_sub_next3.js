const https = require('https');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length, data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function checkSub() {
  const goringeContact = await fetchPage('https://goringeaccountants.co.uk/contact-us/');
  console.log('Goringe /contact-us status:', goringeContact.status);
  const gForms = (goringeContact.data || '').match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Goringe contact forms count:', gForms.length);
  if (gForms[0]) {
    const inputs = gForms[0].match(/<input|<textarea|<select/gi) || [];
    console.log('Inputs in Goringe contact form:', inputs.length);
  }

  const brimzContact = await fetchPage('https://www.brimzfinancials.com/contact');
  console.log('Brimz /contact status:', brimzContact.status);
  const bForms = (brimzContact.data || '').match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Brimz contact forms count:', bForms.length);
  if (bForms[0]) {
    const inputs = bForms[0].match(/<input|<textarea|<select/gi) || [];
    console.log('Inputs in Brimz contact form:', inputs.length);
  }
}

checkSub();
