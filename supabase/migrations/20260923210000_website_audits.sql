-- Migration: Create website_audits table and extend leads table for Website Friction Auditor
-- Timestamp: 20260923210000

CREATE TABLE IF NOT EXISTS public.website_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'complete', 'failed')),
  confidence_score NUMERIC DEFAULT 0,
  pages_crawled JSONB DEFAULT '[]'::jsonb,
  deterministic_checks JSONB DEFAULT '{}'::jsonb,
  frictions JSONB DEFAULT '[]'::jsonb,
  outreach_angles JSONB DEFAULT '{}'::jsonb,
  contact_email TEXT,
  contact_phone TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for speedy lead lookups
CREATE INDEX IF NOT EXISTS idx_website_audits_lead_id ON public.website_audits(lead_id);
CREATE INDEX IF NOT EXISTS idx_website_audits_url ON public.website_audits(url);

-- Add auditor helper columns to public.leads if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'website_audit_id') THEN
    ALTER TABLE public.leads ADD COLUMN website_audit_id UUID REFERENCES public.website_audits(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'audit_status') THEN
    ALTER TABLE public.leads ADD COLUMN audit_status TEXT DEFAULT 'none';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'last_audited_at') THEN
    ALTER TABLE public.leads ADD COLUMN last_audited_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'top_friction') THEN
    ALTER TABLE public.leads ADD COLUMN top_friction TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'friction_count') THEN
    ALTER TABLE public.leads ADD COLUMN friction_count INT DEFAULT 0;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE public.website_audits ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage audits
CREATE POLICY "Allow authenticated users full access to website_audits"
  ON public.website_audits
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access to website_audits"
  ON public.website_audits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
