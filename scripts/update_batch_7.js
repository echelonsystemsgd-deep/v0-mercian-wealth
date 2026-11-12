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
  // 1. Marr & Company
  const marrNotes = [
    '• VERIFIED FLAW: Primary hero slider failed to render leaving a massive black void above the fold; contact_me.js returns 404 error on form submissions; outdated 2019 copyright with grammatical typo ("All right reserved").',
    '• COMMERCIAL LEVER: High-net-worth Calgary business owners encounter a broken black banner above the fold, eroding trust in financial accuracy.',
    '• TECH STACK & VULNERABILITIES: PHP / Bootstrap, 404 missing contact script, missing CSP, external Microsoft Bookings link.',
    '• ARCHITECTURE FIX: Sub-400ms high-speed practice architecture with integrated in-page calendar booking and flawless hero rendering.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Marr & Company online earlier—your 100% local Canadian positioning is great. However, I noticed your primary hero slider is currently broken, rendering as a massive black void above the fold, and your contact form script is throwing 404 errors. When prospective business clients visit your site, are these glitches causing them to bounce?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: marrNotes,
    scraped_metadata: {
      observable_problem: 'Primary hero slider failed to render leaving a large black void above the fold, and contact_me.js throws a 404 error on form submission.',
      friction_title: 'Broken Black Hero Void & 404 Form Submission Error',
      commercial_outcome: 'Broken hero banner damages professional credibility; 404 script error risks dropped client inquiries.',
      concrete_fix: 'Modern edge-hosted practice OS with integrated in-page calendar booking.',
      tech_stack: 'PHP / Bootstrap',
      vulnerabilities: '404 script failure on form submission, missing CSP, 5-year outdated 2019 copyright',
      stack_summary: 'PHP Monolith with Broken Hero',
      copy_headline: '100% Local. Always. Keep your financial information safe in Canada.',
      trade: 'Chartered Professional Accountants Calgary',
      grade: 'D+',
      grade_reason: 'Broken hero banner black void and 404 form script failure',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Marr & Company%,website.ilike.%marraccountants%');

  // 2. Ishita Business Services / Bizfiling
  const ibsNotes = [
    '• VERIFIED FLAW: Total CMS breakdown: raw unparsed WordPress shortcodes render on the live frontend ([vc_row], [contact-form-7 id="328"]); contact page is completely blocked by an infinite preloader spinner that never clears; title misspells "Biz Filling"; 100% digital intake failure.',
    '• COMMERCIAL LEVER: Zero client inquiries can be submitted online; visitors encounter raw shortcode code syntax, destroying all credibility.',
    '• TECH STACK & VULNERABILITIES: Broken WordPress / WPBakery setup, unparsed shortcodes, infinite JavaScript preloader loop, free Gmail email.',
    '• ARCHITECTURE FIX: Complete rebuild with sub-400ms Next.js intake engine and automated GST/filing triage.',
    '• CALL HOOK: Hi, Gurtej here from Mercian Wealth. I was reviewing Bizfiling online—I noticed a catastrophic technical breakdown on your live website: raw developer shortcodes like \"[contact-form-7]\" and \"[vc_row]\" are printing out as plain text on your homepage, and your contact page is completely blocked by an infinite loading spinner. Right now, no prospective client can submit an enquiry online. Are you aware your site is completely broken?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ibsNotes,
    scraped_metadata: {
      observable_problem: 'Raw WordPress shortcodes ([vc_row], [contact-form-7]) render as plain text on the frontend, and contact page is blocked by an infinite preloader loop.',
      friction_title: 'Catastrophic CMS Shortcode Breakdown & Infinite Loading Loop',
      commercial_outcome: '100% digital intake failure; prospective clients cannot view contact info or submit forms.',
      concrete_fix: 'Next.js edge conversion hub with instant GST & compliance triage.',
      tech_stack: 'Broken WordPress / WPBakery (Insecure HTTP)',
      vulnerabilities: 'Broken CMS compilation, unparsed shortcodes, infinite JS loop',
      stack_summary: 'Broken WordPress Monolith',
      copy_headline: '[vc_row] [title-section] Expert Business Filing',
      trade: 'Corporate Filing & Tax Consultancy',
      grade: 'F',
      grade_reason: 'Total CMS shortcode failure and infinite contact page blocker',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Ishita Business%,website.ilike.%bizfiling%');

  // 3. Blick Rothenberg Limited
  const brNotes = [
    '• VERIFIED FLAW: 8-field HubSpot form mandates corporate fields (Company, Job Title) and an open textarea, creating high cognitive friction for private high-net-worth tax advisory clients; manual callback delay with zero direct calendar booking hold.',
    '• COMMERCIAL LEVER: High-net-worth private clients seeking discreet advisory abandon heavy 8-field corporate forms, leaking leads to boutique advisory practices with instant calendar holds.',
    '• TECH STACK & VULNERABILITIES: Enterprise CMS / HubSpot, missing Content-Security-Policy, reCAPTCHA enterprise timeout warnings.',
    '• ARCHITECTURE FIX: Multi-stream intake triage separating corporate audits from private client tax advisory with direct partner diary booking.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Blick Rothenberg\'s digital intake earlier—your Covent Garden practice reputation is exceptional. However, I noticed your contact form mandates corporate company fields and open message boxes for all inquiries, with no direct calendar booking hold. Are your private client partners finding that high-net-worth individuals seeking discrete tax planning drop off due to heavy corporate form friction?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: brNotes,
    scraped_metadata: {
      observable_problem: 'Mandatory corporate fields (Company, Job Title) and open textarea in 8-field form create friction for private wealth clients; no calendar booking hold.',
      friction_title: 'High-Friction Corporate Form & Lack of Private Client Calendar Hold',
      commercial_outcome: 'High-net-worth private individuals bounce from heavy corporate forms, losing high-margin advisory fees.',
      concrete_fix: 'Dual-track private wealth & corporate intake engine with automated partner diary holds.',
      tech_stack: 'Enterprise Web Architecture / HubSpot',
      vulnerabilities: 'Missing Content-Security-Policy, reCAPTCHA console warnings',
      stack_summary: 'Enterprise HubSpot Intake',
      copy_headline: 'Welcome to Blick Rothenberg - Leading tax, accounting and business advisory',
      trade: 'Leading Tax & Business Advisory London',
      grade: 'B-',
      grade_reason: 'Polished branding but heavy 8-field corporate form friction and manual callback delay',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Blick Rothenberg%,website.ilike.%blickrothenberg%');

  // 4. French Duncan LLP / AAB
  const fdNotes = [
    '• VERIFIED FLAW: Domain permanently redirects to aab.uk following acquisition; contact intake promises a 1 working day manual callback delay with zero direct calendar booking hold; hero dominated by Autumn Budget blog analysis.',
    '• COMMERCIAL LEVER: Prospective business clients searching for immediate Scottish accountancy advisory experience a 24-hour callback delay, leaking momentum to agile regional practices.',
    '• TECH STACK & VULNERABILITIES: Next-gen CMS (AAB Group), missing Content-Security-Policy, manual callback delay.',
    '• ARCHITECTURE FIX: Speed-to-lead triage routing Scottish SMEs directly into regional partner diaries in under 60 seconds.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: fdNotes,
    scraped_metadata: {
      observable_problem: 'Domain redirects to aab.uk; contact flow promises a 1 working day manual callback delay with no direct calendar booking hold.',
      friction_title: 'Acquisition Redirect & 1 Working Day Manual Callback Delay',
      commercial_outcome: 'High-intent SMEs drop off due to 24h manual callback delay rather than locking in discovery holds.',
      concrete_fix: 'Instant speed-to-lead architecture with automated regional partner calendar holds.',
      tech_stack: 'Modern Enterprise Architecture (AAB Group)',
      vulnerabilities: 'Missing Content-Security-Policy',
      stack_summary: 'AAB Group Corporate Portal',
      copy_headline: 'AAB Group - Audit, Tax & Advisory',
      trade: 'Chartered Accountants & Business Advisers Scotland',
      grade: 'B',
      grade_reason: 'Acquisition redirect and 24-hour callback delay',
      friction_count: 2,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%French Duncan%,website.ilike.%frenchduncan%');

  // 5. Dunkley's Chartered Accountants
  const dunkleyNotes = [
    '• VERIFIED FLAW: Horizontal overflow scrollbar glitch on standard desktop; missing FontAwesome assets render as raw digits/glyphs ("3" and "U"); offers "free 30-min meeting" but forces prospects through an exhaustive 10-step form with no calendar hold; hero warns clients in bold that they must bring AML photo ID and proof of address before they even book.',
    '• COMMERCIAL LEVER: Threatening new clients with anti-money laundering bureaucracy before booking introduces psychological friction and anxiety; 10-step form causes massive mobile abandonment.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), missing font icon assets (raw glyphs), CSS horizontal layout overflow, unvetted 10-step form.',
    '• ARCHITECTURE FIX: Friction-free 60-second intake scoper with direct Bristol calendar hold, moving compliance checks downstream.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Dunkley\'s on mobile earlier—your Bradley Stoke practice reputation and 4.3 Trustpilot rating are fantastic. But I noticed while you offer a free 30-minute meeting, your site forces prospects through an exhaustive 10-step form with no direct calendar booking hold, your hero warns visitors about anti-money laundering ID checks before they even talk to you, and your site has horizontal layout glitches with broken icons. Ahead of tax deadlines, are your partners losing prospective client instructions to simpler firms?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: dunkleyNotes,
    scraped_metadata: {
      observable_problem: 'Offers free 30-min consultation but forces a 10-step form with no calendar booking hold; hero warns prospects about AML ID checks before booking; layout has horizontal overflow bugs and broken icons (raw glyphs).',
      friction_title: '10-Step Form Fatigue, AML Compliance Anxiety & Layout Glitches',
      commercial_outcome: 'Exhaustive forms and upfront compliance warnings create client hesitation and abandonment before discovery calls.',
      concrete_fix: 'Streamlined 60-second intake triage with direct Bristol calendar hold and downstream compliance onboarding.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Broken FontAwesome icon assets, horizontal layout overflow, missing CSP',
      stack_summary: 'WordPress with Heavy 10-Step Form',
      copy_headline: 'Chartered Accountants Bristol - Speak to the Dunkley\'s Team',
      trade: 'Chartered Accountants Bristol',
      grade: 'D+',
      grade_reason: '10-step form fatigue, aggressive AML warnings before booking, layout glitches',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Dunkley%,website.ilike.%dunkleys%');

  console.log('✅ Batch 7 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
