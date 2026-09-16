'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Plus, Edit2, Archive, ArchiveRestore, Star, Loader2, ImageIcon, ExternalLink, X, Save, CheckCircle2, Sparkles, RefreshCw, Trash2
} from 'lucide-react'

type PortfolioItem = {
  id: string
  project_name: string
  client_name: string | null
  description: string | null
  industry: string | null
  website_link: string | null
  cover_image: string
  metric: string | null
  under_construction: boolean
  badge_type?: string | null
  is_featured: boolean
  is_archived: boolean
  created_at: string
}

const DEFAULT_FRONTEND_PROJECTS = [
  {
    project_name: "VEYRA — Solid Cast Permanent Jewellery",
    client_name: "Permanent Jewellery Atelier · Live Sandbox",
    description: "Solid cast, unplated permanent jewellery engineered with intentional mass, real-time 3D model interaction, and bespoke atelier checkout.",
    industry: "Luxury 3D E-Commerce & Permanent Jewellery · Live Sandbox",
    website_link: "https://veyra-premium-3-d-jewellery-e-comme.vercel.app/",
    cover_image: "/veyra-jewellery-preview-real.jpg",
    metric: "Real-Time 3D Atelier & Interactive Model",
    under_construction: false,
    badge_type: "Live Interactive Sandbox",
    is_featured: true,
  },
  {
    project_name: "Vanguard Construction — House Extensions & Loft Conversions",
    client_name: "Vanguard Construction Surrey · Live Sandbox",
    description: "Architectural house extensions, dormer loft conversions, and turnkey structural renovations built with fixed-price programme certainty.",
    industry: "Architectural Extensions & Renovations · Live Sandbox",
    website_link: "https://premium-local-construction-business.vercel.app/",
    cover_image: "/vanguard-construction-preview-real.jpg",
    metric: "Instant Sub-Second Project Quote Engine",
    under_construction: false,
    badge_type: "Live Interactive Sandbox",
    is_featured: true,
  },
  {
    project_name: "AURĒLIA — Cellular Longevity & Precision Nootropics",
    client_name: "AURĒLIA Longevity · Live Sandbox",
    description: "Clinically structured longevity and nootropic formulations engineered for cellular healthspan and cognitive vitality with automated subscriptions.",
    industry: "Luxury Healthspan & Nootropic Commerce · Live Sandbox",
    website_link: "https://premium-supplement-commerce.vercel.app/",
    cover_image: "/aurelia-supplement-preview-real.jpg",
    metric: "Duodenal Delivery & Automated Subscriptions",
    under_construction: false,
    badge_type: "Live Interactive Sandbox",
    is_featured: true,
  },
]

const EMPTY_FORM = {
  project_name: '',
  client_name: '',
  description: '',
  industry: '',
  website_link: '',
  metric: '',
  under_construction: false,
  badge_type: 'Interactive Sandbox',
}

