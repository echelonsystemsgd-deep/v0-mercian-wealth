const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSpecific() {
  const { data } = await supabase.from('leads').select('id, business_name, name, status, email, phone');
  const names = ['Gaurav', 'Padam', 'Joshi', 'Bhatia', 'Parul', 'Stamps', 'Ali', 'Viky', 'Chitram', 'Shiva'];
  
  console.log('Matches:');
  data.forEach(l => {
    const text = (l.business_name + ' ' + l.name + ' ' + (l.notes || '')).toLowerCase();
    for (const n of names) {
      if (text.includes(n.toLowerCase())) {
        console.log(`Matched [${n}]: ${l.id} | ${l.business_name} | ${l.name} | ${l.status}`);
        break;
      }
    }
  });
}
checkSpecific();
