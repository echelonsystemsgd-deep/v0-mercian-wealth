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
  const nowIso = new Date().toISOString();

  // 1. Abacus Tax Advisors Ltd (Ishtiaq Farooqui)
  const abacusNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second mobile practice storefront resolving 422px form overflow, broken Telephone input name attributes, and unlabelled file inputs with instant tap-to-call mobile ergonomics (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated Tradesman vs Corporate Ltd Co turnover qualification scoper + instant speed-to-lead WhatsApp confirmation + direct partner diary hold syncing (£795/mo retainer).',
    '  - Projected Year 1 Contract Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Mobile Form Horizontal Overflow: Enquiry form inputs render at 422px wide on a 375px mobile screen, spilling 47px offscreen.',
    '  - Form Code Bug: Telephone input field has attribute name="form_fields[email]" (copy-paste developer bug corrupting form submissions).',
    '  - Unlabelled File Upload: Bare <input type="file"> button stuck in the middle of enquiry form without label or instructions.',
    '  - Sub-44px Tap Targets: Social icons are only 25x25px; phone and email header links are 25.5px tall stacked touching.',
    '  - Console Script Error: Site attempts to fetch /[object Object], returning a MIME type execution error.',
    '  - Duplicate Content & Typo: "Overdue Tax Returns - Correcting Mistakes" service card is duplicated verbatim; "Headingley" is misspelled as "Headingly".',
    '  - Layer 2 Triage Void: Lengthy 6-field mobile form without turnover triage or instant scheduling.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Ishtiaq Farooqui (Director, FCCA, CeMAP, AIA)',
    '  - Direct Mobile (WhatsApp): 07903 843732',
    '  - Office Phone: 0113 226 5982',
    '  - Email: tax@abacusleeds.co.uk',
    '  - WhatsApp: https://wa.me/447903843732',
    '  - Instagram: https://www.instagram.com/abacustaxadvisors/',
    '  - Facebook: https://www.facebook.com/www.abacusleeds.co.uk',
    '  - Location: First Floor Unit 2, Northwest Business Park, Servia Hill, Leeds, LS6 2QH',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To Mobile: 07903 843732)]',
    '  Message: Hi Ishtiaq, Gurtej here from Mercian Wealth. Was reviewing Abacus Leeds on mobile and spotted that your contact form is fixed at 422px wide—overflowing off the mobile screen by nearly 50px. More critically, your telephone field has a code error where it\'s labelled as an email in the backend, and there\'s an unlabelled file upload button right in the middle of the form. We put together a responsive intake prototype that fixes the mobile overflow and automatically pre-qualifies Ltd Co turnover. Would you be against a quick 10-minute screen share next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  Subject: Ishtiaq / mobile form overflow & code glitch on Abacus Leeds',
    '  Body: Hi Ishtiaq, Noticed two critical technical issues on the Abacus Leeds site today—on mobile screens, your enquiry form is 422px wide (overflowing the screen by nearly 50px), and in the code your Telephone input is accidentally named as an email field, which can corrupt incoming leads. On top of that, busy contractors and tradesmen have to fill out a lengthy 6-field form with an unlabelled file upload rather than an instant 60-second quote. We engineered a streamlined practice intake portal for West Yorkshire firms that eliminates form drop-off and pre-qualifies turnover automatically. Would it make sense to connect for 10 minutes next Tuesday or Wednesday at 10:30am to take a look? If not relevant, no problem at all. Best regards, Gurtej | Mercian Wealth | mercianwealth.com',
    '',
    '  [INSTAGRAM DM - Day 1]',
    '  Message: Hey Ishtiaq, Gurtej from Mercian Wealth here. Spotted a quick bug on the Abacus Leeds site—on mobile, your contact form is 422px wide, spilling off the screen by 50px, and your telephone field has a code error labelling it as email in the backend. Built a clean practice intake prototype that fixes the mobile bug and pre-qualifies company turnover upfront. Open to a brief 10-min screen share next week to check it out?',
    '',
    '• 7-DAY COLD CALL SCRIPT (WEEK 2 EXECUTION):',
    '  - Permission Hook: "Hey Ishtiaq, I was on the Abacus Leeds site on mobile earlier and noticed your enquiry form is overflowing off the screen by 50px, and the telephone field is accidentally coded as an email field in the backend. That\'s exactly why I\'m calling. Would it be totally crazy for a two minute chat to see if that\'s even relevant on your end?"',
    '  - Diagnostic: "Appreciate that. Basically, when tradesmen or business directors in Leeds search for an accountant in the evening on their phone, having a form that spills off the screen causes immediate drop-off. Do your fee-earners find you get fewer mobile website leads than you\'d like, or is intake running smoothly?"',
    '  - Bridge to 15-Min: "What I\'ve put together is a responsive intake prototype specifically for Abacus Leeds that fixes the form bug and automatically pre-qualifies Ltd Co turnover upfront. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works?"'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Contacted',
    name: 'Ishtiaq Farooqui',
    email: 'tax@abacusleeds.co.uk',
    phone: '07903 843732',
    linkedin_url: 'https://www.instagram.com/abacustaxadvisors/',
    whatsapp_direct_url: 'https://wa.me/447903843732',
    notes: abacusNotes,
    scraped_metadata: {
      partner_name: 'Ishtiaq Farooqui',
      director_name: 'Ishtiaq Farooqui',
      grade: 'D+',
      trade: 'Chartered Certified Accountants & Tax Advisors',
      tech_stack: 'WordPress / Elementor (AIOSEO 5.0.5.1)',
      friction_title: '422px Mobile Form Overflow, Telephone Attribute Bug & Unlabelled File Input',
      observable_problem: 'Enquiry form inputs render at 422px wide (overflowing 375px mobile screen by 47px); Telephone field has attribute name="form_fields[email]"; unlabelled raw file upload button; console fetches /[object Object]; duplicate service card; sub-44px tap targets.',
      commercial_outcome: 'Mobile business owners and tradesmen cannot cleanly submit the enquiry form on smartphones, and corrupted field attributes risk losing valid phone numbers.',
      concrete_fix: 'Sub-400ms mobile-first practice architecture with automated Ltd Co turnover screening and two-way calendar sync.',
      deal_tier_setup: '£2,495',
      deal_tier_retainer: '£795/mo',
      deal_total_y1_value: '£12,035',
      last_action: 'Contacted',
      last_action_at: nowIso,
      contacted_at: nowIso,
      audit_status: 'complete',
      last_audited_at: nowIso
    }
  }).eq('id', '2932c7f8-56de-484c-a306-76699ea6790a');
  console.log('✓ Updated Abacus Tax Advisors Ltd -> Contacted');

  // 2. A&C Chartered Accountants (Paul Hoszowskyj)
  const acNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Next.js Manchester corporate practice storefront eliminating mobile hero text occlusion, duplicate mobile nav bars, and broken 404 image assets (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate SME turnover triage + instant speed-to-lead WhatsApp confirmation (<60s) + direct partner calendar hold sync (£795/mo retainer).',
    '  - Projected Year 1 Contract Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Mobile Hero Text Occlusion: Large white blob/illustration directly overlaps and obscures white headline text ("Numbers that make sense. People who care.") and the "Arrange a call" CTA button.',
    '  - Mobile Header Duplicate Nav Bug: On 375px mobile screens, the header displays all 4 desktop navigation links stacked vertically simultaneous with the mobile hamburger toggle button below them.',
    '  - Form Input Type Bug: Contact Number field on /contact/ uses type="number", generating desktop up/down increment spinbuttons on a telephone number.',
    '  - Broken 404 Page Assets: 404 error page shows broken image placeholder and unedited "Client Name" lorem-ipsum placeholder testimonials.',
    '  - Layer 2 Triage Void: Standard Contact Form 7 without turnover qualification triage or instant booking hold.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Paul Hoszowskyj (Managing Director, ACA/FCA) & Steph Hoszowskyj (Managing Partner)',
    '  - Office Phone: 0161 962 1855',
    '  - Email: info@ac-accounts.co.uk',
    '  - WhatsApp: https://wa.me/441619621855',
    '  - Instagram: https://www.instagram.com/ac_accountants/',
    '  - LinkedIn: https://www.linkedin.com/company/a&c-chartered-accountants/',
    '  - Facebook: https://www.facebook.com/manchester.accountants/',
    '  - YouTube: https://www.youtube.com/@accharteredaccountants',
    '  - Offices: 53 King Street, Manchester, M2 4LQ & 1A Marsland Road, Sale, M33 3HP',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1]',
    '  Message: Hi Paul, Gurtej here from Mercian Wealth. Was reviewing A&C Chartered Accountants on mobile and noticed that your hero graphic directly overlaps your headline text and the "Arrange a call" button, making it unreadable. On top of that, your mobile header displays both the full desktop navigation and the hamburger menu at the same time. We built a clean practice intake prototype for Manchester firms that eliminates mobile drop-off and pre-qualifies SME turnover automatically. Would you be against a quick 10-minute screen share next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  Subject: Paul / mobile hero text collision & nav glitch on A&C site',
    '  Body: Hi Paul, Wanted to flag a visual bug on the mobile version of the A&C site—on smartphone screens, a white background illustration sits directly on top of your white headline text ("Numbers that make sense...") and your "Arrange a call" CTA button, obscuring your proposition. Additionally, your mobile header displays both the desktop navigation links and the hamburger menu stacked simultaneously. We developed a modern practice intake portal for established North West firms that resolves mobile drop-off and automatically pre-qualifies SME turnover upfront. Would it make sense to connect for a brief 10-minute chat next Tuesday or Wednesday at 10:30am to take a look? If not relevant on your end, no problem at all. Best regards, Gurtej | Mercian Wealth | mercianwealth.com',
    '',
    '  [INSTAGRAM DM - Day 1]',
    '  Message: Hey Paul & Steph, love the family-run branding at A&C. Spotted a quick mobile glitch on your site—on phones, a white graphic illustration sits directly over your headline text and the "Arrange a call" CTA button, making it hard to read. Built a clean practice intake prototype that solves the mobile collision and pre-qualifies commercial SME leads automatically. Open to a brief 10-min screen share next week to check it out?',
    '',
    '  [LINKEDIN DM - Day 1]',
    '  Message: Hi Paul, came across A&C Chartered Accountants while reviewing independent practices in Manchester. Noticed on mobile that your hero illustration overlaps your headline copy and the "Arrange a call" button, alongside duplicate stacked navigation bars. Built a practice intake prototype that solves this and pre-qualifies corporate clients automatically. Would you be against a quick 10-minute screen share next week to take a look?',
    '',
    '• 7-DAY COLD CALL SCRIPT (WEEK 2 EXECUTION):',
    '  - Permission Hook: "Hey Paul, I was on the A&C Chartered Accountants site on mobile earlier and noticed your hero graphic sits directly on top of your headline text and the \'Arrange a call\' button, making it unreadable on a phone. That\'s exactly why I\'m calling. Would it be totally crazy for a two minute chat to see if that\'s even relevant on your end?"',
    '  - Diagnostic: "Appreciate that. Basically, when ambitious business directors in Manchester search for a firm on their phone in the evening, having an obscured call button causes immediate drop-off to competitors. Do your partners find that mobile visitor conversion is a priority right now, or is client intake running smoothly?"',
    '  - Bridge to 15-Min: "What we\'ve done is build a 60-second interactive scoper specifically for A&C that eliminates mobile friction and automatically triages Ltd Co turnover upfront before booking into your diary. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works?"'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Contacted',
    name: 'Paul Hoszowskyj',
    email: 'info@ac-accounts.co.uk',
    phone: '0161 962 1855',
    linkedin_url: 'https://www.linkedin.com/company/a&c-chartered-accountants/',
    whatsapp_direct_url: 'https://wa.me/441619621855',
    notes: acNotes,
    scraped_metadata: {
      partner_name: 'Paul Hoszowskyj',
      director_name: 'Paul Hoszowskyj',
      grade: 'D+',
      trade: 'ICAEW Chartered Accountants',
      tech_stack: 'WordPress / Divi (PHP)',
      friction_title: 'Mobile Hero Text Occlusion, Duplicate Mobile Navigation & Number Spinbuttons',
      observable_problem: 'Mobile hero graphic illustration overlaps white headline text and "Arrange a call" CTA button; mobile header renders both desktop nav links and hamburger toggle stacked simultaneously; telephone input uses type="number" generating spinbuttons; 404 page shows broken images and lorem-ipsum testimonials.',
      commercial_outcome: 'Prospective Manchester business owners on smartphones face an obscured value proposition and broken layout, causing drop-off to competing firms.',
      concrete_fix: 'Sub-400ms React/Next.js practice conversion architecture with automated corporate SME scoping and direct calendar hold.',
      deal_tier_setup: '£2,495',
      deal_tier_retainer: '£795/mo',
      deal_total_y1_value: '£12,035',
      last_action: 'Contacted',
      last_action_at: nowIso,
      contacted_at: nowIso,
      audit_status: 'complete',
      last_audited_at: nowIso
    }
  }).eq('id', 'ea8e8095-2097-43bd-bc0f-b5786a377f1c');
  console.log('✓ Updated A&C Chartered Accountants -> Contacted');

  // 3. Collins Chartered Accountants (John Collins & Nigel Collins)
  const collinsNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Modern high-converting Castle Bromwich practice storefront replacing outdated 2021 framework, eliminating dead # placeholder links, and adding direct client intake (£1,995 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate audit vs SME turnover triage + instant speed-to-lead WhatsApp notification + direct calendar hold sync (£695/mo retainer).',
    '  - Projected Year 1 Contract Value: £10,335.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Outdated Abandoned Footprint: Footer copyright explicitly displays "© Collins 2021" (5 years out of date).',
    '  - Dead Placeholder Navigation: 4 dead placeholder links using dummy href="#" (including unlinked "Login" buttons).',
    '  - JavaScript Library Crash: Console records $(...).live is not a function crash due to deprecated jQuery methods.',
    '  - Zero Client Intake on Homepage: The only form on the entire homepage is a Mailchimp newsletter signup ("Join our Weekly Newsletter! We promise we won’t spam")—zero client qualification forms or appointment holds.',
    '  - Layer 2 Triage Void: Lacks automated client triage, instant qualification scoper, or direct diary scheduling.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: John Collins FCA & Nigel Collins FCA (Directors / Senior Partners)',
    '  - Office Phone: 0121 748 3122',
    '  - Email: admin@collins-chartered-accountants.co.uk',
    '  - WhatsApp: https://wa.me/441217483122',
    '  - LinkedIn: https://www.linkedin.com/company/collins-chartered-accountants/',
    '  - Location: The Lodge, Castle Bromwich Hall, Chester Road, Castle Bromwich, Birmingham, B36 9DE',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1]',
    '  Message: Hi John, Gurtej here from Mercian Wealth. Was reviewing Collins Chartered Accountants online and noticed your site is currently showing an outdated 2021 copyright in the footer, several dead placeholder links in the navigation, and your homepage actually has no client enquiry form at all (just a newsletter box). We built an interactive client intake prototype for Birmingham practices that lets commercial businesses spec their turnover and book directly into your calendar. Would you be against a quick 10-minute screen share next Tuesday or Wednesday morning to see how it works?',
    '',
    '  [EMAIL - Day 1]',
    '  Subject: John / client intake & site observation on Collins Castle Bromwich',
    '  Body: Hi John, I was reviewing Collins Chartered Accountants while looking into established Birmingham and Solihull practices. Noticed two quick items on your digital presence—your site currently carries an outdated 2021 copyright footer with several dead placeholder links, and your homepage lacks a dedicated client intake mechanism (only displaying a weekly newsletter signup). For a chartered practice handling corporate accounts and tax planning, that creates unnecessary drop-off when prospective directors browse after hours. We engineered an interactive practice intake portal that pre-qualifies Ltd Co turnover and syncs discovery appointments directly into your calendar. Would it make sense to connect for 10 minutes next Tuesday or Wednesday at 10:30am to take a look? If not relevant, no problem at all. Best regards, Gurtej | Mercian Wealth | mercianwealth.com',
    '',
    '  [LINKEDIN DM - Day 1]',
    '  Message: Hi John, saw Collins Chartered Accountants at Castle Bromwich Hall. Tested your site and noticed several dead placeholder links, an outdated 2021 copyright, and no client booking mechanism on the homepage. Built a modern practice intake prototype that solves this and pre-qualifies corporate clients automatically. Would you be against a quick 10-minute screen share next week to take a look?',
    '',
    '• 7-DAY COLD CALL SCRIPT (WEEK 2 EXECUTION):',
    '  - Permission Hook: "Hey John, I was looking at Collins Chartered Accountants earlier and noticed your site is showing an outdated 2021 copyright in the footer, several dead placeholder links in the menu, and your homepage doesn\'t have an enquiry form. That\'s exactly why I\'m calling. Would it be totally crazy for a two minute chat to see if that\'s even relevant on your end?"',
    '  - Diagnostic: "Appreciate that. Basically, when commercial directors in Birmingham and Solihull search for a chartered accountant after hours, having no direct enquiry route or booking hold causes them to move on to competing firms. Do your partners find that new client acquisition through the website is an area you\'re looking to upgrade, or is intake running smoothly?"',
    '  - Bridge to 15-Min: "What I\'ve put together is a responsive intake prototype specifically for Collins Chartered Accountants that pre-qualifies corporate turnover upfront and locks discovery appointments directly into your calendar. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works?"'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Contacted',
    name: 'John Collins',
    email: 'admin@collins-chartered-accountants.co.uk',
    phone: '0121 748 3122',
    linkedin_url: 'https://www.linkedin.com/company/collins-chartered-accountants/',
    whatsapp_direct_url: 'https://wa.me/441217483122',
    notes: collinsNotes,
    scraped_metadata: {
      partner_name: 'John Collins FCA',
      director_name: 'John Collins FCA',
      grade: 'D',
      trade: 'ICAEW Chartered Accountants & Tax Advisors',
      tech_stack: 'WordPress / jQuery (Legacy PHP)',
      friction_title: 'Outdated 2021 Footprint, Dead Placeholder Links & Missing Client Intake Form',
      observable_problem: 'Footer explicitly displays "© Collins 2021" (5 years outdated); multiple dead placeholder "#" links; $(...).live is not a function jQuery crash; homepage completely lacks a client intake form (only has a weekly newsletter form).',
      commercial_outcome: 'Birmingham SME directors looking to engage an accountant find no direct consultation booking mechanism, leaking high-value corporate retainers to competing local firms.',
      concrete_fix: 'Sub-400ms modern practice conversion architecture with automated corporate SME qualification and two-way calendar holds.',
      deal_tier_setup: '£1,995',
      deal_tier_retainer: '£695/mo',
      deal_total_y1_value: '£10,335',
      last_action: 'Contacted',
      last_action_at: nowIso,
      contacted_at: nowIso,
      audit_status: 'complete',
      last_audited_at: nowIso
    }
  }).eq('id', '384b018b-7aef-4fcd-a8fa-c4d1c14b6432');
  console.log('✓ Updated Collins Chartered Accountants -> Contacted');

  console.log('\n--- VERIFICATION OF BATCH 2 LEADS ---');
  const { data: updatedRows } = await supabase
    .from('leads')
    .select('id, business_name, name, status, phone, email, scraped_metadata')
    .or('id.eq.2932c7f8-56de-484c-a306-76699ea6790a,id.eq.ea8e8095-2097-43bd-bc0f-b5786a377f1c,id.eq.384b018b-7aef-4fcd-a8fa-c4d1c14b6432');

  for (const r of updatedRows) {
    console.log(`[${r.status}] ${r.business_name} | Contact: ${r.name} | Phone: ${r.phone} | Email: ${r.email} | Partner: ${r.scraped_metadata?.partner_name}`);
  }
}

main();
