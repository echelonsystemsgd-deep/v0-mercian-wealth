/**
 * lib/quotes.ts
 * Core business logic, types, and defaults for the Mercian Wealth Quote & Invoice Suite.
 */

export type CatalogItem = {
  id: string
  model_type: 'system_build' | 'growth_retainer' | 'rev_share'
  tier_key: string
  name: string
  default_price: number
  billing_interval: 'one_time' | 'monthly' | 'annual' | 'rev_share_pct'
  description: string | null
  features: string[]
  is_active: boolean
}

export type QuoteItem = {
  id?: string
  quote_id?: string
  catalog_item_id?: string | null
  item_type: 'catalog' | 'bespoke'
  name: string
  description?: string | null
  unit_price: number
  quantity: number
  billing_interval: 'one_time' | 'monthly' | 'rev_share'
  rev_share_pct?: number
}

export type Quote = {
  id: string
  quote_number: string
  secure_token: string
  client_id?: string | null
  client_name: string
  client_business?: string | null
  client_email?: string | null
  client_phone?: string | null
  client_address?: string | null
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'invoiced' | 'archived'
  one_time_subtotal: number
  monthly_subtotal: number
  rev_share_percentage: number
  projected_client_sales: number
  estimated_rev_share_monthly: number
  deposit_required: number
  deposit_type: 'percentage' | 'fixed' | 'milestone_25' | 'milestone_50'
  scope_notes?: string | null
  stripe_checkout_session_id?: string | null
  valid_until?: string | null
  created_at: string
  updated_at: string
  items?: QuoteItem[]
}

export type Invoice = {
  id: string
  invoice_number: string
  quote_id?: string | null
  client_id?: string | null
  client_name: string
  client_business?: string | null
  client_email?: string | null
  client_phone?: string | null
  client_address?: string | null
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'void'
  total_amount: number
  deposit_amount: number
  balance_due: number
  issue_date: string
  due_date?: string | null
  payment_terms: string
  payment_method: string
  bank_details_snapshot?: Record<string, any> | null
  vat_treatment: string
  pdf_url?: string | null
  created_at: string
}

export const MERCIAN_BANK_DETAILS = {
  accountName: "Gurtej Deep",
  bankName: "Starling Bank",
  sortCode: "60-83-71",
  accountNumber: "39898316",
  iban: "GB56SRLG60837139898316",
  bicSwift: "SRLGGB2L",
  vatNotice: "VAT not applicable / exempt under UK threshold",
  tagline: "Storefronts · Automation · Growth.",
}

/**
 * Generates a unique sequential/timestamped quote number: MW-Q-YYYY-XXXX
 */
export function generateQuoteNumber(sequence = 1): string {
  const year = new Date().getFullYear()
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `MW-Q-${year}-${randomSuffix}`
}

/**
 * Generates a unique invoice number: MW-INV-YYYY-XXXX
 */
export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear()
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `MW-INV-${year}-${randomSuffix}`
}

/**
 * Formats a number to UK currency GBP (£)
 */
export function formatCurrency(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) return '£0'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount))
}
