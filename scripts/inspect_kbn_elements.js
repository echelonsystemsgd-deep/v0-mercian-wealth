const fs = require('fs');

const kbn = fs.readFileSync('scripts/audit_https___www_kbnaccountants_co_uk_.html', 'utf8');

// Find phone number 0118 in kbn
const phoneMatches = kbn.match(/.{0,50}0118\s*957\s*2932.{0,50}/gi);
console.log('KBN Phone markup:', phoneMatches);

// Find email markup in kbn
const emailMatches = kbn.match(/.{0,50}info@kbnaccountants\.co\.uk.{0,50}/gi);
console.log('KBN Email markup:', emailMatches);
