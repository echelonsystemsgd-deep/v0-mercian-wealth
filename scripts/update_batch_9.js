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
  // 1. Jose & Associates
  const joseNotes = [
    '• VERIFIED FLAW: Contact page social media icons link to unconfigured generic root URLs (facebook.com/, instagram.com/, x.com/); contact form has only 4 generic fields with no turnover qualification and no calendar hold.',
    '• COMMERCIAL LEVER: Small business owners reviewing the firm on mobile encounter unconfigured template social links and an open message box with manual callback delay.',
    '• TECH STACK & VULNERABILITIES: Modern Web Builder, unconfigured social endpoints, missing CSP.',
    '• ARCHITECTURE FIX: 60-second client intake scoper pre-qualifying SME turnover with direct calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Jose & Associates on mobile earlier—your Big-4 expertise for small businesses is a strong positioning. But I noticed your contact page has unconfigured template social links pointing to blank pages, and your contact intake lacks an automated turnover scoper or calendar hold. Ahead of statutory deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: joseNotes,
    scraped_metadata: {
      observable_problem: 'Contact page social media icons link to generic root URLs (facebook.com/, x.com/), and intake lacks turnover pre-qualification or calendar hold.',
      friction_title: 'Unconfigured Template Social Links & Missing Calendar Hold',
      commercial_outcome: 'Unconfigured template elements impact credibility, while manual intake delays partner sales pipeline.',
      concrete_fix: 'Sub-400ms practice conversion hub with 60-second SME intake triage.',
      tech_stack: 'Custom Web Architecture',
      vulnerabilities: 'Unconfigured social endpoints, missing CSP',
      stack_summary: 'Small Business Practice Portal',
      copy_headline: 'Trusted Accounting for Small Businesses / Big4 Expertise',
      trade: 'Accountants for Small Businesses',
      grade: 'C+',
      grade_reason: 'Unconfigured social links and basic 4-field manual callback form',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Jose & Associates%,website.ilike.%joseassociates%');

  // 2. A A S S & Associates
  const aassNotes = [
    '• VERIFIED FLAW: Severe accessibility/contrast failure: dark grey/black text is rendered against a dark navy hero background, making the value proposition illegible; consultation anchor fails to scroll smoothly on desktop; zero calendar booking hold.',
    '• COMMERCIAL LEVER: High-stakes NRI and UAE corporate clients reviewing the site cannot read the hero text, destroying visual authority and driving them to rival cross-border firms.',
    '• TECH STACK & VULNERABILITIES: Custom Web Architecture, severe WCAG color contrast violations, missing CSP.',
    '• ARCHITECTURE FIX: High-contrast executive cross-border practice OS with automated UAE/UK/India tax scoping and direct partner discovery holds.',
    '• CALL HOOK: Hi CA Shivam, Gurtej here from Mercian Wealth. I was reviewing A A S S & Associates online—your Amritsar and Dubai cross-border corporate tax presence is formidable. However, I noticed a critical visual issue on your site: your hero text is dark grey against a dark navy background, making your value proposition almost impossible to read, and your consultation form lacks a direct calendar hold. When international corporate directors review your firm, are you finding this visual glitch hurts your conversion?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: aassNotes,
    scraped_metadata: {
      partner_name: 'CA Shivam Sharma & CA Akhil Aggarwal',
      director_name: 'CA Shivam Sharma',
      observable_problem: 'Severe WCAG contrast failure: dark grey text on dark navy background renders hero copy illegible; consultation anchor fails to scroll; lacks calendar booking hold.',
      friction_title: 'Severe Illegible Dark-on-Dark Contrast & Broken Anchor Scroll',
      commercial_outcome: 'High-value international cross-border clients bounce due to illegible text and lack of automated booking.',
      concrete_fix: 'Executive cross-border advisory portal with high-contrast typography and partner calendar sync.',
      tech_stack: 'Custom Web Architecture',
      vulnerabilities: 'Severe WCAG AA contrast violations, missing CSP',
      stack_summary: 'Cross-Border Corporate Tax Portal',
      copy_headline: 'Orchestrating Trust. Navigating Tax. (Amritsar & Dubai)',
      trade: 'Chartered Accountants & Cross-Border Tax Advisers',
      grade: 'D',
      grade_reason: 'Severe text contrast failure making hero unreadable and missing calendar hold',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%A A S S%,website.ilike.%caaass%');

  // 3. Avery Clifton Accountants
  const acNotes = [
    '• VERIFIED FLAW: CATASTROPHIC INTAKE LEAK: Contact page instructs users to "complete the enquiry form below" but the form is completely missing / blank (0 visible form inputs); header logo box physically collides with navigation links; header Twitter links to unrelated handle @TheGreenofSades.',
    '• COMMERCIAL LEVER: 100% web form conversion failure—prospective clients in Reading cannot submit an online enquiry, forcing them to manually dial or bounce to competitors.',
    '• TECH STACK & VULNERABILITIES: Legacy CMS, missing form embed (data loss), CSS header collision, bizarre third-party social handle.',
    '• ARCHITECTURE FIX: Complete rebuild with working 60-second intake triage and instant Reading consultation holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Avery Clifton on mobile earlier—your Reading practice credentials look strong. But I noticed a catastrophic issue on your live contact page: your copy tells clients to \"complete the enquiry form below\", but there is literally NO form on the page at all—it\'s completely blank. Right now, no prospective client can submit an inquiry through your website. Are your partners aware you\'re losing leads every day?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: acNotes,
    scraped_metadata: {
      observable_problem: 'Contact page tells clients to fill out the form below but the form is completely blank/missing (0 inputs); header logo collides with nav links; Twitter links to unrelated handle.',
      friction_title: 'Missing Contact Form (100% Inbound Lead Loss) & Header Collision',
      commercial_outcome: '100% inbound form loss; prospective clients cannot submit an inquiry online.',
      concrete_fix: 'Sub-400ms practice architecture with working 60-second intake triage and calendar hold.',
      tech_stack: 'Legacy Web Architecture',
      vulnerabilities: 'Missing form component, CSS header collision, misconfigured social handle',
      stack_summary: 'Broken Legacy Site with Missing Form',
      copy_headline: 'Accountants in Reading / Chartered Certified Accountants & Tax Advisers',
      trade: 'Chartered Certified Accountants Reading',
      grade: 'F',
      grade_reason: 'Missing contact form on contact page causing 100% digital lead loss',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Avery Clifton%,website.ilike.%averyclifton%');

  // 4. J.L.Khanna & Co.
  const jlkNotes = [
    '• VERIFIED FLAW: Public main navigation exposes internal staff portals ("Mail" to Zoho and "Office Login" to cacloud.ca.in); mixed content security blocks on ancient officelive.com scripts; dead AddThis widgets; Twitter link is malformed as double URL.',
    '• COMMERCIAL LEVER: Exposing internal staff logins on public navigation invites brute-force attacks and security reconnaissance; mixed content blocks trigger browser warnings.',
    '• TECH STACK & VULNERABILITIES: Legacy ASP / HTML, mixed content script blocks, exposed staff logins, dead third-party widgets.',
    '• ARCHITECTURE FIX: Modern hardened practice OS moving internal logins off public nav, fixing mixed content, and implementing automated client triage.',
    '• CALL HOOK: Hi, Gurtej here from Mercian Wealth. I was reviewing J.L.Khanna & Co online—your practice has decades of experience. But I noticed your public navigation bar currently displays your internal employee webmail and office software logins directly to website visitors, your site is triggering mixed content security warnings from ancient Office Live scripts, and your contact intake lacks a calendar hold. Are you aware your internal staff logins are exposed to the public?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: jlkNotes,
    scraped_metadata: {
      observable_problem: 'Public navigation bar exposes internal employee webmail and software logins; mixed content blocks on legacy Office Live scripts; malformed Twitter double-URL.',
      friction_title: 'Exposed Internal Staff Logins in Main Nav & Mixed Content Warnings',
      commercial_outcome: 'Exposing internal portals in main nav compromises security and invites malicious brute-force attempts.',
      concrete_fix: 'Hardened corporate practice architecture with private portal subdomains and client intake scoper.',
      tech_stack: 'Legacy Web Architecture',
      vulnerabilities: 'Internal logins exposed in public nav, mixed content security blocks, malformed URLs',
      stack_summary: 'Legacy Site with Exposed Staff Logins',
      copy_headline: 'Welcome to J.L.Khanna & Co. / Chartered Accountants',
      trade: 'Chartered Accountants',
      grade: 'D-',
      grade_reason: 'Exposed employee logins in public nav and mixed content script warnings',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%J.L.Khanna%,website.ilike.%jlkhanna%');

  // 5. SAR Accounting & Tax Solutions
  const sarNotes = [
    '• VERIFIED FLAW: Security/staging leak: header top link "Have any Question?" links directly to a raw staging IP address (http://12.173.120.123/); dedicated quote page has an incomplete 2-field form (Name & Email only); footer misspells "Navgation".',
    '• COMMERCIAL LEVER: Directing prospective Canadian clients to raw unencrypted IP addresses triggers browser security warnings and erodes professional confidence in data security.',
    '• TECH STACK & VULNERABILITIES: PHP / WordPress, raw IP address exposure, incomplete 2-field quote form, missing CSP.',
    '• ARCHITECTURE FIX: Secure Canadian practice OS removing raw IP leaks, with complete 60-second corporate tax intake and direct calendar holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing SAR Accounting online—your presence across Calgary, Edmonton, and Toronto is impressive. However, I noticed a critical security leak: your header link for \"Have any Question?\" literally redirects visitors to a raw staging IP address at 12.173.120.123, your quote page only asks for name and email with no service selection, and your footer has spelling errors. Are your partners aware of this staging IP leak?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: sarNotes,
    scraped_metadata: {
      observable_problem: 'Header link \"Have any Question?\" links to a raw staging IP address (http://12.173.120.123/); quote page is incomplete with only 2 fields; footer misspells \"Navgation\".',
      friction_title: 'Raw Staging IP Address Leak (http://12.173.120.123/) & Incomplete Quote Form',
      commercial_outcome: 'Raw staging IP links trigger security warnings and destroy client trust in data privacy.',
      concrete_fix: 'Sub-400ms secure multi-city practice OS with verified tax intake scoper.',
      tech_stack: 'PHP / WordPress',
      vulnerabilities: 'Raw IP address leak, incomplete form endpoints, missing CSP',
      stack_summary: 'WordPress with Staging IP Leak',
      copy_headline: 'We are here to help you grow your business with our expertise!',
      trade: 'CPA & Tax Solutions Calgary & Toronto',
      grade: 'D+',
      grade_reason: 'Raw staging IP address exposed in header and incomplete 2-field quote form',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%SAR Accounting%,website.ilike.%saraccounting%');

  console.log('✅ Batch 9 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
