'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Phone, MessageSquare, Mail, Globe, ExternalLink,
  Star, MapPin, MoreHorizontal, Archive, Trash2, Zap,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { usePlaybookEngine } from '@/hooks/use-playbook-engine'
import { OverviewTab } from '@/components/admin/lead-workspace/overview-tab'
import { OutreachTab } from '@/components/admin/lead-workspace/outreach-tab'
import { ActivityTab } from '@/components/admin/lead-workspace/activity-tab'
import { IntelligenceTab } from '@/components/admin/lead-workspace/intelligence-tab'

type LeadStatus = 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent' | 'Won' | 'Lost'

const STATUS_DOT: Record<string, string> = {
  New: 'bg-blue-400',
  Contacted: 'bg-amber-400',
  'Call Booked': 'bg-purple-400',
  'Proposal Sent': 'bg-orange-400',
  Won: 'bg-emerald-400',
  Lost: 'bg-rose-500',
}

const PIPELINE_STAGES = [
  { id: 'New', label: 'Hook' },
  { id: 'Contacted', label: 'Qualify' },
  { id: 'Call Booked', label: 'Prototype' },
  { id: 'Proposal Sent', label: 'Pricing' },
  { id: 'Won', label: 'Won' },
]

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'activity', label: 'Activity' },
] as const

type TabId = (typeof TABS)[number]['id']

interface Lead {
  id: string
  name: string
  business_name?: string
  email?: string
  phone?: string
  website?: string
  service_interested?: string
  status: string
  source?: string
  notes?: string
  created_at: string
  updated_at?: string
  is_archived?: boolean
  local_business_niche?: string
  outreach_category?: string
  outreach_stage?: string
  whatsapp_direct_url?: string
  prototype_url?: string
  scraped_metadata?: Record<string, unknown>
  audit_status?: 'none' | 'queued' | 'running' | 'complete' | 'failed'
  last_audited_at?: string
  top_friction?: string
  friction_count?: number
}

interface StrategySession {
  id: string
  scheduled_at: string
  status: string
  notes?: string
}

interface ActivityEvent {
  id: string
  type: string
  details: Record<string, unknown>
  created_at: string
  action_type?: string
}

interface Props {
  lead: Lead
  sessions: StrategySession[]
  activities: ActivityEvent[]
}

