'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, MessageSquare, Phone, Mail } from 'lucide-react'

interface OutreachMessageCardProps {
  channel: 'whatsapp' | 'call' | 'email'
  message: string
  subject?: string
  whyThisAngle?: string
  evidenceTags?: Array<{ type: 'observed' | 'inferred' | 'measured'; label: string }>
  onSend?: () => void
  sendLabel?: string
  compact?: boolean
}

const CHANNEL_ICON = {
  whatsapp: MessageSquare,
  call: Phone,
  email: Mail,
}

const CHANNEL_LABEL = {
  whatsapp: 'WhatsApp',
  call: 'Call Script',
  email: 'Email',
}

const EVIDENCE_COLOURS = {
  observed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inferred: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  measured: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

export function OutreachMessageCard({
  channel,
  message,
  subject,
  whyThisAngle,
  evidenceTags = [],
  onSend,
  sendLabel,
  compact = false,
}: OutreachMessageCardProps) {
  const [copied, setCopied] = useState(false)
  const Icon = CHANNEL_ICON[channel]

  const handleCopy = useCallback(async () => {
    const text = subject ? `Subject: ${subject}\n\n${message}` : message
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silent
    }
  }, [message, subject])

  return (
    <div className="rounded-2xl bg-[#0B0B0D] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-[#DAA640]" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            {CHANNEL_LABEL[channel]}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Subject line (email only) */}
      {subject && (
        <div className="px-4 py-2 border-b border-white/5 bg-[#141417]">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">Subject:</span>
          <span className="text-xs text-zinc-300">{subject}</span>
        </div>
      )}

      {/* Message body */}
      <div className={`px-4 ${compact ? 'py-3' : 'py-4'}`}>
        <pre className="font-sans text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
          {message}
        </pre>
      </div>

      {/* Footer: why this angle + evidence + send button */}
      {(whyThisAngle || evidenceTags.length > 0 || onSend) && (
        <div className="px-4 py-3 border-t border-white/5 space-y-2.5">
          {whyThisAngle && (
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              <span className="text-zinc-400 font-medium">Why this angle: </span>
              {whyThisAngle}
            </p>
          )}

          {evidenceTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {evidenceTags.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-medium ${EVIDENCE_COLOURS[tag.type]}`}
                >
                  <span className="font-mono uppercase text-[9px] opacity-70">{tag.type}</span>
                  <span>{tag.label}</span>
                </span>
              ))}
            </div>
          )}

          {onSend && (
            <button
              onClick={onSend}
              className="w-full py-2 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] text-black font-semibold text-xs transition-all cursor-pointer"
            >
              {sendLabel || `Open ${CHANNEL_LABEL[channel]}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
