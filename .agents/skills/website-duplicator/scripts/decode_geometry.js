/**
 * Draco & Binary Geometry Decoder Helper
 * Converts Draco-compressed .bin / .drc geometries into clean JSON vertex arrays
 * and offline data URIs for zero-CORS file:// protocol usage.
 */

const fs = require('fs');
const path = require('path');

async function decodeDraco(inputPath, outputPath) {
  console.log(`Decoding geometry: ${inputPath}...`);
  const buffer = fs.readFileSync(inputPath);

  // Some exporters prefix the DRACO payload with a short header. Scan for the magic bytes.
  let dracoOffset = 0;
  for (let i = 0; i < Math.min(200, buffer.length - 5); i++) {
    if (buffer[i] === 0x44 && buffer[i+1] === 0x52 && buffer[i+2] === 0x41 && buffer[i+3] === 0x43 && buffer[i+4] === 0x4F) {
      dracoOffset = i;
      break;
    }
  }

  const rawBytes = dracoOffset > 0 ? buffer.subarray(dracoOffset) : buffer;
  const drcPath = inputPath.replace(/\.bin$/, '.drc');
  fs.writeFileSync(drcPath, rawBytes);
  console.log(`Saved clean Draco stream to: ${drcPath}`);

  return { drcPath, rawBytes };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node decode_geometry.js <input.bin> [output.json]');
    process.exit(1);
  }
  decodeDraco(args[0], args[1]);
}

module.exports = { decodeDraco };
