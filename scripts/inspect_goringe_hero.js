const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

const bookIdx = html.indexOf('Book A Meeting');
// search backwards for the nearest heading
const textBefore = html.slice(0, bookIdx);
const lastH2 = textBefore.lastIndexOf('<h2');
const lastH1 = textBefore.lastIndexOf('<h1');
const lastH3 = textBefore.lastIndexOf('<h3');

console.log('Last H1 before Book A Meeting:', html.slice(lastH1, lastH1 + 100).replace(/<[^>]+>/g, ''));
console.log('Last H2 before Book A Meeting:', html.slice(lastH2, lastH2 + 100).replace(/<[^>]+>/g, ''));
console.log('Last H3 before Book A Meeting:', html.slice(lastH3, lastH3 + 100).replace(/<[^>]+>/g, ''));

// Now check what is right in the Hero section (under H1)
const h1Idx = html.indexOf('<h1');
console.log('\n--- Hero Section Content (around H1) ---');
console.log(html.slice(h1Idx, h1Idx + 2000).replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\s+/g, ' '));
