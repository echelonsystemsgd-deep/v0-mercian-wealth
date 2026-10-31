const fs = require('fs');

const hurnHtml = fs.readFileSync('scripts/audit_https___www_hurntax_co_uk_.html', 'utf8');
const links = Array.from(hurnHtml.matchAll(/href=["']([^"']+)["']/gi)).map(m => m[1]);
console.log('Hurn links:', [...new Set(links)].filter(l => !l.includes('wix') && !l.includes('static')));

const kbnHtml = fs.readFileSync('scripts/audit_https___www_kbnaccountants_co_uk_.html', 'utf8');
const kbnLinks = Array.from(kbnHtml.matchAll(/href=["']([^"']+)["']/gi)).map(m => m[1]);
console.log('KBN links:', [...new Set(kbnLinks)]);
