const fs = require('fs');
const path = require('path');
const { getCliArg, readJsonArray, inferOrigin } = require('./utils');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MIRROR_DIR = path.resolve(PROJECT_ROOT, 'mirror');
const MANIFEST_PATH = path.resolve(PROJECT_ROOT, 'manifest.json');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function listExternalHosts(mirrorDir) {
  const hosts = new Set();
  const root = path.join(mirrorDir, '_external');
  if (!fs.existsSync(root)) return [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isDirectory()) hosts.add(entry.name);
  }
  return [...hosts];
}

/**
 * Build literal host rewrites for one capture.
 * The site origin becomes a root-relative path.
 * Each captured third-party host becomes /_external/<host>/.
 */
function originHostsFromManifest(origin, manifest) {
  const hosts = new Set([new URL(origin).host]);
  for (const item of manifest) {
    const local = String(item && item.localFile || '').replace(/\\/g, '/');
    if (!item || !item.url || local.includes('_external/')) continue;
    try {
      hosts.add(new URL(item.url).host);
    } catch (e) {}
  }
  return [...hosts];
}

function buildHostRules(origin, externalHosts, extraOriginHosts = []) {
  const rules = [];
  const originHosts = new Set([new URL(origin).host, ...extraOriginHosts]);

  function addHost(host, slashReplacement, bareReplacement) {
    const escaped = escapeRegExp(host);
    rules.push({
      source: `https?:\\/\\/${escaped}\\/`,
      flags: 'g',
      to: slashReplacement
    });
    rules.push({
      source: `(^|[^\\w:])\\/\\/${escaped}\\/`,
      flags: 'g',
      to: `$1${slashReplacement}`
    });
    rules.push({
      source: `https?:\\/\\/${escaped}(?![\\w.-])`,
      flags: 'g',
      to: bareReplacement
    });
  }

  for (const host of originHosts) addHost(host, '/', '');
  for (const host of externalHosts) {
    if (originHosts.has(host)) continue;
    const prefix = `/_external/${host}`;
    addHost(host, `${prefix}/`, prefix);
  }
  return rules;
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function rewrite() {
  const manifest = readJsonArray(MANIFEST_PATH);
  const urlArg = getCliArg('--url', '') || getCliArg('--origin', '');
  const origin = inferOrigin(urlArg, manifest);
  if (!origin) {
    console.error('Usage: node scripts/rewrite.js --url https://example.com');
    console.error('Or run a capture first so manifest.json records the site origin.');
    process.exit(1);
  }

  const externalHosts = listExternalHosts(MIRROR_DIR);
  const rules = buildHostRules(origin, externalHosts, originHostsFromManifest(origin, manifest));

  console.log('='.repeat(70));
  console.log('Running Post-Capture Resource Rewriter');
  console.log(`Target Mirror Directory: ${MIRROR_DIR}`);
  console.log(`Site origin: ${origin}`);
  console.log(`External hosts: ${externalHosts.length ? externalHosts.join(', ') : '(none)'}`);
  console.log('='.repeat(70));

  if (!fs.existsSync(MIRROR_DIR)) {
    console.error(`Mirror directory does not exist: ${MIRROR_DIR}`);
    process.exit(1);
  }

  const allFiles = getAllFiles(MIRROR_DIR);
  console.log(`Found ${allFiles.length} files in mirror directory.`);

  const textExtensions = ['.html', '.htm', '.js', '.mjs', '.json', '.css', '.vs', '.fs', '.glsl', '.svg'];
  let modifiedCount = 0;
  let totalReplacements = 0;

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!textExtensions.includes(ext)) {
      continue;
    }

    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let fileModified = false;
      let fileReplacements = 0;

      // Neutralize common analytics tags so the mirror does not call home.
      if (ext === '.html') {
        const gtmRegex = /<script\b[^>]*src="https:\/\/www\.googletagmanager\.com[^>]*><\/script>/gi;
        if (gtmRegex.test(content)) {
          content = content.replace(gtmRegex, '<!-- GTM disabled for local mirror -->');
          fileModified = true;
          fileReplacements++;
        }

        const gaRegex = /gtag\('config',\s*['"][^'"]+['"]\);/gi;
        if (gaRegex.test(content)) {
          content = content.replace(gaRegex, '/* gtag config disabled */');
          fileModified = true;
          fileReplacements++;
        }
      }

      for (const rule of rules) {
        const pattern = new RegExp(rule.source, rule.flags);
        const matches = (content.match(pattern) || []).length;
        if (matches > 0) {
          content = content.replace(new RegExp(rule.source, rule.flags), rule.to);
          fileModified = true;
          fileReplacements += matches;
        }
      }

      if (content.includes('//_external/')) {
        content = content.replace(/\/\/_external\//g, '/_external/');
        fileModified = true;
      }

      if (fileModified) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        totalReplacements += fileReplacements;
        const rel = path.relative(MIRROR_DIR, filePath);
        console.log(`[Rewritten] ${rel} (${fileReplacements} references rewritten)`);
      }
    } catch (err) {
      console.warn(`[Warning] Could not rewrite ${filePath}:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('REWRITE SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Text Files Analyzed: ${allFiles.filter(f => textExtensions.includes(path.extname(f).toLowerCase())).length}`);
  console.log(`Files Modified:            ${modifiedCount}`);
  console.log(`Total References Updated:  ${totalReplacements}`);
  console.log('='.repeat(70));
}

if (require.main === module) {
  rewrite();
}

module.exports = { rewrite, buildHostRules };
