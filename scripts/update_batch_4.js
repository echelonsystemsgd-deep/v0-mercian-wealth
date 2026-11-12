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
  const notes = [
    '• VERIFIED FLAW: Insecure HTTP connection (browser Not Secure warning); page title is an unedited US template relic reading "pdamritsar.com - Bethesda, MD"; email mailto link contains a broken typo (yahoo.ci.in) causing enquiry bounces; broken Google Maps API error modal.',
    '• COMMERCIAL LEVER: Prospective clients clicking the email link have their emails bounce, while the Not Secure warning destroys credibility for cross-border and corporate tax instructions.',
    '• TECH STACK & VULNERABILITIES: Insecure HTTP (no SSL/HTTPS), broken mailto hyperlink, missing CSP, broken Google Maps API key, math captcha form.',
    '• ARCHITECTURE FIX: Secure SSL Next.js edge landing architecture with verified contact routing and 60-second client intake triage.',
    '• CALL HOOK: Hi CA Padam, Gurtej here from Mercian Wealth. I was reviewing Padam Dhawan & Co online—your practice has extensive experience, but I noticed several urgent technical leaks on your site: your website is currently running over insecure HTTP showing a Not Secure warning, your page title still reads "Bethesda, MD" from a template, and your email link has a typo pointing to "yahoo.ci.in" which bounces client emails. Are you aware that prospective clients trying to reach you are unable to connect?'
  ].join('\n');

  await supabase.from('leads').update({
    notes,
    scraped_metadata: {
      partner_name: 'CA Padam Dhawan',
      director_name: 'CA Padam Dhawan',
      observable_problem: 'Insecure HTTP (no SSL), broken mailto typo (yahoo.ci.in) bouncing client emails, unedited template title ("Bethesda, MD"), and broken Google Maps API.',
      friction_title: 'Insecure HTTP, Broken Mailto Link & Bethesda MD Template Relic',
      commercial_outcome: 'Prospective clients experience email delivery bounce and security warnings, destroying inbound conversion.',
      concrete_fix: 'Secure sub-400ms practice web architecture with automated intake triage and SSL.',
      tech_stack: 'Custom PHP / Legacy HTML (No SSL)',
      vulnerabilities: 'No SSL/HTTPS, broken mailto link, missing CSP, broken Google Maps API',
      stack_summary: 'Legacy Insecure HTTP Site',
      copy_headline: 'pdamritsar.com - Bethesda, MD',
      trade: 'Chartered Accountants',
      grade: 'F',
      grade_reason: 'Insecure HTTP, broken mailto link, unedited US template title',
      friction_count: 5,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString()
    }
  }).or('business_name.ilike.%Padam Dhawan%,website.ilike.%pdamritsar%');

  console.log('✅ Padam Dhawan & Co. updated successfully in Supabase!');
}

main().catch(console.error);
