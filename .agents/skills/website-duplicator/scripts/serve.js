const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { getMimeType } = require('./utils');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MIRROR_DIR = path.resolve(PROJECT_ROOT, 'mirror');

function createServer(mirrorDir = MIRROR_DIR) {
  const server = http.createServer((req, res) => {
    // Add permissive CORS and security headers for local playback
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    const parsedUrl = url.parse(req.url);
    let reqPath = decodeURIComponent(parsedUrl.pathname);

    // Collapse multiple consecutive slashes (e.g. //_external -> /_external)
    reqPath = reqPath.replace(/\/+/g, '/');

    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    // Clean leading slash for safe relative join on Windows
    let relativePath = reqPath;
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.substring(1);
    }

    let filePath = path.join(mirrorDir, relativePath);

    // Check if path is a directory containing index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // Check if direct file exists
    if (!fs.existsSync(filePath)) {
      // SPA Fallback: If route has no file extension, fallback to root index.html
      const ext = path.extname(reqPath);
      if (!ext) {
        const indexPath = path.join(mirrorDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          filePath = indexPath;
        }
      }
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(`404 Not Found: ${reqPath}`);
    }

    const stat = fs.statSync(filePath);
    const totalSize = stat.size;
    const contentType = getMimeType(filePath);

    // Handle HTTP Range requests (required by media that probes with bytes= ranges)
    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize) {
        res.writeHead(416, { 'Content-Range': `bytes */${totalSize}` });
        return res.end();
      }

      const chunkSize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': totalSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });

  return server;
}

function startServer(initialPort = 8080, mirrorDir = MIRROR_DIR) {
  return new Promise((resolve, reject) => {
    let currentPort = initialPort;
    const maxTries = 10;
    let attempts = 0;

    function tryListen() {
      const server = createServer(mirrorDir);

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempts < maxTries) {
          attempts++;
          console.warn(`[Server] Port ${currentPort} is already in use. Retrying on port ${currentPort + 1}...`);
          currentPort++;
          server.close();
          tryListen();
        } else {
          reject(err);
        }
      });

      server.listen(currentPort, '0.0.0.0', () => {
        console.log(`[Server] Local HTTP Server running at http://localhost:${currentPort}/`);
        console.log(`[Server] Serving directory: ${mirrorDir}`);
        resolve(server);
      });
    }

    tryListen();
  });
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const portArg = args.indexOf('--port');
  const port = portArg !== -1 && args[portArg + 1] ? parseInt(args[portArg + 1], 10) : 8080;
  startServer(port).catch(err => {
    console.error('Server failed to start:', err);
    process.exit(1);
  });
}

module.exports = { createServer, startServer };
