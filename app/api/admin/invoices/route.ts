import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateInvoiceNumber, MERCIAN_BANK_DETAILS } from '@/lib/quotes'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ invoices })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const {
      quote_id,
      client_id,
      client_name,
      client_business,
      client_email,
      client_phone,
      client_address,
      total_amount,
      deposit_amount,
      payment_terms = 'Due upon receipt',
      due_date = null,
    } = body

    if (!client_name || total_amount === undefined) {
      return NextResponse.json({ error: 'Client name and total amount are required' }, { status: 400 })
    }

    const total = Number(total_amount) || 0
    const deposit = deposit_amount !== undefined ? Number(deposit_amount) : total
    const balanceDue = total - deposit

    const invoiceNumber = generateInvoiceNumber()

    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        quote_id: quote_id || null,
        client_id: client_id || null,
        client_name,
        client_business: client_business || null,
        client_email: client_email || null,
        client_phone: client_phone || null,
        client_address: client_address || null,
        status: 'issued',
        total_amount: total,
        deposit_amount: deposit,
        balance_due: balanceDue,
        issue_date: new Date().toISOString(),
        due_date: due_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        payment_terms,
        payment_method: 'bank_transfer',
        bank_details_snapshot: MERCIAN_BANK_DETAILS,
        vat_treatment: 'VAT not applicable / exempt under UK threshold',
      })
      .select()
      .single()

    if (error || !invoice) {
      return NextResponse.json({ error: error?.message || 'Failed to create invoice' }, { status: 500 })
    }

    // If linked to quote, update quote status to 'invoiced'
    if (quote_id) {
      await supabase
        .from('quotes')
        .update({ status: 'invoiced', updated_at: new Date().toISOString() })
        .eq('id', quote_id)
    }

    return NextResponse.json({ invoice, success: true }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
