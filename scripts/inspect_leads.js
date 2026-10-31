const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function inspectAll27() {
  const { data, error } = await supabase.from('leads').select('id, business_name, name, email, phone, website, status, notes, scraped_metadata, created_at').order('created_at', { ascending: true });
  if (error) { console.error(error); return; }
  
  console.log('Total leads found:', data.length);
  data.forEach((l, idx) => {
    console.log(`[${idx + 1}] ID:${l.id} | Biz:${l.business_name} | Name:${l.name} | Email:${l.email} | Phone:${l.phone} | Status:${l.status}`);
  });
}
inspectAll27();
