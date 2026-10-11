-- Migration: Enable RLS on spatial_ref_sys and grant public read access
-- Timestamp: 20261011142800
-- Resolves Supabase security lint 0013_rls_disabled_in_public for PostGIS table

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name = 'spatial_ref_sys'
  ) THEN
    -- 1. Enable Row Level Security
    ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

    -- 2. Grant public read-only access to spatial reference definitions
    IF NOT EXISTS (
      SELECT 1 
      FROM pg_policies 
      WHERE schemaname = 'public' 
        AND tablename = 'spatial_ref_sys' 
        AND policyname = 'Allow public read-only access to spatial_ref_sys'
    ) THEN
      CREATE POLICY "Allow public read-only access to spatial_ref_sys"
        ON public.spatial_ref_sys
        FOR SELECT
        TO public
        USING (true);
    END IF;
  END IF;
END $$;
