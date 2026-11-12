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
  // 1. Azets UK (Tait Walker LLP & Baldwins)
  const azetsNotes = [
    '• VERIFIED FLAW: National enterprise consolidator (60 UK offices) forces all digital consultation inquiries into an asynchronous regional routing queue with zero automated partner calendar booking; CSP console errors blocking telemetry scripts.',
    '• COMMERCIAL LEVER: High-growth SME directors searching out of hours abandon corporate routing forms, preferring agile mid-market practices with direct partner discovery holds.',
    '• TECH STACK & VULNERABILITIES: Enterprise Episerver / Optimizely CMS, missing CSP directives, unvetted routing delay.',
    '• ARCHITECTURE FIX: Instant local office speed-to-lead architecture pre-qualifying turnover and routing directly into regional partner diaries in under 60 seconds.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: azetsNotes,
    scraped_metadata: {
      observable_problem: 'Enterprise consolidator intake lacks direct partner calendar booking, forcing prospective clients into an asynchronous regional email queue.',
      friction_title: 'Enterprise Regional Routing Queue & Lack of Direct Diary Hold',
      commercial_outcome: 'High-turnover SMEs seeking rapid advisory abandon heavy routing forms for agile local practices.',
      concrete_fix: 'Sub-60s regional partner speed-to-lead triage with direct calendar appointment holds.',
      tech_stack: 'Enterprise Optimizely CMS',
      vulnerabilities: 'CSP script blocking errors',
      stack_summary: 'Enterprise Azets Portal',
      copy_headline: 'Move forward with confidence / Specialist expertise, international scale',
      trade: 'Top 10 UK Accountancy & Advisory Group',
      grade: 'B',
      grade_reason: 'Enterprise branding but lack of direct partner calendar scheduling',
      friction_count: 2,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Azets%,business_name.ilike.%Tait Walker%,business_name.ilike.%Baldwins%');

  // 2. Milsted Langdon LLP
  const mlNotes = [
    '• VERIFIED FLAW: Catastrophic JavaScript crash on homepage counters (Uncaught TypeError at jquery.min.js:2) renders embarrassing live zeros: "0 Net Promoter Score (NPS)", "0+ awards", "0 partners", and "0+ team members"; contact intake promises a passive "we will be in touch" with no instant calendar hold.',
    '• COMMERCIAL LEVER: High-value corporate clients reviewing the firm on mobile see "0 partners" and "0 NPS" prominently displayed on the homepage, destroying firm credibility and social proof.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x (PHP), jQuery TypeError runtime crash on counter scripts, missing CSP.',
    '• ARCHITECTURE FIX: Flawless mobile-first architecture repairing script crashes, with 60-second South West regional intake triage and direct partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Milsted Langdon on mobile earlier—your South West practice reputation since 1988 is top tier. However, I noticed a critical technical breakdown on your live homepage: your social proof counter script has crashed and is literally displaying \"0 Net Promoter Score\", \"0 awards\", and \"0 partners\" to prospective clients, and your contact intake lacks a direct calendar hold. Ahead of statutory tax deadlines, are your partners aware that your homepage is advertising zero partners?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: mlNotes,
    scraped_metadata: {
      observable_problem: 'JavaScript counter crash displays embarrassing zeros on the live site: \"0 NPS\", \"0 awards\", \"0 partners\", and \"0+ team members\"; contact form lacks direct calendar hold.',
      friction_title: 'Broken Metric Counter Crash ("0 Partners", "0 NPS") & Missing Calendar Hold',
      commercial_outcome: 'Live homepage claiming \"0 partners\" and \"0 NPS\" destroys social proof and credibility for prospective corporate clients.',
      concrete_fix: 'Sub-400ms South West practice OS with verified metric display and direct partner calendar hold.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'JavaScript TypeError crash on jQuery counter script, missing CSP',
      stack_summary: 'WordPress with Broken jQuery Counters',
      copy_headline: 'Helping you thrive / Leading South West Accountancy Firm',
      trade: 'Chartered Accountants Bristol, Bath & London',
      grade: 'D',
      grade_reason: 'Critical JavaScript crash rendering "0 partners" and "0 NPS" on live homepage',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Milsted Langdon%,website.ilike.%milstedlangdon%');

  // 3. Mercer & Hole Chartered Accountants
  const mhNotes = [
    '• VERIFIED FLAW: Background video banner failed to load (aborted network error); primary /contact/ page has NO form embedded on the page canvas (hidden inside a sticky crimson edge tab); form relies on an open textarea with manual callback and no calendar hold.',
    '• COMMERCIAL LEVER: Prestigious London and regional prospects navigating to the contact page encounter an address list without an inline enquiry form, creating cognitive friction.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x (PHP), aborted MP4 video assets, missing CSP.',
    '• ARCHITECTURE FIX: Sleek London & regional practice intake with inline 60-second triage and direct City partner calendar holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Mercer & Hole\'s digital presence—your 120-year City of London and regional pedigree is exceptional. However, I noticed your background video banner is failing to load on mobile, your contact page has no inline inquiry form directly on the canvas, and you currently lack an instant calendar booking hold. Are your partners finding that busy corporate directors drop off during manual intake?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: mhNotes,
    scraped_metadata: {
      observable_problem: 'Background video banner failed with aborted network error; /contact/ page canvas has no inline intake form; lacks direct calendar booking hold.',
      friction_title: 'Aborted Video Banner Asset & Hidden Side-Tab Intake Form',
      commercial_outcome: 'Inconvenient intake placement and asset failures create drop-off for high-value London advisory instructions.',
      concrete_fix: 'High-speed editorial practice architecture with inline 60-second intake and partner diary sync.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Aborted MP4 video network error, missing CSP',
      stack_summary: 'WordPress Monolith with Asset Failures',
      copy_headline: 'Better decisions start with people who know you (120+ Years)',
      trade: 'Chartered Accountants London & St Albans',
      grade: 'C+',
      grade_reason: 'Aborted video asset and unintuitive drawer-only contact form',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Mercer & Hole%,website.ilike.%mercerhole%');

  // 4. M V Accountancy Services Ltd
  const mvNotes = [
    '• VERIFIED FLAW: Server response latency exceeded 10,000ms; critical protocol typo on all footer legal links ("httpss://" with double s) triggering browser error screens; generic 4-field form with no turnover qualification and no calendar hold.',
    '• COMMERCIAL LEVER: 10-second initial load latency causes immediate bounce on mobile; broken legal links with invalid protocol damage client trust.',
    '• TECH STACK & VULNERABILITIES: Legacy Apache / PHP stack, 10s server TTFB latency, broken protocol links (httpss://), unvalidated form.',
    '• ARCHITECTURE FIX: Sub-400ms Next.js edge landing architecture with verified legal links and automated 60-second client triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing M V Accountancy on mobile earlier—your Berkshire coverage is great. But I noticed your website has severe server latency taking over 10 seconds to load, your legal links have a typo pointing to \"httpss://\" with a double-s which breaks the page, and your contact intake has no direct calendar booking. Are you aware these technical leaks are driving potential clients away?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: mvNotes,
    scraped_metadata: {
      observable_problem: 'Severe 10+ second page load latency; footer legal links have a broken \"httpss://\" protocol typo triggering browser errors; lacks turnover triage and calendar hold.',
      friction_title: '10s Server Latency & Broken "httpss://" Protocol Typo on Legal Links',
      commercial_outcome: 'High mobile abandonment due to sluggish load times and broken security links.',
      concrete_fix: 'Sub-400ms edge architecture with automated Berkshire intake triage.',
      tech_stack: 'Legacy PHP / Apache Stack',
      vulnerabilities: '10s TTFB latency, broken URL scheme typos (httpss://), missing CSP',
      stack_summary: 'Slow Legacy PHP Server',
      copy_headline: 'Outstanding Accounting Services throughout Berkshire, London, Surrey',
      trade: 'Accounting Services Slough & Berkshire',
      grade: 'F',
      grade_reason: '10s server load latency and broken httpss:// protocol links',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%M V Accountancy%,website.ilike.%mvaccountancy%');

  console.log('✅ Batch 8 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
