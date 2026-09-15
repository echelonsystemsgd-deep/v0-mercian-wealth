'use client'

import Link from 'next/link'
import { CalendarClock, Clock, ArrowRight } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Session = {
  id: string
  scheduled_at: string
  leads: { name: string } | null
}

interface TodayScheduleStripProps {
  sessions: Session[]
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

// ── Component ──────────────────────────────────────────────────────────────────

export function TodayScheduleStrip({ sessions }: TodayScheduleStripProps) {
  return (
    <section className="p-4 sm:p-5 card-depth space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <CalendarClock size={16} className="text-[#DAA640] shrink-0" />
          <h2 className="text-sm font-sans font-bold text-white">
            Today&apos;s Booked Calls
          </h2>
        </div>
        {sessions.length > 0 && (
          <span className="text-xs font-mono text-zinc-400">
            {sessions.length} Scheduled
          </span>
        )}
      </div>

      {/* Content */}
      {sessions.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-xs text-zinc-500">No calls scheduled for today.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between gap-3 group relative overflow-hidden"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#DAA640] font-mono text-[10px] font-semibold">
                  <Clock size={11} />
                  <span>{formatTime(session.scheduled_at)}</span>
                </div>
                <h3 className="text-xs font-bold text-white mt-1 truncate group-hover:text-[#DAA640] transition-colors">
                  {session.leads?.name || 'Client Briefing'}
                </h3>
                <p className="text-[10px] text-zinc-400">Strategy Consultation Call</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Briefing Room
                </span>
                <Link
                  href="/admin/bookings"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#DAA640] hover:text-[#DAA640]/80 transition-colors group/link"
                >
                  <span>Join Call</span>
                  <ArrowRight size={12} className="transform group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
