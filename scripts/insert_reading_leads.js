const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const audited = JSON.parse(fs.readFileSync('scripts/reading_audited_leads_deep.json', 'utf8'));

function cleanEmail(rawEmail) {
  if (!rawEmail) return null;
  let e = rawEmail.toLowerCase().trim();
  if (e.startsWith('emailhello@')) e = 'hello@' + e.substring('emailhello@'.length);
  if (e === 'user@domain.com' || e.includes('cfolks.pl')) return null;
  return e;
}

const leadsToInsert = audited.map(l => {
  const email = cleanEmail(l.primaryEmail);
  const channel = email ? 'email' : 'whatsapp';
  const director = l.keyPerson || 'Practice Partners';

  const notes = `• LOCATION: ${l.address} · ★${l.rating} (${l.reviews} reviews)\n` +
    `• VERIFIED FLAW: ${l.primaryFlaw}\n` +
    `• EVIDENCE: Audited on 390px mobile viewport across Core Web Vitals and conversion architecture. URL: ${l.finalUrl || l.website}\n` +
    `• IMPACT: Prospective Reading business directors and high-net-worth clients experience drop-off or security hesitation before scheduling discovery.\n` +
    `• PROTOTYPE FIX: Institutional Practice OS with frictionless 60-second retainer pre-qualification and automated discovery scheduling.`;

  return {
    business_name: l.name,
    name: director,
    email: email,
    phone: l.phone,
    website: l.finalUrl || l.website,
    service_interested: 'Practice OS & Digital Client Portal',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Chartered Accountants & Tax Advisors Reading',
    whatsapp_direct_url: l.phone ? `https://wa.me/${l.phone.replace(/[^0-9]/g, '')}` : null,
    notes: notes,
    scraped_metadata: {
      channel: channel,
      trade: 'Chartered Accountants & Tax Advisors',
      address: l.address,
      rating: l.rating,
      reviews_count: l.reviews,
      friction_title: l.primaryFlaw,
      observable_problem: `${l.name} in Reading: ${l.primaryFlaw}`
    }
  };
});

async function insertAll() {
  console.log(`Inserting ${leadsToInsert.length} audited Reading leads into Supabase...`);
  const { data, error } = await supabase.from('leads').insert(leadsToInsert).select('id, business_name, email, phone');
  if (error) {
    console.error('Error inserting Reading leads:', error);
    return;
  }
  console.log(`Successfully inserted ${data.length} Reading leads!`);
  data.forEach((d, i) => console.log(`${i+1}. [${d.id}] ${d.business_name} | ${d.email || d.phone}`));
}

insertAll();
