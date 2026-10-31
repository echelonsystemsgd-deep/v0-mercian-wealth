const fs = require('fs');

const html = fs.readFileSync('scripts/taxminds.html', 'utf8');

// strip tags
const cleanText = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                      .replace(/<style[\s\S]*?<\/style>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ');

console.log('Clean text snippet:');
console.log(cleanText.slice(0, 1500));

// Check for all links
const links = html.match(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
console.log('\nTotal links:', links.length);
links.forEach(l => {
  const href = l.match(/href=["']([^"']*)["']/i);
  const t = l.replace(/<[^>]+>/g, '').trim();
  console.log(`Link: ${href ? href[1] : ''} -> "${t}"`);
});
