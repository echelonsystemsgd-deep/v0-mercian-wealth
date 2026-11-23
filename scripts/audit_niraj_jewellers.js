const fs = require('fs');

const key = '2aa4750f-6fb0-40d0-9473-f003ccca6185';
const auth = 'Basic ' + Buffer.from(key + ':').toString('base64');

async function checkCH(term) {
  try {
    const r = await fetch('https://api.company-information.service.gov.uk/search/companies?q=' + encodeURIComponent(term), {
      headers: { 'Authorization': auth }
    });
    const data = await r.json();
    return (data.items || []).slice(0, 5).map(i => ({
      title: i.title,
      company_number: i.company_number,
      status: i.company_status,
      date_of_creation: i.date_of_creation,
      address: i.address_snippet
    }));
  } catch(e) {
    return [e.message];
  }
}

async function checkOfficers(companyNumber) {
  try {
    const r = await fetch(`https://api.company-information.service.gov.uk/company/${companyNumber}/officers`, {
      headers: { 'Authorization': auth }
    });
    const data = await r.json();
    return (data.items || []).map(o => ({
      name: o.name,
      officer_role: o.officer_role,
      appointed_on: o.appointed_on,
      resigned_on: o.resigned_on
    }));
  } catch(e) {
    return [e.message];
  }
}

async function auditSite() {
  const url = 'https://www.niraj-jewellers.co.uk/';
  console.log('Auditing', url);
  const start = Date.now();
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    }
  });
  const ttfb = Date.now() - start;
  const status = res.status;
  const headers = Object.fromEntries(res.headers.entries());
  const html = await res.text();

  // Basic headers
  const server = headers['server'] || 'Unknown';
  const caching = headers['cache-control'] || 'None';
  const secHeaders = {
    hsts: Boolean(headers['strict-transport-security']),
    csp: Boolean(headers['content-security-policy']),
    xfo: Boolean(headers['x-frame-options']),
    xcto: Boolean(headers['x-content-type-options']),
    referrer: headers['referrer-policy'] || 'missing'
  };

  // SEO & Meta
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || 'Missing Title';
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim() || 'Missing Meta Description';
  const viewport = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i)?.[1] || 'Missing Viewport';

  // Schema.org JSON-LD
  const schemas = (html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [])
    .map(s => {
      try {
        const clean = s.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        return JSON.parse(clean);
      } catch (e) {
        return 'Invalid JSON-LD';
      }
    });

  // CMS detection
  let cms = 'Custom / Unknown';
  if (html.includes('/wp-content/') || html.includes('wp-includes')) cms = 'WordPress';
  if (html.includes('elementor')) cms = 'WordPress + Elementor';
  if (html.includes('woocommerce')) cms += ' + WooCommerce';
  if (html.includes('shopify')) cms = 'Shopify';
  if (html.includes('wix.com')) cms = 'Wix';
  if (html.includes('squarespace')) cms = 'Squarespace';

  // Phone, email, address detection
  const phones = [...new Set(html.match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [])];
  const emails = [...new Set((html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).filter(e => !e.includes('schema.org') && !e.includes('wixpress.com') && !e.includes('sentry.io')))];

  // Links & forms
  const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
  const formDetails = forms.map((f, i) => {
    const inputs = f.match(/<input[^>]*>/gi) || [];
    const textareas = f.match(/<textarea[^>]*>/gi) || [];
    const visibleInputs = inputs.filter(inp => !inp.includes('type="hidden"') && !inp.includes("type='hidden'"));
    return {
      index: i + 1,
      visibleInputs: visibleInputs.length,
      textareas: textareas.length,
      action: f.match(/action=["']([^"']*)["']/i)?.[1] || ''
    };
  });

  const links = (html.match(/href=["'](https?:\/\/[^"']+|\/[^"']+)["']/gi) || [])
    .map(m => m.replace(/^href=["']|["']$/gi, ''));
  const subpages = [...new Set(links.filter(l => l.startsWith('/') && !l.startsWith('//') && l.length > 1 && !l.includes('.')))];

  console.log('Detected subpages:', subpages.slice(0, 10));

  // Companies House
  const chResults = await checkCH('Niraj Jewellers');
  let officers = [];
  if (chResults.length > 0 && chResults[0].company_number) {
    officers = await checkOfficers(chResults[0].company_number);
  }

  const result = {
    url,
    status,
    ttfb,
    server,
    caching,
    secHeaders,
    title,
    metaDesc,
    viewport,
    schemasCount: schemas.length,
    schemas,
    cms,
    phones,
    emails,
    formsCount: forms.length,
    formDetails,
    subpagesCount: subpages.length,
    subpagesSample: subpages.slice(0, 15),
    companies_house: {
      chResults,
      officers
    }
  };

  fs.writeFileSync('scripts/niraj_audit_result.json', JSON.stringify(result, null, 2));
  console.log('Saved audit result to scripts/niraj_audit_result.json');
}

auditSite();
