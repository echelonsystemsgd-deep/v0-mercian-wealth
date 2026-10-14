import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer-core'
import type {
  AuditSignals,
  BuildFingerprint,
  BuildPlatform,
  FormInspection
} from './evidence-types'

// Locate system Chrome or Edge on Windows/Linux/macOS
export function findSystemBrowser(): string | null {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
  ]

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p
  }
  return null
}

/**
 * Detect build platform with confidence and evidence
 */
export function detectBuildFingerprint(html: string): BuildFingerprint {
  const lower = html.toLowerCase()
  const evidence: string[] = []

  // Check generator meta
  const metaMatch = html.match(/<meta\s+name=["']generator["']\s+content=["']([^"']+)["']/i)
  if (metaMatch) {
    const gen = metaMatch[1].trim()
    evidence.push(`Generator meta: ${gen}`)
    if (gen.toLowerCase().includes('wordpress')) {
      return { platform: 'WordPress', confidence: 'high', evidence }
    }
    if (gen.toLowerCase().includes('elementor')) {
      return { platform: 'Elementor', confidence: 'high', evidence }
    }
    if (gen.toLowerCase().includes('webflow')) {
      return { platform: 'Webflow', confidence: 'high', evidence }
    }
    if (gen.toLowerCase().includes('framer')) {
      return { platform: 'Framer', confidence: 'high', evidence }
    }
    if (gen.toLowerCase().includes('wix')) {
      return { platform: 'Wix', confidence: 'high', evidence }
    }
    if (gen.toLowerCase().includes('squarespace')) {
      return { platform: 'Squarespace', confidence: 'high', evidence }
    }
  }

  // Check AI builder indicators
  if (lower.includes('lovable.dev') || lower.includes('cdn.lovable')) {
    evidence.push('Lovable.dev scripts detected')
    return { platform: 'Lovable', confidence: 'high', evidence }
  }
  if (lower.includes('v0.dev') || lower.includes('v0-generated')) {
    evidence.push('v0 generator signature detected')
    return { platform: 'v0', confidence: 'high', evidence }
  }
  if (lower.includes('bolt.new') || lower.includes('stackblitz.com')) {
    evidence.push('Bolt/StackBlitz runtime detected')
    return { platform: 'Bolt', confidence: 'high', evidence }
  }

  // Check asset domains & paths
  if (lower.includes('/wp-content/') || lower.includes('/wp-includes/')) {
    evidence.push('WordPress asset paths (/wp-content/)')
    if (lower.includes('elementor')) {
      evidence.push('Elementor page builder classes & styles')
      return { platform: 'Elementor', confidence: 'high', evidence }
    }
    return { platform: 'WordPress', confidence: 'high', evidence }
  }
  if (lower.includes('static.wixstatic.com') || lower.includes('wix.com')) {
    evidence.push('Wix CDN static asset host')
    return { platform: 'Wix', confidence: 'high', evidence }
  }
  if (lower.includes('assets.squarespace.com') || lower.includes('squarespace-cdn')) {
    evidence.push('Squarespace asset CDN')
    return { platform: 'Squarespace', confidence: 'high', evidence }
  }
  if (lower.includes('framerusercontent.com') || lower.includes('framer-')) {
    evidence.push('Framer user assets and runtime scripts')
    return { platform: 'Framer', confidence: 'high', evidence }
  }
  if (lower.includes('uploads-ssl.webflow.com') || lower.includes('w-layout-')) {
    evidence.push('Webflow layout classes and CDN')
    return { platform: 'Webflow', confidence: 'high', evidence }
  }

  // Footer credits check
  if (lower.includes('powered by wordpress')) {
    evidence.push('Footer credit: Powered by WordPress')
    return { platform: 'WordPress', confidence: 'high', evidence }
  }
  if (lower.includes('powered by squarespace')) {
    evidence.push('Footer credit: Powered by Squarespace')
    return { platform: 'Squarespace', confidence: 'high', evidence }
  }

  return {
    platform: 'Custom',
    confidence: 'medium',
    evidence: ['Standard modern web architecture without known builder signatures']
  }
}

/**
 * Parse signals from raw HTML text (used in headless browser or HTTP fallback)
 */
export function extractSignalsFromHtml(
  url: string,
  html: string,
  browserMetrics?: {
    hasOverflow?: boolean
    overflowWidthPx?: number
    overflowSelector?: string
    smallTapTargetsCount?: number
    smallTapTargetSamples?: Array<{ selector: string; dimensions: string }>
    hasNextStepAboveFold?: boolean
    aboveFoldCtaText?: string
  }
): AuditSignals {
  const lower = html.toLowerCase()
  const isHttps = url.startsWith('https://')

  // Layout & performance
  const hasViewportMeta = /<meta\s+[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width/i.test(html)

  // Broken placeholder links
  const allLinks = [...html.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  const sampleBrokenLinks: string[] = []
  let brokenLinksCount = 0

  for (const m of allLinks) {
    const href = m[1]?.trim()
    if (href === '' || href === '#' || href.startsWith('javascript:void(0)')) {
      brokenLinksCount++
      if (sampleBrokenLinks.length < 3) {
        const text = m[2]?.replace(/<[^>]+>/g, '').trim().slice(0, 30) || 'unlabelled'
        sampleBrokenLinks.push(`"${text}" (href="${href}")`)
      }
    }
  }

  // Contact paths
  const telNumbers: string[] = []
  const whatsAppLinks: string[] = []
  const mailtoAddresses: string[] = []
  const bookingLinks: string[] = []
  const clientPortalLinks: string[] = []

  const bookingDomains = ['calendly.com', 'tidycal.com', 'acuityscheduling.com', 'calendar.google.com', 'savvycal.com', 'hubspot.com/meetings']
  const portalKeywords = ['xero.com', 'iris.co.uk', 'senta.co', 'mydocsafe.com', 'brightpay.co.uk', 'sage.com', 'client-portal', 'clientportal', 'client login', 'client area', 'login.xero']

  for (const m of allLinks) {
    const href = m[1]?.trim() || ''
    const lowerHref = href.toLowerCase()

    if (lowerHref.startsWith('tel:')) {
      const cleanPhone = href.replace(/^tel:/i, '').replace(/[^0-9+]/g, '')
      if (cleanPhone && !telNumbers.includes(cleanPhone)) telNumbers.push(cleanPhone)
    } else if (lowerHref.includes('wa.me') || lowerHref.includes('api.whatsapp.com')) {
      whatsAppLinks.push(href)
    } else if (lowerHref.startsWith('mailto:')) {
      const email = href.replace(/^mailto:/i, '').split('?')[0].trim().toLowerCase()
      if (email && !mailtoAddresses.includes(email)) mailtoAddresses.push(email)
    }

    // Booking link detection
    if (bookingDomains.some(d => lowerHref.includes(d))) {
      if (!bookingLinks.includes(href)) bookingLinks.push(href)
    }

    // Client portal link detection
    if (portalKeywords.some(k => lowerHref.includes(k) || m[2]?.toLowerCase().includes(k))) {
      if (!clientPortalLinks.includes(href)) clientPortalLinks.push(href)
    }
  }

  // Forms inspection
  const formMatches = [...html.matchAll(/<form\b([\s\S]*?)<\/form>/gi)]
  const formDetails: FormInspection[] = []
  let maxFormFields = 0

  formMatches.forEach((fMatch, idx) => {
    const formInner = fMatch[1]
    const inputs: Array<{ name: string; type: string; placeholder?: string; required?: boolean }> = []
    const inputMatches = [...formInner.matchAll(/<(?:input|textarea|select)\b([^>]*)>/gi)]

    let hasPhoneField = false
    let hasEmailField = false
    let hasTurnoverOrServiceDropdown = false

    inputMatches.forEach(iMatch => {
      const attrs = iMatch[1]
      const typeMatch = attrs.match(/type=["']([^"']+)["']/i)
      const nameMatch = attrs.match(/name=["']([^"']+)["']/i)
      const phMatch = attrs.match(/placeholder=["']([^"']+)["']/i)
      const isReq = /required/i.test(attrs)

      const type = (typeMatch ? typeMatch[1] : 'text').toLowerCase()
      const name = (nameMatch ? nameMatch[1] : `field_${inputs.length}`).toLowerCase()
      const placeholder = phMatch ? phMatch[1] : ''

      if (type === 'submit' || type === 'hidden' || type === 'button') return

      if (type === 'tel' || name.includes('phone') || name.includes('tel')) hasPhoneField = true
      if (type === 'email' || name.includes('email') || name.includes('mail')) hasEmailField = true
      if (name.includes('turnover') || name.includes('revenue') || name.includes('service') || name.includes('package')) {
        hasTurnoverOrServiceDropdown = true
      }

      inputs.push({ name, type, placeholder, required: isReq })
    })

    const hasVisibleResponsePromise = /respond within|get back to you|same day|within \d+\s*(?:hours|days)|reply within/i.test(formInner)
    const actionMatch = fMatch[0].match(/action=["']([^"']+)["']/i)

    const formInspection: FormInspection = {
      selector: `form:nth-of-type(${idx + 1})`,
      fieldCount: inputs.length,
      inputs,
      action: actionMatch ? actionMatch[1] : undefined,
      hasPhoneField,
      hasEmailField,
      hasTurnoverOrServiceDropdown,
      hasVisibleResponsePromise
    }

    formDetails.push(formInspection)
    if (inputs.length > maxFormFields) maxFormFields = inputs.length
  })

  // Trust & compliance
  const regulators: string[] = []
  if (/icaew|institute of chartered accountants in england/i.test(html)) regulators.push('ICAEW')
  if (/acca|association of chartered certified accountants/i.test(html)) regulators.push('ACCA')
  if (/aat|association of accounting technicians/i.test(html)) regulators.push('AAT')
  if (/icas|institute of chartered accountants of scotland/i.test(html)) regulators.push('ICAS')
  if (/cima|chartered institute of management accountants/i.test(html)) regulators.push('CIMA')
  if (/att|association of taxation technicians/i.test(html)) regulators.push('ATT')
  if (/cta|chartered tax adviser/i.test(html)) regulators.push('CTA')

  // AML supervisor
  let amlSupervisor: string | undefined
  if (/anti-money laundering|aml supervisor|hmrc aml|supervised by/i.test(html)) {
    amlSupervisor = regulators.length > 0 ? regulators[0] : 'HMRC'
  }

  // Company registration number (UK Companies House: 8 digits or prefixes SC, NI, OC, OC)
  let companyNumber: string | undefined
  const crnMatch = html.match(/(?:company\s+(?:number|no|registration)|registered\s+in\s+england\s*(?:&|and)\s*wales[^\d]*)[:\s#]*([0-9]{8}|[A-Za-z]{2}[0-9]{6})/i)
  if (crnMatch) companyNumber = crnMatch[1].trim()

  const hasPrivacyPolicy = /privacy-policy|privacy|terms-and-conditions|gdpr/i.test(html)
  const hasCookieBanner = /cookie|cookiebot|onetrust|cc-banner|cookie-consent/i.test(html)

  // Content signals
  const servicesUrls: string[] = []
  allLinks.forEach(m => {
    const h = m[1]?.toLowerCase() || ''
    if (h.includes('/service') || h.includes('/what-we-do') || h.includes('/our-services')) {
      if (!servicesUrls.includes(m[1])) servicesUrls.push(m[1])
    }
  })

  const hasFaq = /faq|frequently asked|accordion/i.test(html)
  const hasMtdMention = /making tax digital|mtd for itsa|mtd itsa|mtd for income tax|quarterly updates/i.test(html)
  const mtdSnippets: string[] = []
  if (hasMtdMention) {
    const mtdMatch = html.match(/(?:making tax digital|mtd for income tax|mtd itsa)[^.<>]{0,120}\./i)
    if (mtdMatch) mtdSnippets.push(mtdMatch[0].replace(/<[^>]+>/g, '').trim())
  }

  const hasPricingSignal = /£\d+|per month|\/mo|fee guide|packages|pricing/i.test(html)
  const pricingMatch = html.match(/(?:from\s+£\d+|£\d+\s*\/\s*month|packages\s+start|retainer\s+from)[^.<>]{0,80}/i)
  const pricingSnippet = pricingMatch ? pricingMatch[0].replace(/<[^>]+>/g, '').trim() : undefined

  // Schema.org
  const hasSchemaMarkup = /application\/ld\+json/i.test(html)
  const schemaTypes: string[] = []
  const schemaMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  schemaMatches.forEach(sm => {
    try {
      const parsed = JSON.parse(sm[1])
      if (parsed['@type']) schemaTypes.push(parsed['@type'])
    } catch {
      // ignore JSON parse error in schema script
    }
  })

  return {
    layoutAndPerformance: {
      hasHttps: isHttps,
      hasViewportMeta,
      hasHorizontalOverflow: Boolean(browserMetrics?.hasOverflow),
      overflowWidthPx: browserMetrics?.overflowWidthPx,
      overflowSelector: browserMetrics?.overflowSelector,
      viewportWidthPx: 390,
      smallTapTargetsCount: browserMetrics?.smallTapTargetsCount || 0,
      smallTapTargetSamples: browserMetrics?.smallTapTargetSamples || [],
      brokenLinksCount,
      sampleBrokenLinks
    },
    contactPaths: {
      hasTel: telNumbers.length > 0,
      telNumbers,
      hasWhatsApp: whatsAppLinks.length > 0,
      whatsAppLinks,
      hasMailto: mailtoAddresses.length > 0,
      mailtoAddresses,
      formsCount: formDetails.length,
      maxFormFields,
      formDetails,
      bookingLinks,
      clientPortalLinks,
      hasNextStepAboveFold: Boolean(browserMetrics?.hasNextStepAboveFold),
      aboveFoldCtaText: browserMetrics?.aboveFoldCtaText
    },
    trustAndCompliance: {
      regulators,
      amlSupervisor,
      companyNumber,
      hasPrivacyPolicy,
      hasCookieBanner,
      namedPeople: [],
      reviewsFound: []
    },
    contentSignals: {
      hasServicesPage: servicesUrls.length > 0,
      servicesUrls,
      hasFaq,
      hasMtdMention,
      mtdSnippets,
      hasPricingSignal,
      pricingSnippet,
      hasSchemaMarkup,
      schemaTypes
    }
  }
}

/**
 * Conducts a mobile headless browser audit using Puppeteer-core
 */
export async function auditSiteWithHeadlessBrowser(
  targetUrl: string,
  options: {
    screenshotDir?: string
    timeoutMs?: number
  } = {}
): Promise<{
  signals: AuditSignals
  fingerprint: BuildFingerprint
  screenshotPath?: string
  error?: string
}> {
  const browserPath = findSystemBrowser()
  const timeoutMs = options.timeoutMs || 20000

  // Fallback to fetch if no browser binary found
  if (!browserPath) {
    console.warn('[!] No system browser found, falling back to HTTP fetch')
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)' }
    })
    const html = await res.text()
    const fingerprint = detectBuildFingerprint(html)
    const signals = extractSignalsFromHtml(targetUrl, html)
    return { signals, fingerprint }
  }

  let browser: any = null

  try {
    browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=390,844']
    })

    const page = await browser.newPage()
    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    })

    await page.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
    )

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: timeoutMs
    })

    // Brief wait for any initial animations to settle
    await new Promise(r => setTimeout(r, 1200))

    // Capture screenshot if requested
    let screenshotPath: string | undefined
    if (options.screenshotDir) {
      if (!fs.existsSync(options.screenshotDir)) {
        fs.mkdirSync(options.screenshotDir, { recursive: true })
      }
      const domainSlug = new URL(targetUrl).hostname.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      const filename = `audit_${domainSlug}.png`
      const fullPath = path.join(options.screenshotDir, filename)
      await page.screenshot({ path: fullPath, fullPage: false })
      screenshotPath = `/audit-screenshots/${filename}`
    }

    // Inspect live DOM metrics in 390px mobile viewport
    const browserMetrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth
      const windowWidth = window.innerWidth
      const hasOverflow = scrollWidth > windowWidth + 5 // 5px tolerance

      // Find overflowing element if any
      let overflowSelector = ''
      if (hasOverflow) {
        const allElements = document.querySelectorAll('*')
        for (const el of allElements) {
          const rect = el.getBoundingClientRect()
          if (rect.right > windowWidth + 8) {
            overflowSelector = el.tagName.toLowerCase() + (el.className ? `.${String(el.className).trim().split(/\s+/)[0]}` : '')
            break
          }
        }
      }

      // Tap targets < 44px
      const interactiveEls = document.querySelectorAll('a, button, input[type="submit"]')
      let smallTapTargetsCount = 0
      const smallTapTargetSamples: Array<{ selector: string; dimensions: string }> = []

      interactiveEls.forEach(el => {
        const rect = el.getBoundingClientRect()
        // Only inspect visible elements
        if (rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.top <= 2000) {
          if (rect.width < 40 || rect.height < 40) {
            smallTapTargetsCount++
            if (smallTapTargetSamples.length < 2) {
              const tag = el.tagName.toLowerCase()
              const cls = el.className ? `.${String(el.className).trim().split(/\s+/)[0]}` : ''
              smallTapTargetSamples.push({
                selector: `${tag}${cls}`,
                dimensions: `${Math.round(rect.width)}x${Math.round(rect.height)}px`
              })
            }
          }
        }
      })

      // Next step above the fold
      const primaryCtas = document.querySelectorAll('a.btn, a.button, button, a[href*="contact"], a[href*="book"], a[href*="calendly"]')
      let hasNextStepAboveFold = false
      let aboveFoldCtaText = ''

      for (const cta of primaryCtas) {
        const rect = cta.getBoundingClientRect()
        if (rect.top >= 0 && rect.top < 844 && rect.height > 20) {
          hasNextStepAboveFold = true
          aboveFoldCtaText = (cta.textContent || '').trim().slice(0, 30)
          break
        }
      }

      return {
        hasOverflow,
        overflowWidthPx: scrollWidth,
        overflowSelector,
        smallTapTargetsCount,
        smallTapTargetSamples,
        hasNextStepAboveFold,
        aboveFoldCtaText
      }
    })

    const html = await page.content()
    const fingerprint = detectBuildFingerprint(html)
    const signals = extractSignalsFromHtml(targetUrl, html, browserMetrics)

    return { signals, fingerprint, screenshotPath }
  } catch (err: any) {
    console.error(`[-] Headless audit failed for ${targetUrl}:`, err.message)
    // Fallback to fetch on error
    try {
      const res = await fetch(targetUrl)
      const html = await res.text()
      const fingerprint = detectBuildFingerprint(html)
      const signals = extractSignalsFromHtml(targetUrl, html)
      return { signals, fingerprint, error: err.message }
    } catch (fetchErr: any) {
      throw new Error(`Failed both headless and fetch audits: ${fetchErr.message}`)
    }
  } finally {
    if (browser) await browser.close()
  }
}
