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

function normalizeDomain(url) {
  if (!url) return '';
  let clean = url.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//, '');
  clean = clean.replace(/^www\./, '');
  clean = clean.split('/')[0];
  clean = clean.split('?')[0];
  clean = clean.split('#')[0];
  return clean;
}

async function findDuplicates() {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, name, business_name, website, email, phone, status, created_at, updated_at, notes, scraped_metadata')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching leads:', error);
    return;
  }

  console.log(`Total leads in DB: ${leads.length}`);

  const domainMap = new Map();
  const nameMap = new Map();

  leads.forEach(lead => {
    const domain = normalizeDomain(lead.website);
    if (domain) {
      if (!domainMap.has(domain)) {
        domainMap.set(domain, []);
      }
      domainMap.get(domain).push(lead);
    }

    const normName = (lead.business_name || lead.name || '').trim().toLowerCase();
    if (normName) {
      if (!nameMap.has(normName)) {
        nameMap.set(normName, []);
      }
      nameMap.get(normName).push(lead);
    }
  });

  const duplicateDomains = [];
  domainMap.forEach((items, domain) => {
    if (items.length > 1) {
      duplicateDomains.push({ domain, count: items.length, items });
    }
  });

  console.log(`\n=== DUPLICATE WEBSITES / DOMAINS (${duplicateDomains.length} groups found) ===`);
  duplicateDomains.forEach((dup, i) => {
    console.log(`\n[Group ${i + 1}] Domain: "${dup.domain}" (Count: ${dup.count})`);
    dup.items.forEach(item => {
      console.log(`  - ID: ${item.id} | Name: "${item.name}" | Business: "${item.business_name}" | Status: ${item.status} | Website: "${item.website}" | HasNotes: ${Boolean(item.notes)}`);
    });
  });

  fs.writeFileSync('duplicate_leads_audit.json', JSON.stringify(duplicateDomains, null, 2));
}

findDuplicates();
