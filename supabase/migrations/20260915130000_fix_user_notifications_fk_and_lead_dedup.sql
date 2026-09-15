-- Fix user_notifications missing foreign key to profiles
ALTER TABLE public.user_notifications
DROP CONSTRAINT IF EXISTS fk_user_notifications_profiles;

ALTER TABLE public.user_notifications
ADD CONSTRAINT fk_user_notifications_profiles
FOREIGN KEY (user_id) REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Add index on user_notifications(user_id) for join performance
CREATE INDEX IF NOT EXISTS idx_user_notifications_user_id ON public.user_notifications(user_id);

-- Ensure unique constraint on leads(phone) to prevent duplicate workflow ingestion
-- First remove duplicates keeping newest
DELETE FROM public.leads a USING (
    SELECT MIN(ctid) as ctid, phone
    FROM public.leads
    WHERE phone IS NOT NULL AND phone != ''
    GROUP BY phone HAVING COUNT(*) > 1
) b
WHERE a.phone = b.phone
AND a.ctid <> b.ctid;

-- Now create unique index on phone
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_unique_phone ON public.leads(phone) WHERE phone IS NOT NULL AND phone != '';

-- Correct outreach_category: if website IS NOT NULL and not empty, it should be 'has_website' or 'social_only' depending on domain
UPDATE public.leads
SET outreach_category = 'has_website'
WHERE website IS NOT NULL 
  AND website != '' 
  AND website != 'None'
  AND website NOT ILIKE '%facebook.com%'
  AND website NOT ILIKE '%instagram.com%'
  AND website NOT ILIKE '%yell.com%'
  AND website NOT ILIKE '%checkatrade.com%'
  AND outreach_category = 'social_only';
