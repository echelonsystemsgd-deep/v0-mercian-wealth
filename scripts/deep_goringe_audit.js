const fs = require('fs');

const html = fs.readFileSync('scripts/goringe.html', 'utf8');

// Check all images and their src
const imgMatches = html.match(/<img[^>]*>/gi) || [];
console.log('Total img tags:', imgMatches.length);

const imageSources = [];
imgMatches.forEach(img => {
  const src = img.match(/src=["']([^"']*)["']/i) || img.match(/data-orig-src=["']([^"']*)["']/i);
  if (src) imageSources.push(src[1]);
});

console.log('Sample images:');
imageSources.slice(0, 10).forEach(s => console.log('-', s));

// Check scripts & styles count
const scriptTags = html.match(/<script[^>]*>/gi) || [];
console.log('\nTotal script tags:', scriptTags.length);

const linkCss = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
console.log('Total stylesheet links:', linkCss.length);

// Check if there are font links or font-face
const fonts = html.match(/fonts\.googleapis\.com[^\s"']*/gi) || [];
console.log('Google Fonts loaded:', [...new Set(fonts)]);

// Check footer copyright year
const copyright = html.match(/©[^\n<]{0,50}|&copy;[^\n<]{0,50}|copyright[^\n<]{0,50}/gi) || [];
console.log('Copyright footer notices:', [...new Set(copyright)]);

// Check console / tracking / bloat
const gtm = html.includes('gtm.js') || html.includes('googletagmanager');
console.log('GTM present:', gtm);
const hotjar = html.includes('hotjar');
console.log('Hotjar present:', hotjar);
const trustindex = html.includes('trustindex');
console.log('Trustindex present:', trustindex);
