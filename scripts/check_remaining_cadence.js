const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkCadence() {
  const { data, error } = await supabase.from('leads').select('id, business_name, name, email, phone, status, notes, scraped_metadata');
  if (error) {
    console.error('Error fetching leads:', error);
    return;
  }
  
  const now = new Date('2026-10-28T13:20:00Z').getTime();
  const dueFU1 = [];
  data.forEach(l => {
    const meta = l.scraped_metadata || {};
    const contactedAt = meta.contacted_at;
    if (l.status === 'Contacted' && !meta.follow_up_1_sent_at && contactedAt) {
      const ageHours = (now - new Date(contactedAt).getTime()) / (1000 * 60 * 60);
      if (ageHours >= 48) {
        dueFU1.push({ name: l.business_name, email: l.email, phone: l.phone, ageHours: Math.round(ageHours) });
      }
    }
  });

  console.log('Due Follow-Up 1 count:', dueFU1.length);
  dueFU1.forEach((l, i) => console.log((i+1) + '. ' + l.name + ' (' + (l.email || l.phone) + ') - age ' + l.ageHours + 'h'));
}
checkCadence();
