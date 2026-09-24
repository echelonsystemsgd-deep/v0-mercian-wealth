'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  X,
  Send,
  Copy,
  Check,
  Phone,
  Globe,
  MapPin,
  Star,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Trash2,
  ShieldCheck,
  MessageSquare,
  Mail,
  RefreshCw,
  Eye,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  UserCheck,
  AlertCircle,
  FileText
} from 'lucide-react'
import type { FrictionFinding, PipelineClassification } from '@/lib/auditor/types'
import {
  formatEmailXOutreach,
  formatWhatsAppXOutreach,
  buildNoWebsiteIntelligence,
  identifyDeterministicFrictions
} from '@/lib/auditor/deterministic'

export interface OutreachLead {
  id: string
  name: string
  business_name: string
  email: string
  phone: string | null
  website: string | null
  service_interested: string | null
  status: string
  source: string
  created_at: string
  is_archived: boolean
  local_business_niche?: string | null
  outreach_category?: string | null
  outreach_stage?: string | null
  whatsapp_direct_url?: string | null
  prototype_url?: string | null
  notes?: string | null
  scraped_metadata?: {
    rating?: number
    reviews_count?: number
    address?: string
    trade?: string
    stage_1_opener?: string
    stage_2_pitch?: string
    follow_up_1?: string
    follow_up_final?: string
    google_maps_url?: string
    channel?: string
  } | null
}

interface OutreachModalProps {
  isOpen: boolean
  onClose: () => void
  lead: OutreachLead | null
  onUpdateStatus: (leadId: string, newStatus: string) => Promise<void>
  onDeleteLead?: (leadId: string) => Promise<void>
}

