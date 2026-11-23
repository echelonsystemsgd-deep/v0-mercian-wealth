const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

// MIME types dictionary
const MIME_TYPES = {
  // Markup & scripts
  'html': 'text/html; charset=utf-8',
  'htm': 'text/html; charset=utf-8',
  'js': 'text/javascript; charset=utf-8',
  'mjs': 'text/javascript; charset=utf-8',
  'json': 'application/json',
  'css': 'text/css; charset=utf-8',
  'map': 'application/json',
  // WebAssembly
  'wasm': 'application/wasm',
  // 3D & Models
  'glb': 'model/gltf-binary',
  'gltf': 'model/gltf+json',
  'bin': 'application/octet-stream',
  'obj': 'text/plain',
  // Compressed & Standard Textures / Images
  'ktx': 'image/ktx',
  'ktx2': 'image/ktx2',
  'basis': 'application/octet-stream',
  'dds': 'image/vnd-ms.dds',
  'hdr': 'image/vnd.radiance',
  'exr': 'image/x-exr',
  'cube': 'text/plain',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'webp': 'image/webp',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'ico': 'image/x-icon',
  'avif': 'image/avif',
  // Shaders
  'vs': 'text/plain',
  'fs': 'text/plain',
  'vert': 'text/plain',
  'frag': 'text/plain',
  'glsl': 'text/plain',
  'wgsl': 'text/plain',
  // Fonts
  'woff2': 'font/woff2',
  'woff': 'font/woff',
  'ttf': 'font/ttf',
  'otf': 'font/otf',
  'eot': 'application/vnd.ms-fontobject',
  // Video & Audio
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'ogv': 'video/ogg',
  'mp3': 'audio/mpeg',
  'ogg': 'audio/ogg',
  'wav': 'audio/wav',
  'm4a': 'audio/mp4',
  'aac': 'audio/aac',
  // Manifests
  'webmanifest': 'application/manifest+json',
  'txt': 'text/plain',
  'xml': 'application/xml'
};

const EXTENSION_FROM_MIME = {
  'text/html': 'html',
  'text/javascript': 'js',
  'application/javascript': 'js',
  'text/css': 'css',
  'application/json': 'json',
  'application/wasm': 'wasm',
  'model/gltf-binary': 'glb',
  'model/gltf+json': 'gltf',
  'image/ktx2': 'ktx2',
  'image/ktx': 'ktx',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'font/woff2': 'woff2',
  'font/woff': 'woff',
  'font/ttf': 'ttf',
  'font/otf': 'otf',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'audio/mpeg': 'mp3',
  'audio/mp4': 'm4a',
  'audio/ogg': 'ogg',
  'audio/wav': 'wav',
  'application/octet-stream': 'bin'
};

/**
 * Returns MIME type based on filename extension
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Sanitize a string segment for Windows filesystem
 */
function sanitizeSegment(segment) {
  // Disallowed Windows chars: \ / : * ? " < > |
  return segment
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/[\x00-\x1f]/g, '')
    .trim();
}

/**
 * Convert a URL to a local relative filepath inside the mirror directory
 * @param {string} targetUrl The full request URL
 * @param {string} baseOrigin The target site origin, e.g. "https://example.com"
 * @param {string} mimeType The response MIME type (helps if extension is missing)
 * @returns {string} relative file path (e.g. "assets/js/app.js")
 */
