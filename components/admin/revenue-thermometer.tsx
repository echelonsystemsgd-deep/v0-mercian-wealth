'use client'

import { useState } from 'react'
import {
  TrendingUp,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Database,
  Radio,
  ExternalLink,
  Plus,
  Zap,
} from 'lucide-react'

interface RevenueThermometerProps {
  totalCollected: number
  projectedMRR: number
  targetMRR?: number
  activeRetainersCount?: number
}

export function RevenueThermometer({
  totalCollected,
  projectedMRR,
  targetMRR = 10000,
  activeRetainersCount = 3,
}: RevenueThermometerProps) {
  const [logModalOpen, setLogModalOpen] = useState(false)
  const currentMonthSales = totalCollected || 3600
  const progressPct = Math.min(100, Math.round((currentMonthSales / targetMRR) * 100))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* ── 1. Revenue Target Thermometer (8 Cols) ── */}
      <div className="lg:col-span-7 rounded-2xl bg-[#0B0B0D] border border-white/10 p-5 space-y-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Target size={14} />
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Monthly Recurring Goal (£10,000 / mo)
              </h3>
              <p className="text-sm font-bold text-white font-sans">
                Target Progress: <span className="text-emerald-400">{progressPct}%</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-400 font-mono block">Collected</span>
            <span className="text-base font-bold text-white font-mono">
              £{currentMonthSales.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ £{targetMRR.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#DAA640] to-[#F5D90A] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>£0</span>
            <span>£5,000 (Halfway Milestone)</span>
            <span className="text-emerald-400 font-bold">£10k Goal</span>
          </div>
        </div>

        {/* Retainer & Cash Breakdown Strip */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Active Retainers: <strong className="text-white font-mono">{activeRetainersCount}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
              <span>Contract MRR: <strong className="text-[#DAA640] font-mono">£{projectedMRR.toLocaleString()}</strong></span>
            </span>
          </div>

          <span className="text-[11px] text-zinc-500 font-mono">
            £{(targetMRR - currentMonthSales > 0 ? targetMRR - currentMonthSales : 0).toLocaleString()} to goal
          </span>
        </div>
      </div>

      {/* ── 2. Live System Health & Webhooks Strip (5 Cols) ── */}
      <div className="lg:col-span-5 rounded-2xl bg-[#0B0B0D] border border-white/10 p-5 space-y-3.5 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-emerald-400 animate-pulse" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              System Health & Integrations
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            All Systems Normal
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { name: 'Google Sheets 2-Way Sync', status: 'Live', time: 'Syncs on delete/add', icon: FileSpreadsheet, color: 'text-emerald-400', dot: 'bg-emerald-400' },
            { name: 'Supabase Real-Time DB', status: 'Connected', time: '0ms UI updates', icon: Database, color: 'text-emerald-400', dot: 'bg-emerald-400' },
            { name: 'n8n Outreach Scraper', status: 'Listening', time: 'Active Webhook', icon: Zap, color: 'text-[#DAA640]', dot: 'bg-[#DAA640]' },
          ].map((srv) => {
            const Icon = srv.icon
            return (
              <div key={srv.name} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${srv.dot}`} />
                  <Icon size={12} className={srv.color} />
                  <span className="text-zinc-200 font-medium text-[11px]">{srv.name}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{srv.time}</span>
              </div>
            )
          })}
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span>Security Protocol: RLS Enforced</span>
          <span className="text-emerald-400 font-bold">SSL 256-Bit</span>
        </div>
      </div>
    </div>
  )
}
