const fs = require('fs');

const paulHtml = fs.readFileSync('armstrong_paul_profile.html', 'utf8');
const text = paulHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
const cleanText = text.replace(/\s+/g, ' ');

const start = cleanText.indexOf('Managing Partner', 200);
if (start !== -1) {
  console.log(cleanText.slice(start, start + 1000));
}
