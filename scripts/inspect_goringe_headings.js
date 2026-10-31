const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

// Look for sections / titles / headings from main start
const main = html.slice(html.indexOf('<main'));

// find all headings in order
const headings = [];
const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
while ((m = hRegex.exec(main)) !== null) {
  headings.push({ tag: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
}
console.log('--- Headings in Order of Page Flow ---');
headings.forEach(h => console.log(`${h.tag.toUpperCase()}: ${h.text}`));

// Find all buttons / CTA links in main
console.log('\n--- Action Buttons / CTAs in Main ---');
const btnRegex = /<a[^>]*class=["'][^"']*fusion-button[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
while ((m = btnRegex.exec(main)) !== null) {
  const text = m[1].replace(/<[^>]+>/g, '').trim();
  const href = m[0].match(/href=["']([^"']*)["']/i);
  console.log(`Button: "${text}" -> ${href ? href[1] : ''}`);
}
