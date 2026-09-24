import type {
  PageNode,
  DeterministicChecks,
  FrictionFinding,
  VariableY,
  EmailXOutreach,
  WhatsAppXOutreach,
  WhatsApp3MessageSequence,
  WhatsAppMessageBlock,
  OutreachIntelligence,
  PipelineClassification,
} from './types'

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
      customerNextStep: 'Browse collections & view catalog',
      lane: 'Storefront entry',
      location: 'Storefront entrance / homepage',
      observableProblem: 'the storefront is currently locked behind a password screen',
      evidence: 'Storefront homepage redirected to a password wall challenge, blocking catalog visibility.',
      recognizableReason: 'visitors arriving from Google or social bio links hit a password wall and cannot view any pieces or pricing',
      consequenceMechanics: 'they hesitate, assume the store is closed or private, and leave to find another provider who has an open catalogue',
      confidence: 0.95,
      scores: {
        visible: true,
        fast: true,
        logical: true,
        decisionTied: true,
        observable: true,
        noNumbers: true,
      },
    })
  }

  // Check 2: Social Linktree only (no dedicated website)
  if (checks.isSocialLinktreeOnly) {
    findings.push({
      id: 'linktree_only',
      classification: 'OBSERVED',
      customerNextStep: 'Explore services and initiate booking',
      lane: 'Bio link / profile navigation',
      location: 'Instagram/Social Bio link',
      observableProblem: 'the bio link points to a multi-button Linktree with social DMs rather than a dedicated storefront',
      evidence: 'Public profile links to a linktr.ee/third-party multi-hub requiring Instagram DM inquiry.',
      recognizableReason: 'high-intent buyers must message back and forth on Instagram or WhatsApp just to check availability or pricing',
      consequenceMechanics: 'waiting hours for a manual response causes buyers to lose momentum and look elsewhere before an answer arrives',
      confidence: 0.9,
      scores: {
        visible: true,
        fast: true,
        logical: true,
        decisionTied: true,
        observable: true,
        noNumbers: true,
      },
    })
  }

  // Check 3: Clunky or excessive form fields (>=6 fields on quote/contact page)
  const heavyFormPage = pages.find((p) => p.formFieldsTotal >= 6)
  if (heavyFormPage) {
    findings.push({
      id: 'heavy_form',
      classification: 'OBSERVED',
      customerNextStep: 'Submit project specification or quote request',
      lane: 'Quote enquiry form',
      location: heavyFormPage.path,
      observableProblem: `the form requires ${heavyFormPage.formFieldsTotal} separate text inputs to submit an enquiry on mobile`,
      evidence: `Page ${heavyFormPage.path} contains ${heavyFormPage.formFieldsTotal} form input elements requiring keyboard typing on mobile.`,
      recognizableReason: 'typing detailed specifications on a smartphone keyboard in the evening creates friction and hesitation',
      consequenceMechanics: 'buyers postpone completing the form and leave to message whoever offers a streamlined 2-tap enquiry',
      confidence: 0.88,
      scores: {
        visible: true,
        fast: true,
        logical: true,
        decisionTied: true,
        observable: true,
        noNumbers: true,
      },
    })
  }

  // Check 4: Missing direct action / No booking widget on high-ticket service
  const hasBookingOrCta = checks.hasWhatsApp || pages.some((p) => p.hasBookingWidget)
  if (!hasBookingOrCta) {
    const contactPage = pages.find(
      (p) => p.path.toLowerCase().includes('contact') || p.path.toLowerCase().includes('book')
    )
    findings.push({
      id: 'no_instant_action',
      classification: 'OBSERVED',
      customerNextStep: 'Confirm appointment or secure consultation slot',
      lane: 'Consultation & booking stage',
      location: contactPage ? contactPage.path : 'primary contact page',
      observableProblem: 'there is no direct booking or appointment confirmation mechanism for after-hours visitors',
      evidence: 'No calendar embed, direct booking widget, or instant messaging mechanism detected on contact page.',
      recognizableReason: 'when clients browse outside normal business hours, there is no way to lock in a slot on the spot',
      consequenceMechanics: 'they have less certainty at the decision point and continue comparing alternatives that accept instant bookings',
      confidence: 0.82,
      scores: {
        visible: true,
        fast: true,
        logical: true,
        decisionTied: true,
        observable: true,
        noNumbers: true,
      },
    })
  }

  // Check 5: Non-responsive viewport on mobile
  if (!checks.isResponsive && pages.length > 0) {
    findings.push({
      id: 'mobile_viewport_missing',
      classification: 'OBSERVED',
      customerNextStep: 'Read service details and navigate options',
      lane: 'Mobile viewing experience',
      location: 'Mobile viewport layout',
      observableProblem: 'the page lacks a responsive mobile viewport, requiring horizontal scrolling and pinch-to-zoom',
      evidence: 'Missing <meta name="viewport" content="width=device-width"> tag on scanned page.',
      recognizableReason: 'smartphone users struggle to tap buttons and read copy comfortably on smaller screens',
      consequenceMechanics: 'navigating feels clunky and slow, leading visitors to abandon the session',
      confidence: 0.92,
      scores: {
        visible: true,
        fast: true,
        logical: true,
        decisionTied: true,
        observable: true,
        noNumbers: true,
      },
    })
  }

  return findings
}

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

