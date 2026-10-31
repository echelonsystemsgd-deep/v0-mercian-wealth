const fs = require('fs');
const results = JSON.parse(fs.readFileSync('scripts/full_42_reaudit_results.json', 'utf8'));

console.log('--- REAUDIT SUMMARY (42 LEADS) ---');
results.forEach((r, idx) => {
  console.log(`${idx + 1}. [${r.business_name}]`);
  console.log(`   Contact: ${r.email || r.phone}`);
  console.log(`   Friction: ${r.primaryFriction}`);
  console.log(`   Outcome: ${r.commercialOutcome}`);
});
