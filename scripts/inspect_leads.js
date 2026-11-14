const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectActive() {
  const { data, error } = await supabase.from('leads').select('id, business_name, name, status, website, phone, notes, scraped_metadata').neq('status', 'Lost').limit(5);
  if (error) {
    console.error('Error:', error);
    return;
  }
  data.forEach((l, i) => {
    console.log(`\n=== LEAD ${i+1}: ${l.business_name || l.name} (${l.status}) ===`);
    console.log('Website:', l.website);
    console.log('Phone:', l.phone);
    console.log('Meta keys:', Object.keys(l.scraped_metadata || {}));
    console.log('Observable flaw:', l.scraped_metadata?.observable_problem || 'NONE');
    console.log('Commercial lever:', l.scraped_metadata?.commercial_outcome || 'NONE');
    console.log('Concrete fix:', l.scraped_metadata?.concrete_fix || 'NONE');
  });
}
inspectActive();
