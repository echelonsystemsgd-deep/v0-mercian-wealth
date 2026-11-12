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
  // 1. Biz Accounting Solutions
  const bizNotes = [
    '• VERIFIED FLAW: MasterSlider JavaScript crash (Uncaught ReferenceError) leaves a massive blank white void above the fold; quote questionnaire instructs mobile smartphone users to "Hold Ctrl Key & click to select multiple reasons"; floating chat and phone badges physically cover form inputs on mobile; no calendar booking hold.',
    '• COMMERCIAL LEVER: Mobile visitors encounter desktop keyboard instructions ("Hold Ctrl Key") on touchscreens and a broken blank hero slider, causing immediate bounce.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), MasterSlider / Bootstrap JS runtime errors, desktop-only form elements on mobile, missing CSP.',
    '• ARCHITECTURE FIX: Responsive Next.js practice conversion architecture with working touch triage and direct calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Biz Accounting Solutions on mobile earlier—your Winnersh and Reading practice credentials look great. However, I noticed several critical glitches on your live website: your homepage hero slider has crashed and displays as an empty blank void, and your quote form literally tells mobile touchscreen visitors to \"Hold the Ctrl key\" to select options, while floating badges cover your input fields. Are your partners finding this impacts your mobile enquiry conversions?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: bizNotes,
    scraped_metadata: {
      observable_problem: 'Homepage hero slider crashes into a blank white void; quote form instructs mobile touchscreens to \"Hold Ctrl Key\"; floating badges cover form fields on mobile.',
      friction_title: 'Hero Slider JS Crash & "Hold Ctrl Key" Mobile Form Instructions',
      commercial_outcome: 'Broken slider voids and desktop-only instructions destroy mobile usability and conversions.',
      concrete_fix: 'Sub-400ms mobile-first practice architecture with automated touchscreen triage and calendar holds.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'MasterSlider ReferenceError crash, Bootstrap JS errors, missing CSP',
      stack_summary: 'WordPress with Crashed MasterSlider',
      copy_headline: '[Crashed MasterSlider Void] / Biz Accounting Solutions Reading',
      trade: 'Chartered Certified Accountants Reading & Winnersh',
      grade: 'D-',
      grade_reason: 'Crashed hero slider void, "Hold Ctrl Key" mobile form flaw, and input obstruction',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Biz Accounting%,website.ilike.%bizasl%');

  // 2. Hazlewoods LLP
  const hazleNotes = [
    '• VERIFIED FLAW: On mobile viewports, the "Contact us" CTA button is completely hidden inside the hamburger menu, leaving zero conversion buttons above the fold; contact page form only has 3 fields with NO telephone number input or message box; zero calendar booking hold.',
    '• COMMERCIAL LEVER: Top 30 UK firm mobile visitors encounter zero action buttons above the fold, while footer forms fail to collect telephone numbers for outbound callbacks.',
    '• TECH STACK & VULNERABILITIES: Enterprise CMS / PHP, missing mobile hero CTA, missing phone field on contact form, missing CSP.',
    '• ARCHITECTURE FIX: High-converting mobile header architecture with direct partner speed-to-lead triage and calendar booking holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Hazlewoods on mobile earlier—your Top 30 UK practice reputation across Cheltenham, Bristol, and Cardiff is formidable. However, I noticed that on mobile smartphones, your \"Contact us\" button is hidden completely inside the navigation menu leaving zero call-to-action buttons above the fold, and your contact form doesn\'t even collect a telephone number. Ahead of tax deadlines, are your partners losing mobile corporate leads?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: hazleNotes,
    scraped_metadata: {
      observable_problem: 'Mobile header hides the \"Contact us\" button inside hamburger menu (0 CTAs above fold); contact form fails to capture a telephone number; no calendar hold.',
      friction_title: 'Hidden Mobile Hero CTA & Missing Telephone Input Field',
      commercial_outcome: 'Lack of above-the-fold mobile CTAs causes drop-off; missing phone fields stalls partner callback speed.',
      concrete_fix: 'Sub-400ms enterprise mobile conversion hub with verified telephone triage and partner diary sync.',
      tech_stack: 'Enterprise CMS / PHP',
      vulnerabilities: 'Missing mobile hero CTAs, missing phone input, missing CSP',
      stack_summary: 'Top 30 UK Enterprise Monolith',
      copy_headline: 'Where people really count / Hazlewoods LLP (Top 30 UK Firm)',
      trade: 'Chartered Accountants & Business Advisers Bristol & Cheltenham',
      grade: 'B-',
      grade_reason: 'Hidden mobile hero CTA and contact form omits telephone number',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Hazlewoods%,website.ilike.%hazlewoods%');

  // 3. Jackson Stephen LLP
  const jsNotes = [
    '• VERIFIED FLAW: Promises "Arrange a call, video call or face-to-face meeting" but routes visitors into a standard 6-field manual callback form with no calendar hold; 4-year outdated copyright (2022); newsletter signup placeholder typo ("Emaill Address" with double l).',
    '• COMMERCIAL LEVER: High-turnover SME directors in Warrington and Liverpool seeking rapid meeting holds are forced into manual email queues, losing momentum.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), 4-year outdated copyright, visible spelling typo, missing CSP.',
    '• ARCHITECTURE FIX: 60-second Northwest practice intake scoper with direct partner video/in-person calendar booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Jackson Stephen on mobile earlier—your 100-year Northwest practice history across Warrington and Liverpool is impressive. However, I noticed that while your site promises to arrange a video call or meeting, it only routes visitors into a standard manual callback form with no direct calendar booking hold, alongside a 2022 copyright and spelling typos in your footer. Are your partners finding that prospective corporate clients drop off during manual email scheduling?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: jsNotes,
    scraped_metadata: {
      observable_problem: 'Promises meeting/video call arrangement but provides only a manual 6-field callback form with zero calendar hold; 2022 copyright; typo (\"Emaill Address\").',
      friction_title: 'Manual Callback Delay for Video Calls & 2022 Outdated Copyright',
      commercial_outcome: 'High-value corporate clients abandon manual forms rather than securing an immediate partner consultation slot.',
      concrete_fix: 'Sub-400ms Northwest practice OS with direct video/in-person calendar sync.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: '4-year outdated copyright, spelling typo, missing CSP',
      stack_summary: 'Northwest Regional Practice Monolith',
      copy_headline: 'Run your business smarter / Jackson Stephen LLP (Warrington & Liverpool)',
      trade: 'Chartered Accountants & Business Advisers Northwest',
      grade: 'C+',
      grade_reason: 'Manual callback form for video calls, 2022 copyright, and newsletter typo',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Jackson Stephen%,website.ilike.%jacksonstephen%');

  // 4. Hunter Gee Holroyd Chartered Accountants
  const hghNotes = [
    '• VERIFIED FLAW: Hero H1 headline is vertically and horizontally sliced off at the bottom of the fold; copy contains grammatical omission ("give you call back" missing a); form explicitly warns of a slow 48-hour callback delay ("we will get in touch within a 48 hour window"); "Book your consultation" buttons redirect to this 48-hour form with zero calendar hold.',
    '• COMMERCIAL LEVER: A 48-hour callback warning causes substantial lead leakage to agile Yorkshire competitors offering same-day or instant calendar holds.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), sliced H1 typography bug, 48-hour response friction, missing CSP.',
    '• ARCHITECTURE FIX: Modern Yorkshire practice OS eliminating 48-hour delays with direct partner calendar booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Hunter Gee Holroyd on mobile earlier—your presence across York, Filey, and Easingwold is well established. But I noticed several critical friction points on your live site: your hero headline is sliced off across the fold, and your booking buttons force prospects into a form that explicitly warns them to wait up to 48 hours for a callback, with no direct calendar hold. Ahead of tax deadlines, are your partners losing urgent business enquiries to firms with instant scheduling?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: hghNotes,
    scraped_metadata: {
      observable_problem: 'Hero H1 headline is sliced off at the fold; grammatical typo (\"give you call back\"); form explicitly warns of a 48-hour callback delay; lacks direct calendar booking hold.',
      friction_title: 'Sliced Hero H1 Typography Bug & 48-Hour Callback Delay Warning',
      commercial_outcome: 'Explicit 48-hour callback delay drives high-intent SME clients to competitors offering same-day or instant holds.',
      concrete_fix: 'Sub-400ms Yorkshire practice conversion hub with direct partner calendar holds.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Sliced typography layout glitch, 48h intake friction, missing CSP',
      stack_summary: 'WordPress with 48h Response Delay',
      copy_headline: 'Welcome to Hunter Gee Holroyd Chartered Accountants (York & Filey)',
      trade: 'Chartered Accountants York, Filey & Easingwold',
      grade: 'D+',
      grade_reason: 'Sliced hero H1 headline, grammatical typo, and explicit 48-hour callback delay',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Hunter Gee Holroyd%,website.ilike.%hghyork%');

  // 5. H A & Co Accountants
  const haNotes = [
    '• VERIFIED FLAW: Homepage hero features a large unrendered blank white card where an image or video asset failed to load; floating WhatsApp badge physically covers form fields on mobile viewports; contact form has disabled-by-default submit button and zero calendar booking hold.',
    '• COMMERCIAL LEVER: Blank white cards look broken to mobile visitors; floating widgets obstructing form inputs cause form abandonment in Slough.',
    '• TECH STACK & VULNERABILITIES: Custom Web Architecture, failed media asset rendering, mobile widget layout collision, missing CSP.',
    '• ARCHITECTURE FIX: Clean mobile-first Slough practice architecture with verified asset rendering and automated intake triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing H A & Co on mobile earlier—your High Street presence in Slough as Xero Gold Partners is great. However, I noticed your homepage hero has an empty white card where an image completely failed to load, and on mobile smartphones your floating WhatsApp icon actually covers your contact form fields, alongside a lack of direct calendar booking. Are your partners finding this visual glitch hurts your mobile conversions?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: haNotes,
    scraped_metadata: {
      observable_problem: 'Homepage hero has an unrendered blank white card where media asset failed; floating WhatsApp icon physically covers contact form inputs on mobile; lacks calendar hold.',
      friction_title: 'Unrendered Blank Hero Card Asset & Mobile Form Input Obstruction',
      commercial_outcome: 'Mobile users unable to tap covered input fields abandon forms; blank asset cards erode design credibility.',
      concrete_fix: 'Sub-400ms mobile-first practice OS with direct Slough calendar booking hold.',
      tech_stack: 'Custom Web Architecture (Xero Gold Partner)',
      vulnerabilities: 'Failed media asset rendering, mobile widget input collision, missing CSP',
      stack_summary: 'Xero Gold Partner Site with Asset Glitch',
      copy_headline: 'H A & Co Accountants Slough & Chessington (Xero Gold Partner)',
      trade: 'Accountancy & Tax Services Slough',
      grade: 'D+',
      grade_reason: 'Failed hero asset rendering and floating mobile widget covering form inputs',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%H A & Co%,website.ilike.%haandco%');

  console.log('✅ Batch 17 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
