const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const {
  urlToLocalPath,
  writeMirrorFile,
  isIgnoredAnalyticsUrl,
  parseRouteList,
  isStaticAssetPath
} = require('./utils');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MIRROR_DIR = path.resolve(PROJECT_ROOT, 'mirror');
const MANIFEST_PATH = path.resolve(PROJECT_ROOT, 'manifest.json');

// Parse CLI arguments
const args = process.argv.slice(2);
function getArg(flag, defaultValue) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const TARGET_URL = getArg('--url', '');
const HEADLESS = getArg('--headless', 'true') !== 'false';
const EXTRA_ROUTES = parseRouteList(getArg('--routes', ''));
const MAX_ROUTES = parseInt(getArg('--max-routes', '40'), 10);

const TEXT_SCAN_EXT = new Set(['.html', '.htm', '.js', '.mjs', '.json', '.css', '.svg', '.glsl', '.vs', '.fs']);

function collectReferencedAssetUrls(content, targetOrigin) {
  const normalized = content.replace(/\\\//g, '/');
  const found = new Set();
  const candidates = normalized.match(/https?:\/\/[^\s"'<>\\)]+|\/\/[^\s"'<>\\)]+|["']\/[^"']+["']/g) || [];
  for (let raw of candidates) {
    raw = raw.replace(/^["']|["']$/g, '').replace(/[),.;]+$/, '');
    try {
      let absolute = raw;
      if (raw.startsWith('//')) absolute = `https:${raw}`;
      else if (raw.startsWith('/')) absolute = new URL(raw, targetOrigin).toString();
      const parsed = new URL(absolute);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') continue;
      if (!isStaticAssetPath(parsed.pathname)) continue;
      parsed.hash = '';
      found.add(parsed.toString());
    } catch (e) {}
  }
  return found;
}

async function capture() {
  if (!TARGET_URL) {
    console.error('Usage: node scripts/capture.js --url https://example.com [--headless true|false] [--routes /a,/b] [--max-routes 40]');
    process.exit(1);
  }
  let parsedTarget;
  try {
    parsedTarget = new URL(TARGET_URL);
  } catch (e) {
    console.error(`Invalid --url: ${TARGET_URL}`);
    process.exit(1);
  }

  console.log('='.repeat(70));
  console.log(`Starting Playwright Website Mirroring Tool`);
  console.log(`Target URL: ${parsedTarget.href}`);
  console.log(`Mirror Destination: ${MIRROR_DIR}`);
  console.log(`Headless: ${HEADLESS}`);
  console.log('='.repeat(70));

  fs.mkdirSync(MIRROR_DIR, { recursive: true });

  const targetOrigin = parsedTarget.origin;
  const manifestMap = new Map();
  const capturedUrls = new Set();
  const pendingSaves = new Set();

  // Try system Chrome first for maximal WebGL/codec support, then fallback
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
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--no-sandbox'
      ]
    });
    console.log('[Browser] Successfully launched Google Chrome channel.');
  } catch (err) {
    console.log('[Browser] Google Chrome channel launch failed, using default Chromium.', err.message);
    browser = await chromium.launch({
      headless: HEADLESS,
      args: [
        '--enable-webgl',
        '--enable-webgl2',
        '--ignore-certificate-errors',
        '--no-sandbox'
      ]
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    deviceScaleFactor: 1,
    hasTouch: false,
    ignoreHTTPSErrors: true
  });

  // Attach response listener to context so popups/workers/iframes are captured
  context.on('response', async (response) => {
    const resUrl = response.url();

    // Skip data: or blob: or ignored analytics
    if (resUrl.startsWith('data:') || resUrl.startsWith('blob:') || isIgnoredAnalyticsUrl(resUrl)) {
      return;
    }

    const status = response.status();
    // Only capture successful responses (200-299, 304)
    if ((status < 200 || status > 299) && status !== 304) {
      return;
    }

    const savePromise = (async () => {
      try {
        const headers = response.headers();
        const mimeType = (headers['content-type'] || '').split(';')[0].trim().toLowerCase();
        const resourceType = response.request().resourceType();

        let buffer;
        if (status === 206) {
          // Range request / partial content - fetch full stream using request context
          try {
            const fullRes = await context.request.get(resUrl);
            buffer = await fullRes.body();
          } catch (e) {
            buffer = await response.body().catch(() => null);
          }
        } else {
          buffer = await response.body().catch(async (e) => {
            // If body stream closed, try request context fetch
            try {
              const fullRes = await context.request.get(resUrl);
              return await fullRes.body();
            } catch (err) {
              return null;
            }
          });
        }

        if (!buffer || buffer.length === 0) {
          return;
        }

        const relativePath = urlToLocalPath(resUrl, targetOrigin, mimeType);
        writeMirrorFile(MIRROR_DIR, relativePath, buffer);

        const manifestKey = resUrl;
        const entry = {
          url: resUrl,
          status: status === 206 ? 200 : status,
          mimeType: mimeType || 'application/octet-stream',
          resourceType: resourceType || 'other',
          localFile: path.posix.join('mirror', relativePath),
          size: buffer.length
        };

        manifestMap.set(manifestKey, entry);
        capturedUrls.add(resUrl);

        const shortUrl = resUrl.length > 75 ? resUrl.slice(0, 72) + '...' : resUrl;
        console.log(`[Captured] (${entry.resourceType.padEnd(8)}) ${shortUrl} -> ${relativePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`[Error] Failed to capture ${resUrl}:`, err.message);
      }
    })();

    pendingSaves.add(savePromise);
    savePromise.finally(() => pendingSaves.delete(savePromise));
  });

  const page = await context.newPage();

  console.log(`\n[Navigation] Loading ${TARGET_URL}...`);
  try {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
  } catch (e) {
    console.warn(`[Navigation] Initial goto warning: ${e.message}`);
  }

  // Wait for initial network settling
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(5000);

  // Interaction Routine Helper
  async function performInteractions(activePage, pageName = 'Home') {
    console.log(`\n--- Interacting with page: ${pageName} ---`);

    // 1. Mouse movements across screen (triggers WebGL parallax & particle shaders)
    console.log(`[Interaction] Simulating mouse movements across canvas...`);
    const viewport = activePage.viewportSize() || { width: 1920, height: 1080 };
    const stepX = Math.floor(viewport.width / 5);
    const stepY = Math.floor(viewport.height / 5);

    for (let x = 100; x < viewport.width; x += stepX) {
      for (let y = 100; y < viewport.height; y += stepY) {
        await activePage.mouse.move(x, y, { steps: 5 });
        await activePage.waitForTimeout(60);
      }
    }

    // 2. Click & drag slightly on canvas
    await activePage.mouse.move(viewport.width / 2, viewport.height / 2);
    await activePage.mouse.down();
    await activePage.mouse.move(viewport.width / 2 + 100, viewport.height / 2 + 80, { steps: 10 });
    await activePage.mouse.up();
    await activePage.waitForTimeout(1000);

    // 3. Smooth scrolling down and up
    console.log(`[Interaction] Scrolling document to reveal lazy-loaded assets...`);
    await activePage.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 250;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight || 3000;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            // scroll back up
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(resolve, 800);
          }
        }, 120);
      });
    }).catch(() => {});

    // 4. Keyboard navigation (ArrowDown / ArrowUp for 3D slide transitions)
    console.log(`[Interaction] Pressing navigation keys (ArrowDown, ArrowUp)...`);
    for (let i = 0; i < 4; i++) {
      await activePage.keyboard.press('ArrowDown');
      await activePage.waitForTimeout(800);
    }
    for (let i = 0; i < 4; i++) {
      await activePage.keyboard.press('ArrowUp');
      await activePage.waitForTimeout(600);
    }

    // 5. Let animations & WebAssembly transcoders settle
    await activePage.waitForTimeout(3000);
  }

  // Initial interaction on Home
  await performInteractions(page, 'Home');

  // Discover same-origin routes and links
  console.log(`\n[Discovery] Scanning for internal routes and navigation elements...`);
  const discoveredRoutes = await page.evaluate((origin) => {
    const routes = new Set();
    // Scan all anchor tags
    document.querySelectorAll('a[href]').forEach(a => {
      try {
        const u = new URL(a.href, window.location.href);
        if (u.origin === origin && !u.pathname.includes('#')) {
          routes.add(u.pathname);
        }
      } catch (e) {}
    });

    // Check data-route or navigation buttons
    document.querySelectorAll('[data-route], [data-path], [data-href]').forEach(el => {
      const val = el.getAttribute('data-route') || el.getAttribute('data-path') || el.getAttribute('data-href');
      if (val && val.startsWith('/')) {
        routes.add(val);
      }
    });

    return Array.from(routes);
  }, targetOrigin);

  let allRoutes = Array.from(new Set([...discoveredRoutes, ...EXTRA_ROUTES]))
    .filter(r => r && r !== '/' && !isStaticAssetPath(r));
  if (MAX_ROUTES > 0 && allRoutes.length > MAX_ROUTES) {
    console.log(`[Discovery] Limiting ${allRoutes.length} routes to --max-routes ${MAX_ROUTES}`);
    allRoutes = allRoutes.slice(0, MAX_ROUTES);
  }

  console.log(`[Discovery] Routes to visit:`, allRoutes);

  // Visit routes
  for (const route of allRoutes) {
    const routeUrl = new URL(route, targetOrigin).toString();
    console.log(`\n[Crawler] Visiting route: ${routeUrl}`);
    try {
      await page.goto(routeUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForLoadState('networkidle').catch(() => {});
      await page.waitForTimeout(3000);
      await performInteractions(page, route);
    } catch (e) {
      console.warn(`[Crawler] Warning visiting route ${route}:`, e.message);
    }
  }

  // Final wait for any pending saves and network idle
  console.log(`\n[Finalizing] Waiting for in-flight requests...`);
  await Promise.all(Array.from(pendingSaves));

  // Asset enrichment: fetch static files referenced in captured text but never requested.
  console.log(`\n[Enrichment] Scanning captured text for referenced assets...`);
  try {
    const urlsToEnrich = new Set();

    function scanDirForReferences(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const f of files) {
        const full = path.join(dir, f.name);
        if (f.isDirectory()) scanDirForReferences(full);
        else if (TEXT_SCAN_EXT.has(path.extname(f.name).toLowerCase())) {
          try {
            const content = fs.readFileSync(full, 'utf8');
            for (const candidate of collectReferencedAssetUrls(content, targetOrigin)) {
              if (isIgnoredAnalyticsUrl(candidate)) continue;
              const withoutQuery = candidate.split('?')[0];
              if (!capturedUrls.has(candidate) && !capturedUrls.has(withoutQuery)) {
                urlsToEnrich.add(withoutQuery);
              }
            }
          } catch (e) {}
        }
      }
    }

    scanDirForReferences(MIRROR_DIR);
    console.log(`[Enrichment] Found ${urlsToEnrich.size} referenced assets to verify/fetch.`);

    let enrichedCount = 0;
    for (const enrichUrl of urlsToEnrich) {
      try {
        const res = await context.request.get(enrichUrl);
        if (res.status() === 200) {
          const body = await res.body();
          const headers = res.headers();
          const mimeType = (headers['content-type'] || '').split(';')[0].trim().toLowerCase();
          const relPath = urlToLocalPath(enrichUrl, targetOrigin, mimeType);
          writeMirrorFile(MIRROR_DIR, relPath, body);

          const entry = {
            url: enrichUrl,
            status: 200,
            mimeType: mimeType || 'application/octet-stream',
            resourceType: 'enriched',
            localFile: path.posix.join('mirror', relPath),
            size: body.length
          };
          manifestMap.set(enrichUrl, entry);
          capturedUrls.add(enrichUrl);
          enrichedCount++;
          if (enrichedCount <= 10 || enrichedCount % 20 === 0) {
            console.log(`[Enriched] ${enrichUrl.slice(0, 70)}... (${(body.length / 1024).toFixed(1)} KB)`);
          }
        }
      } catch (e) {
        // Silently skip unreachable or optional assets
      }
    }
    console.log(`[Enrichment] Successfully captured ${enrichedCount} additional referenced assets.`);
  } catch (err) {
    console.warn(`[Enrichment] Warning during enrichment pass:`, err.message);
  }

  await Promise.all(Array.from(pendingSaves));

  // Write manifest.json
  const manifestList = Array.from(manifestMap.values());
  manifestList.sort((a, b) => a.localFile.localeCompare(b.localFile));

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestList, null, 2), 'utf8');
  console.log(`\n[Manifest] Saved ${manifestList.length} items to ${MANIFEST_PATH}`);

  // Summary statistics
  const typeCounts = {};
  let totalBytes = 0;
  for (const item of manifestList) {
    typeCounts[item.resourceType] = (typeCounts[item.resourceType] || 0) + 1;
    totalBytes += item.size || 0;
  }

  console.log('\n' + '='.repeat(70));
  console.log('CAPTURE SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Assets Captured: ${manifestList.length}`);
  console.log(`Total Size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log('Resource Breakdown:');
  for (const [type, count] of Object.entries(typeCounts)) {
    console.log(`  - ${type.padEnd(15)}: ${count}`);
  }
  console.log('='.repeat(70));

  await browser.close();
  return manifestList;
}

if (require.main === module) {
  capture().catch(err => {
    console.error('Fatal capture error:', err);
    process.exit(1);
  });
}

module.exports = { capture, collectReferencedAssetUrls };
