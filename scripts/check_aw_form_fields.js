const fs = require('fs');

const contactHtml = fs.readFileSync('armstrong_contact_real.html', 'utf8');
const formMatch = contactHtml.match(/<form[^>]*id="webform-submission-contact-node-676-add-form"[^>]*>([\s\S]*?)<\/form>/i);

if (formMatch) {
  const formContent = formMatch[1];
  console.log('Select elements:');
  const selects = formContent.match(/<select[\s\S]*?<\/select>/gi) || [];
  selects.forEach(s => console.log(s));

  console.log('\nLabels in form:');
  const labels = formContent.match(/<label[\s\S]*?<\/label>/gi) || [];
  labels.forEach(l => console.log(l.replace(/\s+/g, ' ')));
} else {
  console.log('Form match not found');
}
