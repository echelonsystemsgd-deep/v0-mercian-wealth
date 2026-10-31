const https = require('https');

function checkSubpage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length, data: data.substring(0, 1000) }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function inspect() {
  console.log('Checking Hurn contact page:');
  const hurnContact = await checkSubpage('https://www.hurntax.co.uk/contact');
  console.log('Hurn /contact status:', hurnContact.status);

  console.log('Checking KBN contact page:');
  const kbnContact = await checkSubpage('https://www.kbnaccountants.co.uk/contact.html');
  console.log('KBN /contact.html status:', kbnContact.status);
}

inspect();
