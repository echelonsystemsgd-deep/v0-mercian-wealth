const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

const heroRowStart = html.indexOf('fusion-builder-row-3');
const heroRowEnd = html.indexOf('fusion-builder-row-4');

console.log('--- Hero Row 3 Content ---');
const heroHtml = html.slice(heroRowStart, heroRowEnd !== -1 ? heroRowEnd : heroRowStart + 10000);
console.log(heroHtml.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\s+/g, ' '));
