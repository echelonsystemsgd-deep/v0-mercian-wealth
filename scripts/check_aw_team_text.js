const fs = require('fs');

const teamHtml = fs.readFileSync('armstrong_team.html', 'utf8');
const text = teamHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
const cleanText = text.replace(/\s+/g, ' ');
console.log('Text snippet around Meet the team:');
const idx = cleanText.indexOf('Meet the team');
if (idx !== -1) {
  console.log(cleanText.slice(idx, idx + 1000));
} else {
  console.log('Not found');
}
