const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function listNewLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('id, business_name, name, email, phone, website, status, notes, scraped_metadata')
    .eq('status', 'New')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching leads:', error);
    return;
  }

  console.log(`Total New Leads: ${data.length}`);
  data.forEach((l, idx) => {
    console.log(`${idx + 1}. [${l.id}] ${l.business_name} | Web: ${l.website} | Email: ${l.email} | Phone: ${l.phone}`);
  });
}

listNewLeads();
