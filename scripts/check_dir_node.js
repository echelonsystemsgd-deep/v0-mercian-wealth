const fs = require('fs');

const eng = JSON.parse(fs.readFileSync('Implementation/Website/n8n-accountants-lead-engine.json', 'utf8'));
const dirNode = eng.nodes.find(n => n.name === 'UK Cities Directory & Dispatcher');
console.log(dirNode.parameters.jsCode);