export function buildWhatsApp3MessageSequence(
  variableY: VariableY,
  classification: PipelineClassification = 'HAS_WEBSITE',
  trade = 'local services',
  city = 'your area'
): WhatsApp3MessageSequence {
  const company = variableY.company || 'your business'
  const name = variableY.name?.trim()
  const nameSalutation = name ? `Hi ${name} 👋` : 'Hi 👋'
  const isNoWebsite = classification === 'NO_WEBSITE'

  // Message 1 (Opener - Send First):
  // Short conversational question confirming interest/identity (based on Overview "Next Action" style).
  // Never pitch on message 1.
  const msg1Text = isNoWebsite
    ? `${nameSalutation} Came across ${company} — quick question: how do new customers currently find and browse your work outside working hours?`
    : `${nameSalutation} Came across ${company} — quick question: how do customers typically browse and enquire on mobile for you?`

  // Message 2 (Observation - Send after they reply):
  // State one specific, observable friction in plain language (no offer yet).
  const pageStr = variableY.page && variableY.page !== 'None' ? variableY.page : 'your site'
  const problemStr = variableY.websiteProblem || 'friction in your customer booking journey'

  const msg2Text = isNoWebsite
    ? `Makes total sense! I actually had a look for your dedicated website to see your recent work and booking details, but couldn't find one active.`
    : `Makes total sense! I had a quick look through on my phone and noticed ${problemStr} on ${pageStr}.`

  // Message 3 (Mechanics + Micro-Yes Offer - Send once engaged):
  // Cause-and-effect reasoning + 30s free prototype preview offer + single low-commitment micro-yes question.
  const reasonStr = variableY.recognizableReason || 'customers comparing options in the evening want fast certainty'
  const consequenceStr = variableY.consequenceMechanics || 'having points of friction causes them to hesitate and compare alternatives'

  const msg3Text = isNoWebsite
    ? `Usually when customers compare local ${trade} specialists in the evening, having no dedicated place to confirm services and availability means they hesitate at that decision point and look at alternatives.\n\nPut together a quick 30-second mobile concept showing how ${company} could showcase your work and capture those enquiries directly.\n\nOpen to seeing a quick 30-second preview? (Zero obligation at all 👍)`
    : `Usually when ${reasonStr}, ${consequenceStr}.\n\nPut together a quick 30-second mobile concept showing how to streamline that step for ${company}.\n\nOpen to taking a quick look on your phone? (Zero obligation at all 👍)`

  const message1: WhatsAppMessageBlock = {
    step: 1,
    label: 'Message 1: Opener',
    sublabel: 'Conversational Hook',
    whenToSend: 'Send first',
    text: msg1Text,
  }

  const message2: WhatsAppMessageBlock = {
    step: 2,
    label: 'Message 2: Observation',
    sublabel: '1 Specific Friction',
    whenToSend: 'Send after they reply',
    text: msg2Text,
  }

  const message3: WhatsAppMessageBlock = {
    step: 3,
    label: 'Message 3: Mechanics & Micro-Yes',
    sublabel: 'Cause & Effect + Free 30s Preview',
    whenToSend: 'Send once engaged',
    text: msg3Text,
  }

  const fullSequenceText = `--- MESSAGE 1 (${message1.whenToSend.toUpperCase()}) ---\n${message1.text}\n\n--- MESSAGE 2 (${message2.whenToSend.toUpperCase()}) ---\n${message2.text}\n\n--- MESSAGE 3 (${message3.whenToSend.toUpperCase()}) ---\n${message3.text}`

  return {
    message1,
    message2,
    message3,
    fullSequenceText,
  }
}

