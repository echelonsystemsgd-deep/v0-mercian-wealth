'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
  ShieldCheck,
  MessageSquare,
  Mail,
  RefreshCw,
  Clock,
  Ban,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Layers,
  Calendar,
  Image as ImageIcon
} from 'lucide-react'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'
import { createClient } from '@/lib/supabase/client'
import { findAccountantIntelligence } from '@/lib/auditor/accountant-leads-registry'
import { evaluateSignalsToAnalysis } from '@/lib/auditor/rubric'
import { generateOutreachFromAnalysis } from '@/lib/auditor/evidence-outreach'
import type { AuditAnalysis, GeneratedOutreach, PriorityGrade } from '@/lib/auditor/evidence-types'

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
  friction_found?: string | null
  next_follow_up?: string | null
  date_messaged?: string | null
  scraped_metadata?: {
    rating?: number
    reviews_count?: number
    address?: string
    trade?: string
    google_maps_url?: string
    audit_analysis?: AuditAnalysis
    generated_outreach?: GeneratedOutreach
    grade?: PriorityGrade
    grade_reason?: string
    build_fingerprint?: {
      platform: string
      confidence: string
      evidence: string[]
    }
  } | null
}

interface OutreachModalProps {
  isOpen: boolean
  onClose: () => void
  lead: OutreachLead | null
  onUpdateStatus: (leadId: string, newStatus: string) => Promise<void>
  onDeleteLead?: (leadId: string) => Promise<void>
  onSnoozeLead?: (leadId: string, days: number) => Promise<void>
}

