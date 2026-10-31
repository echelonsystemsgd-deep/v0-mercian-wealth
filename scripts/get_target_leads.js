const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const targetNames = [
  'Focus LLP',
  'Marr & Company',
  'SAR Accounting',
  'ASTON Accountants',
  'ST Accountants',
  'MPI Accounting',
  'PKPI Chartered Accountants',
  'Sterling Gate Accountants',
  'dns accountants Slough',
  'Adam Accountancy Limited',
  'MA Accountancy',
  'Direct Assist Accountants',
  'E-Tax Associates',
  'Pure Accounts & Management',
  'Asmat & Co',
  'Uppal Accountants',
  'TaxAssist Accountants Slough',
  'Abacus Accountants',
  'Nafs Accountants',
  'A G Accountancy',
  'Janjua & Co',
  'Al-Baraka Accountants',
  'KP Tax Consultants Ltd',
  'Berg Kaprow Lewis LLP',
  'Solihull Practice Tax Advisers',
  'Midland Corporate Audit Group',
  'Northern Quarter Bookkeeping & Tax'
];

async function fetchDetails() {
  const { data, error } = await supabase.from('leads').select('*');
  if (error) { console.error(error); return; }

  const results = [];
  for (const name of targetNames) {
    const match = data.find(l => (l.business_name && l.business_name.toLowerCase().includes(name.toLowerCase())) || (l.name && l.name.toLowerCase().includes(name.toLowerCase())));
    if (match) {
      results.push(match);
    } else {
      console.log('NOT FOUND:', name);
    }
  }

  console.log('Matched leads count:', results.length);
  const fs = require('fs');
  fs.writeFileSync('scripts/target_leads_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to scripts/target_leads_data.json');
}
fetchDetails();
