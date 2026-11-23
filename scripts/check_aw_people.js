const fs = require('fs');

const teamHtml = fs.readFileSync('armstrong_team.html', 'utf8');
const peopleLinks = teamHtml.match(/href="\/about-us\/team\/[^"]*"/gi) || [];
console.log('People links count:', peopleLinks.length);
console.log('Sample links:', [...new Set(peopleLinks)].slice(0, 20));
