'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import {
  DollarSign, Save, Loader2, RefreshCw, Check, Plus, X, Star,
  Zap, ChevronDown, ChevronUp, AlertTriangle, Sparkles
} from 'lucide-react'
import { SITE_COPY } from '@/lib/site-copy'
import type { PricingTier } from '@/lib/pricing'

// ── Types ─────────────────────────────────────────────────────────────────────

type BillingModel = 'oneTime' | 'monthly' | 'revShare'

const MODEL_CONFIG: Record<BillingModel, { label: string; dbKey: string; prefix: string; suffix: string; color: string }> = {
  oneTime:  { label: 'One-Time Setup',   dbKey: 'pricing_setup_tiers',    prefix: '£', suffix: '',  color: '#DAA640' },
  monthly:  { label: 'Monthly Retainer', dbKey: 'pricing_retainer_tiers', prefix: '£', suffix: '/mo', color: '#60A5FA' },
  revShare: { label: '% Revenue Share',  dbKey: 'pricing_revshare_tiers', prefix: '',  suffix: '%', color: '#34D399' },
}

// ── Defaults from site-copy ───────────────────────────────────────────────────

function makeTierId(name: string, idx: number): string {
  return name?.toLowerCase().replace(/\s+/g, '-') || `tier-${idx}`
}

const DEFAULTS: Record<BillingModel, PricingTier[]> = {
  oneTime:  SITE_COPY.pricingPage.oneTimeTiers.map((t, i) => ({ id: makeTierId(t.name, i), ...t } as PricingTier)),
  monthly:  SITE_COPY.pricingPage.monthlyTiers.map((t, i) => ({ id: makeTierId(t.name, i), ...t } as PricingTier)),
  revShare: SITE_COPY.pricingPage.revenueShareTiers.map((t, i) => ({ id: makeTierId(t.name, i), ...t } as PricingTier)),
}

// ── Tier Card ─────────────────────────────────────────────────────────────────

