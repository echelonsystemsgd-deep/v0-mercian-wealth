const fs = require('fs');
const https = require('https');

const envContent = fs.readFileSync('.env.local', 'utf8');
const key = (envContent.match(/^COMPANIES_HOUSE_API_KEY=(.*)$/m) || [])[1]?.trim().replace(/^['"]|['"]$/g, '');

function getOfficers(companyNumber) {
  const options = {
    hostname: 'api.company-information.service.gov.uk',
    path: `/company/${companyNumber}/officers`,
    headers: {
      'Authorization': 'Basic ' + Buffer.from(key + ':').toString('base64')
    }
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`=== Officers for ${companyNumber} ===`);
        json.items?.forEach(i => console.log(`• ${i.name} (${i.officer_role}) - Appointed: ${i.appointed_on}`));
      } catch (e) {
        console.log('Error:', data);
      }
    });
  }).on('error', err => console.error(err));
}

getOfficers('15104819');
