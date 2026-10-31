const fs = require('fs');
const leads = JSON.parse(fs.readFileSync('scripts/target_leads_data.json', 'utf8'));

// The 22 leads specified by the user:
// 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
// 25, 26
const indicesToRemove = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26].map(i => i - 1);

const toRemove = indicesToRemove.map(i => leads[i]).filter(Boolean);
console.log(`Leads to remove (${toRemove.length}):`);
toRemove.forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.id}] ${l.business_name} (${l.email || l.phone})`);
});

const keepIndices = [2, 3, 23, 24, 27].map(i => i - 1);
const toKeep = keepIndices.map(i => leads[i]).filter(Boolean);
console.log(`\nLeads to KEEP (${toKeep.length}):`);
toKeep.forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.id}] ${l.business_name} (${l.email || l.phone})`);
});
