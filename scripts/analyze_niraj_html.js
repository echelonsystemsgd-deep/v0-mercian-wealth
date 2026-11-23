const fs = require('fs');
const html = fs.readFileSync('scripts/niraj_raw.html', 'utf8');

const clean = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

const h1s = clean.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
const h2s = clean.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
const h3s = clean.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];

console.log('H1 headings:', h1s.map(h => h.replace(/<[^>]+>/g, '').trim()));
console.log('H2 headings:', h2s.map(h => h.replace(/<[^>]+>/g, '').trim()));
console.log('H3 headings (first 10):', h3s.slice(0, 10).map(h => h.replace(/<[^>]+>/g, '').trim()));

const forms = clean.match(/<form[\s\S]*?<\/form>/gi) || [];
console.log('Total forms on site:', forms.length);
forms.forEach((f, idx) => {
  console.log(`Form #${idx + 1}:`, f.slice(0, 300).replace(/\s+/g, ' '));
});

const regexImg = /<img[^>]+src=["']([^"']+)["']/gi;
const imgs = [];
let m;
while ((m = regexImg.exec(clean)) !== null) {
  imgs.push(m[1]);
}
console.log('Total images found:', imgs.length);
console.log('Sample images:', imgs.slice(0, 5));

const regexSocial = /href=["'](https?:\/\/(?:www\.)?(?:instagram|facebook|tiktok|whatsapp|youtube|twitter|x)\.com\/[^"']+)["']/gi;
const socials = [];
while ((m = regexSocial.exec(clean)) !== null) {
  socials.push(m[1]);
}
console.log('Social links found:', [...new Set(socials)]);

// Search for text about services, gold, 22ct, diamonds, repair, custom design
const bodyText = clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('Body Text length:', bodyText.length);
console.log('Body preview (first 1000 chars):');
console.log(bodyText.slice(0, 1000));

// Check for address
const addrMatch = bodyText.match(/(?:uxbridge|hayes|london|road|street|middlesex|ub[0-9])/gi);
console.log('Address keywords hits:', addrMatch ? addrMatch.length : 0);
