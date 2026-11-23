const https = require('https');
const http = require('http');
const fs = require('fs');

async function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const client = targetUrl.startsWith('https') ? https : http;
    client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verifyAll() {
  console.log('--- 1. VERIFYING ABACUS LEEDS ---');
  const abacus = await fetchUrl('https://www.abacusleeds.co.uk/');
  console.log('Abacus Status:', abacus.status);
  console.log('Contains Ishtiaq Farooqui?', abacus.data.includes('Ishtiaq Farooqui') || abacus.data.includes('Ishtiaq'));
  console.log('Contains 0113 226 5982?', abacus.data.includes('0113 226 5982'));
  console.log('Contains 07903 843732?', abacus.data.includes('07903 843732') || abacus.data.includes('07903843732'));
  console.log('Contains tax@abacusleeds.co.uk?', abacus.data.includes('tax@abacusleeds.co.uk'));
  console.log('Contains name="form_fields[email]" on telephone?', abacus.data.includes('name="form_fields[email]"'));
  console.log('Contains type="file"?', abacus.data.includes('type="file"'));
  console.log('Contains Instagram link?', abacus.data.includes('instagram.com/abacustaxadvisors'));
  console.log('Contains Headingly typo?', abacus.data.includes('Headingly'));
  console.log('Contains 09494119?', abacus.data.includes('09494119'));

  const abacusTeam = await fetchUrl('https://www.abacusleeds.co.uk/meet-the-team.html');
  console.log('Abacus Team Status:', abacusTeam.status);
  console.log('Team Page contains Ishtiaq Farooqui?', abacusTeam.data.includes('Ishtiaq Farooqui'));

  console.log('\n--- 2. VERIFYING A&C CHARTERED ACCOUNTANTS ---');
  const ac = await fetchUrl('https://www.ac-accounts.co.uk/');
  console.log('A&C Status:', ac.status);
  console.log('Contains 0161 962 1855?', ac.data.includes('0161 962 1855') || ac.data.includes('01619621855'));
  console.log('Contains info@ac-accounts.co.uk?', ac.data.includes('info@ac-accounts.co.uk'));
  console.log('Contains Instagram link?', ac.data.includes('instagram.com/ac_accountants'));
  console.log('Contains LinkedIn link?', ac.data.includes('linkedin.com/company/a&c-chartered-accountants'));
  console.log('Contains 53 King Street?', ac.data.includes('53 King Street'));
  console.log('Contains 06272442?', ac.data.includes('06272442'));
  
  const acTeam = await fetchUrl('https://www.ac-accounts.co.uk/team/');
  console.log('A&C Team Status:', acTeam.status);
  console.log('Team Page contains Paul?', acTeam.data.includes('Paul'));
  console.log('Team Page contains Steph?', acTeam.data.includes('Steph'));

  const acContact = await fetchUrl('https://www.ac-accounts.co.uk/contact/');
  console.log('A&C Contact Status:', acContact.status);
  console.log('Contact contains wpforms phone field?', acContact.data.includes('type="number"') || acContact.data.includes('wpforms'));

  console.log('\n--- 3. VERIFYING COLLINS CHARTERED ACCOUNTANTS ---');
  const collins = await fetchUrl('https://collins-chartered-accountants.co.uk/');
  console.log('Collins Status:', collins.status);
  console.log('Contains 0121 748 3122?', collins.data.includes('0121 748 3122') || collins.data.includes('01217483122'));
  console.log('Contains admin@collins-chartered-accountants.co.uk?', collins.data.includes('admin@collins-chartered-accountants.co.uk'));
  console.log('Contains © Collins 2021?', collins.data.includes('Collins 2021'));
  console.log('Contains The Lodge, Castle Bromwich Hall?', collins.data.includes('Castle Bromwich Hall'));
  console.log('Contains John Collins or Nigel Collins?', collins.data.includes('John Collins') || collins.data.includes('Nigel Collins'));
  console.log('Contains LinkedIn link?', collins.data.includes('linkedin.com/company/collins-chartered-accountants'));

  const collinsAbout = await fetchUrl('https://collins-chartered-accountants.co.uk/about-us/');
  console.log('Collins About Status:', collinsAbout.status);
  console.log('About contains John Collins FCA?', collinsAbout.data.includes('John Collins'));
  console.log('About contains Nigel Collins FCA?', collinsAbout.data.includes('Nigel Collins'));
}

verifyAll();
