const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const getEnv = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : null;
};

const supabase = createClient(
  getEnv('NEXT_PUBLIC_SUPABASE_URL'),
  getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

async function cleanDuplicates() {
  console.log('--- EXECUTING DATABASE DEDUPLICATION & HYGIENE CLEANUP ---');

  // IDs to remove:
  // 1. Finchley Chartered Practice Advisory (duplicate of bkl.co.uk)
  // 2. Tait Walker LLP (Azets Newcastle) (duplicate of azets.co.uk, keeping Baldwins / Azets Birmingham)
  // 3. 4 leads with website == 'null'
  // 4. 3 non-accountancy items (Sell Your Stamps UK, Punjab Plates UK, Chitram TV)

  const toRemove = [
    { id: '9b3e4dba-7d67-4302-aa8d-7ac53aa21a6f', reason: 'Duplicate website bkl.co.uk (alias of Berg Kaprow Lewis LLP)' },
    { id: 'bc384c2a-1280-4773-9e0d-e13475258996', reason: 'Duplicate website azets.co.uk (keeping Baldwins / Azets Birmingham)' },
    { id: '531a9eae-e5a9-4ad8-bd3d-67750be76050', reason: 'No website (null URL: St James Private Tax Advisers)' },
    { id: '89e73fe0-acba-4ccf-8aed-dc362598d71c', reason: 'No website (null URL: Mayfair Asset & Tax Advisory)' },
    { id: 'ae58c94a-dd3f-4dd9-bcc9-f9a9ce927b43', reason: 'No website (null URL: Northern Quarter Bookkeeping & Tax)' },
    { id: '020dce40-6894-4340-af87-f3e02cb9eee2', reason: 'No website (null URL: B.K. Joshi & Associates Law Firm)' },
    { id: '7a174a93-49c6-44ea-941b-1ad4be96769b', reason: 'Irrelevant non-accountancy business (Sell Your Stamps UK)' },
    { id: '34f709d4-66c5-42dd-9876-dc00f28d7e74', reason: 'Irrelevant non-accountancy business (Punjab Plates UK - TikTok)' },
    { id: '3399a827-c697-4109-b3a0-f059901af8ac', reason: 'Irrelevant non-accountancy business (Chitram TV - streaming app)' }
  ];

  const removeIds = toRemove.map(r => r.id);

  // Backup records before deletion
  const { data: recordsToBackup, error: fetchErr } = await supabase
    .from('leads')
    .select('*')
    .in('id', removeIds);

  if (fetchErr) {
    console.error('Error fetching records for backup:', fetchErr);
    return;
  }

  const backupPayload = recordsToBackup.map(rec => {
    const meta = toRemove.find(r => r.id === rec.id);
    return {
      ...rec,
      archive_reason: meta ? meta.reason : 'Duplicate/Invalid lead'
    };
  });

  fs.writeFileSync('scripts/archived_duplicate_leads.json', JSON.stringify(backupPayload, null, 2));
  console.log(`Backed up ${backupPayload.length} records to scripts/archived_duplicate_leads.json`);

  // Delete from Supabase
  const { error: delErr } = await supabase
    .from('leads')
    .delete()
    .in('id', removeIds);

  if (delErr) {
    console.error('Error deleting records:', delErr);
    return;
  }

  console.log(`Successfully removed ${removeIds.length} duplicate/invalid records from Supabase leads table!`);

  // Verify uniqueness now
  const { data: remainingLeads } = await supabase.from('leads').select('id, business_name, website');
  console.log(`Remaining leads in DB: ${remainingLeads.length}`);

  const checkMap = {};
  let anyDupes = false;
  remainingLeads.forEach(l => {
    let raw = (l.website || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
    if (checkMap[raw]) {
      console.log(`WARNING: Still a duplicate for ${raw}: [${l.id}] vs [${checkMap[raw].id}]`);
      anyDupes = true;
    } else {
      checkMap[raw] = l;
    }
  });

  if (!anyDupes) {
    console.log('✅ PERFECT: 100% of remaining leads have a strictly unique website in the database!');
  }
}

cleanDuplicates();
