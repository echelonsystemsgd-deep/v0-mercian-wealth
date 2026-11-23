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

async function check() {
  const { data, error } = await supabase
    .from('leads')
    .select('id, business_name, website, status')
    .or('website.ilike.%abacusleeds%,website.ilike.%ac-accounts%,website.ilike.%collins-chartered%');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Matches in DB:', data);
  }
}

check();
