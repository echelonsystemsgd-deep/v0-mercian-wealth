const fs = require('fs');

if (fs.existsSync('scripts/target_leads_data.json')) {
  const d = JSON.parse(fs.readFileSync('scripts/target_leads_data.json', 'utf8'));
  console.log('target_leads_data count:', d.length);
  if (d.length > 0) console.log('Sample keys:', Object.keys(d[0]));
}

if (fs.existsSync('Implementation/Website/n8n-accountants-lead-engine.json')) {
  const eng = JSON.parse(fs.readFileSync('Implementation/Website/n8n-accountants-lead-engine.json', 'utf8'));
  const dirNode = eng.nodes.find(n => n.name === 'UK Cities Directory & Dispatcher');
  if (dirNode) {
    console.log('Found UK Cities Directory node in old workflow!');
    console.log(dirNode.parameters ? JSON.stringify(dirNode.parameters).slice(0, 500) : 'no params');
  }
}