function TierCard({
  tier,
  model,
  index,
  onChange,
  onSave,
  saving,
  saved,
}: {
  tier: PricingTier
  model: BillingModel
  index: number
  onChange: (updated: PricingTier) => void
  onSave: () => void
  saving: boolean
  saved: boolean
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const cfg = MODEL_CONFIG[model]

  const update = (patch: Partial<PricingTier>) => onChange({ ...tier, ...patch })

  const addFeature = () => update({ features: [...(tier.features || []), ''] })
  const removeFeature = (i: number) => update({ features: tier.features.filter((_, fi) => fi !== i) })
  const updateFeature = (i: number, val: string) => {
    const feats = [...tier.features]
    feats[i] = val
    update({ features: feats })
  }

  return (
    <div className={`rounded-2xl border transition-all duration-200 ${
      tier.featured
        ? 'border-[#DAA640]/50 bg-[#0B0B0D] shadow-[0_0_30px_rgba(218,166,64,0.06)]'
        : 'border-white/10 bg-[#0B0B0D]'
    }`}>
      {/* Card Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 cursor-pointer group text-left min-h-[56px]"
      >
        <div className="flex items-center gap-3 min-w-0">
          {tier.featured && (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DAA640]/15 border border-[#DAA640]/30 text-[#DAA640] text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" /> Featured
            </span>
          )}
          <span className="font-sans font-bold text-white text-base sm:text-lg truncate">
            {tier.name || `Tier ${index + 1}`}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span className="font-mono font-bold text-lg sm:text-xl" style={{ color: cfg.color }}>
            {cfg.prefix}{tier.price}{cfg.suffix}
          </span>
          {expanded ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
        </div>
      </button>

      {/* Expanded Body */}
      {expanded && (
        <div className="px-4 sm:px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
          {/* Row 1: Name + Featured toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Tier Name</label>
              <input
                className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                value={tier.name}
                onChange={e => update({ name: e.target.value })}
                placeholder="e.g. Essential Storefront"
              />
            </div>
            <div className="sm:w-44 space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Featured Tier</label>
              <button
                type="button"
                onClick={() => update({ featured: !tier.featured })}
                className={`w-full flex items-center justify-center gap-2 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  tier.featured
                    ? 'bg-[#DAA640]/15 border-[#DAA640]/40 text-[#DAA640]'
                    : 'bg-[#141417] border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tier.featured ? 'bg-[#DAA640]' : 'bg-zinc-600'}`} />
                {tier.featured ? 'Featured Tier' : 'Standard Tier'}
              </button>
            </div>
          </div>

          {/* Row 2: Price + Interval */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="sm:w-40 space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Price {cfg.prefix && `(${cfg.prefix})`}{cfg.suffix && `/ ${cfg.suffix}`}
              </label>
              <div className="relative">
                {cfg.prefix && (
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold font-mono text-zinc-400">
                    {cfg.prefix}
                  </span>
                )}
                <input
                  className={`w-full bg-[#141417] border border-white/10 rounded-xl py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white/20 transition-colors ${cfg.prefix ? 'pl-8' : 'pl-3.5'} pr-3.5`}
                  value={tier.price}
                  onChange={e => update({ price: e.target.value })}
                  placeholder="e.g. 495"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Interval Label</label>
              <input
                className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                value={tier.interval}
                onChange={e => update({ interval: e.target.value })}
                placeholder="e.g. one-time setup fee"
              />
            </div>
          </div>

          {/* Row 3: Milestone */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Milestone / Subheading</label>
            <input
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
              value={tier.milestoneBreakdown || ''}
              onChange={e => update({ milestoneBreakdown: e.target.value })}
              placeholder="e.g. Complete build & launch in 7 days"
            />
          </div>

          {/* Row 4: Description */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Description</label>
            <textarea
              rows={2}
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
              value={tier.description}
              onChange={e => update({ description: e.target.value })}
              placeholder="Short paragraph describing this tier..."
            />
          </div>

          {/* Row 5: Features */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Deliverables & Features ({tier.features?.length || 0})
            </label>
            <div className="space-y-2">
              {(tier.features || []).map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0 ml-1" />
                  <input
                    className="flex-1 bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                    value={f}
                    onChange={e => updateFeature(fi, e.target.value)}
                    placeholder={`Feature ${fi + 1}`}
                  />
                  <button
                    onClick={() => removeFeature(fi)}
                    className="shrink-0 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addFeature}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#DAA640] hover:text-[#c49535] transition-colors cursor-pointer mt-1.5 py-1"
            >
              <Plus size={14} /> Add Feature Line
            </button>
          </div>

          {/* Row 6: CTA */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">CTA Button Text</label>
            <input
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
              value={tier.cta}
              onChange={e => update({ cta: e.target.value })}
              placeholder="e.g. Book your free 15 minute audit"
            />
          </div>

          {/* Save Tier Button */}
          <div className="flex justify-end pt-2 border-t border-white/5">
            <button
              onClick={onSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#DAA640] text-black text-xs font-semibold hover:bg-[#c49535] transition-colors cursor-pointer disabled:opacity-50"
            >
              {saved ? <Check size={14} /> : saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saved ? 'Saved!' : saving ? 'Saving...' : 'Save Tier'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PricingManagerPage() {
  const supabase = createClient()

  const [activeModel, setActiveModel] = useState<BillingModel>('oneTime')
  const [allTiers, setAllTiers] = useState<Record<BillingModel, PricingTier[]>>({
    oneTime:  [...DEFAULTS.oneTime],
    monthly:  [...DEFAULTS.monthly],
    revShare: [...DEFAULTS.revShare],
  })
  const [loadingModel, setLoadingModel] = useState<BillingModel | null>(null)
  const [savingTier, setSavingTier] = useState<string | null>(null)
  const [savedTier, setSavedTier] = useState<string | null>(null)
  const [savingAll, setSavingAll] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  // Fetch all 3 models from Supabase on mount
  const fetchAll = useCallback(async () => {
    const entries = Object.entries(MODEL_CONFIG) as [BillingModel, typeof MODEL_CONFIG[BillingModel]][]
    for (const [model, cfg] of entries) {
      setLoadingModel(model)
      try {
        const { data } = await supabase
          .from('website_content')
          .select('content')
          .eq('section_key', cfg.dbKey)
          .maybeSingle()

        if (data?.content && Array.isArray(data.content) && data.content.length > 0) {
          setAllTiers(prev => ({ ...prev, [model]: data.content }))
        }
      } catch { /* keep defaults */ }
    }
    setLoadingModel(null)
  }, [supabase])

  useEffect(() => { fetchAll() }, [fetchAll])

  // Update a single tier in state
  const handleTierChange = (model: BillingModel, idx: number, updated: PricingTier) => {
    setAllTiers(prev => {
      const copy = [...prev[model]]
      copy[idx] = updated
      return { ...prev, [model]: copy }
    })
  }

  // Save a single tier
  const handleSaveTier = async (model: BillingModel, idx: number) => {
    const key = `${model}-${idx}`
    setSavingTier(key)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('website_content')
      .upsert(
        { section_key: MODEL_CONFIG[model].dbKey, content: allTiers[model], updated_at: new Date().toISOString(), updated_by: user?.id || null },
        { onConflict: 'section_key' }
      )
    setSavingTier(null)
    if (error) { showToast(`Error: ${error.message}`); return }
    setSavedTier(key)
    setTimeout(() => setSavedTier(null), 2500)
    triggerRevalidate()
  }

  // Save all 3 models at once
  const handleSaveAll = async () => {
    setSavingAll(true)
    const { data: { user } } = await supabase.auth.getUser()
    const models = Object.entries(MODEL_CONFIG) as [BillingModel, typeof MODEL_CONFIG[BillingModel]][]
    let errorMsg: string | null = null
    for (const [model, cfg] of models) {
      const { error } = await supabase
        .from('website_content')
        .upsert(
          { section_key: cfg.dbKey, content: allTiers[model], updated_at: new Date().toISOString(), updated_by: user?.id || null },
          { onConflict: 'section_key' }
        )
      if (error) { errorMsg = error.message; break }
    }
    setSavingAll(false)
    if (errorMsg) { showToast(`Error: ${errorMsg}`); return }
    showToast('✓ All pricing saved — live site updated.')
    triggerRevalidate()
  }

  // Reset all models to SITE_COPY defaults
  const handleResetAll = () => {
    if (!window.confirm('Reset all pricing to live site-copy defaults? This will not save to the database.')) return
    setAllTiers({ oneTime: [...DEFAULTS.oneTime], monthly: [...DEFAULTS.monthly], revShare: [...DEFAULTS.revShare] })
    showToast('Reset to defaults — click Save All to persist.')
  }

  // Force-sync defaults to Supabase
  const handleSyncFromSiteCopy = async () => {
    if (!window.confirm('Overwrite all database pricing with current site-copy defaults?')) return
    setSyncing(true)
    const { data: { user } } = await supabase.auth.getUser()
    const models = Object.entries(MODEL_CONFIG) as [BillingModel, typeof MODEL_CONFIG[BillingModel]][]
    let errorMsg: string | null = null
    for (const [model, cfg] of models) {
      const { error } = await supabase
        .from('website_content')
        .upsert(
          { section_key: cfg.dbKey, content: DEFAULTS[model], updated_at: new Date().toISOString(), updated_by: user?.id || null },
          { onConflict: 'section_key' }
        )
      if (error) { errorMsg = error.message; break }
    }
    if (!errorMsg) {
      setAllTiers({ oneTime: [...DEFAULTS.oneTime], monthly: [...DEFAULTS.monthly], revShare: [...DEFAULTS.revShare] })
    }
    setSyncing(false)
    if (errorMsg) { showToast(`Sync failed: ${errorMsg}`); return }
    showToast('✓ All pricing synced from live site-copy and saved.')
    triggerRevalidate()
  }

  const triggerRevalidate = async () => {
    try {
      await fetch('/api/revalidate-pricing', {
        method: 'POST',
        headers: { 'x-admin-key': 'mercian-wealth-admin-revalidate' },
      })
    } catch { /* non-fatal */ }
  }

  const currentTiers = allTiers[activeModel]
  const isLoading = loadingModel !== null

  return (
    <div className="space-y-6 sm:space-y-8 pb-32 lg:pb-8 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-sm font-medium text-white shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <Check size={15} className="text-[#DAA640]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#DAA640] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
              <span>Commercial Strategy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Pricing Control Centre</h1>
            <p className="text-sm text-zinc-400">Live tier pricing, milestone schedules, and billing models.</p>
          </div>

          {/* Action Buttons — desktop */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={handleSyncFromSiteCopy}
              disabled={syncing}
              className="flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#141417] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer disabled:opacity-50"
            >
              {syncing ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
              <span>{syncing ? 'Syncing...' : 'Sync Defaults'}</span>
            </button>
            <button
              onClick={handleResetAll}
              className="flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#141417] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Reset All</span>
            </button>
            <button
              onClick={handleSaveAll}
              disabled={savingAll}
              className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#DAA640] text-black text-xs font-semibold hover:bg-[#c49535] transition-colors cursor-pointer disabled:opacity-50 shadow-md"
            >
              {savingAll ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{savingAll ? 'Saving...' : 'Save All Models'}</span>
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {(Object.entries(MODEL_CONFIG) as [BillingModel, typeof MODEL_CONFIG[BillingModel]][]).map(([model, cfg]) => (
            <div key={model} className="rounded-2xl bg-[#0B0B0D] border border-white/10 p-3.5 sm:p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 truncate">{cfg.label}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1.5 font-sans">{allTiers[model].length}</p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">active tiers</p>
            </div>
          ))}
        </div>
      </div>

      {/* Motion Segmented Model Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#141417] border border-white/10 rounded-xl overflow-x-auto">
        {(Object.entries(MODEL_CONFIG) as [BillingModel, typeof MODEL_CONFIG[BillingModel]][]).map(([model, cfg]) => (
          <button
            key={model}
            onClick={() => setActiveModel(model)}
            className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            {activeModel === model && (
              <motion.div
                layoutId="activePricingModel"
                className="absolute inset-0 bg-[#0B0B0D] border border-white/10 rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span
              className="w-1.5 h-1.5 rounded-full relative z-10 shrink-0"
              style={{ backgroundColor: activeModel === model ? cfg.color : 'rgba(255,255,255,0.2)' }}
            />
            <span className={`relative z-10 ${activeModel === model ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
              {cfg.label}
            </span>
            <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
              activeModel === model ? 'bg-white/10 text-white' : 'bg-white/5 text-zinc-500'
            }`}>
              {allTiers[model].length}
            </span>
          </button>
        ))}
      </div>

      {/* Active Model Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: MODEL_CONFIG[activeModel].color }} />
          <h2 className="font-sans font-bold text-white text-base sm:text-lg">
            {MODEL_CONFIG[activeModel].label} Tiers
          </h2>
          {isLoading && <Loader2 size={14} className="animate-spin text-zinc-400 ml-1" />}
        </div>
        {activeModel === 'revShare' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Performance Model
          </span>
        )}
      </div>

      {/* Tier Cards */}
      <div className="space-y-4">
        {currentTiers.map((tier, idx) => (
          <TierCard
            key={`${activeModel}-${tier.id || idx}`}
            tier={tier}
            model={activeModel}
            index={idx}
            onChange={updated => handleTierChange(activeModel, idx, updated)}
            onSave={() => handleSaveTier(activeModel, idx)}
            saving={savingTier === `${activeModel}-${idx}`}
            saved={savedTier === `${activeModel}-${idx}`}
          />
        ))}
      </div>

      {/* Info notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B0B0D] border border-white/10">
        <AlertTriangle size={15} className="text-[#DAA640] mt-0.5 shrink-0" />
        <p className="text-xs text-zinc-400 leading-relaxed">
          Changes save directly to Supabase and propagate to the public pricing page within 60 seconds (via cache revalidation). 
          Use <strong className="text-white">"Save Tier"</strong> for individual tier edits or <strong className="text-white">"Save All Models"</strong> to persist all three billing models simultaneously.
        </p>
      </div>

      {/* Mobile Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50 px-4 pb-safe-area-inset-bottom pb-4 pt-3 bg-[#050505]/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <button
            onClick={handleResetAll}
            className="flex-none flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-[#141417] border border-white/10 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
            title="Reset to Defaults"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={handleSyncFromSiteCopy}
            disabled={syncing}
            className="flex-none flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-[#141417] border border-white/10 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer disabled:opacity-50"
            title="Sync Defaults"
          >
            {syncing ? <Loader2 size={15} className="animate-spin" /> : <Zap size={15} />}
          </button>
          <button
            onClick={handleSaveAll}
            disabled={savingAll}
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 rounded-xl bg-[#DAA640] text-black text-xs font-bold hover:bg-[#c49535] transition-colors cursor-pointer disabled:opacity-50 shadow-md"
          >
            {savingAll ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            <span>{savingAll ? 'Saving...' : 'Save All Pricing'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
