import Groq from 'groq-sdk'
import type { PageNode, DeterministicChecks, FrictionFinding, VariableY, OutreachAngles } from './types'
import { identifyDeterministicFrictions, formatEmailXOutreach } from './deterministic'

const GROQ_MODEL = 'llama-3.3-70b-versatile'

export async function runGroqFrictionReasoning(
  rootUrl: string,
  businessName: string,
  trade: string,
  pages: PageNode[],
  checks: DeterministicChecks,
  contactName?: string
): Promise<{ frictions: FrictionFinding[]; outreachAngles: OutreachAngles; confidenceScore: number }> {
  const apiKey = process.env.GROQ_API_KEY

  // Fallback to deterministic rules if Groq API key is not configured
  if (!apiKey) {
    return generateFallbackReasoning(rootUrl, businessName, trade, pages, checks, contactName)
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
Analyze this website structure and produce ONE high-signal, evidence-backed friction analysis and an Outreach #1 (Email X / Variable Y) following these STRICT rules from our methodology:

STRICT RULES (From Outreach Engine PDFs):
1. ONE friction only - not a list, not an audit. One point of hesitation tied to one page or step.
2. The friction must pass 3 tests:
   - Visible: Can be verified in under 10 seconds.
   - Logical / Single-page: Lives on one page or step.
   - Decision-tied: Directly affects a buyer's willingness or ability to take the customer's next step (e.g. booking, submitting, reserving).
3. Recognisable reason: Describe the buyer's natural behavior pattern that makes the business owner nod in agreement. No accusations, no insults, no judgment of competence.
4. Consequence mechanics: Describe the chain reaction cause-and-effect WITHOUT numbers, WITHOUT metrics, WITHOUT conversion rate claims, and WITHOUT saying "you're losing £X".
5. Subject line: A clean decision label matching the micro-yes decision (e.g., "Quick question regarding [page]" or "Mobile booking on [company]"). Never an advertisement, never hype.
6. The first email asks for PERMISSION ONLY (Micro-yes). It offers a 30-second preview asset. It NEVER asks for a call or sells a service in the first email.

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
  "topFriction": {
    "lane": "customer next step (e.g. consultation booking, custom inquiry, quote request)",
    "location": "exact page or step label (e.g. your consultation page, mobile menu, /services)",
    "observableProblem": "one specific visible issue (e.g. the consultation form requires 8 separate text inputs on a smartphone)",
    "recognizableReason": "buyer behavior pattern (e.g. when high-intent evening buyers search on mobile, having to type detailed specs creates friction)",
    "consequenceMechanics": "chain reaction (e.g. they postpone completing it and leave to message whoever offers an instant 2-tap booking)",
    "classification": "OBSERVED"
  },
  "variableY": {
    "subjectLine": "clean decision label",
    "page": "exact page or step",
    "websiteProblem": "one specific problem",
    "recognizableReason": "buyer behavior pattern",
    "consequenceMechanics": "cause and effect without numbers"
  },
  "coldCallOpener": "conversational phone opener referencing the single observation as a physical anchor",
  "whatsappOpener": "casual WhatsApp opener pointing out the single friction and asking permission to share a 30s preview",
  "confidenceScore": 0.88
}
`

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert Website Friction Auditor who translates website structure into human-understandable customer journey friction following strict cold outreach guidelines. Return valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('Empty response from Groq')

    const parsed = JSON.parse(content)
    const top = parsed.topFriction

    const frictionFinding: FrictionFinding = {
      id: 'primary_groq_friction',
      classification: top.classification === 'INFERRED' ? 'INFERRED' : 'OBSERVED',
      lane: top.lane || 'booking_conversion',
      location: top.location || 'homepage',
      observableProblem: top.observableProblem,
      recognizableReason: top.recognizableReason,
      consequenceMechanics: top.consequenceMechanics,
      confidence: parsed.confidenceScore || 0.85,
    }

    const varY: VariableY = {
      name: contactName,
      company: businessName,
      website: rootUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      page: parsed.variableY?.page || frictionFinding.location,
      websiteProblem: parsed.variableY?.websiteProblem || frictionFinding.observableProblem,
      recognizableReason: parsed.variableY?.recognizableReason || frictionFinding.recognizableReason,
      consequenceMechanics: parsed.variableY?.consequenceMechanics || frictionFinding.consequenceMechanics,
      subjectLine: parsed.variableY?.subjectLine || `Quick question regarding ${frictionFinding.location}`,
    }

    const emailX = formatEmailXOutreach(varY)

    return {
      frictions: [frictionFinding],
      outreachAngles: {
        emailX,
        coldCallOpener: parsed.coldCallOpener || `Hi, is this ${businessName}? I was looking at ${frictionFinding.location} and noticed ${frictionFinding.observableProblem}. Is that something you're aware of?`,
        whatsappOpener: parsed.whatsappOpener || `Hi, came across ${businessName} — noticed ${frictionFinding.observableProblem} on ${frictionFinding.location}. Put together a quick 30s mobile concept showing how to streamline it. Open to a quick look?`,
        primaryAngleSummary: `${frictionFinding.location}: ${frictionFinding.observableProblem}`,
        targetLane: frictionFinding.lane,
      },
      confidenceScore: parsed.confidenceScore || 0.85,
    }
  } catch {
    // If Groq fails or times out, fallback seamlessly
    return generateFallbackReasoning(rootUrl, businessName, trade, pages, checks, contactName)
  }
}

function generateFallbackReasoning(
  rootUrl: string,
  businessName: string,
  trade: string,
  pages: PageNode[],
  checks: DeterministicChecks,
  contactName?: string
): { frictions: FrictionFinding[]; outreachAngles: OutreachAngles; confidenceScore: number } {
  const deterministicFrictions = identifyDeterministicFrictions(pages, checks, businessName)
  const cleanUrl = rootUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  const primary = deterministicFrictions[0] || {
    id: 'general_mobile_friction',
    classification: 'INFERRED' as const,
    lane: 'mobile_inquiry',
    location: 'mobile booking lane',
    observableProblem: 'the mobile booking flow lacks an instant reservation action for after-hours visitors',
    recognizableReason: 'customers searching on smartphones in the evening want immediate confirmation without telephone back-and-forth',
    consequenceMechanics: 'they hesitate and explore competing options that offer instant online appointments',
    confidence: 0.7,
  }

  const variableY: VariableY = {
    name: contactName,
    company: businessName,
    website: cleanUrl,
    page: primary.location,
    websiteProblem: primary.observableProblem,
    recognizableReason: primary.recognizableReason,
    consequenceMechanics: primary.consequenceMechanics,
    subjectLine: `Quick observation about ${primary.location}`,
  }

  const emailX = formatEmailXOutreach(variableY)

  return {
    frictions: [primary],
    outreachAngles: {
      emailX,
      coldCallOpener: `Hi, is this ${businessName}? I was having a look at ${primary.location} and noticed ${primary.observableProblem}. Is that something you've noticed with mobile visitors?`,
      whatsappOpener: `Hi 👋 came across ${businessName} — quick observation: noticed ${primary.observableProblem} on ${primary.location}.\n\nPut together a quick 30-second mobile concept showing how to resolve this. Open to taking a quick look on your phone?`,
      primaryAngleSummary: `${primary.location}: ${primary.observableProblem}`,
      targetLane: primary.lane,
    },
    confidenceScore: primary.confidence,
  }
}
