const fs = require('fs');

const html = fs.readFileSync('scripts/taxminds.html', 'utf8');

// Find phone number strings in text
const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
const phoneMatches = text.match(/(?:07\d{3}\s?\d{6}|0118\s?\d{3}\s?\d{4}|\+44\s?7\d{3}\s?\d{6})/g) || [];
console.log('Mobile/Phone matches in text:', [...new Set(phoneMatches)]);

// Check for "07585"
const p07585 = text.match(/07585[0-9\s-]+/g);
console.log('07585 match:', p07585);
