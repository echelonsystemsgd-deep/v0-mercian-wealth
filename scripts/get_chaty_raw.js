const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');
const chatyMatch = html.match(/var chaty_settings = (\{[\s\S]*?\});/);
if (chatyMatch) {
  // search for phone in string
  const m = chatyMatch[1].match(/(?:\+44|07|\+91)[0-9\s-]{9,15}/g);
  console.log('Phones in chaty settings:', m);
  console.log('Snippet:', chatyMatch[1].slice(0, 1500));
}
