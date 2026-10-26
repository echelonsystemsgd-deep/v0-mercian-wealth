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
  ChevronDown,
  ChevronUp,
  Copy,
  Mail,
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
  AlertTriangle,
  MessageSquare,
  Phone,
  Globe,
  Star,
  ExternalLink,
  Send,
  MapPin,
  Check,
  FileSpreadsheet,
  MoreHorizontal,
  Trophy,
  Calendar,
  ArrowUpRight,
  Zap,
  ArrowUpDown,
  CheckCheck,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useInspector } from '@/hooks/use-inspector'
import { OutreachModal, OutreachLead } from '@/components/admin/outreach-modal'
import { OutreachSprintRunner } from '@/components/admin/outreach-sprint-runner'
import { AntigravityPromptModal } from '@/components/admin/antigravity-prompt-modal'
import { GoogleSheetSyncModal } from '@/components/admin/google-sheet-sync-modal'

export type Lead = OutreachLead

const STATUS_DOT_COLORS: Record<string, string> = {
  New: 'bg-zinc-400',
  'Review requested': 'bg-cyan-400',
  Contacted: 'bg-amber-400',
  'Call Booked': 'bg-amber-400',
  'Proposal Sent': 'bg-amber-400',
  Won: 'bg-emerald-400',
  Lost: 'bg-rose-500',
  Spam: 'bg-zinc-600',
  STOP: 'bg-purple-500',
}

const ALL_STATUSES = ['New', 'Review requested', 'Contacted', 'Call Booked', 'Proposal Sent', 'Won', 'Lost', 'Spam', 'STOP']

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

export function getLeadPathway(lead: Lead): 'HAS_WEBSITE' | 'NO_WEBSITE' | 'NEEDS_REVIEW' {
  if (lead.outreach_category === 'needs_review') return 'NEEDS_REVIEW'
  if (lead.outreach_category === 'has_website') return 'HAS_WEBSITE'
  if (lead.outreach_category === 'no_website') return 'NO_WEBSITE'

  const rawName = (lead.business_name || lead.name || '').trim()
  const rawWeb = (lead.website || '').trim()
  const isWeb = Boolean(rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && !rawWeb.toLowerCase().includes('facebook.com') && !rawWeb.toLowerCase().includes('instagram.com'))
  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '')

  if (!rawName || (!cleanPhone && !isWeb)) {
    return 'NEEDS_REVIEW'
  }
  if (isWeb) {
    return 'HAS_WEBSITE'
  }
  return 'NO_WEBSITE'
}

