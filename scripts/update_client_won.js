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

async function setWon() {
  await supabase
    .from('leads')
    .update({ status: 'Won' })
    .eq('id', '3399a827-c697-4109-b3a0-f059901af8ac');

  console.log('Chitram TV status updated to Won!');

  const { data } = await supabase.from('leads').select('id, business_name, name, status, website').in('id', [
    '7a174a93-49c6-44ea-941b-1ad4be96769b',
    '3399a827-c697-4109-b3a0-f059901af8ac'
  ]);
  console.log('Restored clients in DB:', data);
}

setWon();
