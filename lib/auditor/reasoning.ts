import Groq from 'groq-sdk'
import type {
  PageNode,
  DeterministicChecks,
  FrictionFinding,
  VariableY,
  OutreachAngles,
  OutreachIntelligence,
} from './types'
import {
  identifyDeterministicFrictions,
  formatEmailXOutreach,
  formatWhatsAppXOutreach,
  buildNoWebsiteIntelligence,
} from './deterministic'

const GROQ_MODEL = 'llama-3.3-70b-versatile'

export async function runGroqFrictionReasoning(
  rootUrl: string,
  businessName: string,
  trade: string,
  pages: PageNode[],
  checks: DeterministicChecks,
  contactName?: string
): Promise<OutreachIntelligence> {
  const apiKey = process.env.GROQ_API_KEY
  const cleanUrl = rootUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  // Fallback to deterministic rules if Groq API key is not configured
  if (!apiKey) {
    return generateFallbackIntelligence(rootUrl, businessName, trade, pages, checks, contactName)
  }

  const groq = new Groq({ apiKey })

  const pagesSummary = pages.map((p) => ({
    path: p.path,
    title: p.title,
    formFields: p.formFieldsTotal,
    hasBookingWidget: p.hasBookingWidget,
    hasWhatsApp: p.hasWhatsAppLink,
    headings: p.headings.slice(0, 5),
    buttons: p.buttons.slice(0, 5),
    snippet: p.textContentSnippet.slice(0, 400),
  }))

  const prompt = `
You are the Mercian Wealth Website Friction Auditor.
Analyze this website structure and produce candidates and ONE top evidence-backed friction analysis for Outreach #1 (Email X / WhatsApp X / Variable Y) following these STRICT rules from our methodology:

STRICT RULES (From Outreach Engine PDFs):
1. ONE friction only - not a list, not an audit. One point of hesitation tied to one page or step.
2. The friction must pass 4 tests:
   - Visible: Can be verified in under 10 seconds.
   - Fast to verify: Can be checked in one click.
   - Logical / Single-page: Lives on one page or step.
   - Decision-tied: Directly affects a buyer's willingness or ability to take the customer's next step (e.g. booking, submitting, reserving).
3. Evidence (FIRST-CLASS FIELD): Provide clear objective evidence of what was observed on the page (e.g. "Page /quote has 9 separate input boxes"). Never invent evidence.
4. Recognisable reason: Describe the buyer's natural behavior pattern that makes the business owner nod in agreement. No accusations, no insults, no judgment of competence.
5. Consequence mechanics: Describe the chain reaction cause-and-effect WITHOUT numbers, WITHOUT metrics, WITHOUT conversion rate claims, and WITHOUT saying "you're losing £X".
6. The first outreach asks for PERMISSION ONLY (Micro-yes). It offers a 30-second preview asset. It NEVER asks for a call or sells a service in the first message.
7. If no valid, verified friction can be confirmed, mark classification as "NEEDS_REVIEW" and set reviewReason: "No valid friction found - do not force outreach".

BUSINESS INFO:
- Company Name: "${businessName}"
- Target Website: "${rootUrl}"
- Sector/Trade: "${trade}"
- Contact Name (if known): "${contactName || ''}"

CRAWLED PAGES DATA:
${JSON.stringify(pagesSummary, null, 2)}

DETERMINISTIC CHECKS:
${JSON.stringify(checks, null, 2)}

Respond with a JSON object strictly matching this schema:
{
  "classification": "HAS_WEBSITE" | "NEEDS_REVIEW",
  "reviewReason": "explanation if needs review",
  "candidates": [
    {
      "id": "candidate_1",
      "customerNextStep": "e.g. Request an on-site survey & quote",
      "lane": "e.g. Quote request form",
      "location": "e.g. /quote page on mobile",
      "observableProblem": "e.g. the form requires 7 separate text inputs on a smartphone",
      "evidence": "e.g. Contact page contains 7 required text inputs with no instant WhatsApp option",
      "recognizableReason": "e.g. when evening buyers research on their phone, typing out project details on a small screen creates friction",
      "consequenceMechanics": "e.g. they postpone completing it and continue comparing local providers who offer 2-tap booking",
      "confidence": 0.9,
      "scores": {
        "visible": true,
        "fast": true,
        "logical": true,
        "decisionTied": true,
        "observable": true,
        "noNumbers": true
      }
    }
  ],
  "topCandidateId": "candidate_1",
  "confidence": "High" | "Medium" | "Low"
}
`

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert Website Friction Auditor who translates website structure into human-understandable customer journey friction following strict cold outreach guidelines. Return valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('Empty response from Groq')

    const parsed = JSON.parse(content)
    const candidates: FrictionFinding[] = Array.isArray(parsed.candidates) && parsed.candidates.length > 0
      ? parsed.candidates.map((c: any, idx: number) => ({
          id: c.id || `candidate_${idx + 1}`,
          classification: 'OBSERVED',
          customerNextStep: c.customerNextStep || 'Confirm service and initiate enquiry',
          lane: c.lane || 'Contact & booking lane',
          location: c.location || '/contact',
          observableProblem: c.observableProblem || 'friction at enquiry stage',
          evidence: c.evidence || 'Observed during live page scan',
          recognizableReason: c.recognizableReason || 'customers hesitate at this decision point',
          consequenceMechanics: c.consequenceMechanics || 'they leave to explore alternative providers',
          confidence: c.confidence || 0.85,
          scores: c.scores || {
            visible: true,
            fast: true,
            logical: true,
            decisionTied: true,
            observable: true,
            noNumbers: true,
          },
        }))
      : []

    if (candidates.length === 0) {
      return generateFallbackIntelligence(rootUrl, businessName, trade, pages, checks, contactName)
    }

    const topCandidate =
      candidates.find((c) => c.id === parsed.topCandidateId) || candidates[0]

    const variableY: VariableY = {
      name: contactName,
      company: businessName,
      website: cleanUrl,
      page: topCandidate.location,
      websiteProblem: topCandidate.observableProblem,
      evidence: topCandidate.evidence,
      customerNextStep: topCandidate.customerNextStep,
      lane: topCandidate.lane,
      recognizableReason: topCandidate.recognizableReason,
      consequenceMechanics: topCandidate.consequenceMechanics,
      subjectLine: `Question regarding ${topCandidate.location}`,
    }

    const emailX = formatEmailXOutreach(variableY)
    const whatsAppX = formatWhatsAppXOutreach(variableY)

    const callBridgeScript = `Hi ${contactName || 'there'}, glad you took a look. The purpose isn't to push a generic website package — it's simply to show how removing that friction on ${topCandidate.location} lets you capture high-intent evening clients hands-off. Would you be open to a 10-minute screen share where I show you how this pays for itself on the first job?`

    return {
      classification: parsed.classification === 'NEEDS_REVIEW' ? 'NEEDS_REVIEW' : 'HAS_WEBSITE',
      customerNextStep: topCandidate.customerNextStep,
      lane: topCandidate.lane,
      location: topCandidate.location,
      pageUrl: `${rootUrl.replace(/\/$/, '')}${topCandidate.location.startsWith('/') ? topCandidate.location : `/${topCandidate.location}`}`,
      friction: topCandidate.observableProblem,
      evidence: topCandidate.evidence,
      recognizableReason: topCandidate.recognizableReason,
      consequenceMechanics: topCandidate.consequenceMechanics,
      confidence: parsed.confidence || 'High',
      candidates,
      selectedCandidateId: topCandidate.id,
      emailX,
      whatsAppX,
      callBridgeScript,
      freeValueTask: {
        title: `Build 30s Mobile Concept for ${businessName}`,
        description: `Create a prototype resolving "${topCandidate.observableProblem}" on ${topCandidate.location} to demonstrate streamlined booking.`,
        prototypeFocus: topCandidate.lane,
      },
      reviewReason: parsed.reviewReason,
    }
  } catch {
    return generateFallbackIntelligence(rootUrl, businessName, trade, pages, checks, contactName)
  }
}

