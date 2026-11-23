const https = require('https');
const fs = require('fs');

async function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    }).on('error', reject);
  });
}

async function inspectAW() {
  console.log('Fetching contact page...');
  const contact = await fetchUrl('https://www.armstrongwatson.co.uk/contact-us');
  console.log('Contact status:', contact.status);
  fs.writeFileSync('armstrong_contact.html', contact.data);

  console.log('Fetching leadership / about page...');
  const about = await fetchUrl('https://www.armstrongwatson.co.uk/our-people/paul-dickson');
  console.log('Paul Dickson page status:', about.status);
  if (about.status === 200) {
    fs.writeFileSync('armstrong_paul.html', about.data);
  }

  // Look for forms in contact page
  const forms = contact.data.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Forms found on contact-us:', forms.length);
  forms.forEach((f, idx) => {
    console.log(`\n--- FORM ${idx + 1} ---`);
    const action = f.match(/action="([^"]*)"/);
    console.log('Action:', action ? action[1] : 'none');
    const inputs = f.match(/<input[\s\S]*?>/gi) || [];
    console.log('Inputs count:', inputs.length);
    inputs.forEach(inp => console.log('  Input:', inp.slice(0, 100)));
    const selects = f.match(/<select[\s\S]*?>/gi) || [];
    console.log('Selects count:', selects.length);
  });
}

inspectAW().catch(console.error);
