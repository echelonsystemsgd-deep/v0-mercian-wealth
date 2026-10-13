-- Migration: Enable Row Level Security (RLS) on all public tables
-- Resolves Supabase Security Advisor Critical Issue: rls_disabled_in_public
-- Project ID: ladebhmyywkcqtyazxxk (GS Legacy Wealth project)

-- 1. Dynamically loop through all tables in the 'public' schema where RLS is currently disabled
DO $$
DECLARE
  tbl record;
BEGIN
  FOR tbl IN
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND rowsecurity = false
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl.tablename);
    RAISE NOTICE 'Enabled Row Level Security on table: %', tbl.tablename;
  END LOOP;
END $$;

-- 2. Ensure spatial_ref_sys (PostGIS) has public read access so maps/GIS queries operate smoothly
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name = 'spatial_ref_sys'
  ) THEN
    ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

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
