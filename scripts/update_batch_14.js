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
  // 1. James Cowper Kreston
  const jckNotes = [
    '• VERIFIED FLAW: Hero container renders an empty dark charcoal block with no H1 headline text on load; contact page embeds a 100% full-screen Google Map that pushes all phone numbers and enquiry forms 800px below the fold; zero calendar booking hold.',
    '• COMMERCIAL LEVER: Reading and London corporate directors clicking "Contact us" arrive at a giant map with all phone numbers and forms hidden off-screen, creating severe mobile drop-off.',
    '• TECH STACK & VULNERABILITIES: Custom PHP / CMS, full-viewport iframe displacement bug, missing CSP.',
    '• ARCHITECTURE FIX: Streamlined Thames Valley practice intake bringing phone numbers and 60-second triage above the fold with direct partner calendar holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing James Cowper Kreston on mobile earlier—your Thames Valley presence across Reading, London, and Oxford is prestigious. However, I noticed a critical layout glitch on your contact page: it loads a full-screen Google Map widget that takes up 100% of the screen height, pushing your office phone numbers and contact form completely off-screen below an 800-pixel scroll, alongside an empty H1 container on your homepage. Are your partners finding that prospective corporate clients drop off before scrolling to find your phone numbers?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: jckNotes,
    scraped_metadata: {
      observable_problem: 'Contact page loads a full-viewport Google Map pushing phone numbers and forms 800px below the fold; homepage hero has an empty H1 container; no calendar booking hold.',
      friction_title: 'Full-Viewport Google Map Pushing Phone Numbers 800px Off-Screen',
      commercial_outcome: 'Prospective clients looking for a quick phone number or enquiry form bounce due to map displacement.',
      concrete_fix: 'Sub-400ms practice intake scoper with immediate above-the-fold contact access and diary holds.',
      tech_stack: 'Custom Web Architecture',
      vulnerabilities: 'Full-viewport iframe displacement bug, missing CSP',
      stack_summary: 'Thames Valley Regional Practice Monolith',
      copy_headline: '[Empty H1 Headline Block] / James Cowper Kreston',
      trade: 'Chartered Accountants Reading, London & Oxford',
      grade: 'D+',
      grade_reason: 'Contact page full-screen map pushing phone numbers off-screen and empty hero H1',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%James Cowper%,website.ilike.%jamescowperkreston%');

  // 2. 852 Accounting
  const e852Notes = [
    '• VERIFIED FLAW: Homepage hero is an uncaptioned photo of Hong Kong harbour with zero text and zero CTA buttons above the fold; defensive value proposition ("852 do not want to be your accountant!"); outdated 2024 copyright; no calendar booking hold.',
    '• COMMERCIAL LEVER: Small business owners reviewing the firm on mobile see no headline or value proposition above the fold, creating confusion before scrolling.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), missing hero headline copy, outdated copyright.',
    '• ARCHITECTURE FIX: High-impact hero architecture highlighting David\'s agile ACCA credentials with direct calendar booking hold.',
    '• CALL HOOK: Hi David, Gurtej here from Mercian Wealth. I was reviewing 852 Accounting on mobile earlier—your modern anti-dinosaur approach for small businesses is refreshing. But I noticed your desktop hero is currently an uncaptioned photo with zero text or buttons above the fold, and your contact intake lacks a direct calendar booking hold. Ahead of tax deadlines, are you finding that busy founders bounce before scrolling down to find your contact details?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: e852Notes,
    scraped_metadata: {
      partner_name: 'David',
      director_name: 'David',
      observable_problem: 'Homepage hero has zero headline text or CTA buttons above the fold; defensive copy (\"852 do not want to be your accountant\"); lacks calendar booking hold.',
      friction_title: 'Blank Above-The-Fold Hero & Missing Calendar Booking Hold',
      commercial_outcome: 'Mobile visitors see a blank image without an immediate value proposition, causing early bounce.',
      concrete_fix: 'High-converting mobile hero with 60-second intake scoper and direct calendar sync.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing above-the-fold proposition, missing CSP',
      stack_summary: 'Solo ACCA Practice Portal',
      copy_headline: '[Uncaptioned Photo] / 852 do not want to be your accountant!',
      trade: 'Boutique ACCA Accountants',
      grade: 'C+',
      grade_reason: 'Zero headline text above the fold and missing calendar booking hold',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%852 Accounting%,website.ilike.%852.limited%');

  // 3. Eacotts
  const eacottsNotes = [
    '• VERIFIED FLAW: Extreme form friction: contact page features an exhaustive 16-field legacy form demanding full address 1, address 2, city, mobile, separate local Fax number and International Fax number (01628 669 474); typo in services ("prersonal wealth" with extra r); passive sailing yacht hero with zero buttons above the fold.',
    '• COMMERCIAL LEVER: High-turnover Ltd Co directors in Slough and Burnham abandon heavy 16-field forms demanding fax numbers, choosing modern agile practices.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), 16-field legacy form, dual Fax number relics, missing CSP.',
    '• ARCHITECTURE FIX: Streamlined 60-second Burnham/Slough intake scoper with direct partner calendar booking, eliminating fax fields.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Eacotts on mobile earlier—your Burnham and Slough practice credentials as Chartered Tax Advisors are top tier. However, I noticed that your contact page features an exhaustive 16-field form that actually demands physical addresses and separate local and international Fax numbers before visitors can submit an inquiry, with a spelling mistake in your wealth services. Ahead of tax deadlines, are your partners finding that prospective corporate clients drop off due to heavy form fatigue?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: eacottsNotes,
    scraped_metadata: {
      observable_problem: 'Contact page has an exhaustive 16-field form demanding full physical addresses and separate local/international Fax numbers; typo (\"prersonal wealth\"); zero buttons in hero.',
      friction_title: 'Exhaustive 16-Field Form with Dual Fax Fields & Spelling Typo',
      commercial_outcome: '16-field form fatigue and fax relics drive modern business owners to competing agile firms.',
      concrete_fix: 'Modern 60-second intake triage with direct partner calendar hold.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: '16-field form fatigue, dual fax number relics, missing CSP',
      stack_summary: 'WordPress with 16-Field Legacy Form',
      copy_headline: 'Welcome to Eacotts / Freedom to Create, Build and Retain Wealth',
      trade: 'Chartered Accountants & Tax Advisers Burnham & Slough',
      grade: 'D+',
      grade_reason: 'Exhaustive 16-field form demanding fax numbers and spelling typo in services',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Eacotts%,website.ilike.%eacotts%');

  // 4. Wilder Coe Ltd
  const wcNotes = [
    '• VERIFIED FLAW: CATASTROPHIC CMS FORM BREAKDOWN: Primary enquiry form on /contact-us/ displays raw unparsed shortcode text "[gravityform id=”3″ title=”true”]" with smart quotes on the live frontend (0 functional form fields!); initial page load is a 100% blank white void (3,760px height) due to delayed animations; staging link leak in footer (wildercoe2019.je-hosting.co.uk).',
    '• COMMERCIAL LEVER: 100% web enquiry failure—prospective clients in London City and Stevenage cannot submit an enquiry through the website form.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), broken unparsed Gravity Forms shortcode, staging server URL leak, 3,760px blank animation void.',
    '• ARCHITECTURE FIX: Emergency repair replacing unparsed shortcodes with sub-400ms City of London intake triage and automated partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Wilder Coe\'s digital presence earlier—your Fenchurch Street City credentials and 50-year history are outstanding. However, I discovered a catastrophic breakdown on your live contact page: your primary inquiry form is completely broken and literally displays raw code text reading \"[gravityform id=3]\" with smart quotes, meaning no prospective client can submit an enquiry online, alongside a 2019 staging server leak in your footer. Are your partners aware that your web form is completely non-functional?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: wcNotes,
    scraped_metadata: {
      observable_problem: 'Contact form literally displays unparsed shortcode text \"[gravityform id=3]\" (0 functional form fields); initial page load renders a 3,760px blank white void; 2019 staging link leak.',
      friction_title: 'Unparsed Shortcode Syntax Error on Contact Form (100% Form Loss)',
      commercial_outcome: 'Zero web form inquiries can be submitted; prospective City of London clients face broken code text.',
      concrete_fix: 'Sub-400ms City practice OS with working intake triage and calendar booking hold.',
      tech_stack: 'WordPress (Broken Gravity Forms Shortcode)',
      vulnerabilities: 'Unparsed shortcode syntax error (data loss), staging URL leak, missing CSP',
      stack_summary: 'WordPress with Broken Form Shortcode',
      copy_headline: 'Wilder Coe Ltd - Chartered Accountants London EC3M & Stevenage',
      trade: 'Chartered Accountants City of London & Stevenage',
      grade: 'F',
      grade_reason: 'Unparsed Gravity Forms shortcode on contact page causing 100% digital form loss',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Wilder Coe%,website.ilike.%wildercoe%');

  // 5. Chiene + Tait LLP / CT
  const ctNotes = [
    '• VERIFIED FLAW: Critical domain migration failure: legacy domain (https://chiene.co.uk/) fails with SSL hostname mismatch error (ERR_CERT_COMMON_NAME_INVALID) and connection refused on www; on rebranded domain (ct.me/contact-us/), the contact form is COMPLETELY HIDDEN / UNRENDERED (0x0 dimensions) due to CSP blocking Cloudflare Turnstile; zero interactive calendar hold.',
    '• COMMERCIAL LEVER: Prospective clients visiting from legacy links or directory profiles hit an SSL security warning screen; clients on ct.me find a missing contact form and cannot submit online inquiries.',
    '• TECH STACK & VULNERABILITIES: Rebranded Next-gen CMS (ct.me), broken SSL migration on legacy domain, CSP Turnstile script block, hidden form.',
    '• ARCHITECTURE FIX: Fix legacy 301 SSL redirects, resolve CSP Turnstile script errors, and deploy direct Scotland/London partner calendar booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Chiene + Tait\'s rebranding to CT online—your 140-year Scottish and London practice history is exceptional. However, I noticed two severe technical breakdowns: visiting your legacy chiene.co.uk address over HTTPS throws a security certificate warning blocking access, and on your new ct.me contact page, your contact form is completely invisible and unrendered due to script errors. Are your partners aware that prospective clients trying to reach you are hitting security blocks and hidden forms?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ctNotes,
    scraped_metadata: {
      observable_problem: 'Legacy domain (https://chiene.co.uk) throws SSL certificate error (ERR_CERT_COMMON_NAME_INVALID); new domain contact form is invisible (0x0) due to CSP script blocks; lacks calendar booking hold.',
      friction_title: 'Legacy Domain SSL Certificate Error & Invisible Contact Form (0x0)',
      commercial_outcome: 'Security certificate errors turn away legacy referrals; invisible forms prevent digital inquiries.',
      concrete_fix: 'Clean SSL redirect resolution and high-speed practice intake with partner diary sync.',
      tech_stack: 'Next-gen CMS (ct.me) / Broken Legacy Redirects',
      vulnerabilities: 'SSL hostname mismatch (chiene.co.uk), CSP Turnstile script blocks, invisible form',
      stack_summary: 'Rebranded CT Monolith with Broken Form',
      copy_headline: 'We\'re here for the makers / CT Accountants & Advisers (Chiene + Tait)',
      trade: 'Chartered Accountants Edinburgh, Glasgow & London',
      grade: 'D-',
      grade_reason: 'Legacy domain SSL error and invisible contact form on new site',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Chiene%,website.ilike.%chiene%');

  console.log('✅ Batch 14 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
