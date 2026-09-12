'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Search,
  Filter,
  Plus,
  ChevronRight,
  Archive,
  X,
  Ban,
  Trash2,
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  LayoutGrid,
  List,
  Columns,
  Info,
  Sparkles,
  MessageSquare,
  Phone,
  Globe,
  Star,
  ExternalLink,
  Flame,
  Send,
  MapPin,
  Laptop,
  Check,
} from 'lucide-react'
import { useInspector } from '@/hooks/use-inspector'
import { OutreachModal, OutreachLead } from '@/components/admin/outreach-modal'
import { AntigravityPromptModal } from '@/components/admin/antigravity-prompt-modal'

export type Lead = OutreachLead

const STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Contacted: 'bg-amber-500/20 text-amber-300 border-amber-500/35 font-bold',
  'Call Booked': 'bg-purple-500/20 text-purple-300 border-purple-500/35 font-bold',
  'Proposal Sent': 'bg-orange-500/20 text-orange-300 border-orange-500/35 font-bold',
  Won: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 font-extrabold shadow-[0_0_12px_rgba(16,185,129,0.2)]',
  Lost: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  Spam: 'bg-red-500/10 text-red-400/70 border-red-500/20'
}

const ALL_STATUSES = ['New', 'Contacted', 'Call Booked', 'Proposal Sent', 'Won', 'Lost', 'Spam']

function getInitials(name: string): string {
  const clean = (name || '').replace(/[^a-zA-Z0-9\s]/g, '').trim()
  const parts = clean.split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return (clean || 'MW').slice(0, 2).toUpperCase()
}

