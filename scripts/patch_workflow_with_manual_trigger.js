const fs = require('fs');

// Read the verified 76-city workflow
const wf = JSON.parse(fs.readFileSync('Implementation/n8n-uk-master-autonomous-lead-engine.json', 'utf8'));

// 1. Add Manual Trigger Node
const manualTriggerNode = {
  parameters: {},
  id: '3c1e204b-91d4-4a25-9fa5-6e4726d34bf6',
  name: 'When clicking ‘Test workflow’',
  type: 'n8n-nodes-base.manualTrigger',
  typeVersion: 1,
  position: [-3776, 8040]
};

// Check if manual trigger is already there
if (!wf.nodes.find(n => n.type === 'n8n-nodes-base.manualTrigger')) {
  wf.nodes.unshift(manualTriggerNode);
}

// 2. Connect manual trigger to Node 1
wf.connections['When clicking ‘Test workflow’'] = {
  main: [
    [
      {
        node: '1. Configuration & Secrets',
        type: 'main',
        index: 0
      }
    ]
  ]
};

// 3. Update Node 1 to include TEST_MODE
const node1 = wf.nodes.find(n => n.name === '1. Configuration & Secrets');
node1.parameters.jsCode = `// 1. Configuration & Pre-Filled Secrets
return {
  json: {
    PLATFORM_URL: 'https://v0-gs-legacy-wealth-app.vercel.app',
    SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGViaG15eXdrY3F0eWF6eHhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY4NTAzNSwiZXhwIjoyMDk3MjYxMDM1fQ.m_FBVwQCgj9OWqz1dajV7pGpoA5yF1Hyir71gibCKEE',
    TARGET_NICHE: 'Chartered Accountants',
    TARGET_CITY: '', // <--- LEAVE '' TO RUN ALL 76 CITIES, OR SET 'Manchester', 'Leeds', 'Bristol', etc.
    TEST_MODE: false, // <--- SET true IF YOU WANT TO TEST ALREADY-CONTACTED CITIES (LIKE BIRMINGHAM) WITHOUT DEDUPLICATION FILTERING THEM OUT
    COMPANIES_HOUSE_API_KEY: '2aa4750f-6fb0-40d0-9473-f003ccca6185',
    TELEGRAM_BOT_TOKEN: '8278044186:AAGyxTQNrj7KlRzZV10cNxmwlbZzgFwdU-Q',
    TELEGRAM_CHAT_ID: '7191968038'
  }
};`;

// 4. Update Node 3 to support TEST_MODE
const node3 = wf.nodes.find(n => n.name === '3. Sourcing & Bulletproof Deduplicator');
let code3 = node3.parameters.jsCode;
if (!code3.includes('config.TEST_MODE === true')) {
  code3 = code3.replace(
    '// 2. Deduplication check against Supabase',
    '// Bypass deduplication if TEST_MODE is active\n  if (config.TEST_MODE === true) return true;\n\n  // 2. Deduplication check against Supabase'
  );
  node3.parameters.jsCode = code3;
}

// 5. Update Node 9 to bulletproof validLeadItems
const node9 = wf.nodes.find(n => n.name.includes('9. Merge Audit'));
node9.parameters.jsCode = `// 9. Merge Audit Results & Filter Grade A/B Leads
const auditItems = $input.all();
let validLeadItems = [];

try {
  validLeadItems = $('Website Present?').all(0);
} catch (e) {
  try {
    validLeadItems = $('Restore Lead Context').all().filter(i => i.json.has_valid_website);
  } catch (err) {
    validLeadItems = $('6. Merge Verified Registry Data').all().filter(i => i.json.has_valid_website);
  }
}

const qualifiedLeads = [];

validLeadItems.forEach((item, idx) => {
  const lead = item.json;
  const auditRes = auditItems[idx]?.json || {};
  const analysis = auditRes.analysis || {};
  const grade = analysis.grade || 'B';

  if (grade !== 'C') {
    const cleanPhone = String(lead.phone || '').replace(/[^0-9]/g, '');
    const angle = analysis.primaryAngle?.title || 'Mobile Viewport Friction';
    const headline = analysis.primaryAngle?.headline || 'Client enquiry drop-off on 390px mobile screens';

    const telegramMsg = [
      '🔥 GRADE ' + grade + ' PRACTICE AUDITED (NEW)',
      '',
      '🏛 Practice: ' + lead.business_name,
      '👤 Director: ' + (lead.director_name || 'Senior Partner'),
      '🏢 Companies House: ' + (lead.company_number || 'UK Registered') + ' (' + (lead.company_status || 'active') + ')',
      '📞 Phone: ' + lead.phone + ' (' + (lead.is_whatsapp_viable ? 'WhatsApp Ready' : 'Landline') + ')',
      '',
      '⚠️ Friction: ' + angle,
      '💡 Impact: ' + headline,
      '',
      '👉 1-Tap WhatsApp: https://wa.me/' + cleanPhone,
      '🔗 Open Dossier: ' + lead.platform_url + '/admin/leads'
    ].join('\\n');

    qualifiedLeads.push({
      json: {
        ...lead,
        audit_grade: grade,
        telegram_message: telegramMsg
      }
    });
  }
});

return qualifiedLeads;`;

fs.writeFileSync('Implementation/n8n-uk-master-autonomous-lead-engine.json', JSON.stringify(wf, null, 2), 'utf8');
fs.writeFileSync('public/n8n_master_uk_cities_workflow.json', JSON.stringify(wf, null, 2), 'utf8');
console.log('Successfully patched workflow with Manual Trigger, TEST_MODE, and robust Node 9!');
