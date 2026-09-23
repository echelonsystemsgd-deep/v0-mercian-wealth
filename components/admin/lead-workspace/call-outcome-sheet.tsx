'use client'

import { useState } from 'react'
import { CheckCircle2, X, PhoneOff, PhoneMissed, ThumbsDown, ThumbsUp, Clock } from 'lucide-react'

interface CallOutcomeSheetProps {
  leadId: string
  onOutcomeRecorded: (outcome: string, notes: string) => Promise<void>
  onDismiss: () => void
}

const OUTCOMES = [
  { id: 'interested', label: 'Interested', sublabel: 'Wants to see prototype or know more', icon: ThumbsUp, colour: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  { id: 'follow_up', label: 'Follow-up', sublabel: 'Good call, needs time to think', icon: Clock, colour: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
  { id: 'no_answer', label: 'No answer', sublabel: 'Phone rang, no response', icon: PhoneMissed, colour: 'border-white/10 bg-white/5 text-zinc-400' },
  { id: 'not_interested', label: 'Not interested', sublabel: 'Declined the conversation', icon: ThumbsDown, colour: 'border-rose-500/40 bg-rose-500/10 text-rose-300' },
  { id: 'wrong_number', label: 'Wrong number', sublabel: 'Number does not match business', icon: PhoneOff, colour: 'border-white/10 bg-white/5 text-zinc-400' },
]

export function CallOutcomeSheet({ leadId, onOutcomeRecorded, onDismiss }: CallOutcomeSheetProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    await onOutcomeRecorded(selected, notes)
    setSaving(false)
    onDismiss()
  }

  return (
    <div className="rounded-2xl bg-[#0B0B0D] border border-white/15 p-4 sm:p-5 space-y-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Record call outcome</h3>
          <p className="text-xs text-zinc-400 mt-0.5">What happened on the call?</p>
        </div>
        <button
          onClick={onDismiss}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Outcome grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {OUTCOMES.map((outcome) => {
          const Icon = outcome.icon
          const isSelected = selected === outcome.id
          return (
            <button
              key={outcome.id}
              onClick={() => setSelected(outcome.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? outcome.colour + ' ring-1 ring-inset ring-white/10'
                  : 'border-white/5 bg-white/3 hover:bg-white/8 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold leading-tight">{outcome.label}</p>
                <p className="text-[10px] text-zinc-500 leading-snug mt-0.5">{outcome.sublabel}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Optional notes */}
      <div className="space-y-1.5">
        <label className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. Call back Thursday, interested in Option 2..."
          rows={2}
          className="w-full px-3 py-2 rounded-xl bg-[#141417] border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-600 resize-none outline-none focus:border-[#DAA640]/50 transition-colors"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onDismiss}
          className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
        >
          Skip
        </button>
        <button
          onClick={handleSave}
          disabled={!selected || saving}
          className="flex-1 py-2 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          {saving ? (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
          ) : (
            <CheckCircle2 size={13} />
          )}
          {saving ? 'Saving...' : 'Record outcome'}
        </button>
      </div>
    </div>
  )
}
