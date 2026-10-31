const fs = require('fs');

const html = fs.readFileSync('scripts/uttam_store.html', 'utf8');

// Inspect buttons and their text / onclick handlers / classes
const buttons = [];
const btnRegex = /<button[^>]*>([\s\S]*?)<\/button>/gi;
let m;
while ((m = btnRegex.exec(html)) !== null) {
  buttons.push(m[0]);
}

console.log('Sample Button Texts:');
buttons.slice(0, 20).forEach(b => {
  const text = b.replace(/<[^>]+>/g, '').trim();
  console.log(`- "${text}"`);
});

// Check for nav links
const navMatch = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi);
console.log('\nNav count:', navMatch ? navMatch.length : 0);
if (navMatch) {
  console.log('Nav 0:', navMatch[0].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' '));
}

// Check footer links
const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/gi);
if (footerMatch) {
  const fLinks = footerMatch[0].match(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
  console.log('\nFooter links count:', fLinks.length);
  fLinks.forEach(l => {
    const href = l.match(/href=["']([^"']*)["']/i);
    const text = l.replace(/<[^>]+>/g, '').trim();
    console.log(`Footer link: ${href ? href[1] : ''} -> "${text}"`);
  });
}
