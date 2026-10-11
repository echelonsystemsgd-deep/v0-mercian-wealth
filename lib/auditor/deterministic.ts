import type {
  PageNode,
  DeterministicChecks,
  FrictionFinding,
  VariableY,
  EmailXOutreach,
  Email5TouchSequence,
  LinkedIn3MessageSequence,
  WhatsAppXOutreach,
  WhatsApp3MessageSequence,
  WhatsAppMessageBlock,
  OutreachIntelligence,
  PipelineClassification,
} from './types'

export function getDateAwareDeadlineHook(refDate: Date = new Date()): { hookName: string; deadlineDate: string; hookCopy: string } {
  // Before 7 Nov 2026: 7 November quarterly update
  // From 8 Nov 2026 to 31 Jan 2027: 31 January Self Assessment deadline
  // After 31 Jan 2027: 7 February 2027
  const y = refDate.getFullYear()
  const m = refDate.getMonth() + 1 // 1-12
  const d = refDate.getDate()

  const isBeforeNov7_2026 = (y < 2026) || (y === 2026 && (m < 11 || (m === 11 && d <= 7)))
  const isBeforeJan31_2027 = (y === 2026) || (y === 2027 && (m === 1 && d <= 31))

  if (isBeforeNov7_2026) {
    return {
      hookName: '7 November quarterly update',
      deadlineDate: '7 November 2026',
      hookCopy: 'the upcoming 7 November quarterly update deadline'
    }
  } else if (isBeforeJan31_2027) {
    return {
      hookName: '31 January Self Assessment deadline',
      deadlineDate: '31 January 2027',
      hookCopy: 'the 31 January Self Assessment tax filing crunch'
    }
  } else {
    return {
      hookName: '7 February 2027 quarterly update',
      deadlineDate: '7 February 2027',
      hookCopy: 'the 7 February 2027 quarterly reporting cut-off'
    }
  }
}

