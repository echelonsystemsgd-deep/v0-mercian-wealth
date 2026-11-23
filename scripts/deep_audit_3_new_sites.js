const fs = require('fs');

async function auditSite(name, url, location) {
  console.log(`\n================== AUDITING: ${name} (${url}) ==================`);
  try {
    const start = Date.now();
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
      }
    });
    const ttfb = Date.now() - start;
    const status = res.status;
    const finalUrl = res.url;
    const headers = Object.fromEntries(res.headers.entries());
    const html = await res.text();

    console.log(`Status: ${status} | TTFB: ${ttfb}ms | Final URL: ${finalUrl}`);
    console.log(`Server: ${headers['server'] || 'Unknown'} | Caching: ${headers['cache-control'] || 'None'}`);

    // Security headers
    const secHeaders = {
      hsts: Boolean(headers['strict-transport-security']),
      csp: Boolean(headers['content-security-policy']),
      xfo: Boolean(headers['x-frame-options']),
      xcto: Boolean(headers['x-content-type-options']),
      referrer: headers['referrer-policy'] || 'missing'
    };
    console.log('Security Headers:', secHeaders);

    // Title & Meta
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || 'Missing Title';
    const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim() || 'Missing Meta Description';
    console.log(`Title (${title.length} chars): "${title}"`);
    console.log(`Meta Desc (${metaDesc.length} chars): "${metaDesc}"`);

    // Viewport
    const viewport = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i)?.[1] || 'Missing Viewport';
    console.log(`Viewport: "${viewport}"`);

    // Forms
    const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log(`Forms found on page: ${forms.length}`);
    forms.forEach((f, idx) => {
      const inputs = f.match(/<input[^>]*>/gi) || [];
      const textareas = f.match(/<textarea[^>]*>/gi) || [];
      const selects = f.match(/<select[\s\S]*?<\/select>/gi) || [];
      const visibleInputs = inputs.filter(i => !i.includes('type="hidden"') && !i.includes('type=\'hidden\''));
      console.log(` Form #${idx + 1}: ${visibleInputs.length} visible inputs, ${textareas.length} textareas, ${selects.length} selects. Total interactive: ${visibleInputs.length + textareas.length + selects.length}`);
    });

    // Phones & Emails
    const phones = [...new Set(html.match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [])];
    const emails = [...new Set((html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).filter(e => !e.includes('example.com') && !e.includes('wixpress.com') && !e.includes('sentry.io')))];
    console.log('Detected Phones:', phones);
    console.log('Detected Emails:', emails);

    // Check WordPress / CMS
    let cms = 'Custom / Unknown';
    if (html.includes('/wp-content/') || html.includes('wp-includes')) cms = 'WordPress';
    if (html.includes('elementor')) cms = 'WordPress + Elementor';
    if (html.includes('Divi')) cms = 'WordPress + Divi';
    if (html.includes('wix.com')) cms = 'Wix';
    if (html.includes('squarespace')) cms = 'Squarespace';
    console.log(`CMS / Platform: ${cms}`);

    return {
      name,
      url,
      finalUrl,
      status,
      ttfb,
      secHeaders,
      title,
      metaDesc,
      viewport,
      formsCount: forms.length,
      phones,
      emails,
      cms
    };
  } catch (err) {
    console.log(`Failed to audit ${url}: ${err.message}`);
    return { name, url, error: err.message };
  }
}

async function main() {
  const kilsby = await auditSite('Kilsby Williams', 'https://kilsbywilliams.com/', 'Newport');
  const salisburys = await auditSite('Salisburys', 'https://www.salisburys.com/', 'St Asaph');
  const fitzpatrick = await auditSite('Fitzpatrick & Kearney (Newry Independent Practice)', 'https://fitzpatrickandkearney.com/', 'Newry');
  const fpm = await auditSite('FPM / AAB (Newry Office)', 'https://fpmaab.com/', 'Newry');

  fs.writeFileSync('scripts/audit_3_sites_result.json', JSON.stringify({ kilsby, salisburys, fitzpatrick, fpm }, null, 2));
}

main();
