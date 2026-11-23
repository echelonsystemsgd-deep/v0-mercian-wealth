const fs = require('fs');

const key = '2aa4750f-6fb0-40d0-9473-f003ccca6185';
const auth = 'Basic ' + Buffer.from(key + ':').toString('base64');

async function checkCH(term) {
  try {
    const r = await fetch('https://api.company-information.service.gov.uk/search/companies?q=' + encodeURIComponent(term), {
      headers: { 'Authorization': auth }
    });
    const data = await r.json();
    return (data.items || []).slice(0, 3).map(i => ({
      title: i.title,
      company_number: i.company_number,
      status: i.company_status,
      address: i.address_snippet
    }));
  } catch(e) {
    return [];
  }
}

async function auditSite(name, url) {
  try {
    const start = Date.now();
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
      },
      redirect: 'follow'
    });
    const ttfb = Date.now() - start;
    const finalUrl = res.url;
    const status = res.status;
    const headers = Object.fromEntries(res.headers.entries());
    const html = await res.text();

    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || 'Missing Title';
    const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim() || 'Missing Meta';
    const viewport = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i)?.[1] || 'Missing Viewport';

    const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
    const formsDetails = forms.map((f, idx) => {
      const inputs = f.match(/<input[^>]*>/gi) || [];
      const textareas = f.match(/<textarea[^>]*>/gi) || [];
      const selects = f.match(/<select[\s\S]*?<\/select>/gi) || [];
      const visibleInputs = inputs.filter(i => !i.includes('type="hidden"') && !i.includes("type='hidden'"));
      return {
        formIdx: idx + 1,
        visibleInputs: visibleInputs.length,
        textareas: textareas.length,
        selects: selects.length,
        totalInteractive: visibleInputs.length + textareas.length + selects.length
      };
    });

    const phones = [...new Set(html.match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [])];
    const emails = [...new Set((html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).filter(e => !e.includes('wixpress.com') && !e.includes('sentry.io') && !e.includes('example.com') && !e.includes('schema.org')))];

    let cms = 'Custom / Unknown';
    if (html.includes('/wp-content/') || html.includes('wp-includes')) cms = 'WordPress';
    if (html.includes('elementor')) cms = 'WordPress + Elementor';
    if (html.includes('Divi')) cms = 'WordPress + Divi';
    if (html.includes('hubspot')) cms = 'HubSpot CMS';
    if (html.includes('next')) cms = 'Next.js';
    if (html.includes('drupal')) cms = 'Drupal';

    return {
      name,
      url,
      finalUrl,
      status,
      ttfb,
      server: headers['server'] || 'Unknown',
      title,
      metaDesc,
      viewport,
      formsCount: forms.length,
      formsDetails,
      phones,
      emails,
      cms
    };
  } catch(e) {
    return { name, url, error: e.message };
  }
}

async function run() {
  console.log('Auditing Batch 5 sites...');
  const bkplus = await auditSite('BK Plus / Dickson Middleton', 'https://bkplus.co.uk/?referrer=Dickson%20Middleton');
  const bkplusContact = await auditSite('BK Plus Contact', 'https://bkplus.co.uk/contact-us/');
  const gravitaOxford = await auditSite('Gravita Oxford (Formerly Critchleys)', 'https://www.gravita.com/locations/oxford/');
  const wennTownsend = await auditSite('Wenn Townsend Oxford (Independent Practice)', 'https://wenntownsend.co.uk/');
  const azets = await auditSite('Azets UK', 'https://www.azets.com/en-uk');
  const azetsContact = await auditSite('Azets Contact', 'https://www.azets.com/en-uk/contact-us');

  const chBk = await checkCH('BK Plus Limited');
  const chCritchleys = await checkCH('Critchleys LLP');
  const chWenn = await checkCH('Wenn Townsend');
  const chAzets = await checkCH('Azets Holdings Limited');

  const results = {
    bkplus,
    bkplusContact,
    gravitaOxford,
    wennTownsend,
    azets,
    azetsContact,
    companies_house: {
      chBk,
      chCritchleys,
      chWenn,
      chAzets
    }
  };

  fs.writeFileSync('scripts/batch_5_deep_audit_results.json', JSON.stringify(results, null, 2));
  console.log('Finished Batch 5 deep programmatic audit!');
}

run();
