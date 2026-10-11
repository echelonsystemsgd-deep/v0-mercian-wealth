'use client'

import { useState } from 'react'
import { Copy, Check, Send, MessageSquare, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react'
import { getDateAwareDeadlineHook } from '@/lib/auditor/deterministic'

export interface WhatsAppTemplate {
  id: string
  title: string
  category: 'opener' | 'followup' | 'closing'
  stepNumber: string
  timing: string
  description: string
  getText: (practiceName: string, prototypeUrl?: string) => string
}

export const ACCOUNTANTS_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'opener_a',
    title: 'Opener A: Mobile Layout Issue',
    category: 'opener',
    stepNumber: '01',
    timing: 'Day 1 (Send First)',
    description: 'Pinch-and-scroll or layout friction on phone.',
    getText: (practiceName: string) =>
      `Hi 👋 We were looking through ${practiceName}'s site on a phone and noticed the mobile layout requires pinch-and-scroll to read your service packages. We put together a quick 30-second mobile concept showing how prospective business clients can review your fees and book a call in 3 taps. Open to taking a quick look? If you'd rather not hear from us, just say stop.`,
  },
  {
    id: 'opener_b',
    title: 'Opener B: Slow 4G Loading',
    category: 'opener',
    stepNumber: '01',
    timing: 'Day 1 (Send First)',
    description: 'Noticeable load delay on 4G cellular data.',
    getText: (practiceName: string) =>
      `Hi 👋 We ran a quick test on ${practiceName}'s site and noticed the mobile load takes several seconds on a 4G connection. We put together a lightweight concept showing how a fast-loading intake page captures enquiries before visitors bounce. Open to taking a 30-second look on your phone? If you'd rather not hear from us, just say stop.`,
  },
  {
    id: 'opener_c',
    title: 'Opener C: No Clear Next Step',
    category: 'opener',
    stepNumber: '01',
    timing: 'Day 1 (Send First)',
    description: 'No out-of-hours booking link or clear CTA.',
    getText: (practiceName: string) =>
      `Hi 👋 We came across ${practiceName} and noticed there's no direct booking link or clear next step for out-of-hours enquiries. We put together a 30-second concept showing how after-hours clients can confirm a discovery slot directly on your calendar. Open to taking a quick look? If you'd rather not hear from us, just say stop.`,
  },
  {
    id: 'opener_d',
    title: 'Opener D: No Response Promise',
    category: 'opener',
    stepNumber: '01',
    timing: 'Day 1 (Send First)',
    description: 'Contact form lacks timeframe or triage commitment.',
    getText: (practiceName: string) =>
      `Hi 👋 When prospective Ltd Co directors contact ${practiceName} through the contact form, there is no indication of when they will hear back. We put together a concept showing how instant enquiry triage confirms their enquiry in under 3 minutes. Open to taking a 30-second look? If you'd rather not hear from us, just say stop.`,
  },
  {
    id: 'opener_e',
    title: 'Opener E: Trust Gaps on Mobile',
    category: 'opener',
    stepNumber: '01',
    timing: 'Day 1 (Send First)',
    description: 'Key accreditations or onboarding details not highlighted on phone.',
    getText: (practiceName: string) =>
      `Hi 👋 We came across ${practiceName} and noticed key accreditations and client onboarding information aren't highlighted on mobile. We built a 30-second concept showing how clear trust signals and a streamlined enquiry flow help convert more visitors into clients. Open to taking a look? If you'd rather not hear from us, just say stop.`,
  },
  {
    id: 'followup_1',
    title: 'Follow-up 1: Date-Aware Deadline Hook',
    category: 'followup',
    stepNumber: '02',
    timing: 'Day 3 (If no reply)',
    description: 'References dynamic statutory deadline window.',
    getText: (practiceName: string) => {
      const hook = getDateAwareDeadlineHook()
      return `Hi, following up briefly on our message regarding ${practiceName}. With ${hook.hookName} approaching, practices are looking closely at how they handle inbound enquiries. Just wanted to see if taking a quick 30-second look at the mobile concept is of interest? If you'd rather not hear from us, just say stop.`
    },
  },
  {
    id: 'followup_2',
    title: 'Follow-up 2: Respectful Close',
    category: 'followup',
    stepNumber: '03',
    timing: 'Day 7 (Final Touch)',
    description: 'Respectfully closes the loop without pressure.',
    getText: (practiceName: string) =>
      `Hi, last message from us on this. If streamlining client intake isn't a focus for ${practiceName} right now, that is completely fine. Wishing you and the team a productive quarter. If you'd rather not hear from us, just say stop.`,
  },
  {
    id: 'after_yes',
    title: 'Deliver Preview: After They Say Yes',
    category: 'closing',
    stepNumber: '04',
    timing: 'Immediately after affirmative reply',
    description: 'Delivers the interactive sandbox concept.',
    getText: (practiceName: string, prototypeUrl?: string) => {
      const url = prototypeUrl || `https://mercianwealth.com/practices#practice-visualizer?firm=${encodeURIComponent(practiceName)}`
      return `Thanks for getting back to us! Here is the interactive sandbox concept: ${url} — you can click through on your phone to see how prospective clients qualify themselves and hold a call. Let us know what you think.`
    },
  },
  {
    id: 'book_call',
    title: 'Bridge to Walkthrough: Book the Call',
    category: 'closing',
    stepNumber: '05',
    timing: 'After preview engagement',
    description: 'Bridges to a 15-minute walkthrough.',
    getText: () =>
      `Glad you had a chance to look. We can jump on a short 15-minute walkthrough to review your current site and show you how this layers onto your practice with zero disruption to Xero or IRIS. Would later this week work for a quick call?`,
  },
]

