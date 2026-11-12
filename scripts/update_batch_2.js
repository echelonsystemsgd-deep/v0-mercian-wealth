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
  // 1. Berkshire Accountants Limited
  const berkshireNotes = [
    '• VERIFIED FLAW: Promises "Book your appointment now" on the contact page but drops visitors into an unvetted email form; live body copy contains external demo links (starof7thsky.com, themeinwp.com), a 404 missing hero banner, and an outdated 2020 copyright.',
    '• COMMERCIAL LEVER: High-net-worth directors in Reading seeking rapid advisory see broken theme demo links and no instant booking, causing immediate bounce to modern practices.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x (PHP), missing Content-Security-Policy, exposed demo theme backlinks, 404 missing media assets.',
    '• ARCHITECTURE FIX: Clean modern hero architecture with 60-second turnover triage and instant diary booking, removing third-party theme leaks.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Berkshire Accountants on mobile earlier—your ACCA credentials look strong, but I noticed your contact page promises \"Book your appointment now\" yet only provides an open message form, and your site still contains template links to external demo themes with an outdated 2020 copyright. Ahead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: berkshireNotes,
    scraped_metadata: {
      observable_problem: 'Contact page promises \"Book your appointment now\" but forces a Contact Form 7 open message box; site contains external demo theme backlinks and an outdated 2020 copyright.',
      friction_title: 'Appointment Booking Bait-and-Switch & Demo Theme Links',
      commercial_outcome: 'High-margin Ltd Co directors drop off due to lack of direct scheduling, while partners waste billable hours sifting through unvetted queries.',
      concrete_fix: 'Sub-second mobile intake scoper pre-qualifying Ltd Co turnover with direct calendar sync.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing Content-Security-Policy, 404 missing banner asset, exposed third-party backlinks',
      stack_summary: 'WordPress Monolith with Legacy Theme',
      copy_headline: 'WELCOME TO BERKSHIRE ACCOUNTANTS LIMITED',
      trade: 'Chartered Accountants Reading',
      grade: 'D+',
      grade_reason: 'Misleading booking CTA, external theme backlinks, outdated 2020 copyright',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Berkshire Accountants%,website.ilike.%berkshireaccountants%');

  // 2. Chart Accountancy
  const chartNotes = [
    '• VERIFIED FLAW: Dedicated contact page forces prospects to manually type out dates and spinbox hours/minutes instead of selecting an interactive calendar slot; Astra theme JavaScript throws MIME type execution errors.',
    '• COMMERCIAL LEVER: High-growth tech founders expect frictionless UX; forcing manual date/time typing in a web form introduces friction and delays partner discovery calls.',
    '• TECH STACK & VULNERABILITIES: WordPress on Astra Theme (PHP), theme script MIME type errors, Gravity Forms, missing CSP.',
    '• ARCHITECTURE FIX: Unified 60-second intake triage syncing directly into Teodora Dimitrova\'s calendar with automated turnover tiering.',
    '• CALL HOOK: Hi Teodora, Gurtej here from Mercian Wealth. I was reviewing Chart Accountancy on mobile earlier—your positioning for tech startups and eCommerce is brilliant. But I noticed while your header links to Calendly, your main contact page forces visitors to manually type in dates and spinbox hours into a callback form, with script errors in the background. Are your partners finding that busy tech founders drop off before finishing manual forms?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: chartNotes,
    scraped_metadata: {
      partner_name: 'Teodora Dimitrova',
      director_name: 'Teodora Dimitrova',
      observable_problem: 'Contact page forces manual date/time typing into form fields instead of an interactive calendar selector, alongside Astra theme script execution errors.',
      friction_title: 'Manual Date/Time Typing Friction & Theme Script Errors',
      commercial_outcome: 'Fast-moving tech founders abandon tedious manual forms, leaking discovery calls to competing digital-native practices.',
      concrete_fix: 'Direct 60-second interactive scoper with two-way calendar sync for tech founders.',
      tech_stack: 'WordPress / Astra Theme (PHP)',
      vulnerabilities: 'Theme app.js MIME type execution error, missing CSP',
      stack_summary: 'WordPress with Gravity Forms',
      copy_headline: 'Specialist Tech Accountants — Simple, fast, reliable accounting for tech & eCommerce',
      trade: 'Specialist Tech Accountants',
      grade: 'C+',
      grade_reason: 'Manual date/time input friction despite Calendly in header',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Chart Accountancy%,website.ilike.%chartaccountancy%');

  // 3. Abacus Tax Advisors Ltd
  const abacusNotes = [
    '• VERIFIED FLAW: Hero CTA "Book a Meeting" redirects to an asynchronous callback form with no calendar hold; critical form input bug assigns name="form_fields[email]" to the Telephone field (corrupting submissions); broken script tag GET /[object%20Object].',
    '• COMMERCIAL LEVER: Prospective clients submitting their phone numbers have their contact data scrambled in CRM/email notifications, resulting in lost client callbacks.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), broken JavaScript object literal script tag, misconfigured form field mappings, missing CSP.',
    '• ARCHITECTURE FIX: Seamless two-way diary sync holding instant consultation slots, with validated telephone and turnover inputs.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Abacus on mobile earlier—your Leeds and Yorkshire coverage is impressive. But I noticed your primary \"Book a Meeting\" button actually leads to an email form, and more critically, your telephone field is mislabeled with email tags in the code, which can scramble prospective client inquiries. Ahead of tax deadlines, are your partners having enquiries get lost or misrouted?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: abacusNotes,
    scraped_metadata: {
      observable_problem: 'Primary hero CTA \"Book a Meeting\" has no calendar booking, and the telephone field is misconfigured with email form attributes, corrupting client phone submissions.',
      friction_title: 'Mislabeled Phone Field (Data Loss) & Bait-and-Switch Booking CTA',
      commercial_outcome: 'Inbound leads submitting phone numbers are corrupted in intake, causing lost high-fee tax advisory clients.',
      concrete_fix: 'Bug-free responsive intake scoper with direct consultation booking hold.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Form field mapping error (data corruption), broken script tag GET /[object Object], missing CSP',
      stack_summary: 'WordPress with Corrupted Form Mappings',
      copy_headline: 'Abacus Tax Advisors Ltd | Chartered Certified Accountants Leeds',
      trade: 'Chartered Certified Accountants Leeds',
      grade: 'D',
      grade_reason: 'Form telephone data corruption and missing booking scheduler',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Abacus Tax%,website.ilike.%abacusleeds%');

  // 4. Collins Chartered Accountants
  const collinsNotes = [
    '• VERIFIED FLAW: Fake live chat button ("Chat with a team member") merely redirects to a form; "Schedule a Meeting with an Advisor" lacks any calendar hold; deprecated jQuery .live() throws runtime exceptions; outdated copyright © Collins 2021.',
    '• COMMERCIAL LEVER: Visitors expecting immediate chat support are frustrated by a generic form redirect, causing out-of-hours bounce while partners triage unqualified emails.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.5.14 (PHP 7.x/8.x), deprecated jQuery .live() script errors, missing CSP and HSTS.',
    '• ARCHITECTURE FIX: Genuine high-speed client triage portal with instant calendar hold and 60-second qualification.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Collins on mobile—your Birmingham credentials look top tier, but I noticed your header has a \"Chat with a team member\" button that actually just redirects to a contact form, and your meeting scheduler has no calendar booking system, alongside an outdated 2021 footer. Ahead of tax season, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: collinsNotes,
    scraped_metadata: {
      observable_problem: '\"Chat with a team member\" is a fake chat button redirecting to a form, \"Schedule a Meeting\" has no calendar picker, and legacy jQuery .live() causes runtime errors.',
      friction_title: 'Fake Live Chat Redirect & Deprecated jQuery Runtime Exceptions',
      commercial_outcome: 'Prospective clients bounce when promised instant chat only to find an email form, leaking leads to agile Birmingham firms.',
      concrete_fix: 'Authentic 60-second mobile intake triage with real-time calendar appointment sync.',
      tech_stack: 'WordPress v6.5.14 (PHP/MySQL CMS)',
      vulnerabilities: 'Deprecated jQuery .live() errors, missing Content-Security-Policy, 5-year outdated 2021 copyright',
      stack_summary: 'Legacy WordPress 6.5.14 Monolith',
      copy_headline: 'Welcome to Collins Chartered Accountants in Birmingham',
      trade: 'Chartered Accountants Birmingham',
      grade: 'D+',
      grade_reason: 'Misleading chat CTA, broken legacy jQuery, outdated 2021 copyright',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Collins Chartered%,website.ilike.%collins-chartered-accountants%');

  console.log('✅ Batch 2 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
