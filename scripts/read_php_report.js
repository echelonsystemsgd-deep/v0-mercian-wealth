const fs = require('fs');
const report = JSON.parse(fs.readFileSync('php_audit_report.json', 'utf8'));

console.log('Total Contacted:', report.totalContacted);
console.log('PHP Powered:', report.phpCount);
console.log('Non-PHP / Other:', report.nonPhpCount);
console.log('No Website:', report.noSiteCount);
console.log('\n--- CONFIRMED PHP BUSINESSES (Vulnerable Architecture) ---');
report.phpBusinesses.forEach((b, i) => {
  console.log(`${i + 1}. ${b.name}`);
  console.log(`   Website: ${b.website}`);
  console.log(`   Phone: ${b.phone || 'N/A'}`);
  console.log(`   Email: ${b.email || 'N/A'}`);
  console.log(`   Stack & Evidence: ${b.evidence.join(' | ')}`);
});
