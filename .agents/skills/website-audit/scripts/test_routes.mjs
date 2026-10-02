const routes = [
  '/',
  '/pricing',
  '/contact',
  '/services',
  '/portfolio',
  '/testimonials',
  '/book',
  '/process',
  '/privacy',
  '/terms',
  '/diagnostics',
  '/login',
  '/signup',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.webmanifest'
];

async function checkRoutes() {
  console.log('Testing Key Routes against http://localhost:3000:\n');
  let pass = 0;
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      const ok = res.status >= 200 && res.status < 400;
      if (ok) pass++;
      console.log(`[${ok ? 'PASS' : 'WARN'}] ${r.padEnd(25)} HTTP ${res.status} (${res.headers.get('content-type') || 'no type'})`);
    } catch (err) {
      console.log(`[FAIL] ${r.padEnd(25)} ${err.message}`);
    }
  }
  console.log(`\nRoute Health Summary: ${pass} / ${routes.length} routes healthy.`);
}

checkRoutes();