export function getLeadFollowUps(lead: Lead) {
  const meta = (lead.scraped_metadata || {}) as Record<string, any>
  let fu1 = meta.follow_up_1 || meta.generated_outreach?.whatsappFollowUp1
  let fu2 = meta.follow_up_2 || meta.follow_up_final || meta.generated_outreach?.whatsappFollowUp2

  if (!fu1 && lead.notes) {
    const match = lead.notes.match(/\[FOLLOW-UP 1 \(48h\)\]:\s*([\s\S]*?)(?=\n\n\[FOLLOW-UP 2|$)/i)
    if (match) fu1 = match[1].trim()
  }

  if (!fu2 && lead.notes) {
    const match = lead.notes.match(/\[FOLLOW-UP 2 \((?:Close|Final)\)\]:\s*([\s\S]*?)$/i)
    if (match) fu2 = match[1].trim()
  }

  const businessName = lead.business_name || lead.name || 'your firm'
  const friction = meta.observable_problem || meta.friction_title || 'intake friction points'

  // Scrub any legacy prototype URLs that might be in stored strings
  if (fu1) {
    fu1 = fu1.replace(/https?:\/\/[^\s]+prototype[^\s]*/gi, '').replace(/\s{2,}/g, ' ').trim()
  }
  if (fu2) {
    fu2 = fu2.replace(/https?:\/\/[^\s]+prototype[^\s]*/gi, '').replace(/\s{2,}/g, ' ').trim()
  }

  if (!fu1) {
    fu1 = `Hi ${businessName} team, following up on our note regarding ${friction}. We mapped a private walkthrough of how modern UK practices capture high-value clients and eliminate intake drop-off before peak filing season. We only implement this with one firm per postcode. Would you like us to share the walkthrough notes with your partners?`
  }

  if (!fu2) {
    fu2 = `Hi ${businessName} team, concluding our outreach here as we only reserve territory implementation for a single accounting practice in your area and are moving forward with other enquiries. If you ever want to review the private intake architecture we built, feel free to reach out. Wishing your practice a strong filing quarter.`
  }

  return { fu1, fu2 }
}

export interface FollowUpCadenceState {
  stage: 'cooling_down' | 'due_fu1' | 'waiting_fu2' | 'due_fu2' | 'completed'
  hoursSinceContact: number
  hoursUntilFu1: number
  badgeText: string
  badgeColor: string
  isDueNow: boolean
  activeStep: 1 | 2 | null
}

export function getLeadFollowUpCadence(lead: Lead): FollowUpCadenceState {
  if (lead.status !== 'Contacted') {
    return {
      stage: 'cooling_down',
      hoursSinceContact: 0,
      hoursUntilFu1: 0,
      badgeText: '',
      badgeColor: '',
      isDueNow: false,
      activeStep: null,
    }
  }

  const meta = (lead.scraped_metadata || {}) as Record<string, any>
  const contactDateStr = meta.contacted_at || (lead as any).updated_at || lead.created_at
  const contactTime = new Date(contactDateStr).getTime()
  const now = Date.now()
  const hoursSinceContact = Math.max(0, Math.round((now - contactTime) / (1000 * 60 * 60)))

  const fu1SentAt = meta.follow_up_1_sent_at
  const fu2SentAt = meta.follow_up_final_sent_at || meta.follow_up_2_sent_at

  if (fu2SentAt) {
    return {
      stage: 'completed',
      hoursSinceContact,
      hoursUntilFu1: 0,
      badgeText: 'Cadence Closed',
      badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      isDueNow: false,
      activeStep: null,
    }
  }

  if (fu1SentAt) {
    const fu1Time = new Date(fu1SentAt).getTime()
    const hoursSinceFu1 = Math.max(0, Math.round((now - fu1Time) / (1000 * 60 * 60)))
    if (hoursSinceFu1 >= 72 || hoursSinceContact >= 120) {
      return {
        stage: 'due_fu2',
        hoursSinceContact,
        hoursUntilFu1: 0,
        badgeText: 'Due Final Close (Day 5+)',
        badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        isDueNow: true,
        activeStep: 2,
      }
    }
    const hoursLeft = Math.max(1, 72 - hoursSinceFu1)
    return {
      stage: 'waiting_fu2',
      hoursSinceContact,
      hoursUntilFu1: 0,
      badgeText: `FU1 Sent • Final in ${hoursLeft}h`,
      badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      isDueNow: false,
      activeStep: null,
    }
  }

  if (hoursSinceContact >= 48) {
    return {
      stage: 'due_fu1',
      hoursSinceContact,
      hoursUntilFu1: 0,
      badgeText: `Due Follow-Up 1 (${hoursSinceContact}h ago)`,
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      isDueNow: true,
      activeStep: 1,
    }
  }

  const hoursUntilFu1 = Math.max(1, 48 - hoursSinceContact)
  return {
    stage: 'cooling_down',
    hoursSinceContact,
    hoursUntilFu1,
    badgeText: `Cooling Down (${hoursUntilFu1}h to FU1)`,
    badgeColor: 'bg-white/5 text-zinc-400 border-white/10',
    isDueNow: false,
    activeStep: null,
  }
}

type ActionQueue = 'todays_queue' | 'ready_to_whatsapp' | 'due_followup' | 'active_pipeline' | 'needs_review' | 'all'

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
  const [activeTab, setActiveTab] = useState<'active' | 'archived' | 'spam'>('active')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  
  // Streamlined Action Queue Filter: default to Today's Top 10 A/B Queue
  const [queueFilter, setQueueFilter] = useState<ActionQueue>('todays_queue')
  const [wonDeal, setWonDeal] = useState<{ businessName: string } | null>(null)

  // In-Session Retention State: keeps contacted leads visible in view until user refreshes
  const [contactedInSessionIds, setContactedInSessionIds] = useState<Set<string>>(new Set())

  // Direct 1-Click Quick Filter: 'all' | 'new' | 'contacted' | 'pipeline' | 'landlines' | 'needs_review'
  const [quickFilter, setQuickFilter] = useState<'all' | 'new' | 'follow_up' | 'contacted' | 'pipeline' | 'landlines' | 'needs_review'>('all')
  // Dedicated Follow-Up Cadence Sub-Filter: 'all' | 'due_fu1' | 'due_fu2' | 'cooling_down'
  const [followUpSubFilter, setFollowUpSubFilter] = useState<'all' | 'due_fu1' | 'due_fu2' | 'cooling_down'>('all')

  // Sub-Category / Niche filter
  const [tradeFilter, setTradeFilter] = useState<string>('All')

  // Sorting controls: 'created_at' (latest to last) | 'rating' | 'reviews' | 'name' | 'trade'
  const [sortBy, setSortBy] = useState<'created_at' | 'rating' | 'reviews' | 'name' | 'trade'>('created_at')
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc')
  
  // Views: 'cards' (Deal Cards Grid), 'table' (Dense Table), 'kanban' (Pipeline Columns)
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'kanban'>('cards')

  // Pipeline counts
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({})

  // Dedicated Outreach Cockpit Modal State
  const [outreachLead, setOutreachLead] = useState<Lead | null>(null)
  const [isOutreachOpen, setIsOutreachOpen] = useState(false)
  const [isSprintOpen, setIsSprintOpen] = useState(false)

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

  // Dedicated state for expanded follow-ups drawer & copy state
  const [expandedFollowUpIds, setExpandedFollowUpIds] = useState<Set<string>>(new Set())
  const [copiedFollowUpId, setCopiedFollowUpId] = useState<string | null>(null)

  const toggleFollowUpExpanded = (leadId: string) => {
    setExpandedFollowUpIds((prev) => {
      const next = new Set(prev)
      if (next.has(leadId)) {
        next.delete(leadId)
      } else {
        next.add(leadId)
      }
      return next
    })
  }

  const handleCopyFollowUp = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedFollowUpId(id)
      triggerToast('✓ Copied tailored follow-up to clipboard!')
      setTimeout(() => setCopiedFollowUpId(null), 2000)
    } catch (err) {
      console.error('Failed to copy follow-up text:', err)
    }
  }

  const handleMarkFollowUpSent = async (leadId: string, stage: 1 | 2) => {
    const nowIso = new Date().toISOString()
    const targetLead = leads.find((l) => l.id === leadId)
    if (!targetLead) return

    const currentMeta = (targetLead.scraped_metadata || {}) as Record<string, any>
    const updatedMeta = {
      ...currentMeta,
      ...(stage === 1 ? { follow_up_1_sent_at: nowIso } : { follow_up_final_sent_at: nowIso, follow_up_2_sent_at: nowIso }),
    }

    // Optimistic local state update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? ({ ...l, scraped_metadata: updatedMeta as any } as OutreachLead) : l))
    )

    triggerToast(
      stage === 1
        ? '✓ Follow-Up 1 marked sent. Cadence moved to Day 5 countdown.'
        : '✓ Final Takeaway marked sent. Postcode territory released.'
    )

    // Background DB persistence
    try {
      const { error } = await supabase
        .from('leads')
        .update({ scraped_metadata: updatedMeta })
        .eq('id', leadId)
      if (error) throw error
      loadFiltersAndCounts()
    } catch (err: any) {
      triggerToast(`Update failed: ${err.message}`)
      fetchLeads()
    }
  }



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

  // OPTIMISTIC Status Update (0ms UI latency) with In-Session Retention option
  const handleUpdateLeadStatus = async (id: string, status: string, retainInCurrentView = false) => {
    const targetLead = leads.find(l => l.id === id)
    // 1. Instant local update
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (outreachLead?.id === id) {
      setOutreachLead(prev => prev ? { ...prev, status } : null)
    }

    // If retaining in session (e.g. after outreach launch), record ID so lead doesn't vanish
    if (retainInCurrentView || status === 'Contacted') {
      setContactedInSessionIds(prev => {
        const next = new Set(prev)
        next.add(id)
        return next
      })
    }

    // 2. Feedback message & Gamified Revenue Won Modal
    if (status === 'Won') {
      triggerToast('🟢 Deal marked as WON! Revenue & Retainer unlocked.')
      setWonDeal({ businessName: targetLead?.business_name || targetLead?.name || 'New Client' })
    } else if (status === 'Lost') {
      triggerToast('🔴 Lead marked as Lost.')
    } else if (status === 'Contacted') {
      triggerToast('🟡 Marked as Contacted. Lead kept visible so you can assess their site.')
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

      if (status === 'STOP' && targetLead?.phone) {
        try {
          await supabase
            .from('suppressed_contacts')
            .upsert({
              phone: targetLead.phone.trim(),
              reason: 'Requested STOP / opt-out in admin',
              source: 'admin_leads_status_change',
            })
        } catch {
          // ignore if table migration pending
        }
      }

      loadFiltersAndCounts()
    } catch (err: any) {
      triggerToast(`Update failed: ${err.message}`)
      fetchLeads()
    }
  }

  // 1-Click Refresh that flushes in-session retained leads into the contacted ledger
  const handleManualRefresh = async () => {
    setContactedInSessionIds(new Set())
    await fetchLeads()
    triggerToast('🔄 Dashboard refreshed. Contacted leads moved to ledger.')
  }

  // Direct 1-Click WhatsApp action (Deterministic Phone Verification)
  const handleQuickWhatsApp = (lead: Lead) => {
    const phoneInfo = classifyPhoneNumber(lead.phone)
    if (!phoneInfo.isWhatsAppViable) {
      triggerToast(`☎️ UK Landline (${phoneInfo.displayNational}). Standard WhatsApp is unavailable. Use Call Office.`)
      return
    }

    const waUrl = buildWhatsAppOpenerUrl(lead.phone, lead.business_name || lead.name, lead.name)
    if (!waUrl) {
      triggerToast('No valid WhatsApp number.')
      return
    }
    window.open(waUrl, '_blank')

    if (lead.status === 'New') {
      // Crucial: retain in current view so operator can inspect site!
      handleUpdateLeadStatus(lead.id, 'Contacted', true)
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

    // Note: statusFilter is applied client-side in displayedLeads for instant 0ms switching without cache distortion
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
      setQueueFilter('all')
    }
  }, [searchParams])

  useEffect(() => {
    setSelectedIds([])
  }, [activeTab, search, statusFilter, serviceFilter, sourceFilter, queueFilter])

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 300)
    return () => clearTimeout(timer)
  }, [fetchLeads])

  // Extract clean distinct sub-categories / niches from the loaded dataset
  const availableTrades = useMemo(() => {
    const counts: Record<string, number> = {}
    leads.forEach((l) => {
      const raw = l.local_business_niche || l.scraped_metadata?.trade || 'Accountant'
      const clean = (!raw || raw.length > 25 || raw.startsWith('Hi ') || raw.toLowerCase().includes('came across')) ? 'Accountant' : raw.trim()
      counts[clean] = (counts[clean] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [leads])

  // Queue & Quick Filter Counts Computation
  const filterCounts = useMemo(() => {
    let freshNew = 0
    let contacted = 0
    let readyToWhatsApp = 0
    let landlines = 0
    let activePipeline = 0
    let needsReview = 0
    let dueFollowUpNow = 0
    let dueFu1 = 0
    let dueFu2 = 0
    let coolingDown = 0

    leads.forEach((l) => {
      const phoneInfo = classifyPhoneNumber(l.phone)
      const pathway = getLeadPathway(l)

      const cadence = getLeadFollowUpCadence(l)

      if (l.status === 'New') {
        freshNew++
        if (phoneInfo.isWhatsAppViable) readyToWhatsApp++
      }
      if (l.status === 'Contacted') {
        contacted++
        if (cadence.isDueNow) dueFollowUpNow++
        if (cadence.stage === 'due_fu1') dueFu1++
        if (cadence.stage === 'due_fu2') dueFu2++
        if (cadence.stage === 'cooling_down') coolingDown++
      }
      if (phoneInfo.type === 'uk_landline') {
        landlines++
      }
      if (['Call Booked', 'Proposal Sent', 'Won'].includes(l.status)) {
        activePipeline++
      }
      if (pathway === 'NEEDS_REVIEW' || phoneInfo.type === 'invalid' || (!l.phone && !l.website)) {
        needsReview++
      }
    })

    const todaysQueueCount = Math.min(
      10,
      leads.filter((l) => l.status === 'New' || l.status === 'Review requested').length
    )

    return {
      total: leads.length,
      todaysQueue: todaysQueueCount,
      freshNew,
      contacted,
      readyToWhatsApp,
      landlines,
      activePipeline,
      needsReview,
      dueFollowUpNow,
      dueFu1,
      dueFu2,
      coolingDown,
    }
  }, [leads])

  // Filtered Leads by Action Queue, Quick Filter, Sub-category, and Directional Sorting
  const displayedLeads = useMemo(() => {
    let list = leads

    if (activeTab === 'active') {
      // Status filter from Motion Stats Grid (Fresh Leads, Contacted, Won, Lost, etc.)
      if (statusFilter.length > 0) {
        list = list.filter((l) => statusFilter.includes(l.status))
      }

      // 1. Direct Quick Filter (New Leads vs Contacted Leads vs Pipeline)
      if (quickFilter === 'new') {
        list = list.filter((l) => l.status === 'New' || contactedInSessionIds.has(l.id))
      } else if (quickFilter === 'follow_up') {
        list = list.filter((l) => {
          if (l.status !== 'Contacted') return false
          const cadence = getLeadFollowUpCadence(l)
          if (followUpSubFilter === 'due_fu1') return cadence.stage === 'due_fu1'
          if (followUpSubFilter === 'due_fu2') return cadence.stage === 'due_fu2'
          if (followUpSubFilter === 'cooling_down') return cadence.stage === 'cooling_down'
          return cadence.isDueNow
        })
      } else if (quickFilter === 'contacted') {
        list = list.filter((l) => l.status === 'Contacted')
        if (followUpSubFilter === 'due_fu1') {
          list = list.filter((l) => getLeadFollowUpCadence(l).stage === 'due_fu1')
        } else if (followUpSubFilter === 'due_fu2') {
          list = list.filter((l) => getLeadFollowUpCadence(l).stage === 'due_fu2')
        } else if (followUpSubFilter === 'cooling_down') {
          list = list.filter((l) => getLeadFollowUpCadence(l).stage === 'cooling_down')
        }
      } else if (quickFilter === 'pipeline') {
        list = list.filter((l) => ['Call Booked', 'Proposal Sent', 'Won'].includes(l.status))
      } else if (quickFilter === 'landlines') {
        list = list.filter((l) => classifyPhoneNumber(l.phone).type === 'uk_landline')
      } else if (quickFilter === 'needs_review') {
        list = list.filter((l) => {
          const pathway = getLeadPathway(l)
          const phoneInfo = classifyPhoneNumber(l.phone)
          return pathway === 'NEEDS_REVIEW' || phoneInfo.type === 'invalid' || (!l.phone && !l.website)
        })
      } else {
        // 2. Action Queue Filter (when quickFilter === 'all')
        if (queueFilter === 'todays_queue') {
          list = list
            .filter((l) => l.status === 'New' || l.status === 'Review requested' || contactedInSessionIds.has(l.id))
            .sort((a, b) => {
              const gradeOrder: Record<string, number> = { A: 1, B: 2, C: 3, 'Hold: nothing verified': 4 }
              const gradeA = (a.scraped_metadata?.grade as string) || (a.scraped_metadata?.audit_analysis?.grade as string) || 'B'
              const gradeB = (b.scraped_metadata?.grade as string) || (b.scraped_metadata?.audit_analysis?.grade as string) || 'B'
              const rankA = gradeOrder[gradeA] || 3
              const rankB = gradeOrder[gradeB] || 3
              return rankA - rankB
            })
            .slice(0, 10)
        } else if (queueFilter === 'ready_to_whatsapp') {
          list = list.filter((l) => {
            if (contactedInSessionIds.has(l.id)) return true // Keep visible in active session!
            const phoneInfo = classifyPhoneNumber(l.phone)
            return l.status === 'New' && phoneInfo.isWhatsAppViable
          })
        } else if (queueFilter === 'due_followup') {
          list = list.filter((l) => {
            if (l.status !== 'Contacted') return false
            const cadence = getLeadFollowUpCadence(l)
            if (followUpSubFilter === 'due_fu1') return cadence.stage === 'due_fu1'
            if (followUpSubFilter === 'due_fu2') return cadence.stage === 'due_fu2'
            if (followUpSubFilter === 'cooling_down') return cadence.stage === 'cooling_down'
            return true
          })
        } else if (queueFilter === 'active_pipeline') {
          list = list.filter((l) => ['Call Booked', 'Proposal Sent'].includes(l.status))
        } else if (queueFilter === 'needs_review') {
          list = list.filter((l) => {
            const pathway = getLeadPathway(l)
            const phoneInfo = classifyPhoneNumber(l.phone)
            return pathway === 'NEEDS_REVIEW' || phoneInfo.type === 'invalid' || (!l.phone && !l.website)
          })
        }
      }
    }

    // 3. Sub-Category / Trade Filter
    if (tradeFilter !== 'All') {
      list = list.filter((l) => {
        const raw = l.local_business_niche || l.scraped_metadata?.trade || 'Accountant'
        const clean = (!raw || raw.length > 25 || raw.startsWith('Hi ') || raw.toLowerCase().includes('came across')) ? 'Accountant' : raw.trim()
        return clean.toLowerCase() === tradeFilter.toLowerCase()
      })
    }

    // 4. Directional Sorting ("Latest to Last" / Chronological & Attributes)
    list = [...list].sort((a, b) => {
      let comparison = 0

      if (sortBy === 'created_at') {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        comparison = dateB - dateA // default: latest (newest) first
      } else if (sortBy === 'rating') {
        const ratingA = Number(a.scraped_metadata?.rating || 0)
        const ratingB = Number(b.scraped_metadata?.rating || 0)
        comparison = ratingB - ratingA
      } else if (sortBy === 'reviews') {
        const revA = Number(a.scraped_metadata?.reviews_count || (a.scraped_metadata as any)?.reviews || 0)
        const revB = Number(b.scraped_metadata?.reviews_count || (b.scraped_metadata as any)?.reviews || 0)
        comparison = revB - revA
      } else if (sortBy === 'name') {
        const nameA = (a.business_name || a.name || '').toLowerCase()
        const nameB = (b.business_name || b.name || '').toLowerCase()
        comparison = nameA.localeCompare(nameB)
      } else if (sortBy === 'trade') {
        const tradeA = (a.local_business_niche || a.scraped_metadata?.trade || '').toLowerCase()
        const tradeB = (b.local_business_niche || b.scraped_metadata?.trade || '').toLowerCase()
        comparison = tradeA.localeCompare(tradeB)
      }

      // If sortDirection is 'asc', flip the result (Latest to Last -> Oldest first!)
      return sortDirection === 'asc' ? -comparison : comparison
    })

    return list
  }, [leads, queueFilter, quickFilter, followUpSubFilter, tradeFilter, sortBy, sortDirection, activeTab, contactedInSessionIds])

  const toggleStatus = (s: string) => {
    setStatusFilter((prev) => {
      const next = prev.includes(s) ? prev.filter((x) => x !== s) : [s]
      if (next.length > 0) {
        setQueueFilter('all')
        setQuickFilter('all')
      }
      return next
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(displayedLeads.map((l) => l.id))
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

  const handleBulkMarkFollowUp = async (stage: 1 | 2) => {
    if (selectedIds.length === 0) return
    setLoading(true)
    const nowIso = new Date().toISOString()
    try {
      const targets = leads.filter((l) => selectedIds.includes(l.id))
      for (const t of targets) {
        const currentMeta = (t.scraped_metadata || {}) as Record<string, any>
        const updatedMeta = {
          ...currentMeta,
          ...(stage === 1 ? { follow_up_1_sent_at: nowIso } : { follow_up_final_sent_at: nowIso, follow_up_2_sent_at: nowIso }),
        }
        await supabase.from('leads').update({ scraped_metadata: updatedMeta }).eq('id', t.id)
      }
      triggerToast(`✓ Marked Follow-Up ${stage} sent for ${selectedIds.length} practices!`)
      setSelectedIds([])
      fetchLeads()
    } catch (err: any) {
      triggerToast(`Bulk follow-up failed: ${err.message}`)
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

  const getCardBorderClass = (status: string) => {
    if (status === 'Won') {
      return 'card-depth border-emerald-500/35 hover:border-emerald-500/55'
    }
    return 'card-depth'
  }

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

      {/* Header (Clean Executive Typography) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Lead Outreach Ledger</h1>
          <p className="text-sm text-zinc-400">
            Execute verified WhatsApp outreach, build instant digital storefront prototypes, and close local business clients.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
          <button
            onClick={() => setIsSprintOpen(true)}
            disabled={displayedLeads.length === 0}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed ${
              selectedIds.length > 0
                ? 'bg-amber-400 text-black border-amber-400 shadow-amber-400/20'
                : 'bg-amber-400/15 border-amber-400/30 text-amber-300 hover:bg-amber-400/25'
            }`}
            title="Start sequential outreach sprint through current queue"
          >
            <Zap size={14} className={selectedIds.length > 0 ? 'text-black' : 'text-amber-400'} />
            <span>
              {selectedIds.length > 0
                ? `Sprint Selected (${selectedIds.length})`
                : `Sprint (${displayedLeads.length})`}
            </span>
          </button>
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

      {/* Motion Stats Grid */}
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
              className={`p-4 sm:p-5 flex flex-col justify-between text-left transition-all cursor-pointer card-depth relative group min-h-[120px] ${
                isSelected ? 'card-depth-active' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-1 w-full">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium truncate">
                  {item.label}
                </span>
                <div className={`w-7 h-7 rounded-xl ${item.iconBg} border border-white/10 flex items-center justify-center shrink-0 ${item.iconColor} group-hover:scale-105 transition-transform`}>
                  <Icon size={13} />
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

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* EXECUTIVE FOLLOW-UP CADENCE RADAR (Prominently visible on top)             */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#141417] to-amber-500/5 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg backdrop-blur-sm animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
            <Clock size={20} className="text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">Follow-Up Cadence Hub</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse">
                {filterCounts.dueFollowUpNow} Due Today
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              <span className="text-amber-300 font-semibold">{filterCounts.dueFu1} practices</span> past 48h window • <span className="text-sky-300 font-semibold">{filterCounts.coolingDown} practices</span> cooling (&lt;48h) • Strict territory exclusivity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto flex-wrap">
          <button
            onClick={() => {
              setQuickFilter('follow_up')
              setFollowUpSubFilter('due_fu1')
              setStatusFilter([])
              setQueueFilter('all')
            }}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
              quickFilter === 'follow_up' && followUpSubFilter === 'due_fu1'
                ? 'bg-amber-400 text-black shadow-amber-400/20'
                : 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40'
            }`}
          >
            <Sparkles size={13} />
            <span>Review {filterCounts.dueFollowUpNow} Due Follow-Ups</span>
          </button>
          <button
            onClick={() => {
              setQuickFilter('follow_up')
              setFollowUpSubFilter('cooling_down')
              setStatusFilter([])
              setQueueFilter('all')
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              quickFilter === 'follow_up' && followUpSubFilter === 'cooling_down'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10'
            }`}
          >
            <span>Cooling Down ({filterCounts.coolingDown})</span>
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 1. IN-SESSION RETENTION BANNER (Keeps contacted leads accessible)          */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {contactedInSessionIds.size > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Zap size={16} />
            </div>
            <div>
              <p className="font-bold text-white text-xs">
                {contactedInSessionIds.size} lead{contactedInSessionIds.size > 1 ? 's' : ''} contacted during this session
              </p>
              <p className="text-[11px] text-amber-300/80">
                Kept visible in this view so you can re-assess their site and dossier. They will cleanly move to Contacted once you refresh.
              </p>
            </div>
          </div>
          <button
            onClick={handleManualRefresh}
            className="px-3.5 py-1.5 rounded-xl bg-[#DAA640] hover:bg-[#F5D90A] text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0 self-end sm:self-center active:scale-95"
          >
            <RefreshCw size={12} />
            <span>Refresh Dashboard</span>
          </button>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 2. DEDICATED 1-CLICK QUICK FILTER BAR (New vs Contacted vs Pipeline)       */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'active' && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 touch-pan-x">
            <button
              onClick={() => { setQuickFilter('all'); setStatusFilter([]); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                quickFilter === 'all' && statusFilter.length === 0
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Inbox size={13} />
              <span>All Leads</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${quickFilter === 'all' ? 'bg-black/15 text-black' : 'bg-white/5 text-zinc-400'}`}>
                {filterCounts.total}
              </span>
            </button>

            <button
              onClick={() => { setQuickFilter('new'); setStatusFilter([]); setQueueFilter('all'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                quickFilter === 'new'
                  ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                  : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Zap size={13} className={quickFilter === 'new' ? 'text-black' : 'text-amber-400'} />
              <span>New Leads</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${quickFilter === 'new' ? 'bg-black/20 text-black' : 'bg-amber-400/10 text-amber-400'}`}>
                {filterCounts.freshNew}
              </span>
            </button>

            <button
              onClick={() => { setQuickFilter('follow_up'); setFollowUpSubFilter('due_fu1'); setStatusFilter([]); setQueueFilter('all'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                quickFilter === 'follow_up'
                  ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                  : 'bg-[#141417] text-amber-300 hover:text-amber-200 border border-amber-400/30'
              }`}
            >
              <Clock size={13} className={quickFilter === 'follow_up' ? 'text-black' : 'text-amber-400'} />
              <span>Due Follow-Ups</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${quickFilter === 'follow_up' ? 'bg-black/20 text-black' : 'bg-amber-400/20 text-amber-300'}`}>
                {filterCounts.dueFollowUpNow} Due
              </span>
            </button>

            <button
              onClick={() => { setQuickFilter('contacted'); setStatusFilter([]); setQueueFilter('all'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                quickFilter === 'contacted'
                  ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                  : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <MessageSquare size={13} className={quickFilter === 'contacted' ? 'text-black' : 'text-amber-400'} />
              <span>Contacted Leads</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${quickFilter === 'contacted' ? 'bg-black/20 text-black' : 'bg-amber-400/10 text-amber-400'}`}>
                {filterCounts.contacted}
              </span>
            </button>

            <button
              onClick={() => { setQuickFilter('pipeline'); setStatusFilter([]); setQueueFilter('all'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                quickFilter === 'pipeline'
                  ? 'bg-emerald-400 text-black font-bold shadow-md shadow-emerald-400/20'
                  : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Trophy size={13} className={quickFilter === 'pipeline' ? 'text-black' : 'text-emerald-400'} />
              <span>Active Pipeline</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${quickFilter === 'pipeline' ? 'bg-black/20 text-black' : 'bg-emerald-400/10 text-emerald-400'}`}>
                {filterCounts.activePipeline}
              </span>
            </button>

            <button
              onClick={() => { setQuickFilter('landlines'); setStatusFilter([]); setQueueFilter('all'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                quickFilter === 'landlines'
                  ? 'bg-sky-400 text-black font-bold shadow-md shadow-sky-400/20'
                  : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Phone size={13} className={quickFilter === 'landlines' ? 'text-black' : 'text-sky-400'} />
              <span>Office Landlines</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${quickFilter === 'landlines' ? 'bg-black/20 text-black' : 'bg-sky-400/10 text-sky-400'}`}>
                {filterCounts.landlines}
              </span>
            </button>
          </div>

          {/* Micro Queue Strip */}
          <div className="p-1.5 rounded-2xl bg-[#0B0B0D] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
              {[
                {
                  id: 'todays_queue',
                  label: "Today's Queue (Top 10 A/B)",
                  icon: Sparkles,
                  count: filterCounts.todaysQueue,
                  highlight: true,
                },
                {
                  id: 'ready_to_whatsapp',
                  label: 'Ready to WhatsApp',
                  icon: Zap,
                  count: filterCounts.readyToWhatsApp,
                  highlight: false,
                },
                {
                  id: 'due_followup',
                  label: 'Due Follow-Up',
                  icon: Clock,
                  count: filterCounts.dueFollowUpNow > 0 ? `${filterCounts.dueFollowUpNow} Due` : filterCounts.contacted,
                  highlight: filterCounts.dueFollowUpNow > 0,
                },
                {
                  id: 'active_pipeline',
                  label: 'Booked & Proposals',
                  icon: Calendar,
                  count: filterCounts.activePipeline,
                  highlight: false,
                },
                {
                  id: 'needs_review',
                  label: 'Needs Review',
                  icon: AlertTriangle,
                  count: filterCounts.needsReview,
                  highlight: false,
                },
                {
                  id: 'all',
                  label: 'All Queue Leads',
                  icon: Inbox,
                  count: filterCounts.total,
                  highlight: false,
                },
              ].map((q) => {
                const isActive = queueFilter === q.id && statusFilter.length === 0 && quickFilter === 'all'
                const Icon = q.icon
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setQueueFilter(q.id as ActionQueue)
                      setQuickFilter('all')
                      setStatusFilter([])
                    }}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? q.highlight
                          ? 'text-amber-300 font-bold bg-amber-400/15 border border-amber-400/30 shadow-sm'
                          : 'text-white font-bold bg-[#141417] border border-white/20 shadow-sm'
                        : q.highlight
                        ? 'text-amber-400 hover:text-amber-300 hover:bg-white/5'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={12} className={isActive ? (q.highlight ? 'text-amber-300' : 'text-[#DAA640]') : 'text-zinc-500'} />
                    <span>{q.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? q.highlight
                            ? 'bg-amber-400/25 text-amber-200 font-bold'
                            : 'bg-white/10 text-white font-bold'
                          : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {q.count}
                    </span>
                  </button>
                )
              })}
            </div>

            <span className="text-[11px] text-zinc-400 font-mono px-3 hidden lg:inline shrink-0">
              {displayedLeads.length} leads in queue
            </span>
          </div>

          {/* Dedicated Follow-Up Cadence Sub-Filter Bar */}
          {(quickFilter === 'contacted' || quickFilter === 'follow_up' || queueFilter === 'due_followup') && (
            <div className="p-2.5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 flex flex-wrap items-center justify-between gap-2 animate-fade-in">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 px-2 font-mono uppercase tracking-wider">
                  <Clock size={13} /> Follow-Up Cadence:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setFollowUpSubFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      followUpSubFilter === 'all'
                        ? 'bg-amber-400 text-black font-bold shadow-sm'
                        : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    All Contacted ({filterCounts.contacted})
                  </button>
                  <button
                    onClick={() => setFollowUpSubFilter('due_fu1')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      followUpSubFilter === 'due_fu1'
                        ? 'bg-amber-400 text-black font-bold shadow-sm'
                        : 'bg-[#141417] text-amber-300 hover:text-amber-200 border border-amber-400/30'
                    }`}
                  >
                    <Sparkles size={11} className={followUpSubFilter === 'due_fu1' ? 'text-black' : 'text-amber-400'} />
                    <span>Due Follow-Up 1 (48h+)</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${followUpSubFilter === 'due_fu1' ? 'bg-black/20 text-black' : 'bg-amber-400/20 text-amber-300'}`}>
                      {filterCounts.dueFu1}
                    </span>
                  </button>
                  <button
                    onClick={() => setFollowUpSubFilter('due_fu2')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      followUpSubFilter === 'due_fu2'
                        ? 'bg-rose-500 text-white font-bold shadow-sm'
                        : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    <Clock size={11} />
                    <span>Due Final Close (Day 5+)</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${followUpSubFilter === 'due_fu2' ? 'bg-black/20 text-white' : 'bg-white/5 text-zinc-400'}`}>
                      {filterCounts.dueFu2}
                    </span>
                  </button>
                  <button
                    onClick={() => setFollowUpSubFilter('cooling_down')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      followUpSubFilter === 'cooling_down'
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'bg-[#141417] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>Cooling Down (&lt;48h)</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${followUpSubFilter === 'cooling_down' ? 'bg-black/20 text-black' : 'bg-white/5 text-zinc-400'}`}>
                      {filterCounts.coolingDown}
                    </span>
                  </button>
                </div>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 hidden xl:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{filterCounts.dueFollowUpNow} lead{filterCounts.dueFollowUpNow === 1 ? '' : 's'} require outreach action today</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabs Menu (Active / Archived / Spam) */}
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

      {/* Toolbar & Sub-Category / Sort Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search business name, phone, trade, postcode…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0B0B0D] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-500 outline-none transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sub-Category / Trade Filter Dropdown */}
        <div className="flex items-center gap-1.5">
          <select
            value={tradeFilter}
            onChange={(e) => setTradeFilter(e.target.value)}
            className="px-3 py-2 bg-[#0B0B0D] border border-white/10 hover:border-white/20 focus:border-[#DAA640]/50 rounded-xl text-xs font-medium text-white outline-none cursor-pointer [color-scheme:dark] transition-all"
            title="Filter by Sub-Category / Trade"
          >
            <option value="All" className="bg-[#141417] text-white">All Sub-Categories ({leads.length})</option>
            {availableTrades.map(([trade, count]) => (
              <option key={trade} value={trade} className="bg-[#141417] text-white">
                {trade} ({count})
              </option>
            ))}
          </select>
        </div>

        {/* Sort Controls (Latest to Last / Direction Toggle) */}
        <div className="flex items-center gap-1 bg-[#0B0B0D] p-1 rounded-xl border border-white/10">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs text-zinc-300 font-medium px-2 py-1 outline-none cursor-pointer [color-scheme:dark]"
            title="Sort leads by attribute"
          >
            <option value="created_at" className="bg-[#141417] text-white">Date Added</option>
            <option value="rating" className="bg-[#141417] text-white">Rating</option>
            <option value="reviews" className="bg-[#141417] text-white">Reviews</option>
            <option value="name" className="bg-[#141417] text-white">Name</option>
            <option value="trade" className="bg-[#141417] text-white">Sub-Category</option>
          </select>

          <button
            onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 flex items-center gap-1 transition-all cursor-pointer"
            title={sortDirection === 'desc' ? 'Currently sorting Latest First. Click for Oldest First (FIFO).' : 'Currently sorting Oldest First. Click for Latest First.'}
          >
            <ArrowUpDown size={12} className="text-[#DAA640]" />
            <span className="hidden sm:inline">{sortDirection === 'desc' ? 'Latest to Last' : 'Oldest to Latest'}</span>
            <span className="sm:hidden">{sortDirection === 'desc' ? 'Latest' : 'Oldest'}</span>
          </button>
        </div>

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
      {/* VIEW 1: DEAL CARDS GRID VIEW                                              */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {viewMode === 'cards' && activeTab === 'active' ? (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[#0B0B0D] border border-white/5 animate-pulse p-6" />
            ))}
          </div>
        ) : displayedLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6 space-y-4 max-w-md mx-auto rounded-2xl bg-[#0B0B0D] border border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-400">
              <Inbox size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">No Leads in this Queue</h3>
            <p className="text-xs text-zinc-400">
              Adjust your search or select another operational queue above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* ── CARD SELECTION TOOLBAR ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 px-4 rounded-2xl bg-[#0B0B0D] border border-white/10 text-xs shadow-sm">
              <label className="flex items-center gap-2.5 cursor-pointer font-medium text-zinc-300 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={selectedIds.length === displayedLeads.length && displayedLeads.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 accent-[#DAA640] rounded border-white/20 bg-[#141417] text-[#DAA640] focus:ring-0 cursor-pointer"
                />
                <span>
                  {selectedIds.length === displayedLeads.length && displayedLeads.length > 0
                    ? `All ${displayedLeads.length} leads selected`
                    : `Select all ${displayedLeads.length} leads in this view`}
                </span>
              </label>

              {selectedIds.length > 0 && (
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-amber-400 font-mono font-bold text-[11px] bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/25">
                    {selectedIds.length} of ${displayedLeads.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="text-zinc-400 hover:text-white underline text-xs cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {displayedLeads.map((lead) => {
              const businessName = lead.business_name || lead.name
              const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Accountant'
              const trade = (!rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')) ? 'Accountant' : rawTrade
              const rawWebsite = (lead.website || '').trim()
              const hasWebsite = rawWebsite !== '' && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE' && !rawWebsite.toLowerCase().includes('facebook.com') && !rawWebsite.toLowerCase().includes('instagram.com')
              
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

              const phoneInfo = classifyPhoneNumber(lead.phone)
              const telUrl = buildTelUrl(lead.phone)
              const isRetainedInSession = contactedInSessionIds.has(lead.id)

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

              const isChecked = selectedIds.includes(lead.id)

              return (
                <div
                  key={lead.id}
                  className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 group relative ${
                    isChecked
                      ? 'border-amber-400/70 bg-[#16161d] shadow-lg shadow-amber-400/5'
                      : getCardBorderClass(lead.status)
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            e.stopPropagation()
                            handleSelectRow(lead.id, e.target.checked)
                          }}
                          className="w-4 h-4 accent-[#DAA640] rounded border-white/20 bg-[#141417] text-[#DAA640] focus:ring-0 cursor-pointer shrink-0"
                          title="Select lead"
                        />
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

                      {isRetainedInSession ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30 shrink-0 shadow-sm animate-pulse">
                          <CheckCheck size={11} className="text-amber-400" />
                          <span>Contacted (Active)</span>
                        </span>
                      ) : (
                        <StatusBadge status={lead.status} />
                      )}
                    </div>

                    {/* Primary Evidence & Grade Verdict */}
                    {(() => {
                      const grade = (lead.scraped_metadata?.grade as string) || (lead.scraped_metadata?.audit_analysis?.grade as string) || 'B'
                      const primaryFriction =
                        lead.scraped_metadata?.audit_analysis?.primaryAngle?.title ||
                        lead.friction_found ||
                        (hasWebsite ? 'Enquiry-to-Client Response Speed' : 'No Website Direct Booking Gap')
                      const layer = lead.scraped_metadata?.audit_analysis?.primaryAngle?.layer || (hasWebsite ? 'process' : 'site')

                      const gradeBadgeBg =
                        grade === 'A'
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : grade === 'B'
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                          : grade === 'Hold: nothing verified'
                          ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                          : 'bg-zinc-500/15 border-zinc-500/30 text-zinc-300'

                      return (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-semibold bg-[#121217] border border-white/10 px-2.5 py-1.5 rounded-xl">
                            <span className="flex items-center gap-1.5 truncate text-zinc-200">
                              <Sparkles size={11} className="text-[#DCAE53] shrink-0" />
                              <span className="truncate">{primaryFriction}</span>
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${gradeBadgeBg}`}>
                              Grade {grade}
                            </span>
                          </div>
                          <div className="flex items-center justify-between px-1 text-[10px] font-mono text-zinc-400">
                            <span className="capitalize">{layer} layer opportunity</span>
                            <span>Single-source verified</span>
                          </div>
                        </div>
                      )
                    })()}

                    {/* Storefront Presence */}
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

                    {/* Contact Info */}
                    <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 font-mono text-zinc-300 font-medium">
                            <Phone size={12} className={phoneInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'} />
                            {phoneInfo.displayNational}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-medium ${
                              phoneInfo.isWhatsAppViable
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : phoneInfo.type === 'uk_landline'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                : 'bg-white/5 text-zinc-400'
                            }`}
                          >
                            {phoneInfo.badgeText}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {telUrl && (
                            <a
                              href={telUrl}
                              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] font-medium border border-white/10 flex items-center gap-1 transition-all"
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

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenOutreach(lead)}
                      className="flex-1 min-h-[38px] py-2 px-3 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#141417] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
                    >
                      <Sparkles size={13} />
                      <span>Outreach</span>
                    </button>

                    {phoneInfo.isWhatsAppViable ? (
                      <button
                        onClick={() => handleQuickWhatsApp(lead)}
                        className="py-2 px-3 min-h-[38px] rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                        title="1-Click WhatsApp Opener (Verified Mobile)"
                      >
                        <MessageSquare size={13} className="text-emerald-400" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    ) : telUrl ? (
                      <a
                        href={telUrl}
                        className="py-2 px-3 min-h-[38px] rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                        title="Direct Call to Landline Office"
                      >
                        <Phone size={13} className="text-sky-400" />
                        <span className="hidden sm:inline">Call Office</span>
                      </a>
                    ) : (
                      <div className="py-2 px-2 text-[10px] text-zinc-500 font-mono">
                        No Direct Line
                      </div>
                    )}

                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="min-h-[38px] min-w-[38px] py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Open Lead Dossier"
                    >
                      <ArrowUpRight size={13} />
                      <span className="hidden xl:inline">Open</span>
                    </Link>

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
                        <DropdownMenuItem asChild className="cursor-pointer text-xs flex items-center gap-2 focus:bg-white/10 focus:text-white">
                          <Link href={`/admin/leads/${lead.id}`}>
                            <Info size={12} className="text-zinc-400" />
                            <span>Open Dossier</span>
                          </Link>
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
                    {/* Tailored Follow-Up Sequences Drawer for Contacted Leads */}
                    {(lead.status === 'Contacted' || isRetainedInSession) && (() => {
                      const followUps = getLeadFollowUps(lead)
                      const cadence = getLeadFollowUpCadence(lead)
                      const isExpanded = expandedFollowUpIds.has(lead.id) || quickFilter === 'contacted'
                      return (
                        <div className="mt-3.5 pt-3 border-t border-amber-500/20 bg-amber-500/[0.03] -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 sm:p-5 rounded-b-2xl space-y-3">
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => toggleFollowUpExpanded(lead.id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                            >
                              <Clock size={12} className="text-amber-400" />
                              <span>Tailored Follow-Ups</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 ml-1">
                                2 Ready
                              </span>
                              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                            <span className="text-[10px] font-mono text-zinc-400">
                              48h & Day 5
                            </span>
                          </div>

                          {isExpanded && (
                            <div className="space-y-2.5 pt-1">
                              {/* Follow-Up 1 */}
                              <div className={`p-3 rounded-xl bg-black/60 border transition-all space-y-1.5 ${
                                cadence.stage === 'due_fu1'
                                  ? 'border-amber-400/50 shadow-sm shadow-amber-400/10'
                                  : 'border-white/5'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono font-bold text-amber-400/90 uppercase flex items-center gap-1">
                                      <Sparkles size={10} className="text-amber-400" /> Follow-Up 1 (48h Value Check-in):
                                    </span>
                                    {cadence.stage === 'due_fu1' && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                        DUE NOW
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleMarkFollowUpSent(lead.id, 1)}
                                      className="px-2 py-0.5 rounded bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                                      title="Mark Follow-Up 1 as Sent"
                                    >
                                      <CheckCheck size={10} className="text-amber-400" />
                                      <span>Mark Sent</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyFollowUp(`fu1-${lead.id}`, followUps.fu1)}
                                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                                      title="Copy Follow-Up 1"
                                    >
                                      {copiedFollowUpId === `fu1-${lead.id}` ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                                      <span>{copiedFollowUpId === `fu1-${lead.id}` ? 'Copied' : 'Copy'}</span>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap">
                                  {followUps.fu1}
                                </p>
                                <div className="flex items-center justify-end gap-3 pt-1">
                                  {phoneInfo.isWhatsAppViable && (
                                    <a
                                      href={`https://wa.me/${phoneInfo.cleanDigits || lead.phone}?text=${encodeURIComponent(followUps.fu1)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                                    >
                                      <MessageSquare size={10} /> Send via WhatsApp
                                    </a>
                                  )}
                                  {lead.email && (
                                    <a
                                      href={`mailto:${lead.email}?subject=${encodeURIComponent(`Follow-up for ${businessName}`)}&body=${encodeURIComponent(followUps.fu1)}`}
                                      className="text-[10px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                                    >
                                      <Mail size={10} /> Send via Email
                                    </a>
                                  )}
                                </div>
                              </div>

                              {/* Follow-Up 2 */}
                              <div className={`p-3 rounded-xl bg-black/60 border transition-all space-y-1.5 ${
                                cadence.stage === 'due_fu2'
                                  ? 'border-rose-500/50 shadow-sm shadow-rose-500/10'
                                  : 'border-white/5'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono font-bold text-sky-400/90 uppercase flex items-center gap-1">
                                      <Clock size={10} className="text-sky-400" /> Follow-Up 2 (Day 5 Takeaway Close):
                                    </span>
                                    {cadence.stage === 'due_fu2' && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                        DUE NOW
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleMarkFollowUpSent(lead.id, 2)}
                                      className="px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                                      title="Mark Final Takeaway as Sent"
                                    >
                                      <CheckCheck size={10} className="text-rose-400" />
                                      <span>Mark Sent</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyFollowUp(`fu2-${lead.id}`, followUps.fu2)}
                                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                                      title="Copy Follow-Up 2"
                                    >
                                      {copiedFollowUpId === `fu2-${lead.id}` ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                                      <span>{copiedFollowUpId === `fu2-${lead.id}` ? 'Copied' : 'Copy'}</span>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap">
                                  {followUps.fu2}
                                </p>
                                <div className="flex items-center justify-end gap-3 pt-1">
                                  {phoneInfo.isWhatsAppViable && (
                                    <a
                                      href={`https://wa.me/${phoneInfo.cleanDigits || lead.phone}?text=${encodeURIComponent(followUps.fu2)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                                    >
                                      <MessageSquare size={10} /> Send via WhatsApp
                                    </a>
                                  )}
                                  {lead.email && (
                                    <a
                                      href={`mailto:${lead.email}?subject=${encodeURIComponent(`Quick follow-up for ${businessName}`)}&body=${encodeURIComponent(followUps.fu2)}`}
                                      className="text-[10px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                                    >
                                      <Mail size={10} /> Send via Email
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })()}

                </div>
              )
            })}
            </div>
          </div>
        )
      ) : viewMode === 'kanban' && activeTab === 'active' ? (
        /* ───────────────────────────────────────────────────────────────────────── */
        /* VIEW 2: KANBAN BOARD VIEW (Now Action-Equipped)                           */
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

                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[520px] scrollbar-thin">
                    {columnLeads.map((lead) => {
                      const phoneInfo = classifyPhoneNumber(lead.phone)
                      const telUrl = buildTelUrl(lead.phone)
                      const isRetained = contactedInSessionIds.has(lead.id)

                      return (
                        <div
                          key={lead.id}
                          className="p-3 rounded-xl border border-white/5 bg-[#141417] hover:border-white/15 transition-all space-y-2.5"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <Link
                                href={`/admin/leads/${lead.id}`}
                                className="font-semibold text-xs text-white hover:text-[#DAA640] transition-colors line-clamp-1"
                              >
                                {lead.business_name || lead.name}
                              </Link>
                              {isRetained && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Contacted this session" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-0.5">
                              <span className="truncate font-mono">{phoneInfo.displayNational}</span>
                              <span className={`px-1 py-0.2 rounded text-[8px] font-mono shrink-0 ${phoneInfo.isWhatsAppViable ? 'text-emerald-400 bg-emerald-500/10' : 'text-sky-400 bg-sky-500/10'}`}>
                                {phoneInfo.isWhatsAppViable ? 'Mob' : 'Land'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 gap-1.5">
                            <button
                              onClick={() => handleOpenOutreach(lead)}
                              className="px-2 py-1 rounded bg-[#DCAE53] hover:bg-[#E5B85C] text-[#141417] text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Sparkles size={10} /> Pitch
                            </button>
                            {phoneInfo.isWhatsAppViable ? (
                              <button
                                onClick={() => handleQuickWhatsApp(lead)}
                                className="px-2 py-1 rounded bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <MessageSquare size={10} className="text-emerald-400" /> WhatsApp
                              </button>
                            ) : telUrl ? (
                              <a
                                href={telUrl}
                                className="px-2 py-1 rounded bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Phone size={10} className="text-sky-400" /> Call
                              </a>
                            ) : null}
                            <Link
                              href={`/admin/leads/${lead.id}`}
                              className="text-[10px] font-medium text-zinc-400 hover:text-white flex items-center gap-0.5 ml-auto"
                            >
                              <ArrowUpRight size={10} />
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ───────────────────────────────────────────────────────────────────────── */
        /* VIEW 3: DENSE DATA TABLE VIEW                                             */
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
                <h3 className="font-serif text-sm font-bold text-white">No Leads in this Queue</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Adjust your search or select another operational queue above.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
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
                    <th className="px-4 py-3.5 text-right min-w-[160px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {displayedLeads.map((lead) => {
                    const isChecked = selectedIds.includes(lead.id)
                    const isInspected = searchParams.get('leadId') === lead.id
                    const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Accountant'
                    const trade = (!rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')) ? 'Accountant' : rawTrade
                    const rawWebsite = lead.website
                    const hasWebsite = rawWebsite && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE'
                    const rating = lead.scraped_metadata?.rating ?? 5.0
                    const reviews = lead.scraped_metadata?.reviews_count ?? 0
                    
                    const phoneInfo = classifyPhoneNumber(lead.phone)
                    const telUrl = buildTelUrl(lead.phone)
                    const isRetained = contactedInSessionIds.has(lead.id)

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
                              <Link
                                href={`/admin/leads/${lead.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="font-semibold text-sm text-white hover:text-[#DAA640] transition-colors"
                              >
                                {lead.business_name || lead.name}
                              </Link>
                              {isRetained ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                                  <CheckCheck size={10} className="text-amber-400" /> CONTACTED
                                </span>
                              ) : lead.status === 'Won' ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400" /> WON
                                </span>
                              ) : null}
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

                        {/* Phone & Direct Outreach Channel */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-200">
                              <Phone size={11} className={phoneInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'} />
                              <span>{phoneInfo.displayNational}</span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                                  phoneInfo.isWhatsAppViable
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-sky-500/10 text-sky-400'
                                }`}
                              >
                                {phoneInfo.isWhatsAppViable ? 'Mobile' : 'Landline'}
                              </span>
                            </div>
                            {phoneInfo.isWhatsAppViable ? (
                              <button
                                onClick={() => handleQuickWhatsApp(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-300 text-[10px] font-bold transition-all cursor-pointer"
                              >
                                <MessageSquare size={10} className="text-emerald-400" /> WhatsApp
                              </button>
                            ) : telUrl ? (
                              <a
                                href={telUrl}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[10px] font-medium transition-all cursor-pointer"
                              >
                                <Phone size={10} className="text-sky-400" /> Call Office
                              </a>
                            ) : (
                              <span className="text-[10px] text-zinc-500 italic">No direct line</span>
                            )}
                          </div>
                        </td>

                        {/* Storefront Presence */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            {(() => {
                              const pathway = getLeadPathway(lead)
                              if (pathway === 'HAS_WEBSITE') {
                                return (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                                    Pathway 1 · Website
                                  </span>
                                )
                              }
                              if (pathway === 'NO_WEBSITE') {
                                return (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    Pathway 2 · No Web
                                  </span>
                                )
                              }
                              return (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                  Pathway 3 · Review
                                </span>
                              )
                            })()}
                            {hasWebsite ? (
                              <div>
                                <a
                                  href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#141417] text-zinc-300 border border-white/10 text-[10px] font-medium hover:text-white max-w-[160px] truncate"
                                >
                                  <Globe size={10} className="text-zinc-500" /> {rawWebsite.replace(/^https?:\/\//, '')} <ExternalLink size={9} />
                                </a>
                              </div>
                            ) : (
                              <div className="text-[10px] text-zinc-500 font-mono">No website</div>
                            )}
                          </div>
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
                              onClick={() => handleOpenOutreach(lead)}
                              className="px-2.5 py-1 rounded-lg bg-[#DCAE53] hover:bg-[#E5B85C] text-[#141417] text-[10px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                            >
                              <Sparkles size={10} /> Outreach
                            </button>
                            <Link
                              href={`/admin/leads/${lead.id}`}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-medium transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <ArrowUpRight size={10} /> Dossier
                            </Link>
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

      {/* DEDICATED SEQUENTIAL OUTREACH SPRINT RUNNER */}
      <OutreachSprintRunner
        isOpen={isSprintOpen}
        onClose={() => setIsSprintOpen(false)}
        leads={selectedIds.length > 0 ? displayedLeads.filter(l => selectedIds.includes(l.id)) : displayedLeads}
        onUpdateStatus={async (id, status) => {
          await handleUpdateLeadStatus(id, status)
        }}
      />

      {/* FLOATING BULK ACTIONS TOOLBAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B0B0D]/95 border border-amber-400/30 shadow-2xl px-4 py-2.5 rounded-2xl flex flex-wrap items-center gap-2.5 sm:gap-4 animate-fade-in w-[95%] max-w-2xl justify-between backdrop-blur-md">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-black text-xs font-bold flex items-center justify-center shadow-sm">
              {selectedIds.length}
            </span>
            <span className="text-xs text-white font-bold hidden sm:inline">Selected</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setIsSprintOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
              title="Launch sprint through selected leads"
            >
              <Zap size={12} /> Sprint ({selectedIds.length})
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Contacted')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <MessageSquare size={12} /> Contacted
            </button>
            <button
              onClick={() => handleBulkMarkFollowUp(1)}
              className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <Clock size={12} /> Mark FU 1
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Won')}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <Trophy size={12} /> Won
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Lost')}
              className="px-2.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/25 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <XCircle size={12} /> Lost
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 text-xs font-medium transition-all cursor-pointer"
            >
              <Trash2 size={12} />
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2 py-1.5 rounded-xl text-zinc-500 hover:text-zinc-300 text-xs font-medium transition-all cursor-pointer"
              title="Deselect all"
            >
              Clear
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
