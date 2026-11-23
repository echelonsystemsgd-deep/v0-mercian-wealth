const fs = require('fs');

const files = [
  'Implementation/General/n8n-bulletproof-lead-machine.json',
  'Implementation/Website/n8n-accountants-lead-engine.json',
  'public/n8n_autonomous_lead_finder_workflow.json',
  '.antigravity-ide/mercian_wealth_n8n_workflow.json'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const raw = fs.readFileSync(f, 'utf8');
    try {
      const data = JSON.parse(raw);
      console.log(`\n=== File: ${f} ===`);
      console.log('Size:', raw.length, 'bytes');
      console.log('Nodes count:', data.nodes ? data.nodes.length : 'none');
      const nodeNames = (data.nodes || []).map(n => n.name);
      console.log('Node names:', nodeNames);
    } catch (e) {
      console.log(`Error parsing ${f}:`, e.message);
    }
  } else {
    console.log(`Not found: ${f}`);
  }
});
