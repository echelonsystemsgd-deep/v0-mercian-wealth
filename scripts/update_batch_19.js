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
  // 1. Champion Accountants Limited
  const championNotes = [
    '• VERIFIED FLAW: Desktop homepage hero is 100% text-less dark photo with ZERO headline copy, ZERO proposition, and ZERO CTA buttons above the fold; external agency email leak: mailto link literally CCs third-party marketing agency (jenny@twa.marketing); mobile sticky bar permanently covers 25% of the right screen edge; multiple legacy Fax numbers; zero calendar booking hold.',
    '• COMMERCIAL LEVER: Corporate SME directors reviewing the firm on mobile have their screen 25% covered by floating bars, while desktop users see a blank photo without a proposition; CCing an agency on enquiry emails looks uncoordinated.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), Gravity Forms, agency CC email leak, mobile sticky element layout collision, missing CSP.',
    '• ARCHITECTURE FIX: High-impact Manchester & North West corporate practice OS with instant above-the-fold value proposition and direct partner calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Champion Accountants on mobile earlier—your Manchester, Chester, and Preston practice pedigree is formidable. However, I noticed several critical glitches on your live website: your desktop hero has zero headline text or buttons above the fold, your email link literally CCs an outside marketing agency called twa.marketing on client emails, and on mobile your floating toolbar covers 25% of the screen text. Are your partners finding these technical bugs impact your inbound conversion?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: championNotes,
    scraped_metadata: {
      observable_problem: 'Homepage hero has zero headline text or CTA buttons above the fold; mailto link CCs an outside marketing agency (jenny@twa.marketing); mobile sticky toolbar covers 25% of screen; lacks calendar hold.',
      friction_title: 'Blank Above-The-Fold Hero, Agency Email CC Leak & Mobile Toolbar Collision',
      commercial_outcome: 'Blank hero photos and intrusive mobile toolbars cause drop-off; agency CC on mailto links looks unprofessional.',
      concrete_fix: 'Sub-400ms regional practice conversion hub with direct partner calendar holds and clean mail routing.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'External agency email exposure, mobile viewport occlusion, missing CSP',
      stack_summary: 'WordPress with Agency Email Leak',
      copy_headline: '[Text-Less Boardroom Photo] / Champion Accountants Manchester',
      trade: 'Chartered Accountants & Business Advisers Manchester',
      grade: 'D+',
      grade_reason: 'Text-less hero image above fold, external agency CC email leak, mobile obstruction',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Champion Accountants%,website.ilike.%championgroup%');

  // 2. Chitram TV / Shiva Technology Ltd
  const chitramNotes = [
    '• DATASET DISQUALIFICATION: Disqualified from accountancy outreach. This business is an Indian IPTV streaming subscription service and Android set-top box hardware seller (Chitram TV / Shiva Technology Ltd), not an accountancy firm.',
    '• PROTOTYPE NOTE: URL is an active Next.js eCommerce client prototype built by Mercian Wealth.',
    '• STATUS: Disqualified.'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Lost',
    notes: chitramNotes,
    lead_type: 'Disqualified / IPTV Hardware Prototype',
    scraped_metadata: {
      observable_problem: 'Consumer IPTV hardware & streaming subscription seller (Disqualified from accountancy ICP).',
      friction_title: 'Disqualified Lead - Consumer IPTV Streaming Hardware Seller',
      commercial_outcome: 'Non-target lead.',
      concrete_fix: 'N/A',
      tech_stack: 'Next.js (Vercel Prototype)',
      vulnerabilities: 'N/A',
      stack_summary: 'Consumer IPTV Streaming Prototype',
      copy_headline: 'Chitram TV - 4K Android Streaming Box & Subscription',
      trade: 'IPTV Streaming & Hardware',
      grade: 'N/A',
      grade_reason: 'Disqualified consumer entertainment business',
      friction_count: 0,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Chitram%,website.ilike.%uk-streaming-client-prototype%');

  // 3. KBN Accountants Limited
  const kbnNotes = [
    '• VERIFIED FLAW: CATASTROPHIC 404 ASSET FAILURES: 4 major background images fail with HTTP 404 (hero banner.jpg, testimonials bg.jpg, contact banner Contact.jpg, map.jpg), leaving broken navy stripes across the page; dark charcoal text on dark navy background renders hero illegible; zero H1 tags; generic page title "Accountant"; jQuery crash ($ is not defined); typos: navigation slug "#clints", "Referal Reward", and "Your inquery"; contact form completely omits a phone number input; zero calendar hold.',
    '• COMMERCIAL LEVER: 404 background image failures, unreadable contrast, and visible typos give prospective Reading clients the impression of an abandoned or incompetent website.',
    '• TECH STACK & VULNERABILITIES: Broken Web Template, 4x 404 image failures, jQuery ReferenceError crash, missing phone input, WCAG contrast failures.',
    '• ARCHITECTURE FIX: Complete modernization replacing broken template with sub-400ms Castle Street practice OS and direct calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing KBN Accountants on mobile earlier—your Castle Street location in Reading is prime. However, I discovered an incredible breakdown on your live website: four of your primary background images are returning 404 Not Found errors, leaving broken stripes on your page, your hero text is black on dark navy making it unreadable, your site has spelling errors like \"clints\" and \"Referal Reward\", and your contact form doesn\'t even collect a telephone number. Are you aware your live website looks broken to prospective clients?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: kbnNotes,
    scraped_metadata: {
      observable_problem: '4 major background images return 404 Not Found; dark-on-dark unreadable hero contrast; 0 H1 tags; jQuery crash; typos (\"#clints\", \"Referal Reward\", \"inquery\"); contact form omits phone field.',
      friction_title: 'Multiple 404 Image Failures, Illegible Contrast & Spelling Typos',
      commercial_outcome: 'Broken image stripes, jQuery crashes, and typos destroy firm credibility for Reading businesses.',
      concrete_fix: 'Sub-400ms modern practice conversion architecture with working assets and calendar hold.',
      tech_stack: 'Broken Web Template (Insecure HTTP Fonts)',
      vulnerabilities: '4x 404 asset failures, jQuery ReferenceError crash, missing phone field, mixed content fonts',
      stack_summary: 'Dilapidated Template with 404 Image Failures',
      copy_headline: 'Accountant (Page Title) / KBN Accountants Castle Street Reading',
      trade: 'Accountancy & Tax Reading',
      grade: 'F',
      grade_reason: 'Multiple 404 image failures, illegible dark-on-dark contrast, typos, and missing phone field',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%KBN Accountants%,website.ilike.%kbnaccountants%');

  // 4. Wisetax Accountants Ltd
  const wisetaxNotes = [
    '• VERIFIED FLAW: Hero background video fails with HTTP 404 Not Found, exposing raw browser fallback text ("Your browser does not support the video tag."); CRITICAL PHONE NUMBER TRANSPOSITION TYPO: text says "01753 351892" but tel link is "01753 531892" and footer says "531892" (transposed 35 vs 53 causes manual dialers to call the wrong number!); mobile navigation drawer is stuck open by default, permanently occluding 60% of the screen width; "Book a Consultation" button is a fake-out opening a manual callback modal with no calendar hold.',
    '• COMMERCIAL LEVER: The phone number transposition error means high-fee clients manually typing your phone number dial a dead or wrong line; 60% mobile screen occlusion makes the mobile site unusable in Slough.',
    '• TECH STACK & VULNERABILITIES: PHP / Custom Web Template, 404 hero video asset, mobile drawer occlusion bug, phone number transposition error.',
    '• ARCHITECTURE FIX: High-converting Slough practice OS fixing phone transposition, removing video 404s, and implementing real-time calendar booking holds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Wisetax on mobile earlier—your Mackenzie Street practice presence in Slough is well established. However, I discovered two critical breakdowns on your live site: your contact page has a phone number typo where the text says 351892 but the link dials 531892, meaning anyone manually typing your number calls the wrong person, your hero video returns a 404 error, and on mobile your navigation menu is permanently stuck open covering 60% of the screen! Are your partners aware that prospective clients trying to call you are dialing the wrong number?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: wisetaxNotes,
    scraped_metadata: {
      observable_problem: 'Hero video fails with 404 Not Found; phone number transposition error (text says 351892, link/footer says 531892); mobile navigation drawer stuck open covering 60% of screen; lacks calendar hold.',
      friction_title: 'Phone Number Transposition Typo (Wrong Number) & 60% Mobile Screen Occlusion',
      commercial_outcome: 'Phone number typo causes manual callers to reach the wrong number; mobile menu lock breaks usability.',
      concrete_fix: 'Sub-400ms Slough practice conversion hub with verified phone routing and direct calendar holds.',
      tech_stack: 'Custom Web Architecture (404 Video Asset)',
      vulnerabilities: 'Phone number transposition error (data loss), 404 media asset failure, mobile layout occlusion',
      stack_summary: 'Slough Practice Site with Phone Typo',
      copy_headline: 'Wisetax Accountants Ltd - Mackenzie Street, Slough',
      trade: 'Chartered Certified Accountants Slough',
      grade: 'D-',
      grade_reason: 'Transposed phone number typo, 404 video failure, and mobile menu screen occlusion',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Wisetax%,website.ilike.%wisetax%');

  console.log('✅ Final Batch 19 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
