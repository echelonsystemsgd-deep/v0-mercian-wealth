const { startServer } = require('./serve');
const { captureScreenshots } = require('./screenshot');

async function run() {
  const PORT = 8089;
  console.log(`Starting server for mirror screenshots on port ${PORT}...`);
  const server = await startServer(PORT);
  try {
    const results = await captureScreenshots(`http://localhost:${PORT}`, 'mirror');
    console.log(`Captured ${results.length} mirror screenshots successfully.`);
  } finally {
    server.close();
  }
}

run().catch(err => {
  console.error('Mirror screenshot capture failed:', err);
  process.exit(1);
});
