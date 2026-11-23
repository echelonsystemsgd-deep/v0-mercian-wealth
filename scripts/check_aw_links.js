const fs = require('fs');

const aw = fs.readFileSync('batch3_armstrong.html', 'utf8');
const links = aw.match(/href="([^"]*)"/g) || [];
const uniqueLinks = [...new Set(links.map(l => l.replace(/href="|"/g, '')))];

console.log('Contact or about links:');
uniqueLinks.filter(l => /contact|about|people|team|touch/i.test(l)).forEach(l => console.log(' ', l));

console.log('\nHeader / Nav menu links:');
const nav = aw.match(/<nav[\s\S]*?<\/nav>/gi) || [];
console.log('Nav count:', nav.length);
nav.forEach((n, idx) => {
  console.log(`Nav ${idx}:`, n.slice(0, 300));
});
