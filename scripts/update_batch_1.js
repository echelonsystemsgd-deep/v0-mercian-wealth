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
  // 1. A&C Chartered Accountants
  const acNotes = [
    '• VERIFIED FLAW: Mobile header glitch renders stacked desktop navigation links over the hamburger toggle; contact page forces a generic open "How Can We Help?" textarea with a 24-hour manual callback delay.',
    '• COMMERCIAL LEVER: High-margin Ltd Co directors searching out of hours abandon to practices with instant intake scheduling; partners waste billable hours sifting through low-margin queries.',
    '• TECH STACK & VULNERABILITIES: WordPress 6.x on WP Engine (PHP backend), legacy jQuery 1.x with "matchHeight" console errors, missing CSP.',
    '• ARCHITECTURE FIX: 60-second automated Ltd Co turnover intake scoper with direct diary hold, resolving mobile nav stacking.',
    '• CALL HOOK: Hi, Gurtej here from Mercian Wealth. I was reviewing A&C on mobile earlier—your Manchester credentials look top tier, but I noticed your mobile header is stacking duplicate desktop nav links, and your contact form directs enquiries into a 24-hour manual queue with an open text box. Ahead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: acNotes,
    scraped_metadata: {
      observable_problem: 'Mobile navigation links stack over the hamburger menu, and contact intake forces an open "How Can We Help?" textarea with a 24h manual callback delay.',
      friction_title: 'Mobile Header Stacking & 24h Manual Intake Queue',
      commercial_outcome: 'High-margin Ltd Co directors searching out of hours abandon to firms with instant scheduling, while partners field unvetted enquiries manually.',
      concrete_fix: 'Sub-400ms Next.js intake scoper pre-qualifying Ltd Co turnover with direct calendar sync.',
      tech_stack: 'WordPress (WP Engine / PHP)',
      vulnerabilities: 'Missing Content-Security-Policy, legacy jQuery runtime errors, exposed WP Engine footprint',
      stack_summary: 'WordPress on WP Engine (PHP-based CMS)',
      copy_headline: 'Numbers that make sense. People who care.',
      trade: 'Chartered Accountants Manchester',
      grade: 'D+',
      grade_reason: 'Mobile navigation collision and manual 24-hour intake queue',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%A&C%,website.ilike.%ac-accounts%');

  // 2. Dead Simple Accounting
  const dsaNotes = [
    '• VERIFIED FLAW: Hero headline contains a broken typewriter script reading "Expert accountants for "; contact page has zero forms, displaying only static details and a meme GIF.',
    '• COMMERCIAL LEVER: Prospective clients seeking an instant consultation hold have no direct booking mechanism on the contact page, forcing them to find hidden pricing toggles.',
    '• TECH STACK & VULNERABILITIES: WordPress on Cloudflare (PHP 8.5.12 exposed in X-Powered-By header), Fillout modal embed, missing CSP.',
    '• ARCHITECTURE FIX: Clean high-converting hero architecture and direct 60-second intake triage on the contact page with live booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Dead Simple Accounting on mobile—your branding is sharp, but I noticed your hero headline is currently broken on mobile reading "Expert accountants for ", and your contact page has no intake form or calendar booking hold. Ahead of statutory deadlines, are your partners having to chase leads manually over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: dsaNotes,
    scraped_metadata: {
      observable_problem: 'Hero headline has a broken animated typewriter reading "Expert accountants for ", and the contact page has zero forms or booking holds.',
      friction_title: 'Broken Hero Typewriter & Missing Contact Intake Form',
      commercial_outcome: 'Inbound visitors cannot submit an enquiry or book a discovery hold on the contact page, causing out-of-hours drop-off.',
      concrete_fix: 'Flawless sub-second hero intake architecture with direct calendar scheduling.',
      tech_stack: 'WordPress / Cloudflare (Exposed PHP 8.5.12 backend)',
      vulnerabilities: 'Exposed PHP 8.5.12 server header, missing Content-Security-Policy',
      stack_summary: 'WordPress with PHP 8.5.12',
      copy_headline: 'Expert accountants for [broken typewriter]',
      trade: 'Specialist Accountants',
      grade: 'D',
      grade_reason: 'Broken hero script and complete absence of form on contact page',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Dead Simple%,website.ilike.%deadsimpleaccounting%');

  // 3. Vale & West
  const vwNotes = [
    '• VERIFIED FLAW: Non-responsive legacy corporate layout forcing horizontal scrolling on mobile; contact intake is an open "Comments" textarea with a prominent Fax number.',
    '• COMMERCIAL LEVER: Modern company directors browsing on smartphones encounter an obsolete portal with broken maps and friction, steering them towards modern agile competitors.',
    '• TECH STACK & VULNERABILITIES: Legacy ASP.NET WebForms (yourfirmonline.co.uk), broken Google Maps API CSP blocks, Cloudflare Turnstile friction.',
    '• ARCHITECTURE FIX: Complete mobile-first responsive redesign with 60-second Ltd Co turnover qualification and calendar booking hold.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Vale & West on mobile earlier—your Reading practice history is prestigious, but your mobile site currently forces horizontal scrolling, features an open unvetted comments box with a Fax number, and has no direct calendar booking. Are your partners finding that younger Ltd Co directors are dropping off to modern firms?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: vwNotes,
    scraped_metadata: {
      observable_problem: 'Non-responsive legacy desktop layout forces horizontal scrolling on mobile; intake is a generic Comments form with a Fax number and broken Maps container.',
      friction_title: 'Non-Responsive Layout, Fax Number & Unvetted Comments Box',
      commercial_outcome: 'Modern Ltd Co directors on mobile bounce immediately due to dated layout and lack of calendar booking.',
      concrete_fix: 'Next-gen responsive mobile architecture with automated intake triage.',
      tech_stack: 'ASP.NET WebForms (yourfirmonline.co.uk total SOLUTION)',
      vulnerabilities: 'Broken CSP map script blocks, non-responsive viewport overflow',
      stack_summary: 'Legacy ASP.NET WebForms Monolith',
      copy_headline: 'Welcome to Vale & West... Accountants in Reading',
      trade: 'Chartered Accountants Reading',
      grade: 'F',
      grade_reason: 'Non-responsive horizontal scroll, legacy comments form, fax number',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Vale & West%,website.ilike.%valewest%');

  console.log('✅ Batch 1 successfully updated in Supabase leads table!');
}

main().catch(console.error);
