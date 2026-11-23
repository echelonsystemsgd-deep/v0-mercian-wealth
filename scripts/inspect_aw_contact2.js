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

async function inspectAW2() {
  console.log('Fetching /contact-armstrong-watson...');
  const contact = await fetchUrl('https://www.armstrongwatson.co.uk/contact-armstrong-watson');
  console.log('Contact status:', contact.status);
  fs.writeFileSync('armstrong_contact_real.html', contact.data);

  console.log('Fetching /about-us/team...');
  const team = await fetchUrl('https://www.armstrongwatson.co.uk/about-us/team');
  console.log('Team status:', team.status);
  fs.writeFileSync('armstrong_team.html', team.data);

  // Analyze forms on contact-armstrong-watson
  const forms = contact.data.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Forms found on /contact-armstrong-watson:', forms.length);
  forms.forEach((f, idx) => {
    console.log(`\n--- FORM ${idx + 1} ---`);
    const action = f.match(/action="([^"]*)"/);
    console.log('Action:', action ? action[1] : 'none');
    const inputs = f.match(/<input[\s\S]*?>/gi) || [];
    console.log('Inputs count:', inputs.length);
    inputs.forEach(inp => console.log('  Input:', inp.slice(0, 120)));
    const textareas = f.match(/<textarea[\s\S]*?>/gi) || [];
    console.log('Textareas count:', textareas.length);
    const selects = f.match(/<select[\s\S]*?>/gi) || [];
    console.log('Selects count:', selects.length);
  });
}

inspectAW2().catch(console.error);
