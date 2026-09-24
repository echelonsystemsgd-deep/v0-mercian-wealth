export type FrictionClassification = 'OBSERVED' | 'INFERRED' | 'MEASURED'

export type PipelineClassification = 'HAS_WEBSITE' | 'NO_WEBSITE' | 'NEEDS_REVIEW'

export interface PageNode {
  url: string
  path: string
  title: string
  statusCode: number
  hasMobileViewport: boolean
  formCount: number
  formFieldsTotal: number
  hasBookingWidget: boolean
  hasPhoneLink: boolean
  hasWhatsAppLink: boolean
  hasEmailLink: boolean
  extractedEmails: string[]
  extractedPhones: string[]
  headings: string[]
  buttons: string[]
  links: string[]
  textContentSnippet: string
  isPasswordProtected: boolean
  isSocialLinktree: boolean
}

export interface DeterministicChecks {
  pagesChecked: number
  hasWebsite: boolean
  isResponsive: boolean
  primaryCtaFound: boolean
  primaryCtaLabel?: string
  hasPhone: boolean
  hasWhatsApp: boolean
  hasEmail: boolean
  foundEmails: string[]
  foundPhones: string[]
  hasExcessiveFormFields: boolean
  maxFormFieldsOnAnyPage: number
  isPasswordLocked: boolean
  isSocialLinktreeOnly: boolean
  slowOrHeavyIndicators?: string[]
}

export interface FrictionFinding {
  id: string
  classification: FrictionClassification
  customerNextStep: string // e.g. "Request a quote", "Book consultation", "Review work before contacting"
  lane: string // The customer's next step: 'booking', 'contact', 'navigation', 'catalog'
  location: string // Exact page or step label: '/consultation', 'mobile header', etc.
  pageUrl?: string
  observableProblem: string // What is visible in <10 seconds without opinion
  evidence: string // First-class evidence: What was actually observed
  recognizableReason: string // The buyer behavior pattern operator nods at
  consequenceMechanics: string // Cause-and-effect chain reaction without numbers
  confidence: number // 0-1
  scores?: {
    visible: boolean
    fast: boolean
    logical: boolean
    decisionTied: boolean
    observable: boolean
    noNumbers: boolean
  }
}

export interface VariableY {
  name?: string
  company: string
  website: string
  page: string
  websiteProblem: string
  evidence: string
  customerNextStep: string
  lane: string
  recognizableReason: string
  consequenceMechanics: string
  subjectLine: string
}

export interface EmailXOutreach {
  subjectLine: string
  greeting: string
  observation: string
  mechanics: string
  freeValueOffer: string
  microYes: string
  signOff: string
  fullEmailText: string
  variableY: VariableY
}

export interface WhatsAppXOutreach {
  greeting: string
  observation: string
  mechanics: string
  freeValueOffer: string
  microYes: string
  fullWhatsAppText: string
  variableY: VariableY
}

export interface OutreachAngles {
  emailX: EmailXOutreach
  whatsAppX: WhatsAppXOutreach
  coldCallOpener: string
  whatsappOpener: string
  primaryAngleSummary: string
  targetLane: string
}

export interface OutreachIntelligence {
  classification: PipelineClassification
  customerNextStep: string
  lane: string
  location: string
  pageUrl: string
  friction: string
  evidence: string
  recognizableReason: string
  consequenceMechanics: string
  confidence: 'High' | 'Medium' | 'Low'
  candidates: FrictionFinding[]
  selectedCandidateId: string
  emailX: EmailXOutreach
  whatsAppX: WhatsAppXOutreach
  callBridgeScript: string
  freeValueTask: {
    title: string
    description: string
    prototypeFocus: string
  }
  reviewReason?: string
}

export interface AuditReport {
  id?: string
  leadId?: string
  url: string
  status: 'queued' | 'running' | 'complete' | 'failed'
  confidenceScore: number
  pagesCrawled: PageNode[]
  deterministicChecks: DeterministicChecks
  frictions: FrictionFinding[]
  outreachAngles: OutreachAngles
  contactEmail?: string
  contactPhone?: string
  errorMessage?: string
  createdAt: string
  updatedAt: string
}
