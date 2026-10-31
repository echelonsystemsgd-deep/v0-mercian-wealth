const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');

const bookBtns = html.match(/<a[^>]*>[\s\S]*?Book a [cC]all[\s\S]*?<\/a>/gi) || [];
console.log('Book a call buttons count:', bookBtns.length);
bookBtns.forEach((b, i) => {
  const href = b.match(/href=["']([^"']*)["']/i);
  console.log(`Button ${i}: href="${href ? href[1] : ''}"`);
});

const guideBtn = html.match(/<a[^>]*>[\s\S]*?Get the guide[\s\S]*?<\/a>/gi) || [];
console.log('\nGet the guide button:');
guideBtn.forEach(b => {
  const href = b.match(/href=["']([^"']*)["']/i);
  console.log(`Guide href: "${href ? href[1] : ''}"`);
});
