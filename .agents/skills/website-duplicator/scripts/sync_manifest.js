const fs = require('fs');
const path = require('path');
const { getMimeType, getCliArg, readJsonArray, inferOrigin } = require('./utils');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MIRROR_DIR = path.resolve(PROJECT_ROOT, 'mirror');
const MANIFEST_PATH = path.resolve(PROJECT_ROOT, 'manifest.json');

function getAllFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      getAllFiles(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

function syncManifest() {
  const existing = readJsonArray(MANIFEST_PATH);
  const urlArg = getCliArg('--url', '') || getCliArg('--origin', '');
  const origin = inferOrigin(urlArg, existing);
  const mapByLocalFile = new Map();
  for (const item of existing) {
    mapByLocalFile.set(item.localFile.replace(/\\/g, '/'), item);
  }

  const allFiles = getAllFiles(MIRROR_DIR);
  let needsOrigin = false;
  for (const filePath of allFiles) {
    const rel = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
    if (mapByLocalFile.has(rel)) continue;
    const relMirror = path.relative(MIRROR_DIR, filePath).replace(/\\/g, '/');
    if (!relMirror.startsWith('_external/') && !origin) needsOrigin = true;
  }
  if (needsOrigin) {
    console.error('Usage: node scripts/sync_manifest.js --url https://example.com');
    console.error('An origin is required to record same-origin files that are not already in the manifest.');
    process.exit(1);
  }

  for (const filePath of allFiles) {
    const rel = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
    if (!mapByLocalFile.has(rel)) {
      const stat = fs.statSync(filePath);
      const relMirror = path.relative(MIRROR_DIR, filePath).replace(/\\/g, '/');
      let originalUrl;
      if (relMirror.startsWith('_external/')) {
        originalUrl = 'https://' + relMirror.replace('_external/', '');
      } else {
        originalUrl = origin.replace(/\/$/, '') + '/' + relMirror;
      }
      mapByLocalFile.set(rel, {
        url: originalUrl,
        status: 200,
        mimeType: getMimeType(filePath),
        resourceType: 'asset',
        localFile: rel,
        size: stat.size
      });
    }
  }

  const finalManifest = Array.from(mapByLocalFile.values());
  finalManifest.sort((a, b) => a.localFile.localeCompare(b.localFile));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(finalManifest, null, 2), 'utf8');
  console.log(`[Manifest] Synced ${finalManifest.length} files to ${MANIFEST_PATH}`);
}

if (require.main === module) {
  syncManifest();
}

module.exports = { syncManifest };
