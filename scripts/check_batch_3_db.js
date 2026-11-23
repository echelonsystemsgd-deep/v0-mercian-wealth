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

async function checkBatch3() {
  const { data: d1 } = await supabase.from('leads').select('id, name, business_name, website').ilike('website', '%pda%');
  const { data: d2 } = await supabase.from('leads').select('id, name, business_name, website').ilike('website', '%infincible%');
  const { data: d3 } = await supabase.from('leads').select('id, name, business_name, website').ilike('website', '%arora%');
  console.log('pda:', d1);
  console.log('infincible:', d2);
  console.log('arora:', d3);
}

checkBatch3();
