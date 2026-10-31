const fs = require('fs');

const html = fs.readFileSync('scripts/uttam_store.html', 'utf8');

// 1. Headings
const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
console.log('H1s:', h1s.map(h => h.replace(/<[^>]+>/g, '').trim()));

const h2s = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
console.log('H2s:', h2s.map(h => h.replace(/<[^>]+>/g, '').trim()));

const h3s = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
console.log('H3s count:', h3s.length, 'Samples:', h3s.slice(0, 8).map(h => h.replace(/<[^>]+>/g, '').trim()));

// 2. Links inspect
const allLinks = [];
const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let m;
while ((m = linkRegex.exec(html)) !== null) {
  allLinks.push({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
}
console.log('\n--- Sample Links ---');
allLinks.slice(0, 15).forEach(l => console.log(`${l.href} -> "${l.text}"`));

// 3. Check for external URLs (YouTube, Instagram, WhatsApp)
const socialLinks = allLinks.filter(l => l.href.includes('youtube.com') || l.href.includes('instagram.com') || l.href.includes('whatsapp') || l.href.includes('wa.me'));
console.log('\n--- Social & WhatsApp Links ---');
console.log(socialLinks);

// 4. Check JSON-LD Structured Data
const jsonLd = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('\nJSON-LD scripts count:', jsonLd.length);
jsonLd.forEach((j, i) => console.log(`JSON-LD ${i}:`, j.slice(0, 300)));

// 5. OpenGraph & Twitter tags
const ogTags = html.match(/<meta[^>]*property=["']og:[^"']*["'][^>]*>/gi) || [];
console.log('\nOpenGraph tags count:', ogTags.length, ogTags);

const twTags = html.match(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*>/gi) || [];
console.log('Twitter tags count:', twTags.length, twTags);

// 6. Check images source domains (Unsplash? CDN?)
const imgSources = html.match(/src=["']([^"']+)["']/gi) || [];
console.log('\nTotal src tags:', imgSources.length);
const imgDomains = [...new Set(imgSources.map(s => {
  const match = s.match(/src=["']([^"']+)["']/i);
  return match ? match[1].slice(0, 50) : '';
}))];
console.log('Image source samples:', imgDomains.slice(0, 10));
