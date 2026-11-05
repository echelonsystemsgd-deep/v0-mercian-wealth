'use client'

import React, { useState } from 'react'
import {
  AlertTriangle,
  Send,
  Copy,
  Check,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  MessageSquare
} from 'lucide-react'
import { classifyPhoneNumber } from '@/lib/phone-classifier'

export interface FrictionDossierLead {
  id: string
  name: string
  business_name?: string
  website?: string
  phone?: string
  email?: string
  notes?: string
  prototype_url?: string
  status?: string
  local_business_niche?: string
  scraped_metadata?: Record<string, any>
}

interface LeadFrictionDossierProps {
  lead: FrictionDossierLead
  intel?: any
  onSaveNotes?: (notes: string) => Promise<void>
  onSendWhatsApp?: (text: string) => void
}

export function LeadFrictionDossier({
  lead,
  intel,
  onSaveNotes,
  onSendWhatsApp
}: LeadFrictionDossierProps) {
  const metadata = (lead.scraped_metadata || {}) as Record<string, any>
  const businessName = lead.business_name || lead.name || 'Practice'
  const directorName = (lead.name && lead.name !== businessName && !lead.name.toLowerCase().includes('director') && !lead.name.toLowerCase().includes('owner'))
    ? lead.name.trim()
    : 'Partner'

  // Extract Section M verified friction
  const frictionTitle = intel?.frictionBadge || metadata.friction_title || 'Website Intake & Qualification Friction'
  const observableProblem = intel?.observableFriction || metadata.observable_problem || lead.notes?.split('\n')[0]?.replace(/^•\s*VERIFIED FLAW:\s*/i, '') || 'Zero interactive enquiry form on /contact/ — only an unformatted mailto link.'
  const commercialConsequence = intel?.consequenceMechanics || metadata.commercial_outcome || 'Decision-ready business owners bounce to faster-responding practices, and partners waste billable hours on manual email triage.'
  const prototypeRemedy = intel?.prototypeRemedy || metadata.concrete_fix || '60-second interactive practice scoper qualifying sole trader vs Ltd Co turnover with direct calendar sync.'
  const protoUrl = intel?.prototypeUrl || metadata.prototype_url || lead.prototype_url || `/preview/demo?name=${encodeURIComponent(businessName)}&trade=Chartered%20Accountants`

  const initialNotes = lead.notes || intel?.customNotes || ''
  const [notes, setNotes] = useState(initialNotes)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [copiedNotes, setCopiedNotes] = useState(false)
  const [savingNotes, setSavingNotes] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [cadenceMode, setCadenceMode] = useState<'day1' | 'day1-email' | 'day3' | 'day5' | 'discovery' | 'prototype'>('day1')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showFullCadence, setShowFullCadence] = useState(true)

  // ── SALES PROF SCRIPTS (WORD FOR WORD) ───────────────────────────────────
  const cleanFriction = observableProblem.replace(/^[^:]+:\s*/, '').trim()

  // 1. Day 1 Call & Voicemail (3-Phase Cold Call Architecture)
  const step1Permission = `“Hey ${directorName}, I was on the ${businessName} site earlier and noticed ${cleanFriction}. That’s exactly why I’m calling. Would it be totally crazy for a two minute chat to see if that’s even relevant on your end?”`
  const step2Diagnostic = `“Appreciate that. Basically, when new Ltd Co or sole trader enquiries land on your website out of hours, without structured triage they submit vague emails with missing turnover and records. Do your fee-earners spend a lot of time chasing prospects for missing details, or is intake pretty smooth on your side?”`
  const step3BridgeTo15Min = `“Makes total sense. Look, I promised to keep this to two minutes and I respect your time. What I've done on my end is put together a 60-second interactive scoper specifically for ${businessName} that pre-qualifies turnover and books directly into your calendar. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works? If it’s not for you, no hard feelings at all.”`
  const voicemailScript = `“Hi ${directorName}, it's Gurtej calling regarding the ${businessName} website. I noticed an issue on your contact page where ${cleanFriction}. I'm sending a quick 10-second screenshot to your email so you can see it directly. My number is 07851 055929. Speak soon.”`

  // 2. Day 1 Follow-Up Email & WhatsApp
  const emailSubject = `Quick observation on ${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.co.uk contact flow`
  const emailBody = `Hi ${directorName},\n\nI called your office a moment ago.\n\nI was looking at the ${businessName} website on mobile and noticed ${cleanFriction}.\n\nFor high-value business clients browsing after hours, that creates unnecessary friction before they can get a quote or book a call with your team.\n\nI put together a quick 60-second interactive scoper showing how other UK chartered firms qualify sole trader vs Ltd Co turnover upfront before booking directly into the partner calendar.\n\nWould it make sense to connect for 10-15 minutes next Tuesday or Wednesday at 10:30am? If not relevant, no problem at all—just let me know and I'll close your file.\n\nBest regards,\nGurtej Deep\nMercian Wealth | 07851 055929 | mercianwealth.com`
  const whatsAppMessage = `Hi ${directorName}, Gurtej here from Mercian Wealth. Left a brief voicemail at your office earlier regarding the ${businessName} website—noticed ${cleanFriction}. Just emailed you a quick observation on it. Let me know if you'd like to see the 60-second prototype scoper.`

  // 3. Day 3 Follow-Up 1 (The Value Check)
  const day3Email = `Hi ${directorName},\n\nJust checking if my previous note regarding the ${businessName} mobile contact flow made sense?\n\nNot trying to be a pest—I know you're busy running client accounts. Just wanted to see if reducing contact page drop-off is something you're looking to tighten up before the new tax year.\n\nDoes next Tuesday or Wednesday morning work for a quick 10-minute walk-through?\n\nBest,\nGurtej`

  // 4. Day 5 Follow-Up 2 (The Clean Takeaway / Breakup)
  const day5Email = `Hi ${directorName},\n\nHaven't heard back, so I assume addressing the mobile contact flow isn't a priority for ${businessName} right now.\n\nI'll close your file on my end so I don't clutter your inbox further. If things change down the road and you want to see how we automate intake and onboarding, feel free to reach back out.\n\nWishing you and the firm all the best,\nGurtej Deep`

  // 5. Sales Prof 15-Minute Discovery Protocol
  const discoveryQuestions = [
    {
      step: '0–2 Mins',
      title: 'Agenda & Low-Pressure Permission',
      script: `“Thanks for making time, ${directorName}. The goal for today is simple: I'll share the two friction points I noticed on your mobile intake, walk through the prototype fix, and if you think it makes sense for ${businessName}, we can discuss putting it live. If you don't think it's a fit, you can tell me directly and we'll leave it there. Does that sound fair?”`,
      goal: 'Establishes benevolent authority and removes all sales defense.'
    },
    {
      step: '2–10 Mins',
      title: 'Operational Diagnostic (Uncovering Pain)',
      script: `“Before I open the screen: When new enquiries come into ${businessName} right now, how much partner time gets eaten up fielding unqualified enquiries or chasing missing documents vs doing high-fee advisory work?”`,
      goal: 'Identifies the exact dollar/hour bleed of their current manual process.'
    },
    {
      step: '10–17 Mins',
      title: 'Prototype Walkthrough',
      script: `“Here's what we engineered for ${businessName}: An interactive 60-second scoper that qualifies whether they're a sole trader, partnership, or Ltd Co, captures their annual turnover, and books directly into your diary with their records attached.”`,
      goal: 'Shows tangible proof tailored specifically to their firm.'
    },
    {
      step: '17–20 Mins',
      title: 'Clean Direction & Close',
      script: `“Based on what you've seen, would it make sense to put this live on a 14-day trial so you can see how many qualified enquiries it captures?”`,
      goal: 'Secures commitment or identifies final hesitation cleanly.'
    }
  ]

  // Prototype Delivery
  const callBookedPrototypeDelivery = `Looking forward to our chat, ${directorName}! Ahead of our call, here is the private preview showing the 60-second intake scoper tailored for ${businessName}:\n${protoUrl}\n\nTake a quick look whenever you have a minute!`

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
      const clean = phoneInfo.cleanDigits
      window.open(`https://wa.me/${clean}?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  return (
    <div className="space-y-4">
      {/* ── SECTION M: FORENSIC FRICTION CARD ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-amber-500/30 space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              {frictionTitle}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck size={11} />
            Forensically Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">Observable Friction:</span>
            <p className="text-zinc-200 leading-relaxed font-medium">
              {observableProblem}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">Commercial Consequence:</span>
            <p className="text-zinc-300 leading-relaxed">
              {commercialConsequence}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/20 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#DAA640] font-bold block">Tailored Prototype Fix:</span>
            <p className="text-xs text-zinc-200 font-medium">{prototypeRemedy}</p>
          </div>
          <a
            href={protoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#DAA640] hover:bg-[#C4932C] text-black font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
          >
            <Sparkles size={12} />
            <span>Test Live Prototype</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* ── NOTES ACCORDION ── */}
      <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Audit Evidence & Practice Notes
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNotes}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedNotes ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copiedNotes ? 'Copied' : 'Copy Notes'}</span>
            </button>
            <button
              onClick={() => setIsEditingNotes(!isEditingNotes)}
              className="text-xs text-[#DAA640] hover:underline cursor-pointer"
            >
              {isEditingNotes ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        {isEditingNotes ? (
          <div className="space-y-2 pt-1">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-200 font-mono leading-relaxed focus:outline-none focus:border-[#DAA640]"
            />
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="px-3 py-1 rounded-lg bg-[#DAA640] text-black font-bold text-xs hover:bg-[#C4932C] transition-all cursor-pointer"
            >
              {savingNotes ? 'Saving...' : saveSuccess ? 'Saved ✓' : 'Save Notes'}
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
            {notes || 'No audit notes recorded yet.'}
          </div>
        )}
      </div>

      {/* ── MASTER SALES PROF PLAYBOOK CADENCE ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 flex-wrap gap-2">
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Sales Prof Master Outreach Cadence (No Gimmicks)
            </h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Strictly adherence to verified human friction, permission language, and clean 4-touch closing protocol.
            </p>
          </div>

          <button
            onClick={() => setShowFullCadence(!showFullCadence)}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
          >
            <span>{showFullCadence ? 'Collapse' : 'Expand'}</span>
            {showFullCadence ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {showFullCadence && (
          <div className="space-y-4">
            {/* Mode Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setCadenceMode('day1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  cadenceMode === 'day1'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                📞 Day 1: Call & VM
              </button>
              <button
                onClick={() => setCadenceMode('day1-email')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  cadenceMode === 'day1-email'
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                ✉️ Written Follow-Up
              </button>
              <button
                onClick={() => setCadenceMode('day3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  cadenceMode === 'day3'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                🔄 Day 3: Follow-Up 1
              </button>
              <button
                onClick={() => setCadenceMode('day5')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  cadenceMode === 'day5'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                🛑 Day 5: Breakup
              </button>
              <button
                onClick={() => setCadenceMode('discovery')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  cadenceMode === 'discovery'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                🎯 15-Min Discovery
              </button>
              <button
                onClick={() => setCadenceMode('prototype')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  cadenceMode === 'prototype'
                    ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                🚀 Prototype Link
              </button>
            </div>

            {/* ── CADENCE TAB 1: DAY 1 CALL & VOICEMAIL ── */}
            {cadenceMode === 'day1' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-[#141417] border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      DAY 1 CALL SCRIPT (WORD FOR WORD)
                    </span>
                    <button
                      onClick={() => handleCopyText('day1_call', `${step1Permission}\n\n[When they say go ahead]:\n${step2Diagnostic}\n\n[Bridge to 15-min demo]:\n${step3BridgeTo15Min}`)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 font-mono flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === 'day1_call' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      <span>{copiedId === 'day1_call' ? 'Copied' : 'Copy Script'}</span>
                    </button>
                  </div>
                  {/* Step 1: Permission */}
                  <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Step 1: Permission (15 Seconds)
                    </span>
                    <p className="text-xs text-zinc-200 italic leading-relaxed font-sans">
                      {step1Permission}
                    </p>
                  </div>

                  {/* Step 2: The 2-Minute Diagnostic */}
                  <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                      Step 2: When They Say "Go Ahead / What Is It?" (Use Your 2 Mins)
                    </span>
                    <p className="text-xs text-zinc-200 italic leading-relaxed font-sans">
                      {step2Diagnostic}
                    </p>
                  </div>

                  {/* Step 3: Respect The Limit & Bridge to 15 Mins */}
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Step 3: After They Answer (Respect The 2-Min Limit & Bridge)
                    </span>
                    <p className="text-xs text-zinc-200 italic leading-relaxed font-sans">
                      {step3BridgeTo15Min}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      IF VOICEMAIL: 20-SECOND DROP
                    </span>
                    <button
                      onClick={() => handleCopyText('vm', voicemailScript)}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-zinc-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'vm' ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                      <span>{copiedId === 'vm' ? 'Copied' : 'Copy VM'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 italic leading-relaxed bg-black/40 p-2.5 rounded-lg border border-white/5">
                    {voicemailScript}
                  </p>
                </div>
              </div>
            )}

            {/* ── CADENCE TAB 2: WRITTEN FOLLOW-UP EMAIL & WHATSAPP ── */}
            {cadenceMode === 'day1-email' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-[#141417] border border-sky-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                        DAY 1 FOLLOW-UP EMAIL (SEND IMMEDIATELY AFTER CALL/VM)
                      </span>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Subject: {emailSubject}</p>
                    </div>
                    <button
                      onClick={() => handleCopyText('email_full', `Subject: ${emailSubject}\n\n${emailBody}`)}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-mono text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === 'email_full' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      <span>{copiedId === 'email_full' ? 'Copied Email' : 'Copy Full Email'}</span>
                    </button>
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
                    {emailBody}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      WHATSAPP / SMS QUICK PING
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText('wa_msg', whatsAppMessage)}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-zinc-300 font-mono flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'wa_msg' ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                        <span>{copiedId === 'wa_msg' ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => handleTriggerSendWhatsApp(whatsAppMessage)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Send size={11} />
                        <span>Send WhatsApp</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 italic leading-relaxed bg-black/40 p-2.5 rounded-lg border border-white/5">
                    {whatsAppMessage}
                  </p>
                </div>
              </div>
            )}

            {/* ── CADENCE TAB 3: DAY 3 FOLLOW-UP 1 ── */}
            {cadenceMode === 'day3' && (
              <div className="p-4 rounded-xl bg-[#141417] border border-amber-500/30 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      DAY 3: THE HELPFUL CHECK-IN (NO SALES PESTER)
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Send 48 hours after voicemail/email if no reply.</p>
                  </div>
                  <button
                    onClick={() => handleCopyText('day3_email', day3Email)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'day3_email' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === 'day3_email' ? 'Copied' : 'Copy Script'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {day3Email}
                </div>
              </div>
            )}

            {/* ── CADENCE TAB 4: DAY 5 BREAKUP ── */}
            {cadenceMode === 'day5' && (
              <div className="p-4 rounded-xl bg-[#141417] border border-rose-500/30 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                      DAY 5: THE CLEAN TAKEAWAY / BREAKUP
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Releases pressure, locks posture, and triggers urgency in 20-30% of unresponsive leads.</p>
                  </div>
                  <button
                    onClick={() => handleCopyText('day5_email', day5Email)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-mono text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'day5_email' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === 'day5_email' ? 'Copied' : 'Copy Script'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {day5Email}
                </div>
              </div>
            )}

            {/* ── CADENCE TAB 5: 15-MINUTE DISCOVERY PROTOCOL ── */}
            {cadenceMode === 'discovery' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-400 shrink-0" />
                  <span><strong>Sales Prof Discovery Rule:</strong> Run the call in 4 structured blocks. You are the doctor diagnosing intake friction, not a vendor pitching software.</span>
                </div>

                {discoveryQuestions.map((q, idx) => (
                  <div key={idx} className="rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1A20] border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
                          {q.step}
                        </span>
                        <span className="text-xs font-bold text-white">{q.title}</span>
                      </div>
                      <button
                        onClick={() => handleCopyText(`disc_${idx}`, q.script)}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === `disc_${idx}` ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                        <span>{copiedId === `disc_${idx}` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="p-3 space-y-1 bg-black/40">
                      <p className="text-xs text-zinc-200 font-sans italic leading-relaxed">
                        {q.script}
                      </p>
                      <p className="text-[10px] font-mono text-zinc-500">
                        Objective: {q.goal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── CADENCE TAB 6: PROTOTYPE DELIVERY ── */}
            {cadenceMode === 'prototype' && (
              <div className="p-4 rounded-xl bg-[#141417] border border-[#DAA640]/30 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider">
                      PROTOTYPE DELIVERY (SEND ONLY ONCE CALL IS CONFIRMED)
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Locks excitement and gives them a 30-second taste before the Zoom/phone walk-through.</p>
                  </div>
                  <button
                    onClick={() => handleCopyText('proto_msg', callBookedPrototypeDelivery)}
                    className="px-2.5 py-1 rounded-lg bg-[#DAA640]/20 hover:bg-[#DAA640]/30 text-[#DAA640] font-mono text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'proto_msg' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedId === 'proto_msg' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {callBookedPrototypeDelivery}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
