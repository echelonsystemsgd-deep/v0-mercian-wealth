export type FindingLayer = 'site' | 'process'
export type ConfidenceLevel = 'verified' | 'likely' | 'unknown'
export type SeverityLevel = 1 | 2 | 3 | 4 | 5
export type OutcomeType = 'revenue' | 'time' | 'risk'
export type PriorityGrade = 'A' | 'B' | 'C' | 'Hold: nothing verified'

export interface EvidenceItem {
  url: string
  selector?: string
  measuredValue: string | number
  screenshotPath?: string
  detail?: string
}

export interface AuditFinding {
  id: string
  layer: FindingLayer
  severity: SeverityLevel
  confidence: ConfidenceLevel
  title: string
  summary: string
  evidence: EvidenceItem
  outcome: OutcomeType
  signalInferredFrom?: string // What observable signal led to this hypothesis
}

export type BuildPlatform =
  | 'Lovable'
  | 'v0'
  | 'Bolt'
  | 'Framer'
  | 'Wix'
  | 'Squarespace'
  | 'WordPress'
  | 'Elementor'
  | 'Webflow'
  | 'Custom'
  | 'Unknown'

export interface BuildFingerprint {
  platform: BuildPlatform
  confidence: 'high' | 'medium' | 'low'
  evidence: string[]
}

export interface FormInspection {
  selector: string
  fieldCount: number
  inputs: Array<{ name: string; type: string; placeholder?: string; required?: boolean }>
  action?: string
  hasPhoneField: boolean
  hasEmailField: boolean
  hasTurnoverOrServiceDropdown: boolean
  hasVisibleResponsePromise: boolean
}

export interface AuditSignals {
  layoutAndPerformance: {
    hasHttps: boolean
    hasViewportMeta: boolean
    hasHorizontalOverflow: boolean
    overflowWidthPx?: number
    overflowSelector?: string
    viewportWidthPx: number
    lcpMs?: number
    cls?: number
    smallTapTargetsCount: number
    smallTapTargetSamples: Array<{ selector: string; dimensions: string }>
    brokenLinksCount: number
    sampleBrokenLinks: string[]
  }
  contactPaths: {
    hasTel: boolean
    telNumbers: string[]
    hasWhatsApp: boolean
    whatsAppLinks: string[]
    hasMailto: boolean
    mailtoAddresses: string[]
    formsCount: number
    maxFormFields: number
    formDetails: FormInspection[]
    bookingLinks: string[] // Calendly, TidyCal, Acuity, Google Calendar, etc.
    clientPortalLinks: string[] // Xero, Iris, Senta, MyDocSafe, BrightPay, Sage, etc.
    hasNextStepAboveFold: boolean
    aboveFoldCtaText?: string
  }
  trustAndCompliance: {
    regulators: string[] // ICAEW, ACCA, AAT, ICAS, CIMA, ATT, CTA
    amlSupervisor?: string // HMRC or professional body
    companyNumber?: string
    registeredAddress?: string
    hasPrivacyPolicy: boolean
    hasCookieBanner: boolean
    namedPeople: string[] // Directors, partners, founders identified
    reviewsFound: Array<{ source: string; rating?: number; count?: number }>
  }
  contentSignals: {
    hasServicesPage: boolean
    servicesUrls: string[]
    hasFaq: boolean
    hasMtdMention: boolean
    mtdSnippets: string[]
    hasPricingSignal: boolean
    pricingSnippet?: string
    hasSchemaMarkup: boolean
    schemaTypes: string[]
  }
  googleBusinessProfile?: {
    rating?: number
    reviewCount?: number
    phone?: string
    address?: string
    websiteMatches: boolean
  }
}

export interface PrimaryAngle {
  id: string
  title: string
  headline: string
  diagnosis: string
  layer: FindingLayer
  evidence: EvidenceItem
  outcome: OutcomeType
  remedyConcept: string
}

export interface SupportingPoint {
  id: string
  title: string
  evidence: EvidenceItem
}

export interface CallHypothesis {
  id: string
  statement: string
  basisSignal: string
  status: 'unknown'
}

export interface AuditAnalysis {
  domain: string
  url: string
  businessName: string
  timestamp: string
  buildFingerprint: BuildFingerprint
  signals: AuditSignals
  findings: AuditFinding[]
  primaryAngle: PrimaryAngle
  supportingPoints: SupportingPoint[]
  callHypotheses: CallHypothesis[]
  grade: PriorityGrade
  gradeReason: string
  screenshotPath?: string
}

export interface GeneratedOutreach {
  leadId?: string
  whatsappOpenerRecommended: string
  whatsappOpenerAlternative: string
  whatsappStep1?: string
  whatsappStep2?: string
  whatsappStep3?: string
  whatsappNoWebsite?: string
  whatsappFollowUp1: string
  whatsappFollowUp2: string
  whatsappBuilderReply: string
  emailOutreach: {
    subject: string
    body: string
  }
  validationStatus: {
    isValid: boolean
    unmappedClaims: string[]
    evidenceMap: Record<string, string>
  }
}
