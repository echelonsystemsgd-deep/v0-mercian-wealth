const fs = require('fs');

const html = fs.readFileSync('scripts/taxminds.html', 'utf8');

// Check the "Free Quote" link and "Read More" link
const quoteMatch = html.match(/<a[^>]*>[\s\S]*?Free Quote[\s\S]*?<\/a>/gi);
console.log('Free quote link tag:', quoteMatch);

const readMoreMatch = html.match(/<a[^>]*>[\s\S]*?Read More[\s\S]*?<\/a>/gi);
console.log('Read more link tag:', readMoreMatch);

// Check typo "sinsuccess" in text
const typoMatch = html.match(/sinsuccess|Letus/gi);
console.log('Typos found in HTML:', typoMatch);

// Check Ukraine ribbon on Corporation Tax
const ukraineMatch = html.match(/WE STAND WITH UKRAINE/gi);
console.log('Ukraine text found:', ukraineMatch);

// Check viewport & Wix mobile scripts
const wixMobile = html.match(/wixMobileViewport[^>]*>/gi);
console.log('Wix mobile viewport tag:', wixMobile);
