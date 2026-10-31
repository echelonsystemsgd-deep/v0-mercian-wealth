const fs = require('fs');
const html = fs.readFileSync('scripts/audit_https___www_rawaccounting_co_uk_.html', 'utf8');

// Check headings
const headings = Array.from(html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings:', headings.slice(0, 10));

// Check colors and backgrounds in inline styles
const colors = html.match(/(?:color|background|background-color)\s*:\s*[^;"'>]+/gi) || [];
console.log('Sample inline colors:', [...new Set(colors)].slice(0, 15));

// Check footer copyright
const cr = html.match(/Copyright[^<]*/i);
console.log('Copyright:', cr ? cr[0] : 'none');
