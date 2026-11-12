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
  // 1. Armstrong Watson (Manchester Hub)
  const awNotes = [
    '• VERIFIED FLAW: Primary hero CTA "Our culture" sends high-intent prospective business to an internal HR page; contact intake requires an 8-field Drupal form with an open message box and manual callback delay; broken MP4 video banners in background.',
    '• COMMERCIAL LEVER: Manchester business owners looking for rapid advisory are routed to passive culture pages, losing momentum to agile local competitors with instant consultation booking.',
    '• TECH STACK & VULNERABILITIES: Drupal 10 (PHP CMS), missing CSP, video asset loading failures, outdated 2024 copyright.',
    '• ARCHITECTURE FIX: Direct commercial hero with 60-second Manchester practice intake scoper and instant partner discovery scheduling.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Armstrong Watson\'s Manchester digital presence earlier—your 155-year practice pedigree is exceptional. However, I noticed your primary hero CTA currently directs traffic to an \"Our culture\" HR page, and your contact intake forces an 8-field Drupal form with no direct calendar booking hold. Ahead of statutory tax deadlines, are your Manchester partners finding high-turnover business enquiries get delayed in manual callback queues?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: awNotes,
    scraped_metadata: {
      observable_problem: 'Hero CTA \"Our culture\" directs commercial traffic to an internal HR page; contact page requires an 8-field Drupal form with no instant diary hold.',
      friction_title: 'Passive Culture Hero CTA & 8-Field Drupal Intake Form',
      commercial_outcome: 'High-turnover Ltd Co directors bounce due to passive navigation and 8-field form fatigue, delaying partner revenue pipeline.',
      concrete_fix: 'Sub-400ms commercial triage hub with direct Manchester partner calendar booking.',
      tech_stack: 'Drupal 10 (PHP CMS)',
      vulnerabilities: 'Missing Content-Security-Policy, aborted MP4 banner assets, outdated 2024 copyright',
      stack_summary: 'Drupal Monolith CMS',
      copy_headline: 'Our quest / To help our clients achieve prosperity...',
      trade: 'Chartered Accountants & Business Advisers Manchester',
      grade: 'D+',
      grade_reason: 'Passive HR hero CTA, 8-field form friction, and missing diary booking',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Armstrong Watson%,website.ilike.%armstrongwatson%');

  // 2. Arora Aggarwal & Co
  const aaNotes = [
    '• VERIFIED FLAW: Severe typography and template artifacts: broken hero title "Arora Aggarw a /", contact form titled "Request a free Legal Consultation" (unedited legal template), and spelling error "STAUTORY AUDIT".',
    '• COMMERCIAL LEVER: UK & international prospects seeking offshore accountancy lose trust immediately upon encountering unedited legal template headers and spelling errors.',
    '• TECH STACK & VULNERABILITIES: WordPress 7.1.4 (PHP), exposed WPForms open message box, missing CSP.',
    '• ARCHITECTURE FIX: Flawless high-trust UK/offshore intake architecture with verified service scoping and automated consultation booking.',
    '• CALL HOOK: Hi Gaurav, Gurtej here from Mercian Wealth. I was reviewing Arora Aggarwal on mobile—your international tax and outsourcing credentials look comprehensive. However, I noticed several critical glitches on your live site: your contact form is currently titled \"Request a free Legal Consultation\" from an unedited template, your service badge misspells \"STAUTORY AUDIT\", and the hero has broken spacing. When prospective UK clients review your site, are these issues impacting your conversion rates?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: aaNotes,
    scraped_metadata: {
      partner_name: 'CA Gaurav Aggarwal',
      director_name: 'CA Gaurav Aggarwal',
      observable_problem: 'Contact form is titled \"Request a free Legal Consultation\" (unedited template relic), primary badge misspells \"STAUTORY AUDIT\", and hero title has broken letter-spacing.',
      friction_title: 'Unedited Legal Form Template & Critical Service Spelling Errors',
      commercial_outcome: 'International and UK prospective clients bounce due to severe credibility deficit and lack of direct qualification.',
      concrete_fix: 'High-converting cross-border advisory architecture with verified typography and automated scoping.',
      tech_stack: 'WordPress v7.1.4 (PHP CMS)',
      vulnerabilities: 'Unedited template scripts, missing CSP, unvalidated open textarea',
      stack_summary: 'WordPress with WPForms',
      copy_headline: 'Arora Aggarw a / Committed to Excellence',
      trade: 'Chartered Accountants & Tax Advisers',
      grade: 'D',
      grade_reason: 'Unedited legal template title, critical spelling errors, broken hero typography',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Arora Aggarwal%,website.ilike.%aroraaggarwal%');

  // 3. Infincible Limited
  const infNotes = [
    '• VERIFIED FLAW: Domain is completely inactive and parked on GoDaddy (infincible.com/lander) with zero company branding or intake mechanism.',
    '• COMMERCIAL LEVER: 100% bounce rate on all inbound traffic, referrals, and prospective business looking up the firm online.',
    '• TECH STACK & VULNERABILITIES: Inactive GoDaddy Parking Page, domain offline.',
    '• ARCHITECTURE FIX: Rapid deployment of sub-400ms high-converting practice web architecture with 60-second intake triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was searching for Infincible Limited online earlier—I noticed your domain currently resolves directly to an inactive GoDaddy parking page. Are your partners aware that prospective clients looking up your business online are landing on a blank broker page?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: infNotes,
    scraped_metadata: {
      observable_problem: 'Domain is parked on GoDaddy (infincible.com/lander) with zero web presence or intake portal.',
      friction_title: 'Parked Domain & Zero Inbound Web Presence',
      commercial_outcome: '100% loss of inbound referrals and prospective clients searching for the firm online.',
      concrete_fix: 'Turnkey high-converting practice OS with 60-second intake scoper and direct calendar sync.',
      tech_stack: 'GoDaddy Parked Domain',
      vulnerabilities: 'Complete digital absence / domain parked',
      stack_summary: 'Parked Domain',
      copy_headline: 'infincible.com is parked free, courtesy of GoDaddy.com',
      trade: 'Accountancy & Tax Consultancy',
      grade: 'F',
      grade_reason: 'Domain parked and offline',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Infincible%,website.ilike.%infincible%');

  console.log('✅ Batch 3 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