interface AccountantsTemplateLibraryProps {
  practiceName: string
  phone?: string | null
  prototypeUrl?: string | null
  onSendWhatsApp: (text: string) => void
}

export function AccountantsTemplateLibrary({
  practiceName,
  phone,
  prototypeUrl,
  onSendWhatsApp,
}: AccountantsTemplateLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'opener' | 'followup' | 'closing'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTemplates = ACCOUNTANTS_WHATSAPP_TEMPLATES.filter((tpl) =>
    selectedCategory === 'all' ? true : tpl.category === selectedCategory
  )

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="space-y-4">
      {/* Category selector */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-[#141417] p-1 rounded-xl border border-white/5">
          {[
            { id: 'all', label: 'All 9 Templates' },
            { id: 'opener', label: 'Openers (A–E)' },
            { id: 'followup', label: 'Follow-ups (Day 3 & 7)' },
            { id: 'closing', label: 'Preview & Book Call' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#DAA640] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
          <ShieldCheck size={13} />
          <span>Includes mandatory opt-out clause</span>
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-3">
        {filteredTemplates.map((tpl) => {
          const messageText = tpl.getText(practiceName, prototypeUrl || undefined)
          const isCopied = copiedId === tpl.id

          return (
            <div
              key={tpl.id}
              className="rounded-2xl bg-[#0B0B0D] border border-white/10 overflow-hidden shadow-lg hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#121217] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-[#DAA640] border border-white/10">
                    {tpl.stepNumber}
                  </span>
                  <span className="text-xs font-bold text-white font-sans">{tpl.title}</span>
                  <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">({tpl.timing})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(tpl.id, messageText)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
                  >
                    {isCopied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => onSendWhatsApp(messageText)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#DAA640] hover:bg-[#C4932C] text-black text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Send size={11} />
                    <span>Send</span>
                  </button>
                </div>
              </div>

              <div className="px-4 py-1.5 bg-[#17171E] border-b border-white/5 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <ArrowRight size={11} className="text-[#DAA640] shrink-0" />
                <span>{tpl.description}</span>
              </div>

              <div className="p-4 font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap bg-[#070709]">
                {messageText}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
