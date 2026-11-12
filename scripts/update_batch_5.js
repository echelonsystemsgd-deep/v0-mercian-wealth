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
  // 1. KP Tax Consultants Ltd
  const kpNotes = [
    '• VERIFIED FLAW: Primary service section misspells "ACCOUNTACY" (missing the N); Company Secretarial paragraph is duplicated twice; contact form fails to ask for a telephone number.',
    '• COMMERCIAL LEVER: Prospective business clients noticing spelling errors on financial compliance services lose confidence; lack of phone capture prevents immediate partner callbacks.',
    '• TECH STACK & VULNERABILITIES: Wix Cloud Builder, slow asynchronous headline rendering, missing CSP headers.',
    '• ARCHITECTURE FIX: Fast sub-400ms practice architecture with validated phone capture and 60-second turnover intake triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing KP Tax Consultants on mobile earlier—your tax advisory credentials look strong. But I noticed a couple of visible issues on your live site: your primary service heading is misspelled as \"ACCOUNTACY\", and your contact form doesn\'t capture a phone number for direct callback. Ahead of statutory tax deadlines, are your partners losing prospective client enquiries?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: kpNotes,
    scraped_metadata: {
      observable_problem: 'Primary service section misspells \"ACCOUNTACY\" (missing N), paragraph text is duplicated twice, and contact form fails to capture a telephone number.',
      friction_title: 'Spelling Glitch ("ACCOUNTACY") & Missing Phone Capture Field',
      commercial_outcome: 'Spelling mistakes on compliance services erode credibility; missing phone numbers prevent outbound speed-to-lead.',
      concrete_fix: 'Sub-400ms practice intake scoper with telephone validation and automated triage.',
      tech_stack: 'Wix Cloud Builder',
      vulnerabilities: 'Missing Content-Security-Policy, unvalidated Wix form',
      stack_summary: 'Wix Cloud Builder',
      copy_headline: 'KP TAX CONSULTANTS - Expert accounting services',
      trade: 'Tax Consultants & Accountants',
      grade: 'D+',
      grade_reason: 'Visible spelling error in services and missing phone capture field',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%KP Tax%,website.ilike.%kptc.co.uk%');

  // 2. K S Rathod & Co Ltd
  const ksNotes = [
    '• VERIFIED FLAW: Built on a basic Yell/Duda directory template with an unvalidated open message box and no turnover pre-qualification or calendar hold; portrait alt tag mislabels "Kishor Tathod".',
    '• COMMERCIAL LEVER: High-turnover Ltd Co directors searching out of hours in Colchester drop off to modern practices with instant scheduling rather than filling out a generic directory form.',
    '• TECH STACK & VULNERABILITIES: Duda / Yell.com template architecture, missing CSP, unvetted contact form.',
    '• ARCHITECTURE FIX: Modern founder-led authority hub highlighting Kishor\'s 25-year credentials with direct calendar booking hold.',
    '• CALL HOOK: Hi Kishor, Gurtej here from Mercian Wealth. I was reviewing K S Rathod & Co on mobile—your 25-year Colchester practice credentials look top tier. But I noticed your site is currently running on a basic directory template with an open message box and no direct calendar booking hold. Ahead of statutory deadlines, are you having to spend valuable billable hours qualifying sole trader and Ltd Co enquiries manually over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ksNotes,
    scraped_metadata: {
      partner_name: 'Kishor Singh Rathod FCCA',
      director_name: 'Kishor Singh Rathod FCCA',
      observable_problem: 'Built on a basic Yell directory template with an open message box, missing turnover qualification, and no direct calendar hold.',
      friction_title: 'Generic Directory Template & Missing Calendar Hold',
      commercial_outcome: 'High-margin Ltd Co directors bounce to modern firms offering instant discovery scheduling.',
      concrete_fix: 'Bespoke authority architecture with 60-second turnover intake triage.',
      tech_stack: 'Duda / Yell.com Site Builder',
      vulnerabilities: 'Missing Content-Security-Policy, unvetted directory form',
      stack_summary: 'Yell / Duda Web Builder',
      copy_headline: 'Chartered Certified Accountants in Colchester',
      trade: 'Chartered Certified Accountants Colchester',
      grade: 'C',
      grade_reason: 'Basic directory template and missing calendar booking',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%K S Rathod%,website.ilike.%ksrathod%');

  // 3. Berg Kaprow Lewis LLP / BKL
  const bklNotes = [
    '• VERIFIED FLAW: Despite enterprise positioning across 6 offices, contact flow terminates in an open textarea ("Tell us more...") with a passive delay promise and no direct partner calendar hold.',
    '• COMMERCIAL LEVER: High-value corporate and private wealth clients searching out of hours receive a passive form receipt rather than an immediate consultation hold, risking leakage to peer City firms.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x (PHP), missing Content-Security-Policy, unvalidated textarea endpoint.',
    '• ARCHITECTURE FIX: Multi-office routing architecture with 60-second partner triage and instant calendar appointment hold.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing BKL on mobile earlier—your London and regional presence is formidable. However, I noticed your contact intake concludes in an open text box with a passive message that someone will review it later, with no direct calendar booking hold. Are your partners finding that high-fee corporate directors searching out of hours drop off before getting a callback?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: bklNotes,
    scraped_metadata: {
      observable_problem: 'Enterprise contact flow ends in an open textarea with a passive callback promise and zero instant calendar appointment hold.',
      friction_title: 'Passive Enterprise Form Queue & Lack of Direct Partner Booking',
      commercial_outcome: 'High-value corporate instructions risk delay or drop-off during manual intake review.',
      concrete_fix: 'Enterprise speed-to-lead architecture with direct sector/partner calendar triage.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing Content-Security-Policy, unvetted open textarea',
      stack_summary: 'WordPress Enterprise Monolith',
      copy_headline: 'Welcome to BKL - Where great minds meet',
      trade: 'Chartered Accountants & Tax Advisers London',
      grade: 'C+',
      grade_reason: 'High-end branding but passive manual callback delay on intake',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Berg Kaprow%,website.ilike.%bkl.co.uk%');

  // 4. HSL Accountancy Solutions
  const hslNotes = [
    '• VERIFIED FLAW: Prominent heading spelling error "CONECT WITH US" (single N); footer publicly exposes direct link to "/wp-admin/" (SITE ADMIN); contact form promises free consultation but fails to collect a phone number or provide calendar booking.',
    '• COMMERCIAL LEVER: Spelling mistakes on the homepage destroy professional authority; exposed admin links attract automated brute-force attacks; missing phone fields cripple speed-to-lead.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), publicly linked /wp-admin/ endpoint, missing CSP, Contact Form 7 without phone field.',
    '• ARCHITECTURE FIX: Secure modern practice OS removing admin exposure, fixing spelling errors, and implementing 60-second intake triage with direct phone capture.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing HSL Accountancy on mobile—your Doncaster credentials look strong. But I noticed several critical issues on your live site: your main contact heading is misspelled as \"CONECT WITH US\", your footer publicly links directly to your WordPress admin login, and your contact form doesn\'t capture a phone number. Ahead of tax season, are your partners aware of these leaks?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: hslNotes,
    scraped_metadata: {
      observable_problem: 'Main heading misspells \"CONECT WITH US\", footer publicly links to /wp-admin/, and contact form fails to capture a phone number or offer calendar scheduling.',
      friction_title: 'Spelling Error ("CONECT WITH US"), Exposed /wp-admin/ & Missing Phone Input',
      commercial_outcome: 'Spelling errors hurt credibility, exposed admin links invite security probes, and lack of phone capture halts outbound sales.',
      concrete_fix: 'Hardened Next.js practice architecture with validated phone capture and automated intake.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Public link to /wp-admin/ in footer, missing Content-Security-Policy, unvalidated Contact Form 7',
      stack_summary: 'WordPress with Exposed Admin Link',
      copy_headline: 'PERFECT SOLUTION FOR YOUR COMPANY - Expert Accountancy Services',
      trade: 'Accountancy Solutions Doncaster',
      grade: 'D',
      grade_reason: 'Visible spelling error, exposed admin login in footer, missing phone field',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%HSL Accountancy%,website.ilike.%hslaccountancysolutions%');

  // 5. Ryecroft Glenton / RG
  const rgNotes = [
    '• VERIFIED FLAW: Primary hero banner is diverted by an editorial blog post on the Autumn Budget rather than a client booking proposition; contact form has only 3 fields with NO telephone number capture or calendar booking hold.',
    '• COMMERCIAL LEVER: High-turnover North East business directors seeking a new accounting firm are forced to read economic commentary or wait for an email reply without a phone callback.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x (PHP), missing Content-Security-Policy, emoji script worker CSP violations, missing telephone input.',
    '• ARCHITECTURE FIX: Commercial hero architecture with 60-second Newcastle practice intake scoper and direct partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Ryecroft Glenton on mobile earlier—your 120-year North East practice history is outstanding. But I noticed your primary above-the-fold hero is occupied by a Budget blog post rather than a consultation CTA, and your contact form doesn\'t even collect a telephone number for callback. Ahead of statutory deadlines, are your partners losing prospective client instructions to firms with instant scheduling?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: rgNotes,
    scraped_metadata: {
      observable_problem: 'Primary hero is occupied by an editorial Budget post rather than a commercial CTA, and contact form has only 3 fields with zero telephone number capture or calendar booking.',
      friction_title: 'Editorial Blog Taking Over Hero & Missing Telephone Capture Field',
      commercial_outcome: 'Prospective clients looking to hire the firm are diverted or delayed; lack of phone capture prevents timely partner response.',
      concrete_fix: 'Commercial conversion architecture with direct partner diary booking and validated intake.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing Content-Security-Policy, CSP worker violations, unvalidated 3-field form',
      stack_summary: 'WordPress Monolith',
      copy_headline: 'Clear advice, Creative thinking / Autumn Budget 2026',
      trade: 'Chartered Accountants Newcastle & London',
      grade: 'D+',
      grade_reason: 'Hero diverted to blog post and contact form fails to collect phone number',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Ryecroft Glenton%,website.ilike.%ryecroftglenton%');

  console.log('✅ Batch 5 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
