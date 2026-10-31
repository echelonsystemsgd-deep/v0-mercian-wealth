const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkWhatsApp() {
  const { data } = await supabase.from('leads').select('id, business_name, phone, status, notes, scraped_metadata').in('phone', ['+447700900222', '+447700900555', '+447861690954']);
  console.log(data);
}
checkWhatsApp();
