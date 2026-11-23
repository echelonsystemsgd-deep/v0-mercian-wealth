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

async function checkExistingBirmingham() {
  const websites = [
    'gondalaccountancy.co.uk',
    'wmaccountants.com',
    'bay-accounting.co.uk',
    'msbaccountants.co.uk',
    'rk-accountancy.co.uk',
    'smaccountantsltd.co.uk',
    'kaccountancy.org.uk',
    'cheylesmore.com',
    'rraccountants.uk',
    'taxassist.co.uk'
  ];

  for (const w of websites) {
    const { data } = await supabase.from('leads').select('id, business_name, website, status').ilike('website', `%${w}%`);
    if (data && data.length > 0) {
      console.log(`EXISTS: ${w} ->`, data);
    } else {
      console.log(`NEW: ${w}`);
    }
  }
}

checkExistingBirmingham();
