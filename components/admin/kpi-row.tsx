'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import {
  PoundSterling,
  Sparkles,
  Users,
  FolderKanban,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  TrendingUp,
  Loader2,
  Plus,
  ExternalLink,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

type ProjectFinancial = {
  id: string
  project_name: string
  client_name: string
  status: string
  amount_paid: number | null
  contract_value: number | null
  contract_type: string | null
  retainer_amount: number | null
  one_time_fee: number | null
  rev_share_percentage: number | null
}

type Payment = {
  id: string
  amount: number | null
  notes: string | null
  status: string | null
  created_at: string
  projects: { project_name: string } | null
}

interface AdminKpiRowProps {
  totalSales: number
  totalPipeline: number
  projectedMRR: number
  leadsCount: number | null
  projectsCount: number | null
  sessionsCount: number | null
  projectsFinancials: ProjectFinancial[] | null
  recentPayments: Payment[] | null
}

// ── Component ──────────────────────────────────────────────────────────────────

export function AdminKpiRow({
  totalSales,
  totalPipeline,
  projectedMRR,
  leadsCount,
  projectsCount,
  sessionsCount,
  projectsFinancials,
  recentPayments,
}: AdminKpiRowProps) {
  const [expandedPanel, setExpandedPanel] = useState<'sales' | 'pipeline' | null>(null)
  const [activeModal, setActiveModal] = useState<'leads' | 'projects' | 'bookings' | 'mrr' | null>(null)
  const [modalData, setModalData] = useState<any[]>([])
  const [modalLoading, setModalLoading] = useState(false)

  const handleOpenPreviewModal = async (type: 'leads' | 'projects' | 'bookings' | 'mrr') => {
    setActiveModal(type)
    setModalLoading(true)
    setModalData([])
    
    try {
      const supabase = createClient()
      if (type === 'leads') {
        const { data } = await supabase
          .from('leads')
          .select('id, name, business_name, email, created_at, status')
          .eq('is_archived', false)
          .order('created_at', { ascending: false })
          .limit(3)
        setModalData(data || [])
      } else if (type === 'projects') {
        const { data } = await supabase
          .from('projects')
          .select('id, project_name, client_name, status, contract_value')
          .eq('is_archived', false)
          .order('created_at', { ascending: false })
          .limit(3)
        setModalData(data || [])
      } else if (type === 'bookings') {
        const { data } = await supabase
          .from('strategy_sessions')
          .select('id, scheduled_at, status, leads(name, business_name)')
          .eq('status', 'Scheduled')
          .order('scheduled_at', { ascending: true })
          .limit(3)
        
        const formatted = (data || []).map((s: any) => ({
          id: s.id,
          scheduled_at: s.scheduled_at,
          status: s.status,
          client_name: s.leads?.name || 'Partner',
          business_name: s.leads?.business_name || 'Direct Mandate'
        }))
        setModalData(formatted)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setModalLoading(false)
    }
  }

  const togglePanel = (panel: 'sales' | 'pipeline') => {
    setExpandedPanel((prev) => (prev === panel ? null : panel))
  }

  return (
    <section className="space-y-4">
      {/* Motion Stats Grid (Rexora / Obsidian Standard) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Revenue Realized */}
        <button
          onClick={() => togglePanel('sales')}
          className={`card-depth p-4 sm:p-5 flex flex-col justify-between gap-3 text-left cursor-pointer min-h-[125px] relative group ${
            expandedPanel === 'sales' ? 'card-depth-active' : ''
          }`}
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 truncate">
              Revenue Realized
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 ml-1 text-emerald-400 group-hover:scale-105 transition-transform">
              <PoundSterling size={14} />
            </div>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate">
              £{totalSales.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Collected Funds</span>
            </div>
          </div>
        </button>

        {/* Pipeline Value */}
        <button
          onClick={() => togglePanel('pipeline')}
          className={`card-depth p-4 sm:p-5 flex flex-col justify-between gap-3 text-left cursor-pointer min-h-[125px] relative group ${
            expandedPanel === 'pipeline' ? 'card-depth-active' : ''
          }`}
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 truncate">
              Pipeline Value
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/20 flex items-center justify-center shrink-0 ml-1 text-[#DAA640] group-hover:scale-105 transition-transform">
              <FolderKanban size={14} />
            </div>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate">
              £{totalPipeline.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#DAA640]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
              <span>Contracted Deal Volume</span>
            </div>
          </div>
        </button>

        {/* Inbound Leads */}
        <button
          onClick={() => handleOpenPreviewModal('leads')}
          className="card-depth p-4 sm:p-5 flex flex-col justify-between gap-3 text-left cursor-pointer min-h-[125px] relative group"
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 truncate">
              Inbound Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ml-1 text-zinc-300 group-hover:scale-105 transition-transform">
              <Users size={14} />
            </div>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate">
              {leadsCount ?? 0}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Active Database</span>
            </div>
          </div>
        </button>

        {/* Active Projects */}
        <button
          onClick={() => handleOpenPreviewModal('projects')}
          className="card-depth p-4 sm:p-5 flex flex-col justify-between gap-3 text-left cursor-pointer min-h-[125px] relative group"
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 truncate">
              Active Builds
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 ml-1 text-emerald-400 group-hover:scale-105 transition-transform">
              <TrendingUp size={14} />
            </div>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate">
              {projectsCount ?? 0}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>In Production</span>
            </div>
          </div>
        </button>

        {/* Booked Audits */}
        <button
          onClick={() => handleOpenPreviewModal('bookings')}
          className="card-depth p-4 sm:p-5 flex flex-col justify-between gap-3 text-left cursor-pointer min-h-[125px] relative group"
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 truncate">
              Booked Calls
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 ml-1 text-amber-400 group-hover:scale-105 transition-transform">
              <Calendar size={14} />
            </div>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate">
              {sessionsCount ?? 0}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Strategy Sessions</span>
            </div>
          </div>
        </button>

        {/* Monthly Retainers */}
        <button
          onClick={() => handleOpenPreviewModal('mrr')}
          className="card-depth p-4 sm:p-5 flex flex-col justify-between gap-3 text-left cursor-pointer min-h-[125px] relative group"
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 truncate">
              Monthly MRR
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/20 flex items-center justify-center shrink-0 ml-1 text-[#DAA640] group-hover:scale-105 transition-transform">
              <Sparkles size={14} />
            </div>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-sans font-bold text-[#DAA640] tracking-tight truncate">
              £{projectedMRR.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#DAA640]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
              <span>Recurring Retainers</span>
            </div>
          </div>
        </button>
      </div>

      {/* Inline Expand Panels */}
      <AnimatePresence>
        {expandedPanel === 'sales' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="card-depth p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Revenue Realized Ledger</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Direct client payments logged across active mandates.</p>
              </div>
              <button
                onClick={() => setExpandedPanel(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {recentPayments && recentPayments.length > 0 ? (
                recentPayments.map((payment) => (
                  <div key={payment.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {payment.projects?.project_name || 'Custom Mandate'}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {payment.notes || 'Milestone payment'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-mono font-bold text-emerald-400">
                        +£{Number(payment.amount || 0).toLocaleString('en-GB')}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {new Date(payment.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-zinc-400">
                  No direct transactions recorded.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {expandedPanel === 'pipeline' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="card-depth p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Active Projects Pipeline Breakdown</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Committed contract values, realised amounts, and balance due.</p>
              </div>
              <button
                onClick={() => setExpandedPanel(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-white/[0.01]">
                    <th className="py-3 px-3">Project</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Contract</th>
                    <th className="py-3 px-3">Paid</th>
                    <th className="py-3 px-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projectsFinancials && projectsFinancials.length > 0 ? (
                    projectsFinancials.map((p) => {
                      const hasEnrolled = !!p.contract_type
                      const projectedValue = hasEnrolled && Number(p.contract_value) > 0
                        ? Number(p.contract_value)
                        : (Number(p.one_time_fee) || 0)
                      const balance = projectedValue - (Number(p.amount_paid) || 0)

                      return (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-3 font-semibold text-white">{p.project_name}</td>
                          <td className="py-3 px-3 text-zinc-400">{p.client_name}</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-zinc-400 font-mono">
                            {p.contract_type === 'retainer' ? (
                              <span>£{(Number(p.contract_value) || 0).toLocaleString('en-GB')}/mo</span>
                            ) : p.contract_type === 'one_time' ? (
                              <span>£{(Number(p.contract_value) || 0).toLocaleString('en-GB')}</span>
                            ) : p.contract_type === 'rev_share' ? (
                              <span>{p.rev_share_percentage}% rev-share</span>
                            ) : (
                              <span>£{(Number(p.one_time_fee) || 0).toLocaleString('en-GB')}</span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-mono text-zinc-400">
                            £{(Number(p.amount_paid) || 0).toLocaleString('en-GB')}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="font-mono font-bold text-[#DAA640]">
                              £{balance.toLocaleString('en-GB')}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-400 text-xs">
                        No active mandates in pipeline.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/5">
              <Link
                href="/admin/projects"
                className="text-xs text-[#DAA640] hover:text-[#c49535] transition-colors font-semibold flex items-center gap-1"
              >
                <span>View All Projects</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Metric Cards Detail Preview Modal ───────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg card-depth p-6 relative flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-white">
                    {activeModal === 'leads'
                      ? 'Inbound Leads Telemetry'
                      : activeModal === 'projects'
                      ? 'Active Projects Summary'
                      : activeModal === 'bookings'
                      ? 'Scheduled Audit Briefings'
                      : 'MRR Growth Target'}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {activeModal === 'leads'
                      ? 'Recent marketing and direct pipeline inquiries.'
                      : activeModal === 'projects'
                      ? 'Active client development mandates.'
                      : activeModal === 'bookings'
                      ? 'Upcoming strategy consultation calls.'
                      : 'Retainer recurring revenue progress.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto py-5 space-y-4">
                {modalLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-[#DAA640]" size={24} />
                    <p className="text-xs text-zinc-400 font-mono">Syncing telemetry data...</p>
                  </div>
                ) : activeModal === 'mrr' ? (
                  (() => {
                    const currentMRR = modalData.reduce((sum, p) => sum + (Number(p.retainer_amount) || 0), 0)
                    const targetMRR = 10000
                    const percentage = Math.min(Math.round((currentMRR / targetMRR) * 100), 100)
                    return (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-[#141417] border border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs font-semibold text-white">
                            <span>£10,000/mo Retainer Target</span>
                            <span className="text-[#DAA640] font-mono">{percentage}% Achieved</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full bg-[#DAA640] transition-all duration-500 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                            <span>Current: £{currentMRR.toLocaleString('en-GB')}</span>
                            <span>Remaining: £{Math.max(targetMRR - currentMRR, 0).toLocaleString('en-GB')}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">Retainer Clients</span>
                          {modalData.length === 0 ? (
                            <div className="py-8 text-center text-xs text-zinc-500 bg-[#141417] border border-white/5 rounded-xl">
                              No active projects on monthly retainers.
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                              {modalData.map((item) => (
                                <div key={item.id} className="p-3.5 rounded-xl border border-white/10 bg-[#141417] flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-semibold text-white truncate">{item.project_name}</h4>
                                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">Client: {item.client_name}</p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs font-mono font-bold text-[#DAA640]">£{Number(item.retainer_amount).toLocaleString('en-GB')}/mo</span>
                                    <Link
                                      href={`/admin/projects/${item.id}`}
                                      onClick={() => setActiveModal(null)}
                                      className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                                    >
                                      <ExternalLink size={13} />
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })()
                ) : modalData.length === 0 ? (
                  <div className="py-10 text-center text-xs text-zinc-500 bg-[#141417] border border-white/5 rounded-xl">
                    No active records found.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {modalData.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl border border-white/10 bg-[#141417] flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {activeModal === 'leads' ? item.name : activeModal === 'projects' ? item.project_name : item.client_name}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-300 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
                            {item.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                          <span className="truncate">
                            {activeModal === 'leads'
                              ? item.business_name || 'Direct Contact'
                              : activeModal === 'projects'
                              ? `Client: ${item.client_name}`
                              : item.business_name}
                          </span>
                          <span className="shrink-0 ml-2">
                            {activeModal === 'leads'
                              ? new Date(item.created_at).toLocaleDateString('en-GB')
                              : activeModal === 'projects'
                              ? `£${(item.contract_value || 0).toLocaleString('en-GB')}`
                              : new Date(item.scheduled_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl border border-white/10 hover:bg-white/5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer order-last sm:order-first"
                >
                  Close
                </button>
                
                <div className="flex flex-col sm:flex-row gap-2 flex-1 sm:justify-end">
                  <Link
                    href={
                      activeModal === 'leads'
                        ? '/admin/leads'
                        : activeModal === 'projects'
                        ? '/admin/projects'
                        : activeModal === 'bookings'
                        ? '/admin/bookings'
                        : '/admin/projects'
                    }
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{activeModal === 'mrr' ? 'Manage Retainers' : 'View Full Console'}</span>
                    <ExternalLink size={12} />
                  </Link>
                  
                  {activeModal === 'leads' && (
                    <Link
                      href="/admin/leads?create=true"
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#DAA640] text-black hover:bg-[#c49535] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Add Lead</span>
                    </Link>
                  )}
                  {activeModal === 'projects' && (
                    <Link
                      href="/admin/projects?create=true"
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#DAA640] text-black hover:bg-[#c49535] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>New Project</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
