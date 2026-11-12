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
  // 1. Monahans Chartered Accountants
  const monahansNotes = [
    '• VERIFIED FLAW: Hero orange CTA card renders completely blank on load until cookie interaction; contact form enforces a mandatory Postcode* requirement; mixed content security blocks (HTTP font requested on HTTPS page); unhandled JavaScript errors ("wp is not defined"); zero calendar booking hold.',
    '• COMMERCIAL LEVER: Prospective South West business clients see blank hero cards on load; mandatory postcode fields cause mobile form friction; manual routing delays partner callbacks.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x (PHP), Gravity Forms, mixed content font blocks, missing CSP.',
    '• ARCHITECTURE FIX: Sub-400ms South West practice OS with instant visual paint, postcode autocomplete, and automated partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Monahans on mobile earlier—your Sumer Group backing and regional coverage across Wiltshire, Somerset, and Bristol are impressive. But I noticed your primary hero card initially renders completely blank over your video banner, your contact form mandates a physical postcode check upfront, and your site is triggering mixed content security warnings. Ahead of tax deadlines, are your partners finding that prospective corporate clients drop off during manual intake?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: monahansNotes,
    scraped_metadata: {
      observable_problem: 'Hero orange CTA card renders completely blank on load; contact form mandates Postcode; mixed content font blocks over HTTP; lacks direct calendar booking hold.',
      friction_title: 'Blank Hero Card Rendering Glitch & Mandatory Postcode Friction',
      commercial_outcome: 'Visual rendering bugs on load and mandatory postcode fields cause mobile abandonment for high-margin corporate instructions.',
      concrete_fix: 'Sub-400ms regional practice conversion architecture with direct partner calendar booking.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Mixed content HTTP font request, JavaScript ReferenceError ("wp is not defined"), missing CSP',
      stack_summary: 'WordPress with Gravity Forms (Sumer Group)',
      copy_headline: 'Beyond the Numbers / Monahans Chartered Accountants',
      trade: 'Chartered Accountants Bristol & South West',
      grade: 'C+',
      grade_reason: 'Blank hero rendering bug on load, mandatory postcode requirement, and mixed content warnings',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Monahans%,website.ilike.%monahans%');

  // 2. NRDN & Associates
  const nrdnNotes = [
    '• VERIFIED FLAW: Domain is completely dead and unresolvable (net::ERR_NAME_NOT_RESOLVED across all subdomains); DNS zone missing; 100% digital failure.',
    '• COMMERCIAL LEVER: Total loss of web inbound traffic and client credibility.',
    '• TECH STACK: Dead Domain / DNS Error.',
    '• ARCHITECTURE FIX: Rapid deployment of modern Next.js edge landing hub.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: nrdnNotes,
    scraped_metadata: {
      observable_problem: 'Domain is dead / unresolvable (ERR_NAME_NOT_RESOLVED); complete digital outage.',
      friction_title: 'Dead Domain / DNS Failure (ERR_NAME_NOT_RESOLVED)',
      commercial_outcome: '100% web bounce rate; prospective clients cannot reach the firm.',
      concrete_fix: 'Turnkey edge-hosted practice architecture with automated intake.',
      tech_stack: 'Domain Offline / DNS Unmapped',
      vulnerabilities: 'Domain unreachable',
      stack_summary: 'Dead Domain',
      copy_headline: 'Domain Offline',
      trade: 'Chartered Accountants',
      grade: 'F',
      grade_reason: 'Domain dead / DNS resolution failure',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%NRDN%,website.ilike.%nrdnassociates%');

  // 3. Jerroms Chartered Accountants
  const jerromsNotes = [
    '• VERIFIED FLAW: Offers free initial consultation but routes inquiries into a segmented 10-field manual callback form with no live calendar hold; cookie consent script throws console runtime errors (cookieconsent.on is not a function).',
    '• COMMERCIAL LEVER: West Midlands SME directors seeking rapid tax advice are forced into manual email queues rather than securing an immediate partner discovery slot.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), cookieconsent JS TypeError, missing CSP.',
    '• ARCHITECTURE FIX: High-speed West Midlands practice OS with 60-second intake scoper and direct partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Jerroms on mobile earlier—your presence across Solihull, Coventry, and the West Midlands is formidable. However, I noticed that while you offer a free initial consultation, your site currently forces visitors into a 10-field manual callback form with no direct calendar booking hold. Ahead of statutory deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: jerromsNotes,
    scraped_metadata: {
      observable_problem: 'Offers free consultation but forces a 10-field manual callback form with no calendar hold; cookie consent script throws console TypeError.',
      friction_title: 'Segmented Form Friction & Missing Direct Calendar Booking Hold',
      commercial_outcome: 'High-turnover business directors drop off during manual callback delays rather than locking in a meeting hold.',
      concrete_fix: 'Sub-400ms West Midlands practice architecture with automated partner calendar booking.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'JavaScript runtime error in cookie script, missing CSP',
      stack_summary: 'WordPress with Sumer Group Branding',
      copy_headline: 'Your Leading Light to Everything Financial / Jerroms',
      trade: 'Chartered Accountants West Midlands & Solihull',
      grade: 'C+',
      grade_reason: '10-field manual callback form and missing calendar booking hold',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Jerroms%,website.ilike.%jerroms%');

  // 4. Pro Tax Accountant Chelmsford
  const ptaNotes = [
    '• VERIFIED FLAW: Severe visual layout breakage on /tax-consultation: top hero renders as a massive pitch-black void; awkward 90-degree rotated box on margin; low-res clipart sticker; charges £150 per session but intake form contains spelling mistakes ("BOOKKEPING SERVICES" missing e, and "date & ime" missing t in time!); manual spinbutton time entry with no live calendar hold.',
    '• COMMERCIAL LEVER: Clients paying £150 for consultations see spelling mistakes and broken black voids, destroying credibility for tax dispute and compliance services.',
    '• TECH STACK & VULNERABILITIES: Wix Cloud Builder, broken layout containers, visible form typos, missing CSP.',
    '• ARCHITECTURE FIX: Flawless high-trust tax consultation architecture with verified typography and automated Stripe/calendar booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Pro Tax Accountant Chelmsford on mobile—your specialist tax advisory positioning is clear. However, I noticed several critical glitches on your live booking page: your hero banner renders as a pitch-black void across the top half of the screen, and your paid £150 consultation form literally has typos spelling \"BOOKKEPING\" and \"date & ime\". When prospective clients look to pay for a consultation, are you finding these errors impact your booking rate?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ptaNotes,
    scraped_metadata: {
      observable_problem: 'Top hero on /tax-consultation renders as a pitch-black void; form contains spelling errors (\"BOOKKEPING\" and \"date & ime\"); awkward rotated margin elements; lacks real-time calendar availability.',
      friction_title: 'Pitch-Black Hero Void & Form Spelling Errors ("BOOKKEPING", "date & ime")',
      commercial_outcome: 'Broken layout voids and spelling errors destroy authority for paid £150 tax consultations.',
      concrete_fix: 'Flawless sub-400ms tax advisory booking portal with automated calendar sync.',
      tech_stack: 'Wix Cloud Builder',
      vulnerabilities: 'Broken CSS containers, unedited form typos, missing CSP',
      stack_summary: 'Wix Site with Broken Hero Void',
      copy_headline: 'PRO TAX ACCOUNTANT / Book a Tax Consultation (£150)',
      trade: 'Specialist Tax Consultants Chelmsford',
      grade: 'D-',
      grade_reason: 'Broken black hero container, form spelling mistakes, and awkward layout elements',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Pro Tax Accountant%,website.ilike.%protaxaccountant%');

  // 5. Future Focus Consultants Ltd
  const ffNotes = [
    '• VERIFIED FLAW: Promises response "within one business day"; contact form requires manual text typing for "Preferred date & time" rather than offering an interactive calendar selector; relies on open message textarea.',
    '• COMMERCIAL LEVER: Corporate and Higher Education clients face a 1-day manual delay rather than holding an instant consultation slot; manual date typing creates scheduling friction.',
    '• TECH STACK & VULNERABILITIES: Next-gen CMS / PHP, missing Content-Security-Policy, manual callback delay.',
    '• ARCHITECTURE FIX: Dual-track corporate tax & Higher Education intake engine with direct calendar booking hold.',
    '• CALL HOOK: Hi, Gurtej here from Mercian Wealth. I was reviewing Future Focus Consultants on mobile—your combination of ACCA accountancy with Higher Education consultancy in Coventry is unique. But I noticed your booking form forces prospects to manually type in dates and times into a text box with a 24-hour manual callback delay, rather than selecting an available calendar slot. Ahead of tax deadlines, are your partners finding that prospective clients drop off during manual scheduling?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ffNotes,
    scraped_metadata: {
      observable_problem: 'Forces manual text typing for preferred date and time with a 24h callback delay, rather than providing an interactive calendar selector.',
      friction_title: 'Manual Date/Time Text Input & 1-Day Callback Delay',
      commercial_outcome: 'High-intent corporate and education clients abandon tedious text forms, delaying discovery calls.',
      concrete_fix: 'Sub-400ms practice conversion hub with direct Coventry partner calendar hold.',
      tech_stack: 'Custom Web Architecture',
      vulnerabilities: 'Missing Content-Security-Policy, unvalidated date text field',
      stack_summary: 'Accountancy & Higher Education Practice',
      copy_headline: 'Financial Success, Business Growth & Educational Excellence',
      trade: 'Chartered Certified Accountants & Education Consultants Coventry',
      grade: 'C+',
      grade_reason: 'Manual date typing friction and 24-hour callback delay',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Future Focus%,website.ilike.%ffconsultants%');

  console.log('✅ Batch 13 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
