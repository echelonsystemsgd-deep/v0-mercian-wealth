const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

const col10Start = html.indexOf('fusion-builder-column-10');
console.log('--- Column 10 (fusion-no-small-visibility) ---');
console.log(html.slice(col10Start, col10Start + 2500).replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\s+/g, ' '));
