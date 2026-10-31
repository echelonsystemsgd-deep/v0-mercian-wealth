const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

// Check iLightbox scripts or initialization
const ilightbox = html.match(/ilightbox[^\n]*/gi) || [];
console.log('iLightbox script references count:', ilightbox.length);
ilightbox.slice(0, 5).forEach(l => console.log('-', l.slice(0, 150)));

// Check how Avada initializes iLightbox
const inlineScripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
const lightboxInit = inlineScripts.filter(s => s.includes('iLightbox') || s.includes('lightbox'));
console.log('\nLightbox inline script count:', lightboxInit.length);
lightboxInit.slice(0, 3).forEach(s => console.log('Init snippet:', s.slice(0, 200).replace(/\s+/g, ' ')));