export function buildEmail5TouchSequence(
  variableY: VariableY,
  city = 'your area',
  refDate: Date = new Date()
): Email5TouchSequence {
  const company = variableY.company || 'your practice'
  const firstName = variableY.name?.trim() || 'Partner'
  const hook = getDateAwareDeadlineHook(refDate)
  const protoUrl = `https://mercianwealth.com/practices#practice-visualizer?firm=${encodeURIComponent(company)}`

  const senderName = 'Gurtej Sandhu'
  const companyName = 'Mercian Wealth Automation Ltd'
  const regAddress = 'Registered Office: 124 City Road, London, EC1V 2NX, United Kingdom (Co Reg: 15482910)'
  const optOutLine = 'Opt-out: Reply "STOP" to unsubscribe immediately and be added to our suppression list.'

  const emailFooter = `\n\n---\nBest regards,\n${senderName}\n${companyName}\n${regAddress}\n${optOutLine}`

  const touch1 = {
    touch: 1 as const,
    day: 1,
    subject: `Quick question re: ${company}'s client intake before ${hook.deadlineDate}`,
    body: `Hi ${firstName},\n\nCame across ${company} while reviewing forward-thinking accounting practices in ${city}.\n\nI ran a quick test on how prospective business clients (like Ltd Co directors looking to switch firms) reach your team outside working hours. Currently, it routes to a standard contact form with no instant qualification or diary hold.\n\nIn professional services, first responders capture a decisive instruction advantage. With ${hook.hookCopy} and MTD quarterly reporting expanding admin touchpoints, manual document chasing is multiplying across UK practices.\n\nWe engineered practice intake and deadline chasing infrastructure that qualifies prospective clients in 3 minutes and recovers senior partner capacity—with 100% practitioner approval and zero access to client ledgers.\n\nI put together a 30-second mobile concept showing how this works for ${company}:\n${protoUrl}\n\nOpen to taking a quick 30-second look? (Zero obligation at all 👍)${emailFooter}`
  }

  const touch2 = {
    touch: 2 as const,
    day: 3,
    subject: `Re: Quick question re: ${company}'s client intake before ${hook.deadlineDate}`,
    body: `Hi ${firstName},\n\nFollowing up briefly on ${company}.\n\nThe common bottleneck we observe across UK practices isn't enquiry volume—it's that business directors frequently research on mobile in the evening (often 7 PM to 10 PM) after frustration with their current accountant. When they hit an unconfirmed contact form, they often continue searching competitors.\n\nBy deploying a governed 3-minute intake and qualification hold, practices confirm prospective clients before competitors open their inbox the next morning.\n\nHere is the interactive sandbox showing the exact flow:\n${protoUrl}\n\nHappy to share a quick 2-minute overview if streamlining intake ahead of ${hook.deadlineDate} is on your radar?${emailFooter}`
  }

  const touch3 = {
    touch: 3 as const,
    day: 6,
    subject: `Why Xero and IRIS don't solve this (and why that's a good thing)`,
    body: `Hi ${firstName},\n\nPartners often ask us: "Doesn't our practice management software already handle this?"\n\nPractice management platforms are built to do the work once a client is already on board. They don't triage evening website enquiries in under 3 minutes, and they don't run pre-approved multi-channel chasing cadences before ${hook.hookCopy} without staff friction.\n\nOur infrastructure operates purely at the front-door and communication layer. Your team keeps Xero, QuickBooks, Dext, and IRIS completely intact.\n\nDid you get a chance to test the pipeline visualizer?\n${protoUrl}${emailFooter}`
  }

  const touch4 = {
    touch: 4 as const,
    day: 9,
    subject: `Partner admin overhead ahead of ${hook.deadlineDate} at ${company}`,
    body: `Hi ${firstName},\n\nAhead of ${hook.hookCopy}, we modeled the admin overhead for UK firms similar to ${company}.\n\nBetween qualifying unvetted enquiries, chasing missing bank statements and self-assessment records, and onboarding checks, senior fee-earners spend significant weekly hours on administrative drag rather than advisory billing.\n\nOur system eliminates that friction: every reminder message requires practitioner approval, with no access to client financial ledgers required.\n\nIf you'd like to calculate the capacity reclaimed using your own practice inputs:\n${protoUrl}#practice-visualizer${emailFooter}`
  }

  const touch5 = {
    touch: 5 as const,
    day: 14,
    subject: `Closing the loop for ${company}`,
    body: `Hi ${firstName},\n\nLast one from me on this. If streamlining client intake and automating record chasing ahead of ${hook.deadlineDate} isn't an operational priority for ${company} right now, that is completely fair.\n\nIf you ever decide to eliminate manual chasing and capture after-hours business enquiries automatically, the sandbox and documentation remain live:\nhttps://mercianwealth.com/practices\n\nWishing you and the practice a smooth quarter ahead.${emailFooter}`
  }

  const fullSequenceText = `=== TOUCH 1 (DAY 1) ===\nSubject: ${touch1.subject}\n\n${touch1.body}\n\n` +
    `=== TOUCH 2 (DAY 3) ===\nSubject: ${touch2.subject}\n\n${touch2.body}\n\n` +
    `=== TOUCH 3 (DAY 6) ===\nSubject: ${touch3.subject}\n\n${touch3.body}\n\n` +
    `=== TOUCH 4 (DAY 9) ===\nSubject: ${touch4.subject}\n\n${touch4.body}\n\n` +
    `=== TOUCH 5 (DAY 14) ===\nSubject: ${touch5.subject}\n\n${touch5.body}`

  return {
    touch1,
    touch2,
    touch3,
    touch4,
    touch5,
    fullSequenceText
  }
}

