'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
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
  Send,
  MapPin,
  Laptop,
  Check,
  FileSpreadsheet,
  MoreHorizontal,
  Trophy,
  Calendar,
  ArrowUpRight,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useInspector } from '@/hooks/use-inspector'
import { OutreachModal, OutreachLead } from '@/components/admin/outreach-modal'
import { AntigravityPromptModal } from '@/components/admin/antigravity-prompt-modal'
import { GoogleSheetSyncModal } from '@/components/admin/google-sheet-sync-modal'

export type Lead = OutreachLead

const STATUS_DOT_COLORS: Record<string, string> = {
  New: 'bg-zinc-400',
  Contacted: 'bg-amber-400',
  'Call Booked': 'bg-amber-400',
  'Proposal Sent': 'bg-amber-400',
  Won: 'bg-emerald-400',
  Lost: 'bg-rose-500',
  Spam: 'bg-zinc-600',
}

const ALL_STATUSES = ['New', 'Contacted', 'Call Booked', 'Proposal Sent', 'Won', 'Lost', 'Spam']

function StatusBadge({ status }: { status: string }) {
  const dotColor = STATUS_DOT_COLORS[status] || 'bg-zinc-400'
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#141417] text-zinc-300 border border-white/10 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  )
}

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
  const [segmentFilter, setSegmentFilter] = useState<'all' | 'hot' | 'no_website' | 'mobile' | 'landline' | 'has_website'>('all')
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

  // Dedicated Google Sheets Sync Modal State
  const [isSheetSyncOpen, setIsSheetSyncOpen] = useState(false)

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

    const isMobile = cleanDigits.startsWith('447') || cleanDigits.startsWith('07')
    const ownerName = lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : ''
    const businessName = lead.business_name || 'your business'
    const opener = ownerName ? `Hi ${ownerName} 👋, is this ${businessName}?` : `Hi 👋, is this ${businessName}?`
    const url = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(opener)}`
    window.open(url, '_blank')

    if (lead.status === 'New' && isMobile) {
      handleUpdateLeadStatus(lead.id, 'Contacted')
    } else if (!isMobile) {
      triggerToast('☎️ UK Landline opened. If not registered on WhatsApp, use Direct Call.')
    }
  }

  const handleDeleteLead = async (id: string) => {
    const leadToDelete = leads.find(l => l.id === id)
    setLeads(prev => prev.filter(l => l.id !== id))
    triggerToast('Lead removed.')

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)
      if (error) throw error
      loadFiltersAndCounts()

      // 2-Way Sync: notify Google Sheets webhook to delete the corresponding row
      if (leadToDelete && (leadToDelete.phone || leadToDelete.business_name)) {
        try {
          fetch('https://script.google.com/macros/s/AKfycbw4WM9582vBCmlU7sIkG48tHAQTb8uLWc-ASvtztR_s2yKuu4Ms6huGMyeMmryIFKwkPQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'delete_row',
              phone: leadToDelete.phone,
              business_name: leadToDelete.business_name
            })
          }).catch(() => {})
        } catch (syncErr) {
          console.warn('Google Sheets delete sync notice:', syncErr)
        }
      }
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
    let list = leads
    if (followupOnly) {
      list = list.filter(l => l.status === 'Contacted')
    }
    if (segmentFilter === 'hot') {
      list = list.filter(l => {
        const rawWeb = (l.website || '').trim()
        const isWeb = Boolean(rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && !rawWeb.toLowerCase().includes('facebook.com') && !rawWeb.toLowerCase().includes('instagram.com'))
        const clean = (l.phone || '').replace(/[^0-9]/g, '')
        const isMob = clean.startsWith('447') || clean.startsWith('07')
        return isMob && !isWeb
      })
    } else if (segmentFilter === 'no_website') {
      list = list.filter(l => {
        const rawWeb = (l.website || '').trim()
        return !rawWeb || rawWeb === 'None' || rawWeb === 'NO WEBSITE' || rawWeb.toLowerCase().includes('facebook.com') || rawWeb.toLowerCase().includes('instagram.com')
      })
    } else if (segmentFilter === 'has_website') {
      list = list.filter(l => {
        const rawWeb = (l.website || '').trim()
        return rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && !rawWeb.toLowerCase().includes('facebook.com') && !rawWeb.toLowerCase().includes('instagram.com')
      })
    } else if (segmentFilter === 'mobile') {
      list = list.filter(l => {
        const clean = (l.phone || '').replace(/[^0-9]/g, '')
        return clean.startsWith('447') || clean.startsWith('07')
      })
    } else if (segmentFilter === 'landline') {
      list = list.filter(l => {
        const clean = (l.phone || '').replace(/[^0-9]/g, '')
        const isMob = clean.startsWith('447') || clean.startsWith('07')
        return !isMob && clean.length > 5
      })
    }
    return list
  }, [leads, followupOnly, segmentFilter])

  const segmentCounts = useMemo(() => {
    let noWeb = 0
    let hasWeb = 0
    let mobile = 0
    let landline = 0
    let hot = 0
    leads.forEach(l => {
      const rawWeb = (l.website || '').trim()
      const isWeb = Boolean(rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && !rawWeb.toLowerCase().includes('facebook.com') && !rawWeb.toLowerCase().includes('instagram.com'))
      if (isWeb) hasWeb++
      else noWeb++

      const clean = (l.phone || '').replace(/[^0-9]/g, '')
      const isMob = clean.startsWith('447') || clean.startsWith('07')
      if (isMob) mobile++
      else if (clean.length > 5) landline++

      if (isMob && !isWeb) hot++
    })
    return { noWeb, hasWeb, mobile, landline, hot, total: leads.length }
  }, [leads])

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
      return 'card-depth border-emerald-500/35 hover:border-emerald-500/55'
    }
    return 'card-depth'
  }

  // AMBIENT TABLE ROW STYLING HELPER
  const getRowHighlightClass = (status: string, isChecked: boolean, isInspected: boolean) => {
    if (isInspected) {
      return 'bg-[#141417] border-l-2 border-l-[#DAA640]'
    }
    if (isChecked) {
      return 'bg-[#141417] border-l-2 border-l-white/40'
    }
    return 'hover:bg-[#141417]/60 border-l-2 border-l-transparent transition-colors'
  }

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-4 left-4 z-50 px-4 py-3 rounded-xl bg-[#0B0B0D]/95 border border-[#DAA640]/40 text-sm font-semibold text-white shadow-2xl flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <CheckCircle2 size={16} className="text-[#DAA640]" /> {toast}
        </div>
      )}

      {/* Header (Clean Executive Typography, No Orange Eyebrow) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Lead Outreach Ledger</h1>
          <p className="text-sm text-zinc-400">
            Execute verified WhatsApp outreach, build instant digital storefront prototypes, and close local business clients.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
          <button
            onClick={() => setIsSheetSyncOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium rounded-xl bg-[#141417] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Sync leads from Google Sheets"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>Sync Sheet</span>
          </button>
          <button
            onClick={() => {
              setLeadForm({ name: '', business_name: '', email: '', phone: '', website: '', service_interested: '', source: 'manual', status: 'New', notes: '' })
              setShowNewModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-[#DAA640] hover:bg-[#F5D90A] text-black shadow-sm transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Motion Stats Grid (Obsidian / Rexora Standard with Metric Icons) */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          { key: 'New', label: 'Fresh Leads', dot: 'bg-zinc-400', icon: Inbox, iconColor: 'text-zinc-300', iconBg: 'bg-white/5', trend: 'Uncontacted' },
          { key: 'Contacted', label: 'Contacted', dot: 'bg-amber-400', icon: MessageSquare, iconColor: 'text-amber-400', iconBg: 'bg-amber-400/10', trend: 'Outreach Sent' },
          { key: 'Call Booked', label: 'Call Booked', dot: 'bg-amber-400', icon: Calendar, iconColor: 'text-amber-400', iconBg: 'bg-amber-400/10', trend: 'Audit Set' },
          { key: 'Proposal Sent', label: 'Proposal Sent', dot: 'bg-amber-400', icon: Send, iconColor: 'text-amber-400', iconBg: 'bg-amber-400/10', trend: 'Pending Sign' },
          { key: 'Won', label: 'Won Deals', dot: 'bg-emerald-400', icon: Trophy, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-400/10', trend: 'Retainer Active' },
          { key: 'Lost', label: 'Lost', dot: 'bg-rose-500', icon: XCircle, iconColor: 'text-rose-400', iconBg: 'bg-rose-500/10', trend: 'Disqualified' },
        ].map((item) => {
          const Icon = item.icon
          const count = statusCounts[item.key] || 0
          const isSelected = statusFilter.includes(item.key)
          return (
            <button
              type="button"
              key={item.key}
              onClick={() => toggleStatus(item.key)}
              className={`p-4 sm:p-5 flex flex-col justify-between text-left transition-all cursor-pointer card-depth relative group min-h-[132px] ${
                isSelected ? 'card-depth-active' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-1 w-full">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium truncate">
                  {item.label}
                </span>
                <div className={`w-8 h-8 rounded-xl ${item.iconBg} border border-white/10 flex items-center justify-center shrink-0 ${item.iconColor} group-hover:scale-105 transition-transform`}>
                  <Icon size={14} />
                </div>
              </div>
              <div className="my-1">
                <span className="text-2xl font-bold text-white font-sans tracking-tight">
                  {count}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 w-full">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 truncate">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                  {item.trend}
                </span>
                <span className={`text-[10px] font-mono transition-colors flex items-center gap-0.5 ${
                  isSelected ? 'text-[#DAA640] font-bold' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {isSelected ? 'Active' : 'Filter'} <ArrowUpRight size={10} />
                </span>
              </div>
            </button>
          )
        })}
      </section>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 border-b-2 text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'active'
              ? 'border-[#DAA640] text-[#DAA640] bg-[#DAA640]/5'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Inbox size={14} /> Active Pipeline
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-2.5 border-b-2 text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'archived'
              ? 'border-[#DAA640] text-[#DAA640] bg-[#DAA640]/5'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Archive size={14} /> Archived
        </button>
        <button
          onClick={() => setActiveTab('spam')}
          className={`px-4 py-2.5 border-b-2 text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'spam'
              ? 'border-[#DAA640] text-[#DAA640] bg-[#DAA640]/5'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Ban size={14} /> Spam / Disqualified
        </button>
      </div>

      {/* Toolbar & View Switcher */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search business name, phone, trade, postcode…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#0B0B0D] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl text-sm text-white placeholder:text-zinc-500 outline-none transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        {activeTab !== 'spam' && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                showFilters
                  ? 'bg-[#141417] border-[#DAA640]/40 text-[#DAA640]'
                  : 'bg-[#0B0B0D] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              <Filter size={14} /> Filters {statusFilter.length > 0 && `(${statusFilter.length})`}
            </button>

            {/* Smart Follow-Up Filter */}
            <button
              onClick={() => setFollowupOnly((v) => !v)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                followupOnly
                  ? 'bg-[#141417] border-amber-500/50 text-amber-300 shadow-sm'
                  : 'bg-[#0B0B0D] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
              title="Filter leads in Contacted status awaiting stage 3 follow-up"
            >
              <Clock size={14} className={followupOnly ? 'text-amber-400' : 'text-zinc-400'} />
              <span>Due Follow-Up ({statusCounts['Contacted'] || 0})</span>
            </button>
          </div>
        )}

        {/* View Toggle */}
        {activeTab === 'active' && (
          <div className="flex items-center gap-1 bg-[#0B0B0D] p-1 rounded-xl border border-white/10 ml-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-[#141417] text-white border border-white/15 shadow-sm'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              <LayoutGrid size={13} /> Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-[#141417] text-white border border-white/15 shadow-sm'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              <List size={13} /> Table
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-[#141417] text-white border border-white/15 shadow-sm'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              <Columns size={13} /> Board
            </button>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* MOTION SLIDING SEGMENTED CONTROL (No Gimmick Emojis)                      */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'active' && (
        <div className="p-1.5 rounded-2xl bg-[#0B0B0D] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {[
              { key: 'all', label: 'All Leads', count: segmentCounts.total, highlight: false },
              { key: 'hot', label: '⚡ WhatsApp + No Website', count: segmentCounts.hot, highlight: true },
              { key: 'no_website', label: 'No Website Only', count: segmentCounts.noWeb, highlight: false },
              { key: 'mobile', label: 'WhatsApp Ready', count: segmentCounts.mobile, highlight: false },
              { key: 'has_website', label: 'Has Website', count: segmentCounts.hasWeb, highlight: false },
              { key: 'landline', label: 'Landlines', count: segmentCounts.landline, highlight: false },
            ].map((seg) => {
              const isActive = segmentFilter === seg.key
              return (
                <button
                  key={seg.key}
                  onClick={() => setSegmentFilter(seg.key as any)}
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? (seg.highlight ? 'text-amber-300 font-bold' : 'text-white font-semibold')
                      : (seg.highlight ? 'text-amber-400 hover:text-amber-300' : 'text-zinc-400 hover:text-zinc-200')
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSegment"
                      className={`absolute inset-0 rounded-xl shadow-sm ${
                        seg.highlight ? 'bg-amber-400/15 border border-amber-400/30' : 'bg-[#141417] border border-white/15'
                      }`}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{seg.label}</span>
                  <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? (seg.highlight ? 'bg-amber-400/25 text-amber-300 font-bold' : 'bg-white/10 text-white')
                      : (seg.highlight ? 'bg-amber-400/10 text-amber-400 font-semibold' : 'bg-white/5 text-zinc-400')
                  }`}>
                    {seg.count}
                  </span>
                </button>
              )
            })}
          </div>

          <span className="text-[11px] text-zinc-400 font-mono px-3 hidden lg:inline">
            {displayedLeads.length} of {leads.length} leads
          </span>
        </div>
      )}

      {/* Filter Options Accordion */}
      {showFilters && activeTab !== 'spam' && (
        <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-4 animate-fade-in">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">Filter by Pipeline Stage:</label>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.filter(s => s !== 'Spam').map((s) => {
                const isSelected = statusFilter.includes(s)
                return (
                  <button
                    key={s}
                    onClick={() => toggleStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#141417] border-[#DAA640] text-white'
                        : 'bg-[#141417]/50 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT_COLORS[s] || 'bg-zinc-400'}`} />
                    <span>{s} ({statusCounts[s] || 0})</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">Filter by Website Presence & Channel:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSegmentFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  segmentFilter === 'all'
                    ? 'bg-[#141417] border-[#DAA640] text-white font-semibold'
                    : 'bg-[#141417]/50 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                All Leads ({segmentCounts.total})
              </button>
              <button
                onClick={() => setSegmentFilter('hot')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  segmentFilter === 'hot'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-[#141417]/50 border-amber-400/30 text-amber-400 hover:text-amber-300'
                }`}
              >
                ⚡ WhatsApp + No Website ({segmentCounts.hot})
              </button>
              <button
                onClick={() => setSegmentFilter('no_website')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  segmentFilter === 'no_website'
                    ? 'bg-[#141417] border-[#DAA640] text-white font-semibold'
                    : 'bg-[#141417]/50 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                No Website Only ({segmentCounts.noWeb})
              </button>
              <button
                onClick={() => setSegmentFilter('mobile')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  segmentFilter === 'mobile'
                    ? 'bg-[#141417] border-[#DAA640] text-white font-semibold'
                    : 'bg-[#141417]/50 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                WhatsApp Ready ({segmentCounts.mobile})
              </button>
              <button
                onClick={() => setSegmentFilter('has_website')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  segmentFilter === 'has_website'
                    ? 'bg-[#141417] border-[#DAA640] text-white font-semibold'
                    : 'bg-[#141417]/50 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                Has Website ({segmentCounts.hasWeb})
              </button>
              <button
                onClick={() => setSegmentFilter('landline')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  segmentFilter === 'landline'
                    ? 'bg-[#141417] border-[#DAA640] text-white font-semibold'
                    : 'bg-[#141417]/50 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                Landlines ({segmentCounts.landline})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 1. DEAL CARDS GRID VIEW (2 Purposeful Actions + Overflow Menu)             */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {viewMode === 'cards' && activeTab === 'active' ? (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[#0B0B0D] border border-white/5 animate-pulse p-6" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6 space-y-4 max-w-md mx-auto rounded-2xl bg-[#0B0B0D] border border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-400">
              <Inbox size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">No Leads in Pipeline</h3>
            <p className="text-xs text-zinc-400">
              Run your lead finder scrape or add a manual lead above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {displayedLeads.map((lead) => {
              const businessName = lead.business_name || lead.name
              const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Jeweller'
              const trade = (!rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')) ? 'Jeweller' : rawTrade
              const rawWebsite = (lead.website || '').trim()
              const hasWebsite = rawWebsite !== '' && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE' && !rawWebsite.toLowerCase().includes('facebook.com') && !rawWebsite.toLowerCase().includes('instagram.com')
              
              // Clean rating and reviews
              let rating = Number(lead.scraped_metadata?.rating || 5.0)
              let reviews = Number(lead.scraped_metadata?.reviews_count ?? (lead.scraped_metadata as any)?.reviews ?? 0)
              const composite = (lead.scraped_metadata as any)?.rating_reviews || lead.notes || ''
              if ((!reviews || reviews === 0) && composite) {
                const match = composite.match(/(\d+)\s*\([★*]?\s*([\d.]+)\)/)
                if (match) {
                  reviews = parseInt(match[1], 10)
                  rating = parseFloat(match[2])
                }
              }

              const phone = lead.phone || ''
              const cleanDigits = phone.replace(/[^0-9]/g, '')
              const isMobile = cleanDigits.startsWith('447') || cleanDigits.startsWith('07')
              const isLandline = !isMobile && cleanDigits.length > 5

              // Clean address
              const rawAddr = (lead.scraped_metadata?.address || '').trim()
              const rawNotes = (lead.notes || '').trim()
              let address = rawAddr
              if (!address && rawNotes && !rawNotes.startsWith('·') && !rawNotes.includes('★')) {
                address = rawNotes
              }
              if (!address || address.startsWith('·') || address.includes('★')) {
                address = 'UK Regional'
              }
              const mapsUrl = lead.scraped_metadata?.google_maps_url

              return (
                <div
                  key={lead.id}
                  className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 group relative ${getCardBorderClass(lead.status)}`}
                >
                  {/* Top: Monogram Avatar + Title + Rating */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Monogram Avatar */}
                        <div className="w-10 h-10 rounded-xl bg-[#141417] border border-white/10 text-zinc-200 flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
                          {getInitials(businessName)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-sans font-semibold text-base text-white leading-tight truncate group-hover:text-[#DAA640] transition-colors">
                            {businessName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-medium text-zinc-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md uppercase tracking-wider max-w-[130px] truncate">
                              {trade}
                            </span>
                            <span className="flex items-center gap-1 text-amber-400 font-semibold text-xs shrink-0">
                              <Star size={11} className="fill-amber-400 text-amber-400" /> {rating} ({reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge with 6px Dot */}
                      <StatusBadge status={lead.status} />
                    </div>

                    {/* Website / Opportunity Strip */}
                    <div className="rounded-xl overflow-hidden">
                      {!hasWebsite ? (
                        <div className="px-3 py-2 rounded-xl bg-[#141417] border border-white/5 flex items-center justify-between text-xs text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <Globe size={13} className="text-zinc-500" />
                            <span>No website detected</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#DAA640] uppercase tracking-wider font-medium">Opportunity</span>
                        </div>
                      ) : (
                        <div className="px-3 py-2 rounded-xl bg-[#141417] border border-white/5 flex items-center justify-between text-xs text-zinc-400">
                          <a
                            href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 hover:text-white transition-colors truncate max-w-[200px]"
                          >
                            <Globe size={13} className="shrink-0 text-zinc-500" />
                            <span className="truncate">{rawWebsite.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink size={10} className="shrink-0 text-zinc-500" />
                          </a>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Live</span>
                        </div>
                      )}
                    </div>

                    {/* Telemetry / Contact Info */}
                    <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 font-mono text-zinc-300 font-medium">
                            <Phone size={12} className="text-zinc-500" /> {phone || 'No phone'}
                          </span>
                          {phone && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-white/5 text-zinc-400">
                              {isMobile ? 'Mobile' : 'Landline'}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isLandline && (
                            <a
                              href={`tel:${phone}`}
                              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] font-medium border border-white/10 flex items-center gap-1 transition-all"
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
                              className="text-zinc-400 hover:text-[#DAA640] flex items-center gap-1 font-medium text-[11px]"
                            >
                              <MapPin size={11} /> Maps <ExternalLink size={9} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-500 truncate flex items-center gap-1">
                        <MapPin size={11} className="shrink-0 text-zinc-600" /> {address}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: 2 Purposeful Actions + Overflow Menu */}
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center gap-2">
                    {/* Primary Action: WhatsApp */}
                    <button
                      onClick={() => handleQuickWhatsApp(lead)}
                      className="flex-1 py-2 px-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      title={isLandline ? "Open WhatsApp" : "Launch WhatsApp opener"}
                    >
                      <MessageSquare size={13} />
                      <span>WhatsApp</span>
                    </button>

                    {/* Secondary Action: Pitch Demo */}
                    <button
                      onClick={() => handleOpenPrompt(lead)}
                      className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Open Demo Site and Outreach Pitch"
                    >
                      <Laptop size={13} />
                      <span>Demo</span>
                    </button>

                    {/* Overflow Menu: Radix Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                          title="More options"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-[#141417] border border-white/10 text-zinc-300">
                        <DropdownMenuItem
                          onClick={() => handleUpdateLeadStatus(lead.id, 'Won')}
                          className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Mark as Won</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateLeadStatus(lead.id, 'Lost')}
                          className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>Mark as Lost</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateLeadStatus(lead.id, 'Contacted')}
                          className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Mark as Contacted</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                          onClick={() => handleOpenOutreach(lead)}
                          className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                        >
                          <Send size={12} className="text-zinc-400" />
                          <span>Multi-Stage Pitch</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleInspectLead(lead.id)}
                          className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white"
                        >
                          <Info size={12} className="text-zinc-400" />
                          <span>Inspect Lead Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                          onClick={() => handleDeleteLead(lead.id)}
                          className="cursor-pointer text-xs flex items-center gap-2 text-rose-400 focus:bg-rose-500/10 focus:text-rose-300"
                        >
                          <Trash2 size={12} />
                          <span>Delete Lead</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                <div key={columnStatus} className="rounded-2xl border border-white/10 p-3.5 space-y-3 flex flex-col min-h-[450px] bg-[#0B0B0D]">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT_COLORS[columnStatus] || 'bg-zinc-400'}`} />
                      <h3 className="font-semibold text-xs text-white uppercase tracking-wider">{columnStatus}</h3>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-zinc-400 font-medium">
                      {columnLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px] scrollbar-thin">
                    {columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => handleOpenOutreach(lead)}
                        className="p-3 rounded-xl border border-white/5 bg-[#141417] hover:border-white/15 transition-all cursor-pointer space-y-2.5"
                      >
                        <div>
                          <h4 className="font-semibold text-xs text-white line-clamp-1">{lead.business_name || lead.name}</h4>
                          <p className="text-[10px] text-zinc-400 truncate">{lead.phone || lead.email}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleQuickWhatsApp(lead)
                            }}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white text-[10px] font-medium flex items-center gap-1 transition-colors"
                          >
                            <MessageSquare size={10} /> WhatsApp
                          </button>
                          <span className="text-[10px] font-medium text-[#DAA640] flex items-center gap-1"><Send size={9} /> Pitch</span>
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
        <div className="rounded-2xl border border-white/10 overflow-hidden relative bg-[#0B0B0D]">
          {loading ? (
            <div className="divide-y divide-white/5">
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
              <div className="w-12 h-12 rounded-full bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-400">
                <Inbox size={20} />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white">No Leads Found</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Run the lead finder machine in n8n or adjust your search filters above.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#141417]/50 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    <th className="w-10 px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === displayedLeads.length && displayedLeads.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 accent-[#DAA640] cursor-pointer rounded border-white/20 bg-background text-[#DAA640] focus:ring-0"
                      />
                    </th>
                    <th className="px-4 py-3.5 min-w-[220px]">Business & Trade</th>
                    <th className="px-4 py-3.5 min-w-[180px]">Phone & WhatsApp</th>
                    <th className="px-4 py-3.5 min-w-[150px]">Storefront Presence</th>
                    <th className="px-4 py-3.5 min-w-[130px]">Status</th>
                    <th className="px-4 py-3.5 text-right min-w-[140px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {displayedLeads.map((lead) => {
                    const isChecked = selectedIds.includes(lead.id)
                    const isInspected = searchParams.get('leadId') === lead.id
                    const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Jeweller'
                    const trade = (!rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')) ? 'Jeweller' : rawTrade
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
                            className="w-4 h-4 accent-[#DAA640] cursor-pointer rounded border-white/20 bg-background text-[#DAA640] focus:ring-0"
                          />
                        </td>

                        {/* Company & Sector */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-sm text-white hover:text-[#DAA640] transition-colors">
                                {lead.business_name || lead.name}
                              </span>
                              {lead.status === 'Won' && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400" /> WON
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 font-medium text-zinc-400 uppercase tracking-wider text-[9px] max-w-[120px] truncate">
                                {trade}
                              </span>
                              <span className="flex items-center gap-1 text-amber-400 font-medium text-[10px]">
                                <Star size={10} className="fill-amber-400 text-amber-400" /> {rating} ({reviews})
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Phone & Direct WhatsApp */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-200">
                              <Phone size={11} className="text-zinc-500" />
                              {phone || <span className="text-zinc-500 italic">No phone</span>}
                            </div>
                            {phone && (
                              <button
                                onClick={() => handleQuickWhatsApp(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-medium transition-all cursor-pointer"
                              >
                                <MessageSquare size={10} /> Chat WhatsApp
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
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#141417] text-zinc-300 border border-white/10 text-[10px] font-medium hover:text-white max-w-[160px] truncate"
                            >
                              <Globe size={10} className="text-zinc-500" /> {rawWebsite.replace(/^https?:\/\//, '')} <ExternalLink size={9} />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#141417] text-zinc-400 border border-white/5 text-[10px] font-medium">
                              No website detected
                            </span>
                          )}
                        </td>

                        {/* Pipeline Status */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="text-[10px] font-medium border border-white/10 bg-[#141417] text-zinc-300 rounded-lg px-2.5 py-1 outline-none cursor-pointer [color-scheme:dark] transition-all"
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s} className="bg-[#0B0B0D] text-white">
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenPrompt(lead)}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-medium transition-all cursor-pointer"
                            >
                              Demo
                            </button>
                            <button
                              onClick={() => handleInspectLead(lead.id)}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                                isInspected ? 'bg-[#DAA640]/20 border-[#DAA640] text-[#DAA640]' : 'bg-[#141417] border-white/10 text-zinc-400 hover:text-white'
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
        key={outreachLead?.id || 'none'}
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B0B0D]/95 border border-white/15 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-5 sm:gap-8 animate-fade-in w-[90%] max-w-xl justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#DAA640] text-black text-[10px] font-bold flex items-center justify-center">
              {selectedIds.length}
            </span>
            <span className="text-xs text-white font-medium">Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusUpdate('Won')}
              className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Mark Won
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Lost')}
              className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/25 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Mark Lost
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 text-xs font-medium transition-all cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Manual Creation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0B0B0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="font-serif text-lg font-bold text-white">Add New Lead</h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-zinc-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Full Name *</label>
                  <input
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Business Name</label>
                  <input
                    value={leadForm.business_name}
                    onChange={(e) => setLeadForm({ ...leadForm, business_name: e.target.value })}
                    placeholder="e.g. Solihull Roofing Ltd"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Phone Number</label>
                  <input
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+44 7123 456789"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Website URL</label>
                  <input
                    value={leadForm.website}
                    onChange={(e) => setLeadForm({ ...leadForm, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Service Interested</label>
                  <input
                    value={leadForm.service_interested}
                    onChange={(e) => setLeadForm({ ...leadForm, service_interested: e.target.value })}
                    placeholder="e.g. Digital Storefront"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Source</label>
                  <select
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all cursor-pointer"
                  >
                    <option value="manual">Manual Intake</option>
                    <option value="google_maps_outreach">Google Maps Outreach</option>
                    <option value="booking_form">Booking Flow</option>
                    <option value="contact_form">Contact Form</option>
                    <option value="direct">Direct Referral</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Pipeline Status</label>
                  <select
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all cursor-pointer"
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Notes</label>
                <textarea
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  placeholder="Additional context or qualification details..."
                  rows={3}
                  className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLead}
                  className="px-5 py-2 text-xs font-bold bg-[#DAA640] hover:bg-[#F5D90A] text-black rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
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
          <div className="relative w-full max-w-md bg-[#0B0B0D] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Sparkles size={28} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                Deal Won & Closed
              </span>
              <h3 className="font-serif text-2xl font-bold text-white pt-2">
                {wonDeal.businessName}
              </h3>
              <p className="text-xs text-zinc-400">
                Successfully converted into your client portfolio. Deal economics added:
              </p>
            </div>

            {/* Deal Economics Cards */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-[#141417] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400">Setup Cashflow</span>
                <p className="font-sans text-xl font-bold text-emerald-400">£1,200</p>
                <p className="text-[10px] text-zinc-500">Paid upon launch</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141417] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400">Monthly Retainer</span>
                <p className="font-sans text-xl font-bold text-amber-300">£150<span className="text-xs font-normal">/mo</span></p>
                <p className="text-[10px] text-zinc-500">Hosting & Speed-to-Lead</p>
              </div>
            </div>

            {/* Progress to £10k */}
            <div className="p-3.5 rounded-2xl bg-[#141417] border border-white/5 space-y-2 text-left text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-400">Target Progress (£10,000/mo):</span>
                <span className="text-[#DAA640] font-mono font-bold">+1 Deal</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-[#DAA640] rounded-full w-[25%]" />
              </div>
            </div>

            <button
              onClick={() => setWonDeal(null)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all cursor-pointer"
            >
              Continue Outreach
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

      {/* ── GOOGLE SHEETS 1-CLICK SYNC MODAL ── */}
      <GoogleSheetSyncModal
        isOpen={isSheetSyncOpen}
        onClose={() => setIsSheetSyncOpen(false)}
        onSuccess={() => {
          fetchLeads()
          triggerToast('Google Sheets sync complete!')
        }}
        currentCount={leads.length}
      />
    </div>
  )
}
