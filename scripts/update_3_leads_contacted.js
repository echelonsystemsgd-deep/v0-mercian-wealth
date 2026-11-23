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

  // 1. Chart Accountancy (Teodora Dimitrova)
  const chartNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): High-speed custom Next.js tech practice storefront eliminating broken 404 routes and resolving desktop navigation collision with instant mobile tap-to-call ergonomics (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated Ltd Co vs Sole Trader revenue scoper + real-time speed-to-lead qualification + direct partner diary hold syncing with Xero/QuickBooks stack verification (£795/mo retainer).',
    '  - Projected Year 1 Contract Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Broken Contact Route: Direct /contact-us/ URL throws a hard HTTP 404 Error ("Page Not Found - Chart Accountancy") with typo "directlly".',
    '  - Desktop Header Collision: Primary nav item "Blog" collides directly with "Sign-up today >" CTA button at 1280px resolution; utility bar occluded.',
    '  - Mobile Drawer Navigation Trap: Off-canvas hamburger menu drawer opens without a visible close [X] button.',
    '  - Layer 2 Intake Void: Homepage has 0 contact forms; offloads all inquiries to unvetted Calendly with zero pre-qualification on tech stack or turnover.',
    '  - Console Error: Astra theme script /wp-content/themes/astrajs/app.js returns MIME type text/html.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Teodora Dimitrova (Director & Practice Manager, ACCA)',
    '  - Email: info@chartaccountancy.com',
    '  - Phone: 0333 772 7753 / 0118 449 2321',
    '  - WhatsApp: +443337727753',
    '  - LinkedIn: https://www.linkedin.com/company/chart-accountancy/',
    '  - Location: The Blade, Abbey Square, Reading, RG1 3BE',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (WEEK 1):',
    '  [EMAIL - Day 1]',
    '  Subject: Teodora / contact route & tech client intake',
    '  Body: Hi Teodora, Noticed a quick mechanical issue on the site this morning—the direct /contact-us/ route is throwing a 404 page not found error, and on desktop the navigation is overlapping your sign-up button. More importantly, right now high-growth tech firms visiting your site are routed straight to a Calendly link with zero turnover pre-qualification. We built a clean interactive client intake prototype for UK practices that screens company turnover, software stack (Xero/QuickBooks), and VAT requirements upfront before booking into your diary. Would you be opposed to seeing a 2-minute video walkthrough of how this works? Best regards, Gurtej | Mercian Wealth',
    '',
    '  [WHATSAPP - Day 1]',
    '  Message: Hi Teodora, Gurtej here from Mercian Wealth. Spotted a 404 error on your /contact-us/ page while reviewing your site, along with your desktop header nav colliding with the sign-up CTA. We put together an automated intake prototype specifically for tech practices that pre-qualifies company turnover and VAT filing before booking into your diary. Happy to send over a 60-second clip if you\'re open to taking a look?',
    '',
    '  [LINKEDIN DM - Day 1]',
    '  Message: Hi Teodora, came across Chart Accountancy while reviewing tech-focused practices in Reading. Noticed your direct /contact-us/ link throws a 404 error and the desktop nav crowds your sign-up button. Built a light client intake prototype that automatically filters tech businesses by turnover and software stack before they reach your diary. Would you be open to taking a look at a 60-second preview?',
    '',
    '• 7-DAY COLD CALL SCRIPT (WEEK 2 EXECUTION):',
    '  - Permission Hook: "Hey Teodora, I was on the Chart Accountancy site earlier and noticed your direct /contact-us/ route is returning a 404 error, and your desktop nav is overlapping the sign-up button. That\'s exactly why I\'m calling. Would it be totally crazy for a two minute chat to see if that\'s even relevant on your end?"',
    '  - Diagnostic: "Appreciate that. Basically, when tech founders visit your site, sending them straight to an unvetted 15-minute Calendly means fee-earners get tied up with micro-sole-traders rather than £500k+ Ltd companies. Do your accountants spend billable time manually sorting through unqualified bookings, or is intake pretty automated on your end?"',
    '  - Bridge to 15-Min: "What we\'ve done is build a 60-second interactive scoper specifically for Chart Accountancy that screens annual turnover and software stack before booking into your diary. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works?"'
  ].join('\n');

  const { error: chartErr } = await supabase
    .from('leads')
    .update({
      status: 'Contacted',
      name: 'Teodora Dimitrova',
      email: 'info@chartaccountancy.com',
      phone: '0333 772 7753',
      linkedin_url: 'https://www.linkedin.com/company/chart-accountancy/',
      whatsapp_direct_url: 'https://wa.me/443337727753',
      notes: chartNotes,
      scraped_metadata: {
        partner_name: 'Teodora Dimitrova',
        director_name: 'Teodora Dimitrova',
        grade: 'D+',
        trade: 'Specialist Tech Accountants',
        tech_stack: 'WordPress / Astra Theme (PHP/Elementor 4.3.5)',
        friction_title: 'Hard 404 on /contact-us/, Desktop Header Collision & Mobile Drawer Trap',
        observable_problem: 'Direct /contact-us/ returns HTTP 404 Page Not Found (with typo "directlly"); desktop 1280px header nav overlaps sign-up button; mobile off-canvas drawer lacks a close button; homepage lacks contact forms and dumps all tech leads into Calendly with 0 qualification.',
        commercial_outcome: 'High-margin tech founders abandon broken contact pages, while fee-earning partners waste billable hours in unvetted discovery calls with micro-businesses.',
        concrete_fix: 'Sub-400ms React/Next.js practice conversion hub with automated Ltd Co turnover screening and two-way calendar sync.',
        deal_tier_setup: '£2,495',
        deal_tier_retainer: '£795/mo',
        deal_total_y1_value: '£12,035',
        last_action: 'Contacted',
        last_action_at: nowIso,
        contacted_at: nowIso,
        audit_status: 'complete',
        last_audited_at: nowIso
      }
    })
    .eq('id', '775f521e-5e35-4944-a87f-3ffe2a9809e2');

  if (chartErr) console.error('Error updating Chart Accountancy:', chartErr);
  else console.log('✓ Successfully updated Chart Accountancy -> Contacted');

  // 2. Berkshire Accountants Limited (Shahzad Niazi)
  const berkshireNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Responsive mobile-first practice storefront resolving 509px overflowing contact inputs, sub-30px tap targets, and collapsed mobile hero slider (£1,995 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate audit vs sole trader turnover qualification scoper + instant speed-to-lead WhatsApp confirmation + direct partner calendar hold sync (£695/mo retainer).',
    '  - Projected Year 1 Contract Value: £10,335.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Severe Mobile Input Overflow: On /contact-us/ at 375px viewport, all form inputs are fixed at 509px wide, spilling 134px off the screen edge.',
    '  - Cramped Tap Targets & Clipped Submit: Form inputs are only 29px tall (<44px Apple/Google standard); SEND button bottom edge is clipped by dark container block.',
    '  - Mobile Homepage Hero Collapse: LayerSlider fails to load background graphic (banner-home.jpg returns 404), rendering a blank grey void; H1 text touches x=0 with zero left padding.',
    '  - Broken Links & Malformed Strings: Word "Accountants" in address links to external domain starof7thsky.com; header mailto link has malformed space after question mark ("? Subject=Hello%20again"); outdated copyright "2010 - 2020".',
    '  - Layer 2 Triage Void: Contact Form 7 dumps £150 tax returns and £1M corporate audit clients into the same generic text box.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Shahzad Niazi (Founder & Managing Director)',
    '  - Email: info@berkshireaccountants.com',
    '  - Direct Mobile: 07794 510499 (Direct WhatsApp Viable)',
    '  - Office Tel: 0118 327 4200',
    '  - WhatsApp: +447794510499',
    '  - LinkedIn: http://linkedin.com/company/berkshireaccountantslimited',
    '  - Location: 50A London Street, Reading, Berkshire, RG1 4SQ',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (WEEK 1):',
    '  [EMAIL - Day 1]',
    '  Subject: Shahzad / mobile contact form layout on London St site',
    '  Body: Hi Shahzad, Wanted to flag a friction point on the mobile version of your site—on your contact page, the input fields are rendering at 509px wide, which overflows the mobile screen by over 130px and cuts off your Send button. On top of that, your contact form treats a £150 self-assessment inquiry identical to a multi-million-pound corporate accountancy lead. We developed a streamlined mobile intake portal for Berkshire firms that automatically triages sole trader vs limited company turnover and syncs directly into an onboarding dashboard. Open to seeing a quick 90-second teardown and the prototype? Best regards, Gurtej | Mercian Wealth',
    '',
    '  [WHATSAPP - Day 1 (To Direct Mobile: 07794 510499)]',
    '  Message: Hi Shahzad, Gurtej here from Mercian Wealth. Was reviewing your site on mobile and spotted that your contact form input boxes are 509px wide, overflowing the screen by 130px and clipping the send button. We put together a responsive intake prototype that automatically separates corporate audit leads from sole-trader self-assessments before they hit your inbox. Mind if I drop a 60-second video walkthrough here?',
    '',
    '  [LINKEDIN DM - Day 1]',
    '  Message: Hi Shahzad, saw Berkshire Accountants Ltd on London Street. Tested your site on mobile and noticed the contact form fields overflow the screen by 130px, making it difficult for mobile visitors to submit. Built a modern client onboarding prototype that solves this and pre-qualifies corporate clients automatically. Happy to share a 60-second clip if you\'re interested?',
    '',
    '• 7-DAY COLD CALL SCRIPT (WEEK 2 EXECUTION):',
    '  - Permission Hook: "Hey Shahzad, I was looking at Berkshire Accountants on mobile earlier and noticed your contact form fields are fixed at 509px wide—overflowing off the screen by 130px and cutting off the submit button. That\'s exactly why I\'m calling. Would it be totally crazy for a two minute chat to see if that\'s even relevant on your end?"',
    '  - Diagnostic: "Appreciate that. Basically, when commercial clients in Berkshire search for a firm on their phone after hours, a broken mobile form causes immediate drop-off to competitors. Do you find you get fewer direct mobile submissions than desktop, or is intake running smoothly?"',
    '  - Bridge to 15-Min: "What I\'ve put together is a responsive intake prototype specifically for Berkshire Accountants that eliminates mobile overflow and automatically triages Ltd Co turnover upfront. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works?"'
  ].join('\n');

  const { error: berksErr } = await supabase
    .from('leads')
    .update({
      status: 'Contacted',
      name: 'Shahzad Niazi',
      email: 'info@berkshireaccountants.com',
      phone: '07794 510499',
      linkedin_url: 'http://linkedin.com/company/berkshireaccountantslimited',
      whatsapp_direct_url: 'https://wa.me/447794510499',
      notes: berkshireNotes,
      scraped_metadata: {
        partner_name: 'Shahzad Niazi',
        director_name: 'Shahzad Niazi',
        grade: 'F',
        trade: 'Chartered Certified Accountants',
        tech_stack: 'WordPress Monolith with Legacy Theme & Contact Form 7',
        friction_title: '509px Mobile Input Overflow, Collapsed Hero Void & Sub-30px Tap Targets',
        observable_problem: 'Mobile contact inputs render at 509px wide (overflowing 375px screen by 134px); form inputs are only 29px tall; SEND button clipped by dark container; mobile hero collapses into blank grey box due to 404 banner-home.jpg; address links to external domain starof7thsky.com; outdated 2020 copyright.',
        commercial_outcome: 'Mobile business owners searching for an accountant cannot physically submit the contact form without lateral panning, driving commercial clients directly to local competitors.',
        concrete_fix: 'Sub-400ms mobile-first practice architecture with responsive qualification forms and direct calendar holds.',
        deal_tier_setup: '£1,995',
        deal_tier_retainer: '£695/mo',
        deal_total_y1_value: '£10,335',
        last_action: 'Contacted',
        last_action_at: nowIso,
        contacted_at: nowIso,
        audit_status: 'complete',
        last_audited_at: nowIso
      }
    })
    .eq('id', 'ced32935-cdfb-4cbf-a18d-b7a5f4f2b435');

  if (berksErr) console.error('Error updating Berkshire Accountants:', berksErr);
  else console.log('✓ Successfully updated Berkshire Accountants -> Contacted');

  // 3. Dead Simple Accounting (James Clayton)
  const dsaNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Next.js high-converting creator/freelancer practice portal resolving 404 CTAs, contradictory VAT claims, and zero-form contact bottlenecks (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Interactive multi-niche Instant Quote & Scope Engine + automated KYC intake scoper + WhatsApp confirmation engine (<60s) (£795/mo retainer).',
    '  - Projected Year 1 Contract Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Critical Live 404 on Primary CTA: Both "Get a fixed-fee quote" CTAs on /about/ link to /quote/, returning a hard 404 Error ("Oops! That page can’t be found").',
    '  - Zero Contact Forms on /contact/: Contact page contains 0 forms, 0 inputs, and 0 iframes—forcing users to manually copy/paste email addresses; contradicts /privacy-policy/ which claims users contact via "website contact form".',
    '  - Contradictory VAT Pricing: /about/ explicitly claims "Fixed fees, every price includes VAT", whereas /our-prices/ displays "All prices exclude VAT unless stated".',
    '  - Mobile Calculator Occlusion: Tiny 13x13px checkboxes; estimate summary box buried at y:1356px; popup Fillout modal is clipped on the left side by a dark navy panel.',
    '  - Mobile Header Wrapping: Announcement banner close [x] overlaps text copy; hamburger button wraps onto second row below logo.',
    '  - Layer 2 Triage Void: Targets 17 distinct micro-niches (OnlyFans, Influencers, Musicians) without an interactive intake scoper.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: James Clayton (Founder & Director)',
    '  - Email: info@deadsimpleaccounting.co.uk',
    '  - Office Tel: 0118 359 3666',
    '  - WhatsApp Channel: https://whatsapp.com/channel/0029Vb6r8OLFcowFKuqQIt1G',
    '  - LinkedIn: https://www.linkedin.com/company/dead-simple-accounting/',
    '  - Location: Suite 30, 105 London Street, Reading, RG1 4QD',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (WEEK 1):',
    '  [EMAIL - Day 1]',
    '  Subject: James / instant quote intake on Dead Simple',
    '  Body: Hi James, Noticed two friction points on the site today—both "Get a fixed-fee quote" buttons on your /about/ page return a 404 not found error (linking to /quote/), and your /contact/ page has zero form fields (just static address text and email). Given your strong focus on contractors, influencers, and OnlyFans creators, making people manually copy an email address rather than calculating their fixed fee in 3 clicks is leaving substantial revenue on the table. We designed an interactive Instant Quote & Scope Engine specifically tailored for modern creator and freelancer accounting that quotes fees, captures bank status, and handles KYC intake automatically. Would you be against seeing a 2-minute walkthrough of the prototype? Best regards, Gurtej | Mercian Wealth',
    '',
    '  [WHATSAPP - Day 1]',
    '  Message: Hi James, Gurtej here from Mercian Wealth. Was checking out Dead Simple Accounting and noticed both "Get a fixed-fee quote" CTAs on your /about/ page lead to a 404 page error, while your /contact/ page actually has no form at all—just raw text and email links. Because you cater to creators, influencers, and freelancers, having an instant fixed-fee calculator converts dramatically higher than static copy. Built a working prototype tailored to your niches. Open to seeing a 60-second preview?',
    '',
    '  [LINKEDIN / SOCIAL DM - Day 1]',
    '  Message: Hi James, love the clear positioning at Dead Simple Accounting for contractors and creators. Spotted that both quote buttons on your /about/ page lead to a 404 error, and your /contact/ page has no submission form. Built an interactive instant quote calculator prototype that lets creators spec their books and onboard in under 90 seconds. Mind if I send over a 60-second video preview?',
    '',
    '• 7-DAY COLD CALL SCRIPT (WEEK 2 EXECUTION):',
    '  - Permission Hook: "Hey James, I was on Dead Simple Accounting earlier and noticed both \'Get a fixed-fee quote\' buttons on your about page are throwing a 404 page not found error, and your contact page doesn\'t have a form. That\'s exactly why I\'m calling. Would it be totally crazy for a two minute chat to see if that\'s even relevant on your end?"',
    '  - Diagnostic: "Appreciate that. Basically, when influencers, contractors, and creators visit your site looking for pricing, hitting a 404 or having to copy/paste an email forces them to bounce. Are your fee-earners finding that client acquisition requires a lot of back-and-forth scoping, or is onboarding running smoothly?"',
    '  - Bridge to 15-Min: "What we\'ve done is build a 60-second instant quote engine specifically for Dead Simple Accounting that lets creators spec their bookkeeping, accounts, and VAT and books directly into your calendar. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works?"'
  ].join('\n');

  const { error: dsaErr } = await supabase
    .from('leads')
    .update({
      status: 'Contacted',
      name: 'James Clayton',
      email: 'info@deadsimpleaccounting.co.uk',
      phone: '0118 359 3666',
      linkedin_url: 'https://www.linkedin.com/company/dead-simple-accounting/',
      whatsapp_direct_url: 'https://whatsapp.com/channel/0029Vb6r8OLFcowFKuqQIt1G',
      notes: dsaNotes,
      scraped_metadata: {
        partner_name: 'James Clayton',
        director_name: 'James Clayton',
        grade: 'D+',
        trade: 'Specialist Accountants for Creators & SMEs',
        tech_stack: 'WordPress v7.1.4 (GeneratePress Theme)',
        friction_title: 'Critical 404 on Primary Quote CTA, Zero Forms on Contact Page & Contradictory VAT Claims',
        observable_problem: 'Both "Get a fixed-fee quote" buttons on /about/ route to /quote/ which returns HTTP 404 ("Oops! That page can’t be found"); /contact/ has 0 form fields, inputs, or iframes; /about/ says prices include VAT while /our-prices/ says prices exclude VAT; mobile quote modal is clipped on the left side.',
        commercial_outcome: 'High-intent creators and contractors seeking fixed-fee accounting bounce upon hitting 404 error pages or abandoning manual email copying, leaking clients to modern digital accounting firms.',
        concrete_fix: 'Sub-400ms interactive Instant Quote & Scope Engine with automated client intake and calendar sync.',
        deal_tier_setup: '£2,495',
        deal_tier_retainer: '£795/mo',
        deal_total_y1_value: '£12,035',
        last_action: 'Contacted',
        last_action_at: nowIso,
        contacted_at: nowIso,
        audit_status: 'complete',
        last_audited_at: nowIso
      }
    })
    .eq('id', '5796355f-201a-4a61-852b-0667f2a1eb04');

  if (dsaErr) console.error('Error updating Dead Simple Accounting:', dsaErr);
  else console.log('✓ Successfully updated Dead Simple Accounting -> Contacted');

  console.log('\n--- VERIFICATION OF UPDATED LEADS ---');
  const { data: updatedRows } = await supabase
    .from('leads')
    .select('id, business_name, name, status, phone, email, scraped_metadata')
    .or('id.eq.775f521e-5e35-4944-a87f-3ffe2a9809e2,id.eq.ced32935-cdfb-4cbf-a18d-b7a5f4f2b435,id.eq.5796355f-201a-4a61-852b-0667f2a1eb04');

  for (const r of updatedRows) {
    console.log(`[${r.status}] ${r.business_name} | Contact: ${r.name} | Phone: ${r.phone} | Email: ${r.email} | Partner: ${r.scraped_metadata?.partner_name}`);
  }
}

main();
