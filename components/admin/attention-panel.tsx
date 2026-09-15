import Link from 'next/link'
import {
  MessageSquare,
  CheckSquare,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

interface AttentionPanelProps {
  unreadMessagesCount: number
  pendingApprovalsCount: number
  coldLeadsCount: number
  todaySessionCount: number
}

// ── Component ──────────────────────────────────────────────────────────────────

export function AttentionPanel({
  unreadMessagesCount,
  pendingApprovalsCount,
  coldLeadsCount,
  todaySessionCount,
}: AttentionPanelProps) {
  const hasItems =
    unreadMessagesCount > 0 ||
    pendingApprovalsCount > 0 ||
    coldLeadsCount > 0 ||
    todaySessionCount > 0

  return (
    <section className="p-4 sm:p-5 card-depth space-y-4">
      <h2 className="text-base font-sans font-bold text-white">Attention Needed</h2>

      {/* Dynamic rows */}
      <div className="space-y-2">
        {!hasItems ? (
          /* All clear state */
          <div className="flex items-center gap-3 py-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <p className="text-xs text-zinc-400">All systems nominal — no immediate actions required.</p>
            </div>
          </div>
        ) : (
          <>
            {unreadMessagesCount > 0 && (
              <Link
                href="/admin/messages"
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-400/40 hover:bg-amber-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare size={11} className="text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {unreadMessagesCount} unread message{unreadMessagesCount > 1 ? 's' : ''}
                    </p>
                    <p className="text-[10px] text-zinc-400">Client replies awaiting response</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-amber-400/60 group-hover:text-amber-400 shrink-0 transition-colors" />
              </Link>
            )}

            {pendingApprovalsCount > 0 && (
              <Link
                href="/admin/projects"
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckSquare size={11} className="text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {pendingApprovalsCount} pending sign-off{pendingApprovalsCount > 1 ? 's' : ''}
                    </p>
                    <p className="text-[10px] text-zinc-400">Client submissions ready for review</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-emerald-400/60 group-hover:text-emerald-400 shrink-0 transition-colors" />
              </Link>
            )}

            {coldLeadsCount > 0 && (
              <Link
                href="/admin/leads?status=New"
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-rose-500/5 border border-rose-500/20 hover:border-rose-400/40 hover:bg-rose-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={11} className="text-rose-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {coldLeadsCount} cold lead{coldLeadsCount > 1 ? 's' : ''} — 48h+
                    </p>
                    <p className="text-[10px] text-zinc-400">Uncontacted for over 2 days</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-rose-400/60 group-hover:text-rose-400 shrink-0 transition-colors" />
              </Link>
            )}

            {todaySessionCount > 0 && (
              <Link
                href="/admin/bookings"
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#DAA640]/5 border border-[#DAA640]/20 hover:border-[#DAA640]/40 hover:bg-[#DAA640]/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#DAA640]/10 flex items-center justify-center shrink-0">
                    <Calendar size={11} className="text-[#DAA640]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {todaySessionCount} discovery call{todaySessionCount > 1 ? 's' : ''} today
                    </p>
                    <p className="text-[10px] text-zinc-400">Review your bookings</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-[#DAA640]/60 group-hover:text-[#DAA640] shrink-0 transition-colors" />
              </Link>
            )}
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 pt-3 space-y-2">
        <p className="text-xs font-semibold text-white">
          Quick Actions
        </p>
        <Link
          href="/admin/projects?create=true&redirect=/admin"
          className="w-full py-2 px-3 rounded-xl bg-[#141417] hover:bg-[#1A1A20] border border-white/10 hover:border-[#DAA640] text-xs font-semibold text-white hover:text-[#DAA640] transition-all duration-200 flex items-center justify-between cursor-pointer"
        >
          <span>Deploy New Project</span> <ArrowUpRight size={12} />
        </Link>
        <Link
          href="/admin/leads?status=New"
          className="w-full py-2 px-3 rounded-xl bg-[#141417] hover:bg-[#1A1A20] border border-white/10 hover:border-[#DAA640] text-xs font-semibold text-white hover:text-[#DAA640] transition-all duration-200 flex items-center justify-between cursor-pointer"
        >
          <span>Review Inbound Leads</span> <ArrowUpRight size={12} />
        </Link>
        <Link
          href="/admin/bookings?schedule=true&redirect=/admin"
          className="w-full py-2 px-3 rounded-xl bg-[#141417] hover:bg-[#1A1A20] border border-white/10 hover:border-[#DAA640] text-xs font-semibold text-white hover:text-[#DAA640] transition-all duration-200 flex items-center justify-between cursor-pointer"
        >
          <span>Schedule Discovery Call</span> <ArrowUpRight size={12} />
        </Link>
      </div>
    </section>
  )
}
