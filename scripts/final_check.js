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

async function finalCheck() {
  const { data: leads } = await supabase.from('leads').select('id, business_name, status, website');
  console.log(`Total leads in DB: ${leads.length}`);

  const counts = {};
  leads.forEach(l => {
    counts[l.status] = (counts[l.status] || 0) + 1;
  });
  console.log('Status breakdown:', counts);

  const domainMap = {};
  let dupes = 0;
  leads.forEach(l => {
    const raw = (l.website || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
    if (domainMap[raw]) {
      console.log(`Duplicate found: ${raw}`);
      dupes++;
    } else {
      domainMap[raw] = l;
    }
  });

  console.log(`Total duplicates found: ${dupes}`);
}

finalCheck();
