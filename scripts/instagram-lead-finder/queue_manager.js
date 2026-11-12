const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found at ' + envPath);
  }
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf-8')
      .split('\n')
      .filter(l => l.includes('='))
      .map(l => {
        const idx = l.indexOf('=');
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      })
  );
}

const env = loadEnv();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

function getDailyLimit(warmupDay) {
  if (warmupDay <= 4) return 3;
  if (warmupDay <= 7) return 5;
  if (warmupDay <= 14) return 10;
  if (warmupDay <= 21) return 20;
  return 30;
}

async function showStatus() {
  console.log('\n======================================================');
  console.log('       INSTAGRAM LEAD FINDER: CAMPAIGN STATUS         ');
  console.log('======================================================\n');

  const { data: leads, error } = await supabase
    .from('instagram_leads')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching leads:', error.message);
    return;
  }

  const warmupDay = leads[0]?.warmup_day || 1;
  const dailyCap = getDailyLimit(warmupDay);

  const statusCounts = {};
  leads.forEach(l => {
    statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
  });

  const now = new Date();
  const dueFollowups = leads.filter(l => 
    (l.status === 'sent_d1' || l.status === 'sent_d4') && 
    l.next_action_due && 
    new Date(l.next_action_due) <= now
  );

  console.log(`Current Warmup Day:  ${warmupDay}`);
  console.log(`Daily Send Ceiling:  ${dailyCap} messages/day (Total D1 + D4 + D7)`);
  console.log(`Total Leads Loaded:  ${leads.length}`);
  console.log('------------------------------------------------------');
  console.log('Breakdown by Status:');
  console.log(`  • Qualified (In Reserve): ${statusCounts['qualified'] || 0}`);
  console.log(`  • Queued for D1:          ${statusCounts['queued_d1'] || 0}`);
  console.log(`  • D1 Sent:                ${statusCounts['sent_d1'] || 0}`);
  console.log(`  • Queued for D4:          ${statusCounts['queued_d4'] || 0}`);
  console.log(`  • D4 Sent:                ${statusCounts['sent_d4'] || 0}`);
  console.log(`  • Queued for D7:          ${statusCounts['queued_d7'] || 0}`);
  console.log(`  • D7 Sent (Sequence Done):${statusCounts['sent_d7'] || 0}`);
  console.log(`  • Replied (Hot Leads!):   ${statusCounts['replied'] || 0}`);
  console.log(`  • Closed / Opted Out:     ${statusCounts['closed'] || 0}`);
  console.log('------------------------------------------------------');
  console.log(`Follow-ups Due Right Now: ${dueFollowups.length}`);
  if (dueFollowups.length > 0) {
    dueFollowups.forEach(f => {
      console.log(`   - @${f.instagram_handle} (Current: ${f.status})`);
    });
  }
  console.log('======================================================\n');
}

async function getDailyBatch() {
  const { data: leads, error } = await supabase
    .from('instagram_leads')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching leads:', error.message);
    return;
  }

  const warmupDay = leads[0]?.warmup_day || 1;
  const dailyCap = getDailyLimit(warmupDay);
  const now = new Date();

  // 1. First priority: Due follow-ups (D4 or D7)
  const dueFollowups = leads.filter(l => 
    (l.status === 'sent_d1' || l.status === 'sent_d4') && 
    l.next_action_due && 
    new Date(l.next_action_due) <= now
  );

  const batch = [];

  for (const f of dueFollowups) {
    if (batch.length >= dailyCap) break;
    const step = f.status === 'sent_d1' ? 'd4' : 'd7';
    batch.push({
      lead: f,
      step: step,
      message: step === 'd4' ? f.message_d4 : f.message_d7
    });
  }

  // 2. Second priority: New D1 leads if daily cap has room
  const remainingSlots = dailyCap - batch.length;
  if (remainingSlots > 0) {
    const queuedD1 = leads.filter(l => l.status === 'queued_d1');
    for (const d of queuedD1) {
      if (batch.length >= dailyCap) break;
      batch.push({
        lead: d,
        step: 'd1',
        message: d.message_d1
      });
    }

    // If more slots remain and we have 'qualified' leads, queue them up
    if (batch.length < dailyCap) {
      const qualified = leads.filter(l => l.status === 'qualified');
      for (const q of qualified) {
        if (batch.length >= dailyCap) break;
        batch.push({
          lead: q,
          step: 'd1',
          message: q.message_d1
        });
      }
    }
  }

  console.log('\n======================================================');
  console.log(` TODAY'S ACTIVE OUTREACH BATCH (${batch.length} of ${dailyCap} allocated)`);
  console.log('======================================================\n');

  if (batch.length === 0) {
    console.log('No messages due today. You have reached your quota or no leads are scheduled.');
    return;
  }

  batch.forEach((item, index) => {
    const l = item.lead;
    console.log(`[Slot ${index + 1}/${dailyCap}] --- Step: ${item.step.toUpperCase()} ---`);
    console.log(`Business:     ${l.business_name}`);
    console.log(`Instagram:    @${l.instagram_handle} (${l.instagram_url})`);
    console.log(`Website:      ${l.has_website ? l.website_url : 'NO WEBSITE (DM-only)'}`);
    console.log(`Phone:        ${l.phone || 'N/A'}`);
    console.log(`Location:     ${l.location}`);
    console.log(`Why Contact:  ${l.qualification_reason}`);
    console.log(`Specific Car: ${l.specific_car_hook}`);
    console.log('\n--- Prepared Message ---');
    console.log(item.message);
    console.log('------------------------------------------------------\n');
  });
}

