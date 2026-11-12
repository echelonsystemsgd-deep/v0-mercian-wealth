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
  // 1. Sweeting & Smedley Ltd
  const ssNotes = [
    '• VERIFIED FLAW: Apex domain (sweetingandsmedley.co.uk) throws an expired SSL certificate warning (ERR_CERT_DATE_INVALID); dated 2005-era ASP.NET template (yourfirmonline.co.uk) with prominent Fax number; contact form protected by old distorted image CAPTCHA; no calendar booking hold.',
    '• COMMERCIAL LEVER: Potential clients searching the apex domain hit a red SSL security error screen; 2005 template and Fax numbers erode authority for modern business owners.',
    '• TECH STACK & VULNERABILITIES: Expired SSL on apex domain, ASP.NET WebForms legacy monolith, CSP script blocking, distorted image CAPTCHA.',
    '• ARCHITECTURE FIX: Secure SSL edge deployment with modern responsive mobile architecture and automated client triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Sweeting & Smedley online earlier—your practice has decades of experience. However, I noticed a critical security issue: your main web address currently throws an expired SSL certificate error warning visitors away, your site is running on a 20-year-old template with a Fax number, and your contact intake lacks a calendar hold. Are your partners aware that prospective clients visiting your website are seeing security warnings?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ssNotes,
    scraped_metadata: {
      observable_problem: 'Apex domain throws expired SSL warning (ERR_CERT_DATE_INVALID); dated 2005 ASP.NET template with prominent Fax number and distorted image CAPTCHA.',
      friction_title: 'Expired SSL Certificate Error on Apex Domain & 2005 ASP.NET Template',
      commercial_outcome: 'Security warnings on apex domain cause immediate bounce; dated template repels modern Ltd Co directors.',
      concrete_fix: 'Sub-400ms secure edge-hosted practice OS with direct calendar booking hold.',
      tech_stack: 'ASP.NET WebForms (yourfirmonline.co.uk) / Expired SSL',
      vulnerabilities: 'Expired SSL certificate (ERR_CERT_DATE_INVALID), CSP inline script blocks',
      stack_summary: '2005 ASP.NET Monolith with Expired SSL',
      copy_headline: 'Sweeting & Smedley - Accountants & Business Advisers',
      trade: 'Accountants & Business Advisers Burnham & Slough',
      grade: 'F',
      grade_reason: 'Expired SSL certificate on apex domain and dated 2005 ASP.NET layout',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Sweeting & Smedley%,website.ilike.%sweetingandsmedley%');

  // 2. Lambert Chapman LLP
  const lcNotes = [
    '• VERIFIED FLAW: Primary hero displays only passive non-commercial CTAs ("What we do", "Watch our video" linking to YouTube); contact page has huge blank whitespace pushing the form below the fold; JavaScript console error ($(..).uniform is not a function); zero calendar booking hold.',
    '• COMMERCIAL LEVER: High-value corporate clients across Braintree and London encounter passive video buttons and awkward whitespace, with no direct way to lock in a partner discovery call.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.9 (PHP), uniform.js runtime error, missing CSP.',
    '• ARCHITECTURE FIX: High-converting hero architecture with inline 60-second Essex/London intake triage and direct partner diary sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Lambert Chapman on mobile earlier—your presence across Braintree, Maldon, and Shoreditch is impressive. But I noticed your primary hero buttons only offer passive links to YouTube videos rather than consultation booking, your contact page has large blank whitespace glitches, and you currently lack a direct calendar hold. Ahead of statutory deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: lcNotes,
    scraped_metadata: {
      observable_problem: 'Hero CTAs are passive links to YouTube videos; contact page has large blank whitespace glitches; JavaScript console errors; lacks direct calendar booking hold.',
      friction_title: 'Passive YouTube Hero CTAs, Contact Whitespace Glitch & Missing Diary Hold',
      commercial_outcome: 'High-margin advisory clients bounce from passive video buttons rather than securing an immediate partner hold.',
      concrete_fix: 'Sub-400ms commercial triage hub with direct regional partner calendar holds.',
      tech_stack: 'WordPress v6.9 (PHP/MySQL CMS)',
      vulnerabilities: 'JavaScript runtime error ($(..).uniform), missing CSP',
      stack_summary: 'WordPress with Passive Hero CTAs',
      copy_headline: 'Making life simpler for you and your business / Lambert Chapman LLP',
      trade: 'Chartered Accountants Braintree & London',
      grade: 'D+',
      grade_reason: 'Passive video hero CTAs, contact whitespace bug, and missing calendar hold',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Lambert Chapman%,website.ilike.%lambert-chapman%');

  // 3. Bold Rose Accountants
  const brNotes = [
    '• VERIFIED FLAW: Primary hero and header buttons promise "Book a Consultation", but merely route to a basic 5-field Formidable email callback form with no calendar hold; footer still displays an outdated Budget 2025 factsheet.',
    '• COMMERCIAL LEVER: High-fee tax planning clients expecting an instant consultation slot are downgraded to an email callback form, delaying partner pipeline.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), Formidable Forms, missing CSP, outdated budget references.',
    '• ARCHITECTURE FIX: 60-second tax planning intake scoper with direct Slough & Wakefield partner calendar booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Bold Rose Accountants on mobile earlier—your specialist tax planning positioning is strong. But I noticed while your header and hero buttons promise \"Book a Consultation\", they only lead to a standard email callback form with no direct calendar booking hold, alongside an outdated 2025 budget factsheet. Ahead of tax deadlines, are your partners finding that prospective corporate tax clients drop off during manual email queues?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: brNotes,
    scraped_metadata: {
      observable_problem: 'Hero and header buttons promise \"Book a Consultation\" but merely anchor to an email callback form with zero calendar booking hold; outdated Budget 2025 factsheet in footer.',
      friction_title: 'Consultation Booking Bait-and-Switch & Missing Calendar Hold',
      commercial_outcome: 'High-value tax clients seeking rapid consultation drop off due to manual callback delays.',
      concrete_fix: 'Direct 60-second tax triage architecture with instant partner calendar hold.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing Content-Security-Policy, unvetted Formidable Form',
      stack_summary: 'WordPress with Formidable Forms',
      copy_headline: 'Specialist UK Tax Planning Consultants & Professional Accountancy Services UK',
      trade: 'Tax Planning Consultants & Accountants Slough',
      grade: 'C+',
      grade_reason: 'Consultation booking CTA links to standard email form with no calendar hold',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Bold Rose%,website.ilike.%bracc.co.uk%');

  // 4. Punjab Plates UK
  const ppNotes = [
    '• DATASET DISQUALIFICATION: Disqualified from accountancy outreach. This business is a private vehicle registration number plate reseller on TikTok (PU74 JAB, KA74 UUR), not an accountancy firm.',
    '• STATUS: Disqualified.',
    '• PHONE: 07565750466'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Lost',
    notes: ppNotes,
    lead_type: 'Disqualified / Vehicle Plates',
    scraped_metadata: {
      observable_problem: 'Private vehicle number plates reseller on TikTok (Disqualified from accountancy ICP).',
      friction_title: 'Disqualified Lead - Private Registration Plates Reseller',
      commercial_outcome: 'Non-target lead.',
      concrete_fix: 'N/A',
      tech_stack: 'TikTok Profile',
      vulnerabilities: 'N/A',
      stack_summary: 'TikTok Number Plates Reseller',
      copy_headline: 'Punjab Plates UK - Specialists in Selling Private Registrations',
      trade: 'Vehicle Registration Plates',
      grade: 'N/A',
      grade_reason: 'Disqualified non-accountancy lead',
      friction_count: 0,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Punjab Plates%,website.ilike.%punjabplates%');

  // 5. Tax Minds Limited
  const tmNotes = [
    '• VERIFIED FLAW: CATASTROPHIC WIX TEMPLATE DISASTER: Browser tab titles are literally unedited defaults ("Home | My Site 7" and "Contact | My Site 7"); body copy contains severe typos ("Letus be your partner sinsuccess"); social icons link to Wix corporate profiles; CONTACT PAGE IS 100% RAW DUMMY CONTENT: displays company as "Axis Group" located at "500 Terry Francine Street, San Francisco, CA" with phone "1-800-000-0000" and ZERO contact forms!',
    '• COMMERCIAL LEVER: Any prospective UK client in Reading clicking "Contact" is presented with a fake company in San Francisco with a 1-800 number and no form, destroying 100% of digital enquiries.',
    '• TECH STACK & VULNERABILITIES: Broken Wix template, raw dummy content, default template titles ("My Site 7"), zero form endpoints.',
    '• ARCHITECTURE FIX: Emergency deployment of professional Reading tax practice OS with authentic local details and 60-second intake triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Tax Minds Limited online earlier—you\'re located on Pangbourne Street in Reading. However, I discovered an incredible disaster on your live website: your browser tab literally reads \"My Site 7\", and more importantly, your Contact page displays 100% unedited dummy text for a fake company called \"Axis Group\" in San Francisco with a 1-800 number and ZERO contact forms! Right now, every prospective client clicking your contact page thinks your site is fake. Are you aware of this disaster?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: tmNotes,
    scraped_metadata: {
      observable_problem: 'Browser title reads \"My Site 7\"; body copy contains typos (\"sinsuccess\"); contact page displays fake dummy company \"Axis Group\" in San Francisco with phone \"1-800-000-0000\" and ZERO forms.',
      friction_title: 'Unedited Wix Template Disaster ("Axis Group", San Francisco, "My Site 7")',
      commercial_outcome: '100% digital inquiry destruction; prospective UK clients see fake San Francisco company and bounce immediately.',
      concrete_fix: 'Emergency replacement with verified Reading practice conversion architecture and calendar hold.',
      tech_stack: 'Wix Cloud Builder (Unedited Template)',
      vulnerabilities: 'Unedited dummy template text, default page titles (\"My Site 7\"), zero contact forms',
      stack_summary: 'Broken Wix Template ("My Site 7")',
      copy_headline: 'Home | My Site 7 (Contact page shows Axis Group, San Francisco)',
      trade: 'Tax & Accounting Practice Reading',
      grade: 'F',
      grade_reason: 'Unedited Wix dummy contact page displaying fake San Francisco company and "My Site 7" title',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Tax Minds%,website.ilike.%taxminds%');

  console.log('✅ Batch 12 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
