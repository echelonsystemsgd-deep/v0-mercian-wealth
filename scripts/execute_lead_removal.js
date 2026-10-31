const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const idsToRemove = [
  'e8ef2b86-e870-46b3-9144-bcae913f0f5b', // Focus LLP
  'b70323b3-68c9-43c2-831e-96f0442e660c', // ASTON Accountants
  '96fb0455-11b3-48e7-8b70-1ff19d6333a4', // ST Accountants Limited
  '678bca34-e999-4dd2-a988-92d4e9e20e04', // MPI Accounting & Management Services
  'f21d2351-9081-4ac3-8bca-8e0c273c1988', // PKPI Chartered Accountants
  '72d9ed52-013f-44d5-83f6-3108fec6b708', // Sterling Gate Accountants
  'ad4c1e98-fa14-4543-b035-99ed562c5f35', // dns accountants Slough
  '78809d7e-2f4c-4467-8997-2fcf2b90fb64', // Adam Accountancy Limited
  '461e35a3-288b-4404-ae60-0bc33d2cc4fa', // MA Accountancy
  '3c8f1f24-de64-4e1c-bf53-27ada87c893e', // Direct Assist Accountants
  '1868f0f5-880d-44e8-a12c-13f505e4eb3e', // E-Tax Associates
  '7217a7a6-c55b-48e1-a6b4-cb3375767145', // Pure Accounts & Management Ltd
  '815b354a-a854-41c0-ad6f-fc1f801ea840', // Asmat & Co
  'ca2b0814-7fb6-48d9-aed9-97da283a7aa5', // Uppal Accountants
  '19cc7f3e-1213-47da-92fb-3b049459a30d', // TaxAssist Accountants Slough
  'f945cbe3-49ee-4192-b925-c9d80281db97', // Abacus Accountants
  'ddc66873-c851-4d14-ab72-372d11edd387', // Nafs Accountants
  '5748d599-84e4-43fd-9e92-ffe6a9cdebf7', // A G Accountancy
  '1ea9fee5-1441-4451-afd1-d23f8ef6c6a6', // Janjua & Co
  '14a8f865-f367-466e-88f8-cbcf003b78db', // Al-Baraka Accountants
  '28944628-e6b4-4160-bfb6-b09583e36791', // Solihull Practice Tax Advisers
  'd5533d32-26cf-470e-b610-66533c7e8879'  // Midland Corporate Audit Group
];

async function removeLeads() {
  console.log(`Targeting ${idsToRemove.length} leads for removal...`);
  
  // 1. Fetch them for complete backup
  const { data: backupData, error: fetchErr } = await supabase
    .from('leads')
    .select('*')
    .in('id', idsToRemove);

  if (fetchErr) {
    console.error('Error fetching backup:', fetchErr);
    return;
  }

  fs.writeFileSync('scripts/removed_leads_archive.json', JSON.stringify(backupData, null, 2));
  console.log(`Saved backup of ${backupData.length} leads to scripts/removed_leads_archive.json`);

  // 2. Delete from DB
  const { error: delErr } = await supabase
    .from('leads')
    .delete()
    .in('id', idsToRemove);

  if (delErr) {
    console.error('Error deleting leads:', delErr);
    return;
  }

  console.log('Successfully removed 22 leads from DB!');

  // Verify remaining count
  const { data: remaining, count } = await supabase.from('leads').select('id', { count: 'exact' });
  console.log(`Remaining active leads count: ${remaining.length}`);
}

removeLeads();
