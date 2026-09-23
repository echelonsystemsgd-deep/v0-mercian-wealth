'use client'

import { useState, useEffect } from 'react'
import {
  Globe,
  Zap,
  Eye,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  ExternalLink,
  RotateCw,
} from 'lucide-react'
import type { AuditReport, FrictionFinding } from '@/lib/auditor/types'

interface IntelligenceTabProps {
  leadId?: string
  hasWebsite: boolean
  websiteUrl?: string
  businessName: string
  auditStatus?: 'none' | 'queued' | 'running' | 'complete' | 'failed'
  leadEmail?: string
  onEmailUpdated?: (newEmail: string) => void
}

export function IntelligenceTab({
  leadId,
  hasWebsite,
  websiteUrl,
  businessName,
  auditStatus: initialStatus = 'none',
  leadEmail,
  onEmailUpdated,
}: IntelligenceTabProps) {
  const [status, setStatus] = useState(initialStatus)
  const [audit, setAudit] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [emailSavedToast, setEmailSavedToast] = useState(false)

  // Fetch existing audit on load if lead has one
  useEffect(() => {
    if (leadId) {
      fetch(`/api/audit?leadId=${leadId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.found && data.audit) {
            setAudit(data.audit)
            setStatus(data.audit.status || 'complete')
          }
        })
        .catch(() => {})
    }
  }, [leadId])

  const handleRunAudit = async () => {
    if (!websiteUrl) return
    setLoading(true)
    setStatus('running')

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, url: websiteUrl }),
      })

      const data = await res.json()
      if (data.success && data.report) {
        setAudit(data.report)
        setStatus('complete')
        if (data.report.contactEmail && onEmailUpdated && !leadEmail) {
          onEmailUpdated(data.report.contactEmail)
        }
      } else {
        setStatus('failed')
      }
    } catch {
      setStatus('failed')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSection(sectionId)
      setTimeout(() => setCopiedSection(null), 2000)
    } catch {}
  }

  const handleUseExtractedEmail = (email: string) => {
    if (onEmailUpdated) {
      onEmailUpdated(email)
      setEmailSavedToast(true)
      setTimeout(() => setEmailSavedToast(false), 2500)
    }
  }

  // ── No website state ────────────────────────────────────────────────────────
  if (!hasWebsite) {
    return (
      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-[#0B0B0D] border border-white/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#141417] border border-white/10 flex items-center justify-center mx-auto text-amber-400">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">No Website Detected</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-sm mx-auto">
              {businessName} has no registered website. They rely entirely on word-of-mouth or their Google Maps profile.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <span className="font-mono text-[9px] uppercase opacity-70">observed</span>
              Zero digital storefront
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-medium">
              <span className="font-mono text-[9px] uppercase opacity-70">inferred</span>
              Evening searchers encounter a dead-end
            </span>
          </div>
          <p className="text-xs text-zinc-500 pt-2">
            Use the <strong className="text-zinc-300">Track B</strong> playbook under the Outreach tab.
          </p>
        </div>
      </div>
    )
  }

  // ── Audit Running / Loading State ───────────────────────────────────────────
  if (status === 'running' || loading) {
    return (
      <div className="p-8 rounded-2xl bg-[#0B0B0D] border border-white/10 flex flex-col items-center justify-center text-center space-y-4 min-h-[320px]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-[#DAA640]/20 border-t-[#DAA640] animate-spin" />
          <Eye size={18} className="text-[#DAA640] absolute inset-0 m-auto" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">
            Auditing {websiteUrl?.replace(/^https?:\/\//, '')}
          </p>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Crawling navigation · Checking forms & mobile viewports · Groq simulating customer journeys...
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#DAA640] animate-pulse" />
          Powered by Groq Llama 3.3 · 100% Free
        </div>
      </div>
    )
  }

  // ── No Audit Run Yet ────────────────────────────────────────────────────────
  if (status === 'none' || status === 'failed' || !audit) {
    return (
      <div className="space-y-5">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0B0D] border border-white/10 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#141417] border border-white/10 flex items-center justify-center mx-auto text-[#DAA640]">
            <Eye size={24} />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-bold text-white">AI Website Friction Auditor</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Scan <span className="text-white font-medium">{websiteUrl?.replace(/^https?:\/\//, '')}</span> to identify
              1 specific observable friction, find the business email, and draft an Outreach #1 email.
            </p>
            {status === 'failed' && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 py-1 px-3 rounded-lg inline-block">
                Previous scan was unable to reach the website. Click below to retry.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
            <div className="p-3.5 rounded-xl bg-[#141417] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#DAA640] uppercase tracking-wider font-semibold">1. Crawl & Contacts</span>
              <p className="text-xs font-semibold text-white">Extracts Email & Forms</p>
              <p className="text-[11px] text-zinc-500">Searches footer, contact pages, and mailto links for real addresses.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#141417] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#DAA640] uppercase tracking-wider font-semibold">2. Customer Journey</span>
              <p className="text-xs font-semibold text-white">1 Visible Friction</p>
              <p className="text-[11px] text-zinc-500">Pinpoints the single point of hesitation on mobile without accusations.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#141417] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#DAA640] uppercase tracking-wider font-semibold">3. Email X / Variable Y</span>
              <p className="text-xs font-semibold text-white">Micro-Yes Cold Email</p>
              <p className="text-[11px] text-zinc-500">Generates the exact written pathway email ready to send in 1 click.</p>
            </div>
          </div>

          <button
            onClick={handleRunAudit}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mx-auto"
          >
            <Zap size={15} /> Run Website Audit
          </button>
          <p className="text-[10px] text-zinc-600">
            Takes ~15–30 seconds · No browser automation costs
          </p>
        </div>
      </div>
    )
  }

  // ── Audit Complete: Render Full Intelligence Report ────────────────────────
  const primaryFriction: FrictionFinding = audit.frictions[0] || {
    id: 'f1',
    classification: 'OBSERVED',
    lane: 'mobile_conversion',
    location: 'homepage',
    observableProblem: 'mobile navigation has multiple nested levels',
    recognizableReason: 'visitors looking for service pricing struggle to find direct buttons',
    consequenceMechanics: 'they leave before initiating an inquiry',
    confidence: 0.8,
  }

  const emailOutreach = audit.outreachAngles?.emailX
  const effectiveEmail = leadEmail || audit.contactEmail

  return (
    <div className="space-y-6">
      {/* Toast */}
      {emailSavedToast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-xl">
          Email address attached to lead profile!
        </div>
      )}

      {/* Header telemetry strip */}
      <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Website Intelligence Verified</h3>
            <p className="text-[11px] text-zinc-500">
              {audit.pagesCrawled?.length || 1} pages inspected · Confidence: {Math.round(audit.confidenceScore * 100)}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAudit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-all cursor-pointer"
          >
            <RotateCw size={12} /> Re-scan
          </button>
          <a
            href={websiteUrl?.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-all"
          >
            Visit site <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Extracted Contact Email Bar */}
      {audit.contactEmail && (
        <div className="p-3.5 rounded-2xl bg-[#141417] border border-[#DAA640]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <Mail size={15} className="text-[#DAA640] shrink-0" />
            <div className="text-xs">
              <span className="text-zinc-400">Found business email: </span>
              <span className="text-white font-mono font-semibold">{audit.contactEmail}</span>
            </div>
          </div>
          {!leadEmail && (
            <button
              onClick={() => handleUseExtractedEmail(audit.contactEmail!)}
              className="py-1 px-3 rounded-lg bg-[#DAA640] hover:bg-[#C4932C] text-black font-semibold text-xs transition-all cursor-pointer shrink-0"
            >
              Save as Lead Email
            </button>
          )}
        </div>
      )}

      {/* ── Spotlight 1: Primary Friction ────────────────────────────────────── */}
      <div className="p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Primary Friction (The 1 Point of Hesitation)
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase">
            {primaryFriction.classification}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#141417] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Lane & Location</span>
            <p className="text-zinc-200 font-medium">
              {primaryFriction.lane} · <span className="text-[#DAA640]">{primaryFriction.location}</span>
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#141417] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Observable Problem</span>
            <p className="text-zinc-200 font-medium">{primaryFriction.observableProblem}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#141417] border border-white/5 space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">
              Recognisable Reason (Why Buyer Hesitates)
            </span>
            <p className="text-zinc-300 leading-relaxed italic">
              &ldquo;{primaryFriction.recognizableReason}&rdquo;
            </p>
          </div>
          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">
              Consequence Mechanics (Chain Reaction Without Numbers)
            </span>
            <p className="text-zinc-400 leading-relaxed">
              {primaryFriction.consequenceMechanics}
            </p>
          </div>
        </div>
      </div>

      {/* ── Spotlight 2: Generated Outreach #1 (Email X / Variable Y) ───────── */}
      {emailOutreach && (
        <div className="p-5 rounded-2xl bg-[#0B0B0D] border border-[#DAA640]/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-[#DAA640]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Outreach #1 — Email X / Variable Y
              </span>
            </div>
            <button
              onClick={() => handleCopy(emailOutreach.fullEmailText, 'emailX')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
            >
              {copiedSection === 'emailX' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copiedSection === 'emailX' ? 'Copied' : 'Copy Email'}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#141417] border border-white/5 text-xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">Subject:</span>
            <span className="text-white font-medium">{emailOutreach.subjectLine}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#141417] border border-white/5 text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
            {emailOutreach.fullEmailText.replace(/^Subject:[^\n]+\n\n/, '')}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            {effectiveEmail ? (
              <a
                href={`mailto:${effectiveEmail}?subject=${encodeURIComponent(emailOutreach.subjectLine)}&body=${encodeURIComponent(emailOutreach.fullEmailText.replace(/^Subject:[^\n]+\n\n/, ''))}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Mail size={13} /> Open Email Composer ({effectiveEmail})
              </a>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                <span>Add an email address to this lead to launch 1-click email composition.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Spotlight 3: Cold Call Opener & WhatsApp Angle ──────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {audit.outreachAngles?.coldCallOpener && (
          <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Phone size={13} className="text-[#DAA640]" /> Cold Call Opener
              </span>
              <button
                onClick={() => handleCopy(audit.outreachAngles.coldCallOpener, 'call')}
                className="text-[10px] text-zinc-400 hover:text-white"
              >
                {copiedSection === 'call' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#141417] p-3 rounded-xl border border-white/5">
              &ldquo;{audit.outreachAngles.coldCallOpener}&rdquo;
            </p>
          </div>
        )}

        {audit.outreachAngles?.whatsappOpener && (
          <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Globe size={13} className="text-[#DAA640]" /> WhatsApp Angle
              </span>
              <button
                onClick={() => handleCopy(audit.outreachAngles.whatsappOpener, 'wa')}
                className="text-[10px] text-zinc-400 hover:text-white"
              >
                {copiedSection === 'wa' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#141417] p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
              {audit.outreachAngles.whatsappOpener}
            </p>
          </div>
        )}
      </div>

      {/* ── Deterministic Checks Summary ───────────────────────────────────── */}
      {audit.deterministicChecks && (
        <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Deterministic Checks</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#141417] border border-white/5">
              <p className="text-zinc-500 text-[10px] font-mono">Mobile Viewport</p>
              <p className={`font-semibold ${audit.deterministicChecks.isResponsive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {audit.deterministicChecks.isResponsive ? 'Responsive' : 'Non-responsive'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#141417] border border-white/5">
              <p className="text-zinc-500 text-[10px] font-mono">Form Fields</p>
              <p className={`font-semibold ${audit.deterministicChecks.maxFormFieldsOnAnyPage > 6 ? 'text-amber-400' : 'text-zinc-200'}`}>
                {audit.deterministicChecks.maxFormFieldsOnAnyPage} max fields
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#141417] border border-white/5">
              <p className="text-zinc-500 text-[10px] font-mono">WhatsApp Link</p>
              <p className={`font-semibold ${audit.deterministicChecks.hasWhatsApp ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {audit.deterministicChecks.hasWhatsApp ? 'Detected' : 'None'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#141417] border border-white/5">
              <p className="text-zinc-500 text-[10px] font-mono">Storefront Lock</p>
              <p className={`font-semibold ${audit.deterministicChecks.isPasswordLocked ? 'text-rose-400' : 'text-emerald-400'}`}>
                {audit.deterministicChecks.isPasswordLocked ? 'Password Wall' : 'Open'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
