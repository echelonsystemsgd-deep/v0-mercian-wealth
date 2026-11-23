const fs = require('fs');

const html = fs.readFileSync('gov_uk_cities.html', 'utf8');
const liMatches = html.match(/<li>([\s\S]*?)<\/li>/gi) || [];

const cities = [];
liMatches.forEach(li => {
  const text = li.replace(/<[^>]+>/g, '').trim();
  // Filter out navigation/footer links
  if (!text.includes('Cookies') && !text.includes('Privacy') && !text.includes('Crown copyright') && text.length < 50) {
    cities.push(text);
  }
});

console.log(`Total cities extracted: ${cities.length}`);
console.log('Cities list:');
cities.forEach((c, i) => console.log(`${i + 1}. ${c}`));
fs.writeFileSync('scripts/official_uk_cities.json', JSON.stringify(cities, null, 2));
