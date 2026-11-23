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

async function checkLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .limit(1);

  console.log('Columns:', Object.keys(data[0] || {}));
  
  const { data: awData } = await supabase
    .from('leads')
    .select('id, name, company, website, status')
    .ilike('website', '%armstrong%');
  console.log('Search website armstrong:', awData);
}

checkLeads();
