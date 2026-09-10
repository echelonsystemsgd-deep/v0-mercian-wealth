import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { MERCIAN_BANK_DETAILS } from '@/lib/quotes'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Invoice identifier is required' }, { status: 400 })
  }

  // Use supabaseAdmin to allow external clients to access their invoice without requiring auth
  const supabase = supabaseAdmin || (await createClient())

  // Allow lookup by uuid id or invoice_number (e.g. MW-INV-2026-XXXX)
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  const query = supabase.from('invoices').select('*')
  const { data: invoice, error } = isUuid
    ? await query.eq('id', id).maybeSingle()
    : await query.eq('invoice_number', id).maybeSingle()

  if (error || !invoice) {
    return NextResponse.json({ error: 'Invoice not found or link has expired' }, { status: 404 })
  }

  return NextResponse.json({
    invoice,
    bankDetails: invoice.bank_details_snapshot || MERCIAN_BANK_DETAILS,
  })
}
