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
  // 1. Ranjit Singh & Co.
  const rsNotes = [
    '• VERIFIED FLAW: Domain is completely dead and unresolvable (ERR_NAME_NOT_RESOLVED); DNS records expired or deleted; zero web intake capability.',
    '• COMMERCIAL LEVER: 100% loss of inbound client traffic and referrals.',
    '• TECH STACK: Dead Domain / DNS Error.',
    '• ARCHITECTURE FIX: Rapid deployment of modern Next.js edge landing hub.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: rsNotes,
    scraped_metadata: {
      observable_problem: 'Domain is dead / unmapped (ERR_NAME_NOT_RESOLVED); complete digital absence.',
      friction_title: 'Dead Domain / DNS Error (ERR_NAME_NOT_RESOLVED)',
      commercial_outcome: '100% bounce rate on all web traffic.',
      concrete_fix: 'Turnkey edge-hosted practice architecture with automated intake.',
      tech_stack: 'Domain Offline / DNS Unmapped',
      vulnerabilities: 'Domain unreachable',
      stack_summary: 'Dead Domain',
      copy_headline: 'Domain Offline',
      trade: 'Chartered Accountants',
      grade: 'F',
      grade_reason: 'Domain dead / DNS resolution failure',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Ranjit Singh%,website.ilike.%ranjitsinghca%');

  // 2. Edmonds Accountancy
  const edmondsNotes = [
    '• VERIFIED FLAW: Primary homepage H1 tag is visually empty/hidden leaving an awkward blank vertical gap above CTA buttons; promises "Book a free initial consultation" but dumps users into a standard 5-field Gravity Form with no calendar hold.',
    '• COMMERCIAL LEVER: Berkshire business owners looking to lock in an instant discovery call are forced into manual email callback queues, risking drop-off to modern firms.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), Gravity Forms, empty H1 tag layout bug, missing CSP.',
    '• ARCHITECTURE FIX: High-impact hero architecture fixing the empty H1 tag, with 60-second Reading/Bracknell turnover intake and direct calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Edmonds Accountancy on mobile earlier—your team photograph and Berkshire coverage across Reading and Bracknell are brilliant. However, I noticed a visual bug on your live homepage where your main H1 headline is completely blank leaving empty vertical space, and while you offer a free initial consultation, your site lacks a direct calendar booking hold. Ahead of statutory deadlines, are your partners losing billable hours manually qualifying enquiries over email?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: edmondsNotes,
    scraped_metadata: {
      observable_problem: 'Main hero H1 tag is visually empty leaving blank vertical space above CTA buttons, and promises consultation booking but lacks direct calendar hold.',
      friction_title: 'Empty H1 Headline Bug & Missing Calendar Booking Hold',
      commercial_outcome: 'High-intent directors bounce from manual forms rather than securing an instant consultation hold.',
      concrete_fix: 'Sub-400ms practice OS with working hero copy and direct Berkshire partner calendar sync.',
      tech_stack: 'WordPress (PHP/MySQL CMS)',
      vulnerabilities: 'Empty H1 tag layout glitch, unvetted Gravity Form, missing CSP',
      stack_summary: 'WordPress with Gravity Forms',
      copy_headline: '[Empty H1 Headline Tag] / Edmonds Accountancy',
      trade: 'Accountancy Reading & Bracknell',
      grade: 'D+',
      grade_reason: 'Empty H1 headline layout defect and missing calendar booking hold',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Edmonds%,website.ilike.%edmonds-accountancy%');

  // 3. Holloway Cook Ltd
  const hcNotes = [
    '• VERIFIED FLAW: Obsolete 2000s desktop layout displaying an ancient HMRC paper tax return photo explicitly dated "Tax return 2013" (13 years out of date); external BBC news widget distracts visitors off-site; contact form completely omits a phone number input field.',
    '• COMMERCIAL LEVER: Displaying a 2013 tax return gives the impression of an unmaintained firm; omitting phone fields prevents rapid phone follow-up.',
    '• TECH STACK & VULNERABILITIES: Legacy Web Architecture, 13-year outdated imagery, missing telephone input, external news iframe.',
    '• ARCHITECTURE FIX: Modern mobile-first practice architecture with automated intake triage and phone capture.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Holloway Cook on mobile earlier—your Reading practice history is established. But I noticed several glaring visual issues on your site: your homepage prominently displays an old photo of an HMRC tax return literally dated 2013, an external BBC news widget pulls attention away from your services, and your contact form doesn\'t even collect a telephone number. Are your partners aware of how dated the site appears to prospective clients?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: hcNotes,
    scraped_metadata: {
      observable_problem: 'Homepage features a 13-year obsolete photo of a \"Tax return 2013\", external BBC widget distracts visitors, and contact form omits a telephone number input.',
      friction_title: 'Obsolete "Tax Return 2013" Stock Photo & Missing Phone Input Field',
      commercial_outcome: '13-year outdated tax return image erodes compliance authority; missing phone input stalls sales response.',
      concrete_fix: 'Contemporary Next.js practice OS with validated telephone triage.',
      tech_stack: 'Legacy Web Architecture',
      vulnerabilities: 'Missing telephone field, external iframe leaks, missing CSP',
      stack_summary: 'Obsolete 2000s Site with 2013 Stock Photo',
      copy_headline: 'Holloway Cook - Accountants in Reading / Tax return 2013',
      trade: 'Chartered Certified Accountants Reading',
      grade: 'D-',
      grade_reason: '13-year obsolete tax return imagery, external widget, and missing phone field',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Holloway Cook%,website.ilike.%hollowaycook%');

  // 4. IAC Accountants
  const iacNotes = [
    '• VERIFIED FLAW: Catastrophic Cloudflare Error 1000 ("DNS points to prohibited IP" HTTP 403) and invalid SSL certificate (ERR_CERT_AUTHORITY_INVALID); 100% public website failure.',
    '• COMMERCIAL LEVER: 100% bounce rate on all web traffic and referrals; browser displays prominent red security warning screen, destroying credibility in Slough.',
    '• TECH STACK & VULNERABILITIES: Broken Cloudflare configuration (Error 1000), invalid SSL certificate, complete site outage.',
    '• ARCHITECTURE FIX: Immediate DNS correction and deployment of secure SSL Next.js edge landing architecture.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was trying to review IAC Accountants online earlier—I noticed a catastrophic security breakdown on your live website: visiting your site throws a red \"Security Certificate Invalid\" warning, and your server is returning a Cloudflare Error 1000 blocking public access completely. Right now, no prospective client in Slough can view your site. Are your partners aware your website is completely down?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: iacNotes,
    scraped_metadata: {
      observable_problem: 'Cloudflare Error 1000 (\"DNS points to prohibited IP\") and invalid SSL certificate (ERR_CERT_AUTHORITY_INVALID); 100% public outage.',
      friction_title: 'Catastrophic Cloudflare Error 1000 & Invalid SSL Security Certificate',
      commercial_outcome: '100% loss of inbound web clients; security warnings destroy prospective client trust.',
      concrete_fix: 'Immediate DNS repair and sub-400ms secure practice OS deployment.',
      tech_stack: 'Misconfigured Cloudflare / Broken SSL',
      vulnerabilities: 'Invalid SSL certificate, HTTP 403 Forbidden Cloudflare Error 1000',
      stack_summary: 'Inaccessible Site (Cloudflare Error 1000)',
      copy_headline: 'Cloudflare Error 1000 / Site Inaccessible',
      trade: 'Accountancy Services Slough',
      grade: 'F',
      grade_reason: '100% public outage due to Cloudflare Error 1000 and invalid SSL',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%IAC Accountants%,website.ilike.%iacaccountants%');

  // 5. George Hay Chartered Accountants
  const ghNotes = [
    '• VERIFIED FLAW: Extreme form friction: promises "book a free initial consultation" but presents a heavy 28-field Gravity Form requiring mandatory physical street address, city, county, and postcode before booking; zero calendar hold.',
    '• COMMERCIAL LEVER: High-turnover SME directors abandon heavy 28-field forms demanding full physical street addresses before even speaking with an accountant.',
    '• TECH STACK & VULNERABILITIES: WordPress 7.1.4 (PHP), 28-field Gravity Form, missing CSP.',
    '• ARCHITECTURE FIX: Streamlined 60-second regional intake scoper with direct partner calendar booking, moving address verification downstream.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing George Hay on mobile earlier—your presence across Bedfordshire and Hertfordshire is prestigious. However, I noticed that while your site invites prospects to book a free consultation, your contact form is an exhaustive 28-field form that demands a mandatory full physical street address and postcode before they can even submit an inquiry, with no direct calendar booking hold. Are your partners finding that prospective business clients drop off due to heavy form fatigue?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ghNotes,
    scraped_metadata: {
      observable_problem: 'Offers consultation booking but forces an exhaustive 28-field form demanding full physical street address before submitting; lacks direct calendar booking hold.',
      friction_title: 'Exhaustive 28-Field Form Friction & Mandatory Physical Address Requirement',
      commercial_outcome: 'Massive mobile abandonment due to 28-field form fatigue; lost high-fee advisory instructions.',
      concrete_fix: 'Streamlined 60-second regional intake triage with direct partner calendar hold.',
      tech_stack: 'WordPress v7.1.4 (PHP/MySQL CMS)',
      vulnerabilities: 'Heavy 28-field form endpoint, missing CSP',
      stack_summary: 'WordPress with Heavy 28-Field Form',
      copy_headline: 'BALANCED VALUE-LED COMPLETE / George Hay Chartered Accountants',
      trade: 'Chartered Accountants Biggleswade & Letchworth',
      grade: 'D+',
      grade_reason: 'Extreme 28-field form fatigue demanding full physical address',
      friction_count: 4,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%George Hay%,website.ilike.%georgehay%');

  console.log('✅ Batch 11 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
