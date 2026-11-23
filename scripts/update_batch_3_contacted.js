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

async function main() {
  const nowIso = new Date().toISOString();

  // 1. ARMSTRONG WATSON LLP
  const awNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second enterprise regional intake engine eliminating double-email verification friction and routing corporate audit vs private wealth enquiries (£4,950 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated regional partner calendar routing across 19 offices + CRM integration + SLA speed-to-lead verification (£1,250/mo retainer).',
    '  - Projected Year 1 Contract Value: £19,950.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Double-Entry Email Burden: The contact form on /contact-armstrong-watson requires typing email twice (edit-email and edit-confirm-email), creating needless mobile friction.',
    '  - Generic Triage Funnel: A single Drupal 11 webform queue handles all incoming enquiries via a binary "Are you an existing client? [Yes / No]" dropdown and unguided textarea.',
    '  - High-Value Audit Dilution: £50k+ corporate audit & M&A advisory leads are commingled with basic general enquiries into the generic help@ inbox without turnover or urgency scoping.',
    '  - Missing Instant Partner Calendar Booking: Prospective clients cannot book a consultation directly with their regional practice lead.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Paul Dickson (Chief Executive & Managing Partner)',
    '  - Direct Email: paul.dickson@armstrongwatson.co.uk',
    '  - Office General Email: help@armstrongwatson.co.uk',
    '  - Direct Office Tel: 01228 690100 (Carlisle Head Office)',
    '  - Freephone: 0808 144 5575',
    '  - WhatsApp: https://wa.me/441228690100',
    '  - Personal LinkedIn: https://uk.linkedin.com/in/paulalandickson',
    '  - Personal Twitter/X: https://twitter.com/PaulAlanDickson',
    '  - Firm LinkedIn: https://www.linkedin.com/company/armstrong-watson',
    '  - Firm Instagram: https://www.instagram.com/armstrongwatsonllp/',
    '  - Head Office: Rosehill, Montgomery Way, Carlisle, Cumbria, CA1 2RW',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To Direct Office Tel / Mobile: 01228 690100)]',
    '  Message: Hi Paul, Gurtej here from Mercian Wealth. Was reviewing Armstrong Watson on mobile and noticed your main enquiry form on /contact-armstrong-watson still requires users to type their email twice, whilst routing multi-million pound corporate audit enquiries through the exact same unguided text box as existing client queries. We build automated partner-intake architecture for regional accountancy practices that automatically separates high-value statutory audit leads from routine queries before they hit your inbox. Would you be open to a quick 10-minute discovery call next Tuesday or Wednesday morning to see how it works?',
    '',
    '  [EMAIL - Day 1]',
    '  To: paul.dickson@armstrongwatson.co.uk',
    '  Subject: Armstrong Watson intake architecture & partner routing',
    '  Body:',
    '  Hi Paul,',
    '',
    '  Gurtej here from Mercian Wealth.',
    '',
    '  I was reviewing Armstrong Watson\'s digital intake across your 19 regional hubs. Your team has built an incredible market presence, but I noticed a distinct operational friction point on your main contact portal:',
    '',
    '  Your intake form on /contact-armstrong-watson still requires prospective corporate clients to manually confirm their email twice, while funnelling high-value audit, restructuring, and wealth advisory requests through an unguided textarea into the same generic queue.',
    '',
    '  We architect intelligent intake and automated triage systems for leading UK accountancy firms—qualifying company turnover, identifying practice discipline, and directly routing vetted enquiries into the appropriate regional partner diary within 60 seconds.',
    '',
    '  Would you be open to a 10-minute discovery call next Tuesday at 10:30 AM or Wednesday at 2:00 PM to explore how this could streamline your inbound pipeline?',
    '',
    '  Best regards,',
    '  Gurtej',
    '  Mercian Wealth',
    '  mercianwealth.com',
    '',
    '  [LINKEDIN DM - Day 1 (To: https://uk.linkedin.com/in/paulalandickson)]',
    '  Message: Hi Paul, Gurtej here from Mercian Wealth. Noticed Armstrong Watson\'s central contact portal still funnels high-value corporate audit enquiries through an unguided webform with double email validation alongside existing client requests. We\'ve engineered automated partner-routing intake engines for UK practices that triage turnover and sync qualified consultations straight into regional partner diaries. Would you be open to a brief 10-minute discovery call next week to see how it operates?',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Phone: 01228 690100 / 0808 144 5575',
    '  Gatekeeper Hook: "Good morning, could you put me through to Paul Dickson\'s office please? It\'s Gurtej calling regarding your regional digital intake architecture."',
    '  Opening (Permission Hook): "Hi Paul, Gurtej calling from Mercian Wealth. I know you\'re managing firm strategy across 19 offices, so I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I sent an email over last week regarding your contact portal on armstrongwatson.co.uk. Currently, prospective corporate clients are required to type their email twice, and seven-figure audit enquiries are dumped into the same generic intake queue as everyday support requests."',
    '  The Fix: "We design automated regional partner triage systems that qualify corporate turnover upfront and place high-value audit and advisory clients directly into your regional partners\' calendars in under 60 seconds."',
    '  Closing CTA: "I\'d like to show you a quick 10-minute screen share next Tuesday or Wednesday morning. Would 10:30 AM work on Tuesday?"'
  ].join('\n');

  // Insert or Upsert Armstrong Watson
  const { data: awExisting } = await supabase.from('leads').select('id').ilike('website', '%armstrongwatson%');
  if (awExisting && awExisting.length > 0) {
    console.log('Updating existing Armstrong Watson:', awExisting[0].id);
    await supabase.from('leads').update({
      status: 'Contacted',
      name: 'Paul Dickson',
      first_name: 'Paul',
      last_name: 'Dickson',
      business_name: 'Armstrong Watson LLP',
      email: 'paul.dickson@armstrongwatson.co.uk',
      phone: '01228 690100',
      website: 'https://www.armstrongwatson.co.uk/',
      notes: awNotes,
      updated_at: nowIso,
      linkedin_url: 'https://uk.linkedin.com/in/paulalandickson',
      whatsapp_direct_url: 'https://wa.me/441228690100',
      industry: 'Accountancy & Business Advisory',
      tier: 'Enterprise',
      scraped_metadata: {
        partner_name: 'Paul Dickson',
        director_name: 'Paul Dickson',
        grade: 'B',
        grade_reason: 'Monolithic Drupal form with double email confirmation burden and no corporate audit intake triage',
        friction_title: 'Double Email Input & Monolithic Triage Bottleneck',
        observable_problem: 'Contact form on /contact-armstrong-watson forces double email typing and dumps high-value corporate audit enquiries into an unguided general queue.',
        concrete_fix: 'Enterprise regional intake engine with automatic turnover qualification and partner diary scheduling.',
        tech_stack: 'Drupal 11 (PHP 8.3 / Nginx)',
        audit_status: 'complete',
        deal_tier_setup: '£4,950',
        deal_tier_retainer: '£1,250/mo',
        deal_total_y1_value: '£19,950'
      }
    }).eq('id', awExisting[0].id);
  } else {
    console.log('Inserting Armstrong Watson into leads table...');
    const { data: newAw, error: awErr } = await supabase.from('leads').insert({
      status: 'Contacted',
      name: 'Paul Dickson',
      first_name: 'Paul',
      last_name: 'Dickson',
      business_name: 'Armstrong Watson LLP',
      email: 'paul.dickson@armstrongwatson.co.uk',
      phone: '01228 690100',
      website: 'https://www.armstrongwatson.co.uk/',
      source: 'manual_audit',
      notes: awNotes,
      created_at: nowIso,
      updated_at: nowIso,
      linkedin_url: 'https://uk.linkedin.com/in/paulalandickson',
      whatsapp_direct_url: 'https://wa.me/441228690100',
      industry: 'Accountancy & Business Advisory',
      tier: 'Enterprise',
      scraped_metadata: {
        partner_name: 'Paul Dickson',
        director_name: 'Paul Dickson',
        grade: 'B',
        grade_reason: 'Monolithic Drupal form with double email confirmation burden and no corporate audit intake triage',
        friction_title: 'Double Email Input & Monolithic Triage Bottleneck',
        observable_problem: 'Contact form on /contact-armstrong-watson forces double email typing and dumps high-value corporate audit enquiries into an unguided general queue.',
        concrete_fix: 'Enterprise regional intake engine with automatic turnover qualification and partner diary scheduling.',
        tech_stack: 'Drupal 11 (PHP 8.3 / Nginx)',
        audit_status: 'complete',
        deal_tier_setup: '£4,950',
        deal_tier_retainer: '£1,250/mo',
        deal_total_y1_value: '£19,950'
      }
    }).select();
    console.log('Insert result:', newAw, awErr);
  }

  console.log('All Supabase operations completed successfully!');
}

main().catch(console.error);
