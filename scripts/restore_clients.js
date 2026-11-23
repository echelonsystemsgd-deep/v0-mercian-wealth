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

async function restoreClients() {
  const backup = JSON.parse(fs.readFileSync('scripts/archived_duplicate_leads.json', 'utf8'));

  const clientIds = [
    '7a174a93-49c6-44ea-941b-1ad4be96769b', // Sell Your Stamps UK
    '3399a827-c697-4109-b3a0-f059901af8ac'  // Chitram TV / Shiva Technology Ltd
  ];

  const toRestore = backup
    .filter(b => clientIds.includes(b.id))
    .map(b => {
      const copy = { ...b };
      delete copy.archive_reason;
      return copy;
    });

  console.log(`Restoring ${toRestore.length} active client records into Supabase...`);

  for (const client of toRestore) {
    console.log(`Restoring: "${client.business_name}" (${client.name}) - Status: ${client.status}`);
    const { data, error } = await supabase.from('leads').insert(client).select();
    if (error) {
      console.error(`Error restoring ${client.business_name}:`, error);
    } else {
      console.log(`Successfully restored ${client.business_name} with ID: ${data[0].id}`);
    }
  }

  // Check total records
  const { count } = await supabase.from('leads').select('*', { count: 'exact', head: true });
  console.log(`Current verified count in Supabase leads: ${count}`);
}

restoreClients();
