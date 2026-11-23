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

async function main() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .or('website.ilike.%chartaccountancy%,website.ilike.%berkshireaccountants%,website.ilike.%deadsimpleaccounting%');

  if (error) {
    console.error('Supabase query error:', error);
    return;
  }

  console.log('Columns in leads table:');
  console.log(Object.keys(data[0]));

  for (const row of data) {
    console.log('\n================================');
    console.log('Record ID:', row.id);
    console.log('Business Name:', row.business_name);
    console.log('Contact Name:', row.name);
    console.log('Status:', row.status);
    console.log('Phone:', row.phone);
    console.log('Email:', row.email);
    console.log('Notes:', row.notes);
    console.log('Scraped Metadata:', JSON.stringify(row.scraped_metadata, null, 2));
  }
}

main();
