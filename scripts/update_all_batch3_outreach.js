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

async function updateAllLeads() {
  const nowIso = new Date().toISOString();

  // 2. Padam Dhawan & Co. (ba44e7cc-e09f-4890-a272-0f7476ec55b4)
  const pdaNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second secure mobile practice storefront resolving insecure HTTP, bouncing .ci.in mailto email typo, and unedited Bethesda MD template title (£1,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): Automated corporate audit vs tax triage scoper + instant speed-to-lead WhatsApp confirmation + direct partner diary hold (£495/mo retainer).',
    '  - Projected Year 1 Value: £7,435.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Insecure HTTP: Site operates on unencrypted http://pdamritsar.com/ triggering browser "Not Secure" warnings.',
    '  - Broken Mailto Typo: Contact link in HTML code points to mailto:sahil.dhawan@yahoo.ci.in (bouncing client emails due to .ci.in typo).',
    '  - Unedited Template Relic: Title metadata reads "pdamritsar.com - Bethesda, MD" from an unedited US template.',
    '  - Broken Google Maps API: Embedded map fails to render due to missing/expired API key.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: CA Padam Dhawan / Sahil Dhawan',
    '  - Direct Email: sahil.dhawan@yahoo.co.in (alternate: oaamritsar@hotmail.com)',
    '  - Office Phones: 0183-2566742, 0183-2228742',
    '  - WhatsApp: https://wa.me/911832566742',
    '  - Location: Amritsar, Punjab, India',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To: 0183-2566742 / +91 183 2566742)]',
    '  Message: Hi Sahil, Gurtej here from Mercian Wealth. Was reviewing Padam Dhawan & Co on mobile and spotted two critical technical glitches: your site currently operates on unencrypted HTTP showing a "Not Secure" warning in browsers, and your email contact button has a typo linking to yahoo.ci.in which causes prospective client emails to bounce. We engineer secure, sub-second practice intake systems that resolve SSL security errors and qualify inbound client enquiries automatically. Would you be open to a quick 10-minute discovery call next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  To: sahil.dhawan@yahoo.co.in',
    '  Subject: Critical email link typo & security alert on pdamritsar.com',
    '  Body:',
    '  Hi Sahil,',
    '',
    '  Gurtej here from Mercian Wealth.',
    '',
    '  I was reviewing Padam Dhawan & Co.\'s digital presence earlier and wanted to bring two urgent operational glitches to your attention:',
    '',
    '  1. The mailto link in your website code currently links to sahil.dhawan@yahoo.ci.in—because of the \".ci.in\" typo, any prospective client clicking to email your practice has their message bounced back.',
    '  2. The website is served over unencrypted HTTP (http://pdamritsar.com/), triggering prominent \"Not Secure\" browser warnings for visitors, whilst your page title still shows \"Bethesda, MD\" from an unedited template.',
    '',
    '  We architect high-security, sub-second practice web infrastructure for accountancy firms with automated intake qualification and direct WhatsApp client triage.',
    '',
    '  Would you be open to a brief 10-minute discovery call next Tuesday at 10:30 AM or Wednesday at 2:00 PM to walk through the fix?',
    '',
    '  Best regards,',
    '  Gurtej',
    '  Mercian Wealth',
    '  mercianwealth.com',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Phone: 0183-2566742 / 0183-2228742',
    '  Gatekeeper Hook: "Good morning, could you connect me with Sahil Dhawan or CA Padam Dhawan please? It\'s Gurtej calling regarding an urgent email bounce bug on your website."',
    '  Opening (Permission Hook): "Hi Sahil, Gurtej calling from Mercian Wealth. I know you\'re busy with client matters, so I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I sent an email over last week regarding pdamritsar.com. Your contact email button has a code typo pointing to yahoo.ci.in, meaning inbound client emails are bouncing, and the site is flagging browser security warnings."',
    '  The Fix: "We deploy secure, sub-second practice intake engines with automated enquiry triage and direct WhatsApp scheduling so you never lose an inbound lead."',
    '  Closing CTA: "Would you be against a 10-minute screen share next Tuesday morning to show your team the fix?"'
  ].join('\n');

  await supabase.from('leads').update({
    notes: pdaNotes,
    status: 'Contacted',
    updated_at: nowIso,
    whatsapp_direct_url: 'https://wa.me/911832566742'
  }).eq('id', 'ba44e7cc-e09f-4890-a272-0f7476ec55b4');

  // 3. Infincible Limited (94fe0531-add7-42f9-9603-c89a4bc009c1)
  const infNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Turnkey sub-second practice web portal resolving parked GoDaddy domain with instant client intake and mobile tap-to-call (£1,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): 60-second corporate vs sole trader turnover qualification scoper + automated WhatsApp confirmation + calendar sync (£495/mo retainer).',
    '  - Projected Year 1 Value: £7,435.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Domain Parked on GoDaddy: https://www.infincible.com/lander resolves directly to GoDaddy domain parking (window.LANDER_SYSTEM="PW", ap:"parking").',
    '  - Zero Digital Presence: 100% loss of all prospective clients and referrals attempting to verify the firm online.',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: Marianne Green (Director on UK Companies House records)',
    '  - Email: Currently offline due to parked domain',
    '  - Status: Parked Domain / Dormant Target',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [LINKEDIN DM - Day 1 (To: Marianne Green)]',
    '  Message: Hi Marianne, Gurtej here from Mercian Wealth. I was looking up Infincible Limited online earlier and noticed your domain infincible.com is currently parked on a default GoDaddy lander with no active web presence or intake portal. We deploy turnkey, high-converting practice web architecture for accountancy and consultancy firms with automated 60-second client triage. Would you be open to a quick 10-minute discovery call next week to see how we could get a live practice storefront up for you?',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Opening (Permission Hook): "Hi Marianne, Gurtej calling from Mercian Wealth. I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I noticed your website domain infincible.com resolves directly to an inactive GoDaddy parking page. Any prospective clients looking up your firm online are landing on a blank domain broker page."',
    '  The Fix: "We launch turnkey practice web portals with automated client qualification and direct calendar booking in under 48 hours."',
    '  Closing CTA: "Would you be open to a quick 10-minute discovery call next Tuesday at 10:30 AM to see an example?"'
  ].join('\n');

  await supabase.from('leads').update({
    notes: infNotes,
    status: 'Contacted',
    updated_at: nowIso
  }).eq('id', '94fe0531-add7-42f9-9603-c89a4bc009c1');

  // 4. Arora Aggarwal & Co. (a29176c7-3afe-4dec-8b05-ed8d74861229)
  const aroraNotes = [
    '• 🎯 2-TIER MONETIZATION BLUEPRINT:',
    '  - Tier 1 (Trojan Horse Door-Opener): Sub-second luxury practice storefront resolving unedited legal consultation form title, broken hero typography, and spelling errors (£1,495 setup).',
    '  - Tier 2 (Automator Engine Upsell): 60-second corporate audit vs tax scoper + automated WhatsApp speed-to-lead confirmation + direct partner calendar sync (£495/mo retainer).',
    '  - Projected Year 1 Value: £7,435.',
    '',
    '• VERIFIED FLAWS & TECHNICAL AUDIT:',
    '  - Unedited Legal Form Template: Main contact form is titled "Request a free Legal Consultation" (an unedited legal template relic on an accounting firm).',
    '  - Broken Hero Typography: Hero headline displays broken spacing as "Arora Aggarw a / Committed to Excellence".',
    '  - Critical Spelling Error: Primary service badge misspells "STAUTORY AUDIT".',
    '',
    '• TARGET CONTACT DETAILS:',
    '  - Decision Maker: CA Gaurav Aggarwal (Partner)',
    '  - Direct Email: info@aroraaggarwal.com',
    '  - Direct Phone: +91 98143 10561 / 0183-5030348',
    '  - WhatsApp: https://wa.me/919814310561',
    '  - LinkedIn: https://www.linkedin.com/company/arora-aggarwal-co',
    '  - Facebook: https://www.facebook.com/aroraaggarwalco',
    '  - Location: SCO 24, B-Block, District Shopping Complex, Ranjit Avenue, Amritsar, Punjab 143001',
    '',
    '• PRE-FILLED WRITTEN OUTREACH PACK (DIRECT DISCOVERY CALL CTA):',
    '  [WHATSAPP - Day 1 (To: +91 98143 10561)]',
    '  Message: Hi Gaurav, Gurtej here from Mercian Wealth. Was reviewing Arora Aggarwal on mobile and noticed several unedited template relics: your main contact form is currently titled "Request a free Legal Consultation" (from a legal template), your hero headline has broken spacing reading "Arora Aggarw a /", and your service badge misspells "STAUTORY AUDIT". We engineer high-trust practice web architecture that eliminates template errors and qualifies corporate audit enquiries automatically. Would you be open to a quick 10-minute discovery call next Tuesday or Wednesday morning to see the fix?',
    '',
    '  [EMAIL - Day 1]',
    '  To: info@aroraaggarwal.com',
    '  Subject: Critical template errors & form title glitch on aroraaggarwal.com',
    '  Body:',
    '  Hi Gaurav,',
    '',
    '  Gurtej here from Mercian Wealth.',
    '',
    '  I was reviewing Arora Aggarwal & Co.\'s digital presence earlier and wanted to highlight three critical presentation glitches on your live website:',
    '',
    '  1. Your main enquiry form is currently titled \"Request a free Legal Consultation\"—an unedited legal template relic that causes confusion for accounting and audit clients.',
    '  2. Your hero headline has broken letter spacing displaying as \"Arora Aggarw a /\", and your audit badge misspells \"STAUTORY AUDIT\".',
    '',
    '  When corporate clients evaluate your practice online, these template errors create an immediate trust barrier.',
    '',
    '  We build high-converting practice web architecture for Chartered Accountancy firms with automated intake triage and direct consultation scheduling.',
    '',
    '  Would you be open to a quick 10-minute discovery call next Tuesday at 10:30 AM or Wednesday at 2:00 PM to see how we resolve this?',
    '',
    '  Best regards,',
    '  Gurtej',
    '  Mercian Wealth',
    '  mercianwealth.com',
    '',
    '  [LINKEDIN DM - Day 1 (To: https://www.linkedin.com/company/arora-aggarwal-co)]',
    '  Message: Hi Gaurav, Gurtej here from Mercian Wealth. Noticed your live website currently titles your enquiry form \"Request a free Legal Consultation\" from an unedited legal template, along with broken hero typography. We engineer bespoke intake architecture for Chartered Accountancy firms that eliminates template relics and qualifies corporate audit leads automatically. Would you be open to a quick 10-minute discovery call next week to see how it works?',
    '',
    '  [WEEK 2 COLD CALL SCRIPT]',
    '  Phone: +91 98143 10561 / 0183-5030348',
    '  Gatekeeper Hook: "Good morning, could you put me through to CA Gaurav Aggarwal please? It\'s Gurtej calling regarding a template glitch on your practice website."',
    '  Opening (Permission Hook): "Hi Gaurav, Gurtej calling from Mercian Wealth. I know you\'re busy with client advisory, so I\'ll keep this to 30 seconds. Do you have a moment?"',
    '  Problem/Friction: "I sent an email over last week regarding aroraaggarwal.com. Your main contact form is currently titled \'Request a free Legal Consultation\' from a legal template, and your hero heading has broken letter spacing."',
    '  The Fix: "We design high-trust practice web systems that fix template artifacts and automatically triage corporate audit vs tax clients directly into your diary."',
    '  Closing CTA: "Would you be open to a 10-minute screen share next Tuesday morning to show your team the fix?"'
  ].join('\n');

  await supabase.from('leads').update({
    notes: aroraNotes,
    status: 'Contacted',
    updated_at: nowIso,
    whatsapp_direct_url: 'https://wa.me/919814310561'
  }).eq('id', 'a29176c7-3afe-4dec-8b05-ed8d74861229');

  console.log('Successfully updated Supabase notes and outreach packs for all leads!');
}

updateAllLeads().catch(console.error);
