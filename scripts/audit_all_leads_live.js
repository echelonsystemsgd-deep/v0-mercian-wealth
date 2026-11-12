const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Load environment
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const getEnv = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : null;
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || getEnv('SUPABASE_URL');
const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function fetchUrl(targetUrl, maxRedirects = 4) {
  return new Promise((resolve) => {
    if (!targetUrl || targetUrl === 'None' || targetUrl === 'NO WEBSITE' || targetUrl.trim() === '') {
      return resolve({ ok: false, reason: 'No website listed' });
    }

    let normalized = targetUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }

    let parsed;
    try {
      parsed = new URL(normalized);
    } catch {
      return resolve({ ok: false, reason: 'Invalid URL format' });
    }

    const client = parsed.protocol === 'http:' ? http : https;
    const req = client.get(
      parsed.href,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
        },
        timeout: 10000,
        rejectUnauthorized: false,
      },
      (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
          try {
            const nextUrl = new URL(res.headers.location, parsed.href).href;
            return resolve(fetchUrl(nextUrl, maxRedirects - 1));
          } catch {
            // fall through
          }
        }

        let body = '';
        res.on('data', (chunk) => {
          if (body.length < 600000) body += chunk.toString();
        });

        res.on('end', () => {
          resolve({
            ok: true,
            statusCode: res.statusCode,
            headers: res.headers,
            finalUrl: parsed.href,
            body,
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, reason: 'Connection timed out (10s)' });
    });

    req.on('error', (err) => {
      if (parsed.protocol === 'https:' && maxRedirects > 0) {
        return resolve(fetchUrl('http://' + parsed.host + parsed.pathname, 0));
      }
      resolve({ ok: false, reason: err.message });
    });
  });
}

