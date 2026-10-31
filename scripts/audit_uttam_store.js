const https = require('https');
const fs = require('fs');

const targetUrl = 'https://uttam-rasoi-store.vercel.app/';

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  const res = await fetchPage(targetUrl);
  console.log('HTTP Status:', res.statusCode || res.error);
  if (!res.body) return;

  fs.writeFileSync('scripts/uttam_store.html', res.body);
  console.log('Saved HTML, length:', res.body.length);

  // 1. Meta / SEO
  const title = res.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log('Title:', title ? title[1].trim() : 'NONE');

  const desc = res.body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log('Description:', desc ? desc[1].trim() : 'NONE');

  const viewport = res.body.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
  console.log('Viewport:', viewport ? viewport[1].trim() : 'NONE');

  // 2. Security Headers
  console.log('--- Security Headers ---');
  console.log('HSTS:', res.headers['strict-transport-security'] || 'MISSING');
  console.log('CSP:', res.headers['content-security-policy'] || 'MISSING');
  console.log('X-Frame-Options:', res.headers['x-frame-options'] || 'MISSING');
  console.log('X-Content-Type-Options:', res.headers['x-content-type-options'] || 'MISSING');

  // 3. Inspect Links and Anchors
  const links = res.body.match(/href=["']([^"']*)["']/gi) || [];
  console.log('Total Links:', links.length);
  const hashLinks = links.filter(l => l.includes('#'));
  console.log('Hash (#) Links count:', hashLinks.length);

  // 4. Inspect Images and Alt tags
  const imgs = res.body.match(/<img[^>]*>/gi) || [];
  console.log('Total Images:', imgs.length);
  const imgsNoAlt = imgs.filter(img => !img.includes('alt=') || img.includes('alt=""'));
  console.log('Images missing alt or empty alt:', imgsNoAlt.length);

  // 5. Inspect Buttons & Forms
  const buttons = res.body.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
  console.log('Buttons count:', buttons.length);

  const forms = res.body.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Forms count:', forms.length);

  // 6. Scripts / Bundles / Tech Stack
  const scripts = res.body.match(/<script[^>]*src=["']([^"']*)["'][^>]*>/gi) || [];
  console.log('External Scripts count:', scripts.length);
  console.log('Script tags:', scripts.slice(0, 5));

  // 7. Check for placeholder / dummy text
  const bodyText = res.body.toLowerCase();
  const placeholders = ['lorem ipsum', 'todo', 'placeholder', 'dummy', 'test@', 'example.com', 'user@domain.com'];
  const foundPlaceholders = placeholders.filter(p => bodyText.includes(p));
  console.log('Placeholder tokens found:', foundPlaceholders);
}

run();
