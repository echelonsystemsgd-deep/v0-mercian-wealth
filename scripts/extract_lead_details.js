const https = require('https');

function getUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
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

async function extractDetails() {
  console.log('--- 1. CHART ACCOUNTANCY ---');
  const chartTeam = await getUrl('https://chartaccountancy.com/about-us/');
  const chartHome = await getUrl('https://chartaccountancy.com/');
  const chartContact = await getUrl('https://chartaccountancy.com/contact-us/');
  
  // Find names in chart about
  const cleanChartAbout = cleanText(chartTeam);
  const chartNameMatch = cleanChartAbout.match(/(?:founder|director|managing director|ceo|partner)[^.]{0,100}/gi);
  console.log('Chart leadership snippets:', chartNameMatch?.slice(0, 3));
  console.log('Chart contact clean snippet:', cleanText(chartContact).slice(0, 400));
  console.log('Chart forms:', chartHome.includes('<form'), chartContact.includes('<form'), chartHome.includes('calendly'));

  console.log('\n--- 2. BERKSHIRE ACCOUNTANTS ---');
  const berkAbout = await getUrl('https://berkshireaccountants.com/about-us/');
  const berkContact = await getUrl('https://berkshireaccountants.com/contact-us/');
  console.log('Berkshire leadership snippet:', cleanText(berkAbout).match(/(?:director|founder|accountant|shahzad)[^.]{0,100}/gi)?.slice(0, 3));
  console.log('Berkshire contact clean snippet:', cleanText(berkContact).slice(0, 400));
  console.log('Berkshire forms:', berkContact.includes('<form'), berkContact.includes('wpforms'), berkContact.includes('cf7'));

  console.log('\n--- 3. DEAD SIMPLE ACCOUNTING ---');
  const dsAbout = await getUrl('https://www.deadsimpleaccounting.co.uk/about-us/');
  const dsContact = await getUrl('https://www.deadsimpleaccounting.co.uk/contact/');
  console.log('Dead Simple leadership snippet:', cleanText(dsAbout).match(/(?:director|founder|accountant|team)[^.]{0,100}/gi)?.slice(0, 3));
  console.log('Dead Simple contact clean snippet:', cleanText(dsContact).slice(0, 400));
  console.log('Dead Simple forms/quote calculator:', dsContact.includes('<form'), dsContact.includes('typeform'), dsContact.includes('calendly'));
}

extractDetails();
