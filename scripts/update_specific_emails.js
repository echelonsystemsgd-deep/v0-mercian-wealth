const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function updateEmails() {
  // 1. Brywel Associates
  const { error: err1 } = await supabase
    .from('leads')
    .update({ email: 'info@brywelassociates.co.uk' })
    .eq('id', '98c0d29f-4266-434d-8b12-05a3ddb75a91');

  if (err1) console.error('Error updating Brywel:', err1);
  else console.log('✓ Updated Brywel email to info@brywelassociates.co.uk');

  // 2. Hurn Accountants
  const { error: err2 } = await supabase
    .from('leads')
    .update({ email: 'tax@hurntax.co.uk' })
    .eq('id', '0b8e1aee-d734-4af3-a5a2-0c6559535ef4');

  if (err2) console.error('Error updating Hurn:', err2);
  else console.log('✓ Updated Hurn email to tax@hurntax.co.uk');
}

updateEmails();
