import Link from 'next/link'
import { AlertTriangle, MessageSquare, CheckSquare, Clock, Zap } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

interface AdminAlertBannerProps {
  unreadMessagesCount: number
  pendingApprovalsCount: number
  coldLeadsCount: number
  imminentSessionCount: number
}

// ── Component ──────────────────────────────────────────────────────────────────

export function AdminAlertBanner({
  unreadMessagesCount,
  pendingApprovalsCount,
  coldLeadsCount,
  imminentSessionCount,
}: AdminAlertBannerProps) {
  // Determine highest-priority alert
  let alertMessage: string | null = null
  let alertLink = '/admin'
  let alertIcon = <AlertTriangle size={14} className="text-gold shrink-0" />

  if (unreadMessagesCount > 0) {
    alertMessage = `${unreadMessagesCount} unread client message${unreadMessagesCount > 1 ? 's' : ''} awaiting your response`
    alertLink = '/admin/messages'
    alertIcon = <MessageSquare size={14} className="text-gold shrink-0" />
  } else if (pendingApprovalsCount > 0) {
    alertMessage = `${pendingApprovalsCount} client submission${pendingApprovalsCount > 1 ? 's' : ''} awaiting your review`
    alertLink = '/admin/projects'
    alertIcon = <CheckSquare size={14} className="text-gold shrink-0" />
  } else if (coldLeadsCount > 0) {
    alertMessage = `${coldLeadsCount} new lead${coldLeadsCount > 1 ? 's' : ''} cold for 48+ hours — action required`
    alertLink = '/admin/leads?status=New'
    alertIcon = <AlertTriangle size={14} className="text-gold shrink-0" />
  } else if (imminentSessionCount > 0) {
    alertMessage = `${imminentSessionCount} strategy session${imminentSessionCount > 1 ? 's' : ''} starting within the hour`
    alertLink = '/admin/bookings'
    alertIcon = <Clock size={14} className="text-gold shrink-0" />
  }

  if (!alertMessage) return null

  return (
    <div className="card-depth p-4 flex items-center gap-3 animate-in slide-in-from-top-1 duration-300">
      {/* 6px Semantic Status Dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />

      <div className="flex items-center gap-2 flex-1 min-w-0">
        {alertIcon}
        <p className="text-xs text-white font-medium truncate">{alertMessage}</p>
      </div>

      <Link
        href={alertLink}
        className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#DAA640] hover:text-[#DAA640]/80 transition-colors"
      >
        <Zap size={12} />
        <span>Resolve</span>
      </Link>
    </div>
  )
}
