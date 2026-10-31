const https = require('https');

function fetchUrl(u) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function checkDetails() {
  const hurnContact = await fetchUrl('https://www.hurntax.co.uk/contact-us');
  console.log('Hurn /contact-us status:', hurnContact.status, 'Length:', hurnContact.data.length);
  const formsInHurn = hurnContact.data.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Forms in Hurn /contact-us:', formsInHurn.length);
  const inputsInHurn = hurnContact.data.match(/<input[^>]*>/gi) || [];
  console.log('Inputs in Hurn /contact-us:', inputsInHurn.length);

  const kbnService1 = await fetchUrl('https://www.kbnaccountants.co.uk/service1.html');
  console.log('KBN /service1.html status:', kbnService1.status, 'Length:', kbnService1.data.length);
}

checkDetails();
