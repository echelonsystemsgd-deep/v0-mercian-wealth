const fs = require('fs');

const html = fs.readFileSync('scripts/goringe_contact.html', 'utf8');

const formStart = html.indexOf('fusion-form-62820');
const formEnd = html.indexOf('</form>', formStart);

const formHtml = html.slice(formStart, formEnd + 7);
console.log('--- Form HTML ---');
console.log(formHtml.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\s+/g, ' '));

// Extract input names and labels
const labels = formHtml.match(/<label[^>]*>([\s\S]*?)<\/label>/gi) || [];
console.log('\nForm Labels:');
labels.forEach(l => console.log('-', l.replace(/<[^>]+>/g, '').trim()));
