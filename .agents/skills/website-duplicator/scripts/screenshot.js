const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { getCliArg, parseRouteList, isStaticAssetPath } = require('./utils');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.resolve(PROJECT_ROOT, 'screenshots');

function slugFromPath(urlPath) {
  const slug = urlPath.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '');
  return slug || 'home';
}

async function discoverPaths(page, baseUrl, limit) {
  const homeUrl = new URL('/', baseUrl).toString();
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
  const found = await page.evaluate(() => {
    const routes = [];
    document.querySelectorAll('a[href]').forEach(a => {
      try {
        const u = new URL(a.href, window.location.href);
        if (u.origin === window.location.origin) routes.push(u.pathname);
      } catch (e) {}
    });
    return routes;
  });
  const unique = [];
  for (const route of found) {
    if (!route || route === '/' || isStaticAssetPath(route)) continue;
    if (!unique.includes(route)) unique.push(route);
    if (unique.length >= limit) break;
  }
  return unique;
}

async function captureScreenshots(baseUrl, prefix = 'live', pagesToCapture = null) {
  if (!baseUrl) {
    throw new Error('A base URL is required');
  }
  if (!/^https?:\/\//i.test(baseUrl)) {
    baseUrl = `https://${baseUrl}`;
  }

  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  console.log(`[Screenshots] Capturing visual snapshots for ${baseUrl} (prefix: ${prefix})...`);

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
      args: ['--enable-webgl', '--enable-webgl2', '--no-sandbox']
    });
  } catch (e) {
    browser = await chromium.launch({
      headless: true,
      args: ['--enable-webgl', '--enable-webgl2', '--no-sandbox']
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  let pages = pagesToCapture;
  if (!pages || pages.length === 0) {
    let extra = [];
    try {
      extra = await discoverPaths(page, baseUrl, 3);
    } catch (err) {
      console.warn(`[Screenshots] Route discovery failed: ${err.message}`);
    }
    const paths = ['/', ...extra];
    pages = paths.map((urlPath, index) => ({
      path: urlPath,
      name: `${String(index + 1).padStart(2, '0')}_${slugFromPath(urlPath)}`
    }));
  }

  const results = [];

  for (const item of pages) {
    const fullUrl = new URL(item.path, baseUrl).toString();
    console.log(`[Screenshots] Loading ${fullUrl}...`);
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await page.waitForTimeout(5000);
      await page.mouse.move(500, 400);
      await page.waitForTimeout(1000);

      const filename = `${prefix}_${item.name}.png`;
      const localPath = path.join(SCREENSHOTS_DIR, filename);
      await page.screenshot({ path: localPath, fullPage: false });

      console.log(`[Screenshots] Saved snapshot: ${filename}`);
      results.push({
        name: item.name,
        filename,
        localPath
      });
    } catch (err) {
      console.warn(`[Screenshots] Failed to capture ${item.path}:`, err.message);
    }
  }

  await browser.close();
  return results;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const positional = args.filter((arg, index) => !arg.startsWith('--') && (index === 0 || !args[index - 1].startsWith('--')));
  const urlArg = getCliArg('--url', positional.find(part => /^https?:\/\//i.test(part)) || '');
  const prefixArg = getCliArg('--prefix', positional.find(part => !/^https?:\/\//i.test(part)) || 'live');
  const pathArg = getCliArg('--paths', '');
  if (!urlArg) {
    console.error('Usage: node scripts/screenshot.js --url https://example.com [--prefix live] [--paths /,/pricing]');
    process.exit(1);
  }
  const explicitPaths = parseRouteList(pathArg);
  const pages = pathArg
    ? ['/', ...explicitPaths.filter(p => p !== '/')].filter((p, i, all) => all.indexOf(p) === i).map((urlPath, index) => ({
      path: urlPath,
      name: `${String(index + 1).padStart(2, '0')}_${slugFromPath(urlPath)}`
    }))
    : null;
  captureScreenshots(urlArg, prefixArg, pages).catch(err => {
    console.error('Screenshot capture failed:', err);
    process.exit(1);
  });
}

module.exports = { captureScreenshots };
