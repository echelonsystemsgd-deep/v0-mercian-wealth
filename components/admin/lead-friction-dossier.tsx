'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Send,
  Sparkles,
  FileText,
  Save,
  MessageSquare,
  Globe,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import type { OutreachLead } from './outreach-modal'
import type { AccountantLeadIntelligence } from '@/lib/auditor/accountant-leads-registry'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl } from '@/lib/phone-classifier'

interface LeadFrictionDossierProps {
  lead: OutreachLead
  intel?: AccountantLeadIntelligence | null
  onSaveNotes?: (newNotes: string) => Promise<void>
  onSendWhatsApp?: (text: string) => void
}

export function LeadFrictionDossier({
  lead,
  intel,
  onSaveNotes,
  onSendWhatsApp
}: LeadFrictionDossierProps) {
  const metadata = (lead.scraped_metadata || {}) as Record<string, any>
  
  const frictionTitle = intel?.frictionBadge || metadata.friction_title || 'Website Intake & Qualification Friction'
  const pageLocation = intel?.pageLocation || metadata.page_location || '/contact & mobile navigation'
  const observableProblem = intel?.observableFriction || metadata.observable_problem || lead.notes || 'Inquiry intake lacks out-of-hours triage and fee pre-qualification.'
  const commercialConsequence = intel?.consequenceMechanics || metadata.commercial_consequence || 'Decision-ready business owners bounce to faster-responding practices, and fee-earners waste time on manual qualification.'
  const prototypeRemedy = intel?.prototypeRemedy || metadata.prototype_remedy || 'Interactive Corporation Tax & Retainer Estimator + 60-second direct calendar booking.'
  const protoUrl = intel?.prototypeUrl || metadata.prototype_url || lead.prototype_url || 'https://uk-accountancy-os-prototype.vercel.app/'

  const initialNotes = lead.notes || intel?.customNotes || ''
  const [notes, setNotes] = useState(initialNotes)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [copiedNotes, setCopiedNotes] = useState(false)
  const [savingNotes, setSavingNotes] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Benevolent Authority WhatsApp sequence
  const msg1 = intel?.whatsappOutreach.message1 || metadata.whatsapp_msg1 || `Hi team 👋 Came across ${lead.business_name || 'your firm'} — really liked how you present your services. Quick question if you don't mind: ahead of the upcoming 7 November quarterly update deadline and MTD updates, is your team currently taking on new clients, or is capacity booked out right now?`
  const msg2 = intel?.whatsappOutreach.message2 || metadata.whatsapp_msg2 || `Makes complete sense! The reason I asked is that so many practice owners we speak with right now are feeling the pressure of MTD updates—spending evenings chasing missing receipts and fielding tyre-kicker calls instead of focusing on high-value client advisory.\n\nWhen I looked at your site on mobile earlier, I noticed ${observableProblem.toLowerCase()}.\n\nIt struck me because your actual client work looks top tier, but the mobile intake might be letting good prospective clients slip through unnoticed.`
  const msg3 = intel?.whatsappOutreach.message3 || metadata.whatsapp_msg3 || `We engineered a simple practice intake and record-chasing system where you approve every message in seconds, while the system pre-qualifies incoming enquiries and collects client docs automatically before they hit your diary.\n\nI put together a private 30-second mobile walkthrough tailored for ${lead.business_name || 'your practice'} to show you how other UK practices are saving 10+ hours of admin a week:\n${protoUrl}\n\nHappy to send the link over to your phone if you're curious? (Zero pressure at all 👍)`
  const quickPitch = intel?.whatsappOutreach.quickDirectPitch || metadata.whatsapp_quick || `Hi team 👋 Came across ${lead.business_name || 'your practice'} while looking into independent practices in your area. Wanted to send a quick heads-up: your mobile enquiry intake has a few friction points that might cause busy directors to drop off before contacting you.\n\nAhead of the upcoming 7 November quarterly update deadline and MTD updates, we help practices set up clean intake flows that protect your personal time and collect records automatically.\n\nPut together a quick 30-second preview of what a tailored intake portal looks like for your practice:\n${protoUrl}\n\nOpen to taking a quick look on your phone? (Zero obligation at all 👍)\n\nIf you'd rather not hear from us, just say stop.`

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showFullCadence, setShowFullCadence] = useState(true)

  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // ignore
    }
  }

  const handleCopyNotes = async () => {
    try {
      await navigator.clipboard.writeText(notes)
      setCopiedNotes(true)
      setTimeout(() => setCopiedNotes(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleSaveNotes = async () => {
    if (!onSaveNotes) return
    setSavingNotes(true)
    try {
      await onSaveNotes(notes)
      setSaveSuccess(true)
      setIsEditingNotes(false)
      setTimeout(() => setSaveSuccess(false), 2500)
    } catch (e) {
      console.error(e)
    } finally {
      setSavingNotes(false)
    }
  }

  const phoneInfo = classifyPhoneNumber(lead.phone)

  const handleTriggerSendWhatsApp = (text: string) => {
    if (onSendWhatsApp) {
      onSendWhatsApp(text)
    } else {
      if (!phoneInfo.isWhatsAppViable) {
        alert(`☎️ UK Landline detected (${phoneInfo.displayNational}). Standard WhatsApp is unavailable.`)
        return
      }
      const waUrl = buildWhatsAppOpenerUrl(lead.phone, lead.business_name, lead.name) || `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(waUrl, '_blank')
    }
  }

  const rawWeb = (lead.website || '').trim()
  const webHref = rawWeb.startsWith('http') ? rawWeb : `https://${rawWeb}`

  return (
    <div className="space-y-4 font-sans">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD 1: VERIFIED FORENSIC FRICTION & PROTOTYPE REMEDY         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-[#121217] via-[#0E0E12] to-[#0A0A0D] border border-amber-500/25 p-4 sm:p-5 shadow-xl space-y-4">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-bold uppercase tracking-wider">
              <AlertTriangle size={12} className="text-amber-400 shrink-0" />
              <span>{frictionTitle}</span>
            </span>

            {lead.website && (
              <a
                href={webHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
                title="Inspect client site live"
              >
                <Globe size={11} className="text-[#DCAE53]" />
                <span className="truncate max-w-[160px]">{pageLocation}</span>
                <ExternalLink size={10} className="shrink-0" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>Forensically Verified</span>
          </div>
        </div>

        {/* Observable Problem & Consequence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
              <span>Observable Friction:</span>
            </div>
            <p className="text-zinc-200 leading-relaxed font-sans">
              {observableProblem}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              <span>Practice Workload & Peace-of-Mind Impact:</span>
            </div>
            <p className="text-zinc-300 leading-relaxed font-sans">
              {commercialConsequence}
            </p>
          </div>
        </div>

        {/* Prototype Remedy Showcase */}
        <div className="p-3.5 rounded-xl bg-[#DCAE53]/10 border border-[#DCAE53]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#DCAE53]">
              <Sparkles size={12} />
              <span>Cured via Practice Intake & Onboarding Blueprint:</span>
            </div>
            <p className="text-zinc-200 font-medium leading-snug">
              {prototypeRemedy}
            </p>
          </div>

          <a
            href={protoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs shrink-0 transition-all shadow-md shadow-[#DCAE53]/20 active:scale-95 cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Test Live Prototype</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD 2: FORENSIC NOTES & EVIDENCE NOTEPAD                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-[#0F0F13] border border-white/10 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[#DCAE53]" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Practice Reality Notes & Operational Angles
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNotes}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedNotes ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              <span>{copiedNotes ? 'Copied' : 'Copy Notes'}</span>
            </button>

            {onSaveNotes && (
              <button
                onClick={() => {
                  if (isEditingNotes) {
                    handleSaveNotes()
                  } else {
                    setIsEditingNotes(true)
                  }
                }}
                disabled={savingNotes}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                  isEditingNotes
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
              >
                {savingNotes ? <Sparkles size={11} className="animate-spin" /> : saveSuccess ? <Check size={11} className="text-emerald-400" /> : <Save size={11} />}
                <span>{isEditingNotes ? (savingNotes ? 'Saving...' : 'Save Notes') : 'Edit Notes'}</span>
              </button>
            )}
          </div>
        </div>

        {isEditingNotes ? (
          <div className="space-y-2">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full bg-[#070709] border border-white/15 rounded-xl p-3 font-mono text-xs text-zinc-200 leading-relaxed focus:outline-none focus:border-[#DCAE53] resize-y"
              placeholder="Enter forensic friction notes..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setNotes(initialNotes)
                  setIsEditingNotes(false)
                }}
                className="px-3 py-1 rounded-lg bg-white/5 text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="px-3.5 py-1 rounded-lg bg-[#DCAE53] text-[#09090B] font-bold text-xs cursor-pointer"
              >
                {savingNotes ? 'Saving...' : 'Save to Lead Record'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#070709] border border-white/5 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
            {notes || 'No notes currently stored. Click "Edit Notes" to add friction observations.'}
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD 3: TAILORED WHATSAPP OUTREACH SEQUENCES                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-[#0F0F13] border border-white/10 p-4 sm:p-5 shadow-lg space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquare size={15} className="text-emerald-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Benevolent Authority WhatsApp Outreach
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowFullCadence(!showFullCadence)}
              className="text-[11px] font-mono text-[#DCAE53] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showFullCadence ? 'Hide 3-Step Cadence' : 'Show 3-Step Cadence'}</span>
              {showFullCadence ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>

        {/* 1-Touch Consolidated Direct Pitch */}
        <div className="p-4 rounded-xl bg-[#14141A] border border-emerald-500/25 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                1-Touch Consolidated (Benevolent Authority)
              </span>
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">Outcome-First</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCopyText('quick_pitch', quickPitch)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'quick_pitch' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copiedId === 'quick_pitch' ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => handleTriggerSendWhatsApp(quickPitch)}
                className="px-3.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <Send size={11} />
                <span>Send WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#070709] border border-white/5 font-sans text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed">
            {quickPitch}
          </div>
        </div>

        {/* 3-Step Sequential Cadence */}
        {showFullCadence && (
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
              3-Step Sequential Conversation Cadence (Empathetic Sequence):
            </div>

            {/* Message 1 */}
            <div className="rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1A20] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#DCAE53]/15 text-[#DCAE53] font-mono text-[10px] font-bold">
                    STEP 1
                  </span>
                  <span className="text-xs font-bold text-white">Touch 1: Human Opener (Zero Pitch · Asks Capacity)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyText('msg1', msg1)}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'msg1' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === 'msg1' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleTriggerSendWhatsApp(msg1)}
                    className="px-2.5 py-1 rounded-lg bg-[#DCAE53] hover:bg-[#E5B85C] text-black text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Send size={10} />
                    <span>Send Msg 1</span>
                  </button>
                </div>
              </div>
              <div className="p-3 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed bg-[#070709]">
                {msg1}
              </div>
            </div>

            {/* Message 2 */}
            <div className="rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1A20] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-700/40 text-zinc-300 font-mono text-[10px] font-bold">
                    STEP 2
                  </span>
                  <span className="text-xs font-bold text-white">Touch 2: Empathetic Observation (Shared Reality & Care)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyText('msg2', msg2)}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'msg2' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === 'msg2' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleTriggerSendWhatsApp(msg2)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Send size={10} />
                    <span>Send Msg 2</span>
                  </button>
                </div>
              </div>
              <div className="p-3 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed bg-[#070709]">
                {msg2}
              </div>
            </div>

            {/* Message 3 */}
            <div className="rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1A20] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    STEP 3
                  </span>
                  <span className="text-xs font-bold text-white">Touch 3: Generous 30s Preview (Zero Obligation)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyText('msg3', msg3)}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'msg3' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === 'msg3' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleTriggerSendWhatsApp(msg3)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Send size={10} />
                    <span>Send Msg 3</span>
                  </button>
                </div>
              </div>
              <div className="p-3 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed bg-[#070709]">
                {msg3}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
