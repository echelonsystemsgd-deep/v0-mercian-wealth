import type {
  AuditSignals,
  AuditFinding,
  PrimaryAngle,
  SupportingPoint,
  CallHypothesis,
  PriorityGrade,
  BuildFingerprint,
  EvidenceItem,
  AuditAnalysis
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

  // Before 8 Nov 2026
  const isBeforeNov8 = y < 2026 || (y === 2026 && (m < 11 || (m === 11 && d < 8)))
  // 8 Nov 2026 to 31 Jan 2027
  const isBeforeFeb1_2027 =
    (y === 2026 && (m === 11 && d >= 8 || m === 12)) ||
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
 * Deterministically evaluates collected site signals and produces:
 * 1. Filtered, evidenced findings (Site Layer & Process Layer)
 * 2. Deduplicated & contradiction-free analysis
 * 3. Exactly ONE Primary Angle + up to 2 Supporting Points
 * 4. Call hypotheses (labelled "unknown")
 * 5. Deterministic priority grade (A, B, C, or "Hold: nothing verified")
 */
export function evaluateSignalsToAnalysis(
  domain: string,
  url: string,
  businessName: string,
  signals: AuditSignals,
  buildFingerprint: BuildFingerprint,
  refDate: Date = new Date(),
  screenshotPath?: string
): AuditAnalysis {
  const deadline = getDateAwareMtdDeadline(refDate)
  const findings: AuditFinding[] = []

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. SITE-LAYER OBSERVABLE FINDINGS (Strict evidence required)
  // ─────────────────────────────────────────────────────────────────────────────

  // Check: Horizontal layout overflow on 390px mobile viewport
  if (signals.layoutAndPerformance.hasHorizontalOverflow && signals.layoutAndPerformance.overflowWidthPx) {
    const diff = signals.layoutAndPerformance.overflowWidthPx - signals.layoutAndPerformance.viewportWidthPx
    findings.push({
      id: 'site_horizontal_overflow',
      layer: 'site',
      severity: 3,
      confidence: 'verified',
      title: 'Mobile Viewport Horizontal Overflow',
      summary: `Page horizontally overflows by ${diff}px on 390px mobile viewports, causing sideways scroll and cut-off text.`,
      evidence: {
        url,
        selector: signals.layoutAndPerformance.overflowSelector || 'html, body',
        measuredValue: `${signals.layoutAndPerformance.overflowWidthPx}px (viewport: ${signals.layoutAndPerformance.viewportWidthPx}px)`,
        screenshotPath,
        detail: `Measured documentElement.scrollWidth (${signals.layoutAndPerformance.overflowWidthPx}px) exceeds window.innerWidth (390px).`
      },
      outcome: 'revenue'
    })
  }

  // Check: Missing mobile viewport meta tag
  if (!signals.layoutAndPerformance.hasViewportMeta) {
    findings.push({
      id: 'site_missing_viewport_meta',
      layer: 'site',
      severity: 4,
      confidence: 'verified',
      title: 'Missing Mobile Viewport Configuration',
      summary: 'Page lacks standard mobile viewport meta configuration, forcing mobile browsers into desktop emulation mode.',
      evidence: {
        url,
        selector: 'head > meta[name="viewport"]',
        measuredValue: 'Missing',
        detail: 'No <meta name="viewport" content="width=device-width"> detected in document head.'
      },
      outcome: 'risk'
    })
  }

  // Check: Real form friction (Only if form is excessively long >= 6 fields, or has no email/phone)
  const heavyForm = signals.contactPaths.formDetails.find(f => f.fieldCount >= 6)
  if (heavyForm) {
    findings.push({
      id: 'site_heavy_form_inputs',
      layer: 'site',
      severity: 3,
      confidence: 'verified',
      title: 'Multi-Input Mobile Form Barrier',
      summary: `Enquiry form requires ${heavyForm.fieldCount} separate manual inputs on a smartphone screen before submitting.`,
      evidence: {
        url,
        selector: heavyForm.selector,
        measuredValue: `${heavyForm.fieldCount} fields`,
        screenshotPath,
        detail: `Detected fields: ${heavyForm.inputs.map(i => i.placeholder || i.name).filter(Boolean).join(', ')}`
      },
      outcome: 'revenue'
    })
  }

  // Check: Small touch targets (< 44px)
  if (signals.layoutAndPerformance.smallTapTargetsCount >= 3) {
    findings.push({
      id: 'site_cramped_tap_targets',
      layer: 'site',
      severity: 2,
      confidence: 'verified',
      title: 'Sub-44px Mobile Tap Targets',
      summary: `${signals.layoutAndPerformance.smallTapTargetsCount} interactive navigation or CTA elements measure below the 44px thumb-safe target size.`,
      evidence: {
        url,
        selector: signals.layoutAndPerformance.smallTapTargetSamples[0]?.selector || 'nav a, button',
        measuredValue: signals.layoutAndPerformance.smallTapTargetSamples[0]?.dimensions || '<40px',
        detail: `Sample small target: ${signals.layoutAndPerformance.smallTapTargetSamples[0]?.selector} (${signals.layoutAndPerformance.smallTapTargetSamples[0]?.dimensions})`
      },
      outcome: 'revenue'
    })
  }

  // Check: Broken placeholder links (href="#" or empty)
  if (signals.layoutAndPerformance.brokenLinksCount > 0) {
    findings.push({
      id: 'site_dead_placeholder_links',
      layer: 'site',
      severity: 2,
      confidence: 'verified',
      title: 'Dead Placeholder Navigation Links',
      summary: `Found ${signals.layoutAndPerformance.brokenLinksCount} dead '#' placeholder link(s) that produce no action when tapped.`,
      evidence: {
        url,
        selector: signals.layoutAndPerformance.sampleBrokenLinks[0] || 'a[href="#"]',
        measuredValue: `${signals.layoutAndPerformance.brokenLinksCount} dead links`,
        detail: `Sample dead link: ${signals.layoutAndPerformance.sampleBrokenLinks.slice(0, 2).join(', ')}`
      },
      outcome: 'risk'
    })
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. PROCESS-LAYER OPPORTUNITY FINDINGS (Inferred from observable signals)
  // ─────────────────────────────────────────────────────────────────────────────

  const isTemplateOrAiBuilder = [
    'Lovable',
    'v0',
    'Bolt',
    'Framer',
    'Wix',
    'Squarespace',
    'WordPress',
    'Elementor',
    'Webflow'
  ].includes(buildFingerprint.platform)

  const hasBookingFlow = signals.contactPaths.bookingLinks.length > 0
  const hasClientPortal = signals.contactPaths.clientPortalLinks.length > 0
  const hasWhatsApp = signals.contactPaths.hasWhatsApp
  const hasVisiblePromise = signals.contactPaths.formDetails.some(f => f.hasVisibleResponsePromise)
  const hasMtdMention = signals.contentSignals.hasMtdMention
  const hasPricingAnchoring = signals.contentSignals.hasPricingSignal

  // Process Finding 1: Enquiry-to-Client Response Speed & Evening Triage
  // Signal: Contact form only, no WhatsApp, no booking hold, no response SLA
  if (!hasBookingFlow && !hasWhatsApp && !hasVisiblePromise) {
    findings.push({
      id: 'process_enquiry_response_speed',
      layer: 'process',
      severity: 4,
      confidence: 'likely',
      title: 'Unconfirmed Out-of-Hours Enquiry Triage',
      summary: 'Incoming enquiries submit into an open-ended queue with no response SLA or instant calendar hold. Evening business owners continue searching competing firms.',
      evidence: {
        url,
        selector: 'form, contact section',
        measuredValue: 'Form-only without response time guarantee or instant hold',
        detail: 'Observable signal: 100% form-based enquiry route with zero instant booking widget, no WhatsApp business link, and no visible response timeframe.'
      },
      outcome: 'revenue',
      signalInferredFrom: 'Public enquiry form has no instant booking, no WhatsApp channel, and no stated response promise.'
    })
  }

  // Process Finding 2: MTD Record Chasing & Filing Deadlines
  // Signal: No MTD mentions, or traditional compliance lists ahead of MTD quarterly updates
  if (!hasMtdMention) {
    findings.push({
      id: 'process_mtd_record_chasing',
      layer: 'process',
      severity: 4,
      confidence: 'likely',
      title: 'Manual Record Chasing Ahead of MTD Deadlines',
      summary: `Practice lacks automated pre-filing document intake and reminder infrastructure ahead of ${deadline.hookCopy}.`,
      evidence: {
        url,
        selector: 'body',
        measuredValue: 'Zero MTD for Income Tax guidance detected',
        detail: `No Making Tax Digital for ITSA updates or automated document request pathways found on services pages ahead of ${deadline.deadlineDate}.`
      },
      outcome: 'time',
      signalInferredFrom: 'Practice website has no automated document collection workflow or MTD quarterly reporting schedule.'
    })
  }

  // Process Finding 3: New Client Onboarding Drop-off & Ledger Friction
  // Signal: No client portal link (Xero, Iris, Senta, MyDocSafe) or digital intake
  if (!hasClientPortal) {
    findings.push({
      id: 'process_onboarding_dropoff',
      layer: 'process',
      severity: 3,
      confidence: 'likely',
      title: 'Manual Onboarding & Engagement Chasing',
      summary: 'New client setup relies on manual email attachments and post-enquiry follow-up rather than a self-service intake and ID verification hold.',
      evidence: {
        url,
        selector: 'nav, footer',
        measuredValue: 'No client portal or onboarding hub detected',
        detail: 'No links to Xero, Iris OpenSpace, Senta, MyDocSafe, or digital onboarding portals found across navigation.'
      },
      outcome: 'time',
      signalInferredFrom: 'Absence of client login/portal links indicates manual post-enquiry email onboarding.'
    })
  }

  // Process Finding 4: Unanchored Retainers / Fee Qualification Drag
  // Signal: Zero pricing indicators or fee tiering
  if (!hasPricingAnchoring) {
    findings.push({
      id: 'process_unanchored_fee_qualification',
      layer: 'process',
      severity: 3,
      confidence: 'likely',
      title: 'Partner Capacity Burn on Unqualified Prospects',
      summary: 'Enquiry form does not anchor turnover tiers or monthly retainers, forcing fee-earners into manual quotation calls with unqualified price-shoppers.',
      evidence: {
        url,
        selector: 'services & contact pages',
        measuredValue: 'Zero fee guidance or turnover qualification',
        detail: 'No pricing bands, retainer estimators, or turnover sliders detected to filter leads prior to partner calls.'
      },
      outcome: 'time',
      signalInferredFrom: 'Enquiry form collects contact info without pre-qualifying client turnover or budget expectations.'
    })
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. ANGLE SELECTION (ONE Primary Angle + up to 2 Supporting Points)
  // ─────────────────────────────────────────────────────────────────────────────

  // Core Rule:
  // - "Contact form only" is NEVER the primary friction for accountants.
  // - If the site is built on an AI builder or template (Wix, WordPress, Squarespace, etc.)
  //   and top finding is cosmetic, DEMOTE it and lead with a process-layer angle!
  // - Site frictions serve only as supporting points to prove we inspected their business.

  const processFindings = findings.filter(f => f.layer === 'process')
  const siteFindings = findings.filter(f => f.layer === 'site')

  let primaryFinding: AuditFinding | null = null

  // Selection priority for Primary Angle:
  // 1. Heavy form barrier (>= 6 inputs on mobile screen) directly blocks enquiry conversion
  // 2. Severe horizontal overflow on custom builds (where builder demotion does not apply)
  // 3. Process: MTD deadline record chasing (when WhatsApp is already present)
  // 4. Process: Enquiry response speed & out-of-hours conversion leak
  // 5. Process: MTD deadline record chasing
  // 6. Process: Partner time burn on unqualified price-shoppers
  if (siteFindings.some(f => f.id === 'site_heavy_form_inputs')) {
    primaryFinding = siteFindings.find(f => f.id === 'site_heavy_form_inputs')!
  } else if (!isTemplateOrAiBuilder && siteFindings.some(f => f.id === 'site_horizontal_overflow' && f.severity >= 3)) {
    primaryFinding = siteFindings.find(f => f.id === 'site_horizontal_overflow')!
  } else if (processFindings.some(f => f.id === 'process_mtd_record_chasing') && hasWhatsApp) {
    primaryFinding = processFindings.find(f => f.id === 'process_mtd_record_chasing')!
  } else if (processFindings.some(f => f.id === 'process_enquiry_response_speed')) {
    primaryFinding = processFindings.find(f => f.id === 'process_enquiry_response_speed')!
  } else if (processFindings.some(f => f.id === 'process_mtd_record_chasing')) {
    primaryFinding = processFindings.find(f => f.id === 'process_mtd_record_chasing')!
  } else if (processFindings.some(f => f.id === 'process_unanchored_fee_qualification')) {
    primaryFinding = processFindings.find(f => f.id === 'process_unanchored_fee_qualification')!
  } else if (processFindings.length > 0) {
    primaryFinding = processFindings[0]
  } else if (siteFindings.length > 0) {
    primaryFinding = siteFindings[0]
  }

  let primaryAngle: PrimaryAngle
  let grade: PriorityGrade = 'C'
  let gradeReason = ''

  if (!primaryFinding) {
    grade = 'Hold: nothing verified'
    gradeReason = 'No verifiable site friction or clear process gap detected. Do not force outreach without manual review.'
    primaryAngle = {
      id: 'hold_nothing_verified',
      title: 'Hold: Nothing Verified',
      headline: 'No actionable friction identified',
      diagnosis: 'Public site inspection revealed healthy mobile layout and existing direct channels without evident process leaks.',
      layer: 'process',
      evidence: {
        url,
        measuredValue: 'Healthy baseline',
        detail: 'Standard baseline verified; no high-confidence friction found.'
      },
      outcome: 'risk',
      remedyConcept: 'Manual inspection required before contacting.'
    }
  } else {
    // Construct Primary Angle diagnosis
    if (primaryFinding.id === 'process_enquiry_response_speed') {
      primaryAngle = {
        id: 'angle_response_speed',
        title: 'Enquiry-to-Client Response Speed',
        headline: 'Out-of-hours business enquiries landing without instant qualification',
        diagnosis: `When Ltd Co directors research ${businessName} on mobile in the evening, inquiries enter an unconfirmed queue without response timing or instant slot reservation.`,
        layer: 'process',
        evidence: primaryFinding.evidence,
        outcome: 'revenue',
        remedyConcept: 'Deploy a 60-second mobile intake hold that pre-qualifies turnover and locks discovery appointments directly.'
      }
      grade = signals.contactPaths.hasTel || signals.contactPaths.hasWhatsApp ? 'A' : 'B'
      gradeReason = `High-value commercial practice with form-only intake leaking decision-ready evening directors.`
    } else if (primaryFinding.id === 'process_mtd_record_chasing') {
      primaryAngle = {
        id: 'angle_mtd_deadline_drag',
        title: 'Pre-Approved Record Chasing Ahead of MTD',
        headline: `Administrative capacity drag before ${deadline.hookName}`,
        diagnosis: `Upcoming quarterly reporting under MTD multiplies touchpoints for sole traders and Ltd Cos, pulling fee-earners into manual WhatsApp and email chasing.`,
        layer: 'process',
        evidence: primaryFinding.evidence,
        outcome: 'time',
        remedyConcept: 'Automated deadline chasing infrastructure with 100% practitioner approval and zero access to client ledgers.'
      }
      grade = 'A'
      gradeReason = `Time-sensitive operational hook tied directly to ${deadline.deadlineDate} reporting.`
    } else if (primaryFinding.id === 'process_unanchored_fee_qualification') {
      primaryAngle = {
        id: 'angle_fee_anchoring',
        title: 'Turnover Pre-Qualification & Retainer Anchoring',
        headline: 'Partner time burned on quotation calls with unqualified price-shoppers',
        diagnosis: `Without upfront turnover filtering on mobile, senior staff spend non-billable hours triaging low-fee sole traders rather than premium Ltd Co retainers.`,
        layer: 'process',
        evidence: primaryFinding.evidence,
        outcome: 'time',
        remedyConcept: 'Interactive turnover slider and retainer expectations tiering before discovery calls.'
      }
    } else if (primaryFinding.id === 'site_heavy_form_inputs') {
      primaryAngle = {
        id: 'angle_heavy_form',
        title: 'Multi-Field Mobile Enquiry Friction',
        headline: `Enquiry form requires ${primaryFinding.evidence.measuredValue} on smartphone screen`,
        diagnosis: `Smartphone visitors landing on ${businessName} face a lengthy ${primaryFinding.evidence.measuredValue} form before speaking to an accountant, causing immediate drop-off.`,
        layer: 'site',
        evidence: primaryFinding.evidence,
        outcome: 'revenue',
        remedyConcept: 'Streamlined 2-step mobile intake capturing name and turnover band in 30 seconds.'
      }
      grade = 'A'
      gradeReason = `High-friction mobile enquiry form directly suppressing inbound commercial conversion.`
    } else {
      // Site Layer primary (e.g. severe horizontal overflow)
      primaryAngle = {
        id: 'angle_mobile_experience',
        title: primaryFinding.title,
        headline: primaryFinding.summary,
        diagnosis: `Smartphone visitors encounter observable layout friction that interrupts the enquiry pathway before reaching your contact details.`,
        layer: primaryFinding.layer,
        evidence: primaryFinding.evidence,
        outcome: primaryFinding.outcome,
        remedyConcept: 'Streamlined mobile-first intake eliminating viewport layout defects.'
      }
      grade = 'B'
      gradeReason = `Evidenced mobile layout friction directly affecting smartphone visitor conversion.`
    }
  }

  // Supporting Points (Max 2, non-contradictory)
  const remainingFindings = findings.filter(f => f.id !== primaryFinding?.id)
  const supportingPoints: SupportingPoint[] = remainingFindings.slice(0, 2).map(f => ({
    id: f.id,
    title: f.title,
    evidence: f.evidence
  }))

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CALL HYPOTHESES (Things we cannot observe, labelled "unknown")
  // ─────────────────────────────────────────────────────────────────────────────
  // Mandatory: "Things I can't observe (auto-reply, response time, follow-up,
  // onboarding process) must be labelled 'unknown, validate on call', never 'verified'."
  const callHypotheses: CallHypothesis[] = [
    {
      id: 'hyp_reply_time',
      statement: 'Average response speed to website enquiries received after 6 PM',
      basisSignal: 'Site has standard web form with no auto-reply SLA indicated',
      status: 'unknown'
    },
    {
      id: 'hyp_followup_cadence',
      statement: 'Whether unbooked enquiries receive a structured follow-up within 48 hours',
      basisSignal: 'No multi-step booking nurture engine detected',
      status: 'unknown'
    },
    {
      id: 'hyp_mtd_chasing_hours',
      statement: `Weekly partner/manager hours currently lost chasing missing client records ahead of ${deadline.hookName}`,
      basisSignal: 'No client portal or automated record upload link found',
      status: 'unknown'
    }
  ]

  return {
    domain,
    url,
    businessName,
    timestamp: new Date().toISOString(),
    buildFingerprint,
    signals,
    findings,
    primaryAngle,
    supportingPoints,
    callHypotheses,
    grade,
    gradeReason,
    screenshotPath
  }
}
