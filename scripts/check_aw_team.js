const fs = require('fs');

const teamHtml = fs.readFileSync('armstrong_team.html', 'utf8');
const paulMatch = teamHtml.match(/Paul Dickson[\s\S]{0,500}/i);
if (paulMatch) {
  console.log('Paul snippet:', paulMatch[0].replace(/\s+/g, ' '));
} else {
  console.log('Paul not directly matched in snippet');
}

// Find all partner / executive names
const names = teamHtml.match(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi) || [];
console.log('\nHeadings in team page:');
names.slice(0, 15).forEach(n => console.log(n.replace(/<[^>]+>/g, '').trim()));
