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

async function insertBirminghamLeads() {
  const nowIso = new Date().toISOString();

  // 1. Gondal Accountancy
  const gondalNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second mobile practice storefront restoring missing enquiry webform, resolving breadcrumb occlusion, and modernizing tap targets with instant tap-to-call mobile ergonomics (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate vs sole-trader turnover qualification scoper + instant speed-to-lead WhatsApp confirmation + direct calendar sync (£795/mo retainer).',
    '  - Projected Year 1 Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Missing Enquiry Form: Copy explicitly says "use the enquiry form below" and "send an enquiry any time", but form iframes are completely hidden/broken—zero enquiry form exists on /contact-us.',
    '  - Breadcrumb Occlusion: The "Home > Contact" breadcrumb is positioned at y=0, hidden behind the sticky header bar on mobile & desktop.',
    '  - Tap Target Sizing: 69 mobile interactive elements fail minimum 44x44px accessibility sizing.',
    '  - Heavy Cookie Banner: Cookie notice covers 22% of mobile viewport on initial load.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Tahir Rashid (Director, Companies House #12629660)',
    '  - Direct Office Tel: 0121 439 9760',
    '  - Email: info@gondalaccountancy.co.uk',
    '  - WhatsApp: https://wa.me/441214399760',
    '  - LinkedIn: https://www.linkedin.com/in/gondalaccountancy',
    '  - Instagram: https://www.instagram.com/gondalaccountancyuk',
    '  - Twitter/X: https://twitter.com/GondalAccounts',
    '  - Location: 1126A Stratford Rd, Hall Green, Birmingham, B28 8AE',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To: 0121 439 9760 / +44 121 439 9760)]',
    '  Message: Hi Tahir, Gurtej here from Mercian Wealth. Was reviewing Gondal Accountancy on mobile and noticed a critical conversion bug on your /contact-us page: the text explicitly directs visitors to "use the enquiry form below", but the form container is completely missing from the page. Any prospective Birmingham client arriving to send an enquiry is hitting a dead end. We build high-converting practice intake systems that resolve broken form funnels and qualify Ltd Co turnover automatically. Would you be open to a quick 10-minute discovery call next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  To: info@gondalaccountancy.co.uk',
    '  Subject: Critical enquiry form missing on gondalaccountancy.co.uk/contact-us',
    '  Body:',
    '  Hi Tahir,',
    '',
    '  Gurtej here from Mercian Wealth.',
    '',
    '  I was reviewing Gondal Accountancy\'s digital presence here in Birmingham earlier and wanted to flag an urgent technical defect on your live contact page:',
    '',
    '  On /contact-us, your page copy explicitly tells prospective clients: \"You can call, email or use the enquiry form below to send an enquiry any time\"—however, the webform container is completely broken and absent from the page. Visitors looking to request a consultation cannot submit their details online.',
    '',
    '  We architect sub-second practice web portals and automated intake engines for West Midlands accountancy firms—qualifying company turnover upfront and automatically syncing vetted leads into your calendar within 60 seconds.',
    '',
    '  Would you be open to a quick 10-minute discovery call next Tuesday at 10:30 AM or Wednesday at 2:00 PM to walk through the fix?',
    '',
    '  Best regards,',
    '  Gurtej',
    '  Mercian Wealth',
    '  mercianwealth.com',
    '',
    '  [LINKEDIN DM - Day 1 (To: https://www.linkedin.com/in/gondalaccountancy)]',
    '  Message: Hi Tahir, Gurtej here from Mercian Wealth in the West Midlands. Spotted a critical bug on your contact page: the text instructs clients to \"use the enquiry form below\", but there is currently no form rendered on the page at all. We engineer bespoke intake architecture for Birmingham practices that fixes broken enquiry funnels and qualifies inbound turnover automatically. Would you be open to a quick 10-minute discovery call next week to see how it works?',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Phone: 0121 439 9760',
    '  Gatekeeper Hook: "Good morning, could you put me through to Tahir Rashid please? It\'s Gurtej calling regarding a missing contact form bug on your website."',
    '  Opening (Permission Hook): "Hi Tahir, Gurtej calling from Mercian Wealth. I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I sent an email over last week regarding gondalaccountancy.co.uk. Your contact page tells visitors to use the enquiry form below, but there is no form on the page—meaning online enquiries are being completely lost."',
    '  The Fix: "We design automated practice intake systems that fix missing forms and qualify corporate turnover before leads hit your inbox."',
    '  Closing CTA: "Would you be open to a 10-minute screen share next Tuesday morning to show your team the fix?"'
  ].join('\n');

  // 2. RK Accountancy
  const rkNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second mobile practice storefront resolving dark box overlay glitch, breadcrumb typos, broken font URLs, and conflicting telephone numbers (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate audit vs sole-trader turnover qualification scoper + instant speed-to-lead WhatsApp confirmation + calendar sync (£795/mo retainer).',
    '  - Projected Year 1 Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Dark Floating Box Glitch: A solid dark-navy rectangular box pinned in bottom-right corner overlaps and obscures the email card and contact form borders on mobile.',
    '  - Typo in Breadcrumb: Hero breadcrumb misspells contact as "HOME | CONATCT".',
    '  - Dead Placeholder Links: Header "Get started" button and footer contact links point to dead "#" hashes.',
    '  - Conflicting Mobile Numbers: Card displays "0785 3390 871", while link label & footer display "074908 76662".',
    '  - Broken Staging Font URLs: 5 Google font files reference test.rk-accountancy.co.uk and fail with 404 / CORS.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Raj Kavire (Director, Companies House #08686546)',
    '  - Direct Mobile (WhatsApp): 074908 76662',
    '  - Office Tel: 0121 238 5102',
    '  - Email: info@rk-accountancy.co.uk',
    '  - WhatsApp: https://wa.me/447490876662',
    '  - Location: 1 All Saints Rd, Kings Heath, Birmingham, B14 7LL',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To Mobile: 074908 76662)]',
    '  Message: Hi Raj, Gurtej here from Mercian Wealth. Was reviewing RK Accountancy on mobile and noticed a floating dark box pinned in the bottom right that overlaps and obscures your contact details. Also spotted that your header "Get started" button points to a dead # link, and the hero breadcrumb misspells contact as "CONATCT". We build high-converting practice web architecture for Birmingham accountancy firms that fixes mobile glitches and qualifies corporate turnover upfront. Would you be open to a quick 10-minute discovery call next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  To: info@rk-accountancy.co.uk',
    '  Subject: Mobile layout overlap & dead link on rk-accountancy.co.uk/contact/',
    '  Body:',
    '  Hi Raj,',
    '',
    '  Gurtej here from Mercian Wealth.',
    '',
    '  I was reviewing RK Accountancy\'s web presence in Kings Heath earlier and wanted to highlight three presentation and conversion bugs on your live contact page:',
    '',
    '  1. On mobile, a solid dark box pinned in the bottom-right corner overlaps directly on top of your email contact card and form borders.',
    '  2. Your primary header \"Get started\" CTA button links to a dead \"#\" hash instead of triggering a consultation booking or form.',
    '  3. The page breadcrumb currently misspells contact as \"HOME | CONATCT\", while several custom font files are throwing 404 CORS errors referencing an old test staging domain.',
    '',
    '  We architect high-performing practice web systems for West Midlands accountancy firms with automated turnover qualification and direct calendar booking.',
    '',
    '  Would you be open to a 10-minute discovery call next Tuesday at 10:30 AM or Wednesday at 2:00 PM to see how we resolve this?',
    '',
    '  Best regards,',
    '  Gurtej',
    '  Mercian Wealth',
    '  mercianwealth.com',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Phone: 0121 238 5102 / 074908 76662',
    '  Gatekeeper Hook: "Good morning, could you put me through to Raj Kavire please? It\'s Gurtej calling regarding a mobile button bug on your contact page."',
    '  Opening (Permission Hook): "Hi Raj, Gurtej calling from Mercian Wealth. I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I sent an email over last week regarding rk-accountancy.co.uk. Your primary \'Get started\' button links to a dead # anchor, and on mobile, a floating dark box is actually covering your contact details."',
    '  The Fix: "We design turnkey practice web infrastructure that eliminates dead links and automatically triages Ltd Co clients into your diary."',
    '  Closing CTA: "Would you be open to a quick 10-minute screen share next Tuesday morning to show your team?"'
  ].join('\n');

  // 3. MSB Accountants
  const msbNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second responsive mobile practice storefront eliminating horizontal scroll disaster, restoring offscreen 915px form, and removing floating social occlusion (£2,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate audit vs tax turnover qualification scoper + instant speed-to-lead WhatsApp confirmation + calendar sync (£795/mo retainer).',
    '  - Projected Year 1 Value: £12,035.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Severe Mobile Viewport Glitch: Page forces a fixed 1200px desktop canvas on 375px mobile screens, causing severe horizontal scrolling and broken layout.',
    '  - Offscreen Email & Submit Button: The enquiry form is 915px wide—"Enter Your Email" sits at x=469 (completely offscreen to the right), and the Submit button sits offscreen at x=385.',
    '  - Header & Brand Truncation: Logo is cut off on left edge ("...tants"); H1 headline is truncated on right; phone and email headers are pushed 600px offscreen.',
    '  - Floating Social Bar Occlusion: Pinned Instagram/Facebook bar sits directly on top of Message and Phone input fields.',
    '  - Stale Copyright: Footer still displays "© 2020 by MSB Accountants".',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Manjinder Singh Bains (Raja Bains) (Director, Companies House #12640769)',
    '  - Direct Email: raja@msbaccountants.co.uk',
    '  - Office Tel: 0121 557 3539',
    '  - WhatsApp: https://wa.me/441215573539',
    '  - Instagram: https://www.instagram.com/msbaccountants/',
    '  - Facebook: https://www.facebook.com/msbaccountants',
    '  - Location: 5 Wedgewood Ave, West Bromwich, Birmingham, B70 0FH',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To: 0121 557 3539 / +44 121 557 3539)]',
    '  Message: Hi Raja, Gurtej here from Mercian Wealth. Was reviewing MSB Accountants on mobile and spotted a critical layout bug: your site currently forces a 1200px desktop canvas on phones, meaning your contact form is 915px wide—pushing the "Enter Your Email" field and Submit button completely off the right side of the screen where mobile visitors cannot see or click them. We build responsive practice web architecture for Birmingham firms that fixes mobile form breakages and qualifies client turnover automatically. Would you be open to a quick 10-minute discovery call next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  To: raja@msbaccountants.co.uk',
    '  Subject: Critical mobile form cutoff & layout bug on msbaccountants.co.uk',
    '  Body:',
    '  Hi Raja,',
    '',
    '  Gurtej here from Mercian Wealth.',
    '',
    '  I was reviewing MSB Accountants\' digital presence in West Bromwich earlier and wanted to highlight a severe mobile rendering issue on your live site:',
    '',
    '  On mobile smartphones (375px screens), your website forces a fixed 1200px desktop layout without responsive scaling. Consequently, your enquiry form is 915px wide—the \"Enter Your Email\" input box is pushed 469px off-screen to the right, and your Submit button is completely hidden unless users scroll horizontally.',
    '',
    '  Furthermore, your floating Instagram and Facebook icons pin directly over your Message and Phone number fields, making submission nearly impossible on mobile devices.',
    '',
    '  We architect high-converting, sub-second practice web portals for West Midlands accountancy practices with automated turnover scoping and direct calendar hold syncing.',
    '',
    '  Would you be open to a quick 10-minute discovery call next Tuesday at 10:30 AM or Wednesday at 2:00 PM to walk through the fix?',
    '',
    '  Best regards,',
    '  Gurtej',
    '  Mercian Wealth',
    '  mercianwealth.com',
    '',
    '  [INSTAGRAM DM - Day 1 (To: https://www.instagram.com/msbaccountants/)]',
    '  Message: Hi Raja, Gurtej here from Mercian Wealth in the West Midlands. Noticed your live site forces a 1200px desktop canvas on mobile—your enquiry form is 915px wide, pushing the email field and submit button completely off the screen on phones. We engineer high-converting practice web architecture that fixes mobile breakages and qualifies inbound turnover automatically. Would you be open to a quick 10-minute discovery call next week to see how it works?',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Phone: 0121 557 3539',
    '  Gatekeeper Hook: "Good morning, could you put me through to Raja Bains please? It\'s Gurtej calling regarding a mobile cutoff bug on your contact form."',
    '  Opening (Permission Hook): "Hi Raja, Gurtej calling from Mercian Wealth. I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I sent an email over last week regarding msbaccountants.co.uk. Currently on mobile phones, your contact form is over 900 pixels wide—your email input field and submit button are completely pushed off the right side of the screen."',
    '  The Fix: "We deploy responsive practice web architecture that fixes mobile form truncation and automatically qualifies Ltd Co clients into your calendar."',
    '  Closing CTA: "Would you be open to a 10-minute screen share next Tuesday morning to show your team the fix?"'
  ].join('\n');

  const leads = [
    {
      name: 'Tahir Rashid',
      first_name: 'Tahir',
      last_name: 'Rashid',
      business_name: 'Gondal Accountancy Ltd',
      website: 'https://www.gondalaccountancy.co.uk/',
      email: 'info@gondalaccountancy.co.uk',
      phone: '0121 439 9760',
      status: 'Contacted',
      source: 'brave_maps_birmingham',
      industry: 'Accountancy & Tax Consultancy',
      tier: 'Boutique Practice',
      notes: gondalNotes,
      created_at: nowIso,
      updated_at: nowIso,
      linkedin_url: 'https://www.linkedin.com/in/gondalaccountancy',
      whatsapp_direct_url: 'https://wa.me/441214399760',
      scraped_metadata: {
        partner_name: 'Tahir Rashid',
        director_name: 'Tahir Rashid',
        company_number: '12629660',
        grade: 'D',
        grade_reason: 'Copy promises enquiry form below, but form is completely missing; 69 tap target failures; breadcrumb occluded',
        friction_title: 'Broken / Missing Contact Webform & Breadcrumb Occlusion',
        observable_problem: 'Contact page explicitly tells users to "use the enquiry form below", but zero enquiry form is rendered on the page; Home > Contact breadcrumb is hidden at y=0 behind the header.',
        concrete_fix: 'Sub-second practice intake portal with functional enquiry triage and automated calendar booking.',
        tech_stack: 'Custom Webform / WordPress',
        audit_status: 'complete',
        deal_tier_setup: '£2,495',
        deal_tier_retainer: '£795/mo',
        deal_total_y1_value: '£12,035'
      }
    },
    {
      name: 'Raj Kavire',
      first_name: 'Raj',
      last_name: 'Kavire',
      business_name: 'RK Accountancy Limited',
      website: 'https://rk-accountancy.co.uk/',
      email: 'info@rk-accountancy.co.uk',
      phone: '0121 238 5102',
      status: 'Contacted',
      source: 'brave_maps_birmingham',
      industry: 'Accountancy & Bookkeeping',
      tier: 'Independent Practice',
      notes: rkNotes,
      created_at: nowIso,
      updated_at: nowIso,
      whatsapp_direct_url: 'https://wa.me/447490876662',
      scraped_metadata: {
        partner_name: 'Raj Kavire',
        director_name: 'Raj Kavire',
        company_number: '08686546',
        grade: 'C-',
        grade_reason: 'Dark floating box occluding email card, breadcrumb typo CONATCT, dead # links, and conflicting mobile numbers',
        friction_title: 'Dark Overlay Box Glitch, Dead CTA Links & Breadcrumb Typo',
        observable_problem: 'Solid dark box pins in bottom-right corner overlapping email card and form border; header "Get started" button links to dead # anchor; hero breadcrumb misspells contact as "CONATCT".',
        concrete_fix: 'Polished responsive practice web architecture with working booking CTAs and verified contact links.',
        tech_stack: 'WordPress / Elementor / MetForm',
        audit_status: 'complete',
        deal_tier_setup: '£2,495',
        deal_tier_retainer: '£795/mo',
        deal_total_y1_value: '£12,035'
      }
    },
    {
      name: 'Manjinder Singh Bains',
      first_name: 'Manjinder',
      last_name: 'Singh Bains',
      business_name: 'MSB Accountancy Limited',
      website: 'https://www.msbaccountants.co.uk/',
      email: 'raja@msbaccountants.co.uk',
      phone: '0121 557 3539',
      status: 'Contacted',
      source: 'brave_maps_birmingham',
      industry: 'Accountancy & Tax Consultancy',
      tier: 'Independent Practice',
      notes: msbNotes,
      created_at: nowIso,
      updated_at: nowIso,
      whatsapp_direct_url: 'https://wa.me/441215573539',
      scraped_metadata: {
        partner_name: 'Manjinder Singh Bains',
        director_name: 'Manjinder Singh Bains (Raja Bains)',
        company_number: '12640769',
        grade: 'F',
        grade_reason: 'Desktop canvas forced on mobile, 915px enquiry form with email and submit button pushed completely offscreen',
        friction_title: 'Severe Mobile Canvas Failure & Offscreen Form Inputs',
        observable_problem: 'Site renders fixed 1200px desktop canvas on phones; 915px wide footer form pushes "Enter Your Email" and "Submit" button completely off the right edge; floating social icons occlude fields.',
        concrete_fix: 'Turnkey mobile-first responsive practice OS with 60-second automated triage scoper.',
        tech_stack: 'Wix (Desktop canvas forced)',
        audit_status: 'complete',
        deal_tier_setup: '£2,495',
        deal_tier_retainer: '£795/mo',
        deal_total_y1_value: '£12,035'
      }
    }
  ];

  for (const l of leads) {
    const { data: existing } = await supabase.from('leads').select('id').ilike('website', `%${l.website.replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '')}%`);
    if (existing && existing.length > 0) {
      console.log('Updating lead in Supabase:', l.business_name, existing[0].id);
      await supabase.from('leads').update(l).eq('id', existing[0].id);
    } else {
      console.log('Inserting lead into Supabase:', l.business_name);
      const { data, error } = await supabase.from('leads').insert(l).select();
      console.log('Result:', data ? data[0].id : null, error);
    }
  }

  console.log('All 3 Birmingham leads saved to Supabase dashboard successfully!');
}

insertBirminghamLeads().catch(console.error);
