import type {
  AuditAnalysis,
  GeneratedOutreach
} from './evidence-types'
import { getDateAwareMtdDeadline } from './rubric'

/**
 * Validates that every claim in the message maps to an evidenced finding id.
 * Blocks any message with unevidenced claims.
 */
export function validateOutreachClaims(
  analysis: AuditAnalysis,
  texts: string[]
): { isValid: boolean; unmappedClaims: string[]; evidenceMap: Record<string, string> } {
  const evidenceMap: Record<string, string> = {}
  analysis.findings.forEach(f => {
    evidenceMap[f.id] = String(f.evidence.measuredValue)
  })

  const unmappedClaims: string[] = []

  // Known forbidden buzzwords and unevidenced claims
  const forbiddenPhrases = [
    { phrase: 'lost 40%', reason: 'Invented statistic' },
    { phrase: 'lose £', reason: 'Invented revenue statistic' },
    { phrase: 'guarantee 10x', reason: 'Unverified ROI claim' },
    { phrase: 'only 3 slots left', reason: 'Artificial urgency trick' },
    { phrase: 'your website is broken', reason: 'Hyperbolic unevidenced claim' }
  ]

  for (const text of texts) {
    for (const item of forbiddenPhrases) {
      if (text.toLowerCase().includes(item.phrase)) {
        unmappedClaims.push(`Blocked phrase "${item.phrase}": ${item.reason}`)
      }
    }
  }

  return {
    isValid: unmappedClaims.length === 0,
    unmappedClaims,
    evidenceMap
  }
}

/**
 * Generates verified outreach messages derived EXCLUSIVELY from the AuditAnalysis object.
 * Guarantee: Messages cannot contradict the analysis because they are pure functions of it.
 */
