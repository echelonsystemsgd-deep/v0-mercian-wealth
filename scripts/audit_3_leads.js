const https = require('https');

function getUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function cleanText(html) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
             .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
             .replace(/<[^>]+>/g, ' ')
             .replace(/\s+/g, ' ');
}

async function run() {
  // 1. Chart Accountancy
  console.log('================== 1. CHART ACCOUNTANCY ==================');
  const chartHome = await getUrl('https://chartaccountancy.com/');
  const chartContact = await getUrl('https://chartaccountancy.com/contact-us/');
  const chartAbout = await getUrl('https://chartaccountancy.com/about-us/');
  const chartAll = cleanText(chartHome + chartContact + chartAbout);

  const chartPhones = (chartHome + chartContact).match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [];
  const chartEmails = (chartHome + chartContact).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  
  console.log('Phones:', [...new Set(chartPhones)]);
  console.log('Emails:', [...new Set(chartEmails)]);
  
  // Find partner/director names
  const chartPartners = chartAll.match(/(?:founder|director|partner|managing partner|chartered accountant)\s*[:\-–]?\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi) || [];
  console.log('Founders / Key People:', chartPartners.slice(0, 5));

  // Inspect hero & buttons
  const chartBtns = chartHome.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi) || [];
  console.log('Buttons Sample:', chartBtns.filter(b => b.toLowerCase().includes('contact') || b.toLowerCase().includes('book') || b.toLowerCase().includes('call') || b.toLowerCase().includes('get in touch')).slice(0, 5));

  // 2. Berkshire Accountants
  console.log('\n================== 2. BERKSHIRE ACCOUNTANTS ==================');
  const berkHome = await getUrl('https://berkshireaccountants.com/');
  const berkContact = await getUrl('https://berkshireaccountants.com/contact-us/');
  const berkAbout = await getUrl('https://berkshireaccountants.com/about-us/');
  const berkAll = cleanText(berkHome + berkContact + berkAbout);

  const berkPhones = (berkHome + berkContact).match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [];
  const berkEmails = (berkHome + berkContact).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  
  console.log('Phones:', [...new Set(berkPhones)]);
  console.log('Emails:', [...new Set(berkEmails)]);
  const berkPartners = berkAll.match(/(?:founder|director|partner|managing partner|chartered accountant)\s*[:\-–]?\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi) || [];
  console.log('Founders / Key People:', berkPartners.slice(0, 5));
  const berkBtns = berkHome.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi) || [];
  console.log('Buttons Sample:', berkBtns.filter(b => b.toLowerCase().includes('contact') || b.toLowerCase().includes('book') || b.toLowerCase().includes('quote') || b.toLowerCase().includes('get in touch')).slice(0, 5));

  // 3. Dead Simple Accounting
  console.log('\n================== 3. DEAD SIMPLE ACCOUNTING ==================');
  const dsHome = await getUrl('https://www.deadsimpleaccounting.co.uk/');
  const dsContact = await getUrl('https://www.deadsimpleaccounting.co.uk/contact-us/');
  const dsAbout = await getUrl('https://www.deadsimpleaccounting.co.uk/about-us/');
  const dsAll = cleanText(dsHome + dsContact + dsAbout);

  const dsPhones = (dsHome + dsContact).match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [];
  const dsEmails = (dsHome + dsContact).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  
  console.log('Phones:', [...new Set(dsPhones)]);
  console.log('Emails:', [...new Set(dsEmails)]);
  const dsPartners = dsAll.match(/(?:founder|director|partner|managing partner|chartered accountant)\s*[:\-–]?\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi) || [];
  console.log('Founders / Key People:', dsPartners.slice(0, 5));
  const dsBtns = dsHome.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi) || [];
  console.log('Buttons Sample:', dsBtns.filter(b => b.toLowerCase().includes('quote') || b.toLowerCase().includes('contact') || b.toLowerCase().includes('book') || b.toLowerCase().includes('get in touch')).slice(0, 5));
}

run();
