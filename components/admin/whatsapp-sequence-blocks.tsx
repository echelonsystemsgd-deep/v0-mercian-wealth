'use client'

import { useState } from 'react'
import { Copy, Check, Send, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react'
import type { WhatsApp3MessageSequence, WhatsAppMessageBlock } from '@/lib/auditor/types'

interface WhatsAppSequenceBlocksProps {
  sequence: WhatsApp3MessageSequence
  phone?: string | null
  onSendWhatsApp?: (text: string) => void
  showFullCopy?: boolean
  className?: string
}

const STEP_BADGES: Record<
  1 | 2 | 3,
  {
    whenLabel: string
    badgeClass: string
    sublabel: string
  }
> = {
  1: {
    whenLabel: 'Send first',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    sublabel: 'Conversational Hook · Never dump the pitch in message 1',
  },
  2: {
    whenLabel: 'Send after they reply',
    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    sublabel: '1 Specific Friction · Observable evidence · No offer yet',
  },
  3: {
    whenLabel: 'Send once engaged',
    badgeClass: 'bg-[#DAA640]/15 text-[#DAA640] border-[#DAA640]/30',
    sublabel: 'Cause & Effect + Free 30s Preview · Asks for micro-yes',
  },
}

export function WhatsAppSequenceBlocks({
  sequence,
  phone,
  onSendWhatsApp,
  showFullCopy = true,
  className = '',
}: WhatsAppSequenceBlocksProps) {
  const [copiedStep, setCopiedStep] = useState<number | 'all' | null>(null)

  const handleCopyText = async (text: string, stepId: number | 'all') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStep(stepId)
      setTimeout(() => setCopiedStep(null), 2000)
    } catch {
      // clipboard fallback
    }
  }

  const handleSend = (text: string) => {
    if (onSendWhatsApp) {
      onSendWhatsApp(text)
      return
    }
    const cleanDigits = (phone || '').replace(/[^0-9]/g, '')
    const targetPhone = cleanDigits.startsWith('07') ? `44${cleanDigits.slice(1)}` : cleanDigits
    const url = targetPhone
      ? `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const blocks: WhatsAppMessageBlock[] = [
    sequence.message1,
    sequence.message2,
    sequence.message3,
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Sequence Header Strip */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            3-Message WhatsApp Sequence
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            (Never pitch on touch 1 · Send sequentially)
          </span>
        </div>

        {showFullCopy && (
          <button
            onClick={() => handleCopyText(sequence.fullSequenceText, 'all')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            {copiedStep === 'all' ? (
              <Check size={12} className="text-emerald-400" />
            ) : (
              <Copy size={12} />
            )}
            <span>{copiedStep === 'all' ? 'All Copied' : 'Copy Full Sequence'}</span>
          </button>
        )}
      </div>

      {/* 3 Message Cards */}
      <div className="space-y-3">
        {blocks.map((block) => {
          const badgeInfo = STEP_BADGES[block.step]
          const isCopied = copiedStep === block.step

          return (
            <div
              key={block.step}
              className="rounded-2xl bg-[#0B0B0D] border border-white/10 overflow-hidden shadow-lg hover:border-white/20 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#121217] border-b border-white/5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-[#DAA640]" />
                    <span className="text-xs font-bold text-white font-sans">
                      {block.label}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${badgeInfo.badgeClass}`}
                  >
                    {badgeInfo.whenLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyText(block.text, block.step)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
                    title={`Copy ${block.label}`}
                  >
                    {isCopied ? (
                      <Check size={11} className="text-emerald-400" />
                    ) : (
                      <Copy size={11} />
                    )}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleSend(block.text)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#DAA640] hover:bg-[#C4932C] text-black text-xs font-bold transition-all cursor-pointer shadow-sm"
                    title={`Send ${block.label} on WhatsApp`}
                  >
                    <Send size={11} />
                    <span>Send</span>
                  </button>
                </div>
              </div>

              {/* Sublabel / Instruction */}
              <div className="px-4 py-1.5 bg-[#17171E] border-b border-white/5 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <ArrowRight size={11} className="text-[#DAA640] shrink-0" />
                <span>{badgeInfo.sublabel}</span>
              </div>

              {/* Message Content */}
              <div className="p-4 font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap bg-[#070709]">
                {block.text}
              </div>
            </div>
          )
        })}
      </div>

      {/* Educational methodology footer note */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#DAA640]" />
          <span>
            Strict Rule: Do not combine all 3 messages into 1 send. Send Msg 1 → wait for reply → Msg 2 → Msg 3.
          </span>
        </div>
        <span className="text-[#DAA640] font-bold shrink-0">3-Step Cadence</span>
      </div>
    </div>
  )
}
