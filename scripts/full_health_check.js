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

async function fullHealthCheck() {
  const { data: leads } = await supabase.from('leads').select('*');

  console.log(`Total leads: ${leads.length}`);

  // 1. Same website duplicates
  const urlMap = {};
  leads.forEach(l => {
    let clean = (l.website || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
    if (clean && clean !== 'null') {
      if (!urlMap[clean]) urlMap[clean] = [];
      urlMap[clean].push(l);
    }
  });

  const duplicateWebsites = Object.entries(urlMap).filter(([url, list]) => list.length > 1);
  console.log(`\n1. Duplicate websites (${duplicateWebsites.length}):`);
  duplicateWebsites.forEach(([url, list]) => {
    console.log(`URL: ${url}`);
    list.forEach(item => {
      console.log(`  - [${item.id}] "${item.business_name}" (${item.name}) | Status: ${item.status} | Phone: ${item.phone}`);
    });
  });

  // 2. Leads with website == null or 'null' or empty
  const noWebsites = leads.filter(l => !l.website || l.website === 'null' || l.website.trim() === '');
  console.log(`\n2. Leads with no website (${noWebsites.length}):`);
  noWebsites.forEach(l => {
    console.log(`  - [${l.id}] "${l.business_name}" (${l.name}) | Status: ${l.status}`);
  });

  // 3. Leads with dummy Ofcom numbers (+447700900..., 01632...)
  const dummyPhones = leads.filter(l => {
    const p = (l.phone || '').replace(/[^0-9]/g, '');
    return p.includes('7700900') || p.includes('1632') || p.includes('207946');
  });
  console.log(`\n3. Leads with dummy TV/film phone numbers (${dummyPhones.length}):`);
  dummyPhones.forEach(l => {
    console.log(`  - [${l.id}] "${l.business_name}" (${l.name}) | Phone: ${l.phone} | Web: ${l.website}`);
  });

  // 4. Irrelevant non-accountancy leads (stamps, tiktok, streaming, etc.)
  const irrelevant = leads.filter(l => {
    const b = (l.business_name || '').toLowerCase();
    const w = (l.website || '').toLowerCase();
    return b.includes('stamp') || b.includes('plates') || b.includes('chitram') || w.includes('tiktok') || w.includes('vercel.app');
  });
  console.log(`\n4. Irrelevant non-accountancy leads (${irrelevant.length}):`);
  irrelevant.forEach(l => {
    console.log(`  - [${l.id}] "${l.business_name}" | Web: ${l.website}`);
  });
}

fullHealthCheck();
