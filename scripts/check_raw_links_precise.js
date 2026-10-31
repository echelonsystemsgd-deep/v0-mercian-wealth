const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');

// Find all buttons and where they link
const allLinks = [];
const aRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let m;
while ((m = aRegex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  if (/book|schedule|contact|chat/i.test(text)) {
    allLinks.push({ href: m[1], text });
  }
}

console.log('--- All Booking/Contact Links on rawaccounting.co.uk ---');
allLinks.forEach(l => console.log(`Button Text: "${l.text}" -> Href: "${l.href}"`));
