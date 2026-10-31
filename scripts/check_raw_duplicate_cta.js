const fs = require('fs');

const html = fs.readFileSync('scripts/rawaccounting.html', 'utf8');

const scheduleBtns = html.match(/<a[^>]*>[\s\S]*?Schedule a [cC]all[\s\S]*?<\/a>/gi) || [];
console.log('Schedule a call buttons:');
scheduleBtns.forEach(b => {
  const href = b.match(/href=["']([^"']*)["']/i);
  console.log(`Href: ${href ? href[1] : ''}`);
});

const readyToChat = html.match(/Ready to chat\?/gi) || [];
console.log('Number of times "Ready to chat?" appears:', readyToChat.length);