export function LeadWorkspaceClient({ lead: initialLead, sessions, activities }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const [lead, setLead] = useState<Lead>(initialLead)
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const engine = usePlaybookEngine(lead)
  const {
    businessName, hasWebsite, isMobile, protoUrl,
    rating, reviewsCount, address,
  } = engine

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleUpdateStatus = useCallback(async (status: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', lead.id)
    if (error) {
      showToast('Failed to update status', 'error')
    } else {
      setLead((prev) => ({ ...prev, status }))
      showToast(`Status → ${status}`)
    }
  }, [lead.id, supabase, showToast])

  const handleArchive = useCallback(async () => {
    const { error } = await supabase
      .from('leads')
      .update({ is_archived: !lead.is_archived, updated_at: new Date().toISOString() })
      .eq('id', lead.id)
    if (!error) {
      setLead((prev) => ({ ...prev, is_archived: !prev.is_archived }))
      showToast(lead.is_archived ? 'Lead restored' : 'Lead archived')
    }
  }, [lead.id, lead.is_archived, supabase, showToast])

  const handleDelete = useCallback(async () => {
    if (!window.confirm(`Delete ${businessName}? This cannot be undone.`)) return
    const { error } = await supabase.from('leads').delete().eq('id', lead.id)
    if (!error) {
      router.push('/admin/leads')
    } else {
      showToast('Failed to delete lead', 'error')
    }
  }, [lead.id, businessName, supabase, router, showToast])

  const handleEmailSave = useCallback(async (newEmail: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ email: newEmail, updated_at: new Date().toISOString() })
      .eq('id', lead.id)
    if (!error) {
      setLead((prev) => ({ ...prev, email: newEmail }))
      showToast('Email address saved!')
    } else {
      showToast('Failed to save email', 'error')
    }
  }, [lead.id, supabase, showToast])

  const handleOutcomeRecorded = useCallback(async (outcome: string, notes: string) => {
    const { data: userData } = await supabase.auth.getUser()
    const { error } = await supabase.from('activity_logs').insert({
      user_id: userData.user?.id,
      action_type: 'call_outcome',
      target_table: 'leads',
      target_id: lead.id,
      details: { outcome, notes },
    })
    if (!error) showToast('Outcome recorded')
  }, [lead.id, supabase, showToast])

  const rawWebsite = (lead.website || '').trim()
  const currentStageIndex = PIPELINE_STAGES.findIndex((s) => s.id === lead.status)

  // Normalise activity_logs: map action_type → type for ActivityTab
  const normalisedActivities = activities.map((a) => ({
    ...a,
    type: a.type || a.action_type || 'unknown',
  }))

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === 'error'
              ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ─────────────────── COMPACT STICKY HEADER (z-10) ─────────────────── */}
      <div className="sticky top-0 z-10 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 shadow-sm">
        <div className="max-w-3xl mx-auto px-3 sm:px-6">

          {/* Compact Single Bar: Back + Identity + Actions + Overflow */}
          <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-2.5">
            <Link
              href="/admin/leads"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all shrink-0"
              title="Back to Leads"
            >
              <ArrowLeft size={14} />
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-bold text-sm sm:text-base text-white truncate leading-tight">
                  {businessName}
                </h1>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                  hasWebsite ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {hasWebsite ? 'Site' : 'No site'}
                </span>
              </div>
              <div className="flex items-center gap-x-2 text-[10px] text-zinc-400 mt-0.5 truncate">
                {reviewsCount > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    <Star size={9} className="fill-amber-400" /> {rating} ({reviewsCount})
                  </span>
                )}
                {address && address !== 'UK Regional' && (
                  <span className="flex items-center gap-0.5 text-zinc-500 truncate">
                    <MapPin size={8} className="text-zinc-600 shrink-0" />
                    {address.split(',')[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions (Compact) */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {lead.phone && (
                <button
                  onClick={() => engine.handleWhatsApp()}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-[11px] font-bold transition-all cursor-pointer shadow-sm"
                  title="Open WhatsApp"
                >
                  <MessageSquare size={11} /> <span className="hidden sm:inline">WhatsApp</span>
                </button>
              )}
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-medium transition-all"
                  title="Direct Call"
                >
                  <Phone size={10} /> <span>Call</span>
                </a>
              )}
              {hasWebsite && rawWebsite && (
                <a
                  href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-medium transition-all"
                  title="Visit Website"
                >
                  <Globe size={10} /> <span>Site</span>
                </a>
              )}
              {protoUrl && (
                <a
                  href={protoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-[#DAA640]/15 hover:bg-[#DAA640]/25 border border-[#DAA640]/20 text-[#DAA640] text-[11px] font-medium transition-all"
                  title="View Prototype"
                >
                  <Zap size={10} /> <span>Demo</span>
                </a>
              )}
            </div>

            {/* Status badge (Compact) */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#141417] border border-white/10 shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[lead.status] || 'bg-zinc-400'}`} />
              <span className="text-[11px] font-medium text-zinc-300 hidden sm:inline">{lead.status}</span>
            </div>

            {/* Overflow menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer shrink-0">
                  <MoreHorizontal size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-[#141417] border border-white/10 text-zinc-300 z-50">
                <div className="px-3 py-2 border-b border-white/5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Update status</p>
                </div>
                {(['New', 'Contacted', 'Call Booked', 'Proposal Sent', 'Won', 'Lost'] as LeadStatus[]).map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleUpdateStatus(s)}
                    className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[s]}`} />
                    {s}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem
                  onClick={handleArchive}
                  className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                >
                  <Archive size={12} className="text-zinc-400" />
                  {lead.is_archived ? 'Restore lead' : 'Archive lead'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="cursor-pointer text-xs flex items-center gap-2 text-rose-400 focus:bg-rose-500/10 focus:text-rose-300"
                >
                  <Trash2 size={12} />
                  Delete lead
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Slim Tab bar */}
          <div className="flex border-t border-white/5 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-2 sm:py-2.5 px-3 sm:px-4 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? 'text-white border-[#DAA640]'
                    : 'text-zinc-500 hover:text-zinc-300 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────── SCROLLABLE BODY CONTENT ─────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-4">
        
        {/* Pipeline Stage Progress (Scrolls naturally, never blocks view) */}
        <div className="p-3 rounded-xl bg-[#0F0F13] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
            <span>Pipeline Progression</span>
            <span className="text-[#DAA640] font-bold">Stage: {lead.status}</span>
          </div>
          <div className="flex items-stretch gap-1 overflow-x-auto scrollbar-none">
            {PIPELINE_STAGES.map((stage, index) => {
              const isCompleted = index < currentStageIndex
              const isCurrent = index === currentStageIndex
              return (
                <button
                  key={stage.id}
                  onClick={() => handleUpdateStatus(stage.id)}
                  title={`Set status to ${stage.id}`}
                  className={`flex-1 min-w-[50px] flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#DAA640]/10 border border-[#DAA640]/30'
                      : isCompleted
                      ? 'hover:bg-white/5'
                      : 'hover:bg-white/3'
                  }`}
                >
                  <div
                    className={`h-1 w-full rounded-full transition-all ${
                      isCompleted || isCurrent ? 'bg-[#DAA640]' : 'bg-white/10'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider whitespace-nowrap ${
                      isCurrent
                        ? 'text-[#DAA640] font-bold'
                        : isCompleted
                        ? 'text-zinc-300'
                        : 'text-zinc-600'
                    }`}
                  >
                    {stage.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        {activeTab === 'overview' && (
          <OverviewTab
            lead={lead}
            engine={engine}
            onGoToOutreach={() => setActiveTab('outreach')}
          />
        )}

        {activeTab === 'outreach' && (
          <OutreachTab
            lead={lead}
            engine={engine}
            onOutcomeRecorded={handleOutcomeRecorded}
            onStatusUpdate={handleUpdateStatus}
            onEmailSave={handleEmailSave}
          />
        )}

        {activeTab === 'intelligence' && (
          <IntelligenceTab
            leadId={lead.id}
            hasWebsite={hasWebsite}
            websiteUrl={rawWebsite || undefined}
            businessName={businessName}
            auditStatus={lead.audit_status || 'none'}
            leadEmail={lead.email}
            onEmailUpdated={handleEmailSave}
          />
        )}

        {activeTab === 'activity' && (
          <ActivityTab
            leadId={lead.id}
            leadName={businessName}
            leadCreatedAt={lead.created_at}
            activities={normalisedActivities}
            sessions={sessions}
          />
        )}
      </div>
    </div>
  )
}
