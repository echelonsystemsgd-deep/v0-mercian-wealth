-- Migration: Allow public read access to invoices via unique link / identifier
CREATE POLICY "Public link read access on invoices" ON public.invoices
    FOR SELECT USING (true);
