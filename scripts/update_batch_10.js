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
  // 1. Brimz Financials Ltd
  const brimzNotes = [
    '• VERIFIED FLAW: Hero text contains typographic defect ("BusiNess" with capital N); zero hero CTA button; internal buttons route off-site to brimzbookkeeping.co.uk; Weglot script fails with console error ("This project has been deleted"); free Gmail address in social header; no calendar hold.',
    '• COMMERCIAL LEVER: Potential clients reviewing the firm on mobile encounter erratic typography and deleted script errors; lack of calendar booking delays partner acquisition.',
    '• TECH STACK & VULNERABILITIES: Squarespace, deleted Weglot plugin error, free Gmail address, missing CSP.',
    '• ARCHITECTURE FIX: Unified Next.js practice conversion architecture with direct calendar hold and single-domain routing.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Brimz Financials on mobile earlier—your financial solutions look comprehensive. But I noticed your live website has several glitches: your translation script has crashed with error messages, your header mail links to a free Gmail address, your services redirect visitors to an external domain, and you lack a direct calendar booking hold. Ahead of tax deadlines, are your partners losing prospective client enquiries?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: brimzNotes,
    scraped_metadata: {
      observable_problem: 'Deleted Weglot translation script crashes on load; hero text has erratic typography (\"BusiNess\"); links redirect to external domain; free Gmail in header; no calendar hold.',
      friction_title: 'Deleted Weglot Script Error, Erratic Typography & External Domain Routing',
      commercial_outcome: 'Script errors and external domain redirects cause confusion and drop-off during intake.',
      concrete_fix: 'Sub-400ms unified practice conversion architecture with direct calendar appointment hold.',
      tech_stack: 'Squarespace',
      vulnerabilities: 'Deleted plugin runtime errors, free Gmail address, missing CSP',
      stack_summary: 'Squarespace with Plugin Errors',
      copy_headline: 'EMPOWERING BUSINESSES WITH SOUND FINANCIAL SOLUTIONS',
      trade: 'Accounting & Financial Advisory',
      grade: 'D+',
      grade_reason: 'Deleted translation plugin error, erratic typography, no hero CTA',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Brimz%,website.ilike.%brimzfinancials%');

  // 2. Ritesh Arora & Associates
  const riteshNotes = [
    '• VERIFIED FLAW: Broken metric counters fail to animate, rendering literal zeros ("0+ Years of Excellence", "0+ Businesses Served"); hero button promises "Schedule a Consultation" but merely leads to a manual 24-hour callback form with no calendar hold; aborted Next.js Server Component requests.',
    '• COMMERCIAL LEVER: Live site displaying "0+ Businesses Served" and "0+ Years of Excellence" destroys social proof and credibility for corporate tax clients.',
    '• TECH STACK & VULNERABILITIES: Next.js (Vercel), broken React counter animation state, aborted RSC payload requests, missing CSP.',
    '• ARCHITECTURE FIX: Flawless Next.js corporate practice architecture with verified social proof and real-time partner diary holds.',
    '• CALL HOOK: Hi CA Ritesh, Gurtej here from Mercian Wealth. I was reviewing Ritesh Arora & Associates online—your Amritsar practice credentials look strong. But I noticed a critical bug on your live homepage: your animated counter script has failed and is literally displaying \"0+ Years of Excellence\" and \"0+ Businesses Served\" on the screen, and your consultation button has no calendar hold. Are you aware prospective clients are seeing zero experience displayed on your live site?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: riteshNotes,
    scraped_metadata: {
      partner_name: 'CA Ritesh Arora',
      director_name: 'CA Ritesh Arora',
      observable_problem: 'Animated metric counters display literal zeros: \"0+ Years of Excellence\" and \"0+ Businesses Served\"; hero promises consultation scheduling but lacks calendar hold.',
      friction_title: 'Broken Metric Counters Displaying "0+ Businesses Served"',
      commercial_outcome: 'Zero-metric bug completely destroys credibility and social proof for high-stakes corporate tax advisory.',
      concrete_fix: 'High-speed practice architecture with verified metric counters and automated consultation hold.',
      tech_stack: 'Next.js (Vercel)',
      vulnerabilities: 'Aborted RSC payload requests, broken animation scripts, missing CSP',
      stack_summary: 'Next.js App with Broken Counters',
      copy_headline: 'Built for Growth. Backed by Integrity. (Ranjit Avenue, Amritsar)',
      trade: 'Chartered Accountants & Corporate Tax Advisers',
      grade: 'D+',
      grade_reason: 'Broken counters displaying "0 businesses served" on live homepage',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Ritesh Arora%,website.ilike.%riteshglobalca%');

  // 3. Hurn Accountants Limited
  const hurnNotes = [
    '• VERIFIED FLAW: Unedited Wix template text ("Small Running Title") collides directly over body copy; 10-year outdated copyright ("© 2016"); navigation tab "Tax Rates" points to malformed URL "/copy-of-contact-us"; contact page has an enormous 300px blank white gap; no calendar booking hold.',
    '• COMMERCIAL LEVER: Reading directors reviewing Hurn Accountants see template title collisions and a 2016 copyright, giving the impression of an abandoned practice.',
    '• TECH STACK & VULNERABILITIES: Wix Cloud Builder, unedited template elements, CSS layout gaps, 10-year outdated copyright.',
    '• ARCHITECTURE FIX: Complete modernization with sub-400ms Reading practice OS and direct calendar booking hold.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Hurn Accountants on mobile earlier—your Tilehurst practice history is well known. But I noticed several glaring visual defects on your live site: an unedited template title saying \"Small Running Title\" is superimposed directly over your text, your Tax Rates tab links to an error page called \"copy-of-contact-us\", your footer is 10 years out of date saying 2016, and your contact page has a massive blank gap. Ahead of tax deadlines, are your partners aware of how dated the site appears?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: hurnNotes,
    scraped_metadata: {
      observable_problem: 'Unedited template text (\"Small Running Title\") overlaps body copy; 10-year outdated copyright (2016); Tax Rates tab links to \"/copy-of-contact-us\"; 300px blank white gap on contact page.',
      friction_title: 'Unedited Template Text Collision, Malformed URL & 2016 Copyright',
      commercial_outcome: 'Glitched template overlays and 10-year outdated copyright erode professional authority for high-fee Ltd Co clients.',
      concrete_fix: 'Modern mobile-first Reading practice architecture with automated intake triage.',
      tech_stack: 'Wix Cloud Builder',
      vulnerabilities: 'Unedited template elements, broken navigation URLs, 10-year outdated footer',
      stack_summary: 'Dated Wix Site with Template Overlays',
      copy_headline: 'Hurn Accountants - Tilehurst, Reading',
      trade: 'Chartered Certified Accountants Reading',
      grade: 'D-',
      grade_reason: 'Unedited template text collision, malformed URL slug, and 2016 copyright',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Hurn%,website.ilike.%hurntax%');

  // 4. Raw Accounting
  const rawNotes = [
    '• BENCHMARK PRACTICE NOTE: High-performing local practice (Luke Fletcher). Features dual-option intake (Calendly 15-min discovery hold + HubSpot form) and strong SME pain-point positioning.',
    '• VERIFIED FLAW: Minor polish leaks: footer copyright dated to 2023; external ORB blocking on third-party inlinks script.',
    '• COMMERCIAL LEVER: Excellent conversion benchmark for Reading practices.',
    '• TECH STACK: WordPress / HubSpot / Calendly.',
    '• ARCHITECTURE UPGRADE: Sub-second edge acceleration and automated multi-stage intake triage.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: rawNotes,
    scraped_metadata: {
      partner_name: 'Luke Fletcher',
      director_name: 'Luke Fletcher',
      observable_problem: 'Benchmark practice with Calendly integration; minor polish leaks include 2023 footer copyright and third-party script ORB blocks.',
      friction_title: 'High-Converting Benchmark Practice (Luke Fletcher)',
      commercial_outcome: 'High conversion baseline; potential upgrade for automated client onboarding and speed-to-lead routing.',
      concrete_fix: 'Next-gen edge architecture with automated client onboarding and scoping calculator.',
      tech_stack: 'WordPress / HubSpot / Calendly',
      vulnerabilities: 'ORB blocked third-party scripts, missing CSP',
      stack_summary: 'Modern Practice with Calendly & HubSpot',
      copy_headline: 'Raw Chartered Accountants. Helping you save time and money.',
      trade: 'Chartered Accountants Reading',
      grade: 'A-',
      grade_reason: 'Modern conversion architecture with embedded Calendly booking',
      friction_count: 1,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Raw Accounting%,website.ilike.%rawaccounting%');

  // 5. Niraj Jewellers
  const nirajNotes = [
    '• DATASET DISQUALIFICATION: Disqualified from accountancy outreach. This business is a retail jewelry and watch repair store in Hayes, UB4 0JH (not an accountancy firm).',
    '• OBSERVATION: Claims 1 billion customers served ("1,000,000k+ Satisfied Customers"); footer YouTube link points to TikTok; free Gmail.',
    '• STATUS: Disqualified.'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Lost',
    notes: nirajNotes,
    lead_type: 'Disqualified / Retail Jewelry',
    scraped_metadata: {
      observable_problem: 'Retail jewelry and watch repair business (Disqualified from accountancy ICP).',
      friction_title: 'Disqualified Lead - Retail Jewelry Store',
      commercial_outcome: 'Non-target lead.',
      concrete_fix: 'N/A',
      tech_stack: 'E-commerce Builder',
      vulnerabilities: 'N/A',
      stack_summary: 'Retail Jewelry Shop',
      copy_headline: 'Niraj Jewellers - Bespoke Jewellery & Watches',
      trade: 'Retail Jewellers',
      grade: 'N/A',
      grade_reason: 'Disqualified retail business',
      friction_count: 0,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Niraj Jewellers%,website.ilike.%niraj-jewellers%');

  console.log('✅ Batch 10 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
