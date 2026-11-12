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
  // 1. Cryer Sandham Limited
  const csNotes = [
    '• VERIFIED FLAW: Mobile navigation fails to collapse into a hamburger menu, truncating menu items off-screen with no toggle button; above-the-fold hero displays an automated "We are currently closed" message with a calculator stock photo; outdated 2022 copyright; zero calendar booking hold.',
    '• COMMERCIAL LEVER: Mobile visitors in Reading cannot access site navigation on smartphones due to truncation; "We are currently closed" banner creates an immediate bounce barrier.',
    '• TECH STACK & VULNERABILITIES: Yell Business Site Builder, broken mobile responsive navigation, outdated 2022 copyright.',
    '• ARCHITECTURE FIX: Modern responsive Reading practice OS with working mobile navigation and 60-second client intake triage.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Cryer Sandham on mobile earlier—your Reading practice credentials look solid. However, I noticed a severe visual bug on your live mobile site: your navigation menu fails to turn into a hamburger menu on smartphones, causing your links to get cut off off-screen, and your hero displays a banner saying \"We are currently closed\" to prospective clients. Are your partners finding that mobile visitors drop off without calling?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: csNotes,
    scraped_metadata: {
      observable_problem: 'Mobile navigation menu fails to collapse into a hamburger toggle and truncates off-screen; hero displays \"We are currently closed\" notice; outdated 2022 copyright; no calendar hold.',
      friction_title: 'Broken Mobile Navigation Truncation & "We Are Closed" Hero Notice',
      commercial_outcome: 'Smartphone users cannot navigate the site; "closed" banner causes immediate bounce for out-of-hours searchers.',
      concrete_fix: 'Sub-400ms mobile-first practice architecture with direct calendar appointment hold.',
      tech_stack: 'Yell Business Site Builder',
      vulnerabilities: 'Non-responsive navigation menu overflow on mobile, missing CSP',
      stack_summary: 'Yell Builder with Broken Mobile Nav',
      copy_headline: 'We are currently closed / Cryer Sandham Limited Reading',
      trade: 'Chartered Certified Accountants Reading',
      grade: 'D',
      grade_reason: 'Broken mobile navigation menu and "We are currently closed" hero banner',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Cryer Sandham%,website.ilike.%cryer-sandham%');

  // 2. Goringe Accountants
  const goringeNotes = [
    '• VERIFIED FLAW: Critical contact page form mismatch: copy promises "If you provide your telephone number then we can even arrange a free call back!" but the form has NO telephone input field; section header contains typo "Our Lastest Articles & Videos" (Lastest instead of Latest); Calendly booking widget on hero is omitted from the main contact page.',
    '• COMMERCIAL LEVER: Prospective clients expecting a phone callback submit their email but find no way to provide their phone number, frustrating speed-to-lead.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), Calendly, form field copy mismatch, missing CSP.',
    '• ARCHITECTURE FIX: Unified Reading & Knightsbridge practice intake integrating telephone validation and inline calendar booking on the contact page.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Goringe Accountants on mobile earlier—your positioning for £1m-£10m businesses across Reading and Knightsbridge is exceptional. However, I noticed a frustrating disconnect on your live contact page: your copy explicitly promises to arrange a free phone callback if visitors provide their phone number, but the form doesn\'t actually have a telephone number field! Plus your header has a typo saying \"Our Lastest Articles\". Are your partners having client callbacks delayed because phone numbers are missing from form submissions?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: goringeNotes,
    scraped_metadata: {
      observable_problem: 'Contact page copy promises phone callback if number is provided but the form has NO telephone field; typo in header (\"Our Lastest Articles\"); Calendly omitted from contact page.',
      friction_title: 'Missing Phone Field Despite Callback Promise & "Lastest" Typo',
      commercial_outcome: 'Prospective high-turnover clients cannot provide their phone number on the contact form, stalling outbound callback speed.',
      concrete_fix: 'Flawless multi-office intake hub with validated telephone triage and embedded calendar holds.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing phone field on callback form, typographical errors, missing CSP',
      stack_summary: 'WordPress with Calendly & Form Mismatch',
      copy_headline: 'Goringe Accountants - Reading & Knightsbridge (£1m-£10m turnover)',
      trade: 'Chartered Accountants Reading & London',
      grade: 'B-',
      grade_reason: 'Missing phone number field despite callback promise and spelling typo',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Goringe%,website.ilike.%goringeaccountants%');

  // 3. JW Hinks LLP Chartered Accountants
  const jwhNotes = [
    '• VERIFIED FLAW: Zero CTA buttons above the fold on the homepage hero; lists an obsolete Fax number (+44 121 456 0191); contact intake uses an open textarea with manual callback promise and zero calendar booking hold.',
    '• COMMERCIAL LEVER: Birmingham corporate directors reviewing the firm on mobile encounter a passive facade graphic with no direct consultation button or live calendar hold.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), missing above-the-fold hero CTA, legacy Fax number, missing CSP.',
    '• ARCHITECTURE FIX: High-impact Edgbaston practice architecture with 60-second corporate intake triage and direct partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing JW Hinks on mobile earlier—your 130-year Birmingham practice history in Edgbaston is prestigious. However, I noticed your homepage hero has zero call-to-action buttons above the fold, your contact intake relies on an open text box with a Fax number, and you currently lack an instant calendar booking hold. Ahead of statutory deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: jwhNotes,
    scraped_metadata: {
      observable_problem: 'Homepage hero has zero call-to-action buttons above the fold; lists legacy Fax number; contact form relies on open message box with zero calendar hold.',
      friction_title: 'Zero Above-The-Fold Hero CTAs, Fax Relic & Missing Calendar Hold',
      commercial_outcome: 'Passive homepage graphic and lack of instant scheduling cause high-intent Birmingham business owners to bounce.',
      concrete_fix: 'Sub-400ms commercial practice OS with immediate discovery call booking hold.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Missing above-the-fold CTA, legacy fax endpoint, missing CSP',
      stack_summary: 'WordPress Monolith with Fax Relic',
      copy_headline: 'JW Hinks Supporting Growth (Founded 1896, Edgbaston Birmingham)',
      trade: 'Chartered Accountants Birmingham',
      grade: 'C+',
      grade_reason: 'Zero hero CTA buttons, legacy fax number, and missing calendar booking',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%JW Hinks%,website.ilike.%jwhinks%');

  // 4. Silver Levene LLP
  const slNotes = [
    '• VERIFIED FLAW: M&A acquisition carveout landing page pushes all non-barrister clients off-site to Xeinadin website; contact drawer requires manual callback selection with zero live calendar booking hold; lists legacy Fax number (020 7383 4168).',
    '• COMMERCIAL LEVER: Corporate media and healthcare clients landing on Silver Levene are pushed off-site, creating friction and abandonment.',
    '• TECH STACK & VULNERABILITIES: Custom Web Architecture (A Xeinadin Company), external off-site redirect links, legacy fax number.',
    '• ARCHITECTURE FIX: Dedicated boutique entertainment & media tax practice OS with direct partner calendar booking.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: slNotes,
    scraped_metadata: {
      observable_problem: 'Homepage routing card redirects non-barrister clients off-site to Xeinadin; contact drawer has no real-time calendar hold; lists legacy fax number.',
      friction_title: 'M&A Off-Site Client Redirection & Legacy Fax Number',
      commercial_outcome: 'High-value media and creative clients are bounced off-site rather than converting immediately.',
      concrete_fix: 'Specialist media and entertainment tax intake hub with direct partner calendar hold.',
      tech_stack: 'Custom Web Architecture (Xeinadin Group)',
      vulnerabilities: 'Off-site routing leakage, legacy fax number',
      stack_summary: 'Xeinadin Group Carveout Portal',
      copy_headline: 'Silver Levene - A Xeinadin Company (Tottenham Court Road London)',
      trade: 'Accountants for Media, Entertainment & Barristers London',
      grade: 'B-',
      grade_reason: 'Off-site client redirection and manual callback drawer',
      friction_count: 2,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Silver Levene%,website.ilike.%silverlevene%');

  // 5. Holy Brook Accountants
  const hbNotes = [
    '• VERIFIED FLAW: CATASTROPHIC INTAKE LEAK: /contact-us/ page has ZERO contact forms (formsCount = 0) and NO telephone number, displaying only bus/train directions and a raw mailto link; hero H1 line wrap bug ("Holy Brook Accountant\\ns"); duplicate word ("our our Free Newsletter"); typo ("train tation"); conflicting office addresses.',
    '• COMMERCIAL LEVER: 100% web form conversion failure—prospective clients in Reading cannot submit an inquiry form or call by phone on the contact page, forcing them to manually copy email addresses.',
    '• TECH STACK & VULNERABILITIES: Custom Web Architecture, zero contact forms, missing phone number on contact page, typography bugs.',
    '• ARCHITECTURE FIX: Professional Reading practice OS with working 60-second intake triage and direct calendar hold for founder Rachel Eden.',
    '• CALL HOOK: Hi Rachel, Gurtej here from Mercian Wealth. I was reviewing Holy Brook Accountants on mobile earlier—your focus on charities and businesses for good in Reading is inspiring. However, I noticed a catastrophic intake leak on your website: your contact page literally has NO contact form and NO telephone number at all—it only displays bus and train directions with an email link, alongside typos and a broken headline where the letter \'s\' wraps onto its own line. Right now, prospective clients who want to submit an enquiry or call you are completely blocked. Are you aware of this issue?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: hbNotes,
    scraped_metadata: {
      partner_name: 'Rachel Eden FCMA',
      director_name: 'Rachel Eden FCMA',
      observable_problem: 'Contact page has ZERO contact forms and NO telephone number; hero H1 has orphan letter wrap bug (\"Accountant\\ns\"); duplicate word (\"our our\"); typo (\"train tation\"); conflicting office addresses.',
      friction_title: 'Zero Contact Forms & Missing Telephone Number on Contact Page',
      commercial_outcome: '100% form failure; prospective clients cannot submit an inquiry form or dial a phone number from the contact page.',
      concrete_fix: 'Sub-400ms Reading practice architecture with automated intake triage and direct calendar hold for Rachel Eden.',
      tech_stack: 'Custom Web Architecture',
      vulnerabilities: 'Zero contact forms on contact page, missing phone number, typography line-wrap bugs',
      stack_summary: 'Social Impact Practice with Missing Form',
      copy_headline: 'Holy Brook Accountant\\ns - Charities & Businesses for Good Reading',
      trade: 'Chartered Management Accountants Reading',
      grade: 'D-',
      grade_reason: 'Zero contact forms and no phone number on contact page, plus typography bugs',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Holy Brook%,website.ilike.%holybrook%');

  console.log('✅ Batch 15 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
