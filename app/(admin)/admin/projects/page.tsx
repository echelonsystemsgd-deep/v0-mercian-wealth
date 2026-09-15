'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Plus,
  ChevronRight,
  Archive,
  Loader2,
  FolderKanban,
  Calendar,
  LayoutList,
  LayoutGrid,
  CheckCircle2,
  Info,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  X
} from 'lucide-react'
import { useInspector } from '@/hooks/use-inspector'
import { ProjectWorkspace } from '@/components/admin/project-workspace'
import { toast } from 'sonner'

type Project = {
  id: string
  client_name: string
  project_name: string
  service_type: string | null
  status: string
  start_date: string | null
  target_launch_date: string | null
  is_archived: boolean
  created_at: string
  importance_rank: number
  contract_type?: string | null
  retainer_amount?: number | null
}

const STATUS_STEPS = ['Discovery', 'Design', 'Development', 'Revision', 'Complete']

const STATUS_COLORS: Record<string, string> = {
  Discovery: 'bg-white/5 text-muted-foreground border-white/10',
  Design: 'bg-[#DAA640]/10 text-[#DAA640] border-[#DAA640]/30',
  Development: 'bg-[#DAA640]/15 text-[#DAA640] border-[#DAA640]/30',
  Revision: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Complete: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

export default function ProjectsPage() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsOpen: setInspectorOpen } = useInspector()

  const handleInspectProject = (projectId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('projectId', projectId)
    params.delete('leadId')
    params.delete('clientId')
    router.push(`${pathname}?${params.toString()}`)
    setInspectorOpen(true)
  }

  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<{ id: string; full_name: string | null; email: string | null }[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'kanban' | 'list'>('kanban')
  const [activeKanbanColumn, setActiveKanbanColumn] = useState<string>('Discovery')
  const [showArchived, setShowArchived] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Modal State for Workspace Details
  const [openWorkspaceId, setOpenWorkspaceId] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    client_name: '', project_name: '', service_type: '', description: '', notes: '',
    start_date: today, target_launch_date: '',
    contract_value: '', amount_paid: '', client_id: '',
  })

  // Read URL query parameters
  useEffect(() => {
    const openId = searchParams.get('openId')
    if (openId) {
      setOpenWorkspaceId(openId)
    } else {
      setOpenWorkspaceId(null)
    }

    const create = searchParams.get('create')
    if (create === 'true') {
      const clientName = searchParams.get('client_name') || ''
      const projectName = searchParams.get('project_name') || ''
      const serviceType = searchParams.get('service_type') || ''
      setForm((prev) => ({
        ...prev,
        client_name: clientName,
        project_name: projectName,
        service_type: serviceType,
      }))
      setShowNewModal(true)
    }
  }, [searchParams])

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const [{ data: projectData }, { data: clientData }] = await Promise.all([
      supabase.from('projects')
        .select('*')
        .eq('is_archived', showArchived)
        .order('importance_rank', { ascending: false })
        .order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, full_name, email').eq('role', 'client'),
    ])
    setProjects(projectData ?? [])
    setClients(clientData ?? [])
    setLoading(false)
  }, [showArchived, supabase])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const handleCloseNewModal = () => {
    setShowNewModal(false)
    const today = new Date().toISOString().split('T')[0]
    setForm({ client_name: '', project_name: '', service_type: '', description: '', notes: '', start_date: today, target_launch_date: '', contract_value: '', amount_paid: '', client_id: '' })
    if (searchParams.get('create') === 'true') {
      const redirectTo = searchParams.get('redirect')
      if (redirectTo) {
        router.replace(redirectTo)
      } else {
        router.replace('/admin/projects')
      }
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { data: newProject, error } = await supabase.from('projects').insert({
      client_name: form.client_name,
      project_name: form.project_name,
      service_type: form.service_type || null,
      description: form.description || null,
      notes: form.notes || null,
      start_date: form.start_date || null,
      target_launch_date: form.target_launch_date || null,
      contract_value: parseFloat(form.contract_value) || 0,
      amount_paid: parseFloat(form.amount_paid) || 0,
      client_id: form.client_id || null,
      status: 'Discovery',
    }).select().single()
    
    setSaving(false)
    if (error) { toast.error('Failed to initialize project.'); return }
    handleCloseNewModal()
    if (newProject) {
      router.push(`/admin/projects?openId=${newProject.id}`)
    } else {
      fetchProjects()
    }
    toast.success('Project initialized successfully!')
  }

  const handleUpdateRank = async (projectId: string, currentRank: number, increment: boolean) => {
    const newRank = increment ? currentRank + 1 : Math.max(0, currentRank - 1)
    const { error } = await supabase
      .from('projects')
      .update({ importance_rank: newRank })
      .eq('id', projectId)

    if (error) {
      toast.error('Failed to adjust project rank.')
    } else {
      setProjects((prev) =>
        prev
          .map((p) => (p.id === projectId ? { ...p, importance_rank: newRank } : p))
          .sort((a, b) => b.importance_rank - a.importance_rank || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      )
      toast.success('Project priority rank adjusted.')
    }
  }

  const handleOpenWorkspace = (projectId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('openId', projectId)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleCloseWorkspace = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('openId')
    router.push(`${pathname}?${params.toString()}`)
    fetchProjects()
  }

  const byStatus = (status: string) => filteredProjects.filter((p) => p.status === status)

  const filterParam = searchParams.get('filter')
  const filteredProjects = projects.filter((p) => {
    if (filterParam === 'retainer') {
      return p.contract_type === 'retainer'
    }
    if (filterParam === 'one_time') {
      return p.contract_type === 'one_time'
    }
    if (filterParam === 'rev_share') {
      return p.contract_type === 'rev_share'
    }
    if (filterParam === 'active') {
      return p.status !== 'Complete'
    }
    return true
  })

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-gold uppercase">
              <FolderKanban size={12} /> Bespoke Project Pipelines
            </span>
            {filterParam && (
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete('filter')
                  router.push(`${pathname}?${params.toString()}`)
                }}
                className="px-2 py-0.5 rounded bg-gold/10 hover:bg-gold/20 border border-gold/25 text-[8px] font-black uppercase tracking-widest text-gold flex items-center gap-1 cursor-pointer transition-all"
                title="Clear active filter"
              >
                Filtered: {
                  filterParam === 'retainer' ? 'Retainers Only' : 
                  filterParam === 'one_time' ? 'One-Time Setup Only' : 
                  filterParam === 'rev_share' ? 'Royalty Yield % Only' : 
                  'Active Only'
                } <X size={8} className="text-gold/70" />
              </button>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">Command Telemetry</h1>
          <p className="text-sm text-muted-foreground">Set mandate priority order and configure client environments.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
          <div className="flex items-center bg-[#0B0B0D] border border-white/10 rounded-xl p-1 gap-1">
            <button onClick={() => setView('kanban')} className={`p-2 rounded-lg transition-all cursor-pointer ${view === 'kanban' ? 'bg-[#DAA640]/15 text-[#DAA640]' : 'text-muted-foreground hover:text-foreground'}`}>
              <LayoutGrid size={15} />
            </button>
            <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all cursor-pointer ${view === 'list' ? 'bg-[#DAA640]/15 text-[#DAA640]' : 'text-muted-foreground hover:text-foreground'}`}>
              <LayoutList size={15} />
            </button>
          </div>
          <button
            onClick={() => setShowArchived((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${showArchived ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-[#0B0B0D] border-white/10 text-muted-foreground hover:text-foreground'}`}
          >
            <Archive size={14} /> {showArchived ? 'Archived' : 'Show Archived'}
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DAA640] text-black text-xs font-semibold hover:bg-[#DAA640]/90 transition-all cursor-pointer"
          >
            <Plus size={15} /> Initialize Project
          </button>
        </div>
      </div>

      {/* Split screen content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Priority Client List (1/3 Width) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-xs font-semibold text-foreground">Priority Rankings</h2>
            <span className="text-xs text-[#DAA640] font-mono">{filteredProjects.length} Total</span>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-[#DAA640]/30" /></div>
          ) : filteredProjects.length === 0 ? (
            (filterParam === 'retainer' || filterParam === 'one_time' || filterParam === 'rev_share') &&
            projects.filter((p) => p.contract_type !== filterParam).length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#DAA640] text-center">
                  Awaiting {
                    filterParam === 'retainer' ? 'Retainer' : 
                    filterParam === 'one_time' ? 'One-Time Setup' : 
                    'Royalty Yield %'
                  } Config
                </p>
                {projects.filter((p) => p.contract_type !== filterParam).map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#0B0B0D] card-depth rounded-xl border border-dashed border-white/10 hover:border-[#DAA640]/40 flex items-center justify-between gap-3 transition-all duration-300"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="text-xs font-semibold text-foreground truncate">{p.client_name}</h3>
                      <p className="text-[11px] text-muted-foreground truncate">{p.project_name}</p>
                    </div>
                    <button
                      onClick={() => handleOpenWorkspace(p.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#DAA640]/10 hover:bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30 text-xs font-medium shrink-0 transition-all cursor-pointer"
                    >
                      Setup Billing
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground/60 italic py-6 text-center border border-dashed border-white/10 rounded-xl">No matching clients found.</p>
            )
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((p) => {
                const isSelected = openWorkspaceId === p.id
                return (
                  <div
                    key={p.id}
                    className={`p-4 bg-[#0B0B0D] card-depth rounded-xl border flex items-center justify-between gap-3 transition-all duration-300 ${
                      isSelected ? 'border-[#DAA640] bg-[#141417]' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${STATUS_COLORS[p.status]}`}>
                          {p.status}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-white/10">Rank {p.importance_rank}</span>
                      </div>
                      <h3 className="text-xs font-semibold text-foreground truncate">{p.client_name}</h3>
                      <p className="text-[11px] text-muted-foreground truncate">{p.project_name}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Priority Ranking Up / Down Controls */}
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleUpdateRank(p.id, p.importance_rank, true)}
                          className="p-1 hover:bg-white/10 text-muted-foreground hover:text-foreground rounded border border-transparent hover:border-white/10 transition-all"
                          title="Increase Priority Rank"
                        >
                          <ChevronUp size={12} />
                        </button>
                        <button
                          onClick={() => handleUpdateRank(p.id, p.importance_rank, false)}
                          className="p-1 hover:bg-white/10 text-muted-foreground hover:text-foreground rounded border border-transparent hover:border-white/10 transition-all"
                          title="Decrease Priority Rank"
                        >
                          <ChevronDown size={12} />
                        </button>
                      </div>

                      {/* Open Workspace CTA */}
                      <button
                        onClick={() => handleOpenWorkspace(p.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                          isSelected ? 'bg-[#DAA640] text-black border-[#DAA640]' : 'border-white/10 text-foreground hover:bg-white/5'
                        }`}
                      >
                        Workspace
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Right Side: Kanban Board or List (2/3 Width) */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-xs font-semibold text-foreground">Operations View</h2>
            <span className="text-xs text-muted-foreground">{view === 'kanban' ? 'Pipeline Columns' : 'Project Registry'}</span>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 size={24} className="animate-spin text-gold/30" /></div>
          ) : filteredProjects.length === 0 ? (
            (filterParam === 'retainer' || filterParam === 'one_time' || filterParam === 'rev_share') &&
            projects.filter((p) => p.contract_type !== filterParam).length > 0 ? (
              <div className="p-8 border border-dashed border-gold/15 rounded-2xl text-center max-w-sm mx-auto space-y-3.5">
                <FolderKanban size={28} className="text-gold/20 mx-auto animate-pulse" />
                <p className="text-xs text-muted-foreground font-semibold">
                  Active projects need {
                    filterParam === 'retainer' ? 'retainer' : 
                    filterParam === 'one_time' ? 'one-time setup' : 
                    'royalty yield'
                  } parameters to show on this tracker.
                </p>
                <p className="text-[10px] text-muted-foreground">Select a project on the left to set up its billing plan.</p>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-gold/15 rounded-2xl text-center max-w-sm mx-auto space-y-4">
                <FolderKanban size={28} className="text-gold/20 mx-auto" />
                <p className="text-xs text-muted-foreground">Deploy a client project mandrel to unlock operational grids.</p>
              </div>
            )
          ) : view === 'kanban' ? (
            /* Kanban Board */
            <div className="space-y-4">
              {/* Mobile Kanban Column selector */}
              <div className="flex md:hidden border-b border-gold/10 overflow-x-auto scrollbar-none gap-2 pb-2">
                {STATUS_STEPS.map((status) => {
                  const count = byStatus(status).length
                  const isActive = activeKanbanColumn === status
                  return (
                    <button
                      key={status}
                      onClick={() => setActiveKanbanColumn(status)}
                      className={`px-3 py-1.5 border-b-2 text-xxs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                        isActive ? 'border-gold text-gold bg-gold/5 font-extrabold' : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {status} ({count})
                    </button>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
                {STATUS_STEPS.map((status) => {
                  const cols = byStatus(status)
                  const isVisible = status === activeKanbanColumn
                  return (
                    <div key={status} className={`space-y-3 min-w-[160px] ${isVisible ? 'block' : 'hidden md:block'}`}>
                      <div className={`flex items-center justify-between px-3 py-1.5 rounded-xl border text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[status]}`}>
                        <span>{status}</span>
                        <span>{cols.length}</span>
                      </div>
                      <div className="space-y-2">
                        {cols.length === 0 ? (
                          <div className="p-4 rounded-xl border border-dashed border-white/5 text-center text-[10px] text-muted-foreground/30">
                            Empty
                          </div>
                        ) : cols.map((p) => {
                          const isSelected = openWorkspaceId === p.id
                          return (
                            <div
                              key={p.id}
                              onClick={() => handleOpenWorkspace(p.id)}
                              className={`p-4 bg-[#0B0B0D] card-depth rounded-xl border transition-all cursor-pointer space-y-2 group ${
                                isSelected ? 'border-[#DAA640] bg-[#141417]' : 'border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex justify-between items-start gap-1">
                                <h4 className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-[#DAA640] transition-colors">{p.project_name}</h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleInspectProject(p.id)
                                  }}
                                  className="p-1 rounded bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
                                  title="Quick Telemetry Inspector"
                                >
                                  <Info size={10} />
                                </button>
                              </div>
                              <p className="text-[11px] text-muted-foreground truncate">{p.client_name}</p>
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
            /* Registry list */
            <div className="bg-[#0B0B0D] card-depth rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.01]">
                      <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Mandate</th>
                      <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
                      <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Launch Date</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProjects.map((p) => {
                      const isSelected = openWorkspaceId === p.id
                      return (
                        <tr
                          key={p.id}
                          onClick={() => handleOpenWorkspace(p.id)}
                          className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${
                            isSelected ? 'bg-white/[0.04]' : ''
                          }`}
                        >
                          <td className="px-5 py-3">
                            <p className="font-semibold text-foreground">{p.project_name}</p>
                            <p className="text-[11px] text-muted-foreground">{p.service_type ?? '—'}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-foreground font-medium">{p.client_name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-medium border ${STATUS_COLORS[p.status]}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-muted-foreground font-mono text-[11px]">
                              {p.target_launch_date ? new Date(p.target_launch_date).toLocaleDateString('en-GB') : '—'}
                            </span>
                          </td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleInspectProject(p.id)}
                              className="p-1.5 rounded bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
                            >
                              <Info size={12} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* New Project Initializer Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-250">
          <div className="bg-[#0B0B0D] border border-white/10 card-depth rounded-2xl p-6 w-full max-w-xl space-y-4 max-h-[85vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-foreground">Initialize Client Mandate</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Creates client directory containers and hooks telemetry streams.</p>
              </div>
              <button onClick={handleCloseNewModal} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer bg-transparent border-none text-lg">×</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="project_name" className="text-xs font-medium text-muted-foreground block">Project Name *</label>
                  <input
                    id="project_name"
                    required
                    value={form.project_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, project_name: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="client_name" className="text-xs font-medium text-muted-foreground block">Client Full Name *</label>
                  <input
                    id="client_name"
                    required
                    value={form.client_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, client_name: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="client_id" className="text-xs font-medium text-muted-foreground block">Link Portal Account</label>
                  <select
                    id="client_id"
                    value={form.client_id}
                    onChange={(e) => setForm((prev) => ({ ...prev, client_id: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none transition-all"
                  >
                    <option value="">Unlinked (Awaiting Client Setup)</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.full_name || 'Client'} ({c.email})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="service_type" className="text-xs font-medium text-muted-foreground block">Service Specifications</label>
                  <input
                    id="service_type"
                    value={form.service_type}
                    onChange={(e) => setForm((prev) => ({ ...prev, service_type: e.target.value }))}
                    placeholder="e.g. Bespoke CRM Platform"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contract_value" className="text-xs font-medium text-muted-foreground block">Project Valuation (£)</label>
                  <input
                    id="contract_value"
                    type="number"
                    value={form.contract_value}
                    onChange={(e) => setForm((prev) => ({ ...prev, contract_value: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="amount_paid" className="text-xs font-medium text-muted-foreground block">Initial Capital Settled (£)</label>
                  <input
                    id="amount_paid"
                    type="number"
                    value={form.amount_paid}
                    onChange={(e) => setForm((prev) => ({ ...prev, amount_paid: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="start_date" className="text-xs font-medium text-muted-foreground block">Initialize Date</label>
                  <input
                    id="start_date"
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="target_launch_date" className="text-xs font-medium text-muted-foreground block">Target Launch Vector</label>
                  <input
                    id="target_launch_date"
                    type="date"
                    value={form.target_launch_date}
                    onChange={(e) => setForm((prev) => ({ ...prev, target_launch_date: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none"
                  />
                </div>
              </div>

              <textarea
                placeholder="Brief project details/specifications summary..."
                rows={2}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full bg-[#141417] border border-white/10 focus:border-[#DAA640] rounded-xl px-3 py-2 text-xs text-foreground outline-none resize-none leading-relaxed"
              />

              <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                <button type="button" onClick={handleCloseNewModal} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground bg-transparent transition-all cursor-pointer">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#DAA640] text-black text-xs font-semibold disabled:opacity-50 hover:bg-[#DAA640]/90 transition-all cursor-pointer"
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                  Provision Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Premium Full-Viewport Modal for Selected Client Workspace */}
      {openWorkspaceId && (
        <div className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xs flex justify-center items-start animate-in fade-in duration-200">
          <div className="w-full max-w-5xl glass border border-gold/20 rounded-2xl shadow-2xl p-6 relative my-8">
            <ProjectWorkspace
              id={openWorkspaceId}
              isModal={true}
              onClose={handleCloseWorkspace}
              initialTab={searchParams.get('tab') as any || 'config'}
            />
          </div>
        </div>
      )}

    </div>
  )
}