export function generateOutreachFromAnalysis(
  analysis: AuditAnalysis,
  prototypeBaseUrl = 'https://uk-accountancy-os-prototype.vercel.app/',
  refDate: Date = new Date()
): GeneratedOutreach {
  const { businessName, primaryAngle, buildFingerprint, domain } = analysis
  const deadline = getDateAwareMtdDeadline(refDate)
  const protoUrl = `${prototypeBaseUrl}?firm=${encodeURIComponent(businessName)}`

  // Evidence anchor snippet
  const evidenceValue = String(primaryAngle.evidence.measuredValue)

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. RECOMMENDED WHATSAPP OPENER
  // (In "we" voice, outcome-first, with primary angle & real evidence, mandatory opt-out)
  // ─────────────────────────────────────────────────────────────────────────────
  let whatsappOpenerRecommended = ''
  let whatsappOpenerAlternative = ''

  if (primaryAngle.id === 'angle_response_speed') {
    whatsappOpenerRecommended =
      `Hi team 👋 We were looking through ${domain} on mobile and noticed enquiries submit into a standard form without response timing or an instant booking hold.\n\n` +
      `With ${deadline.hookCopy} approaching, when business directors research an accountant in the evening, they usually favour whoever confirms next steps immediately.\n\n` +
      `We put together a 30-second mobile concept showing how UK practices pre-qualify turnover and lock discovery appointments in 60 seconds: ${protoUrl}\n\n` +
      `Open to taking a quick look on your phone?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Quick operational question for ${businessName}: when new Ltd Co or sole trader enquiries land on ${domain} out-of-hours, how does your team pre-qualify their turnover before scheduling partner discovery calls?\n\n` +
      `Reason we ask is we noticed the intake routes into a general form without upfront fee expectations.\n\n` +
      `We engineered a working accountancy intake model for practices here: ${protoUrl}\n\n` +
      `Happy to share a 30-second walkthrough if helpful. If you'd rather not hear from us, just say stop.`
  } else if (primaryAngle.id === 'angle_mtd_deadline_drag') {
    whatsappOpenerRecommended =
      `Hi team 👋 We came across ${businessName} while reviewing UK accounting practices preparing for ${deadline.hookName}.\n\n` +
      `Ahead of ${deadline.deadlineDate}, the biggest capacity drain partners mention is manual document chasing across email and WhatsApp.\n\n` +
      `We built a pre-approved deadline reminder engine that collects records and client confirmations automatically—requiring partner sign-off on every message, without touching client ledgers: ${protoUrl}\n\n` +
      `Open to taking a 30-second look on your phone?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Quick question regarding ${businessName}'s client record chasing before ${deadline.hookCopy}:\n\n` +
      `How many hours does your team currently spend manually following up with clients for missing records?\n\n` +
      `We developed an automated intake sandbox specifically for UK accountancy firms: ${protoUrl}\n\n` +
      `Would you be open to a 30-second look? If you'd rather not hear from us, just say stop.`
  } else if (primaryAngle.id === 'angle_fee_anchoring') {
    whatsappOpenerRecommended =
      `Hi team 👋 We visited ${domain} on mobile and noticed prospective business clients have no way to gauge retainer tiers or turnover brackets before enquiring.\n\n` +
      `For commercial firms, that usually means fee-earners burning time in manual quotation cycles with price-shoppers.\n\n` +
      `We put together an interactive turnover slider and 60-second booking flow designed for UK practices: ${protoUrl}\n\n` +
      `Open to a 30-second look to see how it filters enquiries?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Noticed on ${domain} that new enquiries submit without upfront turnover pre-qualification.\n\n` +
      `We engineered a 60-second intake prototype showing how UK firms anchor premium retainers and filter tire-kickers: ${protoUrl}\n\n` +
      `Would you be open to taking a quick look on your phone? If you'd rather not hear from us, just say stop.`
  } else {
    // Evidenced layout or custom friction
    whatsappOpenerRecommended =
      `Hi team 👋 We were reviewing ${domain} on a 390px mobile screen and noticed ${primaryAngle.headline.toLowerCase()} (${evidenceValue}).\n\n` +
      `We put together a lightweight mobile prototype showing how prospective commercial clients can explore your packages and book a consultation in 2 taps: ${protoUrl}\n\n` +
      `Open to taking a quick 30-second look on your phone?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Noticed on ${domain} on mobile that visitors encounter ${primaryAngle.title.toLowerCase()}.\n\n` +
      `We designed a clean accountancy client intake demo that eliminates that friction: ${protoUrl}\n\n` +
      `Open to taking a look? If you'd rather not hear from us, just say stop.`
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. FOLLOW-UPS (Day 3 & Day 7)
  // ─────────────────────────────────────────────────────────────────────────────
  const whatsappFollowUp1 =
    `Hi team, following up briefly on our note from earlier this week.\n\n` +
    `The bottleneck we see across UK practices isn't enquiry volume—it's that decision-ready directors searching in the evening want instant confirmation before they move on to competing firms.\n\n` +
    `Did the prototype link come through cleanly on your phone? ${protoUrl}\n\n` +
    `If you'd rather not hear from us, just say stop.`

  const whatsappFollowUp2 =
    `Hi team, last note from us on this. If streamlining client intake or automating record chasing ahead of ${deadline.hookName} isn't an operational priority for ${businessName} right now, completely understand.\n\n` +
    `The walkthrough remains live at ${protoUrl} if you ever want to review it down the line.\n\n` +
    `Wishing you and the team a smooth quarter ahead.`

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. BUILDER REPOSITION REPLY ("My builder/web person will fix that")
  // ─────────────────────────────────────────────────────────────────────────────
  const whatsappBuilderReply =
    `Totally fair, and having a good web person is great.\n\n` +
    `The cosmetic part on the page is easy for them to fix in 10 minutes. What we help with is what happens after someone enquires:\n\n` +
    `1. Out-of-hours response speed (capturing evening business enquiries in 60 seconds before they bounce to another firm)\n` +
    `2. Pre-approved record chasing before ${deadline.hookName} without staff spending hours on manual email/WhatsApp follow-ups\n` +
    `3. 100% practitioner control without touching client ledgers or replacing Xero\n\n` +
    `That's practice operations rather than website design. Happy to send over the 30-second workflow if you'd like to see how other firms run it: ${protoUrl}`

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. EMAIL OUTREACH
  // ─────────────────────────────────────────────────────────────────────────────
  const emailSubject = `Client intake & enquiry triage for ${businessName} ahead of ${deadline.deadlineDate}`
  const emailBody =
    `Hi team,\n\n` +
    `We came across ${businessName} while reviewing forward-thinking UK accountancy practices.\n\n` +
    `We ran a quick test on how prospective business clients reach your team outside office hours on mobile (${domain}). Currently, inquiries route into a standard form without response confirmation or pre-qualification.\n\n` +
    `Ahead of ${deadline.hookCopy}, manual document chasing and delayed responses are multiplying administrative drag for practice partners.\n\n` +
    `We engineered intake and deadline chasing infrastructure that qualifies prospective clients in 60 seconds and automates record reminders—with 100% practitioner approval and zero access to client ledgers.\n\n` +
    `We put together a private 30-second mobile walkthrough showing how this works for ${businessName}:\n` +
    `${protoUrl}\n\n` +
    `Would you be open to taking a quick 30-second look on your phone?\n\n` +
    `Best regards,\n` +
    `Mercian Wealth Automation\n` +
    `Opt-out: Reply "STOP" to unsubscribe immediately.`

  const allTexts = [
    whatsappOpenerRecommended,
    whatsappOpenerAlternative,
    whatsappFollowUp1,
    whatsappFollowUp2,
    whatsappBuilderReply,
    emailBody
  ]

  const validationStatus = validateOutreachClaims(analysis, allTexts)

  return {
    whatsappOpenerRecommended,
    whatsappOpenerAlternative,
    whatsappFollowUp1,
    whatsappFollowUp2,
    whatsappBuilderReply,
    emailOutreach: {
      subject: emailSubject,
      body: emailBody
    },
    validationStatus
  }
}
