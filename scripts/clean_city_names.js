const fs = require('fs');

const officialCities = JSON.parse(fs.readFileSync('scripts/official_uk_cities.json', 'utf8'));

// Clean city names (remove asterisks, &amp;, overseas territories)
const ukCities = officialCities
  .map(c => c.replace(/\*/g, '').replace(/&amp;/g, '&').trim())
  .filter(c => !['Douglas', 'Hamilton', 'City of Gibraltar', 'Stanley', 'Jamestown'].includes(c));

console.log(`Cleaned UK Cities count: ${ukCities.length}`);
console.log('Sample:', ukCities.slice(0, 15));