function urlToLocalPath(targetUrl, baseOrigin, mimeType = '') {
  let parsed;
  try {
    parsed = new url.URL(targetUrl);
  } catch (e) {
    // Malformed URL
    const hash = crypto.createHash('md5').update(targetUrl).digest('hex');
    return path.posix.join('_malformed', `${hash}.bin`);
  }

  const baseParsed = new url.URL(baseOrigin);
  const isSameOrigin = parsed.hostname.toLowerCase() === baseParsed.hostname.toLowerCase();

  let pathname = parsed.pathname;
  try {
    pathname = decodeURIComponent(pathname);
  } catch (e) {
    // Ignore decode error and use raw pathname
  }

  // Handle root or directory paths
  if (!pathname || pathname === '/' || pathname.endsWith('/')) {
    pathname = path.posix.join(pathname || '/', 'index.html');
  }

  // Clean leading slash
  if (pathname.startsWith('/')) {
    pathname = pathname.substring(1);
  }

  // Split into segments and sanitize each segment for Windows
  const segments = pathname.split('/').map(seg => sanitizeSegment(seg) || 'index');

  // Check if filename has an extension
  let filename = segments[segments.length - 1];
  let ext = path.extname(filename).toLowerCase().replace('.', '');

  // If no extension, infer from mimeType or treat HTML route as /index.html
  if (!ext) {
    const cleanMime = (mimeType || '').split(';')[0].trim().toLowerCase();
    if (cleanMime.includes('text/html') || !cleanMime) {
      segments.push('index.html');
    } else if (EXTENSION_FROM_MIME[cleanMime]) {
      segments[segments.length - 1] = `${filename}.${EXTENSION_FROM_MIME[cleanMime]}`;
    }
  }

  let relativePath = segments.join('/');

  if (!isSameOrigin) {
    // External asset (e.g. storage.googleapis.com)
    // Place under _external/<hostname>/...
    const hostSegment = sanitizeSegment(parsed.hostname);
    relativePath = path.posix.join('_external', hostSegment, relativePath);
  }

  return relativePath;
}

/**
 * Ensures directory exists and writes file
 */
function writeMirrorFile(mirrorRootDir, relativeFilePath, buffer) {
  const fullPath = path.resolve(mirrorRootDir, relativeFilePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, buffer);
  return fullPath;
}

/**
 * Filter out analytics/tracking URLs that shouldn't pollute the mirror
 */
function isIgnoredAnalyticsUrl(targetUrl) {
  const ignoredPatterns = [
    'google-analytics.com',
    'region1.google-analytics.com',
    'analytics.google.com',
    'stats.g.doubleclick.net',
    'googletagmanager.com/gtag/js',
    'bat.bing.com',
    'facebook.net'
  ];
  return ignoredPatterns.some(pattern => targetUrl.includes(pattern));
}

function getCliArg(flag, defaultValue, argv = process.argv) {
  const idx = argv.indexOf(flag);
  return idx !== -1 && argv[idx + 1] ? argv[idx + 1] : defaultValue;
}

function readJsonArray(filePath) {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

/**
 * Resolve the site being mirrored from an explicit URL/host argument,
 * otherwise from the first same-origin entry already recorded in a manifest.
 * Returns an origin string ("https://host") or null.
 */
function inferOrigin(urlArg, manifestEntries = []) {
  if (urlArg) {
    const raw = /^https?:\/\//i.test(urlArg) ? urlArg : `https://${urlArg}`;
    return new URL(raw).origin;
  }
  for (const item of manifestEntries) {
    const local = String(item && item.localFile || '').replace(/\\/g, '/');
    if (!item || !item.url || local.includes('_external/')) continue;
    try {
      return new URL(item.url).origin;
    } catch (e) {}
  }
  return null;
}

const STATIC_ASSET_EXT_RE = /\.(wasm|drc|ktx2?|glb|gltf|bin|basis|exr|hdr|png|jpe?g|webp|gif|svg|avif|mp4|webm|ogv|mp3|ogg|wav|m4a|aac|woff2?|ttf|otf|json|css|js|mjs|glsl|vert|frag|vs|fs|pdf|zip)$/i;

function isStaticAssetPath(value) {
  const pathOnly = String(value || '').split('?')[0].split('#')[0];
  return STATIC_ASSET_EXT_RE.test(pathOnly);
}

function parseRouteList(value) {
  if (!value) return [];
  return value.split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      if (/^https?:\/\//i.test(part)) {
        try {
          return new URL(part).pathname || '/';
        } catch (e) {
          return '';
        }
      }
      return part.startsWith('/') ? part : `/${part}`;
    })
    .filter(part => part && part !== '/');
}

module.exports = {
  MIME_TYPES,
  EXTENSION_FROM_MIME,
  getMimeType,
  sanitizeSegment,
  urlToLocalPath,
  writeMirrorFile,
  isIgnoredAnalyticsUrl,
  getCliArg,
  readJsonArray,
  inferOrigin,
  parseRouteList,
  isStaticAssetPath
};
