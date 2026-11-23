const fs = require('fs');

const html = fs.readFileSync('gov_uk_cities.html', 'utf8');

// Match table rows or list items for cities
// In gov.uk list of cities, they are typically in a table or list
const matches = html.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
console.log('TD matches count:', matches.length);

const cleanTds = matches.map(m => m.replace(/<[^>]+>/g, '').trim());
console.log('First 20 TDs:', cleanTds.slice(0, 20));

// Also let's check li or headers
const liMatches = html.match(/<li>([\s\S]*?)<\/li>/gi) || [];
console.log('LI matches count:', liMatches.length);
