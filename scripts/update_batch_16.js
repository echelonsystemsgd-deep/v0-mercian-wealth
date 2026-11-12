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
  // 1. Richardsons Accountants
  const richardsonsNotes = [
    '• VERIFIED FLAW: CATASTROPHIC REST API FAILURE: Contact form triggers HTTP 403 Forbidden on /wp-json/contact-form-7/v1/contact-forms/8/refill, causing the submit button to remain disabled; mobile H1 headline breaks words awkwardly ("We are / Richards / ons"); 7-year outdated copyright (2019); dead "#" social links; zero calendar booking hold.',
    '• COMMERCIAL LEVER: 100% form submission failure on the contact page—prospective clients cannot submit online inquiries; broken mobile word wrapping erodes design authority.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), broken Contact Form 7 REST API nonce failure (HTTP 403), dead anchor links, 7-year outdated copyright.',
    '• ARCHITECTURE FIX: Emergency repair replacing broken REST API forms with sub-400ms Reading practice OS and direct partner calendar holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Richardsons on mobile earlier—your London Street practice history in Reading is established. However, I discovered a critical technical breakdown on your live contact page: your inquiry form is triggering an HTTP 403 Forbidden API error that actually leaves your submit button disabled, meaning no prospective client can submit an enquiry through your form, and your mobile headline has broken word wraps spelling \"Richards-ons\". Are your partners aware that your website form is completely broken?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: richardsonsNotes,
    scraped_metadata: {
      partner_name: 'Jo',
      director_name: 'Jo',
      observable_problem: 'Contact form triggers HTTP 403 Forbidden REST API errors disabling the submit button; mobile H1 word wraps awkwardly (\"Richards / ons\"); 2019 copyright; dead \"#\" social links.',
      friction_title: 'HTTP 403 Forbidden REST API Form Error (Disabled Submit) & Mobile Word Wrap',
      commercial_outcome: '100% digital form submission failure; prospective clients in Reading cannot submit inquiries.',
      concrete_fix: 'Sub-400ms Reading practice conversion architecture with working intake and calendar sync.',
      tech_stack: 'WordPress (Broken CF7 REST API / HTTP 403)',
      vulnerabilities: 'REST API 403 Forbidden nonce error, disabled submit button, dead anchor links',
      stack_summary: 'WordPress with Disabled Form Button',
      copy_headline: 'We are Richardsons / Chartered Accountants Reading',
      trade: 'Chartered Accountants & Business Advisers Reading',
      grade: 'F',
      grade_reason: 'Disabled contact form submit button due to HTTP 403 REST API error',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Richardsons%,website.ilike.%richardsonsaccountancy%');

  // 2. Wilson Partners Accounting
  const wpNotes = [
    '• VERIFIED FLAW: Hero CTA "Need some advice? Book a call" is a fake-out: does NOT connect to a calendar booking tool, but merely anchors to an exhaustive 10-field manual callback form; typo in section heading ("Lets catch up." missing apostrophe).',
    '• COMMERCIAL LEVER: High-growth SME business owners and private equity directors expecting an instant consultation slot are forced into a 10-field form fatigue barrier.',
    '• TECH STACK & VULNERABILITIES: Custom WordPress Theme (PHP), 10-field form fatigue, missing CSP.',
    '• ARCHITECTURE FIX: Direct 60-second Maidenhead & Cambridge partner intake scoper with authentic two-way calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Wilson Partners on mobile earlier—your Maidenhead presence and yellow VW Beetle branding are brilliant. However, I noticed that while your hero button promises \"Book a call\", it actually drops visitors into an exhaustive 10-field manual callback form with no direct calendar booking hold. Ahead of statutory deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: wpNotes,
    scraped_metadata: {
      observable_problem: 'Hero button \"Book a call\" is a fake-out anchoring to an exhaustive 10-field manual callback form with no calendar hold; typo in heading (\"Lets catch up.\").',
      friction_title: 'Fake-Out "Book a Call" CTA & 10-Field Form Fatigue',
      commercial_outcome: 'High-margin corporate clients abandon exhaustive 10-field forms rather than securing an immediate consultation hold.',
      concrete_fix: 'Sub-400ms commercial triage hub with real-time partner calendar holds.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: '10-field form fatigue, missing CSP',
      stack_summary: 'Creative Corporate WordPress Monolith',
      copy_headline: 'Make life count / Wilson Partners Accounting Maidenhead',
      trade: 'Chartered Accountants Maidenhead & Cambridge',
      grade: 'B-',
      grade_reason: '"Book a call" CTA fake-out routing to heavy 10-field form',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Wilson Partners%,website.ilike.%wilson-partners%');

  // 3. Aggarwal Accounts
  const aaNotes = [
    '• VERIFIED FLAW: Desktop hero displays a massive empty grey void on load; zero H1 tags across the homepage; zero CTA buttons above the fold; body text cuts off mid-sentence; /contact page renders a solid black curved void covering the top 300px; contact form completely lacks a phone number input field; zero calendar hold.',
    '• COMMERCIAL LEVER: Blank voids and broken sentences damage credibility; missing phone numbers prevent outbound speed-to-lead callbacks.',
    '• TECH STACK & VULNERABILITIES: Squarespace / Web Builder, broken CSS layout containers, missing phone field, missing H1 semantic tags.',
    '• ARCHITECTURE FIX: Clean modern Coventry practice architecture with verified typography, validated phone capture, and calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Aggarwal Accounts on mobile earlier—your 13-year Coventry practice history is well established. However, I noticed several critical layout bugs on your live site: your contact page has a solid black void covering the top of the screen, your contact form doesn\'t capture a phone number for direct callback, and your homepage copy cuts off mid-sentence with no call-to-action buttons. Are your partners finding this impacts your inbound client enquiries?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: aaNotes,
    scraped_metadata: {
      observable_problem: 'Contact page renders a solid black void across the top 300px; contact form lacks a phone number input; homepage hero has zero CTA buttons and copy cuts off mid-sentence.',
      friction_title: 'Black Void Layout Glitch, Incomplete Text & Missing Phone Input Field',
      commercial_outcome: 'Black screen glitches look broken to prospective clients; lack of phone field stalls outbound sales.',
      concrete_fix: 'Sub-400ms Coventry practice OS with working layout and validated phone intake.',
      tech_stack: 'Squarespace Architecture',
      vulnerabilities: 'Broken CSS container voids, missing phone field, missing H1 tags',
      stack_summary: 'Squarespace with Layout Voids',
      copy_headline: 'Welcome to Aggarwal Accounts / 13 Years Experience Coventry',
      trade: 'Accountancy Services Coventry',
      grade: 'D-',
      grade_reason: 'Black void layout glitch, incomplete body sentence, and missing phone field',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Aggarwal Accounts%,website.ilike.%aggarwalaccounts%');

  // 4. Veracity Accountants Limited
  const veracityNotes = [
    '• VERIFIED FLAW: Homepage hero is an uncaptioned stock graphic of arrows hitting a target with ZERO headline text and ZERO CTA buttons above the fold; zero semantic H1 tags on the entire website; 6-field Formidable Form with manual callback delay and no calendar hold.',
    '• COMMERCIAL LEVER: Mobile visitors in Burnham land on a generic stock graphic with no proposition or buttons, causing high bounce rates.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.6.11 (PHP), missing semantic H1 landmarks, unvetted Formidable Form, missing CSP.',
    '• ARCHITECTURE FIX: High-impact hero architecture highlighting Burnham practice credentials with direct calendar booking hold.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Veracity Accountants on mobile earlier—your Burnham High Street presence is established. But I noticed your homepage hero is currently an uncaptioned stock graphic with zero headline text and zero call-to-action buttons above the fold, and your contact intake lacks a direct calendar booking hold. Ahead of tax deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: veracityNotes,
    scraped_metadata: {
      observable_problem: 'Homepage hero has zero headline text and zero CTA buttons above the fold (uncaptioned stock graphic); 0 semantic H1 tags on site; lacks calendar booking hold.',
      friction_title: 'Uncaptioned Stock Graphic Hero with Zero Headlines or CTAs',
      commercial_outcome: 'Mobile visitors bounce immediately when presented with a stock photo lacking any proposition or call-to-action.',
      concrete_fix: 'Sub-400ms practice conversion hub with 60-second intake triage and calendar hold.',
      tech_stack: 'WordPress v6.6.11 (PHP/MySQL CMS)',
      vulnerabilities: 'Missing H1 tags, missing hero CTAs, missing CSP',
      stack_summary: 'WordPress with Uncaptioned Stock Hero',
      copy_headline: '[Uncaptioned Bullseye Graphic] / Veracity Accountants Burnham',
      trade: 'Chartered Certified Accountants Burnham',
      grade: 'D+',
      grade_reason: 'Zero headline text or buttons above the fold and missing H1 tags',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Veracity Accountants%,website.ilike.%veracityaccountants%');

  // 5. Smooth Feathers Accountants
  const sfNotes = [
    '• VERIFIED FLAW: Massive 400px blank white void between header and content on both desktop and mobile viewports, forcing visitors to scroll through half a screen of blank space before seeing content; entry-level low-fee positioning ("Tax Return from £99.99"); basic 5-field form with manual callback and zero calendar booking hold.',
    '• COMMERCIAL LEVER: 400px blank white void gives the visual impression of a broken or failed website on mobile smartphones, driving immediate bounce.',
    '• TECH STACK & VULNERABILITIES: WordPress 7.1.4 (PHP), severe CSS header whitespace gap, missing CSP.',
    '• ARCHITECTURE FIX: Responsive mobile-first practice architecture eliminating whitespace voids, with automated intake triage and calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Smooth Feathers on mobile earlier—your Slough and London coverage is strong. However, I noticed a severe visual layout bug on your live site: there is a massive 400-pixel blank white void between your header and your text, forcing mobile users to scroll through half a screen of completely blank space before finding your services, and your contact intake lacks a direct calendar hold. Are your partners finding this visual gap causes prospective clients to bounce?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: sfNotes,
    scraped_metadata: {
      observable_problem: 'Massive 400px blank white void between header and body content on mobile and desktop; low-fee positioning (£99.99); lacks direct calendar booking hold.',
      friction_title: 'Massive 400px Blank White Header Void & Missing Calendar Hold',
      commercial_outcome: 'Blank white space on mobile creates the appearance of an abandoned or broken website, triggering high bounce rates.',
      concrete_fix: 'Sub-400ms mobile-first practice OS with instant visual paint and partner calendar holds.',
      tech_stack: 'WordPress v7.1.4 (PHP/MySQL CMS)',
      vulnerabilities: 'CSS layout whitespace void bug, missing CSP',
      stack_summary: 'WordPress with 400px Whitespace Void',
      copy_headline: 'Smooth Feathers Accountants Slough & London (£99.99 Tax Returns)',
      trade: 'Accountancy & Tax Services Slough & London',
      grade: 'D+',
      grade_reason: '400px blank white void bug on mobile and missing calendar hold',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Smooth Feathers%,website.ilike.%smoothfeathers%');

  console.log('✅ Batch 16 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