export default function PortfolioPage() {
  const supabase = createClient()
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showArchived, setShowArchived] = useState(false)
  const [modal, setModal] = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing] = useState<PortfolioItem | null>(null)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_archived', showArchived)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setItems(data)
      } else if (!showArchived) {
        // Automatically populate with current live frontend showcase projects
        const fallbackItems: PortfolioItem[] = DEFAULT_FRONTEND_PROJECTS.map((p, idx) => ({
          id: `default-${idx}`,
          project_name: p.project_name,
          client_name: p.client_name,
          description: p.description,
          industry: p.industry,
          website_link: p.website_link,
          cover_image: p.cover_image,
          metric: p.metric,
          under_construction: p.under_construction,
          badge_type: p.badge_type,
          is_featured: p.is_featured,
          is_archived: false,
          created_at: new Date().toISOString(),
        }))
        setItems(fallbackItems)
      } else {
        setItems([])
      }
    } catch {
      if (!showArchived) {
        setItems(DEFAULT_FRONTEND_PROJECTS.map((p, idx) => ({
          id: `default-${idx}`,
          project_name: p.project_name,
          client_name: p.client_name,
          description: p.description,
          industry: p.industry,
          website_link: p.website_link,
          cover_image: p.cover_image,
          metric: p.metric,
          under_construction: p.under_construction,
          badge_type: p.badge_type,
          is_featured: p.is_featured,
          is_archived: false,
          created_at: new Date().toISOString(),
        })))
      }
    }
    setLoading(false)
  }, [showArchived, supabase])

  useEffect(() => { fetch() }, [fetch])

  const handleSeedDefaults = async () => {
    setSeeding(true)
    try {
      // Check existing to prevent duplicate insertions
      const { data: existing } = await supabase.from('portfolio_items').select('project_name')
      const existingNames = new Set((existing || []).map((e: any) => e.project_name))

      let insertedCount = 0
      for (const p of DEFAULT_FRONTEND_PROJECTS) {
        if (!existingNames.has(p.project_name)) {
          const { error } = await supabase.from('portfolio_items').insert({
            project_name: p.project_name,
            client_name: p.client_name,
            description: p.description,
            industry: p.industry,
            website_link: p.website_link,
            cover_image: p.cover_image,
            metric: p.metric,
            under_construction: p.under_construction,
            badge_type: p.badge_type,
            is_featured: p.is_featured,
            is_archived: false,
          })
          if (error) throw error
          insertedCount++
        }
      }
      showToast(insertedCount > 0 ? `${insertedCount} showcase project(s) imported into database.` : 'All showcase projects already exist in database.')
      fetch()
    } catch (err: any) {
      showToast(`Import failed: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  const openCreate = () => { setForm({ ...EMPTY_FORM }); setCoverFile(null); setEditing(null); setModal('create') }
  const openEdit = (item: PortfolioItem) => {
    setEditing(item)
    setForm({
      project_name: item.project_name,
      client_name: item.client_name ?? '',
      description: item.description ?? '',
      industry: item.industry ?? '',
      website_link: item.website_link ?? '',
      metric: item.metric ?? '',
      under_construction: !!item.under_construction,
      badge_type: item.badge_type ?? 'Live Interactive Sandbox',
    })
    setCoverFile(null)
    setModal('edit')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let cover_image = editing?.cover_image ?? ''

      if (coverFile) {
        const path = `portfolio/${Date.now()}-${coverFile.name}`
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(path, coverFile, { upsert: true })
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(path)
          cover_image = publicUrl
        }
      }

      if (!cover_image && !editing) {
        cover_image = '/placeholder.jpg'
      }

      const payload = {
        project_name: form.project_name,
        client_name: form.client_name || null,
        description: form.description || null,
        industry: form.industry || null,
        website_link: form.website_link || null,
        metric: form.metric || null,
        under_construction: form.under_construction,
        badge_type: form.badge_type,
        cover_image: cover_image || '/placeholder.jpg',
      }

      if (editing && !editing.id.startsWith('default-')) {
        const { error } = await supabase.from('portfolio_items').update(payload).eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('portfolio_items').insert(payload)
        if (error) throw error
      }

      setModal(null)
      showToast(editing ? 'Portfolio item updated.' : 'Portfolio item added.')
      fetch()
    } catch (err: any) {
      showToast(`Save failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const toggleFeatured = async (item: PortfolioItem) => {
    const nextFeatured = !item.is_featured
    // Optimistic UI update
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_featured: nextFeatured } : i))
    )

    try {
      if (item.id.startsWith('default-')) {
        const { error } = await supabase.from('portfolio_items').insert({
          project_name: item.project_name,
          client_name: item.client_name,
          description: item.description,
          industry: item.industry,
          website_link: item.website_link,
          cover_image: item.cover_image,
          metric: item.metric,
          under_construction: item.under_construction,
          badge_type: item.badge_type || 'Live Interactive Sandbox',
          is_featured: nextFeatured,
          is_archived: false,
        })
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .update({ is_featured: nextFeatured })
          .eq('id', item.id)
        if (error) throw error
      }
      showToast(nextFeatured ? 'Project marked as featured.' : 'Project unfeatured.')
      fetch()
    } catch (err: any) {
      // Revert optimistic update
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_featured: item.is_featured } : i))
      )
      showToast(`Failed to update status: ${err.message}`)
    }
  }

  const toggleArchive = async (item: PortfolioItem) => {
    const nextArchived = !item.is_archived
    // Optimistic UI update
    setItems((prev) => prev.filter((i) => i.id !== item.id))

    try {
      if (item.id.startsWith('default-')) {
        const { error } = await supabase.from('portfolio_items').insert({
          project_name: item.project_name,
          client_name: item.client_name,
          description: item.description,
          industry: item.industry,
          website_link: item.website_link,
          cover_image: item.cover_image,
          metric: item.metric,
          under_construction: item.under_construction,
          badge_type: item.badge_type || 'Live Interactive Sandbox',
          is_featured: item.is_featured,
          is_archived: nextArchived,
        })
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .update({ is_archived: nextArchived })
          .eq('id', item.id)
        if (error) throw error
      }
      showToast(nextArchived ? 'Project archived.' : 'Project restored.')
      fetch()
    } catch (err: any) {
      showToast(`Failed to update archive: ${err.message}`)
      fetch()
    }
  }

  const handleDelete = async (item: PortfolioItem) => {
    if (typeof window !== 'undefined' && !window.confirm(`Are you sure you want to permanently delete "${item.project_name}"? This action cannot be undone.`)) {
      return
    }

    // Optimistic UI update
    setItems((prev) => prev.filter((i) => i.id !== item.id))

    if (item.id.startsWith('default-')) {
      showToast('Project removed.')
      return
    }

    try {
      const { error } = await supabase.from('portfolio_items').delete().eq('id', item.id)
      if (error) throw error
      showToast('Project deleted successfully.')
      if (modal === 'edit' && editing?.id === item.id) {
        setModal(null)
      }
      fetch()
    } catch (err: any) {
      showToast(`Failed to delete: ${err.message}`)
      fetch()
    }
  }

  return (
    <div className="space-y-6 sm:space-y-10 relative">
      {toast && (
        <div className="fixed top-4 left-4 z-50 px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-sm font-medium text-green-400 shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={14} className="text-green-400" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold/80 uppercase">
            <ImageIcon size={12} /> CMS Showcase Content
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">Portfolio & Case Studies</h1>
          <p className="text-sm text-muted-foreground">Manage your public case studies, sandbox badges, and target metrics.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
          <button
            onClick={handleSeedDefaults}
            disabled={seeding}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gold/20 bg-gold/5 text-gold text-xs font-bold hover:bg-gold/10 transition-all cursor-pointer disabled:opacity-50"
            title="Import the 4 live frontend projects into database"
          >
            {seeding ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            Sync Frontend Projects
          </button>
          <button
            onClick={() => setShowArchived((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              showArchived
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'bg-card border-gold/15 text-muted-foreground hover:text-foreground hover:border-gold/25'
            }`}
          >
            <Archive size={14} /> {showArchived ? 'Archived' : 'Show Archived'}
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-background text-xs font-bold hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-56 rounded-2xl bg-card/50 animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="glass rounded-2xl border border-gold/10 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4">
          <ImageIcon size={44} className="text-gold/30 mb-1" />
          <div className="space-y-1">
            <p className="font-serif text-xl font-bold text-foreground">No Database Projects Found</p>
            <p className="text-xs text-muted-foreground max-w-md">
              The public site is currently rendering built-in showcase builds (Architectural Construction, Cellular Nutrition, Clinic Consultation Triage). Click below to import them into your database for direct editing.
            </p>
          </div>
          <button
            onClick={handleSeedDefaults}
            disabled={seeding}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-background text-xs font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
          >
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            Import Frontend Showcase Projects
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openEdit(item)}
              className="glass rounded-2xl border border-gold/10 overflow-hidden group hover:border-gold/25 transition-all cursor-pointer hover:bg-gold/[0.01]"
            >
              <div className="relative h-44 bg-secondary/50">
                {item.cover_image && item.cover_image !== '/placeholder.jpg' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.cover_image} alt={item.project_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#07153B]">
                    <div className="text-center p-4">
                      <ImageIcon size={28} className="text-gold/40 mx-auto mb-1.5" />
                      <span className="text-xs font-bold text-gold/80 block">{item.project_name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{item.badge_type || 'Interactive Build'}</span>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {item.is_featured && (
                    <div className="px-2 py-0.5 rounded-full bg-gold/90 text-background text-xxs font-bold flex items-center gap-1">
                      <Star size={9} className="fill-current" /> Featured
                    </div>
                  )}
                  {item.under_construction ? (
                    <div className="px-2 py-0.5 rounded-full bg-amber-500/90 text-background text-xxs font-bold">
                      Concept
                    </div>
                  ) : (
                    <div className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-background text-xxs font-bold">
                      Live
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-semibold text-foreground line-clamp-1">{item.project_name}</p>
                  <p className="text-xs text-muted-foreground">{item.industry ?? 'General Build'} {item.metric ? `· ${item.metric}` : ''}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-gold/15 text-xs text-muted-foreground hover:text-foreground hover:border-gold/25 transition-all cursor-pointer">
                    <Edit2 size={11} /> Edit
                  </button>
                  <button onClick={() => toggleFeatured(item)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${item.is_featured ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-white/5 border-gold/15 text-muted-foreground hover:text-foreground'}`}>
                    <Star size={11} className={item.is_featured ? 'fill-gold' : ''} /> {item.is_featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button onClick={() => toggleArchive(item)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-gold/15 text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                    {item.is_archived ? <ArchiveRestore size={11} /> : <Archive size={11} />}
                    {item.is_archived ? 'Restore' : 'Archive'}
                  </button>
                  <button onClick={() => handleDelete(item)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer" title="Permanently delete project">
                    <Trash2 size={11} /> Delete
                  </button>
                  {item.website_link && (
                    <a href={item.website_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-gold/15 text-xs text-gold hover:bg-gold/10 transition-all">
                      <ExternalLink size={11} /> View
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg glass border border-gold/15 rounded-2xl shadow-2xl p-6 space-y-5 animate-scale-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gold/10 pb-3">
              <h2 className="font-serif text-lg font-bold text-foreground">{modal === 'edit' ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
              <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"><X size={16} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Project Title *</label>
                <input required value={form.project_name} onChange={(e) => setForm((p) => ({ ...p, project_name: e.target.value }))}
                  placeholder="e.g. Stamp Valuation App"
                  className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Category / Tag</label>
                  <input value={form.industry} onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
                    placeholder="e.g. AI Web App · Prototype"
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Badge Style</label>
                  <select value={form.badge_type} onChange={(e) => setForm((p) => ({ ...p, badge_type: e.target.value }))}
                    className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all">
                    <option value="Interactive Sandbox">Interactive Sandbox</option>
                    <option value="Live Client Deployment">Live Client Deployment</option>
                    <option value="Concept Prototype">Concept Prototype</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Key Metric / KPI</label>
                <input value={form.metric} onChange={(e) => setForm((p) => ({ ...p, metric: e.target.value }))}
                  placeholder="e.g. Target Latency: < 1s or Pipeline Architecture"
                  className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Live App URL / Interactive Demo Link</label>
                <input value={form.website_link} onChange={(e) => setForm((p) => ({ ...p, website_link: e.target.value }))}
                  placeholder="https://... or /local (leave blank for built-in sandbox showcase)"
                  className="w-full bg-[#141417] border border-white/10 hover:border-white/20 focus:border-[#DAA640] rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all font-mono" />
              </div>

              <div className="flex items-center gap-2 pt-1 p-3 rounded-xl bg-white/5 border border-white/10">
                <input type="checkbox" id="under_construction" checked={form.under_construction} onChange={(e) => setForm((p) => ({ ...p, under_construction: e.target.checked }))}
                  className="w-4 h-4 text-[#DAA640] border-white/20 rounded focus:ring-[#DAA640]/20 cursor-pointer" />
                <label htmlFor="under_construction" className="text-xs text-foreground cursor-pointer">
                  <strong>Blueprint / Concept Mode:</strong> Checked = "Architecture Case Study" (lead request modal). Unchecked = "Live Interactive Sandbox" (live testing mode).
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Cover Image {editing && '(leave blank to keep current)'}</label>
                <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:text-xs file:font-medium file:text-foreground hover:file:bg-white/10 transition-all cursor-pointer" />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                {editing ? (
                  <button
                    type="button"
                    onClick={() => handleDelete(editing)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                  >
                    <Trash2 size={13} /> Delete Project
                  </button>
                ) : <div />}
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-all cursor-pointer">Cancel</button>
                  <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#DAA640] text-black text-sm font-semibold disabled:opacity-60 hover:bg-[#DAA640]/90 transition-all cursor-pointer">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {editing ? 'Update Project' : 'Add to Portfolio'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
