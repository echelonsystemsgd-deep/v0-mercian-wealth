const https = require('https');

function getUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const chartHtml = await getUrl('https://chartaccountancy.com/');
  const chartLinks = chartHtml.match(/href="([^"]*)"/gi) || [];
  console.log('Chart Contact Links:', chartLinks.filter(l => l.toLowerCase().includes('contact') || l.toLowerCase().includes('book')).slice(0, 5));

  const dsHtml = await getUrl('https://www.deadsimpleaccounting.co.uk/about-us/');
  const dsText = dsHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log('Dead Simple about snippet:', dsText.slice(0, 500));

  const dsContactHtml = await getUrl('https://www.deadsimpleaccounting.co.uk/contact/');
  const dsContactText = dsContactHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log('Dead Simple contact snippet:', dsContactText.slice(0, 500));
}

run();
