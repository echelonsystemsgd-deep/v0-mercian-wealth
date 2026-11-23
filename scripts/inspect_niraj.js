const fs = require('fs');

async function checkSite() {
  const url = 'https://www.niraj-jewellers.co.uk/';
  console.log('Fetching:', url);
  try {
    const start = Date.now();
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      redirect: 'follow'
    });
    const ttfb = Date.now() - start;
    console.log('Status:', res.status, 'TTFB:', ttfb + 'ms', 'Final URL:', res.url);
    const headers = Object.fromEntries(res.headers.entries());
    console.log('Server:', headers['server'] || 'Unknown');
    console.log('Content-Type:', headers['content-type']);
    const html = await res.text();
    console.log('HTML Length:', html.length);
    
    // Save raw html for inspection
    fs.writeFileSync('scripts/niraj_raw.html', html);

    // Title & Meta
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
    console.log('Description:', descMatch ? descMatch[1].trim() : 'N/A');

    // CMS & Framework clues
    let platform = 'Custom';
    if (html.includes('wp-content')) platform = 'WordPress';
    if (html.includes('shopify') || html.includes('cdn.shopify.com')) platform = 'Shopify';
    if (html.includes('wix.com')) platform = 'Wix';
    if (html.includes('squarespace')) platform = 'Squarespace';
    if (html.includes('prestashop')) platform = 'PrestaShop';
    if (html.includes('magento')) platform = 'Magento';
    if (html.includes('woocommerce')) platform += ' + WooCommerce';
    console.log('Detected Platform:', platform);

    // Viewport
    const vpMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i);
    console.log('Viewport:', vpMatch ? vpMatch[1] : 'Missing');

    // Phones, emails, addresses
    const phones = [...new Set(html.match(/(?:0\d{2,4}\s?\d{3,4}\s?\d{3,4}|\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4})/g) || [])];
    const emails = [...new Set(html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [])];
    console.log('Phones:', phones);
    console.log('Emails:', emails);

    // Postcodes / Locations
    const postcodes = [...new Set(html.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi) || [])];
    console.log('Postcodes:', postcodes);

    // Navigation links
    const links = (html.match(/href=["']([^"']+)["']/gi) || [])
      .map(m => m.replace(/^href=["']|["']$/gi, ''))
      .filter(l => !l.startsWith('#') && !l.startsWith('javascript:'));
    const uniqueLinks = [...new Set(links)];
    console.log('Total internal/external links:', uniqueLinks.length);
    console.log('Sample links:', uniqueLinks.slice(0, 15));

  } catch(e) {
    console.error('Fetch error:', e.message);
  }
}
checkSite();
