-- Migration: 20261011170000_accountants_compliance_and_leads_overhaul.sql
-- Description: Creates website_review_requests, suppressed_contacts, and extends leads table columns

-- 1. Website Review Requests table
CREATE TABLE IF NOT EXISTS public.website_review_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    phone TEXT NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT true,
    source TEXT DEFAULT 'practices_page',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for phone queries
CREATE INDEX IF NOT EXISTS idx_website_review_requests_phone ON public.website_review_requests(phone);

-- 2. Suppressed Contacts table (Opt-Out list for UK GDPR & PECR compliance)
CREATE TABLE IF NOT EXISTS public.suppressed_contacts (
    phone TEXT PRIMARY KEY,
    reason TEXT,
    source TEXT DEFAULT 'opt_out',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for phone lookup
CREATE INDEX IF NOT EXISTS idx_suppressed_contacts_phone ON public.suppressed_contacts(phone);

-- 3. Extend Leads table with practice audit & outreach fields
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS friction_found TEXT,
ADD COLUMN IF NOT EXISTS evidence_link TEXT,
ADD COLUMN IF NOT EXISTS date_messaged TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS next_follow_up DATE;

-- Grant permissions if RLS is enabled
ALTER TABLE public.website_review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppressed_contacts ENABLE ROW LEVEL SECURITY;

-- Allow anon insert for public review request flow
CREATE POLICY "Allow anon insert to website_review_requests"
ON public.website_review_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Allow service role on website_review_requests"
ON public.website_review_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow service role full access to suppressed_contacts
CREATE POLICY "Allow service role on suppressed_contacts"
ON public.suppressed_contacts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
