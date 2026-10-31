const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');
const chatyMatch = html.match(/var chaty_settings = (\{[\s\S]*?\});/);
if (chatyMatch) {
  try {
    const parsed = JSON.parse(chatyMatch[1]);
    console.log('Channels:', JSON.stringify(parsed.chaty_widgets[0].channels, null, 2));
  } catch(e) {
    console.log('Error:', e.message);
  }
}
