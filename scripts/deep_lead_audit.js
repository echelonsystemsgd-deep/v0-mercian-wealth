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

function getRootDomain(url) {
  if (!url) return '';
  let clean = url.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split('?')[0].split('#')[0];
  const parts = clean.split('.');
  if (parts.length > 2 && (parts[parts.length - 2] === 'co' || parts[parts.length - 2] === 'org' || parts[parts.length - 2] === 'gov' || parts[parts.length - 2] === 'ac')) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

function normalizePhone(p) {
  if (!p) return '';
  return p.replace(/[^0-9]/g, '').slice(-10);
}

function normalizeEmail(e) {
  if (!e) return '';
  return e.trim().toLowerCase();
}

async function deepAudit() {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, name, business_name, website, email, phone, status, created_at, updated_at, notes, scraped_metadata')
    .order('created_at', { ascending: true });

  console.log(`Auditing ${leads.length} leads...`);

  const rootDomainMap = new Map();
  const phoneMap = new Map();
  const emailMap = new Map();
  const nameMap = new Map();

  leads.forEach(l => {
    const root = getRootDomain(l.website);
    if (root) {
      if (!rootDomainMap.has(root)) rootDomainMap.set(root, []);
      rootDomainMap.get(root).push(l);
    }

    const normP = normalizePhone(l.phone);
    if (normP && normP.length >= 8) {
      if (!phoneMap.has(normP)) phoneMap.set(normP, []);
      phoneMap.get(normP).push(l);
    }

    const normE = normalizeEmail(l.email);
    if (normE && normE.includes('@') && !normE.includes('sentry')) {
      if (!emailMap.has(normE)) emailMap.set(normE, []);
      emailMap.get(normE).push(l);
    }

    const cleanName = (l.business_name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanName && cleanName.length > 3) {
      if (!nameMap.has(cleanName)) nameMap.set(cleanName, []);
      nameMap.get(cleanName).push(l);
    }
  });

  console.log('\n--- ROOT DOMAIN DUPLICATES ---');
  rootDomainMap.forEach((items, root) => {
    if (items.length > 1) {
      console.log(`Root: ${root} (${items.length} records):`);
      items.forEach(it => console.log(`  - [${it.id}] "${it.business_name}" (${it.name}) | URL: ${it.website}`));
    }
  });

  console.log('\n--- PHONE DUPLICATES ---');
  phoneMap.forEach((items, ph) => {
    if (items.length > 1) {
      console.log(`Phone: ${ph} (${items.length} records):`);
      items.forEach(it => console.log(`  - [${it.id}] "${it.business_name}" | Phone: ${it.phone}`));
    }
  });

  console.log('\n--- EMAIL DUPLICATES ---');
  emailMap.forEach((items, em) => {
    if (items.length > 1) {
      console.log(`Email: ${em} (${items.length} records):`);
      items.forEach(it => console.log(`  - [${it.id}] "${it.business_name}" | Email: ${it.email}`));
    }
  });

  console.log('\n--- BUSINESS NAME DUPLICATES ---');
  nameMap.forEach((items, nm) => {
    if (items.length > 1) {
      console.log(`Name: ${nm} (${items.length} records):`);
      items.forEach(it => console.log(`  - [${it.id}] "${it.business_name}" | Web: ${it.website}`));
    }
  });
}

deepAudit();
