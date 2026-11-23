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

async function inspectPairs() {
  const ids = [
    '42ac92cc-6aed-4a50-b4e3-8afad87f0b9d',
    '9b3e4dba-7d67-4302-aa8d-7ac53aa21a6f',
    'bc384c2a-1280-4773-9e0d-e13475258996',
    '3e2fb875-8abe-4cd6-aa94-df99cfd24e51'
  ];

  const { data } = await supabase.from('leads').select('*').in('id', ids);
  data.forEach(d => {
    console.log(`\nID: ${d.id}`);
    console.log(`Business: ${d.business_name} | Name: ${d.name} | Web: ${d.website}`);
    console.log(`Email: ${d.email} | Phone: ${d.phone}`);
    console.log(`Status: ${d.status} | Created: ${d.created_at}`);
    console.log(`Notes preview: ${(d.notes || '').slice(0, 150)}...`);
  });
}

inspectPairs();
