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

async function listAllLeads() {
  const { data: leads } = await supabase
    .from('leads')
    .select('id, business_name, name, website, phone, email, status, source')
    .order('business_name', { ascending: true });

  console.log(`Listing ${leads.length} leads:`);
  leads.forEach((l, i) => {
    console.log(`${i + 1}. [${l.id}] "${l.business_name}" | Name: "${l.name}" | Web: "${l.website}" | Status: ${l.status}`);
  });
}

listAllLeads();
