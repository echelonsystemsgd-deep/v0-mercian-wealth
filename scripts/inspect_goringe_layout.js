const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

// Find where "Book A Meeting" appears in the HTML structure
const idx = html.indexOf('Book A Meeting');
console.log('Book A Meeting position in 359KB HTML:', idx, `(${Math.round(idx / html.length * 100)}% down the page)`);

// Extract 500 characters around it
console.log('\n--- Surrounding Context ---');
console.log(html.slice(Math.max(0, idx - 400), idx + 400).replace(/<style[\s\S]*?<\/style>/gi, ''));

// Check what is in the Header / Navigation
const headerMatch = html.match(/<header[\s\S]*?<\/header>/gi) || [];
console.log('\nHeader count:', headerMatch.length);
if (headerMatch.length > 0) {
  const headerLinks = headerMatch[0].match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log('Header links count:', headerLinks.length);
  const headerTexts = headerLinks.map(l => l.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log('Header Link texts:', [...new Set(headerTexts)]);
}

// Check Hero Section (above the fold)
const mainStart = html.indexOf('<main') !== -1 ? html.indexOf('<main') : html.indexOf('<div id="main"');
console.log('\nMain content start at index:', mainStart);
console.log('\nFirst 1000 characters of Main:');
console.log(html.slice(mainStart, mainStart + 1000).replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\s+/g, ' '));