export function formatWhatsAppXOutreach(
  variableY: VariableY,
  classification: PipelineClassification = 'HAS_WEBSITE',
  trade = 'local services',
  city = 'your area'
): WhatsAppXOutreach {
  const sequence = buildWhatsApp3MessageSequence(variableY, classification, trade, city)
  const greeting = variableY.name ? `Hi ${variableY.name},` : 'Hi,'
  const observation = `noticed ${variableY.websiteProblem} on ${variableY.page}`
  const mechanics = `Usually when ${variableY.recognizableReason}, ${variableY.consequenceMechanics}.`
  const freeValueOffer = `Put together a quick 30-second mobile preview showing how to resolve this on ${variableY.page}.`
  const microYes = 'Open to taking a quick look on your phone? (Zero obligation at all 👍)'

  return {
    sequence,
    greeting,
    observation,
    mechanics,
    freeValueOffer,
    microYes,
    fullWhatsAppText: sequence.message1.text,
    variableY,
  }
}

export function buildNoWebsiteIntelligence(
  businessName: string,
  city = 'your area',
  trade = 'local services',
  ownerName?: string
): OutreachIntelligence {
  const friction: FrictionFinding = {
    id: 'no_website_decision_gap',
    classification: 'OBSERVED',
    customerNextStep: 'Decide whether to contact the business or request a booking',
    lane: 'Initial verification & trust stage',
    location: 'Public Google Maps & online presence',
    observableProblem: 'there is no dedicated website or storefront found for evening clients to verify past work or pricing',
    evidence: `Public presence search on Google Maps & directories confirmed no dedicated website active for ${businessName}.`,
    recognizableReason: `a customer comparing several local ${trade} specialists in the evening often wants to see recent projects, pricing guidance, and available dates before deciding who to message`,
    consequenceMechanics: 'having no dedicated place to quickly confirm those details means they have less certainty at the decision point, so they continue comparing alternatives',
    confidence: 0.9,
    scores: {
      visible: true,
      fast: true,
      logical: true,
      decisionTied: true,
      observable: true,
      noNumbers: true,
    },
  }

  const variableY: VariableY = {
    name: ownerName,
    company: businessName,
    website: 'None (Google Maps presence)',
    page: 'Google Maps presence',
    websiteProblem: friction.observableProblem,
    evidence: friction.evidence,
    customerNextStep: friction.customerNextStep,
    lane: friction.lane,
    recognizableReason: friction.recognizableReason,
    consequenceMechanics: friction.consequenceMechanics,
    subjectLine: `Question regarding ${businessName} in ${city}`,
  }

  const emailX = formatEmailXOutreach(variableY)
  const whatsAppX = formatWhatsAppXOutreach(variableY, 'NO_WEBSITE', trade, city)

  const callBridgeScript = `Hi ${ownerName || 'there'}, glad you checked out the preview. The goal isn't to add an extra marketing expense to your business — it's simply to show you what's possible when high-intent evening clients can explore your work and book directly. Happy to hop on a short 10-15 minute screen-share to walk you through the possibilities and see if it makes commercial sense for ${businessName}.`

  return {
    classification: 'NO_WEBSITE',
    customerNextStep: friction.customerNextStep,
    lane: friction.lane,
    location: friction.location,
    pageUrl: '',
    friction: friction.observableProblem,
    evidence: friction.evidence,
    recognizableReason: friction.recognizableReason,
    consequenceMechanics: friction.consequenceMechanics,
    confidence: 'High',
    candidates: [friction],
    selectedCandidateId: friction.id,
    emailX,
    whatsAppX,
    callBridgeScript,
    freeValueTask: {
      title: `Build 30s Mobile Prototype for ${businessName}`,
      description: `Create a lightweight mobile storefront prototype demonstrating recent ${trade} projects, pricing guidance, and 2-tap booking to solve the after-hours verification gap.`,
      prototypeFocus: 'After-hours mobile trust & booking flow',
    },
  }
}
