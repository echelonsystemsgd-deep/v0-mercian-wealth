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
  const [cadenceMode, setCadenceMode] = useState<'standard' | 'viky-yes' | 'viky-no' | 'on-call' | 'call-booked'>('standard')

  // Benevolent Authority WhatsApp sequence (RULE: NO LINKS SENT TILL CALL IS BOOKED)
  const msg1 = intel?.whatsappOutreach.message1 || metadata.whatsapp_msg1 || `Hi team 👋 Came across ${lead.business_name || 'your firm'} — really liked how you present your services. Quick question if you don't mind: ahead of the upcoming 7 November quarterly update deadline and MTD updates, is your team currently taking on new clients, or is capacity booked out right now?`
  
  const msg2 = intel?.whatsappOutreach.message2 || metadata.whatsapp_msg2 || `Makes complete sense! The reason I asked is that so many practice owners we speak with right now are feeling the pressure of MTD updates—spending late evenings chasing missing receipts and fielding enquiry calls instead of focusing on high-value client advisory.\n\nWhen I looked at your setup on mobile earlier, I noticed ${observableProblem.toLowerCase()}.\n\nIt struck me because your actual client work looks top tier, but the mobile intake might be letting good prospective clients slip through unnoticed.`
  
  const msg3 = `I’d love to share a couple of helpful observations with you over a 5-minute phone call — completely candid, no strings attached — just to help you capture those enquiries properly.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?`
  
  const quickPitch = `Hi team 👋 Came across ${lead.business_name || 'your practice'} while looking into independent practices in your area. Wanted to send a quick heads-up: your mobile enquiry intake has a few friction points that might cause busy directors to drop off before contacting you.\n\nAhead of the upcoming 7 November quarterly update deadline and MTD updates, we help practices set up clean intake flows that protect your personal time and collect records automatically.\n\nI’d love to share a couple of helpful observations with you over a brief 5-minute phone call — completely candid, zero obligation — just to share what’s working for other practices.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?\n\nIf you'd rather not hear from us, just say stop.`

  // ── VIKY REFERRAL SEQUENCES ──────────────────────────────────────────────
  const vikyYesWebsite = `Thanks for sharing that! I took a proper look through.\n\nViky spoke really highly of your work, and seeing what you do for property clients, your expertise is obvious.\n\nThe only reason I mentioned looking at your site is because I genuinely want your online setup to reflect the quality of service you actually provide. Right now, a few friction points on mobile might be causing busy property investors to bounce before they ever reach out to you.\n\nI’d love to share a couple of helpful observations with you over a 5-minute phone call — completely candid, no strings attached — just to help you capture those enquiries properly.\n\nAre you free for a quick chat tomorrow afternoon or Thursday?`

  const vikyNoWebsite = `I completely understand! To be honest, so many brilliant accountants grow 100% by word-of-mouth like Viky’s referral, so the website gets pushed to the back burner while you’re busy looking after clients.\n\nThe reason I asked is that ahead of the upcoming 7 November quarterly update deadline and MTD changes, so many practice owners we know are getting overwhelmed with manual back-and-forth chasing documents and onboarding clients over WhatsApp.\n\nI want to make sure your firm has a clean presence and intake flow that actually protects your time and lets you focus on high-value advisory work.\n\nLet’s grab a brief 10-minute catch up this week — we can chat through my property accounts, and I’m happy to share some ideas on how you can automate your client intake so you don't have to spend your weekends doing admin.\n\nHow does your diary look tomorrow afternoon or Thursday?`

  // ── CALL BOOKED PROTOTYPE DELIVERY ───────────────────────────────────────
  const callBookedPrototypeDelivery = `Really looking forward to our catch-up! Ahead of our chat, here is the private 30-second walkthrough showing how other UK practices automate intake and protect partner time:\n${protoUrl}\n\nTake a look whenever you have a minute!`

  // ── ON-CALL 3 "GENUINE CARE" DIAGNOSTIC QUESTIONS ────────────────────────
  const onCallQuestions = [
    {
      num: 1,
      title: 'Ideal Clients & Time Drain',
      question: `Viky holds you in really high regard — what kind of property clients do you enjoy working with most, and who takes up too much of your time?`,
      intent: 'Demonstrates deep respect for their time and billable sanity.'
    },
    {
      num: 2,
      title: 'MTD Crunch & Document Chasing',
      question: `Ahead of the upcoming MTD quarterly updates, what’s currently eating up the biggest chunk of your week? Is it chasing records from clients, or fielding general enquiries?`,
      intent: 'Directly uncovers the exact operational headache our software solves.'
    },
    {
      num: 3,
      title: 'Stress Relief & Automated Intake',
      question: `If we could build a tailored site and onboarding flow that automatically qualifies enquiries and collects their documents upfront before they ever book with you, would that take a real weight off your shoulders?`,
      intent: 'They will say yes, because you framed it around relieving stress, not selling tech.'
    }
  ]

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
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] w-full sm:w-auto rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs shrink-0 transition-all shadow-md shadow-[#DCAE53]/20 active:scale-95 cursor-pointer"
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

        {/* Playbook Mode Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none overscroll-contain touch-pan-x">
          <button
            onClick={() => setCadenceMode('standard')}
            className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center ${
              cadenceMode === 'standard'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Standard Cadence (No Link till Call)
          </button>
          <button
            onClick={() => setCadenceMode('viky-yes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              cadenceMode === 'viky-yes'
                ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Viky: Has Website (YES)
          </button>
          <button
            onClick={() => setCadenceMode('viky-no')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              cadenceMode === 'viky-no'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Viky: No Website (NO)
          </button>
          <button
            onClick={() => setCadenceMode('on-call')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              cadenceMode === 'on-call'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            On-Call: 3 Care Questions
          </button>
          <button
            onClick={() => setCadenceMode('call-booked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              cadenceMode === 'call-booked'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Call Booked: Send Prototype
          </button>
        </div>

        {/* ── MODE 1: STANDARD 3-STEP (NO LINK TILL CALL BOOKED) ── */}
        {cadenceMode === 'standard' && (
          <div className="space-y-3">
            {/* 1-Touch Consolidated Direct Pitch */}
            <div className="p-4 rounded-xl bg-[#14141A] border border-emerald-500/25 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                    1-Touch Consolidated (Benevolent Authority · No Link Sent)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">Goal: 5-min Phone Call</span>
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
                  3-Step Sequential Conversation Cadence (Zero Links · Focus on Partner Reality):
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
                      <span className="text-xs font-bold text-white">Touch 3: Candid Call Invitation (Zero Link Sent)</span>
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
        )}

        {/* ── MODE 2: VIKY REFERRAL (IF THEY SEND WEBSITE LINK - YES) ── */}
        {cadenceMode === 'viky-yes' && (
          <div className="p-4 rounded-xl bg-[#14141A] border border-[#DAA640]/30 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-[#DAA640]/15 border border-[#DAA640]/30 text-[#DAA640] font-mono text-[10px] font-bold uppercase">
                  Viky Referral · Client Sent Website Link (YES)
                </span>
                <p className="text-[11px] text-zinc-400 mt-1">Candid, high-leverage response praising expertise & booking 5-min chat. Zero links sent.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyText('viky_yes', vikyYesWebsite)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'viky_yes' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedId === 'viky_yes' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleTriggerSendWhatsApp(vikyYesWebsite)}
                  className="px-3.5 py-1 rounded-lg bg-[#DAA640] hover:bg-[#E5B85C] text-black text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Send size={11} />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#070709] border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
              {vikyYesWebsite}
            </div>
          </div>
        )}

        {/* ── MODE 3: VIKY REFERRAL (IF THEY HAVE NO WEBSITE - NO) ── */}
        {cadenceMode === 'viky-no' && (
          <div className="p-4 rounded-xl bg-[#14141A] border border-amber-500/30 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase">
                  Viky Referral · Practice Has No Website (NO)
                </span>
                <p className="text-[11px] text-zinc-400 mt-1">Validates word-of-mouth success, cites MTD 7 Nov admin crunch, and books 10-min catch up.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyText('viky_no', vikyNoWebsite)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'viky_no' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedId === 'viky_no' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleTriggerSendWhatsApp(vikyNoWebsite)}
                  className="px-3.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Send size={11} />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#070709] border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
              {vikyNoWebsite}
            </div>
          </div>
        )}

        {/* ── MODE 4: ON-CALL 3 "GENUINE CARE" DIAGNOSTIC QUESTIONS ── */}
        {cadenceMode === 'on-call' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400 shrink-0" />
              <span><strong>Kevin Trudeau On-Call Rule:</strong> Do not pitch code or features. Ask these 3 questions to listen, diagnose, and anchor genuine advocacy.</span>
            </div>

            {onCallQuestions.map((q) => (
              <div key={q.num} className="rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1A20] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold flex items-center justify-center">
                      {q.num}
                    </span>
                    <span className="text-xs font-bold text-white">{q.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopyText(`q_${q.num}`, q.question)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                  >
                    {copiedId === `q_${q.num}` ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === `q_${q.num}` ? 'Copied Question' : 'Copy Question'}</span>
                  </button>
                </div>
                <div className="p-3.5 space-y-1.5 bg-[#070709]">
                  <p className="text-xs font-semibold text-zinc-100 font-sans leading-relaxed">
                    &ldquo;{q.question}&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500">
                    Why ask: {q.intent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MODE 5: CALL BOOKED PROTOTYPE DELIVERY ── */}
        {cadenceMode === 'call-booked' && (
          <div className="p-4 rounded-xl bg-[#14141A] border border-blue-500/30 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold uppercase">
                  Call Booked · Send Prototype Walkthrough
                </span>
                <p className="text-[11px] text-zinc-400 mt-1">Send ONLY after the partner agrees to the catch-up. Locks posture and excitement.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyText('call_booked', callBookedPrototypeDelivery)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'call_booked' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedId === 'call_booked' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleTriggerSendWhatsApp(callBookedPrototypeDelivery)}
                  className="px-3.5 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Send size={11} />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#070709] border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
              {callBookedPrototypeDelivery}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
