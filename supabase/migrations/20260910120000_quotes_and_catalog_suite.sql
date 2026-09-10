-- Migration: Create internal catalog, quotes, quote_items, and invoices tables
CREATE TABLE IF NOT EXISTS public.catalog_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_type TEXT NOT NULL CHECK (model_type IN ('system_build', 'growth_retainer', 'rev_share')),
    tier_key TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    default_price NUMERIC NOT NULL DEFAULT 0,
    billing_interval TEXT NOT NULL DEFAULT 'one_time' CHECK (billing_interval IN ('one_time', 'monthly', 'annual', 'rev_share_pct')),
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT NOT NULL UNIQUE,
    secure_token TEXT NOT NULL UNIQUE,
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_business TEXT,
    client_email TEXT,
    client_phone TEXT,
    client_address TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'declined', 'invoiced', 'archived')),
    one_time_subtotal NUMERIC DEFAULT 0,
    monthly_subtotal NUMERIC DEFAULT 0,
    rev_share_percentage NUMERIC DEFAULT 0,
    projected_client_sales NUMERIC DEFAULT 0,
    estimated_rev_share_monthly NUMERIC DEFAULT 0,
    deposit_required NUMERIC DEFAULT 0,
    deposit_type TEXT DEFAULT 'milestone_50' CHECK (deposit_type IN ('percentage', 'fixed', 'milestone_25', 'milestone_50')),
    scope_notes TEXT,
    stripe_checkout_session_id TEXT,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    catalog_item_id UUID REFERENCES public.catalog_items(id) ON DELETE SET NULL,
    item_type TEXT NOT NULL DEFAULT 'catalog' CHECK (item_type IN ('catalog', 'bespoke')),
    name TEXT NOT NULL,
    description TEXT,
    unit_price NUMERIC NOT NULL DEFAULT 0,
    quantity INTEGER NOT NULL DEFAULT 1,
    billing_interval TEXT NOT NULL DEFAULT 'one_time' CHECK (billing_interval IN ('one_time', 'monthly', 'rev_share')),
    rev_share_pct NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT NOT NULL UNIQUE,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_business TEXT,
    client_email TEXT,
    client_phone TEXT,
    client_address TEXT,
    status TEXT NOT NULL DEFAULT 'issued' CHECK (status IN ('draft', 'issued', 'paid', 'overdue', 'void')),
    total_amount NUMERIC NOT NULL DEFAULT 0,
    deposit_amount NUMERIC DEFAULT 0,
    balance_due NUMERIC DEFAULT 0,
    issue_date TIMESTAMPTZ DEFAULT now(),
    due_date TIMESTAMPTZ,
    payment_terms TEXT DEFAULT 'Due upon receipt',
    payment_method TEXT DEFAULT 'bank_transfer',
    bank_details_snapshot JSONB,
    vat_treatment TEXT DEFAULT 'VAT not applicable / exempt under UK threshold',
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all four tables
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Policies for catalog_items
CREATE POLICY "Admin full access on catalog_items" ON public.catalog_items
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
    );

-- Policies for quotes
CREATE POLICY "Admin full access on quotes" ON public.quotes
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
    );

CREATE POLICY "Public token read access on quotes" ON public.quotes
    FOR SELECT USING (true);

CREATE POLICY "Client view own quotes" ON public.quotes
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND client_id = auth.uid()
    );

-- Policies for quote_items
CREATE POLICY "Admin full access on quote_items" ON public.quote_items
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
    );

CREATE POLICY "Public read on quote_items" ON public.quote_items
    FOR SELECT USING (true);

-- Policies for invoices
CREATE POLICY "Admin full access on invoices" ON public.invoices
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
    );

CREATE POLICY "Client view own invoices" ON public.invoices
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND client_id = auth.uid()
    );
