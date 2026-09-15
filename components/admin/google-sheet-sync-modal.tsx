'use client'

import React, { useState } from 'react'
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  UploadCloud,
  Layers,
  ArrowRight
} from 'lucide-react'

interface GoogleSheetSyncModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  currentCount: number
}

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1uOpaNT8t8q_CzTHuGhCkjygXEd3HaCbw4DCAoRF3CMo/edit'

export function GoogleSheetSyncModal({
  isOpen,
  onClose,
  onSuccess,
  currentCount
}: GoogleSheetSyncModalProps) {
  const [activeTab, setActiveTab] = useState<'sheet_menu' | 'direct_paste'>('sheet_menu')
  const [pastedData, setPastedData] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [liveDbCount, setLiveDbCount] = useState<number>(currentCount)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchLiveCount = React.useCallback(async () => {
    try {
      const res = await fetch('/api/admin/leads/sync-sheets')
      if (res.ok) {
        const data = await res.json()
        if (data.total_outreach_leads !== undefined) {
          setLiveDbCount(data.total_outreach_leads)
        }
      }
    } catch {}
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      fetchLiveCount()
    }
  }, [isOpen, fetchLiveCount])

  const handleManualRefresh = async () => {
    setIsRefreshing(true)
    await fetchLiveCount()
    onSuccess()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  if (!isOpen) return null

  // Fast TSV / CSV parser for direct copy-paste from Google Sheets
  const handleDirectPasteImport = async () => {
    if (!pastedData.trim()) {
      setFeedback({ type: 'error', message: 'Please paste your Google Sheet data first.' })
      return
    }

    setIsImporting(true)
    setFeedback(null)

    try {
      const lines = pastedData.split(/\r?\n/).filter(line => line.trim().length > 0)
      if (lines.length === 0) throw new Error('No rows detected.')

      // Detect separator: tab (TSV from Google Sheets copy) or comma
      const firstLine = lines[0]
      const sep = firstLine.includes('\t') ? '\t' : ','

      const parseRow = (line: string) => {
        if (sep === '\t') return line.split('\t').map(c => c.trim().replace(/^"(.*)"$/, '$1'))
        // simple CSV splitter
        const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g
        const matches: string[] = []
        let match
        while ((match = regex.exec(line)) !== null) {
          if (match.index === regex.lastIndex) regex.lastIndex++
          if (match[1] !== undefined) {
            matches.push(match[1].replace(/^"(.*)"$/, '$1').replace(/""/g, '"').trim())
          }
        }
        return matches.length > 0 ? matches : line.split(',')
      }

      const headers = parseRow(lines[0]).map(h => h.toLowerCase())
      const isHeaderRow = headers.some(h => h.includes('business') || h.includes('phone') || h.includes('name'))
      const dataRows = isHeaderRow ? lines.slice(1) : lines

      // Helper to find column index
      const findCol = (keywords: string[]) => {
        for (let i = 0; i < headers.length; i++) {
          for (const k of keywords) {
            if (headers[i].includes(k)) return i
          }
        }
        return -1
      }

      const colName = isHeaderRow ? findCol(['business name', 'company', 'business', 'name']) : 0
      const colPhone = isHeaderRow ? findCol(['phone', 'tel', 'mobile']) : 1
      const colRatingReviews = isHeaderRow ? findCol(['reviews & rating', 'rating & reviews', 'reviews']) : 4
      const colWebsite = isHeaderRow ? findCol(['website', 'site', 'url']) : 5
      const colAddress = isHeaderRow ? findCol(['address', 'location']) : 6
      const colTrade = isHeaderRow ? findCol(['trade', 'category']) : 7

      const leads = dataRows.map(rowLine => {
        const cols = parseRow(rowLine)
        const businessName = (cols[colName >= 0 ? colName : 0] || '').trim()
        const rawPhone = (cols[colPhone >= 0 ? colPhone : 1] || '').trim()
        const rawWeb = (cols[colWebsite >= 0 ? colWebsite : 5] || '').trim()
        const rawAddr = (cols[colAddress >= 0 ? colAddress : 6] || '').trim()
        const rawReviews = (cols[colRatingReviews >= 0 ? colRatingReviews : 4] || '').trim()
        const rawTrade = (cols[colTrade >= 0 ? colTrade : 7] || 'Local Business').trim()

        // Extract rating & review count
        let rating = 5.0
        let reviewsCount = 0
        const rMatch = rawReviews.match(/([0-5]\.[0-9]|[0-5])/)
        if (rMatch) rating = parseFloat(rMatch[1])
        const revMatch = rawReviews.match(/(\d+)\s*reviews?/i) || rawReviews.match(/^(\d+)/)
        if (revMatch) reviewsCount = parseInt(revMatch[1], 10)

        // Sanitize address
        const cleanAddress = rawAddr.replace(/·\s*\d+(\s*\(★[\d\.]+\))?/g, '').replace(/·\s*★[\d\.]+/g, '').trim()

        return {
          business_name: businessName,
          phone: rawPhone,
          website: rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' ? rawWeb : null,
          address: cleanAddress,
          rating,
          reviews_count: reviewsCount,
          trade: rawTrade,
          status: 'New'
        }
      }).filter(l => l.business_name || l.phone)

      if (leads.length === 0) throw new Error('No valid lead rows could be extracted.')

      const res = await fetch('/api/admin/leads/sync-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'import_leads', leads })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Sync request failed')

      setFeedback({
        type: 'success',
        message: `Successfully processed ${leads.length} leads (${data.inserted_count} new inserted, ${data.updated_count} updated)!`
      })
      setPastedData('')
      setTimeout(() => {
        onSuccess()
      }, 1200)
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Import failed.' })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B0F17] border border-gold/30 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/15 bg-[#0e141f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">Google Sheets Lead Sync</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-gold/15 border border-gold/30 text-gold">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sync your Google Sheet leads directly into your dashboard in 1 click
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="px-6 py-3 bg-[#080b11] border-b border-gold/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Database Status:</span>
            <span className="font-bold text-foreground">{liveDbCount} Active Leads in DB</span>
          </div>
          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
          >
            Open Google Sheet <ExternalLink size={12} />
          </a>
        </div>

        {/* Method Toggle Tabs */}
        <div className="flex border-b border-gold/15 bg-[#090d14]">
          <button
            onClick={() => setActiveTab('sheet_menu')}
            className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'sheet_menu'
                ? 'border-gold text-gold bg-gold/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles size={14} /> Method 1: 1-Click via Google Sheet Menu (Recommended)
          </button>
          <button
            onClick={() => setActiveTab('direct_paste')}
            className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'direct_paste'
                ? 'border-gold text-gold bg-gold/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <UploadCloud size={14} /> Method 2: Instant Copy-Paste (0-Setup)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
          {/* Feedback Alert */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
              }`}
            >
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              <span>{feedback.message}</span>
            </div>
          )}

          {activeTab === 'sheet_menu' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-gold/15 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Layers size={13} /> How to push your Google Sheet leads to this dashboard in 10 seconds:
                </h4>

                <div className="space-y-2.5 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <div>
                      <a
                        href={GOOGLE_SHEET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-foreground hover:text-gold inline-flex items-center gap-1 underline underline-offset-2"
                      >
                        Open your Google Sheet <ExternalLink size={11} />
                      </a>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Your spreadsheet with the scraped leads.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-foreground">
                        Click <span className="text-emerald-400">Extensions</span> → <span className="text-emerald-400">Apps Script</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Ensure <code className="text-gold font-mono">GOOGLE_SHEETS_SYNC_SCRIPT.js</code> is pasted in Code.gs and saved (Ctrl + S).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-foreground">
                        Reload the sheet & click the menu:
                      </p>
                      <div className="mt-1 px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/30 text-gold font-bold inline-flex items-center gap-2">
                        <span>Mercian Wealth</span> <ArrowRight size={12} /> <span>🚀 Sync All Leads to Admin Dashboard (1-Click)</span>
                      </div>
                      <p className="text-[11px] text-emerald-400/90 font-medium mt-1">
                        ✓ All leads will instantly populate into this dashboard with 0 errors!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={GOOGLE_SHEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  <ExternalLink size={14} /> Open Google Sheet Now
                </a>

                <button
                  onClick={handleManualRefresh}
                  className="px-4 py-2.5 rounded-xl bg-card border border-gold/20 hover:border-gold/40 text-foreground text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw size={13} className={`text-gold ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Paste rows directly from Google Sheet (Ctrl + A then Ctrl + C in your sheet):
                </label>
                <textarea
                  rows={8}
                  value={pastedData}
                  onChange={(e) => setPastedData(e.target.value)}
                  placeholder="Paste your rows here directly from Google Sheets...&#10;Business Name | Phone | Channel | WhatsApp Link | Reviews | Rating..."
                  className="w-full p-3.5 bg-black/60 border border-gold/20 focus:border-gold/50 rounded-2xl text-xs font-mono text-foreground placeholder:text-muted-foreground/40 outline-none resize-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  {pastedData ? `${pastedData.split('\n').filter(Boolean).length} rows detected` : 'Copy-paste any table from Google Sheets'}
                </span>

                <button
                  onClick={handleDirectPasteImport}
                  disabled={isImporting || !pastedData.trim()}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isImporting || !pastedData.trim()
                      ? 'bg-gold/20 text-muted-foreground cursor-not-allowed'
                      : 'bg-gradient-to-r from-gold to-gold-light text-background font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'
                  }`}
                >
                  {isImporting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" /> Importing Leads...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={14} /> ⚡ Instant Import to Dashboard
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
