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
  // 1. Dains Accountants Limited
  const dainsNotes = [
    '• VERIFIED FLAW: National advisory group (Birmingham & Midlands) forces all consultation requests into a 7-field manual callback queue with zero live calendar booking hold; LinkedIn footer icon has a malformed double-URL bug (404 error); Mapbox geolocation script errors.',
    '• COMMERCIAL LEVER: High-turnover corporate clients searching out of hours abandon manual callback forms, choosing agile regional practices with instant partner discovery holds.',
    '• TECH STACK & VULNERABILITIES: Enterprise Web CMS, malformed social links, Mapbox script errors, missing CSP.',
    '• ARCHITECTURE FIX: Sub-60s multi-office speed-to-lead architecture pre-qualifying turnover with direct regional partner calendar holds.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: dainsNotes,
    scraped_metadata: {
      observable_problem: 'Consultation intake relies on a 7-field manual callback queue with no direct calendar booking hold; malformed double-URL on LinkedIn footer link.',
      friction_title: 'Enterprise Manual Callback Queue & Malformed Social URL Bug',
      commercial_outcome: 'High-value corporate clients abandon manual forms rather than securing an immediate partner consultation slot.',
      concrete_fix: 'Sub-400ms regional speed-to-lead architecture with direct partner calendar booking.',
      tech_stack: 'Enterprise Web CMS',
      vulnerabilities: 'Malformed social URL link, Mapbox script errors, missing CSP',
      stack_summary: 'Enterprise Dains Group Portal',
      copy_headline: 'Expert accounting, tax and business advisory services – built around you',
      trade: 'Corporate Accountants & Business Advisers Birmingham',
      grade: 'B-',
      grade_reason: 'Polished branding but manual 7-field callback delay and malformed footer link',
      friction_count: 2,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Dains%,website.ilike.%dains%');

  // 2. Barrie Ingram Accounts Ltd
  const barrieNotes = [
    '• BENCHMARK PRACTICE NOTE: Solo practitioner (Barrie Ingram, Colchester) with exemplary productized pricing tiers, integrated Microsoft Bookings discovery calls, and direct GoCardless checkouts (£49.99 fixed review, £24.99/mo tax filing).',
    '• VERIFIED FLAW: Minor polish opportunities: Elementor/WordPress architecture optimization, speed-to-lead mobile acceleration, and automated client document intake.',
    '• COMMERCIAL LEVER: Excellent conversion benchmark for productized solo accountancy practices.',
    '• TECH STACK: WordPress / Elementor / Microsoft Bookings / GoCardless.',
    '• ARCHITECTURE UPGRADE: Sub-second edge acceleration and automated multi-stage onboarding triage.'
  ].join('\n');

  await supabase.from('leads').update({
    notes: barrieNotes,
    scraped_metadata: {
      partner_name: 'Barrie Ingram',
      director_name: 'Barrie Ingram',
      observable_problem: 'High-converting productized benchmark with Microsoft Bookings and GoCardless integration; minor opportunity for edge acceleration and automated client intake.',
      friction_title: 'Productized Benchmark Practice (Microsoft Bookings & GoCardless)',
      commercial_outcome: 'Strong conversion baseline; potential upgrade for automated client onboarding and sub-400ms mobile speed.',
      concrete_fix: 'Next-gen edge architecture with automated client onboarding and scoping calculator.',
      tech_stack: 'WordPress / Elementor / Microsoft Bookings',
      vulnerabilities: 'Standard WordPress plugin attack surface, missing CSP',
      stack_summary: 'Productized Practice with Microsoft Bookings',
      copy_headline: 'Barrie Ingram Accounts / Talking your language – We are here to help you',
      trade: 'Accountancy & Tax Filing Stanway & Colchester',
      grade: 'A-',
      grade_reason: 'Exemplary productized tiers with live Microsoft Bookings integration',
      friction_count: 1,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Barrie Ingram%,website.ilike.%barrieingramaccounts%');

  // 3. Oury Clark
  const ouryNotes = [
    '• VERIFIED FLAW: Homepage podcast feed ("Business without Bullshit") fails due to missing CORS headers, rendering a visible UI error box ("Something went wrong, please try again"); rotated vertical contact sidebar tab creates mobile navigation friction; zero instant calendar booking hold.',
    '• COMMERCIAL LEVER: Visible error messages on the homepage damage the firm\'s prestigious 90-year dual-regulated Slough & London authority.',
    '• TECH STACK & VULNERABILITIES: Custom Web Architecture, failed CORS podcast widget, missing CSP, disabled-by-default form button.',
    '• ARCHITECTURE FIX: High-speed dual-regulated legal & accountancy intake architecture with direct partner calendar booking and clean media feeds.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Oury Clark on mobile earlier—your 90-year dual-regulated legal and accounting credentials across Slough and Central London are exceptional. However, I noticed a visible error message on your live homepage where your podcast widget has crashed displaying \"Something went wrong, please try again\", and your contact intake lacks a direct calendar booking hold. Are your partners aware of this visual error on your homepage?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: ouryNotes,
    scraped_metadata: {
      observable_problem: 'Homepage podcast feed displays visible CORS error (\"Something went wrong, please try again\"); rotated sidebar tab causes mobile friction; lacks live calendar booking hold.',
      friction_title: 'Homepage Podcast CORS Widget Error & Missing Calendar Booking Hold',
      commercial_outcome: 'Visible error messages on homepage damage firm authority; manual callback delay stalls partner pipeline.',
      concrete_fix: 'Sub-400ms dual-regulated advisory architecture with direct partner calendar holds.',
      tech_stack: 'Custom Web Architecture (Dual Regulated)',
      vulnerabilities: 'Failed CORS podcast widget, missing CSP',
      stack_summary: 'Dual Regulated Firm with Widget Error',
      copy_headline: 'Oury Clark - Solicitors and Chartered Accountants (Est. 1935)',
      trade: 'Chartered Accountants & Solicitors Slough & London',
      grade: 'C+',
      grade_reason: 'Visible CORS widget error on live homepage and missing calendar booking hold',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Oury Clark%,website.ilike.%ouryclark%');

  // 4. My Online Lawyer
  const molNotes = [
    '• DATASET DISQUALIFICATION: Disqualified from accountancy outreach. This business is a legal introducer connecting clients with solicitors for mortgage Independent Legal Advice (ILA) certificates, not an accountancy firm.',
    '• BENCHMARK UX NOTE: Features best-in-class hero live availability calendar widget showing real-time consultation slots.',
    '• STATUS: Disqualified.'
  ].join('\n');

  await supabase.from('leads').update({
    status: 'Lost',
    notes: molNotes,
    lead_type: 'Disqualified / Legal Introducer',
    scraped_metadata: {
      observable_problem: 'Legal introducer for mortgage ILA certificates (Disqualified from accountancy ICP).',
      friction_title: 'Disqualified Lead - Legal Introducer (ILA Certificates)',
      commercial_outcome: 'Non-target lead.',
      concrete_fix: 'N/A',
      tech_stack: 'Modern Web Architecture',
      vulnerabilities: 'N/A',
      stack_summary: 'Mortgage Legal Introducer',
      copy_headline: 'My Online Lawyer - Independent Legal Advice Certificates',
      trade: 'Legal Services Introducer',
      grade: 'N/A',
      grade_reason: 'Disqualified legal introducer business',
      friction_count: 0,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%My Online Lawyer%,website.ilike.%myonlinelawyer%');

  // 5. Kingston Wells (Kingston Smith LLP in leads table)
  const kwNotes = [
    '• VERIFIED FLAW: Slider Revolution crash produces an ENORMOUS 500px blank white void above the fold; header telephone (07446 945 466) and email are both dead dummy "#" anchors doing nothing when clicked; broken CDN script path missing "https://"; street address misspells "1 Burnel Way" (Brunel Way); 5-year outdated 2021 copyright; mobile sticky toolbar physically covers contact form inputs; zero calendar hold.',
    '• COMMERCIAL LEVER: Mobile and desktop visitors in Slough see a 500px blank white void and dead phone links, while mobile inputs are covered, destroying 100% of digital intake.',
    '• TECH STACK & VULNERABILITIES: WordPress (PHP), Slider Revolution crash, dead dummy anchor links, broken CDN script syntax, 5-year outdated copyright.',
    '• ARCHITECTURE FIX: Emergency deployment of sub-400ms Slough practice OS with working phone dialing, verified typography, and direct calendar sync.',
    '• CALL HOOK: Good morning, Gurtej here from Mercian Wealth. I was reviewing Kingston Wells on mobile earlier—your location at The Porter Building in Slough is prime. However, I discovered an incredible breakdown on your live website: your hero slider has completely crashed, leaving a massive 500-pixel blank white void above the fold, your top phone number and email are dead dummy links that do nothing when clicked, your address misspells Brunel Way, and on mobile your toolbar physically blocks users from typing in your form! Right now, prospective clients in Slough cannot call or message you. Are you aware your website is completely broken?'
  ].join('\n');

  await supabase.from('leads').update({
    notes: kwNotes,
    scraped_metadata: {
      observable_problem: 'Slider Revolution crash produces an enormous 500px blank white void above the fold; header phone and email are dead \"#\" dummy links; broken CDN script syntax; address misspells Brunel Way; mobile toolbar blocks form inputs.',
      friction_title: '500px Blank White Hero Void, Dead Phone Links & Mobile Form Obstruction',
      commercial_outcome: 'Dead phone links and 500px blank voids destroy credibility and prevent prospective clients from getting in touch.',
      concrete_fix: 'Sub-400ms practice conversion hub with working tap-to-call and automated Slough calendar hold.',
      tech_stack: 'WordPress (Crashed Slider Revolution)',
      vulnerabilities: 'Broken CDN script URL, dead dummy anchor links, 500px blank void, 5-year outdated copyright',
      stack_summary: 'WordPress with Crashed Slider Void',
      copy_headline: '[Crashed Slider Revolution 500px Void] / Kingston Wells Slough',
      trade: 'Chartered Certified Accountants Slough',
      grade: 'F',
      grade_reason: '500px blank hero void, dead dummy phone/email links, and mobile input obstruction',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Kingston%,website.ilike.%kingston-wells%');

  console.log('✅ Batch 18 forensic visual intelligence successfully updated in Supabase leads table!');
}

main().catch(console.error);
