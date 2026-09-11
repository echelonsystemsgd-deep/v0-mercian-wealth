-- Migration: 20260911120000_outbound_lead_pipeline.sql
-- Purpose: Enhance public.leads to integrate outbound scraping engine with Mercian Wealth quotes & admin pipeline

-- 1. Extend public.leads table non-destructively
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS outreach_category TEXT DEFAULT 'no_website',
  ADD COLUMN IF NOT EXISTS outreach_stage TEXT DEFAULT 'uncontacted',
  ADD COLUMN IF NOT EXISTS whatsapp_direct_url TEXT,
  ADD COLUMN IF NOT EXISTS scraped_metadata JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS converted_quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL;

-- 2. Create performance indexes for operator triage
CREATE INDEX IF NOT EXISTS idx_leads_outreach_stage ON public.leads(outreach_stage);
CREATE INDEX IF NOT EXISTS idx_leads_outreach_category ON public.leads(outreach_category);

-- 3. Function: convert_lead_to_quote
-- Allows the operator to promote a qualified outbound lead into a formal quote draft in 1 click
CREATE OR REPLACE FUNCTION public.convert_lead_to_quote(
  target_lead_id UUID,
  initial_tier_key TEXT DEFAULT 'launch_catalyst'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_lead RECORD;
  v_quote_id UUID;
  v_quote_number TEXT;
  v_secure_token TEXT;
  v_catalog_item RECORD;
  v_unit_price NUMERIC := 1850;
  v_tier_name TEXT := 'Launch Catalyst — High-Performance Digital Storefront';
BEGIN
  -- 1. Fetch the lead
  SELECT * INTO v_lead FROM public.leads WHERE id = target_lead_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Lead with ID % not found', target_lead_id;
  END IF;

  -- 2. Generate unique quote number and secure token
  v_quote_number := 'MW-Q-2026-' || LPAD(FLOOR(RANDOM() * 9000 + 1000)::TEXT, 4, '0');
  v_secure_token := encode(gen_random_bytes(24), 'hex');

  -- 3. Lookup catalog item if it exists
  SELECT * INTO v_catalog_item FROM public.catalog_items WHERE tier_key = initial_tier_key LIMIT 1;
  IF FOUND THEN
    v_unit_price := v_catalog_item.default_price;
    v_tier_name := v_catalog_item.name;
  END IF;

  -- 4. Create the draft quote in public.quotes
  INSERT INTO public.quotes (
    quote_number,
    secure_token,
    client_name,
    client_business,
    client_email,
    client_phone,
    client_address,
    status,
    one_time_subtotal,
    deposit_required,
    deposit_type,
    scope_notes,
    valid_until
  ) VALUES (
    v_quote_number,
    v_secure_token,
    COALESCE(NULLIF(v_lead.name, ''), 'Owner / Director'),
    v_lead.business_name,
    COALESCE(v_lead.email, 'outreach@' || regexp_replace(lower(v_lead.business_name), '[^a-z0-9]', '', 'g') || '.co.uk'),
    v_lead.phone,
    COALESCE(v_lead.notes, 'UK Regional Business'),
    'draft',
    v_unit_price,
    ROUND(v_unit_price * 0.5, 2), -- 50% standard milestone deposit
    'milestone_50',
    'Outbound qualification notes: ' || COALESCE(v_lead.notes, 'Discovered via Google Maps outreach. Category: ' || v_lead.outreach_category),
    now() + INTERVAL '14 days'
  ) RETURNING id INTO v_quote_id;

  -- 5. Attach the initial quote line item
  INSERT INTO public.quote_items (
    quote_id,
    catalog_item_id,
    item_type,
    name,
    description,
    unit_price,
    quantity,
    billing_interval
  ) VALUES (
    v_quote_id,
    v_catalog_item.id,
    'catalog',
    v_tier_name,
    'Turnkey digital storefront, autonomous enquiry capture, and speed-to-lead workflow.',
    v_unit_price,
    1,
    'one_time'
  );

  -- 6. Link lead back to the generated quote and mark converted
  UPDATE public.leads
  SET 
    outreach_stage = 'converted_to_quote',
    converted_quote_id = v_quote_id,
    updated_at = now()
  WHERE id = target_lead_id;

  RETURN jsonb_build_object(
    'success', true,
    'quote_id', v_quote_id,
    'quote_number', v_quote_number,
    'secure_token', v_secure_token,
    'lead_id', target_lead_id
  );
END;
$$;