export default function LeadsPage() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsOpen: setInspectorOpen } = useInspector()

  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [serviceFilter, setServiceFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'active' | 'archived' | 'spam'>('active')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [followupOnly, setFollowupOnly] = useState(false)
  const [wonDeal, setWonDeal] = useState<{ businessName: string } | null>(null)
  
  // Views: 'cards' (Deal Cards Grid), 'table' (Dense Table), 'kanban' (Pipeline Columns)
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'kanban'>('cards')

  // Pipeline counts
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({})

  // Dedicated Outreach Cockpit Modal State
  const [outreachLead, setOutreachLead] = useState<Lead | null>(null)
  const [isOutreachOpen, setIsOutreachOpen] = useState(false)

  // Dedicated Antigravity Prompt Modal State
  const [promptLead, setPromptLead] = useState<Lead | null>(null)
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  const handleOpenPrompt = (lead: Lead) => {
    setPromptLead(lead)
    setIsPromptOpen(true)
  }

  // Manual Lead creation modal states
  const [showNewModal, setShowNewModal] = useState(false)
  const [leadForm, setLeadForm] = useState({
    name: '',
    business_name: '',
    email: '',
    phone: '',
    website: '',
    service_interested: '',
    source: 'manual',
    status: 'New',
    notes: ''
  })
  const [savingLead, setSavingLead] = useState(false)

  const triggerToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleInspectLead = (leadId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('leadId', leadId)
    params.delete('projectId')
    params.delete('clientId')
    router.push(`${pathname}?${params.toString()}`)
    setInspectorOpen(true)
  }

  const handleOpenOutreach = (lead: Lead) => {
    setOutreachLead(lead)
    setIsOutreachOpen(true)
  }

  // Load distinct filters and total counts
  const loadFiltersAndCounts = useCallback(async () => {
    const { data: allActiveLeads } = await supabase
      .from('leads')
      .select('status, service_interested, source')
      .eq('is_archived', false)
      .neq('status', 'Spam')

    if (allActiveLeads) {
      const counts = allActiveLeads.reduce((acc: Record<string, number>, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1
        return acc
      }, {})
      setStatusCounts(counts)
    }
  }, [supabase])

  // OPTIMISTIC Status Update (0ms UI latency)
  const handleUpdateLeadStatus = async (id: string, status: string) => {
    const targetLead = leads.find(l => l.id === id)
    // 1. Instant local update
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (outreachLead?.id === id) {
      setOutreachLead(prev => prev ? { ...prev, status } : null)
    }

    // 2. Feedback message & Gamified Revenue Won Modal
    if (status === 'Won') {
      triggerToast('🟢 Deal marked as WON! Revenue & Retainer unlocked.')
      setWonDeal({ businessName: targetLead?.business_name || targetLead?.name || 'New Client' })
    } else if (status === 'Lost') {
      triggerToast('🔴 Lead marked as Lost.')
    } else if (status === 'Contacted') {
      triggerToast('🟡 Lead marked as Contacted.')
    } else {
      triggerToast(`Status updated to ${status}.`)
    }

    // 3. Background DB persistence
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
      if (error) throw error
      loadFiltersAndCounts()
    } catch (err: any) {
      triggerToast(`Update failed: ${err.message}`)
      fetchLeads()
    }
  }

  // Direct 1-Click WhatsApp action (Stage 1 Opener: Hi 👋 alone)
  const handleQuickWhatsApp = (lead: Lead) => {
    const phone = lead.phone || ''
    const cleanDigits = phone.replace(/[^0-9]/g, '')
    if (!cleanDigits) {
      triggerToast('No valid phone number for WhatsApp.')
      return
    }

    const ownerName = lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : ''
    const opener = ownerName ? `Hi ${ownerName} 👋` : 'Hi 👋'
    const url = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(opener)}`
    window.open(url, '_blank')

    if (lead.status === 'New') {
      handleUpdateLeadStatus(lead.id, 'Contacted')
    }
  }

  const handleDeleteLead = async (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id))
    triggerToast('Lead removed.')

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)
      if (error) throw error
      loadFiltersAndCounts()
    } catch (err: any) {
      triggerToast(`Deletion failed: ${err.message}`)
      fetchLeads()
    }
  }

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name || !leadForm.email) {
      triggerToast('Name and Email are required.')
      return
    }
    setSavingLead(true)
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: leadForm.name,
          business_name: leadForm.business_name || 'N/A',
          email: leadForm.email,
          phone: leadForm.phone || null,
          website: leadForm.website || null,
          service_interested: leadForm.service_interested || null,
          source: leadForm.source,
          status: leadForm.status,
          notes: leadForm.notes || null
        })

      if (error) throw error
      triggerToast('Lead created successfully.')
      setShowNewModal(false)
      fetchLeads()
    } catch (err: any) {
      triggerToast(`Creation failed: ${err.message}`)
    } finally {
      setSavingLead(false)
    }
  }

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('leads')
      .select('*')

    if (activeTab === 'active') {
      query = query.eq('is_archived', false).neq('status', 'Spam')
    } else if (activeTab === 'archived') {
      query = query.eq('is_archived', true).neq('status', 'Spam')
    } else if (activeTab === 'spam') {
      query = query.eq('status', 'Spam')
    }

    query = query.order('created_at', { ascending: false })

    if (statusFilter.length > 0 && activeTab !== 'spam') {
      query = query.in('status', statusFilter)
    }
    if (serviceFilter !== 'All') {
      query = query.eq('service_interested', serviceFilter)
    }
    if (sourceFilter !== 'All') {
      query = query.eq('source', sourceFilter)
    }
    if (search.trim()) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,business_name.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data, error } = await query
    if (error) {
      triggerToast(`Fetch error: ${error.message}`)
    } else {
      setLeads(data ?? [])
    }
    await loadFiltersAndCounts()
    setLoading(false)
  }, [activeTab, statusFilter, serviceFilter, sourceFilter, search, supabase, loadFiltersAndCounts])

  useEffect(() => {
    const statusParam = searchParams.get('status')
    if (statusParam) {
      setStatusFilter([statusParam])
      setShowFilters(true)
    }
  }, [searchParams])

  useEffect(() => {
    setSelectedIds([])
  }, [activeTab, search, statusFilter, serviceFilter, sourceFilter])

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 300)
    return () => clearTimeout(timer)
  }, [fetchLeads])

  const displayedLeads = useMemo(() => {
    if (followupOnly) {
      return leads.filter(l => l.status === 'Contacted')
    }
    return leads
  }, [leads, followupOnly])

  const toggleStatus = (s: string) =>
    setStatusFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(leads.map((l) => l.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((x) => x !== id))
    }
  }

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedIds.length === 0) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .in('id', selectedIds)

      if (error) throw error
      triggerToast(`Updated status to ${status} for ${selectedIds.length} leads.`)
      setSelectedIds([])
      fetchLeads()
    } catch (err: any) {
      triggerToast(`Update failed: ${err.message}`)
      setLoading(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Are you sure you want to permanently delete the ${selectedIds.length} selected leads?`)) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .in('id', selectedIds)

      if (error) throw error
      triggerToast(`Permanently deleted ${selectedIds.length} leads.`)
      setSelectedIds([])
      fetchLeads()
    } catch (err: any) {
      triggerToast(`Deletion failed: ${err.message}`)
      setLoading(false)
    }
  }

  // AMBIENT CARD STYLING HELPER
  const getCardBorderClass = (status: string) => {
    if (status === 'Won') {
      return 'border-emerald-500/50 bg-[#07130e]/80 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400'
    }
    if (status === 'Lost' || status === 'Spam') {
      return 'border-rose-500/35 bg-[#12080a]/60 shadow-[0_0_20px_rgba(244,63,94,0.08)] hover:border-rose-400 opacity-80'
    }
    if (status === 'Contacted') {
      return 'border-amber-500/40 bg-[#120f09]/70 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-400'
    }
    if (status === 'Call Booked' || status === 'Proposal Sent') {
      return 'border-purple-500/40 bg-[#100814]/70 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-purple-400'
    }
    return 'border-gold/15 bg-[#0b0f17]/90 shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:border-gold/35'
  }

  // AMBIENT TABLE ROW STYLING HELPER
  const getRowHighlightClass = (status: string, isChecked: boolean, isInspected: boolean) => {
    if (isInspected) {
      return 'bg-gold/[0.05] border-l-4 border-l-gold shadow-[inset_3px_0_0_rgba(212,175,55,1),0_0_20px_rgba(212,175,55,0.06)]'
    }
    if (isChecked) {
      return 'bg-gold/10 border-l-4 border-l-gold/60'
    }
    if (status === 'Won') {
      return 'bg-emerald-500/[0.09] hover:bg-emerald-500/[0.15] border-l-4 border-l-emerald-500 shadow-[inset_3px_0_0_rgba(16,185,129,0.8),0_0_16px_rgba(16,185,129,0.05)] transition-all'
    }
    if (status === 'Lost' || status === 'Spam') {
      return 'bg-rose-500/[0.06] hover:bg-rose-500/[0.12] border-l-4 border-l-rose-500/80 opacity-75 transition-all'
    }
    if (status === 'Contacted') {
      return 'bg-amber-500/[0.07] hover:bg-amber-500/[0.13] border-l-4 border-l-amber-500 transition-all'
    }
    if (status === 'Call Booked' || status === 'Proposal Sent') {
      return 'bg-purple-500/[0.07] hover:bg-purple-500/[0.13] border-l-4 border-l-purple-500 transition-all'
    }
    return 'hover:bg-white/[0.02] border-l-4 border-l-transparent transition-all'
  }

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-4 left-4 z-50 px-4 py-3 rounded-xl bg-black/90 border border-gold/40 text-sm font-semibold text-foreground shadow-[0_0_30px_rgba(0,0,0,0.9)] flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <CheckCircle2 size={16} className="text-gold" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-gold uppercase">
            <Sparkles size={12} /> High-Ticket Deal Flow Terminal
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">Lead Outreach Ledger</h1>
          <p className="text-sm text-muted-foreground">
            Execute 1-click WhatsApp outreach, build instant storefront prototypes, and hit £10k/month deal targets.
          </p>
        </div>
        <button
          onClick={() => {
            setLeadForm({ name: '', business_name: '', email: '', phone: '', website: '', service_interested: '', source: 'manual', status: 'New', notes: '' })
            setShowNewModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-gold to-gold-light text-background shadow-[0_0_16px_rgba(212,175,55,0.25)] hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-all cursor-pointer self-end sm:self-center"
        >
          <Plus size={14} /> Add Lead
        </button>
      </div>

      {/* Visual Pipeline Headers */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          { key: 'New', label: 'Fresh Leads', color: 'text-blue-400' },
          { key: 'Contacted', label: 'Contacted', color: 'text-amber-400' },
          { key: 'Call Booked', label: 'Call Booked', color: 'text-purple-400' },
          { key: 'Proposal Sent', label: 'Proposal Sent', color: 'text-orange-400' },
          { key: 'Won', label: 'Won / Closed', color: 'text-emerald-400 font-extrabold' },
          { key: 'Lost', label: 'Lost / Closed', color: 'text-rose-400' },
        ].map((item) => {
          const count = statusCounts[item.key] || 0
          const isSelected = statusFilter.includes(item.key)
          return (
            <div
              key={item.key}
              onClick={() => toggleStatus(item.key)}
              className={`p-4 glass rounded-2xl flex flex-col justify-between transition-all cursor-pointer border ${
                isSelected
                  ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'border-gold/10 hover:border-gold/25 hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {item.label}
              </span>
              <span className={`text-2xl font-serif font-bold mt-1.5 ${item.color}`}>
                {count}
              </span>
            </div>
          )
        })}
      </section>

      {/* Tabs Menu */}
      <div className="flex border-b border-gold/10 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'border-gold text-gold bg-gold/5'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Inbox size={14} /> Active Outreach Pipeline
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'archived'
              ? 'border-gold text-gold bg-gold/5'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Archive size={14} /> Archived
        </button>
        <button
          onClick={() => setActiveTab('spam')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'spam'
              ? 'border-gold text-gold bg-gold/5'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Ban size={14} /> Spam / Disqualified
        </button>
      </div>

      {/* Toolbar & View Switcher */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search business name, phone, trade, postcode…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-gold/15 hover:border-gold/25 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold/20 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        {activeTab !== 'spam' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${showFilters ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-card border-gold/15 text-muted-foreground hover:text-foreground hover:border-gold/25'}`}
            >
              <Filter size={15} /> Filters {(statusFilter.length > 0) && '(Active)'}
            </button>

            {/* Smart Follow-Up Filter */}
            <button
              onClick={() => setFollowupOnly((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                followupOnly
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                  : 'bg-card border-gold/15 text-muted-foreground hover:text-foreground hover:border-gold/25'
              }`}
              title="Filter leads in Contacted status awaiting stage 3 follow-up"
            >
              <Clock size={14} className={followupOnly ? 'text-amber-400' : 'text-gold'} />
              <span>🔔 Due for Follow-Up ({statusCounts['Contacted'] || 0})</span>
            </button>
          </div>
        )}

        {/* Triple View Toggle (Deal Cards vs Table vs Kanban) */}
        {activeTab === 'active' && (
          <div className="flex items-center gap-1 bg-[#0A0A0A]/80 p-1 rounded-xl border border-gold/15 ml-auto shadow-inner">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-gold/20 text-gold border border-gold/40 shadow-sm font-extrabold'
                  : 'text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              <LayoutGrid size={13} /> Deal Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-gold/20 text-gold border border-gold/40 shadow-sm font-extrabold'
                  : 'text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              <List size={13} /> Table
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-gold/20 text-gold border border-gold/40 shadow-sm font-extrabold'
                  : 'text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              <Columns size={13} /> Board
            </button>
          </div>
        )}
      </div>

      {/* Filter Options Accordion */}
      {showFilters && activeTab !== 'spam' && (
        <div className="glass p-5 rounded-2xl border border-gold/15 space-y-4 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Filter by Pipeline Stage:</label>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.filter(s => s !== 'Spam').map((s) => {
                const isSelected = statusFilter.includes(s)
                return (
                  <button
                    key={s}
                    onClick={() => toggleStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gold/20 border-gold text-gold font-bold shadow-sm'
                        : 'bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    {s} ({statusCounts[s] || 0})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 1. DEAL CARDS GRID VIEW (SiteDrop-style, Luxury Bespoke Edition)          */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {viewMode === 'cards' && activeTab === 'active' ? (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse p-6" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6 space-y-4 max-w-md mx-auto glass rounded-2xl border border-gold/15">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Inbox size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground">No Leads in Pipeline</h3>
            <p className="text-xs text-muted-foreground">
              Run your n8n Lead Machine to scrape 120 fresh leads or adjust your filters above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {displayedLeads.map((lead) => {
              const businessName = lead.business_name || lead.name
              const trade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Business'
              const rawWebsite = lead.website
              const hasWebsite = rawWebsite && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE'
              const rating = lead.scraped_metadata?.rating ?? 5.0
              const reviews = lead.scraped_metadata?.reviews_count ?? 0
              const phone = lead.phone || ''
              const cleanDigits = phone.replace(/[^0-9]/g, '')
              const isMobile = cleanDigits.startsWith('447') || cleanDigits.startsWith('07')
              const isLandline = !isMobile && cleanDigits.length > 5
              const address = lead.scraped_metadata?.address || lead.notes || 'UK Regional'
              const mapsUrl = lead.scraped_metadata?.google_maps_url

              return (
                <div
                  key={lead.id}
                  className={`rounded-2xl border transition-all duration-200 p-5 space-y-4 flex flex-col justify-between relative group ${getCardBorderClass(lead.status)}`}
                >
                  {/* Top: Monogram Avatar + Title + Rating */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Squircle Monogram Avatar */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider shrink-0 border ${
                          lead.status === 'Won' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' :
                          lead.status === 'Lost' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
                          lead.status === 'Contacted' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]' :
                          'bg-gradient-to-br from-gold/20 via-gold/10 to-transparent text-gold border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        }`}>
                          {getInitials(businessName)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-serif font-bold text-base text-foreground leading-tight truncate group-hover:text-gold transition-colors">
                            {businessName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-gold/90 border border-white/5 uppercase tracking-wider">
                              {trade}
                            </span>
                            <span className="flex items-center gap-1 text-amber-300 font-bold text-xs">
                              <Star size={11} className="fill-amber-300" /> {rating} ({reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Pill */}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shrink-0 ${
                        STATUS_COLORS[lead.status] || 'bg-card text-muted-foreground'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    {/* HERO ACTION STRIP (The SiteDrop Signature, Elevated) */}
                    <div className="rounded-xl overflow-hidden">
                      {!hasWebsite ? (
                        <div className="p-3 bg-gradient-to-r from-amber-500/15 via-red-500/10 to-transparent border border-amber-500/30 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-extrabold">
                            <span className="text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                              <Flame size={13} className="text-red-400 animate-pulse" /> Prime Target: No Website
                            </span>
                            <span className="text-[9px] text-amber-400/80 font-mono">HIGH CONVERSION</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {/* Action 1: 1-Click WhatsApp (Stage 1: Hi alone) */}
                            <button
                              onClick={() => handleQuickWhatsApp(lead)}
                              className="py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
                              title={isLandline ? "Open WhatsApp (Note: UK Landlines might not be registered on WhatsApp)" : "Launch WhatsApp with Stage 1 Opener ('Hi 👋' alone)"}
                            >
                              <MessageSquare size={13} /> {isLandline ? '💬 WhatsApp' : '💬 WhatsApp (Hi 👋)'}
                            </button>

                            {/* Action 2: Dynamic Live Demo & Antigravity Vibecoding Cockpit */}
                            <button
                              onClick={() => handleOpenPrompt(lead)}
                              className="py-2 px-3 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold border border-gold/35 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer shadow-sm"
                              title="Open live prototype demo and Antigravity Vibecoding prompts"
                            >
                              <Laptop size={13} /> ⚡ Demo Site →
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-blue-300 truncate">
                            <Globe size={13} className="shrink-0 text-blue-400" />
                            <a
                              href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline font-medium truncate"
                            >
                              {rawWebsite.replace(/^https?:\/\//, '')}
                            </a>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleQuickWhatsApp(lead)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1 cursor-pointer"
                              title={isLandline ? "Open WhatsApp" : "Send Hi 👋 via WhatsApp"}
                            >
                              <MessageSquare size={12} /> WhatsApp
                            </button>
                            <button
                              onClick={() => handleOpenPrompt(lead)}
                              className="px-2.5 py-1 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-xs font-bold border border-gold/30 flex items-center gap-1 cursor-pointer"
                              title="Open Antigravity Vibecoding Prompt & Demo"
                            >
                              <Laptop size={12} /> Demo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Telemetry / Contact Info */}
                    <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 font-mono text-foreground/90 font-medium">
                            <Phone size={12} className="text-gold" /> {phone || 'No phone'}
                          </span>
                          {phone && (
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${isMobile ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                              {isMobile ? '📱 Mobile' : '☎️ Landline'}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isLandline && (
                            <a
                              href={`tel:${phone}`}
                              className="px-2 py-0.5 rounded bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1 transition-all"
                              title="Direct dial landline number"
                            >
                              <Phone size={10} /> Call
                            </a>
                          )}
                          {mapsUrl && (
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gold hover:underline flex items-center gap-1 font-semibold text-[11px]"
                            >
                              <MapPin size={11} /> Maps <ExternalLink size={9} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-muted-foreground/80 truncate flex items-center gap-1">
                        <MapPin size={11} className="shrink-0 text-muted-foreground/50" /> {address}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: 1-Click Outcome Bar & Cockpit Trigger */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateLeadStatus(lead.id, 'Won')}
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                          lead.status === 'Won'
                            ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border-emerald-500/30'
                        }`}
                        title="Mark this deal as WON"
                      >
                        <Check size={11} /> Won 🟢
                      </button>

                      <button
                        onClick={() => handleUpdateLeadStatus(lead.id, 'Lost')}
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                          lead.status === 'Lost'
                            ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                            : 'bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border-rose-500/30'
                        }`}
                        title="Mark this deal as Lost"
                      >
                        <X size={11} /> Lost 🔴
                      </button>
                    </div>

                    <button
                      onClick={() => handleOpenOutreach(lead)}
                      className="px-3 py-1 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 text-[10px] font-extrabold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ml-auto"
                      title="Open Multi-Stage Outreach Cockpit"
                    >
                      <Sparkles size={11} /> Cockpit ⚡
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      ) : viewMode === 'kanban' && activeTab === 'active' ? (
        /* ───────────────────────────────────────────────────────────────────────── */
        /* 2. KANBAN BOARD VIEW                                                      */
        /* ───────────────────────────────────────────────────────────────────────── */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
            {['New', 'Contacted', 'Call Booked', 'Proposal Sent', 'Won', 'Lost'].map((columnStatus) => {
              const columnLeads = displayedLeads.filter((l) => l.status === columnStatus)
              return (
                <div key={columnStatus} className="glass rounded-2xl border border-gold/10 p-3.5 space-y-3 flex flex-col min-h-[450px] bg-white/[0.01]">
                  <div className="flex items-center justify-between pb-2 border-b border-gold/5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        columnStatus === 'Won' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]' :
                        columnStatus === 'Lost' ? 'bg-rose-400' :
                        columnStatus === 'Contacted' ? 'bg-amber-400' :
                        'bg-blue-400'
                      }`} />
                      <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">{columnStatus}</h3>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-muted-foreground font-bold">
                      {columnLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px] scrollbar-thin">
                    {columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => handleOpenOutreach(lead)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                          lead.status === 'Won' ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50' :
                          lead.status === 'Lost' ? 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40 opacity-75' :
                          'bg-card/70 border-gold/10 hover:border-gold/30'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-xs text-foreground line-clamp-1">{lead.business_name || lead.name}</h4>
                          <p className="text-[10px] text-muted-foreground truncate">{lead.phone || lead.email}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleQuickWhatsApp(lead)
                            }}
                            className="px-2 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold flex items-center gap-1"
                          >
                            <MessageSquare size={10} /> WhatsApp
                          </button>
                          <span className="text-[9px] font-bold text-gold">Cockpit ⚡</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ───────────────────────────────────────────────────────────────────────── */
        /* 3. DENSE DATA TABLE VIEW                                                  */
        /* ───────────────────────────────────────────────────────────────────────── */
        <div className="glass rounded-2xl border border-gold/15 overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {loading ? (
            <div className="divide-y divide-gold/5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="px-6 py-5 flex items-center gap-4 animate-pulse">
                  <div className="h-4 w-4 bg-white/5 rounded shrink-0" />
                  <div className="h-4 w-48 bg-white/5 rounded" />
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-4 w-24 bg-white/5 rounded ml-auto" />
                </div>
              ))}
            </div>
          ) : displayedLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold/40">
                <Inbox size={20} />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-foreground">No Leads Found</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Run the lead finder machine in n8n or adjust your search filters above.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold/15 bg-black/40 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    <th className="w-10 px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === displayedLeads.length && displayedLeads.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 accent-gold cursor-pointer rounded border-gold/25 bg-background text-gold focus:ring-0"
                      />
                    </th>
                    <th className="px-4 py-4 min-w-[220px]">Business & Trade</th>
                    <th className="px-4 py-4 min-w-[200px]">Phone & WhatsApp</th>
                    <th className="px-4 py-4 min-w-[150px]">Storefront Presence</th>
                    <th className="px-4 py-4 min-w-[130px]">Status</th>
                    <th className="px-4 py-4 min-w-[160px] text-center">1-Click Outcome</th>
                    <th className="px-4 py-4 text-right min-w-[140px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-xs">
                  {displayedLeads.map((lead) => {
                    const isChecked = selectedIds.includes(lead.id)
                    const isInspected = searchParams.get('leadId') === lead.id
                    const trade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Business'
                    const rawWebsite = lead.website
                    const hasWebsite = rawWebsite && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE'
                    const rating = lead.scraped_metadata?.rating ?? 5.0
                    const reviews = lead.scraped_metadata?.reviews_count ?? 0
                    const phone = lead.phone || ''

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => handleOpenOutreach(lead)}
                        className={`cursor-pointer ${getRowHighlightClass(lead.status, isChecked, isInspected)}`}
                      >
                        {/* Checkbox */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(lead.id, e.target.checked)}
                            className="w-4 h-4 accent-gold cursor-pointer rounded border-gold/25 bg-background text-gold focus:ring-0"
                          />
                        </td>

                        {/* Company & Sector */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-foreground hover:text-gold transition-colors">
                                {lead.business_name || lead.name}
                              </span>
                              {lead.status === 'Won' && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                                  WON 🟢
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 font-semibold text-gold/80 uppercase tracking-wider text-[9px]">
                                {trade}
                              </span>
                              <span className="flex items-center gap-1 text-amber-300 font-semibold text-[10px]">
                                <Star size={10} className="fill-amber-300" /> {rating} ({reviews})
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Phone & Direct WhatsApp */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 font-mono text-xs text-foreground/90 font-semibold">
                              <Phone size={11} className="text-gold" />
                              {phone || <span className="text-muted-foreground italic">No phone</span>}
                            </div>
                            {phone && (
                              <button
                                onClick={() => handleQuickWhatsApp(lead)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold shadow-sm transition-all cursor-pointer"
                              >
                                <MessageSquare size={11} /> 💬 Chat WhatsApp
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Storefront Presence */}
                        <td className="px-4 py-3.5">
                          {hasWebsite ? (
                            <a
                              href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-medium hover:underline max-w-[160px] truncate"
                            >
                              <Globe size={10} /> {rawWebsite.replace(/^https?:\/\//, '')} <ExternalLink size={9} />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 font-extrabold text-[10px] tracking-wider uppercase shadow-[0_0_10px_rgba(239,68,68,0.15)] animate-pulse">
                              <Flame size={10} /> NO WEBSITE
                            </span>
                          )}
                        </td>

                        {/* Pipeline Status */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className={`text-[10px] font-bold border rounded-lg px-2.5 py-1 outline-none cursor-pointer [color-scheme:dark] transition-all ${
                              STATUS_COLORS[lead.status] || 'bg-card text-muted-foreground'
                            }`}
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s} className="bg-[#0C0C0C] text-foreground font-semibold">
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* 1-Click Outcome Buttons */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleUpdateLeadStatus(lead.id, 'Won')}
                              className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                lead.status === 'Won'
                                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border-emerald-500/30'
                              }`}
                            >
                              <Check size={11} /> Win 🟢
                            </button>

                            <button
                              onClick={() => handleUpdateLeadStatus(lead.id, 'Lost')}
                              className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                lead.status === 'Lost'
                                  ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                                  : 'bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border-rose-500/30'
                              }`}
                            >
                              <X size={11} /> Lost 🔴
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenOutreach(lead)}
                              className="px-2.5 py-1 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 text-[10px] font-extrabold flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                            >
                              <Sparkles size={11} /> Cockpit ⚡
                            </button>

                            <button
                              onClick={() => handleInspectLead(lead.id)}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                                isInspected ? 'bg-gold/25 border-gold text-gold' : 'bg-white/5 border-white/10 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <Info size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* DEDICATED OUTREACH COCKPIT MODAL */}
      <OutreachModal
        isOpen={isOutreachOpen}
        onClose={() => setIsOutreachOpen(false)}
        lead={outreachLead}
        onUpdateStatus={async (id, status) => {
          await handleUpdateLeadStatus(id, status)
        }}
        onDeleteLead={async (id) => {
          await handleDeleteLead(id)
        }}
      />

      {/* FLOATING BULK ACTIONS TOOLBAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0c1017] border border-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] px-5 py-3 rounded-2xl flex items-center gap-5 sm:gap-8 animate-fade-in w-[90%] max-w-xl justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-gold text-background text-xxs font-bold flex items-center justify-center">
              {selectedIds.length}
            </span>
            <span className="text-xs text-foreground font-semibold">Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusUpdate('Won')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 text-xs font-bold transition-all cursor-pointer"
            >
              Mark Won 🟢
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Lost')}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 text-xs font-bold transition-all cursor-pointer"
            >
              Mark Lost 🔴
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 text-xs font-bold transition-all cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Manual Creation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg glass border border-gold/25 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-gold/10 pb-3">
              <h2 className="font-serif text-lg font-bold text-foreground">Add New Lead</h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                  <input
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Name</label>
                  <input
                    value={leadForm.business_name}
                    onChange={(e) => setLeadForm({ ...leadForm, business_name: e.target.value })}
                    placeholder="e.g. Solihull Roofing Ltd"
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                  <input
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+44 7123 456789"
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Website URL</label>
                  <input
                    value={leadForm.website}
                    onChange={(e) => setLeadForm({ ...leadForm, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Interested</label>
                  <input
                    value={leadForm.service_interested}
                    onChange={(e) => setLeadForm({ ...leadForm, service_interested: e.target.value })}
                    placeholder="e.g. Digital Storefront"
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source</label>
                  <select
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all cursor-pointer"
                  >
                    <option value="manual">Manual Intake</option>
                    <option value="google_maps_outreach">Google Maps Outreach</option>
                    <option value="booking_form">Booking Flow</option>
                    <option value="contact_form">Contact Form</option>
                    <option value="direct">Direct Referral</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pipeline Status</label>
                  <select
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                    className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all cursor-pointer"
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes / Qualifier Answers</label>
                <textarea
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  placeholder="Additional context or qualification details..."
                  rows={3}
                  className="w-full bg-background/60 border border-gold/15 hover:border-gold/25 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gold/10">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLead}
                  className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-gold to-gold-light text-background rounded-lg shadow-lg hover:shadow-[0_0_16px_rgba(212,175,55,0.2)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingLead ? 'Creating...' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── GAMIFIED REVENUE WON CELEBRATION MODAL ── */}
      {wonDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0B0F17] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(16,185,129,0.3)] text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <Sparkles size={32} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                🎉 High-Ticket Deal Won & Locked In!
              </span>
              <h3 className="font-serif text-2xl font-bold text-white pt-2">
                {wonDeal.businessName}
              </h3>
              <p className="text-xs text-muted-foreground">
                Successfully converted into your client portfolio. Deal economics added to your engine:
              </p>
            </div>

            {/* Deal Economics Cards */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Setup Cashflow</span>
                <p className="font-serif text-xl font-black text-emerald-400">£1,200</p>
                <p className="text-[10px] text-muted-foreground/80">Paid upon launch</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/20 space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Monthly Retainer</span>
                <p className="font-serif text-xl font-black text-amber-300">£150<span className="text-xs font-normal">/mo</span></p>
                <p className="text-[10px] text-muted-foreground/80">Hosting & Speed-to-Lead</p>
              </div>
            </div>

            {/* Progress to £10k */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-left text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-muted-foreground">Progress to £10,000/Month Target:</span>
                <span className="text-gold">1 Deal Closer ⚡</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-gold rounded-full w-[25%]" />
              </div>
            </div>

            <button
              onClick={() => setWonDeal(null)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            >
              Log Client & Continue Outreaching →
            </button>
          </div>
        </div>
      )}

      {/* ── ANTIGRAVITY VIBECODING & PROTOTYPE PROMPT MODAL ── */}
      <AntigravityPromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        lead={promptLead}
      />
    </div>
  )
}
