import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateInvoiceNumber, MERCIAN_BANK_DETAILS } from '@/lib/quotes'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: quote, error: findError } = await supabase
    .from('quotes')
    .select('*')
    .eq('secure_token', token)
    .single()

  if (findError || !quote) {
    return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
  }

  // Update quote status to accepted
  await supabase
    .from('quotes')
    .update({
      status: 'accepted',
      updated_at: new Date().toISOString(),
    })
    .eq('id', quote.id)

  // Check if invoice already exists for this quote
  const { data: existingInvoice } = await supabase
    .from('invoices')
    .select('id, invoice_number')
    .eq('quote_id', quote.id)
    .maybeSingle()

  let invoiceRecord = existingInvoice

  if (!invoiceRecord) {
    const invoiceNumber = generateInvoiceNumber()
    const totalAmount = Number(quote.one_time_subtotal) || 0
    const depositAmount = Number(quote.deposit_required) || totalAmount
    const balanceDue = totalAmount - depositAmount

    const { data: newInv, error: invError } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        quote_id: quote.id,
        client_id: quote.client_id || null,
        client_name: quote.client_name,
        client_business: quote.client_business,
        client_email: quote.client_email,
        client_phone: quote.client_phone,
        client_address: quote.client_address,
        status: 'issued',
        total_amount: totalAmount,
        deposit_amount: depositAmount,
        balance_due: balanceDue,
        issue_date: new Date().toISOString(),
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        payment_terms: 'Due upon receipt',
        payment_method: 'bank_transfer',
        bank_details_snapshot: MERCIAN_BANK_DETAILS,
        vat_treatment: 'VAT not applicable / exempt under UK threshold',
      })
      .select()
      .single()

    if (!invError && newInv) {
      invoiceRecord = newInv
    }
  }

  return NextResponse.json({
    success: true,
    message: 'Proposal accepted. Deposit invoice issued.',
    invoice: invoiceRecord,
    bankDetails: MERCIAN_BANK_DETAILS,
  })
}
