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

async function updateDb() {
  const { data } = await supabase.from('leads').select('id, notes').ilike('website', '%armstrongwatson%');
  if (data && data.length > 0) {
    const id = data[0].id;
    await supabase.from('leads').update({
      scraped_metadata: {
        partner_name: 'Paul Dickson',
        director_name: 'Paul Dickson',
        grade: 'B',
        grade_reason: 'Mobile sticky header occludes form labels on scroll, double dropdown arrows, and no corporate audit intake triage',
        friction_title: 'Sticky Header Field Occlusion & Monolithic Triage Bottleneck',
        observable_problem: 'Mobile sticky navy header (~150px) pins to viewport and occludes active form field labels on scroll; double-arrow CSS glitch on dropdown; monolithic unguided textarea dumping 7-figure corporate audits into shared inbox.',
        concrete_fix: 'Enterprise regional intake engine with automatic turnover qualification and partner diary scheduling.',
        tech_stack: 'Drupal 11 (PHP 8.3 / Nginx)',
        audit_status: 'complete',
        deal_tier_setup: '£4,950',
        deal_tier_retainer: '£1,250/mo',
        deal_total_y1_value: '£19,950'
      }
    }).eq('id', id);
    console.log('Updated Armstrong Watson metadata in Supabase:', id);
  }
}

updateDb();
