const https = require('https');
const fs = require('fs');

async function fetchUrl(targetUrl) {
  return new Promise((resolve) => {
    https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 8000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function checkAbout() {
  console.log('--- Gondal About ---');
  const g = await fetchUrl('https://www.gondalaccountancy.co.uk/about');
  if (g.data) {
    fs.writeFileSync('gondal_about.html', g.data);
    const text = g.data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log('Gondal text sample:', text.slice(0, 500));
    const names = text.match(/(?:director|founder|partner|principal|accountant)[^\.\,\;]{0,50}/gi) || [];
    console.log('Gondal roles:', names.slice(0, 5));
  }

  console.log('\n--- RK About ---');
  const rk = await fetchUrl('https://rk-accountancy.co.uk/about/');
  if (rk.data) {
    fs.writeFileSync('rk_about.html', rk.data);
    const text = rk.data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log('RK text sample:', text.slice(0, 500));
    const names = text.match(/(?:director|founder|partner|principal|accountant)[^\.\,\;]{0,50}/gi) || [];
    console.log('RK roles:', names.slice(0, 5));
  }
}

checkAbout();
