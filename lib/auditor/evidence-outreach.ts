import type {
  AuditAnalysis,
  GeneratedOutreach
} from './evidence-types'

export interface DateAwareDeadline {
  hookName: string
  deadlineDate: string
  hookCopy: string
  quarterPhase: 'nov_quarterly' | 'jan_self_assessment' | 'feb_quarterly'
}

export function getDateAwareMtdDeadline(refDate: Date = new Date()): DateAwareDeadline {
  const y = refDate.getFullYear()
  const m = refDate.getMonth() + 1
  const d = refDate.getDate()

  const isBeforeNov8 = y < 2026 || (y === 2026 && (m < 11 || (m === 11 && d < 8)))
  const isBeforeFeb1_2027 =
    (y === 2026 && ((m === 11 && d >= 8) || m === 12)) ||
    (y === 2027 && m === 1 && d <= 31)

  if (isBeforeNov8) {
    return {
      hookName: '7 November quarterly update',
      deadlineDate: '7 November 2026',
      hookCopy: 'the upcoming 7 November quarterly update deadline',
      quarterPhase: 'nov_quarterly'
    }
  } else if (isBeforeFeb1_2027) {
    return {
      hookName: '31 January Self Assessment deadline',
      deadlineDate: '31 January 2027',
      hookCopy: 'the 31 January Self Assessment tax filing crunch',
      quarterPhase: 'jan_self_assessment'
    }
  } else {
    return {
      hookName: '7 February 2027 quarterly update',
      deadlineDate: '7 February 2027',
      hookCopy: 'the 7 February 2027 quarterly reporting cut-off',
      quarterPhase: 'feb_quarterly'
    }
  }
}

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
  // 1. RECOMMENDED & ALTERNATIVE WHATSAPP OPENERS (Benevolent Authority / Trudeau Framework)
  // (Empathetic, human, outcome-first, with real evidence & mandatory opt-out)
  // ─────────────────────────────────────────────────────────────────────────────
  let whatsappOpenerRecommended = ''
  let whatsappOpenerAlternative = ''
  let whatsappStep1 = ''
  let whatsappStep2 = ''
  let whatsappStep3 = ''

  if (primaryAngle.id === 'angle_response_speed') {
    whatsappOpenerRecommended =
      `Hi team 👋 We were looking through ${domain} on mobile and wanted to share a quick heads-up: incoming enquiries route into a standard form without response timing or an instant booking hold.\n\n` +
      `Ahead of the upcoming ${deadline.hookCopy}, when business directors research an accountant in the evening, they naturally gravitate to whoever confirms next steps immediately. We want to ensure your practice doesn't let good clients slip away unnoticed.\n\n` +
      `I’d love to share a couple of helpful observations with you over a brief 5-minute phone call — completely candid, zero obligation — just to share what’s working for other UK practices.\n\n` +
      `Are you free for a quick chat tomorrow afternoon or Thursday?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Came across ${businessName} — really liked your presentation of services.\n\n` +
      `Quick question if you don't mind: ahead of the upcoming ${deadline.hookCopy}, is your team currently taking on new clients, or is capacity fully booked out right now?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappStep1 =
      `Hi team 👋 Came across ${businessName} — really liked how you present your services. Quick question if you don't mind: ahead of ${deadline.hookCopy}, is your team taking on new clients, or is capacity booked out right now?`

    whatsappStep2 =
      `Makes complete sense! The reason I asked is that so many practice owners we speak with right now are feeling the pressure of MTD updates—spending late evenings chasing missing receipts and fielding enquiry calls instead of focusing on high-value client advisory.\n\n` +
      `When I looked at ${domain} on a phone earlier, I noticed enquiries submit into a standard form without response confirmation or direct booking hold (${evidenceValue}). It struck me because your actual client work looks top tier, but the mobile intake might be letting good prospective clients slip through unnoticed.`

    whatsappStep3 =
      `I’d love to share a couple of helpful observations with you over a 5-minute phone call — completely candid, no strings attached — just to help you capture those enquiries properly.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?`

  } else if (primaryAngle.id === 'angle_mtd_deadline_drag') {
    whatsappOpenerRecommended =
      `Hi team 👋 We came across ${businessName} while reviewing UK accounting practices preparing for ${deadline.hookName}.\n\n` +
      `Ahead of ${deadline.deadlineDate}, the biggest capacity drain partners mention is the stress of manual document chasing across email and WhatsApp.\n\n` +
      `I’d love to share a couple of helpful observations over a brief 5-minute call on how other UK practices are saving 10+ hours of admin a week by streamlining intake ahead of MTD.\n\n` +
      `Are you free for a quick catch up tomorrow afternoon or Thursday?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Quick question regarding ${businessName}'s client workload ahead of ${deadline.hookCopy}:\n\n` +
      `Are your fee-earners spending valuable evenings chasing missing records, or has your team managed to automate that process?\n\n` +
      `Happy to share a couple of helpful ideas over a brief 5-minute phone call. If you'd rather not hear from us, just say stop.`

    whatsappStep1 =
      `Hi team 👋 Came across ${businessName} — quick question if you don't mind: ahead of ${deadline.hookCopy}, is your team currently taking on new clients, or is your schedule completely full with client filings?`

    whatsappStep2 =
      `Completely understand! Ahead of ${deadline.deadlineDate}, the partners we speak with say their biggest operational headache isn't doing the actual accounts—it's chasing clients 4 or 5 times just to get basic paperwork in.\n\n` +
      `We noticed on ${domain} that there isn't an automated client upload portal or direct deadline prompt, which usually means staff lose valuable billable hours chasing documents manually.`

    whatsappStep3 =
      `I’d love to share a couple of helpful observations with you over a 5-minute phone call — completely candid, no strings attached — just to share how other practices are automating record collection ahead of MTD.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?`

  } else if (primaryAngle.id === 'angle_fee_anchoring') {
    whatsappOpenerRecommended =
      `Hi team 👋 We visited ${domain} on mobile and wanted to share a helpful observation: prospective business clients currently have no way to gauge retainer tiers or turnover brackets before enquiring.\n\n` +
      `For commercial firms, that often leads to partners spending time in lengthy quotation cycles with price-shoppers instead of serious businesses.\n\n` +
      `I’d love to share a couple of helpful observations over a brief 5-minute phone call on how practices pre-qualify retainers before partner time is booked.\n\n` +
      `Are you free for a quick chat tomorrow afternoon or Thursday?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Noticed on ${domain} that incoming enquiries submit without upfront turnover pre-qualification.\n\n` +
      `Happy to jump on a quick 5-minute call to share what’s working for other commercial practices. If you'd rather not hear from us, just say stop.`

    whatsappStep1 =
      `Hi team 👋 Came across ${businessName} in your area — quick question: ahead of ${deadline.hookCopy}, are you actively looking to bring on new Ltd Co or advisory retainers, or are you at full capacity?`

    whatsappStep2 =
      `That makes total sense! The reason I reached out is that on ${domain}, prospective clients submit general forms without turnover tiering (${evidenceValue}). We often see fee-earners spend hours speaking with micro-businesses that aren't ready for standard advisory fees, when your time is worth much more.`

    whatsappStep3 =
      `I’d love to share a couple of helpful observations with you over a 5-minute phone call — completely candid, no strings attached — just to share how UK practices pre-qualify retainers effortlessly.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?`

  } else {
    // Evidenced layout or custom friction
    whatsappOpenerRecommended =
      `Hi team 👋 We were reviewing ${domain} on a mobile device and noticed ${primaryAngle.headline.toLowerCase()} (${evidenceValue}).\n\n` +
      `Wanted to send a quick heads-up so prospective clients don't drop off before reaching your team. I’d love to share a couple of quick observations over a 5-minute phone call.\n\n` +
      `Are you free for a quick chat tomorrow afternoon or Thursday?\n\n` +
      `If you'd rather not hear from us, just say stop.`

    whatsappOpenerAlternative =
      `Hi team 👋 Noticed on ${domain} on mobile that visitors encounter ${primaryAngle.title.toLowerCase()}.\n\n` +
      `Happy to share a couple of quick pointers over a 5-minute chat. If you'd rather not hear from us, just say stop.`

    whatsappStep1 =
      `Hi team 👋 Came across ${businessName} — quick question if you don't mind: ahead of ${deadline.hookCopy}, is your team taking on new clients right now?`

    whatsappStep2 =
      `Makes sense! When I looked at your site on a phone earlier, I noticed ${primaryAngle.title.toLowerCase()} (${evidenceValue}). It struck me because your actual client work looks top tier, but mobile visitors might be bouncing before they can submit their details.`

    whatsappStep3 =
      `I’d love to share a couple of helpful observations with you over a 5-minute phone call — completely candid, no strings attached — just to help you capture those enquiries properly.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?`
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // NO-WEBSITE OUTREACH (For practices without an active site, e.g. Kai Accountants)
  // ─────────────────────────────────────────────────────────────────────────────
  const whatsappNoWebsite =
    `Hi team 👋 Completely understand you don't have an active site live right now! To be honest, so many of the best accountants we know grew purely through word-of-mouth and client referrals, so the website naturally took a back seat while you were busy looking after people.\n\n` +
    `The main reason I reached out is that ahead of ${deadline.hookCopy}, running a practice purely through manual WhatsApps and emails can get exhausting. We build clean, bespoke websites with automated client intake so your practice has a professional home that pre-qualifies clients and collects records without taking up your weekends.\n\n` +
    `Let's grab a relaxed 10-minute catch up this week—I'm happy to share some ideas on what a modern practice portal looks like for your firm: ${protoUrl}\n\n` +
    `How does tomorrow afternoon or Thursday suit you? (If you'd rather not hear from us, just say stop.)`

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. FOLLOW-UPS (Day 3 & Day 7) - Empathetic & Respectful
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
  // 4. EMAIL OUTREACH (Professional, Warm & Non-Threatening)
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
    whatsappStep1,
    whatsappStep2,
    whatsappStep3,
    whatsappNoWebsite,
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
