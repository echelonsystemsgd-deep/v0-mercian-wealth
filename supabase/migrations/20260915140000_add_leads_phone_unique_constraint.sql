-- Add explicit unique constraint on leads(phone)
-- This allows PostgREST upsert: POST /rest/v1/leads?on_conflict=phone
-- with header "Prefer: resolution=merge-duplicates"

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'leads_phone_unique' 
        AND conrelid = 'public.leads'::regclass
    ) THEN
        ALTER TABLE public.leads 
        ADD CONSTRAINT leads_phone_unique UNIQUE (phone);
    END IF;
END $$;
