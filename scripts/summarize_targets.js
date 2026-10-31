const fs = require('fs');
const leads = JSON.parse(fs.readFileSync('scripts/target_leads_data.json', 'utf8'));

leads.forEach((l, i) => {
  console.log(`\n--- [${i + 1}] ${l.business_name} (${l.name}) ---`);
  console.log(`Email: ${l.email} | Phone: ${l.phone} | Web: ${l.website}`);
  console.log(`Status: ${l.status}`);
  console.log(`Notes snippet: ${l.notes ? l.notes.substring(0, 150).replace(/\n/g, ' ') : 'N/A'}`);
  if (l.scraped_metadata) {
    console.log(`Friction: ${l.scraped_metadata.friction_title || l.scraped_metadata.observable_problem || 'N/A'}`);
  }
});