async function recordSent(handle, step) {
  if (!handle || !step) {
    console.log('Usage: node queue_manager.js record-sent <handle> <d1|d4|d7>');
    return;
  }

  const cleanHandle = handle.replace('@', '').trim();
  const stepLower = step.toLowerCase();

  const now = new Date();
  const updateFields = {
    updated_at: now.toISOString()
  };

  if (stepLower === 'd1') {
    updateFields.status = 'sent_d1';
    updateFields.d1_sent_at = now.toISOString();
    // Schedule Day 4 (+3 days)
    const d4Due = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    updateFields.next_action_due = d4Due.toISOString();
  } else if (stepLower === 'd4') {
    updateFields.status = 'sent_d4';
    updateFields.d4_sent_at = now.toISOString();
    // Schedule Day 7 (+3 days)
    const d7Due = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    updateFields.next_action_due = d7Due.toISOString();
  } else if (stepLower === 'd7') {
    updateFields.status = 'sent_d7';
    updateFields.d7_sent_at = now.toISOString();
    updateFields.next_action_due = null;
  } else {
    console.error('Invalid step. Use d1, d4, or d7.');
    return;
  }

  const { data, error } = await supabase
    .from('instagram_leads')
    .update(updateFields)
    .eq('instagram_handle', cleanHandle)
    .select();

  if (error) {
    console.error('Error updating lead:', error.message);
  } else {
    console.log(`Successfully recorded ${stepLower.toUpperCase()} sent for @${cleanHandle}`);
    if (updateFields.next_action_due) {
      console.log(`Next follow-up scheduled for: ${updateFields.next_action_due}`);
    }
  }
}

async function recordReply(handle) {
  if (!handle) {
    console.log('Usage: node queue_manager.js record-reply <handle>');
    return;
  }
  const cleanHandle = handle.replace('@', '').trim();
  const now = new Date();

  const { data, error } = await supabase
    .from('instagram_leads')
    .update({
      status: 'replied',
      last_reply_at: now.toISOString(),
      next_action_due: null,
      updated_at: now.toISOString()
    })
    .eq('instagram_handle', cleanHandle)
    .select();

  if (error) {
    console.error('Error recording reply:', error.message);
  } else {
    console.log(`🔥 LEAD REPLIED! @${cleanHandle} marked as 'replied'. Follow-up sequence halted.`);
  }
}

async function setWarmupDay(day) {
  const dayNum = parseInt(day, 10);
  if (isNaN(dayNum) || dayNum < 1) {
    console.error('Please provide a valid day number (e.g. 1, 5, 10)');
    return;
  }

  const { error } = await supabase
    .from('instagram_leads')
    .update({ warmup_day: dayNum })
    .neq('business_name', '');

  if (error) {
    console.error('Error updating warmup day:', error.message);
  } else {
    console.log(`Updated campaign warmup day to Day ${dayNum} (Daily limit: ${getDailyLimit(dayNum)}/day)`);
  }
}

async function main() {
  const cmd = process.argv[2] || 'status';
  const arg1 = process.argv[3];
  const arg2 = process.argv[4];

  switch (cmd) {
    case 'status':
      await showStatus();
      break;
    case 'get-batch':
      await getDailyBatch();
      break;
    case 'record-sent':
      await recordSent(arg1, arg2);
      break;
    case 'record-reply':
      await recordReply(arg1);
      break;
    case 'set-warmup':
      await setWarmupDay(arg1);
      break;
    default:
      console.log('Available commands: status | get-batch | record-sent <handle> <step> | record-reply <handle> | set-warmup <day>');
  }
}

main().catch(console.error);