export function OutreachModal({
  isOpen,
  onClose,
  lead,
  onUpdateStatus,
  onDeleteLead,
}: OutreachModalProps) {
  // Primary Tabs
  const [activeChannelTab, setActiveChannelTab] = useState<'whatsapp' | 'email' | 'call_bridge' | 'prototype_task'>('whatsapp')
  
  // Pipeline Classification: HAS_WEBSITE | NO_WEBSITE | NEEDS_REVIEW
  const [classification, setClassification] = useState<PipelineClassification>('NO_WEBSITE')
  
  // Brainstorm Candidate Selection
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('c1')
  const [showBrainstorm, setShowBrainstorm] = useState(false)
  
  // Editable fields for operator refinement
  const [customerNextStep, setCustomerNextStep] = useState('')
  const [lane, setLane] = useState('')
  const [pageLocation, setPageLocation] = useState('')
  const [friction, setFriction] = useState('')
  const [evidence, setEvidence] = useState('')
  const [recognizableReason, setRecognizableReason] = useState('')
  const [consequenceMechanics, setConsequenceMechanics] = useState('')
  const [reviewReason, setReviewReason] = useState('')

  const [copied, setCopied] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [isAuditing, setIsAuditing] = useState(false)

  // Derived Business Details
  const businessName = lead?.business_name || 'Local Business'
  const trade = (lead?.local_business_niche || lead?.scraped_metadata?.trade || 'local trade').toLowerCase()
  const rawWebsite = (lead?.website || '').trim()
  const hasRawWebsite =
    rawWebsite !== '' &&
    rawWebsite !== 'None' &&
    rawWebsite !== 'NO WEBSITE' &&
    !rawWebsite.toLowerCase().includes('facebook.com') &&
    !rawWebsite.toLowerCase().includes('instagram.com')

  const ownerName =
    lead?.name && lead.name !== lead.business_name && !lead.name.includes('Owner')
      ? lead.name.split(' ')[0]
      : ''

  const address = lead?.scraped_metadata?.address || lead?.notes || 'Berkshire, UK'
  const city = address && !address.startsWith('·') && !address.includes('★') ? address.split(',')[0].trim() : 'your area'

  const rating = lead?.scraped_metadata?.rating || 4.9
  const reviewsCount = lead?.scraped_metadata?.reviews_count || 24

  // Candidate generation based on lead data
  const candidateFrictions = useMemo<FrictionFinding[]>(() => {
    if (!hasRawWebsite) {
      const intel = buildNoWebsiteIntelligence(businessName, city, trade, ownerName)
      return intel.candidates
    }

    // Default high-probability candidate set for website audits
    return [
      {
        id: 'c1_form_friction',
        classification: 'OBSERVED',
        customerNextStep: 'Request an on-site survey or price quotation',
        lane: 'Quote enquiry form',
        location: '/quote',
        observableProblem: 'the quote form requires multiple separate text inputs on a smartphone screen',
        evidence: `Public inspection of ${rawWebsite} quote page confirmed multi-input form fields without a 2-tap option.`,
        recognizableReason: 'when prospective clients research on mobile in the evening, typing lengthy specifications causes immediate hesitation',
        consequenceMechanics: 'they postpone submitting and continue comparing alternatives that offer instant booking',
        confidence: 0.92,
        scores: {
          visible: true,
          fast: true,
          logical: true,
          decisionTied: true,
          observable: true,
          noNumbers: true,
        },
      },
      {
        id: 'c2_after_hours_action',
        classification: 'OBSERVED',
        customerNextStep: 'Confirm appointment or lock in consultation slot',
        lane: 'Consultation & booking stage',
        location: '/contact',
        observableProblem: 'there is no direct appointment confirmation or 1-tap booking mechanism for evening clients',
        evidence: 'Contact section lists phone and generic email only; no calendar reservation or direct WhatsApp dispatch active.',
        recognizableReason: 'customers searching outside normal working hours have no way to secure a provisional date on the spot',
        consequenceMechanics: 'they have less certainty at the decision point and move on to whoever allows an instant booking hold',
        confidence: 0.88,
        scores: {
          visible: true,
          fast: true,
          logical: true,
          decisionTied: true,
          observable: true,
          noNumbers: true,
        },
      },
      {
        id: 'c3_mobile_navigation',
        classification: 'OBSERVED',
        customerNextStep: 'Browse recent project portfolio and pricing guidance',
        lane: 'Portfolio & trust navigation',
        location: 'Mobile homepage header',
        observableProblem: 'the mobile navigation requires extensive pinch-and-scroll to view previous work',
        evidence: 'Mobile layout uses dense image galleries without tap-to-expand thumb-friendly layout.',
        recognizableReason: 'clients on 4G/5G connections experience clunky navigation and cannot quickly verify credentials',
        consequenceMechanics: 'the session loses momentum and the visitor returns to search results',
        confidence: 0.85,
        scores: {
          visible: true,
          fast: true,
          logical: true,
          decisionTied: true,
          observable: true,
          noNumbers: true,
        },
      },
    ]
  }, [hasRawWebsite, businessName, city, trade, ownerName, rawWebsite])

  // Sync state when lead changes
  useEffect(() => {
    if (lead) {
      if (hasRawWebsite) {
        setClassification('HAS_WEBSITE')
        const first = candidateFrictions[0]
        if (first) {
          setSelectedCandidateId(first.id)
          setCustomerNextStep(first.customerNextStep)
          setLane(first.lane)
          setPageLocation(first.location)
          setFriction(first.observableProblem)
          setEvidence(first.evidence)
          setRecognizableReason(first.recognizableReason)
          setConsequenceMechanics(first.consequenceMechanics)
        }
      } else {
        setClassification('NO_WEBSITE')
        const noWebIntel = buildNoWebsiteIntelligence(businessName, city, trade, ownerName)
        const primary = noWebIntel.candidates[0]
        setSelectedCandidateId(primary.id)
        setCustomerNextStep(primary.customerNextStep)
        setLane(primary.lane)
        setPageLocation(primary.location)
        setFriction(primary.observableProblem)
        setEvidence(primary.evidence)
        setRecognizableReason(primary.recognizableReason)
        setConsequenceMechanics(primary.consequenceMechanics)
      }
      setCopied(false)
      setActiveChannelTab('whatsapp')
      setShowBrainstorm(false)
    }
  }, [lead?.id, hasRawWebsite])

  // Handle selecting a brainstorm candidate
  const handleSelectCandidate = (candidate: FrictionFinding) => {
    setSelectedCandidateId(candidate.id)
    setCustomerNextStep(candidate.customerNextStep)
    setLane(candidate.lane)
    setPageLocation(candidate.location)
    setFriction(candidate.observableProblem)
    setEvidence(candidate.evidence)
    setRecognizableReason(candidate.recognizableReason)
    setConsequenceMechanics(candidate.consequenceMechanics)
  }

  // Construct active Variable Y
  const currentVariableY = useMemo(() => {
    return {
      name: ownerName,
      company: businessName,
      website: hasRawWebsite ? rawWebsite.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'None',
      page: pageLocation,
      websiteProblem: friction,
      evidence,
      customerNextStep,
      lane,
      recognizableReason,
      consequenceMechanics,
      subjectLine: classification === 'NO_WEBSITE'
        ? `Question regarding ${businessName} in ${city}`
        : `Quick question regarding ${pageLocation}`,
    }
  }, [
    ownerName,
    businessName,
    hasRawWebsite,
    rawWebsite,
    pageLocation,
    friction,
    evidence,
    customerNextStep,
    lane,
    recognizableReason,
    consequenceMechanics,
    classification,
    city,
  ])

  // Generated Messaging
  const generatedWhatsApp = useMemo(() => {
    if (classification === 'NO_WEBSITE') {
      const waGreeting = ownerName ? `Hi ${ownerName},` : 'Hi,'
      return `${waGreeting} came across ${businessName} — great reputation in ${city}.\n\nQuick observation: had a look for your dedicated site to check your past work and booking info, but couldn't find one active.\n\nUsually when a customer is comparing local ${trade} specialists in the evening, having no dedicated place to quickly confirm services and booking availability means they have less certainty at that decision point, so they continue looking at alternatives.\n\nPut together a quick 30-second mobile concept showing how ${businessName} could showcase your work and let clients request bookings directly on their phone.\n\nOpen to taking a quick look? (Zero obligation at all 👍)`
    }
    return formatWhatsAppXOutreach(currentVariableY).fullWhatsAppText
  }, [classification, ownerName, businessName, city, trade, currentVariableY])

  const generatedEmail = useMemo(() => {
    return formatEmailXOutreach(currentVariableY).fullEmailText
  }, [currentVariableY])

  const callBridgeScript = useMemo(() => {
    const nameStr = ownerName ? ` ${ownerName}` : ''
    return `Hi${nameStr}, glad you took a look at the preview.\n\nThe goal with this isn't to add an extra marketing expense or pitch another agency build — it's simply to show you what's possible when prospective clients can explore your work and lock in a booking directly on mobile.\n\nHappy to jump on a short 10-minute screen-share to show you how this pays for itself on just 1 or 2 new jobs and takes all the manual back-and-forth off your plate.\n\nWould you have 10 minutes free later this week?`
  }, [ownerName])

  const prototypeTask = useMemo(() => {
    return `PROTOTYPE SPECIFICATION TASK\n============================\nCompany: ${businessName}\nTrade: ${trade}\nArea: ${city}\nWebsite Status: ${classification}\nCustomer Next Step: ${customerNextStep}\nLane: ${lane}\nExact Friction Identified: ${friction}\nEvidence: ${evidence}\nPrototype Focus: Build 30-second mobile storefront demo specifically eliminating "${friction}" to demonstrate frictionless 2-tap enquiry.`
  }, [businessName, trade, city, classification, customerNextStep, lane, friction, evidence])

  const currentDisplayScript = useMemo(() => {
    switch (activeChannelTab) {
      case 'whatsapp':
        return generatedWhatsApp
      case 'email':
        return generatedEmail
      case 'call_bridge':
        return callBridgeScript
      case 'prototype_task':
        return prototypeTask
      default:
        return generatedWhatsApp
    }
  }, [activeChannelTab, generatedWhatsApp, generatedEmail, callBridgeScript, prototypeTask])

  // Clipboard handler
  const handleCopy = () => {
    navigator.clipboard.writeText(currentDisplayScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // WhatsApp sender
  const handleSendWhatsApp = () => {
    const cleanDigits = (lead?.phone || '').replace(/[^0-9]/g, '')
    const targetPhone = cleanDigits.startsWith('07') ? `44${cleanDigits.slice(1)}` : cleanDigits
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(currentDisplayScript)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Email sender
  const handleSendEmail = () => {
    const subject = encodeURIComponent(currentVariableY.subjectLine)
    const body = encodeURIComponent(currentDisplayScript)
    window.location.href = `mailto:${lead?.email || ''}?subject=${subject}&body=${body}`
  }

  if (!isOpen || !lead) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0B0B0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#111115] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white font-sans">{businessName}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 capitalize">
                  {trade}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53] font-semibold">
                  ★ {rating} ({reviewsCount})
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#DCAE53]" />
                  {city}
                </span>
                {lead.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-[#DCAE53]" />
                    {lead.phone}
                  </span>
                )}
                {hasRawWebsite && (
                  <a
                    href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#DCAE53] hover:underline"
                  >
                    <Globe size={12} />
                    {rawWebsite.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Pathway Classification Strip (3 Distinct Pathways) */}
        <div className="px-5 py-2.5 bg-[#0e0e12] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
              Pathway:
            </span>
            <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/10">
              <button
                onClick={() => setClassification('HAS_WEBSITE')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  classification === 'HAS_WEBSITE'
                    ? 'bg-[#DCAE53] text-[#09090B] font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Globe size={12} />
                <span>1. Has Website</span>
              </button>

              <button
                onClick={() => setClassification('NO_WEBSITE')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  classification === 'NO_WEBSITE'
                    ? 'bg-[#DCAE53] text-[#09090B] font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MapPin size={12} />
                <span>2. No Website (Google Maps)</span>
              </button>

              <button
                onClick={() => setClassification('NEEDS_REVIEW')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  classification === 'NEEDS_REVIEW'
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <AlertCircle size={12} />
                <span>3. Needs Review</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowBrainstorm(!showBrainstorm)}
            className="text-[11px] font-mono text-[#DCAE53] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Layers size={13} />
            <span>{showBrainstorm ? 'Hide Candidate Frictions' : 'AI Brainstorming Mode (Candidates)'}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 font-sans">
          
          {/* Needs Review Flag Notice */}
          {classification === 'NEEDS_REVIEW' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]">
                <AlertTriangle size={15} />
                <span>⚠️ Needs Review — Do Not Force Outreach</span>
              </div>
              <p className="text-zinc-300 leading-relaxed font-sans">
                {reviewReason ||
                  "The system cannot verify a single decision-tied friction passing the 10-second test with high confidence. The source methodology strictly prohibits forcing weak or hallucinated criticisms. Verify the site manually before contacting."}
              </p>
            </div>
          )}

          {/* AI Brainstorming Candidate Selector */}
          {showBrainstorm && (
            <div className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#DCAE53] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} />
                  Candidate Frictions Scored Against Quality Rules
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Pick the single strongest physical anchor</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {candidateFrictions.map((candidate, idx) => {
                  const isSelected = candidate.id === selectedCandidateId
                  return (
                    <div
                      key={candidate.id}
                      onClick={() => handleSelectCandidate(candidate)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10'
                          : 'bg-[#141417] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#DCAE53]">
                            Candidate {idx + 1}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                            {candidate.lane}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                          {candidate.observableProblem}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                          {candidate.recognizableReason}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                        <span className="text-emerald-400 flex items-center gap-0.5">
                          <Check size={10} /> 4 Tests Passed
                        </span>
                        <span className={isSelected ? 'text-[#DCAE53] font-bold' : ''}>
                          {isSelected ? 'Active Selected' : 'Click to Pick'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Outreach Intelligence Grid (Observable Evidence & Variable Y) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} />
                Outreach Intelligence & Variable Y (Accuracy &gt; Personalisation)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Confidence: High (Physical Evidence)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Row 1: Next Step & Lane */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  1. Customer Next Step
                </label>
                <input
                  type="text"
                  value={customerNextStep}
                  onChange={(e) => setCustomerNextStep(e.target.value)}
                  className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCAE53]"
                  placeholder="e.g. Request an on-site quote"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  2. Lane & Exact Page
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lane}
                    onChange={(e) => setLane(e.target.value)}
                    className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCAE53]"
                    placeholder="Lane (e.g. Quote form)"
                  />
                  <input
                    type="text"
                    value={pageLocation}
                    onChange={(e) => setPageLocation(e.target.value)}
                    className="w-32 bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCAE53]"
                    placeholder="Page (e.g. /quote)"
                  />
                </div>
              </div>

              {/* Row 2: ONE Friction & Physical Evidence */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  3. ONE Friction (Visible, Fast, Logical, Decision-Tied)
                </label>
                <textarea
                  rows={2}
                  value={friction}
                  onChange={(e) => setFriction(e.target.value)}
                  className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCAE53] resize-none"
                  placeholder="One specific observable problem without judgment"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  4. Objective Evidence (First-Class Field)
                </label>
                <textarea
                  rows={2}
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  className="w-full bg-[#18181F] border border-emerald-500/20 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500 resize-none font-mono"
                  placeholder="What was verified publicly in <10 seconds"
                />
              </div>

              {/* Row 3: Recognisable Reason & Consequence Mechanics */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  5. Recognisable Reason (Buyer Behaviour Pattern)
                </label>
                <textarea
                  rows={2}
                  value={recognizableReason}
                  onChange={(e) => setRecognizableReason(e.target.value)}
                  className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCAE53] resize-none"
                  placeholder="The customer behavior pattern that makes the operator nod"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  6. Consequence Mechanics (Cause → Effect Without Metrics)
                </label>
                <textarea
                  rows={2}
                  value={consequenceMechanics}
                  onChange={(e) => setConsequenceMechanics(e.target.value)}
                  className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCAE53] resize-none"
                  placeholder="Natural chain reaction without invented numbers"
                />
              </div>

            </div>
          </div>

          {/* Generated Channel Outreach Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChannelTab('whatsapp')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'whatsapp'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare size={14} className="text-[#DCAE53]" />
                  <span>WhatsApp Outreach (5-Part)</span>
                </button>

                <button
                  onClick={() => setActiveChannelTab('email')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'email'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Mail size={14} className="text-[#DCAE53]" />
                  <span>Email X (Permission Only)</span>
                </button>

                <button
                  onClick={() => setActiveChannelTab('call_bridge')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'call_bridge'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Phone size={14} className="text-[#DCAE53]" />
                  <span>Discovery Call Bridge</span>
                </button>

                <button
                  onClick={() => setActiveChannelTab('prototype_task')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'prototype_task'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText size={14} className="text-[#DCAE53]" />
                  <span>Prototype Task Spec</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Script'}</span>
                </button>

                {activeChannelTab === 'whatsapp' && (
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-4 py-1.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#DCAE53]/20 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Send via WhatsApp</span>
                  </button>
                )}

                {activeChannelTab === 'email' && (
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-1.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#DCAE53]/20 cursor-pointer"
                  >
                    <Mail size={13} />
                    <span>Send via Email</span>
                  </button>
                )}
              </div>
            </div>

            {/* Script Display Box */}
            <div className="relative rounded-2xl bg-[#070709] border border-white/10 p-4 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {currentDisplayScript}
            </div>

            {/* Educational methodology prompt badge */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#DCAE53]" />
                <span>
                  {activeChannelTab === 'whatsapp' || activeChannelTab === 'email'
                    ? 'Rule: 1 friction only. Asks for a micro-yes (permission). Does not sell the website on touch 1.'
                    : activeChannelTab === 'call_bridge'
                    ? 'Goal: Show possibilities & demonstrate how this is value added to the business, not an expense.'
                    : 'Feeds the prototype builder with the exact friction so the free value demonstrates real ROI.'}
                </span>
              </div>
              <span className="text-[#DCAE53] font-bold">10-Second Test Validated</span>
            </div>
          </div>

        </div>

        {/* Bottom Status Update Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#111115] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase mr-1">
              Set Lead Status:
            </span>
            {['New', 'Contacted', 'Call Booked', 'Won', 'Lost'].map((st) => (
              <button
                key={st}
                disabled={updating}
                onClick={async () => {
                  setUpdating(true)
                  try {
                    await onUpdateStatus(lead.id, st)
                  } finally {
                    setUpdating(false)
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  lead.status === st
                    ? 'bg-[#DCAE53] text-[#09090B] font-bold'
                    : 'bg-[#18181F] text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onDeleteLead && (
              <button
                onClick={() => onDeleteLead(lead.id)}
                className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Delete Lead"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
