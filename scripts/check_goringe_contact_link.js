const fs = require('fs');
const html = fs.readFileSync('scripts/audit_https___goringeaccountants_co_uk_.html', 'utf8');
const contactLinks = html.match(/href=["'][^"']*contact[^"']*["']/gi);
console.log('Contact links in Goringe homepage:', contactLinks);
