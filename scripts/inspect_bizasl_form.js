const fs = require('fs');

const html = fs.readFileSync('scripts/bizasl.html', 'utf8');

const formMatch = html.match(/<form[\s\S]*?<\/form>/gi) || [];
if (formMatch.length > 0) {
  const formHtml = formMatch[0];
  console.log('--- Form 0 Fields & Labels ---');
  // find all p tags or labels or inputs
  const inputs = formHtml.match(/<input[^>]*>|<select[\s\S]*?<\/select>|<textarea[^>]*>/gi) || [];
  inputs.forEach(inp => {
    const name = inp.match(/name=["']([^"']*)["']/i);
    const type = inp.match(/type=["']([^"']*)["']/i);
    const placeholder = inp.match(/placeholder=["']([^"']*)["']/i);
    console.log(`Field: name="${name ? name[1] : ''}" type="${type ? type[1] : 'select/textarea'}" placeholder="${placeholder ? placeholder[1] : ''}"`);
  });

  console.log('\n--- Visible Text inside Form ---');
  console.log(formHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}
