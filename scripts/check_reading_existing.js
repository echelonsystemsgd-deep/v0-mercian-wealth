const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const readingLeads = JSON.parse(fs.readFileSync('scripts/reading_audited_leads_deep.json', 'utf8'));

async function checkExisting() {
  const phones = readingLeads.map(l => l.phone).filter(Boolean);
  const emails = readingLeads.map(l => l.primaryEmail).filter(Boolean);

  const { data: byPhone } = await supabase.from('leads').select('id, business_name, phone').in('phone', phones);
  const { data: byEmail } = await supabase.from('leads').select('id, business_name, email').in('email', emails);

  console.log('Existing by phone:', byPhone?.length || 0);
  console.log('Existing by email:', byEmail?.length || 0);
}
checkExisting();
