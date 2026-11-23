const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const getEnv = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : null;
};

const supabase = createClient(
  getEnv('NEXT_PUBLIC_SUPABASE_URL'),
  getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

async function checkSubdomainsAndHosts() {
  const { data: leads } = await supabase.from('leads').select('id, business_name, name, website, status');

  const domainMap = {};

  leads.forEach(l => {
    let raw = (l.website || '').trim().toLowerCase();
    if (!raw || raw === 'null') return;
    try {
      if (!raw.startsWith('http')) raw = 'https://' + raw;
      const u = new URL(raw);
      let host = u.hostname.replace(/^www\./, '');
      if (!domainMap[host]) domainMap[host] = [];
      domainMap[host].push(l);
    } catch (e) {
      console.log('Could not parse URL:', l.website);
    }
  });

  console.log('Host duplicates:');
  for (const [host, list] of Object.entries(domainMap)) {
    if (list.length > 1) {
      console.log(`\nHost: ${host} (${list.length} records):`);
      list.forEach(item => {
        console.log(`  - [${item.id}] "${item.business_name}" (${item.name}) | Status: ${item.status} | Website: ${item.website}`);
      });
    }
  }
}

checkSubdomainsAndHosts();
