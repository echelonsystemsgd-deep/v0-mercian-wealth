import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

console.log('🔍 Running Mercian Wealth SEO & Metadata Verification Suite...\n')

let errors = 0
let checks = 0

function assert(condition, message) {
  checks++
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    errors++
  } else {
    console.log(`✅ PASS: ${message}`)
  }
}

// 1. Physical assets in public/
const requiredPublicAssets = [
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'mstile-150x150.png',
  'browserconfig.xml',
  'safari-pinned-tab.svg',
  'site.webmanifest',
  'og-image.jpg',
  'og-image.png',
  'NewLogo.png',
]

for (const asset of requiredPublicAssets) {
  const assetPath = path.join(rootDir, 'public', asset)
  const exists = fs.existsSync(assetPath)
  assert(exists, `public/${asset} exists`)
  if (exists && asset === 'og-image.jpg') {
    const stats = fs.statSync(assetPath)
    assert(stats.size < 110 * 1024, `public/og-image.jpg size is ${stats.size} bytes (< 110 KB requirement)`)
  }
}

// 2. Static OG and Twitter cards in app/
const appOg = path.join(rootDir, 'app', 'opengraph-image.png')
const appTwitter = path.join(rootDir, 'app', 'twitter-image.png')
assert(fs.existsSync(appOg), 'app/opengraph-image.png exists')
assert(fs.existsSync(appTwitter), 'app/twitter-image.png exists')

// Check that no dynamic .tsx OG cards exist
const dynamicOg = path.join(rootDir, 'app', 'opengraph-image.tsx')
const dynamicTwitter = path.join(rootDir, 'app', 'twitter-image.tsx')
assert(!fs.existsSync(dynamicOg), 'app/opengraph-image.tsx does NOT exist (static snapshot takes precedence)')
assert(!fs.existsSync(dynamicTwitter), 'app/twitter-image.tsx does NOT exist (static snapshot takes precedence)')

// Check that no old logos exist in public/
const forbiddenLogos = [
  'Logo1.jpeg',
  'logo1.png',
  'Logo2.jpeg',
  'logo2.png',
  'placeholder-logo.png',
  'placeholder-logo.svg',
]

for (const logo of forbiddenLogos) {
  const p = path.join(rootDir, 'public', logo)
  assert(!fs.existsSync(p), `Forbidden legacy logo public/${logo} has been removed`)
}

// 3. Domain consistency across layout.tsx, robots.ts, sitemap.ts
const layoutPath = path.join(rootDir, 'app', 'layout.tsx')
const layoutContent = fs.readFileSync(layoutPath, 'utf8')
assert(layoutContent.includes("https://mercianwealth.com"), 'app/layout.tsx metadataBase points to https://mercianwealth.com')
assert(layoutContent.includes("/NewLogo.png"), 'app/layout.tsx references /NewLogo.png for Schema logo')
assert(!layoutContent.includes("Logo1"), 'app/layout.tsx contains no reference to Logo1')
assert(!layoutContent.includes("Logo2"), 'app/layout.tsx contains no reference to Logo2')

const robotsPath = path.join(rootDir, 'app', 'robots.ts')
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8')
  assert(robotsContent.includes("https://mercianwealth.com"), 'app/robots.ts points to https://mercianwealth.com')
}

const sitemapPath = path.join(rootDir, 'app', 'sitemap.ts')
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
  assert(sitemapContent.includes("https://mercianwealth.com"), 'app/sitemap.ts points to https://mercianwealth.com')
}

// 4. Scan metadata block for forbidden boilerplate words
const metadataMatch = layoutContent.match(/export const metadata: Metadata = \{([\s\S]*?)\n\}/)
const metaBlock = metadataMatch ? metadataMatch[1] : layoutContent

const boilerplate = ['create next app', 'shadcn', 'vercel']
for (const word of boilerplate) {
  const hasWord = metaBlock.toLowerCase().includes(word.toLowerCase())
  assert(!hasWord, `app/layout.tsx metadata does not contain boilerplate "${word}"`)
}

// 5. Check manifest files
const webmanifestPath = path.join(rootDir, 'public', 'site.webmanifest')
assert(fs.existsSync(webmanifestPath), 'public/site.webmanifest exists')
if (fs.existsSync(webmanifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(webmanifestPath, 'utf8'))
  assert(manifest.name === 'Mercian Wealth', 'site.webmanifest name is "Mercian Wealth"')
  assert(manifest.theme_color === '#030206', 'site.webmanifest theme_color is #030206')
}

console.log(`\n========================================`)
console.log(`Summary: ${checks - errors}/${checks} checks passed.`)
if (errors > 0) {
  console.error(`❌ Verification failed with ${errors} errors.`)
  process.exit(1)
} else {
  console.log(`🎉 100% of SEO, Metadata, Favicon, and Asset checks PASSED!`)
  process.exit(0)
}
