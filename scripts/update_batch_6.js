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
  // 1. Gurveen Narang & Associates
  const gnNotes = [
    '• VERIFIED FLAW: Insecure HTTP connection; header text collides directly with the ICAI crest; unedited template text ("Elixir theme is an attractive..."); public hitwebcounter widget; enquiry form has job template placeholders asking for "Qualification" in the Mobile field and "Passing Year" in the Subject field; contact page has zero forms.',
    '• COMMERCIAL LEVER: Corporate tax clients encountering job-application placeholders and template marketing copy lose all confidence in the firm\'s operational diligence.',
    '• TECH STACK & VULNERABILITIES: Insecure HTTP (no SSL), unedited PHP template relics, hit counter tracking script, free Yahoo email.',
    '• ARCHITECTURE FIX: Secure SSL practice OS with validated client intake scoper and direct consultation scheduling.',
    '• CALL HOOK: Hi CA Gurveen, Gurtej here from Mercian Wealth. I was reviewing your practice online—your credentials look strong, but I noticed several severe technical glitches on your live site: your enquiry form has placeholders asking for \"Qualification\" in the mobile number field and \"Passing Year\" in the subject line from an unedited template, your header text collides with your logo, and your site runs over insecure HTTP. Are your partners finding this impacts your inbound client conversion?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: gnNotes,
    scraped_metadata: {
      partner_name: 'CA Gurveen Narang',
      director_name: 'CA Gurveen Narang',
      observable_problem: 'Enquiry form has job template placeholders asking for \"Qualification\" in the Mobile field and \"Passing Year\" in Subject; header text collides with logo; runs on insecure HTTP with public hit counter.',
      friction_title: 'School Job Template Form Glitches & Header Collision',
      commercial_outcome: 'Inbound corporate enquiries are baffled by job-application placeholders, destroying intake conversion.',
      concrete_fix: 'Secure responsive Next.js practice hub with automated intake triage and calendar holds.',
      tech_stack: 'Custom PHP / Insecure HTTP',
      vulnerabilities: 'No SSL/HTTPS, unedited template placeholders, public third-party counter script',
      stack_summary: 'Insecure PHP Template Site',
      copy_headline: 'CA Gurveen Narang & Associates Chartered Accountants',
      trade: 'Chartered Accountants',
      grade: 'F',
      grade_reason: 'Insecure HTTP, severe form placeholder errors, template text remnants',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Gurveen Narang%,website.ilike.%cagurveennarang%');

  // 2. Vijay Rishi & Co. / CA Rishi Mahajan
  const vrNotes = [
    '• VERIFIED FLAW: Insecure HTTP; core tax service cards display dummy PR agency template copy ("Smith&Co public relations professional works with client..."); Audit & Assurance text is an identical clone of the GST paragraph; zero contact forms across the entire site.',
    '• COMMERCIAL LEVER: Prospective clients looking for tax advisory read dummy PR agency placeholder copy, eroding credibility; zero forms forces friction onto manual WhatsApp/phone dialing.',
    '• TECH STACK & VULNERABILITIES: Insecure HTTP (no SSL), dummy template placeholder copy, zero contact form endpoints.',
    '• ARCHITECTURE FIX: Turnkey secure practice architecture with authentic tax advisory scoping and direct consultation booking.',
    '• CALL HOOK: Hi CA Rishi, Gurtej here from Mercian Wealth. I was reviewing Vijay Rishi & Co online—your practice has extensive tax experience. But I noticed several glaring template issues on your site: your tax service cards literally display dummy placeholder text for a PR firm called \"Smith&Co\", your audit text is duplicated word-for-word from GST, and you currently have zero contact forms on the entire site. Are you aware that prospective clients reviewing your site are seeing unedited dummy template text?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: vrNotes,
    scraped_metadata: {
      partner_name: 'CA Rishi Mahajan',
      director_name: 'CA Rishi Mahajan',
      observable_problem: 'Tax services display dummy PR agency template copy (\"Smith&Co...\"), Audit paragraph is an identical duplicate of GST, and website has zero contact forms.',
      friction_title: 'Dummy PR Agency Copy ("Smith&Co") & Zero Contact Intake Forms',
      commercial_outcome: 'Unedited template dummy copy destroys professional credibility for high-stakes tax advisory.',
      concrete_fix: 'Sub-second practice architecture with verified tax service copy and 60-second intake triage.',
      tech_stack: 'Custom PHP / Insecure HTTP',
      vulnerabilities: 'No SSL/HTTPS, unedited dummy copy, zero form endpoints',
      stack_summary: 'Insecure PHP Template Site',
      copy_headline: 'Building Great Future Together / WE CARE FOR YOUR BUSINESS',
      trade: 'Chartered Accountants & Tax Advisers',
      grade: 'F',
      grade_reason: 'Dummy PR agency template copy, zero contact forms, insecure HTTP',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Vijay Rishi%,website.ilike.%carishimahajan%');

  // 3. Ahluwalia & Associates
  const ahNotes = [
    '• LEAD QUALIFICATION NOTE: False positive for accountancy outreach. Ahluwalia & Associates is an Architectural & Structural Engineering firm (located opposite the Income Tax Office).',
    '• VERIFIED FLAW: Outdated builder template with unedited placeholder text ("This content will display your pictures"); static phone/WhatsApp only with no booking capability.',
    '• COMMERCIAL LEVER: Architectural leads seeking planning/valuation encounter placeholder images.',
    '• TECH STACK: Custom Web Builder, missing CSP.',
    '• ARCHITECTURE FIX: Architecture portfolio hub with 3D project showcase.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ahNotes,
    lead_type: 'Architecture / Non-ICP',
    scraped_metadata: {
      observable_problem: 'Architectural and structural engineering practice (False positive lead for accountancy outreach).',
      friction_title: 'Non-Accountancy ICP (Architectural Practice)',
      commercial_outcome: 'Non-target lead for accountancy services.',
      concrete_fix: 'Architectural portfolio hub.',
      tech_stack: 'Site Builder',
      vulnerabilities: 'Placeholder content',
      stack_summary: 'Non-ICP Architectural Firm',
      copy_headline: 'Designing Dreams, Building Realities',
      trade: 'Architectural & Engineering Consultants',
      grade: 'C',
      grade_reason: 'Non-ICP architectural practice',
      friction_count: 2,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Ahluwalia%,website.ilike.%ahluwaliaandassociates%');

  // 4. ASA & Associates
  const asaNotes = [
    '• LEAD QUALIFICATION NOTE: Legal practice (Advocates & Legal Consultants) specializing in court litigation and criminal defense at District & Sessions Courts.',
    '• VERIFIED FLAW: Built on Wix with default system placeholder URLs (/blank-1, /blank-3); console throws syntax errors (raw HTML pasted into masterPage.js); generic form with no court case intake triage.',
    '• COMMERCIAL LEVER: Corporate and high-net-worth legal clients encounter broken navigation links and console errors.',
    '• TECH STACK & VULNERABILITIES: Wix Cloud Builder, broken JavaScript masterPage.js syntax error, missing CSP.',
    '• ARCHITECTURE FIX: Prestigious legal practice portal with secure client consultation scheduling.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: asaNotes,
    lead_type: 'Legal / Litigation',
    scraped_metadata: {
      observable_problem: 'Court litigation practice with visible placeholder URLs (/blank-1) and console syntax errors.',
      friction_title: 'Litigation Practice with Default /blank-1 URLs & JS Errors',
      commercial_outcome: 'Poor development polish impacts client authority for high-stakes court representation.',
      concrete_fix: 'High-trust legal advisory portal with encrypted consultation booking.',
      tech_stack: 'Wix Cloud Builder',
      vulnerabilities: 'JavaScript syntax error in masterPage.js, missing CSP',
      stack_summary: 'Wix Legal Site',
      copy_headline: 'Excellence in Legal Representation',
      trade: 'Advocates & Legal Consultants',
      grade: 'D+',
      grade_reason: 'Placeholder URLs (/blank-1) and JavaScript syntax errors',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%ASA & Associates%,website.ilike.%lawatasa%');

  // 5. P.N. Arora and Associates
  const pnaNotes = [
    '• VERIFIED FLAW: Zero contact forms across the entire site (formCount: 0); sole email contact for a 50+ year ITAT / High Court senior counsel practice is a free personal Yahoo webmail address (pnarora355@yahoo.in); no notice/appeal intake triage.',
    '• COMMERCIAL LEVER: High-stakes corporate clients facing ITAT or High Court tax demands cannot submit notice documents or book consultations online, creating friction and delay.',
    '• TECH STACK & VULNERABILITIES: Modern single-page web architecture, missing Content-Security-Policy, zero form endpoints, free Yahoo email.',
    '• ARCHITECTURE FIX: High-authority tax litigation portal with secure notice document intake triage and confidential partner consultation holds.',
    '• CALL HOOK: Hi Mr. Arora, Gurtej here from Mercian Wealth. I was reviewing P.N. Arora and Associates online—your firm\'s 50-year ITAT and High Court tax litigation record is prestigious. However, I noticed that you currently have zero contact or case intake forms on your site, and your primary email contact is a personal Yahoo address. When corporate directors facing complex tax assessments look up your firm, are you finding that the lack of direct digital intake causes friction in engaging your counsel?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: pnaNotes,
    scraped_metadata: {
      partner_name: 'Mr. P.N. Arora & Munish Arora',
      director_name: 'Mr. P.N. Arora',
      observable_problem: 'Zero contact forms on the entire site, and sole email contact is a free personal Yahoo address (pnarora355@yahoo.in) for a 50+ year High Court tax litigation practice.',
      friction_title: 'Zero Contact Intake Forms & Personal Yahoo Webmail Address',
      commercial_outcome: 'High-value corporate tax appeal clients cannot submit notice documents or book discovery holds online.',
      concrete_fix: 'Confidential tax appeal intake portal with encrypted notice upload and partner diary hold.',
      tech_stack: 'Modern Single-Page Architecture',
      vulnerabilities: 'Missing Content-Security-Policy, zero intake endpoints',
      stack_summary: 'Single-Page Tax Litigation Portal',
      copy_headline: 'Trusted Advisors in Income Tax, GST & Corporate Law (50+ Years)',
      trade: 'Tax Litigation & ITAT Counsel',
      grade: 'C-',
      grade_reason: 'Zero digital intake forms and personal Yahoo email for senior counsel',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%P.N. Arora%,website.ilike.%pnarora%');

  console.log('✅ Batch 6 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
