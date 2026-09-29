'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ExternalLink,
  Crown,
  Activity,
  Target,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { AdminAlertBanner } from '@/components/admin/alert-banner'
import { AdminKpiRow } from '@/components/admin/kpi-row'
import { TodayScheduleStrip } from '@/components/admin/today-schedule-strip'
import { TodayOutreachStrip } from '@/components/admin/today-outreach-strip'
import { RevenueThermometer } from '@/components/admin/revenue-thermometer'
import { OutreachAreaChart } from '@/components/admin/charts/outreach-area-chart'
import { OutreachFunnelChart } from '@/components/admin/charts/outreach-funnel-chart'
import { ClientHealthGrid } from '@/components/admin/client-health-grid'
import { AttentionPanel } from '@/components/admin/attention-panel'
import { TransactionsFeed } from '@/components/admin/transactions-feed'
import { ActivityLogPanel } from '@/components/admin/activity-log-panel'
import { WealthVisionModal } from '@/components/admin/wealth-vision-modal'
import { WealthVisionTab } from '@/components/admin/wealth-vision-tab'

interface CommandCenterCockpitProps {
  hasAlerts: boolean
  totalUnreadMessages: number
  totalSubmittedActionRequests: number
  coldLeadsCount: number
  imminentSessionCount: number
  totalSales: number
  totalPipeline: number
  projectedMRR: number
  leadsCount: number | null
  projectsCount: number | null
  sessionsCount: number | null
  kpiFinancials: any[]
  safePayments: any[]
  safeTodaySessions: any[]
  priorityOutreachLeads: any[]
  activeRetainersCount: number
  targetMRR: number
  funnelStages: any[]
  clientHealthData: any[]
  totalContractValue: number
  recentLogs: any[]
}

export function CommandCenterCockpit(props: CommandCenterCockpitProps) {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'vision'>('telemetry')
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false)

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* ── Top Header with Tab Switcher & Vision Trigger ─────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Command Center
            </h1>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#DAA640]/10 text-[#DAA640] border border-[#DAA640]/20">
              Live Operations
            </span>
          </div>
          <p className="text-sm text-zinc-400">
            Live pipeline telemetry, transactional logs, and £10k → £100k target affirmations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
          {/* Quick Vision Modal Opener */}
          <button
            onClick={() => setIsVisionModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-bold rounded-xl bg-gradient-to-r from-[#DAA640]/20 to-amber-500/10 hover:from-[#DAA640]/30 hover:to-amber-500/20 text-[#DAA640] border border-[#DAA640]/40 transition-all cursor-pointer shadow-sm shadow-[#DAA640]/10"
          >
            <Crown size={14} className="text-[#DAA640]" />
            <span>£10k → £100k Modal</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-[40px] text-xs font-bold rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-all cursor-pointer"
          >
            View Public Site <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* ── Top Command Center Tabs (Telemetry vs Vision Cockpit) ─────────────── */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/[0.03] border border-white/5">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-2 min-h-[40px] rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-[#18181D] text-white border border-white/10 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Activity size={14} className={activeTab === 'telemetry' ? 'text-emerald-400' : ''} />
            <span>Telemetry & Operations</span>
          </button>

          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 min-h-[40px] rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'vision'
                ? 'bg-gradient-to-r from-[#211B0E] to-[#171410] text-yellow-300 border border-[#DAA640]/50 shadow-sm shadow-[#DAA640]/15'
                : 'text-[#DAA640] hover:text-yellow-200 hover:bg-[#DAA640]/10'
            }`}
          >
            <Crown size={14} className="text-yellow-400" />
            <span>👑 £10,000 → £100,000 Vision & Affirmations</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-zinc-400 hidden md:flex items-center gap-3">
          <span>Realized Pipeline: <strong className="text-white font-mono">£{props.totalPipeline}</strong> (Sell Your Stamps UK)</span>
          <span>•</span>
          <span>Target: <strong className="text-[#DAA640] font-mono">£{props.targetMRR.toLocaleString('en-GB')}/mo</strong></span>
        </div>
      </div>

      {/* ── Tab Content Rendering ────────────────────────────────────────────── */}
      {activeTab === 'vision' ? (
        <WealthVisionTab
          realizedPipeline={props.totalPipeline}
          realizedRevenue={props.totalSales}
        />
      ) : (
        <>
          {/* Alert Banner */}
          {props.hasAlerts && (
            <AdminAlertBanner
              unreadMessagesCount={props.totalUnreadMessages}
              pendingApprovalsCount={props.totalSubmittedActionRequests}
              coldLeadsCount={props.coldLeadsCount}
              imminentSessionCount={props.imminentSessionCount}
            />
          )}

          {/* KPI Row (Clicking Monthly MRR triggers Wealth Vision Modal) */}
          <AdminKpiRow
            totalSales={props.totalSales}
            totalPipeline={props.totalPipeline}
            projectedMRR={props.projectedMRR}
            leadsCount={props.leadsCount}
            projectsCount={props.projectsCount}
            sessionsCount={props.sessionsCount}
            projectsFinancials={props.kpiFinancials}
            recentPayments={props.safePayments}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
          />

          {/* Today's Schedule Strip */}
          <TodayScheduleStrip sessions={props.safeTodaySessions} />

          {/* Today's Priority Outreach Sprint */}
          <TodayOutreachStrip leads={props.priorityOutreachLeads} />

          {/* Revenue Goal Thermometer & Live Service Health (Dynamic 28th step target) */}
          <RevenueThermometer
            totalCollected={props.totalSales}
            projectedMRR={props.projectedMRR}
            targetMRR={props.targetMRR}
            activeRetainersCount={props.activeRetainersCount}
            realizedPipeline={props.totalPipeline}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
          />

          {/* Outreach Telemetry Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <OutreachAreaChart />
            </div>
            <div className="lg:col-span-5">
              <OutreachFunnelChart stages={props.funnelStages} />
            </div>
          </div>

          {/* Main Operations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <ClientHealthGrid clients={props.clientHealthData} maxItems={3} showViewAll />
            </div>
            <div>
              <AttentionPanel
                unreadMessagesCount={props.totalUnreadMessages}
                pendingApprovalsCount={props.totalSubmittedActionRequests}
                coldLeadsCount={props.coldLeadsCount}
                todaySessionCount={props.safeTodaySessions.length}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <TransactionsFeed
                payments={props.safePayments}
                totalCollected={props.totalSales}
                totalContractValue={props.totalContractValue}
              />
            </div>
          </div>

          {/* Activity Log */}
          <ActivityLogPanel initialLogs={props.recentLogs} />
        </>
      )}

      {/* ── Standalone Wealth Vision & Affirmation Modal ────────────────────── */}
      <WealthVisionModal
        isOpen={isVisionModalOpen}
        onClose={() => setIsVisionModalOpen(false)}
        realizedPipeline={props.totalPipeline}
        realizedRevenue={props.totalSales}
      />
    </div>
  )
}