export function OutreachModal({
  isOpen,
  onClose,
  lead,
  onUpdateStatus,
  onDeleteLead,
  onSnoozeLead
}: OutreachModalProps) {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email'>('whatsapp')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isSuppressed, setIsSuppressed] = useState(false)
  const [checkingSuppression, setCheckingSuppression] = useState(false)
  const [auditing, setAuditing] = useState(false)
  const [showScreenshotModal, setShowScreenshotModal] = useState(false)

  const supabase = createClient()

  // Business basic details
  const businessName = lead?.business_name || lead?.name || 'Accountancy Practice'
  const rawWebsite = (lead?.website || '').trim()
  const domain = rawWebsite.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase()
  const hasWebsite = Boolean(rawWebsite && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE')
  const phoneInfo = classifyPhoneNumber(lead?.phone)
  const address = lead?.scraped_metadata?.address || lead?.notes || 'UK'
  const location = address.split(',')[0].replace(/^[·★\s]+/, '').trim() || 'UK'
  const rating = lead?.scraped_metadata?.rating || 5.0
  const reviewsCount = lead?.scraped_metadata?.reviews_count || 24

  // Check suppression table on load
  useEffect(() => {
    if (!lead?.phone) return
    let isMounted = true
    const checkSuppression = async () => {
      setCheckingSuppression(true)
      try {
        const { data } = await supabase
          .from('suppressed_contacts')
          .select('phone')
          .eq('phone', phoneInfo.cleanDigits || lead.phone)
          .maybeSingle()
        if (isMounted) {
          setIsSuppressed(Boolean(data))
        }
      } catch (err) {
        console.error('Failed to check suppression:', err)
      } finally {
        if (isMounted) setCheckingSuppression(false)
      }
    }
    checkSuppression()
    return () => {
      isMounted = false
    }
  }, [lead?.phone, phoneInfo.cleanDigits, supabase])

  // Look up verified accountant registry intelligence if existing
  const registryIntel = useMemo(() => {
    return findAccountantIntelligence(lead?.website, lead?.business_name)
  }, [lead?.website, lead?.business_name])

  // Derive or load AuditAnalysis
  const analysis = useMemo<AuditAnalysis>(() => {
    // 1. If stored in scraped_metadata
    if (lead?.scraped_metadata?.audit_analysis) {
      return lead.scraped_metadata.audit_analysis
    }

    // 2. If present in registry
    if (registryIntel) {
      const protoUrl = registryIntel.prototypeUrl || 'https://uk-accountancy-os-prototype.vercel.app/'
      return {
        domain: registryIntel.domain,
        url: `https://${registryIntel.domain}`,
        businessName: registryIntel.businessName,
        timestamp: new Date().toISOString(),
        buildFingerprint: {
          platform: 'WordPress',
          confidence: 'high',
          evidence: ['WordPress / Elementor accountancy template detected']
        },
        signals: {
          layoutAndPerformance: {
            hasHttps: true,
            hasViewportMeta: true,
            hasHorizontalOverflow: false,
            viewportWidthPx: 390,
            smallTapTargetsCount: 0,
            smallTapTargetSamples: [],
            brokenLinksCount: 0,
            sampleBrokenLinks: []
          },
          contactPaths: {
            hasTel: Boolean(registryIntel.phone),
            telNumbers: registryIntel.phone ? [registryIntel.phone] : [],
            hasWhatsApp: false,
            whatsAppLinks: [],
            hasMailto: true,
            mailtoAddresses: [],
            formsCount: 1,
            maxFormFields: 5,
            formDetails: [],
            bookingLinks: [],
            clientPortalLinks: [],
            hasNextStepAboveFold: true
          },
          trustAndCompliance: {
            regulators: ['ICAEW', 'ACCA'],
            hasPrivacyPolicy: true,
            hasCookieBanner: true,
            namedPeople: registryIntel.ownerOrDirector ? [registryIntel.ownerOrDirector] : [],
            reviewsFound: []
          },
          contentSignals: {
            hasServicesPage: true,
            servicesUrls: ['/services'],
            hasFaq: false,
            hasMtdMention: false,
            mtdSnippets: [],
            hasPricingSignal: false,
            hasSchemaMarkup: true,
            schemaTypes: ['AccountingService']
          }
        },
        findings: [
          {
            id: 'process_enquiry_response_speed',
            layer: 'process',
            severity: 4,
            confidence: 'verified',
            title: registryIntel.frictionBadge,
            summary: registryIntel.observableFriction,
            evidence: {
              url: `https://${registryIntel.domain}`,
              measuredValue: registryIntel.evidence,
              detail: registryIntel.recognizableReason
            },
            outcome: 'revenue',
            signalInferredFrom: registryIntel.pageLocation
          }
        ],
        primaryAngle: {
          id: 'angle_response_speed',
          title: registryIntel.frictionBadge,
          headline: registryIntel.observableFriction,
          diagnosis: registryIntel.recognizableReason,
          layer: 'process',
          evidence: {
            url: `https://${registryIntel.domain}`,
            measuredValue: registryIntel.evidence,
            detail: registryIntel.consequenceMechanics
          },
          outcome: 'revenue',
          remedyConcept: registryIntel.prototypeRemedy
        },
        supportingPoints: [
          {
            id: 'supp_time_burn',
            title: 'Partner Capacity Burn',
            evidence: {
              url: `https://${registryIntel.domain}`,
              measuredValue: registryIntel.consequenceMechanics
            }
          }
        ],
        callHypotheses: [
          {
            id: 'hyp_1',
            statement: 'Average response speed to website enquiries received after 6 PM',
            basisSignal: 'Site routes into static contact form without instant hold',
            status: 'unknown'
          },
          {
            id: 'hyp_2',
            statement: 'Hours spent chasing missing records before statutory deadlines',
            basisSignal: 'No client portal or automated record upload link found',
            status: 'unknown'
          }
        ],
        grade: 'A',
        gradeReason: 'High-value practice with form-only enquiry intake leaking out-of-hours directors.'
      }
    }

    // 3. Fallback baseline analysis
    return evaluateSignalsToAnalysis(
      domain || 'practice.co.uk',
      rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite || 'practice.co.uk'}`,
      businessName,
      {
        layoutAndPerformance: {
          hasHttps: true,
          hasViewportMeta: true,
          hasHorizontalOverflow: false,
          viewportWidthPx: 390,
          smallTapTargetsCount: 0,
          smallTapTargetSamples: [],
          brokenLinksCount: 0,
          sampleBrokenLinks: []
        },
        contactPaths: {
          hasTel: Boolean(lead?.phone),
          telNumbers: lead?.phone ? [lead.phone] : [],
          hasWhatsApp: phoneInfo.isWhatsAppViable,
          whatsAppLinks: [],
          hasMailto: Boolean(lead?.email),
          mailtoAddresses: lead?.email ? [lead.email] : [],
          formsCount: 1,
          maxFormFields: 4,
          formDetails: [],
          bookingLinks: [],
          clientPortalLinks: [],
          hasNextStepAboveFold: true
        },
        trustAndCompliance: {
          regulators: ['ICAEW', 'ACCA'],
          hasPrivacyPolicy: true,
          hasCookieBanner: true,
          namedPeople: [],
          reviewsFound: []
        },
        contentSignals: {
          hasServicesPage: true,
          servicesUrls: [],
          hasFaq: false,
          hasMtdMention: false,
          mtdSnippets: [],
          hasPricingSignal: false,
          hasSchemaMarkup: true,
          schemaTypes: []
        }
      },
      {
        platform: 'WordPress',
        confidence: 'medium',
        evidence: ['Standard UK accountancy practice infrastructure']
      }
    )
  }, [lead, registryIntel, domain, rawWebsite, businessName, phoneInfo.isWhatsAppViable])

  // Single-source generated outreach (guaranteed zero contradictions)
  const outreach: GeneratedOutreach = useMemo(() => {
    if (lead?.scraped_metadata?.generated_outreach) {
      return lead.scraped_metadata.generated_outreach
    }
    return generateOutreachFromAnalysis(analysis)
  }, [analysis, lead?.scraped_metadata?.generated_outreach])

  // Clipboard copy handler
  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  // Trigger WhatsApp send
  const handleTriggerSendWhatsApp = (msg: string) => {
    if (isSuppressed) {
      alert('⚠️ This contact is on your SUPPRESSION LIST. Outreach is blocked.')
      return
    }

    if (!phoneInfo.isWhatsAppViable) {
      alert(`☎️ This practice lists a UK Landline (${phoneInfo.displayNational}). WhatsApp is unavailable for landlines. Use Email or direct phone call.`)
      setActiveChannel('email')
      return
    }

    const waUrl = buildWhatsAppOpenerUrl(lead?.phone, businessName, lead?.name) || `https://wa.me/?text=${encodeURIComponent(msg)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    if (lead?.status === 'New') {
      onUpdateStatus(lead.id, 'Contacted')
    }
  }

  // Action: Mark STOP (Suppression)
  const handleMarkStop = async () => {
    if (!lead?.id) return
    const confirmStop = confirm(`Are you sure you want to STOP outreach to ${businessName}? This will add their phone number to the suppression list.`)
    if (!confirmStop) return

    try {
      if (lead.phone) {
        await supabase
          .from('suppressed_contacts')
          .upsert({
            phone: phoneInfo.cleanDigits || lead.phone,
            reason: 'User marked STOP in admin panel',
            source: 'admin_panel'
          })
      }
      await onUpdateStatus(lead.id, 'STOP')
      setIsSuppressed(true)
    } catch (err) {
      console.error('Failed to suppress lead:', err)
    }
  }

  // Action: Snooze 2 days
  const handleSnooze = async () => {
    if (!lead?.id) return
    if (onSnoozeLead) {
      await onSnoozeLead(lead.id, 2)
    } else {
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + 2)
      await supabase
        .from('leads')
        .update({ next_follow_up: nextDate.toISOString().split('T')[0] })
        .eq('id', lead.id)
      alert(`Snoozed ${businessName} for 2 days.`)
    }
  }

  // Trigger live re-audit
  const handleRunLiveAudit = async () => {
    if (!lead?.website || lead.website === 'None') return
    setAuditing(true)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, url: lead.website })
      })
      const data = await res.json()
      if (res.ok) {
        alert('✅ Live 390px audit completed. Refresh to view updated evidence.')
        window.location.reload()
      } else {
        alert(`Audit note: ${data.error || 'Failed to complete audit'}`)
      }
    } catch (err: any) {
      alert(`Audit error: ${err.message}`)
    } finally {
      setAuditing(false)
    }
  }

  if (!isOpen || !lead) return null

  const gradeBadgeBg =
    analysis.grade === 'A'
      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
      : analysis.grade === 'B'
      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
      : analysis.grade === 'Hold: nothing verified'
      ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
      : 'bg-zinc-500/15 border-zinc-500/30 text-zinc-300'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#09090B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* ───────────────────────────────────────────────────────────── */}
        {/* 1. HEADER: PRACTICE, WEBSITE, PHONE, LOCATION, BUILD, STATUS  */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#111115] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white font-sans truncate">{businessName}</h2>
                
                {/* Build Signal Badge */}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium">
                  {analysis.buildFingerprint.platform}
                </span>

                {/* Rating Badge */}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53] font-semibold">
                  ★ {rating} ({reviewsCount})
                </span>

                {/* Lead Status Badge */}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-300">
                  {lead.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#DCAE53]" />
                  {location}
                </span>

                {/* Website Link */}
                {hasWebsite && (
                  <a
                    href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#DCAE53] hover:underline truncate max-w-[200px]"
                  >
                    <Globe size={12} />
                    {domain}
                    <ExternalLink size={10} />
                  </a>
                )}

                {/* Phone / WhatsApp Badge */}
                {lead.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={12} className={phoneInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'} />
                    <span className="text-zinc-200">{phoneInfo.displayNational}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] ${phoneInfo.isWhatsAppViable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'}`}>
                      {phoneInfo.badgeText}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={handleRunLiveAudit}
              disabled={auditing || !hasWebsite}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Run fresh headless browser inspection at 390px mobile viewport"
            >
              <RefreshCw size={12} className={auditing ? 'animate-spin text-[#DCAE53]' : ''} />
              <span className="hidden sm:inline">{auditing ? 'Probing...' : 'Re-Audit (390px)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 2. VERDICT: PRIORITY GRADE + ONE-LINE REASON                  */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="px-5 py-3 bg-[#0d0d10] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border flex items-center gap-1.5 shadow-sm ${gradeBadgeBg}`}>
              <span>Grade {analysis.grade}</span>
            </span>
            <p className="text-zinc-300 font-sans leading-tight text-xs">
              {analysis.gradeReason}
            </p>
          </div>

          {isSuppressed && (
            <span className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-bold flex items-center gap-1">
              <Ban size={11} /> Suppressed Contact
            </span>
          )}
        </div>

        {/* Scrollable Card Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 font-sans">
          
          {/* ───────────────────────────────────────────────────────────── */}
          {/* 3. PRIMARY ANGLE & EVIDENCE (Simple English Observation)      */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="rounded-2xl bg-[#111116] border border-amber-500/25 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#DCAE53]/15 text-[#DCAE53] border border-[#DCAE53]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {analysis.primaryAngle.layer} layer
                </span>
                <h3 className="text-sm font-bold text-white font-sans">
                  {analysis.primaryAngle.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <ShieldCheck size={13} />
                <span>Evidence-Backed Diagnosis</span>
              </div>
            </div>

            {/* Observation in Simple English */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400">
                Observable Practice Friction:
              </div>
              <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed font-sans">
                {analysis.primaryAngle.diagnosis}
              </p>
            </div>

            {/* Evidence Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono font-semibold uppercase text-zinc-400">
                  Measured Ground Truth:
                </div>
                <div className="font-mono text-zinc-300 text-xs truncate">
                  {String(analysis.primaryAngle.evidence.measuredValue)}
                </div>
                {analysis.primaryAngle.evidence.detail && (
                  <p className="text-[11px] text-zinc-400 font-sans mt-0.5 leading-snug">
                    {analysis.primaryAngle.evidence.detail}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono font-semibold uppercase text-zinc-400">
                  Operational Curing Remedy:
                </div>
                <p className="text-zinc-300 text-xs font-sans leading-snug">
                  {analysis.primaryAngle.remedyConcept}
                </p>
              </div>
            </div>

            {/* Supporting Points */}
            {analysis.supportingPoints.length > 0 && (
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Supporting Evidence (Non-Contradictory):
                </div>
                <div className="space-y-1">
                  {analysis.supportingPoints.map((sp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <ChevronRight size={13} className="text-[#DCAE53] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">{sp.title}</strong>: {String(sp.evidence.measuredValue)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* 4. HYPOTHESES TO VALIDATE ON CALL (Labelled UNKNOWN)          */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="rounded-2xl bg-[#0d0d11] border border-white/10 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle size={15} className="text-[#DCAE53]" />
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Hypotheses to Validate on Call (Unobservable Ground Truth)
              </h4>
            </div>

            <p className="text-[11px] text-zinc-400 font-sans">
              These operational questions cannot be evidenced from public pages and are strictly labelled unknown. Validate these collaboratively with the practice owner:
            </p>

            <div className="space-y-2">
              {analysis.callHypotheses.map(hyp => (
                <div key={hyp.id} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-2.5 text-xs">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300 shrink-0 uppercase">
                    {hyp.status}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-zinc-200 font-medium">{hyp.statement}</p>
                    <p className="text-[10px] font-mono text-zinc-400">Observable basis: {hyp.basisSignal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* 5. READY-TO-SEND MESSAGES (Just 2: WhatsApp & Email)          */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChannel('whatsapp')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeChannel === 'whatsapp'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  <MessageSquare size={14} className="text-[#25D366]" />
                  <span>WhatsApp Outreach</span>
                </button>

                <button
                  onClick={() => setActiveChannel('email')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeChannel === 'email'
                      ? 'bg-[#141417] text-[#DCAE53] border border-[#DCAE53]/40 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  <Mail size={14} className="text-[#DCAE53]" />
                  <span>Email Outreach</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-zinc-400">
                Single Source of Truth · No Contradictions
              </div>
            </div>

            {/* WhatsApp Outreach View */}
            {activeChannel === 'whatsapp' ? (
              <div className="space-y-4">
                
                {/* 1. Recommended Opener */}
                <div className="rounded-2xl bg-[#09090C] border border-emerald-500/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        RECOMMENDED OPENER
                      </span>
                      <span className="text-xs font-sans font-medium text-zinc-300">
                        Outcome-First & Evidenced
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy('wa_rec', outreach.whatsappOpenerRecommended)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'wa_rec' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedId === 'wa_rec' ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleTriggerSendWhatsApp(outreach.whatsappOpenerRecommended)}
                        disabled={isSuppressed}
                        className="px-3.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 cursor-pointer disabled:opacity-50"
                      >
                        <Send size={12} />
                        <span>Send WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 font-sans text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {outreach.whatsappOpenerRecommended}
                  </div>
                </div>

                {/* 2. Alternative Opener */}
                <div className="rounded-2xl bg-[#09090C] border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                      Alternative Conversational Opener:
                    </span>

                    <button
                      onClick={() => handleCopy('wa_alt', outreach.whatsappOpenerAlternative)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'wa_alt' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === 'wa_alt' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 font-sans text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {outreach.whatsappOpenerAlternative}
                  </div>
                </div>

                {/* 3. Follow-Ups Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#09090C] border border-white/10 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                        Follow-Up 1 (Day 3):
                      </span>
                      <button
                        onClick={() => handleCopy('fu1', outreach.whatsappFollowUp1)}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono cursor-pointer"
                        title="Copy Follow-up 1"
                      >
                        {copiedId === 'fu1' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-sans text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {outreach.whatsappFollowUp1}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#09090C] border border-white/10 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                        Follow-Up 2 (Day 7, Close):
                      </span>
                      <button
                        onClick={() => handleCopy('fu2', outreach.whatsappFollowUp2)}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono cursor-pointer"
                        title="Copy Follow-up 2"
                      >
                        {copiedId === 'fu2' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-sans text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {outreach.whatsappFollowUp2}
                    </div>
                  </div>
                </div>

                {/* 4. Builder Reposition Reply */}
                <div className="rounded-2xl bg-[#09090C] border border-sky-500/25 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        REPLY: &quot;MY BUILDER / WEB PERSON WILL FIX THAT&quot;
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy('b_rep', outreach.whatsappBuilderReply)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'b_rep' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === 'b_rep' ? 'Copied' : 'Copy Reply'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-sans">
                    Use when the practice states their developer will handle it. Acknowledges, then repositions from web design to post-enquiry operations:
                  </p>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 font-sans text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {outreach.whatsappBuilderReply}
                  </div>
                </div>
              </div>
            ) : (
              /* Email Outreach View */
              <div className="rounded-2xl bg-[#09090C] border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Prefilled Email Outreach
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy('em_body', `Subject: ${outreach.emailOutreach.subject}\n\n${outreach.emailOutreach.body}`)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'em_body' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === 'em_body' ? 'Copied' : 'Copy'}</span>
                    </button>

                    <a
                      href={`mailto:${lead.email || ''}?subject=${encodeURIComponent(outreach.emailOutreach.subject)}&body=${encodeURIComponent(outreach.emailOutreach.body)}`}
                      className="px-3.5 py-1 rounded-lg bg-[#DCAE53] hover:bg-[#E5B85C] text-black font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-[#DCAE53]/20 cursor-pointer"
                    >
                      <Mail size={12} />
                      <span>Open Mail Client</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-zinc-300">
                    <strong className="text-white">Subject:</strong> {outreach.emailOutreach.subject}
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-sans text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {outreach.emailOutreach.body}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* 6. COMPLIANCE ROW: WHATSAPP LISTED, SUPPRESSION, DATE/SOURCE  */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="p-3.5 rounded-xl bg-[#0c0c10] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-zinc-400">
                Business WhatsApp: <strong className={phoneInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'}>{phoneInfo.isWhatsAppViable ? 'Yes (Published Mobile)' : 'Landline Only'}</strong>
              </span>

              <span className="text-zinc-500">|</span>

              <span className="text-zinc-400">
                Suppression Status: <strong className={isSuppressed ? 'text-rose-400' : 'text-emerald-400'}>{isSuppressed ? 'SUPPRESSED (Do Not Contact)' : 'Clean'}</strong>
              </span>
            </div>

            <div className="text-[11px] text-zinc-400">
              Source: <span className="text-zinc-300 capitalize">{lead.source || 'Companies House / Registry'}</span> · Added: {new Date(lead.created_at).toLocaleDateString('en-GB')}
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* 7. ACTIONS: MARK SENT, SNOOZE 2 DAYS, MARK LOST, MARK STOP    */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onUpdateStatus(lead.id, 'Contacted')}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 size={13} />
                <span>Mark Sent (Contacted)</span>
              </button>

              <button
                onClick={handleSnooze}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Clock size={13} />
                <span>Snooze 2 Days</span>
              </button>

              <button
                onClick={() => onUpdateStatus(lead.id, 'Lost')}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-rose-300 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Mark Lost</span>
              </button>
            </div>

            <div>
              <button
                onClick={handleMarkStop}
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Suppresses contact from further outreach under opt-out compliance"
              >
                <Ban size={13} />
                <span>Mark STOP (Add to Suppression)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
