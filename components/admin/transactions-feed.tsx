'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PoundSterling, X, Calendar, FileText } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Payment = {
  id: string
  amount: number | null
  notes: string | null
  status: string | null
  created_at: string
  projects: { project_name: string } | null
}

interface TransactionsFeedProps {
  payments: Payment[]
  totalCollected: number
  totalContractValue: number
}

// ── Component ──────────────────────────────────────────────────────────────────

export function TransactionsFeed({
  payments,
  totalCollected,
  totalContractValue,
}: TransactionsFeedProps) {
  const [showModal, setShowModal] = useState(false)
  const collectionRate =
    totalContractValue > 0
      ? Math.round((totalCollected / totalContractValue) * 100)
      : 0

  const displayPayments = payments.slice(0, 3)

  return (
    <section className="p-4 sm:p-5 card-depth space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-sans font-bold text-white flex items-center gap-2">
          <PoundSterling size={15} className="text-[#DAA640]" />
          <span>Recent Sales</span>
        </h2>
        <span className="text-[11px] font-mono text-zinc-500">Live Ledger</span>
      </div>

      <div className="divide-y divide-white/5">
        {displayPayments.length > 0 ? (
          displayPayments.map((payment) => (
            <div
              key={payment.id}
              className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0 transition-colors hover:bg-white/[0.01]"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {payment.projects?.project_name || 'Custom Mandate'}
                </p>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                  {payment.notes || 'Milestone payment'}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  {new Date(payment.created_at).toLocaleDateString('en-GB')}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  +£{Number(payment.amount).toLocaleString('en-GB')}
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">
                  {payment.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center px-4">
            <p className="text-xs text-zinc-500 leading-relaxed">
              No transactions recorded yet. Revenue logs populate as project milestones are completed.
            </p>
          </div>
        )}
      </div>

      {/* Collection Rate Bar */}
      {totalContractValue > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>
              £{totalCollected.toLocaleString('en-GB')} / £{totalContractValue.toLocaleString('en-GB')}
            </span>
            <span className="font-bold text-white">{collectionRate}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DAA640] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(collectionRate, 100)}%` }}
            />
          </div>
        </div>
      )}

      {payments.length > 0 && (
        <div className="flex justify-end pt-1">
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-semibold text-[#DAA640] hover:text-[#c49535] transition-colors cursor-pointer bg-transparent border-none outline-none py-1"
          >
            View All Transactions →
          </button>
        </div>
      )}

      {/* ── All Transactions Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl card-depth p-6 relative flex flex-col max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <PoundSterling size={16} className="text-[#DAA640]" />
                  <h3 className="text-base font-serif font-bold text-white">
                    Transactions Ledger
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                >
                  <X size={16} />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-2.5">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-3.5 rounded-xl border border-white/10 bg-[#141417] flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-xs font-semibold text-white truncate">
                        {payment.projects?.project_name || 'Custom Mandate'}
                      </p>
                      {payment.notes && (
                        <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 truncate">
                          <FileText size={11} className="text-zinc-500 shrink-0" />
                          <span>{payment.notes}</span>
                        </p>
                      )}
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1.5 font-mono">
                        <Calendar size={10} className="shrink-0" />
                        <span>{new Date(payment.created_at).toLocaleDateString('en-GB')} at {new Date(payment.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        +£{Number(payment.amount).toLocaleString('en-GB')}
                      </span>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-4 flex justify-end shrink-0">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Ledger
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
