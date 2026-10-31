const fs = require('fs');
const results = JSON.parse(fs.readFileSync('scripts/full_42_reaudit_results.json', 'utf8'));

results.forEach((r, i) => {
  console.log((i+1) + '. ' + r.business_name + ' | Email: ' + (r.email || 'None') + ' | Phone: ' + (r.phone || 'None') + ' | Flaw: ' + r.primaryFriction);
});