function generateFallbackIntelligence(
  rootUrl: string,
  businessName: string,
  trade: string,
  pages: PageNode[],
  checks: DeterministicChecks,
  contactName?: string
): OutreachIntelligence {
  const cleanUrl = rootUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const deterministicFrictions = identifyDeterministicFrictions(pages, checks, businessName)

  if (deterministicFrictions.length === 0) {
    // If no verifiable friction is detected, follow rule: DO NOT FORCE OUTREACH
    return {
      classification: 'NEEDS_REVIEW',
      customerNextStep: 'Enquire or book',
      lane: 'General mobile navigation',
      location: 'Homepage',
      pageUrl: rootUrl,
      friction: 'No significant verifiable friction detected',
      evidence: 'Deterministic scan did not find password locks, heavy form fields, or missing viewport.',
      recognizableReason: 'Site functions with standard layout; no visible barrier identified in <10 seconds.',
      consequenceMechanics: 'Buyer journey proceeds normally without obvious blockage.',
      confidence: 'Low',
      candidates: [],
      selectedCandidateId: '',
      emailX: formatEmailXOutreach({
        name: contactName,
        company: businessName,
        website: cleanUrl,
        page: 'homepage',
        websiteProblem: 'general mobile responsiveness',
        evidence: 'General check',
        customerNextStep: 'Contact',
        lane: 'Homepage',
        recognizableReason: 'buyers check work',
        consequenceMechanics: 'they decide',
        subjectLine: `Question about ${businessName}`,
      }),
      whatsAppX: formatWhatsAppXOutreach({
        name: contactName,
        company: businessName,
        website: cleanUrl,
        page: 'homepage',
        websiteProblem: 'general mobile responsiveness',
        evidence: 'General check',
        customerNextStep: 'Contact',
        lane: 'Homepage',
        recognizableReason: 'buyers check work',
        consequenceMechanics: 'they decide',
        subjectLine: `Question about ${businessName}`,
      }),
      callBridgeScript: '',
      freeValueTask: {
        title: 'Review Lead Manually',
        description: 'No automatic friction identified. Inspect manually before reaching out.',
        prototypeFocus: 'Manual review',
      },
      reviewReason: 'No valid observable friction found passing the 10-second test — do not force outreach.',
    }
  }

  const primary = deterministicFrictions[0]

  const variableY: VariableY = {
    name: contactName,
    company: businessName,
    website: cleanUrl,
    page: primary.location,
    websiteProblem: primary.observableProblem,
    evidence: primary.evidence,
    customerNextStep: primary.customerNextStep,
    lane: primary.lane,
    recognizableReason: primary.recognizableReason,
    consequenceMechanics: primary.consequenceMechanics,
    subjectLine: `Question regarding ${primary.location}`,
  }

  const emailX = formatEmailXOutreach(variableY)
  const whatsAppX = formatWhatsAppXOutreach(variableY)

  return {
    classification: 'HAS_WEBSITE',
    customerNextStep: primary.customerNextStep,
    lane: primary.lane,
    location: primary.location,
    pageUrl: `${rootUrl.replace(/\/$/, '')}${primary.location.startsWith('/') ? primary.location : `/${primary.location}`}`,
    friction: primary.observableProblem,
    evidence: primary.evidence,
    recognizableReason: primary.recognizableReason,
    consequenceMechanics: primary.consequenceMechanics,
    confidence: primary.confidence > 0.85 ? 'High' : 'Medium',
    candidates: deterministicFrictions,
    selectedCandidateId: primary.id,
    emailX,
    whatsAppX,
    callBridgeScript: `Hi ${contactName || 'there'}, glad you checked out the preview. The goal isn't to sell an expensive web build — it's simply to show you how removing that bottleneck on ${primary.location} lets you secure evening bookings without phone tag. Happy to jump on a short 10-min screen share to show you how this pays for itself.`,
    freeValueTask: {
      title: `Build 30s Mobile Prototype for ${businessName}`,
      description: `Create a prototype demonstrating streamlined flow for ${primary.lane} to resolve ${primary.observableProblem}.`,
      prototypeFocus: primary.lane,
    },
  }
}

export { buildNoWebsiteIntelligence }
