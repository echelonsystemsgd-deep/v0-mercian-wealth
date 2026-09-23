import type { PageNode, DeterministicChecks, FrictionFinding, VariableY, EmailXOutreach } from './types'

export function identifyDeterministicFrictions(
  pages: PageNode[],
  checks: DeterministicChecks,
  businessName: string
): FrictionFinding[] {
  const findings: FrictionFinding[] = []

  // Check 1: Password-protected storefront
  if (checks.isPasswordLocked) {
    findings.push({
      id: 'password_locked',
      classification: 'OBSERVED',
      lane: 'storefront_access',
      location: 'storefront entrance',
      observableProblem: 'the storefront is currently locked behind a password screen',
      recognizableReason: 'visitors arriving from Google or social links hit a password wall and cannot view any pieces or pricing',
      consequenceMechanics: 'they hesitate, assume the store is closed, and leave to find another provider who has an open catalogue',
      confidence: 0.95,
    })
  }

  // Check 2: Social Linktree only (no storefront)
  if (checks.isSocialLinktreeOnly) {
    findings.push({
      id: 'linktree_only',
      classification: 'OBSERVED',
      lane: 'inquiry_routing',
      location: 'bio link navigation',
      observableProblem: 'the link directs visitors to a third-party Linktree with social DMs rather than a dedicated storefront',
      recognizableReason: 'high-intent buyers must message back and forth on Instagram or WhatsApp just to check availability or pricing',
      consequenceMechanics: 'waiting hours for a response causes buyers to lose momentum and look elsewhere before an answer arrives',
      confidence: 0.9,
    })
  }

  // Check 3: Clunky or excessive form fields (>6 fields on quote/contact page)
  const heavyFormPage = pages.find((p) => p.formFieldsTotal >= 6)
  if (heavyFormPage) {
    findings.push({
      id: 'heavy_form',
      classification: 'OBSERVED',
      lane: 'booking_conversion',
      location: heavyFormPage.path,
      observableProblem: `the form requires ${heavyFormPage.formFieldsTotal} separate fields to submit an enquiry on mobile`,
      recognizableReason: 'typing detailed specifications on a smartphone keyboard in the evening creates friction and hesitation',
      consequenceMechanics: 'buyers postpone completing the form and bounce to whoever allows a 2-tap appointment or enquiry',
      confidence: 0.85,
    })
  }

  // Check 4: Missing direct action / No booking widget on high-ticket service
  const hasBookingOrCta = checks.hasWhatsApp || pages.some((p) => p.hasBookingWidget)
  if (!hasBookingOrCta) {
    const contactPage = pages.find((p) => p.path.toLowerCase().includes('contact') || p.path.toLowerCase().includes('book'))
    findings.push({
      id: 'no_instant_action',
      classification: 'INFERRED',
      lane: 'after_hours_capture',
      location: contactPage ? contactPage.path : 'primary contact section',
      observableProblem: 'there is no direct 1-tap booking or instant reservation mechanism for after-hours visitors',
      recognizableReason: 'when clients browse outside normal business hours, there is no way to confirm a slot on the spot',
      consequenceMechanics: 'they leave without locking in commitment and explore whoever accepts online appointment holds',
      confidence: 0.75,
    })
  }

  // Check 5: Non-responsive viewport on mobile
  if (!checks.isResponsive && pages.length > 0) {
    findings.push({
      id: 'mobile_viewport_missing',
      classification: 'OBSERVED',
      lane: 'mobile_experience',
      location: 'mobile layout',
      observableProblem: 'the page lacks a responsive mobile viewport, requiring horizontal scrolling and pinch-to-zoom',
      recognizableReason: 'smartphone users struggle to tap buttons and read copy comfortably on smaller screens',
      consequenceMechanics: 'navigating feels clunky and slow, leading visitors to abandon the session',
      confidence: 0.9,
    })
  }

  return findings
}

// Format the Email X / Variable Y pitch strictly according to the Module 1 & 2 PDFs
export function formatEmailXOutreach(
  variableY: VariableY,
  operatorName = 'Gurtej',
  companyBrand = 'Mercian Wealth'
): EmailXOutreach {
  const greeting = variableY.name ? `Hi ${variableY.name},` : 'Hi,'
  const observation = `I noticed ${variableY.websiteProblem} on ${variableY.page}`
  const mechanics = `because ${variableY.recognizableReason}, ${variableY.consequenceMechanics}.`
  const freeValueOffer = `I put together a quick 30-second mobile concept showing how to resolve this on ${variableY.page}. You can review it fast, and if it's not useful, ignore it and it ends.`
  const microYes = 'Open to taking a quick look?'
  const signOff = `Best regards,\n${operatorName}\n${companyBrand}`

  const fullEmailText = `${variableY.subjectLine ? `Subject: ${variableY.subjectLine}\n\n` : ''}${greeting}\n\n${observation}, and ${mechanics}\n\n${freeValueOffer}\n\n${microYes}\n\n${signOff}`

  return {
    subjectLine: variableY.subjectLine,
    greeting,
    observation,
    mechanics,
    freeValueOffer,
    microYes,
    signOff,
    fullEmailText,
    variableY,
  }
}
