const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');

const waMatch = html.match(/(?:api\.whatsapp\.com|wa\.me|web\.whatsapp\.com)[^\s"'>]+/gi) || [];
console.log('WhatsApp endpoints:', [...new Set(waMatch)]);

// Look for chaty settings
const chatySettings = html.match(/var chaty_settings = (\{[\s\S]*?\});/);
if (chatySettings) {
  console.log('Chaty settings:', chatySettings[1].slice(0, 500));
}
