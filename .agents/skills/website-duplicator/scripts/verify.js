const { chromium } = require('playwright');
const path = require('path');
const url = require('url');
const { startServer } = require('./serve');
const { getCliArg, readJsonArray, inferOrigin, parseRouteList, isStaticAssetPath } = require('./utils');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MIRROR_DIR = path.resolve(PROJECT_ROOT, 'mirror');
const MANIFEST_PATH = path.resolve(PROJECT_ROOT, 'manifest.json');

const PORT = parseInt(getCliArg('--port', '8085'), 10);
const HEADLESS = getCliArg('--headless', 'true') !== 'false';
const EXTRA_ROUTES = parseRouteList(getCliArg('--routes', ''));
const origin = inferOrigin(getCliArg('--url', '') || getCliArg('--target-host', ''), readJsonArray(MANIFEST_PATH));
const TARGET_HOST = origin ? new URL(origin).host : '';

async function verify() {
  if (!TARGET_HOST) {
    console.error('Usage: node scripts/verify.js --url https://example.com [--port 8085] [--routes /pricing]');
    console.error('Or run a capture first so manifest.json records the site origin.');
    process.exit(1);
  }

  console.log('='.repeat(70));
  console.log(`Starting Playwright Mirror Verification Mode`);
  console.log(`Verifying target original host: ${TARGET_HOST}`);
  console.log(`Mirror directory: ${MIRROR_DIR}`);
  console.log(`Local test port: ${PORT}`);
  console.log('='.repeat(70));

  let server;
  try {
    server = await startServer(PORT, MIRROR_DIR);
  } catch (err) {
    console.error(`Failed to start local server on port ${PORT}:`, err.message);
    process.exit(1);
  }

  const localBaseUrl = `http://localhost:${PORT}`;
  const externalLeaks = [];
  const targetHostLeaks = [];
  const notFoundErrors = [];
  const pageErrors = [];
  const successfulLocalRequests = [];

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: HEADLESS,
      args: [
        '--enable-webgl',
        '--enable-webgl2',
        '--ignore-certificate-errors',
        '--autoplay-policy=no-user-gesture-required',
        '--no-sandbox'
      ]
    });
    console.log('[Browser] Google Chrome channel active for verification.');
  } catch (e) {
    console.log('[Browser] Chrome channel unavailable, launching Chromium.', e.message);
    browser = await chromium.launch({
      headless: HEADLESS,
      args: ['--enable-webgl', '--enable-webgl2', '--no-sandbox']
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Monitor outgoing requests to detect external leaks
  page.on('request', (req) => {
    const reqUrl = req.url();
    if (reqUrl.startsWith('data:') || reqUrl.startsWith('blob:')) {
      return;
    }

    try {
      const parsed = new url.URL(reqUrl);
      const isLocal = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';

      if (!isLocal) {
        externalLeaks.push({
          url: reqUrl,
          resourceType: req.resourceType(),
          method: req.method()
        });

        const host = parsed.hostname.toLowerCase();
        const target = TARGET_HOST.toLowerCase().split(':')[0];
        if (host === target || host.endsWith(`.${target}`)) {
          targetHostLeaks.push({
            url: reqUrl,
            resourceType: req.resourceType()
          });
          console.warn(`[LEAK DETECTED!] Request to original host: ${reqUrl}`);
        } else {
          console.log(`[External Outbound] Request to third-party: ${reqUrl}`);
        }
      }
    } catch (e) {}
  });

  // Monitor responses to detect 404s
  page.on('response', (res) => {
    const resUrl = res.url();
    const status = res.status();

    if (resUrl.startsWith(localBaseUrl)) {
      if (status === 404) {
        notFoundErrors.push({ url: resUrl, status });
        console.warn(`[404 NOT FOUND] Local asset missing: ${resUrl}`);
      } else if (status >= 200 && status < 400) {
        successfulLocalRequests.push({ url: resUrl, status });
      }
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  console.log(`\n[Test] Navigating to mirrored site at ${localBaseUrl}/ ...`);
  try {
    await page.goto(`${localBaseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (err) {
    console.error(`Failed to load mirrored site:`, err.message);
  }

  // Wait for initial scripts & WebGL shaders to compile
  console.log(`[Test] Waiting for local assets & WebGL initialization...`);
  await page.waitForTimeout(6000);

  // Perform interaction tests to verify local interactivity
  console.log(`[Test] Simulating interactions on mirrored site...`);
  const viewport = page.viewportSize() || { width: 1920, height: 1080 };
  for (let x = 200; x < viewport.width; x += 300) {
    await page.mouse.move(x, 400);
    await page.waitForTimeout(80);
  }

  // Check canvas status
  const canvasInfo = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    return {
      count: canvases.length,
      sizes: canvases.map(c => ({ width: c.width, height: c.height }))
    };
  });

  console.log(`[Test] Canvas status:`, canvasInfo);

  let routes = EXTRA_ROUTES;
  if (routes.length === 0) {
    routes = await page.evaluate(() => {
      const found = [];
      document.querySelectorAll('a[href]').forEach(a => {
        try {
          const u = new URL(a.href, window.location.href);
          if (u.origin !== window.location.origin) return;
          if (u.pathname === '/' || found.includes(u.pathname)) return;
          found.push(u.pathname);
        } catch (e) {}
      });
      return found;
    });
    routes = routes.filter(route => !isStaticAssetPath(route)).slice(0, 3);
  }

  if (routes.length === 0) {
    console.log(`[Test] No extra routes to visit.`);
  }
  for (const route of routes) {
    console.log(`[Test] Testing navigation to ${route}...`);
    try {
      await page.goto(`${localBaseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(4000);
    } catch (e) {
      console.warn(`[Test] ${route} navigation warning:`, e.message);
    }
  }

  await browser.close();
  server.close();

  // Print Verification Report
  console.log('\n' + '='.repeat(70));
  console.log('VERIFICATION REPORT');
  console.log('='.repeat(70));
  console.log(`Successful Local Requests:    ${successfulLocalRequests.length}`);
  console.log(`Original Host Leaks (${TARGET_HOST}): ${targetHostLeaks.length}`);
  console.log(`Other External Requests:      ${externalLeaks.length - targetHostLeaks.length}`);
  console.log(`404 Not Found Errors:         ${notFoundErrors.length}`);
  console.log(`Canvas Elements Detected:     ${canvasInfo.count}`);
  console.log(`Page Errors:                  ${pageErrors.length}`);

  if (targetHostLeaks.length > 0) {
    console.log('\n[FAIL] Outbound requests to original target host were detected:');
    targetHostLeaks.forEach((item, idx) => {
      console.log(`  ${idx + 1}. [${item.resourceType}] ${item.url}`);
    });
  } else {
    console.log('\n[PASS] ZERO requests attempted to reach the original host.');
  }

  if (notFoundErrors.length > 0) {
    console.log('\nMissing Local Assets (404s):');
    notFoundErrors.slice(0, 10).forEach((item, idx) => {
      console.log(`  ${idx + 1}. ${item.url}`);
    });
    if (notFoundErrors.length > 10) {
      console.log(`  ... and ${notFoundErrors.length - 10} more`);
    }
  }

  console.log('='.repeat(70));

  const passed = targetHostLeaks.length === 0 && notFoundErrors.length === 0;
  return {
    passed,
    targetHostLeaks,
    externalLeaks,
    notFoundErrors,
    canvasInfo
  };
}

if (require.main === module) {
  verify().then(res => {
    if (!res.passed) {
      console.log('Verification finished with warnings or issues. Review report above.');
    } else {
      console.log('Verification PASSED successfully!');
    }
  }).catch(err => {
    console.error('Fatal verification error:', err);
    process.exit(1);
  });
}

module.exports = { verify };
