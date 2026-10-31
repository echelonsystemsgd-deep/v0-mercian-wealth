const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function getCadenceInfo(lead) {
  const meta = lead.scraped_metadata || {};
  const contactedAt = meta.contacted_at || (lead.status === 'Contacted' ? lead.created_at : null);
  const now = new Date('2026-10-28T13:20:00Z').getTime();

  if (!contactedAt || lead.status !== 'Contacted') {
    return { stage: 'new', label: 'Not Contacted', isDueNow: false };
  }

  const contactTime = new Date(contactedAt).getTime();
  const hoursSinceContact = (now - contactTime) / (1000 * 60 * 60);

  const fu1SentAt = meta.follow_up_1_sent_at;
  const fu2SentAt = meta.follow_up_2_sent_at;

  if (fu2SentAt) {
    return { stage: 'completed', label: 'Cadence Closed', isDueNow: false };
  }

  if (fu1SentAt) {
    const hoursSinceFu1 = (now - new Date(fu1SentAt).getTime()) / (1000 * 60 * 60);
    if (hoursSinceFu1 >= 72) {
      return { stage: 'due_fu2', label: 'Due Final (FU2)', isDueNow: true };
    }
    return { stage: 'waiting_fu2', label: 'Cooling Down (FU2)', isDueNow: false };
  }

  if (hoursSinceContact >= 48) {
    return { stage: 'due_fu1', label: 'Due Follow-Up 1', isDueNow: true };
  }

  return { stage: 'waiting_fu1', label: 'Cooling Down (FU1)', isDueNow: false };
}

async function runCheck() {
  const { data } = await supabase.from('leads').select('*').eq('is_archived', false);
  const dueFollowUps = data.filter(l => getCadenceInfo(l).isDueNow);
  console.log('Total Active Leads:', data.length);
  console.log('Due Follow-Ups Total:', dueFollowUps.length);
  dueFollowUps.forEach((l, idx) => {
    const info = getCadenceInfo(l);
    console.log(`${idx + 1}. [${info.stage}] ${l.business_name} | Contacted: ${l.scraped_metadata?.contacted_at || l.created_at}`);
  });
}
runCheck();