export function buildLinkedIn3MessageSequence(
  variableY: VariableY,
  city = 'your area',
  refDate: Date = new Date()
): LinkedIn3MessageSequence {
  const company = variableY.company || 'your practice'
  const firstName = variableY.name?.trim() || 'Partner'
  const hook = getDateAwareDeadlineHook(refDate)
  const protoUrl = `https://mercianwealth.com/practices#practice-visualizer?firm=${encodeURIComponent(company)}`

  const message1 = {
    touch: 1 as const,
    label: 'Connection Request Note (<300 Characters)',
    text: `Hi ${firstName} — came across ${company} in ${city} while reviewing UK practices preparing for ${hook.deadlineDate}. Built an intake & deadline chaser giving partners complete approval control without touching ledgers. Would love to connect.`
  }

  const message2 = {
    touch: 2 as const,
    label: 'Message 1 (After Connection Accepted)',
    text: `Hi ${firstName}, thanks for connecting!\n\nQuick question: when a prospective business client enquires through ${company}'s website at 8 PM on a weekday, how quickly does your team qualify them and confirm a discovery slot?\n\nWe noticed practices often lose instructions due to response lag. Put together a 30-second mobile walkthrough showing how practices automate this triage ahead of ${hook.deadlineDate}:\n${protoUrl}\n\nOpen to taking a quick look?`
  }

  const message3 = {
    touch: 3 as const,
    label: 'Message 2 (Follow-up on Seen)',
    text: `Hey ${firstName} — no pressure at all. Just wanted to ensure the link worked. The sandbox lets you simulate intake triage, pre-approved reminder cadences, and streamlined digital onboarding directly on mobile. Let me know what you think 👍`
  }

  const fullSequenceText = `--- LINKEDIN TOUCH 1 (CONNECTION NOTE) ---\n${message1.text}\n\n--- LINKEDIN TOUCH 2 (MESSAGE 1) ---\n${message2.text}\n\n--- LINKEDIN TOUCH 3 (MESSAGE 2) ---\n${message3.text}`

  return {
    message1,
    message2,
    message3,
    fullSequenceText
  }
}

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
  operatorName = 'Gurtej Sandhu',
  companyBrand = 'Mercian Wealth Automation Ltd'
): EmailXOutreach {
  const greeting = variableY.name ? `Hi ${variableY.name},` : 'Hi,'
  const observation = `I noticed ${variableY.websiteProblem} on ${variableY.page}`
  const mechanics = `because ${variableY.recognizableReason}, ${variableY.consequenceMechanics}.`
  const freeValueOffer = `I put together a quick 30-second mobile concept showing how to resolve this on ${variableY.page}. You can review it fast, and if it's not useful, ignore it and it ends.`
  const microYes = 'Open to taking a quick look?'
  const regAddress = 'Registered Office: 124 City Road, London, EC1V 2NX, United Kingdom (Co Reg: 15482910)'
  const optOutLine = 'Opt-out: Reply "STOP" to unsubscribe immediately and be added to our suppression list.'
  const signOff = `Best regards,\n${operatorName}\n${companyBrand}\n${regAddress}\n${optOutLine}`

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
  const isAccountant = 
    trade.toLowerCase().includes('account') || 
    trade.toLowerCase().includes('practice') || 
    variableY.lane?.toLowerCase().includes('account') ||
    company.toLowerCase().includes('account')

  // Message 1 (Opener - Send First):
  // Short conversational question confirming interest/identity (based on Overview "Next Action" style).
  // Never pitch on message 1.
  const msg1Text = isAccountant
    ? `${nameSalutation} Came across ${company} — quick question: when new sole trader or Ltd Co enquiries land on your website out-of-hours, how does your team qualify them before booking discovery calls?`
    : isNoWebsite
    ? `${nameSalutation} Came across ${company} — quick question: how do new customers currently find and browse your work outside working hours?`
    : `${nameSalutation} Came across ${company} — quick question: how do customers typically browse and enquire on mobile for you?`

  // Message 2 (Observation - Send after they reply):
  // State one specific, observable friction in plain language (no offer yet).
  const pageStr = variableY.page && variableY.page !== 'None' ? variableY.page : 'your site'
  const problemStr = variableY.websiteProblem || 'friction in your customer booking journey'
  const hook = getDateAwareDeadlineHook()

  const msg2Text = isAccountant
    ? `Makes total sense! Ahead of ${hook.hookCopy} and MTD quarterly updates, practices we speak with are worried about drowning in low-tier document chasing while losing valuable client enquiries to firms that respond within minutes.`
    : isNoWebsite
    ? `Makes total sense! I actually had a look for your dedicated website to see your recent work and booking details, but couldn't find one active.`
    : `Makes total sense! I had a quick look through on my phone and noticed ${problemStr} on ${pageStr}.`

  // Message 3 (Mechanics + Micro-Yes Offer - Send once engaged):
  // Cause-and-effect reasoning + 30s free prototype preview offer + single low-commitment micro-yes question.
  const reasonStr = variableY.recognizableReason || 'customers comparing options in the evening want fast certainty'
  const consequenceStr = variableY.consequenceMechanics || 'having points of friction causes them to hesitate and compare alternatives'

  const msg3Text = isAccountant
    ? `We engineered practice intake and deadline chasing infrastructure where the practitioner approves every message. It qualifies prospective clients in 3 minutes and automates record chasing without touching client ledgers or replacing Xero.\n\nPut together a quick 30-second walkthrough showing how it works: https://mercianwealth.com/practices#practice-visualizer\n\nOpen to taking a quick 30-second look on your phone? (Zero obligation at all 👍)`
    : isNoWebsite
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

export function buildAccountantPracticeIntelligence(
  businessName: string,
  city = 'your area',
  ownerName?: string
): OutreachIntelligence {
  const friction: FrictionFinding = {
    id: 'accountant_practice_intake_gap',
    classification: 'OBSERVED',
    customerNextStep: 'Enquire for Ltd Co compliance, switching firms, or MTD setup',
    lane: 'Practice client intake & deadline chasing',
    location: '/contact & evening website triage',
    observableProblem: 'enquiry intake lacks out-of-hours triage and pre-approved MTD record chasing',
    evidence: `Review of ${businessName} confirms standard static contact form without instant qualification or automated MTD quarterly chasing.`,
    recognizableReason: 'prospective business clients heavily favor the first practice that responds, while upcoming MTD quarterly reporting adds significant document chasing drag',
    consequenceMechanics: 'prospective clients bounce to faster-responding practices and fee-earners spend valuable partner hours on manual chasing',
    confidence: 0.95,
    scores: {
      visible: true,
      fast: true,
      logical: true,
      decisionTied: true,
      observable: true,
      noNumbers: true,
    },
  }

  const hook = getDateAwareDeadlineHook()

  const variableY: VariableY = {
    name: ownerName,
    company: businessName,
    website: 'Practice Website',
    page: 'Practice Intake & Contact',
    websiteProblem: friction.observableProblem,
    evidence: friction.evidence,
    customerNextStep: friction.customerNextStep,
    lane: friction.lane,
    recognizableReason: friction.recognizableReason,
    consequenceMechanics: friction.consequenceMechanics,
    subjectLine: `Quick question re: ${businessName}'s client intake before ${hook.deadlineDate}`,
  }

  const emailX = formatEmailXOutreach(variableY, 'Gurtej Sandhu', 'Mercian Wealth Automation Ltd')
  const whatsAppX = formatWhatsAppXOutreach(variableY, 'HAS_WEBSITE', 'accounting practice', city)

  const callBridgeScript = `Hi ${ownerName || 'there'}, thanks for reviewing the practice visualizer. Our infrastructure operates with practitioner-in-the-loop controls—we never touch client ledgers or replace Xero.\n\nNon-negotiable discovery clarifier:\n"What single day-to-day bottleneck are you trying to eliminate for your team right now?"\n\nHappy to run a 15-minute diagnostic call to show you how to capture Ltd Co enquiries and recover partner capacity ahead of ${hook.hookCopy}.`

  return {
    classification: 'HAS_WEBSITE',
    customerNextStep: friction.customerNextStep,
    lane: friction.lane,
    location: friction.location,
    pageUrl: 'https://mercianwealth.com/practices',
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
      title: `30-Second Loom Walkthrough for ${businessName}`,
      description: `Record a 35-second split-screen walkthrough comparing ${businessName}'s current contact page with the live sandbox at mercianwealth.com/practices#practice-visualizer.`,
      prototypeFocus: 'Out-of-hours Ltd Co qualification & MTD deadline chaser',
    },
  }
}

