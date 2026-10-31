const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const phones = [
  '+447935220677',
  '+919814310561',
  '+919216907388',
  '+919872037320',
  '+919781411070',
  '+919888960702',
  '0161 832 4841',
  '0121 748 7100',
  '0113 245 1200',
  '0161 832 6800',
  '0117 900 1600'
];

async function checkDuplicates() {
  const { data: byPhone } = await supabase.from('leads').select('id, business_name, phone').in('phone', phones);
  console.log('Existing by phone:', byPhone);
}
checkDuplicates();
