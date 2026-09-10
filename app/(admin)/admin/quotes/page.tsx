'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency, MERCIAN_BANK_DETAILS, type CatalogItem, type Quote, type Invoice, type QuoteItem } from '@/lib/quotes'
import {
  Receipt,
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Printer,
  Trash2,
  Edit2,
  DollarSign,
  TrendingUp,
  Percent,
  Sparkles,
  ChevronDown,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  X,
  Loader2,
  Check,
  AlertCircle,
  Calendar,
  Layers,
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminQuotesPage() {
  const supabase = createClient()

  // State
  const [activeTab, setActiveTab] = useState<'quotes' | 'invoices' | 'catalog'>('quotes')
  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [catalog, setCatalog] = useState<CatalogItem[]>([])
  const [clients, setClients] = useState<any[]>([])

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('')

  // Modals
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false)
  const [isNewClientOpen, setIsNewClientOpen] = useState(false)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [copiedLinkToken, setCopiedLinkToken] = useState<string | null>(null)

  // New Quote Builder Form State
  const [selectedClientId, setSelectedClientId] = useState<string>('')
  const [clientForm, setClientForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    address: '',
  })
  const [selectedItems, setSelectedItems] = useState<QuoteItem[]>([])
  const [customItemForm, setCustomItemForm] = useState({
    name: '',
    description: '',
    unit_price: '',
    billing_interval: 'one_time' as 'one_time' | 'monthly',
  })
  const [revSharePct, setRevSharePct] = useState<number>(0)
  const [projectedSales, setProjectedSales] = useState<string>('25000')
  const [depositType, setDepositType] = useState<'milestone_50' | 'milestone_25' | 'fixed'>('milestone_50')
  const [customDepositAmount, setCustomDepositAmount] = useState<string>('')
  const [scopeNotes, setScopeNotes] = useState('')
  const [submittingQuote, setSubmittingQuote] = useState(false)

  // Catalog Item Editor State
  const [editingCatalogItem, setEditingCatalogItem] = useState<CatalogItem | null>(null)
  const [editPrice, setEditPrice] = useState('')

  // Fetch initial data
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // 1. Quotes
      const resQuotes = await fetch('/api/admin/quotes')
      if (resQuotes.ok) {
        const data = await resQuotes.json()
        setQuotes(data.quotes || [])
      }

      // 2. Invoices
      const resInvoices = await fetch('/api/admin/invoices')
      if (resInvoices.ok) {
        const data = await resInvoices.json()
        setInvoices(data.invoices || [])
      }

      // 3. Catalog
      const resCatalog = await fetch('/api/admin/catalog')
      if (resCatalog.ok) {
        const data = await resCatalog.json()
        setCatalog(data.items || [])
      }

      // 4. Clients from profiles table
      const { data: clientProfiles } = await supabase
        .from('profiles')
        .select('id, full_name, company_name, email, phone_number')
        .order('full_name', { ascending: true })

      if (clientProfiles) {
        setClients(clientProfiles)
      }
    } catch (err: any) {
      toast.error('Failed to load pricing suite data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // When an existing client is selected from dropdown
  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId)
    const found = clients.find((c) => c.id === clientId)
    if (found) {
      setClientForm({
        name: found.full_name || '',
        business: found.company_name || '',
        email: found.email || '',
        phone: found.phone_number || '',
        address: '',
      })
    }
  }

  // Add catalog item to quote
  const handleAddCatalogItem = (item: CatalogItem) => {
    if (item.model_type === 'rev_share') {
      setRevSharePct(item.default_price)
      toast.success(`Selected ${item.name} (${item.default_price}%)`)
      return
    }

    const newItem: QuoteItem = {
      catalog_item_id: item.id,
      item_type: 'catalog',
      name: item.name,
      description: item.description,
      unit_price: item.default_price,
      quantity: 1,
      billing_interval: item.billing_interval === 'monthly' ? 'monthly' : 'one_time',
    }
    setSelectedItems((prev) => [...prev, newItem])
    toast.success(`Added ${item.name} to quote`)
  }

  // Add custom bespoke line item
  const handleAddBespokeItem = () => {
    if (!customItemForm.name || !customItemForm.unit_price) {
      toast.error('Please enter a name and price for the bespoke line item')
      return
    }
    const newItem: QuoteItem = {
      item_type: 'bespoke',
      name: customItemForm.name,
      description: customItemForm.description,
      unit_price: Number(customItemForm.unit_price) || 0,
      quantity: 1,
      billing_interval: customItemForm.billing_interval,
    }
    setSelectedItems((prev) => [...prev, newItem])
    setCustomItemForm({
      name: '',
      description: '',
      unit_price: '',
      billing_interval: 'one_time',
    })
    toast.success('Added custom bespoke item')
  }

  // Remove line item from builder
  const handleRemoveItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index))
  }

  // Calculation summaries
  const calculations = useMemo(() => {
    let oneTime = 0
    let monthly = 0

    selectedItems.forEach((item) => {
      const p = Number(item.unit_price) || 0
      const q = Number(item.quantity) || 1
      if (item.billing_interval === 'monthly') {
        monthly += p * q
      } else {
        oneTime += p * q
      }
    })

    const salesNum = Number(projectedSales) || 0
    const estRevShare = Math.round(salesNum * (revSharePct / 100))

    let deposit = 0
    if (depositType === 'milestone_50') {
      deposit = Math.round(oneTime * 0.5)
    } else if (depositType === 'milestone_25') {
      deposit = Math.round(oneTime * 0.25)
    } else if (depositType === 'fixed') {
      deposit = Number(customDepositAmount) || oneTime
    }

    return {
      oneTime,
      monthly,
      estRevShare,
      deposit,
    }
  }, [selectedItems, projectedSales, revSharePct, depositType, customDepositAmount])

  // Submit and Create Quote
  const handleCreateQuote = async () => {
    if (!clientForm.name) {
      toast.error('Client name is required')
      return
    }
    if (selectedItems.length === 0 && revSharePct === 0) {
      toast.error('Please add at least one line item or select a revenue share tier')
      return
    }

    setSubmittingQuote(true)
    try {
      const payload = {
        client_id: selectedClientId || null,
        client_name: clientForm.name,
        client_business: clientForm.business,
        client_email: clientForm.email,
        client_phone: clientForm.phone,
        client_address: clientForm.address,
        items: selectedItems,
        rev_share_percentage: revSharePct,
        projected_client_sales: Number(projectedSales) || 0,
        deposit_type: depositType,
        custom_deposit: depositType === 'fixed' ? Number(customDepositAmount) : null,
        scope_notes: scopeNotes,
      }

      const res = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create quote')

      toast.success(`Quote ${data.quote.quote_number} generated successfully!`)
      setIsNewQuoteOpen(false)
      // Reset form
      setSelectedItems([])
      setScopeNotes('')
      setRevSharePct(0)
      fetchData()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setSubmittingQuote(false)
    }
  }

  // Generate invoice directly from quote
  const handleGenerateInvoiceFromQuote = async (quote: Quote) => {
    try {
      const res = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote_id: quote.id,
          client_id: quote.client_id,
          client_name: quote.client_name,
          client_business: quote.client_business,
          client_email: quote.client_email,
          client_phone: quote.client_phone,
          client_address: quote.client_address,
          total_amount: quote.one_time_subtotal,
          deposit_amount: quote.deposit_required,
          payment_terms: 'Due upon receipt',
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to issue invoice')

      toast.success(`Invoice ${data.invoice.invoice_number} generated!`)
      fetchData()
      setViewingInvoice(data.invoice)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Mark invoice paid
  const handleMarkInvoicePaid = async (invoiceId: string) => {
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paid', balance_due: 0 }),
      })
      if (!res.ok) throw new Error('Failed to update invoice')
      toast.success('Invoice marked as Paid')
      fetchData()
      if (viewingInvoice && viewingInvoice.id === invoiceId) {
        setViewingInvoice({ ...viewingInvoice, status: 'paid', balance_due: 0 })
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Delete quote
  const handleDeleteQuote = async (quoteId: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) return
    try {
      const res = await fetch(`/api/admin/quotes/${quoteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete quote')
      toast.success('Quote deleted')
      fetchData()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Update Catalog Item
  const handleSaveCatalogItem = async () => {
    if (!editingCatalogItem) return
    try {
      const res = await fetch('/api/admin/catalog', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingCatalogItem.id,
          default_price: Number(editPrice),
        }),
      })
      if (!res.ok) throw new Error('Failed to update catalog')
      toast.success(`Updated ${editingCatalogItem.name} price`)
      setEditingCatalogItem(null)
      fetchData()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Filtered lists
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const query = searchQuery.toLowerCase()
      return (
        q.client_name.toLowerCase().includes(query) ||
        (q.client_business && q.client_business.toLowerCase().includes(query)) ||
        q.quote_number.toLowerCase().includes(query)
      )
    })
  }, [quotes, searchQuery])

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const query = searchQuery.toLowerCase()
      return (
        inv.client_name.toLowerCase().includes(query) ||
        (inv.client_business && inv.client_business.toLowerCase().includes(query)) ||
        inv.invoice_number.toLowerCase().includes(query)
      )
    })
  }, [invoices, searchQuery])

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCAE53]/15 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111115] border border-[#DCAE53]/30 flex items-center justify-center text-[#DCAE53]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
                <span>Quotes &amp; Invoice Suite</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#DCAE53]/10 border border-[#DCAE53]/25 text-[#DCAE53]">
                  Internal Command
                </span>
              </h1>
              <p className="text-xs font-mono text-[#DCAE53]/80 uppercase tracking-widest mt-0.5">
                {MERCIAN_BANK_DETAILS.tagline}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewQuoteOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DAA640] to-[#B88528] hover:from-[#E5B85C] hover:to-[#C99632] text-[#09090B] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#DAA640]/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Build New Quote</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-[#111115] border border-white/8 w-fit">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'bg-[#18181F] text-[#DCAE53] shadow-md border border-[#DCAE53]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={13} />
            <span>Quotes ({quotes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'bg-[#18181F] text-[#DCAE53] shadow-md border border-[#DCAE53]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt size={13} />
            <span>Invoices ({invoices.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-[#18181F] text-[#DCAE53] shadow-md border border-[#DCAE53]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>Catalog Rates ({catalog.length})</span>
          </button>
        </div>

        {/* Search input */}
        {activeTab !== 'catalog' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client or reference..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111115] border border-white/8 hover:border-white/15 focus:border-[#DCAE53]/50 text-xs text-white placeholder:text-slate-500 outline-none transition-all"
            />
          </div>
        )}
      </div>

      {/* TAB 1: QUOTES LIST */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#DCAE53]" />
              <span>Loading quotes registry...</span>
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#111115] border border-white/8 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">No Quotes Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                {searchQuery ? 'No quotes match your search query.' : 'Build your first client quote to generate an interactive proposal and branded invoice.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setIsNewQuoteOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#DCAE53]/10 transition-colors cursor-pointer"
                >
                  + Build New Quote
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredQuotes.map((q) => {
                const clientPortalUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/quote/${q.secure_token}`
                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/8 hover:border-[#DCAE53]/30 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/25 px-2.5 py-0.5 rounded-lg">
                            {q.quote_number}
                          </span>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                            q.status === 'invoiced' || q.status === 'accepted'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}>
                            ● {q.status}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {new Date(q.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-white mt-1">
                          {q.client_business ? `${q.client_business} (${q.client_name})` : q.client_name}
                        </h3>
                      </div>

                      {/* Financial Badges */}
                      <div className="flex items-center gap-3 font-mono text-right">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase block">Implementation</span>
                          <span className="text-base font-extrabold text-white">{formatCurrency(q.one_time_subtotal)}</span>
                        </div>
                        {q.monthly_subtotal > 0 && (
                          <div className="border-l border-white/10 pl-3">
                            <span className="text-[10px] text-slate-400 uppercase block">Retainer</span>
                            <span className="text-sm font-bold text-blue-400">{formatCurrency(q.monthly_subtotal)}/mo</span>
                          </div>
                        )}
                        {q.rev_share_percentage > 0 && (
                          <div className="border-l border-white/10 pl-3">
                            <span className="text-[10px] text-slate-400 uppercase block">Rev Share ({q.rev_share_percentage}%)</span>
                            <span className="text-sm font-bold text-emerald-400">Est. {formatCurrency(q.estimated_rev_share_monthly)}/mo</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Scope Items Snapshot */}
                    {q.items && q.items.length > 0 && (
                      <div className="p-3 rounded-xl bg-[#18181F] border border-white/5 flex flex-wrap gap-2 text-xs font-mono">
                        {q.items.map((it, idx) => (
                          <span key={idx} className="px-2 py-1 rounded bg-[#09090B] border border-white/5 text-slate-300">
                            {it.name} ({formatCurrency(it.unit_price)})
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {/* Copy Secret Client Link */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(clientPortalUrl)
                            setCopiedLinkToken(q.id)
                            toast.success('Copied secret client quote portal link!')
                            setTimeout(() => setCopiedLinkToken(null), 2000)
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181F] border border-white/10 hover:border-[#DCAE53]/40 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
                        >
                          {copiedLinkToken === q.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedLinkToken === q.id ? 'Link Copied' : 'Copy Client Portal Link'}</span>
                        </button>

                        <a
                          href={`/quote/${q.secure_token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181F] border border-white/10 hover:border-[#DCAE53]/40 text-slate-300 hover:text-[#DCAE53] text-xs font-mono transition-all"
                        >
                          <ExternalLink size={12} />
                          <span>View as Client</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleGenerateInvoiceFromQuote(q)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#DCAE53]/15 hover:bg-[#DCAE53]/25 border border-[#DCAE53]/40 text-[#DCAE53] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          <Receipt size={12} />
                          <span>Generate Branded Invoice</span>
                        </button>
                        <button
                          onClick={() => handleDeleteQuote(q.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INVOICE LEDGER */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#DCAE53]" />
              <span>Loading invoice records...</span>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#111115] border border-white/8 text-center space-y-3">
              <Receipt className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">No Invoices Issued</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                Invoices will populate here once quotes are finalized and issued to clients.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 overflow-hidden bg-[#111115]">
              <div className="grid grid-cols-12 px-5 py-3 bg-[#18181F] border-b border-white/5 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <div className="col-span-3">Invoice Ref</div>
                <div className="col-span-4">Client / Company</div>
                <div className="col-span-2 text-right">Deposit Due</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="divide-y divide-white/5">
                {filteredInvoices.map((inv) => (
                  <div key={inv.id} className="grid grid-cols-12 px-5 py-4 items-center text-xs font-mono">
                    <div className="col-span-3 font-bold text-[#DCAE53] flex items-center gap-2">
                      <Receipt size={14} />
                      <span>{inv.invoice_number}</span>
                    </div>
                    <div className="col-span-4 font-sans">
                      <span className="font-bold text-white block">{inv.client_business || inv.client_name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {inv.client_email}
                      </span>
                    </div>
                    <div className="col-span-2 text-right font-bold text-white">
                      {formatCurrency(inv.deposit_amount)}
                    </div>
                    <div className="col-span-1 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                          : 'bg-amber-500/10 text-[#DCAE53] border border-[#DCAE53]/25'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingInvoice(inv)}
                        className="px-2.5 py-1 rounded bg-[#18181F] border border-white/10 hover:border-[#DCAE53]/40 text-slate-200 hover:text-white text-[11px] font-medium transition-all cursor-pointer"
                      >
                        View &amp; Print
                      </button>
                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => handleMarkInvoicePaid(inv.id)}
                          className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MASTER CATALOG RATES */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#111115] border border-white/8 text-xs font-sans text-slate-300">
            <span className="font-mono text-[#DCAE53] font-bold block uppercase mb-1">Internal Source of Truth</span>
            These baseline rates and deliverables are stored in Supabase (`catalog_items`). They govern the internal quote builder and can be adjusted here without code deployments.
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* System Build Tiers */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={14} />
                <span>1. System Build (Fixed Setup)</span>
              </h3>
              <div className="space-y-3">
                {catalog.filter((c) => c.model_type === 'system_build').map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#111115] border border-white/8 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="font-mono font-extrabold text-[#DCAE53] text-sm">
                        {formatCurrency(item.default_price)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.description}</p>
                    <button
                      onClick={() => {
                        setEditingCatalogItem(item)
                        setEditPrice(String(item.default_price))
                      }}
                      className="text-[10px] font-mono text-slate-400 hover:text-[#DCAE53] transition-colors inline-flex items-center gap-1"
                    >
                      <Edit2 size={11} /> Edit Base Price
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Retainer Tiers */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={14} />
                <span>2. Growth Retainer (Monthly)</span>
              </h3>
              <div className="space-y-3">
                {catalog.filter((c) => c.model_type === 'growth_retainer').map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#111115] border border-white/8 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="font-mono font-extrabold text-blue-400 text-sm">
                        {formatCurrency(item.default_price)}/mo
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.description}</p>
                    <button
                      onClick={() => {
                        setEditingCatalogItem(item)
                        setEditPrice(String(item.default_price))
                      }}
                      className="text-[10px] font-mono text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                    >
                      <Edit2 size={11} /> Edit Base Price
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Share Tiers */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Percent size={14} />
                <span>3. Revenue Share (%)</span>
              </h3>
              <div className="space-y-3">
                {catalog.filter((c) => c.model_type === 'rev_share').map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#111115] border border-white/8 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="font-mono font-extrabold text-emerald-400 text-sm">
                        {item.default_price}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.description}</p>
                    <button
                      onClick={() => {
                        setEditingCatalogItem(item)
                        setEditPrice(String(item.default_price))
                      }}
                      className="text-[10px] font-mono text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                    >
                      <Edit2 size={11} /> Edit Percentage
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW QUOTE BUILDER */}
      {isNewQuoteOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111115] border border-[#DCAE53]/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsNewQuoteOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-[10px] font-mono text-[#DCAE53] uppercase tracking-widest font-bold">
                QUOTE BUILDER COMMAND
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">Assemble Custom Client Proposal</h2>
            </div>

            {/* SECTION 1: CLIENT SELECTION */}
            <div className="p-5 rounded-2xl bg-[#18181F] border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <User size={14} className="text-[#DCAE53]" />
                  <span>1. Client Information</span>
                </span>
                {clients.length > 0 && (
                  <select
                    value={selectedClientId}
                    onChange={(e) => handleSelectClient(e.target.value)}
                    className="bg-[#09090B] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-[#DCAE53]/50"
                  >
                    <option value="">-- Quick Load Client Profile --</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.company_name ? `${c.company_name} (${c.full_name})` : c.full_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Client Full Name *"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#DCAE53]/50"
                />
                <input
                  type="text"
                  placeholder="Business / Company Name"
                  value={clientForm.business}
                  onChange={(e) => setClientForm({ ...clientForm, business: e.target.value })}
                  className="bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#DCAE53]/50"
                />
                <input
                  type="email"
                  placeholder="Contact Email Address"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  className="bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#DCAE53]/50"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number"
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                  className="bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#DCAE53]/50"
                />
              </div>
            </div>

            {/* SECTION 2: CATALOG PICKER */}
            <div className="p-5 rounded-2xl bg-[#18181F] border border-white/5 space-y-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#DCAE53]" />
                <span>2. Pick from Internal Catalog</span>
              </span>

              <div className="grid sm:grid-cols-3 gap-3">
                {catalog.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#09090B] border border-white/5 hover:border-[#DCAE53]/40 transition-all flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                        item.model_type === 'rev_share'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : item.model_type === 'growth_retainer'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-[#DCAE53]/10 text-[#DCAE53]'
                      }`}>
                        {item.model_type.replace('_', ' ')}
                      </span>
                      <h4 className="font-bold text-white text-xs mt-1">{item.name}</h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {item.model_type === 'rev_share' ? `${item.default_price}% rev share` : formatCurrency(item.default_price)}
                        {item.billing_interval === 'monthly' && '/mo'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddCatalogItem(item)}
                      className="w-full py-1.5 rounded-lg bg-[#18181F] hover:bg-[#DCAE53]/15 border border-white/10 hover:border-[#DCAE53]/30 text-xs font-mono text-slate-200 hover:text-[#DCAE53] font-bold transition-all cursor-pointer"
                    >
                      + Add to Quote
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: BESPOKE LINE-ITEM BUILDER */}
            <div className="p-5 rounded-2xl bg-[#18181F] border border-white/5 space-y-3">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#DCAE53]" />
                <span>3. Add Bespoke Line Item (Never Auto-Priced)</span>
              </span>

              <div className="grid sm:grid-cols-12 gap-3">
                <input
                  type="text"
                  placeholder="Custom Item Name *"
                  value={customItemForm.name}
                  onChange={(e) => setCustomItemForm({ ...customItemForm, name: e.target.value })}
                  className="sm:col-span-4 bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Description / Specific Scope"
                  value={customItemForm.description}
                  onChange={(e) => setCustomItemForm({ ...customItemForm, description: e.target.value })}
                  className="sm:col-span-4 bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Price (£) *"
                  value={customItemForm.unit_price}
                  onChange={(e) => setCustomItemForm({ ...customItemForm, unit_price: e.target.value })}
                  className="sm:col-span-2 bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                />
                <button
                  onClick={handleAddBespokeItem}
                  className="sm:col-span-2 py-2 rounded-xl bg-[#DCAE53]/20 hover:bg-[#DCAE53]/30 border border-[#DCAE53]/40 text-[#DCAE53] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                >
                  + Add Item
                </button>
              </div>
            </div>

            {/* SECTION 4: SELECTED SCOPE & LIVE TOTALS */}
            <div className="p-5 rounded-2xl bg-[#09090B] border border-[#DCAE53]/25 space-y-4">
              <span className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider block">
                Quote Staging Summary
              </span>

              {selectedItems.length === 0 && revSharePct === 0 ? (
                <p className="text-xs text-slate-500 font-mono">No line items staged yet. Select from catalog above or add a bespoke item.</p>
              ) : (
                <div className="divide-y divide-white/5 text-xs font-mono">
                  {selectedItems.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-slate-200">
                      <div>
                        <span className="font-bold text-white">{item.name}</span>
                        {item.billing_interval === 'monthly' && <span className="text-blue-400 ml-2">(Monthly)</span>}
                        {item.description && <p className="text-[11px] text-slate-400 font-sans">{item.description}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{formatCurrency(item.unit_price)}</span>
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {revSharePct > 0 && (
                    <div className="py-3 flex justify-between items-center text-emerald-400">
                      <div>
                        <span className="font-bold">Revenue Share Tier ({revSharePct}%)</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-slate-400">Client Projected Monthly Sales: £</span>
                          <input
                            type="number"
                            value={projectedSales}
                            onChange={(e) => setProjectedSales(e.target.value)}
                            className="w-24 bg-[#18181F] border border-white/10 rounded px-2 py-0.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">Est. {formatCurrency(calculations.estRevShare)}/mo</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Deposit Structure */}
              <div className="grid sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Deposit Model:</label>
                  <select
                    value={depositType}
                    onChange={(e: any) => setDepositType(e.target.value)}
                    className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="milestone_50">50% Sprint 1 Initiation</option>
                    <option value="milestone_25">25% (4 Milestones)</option>
                    <option value="fixed">Custom Fixed Deposit</option>
                  </select>
                </div>
                {depositType === 'fixed' && (
                  <div>
                    <label className="text-slate-400 block mb-1">Custom Deposit Amount (£):</label>
                    <input
                      type="number"
                      value={customDepositAmount}
                      onChange={(e) => setCustomDepositAmount(e.target.value)}
                      placeholder="e.g. 1000"
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                )}
                <div className="sm:col-span-1 flex flex-col justify-end text-right">
                  <span className="text-slate-400 text-[10px] uppercase">Deposit Required to Initiate:</span>
                  <span className="text-lg font-extrabold text-[#DCAE53]">{formatCurrency(calculations.deposit)}</span>
                </div>
              </div>

              {/* Scope Notes */}
              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Executive Scope Notes:</label>
                <textarea
                  rows={2}
                  value={scopeNotes}
                  onChange={(e) => setScopeNotes(e.target.value)}
                  placeholder="Specific architectural focus or sprint timelines for this client..."
                  className="w-full bg-[#18181F] border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 outline-none"
                />
              </div>

              {/* Total Row */}
              <div className="p-4 rounded-xl bg-[#111115] border border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Implementation Setup</span>
                  <span className="text-2xl font-serif font-extrabold text-white">{formatCurrency(calculations.oneTime)}</span>
                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5">{MERCIAN_BANK_DETAILS.vatNotice}</span>
                </div>

                <button
                  onClick={handleCreateQuote}
                  disabled={submittingQuote}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DAA640] to-[#B88528] text-[#09090B] font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#DAA640]/20 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
                >
                  {submittingQuote ? 'Finalizing Quote...' : 'Finalize & Save Quote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LUXURY BRANDED INVOICE PREVIEW & PRINT */}
      {viewingInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#09090B] text-slate-100 border border-[#DCAE53]/40 rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 print:hidden border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] hover:bg-[#DCAE53]/10 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>
                {viewingInvoice.status !== 'paid' && (
                  <button
                    onClick={() => handleMarkInvoicePaid(viewingInvoice.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <CheckCircle2 size={14} />
                    <span>Mark Paid</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => setViewingInvoice(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer self-end sm:self-auto"
              >
                <X size={20} />
              </button>
            </div>

            {/* INVOICE PRINTABLE CONTAINER */}
            <div id="invoice-print-area" className="space-y-6">
              {/* Header Letterhead */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#111115] border border-[#DCAE53]/40 flex items-center justify-center p-1.5">
                      <svg className="w-6 h-6 text-[#DCAE53]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" opacity="0.9" />
                        <circle cx="12" cy="11.5" r="1.5" fill="#DCAE53" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-sans font-black text-base tracking-wider text-white uppercase">
                        MERCIAN <span className="text-[#DCAE53]">WEALTH</span>
                      </div>
                      <p className="text-[10px] font-mono text-[#DCAE53] tracking-widest uppercase">
                        {MERCIAN_BANK_DETAILS.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    West Midlands, United Kingdom · operations@mercianwealth.com
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1 font-mono text-xs w-full sm:w-auto">
                  <span className="text-xl font-bold text-white block tracking-wide">INVOICE</span>
                  <span className="text-[#DCAE53] font-bold block">{viewingInvoice.invoice_number}</span>
                  <span className="text-slate-400 block">
                    Issue Date: {new Date(viewingInvoice.issue_date).toLocaleDateString('en-GB')}
                  </span>
                  <span className="text-slate-400 block">
                    Due Date: {viewingInvoice.due_date ? new Date(viewingInvoice.due_date).toLocaleDateString('en-GB') : 'Upon Receipt'}
                  </span>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-[#111115] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Billed To:</span>
                  <strong className="text-white text-sm block">{viewingInvoice.client_business || viewingInvoice.client_name}</strong>
                  <p className="text-slate-300">Attn: {viewingInvoice.client_name}</p>
                  {viewingInvoice.client_email && <p className="text-slate-400 font-mono">{viewingInvoice.client_email}</p>}
                  {viewingInvoice.client_phone && <p className="text-slate-400 font-mono">{viewingInvoice.client_phone}</p>}
                  {viewingInvoice.client_address && <p className="text-slate-400">{viewingInvoice.client_address}</p>}
                </div>

                <div className="p-4 rounded-xl bg-[#111115] border border-white/5 space-y-2 font-mono">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Payment Status:</span>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase ${
                    viewingInvoice.status === 'paid'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#DCAE53]/10 text-[#DCAE53] border border-[#DCAE53]/30'
                  }`}>
                    ● {viewingInvoice.status}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Terms: {viewingInvoice.payment_terms}
                  </p>
                </div>
              </div>

              {/* Financial Ledger Table */}
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-[#18181F] text-[11px] font-mono text-slate-400 uppercase">
                  <div className="col-span-8">Description</div>
                  <div className="col-span-4 text-right">Amount Due</div>
                </div>
                <div className="p-4 space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center text-white">
                    <span>Turnkey Systems Implementation Setup (Sprint Initiation Deposit)</span>
                    <span className="font-mono font-bold text-sm">{formatCurrency(viewingInvoice.deposit_amount)}</span>
                  </div>
                  {viewingInvoice.balance_due > 0 && (
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Remaining Balance Due on Final Go-Live</span>
                      <span className="font-mono">{formatCurrency(viewingInvoice.balance_due)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[#111115] border-t border-white/10 flex justify-between items-center font-mono">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase">Deposit Due Now</span>
                    <span className="text-[10px] text-slate-400">{MERCIAN_BANK_DETAILS.vatNotice}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#DCAE53]">
                    {formatCurrency(viewingInvoice.deposit_amount)}
                  </span>
                </div>
              </div>

              {/* Bank Coordinates Directives */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] text-[#DCAE53] uppercase font-bold tracking-wider block">
                    UK Faster Payments Bank Directives
                  </span>
                  <span className="text-[10px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/25 px-2.5 py-0.5 rounded-full font-bold">
                    GBP (£) Faster Payments / BACS
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
                  <div className="p-3 rounded-xl bg-[#18181F] border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Account Holder</span>
                    <span className="text-white font-bold block truncate">
                      {viewingInvoice.bank_details_snapshot?.accountName || MERCIAN_BANK_DETAILS.accountName}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18181F] border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sort Code</span>
                    <span className="text-white font-bold block">
                      {viewingInvoice.bank_details_snapshot?.sortCode || MERCIAN_BANK_DETAILS.sortCode}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18181F] border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Account Number</span>
                    <span className="text-white font-bold block">
                      {viewingInvoice.bank_details_snapshot?.accountNumber || MERCIAN_BANK_DETAILS.accountNumber}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18181F] border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Bank Name</span>
                    <span className="text-white font-bold block truncate">
                      {viewingInvoice.bank_details_snapshot?.bankName || MERCIAN_BANK_DETAILS.bankName}
                    </span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0D0D11] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Payment Reference:</span>
                  <span className="text-[#DCAE53] font-bold font-mono">{viewingInvoice.invoice_number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CATALOG ITEM */}
      {editingCatalogItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111115] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Edit Base Rate: {editingCatalogItem.name}</h3>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">
                {editingCatalogItem.model_type === 'rev_share' ? 'Percentage (%)' : 'Price (£)'}:
              </label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingCatalogItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCatalogItem}
                className="px-4 py-2 rounded-xl bg-[#DCAE53] text-[#09090B] font-mono font-bold text-xs uppercase"
              >
                Save Rate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
