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
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-400">All systems nominal — no immediate actions required.</p>
            </div>
          </div>
        ) : (
          <>
            {unreadMessagesCount > 0 && (
              <Link
                href="/admin/messages"
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-400/40 hover:bg-amber-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare size={11} className="text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {unreadMessagesCount} unread message{unreadMessagesCount > 1 ? 's' : ''}
                    </p>
                    <p className="text-[10px] text-slate-400">Client replies awaiting response</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-amber-400/60 group-hover:text-amber-400 shrink-0 transition-colors" />
              </Link>
            )}

            {pendingApprovalsCount > 0 && (
              <Link
                href="/admin/projects"
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckSquare size={11} className="text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {pendingApprovalsCount} pending sign-off{pendingApprovalsCount > 1 ? 's' : ''}
                    </p>
                    <p className="text-[10px] text-slate-400">Client submissions ready for review</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-emerald-400/60 group-hover:text-emerald-400 shrink-0 transition-colors" />
              </Link>
            )}

            {coldLeadsCount > 0 && (
              <Link
                href="/admin/leads?status=New"
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-400/40 hover:bg-red-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={11} className="text-red-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {coldLeadsCount} cold lead{coldLeadsCount > 1 ? 's' : ''} — 48h+
                    </p>
                    <p className="text-[10px] text-slate-400">Uncontacted for over 2 days</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-red-400/60 group-hover:text-red-400 shrink-0 transition-colors" />
              </Link>
            )}

            {todaySessionCount > 0 && (
              <Link
                href="/admin/bookings"
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Calendar size={11} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {todaySessionCount} discovery call{todaySessionCount > 1 ? 's' : ''} today
                    </p>
                    <p className="text-[10px] text-slate-400">Review your bookings</p>
                  </div>
                </div>
                <ArrowUpRight size={12} className="text-blue-400/60 group-hover:text-blue-400 shrink-0 transition-colors" />
              </Link>
            )}
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800 pt-3 space-y-1.5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 font-mono">
          Quick Actions
        </p>
        <Link
          href="/admin/projects?create=true&redirect=/admin"
          className="w-full py-2 px-3 rounded-xl bg-[#18181F] hover:bg-[#22222B] border border-slate-800 hover:border-[#DCAE53] text-xs font-semibold text-white hover:text-[#DCAE53] transition-all duration-200 flex items-center justify-between cursor-pointer"
        >
          <span>Deploy New Project</span> <ArrowUpRight size={12} />
        </Link>
        <Link
          href="/admin/leads?status=New"
          className="w-full py-2 px-3 rounded-xl bg-[#18181F] hover:bg-[#22222B] border border-slate-800 hover:border-[#DCAE53] text-xs font-semibold text-white hover:text-[#DCAE53] transition-all duration-200 flex items-center justify-between cursor-pointer"
        >
          <span>Review Inbound Leads</span> <ArrowUpRight size={12} />
        </Link>
        <Link
          href="/admin/bookings?schedule=true&redirect=/admin"
          className="w-full py-2 px-3 rounded-xl bg-[#18181F] hover:bg-[#22222B] border border-slate-800 hover:border-[#DCAE53] text-xs font-semibold text-white hover:text-[#DCAE53] transition-all duration-200 flex items-center justify-between cursor-pointer"
        >
          <span>Schedule Discovery Call</span> <ArrowUpRight size={12} />
        </Link>
      </div>
    </section>
  )
}
