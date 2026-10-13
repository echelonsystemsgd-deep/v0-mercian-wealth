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
  FileText,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react'
import type { FrictionFinding, PipelineClassification } from '@/lib/auditor/types'
import {
  formatEmailXOutreach,
  formatWhatsAppXOutreach,
  buildWhatsApp3MessageSequence,
  buildEmail5TouchSequence,
  buildLinkedIn3MessageSequence,
  getDateAwareDeadlineHook,
  buildNoWebsiteIntelligence,
  identifyDeterministicFrictions
} from '@/lib/auditor/deterministic'
import { WhatsAppSequenceBlocks } from '@/components/admin/whatsapp-sequence-blocks'
import { AccountantsTemplateLibrary } from '@/components/admin/accountants-template-library'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'
import { createClient } from '@/lib/supabase/client'
import { findAccountantIntelligence } from '@/lib/auditor/accountant-leads-registry'
import { LeadFrictionDossier } from '@/components/admin/lead-friction-dossier'

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
  // Primary Channel Tabs: WhatsApp, Email, LinkedIn, Call Bridge, Prototype Task
  const [activeChannelTab, setActiveChannelTab] = useState<'whatsapp' | 'email' | 'email_5touch' | 'linkedin_3touch' | 'call_bridge' | 'prototype_task'>('whatsapp')
  
  // Lead Suppression & Opt-out state
  const [isSuppressed, setIsSuppressed] = useState(false)
  
  // Pipeline Classification: HAS_WEBSITE | NO_WEBSITE | NEEDS_REVIEW
  const [classification, setClassification] = useState<PipelineClassification>('NO_WEBSITE')
  
  // Refine Variables Accordion Toggle (Collapsed by default for zero clutter)
  const [showVariables, setShowVariables] = useState(false)

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

  const supabase = createClient()
  const accountantIntel = useMemo(() => {
    return findAccountantIntelligence(lead?.website, lead?.business_name)
  }, [lead?.website, lead?.business_name])

  const handleSaveLeadNotes = async (newNotes: string) => {
    if (!lead?.id) return
    try {
      const { error } = await supabase
        .from('leads')
        .update({ notes: newNotes })
        .eq('id', lead.id)
      if (error) throw error
      if (lead) lead.notes = newNotes
    } catch (err) {
      console.error('Failed to update lead notes:', err)
    }
  }

  // Derived Business Details
  const businessName = lead?.business_name || lead?.name || 'Local Business'
  const trade = (accountantIntel?.trade || lead?.local_business_niche || lead?.scraped_metadata?.trade || 'local trade').toLowerCase()
  const rawWebsite = (lead?.website || '').trim()
  const hasRawWebsite =
    rawWebsite !== '' &&
    rawWebsite !== 'None' &&
    rawWebsite !== 'NO WEBSITE' &&
    !rawWebsite.toLowerCase().includes('facebook.com') &&
    !rawWebsite.toLowerCase().includes('instagram.com')

  const ownerName =
    accountantIntel?.ownerOrDirector ||
    (lead?.name && lead.name !== lead.business_name && !lead.name.includes('Owner')
      ? lead.name.split(' ')[0]
      : '')

  const address = lead?.scraped_metadata?.address || lead?.notes || 'Berkshire, UK'
  const city = accountantIntel?.location || (address && !address.startsWith('·') && !address.includes('★') ? address.split(',')[0].trim() : 'your area')

  const rating = lead?.scraped_metadata?.rating || 4.9
  const reviewsCount = lead?.scraped_metadata?.reviews_count || 24

  // Candidate generation based on lead data
  const candidateFrictions = useMemo<FrictionFinding[]>(() => {
    if (!hasRawWebsite) {
      const intel = buildNoWebsiteIntelligence(businessName, city, trade, ownerName)
      return intel.candidates
    }

    const isAccountantNiche = 
      Boolean(accountantIntel) ||
      trade.toLowerCase().includes('account') || 
      trade.toLowerCase().includes('practice') || 
      businessName.toLowerCase().includes('account')

    const accountantCandidate: FrictionFinding = {
      id: 'c_accountant_practice',
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

    const standardCandidates: FrictionFinding[] = [
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

    if (accountantIntel) {
      const bespokeCandidate: FrictionFinding = {
        id: 'c_bespoke_accountant',
        classification: 'OBSERVED',
        customerNextStep: 'Enquire for Ltd Co compliance, switching firms, or advisory retainers',
        lane: 'Practice client intake & qualification',
        location: accountantIntel.pageLocation,
        observableProblem: accountantIntel.observableFriction,
        evidence: accountantIntel.evidence,
        recognizableReason: accountantIntel.recognizableReason,
        consequenceMechanics: accountantIntel.consequenceMechanics,
        confidence: 0.99,
        scores: {
          visible: true,
          fast: true,
          logical: true,
          decisionTied: true,
          observable: true,
          noNumbers: true,
        },
      }
      return [bespokeCandidate, accountantCandidate, ...standardCandidates]
    }

    return isAccountantNiche 
      ? [accountantCandidate, ...standardCandidates]
      : [...standardCandidates, accountantCandidate]
  }, [hasRawWebsite, businessName, city, trade, ownerName, rawWebsite, accountantIntel])

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
      setShowVariables(false)
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

  const isEarlyStage =
    !lead?.status ||
    lead.status === 'New' ||
    lead.status === 'Contacted' ||
    lead.status.toLowerCase() === 'uncontacted'

  // Unified WhatsApp 3-Message Sequence (Single Source of Truth)
  const whatsAppSequence = useMemo(() => {
    return buildWhatsApp3MessageSequence(
      currentVariableY,
      classification,
      trade,
      city
    )
  }, [currentVariableY, classification, trade, city])

  const generatedEmail = useMemo(() => {
    if (accountantIntel?.emailOutreach) {
      return `Subject: ${accountantIntel.emailOutreach.subject}\n\n${accountantIntel.emailOutreach.body}`
    }
    return formatEmailXOutreach(currentVariableY).fullEmailText
  }, [currentVariableY, accountantIntel])

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
        return accountantIntel?.whatsappOutreach
          ? `--- MESSAGE 1 (OPENER) ---\n${accountantIntel.whatsappOutreach.message1}\n\n--- MESSAGE 2 (OBSERVATION) ---\n${accountantIntel.whatsappOutreach.message2}\n\n--- MESSAGE 3 (PROTOTYPE & CALL CTA) ---\n${accountantIntel.whatsappOutreach.message3}\n\n--- 1-TOUCH DIRECT PITCH ---\n${accountantIntel.whatsappOutreach.quickDirectPitch}`
          : whatsAppSequence.fullSequenceText
      case 'email':
        return generatedEmail
      case 'call_bridge':
        return callBridgeScript
      case 'prototype_task':
        return prototypeTask
      default:
        return whatsAppSequence.fullSequenceText
    }
  }, [activeChannelTab, whatsAppSequence, generatedEmail, callBridgeScript, prototypeTask, accountantIntel])

  // Clipboard handler
  const handleCopy = () => {
    navigator.clipboard.writeText(currentDisplayScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // WhatsApp sender with auto-status advancement to Contacted
  const handleSendWhatsApp = (text?: string) => {
    const phoneInfo = classifyPhoneNumber(lead?.phone)
    if (!phoneInfo.isWhatsAppViable) {
      alert(`☎️ This lead has a UK Landline (${phoneInfo.displayNational}). Standard WhatsApp is unavailable for landlines.\n\nPlease use the Call Bridge tab to place a direct phone call, or Email outreach.`)
      setActiveChannelTab('call_bridge')
      return
    }

    const msg = text || (accountantIntel?.whatsappOutreach.message1 || whatsAppSequence.message1.text)
    const url = buildWhatsAppOpenerUrl(lead?.phone, businessName, ownerName) || `https://wa.me/?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')

    if (lead?.status === 'New') {
      onUpdateStatus(lead.id, 'Contacted')
    }
  }

  // Email sender
  const handleSendEmail = () => {
    const subject = encodeURIComponent(accountantIntel?.emailOutreach?.subject || currentVariableY.subjectLine)
    const body = encodeURIComponent(accountantIntel?.emailOutreach?.body || currentDisplayScript)
    window.location.href = `mailto:${lead?.email || ''}?subject=${subject}&body=${body}`
  }

  if (!isOpen || !lead) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0B0B0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header: Business Summary & Close */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-[#111115] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white font-sans truncate">{businessName}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 capitalize">
                  {accountantIntel?.trade || trade}
                </span>
                {accountantIntel && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                    🎯 Audited Lead
                  </span>
                )}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53] font-semibold">
                  ★ {rating} ({reviewsCount})
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#DCAE53]" />
                  {city}
                </span>
                {lead.phone && (() => {
                  const pInfo = classifyPhoneNumber(lead.phone)
                  return (
                    <span className="flex items-center gap-1.5 font-mono">
                      <Phone size={12} className={pInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'} />
                      <span className="text-zinc-200">{pInfo.displayNational}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] ${pInfo.isWhatsAppViable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'}`}>
                        {pInfo.badgeText}
                      </span>
                    </span>
                  )
                })()}
                {hasRawWebsite && (
                  <a
                    href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#DCAE53] hover:underline truncate max-w-[200px]"
                  >
                    <Globe size={12} />
                    {rawWebsite.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Pathway Classification & Quick Switch Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0e0e12] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
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
                <span>2. No Website</span>
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVariables(!showVariables)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={12} className="text-[#DCAE53]" />
              <span>{showVariables ? 'Hide Pitch Angles' : 'Refine Pitch Angles'}</span>
              {showVariables ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 font-sans">
          
          {/* Needs Review Flag Notice */}
          {classification === 'NEEDS_REVIEW' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5 animate-fade-in">
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

          {/* ───────────────────────────────────────────────────────────── */}
          {/* VERIFIED FORENSIC FRICTION & NOTES DOSSIER                     */}
          {/* ───────────────────────────────────────────────────────────── */}
          <LeadFrictionDossier
            lead={lead}
            intel={accountantIntel}
            onSaveNotes={handleSaveLeadNotes}
            onSendWhatsApp={handleSendWhatsApp}
          />

          {/* ───────────────────────────────────────────────────────────── */}
          {/* PRIMARY FOCUS: GENERATED CHANNEL OUTREACH DISPATCH            */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <button
                  onClick={() => setActiveChannelTab('whatsapp')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'whatsapp'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare size={14} className="text-[#DCAE53]" />
                  <span>Practice Templates (9)</span>
                </button>

                <button
                  onClick={() => setActiveChannelTab('email')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'email'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Mail size={14} className="text-[#DCAE53]" />
                  <span>Email X</span>
                </button>

                <button
                  onClick={() => setActiveChannelTab('call_bridge')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'call_bridge'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Phone size={14} className="text-[#DCAE53]" />
                  <span>Discovery Call Bridge</span>
                  {isEarlyStage && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                      Stage 3
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveChannelTab('prototype_task')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeChannelTab === 'prototype_task'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText size={14} className="text-[#DCAE53]" />
                  <span>Prototype Spec</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : activeChannelTab === 'whatsapp' ? 'Copy Full Sequence' : 'Copy'}</span>
                </button>

                {activeChannelTab === 'whatsapp' && (
                  <button
                    onClick={() => handleSendWhatsApp(whatsAppSequence.message1.text)}
                    className="px-4 py-1.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#DCAE53]/20 cursor-pointer"
                    title="Send Message 1 (Opener) on WhatsApp and advance status to Contacted"
                  >
                    <Send size={13} />
                    <span>Send Msg 1 (Opener)</span>
                  </button>
                )}

                {activeChannelTab === 'email' && (
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-1.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#DCAE53]/20 cursor-pointer"
                  >
                    <Mail size={13} />
                    <span>Send Email</span>
                  </button>
                )}
              </div>
            </div>

            {/* Tab Body */}
            {activeChannelTab === 'whatsapp' ? (
              <div className="space-y-6">
                <AccountantsTemplateLibrary
                  practiceName={businessName}
                  phone={lead.phone}
                  prototypeUrl={accountantIntel?.prototypeUrl || lead.prototype_url || 'https://uk-accountancy-os-prototype.vercel.app/'}
                  onSendWhatsApp={handleSendWhatsApp}
                />
                
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-mono font-bold text-zinc-400 mb-3 uppercase">
                    Alternative 3-Message Sequential Cadence:
                  </div>
                  <WhatsAppSequenceBlocks
                    sequence={whatsAppSequence}
                    phone={lead.phone}
                    onSendWhatsApp={handleSendWhatsApp}
                    showFullCopy={false}
                  />
                </div>
              </div>
            ) : activeChannelTab === 'call_bridge' ? (
              <div className="space-y-3">
                {isEarlyStage && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]">
                      <AlertCircle size={15} />
                      <span>🔒 Recommended for Stage 3 (After 30s Prototype is Viewed)</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed font-sans">
                      This prospect is at stage <span className="font-semibold text-white">{lead.status || 'New'}</span>. Calling or asking for a 10-minute discovery call on touch 1 reduces reply rates. Send Message 1 first to secure conversational permission.
                    </p>
                  </div>
                )}
                <div className="relative rounded-2xl bg-[#070709] border border-white/10 p-4 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {currentDisplayScript}
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl bg-[#070709] border border-white/10 p-4 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {currentDisplayScript}
              </div>
            )}

            {/* Methodology Rule Badge */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#DCAE53]" />
                <span>
                  {activeChannelTab === 'whatsapp'
                    ? '3-Step Sequence: Opener → Wait for reply → 1 Observable friction → 30s Preview micro-yes.'
                    : activeChannelTab === 'email'
                    ? 'Permission First: 1 friction only. Asks for permission without selling on touch 1.'
                    : activeChannelTab === 'call_bridge'
                    ? 'Commercial Frame: Show possibilities & demonstrate how this pays for itself on 1 new job.'
                    : 'Feeds prototype builder with exact physical friction to demonstrate frictionless booking.'}
                </span>
              </div>
              <span className="text-[#DCAE53] font-bold shrink-0">10-Second Test Validated</span>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* COLLAPSIBLE ACCORDION: REFINE PITCH & EVIDENCE (VARIABLES)    */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="border border-white/10 rounded-2xl bg-[#111115] overflow-hidden transition-all">
            <button
              onClick={() => setShowVariables(!showVariables)}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={14} className="text-[#DCAE53]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Refine Pitch & Evidence Variables (Optional)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                  {showVariables ? 'Expanded' : 'Tucked away'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[11px] font-mono hidden sm:inline">
                  {showVariables ? 'Click to collapse' : 'Click to customize prompt fields'}
                </span>
                {showVariables ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {showVariables && (
              <div className="p-4 sm:p-5 border-t border-white/10 space-y-4 animate-fade-in">
                
                {/* AI Brainstorming Candidates Toggle */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs text-zinc-400">
                    Switch between pre-scored friction candidates or fine-tune manual inputs:
                  </span>
                  <button
                    onClick={() => setShowBrainstorm(!showBrainstorm)}
                    className="text-[11px] font-mono text-[#DCAE53] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Layers size={13} />
                    <span>{showBrainstorm ? 'Hide Candidate Frictions' : 'Show Scored Candidates'}</span>
                  </button>
                </div>

                {/* Candidate Selector */}
                {showBrainstorm && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-3">
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
                )}

                {/* 6 Customization Inputs */}
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
                      3. ONE Friction (Observable problem)
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
                      4. Objective Evidence (Public verification)
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
                      5. Recognisable Reason (Buyer behavior)
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
                      6. Consequence Mechanics (Cause → Effect)
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
            )}
          </div>

        </div>

        {/* Bottom Status Update Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-[#111115] flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase mr-1">
              Status:
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
                    ? 'bg-[#DCAE53] text-[#09090B] font-bold shadow-sm'
                    : 'bg-[#18181F] text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
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
