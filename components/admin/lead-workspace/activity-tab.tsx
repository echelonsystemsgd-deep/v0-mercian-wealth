'use client'

import {
  UserPlus,
  Send,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Calendar,
  FileText,
  Star,
} from 'lucide-react'

function timeAgo(date: Date): string {
  const now = Date.now()
  const diff = now - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 2) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}


interface ActivityEvent {
  id: string
  type: string
  details: Record<string, unknown>
  created_at: string
}

interface StrategySession {
  id: string
  scheduled_at: string
  status: string
  notes?: string
}

interface ActivityTabProps {
  leadId: string
  leadName: string
  leadCreatedAt: string
  activities: ActivityEvent[]
  sessions: StrategySession[]
}

function getEventMeta(type: string, details: Record<string, unknown>) {
  switch (type) {
    case 'lead_created':
      return { label: 'Lead added to pipeline', Icon: UserPlus, colour: 'text-emerald-400', dot: 'bg-emerald-400' }
    case 'outreach_sent':
      return { label: `Outreach sent via ${details.channel || 'WhatsApp'}`, Icon: Send, colour: 'text-[#DAA640]', dot: 'bg-[#DAA640]' }
    case 'status_changed':
      return { label: `Status updated to ${details.new_status || details.status || ''}`, Icon: CheckCircle2, colour: 'text-blue-400', dot: 'bg-blue-400' }
    case 'lead_won':
      return { label: 'Lead marked Won', Icon: Star, colour: 'text-emerald-400', dot: 'bg-emerald-400' }
    case 'lead_lost':
      return { label: 'Lead marked Lost', Icon: XCircle, colour: 'text-rose-400', dot: 'bg-rose-400' }
    case 'call_outcome':
      return { label: `Call outcome: ${details.outcome || ''}`, Icon: PhoneCall, colour: 'text-purple-400', dot: 'bg-purple-400' }
    case 'note_added':
      return { label: 'Note added', Icon: FileText, colour: 'text-zinc-300', dot: 'bg-zinc-400' }
    default:
      return { label: type.replace(/_/g, ' '), Icon: FileText, colour: 'text-zinc-400', dot: 'bg-zinc-600' }
  }
}

export function ActivityTab({ leadId: _leadId, leadName, leadCreatedAt, activities, sessions }: ActivityTabProps) {
  // Build unified timeline from activities + sessions
  type TimelineItem = {
    id: string
    at: Date
    type: 'activity' | 'session'
    data: ActivityEvent | StrategySession
  }

  const timeline: TimelineItem[] = [
    // Lead creation event
    {
      id: 'created',
      at: new Date(leadCreatedAt),
      type: 'activity' as const,
      data: { id: 'created', type: 'lead_created', details: {}, created_at: leadCreatedAt },
    },
    ...activities.map((a) => ({ id: a.id, at: new Date(a.created_at), type: 'activity' as const, data: a })),
    ...sessions.map((s) => ({ id: s.id, at: new Date(s.scheduled_at), type: 'session' as const, data: s })),
  ].sort((a, b) => b.at.getTime() - a.at.getTime())

  if (timeline.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-[#141417] border border-white/5 flex items-center justify-center text-zinc-500">
          <FileText size={18} />
        </div>
        <p className="text-sm text-zinc-400">{leadName} was just added.</p>
        <p className="text-xs text-zinc-600">Activity will appear here as you interact with this lead.</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">Activity timeline</h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/5" />

        <div className="space-y-0">
          {timeline.map((item) => {
            if (item.type === 'activity') {
              const event = item.data as ActivityEvent
              const { label, Icon, colour, dot } = getEventMeta(event.type, event.details || {})
              const notes = (event.details as Record<string, string>)?.notes
              return (
                <div key={item.id} className="flex gap-4 py-3 relative">
                  <div className={`w-9 h-9 rounded-full border border-white/10 bg-[#141417] flex items-center justify-center shrink-0 z-10 relative`}>
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className={`text-xs font-medium ${colour}`}>{label}</span>
                      <span className="text-[10px] text-zinc-600 shrink-0" title={formatDateTime(item.at)}>
                        {timeAgo(item.at)}
                      </span>
                    </div>
                    {notes && (
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{notes}</p>
                    )}
                  </div>
                </div>
              )
            }

            // Strategy session
            const session = item.data as StrategySession
            return (
              <div key={item.id} className="flex gap-4 py-3 relative">
                <div className="w-9 h-9 rounded-full border border-white/10 bg-[#141417] flex items-center justify-center shrink-0 z-10 relative">
                  <Calendar size={14} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="text-xs font-medium text-purple-400">
                      Strategy session — {session.status}
                    </span>
                    <span className="text-[10px] text-zinc-600 shrink-0" title={formatDateTime(item.at)}>
                      {formatDateTime(item.at)}
                    </span>
                  </div>
                  {session.notes && (
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{session.notes}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
