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

async function inspectExisting() {
  const ids = [
    'ba44e7cc-e09f-4890-a272-0f7476ec55b4',
    '94fe0531-add7-42f9-9603-c89a4bc009c1',
    'a29176c7-3afe-4dec-8b05-ed8d74861229'
  ];
  const { data, error } = await supabase
    .from('leads')
    .select('id, name, business_name, website, status, notes, scraped_metadata')
    .in('id', ids);

  console.log('Existing leads in DB:', JSON.stringify(data, null, 2));
}

inspectExisting();
