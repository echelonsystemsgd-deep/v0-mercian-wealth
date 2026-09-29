/**
 * Deterministic Phone Classifier & Normalizer for UK & International Prospects
 * 
 * Accurately differentiates UK Mobile devices (WhatsApp capable) from UK Geographic
 * Landlines (+4411..., +441..., +442...) to eliminate broken WhatsApp outreach links.
 */

export interface ClassifiedPhone {
  raw: string
  cleanDigits: string
  standardizedE164: string | null
  displayNational: string
  displayInternational: string
  type: 'uk_mobile' | 'uk_landline' | 'international' | 'invalid'
  isWhatsAppViable: boolean
  channelLabel: string
  badgeText: string
  areaDescription?: string
}

// Major UK area codes for geographic context
const UK_AREA_MAP: Record<string, string> = {
  '113': 'Leeds',
  '114': 'Sheffield',
  '115': 'Nottingham',
  '116': 'Leicester',
  '117': 'Bristol',
  '118': 'Reading',
  '121': 'Birmingham',
  '131': 'Edinburgh',
  '141': 'Glasgow',
  '151': 'Liverpool',
  '161': 'Manchester',
  '191': 'Newcastle / Sunderland',
  '20': 'Greater London',
  '23': 'Southampton / Portsmouth',
  '24': 'Coventry',
  '28': 'Northern Ireland',
  '29': 'Cardiff',
}

/**
 * Classifies any incoming phone string into its precise telecom category.
 */
export function classifyPhoneNumber(phone: string | null | undefined): ClassifiedPhone {
  const raw = String(phone || '').trim()
  const cleanDigits = raw.replace(/[^0-9]/g, '')

  if (!cleanDigits || cleanDigits.length < 7) {
    return {
      raw,
      cleanDigits,
      standardizedE164: null,
      displayNational: raw || 'No Phone',
      displayInternational: raw || 'No Phone',
      type: 'invalid',
      isWhatsAppViable: false,
      channelLabel: 'Missing Contact Phone',
      badgeText: 'No Phone',
    }
  }

  // 1. UK Mobile Detection (starts with 07 or 447)
  const isUkMobile =
    (cleanDigits.startsWith('07') && cleanDigits.length === 11) ||
    (cleanDigits.startsWith('447') && cleanDigits.length === 12)

  if (isUkMobile) {
    const nationalDigits = cleanDigits.startsWith('447') ? '0' + cleanDigits.substring(2) : cleanDigits
    const intlDigits = cleanDigits.startsWith('07') ? '44' + cleanDigits.substring(1) : cleanDigits

    const formattedNational = `${nationalDigits.slice(0, 5)} ${nationalDigits.slice(5)}`
    const formattedIntl = `+44 ${nationalDigits.slice(1, 5)} ${nationalDigits.slice(5)}`

    return {
      raw,
      cleanDigits,
      standardizedE164: `+${intlDigits}`,
      displayNational: formattedNational,
      displayInternational: formattedIntl,
      type: 'uk_mobile',
      isWhatsAppViable: true,
      channelLabel: 'WhatsApp & SMS',
      badgeText: 'Mobile · WhatsApp Ready',
      areaDescription: 'UK Mobile Network',
    }
  }

  // 2. UK Landline Detection (01..., 02..., +441..., +442...)
  const isUkLandline =
    cleanDigits.startsWith('01') ||
    cleanDigits.startsWith('02') ||
    cleanDigits.startsWith('03') ||
    cleanDigits.startsWith('441') ||
    cleanDigits.startsWith('442') ||
    cleanDigits.startsWith('443')

  if (isUkLandline) {
    const nationalDigits = cleanDigits.startsWith('44') ? '0' + cleanDigits.substring(2) : cleanDigits
    const intlDigits = cleanDigits.startsWith('0') ? '44' + cleanDigits.substring(1) : cleanDigits

    // Detect area city
    let city: string | undefined
    for (const [code, name] of Object.entries(UK_AREA_MAP)) {
      if (nationalDigits.startsWith(`0${code}`)) {
        city = name
        break
      }
    }

    // Format landline nicely
    let formattedNational = nationalDigits
    if (nationalDigits.startsWith('020') && nationalDigits.length === 11) {
      formattedNational = `${nationalDigits.slice(0, 3)} ${nationalDigits.slice(3, 7)} ${nationalDigits.slice(7)}`
    } else if (nationalDigits.length >= 10) {
      formattedNational = `${nationalDigits.slice(0, 4)} ${nationalDigits.slice(4, 7)} ${nationalDigits.slice(7)}`
    }

    return {
      raw,
      cleanDigits,
      standardizedE164: `+${intlDigits}`,
      displayNational: formattedNational,
      displayInternational: `+44 ${nationalDigits.slice(1)}`,
      type: 'uk_landline',
      isWhatsAppViable: false,
      channelLabel: 'Direct Call / Office',
      badgeText: city ? `Landline (${city})` : 'Landline · Office',
      areaDescription: city ? `${city} Landline` : 'UK Regional Landline',
    }
  }

  // 3. International Numbers
  return {
    raw,
    cleanDigits,
    standardizedE164: cleanDigits.startsWith('+') ? raw : `+${cleanDigits}`,
    displayNational: raw,
    displayInternational: raw,
    type: 'international',
    isWhatsAppViable: cleanDigits.length >= 10,
    channelLabel: 'International Line',
    badgeText: 'Intl Line',
    areaDescription: 'International',
  }
}

/**
 * Builds a direct 1-tap WhatsApp opener URL for verified mobiles only.
 * Returns null for landlines or invalid phones.
 */
export function buildWhatsAppOpenerUrl(
  phone: string | null | undefined,
  businessName?: string,
  ownerName?: string
): string | null {
  const classification = classifyPhoneNumber(phone)
  if (!classification.isWhatsAppViable || !classification.standardizedE164) {
    return null
  }

  const cleanDigits = classification.standardizedE164.replace('+', '')
  const bName = (businessName || 'your business').trim()
  const oName = (ownerName && ownerName !== bName && !ownerName.includes('Owner')) ? ownerName.split(' ')[0] : ''

  const opener = oName ? `Hi ${oName} 👋, is this ${bName}?` : `Hi 👋, is this ${bName}?`
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(opener)}`
}

/**
 * Builds a standard tel: link for instant calling on smartphones and VoIP.
 */
export function buildTelUrl(phone: string | null | undefined): string | null {
  const classification = classifyPhoneNumber(phone)
  if (!classification.standardizedE164 && !classification.cleanDigits) {
    return null
  }
  return `tel:${classification.standardizedE164 || classification.cleanDigits}`
}