function analyzeForensics(resp, contactResp = null) {
  if (!resp.ok) {
    return {
      status: 'offline',
      techStack: 'Unknown / Domain Offline',
      vulnerabilities: 'Site unreachable or domain offline',
      observableFlaw: 'Domain is unreachable or timing out, leaving zero digital inbound funnel.',
      commercialOutcome: 'Complete loss of prospective business; directors searching online find competing local practices.',
      concreteFix: 'Sub-second modern Next.js edge landing architecture with 99.99% uptime guarantee.',
      grade: 'F',
      gradeReason: 'Domain unreachable or down',
      frictionCount: 3,
      headline: 'Offline',
      hasOpenTextarea: false,
      hasTurnoverQual: false,
      hasCalendarBooking: false,
    };
  }

  const headers = resp.headers || {};
  const body = resp.body || '';
  const combinedBody = body + (contactResp?.body ? ' ' + contactResp.body : '');

  // 1. Tech Stack & Server
  const server = headers['server'] || 'Standard Web Server';
  const xPoweredBy = headers['x-powered-by'] || '';
  const setCookie = headers['set-cookie'] || [];
  const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie);

  let platform = 'Custom Web Architecture';
  let isPhp = false;
  const phpEvidence = [];

  if (/php/i.test(xPoweredBy)) {
    isPhp = true;
    phpEvidence.push(`X-Powered-By: ${xPoweredBy}`);
  }
  if (/php/i.test(server)) {
    isPhp = true;
    phpEvidence.push(`Server header: ${server}`);
  }
  if (/PHPSESSID/i.test(cookieStr)) {
    isPhp = true;
    phpEvidence.push('PHPSESSID session cookie');
  }

  // CMS identification
  if (/wp-content|wp-includes|wp-json/i.test(combinedBody) || /generator["'][^>]*content=["']WordPress/i.test(combinedBody)) {
    isPhp = true;
    const verMatch = combinedBody.match(/generator["'][^>]*content=["']WordPress\s*([0-9.]+)?/i);
    const ver = verMatch && verMatch[1] ? ` v${verMatch[1]}` : '';
    platform = `WordPress${ver} (PHP/MySQL CMS)`;
    phpEvidence.push(`WordPress CMS${ver}`);
  } else if (/Drupal/i.test(combinedBody)) {
    isPhp = true;
    platform = 'Drupal (PHP CMS)';
    phpEvidence.push('Drupal CMS');
  } else if (/Joomla/i.test(combinedBody)) {
    isPhp = true;
    platform = 'Joomla (PHP CMS)';
    phpEvidence.push('Joomla CMS');
  } else if (/wix\.com|parastorage/i.test(combinedBody) || headers['x-wix-request-id']) {
    platform = 'Wix Cloud Builder';
  } else if (/squarespace\.com/i.test(combinedBody)) {
    platform = 'Squarespace';
  } else if (/webflow/i.test(combinedBody)) {
    platform = 'Webflow';
  } else if (/shopify/i.test(combinedBody)) {
    platform = 'Shopify';
  } else if (isPhp) {
    platform = 'Custom PHP Application';
  }

  // 2. Security Headers & Vulnerabilities
  const vulns = [];
  if (isPhp) {
    if (xPoweredBy) {
      vulns.push(`Exposed PHP banner (${xPoweredBy}) leaking backend architecture to scrapers`);
    } else {
      vulns.push('PHP-backed CMS layer with potential plugin exploit surface');
    }
  }

  if (!headers['strict-transport-security']) {
    vulns.push('Missing HSTS (Strict-Transport-Security) header');
  }
  if (!headers['content-security-policy']) {
    vulns.push('Missing Content-Security-Policy (CSP) header');
  }
  if (!headers['x-frame-options']) {
    vulns.push('Missing X-Frame-Options (Clickjacking vulnerability)');
  }
  if (combinedBody.includes('jquery-1.') || combinedBody.includes('jquery/1.')) {
    vulns.push('Outdated legacy jQuery 1.x library with known XSS CVEs');
  }

  // 3. Visual & Copywriting Analysis
  const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : 'Accountancy Firm';

  const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let rawH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
  if (!rawH1 || rawH1.length > 120) {
    const h2Match = body.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    rawH1 = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : rawTitle;
  }

  // Check for generic copy
  const isGenericHeadline = /welcome|accountant|chartered|services|people who care|making sense/i.test(rawH1) && !/£|\d+%|specialist|tax advisory/i.test(rawH1);

  // 4. Forms & Intake Friction
  const hasForm = /<form/i.test(combinedBody);
  const hasOpenTextarea = /<textarea/i.test(combinedBody);
  const hasTurnoverQual = /turnover|revenue|income|budget|package|sole trader|limited company/i.test(combinedBody) && /<select|<input[^>]*type=["']radio["']/i.test(combinedBody);
  const hasCalendarBooking = /calendly\.com|acuityscheduling\.com|savvycal\.com|hubspot\.com\/meetings|chilipiper/i.test(combinedBody);
  const hasDirectTel = /href=["']tel:[^"']+["']/i.test(combinedBody);

  const frictions = [];
  if (hasOpenTextarea) {
    frictions.push('Open, unvalidated message textarea ("How can we help?") inviting low-margin tire-kickers');
  }
  if (!hasTurnoverQual) {
    frictions.push('Zero pre-qualification for Ltd Co turnover or fee brackets before submitting');
  }
  if (!hasCalendarBooking) {
    frictions.push('No direct calendar booking hold—relies on manual email back-and-forth');
  }
  if (isPhp) {
    frictions.push(`Monolithic ${platform} backend with slower server response time`);
  }
  if (isGenericHeadline) {
    frictions.push('Generic hero proposition that blends in with local commodity bookkeepers');
  }

  // 5. Plain-English Synthesis
  let observableFlaw = '';
  if (hasOpenTextarea && !hasTurnoverQual && !hasCalendarBooking) {
    observableFlaw = `Mobile intake uses an unvalidated open message box with zero turnover qualification and no calendar booking hold (running on ${platform}).`;
  } else if (!hasCalendarBooking && !hasTurnoverQual) {
    observableFlaw = `Contact intake lacks turnover pre-qualification and forces prospective Ltd Co clients into email ping-pong instead of an instant scoping call hold.`;
  } else if (!hasForm) {
    observableFlaw = `Homepage lacks direct intake capture—forcing mobile visitors to dig for an email link or dial during busy client hours.`;
  } else {
    observableFlaw = `Mobile conversion flow is constrained by a legacy ${platform} intake with unvetted contact submission.`;
  }

  const commercialOutcome = 'High-turnover Ltd Co directors searching out of hours drop off to competing practices with instant scheduling, while partners waste billable hours manually qualifying enquiries over email.';
  const concreteFix = 'Interactive 60-second client intake scoper pre-qualifying Ltd Co turnover with direct calendar sync and sub-400ms mobile speed.';

  // Determine Grade
  let grade = 'C';
  if (frictions.length >= 4 || isPhp) grade = 'D+';
  if (frictions.length >= 5) grade = 'D';
  if (!hasForm && !hasDirectTel) grade = 'F';

  return {
    status: 'complete',
    techStack: platform,
    server,
    xPoweredBy,
    isPhp,
    phpEvidence,
    vulnerabilities: vulns.join('; ') || 'Standard security posture',
    observableFlaw,
    commercialOutcome,
    concreteFix,
    grade,
    gradeReason: `${frictions.length} conversion and intake leaks detected on ${platform}`,
    frictionCount: frictions.length,
    frictions,
    headline: rawH1 || rawTitle,
    title: rawTitle,
    hasOpenTextarea,
    hasTurnoverQual,
    hasCalendarBooking,
    hasDirectTel,
  };
}

async function auditLead(lead) {
  const businessName = lead.business_name || lead.name || 'Accountancy Practice';
  const partnerName = lead.name && lead.name !== 'Practice Partners' && lead.name !== 'Practice Director'
    ? lead.name
    : lead.scraped_metadata?.director_name || lead.scraped_metadata?.partner_name || null;
  const rawUrl = lead.website || lead.scraped_metadata?.website;

  console.log(`\n🔍 Auditing: [${businessName}] (${rawUrl || 'NO URL'})`);

  if (!rawUrl || rawUrl === 'None' || rawUrl === 'null' || rawUrl === 'NO WEBSITE') {
    const noSiteFlaw = 'Zero digital intake portal or mobile presence—relying entirely on word-of-mouth or legacy directory listings.';
    const noSiteConsequence = 'Complete invisibility to high-turnover Ltd Co founders searching online; zero mechanism to capture out-of-hours enquiries.';
    const noSiteFix = 'Turnkey high-converting practice website with automated 60-second intake scoper and direct calendar sync.';
    const noSiteHook = partnerName
      ? `Hi ${partnerName}, Gurtej here from Mercian Wealth. I noticed ${businessName} currently has no direct web intake portal—are your partners relying purely on referrals, or are prospective Ltd Co clients unable to find and book with you online?`
      : `Good morning, Gurtej here from Mercian Wealth. I noticed ${businessName} has no direct web intake portal—are your partners relying purely on referrals, or are you looking to capture high-fee Ltd Co clients searching online?`;

    const notes = [
      `• VERIFIED FLAW: ${noSiteFlaw}`,
      `• COMMERCIAL LEVER: ${noSiteConsequence}`,
      `• TECH STACK & VULNERABILITIES: No website / Offline`,
      `• ARCHITECTURE FIX: ${noSiteFix}`,
      `• CALL HOOK: ${noSiteHook}`,
    ].join('\n');

    const meta = {
      ...(lead.scraped_metadata || {}),
      observable_problem: noSiteFlaw,
      friction_title: 'No Digital Inbound Intake Portal',
      commercial_outcome: noSiteConsequence,
      concreteFix: noSiteFix,
      tech_stack: 'None / Offline',
      vulnerabilities: 'No web presence',
      stack_summary: 'No Website Registered',
      grade: 'F',
      grade_reason: 'No website or intake portal',
      friction_count: 3,
      audit_status: 'complete',
      last_audited_at: new Date().toISOString(),
    };

    await supabase.from('leads').update({ notes, scraped_metadata: meta }).eq('id', lead.id);
    console.log(`✅ Updated [${businessName}] (No Website Registered)`);
    return { name: businessName, url: 'None', status: 'No Website', grade: 'F' };
  }

  // 1. Fetch homepage
  const homeResp = await fetchUrl(rawUrl);

  // 2. Fetch contact page if homepage has no form
  let contactResp = null;
  if (homeResp.ok && !/<form/i.test(homeResp.body || '')) {
    try {
      const parsed = new URL(homeResp.finalUrl || rawUrl);
      const contactUrls = [
        new URL('/contact', parsed.origin).href,
        new URL('/contact-us', parsed.origin).href,
        new URL('/get-in-touch', parsed.origin).href,
      ];
      for (const cu of contactUrls) {
        const cr = await fetchUrl(cu);
        if (cr.ok && /<form/i.test(cr.body || '')) {
          contactResp = cr;
          break;
        }
      }
    } catch {
      // ignore
    }
  }

  // 3. Analyze Forensics
  const forensics = analyzeForensics(homeResp, contactResp);

  // 4. Construct Call Hook
  const callHook = partnerName
    ? `Hi ${partnerName}, Gurtej here from Mercian Wealth. I'll be very brief as I know you're in the middle of client books.\n\nI was reviewing ${businessName} on mobile earlier. Your firm's credentials look top tier, but I noticed something specific regarding your mobile contact intake: ${forensics.observableFlaw}\n\nAhead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email, or do you have a system in place that handles that automatically?`
    : `Good morning, Gurtej here from Mercian Wealth. I'll be very brief—I was reviewing ${businessName} on mobile earlier. Your practice credentials look top tier, but I noticed something specific on your mobile intake: ${forensics.observableFlaw}\n\nAhead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email, or do you have a system that handles that automatically?`;

  // 5. Format Notes
  const notes = [
    `• VERIFIED FLAW: ${forensics.observableFlaw}`,
    `• COMMERCIAL LEVER: ${forensics.commercialOutcome}`,
    `• TECH STACK & VULNERABILITIES: ${forensics.techStack} | ${forensics.vulnerabilities}`,
    `• ARCHITECTURE FIX: ${forensics.concreteFix}`,
    `• CALL HOOK: ${callHook}`,
  ].join('\n');

  // 6. Format Metadata
  const meta = {
    ...(lead.scraped_metadata || {}),
    observable_problem: forensics.observableFlaw,
    friction_title: forensics.observableFlaw.slice(0, 80),
    commercial_outcome: forensics.commercialOutcome,
    concrete_fix: forensics.concreteFix,
    tech_stack: forensics.techStack,
    vulnerabilities: forensics.vulnerabilities,
    stack_summary: `${forensics.techStack} (${forensics.isPhp ? 'PHP-based' : 'Modern'})`,
    copy_headline: forensics.headline,
    title: forensics.title,
    grade: forensics.grade,
    grade_reason: forensics.gradeReason,
    friction_count: forensics.frictionCount,
    frictions: forensics.frictions,
    has_open_textarea: forensics.hasOpenTextarea,
    has_turnover_qual: forensics.hasTurnoverQual,
    has_calendar_booking: forensics.hasCalendarBooking,
    audit_status: 'complete',
    last_audited_at: new Date().toISOString(),
  };

  const { error: updateError } = await supabase
    .from('leads')
    .update({ notes, scraped_metadata: meta })
    .eq('id', lead.id);

  if (updateError) {
    console.error(`❌ Error updating lead [${businessName}]:`, updateError.message);
  } else {
    console.log(`✅ [${forensics.grade}] [${businessName}] audited & saved | Stack: ${forensics.techStack} | Frictions: ${forensics.frictionCount}`);
  }

  return {
    name: businessName,
    url: rawUrl,
    grade: forensics.grade,
    techStack: forensics.techStack,
    observableFlaw: forensics.observableFlaw,
    frictions: forensics.frictions,
  };
}

async function runBatch() {
  console.log('====================================================');
  console.log('       MERCIAN WEALTH FORENSIC AUDIT ENGINE         ');
  console.log('====================================================');

  // 1. Fetch 14 fresh leads first
  const { data: freshLeads, error: freshErr } = await supabase
    .from('leads')
    .select('id, name, business_name, website, phone, email, status, notes, scraped_metadata')
    .eq('status', 'New');

  if (freshErr) {
    console.error('Error fetching fresh leads:', freshErr);
    process.exit(1);
  }

  console.log(`Step 1: Auditing 14 Fresh (New) Leads...`);
  const freshResults = [];
  for (const lead of freshLeads) {
    const res = await auditLead(lead);
    freshResults.push(res);
  }

  // 2. Fetch Contacted & Proposal Sent leads
  const { data: contactedLeads, error: contactErr } = await supabase
    .from('leads')
    .select('id, name, business_name, website, phone, email, status, notes, scraped_metadata')
    .in('status', ['Contacted', 'Proposal Sent']);

  if (contactErr) {
    console.error('Error fetching contacted leads:', contactErr);
    process.exit(1);
  }

  console.log(`\nStep 2: Auditing ${contactedLeads.length} Contacted / Proposal Sent Leads...`);
  const contactedResults = [];
  // Run with concurrency of 3 for speed and reliability
  const concurrency = 3;
  for (let i = 0; i < contactedLeads.length; i += concurrency) {
    const chunk = contactedLeads.slice(i, i + concurrency);
    const chunkRes = await Promise.all(chunk.map((l) => auditLead(l)));
    contactedResults.push(...chunkRes);
  }

  const allResults = [...freshResults, ...contactedResults];

  console.log('\n====================================================');
  console.log('               AUDIT ENGINE COMPLETED               ');
  console.log('====================================================');
  console.log(`Total Leads Audited: ${allResults.length}`);
  console.log(`Fresh Leads Audited: ${freshResults.length}`);
  console.log(`Contacted Leads Audited: ${contactedResults.length}`);

  const summaryPath = path.resolve(process.cwd(), 'audit_all_leads_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(allResults, null, 2));
  console.log(`Summary artifact written to: ${summaryPath}`);
}

runBatch().catch(console.error);
