const fs = require('fs');

console.log('====================================');
console.log('1. STRICT AUDIT OF ABACUS LEEDS (abacus_raw.html)');
console.log('====================================');
const abacus = fs.readFileSync('abacus_raw.html', 'utf8');

// Check phone numbers
const abacusPhones = abacus.match(/0113[\s\d-]+|07[\d\s-]{8,12}/g) || [];
console.log('Phones found:', [...new Set(abacusPhones)]);

// Check emails
const abacusEmails = abacus.match(/[\w.-]+@abacusleeds\.co\.uk/g) || [];
console.log('Emails found:', [...new Set(abacusEmails)]);

// Check address / Company No
const abacusCoNo = abacus.match(/Company No:?\s*(\d+)/i);
console.log('Company Registration:', abacusCoNo ? abacusCoNo[0] : 'None');

// Check form fields
const formMatches = abacus.match(/<input[^>]+name="form_fields\[[^\]]+\]"[^>]*>/g) || [];
console.log('Form inputs detected:');
formMatches.forEach(m => console.log('  ', m));

// Check social links
const abacusSocials = abacus.match(/https?:\/\/(www\.)?(facebook|instagram|linkedin|twitter|youtube)\.com\/[a-zA-Z0-9_.-]+/g) || [];
console.log('Social links found:', [...new Set(abacusSocials)]);

// Check Headingly typo
console.log('Contains "Headingly" count:', (abacus.match(/Headingly/g) || []).length);


console.log('\n====================================');
console.log('2. STRICT AUDIT OF A&C CHARTERED (ac_raw.html)');
console.log('====================================');
const ac = fs.readFileSync('ac_raw.html', 'utf8');

// Check phones
const acPhones = ac.match(/0161[\s\d-]+/g) || [];
console.log('Phones found:', [...new Set(acPhones)]);

// Check emails
const acEmails = ac.match(/[\w.-]+@ac-accounts\.co\.uk/g) || [];
console.log('Emails found:', [...new Set(acEmails)]);

// Check address / Company No
const acCoNo = ac.match(/Company Registered in England & Wales No:?\s*(\d+)/i) || ac.match(/06272442|08754214/g);
console.log('Company No matches:', acCoNo ? acCoNo : 'None');

// Check social links
const acSocials = ac.match(/https?:\/\/(www\.)?(facebook|instagram|linkedin|twitter|youtube)\.com\/[^\s"'>]+/g) || [];
console.log('Social links found:', [...new Set(acSocials)]);

// Check addresses
console.log('Contains 53 King Street:', ac.includes('53 King Street'));
console.log('Contains Marsland Road:', ac.includes('Marsland Road'));


console.log('\n====================================');
console.log('3. STRICT AUDIT OF COLLINS CHARTERED (collins_raw.html)');
console.log('====================================');
const collins = fs.readFileSync('collins_raw.html', 'utf8');

// Check phones
const collinsPhones = collins.match(/0121[\s\d-]+/g) || [];
console.log('Phones found:', [...new Set(collinsPhones)]);

// Check emails
const collinsEmails = collins.match(/[\w.-]+@collins-chartered-accountants\.co\.uk/g) || [];
console.log('Emails found:', [...new Set(collinsEmails)]);

// Check copyright
const collinsCopy = collins.match(/© Collins \d{4}/i);
console.log('Copyright found:', collinsCopy ? collinsCopy[0] : 'None');

// Check address
console.log('Contains Castle Bromwich Hall:', collins.includes('Castle Bromwich Hall'));

// Check dead # links
const deadHashMatches = collins.match(/<a[^>]+href="#"[^>]*>[^<]*<\/a>/g) || [];
console.log('Dead href="#" links sample (total ' + deadHashMatches.length + '):');
deadHashMatches.slice(0, 5).forEach(m => console.log('  ', m));

// Check social links
const collinsSocials = collins.match(/https?:\/\/(www\.)?(facebook|instagram|linkedin|twitter|youtube)\.com\/[^\s"'>]+/g) || [];
console.log('Social links found:', [...new Set(collinsSocials)]);
