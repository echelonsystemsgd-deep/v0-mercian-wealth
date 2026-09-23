import type { PageNode, DeterministicChecks } from './types'

const MAX_PAGES_TO_CRAWL = 10
const FETCH_TIMEOUT_MS = 10000

// Clean and extract valid email addresses from text and links
export function extractEmailsFromContent(html: string): string[] {
  const emails = new Set<string>()

  // 1. Check mailto links
  const mailtoMatches = html.matchAll(/href=["']mailto:([^"'\s?]+)/gi)
  for (const match of mailtoMatches) {
    const email = match[1]?.trim().toLowerCase()
    if (email && isValidEmail(email)) {
      emails.add(email)
    }
  }

  // 2. Check general text regex
  const textMatches = html.matchAll(/\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g)
  for (const match of textMatches) {
    const email = match[1]?.trim().toLowerCase()
    if (email && isValidEmail(email)) {
      emails.add(email)
    }
  }

  return Array.from(emails)
}

function isValidEmail(email: string): boolean {
  if (email.length > 80 || email.length < 5) return false
  const lower = email.toLowerCase()
  // Exclude common static asset false-positives
  if (
    lower.endsWith('.png') ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.svg') ||
    lower.endsWith('.gif') ||
    lower.includes('sentry') ||
    lower.includes('wixpress') ||
    lower.includes('schema.org') ||
    lower.includes('example.com')
  ) {
    return false
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function extractPhonesFromContent(html: string): string[] {
  const phones = new Set<string>()

  const telMatches = html.matchAll(/href=["']tel:([^"'\s]+)/gi)
  for (const match of telMatches) {
    const raw = match[1]?.replace(/[^0-9+]/g, '')
    if (raw && raw.length >= 7) phones.add(raw)
  }

  // Common UK phone patterns in text
  const ukPhoneMatches = html.matchAll(/(?:(?:\+44\s?\(0\)\s?|\+44\s?|0)(?:[1-9]\d{8,9}|7\d{9}))/g)
  for (const match of ukPhoneMatches) {
    const clean = match[0]?.replace(/[^0-9+]/g, '')
    if (clean && clean.length >= 10 && clean.length <= 14) phones.add(clean)
  }

  return Array.from(phones)
}

// Parse a single HTML document into a structured PageNode
export function parseHtmlToPageNode(url: string, html: string, statusCode: number): PageNode {
  const lowerHtml = html.toLowerCase()

  // Basic meta & titles
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : ''

  const hasMobileViewport = lowerHtml.includes('name="viewport"') || lowerHtml.includes("name='viewport'")

  // Extract headings
  const headings: string[] = []
  const hMatches = html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)
  for (const match of hMatches) {
    const clean = match[1]?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    if (clean && clean.length > 2 && clean.length < 120) {
      headings.push(clean)
    }
  }

  // Extract buttons and primary CTAs
  const buttons: string[] = []
  const btnMatches = html.matchAll(/<(?:button|a)[^>]*class=["'][^"']*(?:btn|button|cta)[^"']*["'][^>]*>([\s\S]*?)<\/(?:button|a)>/gi)
  for (const match of btnMatches) {
    const clean = match[1]?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    if (clean && clean.length > 1 && clean.length < 50) {
      buttons.push(clean)
    }
  }

  // Count forms & fields
  const formMatches = html.match(/<form[\s\S]*?<\/form>/gi) || []
  const formCount = formMatches.length
  let formFieldsTotal = 0
  for (const form of formMatches) {
    const inputs = form.match(/<(?:input|textarea|select)(?![^>]*type=["']hidden["'])[^>]*>/gi) || []
    formFieldsTotal += inputs.length
  }

  // Booking widgets
  const hasBookingWidget =
    lowerHtml.includes('calendly.com') ||
    lowerHtml.includes('acuityscheduling.com') ||
    lowerHtml.includes('fresha.com') ||
    lowerHtml.includes('booksy.com') ||
    lowerHtml.includes('timely.com') ||
    lowerHtml.includes('setmore.com') ||
    lowerHtml.includes('booking')

  // Channels
  const extractedEmails = extractEmailsFromContent(html)
  const extractedPhones = extractPhonesFromContent(html)
  const hasPhoneLink = extractedPhones.length > 0 || lowerHtml.includes('tel:')
  const hasWhatsAppLink = lowerHtml.includes('wa.me') || lowerHtml.includes('api.whatsapp.com') || lowerHtml.includes('whatsapp')
  const hasEmailLink = extractedEmails.length > 0 || lowerHtml.includes('mailto:')

  // Password / Linktree checks
  const isPasswordProtected =
    lowerHtml.includes('password-page') ||
    lowerHtml.includes('enter store using password') ||
    lowerHtml.includes('opening soon') ||
    lowerHtml.includes('this shop will be powered by shopify')

  const isSocialLinktree =
    lowerHtml.includes('linktr.ee') ||
    url.includes('linktr.ee') ||
    lowerHtml.includes('bio.link')

  // Extract internal links
  const links: string[] = []
  const parsedUrl = new URL(url)
  const hrefMatches = html.matchAll(/href=["']([^"'#\s]+)["']/gi)
  for (const match of hrefMatches) {
    const href = match[1]
    if (!href) continue
    try {
      const full = new URL(href, url)
      if (full.hostname === parsedUrl.hostname && !links.includes(full.href)) {
        links.push(full.href)
      }
    } catch {
      // ignore invalid relative url
    }
  }

  // Text snippet for reasoning
  const rawText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const textContentSnippet = rawText.slice(0, 2000)

  return {
    url,
    path: parsedUrl.pathname || '/',
    title,
    statusCode,
    hasMobileViewport,
    formCount,
    formFieldsTotal,
    hasBookingWidget,
    hasPhoneLink,
    hasWhatsAppLink,
    hasEmailLink,
    extractedEmails,
    extractedPhones,
    headings: headings.slice(0, 10),
    buttons: Array.from(new Set(buttons)).slice(0, 10),
    links: links.slice(0, 30),
    textContentSnippet,
    isPasswordProtected,
    isSocialLinktree,
  }
}

// Fetch a single URL safely with timeout
async function fetchPage(url: string): Promise<{ html: string; status: number } | null> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MercianWebsiteAuditor/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
    })
    clearTimeout(timeoutId)
    const html = await res.text()
    return { html, status: res.status }
  } catch {
    clearTimeout(timeoutId)
    return null
  }
}

// Crawl up to MAX_PAGES_TO_CRAWL starting from root URL
export async function crawlWebsite(rootUrl: string): Promise<{ pages: PageNode[]; checks: DeterministicChecks }> {
  let normalizedRoot = rootUrl.trim()
  if (!normalizedRoot.startsWith('http://') && !normalizedRoot.startsWith('https://')) {
    normalizedRoot = `https://${normalizedRoot}`
  }

  const pages: PageNode[] = []
  const queue: string[] = [normalizedRoot]
  const visited = new Set<string>()

  const allFoundEmails = new Set<string>()
  const allFoundPhones = new Set<string>()

  let maxFormFields = 0
  let isPasswordLocked = false
  let isSocialLinktreeOnly = false
  let hasResponsiveMeta = false
  let foundPrimaryCta: string | undefined

  while (queue.length > 0 && pages.length < MAX_PAGES_TO_CRAWL) {
    const currentUrl = queue.shift()!
    if (visited.has(currentUrl)) continue
    visited.add(currentUrl)

    const fetchResult = await fetchPage(currentUrl)
    if (!fetchResult) continue

    const pageNode = parseHtmlToPageNode(currentUrl, fetchResult.html, fetchResult.status)
    pages.push(pageNode)

    // Aggregate contacts
    pageNode.extractedEmails.forEach((e) => allFoundEmails.add(e))
    pageNode.extractedPhones.forEach((p) => allFoundPhones.add(p))

    if (pageNode.formFieldsTotal > maxFormFields) {
      maxFormFields = pageNode.formFieldsTotal
    }
    if (pageNode.isPasswordProtected) isPasswordLocked = true
    if (pageNode.isSocialLinktree) isSocialLinktreeOnly = true
    if (pageNode.hasMobileViewport) hasResponsiveMeta = true
    if (!foundPrimaryCta && pageNode.buttons.length > 0) {
      foundPrimaryCta = pageNode.buttons[0]
    }

    // Prioritize high-value conversion pages to explore next
    const priorityKeywords = ['contact', 'book', 'enquir', 'quote', 'service', 'price', 'consultation', 'about']
    for (const link of pageNode.links) {
      if (!visited.has(link) && !queue.includes(link)) {
        const lowerLink = link.toLowerCase()
        if (priorityKeywords.some((kw) => lowerLink.includes(kw))) {
          queue.unshift(link) // prioritize
        } else if (queue.length < 20) {
          queue.push(link)
        }
      }
    }
  }

  const checks: DeterministicChecks = {
    pagesChecked: pages.length,
    hasWebsite: pages.length > 0,
    isResponsive: hasResponsiveMeta,
    primaryCtaFound: !!foundPrimaryCta,
    primaryCtaLabel: foundPrimaryCta,
    hasPhone: allFoundPhones.size > 0,
    hasWhatsApp: pages.some((p) => p.hasWhatsAppLink),
    hasEmail: allFoundEmails.size > 0,
    foundEmails: Array.from(allFoundEmails),
    foundPhones: Array.from(allFoundPhones),
    hasExcessiveFormFields: maxFormFields > 6,
    maxFormFieldsOnAnyPage: maxFormFields,
    isPasswordLocked,
    isSocialLinktreeOnly,
  }

  return { pages, checks }
}
