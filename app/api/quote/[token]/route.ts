import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MERCIAN_BANK_DETAILS } from '@/lib/quotes'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: quote, error } = await supabase
    .from('quotes')
    .select(`
      id,
      quote_number,
      client_name,
      client_business,
      client_email,
      client_phone,
      client_address,
      status,
      one_time_subtotal,
      monthly_subtotal,
      rev_share_percentage,
      projected_client_sales,
      estimated_rev_share_monthly,
      deposit_required,
      deposit_type,
      scope_notes,
      valid_until,
      created_at,
      items:quote_items(
        id,
        item_type,
        name,
        description,
        unit_price,
        quantity,
        billing_interval,
        rev_share_pct
      )
    `)
    .eq('secure_token', token)
    .single()

  if (error || !quote) {
    return NextResponse.json({ error: 'Quote proposal not found or link has expired' }, { status: 404 })
  }

  return NextResponse.json({
    quote,
    bankDetails: MERCIAN_BANK_DETAILS,
  })
}
